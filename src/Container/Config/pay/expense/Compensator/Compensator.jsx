import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import createAxios from "../../../../../utils/axios.config";

const mapOptions = (list, labelKeys) =>
  list
    .map((item) => ({
      value: item?._id || item?.id || "",
      label: labelKeys.map((key) => item?.[key]).find(Boolean) || "",
    }))
    .filter((item) => item.value && item.label);

const mapCompensator = (item = {}, employeeMap = {}) => ({
  id: item?._id || item?.id || item?.employeeId || item?.employee?._id,
  name:
    employeeMap[item?.employeeId]?.fullName ||
    item?.employee?.fullName ||
    item?.fullName ||
    item?.employeeName ||
    item?.adminName ||
    item?.name ||
    "-",
  empId:
    employeeMap[item?.employeeId]?.employeeId ||
    item?.employee?.employeeId ||
    item?.employeeCode ||
    item?.empId ||
    item?.employeeId ||
    "-",
  role: item?.role || item?.compensatorType || "Primary",
  assignedCount:
    item?.assignedEmployeeCount ??
    item?.assignedEmployeeList?.length ??
    item?.employees?.length ??
    0,
  location:
    item?.locationId?.map?.((loc) => loc?.locationName).filter(Boolean).join(", ") ||
    item?.locationName ||
    item?.location?.locationName ||
    item?.companyOffice?.locationName ||
    item?.companyOfficeId?.[0]?.locationName ||
    "-",
  status:
    item?.status === true || item?.status === "active" || item?.isActive
      ? "Active"
      : "Draft",
});

function MultiSelectBox({ label, options, values, onChange }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const allSelected = options.length > 0 && values.length === options.length;
  const selectedLabels = options
    .filter((option) => values.includes(option.value))
    .map((option) => option.label);

  const toggleValue = (value) => {
    onChange(
      values.includes(value)
        ? values.filter((item) => item !== value)
        : [...values, value]
    );
  };

  return (
    <div ref={boxRef} className="relative">
      <label className="text-sm font-medium block mb-1">{label}</label>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full min-h-[42px] rounded-md border px-3 text-left text-sm bg-white"
      >
        <div className="flex items-center justify-between gap-3">
          <span className={selectedLabels.length > 0 ? "text-gray-800" : "text-gray-400"}>
            {selectedLabels.length > 0 ? selectedLabels.join(", ") : `Select ${label}`}
          </span>
          <span className={`text-xs text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}>
            v
          </span>
        </div>
      </button>

      {open && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-[0_12px_30px_rgba(15,23,42,0.12)]">
          <label className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-4 py-3">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => onChange(allSelected ? [] : options.map((option) => option.value))}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <span className="text-sm font-medium text-gray-700">Select all</span>
          </label>

          <div className="max-h-64 overflow-auto py-1">
            {options.map((option) => {
              const isSelected = values.includes(option.value);

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => toggleValue(option.value)}
                  className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors ${
                    isSelected
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span>{option.label}</span>
                  {isSelected && <span className="text-xs font-semibold">Selected</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Compensator() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [showDrawer, setShowDrawer] = useState(false);
  const [statusFilter, setStatusFilter] = useState("Active");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [businessUnitIds, setBusinessUnitIds] = useState([]);
  const [departmentIds, setDepartmentIds] = useState([]);
  const [locationIds, setLocationIds] = useState([]);

  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);
  const [departmentOptions, setDepartmentOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          compensatorResponse,
          employeeResponse,
          businessUnitResponse,
          departmentResponse,
          locationResponse,
        ] = await Promise.all([
          axiosInstance.get("/config/getAll-compensatore", { meta: { auth: "ADMIN_AUTH" } }),
          axiosInstance.get("/employees/all", { meta: { auth: "ADMIN_AUTH" } }),
          axiosInstance.get("/config/all-buinessUnit", { meta: { auth: "ADMIN_AUTH" } }),
          axiosInstance.get("/config/all-department", { meta: { auth: "ADMIN_AUTH" } }),
          axiosInstance.get("/config/company-offices-getAll", { meta: { auth: "ADMIN_AUTH" } }),
        ]);

        const compensators = Array.isArray(compensatorResponse?.data?.data)
          ? compensatorResponse.data.data
          : Array.isArray(compensatorResponse?.data)
          ? compensatorResponse.data
          : [];

        const employees = Array.isArray(employeeResponse?.data?.data)
          ? employeeResponse.data.data
          : Array.isArray(employeeResponse?.data)
          ? employeeResponse.data
          : [];

        const employeeMap = employees.reduce((accumulator, item) => {
          const key = item?._id || item?.id;
          if (!key) return accumulator;

          accumulator[key] = {
            fullName:
              item?.fullName ||
              item?.employee?.fullName ||
              `${item?.firstName || ""} ${item?.lastName || ""}`.trim(),
            employeeId: item?.employeeId || item?.employeeCode || "",
          };

          return accumulator;
        }, {});

        setTableRows(compensators.map((item) => mapCompensator(item, employeeMap)));
        setEmployeeOptions(
          employees
            .map((item) => {
              const value = item?._id || item?.id || "";
              const label =
                item?.fullName ||
                item?.employee?.fullName ||
                `${item?.firstName || ""} ${item?.lastName || ""}`.trim();

              if (!value || !label) return null;
              return { value, label };
            })
            .filter(Boolean)
        );
        setBusinessUnitOptions(
          mapOptions(
            Array.isArray(businessUnitResponse?.data?.data) ? businessUnitResponse.data.data : [],
            ["businessUnitName", "name"]
          )
        );
        setDepartmentOptions(
          mapOptions(
            Array.isArray(departmentResponse?.data?.data) ? departmentResponse.data.data : [],
            ["departmentName", "name"]
          )
        );
        setLocationOptions(
          mapOptions(
            Array.isArray(locationResponse?.data?.offices) ? locationResponse.data.offices : [],
            ["locationName", "officeName", "name"]
          )
        );
      } catch (error) {
        console.error("Error fetching compensator data:", error);
        toast.error(error?.response?.data?.message || "Failed to load compensator data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [axiosInstance]);

  const handleClear = () => {
    setStatusFilter("Active");
    setSelectedLocation("");
  };

  const handleSave = async () => {
    if (!employeeId) {
      toast.error("Please select employee");
      return;
    }

    const payload = {
      businessUnitId: businessUnitIds,
      departmentId: departmentIds,
      locationId: locationIds,
      employeeId,
    };

    try {
      setIsSaving(true);
      await axiosInstance.post("/config/create-compensatore", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success("Compensator created successfully");
      setShowDrawer(false);
      setEmployeeId("");
      setBusinessUnitIds([]);
      setDepartmentIds([]);
      setLocationIds([]);

      const response = await axiosInstance.get("/config/getAll-compensatore", {
        meta: { auth: "ADMIN_AUTH" },
      });
      const compensators = Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data)
        ? response.data
        : [];
      setTableRows(compensators.map(mapCompensator));
    } catch (error) {
      console.error("Error saving compensator:", error);
      toast.error(error?.response?.data?.message || "Failed to save compensator");
    } finally {
      setIsSaving(false);
    }
  };

  const filteredRows = useMemo(() => {
    return tableRows.filter((row) => {
      const statusMatch = row.status === statusFilter;
      const locationMatch = selectedLocation ? row.location === selectedLocation : true;
      return statusMatch && locationMatch;
    });
  }, [tableRows, statusFilter, selectedLocation]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold">Compensator Configuration</h1>
          <p className="text-sm text-gray-500">Manage employee directory and roles</p>
        </div>

        <button
          onClick={() => setShowDrawer(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md"
        >
          Create +
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                statusFilter === tab ? "bg-white shadow font-medium" : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">All Locations</option>
            {locationOptions.map((loc) => (
              <option key={loc.value} value={loc.label}>
                {loc.label}
              </option>
            ))}
          </select>

          <button onClick={handleClear} className="border px-4 py-2 rounded-lg">
            Clear X
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Emp ID</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Assigned</th>
              <th className="px-4 py-3 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  Loading...
                </td>
              </tr>
            )}

            {!loading && filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No records found
                </td>
              </tr>
            )}

            {!loading &&
              filteredRows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.empId}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        row.role === "Primary"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.role}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {row.assignedCount > 0 ? (
                      <span className="text-sm text-gray-600">{row.assignedCount} Employees</span>
                    ) : (
                      <span className="text-sm text-gray-500">No Employee Assigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3">{row.location}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showDrawer &&
        createPortal(
          <div
            onClick={() => setShowDrawer(false)}
            className="fixed inset-0 bg-black/40 z-[1000]"
          />,
          document.body
        )}

      {createPortal(
        <div
          className={`fixed top-0 right-0 h-full w-[440px] bg-white z-[1100] shadow-xl transition-transform duration-300 ${
            showDrawer ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-6 border-b flex justify-between">
            <h2 className="font-semibold">Add Compensator</h2>
            <button onClick={() => setShowDrawer(false)}>X</button>
          </div>

          <div className="p-6 space-y-6 overflow-y-auto">
            <div>
              <label className="text-sm font-medium block mb-1">Select employee</label>
              <select
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full h-10 px-3 border rounded-md"
              >
                <option value="">Select Employee</option>
                {employeeOptions.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <MultiSelectBox
              label="Business Unit"
              options={businessUnitOptions}
              values={businessUnitIds}
              onChange={setBusinessUnitIds}
            />

            <MultiSelectBox
              label="Department"
              options={departmentOptions}
              values={departmentIds}
              onChange={setDepartmentIds}
            />

            <MultiSelectBox
              label="Location"
              options={locationOptions}
              values={locationIds}
              onChange={setLocationIds}
            />
          </div>

          <div className="p-6 border-t flex justify-end">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-md disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
