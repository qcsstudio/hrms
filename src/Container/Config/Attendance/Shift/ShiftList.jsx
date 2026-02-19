import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShiftList = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);

  const [shifts, setShifts] = useState([
    {
      id: 1,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "JD",
      assignedCount: 15,
      time: "8:00AM to 6:30PM",
    },
    {
      id: 2,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "AK",
      assignedCount: 0,
      time: "XYZ______",
    },
  ]);

  const handleDelete = (id) => {
    setShifts(shifts.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Create Shifts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/track/Attendance/shift/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* Tabs + Clear */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1">
          {["Active", "Draft", "Me"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 rounded-md text-sm ${
                activeTab === tab
                  ? "bg-white shadow text-black"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="border px-4 py-2 rounded-md text-sm bg-white hover:bg-gray-100">
          Clear ✕
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Shift Name</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div>Shift Time</div>
        <div className="text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="space-y-4 mt-4">
        {shifts.map((shift) => (
          <div
            key={shift.id}
            className="relative bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] items-center"
          >

            {/* Shift Name */}
            <div>
              <p className="font-medium text-sm">{shift.name}</p>
              <p className="text-xs text-gray-400 mt-1">{shift.date}</p>
            </div>

            {/* Created By */}
            <div>
              <div className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">
                {shift.createdBy}
              </div>
            </div>

            {/* Assigned Employees */}
            <div>
              {shift.assignedCount > 0 ? (
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                  {shift.assignedCount > 4 && (
                    <div className="w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center border-2 border-white">
                      +{shift.assignedCount - 4}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  No Employee Assigned
                </span>
              )}
            </div>

            {/* Shift Time */}
            <div className="text-sm">{shift.time}</div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 relative">

              {/* Edit */}
              <button
                onClick={() =>
                  navigate(`/config/track/Attendance/shift/edit/${shift.id}`)
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
                  setOpenMenu(openMenu === shift.id ? null : shift.id)
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
              {openMenu === shift.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">

                  {/* View */}
                  <button
                    onClick={() => {
                      navigate(`/config/track/Attendance/shift/view/${shift.id}`);
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(shift.id)}
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
};

export default ShiftList;