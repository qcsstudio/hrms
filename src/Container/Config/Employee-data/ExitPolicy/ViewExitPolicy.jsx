import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EXIT_POLICY_LIST_ROUTE = "/config/hris/Employee-data/exitPolicy-list";

const readOnlyFieldClassName =
  "mt-2 flex min-h-[44px] w-full items-center rounded-lg border border-[#EAECF0] bg-[#F8FAFC] px-4 py-2.5 text-sm text-[#101828]";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const ReadOnlyChoiceCard = ({ selected, label, description, children }) => {
  return (
    <div
      className={`rounded-xl border p-4 ${
        selected
          ? "border-[#A8CAFF] bg-[#EFF6FF]"
          : "border-[#E4E7EC] bg-white"
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border ${
            selected ? "border-[#0575E6]" : "border-[#C4C9D1]"
          }`}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              selected ? "bg-[#0575E6]" : "bg-transparent"
            }`}
          />
        </span>

        <div>
          <p className="text-sm font-medium text-[#101828]">{label}</p>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-[#667085]">{description}</p>
          ) : null}
        </div>
      </div>

      {children ? (
        <div className="mt-4 border-t border-[#D6E4FF] pt-4 pl-7">{children}</div>
      ) : null}
    </div>
  );
};

const SectionCard = ({ title, subtitle, children }) => {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
      <p className="text-sm font-medium text-[#101828]">{title}</p>
      {subtitle ? (
        <p className="mt-1 text-sm text-[#475467]">{subtitle}</p>
      ) : null}
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
};

const ReadOnlyField = ({ label, value }) => {
  return (
    <div>
      <label className="text-sm font-medium text-[#344054]">{label}</label>
      <div className={readOnlyFieldClassName}>{value || "--"}</div>
    </div>
  );
};

const ViewExitPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    notice: "",
    selfResign: "yes",
    changeNotice: "yes",
    managerInitiate: "yes",
    managerChangeNotice: "yes",
    notifyOn: "employee",
  });

  // Dummy Data (Replace with API)
  const dummyData = [
    {
      id: "1",
      name: "15 Days",
      description: "Standard exit policy",
      notice: 40,
      selfResign: "yes",
      changeNotice: "yes",
      managerInitiate: "yes",
      managerChangeNotice: "no",
      notifyOn: "employee",
    },
    {
      id: "2",
      name: "IMMEDIATE",
      description: "Immediate exit",
      notice: 0,
      selfResign: "no",
      changeNotice: "no",
      managerInitiate: "yes",
      managerChangeNotice: "yes",
      notifyOn: "approvers",
    },
  ];

  useEffect(() => {
    const policy = dummyData.find((item) => item.id === id);
    if (policy) {
      setFormData(policy);
    }
  }, [id]);

  const handleBack = () => {
    navigate(EXIT_POLICY_LIST_ROUTE);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              View Exit Policy
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Review the exit policy details in the same structured layout used
              across the updated employee configuration screens.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Mode
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              Read-only policy view
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ReadOnlyField label="Exit Policy Name" value={formData.name} />
            <ReadOnlyField
              label="Notice Period (Days)"
              value={formData.notice !== "" ? `${formData.notice} Days` : "--"}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">Description</label>
            <div className={`${readOnlyFieldClassName} min-h-[112px] items-start`}>
              <p className="leading-6 text-[#344054]">
                {formData.description || "--"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <SectionCard
              title="Employee Resignation"
              subtitle="See whether employees can initiate resignation and request notice period changes."
            >
              <ReadOnlyChoiceCard
                selected={formData.selfResign === "yes"}
                label="Yes"
                description="Employees are allowed to start the resignation process."
              >
                <SectionCard title="Notice Period Change Request">
                  <ReadOnlyChoiceCard
                    selected={formData.changeNotice === "yes"}
                    label="Yes"
                    description="Employees can request a change in the notice period."
                  />
                  <ReadOnlyChoiceCard
                    selected={formData.changeNotice === "no"}
                    label="No"
                    description="Employees must continue with the original notice period."
                  />
                </SectionCard>
              </ReadOnlyChoiceCard>

              <ReadOnlyChoiceCard
                selected={formData.selfResign === "no"}
                label="No"
                description="Employees cannot initiate resignation on their own."
              />
            </SectionCard>

            <SectionCard
              title="Manager-Initiated Separation"
              subtitle="Review whether managers can initiate separation and request notice period updates."
            >
              <ReadOnlyChoiceCard
                selected={formData.managerInitiate === "yes"}
                label="Yes"
                description="Managers are allowed to start the separation process."
              >
                <SectionCard title="Manager Notice Change Request">
                  <ReadOnlyChoiceCard
                    selected={formData.managerChangeNotice === "yes"}
                    label="Yes"
                    description="Managers can request a change in the notice period."
                  />
                  <ReadOnlyChoiceCard
                    selected={formData.managerChangeNotice === "no"}
                    label="No"
                    description="Managers must continue with the existing notice period."
                  />
                </SectionCard>
              </ReadOnlyChoiceCard>

              <ReadOnlyChoiceCard
                selected={formData.managerInitiate === "no"}
                label="No"
                description="Managers cannot initiate separation from this policy."
              />
            </SectionCard>
          </div>

          <SectionCard
            title="Approval Notification"
            subtitle="See who receives the approval update for this exit process."
          >
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <ReadOnlyChoiceCard
                selected={formData.notifyOn === "approvers"}
                label="Notify Approvers"
                description="Approvers receive the approval notification."
              />
              <ReadOnlyChoiceCard
                selected={formData.notifyOn === "employee"}
                label="Notify Employee"
                description="The employee receives the approval notification."
              />
            </div>
          </SectionCard>

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
};

export default ViewExitPolicy;
