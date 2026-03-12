import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { FaAngleDown } from "react-icons/fa";

const DEFAULT_BUSINESS_UNIT_ID = "5fa11111111111111111111";
const DEFAULT_PARENT_DEPARTMENT = "IT Department";
const DEFAULT_DEPARTMENT_HEAD = "John Doe";
const BUSINESS_UNIT_OPTIONS = [
  { value: "65fa11111111111111111111", label: "Mohali Office" },
  { value: "65fa22222222222222222222", label: "Delhi Office" },
];
const PARENT_DEPARTMENT_OPTIONS = [
  { value: "Engineering", label: "Engineering" },
  { value: "Marketing", label: "Marketing" },
];
const DEPARTMENT_HEAD_OPTIONS = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" },
];

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const FormDivSelect = ({
  options = [],
  value,
  onSelect,
  placeholder = "Select",
}) => {
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
          className={`text-[12px] text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
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
  const [businessUnitId, setBusinessUnitId] = useState(DEFAULT_BUSINESS_UNIT_ID);
  const [isSubDepartment, setIsSubDepartment] = useState(false);
  const [parentDepartmentName, setParentDepartmentName] = useState(DEFAULT_PARENT_DEPARTMENT);
  const [assignDepartmentHead, setAssignDepartmentHead] = useState(false);
  const [departmentHead, setDepartmentHead] = useState(DEFAULT_DEPARTMENT_HEAD);

  const axiosInstance = createAxios(token);

  useEffect(() => {
    if (!isEdit || !editData) return;

    setDepartmentName(editData.name || "");
    setIsPartOfBusinessUnit(!!editData.businessUnitId);
    setBusinessUnitId(editData.businessUnitId || DEFAULT_BUSINESS_UNIT_ID);
    setIsSubDepartment(!!editData.parentDepartmentName);
    setParentDepartmentName(editData.parentDepartmentName || DEFAULT_PARENT_DEPARTMENT);
    setAssignDepartmentHead(!!editData.head);
    setDepartmentHead(editData.head || DEFAULT_DEPARTMENT_HEAD);
  }, [isEdit, editData]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/config/hris/Company_data/department");
  };

  const handleSave = async () => {
    const payload = {
      departmentName,
      isPartOfBusinessUnit,
      businessUnitId: isPartOfBusinessUnit ? businessUnitId : DEFAULT_BUSINESS_UNIT_ID,
      isSubDepartment,
      parentDepartmentName: isSubDepartment ? parentDepartmentName : DEFAULT_PARENT_DEPARTMENT,
      assignDepartmentHead,
      departmentHead: assignDepartmentHead ? departmentHead : DEFAULT_DEPARTMENT_HEAD,
    };

    try {
      if (isEdit) {
        await axiosInstance.put(`/config/update-department/${editData.id}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/all-department", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      navigate("/config/hris/Company_data/department");
    } catch (error) {
      console.error("Error saving department:", error);
    }
  };

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
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200">
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

        <div>
          <p className="text-sm font-medium text-gray-700">
            Is this Department only a part of a specific Business Unit?
          </p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={isPartOfBusinessUnit === true}
                onChange={() => setIsPartOfBusinessUnit(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {isPartOfBusinessUnit && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Business Units</label>
                <FormDivSelect
                  value={businessUnitId}
                  onSelect={setBusinessUnitId}
                  options={BUSINESS_UNIT_OPTIONS}
                  placeholder="Select business unit"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={isPartOfBusinessUnit === false}
                onChange={() => {
                  setIsPartOfBusinessUnit(false);
                  setBusinessUnitId(DEFAULT_BUSINESS_UNIT_ID);
                }}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">
            Do you want this Department to be a sub-department of an existing department?
          </p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={isSubDepartment === true}
                onChange={() => setIsSubDepartment(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {isSubDepartment && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <FormDivSelect
                  value={parentDepartmentName}
                  onSelect={setParentDepartmentName}
                  options={PARENT_DEPARTMENT_OPTIONS}
                  placeholder="Select department"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={isSubDepartment === false}
                onChange={() => {
                  setIsSubDepartment(false);
                  setParentDepartmentName(DEFAULT_PARENT_DEPARTMENT);
                }}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">
            Do you want to assign a Department Head?
          </p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={assignDepartmentHead === true}
                onChange={() => setAssignDepartmentHead(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {assignDepartmentHead && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Assign Department Head</label>
                <FormDivSelect
                  value={departmentHead}
                  onSelect={setDepartmentHead}
                  options={DEPARTMENT_HEAD_OPTIONS}
                  placeholder="Select department head"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                checked={assignDepartmentHead === false}
                onChange={() => {
                  setAssignDepartmentHead(false);
                  setDepartmentHead(DEFAULT_DEPARTMENT_HEAD);
                }}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {!isEdit && (
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateDepartment;
