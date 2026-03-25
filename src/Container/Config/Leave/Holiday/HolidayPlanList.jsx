import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

const mapHolidayPlan = (item = {}) => ({
  id: item?._id || item?.id || "",
  name: item?.holidayPlanName || item?.name || item?.planName || "-",
  createdAt: item?.createdAt || "",
  createdBy:
    item?.createdBy?.employeeName ||
    item?.createdBy?.name ||
    item?.adminName ||
    "-",
  assignedCount:
    item?.assignedEmployeeList?.length ??
    item?.assignedEmployees?.length ??
    item?.employeeList?.length ??
    0,
  status:
    item?.status === false ||
    item?.status === "draft" ||
    item?.isActive === false ||
    item?.isDeleted === true
      ? "Draft"
      : "Active",
});

export default function HolidayPlanList() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const [activeTab, setActiveTab] = useState("Active");
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [holidayPlans, setHolidayPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState("");
  const navigate = useNavigate();

  const handleCreate = () => {
    navigate("/config/track/leave/holiday-plan/create");
  };

  useEffect(() => {
    const fetchHolidayPlans = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/config/getAll/holidayPlan", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const rawPlans = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
          ? response.data
          : [];

        setHolidayPlans(rawPlans.map((item) => mapHolidayPlan(item)));
      } catch (error) {
        console.error("Error fetching holiday plans:", error);
        setHolidayPlans([]);
        toast.error(error?.response?.data?.message || "Failed to load holiday plans");
      } finally {
        setLoading(false);
      }
    };

    fetchHolidayPlans();
  }, [axiosInstance]);

  const visiblePlans = useMemo(() => {
    return holidayPlans.filter((item) => item.status === activeTab);
  }, [activeTab, holidayPlans]);

  const handleDelete = async (planId) => {
    if (!planId) return;

    try {
      setDeletingId(planId);
      const response = await axiosInstance.delete(`/config/delete/holidayPlan/${planId}`, null, {
        meta: { auth: "ADMIN_AUTH" },
      });

      const isSuccess =
        response?.data?.success === true ||
        response?.data?.done === true ||
        response?.status === 200;

      if (isSuccess) {
        setHolidayPlans((prev) => prev.filter((item) => item.id !== planId));
        toast.success(response?.data?.message || "Holiday plan deleted successfully");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to delete holiday plan");
    } finally {
      setDeletingId("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="bg-white rounded-2xl p-8 shadow-sm">

        {/* ---------------- PAGE HEADER ---------------- */}

        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Holiday Plan
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>

          <button
            onClick={() => setShowCountryDialog(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-medium"
          >
            Create +
          </button>
        </div>

        {/* ---------------- TABS ---------------- */}

        <div className="flex items-center justify-between mb-4">
          <div className="flex bg-gray-100 p-1 rounded-xl">
            {["Active", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-white shadow text-gray-900"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="bg-gray-100 px-4 py-2 rounded-xl text-sm text-gray-700">
            Clear ✕
          </button>
        </div>

        {/* ---------------- TABLE HEADER ---------------- */}

        <div className="grid grid-cols-4 text-sm font-medium text-gray-500 border-b pb-3 mt-6">
          <span>Holiday Plan Name</span>
          <span>Created By</span>
          <span>Assigned Employee</span>
          <span className="text-right">Action</span>
        </div>

        {/* ---------------- TABLE ROWS ---------------- */}

        <div className="space-y-4 mt-4">
          {loading && (
            <div className="rounded-xl border bg-gray-50 px-6 py-5 text-center text-sm text-gray-400">
              Loading...
            </div>
          )}

          {!loading && visiblePlans.length === 0 && (
            <div className="rounded-xl border bg-gray-50 px-6 py-5 text-center text-sm text-gray-400">
              No data found
            </div>
          )}

          {!loading &&
            visiblePlans.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 items-center bg-gray-50 rounded-xl border px-6 py-5 hover:shadow-sm transition"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {item.name}
                </p>
                <p className="text-xs text-gray-500 mt-1">{item.createdAt || "-"}</p>
              </div>

              {/* Avatar */}
              <div>
                <p className="text-sm text-gray-700">{item.createdBy}</p>
              </div>

              {/* Avatar Group */}
              <div>
                <p className="text-sm text-gray-700">
                  {item.assignedCount > 0
                    ? `${item.assignedCount} Employees`
                    : "No Employee Assigned"}
                </p>
              </div>

              {/* Action */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => navigate(`/config/track/leave/holiday-plan/edit/${item.id}`)}
                  className="rounded-lg px-3 py-1 text-sm text-gray-600 hover:bg-gray-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  disabled={deletingId === item.id}
                  className="rounded-lg px-3 py-1 text-sm text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {deletingId === item.id ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- POPUP ---------------- */}

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
}
