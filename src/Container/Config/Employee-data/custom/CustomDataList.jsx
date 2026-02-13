import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const initialData = [
  {
    id: 1,
    name: "AAdhar Card",
    fields: "—",
    type: "Default",
    category: "Identity",
    status: "Active",
    active: true,
  },
  {
    id: 2,
    name: "AAdhar Card",
    fields: "—",
    type: "Default",
    category: "Identity",
    status: "Inactive",
    active: false,
  },
];

const CustomDataList = () => {
  const [data, setData] = useState(initialData);
  const [openMenu, setOpenMenu] = useState(null);
  const [openStatus, setOpenStatus] = useState(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
        setOpenStatus(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (item) => {
    console.log("Edit:", item);
  };

  const handleView = (item) => {
    console.log("View:", item);
  };

  const handleDelete = (item) => {
    console.log("Delete:", item);
  };

  // ✅ FIXED STATUS CHANGE
  const handleStatusChange = (index, status) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              status: status,
              active: status === "Active",
            }
          : item,
      ),
    );

    setOpenStatus(null);
  };

  return (
    <div className="min-h-screen bg-gray-100  p-5">
    

      {/* RIGHT CONTENT */}
      
        <div className="">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Add Custom Data</h1>
              <p className="text-sm text-gray-400">
                Manage employee directory, documents, and role-based actions.
              </p>
            </div>

            <Link to="/config/hris/Employee-data/custom-create">
              <button className="px-5 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2 hover:bg-blue-700">
                Create +
              </button>
            </Link>
          </div>

          {/* Table */}
          <div className="space-y-4">
            {/* Header Row */}
            <div className="grid grid-cols-7 text-sm text-gray-400 px-4">
              <div>Custom Data Name</div>
              <div>No of Fields</div>
              <div>Type</div>
              <div>Category</div>
              <div>Status</div>
              <div>Created By</div>
              <div className="text-right">In Use</div>
            </div>

            {data.map((item, index) => (
              <div
                key={item.id}
                className="bg-white border rounded-xl px-4 py-4 grid grid-cols-7 items-center shadow-sm"
                ref={menuRef}
              >
                <div className="font-medium">{item.name}</div>
                <div>{item.fields}</div>
                <div>{item.type}</div>
                <div>{item.category}</div>

                {/* STATUS DROPDOWN */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenStatus(openStatus === index ? null : index)
                    }
                    className={`font-semibold flex items-center gap-1 ${
                      item.active ? "text-blue-600" : "text-gray-600"
                    }`}
                  >
                    {item.status}
                    <span className="text-xs">▼</span>
                  </button>

                  {openStatus === index && (
                    <div className="absolute top-8 left-0 w-32 bg-white border rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => handleStatusChange(index, "Active")}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        Active
                      </button>
                      <button
                        onClick={() => handleStatusChange(index, "Inactive")}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        Inactive
                      </button>
                    </div>
                  )}
                </div>

                {/* Created By */}
                <div>
                  <div className="w-9 h-9 rounded-full bg-gray-300 overflow-hidden flex items-center justify-center text-xs font-bold">
                    U
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end">
                  <div className="flex items-center gap-2 relative">
                    {/* Edit */}
                    {/* Edit */}
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
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
                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                        />
                      </svg>
                    </button>

                    {/* Three dots */}
                    <button
                      onClick={() =>
                        setOpenMenu(openMenu === index ? null : index)
                      }
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    >
                      ⋮
                    </button>

                    {/* Dropdown */}
                    {openMenu === index && (
                      <div className="absolute right-0 top-10 w-36 bg-white border rounded-lg shadow-lg z-50">
                        <button
                          onClick={() => {
                            handleView(item);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          👁 View
                        </button>

                        <button
                          onClick={() => {
                            handleDelete(item);
                            setOpenMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    
    </div>
  );
};

export default CustomDataList;
