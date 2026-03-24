import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

export default function WeeklyOffList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [activeTab, setActiveTab] = useState("Active");
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState("");

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/track/leave/Weekly-off/create");
  };

  useEffect(() => {
    const fetchWeeklyOffs = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get("/config/getAll/weekoff", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setPolicies(res?.data?.data || []);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Unable to fetch weekly off policies.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeeklyOffs();
  }, []);

  const visiblePolicies = useMemo(
    () =>
      policies.filter((item) =>
        activeTab === "Draft" ? Boolean(item?.isDraft) : !item?.isDraft
      ),
    [activeTab, policies]
  );

  const formatDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getCreatedBy = (policy) => {
    if (policy?.adminId?.name) return policy.adminId.name;
    if (policy?.createdBy?.name) return policy.createdBy.name;

    const first =
      policy?.adminId?.firstName ||
      policy?.createdBy?.firstName ||
      "";
    const last =
      policy?.adminId?.lastName ||
      policy?.createdBy?.lastName ||
      "";

    const fullName = `${first} ${last}`.trim();
    if (fullName) return fullName;

    if (typeof policy?.createdBy === "string") return policy.createdBy;
    return "NA";
  };

  const getInitials = (name) => {
    const text = (name || "").trim();
    if (!text) return "NA";

    const parts = text.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  };

  const getAssignedEmployees = (policy) => {
    if (Array.isArray(policy?.assignedEmployees)) return policy.assignedEmployees;
    if (Array.isArray(policy?.employees)) return policy.employees;
    return [];
  };

  const getPolicyId = (policy) => policy?._id || policy?.id;

  const handleEdit = (policyId) => {
    if (!policyId) return;
    navigate(`/config/track/leave/Weekly-off/create?mode=edit&id=${policyId}`);
  };

  const handleDelete = async (policyId, policyName) => {
    if (!policyId) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${policyName || "this weekly off"}"?`
    );

    if (!confirmDelete) return;

    try {
      setActionLoadingId(policyId);
      await axiosInstance.delete(`/config/weekly-off-delete/${policyId}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setPolicies((prev) => prev.filter((item) => getPolicyId(item) !== policyId));
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to delete weekly off policy.");
    } finally {
      setActionLoadingId("");
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Weekly Off</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium"
        >
          Create +
        </button>
      </div>

      <div className="flex items-center gap-3 mt-6">
        {["Active", "Draft"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium border ${
              activeTab === tab
                ? "bg-gray-100 border-gray-300"
                : "bg-white border-gray-200 text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}

        <button
          onClick={() => setActiveTab("Active")}
          className="ml-auto text-sm border px-4 py-1.5 rounded-lg text-gray-600"
        >
          Clear ✕
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_2fr_1fr_auto] gap-4 px-4 py-3 mt-6 text-sm text-gray-500 font-medium border-b">
        <span>Weekly-off Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span className="text-center">Version</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-4 mt-4">
        {loading && (
          <div className="text-sm text-gray-500">Loading weekly off policies...</div>
        )}

        {!loading && errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}

        {!loading && !errorMessage && visiblePolicies.length === 0 && (
          <div className="text-sm text-gray-500">No weekly off policy found.</div>
        )}

        {!loading &&
          !errorMessage &&
          visiblePolicies.map((policy) => {
            const assignedEmployees = getAssignedEmployees(policy);
            const createdByName = getCreatedBy(policy);

            const policyId = getPolicyId(policy);

            return (
              <div
                key={policyId}
                className="grid grid-cols-[2fr_1fr_2fr_1fr_auto] gap-4 items-center bg-white border rounded-xl px-4 py-4"
              >
                <div>
                  <p className="text-sm font-medium">{policy?.name || "-"}</p>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(policy?.createdAt)}</p>
                </div>

                <div>
                  <div className="h-9 w-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-semibold">
                    {getInitials(createdByName)}
                  </div>
                </div>

                <div className="flex items-center -space-x-2">
                  {assignedEmployees.slice(0, 3).map((employee, index) => {
                    const empName =
                      employee?.name ||
                      `${employee?.firstName || ""} ${employee?.lastName || ""}`.trim() ||
                      "NA";

                    return (
                      <div
                        key={`${policy?._id || policy?.id}-emp-${index}`}
                        className="h-8 w-8 rounded-full bg-gray-500 text-white text-[10px] flex items-center justify-center border-2 border-white"
                        title={empName}
                      >
                        {getInitials(empName)}
                      </div>
                    );
                  })}

                  {assignedEmployees.length > 3 && (
                    <div className="h-8 w-8 rounded-full bg-black text-white text-xs flex items-center justify-center border-2 border-white">
                      +{assignedEmployees.length - 3}
                    </div>
                  )}

                  {assignedEmployees.length === 0 && (
                    <span className="text-xs text-gray-400">No employee assigned</span>
                  )}
                </div>

                <div className="text-center text-sm font-medium text-gray-700">
                  {policy?.version ?? 0}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => handleEdit(policyId)}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition"
                    title="Edit weekly off"
                  >
                    <FiEdit2 className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(policyId, policy?.name)}
                    disabled={actionLoadingId === policyId}
                    className="px-3 py-1.5 text-xs font-medium rounded-md text-red-600 hover:bg-red-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    title="Delete weekly off"
                  >
                    {actionLoadingId === policyId ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
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
}