import React, { useState, useRef, useEffect } from "react";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";
import createAxios from "../../../../utils/axios.config";

const initialSignatories = [];

const AuthoritySignature = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [signatories, setSignatories] = useState(initialSignatories);
  const [activeTab, setActiveTab] = useState("all");

  // location filter
  const [selectedLocation, setSelectedLocation] = useState("");

  // drawer
  const [drawerMode, setDrawerMode] = useState(null); // add | edit | view
  const [selectedSignatory, setSelectedSignatory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // form
  const [employeeId, setEmployeeId] = useState("");
  const [signaturePreview, setSignaturePreview] = useState(null);
  const [employees, setEmployees] = useState([]);

  // country modal
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const fileInputRef = useRef(null);

  const locations = Array.from(
    new Set(signatories.map((s) => s.location))
  );

  const handleClear = () => {
    setSelectedLocation("");
  };

  const openAddDrawer = () => {
    setDrawerMode("add");
    setEmployeeId("");
    setSignaturePreview(null);
  };

  const openEditDrawer = (data) => {
    setDrawerMode("edit");
    setSelectedSignatory(data);
    setEmployeeId(data.employeeId || "");
    setSignaturePreview(data.signatureImage);
    setOpenDropdown(null);
  };

  const openViewDrawer = async (data) => {
    setDrawerMode("view");
    setSelectedSignatory(data);
    setEmployeeId(data.employeeId || "");
    setSignaturePreview(data.signatureImage);
    setOpenDropdown(null);

    if (!data?.id) return;
    try {
      const res = await axiosInstance.get(
        `/config/get-one-authoritySignature/${data.id}`,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      const item = res?.data?.data || res?.data;
      if (item) {
        setEmployeeId(item.employeeId || "");
        setSignaturePreview(item.signatureImage || "");
      }
    } catch (error) {
      console.log("authority signature view error", error);
    }
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setSelectedSignatory(null);
  };

  const getEmployeeLabel = (emp) => {
    if (!emp) return "";
    return (
      emp.fullName ||
      emp.name ||
      [emp.firstName, emp.lastName].filter(Boolean).join(" ")
    );
  };

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosInstance.get("/employees/all", {
          meta: { auth: "ADMIN_AUTH" },
        });
        const list = res?.data?.data || res?.data || [];
        setEmployees(Array.isArray(list) ? list : []);
      } catch (error) {
        console.log("employee list error", error);
      }
    };

    fetchEmployees();
  }, []);

  const normalizeSignatory = (item) => ({
    id: item?._id || item?.id,
    employeeId: item?.employeeId || "",
    fullName:
      item?.employeeName ||
      item?.employee?.fullName ||
      item?.fullName ||
      "",
    signatureImage: item?.signatureImage || "",
    status: item?.status ?? true,
    location:
      item?.location ||
      item?.officeName ||
      item?.companyOffice?.name ||
      item?.companyOfficeId?.map?.((office) => office?.name).filter(Boolean).join(", ") ||
      "",
  });

  const fetchSignatories = async () => {
    try {
      const res = await axiosInstance.get("/config/get-all-authoritySignature", {
        meta: { auth: "ADMIN_AUTH" },
      });
      const list = res?.data?.data ;
      setSignatories(Array.isArray(list) ? list.map(normalizeSignatory) : []);
    } catch (error) {
      console.log("authority signature list error", error);
    }
  };

  useEffect(() => {
    fetchSignatories();
  }, []);

  const handleSave = async () => {
    if (!employeeId.trim()) return;

    const selectedEmployee = employees.find((emp) => {
      const value = emp?._id || emp?.id;
      return value === employeeId.trim();
    });

    const payload = {
      employeeId: employeeId.trim(),
      employeeName: getEmployeeLabel(selectedEmployee),
      signatureImage: signaturePreview || "",
    };

    try {
      if (drawerMode === "add") {
        await axiosInstance.post("/config/create-authoritySignature", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      if (drawerMode === "edit" && selectedSignatory?.id) {
        await axiosInstance.put(
          `/config/update-authoritySignature/${selectedSignatory.id}`,
          payload,
          { meta: { auth: "ADMIN_AUTH" } }
        );
      }

      await fetchSignatories();
    } catch (error) {
      console.log("authority signature save error", error);
      return;
    }

    closeDrawer();
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.put(`/config/delete-authoritySignature/${id}`, null, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setSignatories((prev) => prev.filter((item) => item.id !== id));
      setOpenDropdown(null);
    } catch (error) {
      console.log("authority signature delete error", error);
    }
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setSignaturePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    setShowCountryDialog(false);
    openAddDrawer();
  };

  const filteredSignatories = signatories.filter((s) => {
    if (activeTab === "active" && !s.status) return false;
    if (activeTab === "archive" && s.status) return false;
    if (selectedLocation && s.location !== selectedLocation) return false;
    return true;
  });
  const getSignatoryName = (signatory) => signatory?.fullName || "-";

  const getSignatoryLocation = (signatory) => signatory?.location || "-";
  const handleCreate = ()=>{
    setShowCountryDialog(false)
        setDrawerMode("add");

  }

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Signatories</h1>
          <button
            onClick={() => setShowCountryDialog(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Create +
          </button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex rounded-full border overflow-hidden">
            {["all", "active", "archive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-sm capitalize ${
                  activeTab === tab
                    ? "bg-white border shadow-sm"
                    : "text-gray-500"
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
              {locations.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>

            <button
              onClick={handleClear}
              className="border px-4 py-2 rounded-lg"
            >
              Clear ✕
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-semibold">
            <div className="col-span-3">Full Name</div>
            <div className="col-span-3">Signature</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {filteredSignatories.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-12 items-center px-6 py-4 border-t"
            >
              <div className="col-span-3">{getSignatoryName(s)}</div>

              <div className="col-span-3">
                {s.signatureImage ? (
                  <img src={s.signatureImage} alt="" className="h-8" />
                ) : (
                  <div className="w-24 h-8 border-2 border-dashed rounded" />
                )}
              </div>

              <div className="col-span-2">{getSignatoryLocation(s)}</div>
              <div className="col-span-2">{s.status ? "Active" : "Inactive"}</div>

              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => openViewDrawer(s)}
                  className="px-3 py-1 text-sm border rounded"
                >
                  View
                </button>
                <button
                  onClick={() => openEditDrawer(s)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country / Office Modal */}
      {showCountryDialog && createPortal(
            <CreateCountryPopup onClose={()=>setShowCountryDialog(false)} onContinue={handleCreate} />,document.body)

      }
    </div>
        {/* RIGHT SIDE DRAWER */}
      {drawerMode && createPortal(
          <div className="fixed inset-0 bg-black/40 z-50" onClick={closeDrawer} >

          <div
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between p-6 border-b">
              <h2 className="text-xl font-bold capitalize">
                {drawerMode} Signatory
              </h2>
              <button onClick={closeDrawer}>✕</button>
            </div>

            <div className="flex-1 p-6">
              <label className="block text-sm mb-2">Employee</label>
              <select
                value={employeeId}
                disabled={drawerMode === "view"}
                onChange={(e) => setEmployeeId(e.target.value)}
                className="w-full border px-4 py-3 rounded mb-6"
              >
                <option value="">Select employee</option>
                {employees.map((emp) => {
                  const value = emp._id || emp.id;
                  return (
                    <option key={value} value={value}>
                      {getEmployeeLabel(emp)}
                    </option>
                  );
                })}
              </select>

              <label className="block text-sm mb-2">Signature</label>
              <div className="border rounded p-4 flex justify-between items-center">
                <span>
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="" className="h-8" />
                  ) : (
                    "No file"
                  )}
                </span>

                {drawerMode !== "view" && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="border px-4 py-1 rounded"
                    >
                      Browse
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleSignatureUpload}
                    />
                  </>
                )}
              </div>
            </div>

            {drawerMode !== "view" && (
              <div className="p-6 flex justify-end border-t">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-8 py-2 rounded"
                >
                  Save
                </button>
              </div>
            )}
          </div>
          </div>,document.body
      )}
    </>
  );
};

export default AuthoritySignature;
