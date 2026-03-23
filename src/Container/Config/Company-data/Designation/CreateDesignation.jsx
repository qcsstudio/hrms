import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

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

const CreateDesignation = ({ onCancel }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = createAxios(token);

  const isEdit = location.state?.isEdit === true;
  // Get the id from navigation state — supports both _id and id keys
  const editId =
    location.state?.designation?._id ||
    location.state?.designation?.id ||
    null;

  const [designationName, setDesignationName] = useState("");
  const [partOfDept, setPartOfDept] = useState(false);
  const [departmentName, setDepartmentName] = useState(null);
  const [departmentId, setDepartmentId] = useState(null);
  const [companyOfficeId, setCompanyOfficeId] = useState([]);
  const [allDepartments, setAllDepartments] = useState([]);
  const [editLoading, setEditLoading] = useState(false);

  // ── Read companyOfficeId from localStorage (create mode only) ─────────────
  useEffect(() => {
    if (isEdit) return;
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        setCompanyOfficeId(Array.isArray(parsed) ? parsed : [parsed]);
      }
    } catch (e) {
      console.error("Failed to parse companyOfficeId from localStorage:", e);
    }
  }, []);

  // ── Fetch all departments for dropdown ────────────────────────────────────
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

  // ── Fetch designation from backend on edit — fresh data from API ──────────
  useEffect(() => {
    if (!isEdit || !editId || !allDepartments.length) return;

    const fetchDesignation = async () => {
      try {
        setEditLoading(true);
        const response = await axiosInstance.get(`/config/getOne-designation/${editId}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        const data = response?.data?.data || null;
        if (!data) return;

        // Pre-fill all fields from fresh API response
        setDesignationName(data.designationName || "");
        setPartOfDept(!!data.departmentId);

        // companyOfficeId from saved record
        const officeIds = data.companyOfficeId || [];
        setCompanyOfficeId(Array.isArray(officeIds) ? officeIds : [officeIds]);

        // Match department — try by _id first, fallback to name
        const deptId = data.departmentId || null;
        const deptName = data.departmentName || null;
        const matchedDept =
          allDepartments.find((d) => d._id === deptId) ||
          allDepartments.find((d) => d.departmentName === deptName);

        setDepartmentId(matchedDept?._id || null);
        setDepartmentName(matchedDept?.departmentName || null);
      } catch (error) {
        console.error("Error fetching designation for edit:", error);
      } finally {
        setEditLoading(false);
      }
    };

    fetchDesignation();
  }, [isEdit, editId, allDepartments]);

  // Department dropdown options
  const departmentOptions = allDepartments.map((dept) => ({
    value: dept.departmentName,
    label: dept.departmentName,
  }));

  const handleDepartmentSelect = (selectedName) => {
    const matched = allDepartments.find((d) => d.departmentName === selectedName);
    setDepartmentName(selectedName);
    setDepartmentId(matched?._id || null);
  };

  const handleCancel = () => {
    if (onCancel) { onCancel(); return; }
    if (window.history.length > 1) { navigate(-1); return; }
    navigate("/config/hris/Company_data/designation", { replace: true });
  };

  const handleSave = async () => {
    try {
      if (!designationName.trim()) return alert("Enter designation name");
      if (partOfDept && !departmentName) return alert("Select department");

      const payload = {
        designationName: designationName.trim(),
        isPartOfDepartment: partOfDept,
        departmentId: partOfDept ? departmentId : null,
        departmentName: partOfDept ? departmentName : null,
        companyOfficeId,
      };

      if (isEdit) {
        await axiosInstance.put(`/config/update-designation/${editId}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/create-designation", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
        localStorage.removeItem("companyOfficeId");
      }

      navigate("/config/hris/Company_data/designation");
    } catch (error) {
      console.error(error?.response?.data || error?.message);
      alert("Error saving designation");
    }
  };

  if (editLoading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[300px]">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Designation" : "Create Designation"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>
        {isEdit && (
          <button type="button" onClick={handleSave} className={flatPrimaryButtonClassName}>
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">

        {/* Designation Name */}
        <div>
          <label className="text-sm font-medium text-gray-700">Designation Name</label>
          <input
            type="text"
            placeholder="Enter designation name"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            className={fieldClassName}
          />
        </div>

        {/* Part of Department */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Is this Job Title only a part of specific functional Department?
          </p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={partOfDept === true}
                onChange={() => setPartOfDept(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {partOfDept && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <FormDivSelect
                  value={departmentName}
                  onSelect={handleDepartmentSelect}
                  options={departmentOptions}
                  placeholder="Select department"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={partOfDept === false}
                onChange={() => {
                  setPartOfDept(false);
                  setDepartmentName(null);
                  setDepartmentId(null);
                }}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button type="button" onClick={handleCancel} className={flatSecondaryButtonClassName}>
            Cancel
          </button>
          {!isEdit && (
            <button type="button" onClick={handleSave} className={flatPrimaryButtonClassName}>
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDesignation;