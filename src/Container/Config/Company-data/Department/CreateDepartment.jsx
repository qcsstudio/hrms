import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { FaAngleDown } from "react-icons/fa";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const FormDivSelect = ({ options = [], value, onSelect, placeholder = "Select" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-4 py-3 text-left text-sm shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                  isSelected
                    ? "bg-[#E8EDF4] text-[#111827] font-semibold"
                    : "text-[#1F2937] hover:bg-[#F4F7FB] active:bg-[#EDEFF4]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CreateDepartment = ({ onCancel }) => {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const navigate = useNavigate();

  const isEdit = location.state?.isEdit === true;
  const editData = location.state?.department || null;

  const [departmentName, setDepartmentName] = useState("");
  const [isPartOfBusinessUnit, setIsPartOfBusinessUnit] = useState(false);
  const [businessUnitId, setBusinessUnitId] = useState(null);
  const [isSubDepartment, setIsSubDepartment] = useState(false);
  const [parentDepartmentName, setParentDepartmentName] = useState(null);
  const [assignDepartmentHead, setAssignDepartmentHead] = useState(false);
  const [departmentHeadId, setDepartmentHeadId] = useState(null);
  const [departmentHead, setDepartmentHead] = useState(null);

  const [companyOfficeId, setCompanyOfficeId] = useState([]);

  const [businessUnitOptions, setBusinessUnitOptions] = useState([]);
  // Single source of truth — used for BOTH sub-dept and dept-head dropdowns
  const [allDepartments, setAllDepartments] = useState([]);

  const axiosInstance = createAxios(token);

  // ── Read companyOfficeId from localStorage (create mode only) ──────────────
  useEffect(() => {
    if (isEdit) return; // edit mode reads from editData, not localStorage
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Could be array or single string — normalise to array
        const ids = Array.isArray(parsed) ? parsed : [parsed];
        setCompanyOfficeId(ids);
      }
    } catch (e) {
      console.error("Failed to parse companyOfficeId from localStorage:", e);
    }
  }, []);

  // ── Fetch business units ─────────────────────────────────────────────────
  useEffect(() => {
    const fetchAllBusinessUnits = async () => {
      try {
        const response = await axiosInstance.get("/config/all-buinessUnit", {
          meta: { auth: "ADMIN_AUTH" },
        });
        const data = response?.data?.data || [];
        setBusinessUnitOptions(
          data.map((unit) => ({ value: unit._id, label: unit.businessUnitName }))
        );
      } catch (error) {
        console.error("Error fetching business units:", error);
      }
    };
    fetchAllBusinessUnits();
  }, []);

  // ── Fetch all departments — ONE call, used in BOTH dropdowns ─────────────
  useEffect(() => {
    const fetchAllDepartments = async () => {
      try {
        const response = await axiosInstance.get("/config/all-department", {
          meta: { auth: "ADMIN_AUTH" },
        });
        const data = response?.data?.data || [];
        setAllDepartments(data);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };
    fetchAllDepartments();
  }, []);

  // ── Pre-fill on edit ─────────────────────────────────────────────────────
  // Depends on BOTH editData AND allDepartments being loaded.
  // allDepartments must be loaded first so the dropdown can match the _id
  // and show the correct label instead of a blank/placeholder.
  useEffect(() => {
    if (!isEdit || !editData || !allDepartments.length) return;
    setDepartmentName(editData.departmentName || "");
    // In edit mode, companyOfficeId comes from saved record
    const existingOfficeIds = editData.companyOfficeId || [];
    setCompanyOfficeId(Array.isArray(existingOfficeIds) ? existingOfficeIds : [existingOfficeIds]);
    setIsPartOfBusinessUnit(!!editData.businessUnitId);
    setBusinessUnitId(editData.businessUnitId || null);
    setIsSubDepartment(!!editData.parentDepartmentName);
    setParentDepartmentName(editData.parentDepartmentName || null);

    // departmentHeadId from backend is a dept _id (ObjectId string).
    // Check it actually exists in allDepartments — if backend returns null
    // or a stale id that no longer exists, fall back to null gracefully.
    const headId = editData.departmentheadId || null;  // backend key is lowercase 'h'
    const headExists = headId
      ? allDepartments.some((d) => d._id === headId)
      : false;

    setAssignDepartmentHead(headExists);
    setDepartmentHeadId(headExists ? headId : null);
    setDepartmentHead(headExists ? (editData.departmentHead || null) : null);
  }, [isEdit, editData, allDepartments]);

  // ── Derived options from allDepartments ──────────────────────────────────

  // Sub-department dropdown → all departments
  const parentDepartmentOptions = allDepartments.map((dept) => ({
    value: dept.departmentName,
    label: dept.departmentName,
  }));

  // Assign Department Head dropdown → same data BUT exclude the selected parentDepartmentName
  // so the same department cannot appear in both fields at the same time
  const filteredDepartmentHeadOptions = allDepartments
    .filter((dept) =>
      !isSubDepartment || dept.departmentName !== parentDepartmentName
    )
    .map((dept) => ({
      value: dept._id,
      label: dept.departmentName,
    }));

  // ── Auto-clear dept head if it got filtered out ──────────────────────────
  useEffect(() => {
    if (!departmentHeadId) return;
    const stillAvailable = filteredDepartmentHeadOptions.some(
      (opt) => opt.value === departmentHeadId
    );
    if (!stillAvailable) {
      setDepartmentHeadId(null);
      setDepartmentHead(null);
    }
  }, [parentDepartmentName, isSubDepartment]);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleCancel = () => {
    if (onCancel) { onCancel(); return; }
    navigate("/config/hris/Company_data/department");
  };

  const handleDepartmentHeadSelect = (selectedId) => {
    // selectedId = dept._id (ObjectId string) from filteredDepartmentHeadOptions
    // Double-confirm by looking up in allDepartments directly
    const matched = allDepartments.find((d) => d._id === selectedId);
    const id = matched?._id || null;
    const name = matched?.departmentName || null;
    console.log("[DeptHead] selectedId:", selectedId, "| matched _id:", id, "| name:", name);
    setDepartmentHeadId(id);    // :white_check_mark: _id (ObjectId) → sent as departmentHeadId
    setDepartmentHead(name);    // :white_check_mark: departmentName string → sent as departmentHead
  };

  const handleSave = async () => {
    const payload = {
      departmentName,
      isPartOfBusinessUnit,
      businessUnitId: isPartOfBusinessUnit ? businessUnitId : null,
      isSubDepartment,
      parentDepartmentName: isSubDepartment ? parentDepartmentName : null,
      assignDepartmentHead,
      // departmentHeadId must be a dept _id (ObjectId). Only send if assignDepartmentHead=true AND id exists.
      companyOfficeId,                    // array of office ids from localStorage (create) or editData (edit)
      departmentheadId: assignDepartmentHead && departmentHeadId ? departmentHeadId : null,
      departmentHead: assignDepartmentHead && departmentHead ? departmentHead : null,
    };
    console.log("[handleSave] payload:", payload);

    try {
      if (isEdit) {
        await axiosInstance.put(`/config/update-department/${editData._id}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/create-department", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
        // Remove companyOfficeId from localStorage after successful create
        localStorage.removeItem("companyOfficeId");
      }
      navigate("/config/hris/Company_data/department");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Department" : "Create Department"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>
        {isEdit && (
          <button type="button" onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">

        {/* Department Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
            className={fieldClassName}
          />
        </div>

        {/* Business Unit */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Is this Department only a part of a specific Business Unit?
          </p>
          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={isPartOfBusinessUnit === true}
                onChange={() => setIsPartOfBusinessUnit(true)} />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            {isPartOfBusinessUnit && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Business Units</label>
                <FormDivSelect
                  value={businessUnitId}
                  onSelect={setBusinessUnitId}
                  options={businessUnitOptions}
                  placeholder="Select business unit"
                />
              </div>
            )}
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={isPartOfBusinessUnit === false}
                onChange={() => { setIsPartOfBusinessUnit(false); setBusinessUnitId(null); }} />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Sub-department */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Do you want this Department to be a sub-department of an existing department?
          </p>
          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={isSubDepartment === true}
                onChange={() => setIsSubDepartment(true)} />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            {isSubDepartment && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Department</label>
                {/* Source: /config/all-department */}
                <FormDivSelect
                  value={parentDepartmentName}
                  onSelect={setParentDepartmentName}
                  options={parentDepartmentOptions}
                  placeholder="Select department"
                />
              </div>
            )}
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={isSubDepartment === false}
                onChange={() => { setIsSubDepartment(false); setParentDepartmentName(null); }} />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Assign Department Head */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Do you want to assign a Department Head?
          </p>
          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={assignDepartmentHead === true}
                onChange={() => setAssignDepartmentHead(true)} />
              <span className="text-sm text-gray-700">Yes</span>
            </label>
            {assignDepartmentHead && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Assign Department Head</label>
                {/*
                  Source: /config/all-department (same as sub-dept dropdown).
                  The selected parentDepartmentName is excluded so both fields
                  can never show the same department simultaneously.
                */}
                <FormDivSelect
                  value={departmentHeadId}
                  onSelect={handleDepartmentHeadSelect}
                  options={filteredDepartmentHeadOptions}
                  placeholder="Select department head"
                />
              </div>
            )}
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input type="radio" checked={assignDepartmentHead === false}
                onChange={() => { setAssignDepartmentHead(false); setDepartmentHeadId(null); setDepartmentHead(null); }} />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition">
            Cancel
          </button>
          {!isEdit && (
            <button type="button" onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;