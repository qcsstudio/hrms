import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExtraTimeList() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);

  const policies = [
    {
      id: 1,
      name: "Attendance Policy",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "JD",
      assigned: ["A", "B", "C"],
      extraTimeStatus: ["Working Day", "Working Day"],
    },
    {
      id: 2,
      name: "Attendance Policy",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "AK",
      assigned: ["A", "B", "C"],
      extraTimeStatus: ["Working Day", "Working Day"],
    },
  ];

  const handleDelete = (id) => {
    alert("Delete policy id: " + id);
    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Concept of Extra Time
          </h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/track/Attendance/extra-time/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* TABS */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-200 rounded-lg p-1 w-fit">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                activeTab === tab
                  ? "bg-white shadow text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button className="text-sm bg-gray-100 px-4 py-2 rounded-lg text-gray-600">
          Clear ✕
        </button>
      </div>

      {/* TABLE HEADER */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] text-xs font-medium text-gray-500 px-4 py-2">
        <span>Policy Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Extra Time Status</span>
        <span>Action</span>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="bg-white border rounded-xl px-4 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] items-center"
          >
            {/* Policy Name */}
            <div>
              <p className="text-sm font-medium text-gray-800">
                {policy.name}
              </p>
              <p className="text-xs text-gray-400">{policy.date}</p>
            </div>

            {/* Created By Avatar */}
            <div>
              <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">
                {policy.createdBy}
              </div>
            </div>

            {/* Assigned Employees */}
            <div className="flex items-center">
              {policy.assigned.map((emp, index) => (
                <div
                  key={index}
                  className={`h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium text-white border-2 border-white ${
                    index !== 0 ? "-ml-2" : ""
                  }`}
                >
                  {emp}
                </div>
              ))}
              <div className="-ml-2 h-8 w-8 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
                +12
              </div>
            </div>

            {/* Extra Time Status */}
            <div className="flex flex-col gap-1">
              {policy.extraTimeStatus.map((status, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <span className="text-blue-600">✔</span>
                  {status}
                </div>
              ))}
            </div>

            {/* ACTION SECTION */}
            <div className="flex items-center justify-end gap-2 relative">
              
              {/* Edit */}
              <button
                onClick={() =>
                  navigate(`/track/extra-time/edit/${policy.id}`)
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
                      navigate(`/track/extra-time/view/${policy.id}`);
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