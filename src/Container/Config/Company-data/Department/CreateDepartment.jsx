import { useState } from "react";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const CreateDepartment = ({ onCancel }) => {
  const { token} = useSelector((state) => state.user);
  const [departmentName, setDepartmentName] = useState("");

  const [isPartOfBusinessUnit, setIsPartOfBusinessUnit] = useState(false);
  const [businessUnitId, setBusinessUnitId] = useState(null);

  const [isSubDepartment, setIsSubDepartment] = useState(false);
  const [parentDepartmentName, setParentDepartmentName] = useState(null);

  const [assignDepartmentHead, setAssignDepartmentHead] = useState(false);
  const [departmentHead, setDepartmentHead] = useState(null);

  const axiosInstance = createAxios(token)

  const handleSave = async () => {
    const payload = {
      departmentName,
      isPartOfBusinessUnit,
      businessUnitId: isPartOfBusinessUnit ? businessUnitId : "5fa11111111111111111111",
      isSubDepartment,
      parentDepartmentName: isSubDepartment ? parentDepartmentName : "IT Department",
      assignDepartmentHead,
      departmentHead: assignDepartmentHead ? departmentHead : "John Doe",
    };

    try {
      const res = await axiosInstance.post(
        "/config/create-department",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      console.log("Department created successfully:", res.data);
    } catch (error) {
      console.error("Error creating department:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Department</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-lg border">

        {/* Department Name */}
        <div>
          <label className="text-sm font-semibold">Department Name</label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
            className="mt-2 w-full border rounded-md px-3 py-2"
          />
        </div>

        {/* Business Unit */}
        <div>
          <p className="text-sm font-semibold">
            Is this Department only a part of a specific Business Unit?
          </p>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isPartOfBusinessUnit === true}
                  onChange={() => setIsPartOfBusinessUnit(true)}
                />
                Yes
              </label>
            </div>

            {isPartOfBusinessUnit && (
              <div className="pl-6">
                <label className="text-sm font-semibold">Business Units</label>
                <select
                  value={businessUnitId ?? ""}
                  onChange={(e) => setBusinessUnitId(e.target.value)}
                  className="mt-2 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select business unit</option>
                  <option value="65fa11111111111111111111">Mohali Office</option>
                  <option value="65fa22222222222222222222">Delhi Office</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isPartOfBusinessUnit === false}
                  onChange={() => {
                    setIsPartOfBusinessUnit(false);
                    setBusinessUnitId(null);
                  }}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Sub Department */}
        <div>
          <p className="text-sm font-semibold">
            Do you want this Department to be a sub-department of an existing department?
          </p>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isSubDepartment === true}
                  onChange={() => setIsSubDepartment(true)}
                />
                Yes
              </label>
            </div>

            {isSubDepartment && (
              <div className="pl-6">
                <label className="text-sm font-semibold">Department</label>
                <select
                  value={parentDepartmentName ?? ""}
                  onChange={(e) => setParentDepartmentName(e.target.value)}
                  className="mt-2 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={isSubDepartment === false}
                  onChange={() => {
                    setIsSubDepartment(false);
                    setParentDepartmentName(null);
                  }}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Assign Head */}
        <div>
          <p className="text-sm font-semibold">
            Do you want to assign a Department Head?
          </p>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={assignDepartmentHead === true}
                  onChange={() => setAssignDepartmentHead(true)}
                />
                Yes
              </label>
            </div>

            {assignDepartmentHead && (
              <div className="pl-6">
                <label className="text-sm font-semibold">
                  Assign Department Head
                </label>
                <select
                  value={departmentHead ?? ""}
                  onChange={(e) => setDepartmentHead(e.target.value)}
                  className="mt-2 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select department head</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={assignDepartmentHead === false}
                  onChange={() => {
                    setAssignDepartmentHead(false);
                    setDepartmentHead(null);
                  }}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button onClick={onCancel} className="px-4 py-2 border rounded-md">
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateDepartment;
