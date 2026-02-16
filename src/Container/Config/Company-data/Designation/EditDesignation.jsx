import React, { useState } from "react";

const EditDesignation = ({ onCancel, data }) => {
  const [designationName, setDesignationName] = useState(data?.name || "");
  const [partOfDept, setPartOfDept] = useState(
    data?.linkedDept ? "yes" : "no"
  );
  const [department, setDepartment] = useState(data?.linkedDept || "");

  const handleUpdate = () => {
    const payload = {
      designationName,
      partOfDepartment: partOfDept,
      department: partOfDept === "yes" ? department : null,
    };

    console.log("Updated Data:", payload);

    if (onCancel) onCancel();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Designation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update designation details.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border rounded-lg p-6 max-w-2xl space-y-6">
        
        {/* Designation Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Designation Name
          </label>
          <input
            type="text"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            placeholder="Enter designation name"
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Radio Section */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Is this Job Title only a part of specific functional Department?
          </label>

          {/* YES */}
          <div className="border rounded-lg p-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                checked={partOfDept === "yes"}
                onChange={(e) => setPartOfDept(e.target.value)}
              />
              Yes
            </label>

            {/* Department Dropdown */}
            {partOfDept === "yes" && (
              <div className="mt-4 pl-6">
                <label className="block text-sm font-medium mb-2">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>
            )}
          </div>

          {/* NO */}
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                checked={partOfDept === "no"}
                onChange={(e) => {
                  setPartOfDept("no");
                  setDepartment("");
                }}
              />
              No
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 border rounded-md text-sm"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDesignation;