import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Department = () => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);

  const [data, setData] = useState([
    {
      id: 1,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      linkedBusinessUnit: "Mohali Office",
      createdBy: "Admin User",
      assignedEmployees: [
        { name: "A B" },
        { name: "C D" },
        { name: "E F" },
        { name: "G H" },
        { name: "I J" },
      ],
      head: "XYZ______",
    },
    {
      id: 2,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      linkedBusinessUnit: "Mohali Office",
      createdBy: "Admin User",
      assignedEmployees: [
        { name: "A B" },
        { name: "C D" },
        { name: "E F" },
        { name: "G H" },
        { name: "I J" },
      ],
      head: "XYZ______",
    },
  ]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Department</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/hris/Company_data/department/create")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create +
        </button>
      </div>

      {/* Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-sm text-gray-500">
            <tr className="text-left">
              <th className="px-4 py-3">Department Unit Name</th>
              <th className="px-4 py-3">Linked Business Units</th>
              <th className="px-4 py-3">Created By</th>
              <th className="px-4 py-3">Assigned Employee</th>
              <th className="px-4 py-3">Department Head Unit</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                {/* Name */}
                <td className="px-4 py-4">
                  <div className="font-medium">{item.name}</div>
                  <div className="text-xs text-gray-400">{item.date}</div>
                </td>

                {/* Linked Business Unit */}
                <td className="px-4 py-4">{item.linkedBusinessUnit}</td>

                {/* Created By */}
                <td className="px-4 py-4">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs">
                    {item.createdBy.charAt(0)}
                  </div>
                </td>

                {/* Assigned Employees */}
                <td className="px-4 py-4">
                  <div className="flex -space-x-2">
                    {item.assignedEmployees.slice(0, 4).map((emp, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs border"
                      >
                        {emp.name.charAt(0)}
                      </div>
                    ))}
                  </div>
                </td>

                {/* Head */}
                <td className="px-4 py-4">{item.head}</td>

                {/* Action Column */}
                <td className="px-4 py-4 text-right relative">
                  <div className="flex justify-end items-center gap-4">
                    {/* ✅ Edit Button (SVG) */}
                    <button
                      onClick={() =>
                        navigate(
                          `/config/Company_data/department/edit/${item.id}`,
                          {
                            state: { department: item },
                          },
                        )
                      }
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                        />
                      </svg>
                    </button>

                    {/* 3 Dot Button */}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === item.id ? null : item.id)
                      }
                      className="text-lg text-gray-600 hover:text-black"
                    >
                      ⋮
                    </button>
                  </div>

                  {/* Dropdown */}
                  {openMenu === item.id && (
                    <div className="absolute right-4 mt-2 w-32 bg-white border rounded-md shadow-md z-10">
                      {/* View */}
                      <button
                        onClick={() => {
                          navigate(
                            `/config/Company_data/department/view/${item.id}`,
                            {
                              state: { department: item },
                            },
                          );
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        👁 View
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(item.id)}
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

export default Department;
