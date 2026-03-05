import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- PAGE HEADER ---------------- */

function PageHeader({ title }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <button
        onClick={() => navigate("/config/track/leave/holiday-plan/create")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium"
      >
        Create +
      </button>
    </div>
  );
}

/* ---------------- TABS + CLEAR ---------------- */

function ListTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex bg-gray-100 p-1 rounded-xl">
        {["Active", "Draft"].map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <button className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">
        Clear ✕
      </button>
    </div>
  );
}

/* ---------------- AVATAR ---------------- */

function Avatar({ src }) {
  return (
    <div className="h-9 w-9 rounded-full overflow-hidden border">
      {src ? (
        <img src={src} alt="avatar" className="h-full w-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full bg-gray-200 text-xs font-medium">
          U
        </div>
      )}
    </div>
  );
}

/* ---------------- AVATAR GROUP ---------------- */

function AvatarGroup({ count }) {
  return (
    <div className="flex -space-x-3">
      <div className="h-9 w-9 rounded-full bg-gray-300 border-2 border-white"></div>
      <div className="h-9 w-9 rounded-full bg-gray-400 border-2 border-white"></div>
      <div className="h-9 w-9 rounded-full bg-gray-500 border-2 border-white"></div>
      <div className="h-9 w-9 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
        +{count}
      </div>
    </div>
  );
}

/* ---------------- MOCK DATA ---------------- */

const mockData = [
  {
    id: 1,
    name: "Attendance Policy",
    date: "12 Jun 2025   11:10 AM",
    assigned: 12,
  },
  {
    id: 2,
    name: "Attendance Policy",
    date: "12 Jun 2025   11:10 AM",
    assigned: 12,
  },
];

/* ---------------- MAIN COMPONENT ---------------- */

export default function HolidayPlanList() {
  const [activeTab, setActiveTab] = useState("Active");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm">
        <PageHeader title="Holiday Plan" />

        <ListTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Table Header */}
        <div className="grid grid-cols-4 text-sm font-medium text-gray-500 border-b pb-3 mt-6">
          <span>Holiday Plan Name</span>
          <span>Created By</span>
          <span>Assigned Employee</span>
          <span className="text-right">Action</span>
        </div>

        {/* Table Rows */}
        <div className="space-y-4 mt-4">
          {mockData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center bg-gray-50 rounded-xl border px-6 py-5 hover:shadow-sm transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item.date}
                </p>
              </div>

              <div>
                <Avatar />
              </div>

              <div>
                <AvatarGroup count={item.assigned} />
              </div>

              <div className="flex justify-end">
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded-lg">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}