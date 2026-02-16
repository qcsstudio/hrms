import { useState } from "react";

const EditDepartment = ({ onCancel, data }) => {
  const [departmentName, setDepartmentName] = useState(data?.name || "");
  const [partOfBU, setPartOfBU] = useState(
    data?.linkedBusinessUnit ? "yes" : "no"
  );
  const [subDept, setSubDept] = useState("no");
  const [assignHead, setAssignHead] = useState(
    data?.head ? "yes" : "no"
  );

  const [selectedBU, setSelectedBU] = useState(
    data?.linkedBusinessUnit || ""
  );
  const [selectedHead, setSelectedHead] = useState(
    data?.head || ""
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Edit Department</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update department details.
        </p>
      </div>

      <div className="max-w-2xl bg-white p-6 rounded-lg border space-y-6">

        {/* Department Name */}
        <div>
          <label className="text-sm font-semibold">
            Department Name
          </label>
          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="mt-2 w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Business Unit Section */}
        <div>
          <p className="text-sm font-semibold">
            Is this Department only a part of a specific Business Unit?
          </p>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
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
                <select
                  value={selectedBU}
                  onChange={(e) => setSelectedBU(e.target.value)}
                  className="mt-2 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select business unit</option>
                  <option value="Mohali Office">Mohali Office</option>
                  <option value="Delhi Office">Delhi Office</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
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
            Sub-department of an existing department?
          </p>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
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
                <select
                  value={selectedHead}
                  onChange={(e) => setSelectedHead(e.target.value)}
                  className="mt-2 w-full border rounded-md px-3 py-2"
                >
                  <option value="">Select head</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
            )}

            <div className="border rounded-lg p-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
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
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDepartment;