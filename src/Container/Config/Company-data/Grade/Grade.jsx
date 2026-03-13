import { createPortal } from "react-dom";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";
import AssignedEmployeesDrawer from "../Department/AssignedEmployeesDrawer";

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

const mapAssignedEmployees = (grade) => {
  const list = Array.isArray(grade?.assignedEmployeeList) ? grade.assignedEmployeeList : [];

  return list
    .map((employee) => ({
      name: employee?.employeeName || employee?.fullName || employee?.name || "",
    }))
    .filter((employee) => employee.name);
};

const Grade = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const axiosInstance = createAxios(token);

  const [openMenu, setOpenMenu] = useState(null);
  const [data, setData] = useState([]);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [isAssignedDrawerOpen, setIsAssignedDrawerOpen] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-grade-menu]")) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleCreate = () => {
    navigate("/config/hris/Company_data/create-grade");
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/config/delete-grade/${id}`);

      setOpenMenu(null);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/config/getAll-grade", {
          meta: { auth: "ADMIN_AUTH" },
        });
        console.log(res.data, "get all grade=================");
        setData(res?.data?.data || []);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUsers();
  }, [token]);

  const openAssignedEmployeesDrawer = (gradeName, employees) => {
    setSelectedGrade({
      name: gradeName,
      assignedEmployees: employees,
    });
    setIsAssignedDrawerOpen(true);
  };

  const closeAssignedEmployeesDrawer = () => {
    setIsAssignedDrawerOpen(false);
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Grade</h1>
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
              <th className="px-5 py-3.5 text-left font-medium">Grade Name</th>
              <th className="px-5 py-3.5 text-left font-medium">Created By</th>
              <th className="px-5 py-3.5 text-left font-medium">Assigned Employee</th>
              <th className="px-5 py-3.5 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-gray-500">
                  No grades found.
                </td>
              </tr>
            )}

            {data.map((grade, index) => {
              const gradeId = grade?._id || grade?.id || String(index);
              const gradeName = grade?.gradeName || "--";
              const createdDate = formatDateTime(grade?.createdAt);
              const createdByName = grade?.addedByName || grade?.createdBy || grade?.addedById || "Admin";
              const assignedEmployees = mapAssignedEmployees(grade);

              return (
                <tr key={gradeId} className="border-t border-gray-100 hover:bg-gray-50/70">
                  <td className="px-5 py-4 align-middle">
                    <div className="font-medium text-gray-900">{gradeName}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{createdDate}</div>
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
                            key={`${gradeId}-${employee.name}-${employeeIndex}`}
                            className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 border border-white flex items-center justify-center text-xs font-medium"
                            title={employee.name}
                          >
                            {getInitials(employee.name)}
                          </div>
                        ))}

                        {assignedEmployees.length > 4 && (
                          <button
                            type="button"
                            onClick={() => openAssignedEmployeesDrawer(gradeName, assignedEmployees)}
                            className="w-8 h-8 rounded-full bg-gray-900 text-white border border-white flex items-center justify-center text-xs font-medium hover:bg-black transition outline-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            title="View assigned employees"
                          >
                            +{assignedEmployees.length - 4}
                          </button>
                        )}
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4 align-middle text-right relative" data-grade-menu>
                    <div className="flex justify-end items-center gap-3">
                      <button
                        type="button"
                        onClick={() => navigate(`/config/hris/Company_data/create-grade?id=${gradeId}`)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-blue-600 hover:bg-blue-50 transition hover:translate-y-0"
                        title="Edit grade"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setOpenMenu((prev) => (prev === gradeId ? null : gradeId))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 shadow-none hover:shadow-none hover:text-gray-900 hover:bg-gray-100 transition hover:translate-y-0"
                        title="More actions"
                      >
                        <HiOutlineDotsVertical className="h-4 w-4" />
                      </button>
                    </div>

                    {openMenu === gradeId && (
                      <div className="absolute right-5 top-12 w-36 overflow-hidden rounded-md border border-gray-200 bg-white divide-y divide-gray-100 z-20">
                        <button
                          type="button"
                          onClick={() => {
                            navigate(`/config/hris/Company_data/view-grade/${gradeId}`, {
                              state: { grade },
                            });
                            setOpenMenu(null);
                          }}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-gray-700 bg-white shadow-none hover:shadow-none hover:bg-gray-50 transition hover:translate-y-0"
                        >
                          View
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(gradeId)}
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
        department={selectedGrade}
      />
    </div>
  );
};

export default Grade;
