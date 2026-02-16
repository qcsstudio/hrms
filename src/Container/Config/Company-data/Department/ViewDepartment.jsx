import React from "react";

const ViewDepartment = ({ onBack, data }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">View Department</h1>
        <p className="text-sm text-gray-500 mt-1">
          Department details
        </p>
      </div>

      {/* Card */}
      <div className="max-w-2xl bg-white border rounded-lg p-6 space-y-5">
        
        {/* Department Name */}
        <div>
          <p className="text-xs text-gray-500">Department Name</p>
          <p className="font-medium mt-1">{data.name}</p>
        </div>

        {/* Linked Business Unit */}
        <div>
          <p className="text-xs text-gray-500">Linked Business Unit</p>
          <p className="mt-1">{data.linkedBusinessUnit}</p>
        </div>

        {/* Department Head */}
        <div>
          <p className="text-xs text-gray-500">Department Head</p>
          <p className="mt-1">{data.head || "-"}</p>
        </div>

        {/* Created By */}
        <div>
          <p className="text-xs text-gray-500">Created By</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
              {data.createdBy ? data.createdBy.charAt(0) : "U"}
            </div>
            <span>{data.createdBy}</span>
          </div>
        </div>

        {/* Created On */}
        <div>
          <p className="text-xs text-gray-500">Created On</p>
          <p className="mt-1">{data.date}</p>
        </div>

        {/* Assigned Employees */}
        <div>
          <p className="text-xs text-gray-500">Assigned Employees</p>

          <div className="flex -space-x-2 mt-2">
            {data.assignedEmployees &&
              data.assignedEmployees.slice(0, 5).map((emp, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-300 border flex items-center justify-center text-xs font-medium"
                >
                  {emp.name.charAt(0)}
                </div>
              ))}

            {data.assignedEmployees &&
              data.assignedEmployees.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-black text-white border flex items-center justify-center text-xs">
                  +{data.assignedEmployees.length - 5}
                </div>
              )}
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={onBack}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;