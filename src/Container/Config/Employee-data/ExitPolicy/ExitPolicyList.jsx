import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import AssignedEmployeesDrawer from "../../Company-data/Department/AssignedEmployeesDrawer";

const EXIT_POLICY_CREATE_ROUTE = "/config/hris/Employee-data/exitPolicy/create";

const TAB_OPTIONS = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
];

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const initialPolicies = [
  {
    id: 1,
    name: "15 Days",
    status: "active",
    date: "12 Jun 2025 11:10 AM",
    createdByName: "Aanya Sharma",
    createdByImage: "https://randomuser.me/api/portraits/women/44.jpg",
    notice: 40,
    employees: [
      { name: "Rohan Mehta" },
      { name: "Pooja Saini" },
      { name: "Kunal Verma" },
      { name: "Sneha Arora" },
    ],
  },
  {
    id: 2,
    name: "Immediate Exit",
    status: "draft",
    date: "12 Jun 2025 11:10 AM",
    createdByName: "Neha Kapoor",
    createdByImage: "https://randomuser.me/api/portraits/women/65.jpg",
    notice: 0,
    employees: [],
  },
];

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--";

const ExitPolicyList = () => {
  const [tab, setTab] = useState("active");
  const [policies, setPolicies] = useState(initialPolicies);
  const [openMenu, setOpenMenu] = useState(null);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [isAssignedDrawerOpen, setIsAssignedDrawerOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-exit-policy-menu]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate(EXIT_POLICY_CREATE_ROUTE);
  };

  const handleEdit = (item) => {
    navigate(`/config/hris/Employee-data/exitPolicy-edit/${item.id}`, {
      state: item,
    });
  };

  const handleView = (item) => {
    navigate(`/config/hris/Employee-data/exitPolicy-view/${item.id}`, {
      state: item,
    });
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.name}"?`
    );

    if (!confirmDelete) {
      return;
    }

    setPolicies((prev) => prev.filter((policy) => policy.id !== item.id));
    setOpenMenu(null);
  };

  const clearFilters = () => {
    setTab("active");
    setOpenMenu(null);
  };

  const openAssignedEmployeesDrawer = (item) => {
    setSelectedPolicy({
      name: item.name || "Exit Policy",
      assignedEmployees: item.employees || [],
    });
    setIsAssignedDrawerOpen(true);
  };

  const closeAssignedEmployeesDrawer = () => {
    setIsAssignedDrawerOpen(false);
  };

  const filteredPolicies = policies.filter((item) => item.status === tab);

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Exit Policy</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage exit policies, assigned employees, and policy actions from
              one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCountryDialog(true)}
            className="inline-flex h-10 items-center justify-center rounded-lg bg-blue-600 px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-blue-700 hover:shadow-none"
          >
            Create +
          </button>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex rounded-[9px] border border-[#DEE2E6] bg-[#F4F4F5] px-1 py-1 gap-2">
            {TAB_OPTIONS.map((option) => {
              const isActive = tab === option.key;

              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setTab(option.key)}
                  className={`rounded-lg border-none px-4 py-2 shadow-none outline-none transition-colors focus:outline-none focus:ring-0 ${
                    isActive
                      ? "border border-[#E5E7EB] bg-white text-[#212529] shadow-sm"
                      : "bg-transparent text-[#6B7280]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={clearFilters}
            className={flatSecondaryButtonClassName}
          >
            Clear
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="px-5 py-3.5 text-left font-medium">
                  Exit Policy Name
                </th>
                <th className="px-5 py-3.5 text-left font-medium">Created By</th>
                <th className="px-5 py-3.5 text-left font-medium">
                  Assigned Employee
                </th>
                <th className="px-5 py-3.5 text-left font-medium">
                  Notice Period
                </th>
                <th className="px-5 py-3.5 text-left font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPolicies.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-8 text-center text-sm text-gray-500"
                  >
                    No exit policies found in this status.
                  </td>
                </tr>
              )}

              {filteredPolicies.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4 align-middle">
                    <div className="text-sm font-medium text-gray-900">
                      {item.name}
                    </div>
                    <div className="mt-0.5 text-xs text-gray-400">{item.date}</div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      {item.createdByImage ? (
                        <img
                          src={item.createdByImage}
                          alt={item.createdByName}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
                          {getInitials(item.createdByName)}
                        </div>
                      )}
                      <span className="text-sm text-gray-700">
                        {item.createdByName}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    {item.employees.length === 0 ? (
                      <span className="text-gray-400">No Employee Assigned</span>
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="flex -space-x-2">
                          {item.employees.slice(0, 3).map((employee, index) => (
                            <div
                              key={`${item.id}-${employee.name}-${index}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-blue-100 text-xs font-medium text-blue-700"
                              title={employee.name}
                            >
                              {getInitials(employee.name)}
                            </div>
                          ))}
                          {item.employees.length > 3 && (
                            <button
                              type="button"
                              onClick={() => openAssignedEmployeesDrawer(item)}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-gray-900 text-xs font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-black hover:shadow-none"
                              title="View assigned employees"
                            >
                              +{item.employees.length - 3}
                            </button>
                          )}
                        </div>
                        <span className="text-sm text-gray-700">
                          {item.employees.length} Employee
                          {item.employees.length > 1 ? "s" : ""} Assigned
                        </span>
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle text-gray-700">
                    {item.notice} Days
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        item.status === "active"
                          ? "bg-[#ECFDF3] text-[#027A48]"
                          : "bg-[#FFF7E8] text-[#B54708]"
                      }`}
                    >
                      {item.status === "active" ? "Active" : "Draft"}
                    </span>
                  </td>

                  <td
                    className="relative px-5 py-4 align-middle text-right"
                    data-exit-policy-menu
                  >
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none transition hover:translate-y-0 hover:bg-blue-50 hover:text-blue-600 hover:shadow-none"
                        title="Edit exit policy"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setOpenMenu((prev) => (prev === item.id ? null : item.id))
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none transition hover:translate-y-0 hover:bg-gray-100 hover:text-gray-900 hover:shadow-none"
                        title="More actions"
                      >
                        <HiOutlineDotsVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {openMenu === item.id && (
                      <div className="absolute right-5 top-12 z-20 w-36 overflow-hidden rounded-md border border-gray-200 bg-white divide-y divide-gray-100">
                        <button
                          type="button"
                          onClick={() => {
                            handleView(item);
                            setOpenMenu(null);
                          }}
                          className="w-full bg-white px-4 py-2.5 text-left text-sm font-medium text-gray-700 shadow-none transition hover:translate-y-0 hover:bg-gray-50 hover:shadow-none"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(item)}
                          className="w-full bg-white px-4 py-2.5 text-left text-sm font-medium text-red-600 shadow-none transition hover:translate-y-0 hover:bg-red-50 hover:shadow-none"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
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

        <AssignedEmployeesDrawer
          isOpen={isAssignedDrawerOpen}
          onClose={closeAssignedEmployeesDrawer}
          department={selectedPolicy}
        />
      </div>
    </div>
  );
};

export default ExitPolicyList;
