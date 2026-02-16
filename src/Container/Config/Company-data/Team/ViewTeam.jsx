import { useState } from "react";

const ViewTeam = () => {
  // All data inside component
  const [teamData] = useState({
    name: "Design Team",
    lead: "TuPac",
    createdBy: "Admin User",
    date: "16 Feb 2026",
    assignedEmployees: [
      { name: "TuPac" },
      { name: "Jessi Pinkman" },
      { name: "John Wick" },
      { name: "Bruce Wayne" },
    ],
  });

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          View Team
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Team details
        </p>
      </div>

      <div className="space-y-5 max-w-2xl">

        {/* Card */}
        <div className="bg-white rounded-lg border p-5 space-y-4 shadow-sm">

          {/* Team Name */}
          <div>
            <p className="text-xs text-gray-500">
              Team Name
            </p>
            <p className="font-medium mt-1">
              {teamData.name}
            </p>
          </div>

          {/* Team Lead */}
          <div>
            <p className="text-xs text-gray-500">
              Team Lead
            </p>
            <p className="mt-1">
              {teamData.lead}
            </p>
          </div>

          {/* Created By */}
          <div>
            <p className="text-xs text-gray-500">
              Created By
            </p>
            <div className="mt-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
                {teamData.createdBy.charAt(0)}
              </div>
              <span>{teamData.createdBy}</span>
            </div>
          </div>

          {/* Created On */}
          <div>
            <p className="text-xs text-gray-500">
              Created On
            </p>
            <p className="mt-1">
              {teamData.date}
            </p>
          </div>

          {/* Assigned Employees */}
          <div>
            <p className="text-xs text-gray-500">
              Assigned Employees
            </p>

            <div className="mt-2 flex -space-x-2">
              {teamData.assignedEmployees.map((emp, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-xs font-semibold border-2 border-white"
                  title={emp.name}
                >
                  {emp.name.charAt(0)}
                </div>
              ))}
            </div>

            <div className="mt-2 text-sm text-gray-600">
              {teamData.assignedEmployees
                .map((emp) => emp.name)
                .join(", ")}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </button>
        </div>

      </div>
    </div>
  );
};

export default ViewTeam;