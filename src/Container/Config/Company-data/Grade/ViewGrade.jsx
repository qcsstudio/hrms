import { useState } from "react";

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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          View Grade
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Grade details
        </p>
      </div>

      <div className="space-y-5 max-w-2xl">
        
        {/* Card */}
        <div className="bg-white rounded-lg border p-5 space-y-4 shadow-sm">
          
          {/* Grade Name */}
          <div>
            <p className="text-xs text-gray-500">
              Grade Name
            </p>
            <p className="font-medium mt-1">
              {gradeData.name}
            </p>
          </div>

          {/* Created By */}
          <div>
            <p className="text-xs text-gray-500">
              Created By
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-semibold">
                {gradeData.createdBy.charAt(0)}
              </div>
              <span>{gradeData.createdBy}</span>
            </div>
          </div>

          {/* Created On */}
          <div>
            <p className="text-xs text-gray-500">
              Created On
            </p>
            <p className="mt-1">
              {gradeData.date}
            </p>
          </div>

          {/* Assigned Employees */}
          <div>
            <p className="text-xs text-gray-500">
              Assigned Employees
            </p>

            {/* Avatar Group */}
            <div className="mt-2 flex -space-x-2">
              {gradeData.assignedEmployees.slice(0, 4).map((emp, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-semibold border-2 border-white"
                  title={emp.name}
                >
                  {emp.name.charAt(0)}
                </div>
              ))}

              {gradeData.assignedEmployees.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
                  +{gradeData.assignedEmployees.length - 4}
                </div>
              )}
            </div>

            {/* Names List */}
            <div className="mt-2 text-sm text-gray-600">
              {gradeData.assignedEmployees
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

export default ViewGrade;