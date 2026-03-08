import { useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";

const policies = [
  {
    id: 1,
    name: "Attendance Policy",
    date: "12 Jun 2025  11:10 AM",
    assignedCount: 14,
    leaveTypes: "4",
  },
  {
    id: 2,
    name: "Work From Home",
    date: "12 Jun 2025  11:10 AM",
    assignedCount: 0,
    leaveTypes: "Time at Work",
  },
];

const LeavePolicyList = () => {
  const [tab, setTab] = useState("active");
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

    const [showCountryDialog, setShowCountryDialog] = useState(false);
    
     const handleCreate = () => {
      navigate("/config/track/leave/leave-policy/create");
    };

  const handleDelete = (id) => {
    alert("Delete policy id: " + id);
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Leave Policy
          </h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Create Button */}
        <button
          // onClick={() => navigate("/config/track/leave/leave-policy/create")}
          onClick={()=>setShowCountryDialog(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Create +
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-200 rounded-md p-1">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1.5 text-sm rounded-md ${
              tab === "active"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setTab("draft")}
            className={`px-4 py-1.5 text-sm rounded-md ${
              tab === "draft"
                ? "bg-white shadow text-gray-900"
                : "text-gray-500"
            }`}
          >
            Draft
          </button>
        </div>

        <button
          onClick={() => setTab("active")}
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          Clear ✕
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b text-gray-500">
              <th className="text-left px-4 py-3 font-medium">
                Policy Name
              </th>
              <th className="text-left px-4 py-3 font-medium">
                Created By
              </th>
              <th className="text-left px-4 py-3 font-medium">
                Assigned Employee
              </th>
              <th className="text-left px-4 py-3 font-medium">
                Leave Types
              </th>
              <th className="text-right px-4 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {policies.map((policy) => (
              <tr
                key={policy.id}
                className="border-b last:border-b-0 hover:bg-gray-50"
              >
                {/* Policy Name */}
                <td className="px-4 py-4">
                  <div className="font-medium text-gray-900">
                    {policy.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {policy.date}
                  </div>
                </td>

                {/* Created By */}
                <td className="px-4 py-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                </td>

                {/* Assigned Employee */}
                <td className="px-4 py-4 text-gray-600">
                  {policy.assignedCount > 0 ? (
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(3, policy.assignedCount))].map(
                        (_, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white"
                          ></div>
                        )
                      )}

                      {policy.assignedCount > 3 && (
                        <div className="w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center border-2 border-white">
                          +{policy.assignedCount - 3}
                        </div>
                      )}
                    </div>
                  ) : (
                    "No Employee Assigned"
                  )}
                </td>

                {/* Leave Types */}
                <td className="px-4 py-4 text-gray-600">
                  {policy.leaveTypes}
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-right">
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
                      ✏️
                    </button>

                    {/* 3 Dot */}
                    <button
                      onClick={() =>
                        setOpenMenu(
                          openMenu === policy.id ? null : policy.id
                        )
                      }
                      className="p-2 rounded-md hover:bg-gray-100"
                    >
                      ⋮
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
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
            {showCountryDialog && createPortal ( <CreateCountryPopup onClose={() => setShowCountryDialog(false)} onContinue={handleCreate}/>,document.body)}

    </div>
  );
};

export default LeavePolicyList;
