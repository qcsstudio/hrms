import { useState } from "react";
import { useNavigate } from "react-router-dom";

const policies = [
  {
    id: 1,
    name: "Attendance Policy",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "JD",
    assignedCount: 12,
    status: "Time at Work",
  },
  {
    id: 2,
    name: "Work From Home",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "AK",
    assignedCount: 0,
    status: "Time at Work",
  },
];

export default function AttendancePolicyList() {
  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    alert("Delete policy id: " + id);
    setOpenMenu(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Attendance Policy</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/track/Attendance/attendance-policy/create")}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* Tabs + Clear */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1 text-sm">
          <button
            onClick={() => setActiveTab("Active")}
            className={`px-4 py-1 rounded-md ${
              activeTab === "Active"
                ? "bg-white shadow text-black"
                : "text-gray-600"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveTab("Draft")}
            className={`px-4 py-1 rounded-md ${
              activeTab === "Draft"
                ? "bg-white shadow text-black"
                : "text-gray-600"
            }`}
          >
            Draft
          </button>
        </div>

        <button className="border px-3 py-1 text-xs rounded-md text-gray-600 hover:bg-gray-100">
          Clear ✕
        </button>
      </div>

      {/* Column Headers */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] gap-4 px-6 py-3 text-xs font-medium text-gray-500">
        <span>Policy Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Policy Status</span>
        <span>Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-3">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border rounded-xl px-6 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] gap-4 items-center shadow-sm"
          >
            {/* Policy Name */}
            <div>
              <p className="text-sm font-medium">{policy.name}</p>
              <p className="text-xs text-gray-500">{policy.date}</p>
            </div>

            {/* Created By */}
            <div>
              <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">
                {policy.createdBy}
              </div>
            </div>

            {/* Assigned Employee */}
            <div>
              {policy.assignedCount > 0 ? (
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    <div className="h-7 w-7 rounded-full bg-gray-300 border-2 border-white"></div>
                    <div className="h-7 w-7 rounded-full bg-gray-400 border-2 border-white"></div>
                    <div className="h-7 w-7 rounded-full bg-gray-500 border-2 border-white"></div>
                  </div>
                  <span className="ml-2 text-xs text-gray-600">
                    +{policy.assignedCount - 3}
                  </span>
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  No Employee Assigned
                </span>
              )}
            </div>

            {/* Status */}
            <div>
              <span className="text-sm">{policy.status}</span>
            </div>

            {/* ACTION SECTION */}
            <div className="flex items-center justify-end gap-2 relative">
              {/* Edit */}
              <button
                onClick={() =>
                  navigate(
                    `/config/track/Attendance/policy/edit/${policy.id}`
                  )
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Z"
                  />
                </svg>
              </button>

              {/* 3 Dot */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === policy.id ? null : policy.id)
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-gray-500"
                >
                  <circle cx="12" cy="5" r="1.5" />
                  <circle cx="12" cy="12" r="1.5" />
                  <circle cx="12" cy="19" r="1.5" />
                </svg>
              </button>

              {/* Dropdown */}
              {openMenu === policy.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">
                  {/* View */}
                  <button
                    onClick={() => {
                      navigate(
                        `/config/track/Attendance/policy/view/${policy.id}`
                      );
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(policy.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}