import { useState } from "react";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--";

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
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">View Team</h1>
        <p className="mt-1 text-sm text-gray-500">Team details</p>
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Team Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{teamData.name || "--"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Team Lead</p>
            <p className="mt-1 text-sm text-gray-700">{teamData.lead || "--"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Created By</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
                {getInitials(teamData.createdBy)}
              </div>
              <span className="text-sm text-gray-700">{teamData.createdBy || "--"}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400">Created On</p>
            <p className="mt-1 text-sm text-gray-700">{teamData.date || "--"}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/60">
          <p className="text-xs text-gray-400">Assigned Employees</p>
          {teamData.assignedEmployees?.length > 0 ? (
            <>
              <div className="mt-2 flex -space-x-2">
                {teamData.assignedEmployees.map((emp, index) => (
                  <div
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-blue-100 text-xs font-medium text-blue-700"
                    title={emp.name}
                  >
                    {getInitials(emp.name)}
                  </div>
                ))}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {teamData.assignedEmployees.map((emp) => emp.name).join(", ")}
              </div>
            </>
          ) : (
            <p className="mt-2 text-sm text-gray-500">No Employee Assigned</p>
          )}
        </div>

        <div className="flex justify-end pt-2">
          <button type="button" onClick={handleBack} className={flatSecondaryButtonClassName}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTeam;
