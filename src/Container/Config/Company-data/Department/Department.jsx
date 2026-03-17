import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import AssignedEmployeesDrawer from "./AssignedEmployeesDrawer";
import createAxios from "../../../../utils/axios.config";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "--";

const formatDepartmentDate = (value) => {
  if (!value) return "";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(date);
};

const normalizeEmployees = (employees) => {
  if (!Array.isArray(employees)) return [];

  return employees.map((employee, index) => ({
    id: employee?._id || employee?.id || index,
    name:
      employee?.name ||
      employee?.fullName ||
      employee?.employeeName ||
      employee?.employee?.fullName ||
      employee?.employee?.name ||
      "Unknown",
  }));
};

const normalizeDepartment = (item, index) => {
  const linkedBusinessUnit =
    item?.linkedBusinessUnit ||
    item?.businessUnitName ||
    item?.businessUnit?.name ||
    item?.businessUnit ||
    "--";

  const createdBy =
    item?.createdBy?.fullName ||
    item?.createdBy?.name ||
    item?.createdByName ||
    item?.createdBy ||
    "Admin User";

  const assignedEmployees = normalizeEmployees(
    item?.assignedEmployees || item?.employees || item?.employeeList
  );

  return {
    ...item,
    id: item?._id || item?.id || index,
    name: item?.departmentName || item?.name || "--",
    date: formatDepartmentDate(item?.createdAt || item?.updatedAt),
    linkedBusinessUnit,
    createdBy,
    assignedEmployees,
    head:
      item?.departmentHead ||
      item?.head ||
      item?.departmentHeadName ||
      item?.headName ||
      "--",
  };
};

const Department = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const [openMenu, setOpenMenu] = useState(null);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [isAssignedDrawerOpen, setIsAssignedDrawerOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-department-menu]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setIsLoading(true);
        const axiosInstance = createAxios(token);
        const response = await axiosInstance.get("/config//all-department", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const departmentList = Array.isArray(response?.data?.data)
          ? response.data.data
          : [];

        setData(departmentList.map(normalizeDepartment));
      } catch (error) {
        console.error("Error fetching departments:", error);
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDepartments();
  }, [token]);

  const handleDelete = (id) => {
    setData((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  const handleCreate = () => {
    navigate("/config/hris/Company_data/department/create");
  };

  const openAssignedEmployeesDrawer = (department) => {
    setSelectedDepartment(department);
    setIsAssignedDrawerOpen(true);
  };

  const closeAssignedEmployeesDrawer = () => {
    setIsAssignedDrawerOpen(false);
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Department</h1>
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

      <div className="bg-white border border-gray-200 rounded-xl overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-5 py-3.5 text-left font-medium">Department Unit Name</th>
              <th className="px-5 py-3.5 text-left font-medium">Linked Business Units</th>
              <th className="px-5 py-3.5 text-left font-medium">Created By</th>
              <th className="px-5 py-3.5 text-left font-medium">Assigned Employee</th>
              <th className="px-5 py-3.5 text-left font-medium">Department Head Unit</th>
              <th className="px-5 py-3.5 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500">
                  Loading departments...
                </td>
              </tr>
            )}

            {!isLoading && data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-sm text-gray-500">
                  No department found
                </td>
              </tr>
            )}

            {!isLoading &&
              data.map((item) => (
                <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/70">
                  <td className="px-5 py-4 align-middle">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    {item.date ? (
                      <div className="text-xs text-gray-400 mt-0.5">{item.date}</div>
                    ) : null}
                  </td>

                  <td className="px-5 py-4 align-middle text-gray-700">
                    {item.linkedBusinessUnit || "--"}
                  </td>

                  <td className="px-5 py-4 align-middle">
                    <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">
                      {getInitials(item.createdBy)}
                    </div>
                  </td>

                  <td className="px-5 py-4 align-middle">
                    {item.assignedEmployees?.length > 0 ? (
                      <div className="flex -space-x-2">
                        {item.assignedEmployees.slice(0, 4).map((emp, index) => (
                          <div
                            key={`${item.id}-${emp.id || emp.name}-${index}`}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-white flex items-center justify-center text-xs font-medium"
                            title={emp.name}
                          >
                            {getInitials(emp.name)}
                          </div>
                        ))}
                        {item.assignedEmployees.length > 4 && (
                          <button
                            type="button"
                            onClick={() => openAssignedEmployeesDrawer(item)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white border border-white flex items-center justify-center text-xs font-medium hover:bg-black transition outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="View assigned employees"
                          >
                            +{item.assignedEmployees.length - 4}
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">No Employee Assigned</span>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle text-gray-700">{item.head || "--"}</td>

                  <td className="px-5 py-4 align-middle text-right relative" data-department-menu>
                    <div className="flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() =>
                          navigate("/config/hris/Company_data/department/create", {
                            state: { department: item, isEdit: true },
                          })
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-blue-600 hover:bg-blue-50 transition hover:translate-y-0"
                        title="Edit department"
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
                          onClick={() => {
                            navigate(`/config/hris/Company_data/department/view/${item.id}`, {
                              state: { department: item },
                            });
                            setOpenMenu(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 bg-white shadow-none hover:shadow-none hover:bg-gray-50 transition hover:translate-y-0"
                        >
                          View
                        </button>

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
        department={selectedDepartment}
      />
    </div>
  );
};

export default Department;
