import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FiCalendar } from "react-icons/fi";
import createAxios from "../../../../../utils/axios.config";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import { error } from "jodit/esm/core/helpers";
import { toast } from "react-toastify";

const PayrollSignature = () => {
  const [addOpen, setAddOpen] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [earlyRun, setEarlyRun] = useState(false);
  const [skipAttendance, setSkipAttendance] = useState("yes");
  const [isExisting, setIsExisting] = useState("no");
  const [selectedYear, setSelectedYear] = useState("");

  // API State
  const [authorities, setAuthorities] = useState([]);
  const [authorityMappings, setAuthorityMappings] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [loadingAuthorities, setLoadingAuthorities] = useState(false);
  const [loadingAuthorityMappings, setLoadingAuthorityMappings] = useState(false);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const [loadingDesignations, setLoadingDesignations] = useState(false);
  const [savingAuthority, setSavingAuthority] = useState(false);
  const [assigningAuthority, setAssigningAuthority] = useState(false);
  const [companyOfficeId, setCompanyOfficeId] = useState([]);

  // Add Authority Form
  const [addForm, setAddForm] = useState({
    employeeId: "",
    employeeName: "",
    fatherName: "",
    designationId: "",
    designation: "",
    gender: "",
  });

  // Assign Authority Form
  const [assignForm, setAssignForm] = useState({
    effectiveFrom: "",
    fallbackAuthorityId: "",
    signingAuthorityId: "",
    isPaySlipEnabled: true,
    isForm16Enabled: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        const ids = Array.isArray(parsed) ? parsed : [parsed];
        setCompanyOfficeId(ids);
      }
    } catch (e) {
      console.error("Failed to parse companyOfficeId from localStorage:", e);
    }
  }, []);

  // ── GET all authorities by year ──
  const fetchAuthorities = async (year = "") => {
    setLoadingAuthorities(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const url = year ? `/config/get-all-authority?year=${year}` : `/config/get-all-authority`;
      const res = await axiosInstance.get(url, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setAuthorities(res.data?.data || res.data || []);
    } catch (e) {
      console.error("Failed to fetch authorities", e);
    } finally {
      setLoadingAuthorities(false);
    }
  };

  // ── GET all employees ──
  const fetchEmployees = async () => {
    if (employees.length > 0) return;
    setLoadingEmployees(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const res = await axiosInstance.get(`/employees/all`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setEmployees(res.data?.data || res.data || []);
    } catch (e) {
      console.error("Failed to fetch employees", e);
    } finally {
      setLoadingEmployees(false);
    }
  };

  const fetchDesignations = async () => {
    if (designations.length > 0) return;
    setLoadingDesignations(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const res = await axiosInstance.get(`/config/getAll-designation`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setDesignations(res.data?.data || res.data || []);
    } catch (e) {
      console.error("Failed to fetch designations", e);
    } finally {
      setLoadingDesignations(false);
    }
  };

  const fetchAuthorityMappings = async () => {
    setLoadingAuthorityMappings(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const res = await axiosInstance.get(`/config/get-all-authority-mapping`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setAuthorityMappings(res.data?.data || res.data || []);
    } catch (e) {
      console.error("Failed to fetch authority mappings", e);
    } finally {
      setLoadingAuthorityMappings(false);
    }
  };

  // ── POST add signing authority ──
  const handleAddAuthority = async () => {
    setSavingAuthority(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const body = {
        employeeType: isExisting === "yes",
        companyOfficeId,
        employeeId: addForm.employeeId,
        employeeName: addForm.employeeName,
        fatherName: addForm.fatherName,
        ...(isExisting === "no" && {
          designationId: addForm.designationId,
          designation: addForm.designation,
          gender: addForm.gender,
        }),
      };
      await axiosInstance.post(
        `/config/add-sign-authority`,
        body,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      localStorage.removeItem("companyOfficeId");
      setAddOpen(false);
      fetchAuthorities(selectedYear);
      setAddForm({ employeeId: "", employeeName: "", fatherName: "", designationId: "", designation: "", gender: "" });
      setIsExisting("no");
    } catch (e) {
      console.error("Failed to add authority", e);
    } finally {
      setSavingAuthority(false);
    }
  };

  // ── PUT assign authority ──
  const handleAssignAuthority = async () => {
    setAssigningAuthority(true);
    try {
      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const body = {
        effectiveFrom: assignForm.effectiveFrom,
        fallbackAuthorityId: assignForm.fallbackAuthorityId,
        signingAuthorityId: assignForm.signingAuthorityId,
        isPaySlipEnabled: assignForm.isPaySlipEnabled,
        isForm16Enabled: assignForm.isForm16Enabled,
      };
      await axiosInstance.post(
        `/config/assign-authority`,
        body,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      setAssignOpen(false);
      fetchAuthorities(selectedYear);
      setAssignForm({ effectiveFrom: "", fallbackAuthorityId: "", signingAuthorityId: "", isPaySlipEnabled: true, isForm16Enabled: false });
    } catch (e) {
      console.error("Failed to assign authority", e);
      toast.error(e.response.data.message)
    } finally {
      setAssigningAuthority(false);
    }
  };

  // ── Called when user clicks Continue inside CreateCountryPopup ──
  const handleCreateContinue = () => {
    setShowCreateDialog(false);
    setAddOpen(true);
  };

  const handleEmployeeSelect = (e) => {
    const emp = employees.find((em) => em._id === e.target.value);
    if (emp) {
      setAddForm((prev) => ({
        ...prev,
        employeeId: emp._id,
        employeeName: emp.name || emp.employeeName || "",
      }));
    }
  };

  const handleDesignationSelect = (e) => {
    const designation = designations.find((item) => item._id === e.target.value);
    setAddForm((prev) => ({
      ...prev,
      designationId: designation?._id || "",
      designation: designation?.designation || designation?.designationName || designation?.name || "",
    }));
  };

  const signingAuthorityOptions = authorityMappings.filter(
    (authority) => authority._id !== assignForm.fallbackAuthorityId
  );

  const fallbackAuthorityOptions = authorityMappings.filter(
    (authority) => authority._id !== assignForm.signingAuthorityId
  );

  useEffect(() => {
    if (selectedYear && selectedYear.length !== 4) return;
    fetchAuthorities(selectedYear);
  }, [selectedYear]);

  useEffect(() => {
    if (addOpen) fetchEmployees();
  }, [addOpen]);

  useEffect(() => {
    if (addOpen && isExisting === "no") fetchDesignations();
  }, [addOpen, isExisting]);

  useEffect(() => {
    if (assignOpen) fetchAuthorityMappings();
  }, [assignOpen]);

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Salary Cycle</h1>
          <p className="text-sm text-gray-500">
            Your payslips, salary structure, tax documents, and payroll support.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <DatePicker
              selected={selectedYear ? new Date(Number(selectedYear), 0, 1) : null}
              onChange={(date) => {
                setSelectedYear(date ? String(date.getFullYear()) : "");
              }}
              showYearPicker
              dateFormat="yyyy"
              placeholderText="select year"
              className="border rounded-md bg-white text-sm pl-10 pr-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <FiCalendar className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <button
            onClick={() => setAssignOpen(true)}
            className="px-4 py-2 border rounded-md bg-white text-sm hover:bg-gray-50"
          >
            Assign Signing Authority
          </button>

          {/* ── Opens CreateCountryPopup first ── */}
          <button
            onClick={() => setShowCreateDialog(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Add Signing Authority
          </button>
        </div>
      </div>

      {/* ================= SALARY CYCLE (Timeline) ================= */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300" />

        {loadingAuthorities ? (
          <div className="flex gap-6 relative pl-20 py-4">
            <p className="text-sm text-gray-500">Loading...</p>
          </div>
        ) : authorities.length === 0 ? (
          <div className="flex gap-6 relative pl-20 py-4">
            <p className="text-sm text-gray-500">
              No authorities found{selectedYear ? ` for ${selectedYear}` : ""}.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {authorities.map((entry, i) => {
              const date = entry.createdAt ? new Date(entry.createdAt) : null;
              const month = date
                ? date.toLocaleString("default", { month: "short" })
                : "—";
              const year = date ? date.getFullYear() : "—";
              const name = entry.employeeName || entry.name || "Unknown";

              return (
                <div key={i} className="flex gap-6 relative">
                  <div className="z-10">
                    <div className="h-14 w-14 rounded-full border bg-white flex flex-col items-center justify-center text-xs text-gray-500 shadow-sm">
                      <span className="font-medium">{month}</span>
                      <span>{year}</span>
                    </div>
                  </div>

                  <div className="flex-1 bg-white border rounded-lg p-5 shadow-sm">
                    <div className="text-xs text-gray-500 mb-2">Present</div>
                    <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-red-300 flex items-center justify-center text-white text-xs font-bold">
                        {name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-700">{name}</p>
                        <p className="text-xs text-gray-500">
                          {entry.isPaySlipEnabled ? "Payslip" : ""}
                          {entry.isPaySlipEnabled && entry.isForm16Enabled ? " · " : ""}
                          {entry.isForm16Enabled ? "Form 16" : ""}
                          {!entry.isPaySlipEnabled && !entry.isForm16Enabled ? "—" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= CREATE COUNTRY POPUP (Portal) ================= */}
      {showCreateDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowCreateDialog(false)}
            onContinue={handleCreateContinue}
          />,
          document.body
        )}

      {/* ================= ADD SIGNING AUTHORITY DRAWER ================= */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[480px] bg-white p-8 overflow-y-auto shadow-xl">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold">Add Signing Authority</h2>
              <button onClick={() => setAddOpen(false)} className="text-gray-500 hover:text-black">✕</button>
            </div>

            {isExisting === "yes" && (
              <div className="text-right text-red-500 text-sm font-medium mb-4">Existing Employee</div>
            )}

            <div className="space-y-6">

              <div>
                <label className="text-sm font-medium block mb-3">Is the employee existing</label>
                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => setIsExisting(opt)}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer flex items-center gap-3 transition ${
                        isExisting === opt ? "border-blue-600 ring-2 ring-blue-200" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${isExisting === opt ? "border-blue-600" : "border-gray-400"}`}>
                        {isExisting === opt && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
                      </div>
                      <span className="capitalize">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Employee Name</label>
                {isExisting === "yes" ? (
                  <select
                    className="w-full border rounded-lg p-3"
                    value={addForm.employeeId}
                    onChange={handleEmployeeSelect}
                    disabled={loadingEmployees}
                  >
                    <option value="">{loadingEmployees ? "Loading employees..." : "Select Employee"}</option>
                    {employees.map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name || emp.employeeName}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    className="w-full border rounded-lg p-3"
                    placeholder="Enter Employee Name"
                    value={addForm.employeeName}
                    onChange={(e) => setAddForm((p) => ({ ...p, employeeName: e.target.value }))}
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Father Name</label>
                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Enter Father's Name"
                  value={addForm.fatherName}
                  onChange={(e) => setAddForm((p) => ({ ...p, fatherName: e.target.value }))}
                />
              </div>

              {isExisting === "no" && (
                <>
                  <div>
                    <label className="text-sm font-medium block mb-2">Designation</label>
                    <select
                      className="w-full border rounded-lg p-3"
                      value={addForm.designationId}
                      onChange={handleDesignationSelect}
                      disabled={loadingDesignations}
                    >
                      <option value="">
                        {loadingDesignations ? "Loading designation..." : "Select Designation"}
                      </option>
                      {designations.map((designation) => (
                        <option key={designation._id} value={designation._id}>
                          {designation.designation || designation.designationName || designation.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">Gender</label>
                    <select
                      className="w-full border rounded-lg p-3"
                      value={addForm.gender}
                      onChange={(e) => setAddForm((p) => ({ ...p, gender: e.target.value }))}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button onClick={() => setAddOpen(false)} className="px-6 py-2 border rounded-lg">Cancel</button>
                <button
                  onClick={handleAddAuthority}
                  disabled={savingAuthority}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
                >
                  {savingAuthority ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ASSIGN AUTHORITY DRAWER ================= */}
      {assignOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[480px] bg-white p-8 shadow-xl overflow-y-auto">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Assign Authority</h2>
              <button onClick={() => setAssignOpen(false)}>✕</button>
            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm font-medium block mb-2">Effective From</label>
                <input
                  type="date"
                  className="w-full border rounded-lg p-3"
                  value={assignForm.effectiveFrom}
                  onChange={(e) => setAssignForm((p) => ({ ...p, effectiveFrom: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Select Signing Authority</label>
                <select
                  className="w-full border rounded-lg p-3"
                  value={assignForm.signingAuthorityId}
                  disabled={loadingAuthorityMappings}
                  onChange={(e) =>
                    setAssignForm((p) => ({
                      ...p,
                      signingAuthorityId: e.target.value,
                      fallbackAuthorityId:
                        p.fallbackAuthorityId === e.target.value ? "" : p.fallbackAuthorityId,
                    }))
                  }
                >
                  <option value="">
                    {loadingAuthorityMappings ? "Loading authorities..." : "Select Authority"}
                  </option>
                  {signingAuthorityOptions.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.employeeName || a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">Select Fallback (Optional)</label>
                <select
                  className="w-full border rounded-lg p-3"
                  value={assignForm.fallbackAuthorityId}
                  disabled={loadingAuthorityMappings}
                  onChange={(e) =>
                    setAssignForm((p) => ({
                      ...p,
                      fallbackAuthorityId: e.target.value,
                    }))
                  }
                >
                  <option value="">
                    {loadingAuthorityMappings ? "Loading authorities..." : "Select Fallback"}
                  </option>
                  {fallbackAuthorityOptions.map((a) => (
                    <option key={a._id} value={a._id}>
                      {a.employeeName || a.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div
                  onClick={() => setAssignForm((p) => ({ ...p, isPaySlipEnabled: !p.isPaySlipEnabled }))}
                  className={`flex-1 border rounded-lg p-4 flex justify-between cursor-pointer transition ${assignForm.isPaySlipEnabled ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  Pay Slip
                  <span className={assignForm.isPaySlipEnabled ? "text-blue-600" : "text-gray-400"}>✓</span>
                </div>
                <div
                  onClick={() => setAssignForm((p) => ({ ...p, isForm16Enabled: !p.isForm16Enabled }))}
                  className={`flex-1 border rounded-lg p-4 flex justify-between cursor-pointer transition ${assignForm.isForm16Enabled ? "border-blue-600 bg-blue-50" : ""}`}
                >
                  Form 16
                  <span className={assignForm.isForm16Enabled ? "text-blue-600" : "text-gray-400"}>✓</span>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button
                  onClick={handleAssignAuthority}
                  disabled={assigningAuthority}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-60"
                >
                  {assigningAuthority ? "Saving..." : "Save"}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PayrollSignature;
