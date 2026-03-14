import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";
import AssignedEmployeesDrawer from "../../Company-data/Department/AssignedEmployeesDrawer";

const PROBATION_CREATE_ROUTE = "/config/hris/Employee-data/probation-create";

const TAB_OPTIONS = [
  { key: "active", label: "Active" },
  { key: "draft", label: "Draft" },
];

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none";

const summaryCardClassName =
  "rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

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

const formatDuration = (value) => {
  if (!value) return "--";
  return `${value} Days`;
};

const mapAssignedEmployees = (item) => {
  const list = Array.isArray(item?.assignedEmployeeList)
    ? item.assignedEmployeeList
    : [];

  return list
    .map((employee) => ({
      name: employee?.employeeName || employee?.fullName || employee?.name || "",
    }))
    .filter((employee) => employee.name);
};

const getProbationStatus = (item) => {
  const normalizedStatus =
    typeof item?.status === "string" ? item.status.toLowerCase() : "";

  if (normalizedStatus === "active" || normalizedStatus === "draft") {
    return normalizedStatus;
  }

  if (typeof item?.isActive === "boolean") {
    return item.isActive ? "active" : "draft";
  }

  return "active";
};

const getStatusMeta = (item) => {
  const status = getProbationStatus(item);

  if (status === "draft") {
    return {
      label: "Draft",
      badgeClassName: "bg-[#FFF7E8] text-[#B54708]",
    };
  }

  return {
    label: "Active",
    badgeClassName: "bg-[#ECFDF3] text-[#027A48]",
  };
};

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
    setShowCountryDialog(false);
    navigate(PROBATION_CREATE_ROUTE);
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

  const activePlansCount = probitionData.filter(
    (item) => getProbationStatus(item) === "active"
  ).length;
  const draftPlansCount = probitionData.filter(
    (item) => getProbationStatus(item) === "draft"
  ).length;
  const assignedEmployeesCount = probitionData.reduce(
    (count, item) => count + mapAssignedEmployees(item).length,
    0
  );

  const filteredProbitionData = probitionData.filter(
    (item) => getProbationStatus(item) === tab
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">Probation</h1>
            <p className="mt-1 text-sm text-[#667085]">
              Manage probation plans, assigned employees, and plan actions from
              one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowCountryDialog(true)}
            className={primaryButtonClassName}
          >
            Create +
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Total Plans
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {probitionData.length}
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Active vs Draft
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {activePlansCount} / {draftPlansCount}
            </p>
            <p className="mt-1 text-sm text-[#667085]">
              Active plans and draft plans
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Assigned Employees
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {assignedEmployeesCount}
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="inline-flex gap-2 rounded-[9px] border border-[#DEE2E6] bg-[#F4F4F5] px-1 py-1">
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
            className={secondaryButtonClassName}
          >
            Clear
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#E4E7EC] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <table className="min-w-full text-sm">
            <thead className="bg-[#F9FAFB] text-[#667085]">
              <tr>
                <th className="px-5 py-3.5 text-left font-medium">
                  Probation Plan Name
                </th>
                <th className="px-5 py-3.5 text-left font-medium">Created By</th>
                <th className="px-5 py-3.5 text-left font-medium">
                  Assigned Employee
                </th>
                <th className="px-5 py-3.5 text-left font-medium">
                  Probation Duration
                </th>
                <th className="px-5 py-3.5 text-left font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredProbitionData.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-sm text-[#98A2B3]"
                  >
                    No probation plans found in this status.
                  </td>
                </tr>
              )}

              {filteredProbitionData.map((item, index) => {
                const itemId = item?._id || String(index);
                const createdByName =
                  item?.addedByName || item?.createdBy || "Admin";
                const assignedEmployees = mapAssignedEmployees(item);
                const statusMeta = getStatusMeta(item);

                return (
                  <tr
                    key={itemId}
                    className="border-t border-[#F2F4F7] transition-colors hover:bg-[#FCFCFD]"
                  >
                    <td className="px-5 py-4 align-middle">
                      <div className="text-sm font-medium text-[#101828]">
                        {item?.policyName || "--"}
                      </div>
                      <div className="mt-0.5 text-xs text-[#98A2B3]">
                        {formatDateTime(item?.createdAt)}
                      </div>
                    </td>

                    <td className="px-5 py-4 align-middle">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAECF0] text-xs font-medium text-[#475467]">
                          {getInitials(createdByName)}
                        </div>
                        <span className="text-sm text-[#475467]">
                          {createdByName}
                        </span>
                      </div>
                    </td>

                    <td className="px-5 py-4 align-middle">
                      {assignedEmployees.length === 0 ? (
                        <span className="text-[#98A2B3]">
                          No Employee Assigned
                        </span>
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="flex -space-x-2">
                            {assignedEmployees.slice(0, 3).map((employee, employeeIndex) => (
                              <div
                                key={`${itemId}-${employee.name}-${employeeIndex}`}
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#DCE9FF] text-xs font-medium text-[#0575E6]"
                                title={employee.name}
                              >
                                {getInitials(employee.name)}
                              </div>
                            ))}

                            {assignedEmployees.length > 3 && (
                              <button
                                type="button"
                                onClick={() =>
                                  openAssignedEmployeesDrawer(item, assignedEmployees)
                                }
                                className="flex h-8 w-8 items-center justify-center rounded-full border border-white bg-[#101828] text-xs font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-black hover:shadow-none"
                                title="View assigned employees"
                              >
                                +{assignedEmployees.length - 3}
                              </button>
                            )}
                          </div>

                          <span className="text-sm text-[#475467]">
                            {assignedEmployees.length} Employee
                            {assignedEmployees.length > 1 ? "s" : ""} Assigned
                          </span>
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-4 align-middle text-[#475467]">
                      {formatDuration(item?.probationDurationDays)}
                    </td>

                    <td className="px-5 py-4 align-middle">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusMeta.badgeClassName}`}
                      >
                        {statusMeta.label}
                      </span>
                    </td>

                    <td
                      className="relative px-5 py-4 align-middle text-right"
                      data-probation-menu
                    >
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          onClick={() => handleEdit(item)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#667085] shadow-none transition hover:translate-y-0 hover:bg-[#EFF6FF] hover:text-[#0575E6] hover:shadow-none"
                          title="Edit probation"
                        >
                          <FiEdit2 className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenu((prev) => (prev === itemId ? null : itemId))
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-[#667085] shadow-none transition hover:translate-y-0 hover:bg-[#F3F4F6] hover:text-[#101828] hover:shadow-none"
                          title="More actions"
                        >
                          <HiOutlineDotsVertical className="h-4 w-4" />
                        </button>
                      </div>

                      {openMenu === itemId && (
                        <div className="absolute right-5 top-12 z-20 w-36 overflow-hidden rounded-md border border-[#E4E7EC] bg-white divide-y divide-[#EAECF0] shadow-[0_12px_24px_rgba(15,23,42,0.10)]">
                          <button
                            type="button"
                            onClick={() => {
                              handleView(item);
                              setOpenMenu(null);
                            }}
                            className="w-full bg-white px-4 py-2.5 text-left text-sm font-medium text-[#475467] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none"
                          >
                            View
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              handleDelete(item);
                              setOpenMenu(null);
                            }}
                            className="w-full bg-white px-4 py-2.5 text-left text-sm font-medium text-[#D92D20] shadow-none transition hover:translate-y-0 hover:bg-[#FEF3F2] hover:shadow-none"
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
    </div>
  );
}
