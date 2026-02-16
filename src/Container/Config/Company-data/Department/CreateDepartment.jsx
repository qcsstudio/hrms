import { useState } from "react";

const CreateDepartment = ({ onCancel }) => {
  const [departmentName, setDepartmentName] = useState("");
  const [partOfBU, setPartOfBU] = useState("no");
  const [subDept, setSubDept] = useState("no");
  const [assignHead, setAssignHead] = useState("no");

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Create Department</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="max-w-2xl space-y-6 bg-white p-6 rounded-lg border">

        {/* Department Name */}
        <div>
          <label className="text-sm font-semibold">
            Department Name
          </label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
            className="mt-2 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
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
                  value="yes"
                  checked={partOfBU === "yes"}
                  onChange={() => setPartOfBU("yes")}
                />
                Yes
              </label>
            </div>

            {partOfBU === "yes" && (
              <div className="pl-6">
                <label className="text-sm font-semibold">
                  Business Units
                </label>
                <select className="mt-2 w-full border rounded-md px-3 py-2">
                  <option>Select business unit</option>
                  <option>Mohali Office</option>
                  <option>Delhi Office</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  checked={partOfBU === "no"}
                  onChange={() => setPartOfBU("no")}
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
                  value="yes"
                  checked={subDept === "yes"}
                  onChange={() => setSubDept("yes")}
                />
                Yes
              </label>
            </div>

            {subDept === "yes" && (
              <div className="pl-6">
                <label className="text-sm font-semibold">
                  Department
                </label>
                <select className="mt-2 w-full border rounded-md px-3 py-2">
                  <option>Select department</option>
                  <option>Engineering</option>
                  <option>Marketing</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  checked={subDept === "no"}
                  onChange={() => setSubDept("no")}
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
                  value="yes"
                  checked={assignHead === "yes"}
                  onChange={() => setAssignHead("yes")}
                />
                Yes
              </label>
            </div>

            {assignHead === "yes" && (
              <div className="pl-6">
                <label className="text-sm font-semibold">
                  Assign Department Head
                </label>
                <select className="mt-2 w-full border rounded-md px-3 py-2">
                  <option>Select department head</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="no"
                  checked={assignHead === "no"}
                  onChange={() => setAssignHead("no")}
                />
                No
              </label>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={onCancel}
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