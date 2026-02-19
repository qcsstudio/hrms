import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialMethods = [
  {
    id: 1,
    name: "Work From Office",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "JD",
    assignedCount: 15,
    trackingDevices: ["⚙️", "🖨️"],
    breakTracking: true,
  },
  {
    id: 2,
    name: "Work From Home",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "AK",
    assignedCount: 0,
    trackingDevices: ["🖥️", "📱"],
    breakTracking: false,
  },
];

export default function ClockInMethodList() {
  const navigate = useNavigate();

  const [methods, setMethods] = useState(initialMethods);
  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);

  /* ---------------- Delete Function ---------------- */
  const handleDelete = (id) => {
    const updated = methods.filter((item) => item.id !== id);
    setMethods(updated);
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Clock-in Method</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/track/Attendance/clock-in-method/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          Create <span className="text-lg">＋</span>
        </button>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                activeTab === tab
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="border px-4 py-1.5 rounded-lg flex items-center gap-2 text-sm hover:bg-gray-100 transition">
          Clear <span>✕</span>
        </button>
      </div>

      {/* ================= TABLE HEADER ================= */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_1fr_auto] text-xs font-medium text-gray-500 px-4 py-3 border-b">
        <span>Shift Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Tracking Device</span>
        <span>Break Tracking</span>
        <span className="text-right">Action</span>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-3 mt-3">
        {methods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_1fr_auto] items-center gap-4 hover:shadow-sm transition"
          >
            {/* Name */}
            <div>
              <p className="font-medium text-sm">{method.name}</p>
              <p className="text-xs text-gray-500">{method.date}</p>
            </div>

            {/* Created By */}
            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              {method.createdBy}
            </div>

            {/* Assigned Employees */}
            <div>
              {method.assignedCount > 0 ? (
                <div className="flex items-center">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full bg-gray-300 border-2 border-white"
                      />
                    ))}
                  </div>
                  {method.assignedCount > 3 && (
                    <span className="ml-2 text-sm text-gray-600">
                      +{method.assignedCount - 3}
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  No Employee Assigned
                </span>
              )}
            </div>

            {/* Tracking Devices */}
            <div className="flex gap-2 text-lg">
              {method.trackingDevices.map((icon, i) => (
                <span key={i}>{icon}</span>
              ))}
            </div>

            {/* Break Tracking */}
            <div className="text-lg">
              {method.breakTracking ? "✅" : "-"}
            </div>

            {/* ================= ACTIONS ================= */}
            <div className="flex items-center justify-end gap-2 relative">
              {/* Edit */}
              <button
                onClick={() =>
                  navigate(`config/track/Attendance/clock-in-method/edit/${method.id}`)
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✏️
              </button>

              {/* 3 Dot */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === method.id ? null : method.id)
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {openMenu === method.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={() => {
                      navigate(
                        `/config/track/Attendance/clock-in-method/view/${method.id}`
                      );
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => handleDelete(method.id)}
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