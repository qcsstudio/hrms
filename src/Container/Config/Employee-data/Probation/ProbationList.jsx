import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";
import AssignedEmployeesDrawer from "../../Company-data/Department/AssignedEmployeesDrawer";

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

const mapAssignedEmployees = (item) => {
  const list = Array.isArray(item?.assignedEmployeeList) ? item.assignedEmployeeList : [];

  return list
    .map((employee) => ({
      name: employee?.employeeName || employee?.fullName || employee?.name || "",
    }))
    .filter((employee) => employee.name);
};

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const TAB_OPTIONS = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
];

export default function ProbationList() {
  const token = localStorage.getItem("authToken");
  const [probitionData, setProbationData] = useState([]);

  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [openMenu, setOpenMenu] = useState(null);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [isAssignedDrawerOpen, setIsAssignedDrawerOpen] = useState(false);
  const [selectedProbation, setSelectedProbation] = useState(null);

  const axiosInstance = createAxios(token);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-probation-menu]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCreate = () => {
    navigate("/config/hris/Employee-data/probation-create");
  };

  const handleEdit = (item) => {
    if (!item?._id) return;

    navigate(`/config/hris/Employee-data/probation-edit/${item._id}`, {
      state: { probationData: item },
    });
  };

  const handleView = (item) => {
    navigate(`/config/hris/Employee-data/probation-view/${item._id}`, {
      state: { probationData: item },
    });
  };

  const handleDelete = (item) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${item.policyName}"?`
    );

    if (confirmDelete) {
      console.log("Deleted:", item);
      try {
        axiosInstance.delete(`/config/delete-probation/${item._id}`);
        setProbationData((prev) => prev.filter((o) => o._id !== item._id));
      } catch (error) {
        console.log("api is not working", error);
      }
    }
  };

  useEffect(() => {
    const fetchProbitionData = async () => {
      try {
        const res = await axiosInstance.get("/config/probation-getAll", {
          meta: { auth: "ADMIN_AUTH" },
        });
        console.log("Probation Data:", res?.data?.data);
        setProbationData(res?.data?.data || []);
      } catch (error) {
        console.error("API Error:", error);
      }
    };

    fetchProbitionData();
  }, [token]);

  const openAssignedEmployeesDrawer = (item, employees) => {
    setSelectedProbation({
      name: item?.policyName || "Probation Plan",
      assignedEmployees: employees,
    });
    setIsAssignedDrawerOpen(true);
  };

  const closeAssignedEmployeesDrawer = () => {
    setIsAssignedDrawerOpen(false);
  };

  const clearFilters = () => {
    setTab("active");
    setOpenMenu(null);
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Probation</h1>
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
        <div className="flex bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2">
          {TAB_OPTIONS.map((option) => {
            const isActive = tab === option.key;

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => setTab(option.key)}
                className={`px-4 py-2 rounded-lg transition-colors border-none shadow-none outline-none focus:outline-none focus:ring-0 ${
                  isActive
                    ? "bg-white text-[#212529] border border-[#E5E7EB] shadow-sm"
                    : "bg-transparent text-[#6B7280]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        <button type="button" onClick={clearFilters} className={flatSecondaryButtonClassName}>
          Clear
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3.5 text-left font-medium">Probation Plan Name</th>
              <th className="px-5 py-3.5 text-left font-medium">Created By</th>
              <th className="px-5 py-3.5 text-left font-medium">Assigned Employee</th>
              <th className="px-5 py-3.5 text-left font-medium">Probation Duration</th>
              <th className="px-5 py-3.5 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {probitionData.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-sm text-gray-500">
                  No probation plans found.
                </td>
              </tr>
            )}

            {probitionData.map((item, index) => {
              const itemId = item?._id || String(index);
              const createdByName = item?.addedByName || item?.createdBy || "Admin";
              const assignedEmployees = mapAssignedEmployees(item);

              return (
                <tr key={itemId} className="border-t border-gray-100 hover:bg-gray-50/70">
                  <td className="px-5 py-4 align-middle">
                    <div className="text-sm font-medium text-gray-900">{item?.policyName || "--"}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{formatDateTime(item?.createdAt)}</div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                        {getInitials(createdByName)}
                      </div>
                      <span className="text-sm text-gray-700">{createdByName}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    {assignedEmployees.length === 0 ? (
                      <span className="text-gray-400">No Employee Assigned</span>
                    ) : (
                      <div className="flex -space-x-2">
                        {assignedEmployees.slice(0, 4).map((employee, employeeIndex) => (
                          <div
                            key={`${itemId}-${employee.name}-${employeeIndex}`}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-white flex items-center justify-center text-xs font-medium"
                            title={employee.name}
                          >
                            {getInitials(employee.name)}
                          </div>
                        ))}
                        {assignedEmployees.length > 4 && (
                          <button
                            type="button"
                            onClick={() => openAssignedEmployeesDrawer(item, assignedEmployees)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white border border-white flex items-center justify-center text-xs font-medium hover:bg-black transition outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="View assigned employees"
                          >
                            +{assignedEmployees.length - 4}
                          </button>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle text-gray-700">
                    {item?.probationDurationDays ? `${item.probationDurationDays} Days` : "--"}
                  </td>

                  <td className="px-5 py-4 align-middle text-right relative" data-probation-menu>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-blue-600 hover:bg-blue-50 transition hover:translate-y-0"
                        title="Edit probation"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpenMenu((prev) => (prev === itemId ? null : itemId))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-gray-900 hover:bg-gray-100 transition hover:translate-y-0"
                        title="More actions"
                      >
                        <HiOutlineDotsVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {openMenu === itemId && (
                      <div className="absolute right-5 top-12 w-36 overflow-hidden rounded-md border border-gray-200 bg-white divide-y divide-gray-100 z-20">
                        <button
                          type="button"
                          onClick={() => {
                            handleView(item);
                            setOpenMenu(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 bg-white shadow-none hover:shadow-none hover:bg-gray-50 transition hover:translate-y-0"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            handleDelete(item);
                            setOpenMenu(null);
                          }}
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

      <AssignedEmployeesDrawer
        isOpen={isAssignedDrawerOpen}
        onClose={closeAssignedEmployeesDrawer}
        department={selectedProbation}
      />
    </div>
  );
}
