import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const workflowData = [
  {
    id: 1,
    name: "General Workflow",
    date: "12 Jun 2025 11:10 AM",
    assignedCount: 12,
  },
];

const ApprovalWorkflowList = () => {
  const [sort, setSort] = useState("");
  const [data, setData] = useState(workflowData);
  const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
  const handleClear = () => {
    setSort("");
    setData(workflowData);
  };

  const handleSort = (value) => {
    setSort(value);

    const sorted = [...workflowData].sort((a, b) => {
      if (value === "name") return a.name.localeCompare(b.name);
      if (value === "date") return new Date(a.date) - new Date(b.date);
      return 0;
    });

    setData(sorted);
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Approval Workflow</h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <Link to="/config/hris/Employee-data/approval-workflow/create">
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow">
            Create
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </Link>
      </div>

      {/* Sort & Clear */}
      <div className="flex items-center justify-between mb-6">
        <select
          value={sort}
          onChange={(e) => handleSort(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm"
        >
          <option value="">Sort by</option>
          <option value="name">Name</option>
          <option value="date">Date</option>
        </select>

        <button
          onClick={handleClear}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm"
        >
          Clear
          <span className="border border-gray-400 rounded-md px-1 text-xs">
            ✕
          </span>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-4 text-sm text-gray-500 font-medium px-6 pb-2">
        <div>Approval Workflow Name</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div className="text-right">Action</div>
      </div>

      {/* Card Rows */}
      {data.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-4 grid grid-cols-4 items-center"
        >
          {/* Name */}
          <div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-xs text-gray-400 mt-1">{item.date}</p>
          </div>

          {/* Created By Avatar */}
          <div>
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="user"
              className="w-10 h-10 rounded-full"
            />
          </div>

          {/* Assigned Employees */}
          <div className="flex items-center">
            <div className="flex -space-x-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/women/65.jpg"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <img
                src="https://randomuser.me/api/portraits/men/11.jpg"
                className="w-9 h-9 rounded-full border-2 border-white"
              />
              <div className="w-9 h-9 bg-black text-white text-xs flex items-center justify-center rounded-full border-2 border-white">
                +{item.assignedCount}
              </div>
            </div>
          </div>

          {/* Actions */}
      <div className="relative flex justify-end gap-3">
  {/* Edit Button */}
  <button
    onClick={() =>
      navigate(`/config/hris/Employee-data/approval-workflow/edit/${item.id}`)
    }
    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
    title="Edit"
  >
    ✏️
  </button>

  {/* More Button */}
  <button
    onClick={() => setOpenMenu((prev) => !prev)}
    className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 transition"
    title="More"
  >
    ⋮
  </button>

  {/* Dropdown Menu */}
  {openMenu && (
    <div className="absolute right-0 top-11 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
      <button
        onClick={() => {
          setOpenMenu(false);
          onDelete(item.id);
        }}
        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
      >
        🗑 Delete
      </button>
    </div>
  )}
</div>

        </div>
      ))}
    </div>
  );
};

export default ApprovalWorkflowList;
