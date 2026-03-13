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

const ViewGrade = () => {
  // Internal mock data
  const [gradeData] = useState({
    name: "Leap Of Faith",
    createdBy: "Admin",
    date: "12 Jun 2025  11:10 AM",
    assignedEmployees: [
      { name: "A B" },
      { name: "C D" },
      { name: "E F" },
      { name: "G H" },
      { name: "I J" },
      { name: "K L" },
      { name: "M N" },
    ],
  });

  const handleBack = () => {
    console.log("Back clicked");
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">View Grade</h1>
        <p className="mt-1 text-sm text-gray-500">Grade details</p>
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Grade Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{gradeData.name || "--"}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Created By</p>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
                {getInitials(gradeData.createdBy)}
              </div>
              <span className="text-sm text-gray-700">{gradeData.createdBy || "--"}</span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-400">Created On</p>
            <p className="mt-1 text-sm text-gray-700">{gradeData.date || "--"}</p>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/60">
          <p className="text-xs text-gray-400">Assigned Employees</p>
          {gradeData.assignedEmployees?.length > 0 ? (
            <>
              <div className="mt-2 flex -space-x-2">
                {gradeData.assignedEmployees.slice(0, 4).map((emp, index) => (
                  <div
                    key={index}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-blue-100 text-xs font-medium text-blue-700"
                    title={emp.name}
                  >
                    {getInitials(emp.name)}
                  </div>
                ))}

                {gradeData.assignedEmployees.length > 4 && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-gray-900 text-xs font-medium text-white">
                    +{gradeData.assignedEmployees.length - 4}
                  </div>
                )}
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {gradeData.assignedEmployees.map((emp) => emp.name).join(", ")}
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

export default ViewGrade;
