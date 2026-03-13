import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const formatDateTime = (value) => {
  if (!value) return "--";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "--";

  return parsed
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

const formatYesNo = (value) => {
  if (typeof value !== "boolean") return "--";
  return value ? "Yes" : "No";
};

export default function ProbationView() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);

  const axiosInstance = createAxios(token);
  useEffect(() => {
    const fetchprobition = async () => {
      try {
        const res = await axiosInstance.get(`/config/probation-get/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        setData(res?.data?.data);
        console.log("fetchprobition single view====", res?.data);
      } catch (error) {
        console.log("failed to fetch probation", error);
      }
    };

    fetchprobition();
  }, [id, token]);

  if (!data) {
    return (
      <div className="p-8 mx-auto">
        <div className="max-w-4xl rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Loading probation details...
        </div>
      </div>
    );
  }

  const createdByName = data?.addedByName || data?.createdBy || "Admin";
  const durationLabel =
    typeof data?.probationDurationDays === "number" && data.probationDurationDays > 0
      ? `${data.probationDurationDays} Days`
      : "--";

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">View Probation</h1>
        <p className="mt-1 text-sm text-gray-500">Probation plan details</p>
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Policy Name</p>
            <p className="mt-1 text-sm font-medium text-gray-900">{data?.policyName || "--"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Probation Duration</p>
            <p className="mt-1 text-sm text-gray-700">{durationLabel}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <p className="text-xs text-gray-400">Created By</p>
            <p className="mt-1 text-sm text-gray-700">{createdByName}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Created On</p>
            <p className="mt-1 text-sm text-gray-700">{formatDateTime(data?.createdAt)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div>
            <p className="text-xs text-gray-400">Early Confirmation Allowed</p>
            <p className="mt-1 text-sm text-gray-700">{formatYesNo(data?.isEarlyConfirmationAllowed)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Auto Confirm Employee</p>
            <p className="mt-1 text-sm text-gray-700">{formatYesNo(data?.isAutoConfirm)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-400">Notify Employee</p>
            <p className="mt-1 text-sm text-gray-700">{formatYesNo(data?.notifyEmployee)}</p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-4">
          <p className="text-xs text-gray-400">Description</p>
          <p className="mt-1 text-sm leading-6 text-gray-700">{data?.description || "--"}</p>
        </div>

        <div className="flex justify-end pt-2">
          <button type="button" onClick={() => navigate(-1)} className={flatSecondaryButtonClassName}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
