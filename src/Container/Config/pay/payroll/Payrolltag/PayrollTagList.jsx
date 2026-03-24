import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../../utils/axios.config";

const PayrollTagList = () => {
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [showDialog, setShowDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("Boolean");
  const [payrollTags, setPayrollTags] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getStoredOfficeIds = () => {
    const rawValue =
      localStorage.getItem("companyOfficeId") ||
      localStorage.getItem("officeId") ||
      "";

    if (!rawValue) return [];

    try {
      const parsed = JSON.parse(rawValue);
      if (Array.isArray(parsed)) {
        return parsed.filter((item) => typeof item === "string" && item.trim());
      }
      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim()];
      }
    } catch (error) {
      if (typeof rawValue === "string" && rawValue.trim()) {
        return [rawValue.trim()];
      }
    }

    return [];
  };

  const formatDate = (value) => {
    if (!value) return "-";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  const mapPayrollTag = (item = {}) => ({
    id: item?._id || item?.id || item?.tagName,
    name: item?.tagName || "-",
    createdDate: formatDate(item?.createdAt || item?.updatedAt),
    valueType: item?.valueType || "-",
    createdBy:
      item?.createdBy?.name ||
      item?.createdBy?.fullName ||
      item?.createdBy?.firstName ||
      item?.createdBy ||
      "Admin",
    assignedCount:
      item?.assignedCount ??
      item?.assignedEmployeeCount ??
      item?.employees?.length ??
      0,
  });

  const fetchPayrollTags = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/config/get-all/payrollTag", {
        meta: { auth: "ADMIN_AUTH" },
      });

      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.payrollTags)
        ? response.data.payrollTags
        : [];

      setPayrollTags(list.map(mapPayrollTag));
    } catch (error) {
      console.error("Error fetching payroll tags:", error);
      setPayrollTags([]);
      toast.error(error?.response?.data?.message || "Failed to fetch payroll tags");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayrollTags();
  }, []);

  const handleSave = async () => {
    if (!newName.trim()) {
      toast.error("Please enter tag name");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        tagName: newName.trim(),
        valueType: newType === "Boolean" ? "Boolean" : "Drop Down",
        companyOfficeId: getStoredOfficeIds(),
      };

      await axiosInstance.post("/config/create/payrollTag", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success("Payroll tag created successfully");
      setShowDrawer(false);
      setNewName("");
      setNewType("Boolean");
    } catch (error) {
      console.error("Error creating payroll tag:", error);
      toast.error(error?.response?.data?.message || "Failed to create payroll tag");
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = (selection = {}) => {
    setSelectedCountry(selection.country || "");
    setSelectedOffice(selection.office || "");
    setApplyAll(Boolean(selection.applyAll));
    setShowDialog(false);
    setShowDrawer(true);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Payroll Tag</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Payroll Tag Name</div>
        <div>Value Type</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        {/* <div className="text-right">Action</div> */}
      </div>

      <div className="space-y-4 mt-4">
        {loading && (
          <div className="py-10 text-center text-sm text-gray-500">Loading...</div>
        )}

        {!loading && payrollTags.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500">No data found</div>
        )}

        {!loading &&
          payrollTags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center"
            >
              <div>
                <p className="font-medium">{tag.name}</p>
                <p className="text-xs text-gray-400">{tag.createdDate}</p>
              </div>

              <div>{tag.valueType}</div>
              <div>{tag.createdBy}</div>
              <div>{tag.assignedCount} Employees</div>

              {/* <div className="flex justify-end" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setOpenMenu((prev) => (prev === tag.id ? null : tag.id))}
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  ...
                </button>
              </div> */}
            </div>
          ))}
      </div>

      {showDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowDialog(false)}
            onContinue={handleCreate}
          />,
          document.body
        )}

      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/30"
            onClick={() => setShowDrawer(false)}
          />

          <div className="w-[500px] bg-white h-full shadow-2xl p-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-semibold">Create Payroll Tag</h3>
              <button type="button" onClick={() => setShowDrawer(false)}>
                X
              </button>
            </div>

            <p className="text-gray-500 mb-6">
              Country: <strong>{selectedCountry || "-"}</strong>{" "}
              {applyAll ? "(All Offices)" : selectedOffice ? `- ${selectedOffice}` : ""}
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">Tag Name</label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">Value Type</label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 border rounded-xl px-4 py-3">
                  <input
                    type="radio"
                    value="Boolean"
                    checked={newType === "Boolean"}
                    onChange={(e) => setNewType(e.target.value)}
                  />
                  Boolean
                </label>

                <label className="flex items-center gap-3 border rounded-xl px-4 py-3">
                  <input
                    type="radio"
                    value="Drop Down"
                    checked={newType === "Drop Down"}
                    onChange={(e) => setNewType(e.target.value)}
                  />
                  Drop Down
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollTagList;
