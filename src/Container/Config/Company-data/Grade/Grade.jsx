import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Grade = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const initialData = [
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
        { name: "M N" },
      ],
    },
    {
      id: 2,
      name: "Senior Grade",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "Admin",
      assignedEmployees: [
        { name: "A B" },
        { name: "C D" },
        { name: "E F" },
        { name: "G H" },
        { name: "I J" },
      ],
    },
  ];

  const [data, setData] = useState(initialData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Grade</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() =>
            navigate("/config/hris/Company_data/create-grade")
          }
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-sm text-gray-500 font-medium px-4 pb-3 border-b">
        <div>Grade Name</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div className="text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="space-y-4 mt-4">
        {data.map((g) => (
          <div
            key={g.id}
            className="grid grid-cols-4 items-center bg-white border rounded-lg px-4 py-4 shadow-sm relative"
          >

            {/* Grade Name */}
            <div>
              <div className="font-medium">{g.name}</div>
              <div className="text-xs text-gray-400 mt-1">{g.date}</div>
            </div>

            {/* Created By */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm">
                {g.createdBy.charAt(0)}
              </div>
            </div>

            {/* Assigned Employees */}
            <div className="flex -space-x-2">
              {g.assignedEmployees.slice(0, 4).map((emp, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs border-2 border-white"
                  title={emp.name}
                >
                  {emp.name.charAt(0)}
                </div>
              ))}
              {g.assignedEmployees.length > 4 && (
                <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-white">
                  +{g.assignedEmployees.length - 4}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end items-center gap-4 relative">

              {/* ✅ Edit SVG (Outside) */}
              <button
                onClick={() =>
                  navigate(
                    `/config/hris/Company_data/edit-grade/${g.id}`,
                    { state: { grade: g } }
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
                  setOpenMenu(openMenu === g.id ? null : g.id)
                }
                className="text-lg"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {openMenu === g.id && (
                <div className="absolute right-0 top-8 w-36 bg-white border rounded-md shadow-md z-10">

                  {/* View */}
                  <button
                    onClick={() => {
                      navigate(
                        `/config/hris/Company_data/view-grade/${g.id}`,
                        { state: { grade: g } }
                      );
                      setOpenMenu(null);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(g.id)}
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

export default Grade;