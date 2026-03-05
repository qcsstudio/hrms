import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WeeklyOffList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");

  const policies = [
    {
      id: 1,
      name: "Attendance Policy",
      date: "12 Jun 2025 11:10 AM",
      createdBy: "JD",
      assigned: 12,
      version: 0,
    },
    {
      id: 2,
      name: "Attendance Policy",
      date: "12 Jun 2025 11:10 AM",
      createdBy: "AK",
      assigned: 12,
      version: 0,
    },
  ];

  return (
    <div className="p-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Weekly Off</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents and role-based actions.
          </p>
        </div>

        <button
         onClick={() =>
            navigate("/config/track/leave/weekly-off/create")
          }
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          Create +
        </button>
      </div>

      {/* ---------------- TABS ---------------- */}
      <div className="flex items-center gap-3 mt-6">
        {["Active", "Draft"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
              activeTab === tab
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}

        <button  className="ml-auto text-sm border px-4 py-1.5 rounded-lg text-gray-600">
          Clear ✕
        </button>
      </div>

      {/* ---------------- TABLE HEADER ---------------- */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-4 px-4 py-3 mt-6 text-sm text-gray-500 font-medium border-b">
        <span>Weekly-off Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span className="text-center">Version</span>
      </div>

      {/* ---------------- LIST ---------------- */}
      <div className="space-y-4 mt-4">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="grid grid-cols-[2fr_1fr_2fr_1fr] gap-4 items-center bg-white border rounded-xl px-4 py-4"
          >
            {/* Name */}
            <div>
              <p className="text-sm font-medium">{policy.name}</p>
              <p className="text-xs text-gray-400 mt-1">{policy.date}</p>
            </div>

            {/* Created By */}
            <div>
              <div className="h-9 w-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                {policy.createdBy}
              </div>
            </div>

            {/* Assigned Employees */}
            <div className="flex items-center -space-x-2">
              <div className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-gray-400 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-gray-500 border-2 border-white"></div>
              <div className="h-8 w-8 rounded-full bg-black text-white text-xs flex items-center justify-center border-2 border-white">
                +{policy.assigned}
              </div>
            </div>

            {/* Version Value (NO BUTTON) */}
            <div className="text-center text-sm font-medium text-gray-700">
              {policy.version}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}