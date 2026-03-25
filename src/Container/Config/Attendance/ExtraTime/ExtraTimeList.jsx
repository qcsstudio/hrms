import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import createAxios from "../../../../utils/axios.config";

export default function ExtraTimeList() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [activeTab, setActiveTab] = useState("Active");
  const [openMenu, setOpenMenu] = useState(null);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showCountryDialog, setShowCountryDialog] = useState(false);

  const handleCreate = () => {
    navigate("/config/track/Attendance/extra-time/create");
  };

  useEffect(() => {
    const fetchPolicies = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get("/config/extra-time-getAll", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setPolicies(Array.isArray(res?.data?.data) ? res.data.data : []);
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Unable to fetch extra time policies.");
        setPolicies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const visiblePolicies = useMemo(
    () =>
      policies.filter((item) =>
        activeTab === "Draft" ? item?.status === "draft" : item?.status !== "draft"
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

  const getInitials = (name) => {
    const text = (name || "").trim();
    if (!text) return "NA";

    const parts = text.split(" ").filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

    return `${parts[0][0] || ""}${parts[1][0] || ""}`.toUpperCase();
  };

  const getCreatedBy = (policy) => {
    if (policy?.adminId?.name) return policy.adminId.name;
    if (policy?.createdBy?.name) return policy.createdBy.name;
    if (typeof policy?.createdBy === "string") return policy.createdBy;
    return "NA";
  };

  const getExtraTimeStatus = (policy) => {
    const items = [];
    if (policy?.workingDayBenefits?.benefitEnabled) items.push("Working Day");
    if (policy?.nonWorkingDayBenefits?.benefitEnabled) items.push("Non-Working Day");
    return items;
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/config/extra-time-policy-delete/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setPolicies((prev) => prev.filter((policy) => (policy?._id || policy?.id) !== id));
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to delete extra time policy.");
    } finally {
      setOpenMenu(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-800">
            Concept of Extra Time
          </h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex bg-gray-200 rounded-lg p-1 w-fit">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                activeTab === tab
                  ? "bg-white shadow text-gray-800"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <button
          onClick={() => setActiveTab("Active")}
          className="text-sm bg-gray-100 px-4 py-2 rounded-lg text-gray-600"
        >
          Clear x
        </button>
      </div>

      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] text-xs font-medium text-gray-500 px-4 py-2">
        <span>Policy Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Extra Time Status</span>
        <span>Action</span>
      </div>

      <div className="space-y-3">
        {loading && <div className="text-sm text-gray-500">Loading extra time policies...</div>}

        {!loading && errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}

        {!loading && !errorMessage && visiblePolicies.length === 0 && (
          <div className="text-sm text-gray-500">No extra time policy found.</div>
        )}

        {!loading &&
          !errorMessage &&
          visiblePolicies.map((policy, index) => {
            const policyId = policy?._id || policy?.id || index;
            const createdByName = getCreatedBy(policy);
            const extraTimeStatus = getExtraTimeStatus(policy);

            return (
              <div
                key={policyId}
                className="bg-white border rounded-xl px-4 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_auto] items-center"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {policy?.policyName || "-"}
                  </p>
                  <p className="text-xs text-gray-400">{formatDate(policy?.createdAt)}</p>
                </div>

                <div>
                  <div className="h-9 w-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-semibold">
                    {getInitials(createdByName)}
                  </div>
                </div>

                <div className="flex items-center">
                  <span className="text-xs text-gray-400">No employee assigned</span>
                </div>

                <div className="flex flex-col gap-1">
                  {extraTimeStatus.map((status, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <span className="text-blue-600">OK</span>
                      {status}
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 relative">
                  <button
                    onClick={() => navigate(`/config/track/Attendance/extra-time/edit/${policyId}`)}
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
                          navigate(`/config/track/Attendance/extra-time/edit/${policyId}`);
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