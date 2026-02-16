import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewBusinessUnit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If data passed through navigate state
  const data = location.state || {
    name: "Leap Of Faith",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "John Doe",
    assignedEmployees: [
      { name: "Alice Smith" },
      { name: "Bob Jones" },
      { name: "Carol White" },
      { name: "Dave Brown" },
    ],
    location: "Mohali Office",
    head: "XYZ______",
  };

  const handleBack = () => {
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">View Business Unit</h1>
        <p className="text-sm text-gray-500 mt-1">
          Business unit details
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* Card */}
        <div className="bg-white rounded-xl border shadow-sm p-6 space-y-5">

          {/* Business Unit Name */}
          <div>
            <p className="text-xs text-gray-400">Business Unit Name</p>
            <p className="font-medium mt-1">{data.name}</p>
          </div>

          {/* Location */}
          <div>
            <p className="text-xs text-gray-400">Location</p>
            <p className="mt-1">{data.location}</p>
          </div>

          {/* Business Unit Head */}
          <div>
            <p className="text-xs text-gray-400">Business Unit Head</p>
            <p className="mt-1">{data.head || "Not Assigned"}</p>
          </div>

          {/* Created By */}
          <div>
            <p className="text-xs text-gray-400">Created By</p>
            <div className="flex items-center gap-3 mt-2">
              <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">
                {data.createdBy.charAt(0)}
              </div>
              <span>{data.createdBy}</span>
            </div>
          </div>

          {/* Created On */}
          <div>
            <p className="text-xs text-gray-400">Created On</p>
            <p className="mt-1">{data.date}</p>
          </div>

          {/* Assigned Employees */}
          <div>
            <p className="text-xs text-gray-400">Assigned Employees</p>

            {data.assignedEmployees.length > 0 ? (
              <div className="flex -space-x-2 mt-2">
                {data.assignedEmployees.slice(0, 5).map((emp, index) => (
                  <div
                    key={index}
                    className="w-9 h-9 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs border-2 border-white"
                  >
                    {emp.name.charAt(0)}
                  </div>
                ))}

                {data.assignedEmployees.length > 5 && (
                  <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
                    +{data.assignedEmployees.length - 5}
                  </div>
                )}
              </div>
            ) : (
              <p className="mt-2 text-sm text-gray-500">
                No Employees Assigned
              </p>
            )}
          </div>

        </div>

        {/* Back Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleBack}
            className="px-6 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewBusinessUnit;