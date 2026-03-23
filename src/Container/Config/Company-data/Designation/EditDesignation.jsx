import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const token = localStorage.getItem("authToken");
const axiosInstance = createAxios(token);

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

// ── displayValue prop: shows the prefilled departmentName from getOne
// when no option.value matches departmentId (avoids showing placeholder)
const FormDivSelect = ({
  options = [],
  value,
  onSelect,
  placeholder = "Select",
  displayValue = "",
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

  // Priority: matched option label → prefilled name from getOne → placeholder
  const displayLabel = selectedOption?.label || displayValue || placeholder;
  const hasValue = !!(selectedOption || displayValue);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span className={hasValue ? "text-gray-900" : "text-gray-400"}>
          {displayLabel}
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
                  onSelect(option.value, option.label);
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

const EditDesignation = ({ onCancel, data }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [designationName, setDesignationName] = useState("");
  const [partOfDept, setPartOfDept] = useState("no");

  // ── departmentId → sent in payload + used for dropdown highlight match
  // ── departmentName → shown in dropdown button (from getOne directly)
  const [departmentId, setDepartmentId] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const [allDepartments, setAllDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch all departments for dropdown
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

  // ── Map to { value: _id, label: name }
  const departmentOptions = allDepartments.map((dept) => ({
    value: dept._id || dept.id,
    label: dept.name || dept.departmentName,
  }));

  // ── Fetch getOne designation on mount
  useEffect(() => {
    const fetchDesignation = async () => {
      if (data) { prefillForm(data); return; }

      const stateData = location.state?.designation;
      if (stateData) { prefillForm(stateData); return; }

      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/config/getOne-designation/${id}`);
        console.log(response,"responseresponseresponseresponse")
        const result = response.data;
        const designationData = result?.data || result?.designation || result;

        prefillForm(designationData);
      } catch (err) {
        console.error("Error fetching designation:", err);
        setError(err.message || "Failed to load designation data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignation();
  }, [id, data]);

  // ── prefillForm: departmentName already populated in getOne response
  // Set departmentName directly → shown in dropdown button via displayValue prop
  // Set departmentId → sent in update payload
  const prefillForm = (designationData) => {
    if (!designationData) return;

    // departmentName is already a plain string in getOne response — use directly
    const prefilledDeptName = designationData.departmentName || "";

    // departmentId may be plain string or populated object
    const prefilledDeptId =
      designationData.departmentId?._id ||
      designationData.departmentId ||
      "";

    setDesignationName(designationData.designationName || designationData.name || "");
    setPartOfDept(designationData.isPartOfDepartment ? "yes" : "no");
    setDepartmentId(prefilledDeptId);
    setDepartmentName(prefilledDeptName);
  };

  // ── When user picks a new dept from dropdown → update both id and name
  const handleDepartmentSelect = (selectedId, selectedLabel) => {
    setDepartmentId(selectedId);
    setDepartmentName(selectedLabel);
  };

  const handleCancel = () => {
    if (onCancel) { onCancel(); return; }
    navigate("/config/hris/Company_data/designation");
  };

  // ── Payload matches backend: designationName, isPartOfDepartment, departmentId, departmentName
  const handleUpdate = async () => {
    const designationId = id || data?.id || location.state?.designation?.id;

    if (!designationId) {
      console.error("No designation ID found for update.");
      return;
    }

    const payload = {
      designationName: designationName.trim(),
      isPartOfDepartment: partOfDept === "yes",
      departmentId: partOfDept === "yes" ? departmentId : null,
      departmentName: partOfDept === "yes" ? departmentName : "",
    };

    try {
      setUpdating(true);
      setError(null);

      const response = await axiosInstance.put(
        `/config/update-designation/${designationId}`,
        payload
      );
      console.log("Designation updated successfully:", response.data);
      navigate("/config/hris/Company_data/designation");
    } catch (err) {
      console.error("Error updating designation:", err);
      setError(err.message || "Failed to update designation.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Designation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {loading && (
        <div className="text-sm text-gray-500 mb-4">Loading designation data...</div>
      )}

      {error && (
        <div className="text-sm text-red-500 mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Designation Name</label>
          <input
            type="text"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            placeholder="Enter designation name"
            className={fieldClassName}
            disabled={loading}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">
            Is this Job Title only a part of specific functional Department?
          </p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                value="yes"
                checked={partOfDept === "yes"}
                onChange={() => setPartOfDept("yes")}
                disabled={loading}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {partOfDept === "yes" && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Department</label>
                {/*
                  value={departmentId}         → highlights matched option in list
                  displayValue={departmentName} → shows saved name in button (from getOne)
                  onSelect={handleDepartmentSelect} → updates both id + name on change
                */}
                <FormDivSelect
                  value={departmentId}
                  displayValue={departmentName}
                  onSelect={handleDepartmentSelect}
                  options={departmentOptions}
                  placeholder="Select department"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                value="no"
                checked={partOfDept === "no"}
                onChange={() => {
                  setPartOfDept("no");
                  setDepartmentId("");
                  setDepartmentName("");
                }}
                disabled={loading}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            disabled={updating}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            disabled={loading || updating}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition disabled:opacity-50"
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDesignation;