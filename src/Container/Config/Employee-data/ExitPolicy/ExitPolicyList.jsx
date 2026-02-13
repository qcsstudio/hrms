import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExitPolicyList = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      name: "15 Days",
      date: "12 Jun 2025 11:10 AM",
      createdBy: "https://randomuser.me/api/portraits/women/44.jpg",
      notice: 40,
      employees: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/68.jpg",
        "https://randomuser.me/api/portraits/men/75.jpg",
      ],
      extra: 12,
    },
    {
      id: 2,
      name: "IMMEDIATE",
      date: "12 Jun 2025 11:10 AM",
      createdBy: "https://randomuser.me/api/portraits/women/65.jpg",
      notice: 40,
      employees: [],
      extra: 0,
    },
  ];

  // ✅ EDIT
  const handleEdit = (item) => {
    navigate(`/config/hris/Employee-data/exitPolicy-edit/${item.id}`, {
      state: item,   // 👈 sending full data
    });
  };

  // ✅ VIEW
  const handleView = (item) => {
    navigate(`/config/hris/Employee-data/exitPolicy-view/${item.id}`, {
      state: item,   // 👈 sending full data
    });
  };

  const handleDelete = (item) => {
    console.log("Delete", item);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Exit Policy
        </h2>

        <button
          onClick={() =>
            navigate("/config/hris/Employee-data/exitPolicy/create")
          }
          className="bg-blue-600 text-white px-5 py-2.5 rounded-lg shadow hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border px-4 py-4 grid grid-cols-5 items-center"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-gray-400">{item.date}</p>
            </div>

            <div>
              <img
                src={item.createdBy}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>

            <div>{item.notice}</div>

            <div>
              {item.employees.length === 0
                ? "No Employee Assigned"
                : "Employees Assigned"}
            </div>

            <div className="flex justify-end gap-2">
              {/* Edit */}
              <button
                onClick={() => handleEdit(item)}
                className="px-3 py-1 bg-gray-100 rounded"
              >
                ✏️
              </button>

              {/* View */}
              <button
                onClick={() =>
                  setOpenMenu(openMenu === item.id ? null : item.id)
                }
                className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {openMenu === item.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => handleView(item)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => handleDelete(item)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
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

export default ExitPolicyList;
