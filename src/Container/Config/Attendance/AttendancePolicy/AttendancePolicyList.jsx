import { createPortal } from "react-dom";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

export default function AttendancePolicyList() {
  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  // const axiosInstance = createAxios(token);

  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const requestStatus = activeTab === "Draft" ? "draft" : "active";
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const handleCreate = () => {
    navigate("/config/track/Attendance/attendance-policy/create");
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get(`/config/attendance-policy-getAll?status=${requestStatus}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        setPolicies(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Unable to fetch attendance policies.");
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [axiosInstance, requestStatus]);

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

    const first = policy?.adminId?.firstName || policy?.createdBy?.firstName || "";
    const last = policy?.adminId?.lastName || policy?.createdBy?.lastName || "";
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

  const handleDelete = (id) => {
    alert("Delete policy id: " + id);
    setOpenMenu(null);
  };

  return (
    <div className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h1 className="text-xl font-semibold">Attendance Policy</h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-100 rounded-lg p-1 text-sm">
          <button
            onClick={() => setActiveTab("Active")}
            className={`px-4 py-1 rounded-md ${
              activeTab === "Active"
                ? "bg-white shadow text-black"
                : "text-gray-600"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setActiveTab("Draft")}
            className={`px-4 py-1 rounded-md ${
              activeTab === "Draft"
                ? "bg-white shadow text-black"
                : "text-gray-600"
            }`}
          >
            Draft
          </button>
        </div>

        <button
          onClick={() => setActiveTab("Active")}
          className="border px-3 py-1 text-xs rounded-md text-gray-600 hover:bg-gray-100"
        >
          Clear x
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] gap-4 px-6 py-3 text-xs font-medium text-gray-500">
        <span>Policy Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Policy Status</span>
        <span>Action</span>
      </div>

      <div className="space-y-3">
        {loading && <div className="text-sm text-gray-500">Loading attendance policies...</div>}

        {!loading && errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}

        {!loading && !errorMessage && policies.length === 0 && (
          <div className="text-sm text-gray-500">No attendance policy found.</div>
        )}

        {!loading &&
          !errorMessage &&
          policies.map((policy, index) => {
            const policyId = policy?._id || policy?.id || index;
            const createdByName = getCreatedBy(policy);

            return (
              <div
                key={policyId}
                className="bg-white border rounded-xl px-6 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] gap-4 items-center shadow-sm"
              >
                <div>
                  <p className="text-sm font-medium">{policy?.policyName || "-"}</p>
                  <p className="text-xs text-gray-500">{formatDate(policy?.createdAt)}</p>
                </div>

                <div>
                  <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">
                    {getInitials(createdByName)}
                  </div>
                </div>

                <div>
                  <span className="text-sm text-gray-500">No Employee Assigned</span>
                </div>

                <div>
                  <span className="text-sm capitalize">{policy?.status || requestStatus}</span>
                </div>

                <div className="flex items-center justify-end gap-2 relative">
                  <button
                    onClick={() => navigate(`/config/track/Attendance/policy/edit/${policyId}`)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setOpenMenu(openMenu === policyId ? null : policyId)}
                    className="p-2 rounded-md hover:bg-gray-100"
                  >
                    ...
                  </button>

                  {openMenu === policyId && (
                    <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">
                      <button
                        onClick={() => {
                          navigate(`/config/track/Attendance/policy/view/${policyId}`);
                          setOpenMenu(null);
                        }}
                        className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        View
                      </button>

                      <button
                        onClick={() => handleDelete(policyId)}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
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
