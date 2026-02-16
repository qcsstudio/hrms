import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BusinessUnit = () => {
  const navigate = useNavigate();

  const initialData = [
    {
      id: 1,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "John Doe",
      assignedEmployees: [
        { name: "Alice Smith" },
        { name: "Bob Jones" },
        { name: "Carol White" },
        { name: "Dave Brown" },
      ],
      location: "Mohali Office",
      head: "XYZ______",
    },
    {
      id: 2,
      name: "Leap Of Faith",
      date: "12 Jun 2025  11:10 AM",
      createdBy: "Jane Smith",
      assignedEmployees: [],
      location: "Mohali Office",
      head: "XYZ______",
    },
  ];

  const [data, setData] = useState(initialData);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (unit) => {
    // Navigate to edit page
    navigate(`/config/hris/Company_data/edit-buisness-unit/${unit.id}`);
  };

  const handleCreate = () => {
    navigate("/config/hris/Company_data/create-buisness-unit");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Business Unit</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create +
        </button>
      </div>

      {/* Sort + Clear */}
      <div className="flex justify-between items-center mb-4">
        <select className="border px-4 py-2 rounded-md text-sm">
          <option>Sort by</option>
        </select>

        <button className="border px-4 py-2 rounded-md text-sm">
          Clear ✕
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Business Unit Name</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div>Location</div>
        <div>Business Unit Head</div>
        <div className="text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="space-y-3 mt-3">
        {data.map((unit) => (
          <div
            key={unit.id}
            className="grid grid-cols-6 items-center bg-white p-4 rounded-xl border shadow-sm"
          >
            {/* Name + Date */}
            <div>
              <p className="font-medium">{unit.name}</p>
              <p className="text-xs text-gray-400">{unit.date}</p>
            </div>

            {/* Created By */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                {unit.createdBy.charAt(0)}
              </div>
              <span className="text-sm">{unit.createdBy}</span>
            </div>

            {/* Assigned Employees */}
            <div>
              {unit.assignedEmployees.length > 0 ? (
                <div className="flex -space-x-2">
                  {unit.assignedEmployees.slice(0, 3).map((emp, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white"
                    >
                      {emp.name.charAt(0)}
                    </div>
                  ))}

                  {unit.assignedEmployees.length > 3 && (
                    <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs border-2 border-white">
                      +{unit.assignedEmployees.length - 3}
                    </div>
                  )}
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  No Employee Assigned
                </span>
              )}
            </div>

            {/* Location */}
            <div className="text-sm">{unit.location}</div>

            {/* Head */}
            <div className="text-sm">{unit.head}</div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(unit)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDelete(unit.id)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessUnit;