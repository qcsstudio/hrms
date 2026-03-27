import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

const formatDateTime = (value) => {
  if (!value) return "--";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "--";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getCreatedByName = (policy) =>
  policy?.createdBy?.fullName ||
  policy?.createdBy?.name ||
  policy?.createdByName ||
  policy?.createdBy ||
  "--";

const getAssignedCount = (policy) =>
  Array.isArray(policy?.assignedEmployeeList)
    ? policy.assignedEmployeeList.length
    : Array.isArray(policy?.employees)
      ? policy.employees.length
      : Number(policy?.assignedCount || 0);

const getLeaveTypesCount = (policy) =>
  (Array.isArray(policy?.hourlyLeave) ? policy.hourlyLeave.length : 0) +
  (Array.isArray(policy?.medicalLeave) ? policy.medicalLeave.length : 0) +
  (Array.isArray(policy?.customLeave) ? policy.customLeave.length : 0) +
  (policy?.unpaidLeaveName ? 1 : 0);

const LeavePolicyList = () => {
  const [tab, setTab] = useState("active");
  const [openMenu, setOpenMenu] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const handleCreate = () => {
    navigate("/config/track/leave/leave-policy/create");
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/config/getAll/leavePolicy", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const list = Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data)
            ? response.data
            : [];

        setPolicies(list);
      } catch (error) {
        console.log("leave policy list error", error);
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const filteredPolicies = useMemo(
    () =>
      policies.filter((policy) => {
        const status = String(policy?.status || "").trim().toLowerCase();
        return tab === "draft" ? status === "draft" : status !== "draft";
      }),
    [policies, tab]
  );

  const handleDelete = (id) => {
    alert("Delete policy id: " + id);
    setOpenMenu(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">Leave Policy</h1>
          <p className="text-sm text-gray-500">Manage employee directory, documents, and role-based actions.</p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex rounded-md bg-gray-200 p-1">
          <button
            onClick={() => setTab("active")}
            className={`px-4 py-1.5 text-sm rounded-md ${
              tab === "active" ? "bg-white shadow text-gray-900" : "text-gray-500"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setTab("draft")}
            className={`px-4 py-1.5 text-sm rounded-md ${
              tab === "draft" ? "bg-white shadow text-gray-900" : "text-gray-500"
            }`}
          >
            Draft
          </button>
        </div>

        <button
          onClick={() => setTab("active")}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          Clear x
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-500">
              <th className="px-4 py-3 text-left font-medium">Policy Name</th>
              <th className="px-4 py-3 text-left font-medium">Created By</th>
              <th className="px-4 py-3 text-left font-medium">Assigned Employee</th>
              <th className="px-4 py-3 text-left font-medium">Leave Types</th>
              <th className="px-4 py-3 text-right font-medium">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : filteredPolicies.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-10 text-center text-sm text-gray-500">
                  No data found
                </td>
              </tr>
            ) : (
              filteredPolicies.map((policy) => {
                const policyId = policy._id || policy.id;
                const assignedCount = getAssignedCount(policy);

                return (
                  <tr key={policyId} className="border-b last:border-b-0 hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{policy.policyName || policy.name || "--"}</div>
                      <div className="text-xs text-gray-500">{formatDateTime(policy.createdAt || policy.date)}</div>
                    </td>

                    <td className="px-4 py-4 text-gray-600">{getCreatedByName(policy)}</td>

                    <td className="px-4 py-4 text-gray-600">
                      {assignedCount > 0 ? (
                        <div className="flex -space-x-2">
                          {[...Array(Math.min(3, assignedCount))].map((_, index) => (
                            <div
                              key={index}
                              className="h-8 w-8 rounded-full border-2 border-white bg-gray-400"
                            ></div>
                          ))}

                          {assignedCount > 3 && (
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black text-xs text-white">
                              +{assignedCount - 3}
                            </div>
                          )}
                        </div>
                      ) : (
                        "No Employee Assigned"
                      )}
                    </td>

                    <td className="px-4 py-4 text-gray-600">{getLeaveTypesCount(policy)}</td>

                    <td className="px-4 py-4 text-right">
                      <div className="relative flex items-center justify-end gap-2">
                        {/* <button
                          onClick={() => navigate(`/config/track/leave/leave-policy/edit/${policyId}`)}
                          className="rounded-md p-2 hover:bg-gray-100"
                        >
                          Edit
                        </button> */}

                        <button
                          onClick={() => setOpenMenu(openMenu === policyId ? null : policyId)}
                          className="rounded-md p-2 hover:bg-gray-100"
                        >
                          ...
                        </button>

                        {openMenu === policyId && (
                          <div className="absolute right-0 top-10 z-10 w-36 rounded-md border bg-white shadow-md">
                            <button
                              onClick={() => {
                                navigate(`/config/track/leave/leave-policy/view/${policyId}`);
                                setOpenMenu(null);
                              }}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleDelete(policyId)}
                              className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-gray-100"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showCountryDialog &&
        createPortal(<CreateCountryPopup onClose={() => setShowCountryDialog(false)} onContinue={handleCreate} />, document.body)}
    </div>
  );
};

export default LeavePolicyList;
