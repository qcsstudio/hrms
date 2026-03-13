import { createPortal } from "react-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";

const INITIAL_WORKFLOWS = [
  {
    id: 1,
    name: "General Workflow",
    createdBy: "Admin User",
    createdAt: "2025-06-12T11:10:00.000Z",
    assignedEmployees: [
      { name: "A B" },
      { name: "C D" },
      { name: "E F" },
      { name: "G H" },
      { name: "I J" },
      { name: "K L" },
    ],
  },
  {
    id: 2,
    name: "HRIS Escalation Workflow",
    createdBy: "Admin User",
    createdAt: "2025-06-18T09:30:00.000Z",
    assignedEmployees: [{ name: "M N" }, { name: "O P" }, { name: "Q R" }],
  },
];

const SORT_OPTIONS = [
  { value: "name", label: "Name (A-Z)" },
  { value: "date", label: "Date (Newest)" },
];

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--";

const formatDateTime = (value) => {
  if (!value) return "--";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date
    .toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};

const ApprovalWorkflowList = () => {
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [data, setData] = useState(INITIAL_WORKFLOWS);
  const [openMenu, setOpenMenu] = useState(null);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      if (!target.closest("[data-approval-menu]")) {
        setOpenMenu(null);
      }

      if (sortRef.current && !sortRef.current.contains(target)) {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCreate = () => {
    navigate("/config/hris/Employee-data/approval-workflow/create");
  };

  const handleClear = () => {
    setSort("");
    setData(INITIAL_WORKFLOWS);
    setOpenMenu(null);
    setIsSortOpen(false);
  };

  const handleSort = (value) => {
    setSort(value);
    setIsSortOpen(false);

    const sorted = [...data];
    if (value === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "date") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setData(sorted);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this workflow?");
    if (!confirmDelete) return;

    setData((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const sortLabel = useMemo(
    () => SORT_OPTIONS.find((option) => option.value === sort)?.label || "Sort by",
    [sort]
  );

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Approval Workflow</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCountryDialog(true)}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Create +
        </button>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div ref={sortRef} className="relative">
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="border flex items-center gap-2 border-gray-300 rounded-lg px-4 py-2 bg-white h-[40px] text-[#334155] shadow-none outline-none focus:outline-none focus:ring-0 transition hover:bg-gray-50 hover:translate-y-0"
          >
            {sortLabel}
            <FaAngleDown className={`${isSortOpen ? "rotate-180" : ""} transition-transform`} />
          </button>

          {isSortOpen && (
            <div className="absolute left-0 mt-2 w-[170px] rounded-lg border border-gray-200 bg-white shadow-none z-20 overflow-hidden">
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSort(option.value)}
                  className={`w-full text-left px-4 py-2.5 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                    sort === option.value
                      ? "bg-blue-50 text-[#111827] font-medium"
                      : "text-[#334155] hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <button type="button" onClick={handleClear} className={flatSecondaryButtonClassName}>
          Clear
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3.5 text-left font-medium">Approval Workflow Name</th>
              <th className="px-5 py-3.5 text-left font-medium">Created By</th>
              <th className="px-5 py-3.5 text-left font-medium">Assigned Employee</th>
              <th className="px-5 py-3.5 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500">
                  No approval workflows found.
                </td>
              </tr>
            )}

            {data.map((item) => {
              const assignedEmployees = Array.isArray(item.assignedEmployees)
                ? item.assignedEmployees
                : [];

              return (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/70">
                  <td className="px-5 py-4 align-middle">
                    <div className="text-sm font-medium text-gray-900">{item.name || "--"}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatDateTime(item.createdAt)}</div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                        {getInitials(item.createdBy)}
                      </div>
                      <span className="text-sm text-gray-700">{item.createdBy || "--"}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    {assignedEmployees.length > 0 ? (
                      <div className="flex -space-x-2">
                        {assignedEmployees.slice(0, 4).map((employee, index) => (
                          <div
                            key={`${item.id}-${employee.name}-${index}`}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-white flex items-center justify-center text-xs font-medium"
                            title={employee.name}
                          >
                            {getInitials(employee.name)}
                          </div>
                        ))}
                        {assignedEmployees.length > 4 && (
                          <div
                            className="w-8 h-8 rounded-full bg-gray-900 text-white border border-white flex items-center justify-center text-xs font-medium"
                            title={`${assignedEmployees.length - 4} more employees`}
                          >
                            +{assignedEmployees.length - 4}
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No Employee Assigned</span>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle text-right relative" data-approval-menu>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/config/hris/Employee-data/approval-workflow/edit/${item.id}`)
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-blue-600 hover:bg-blue-50 transition hover:translate-y-0"
                        title="Edit workflow"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpenMenu((prev) => (prev === item.id ? null : item.id))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-gray-900 hover:bg-gray-100 transition hover:translate-y-0"
                        title="More actions"
                      >
                        <HiOutlineDotsVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {openMenu === item.id && (
                      <div className="absolute right-5 top-12 w-36 overflow-hidden rounded-md border border-gray-200 bg-white divide-y divide-gray-100 z-20">
                        <button
                          type="button"
                          onClick={() => handleDelete(item.id)}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-600 bg-white shadow-none hover:shadow-none hover:bg-red-50 transition hover:translate-y-0"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showCountryDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowCountryDialog(false)}
            onContinue={handleCreate}
          />,
          document.body
        )}
    </div>
  );
};

export default ApprovalWorkflowList;
