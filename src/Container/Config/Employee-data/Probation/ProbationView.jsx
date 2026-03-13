import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const PROBATION_LIST_ROUTE = "/config/hris/Employee-data/probation-list";

const readOnlyFieldClassName =
  "mt-2 flex min-h-[44px] w-full items-center rounded-lg border border-[#EAECF0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#101828]";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const summaryCardClassName =
  "rounded-xl border border-[#E4E7EC] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

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

const ReadOnlyField = ({ label, value }) => {
  return (
    <div>
      <label className="text-sm font-medium text-[#344054]">{label}</label>
      <div className={readOnlyFieldClassName}>{value || "--"}</div>
    </div>
  );
};

const InsightCard = ({ title, value, description, active }) => {
  return (
    <div
      className={`rounded-xl border p-4 ${
        active
          ? "border-[#A8CAFF] bg-[#EFF6FF]"
          : "border-[#E4E7EC] bg-[#FCFCFD]"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-[#101828]">{title}</p>
        <span
          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
            active ? "bg-white text-[#0575E6]" : "bg-[#F2F4F7] text-[#667085]"
          }`}
        >
          {value}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-[#667085]">{description}</p>
    </div>
  );
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
      <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
        <div className="w-full">
          <div className="rounded-2xl border border-[#E4E7EC] bg-white p-6 text-sm text-[#667085] shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
            Loading probation details...
          </div>
        </div>
      </div>
    );
  }

  const createdByName = data?.addedByName || data?.createdBy || "Admin";
  const durationLabel =
    typeof data?.probationDurationDays === "number" && data.probationDurationDays > 0
      ? `${data.probationDurationDays} Days`
      : "--";

  const earlyConfirmationLabel = formatYesNo(data?.isEarlyConfirmationAllowed);
  const autoConfirmLabel = formatYesNo(data?.isAutoConfirm);
  const notifyEmployeeLabel = formatYesNo(data?.notifyEmployee);

  const handleBack = () => {
    navigate(PROBATION_LIST_ROUTE);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              View Probation
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Review the probation plan details in the same structured layout
              used across the updated employee configuration screens.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Mode
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              Read-only probation view
            </p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Probation Duration
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {durationLabel}
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Created By
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {createdByName}
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Created On
            </p>
            <p className="mt-2 text-2xl font-semibold text-[#101828]">
              {formatDateTime(data?.createdAt)}
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ReadOnlyField label="Policy Name" value={data?.policyName} />
            <ReadOnlyField label="Probation Duration" value={durationLabel} />
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Description
            </label>
            <div className={`${readOnlyFieldClassName} min-h-[112px] items-start`}>
              <p className="leading-6 text-[#344054]">
                {data?.description || "--"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <InsightCard
              title="Early Confirmation"
              value={earlyConfirmationLabel}
              active={data?.isEarlyConfirmationAllowed === true}
              description="Indicates whether employees can be confirmed before the full probation period is completed."
            />

            <InsightCard
              title="Auto Confirmation"
              value={autoConfirmLabel}
              active={data?.isAutoConfirm === true}
              description="Indicates whether the employee is confirmed automatically once the probation period ends."
            />

            <InsightCard
              title="Employee Notification"
              value={notifyEmployeeLabel}
              active={data?.notifyEmployee === true}
              description="Indicates whether the employee receives communication about probation updates."
            />
          </div>

          <div className="flex justify-end border-t border-[#EAECF0] pt-6">
            <button
              type="button"
              onClick={handleBack}
              className={secondaryButtonClassName}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
