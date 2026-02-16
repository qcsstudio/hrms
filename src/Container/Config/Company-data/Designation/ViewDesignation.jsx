import React from "react";

const ViewDesignation = ({ onBack, data }) => {
  // Get initials helper
  const getInitials = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">View Designation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Designation details
        </p>
      </div>

      {/* Card */}
      <div className="bg-white border rounded-lg p-6 max-w-2xl space-y-6">
        
        {/* Designation Name */}
        <div>
          <p className="text-xs text-gray-500">Designation Name</p>
          <p className="font-medium mt-1">{data?.name}</p>
        </div>

        {/* Linked Department */}
        <div>
          <p className="text-xs text-gray-500">Linked Department</p>
          <p className="mt-1">{data?.linkedDept || "—"}</p>
        </div>

        {/* Created By */}
        <div>
          <p className="text-xs text-gray-500">Created By</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
              {getInitials(data?.createdBy)}
            </div>
            <span>{data?.createdBy}</span>
          </div>
        </div>

        {/* Created On */}
        <div>
          <p className="text-xs text-gray-500">Created On</p>
          <p className="mt-1">{data?.date}</p>
        </div>

        {/* Assigned Employees */}
        <div>
          <p className="text-xs text-gray-500">Assigned Employees</p>

          {data?.assignedEmployees?.length === 0 ? (
            <p className="mt-2 text-gray-400">No Employee Assigned</p>
          ) : (
            <div className="mt-3 flex -space-x-2">
              {data.assignedEmployees.slice(0, 5).map((emp, index) => (
                <div
                  key={index}
                  className="w-9 h-9 rounded-full bg-blue-100 border flex items-center justify-center text-xs font-medium"
                >
                  {getInitials(emp.name)}
                </div>
              ))}

              {data.assignedEmployees.length > 5 && (
                <div className="w-9 h-9 rounded-full bg-black text-white text-xs flex items-center justify-center">
                  +{data.assignedEmployees.length - 5}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Back Button */}
      <div className="flex justify-end max-w-2xl mt-6">
        <button
          onClick={onBack}
          className="px-4 py-2 border rounded-md text-sm"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewDesignation;