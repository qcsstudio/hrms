import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Team = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "Admin",
      assignedEmployees: [
        { name: "A B" },
        { name: "C D" },
        { name: "E F" },
        { name: "G H" },
        { name: "I J" },
        { name: "K L" },
      ],
      lead: "TuPac",
    },
    {
      id: 2,
      name: "Development Team",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "Admin",
      assignedEmployees: [
        { name: "A B" },
        { name: "C D" },
        { name: "E F" },
        { name: "G H" },
        { name: "I J" },
        { name: "K L" },
      ],
      lead: "Jessi Pinkman",
    },
  ]);

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Team</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/config/hris/Company_data/create-team")
          }
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-left">
            <tr>
              <th className="p-4">Team Name</th>
              <th className="p-4">Created By</th>
              <th className="p-4">Assigned Employee</th>
              <th className="p-4">Team Lead</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((team) => (
              <tr key={team.id} className="border-t hover:bg-gray-50">

                {/* Team Name */}
                <td className="p-4">
                  <div className="font-medium">{team.name}</div>
                  <div className="text-xs text-gray-400">
                    {team.date}
                  </div>
                </td>

                {/* Created By */}
                <td className="p-4">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {getInitials(team.createdBy)}
                  </div>
                </td>

                {/* Assigned Employees */}
                <td className="p-4">
                  <div className="flex -space-x-2">
                    {team.assignedEmployees.slice(0, 4).map((emp, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-blue-100 border flex items-center justify-center text-xs font-medium"
                      >
                        {getInitials(emp.name)}
                      </div>
                    ))}
                    {team.assignedEmployees.length > 4 && (
                      <div className="w-8 h-8 rounded-full bg-black text-white text-xs flex items-center justify-center">
                        +{team.assignedEmployees.length - 4}
                      </div>
                    )}
                  </div>
                </td>

                {/* Team Lead */}
                <td className="p-4">{team.lead}</td>

                {/* Action Column */}
                <td className="p-4 text-right relative">
                  <div className="flex justify-end items-center gap-4">

                    {/* ✅ Edit SVG (Outside) */}
                    <button
                      onClick={() =>
                        navigate(
                          `/config/hris/Company_data/edit-team/${team.id}`,
                          { state: { team } }
                        )
                      }
                      className="text-gray-600 hover:text-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
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
                        setOpenMenu(openMenu === team.id ? null : team.id)
                      }
                      className="text-lg"
                    >
                      ⋮
                    </button>
                  </div>

                  {/* Dropdown */}
                  {openMenu === team.id && (
                    <div className="absolute right-4 mt-2 w-36 bg-white border rounded-md shadow-md z-10">

                      {/* View */}
                      <button
                        onClick={() => {
                          navigate(
                            `/config/hris/Company_data/view-team/${team.id}`,
                            { state: { team } }
                          );
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        👁 View
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(team.id)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        🗑 Delete
                      </button>

                    </div>
                  )}

                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Team;