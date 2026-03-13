import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EXIT_POLICY_LIST_ROUTE = "/config/hris/Employee-data/exitPolicy-list";

const initialFormData = {
  name: "",
  description: "",
  notice: "",
  selfResign: "yes",
  changeNotice: "yes",
  managerInitiate: "yes",
  managerChangeNotice: "yes",
  notifyOn: "employee",
};

const fieldClassName =
  "mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const textareaClassName =
  "mt-2 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const tabButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium shadow-none transition hover:translate-y-0 hover:shadow-none";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none";

const RadioOptionCard = ({
  name,
  checked,
  onChange,
  label,
  description,
  children,
}) => {
  return (
    <div
      className={`rounded-xl border p-4 transition-colors ${
        checked
          ? "border-[#A8CAFF] bg-[#EFF6FF]"
          : "border-[#E4E7EC] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          className="mt-0.5 h-4 w-4 accent-[#0575E6]"
        />

        <div>
          <p className="text-sm font-medium text-[#101828]">{label}</p>
          {description ? (
            <p className="mt-1 text-xs leading-5 text-[#667085]">{description}</p>
          ) : null}
        </div>
      </label>

      {children ? (
        <div className="mt-4 border-t border-[#D6E4FF] pt-4 pl-7">{children}</div>
      ) : null}
    </div>
  );
};

const InlineInfoCard = ({ title, children }) => {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
      <p className="text-sm font-medium text-[#101828]">{title}</p>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
};

const ExitPolicyCreate = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [formData, setFormData] = useState(() => ({ ...initialFormData }));

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClear = () => {
    setTab("active");
    setFormData({ ...initialFormData });
  };

  const handleCancel = () => {
    navigate(EXIT_POLICY_LIST_ROUTE, { replace: true });
  };

  const handleSave = () => {
    console.log("Create API call", {
      ...formData,
      status: tab,
    });

    navigate(EXIT_POLICY_LIST_ROUTE);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              Create Exit Policy
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Set up exit policy rules using the same structured config layout
              followed across the employee settings module.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Current Status
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {tab === "active" ? "Active policy" : "Draft policy"}
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="flex flex-col gap-3 border-b border-[#EAECF0] pb-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex rounded-xl border border-[#E4E7EC] bg-[#F8FAFC] p-1">
              <button
                type="button"
                onClick={() => setTab("active")}
                className={`${tabButtonClassName} ${
                  tab === "active"
                    ? "bg-white text-[#101828]"
                    : "text-[#667085] bg-transparent"
                }`}
              >
                Active
              </button>

              <button
                type="button"
                onClick={() => setTab("draft")}
                className={`${tabButtonClassName} ${
                  tab === "draft"
                    ? "bg-white text-[#101828]"
                    : "text-[#667085] bg-transparent"
                }`}
              >
                Draft
              </button>
            </div>

            <button
              type="button"
              onClick={handleClear}
              className={secondaryButtonClassName}
            >
              Clear
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-[#344054]">
                Exit Policy Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter exit policy name"
                className={fieldClassName}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[#344054]">
                Notice Period (Days)
              </label>
              <input
                type="number"
                value={formData.notice}
                onChange={(e) => handleChange("notice", e.target.value)}
                placeholder="Enter notice period in days"
                className={fieldClassName}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">Description</label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Write a short description for this exit policy"
              className={textareaClassName}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InlineInfoCard title="Employee Resignation">
              <p className="text-sm text-[#475467]">
                Decide whether employees can initiate resignation and whether
                they are allowed to request changes in the notice period.
              </p>

              <div className="space-y-3">
                <RadioOptionCard
                  name="selfResign"
                  checked={formData.selfResign === "yes"}
                  onChange={() => handleChange("selfResign", "yes")}
                  label="Yes"
                  description="Employees can start the resignation process on their own."
                >
                  <InlineInfoCard title="Notice Period Change Request">
                    <RadioOptionCard
                      name="changeNotice"
                      checked={formData.changeNotice === "yes"}
                      onChange={() => handleChange("changeNotice", "yes")}
                      label="Yes"
                      description="Allow employees to request a notice period update."
                    />
                    <RadioOptionCard
                      name="changeNotice"
                      checked={formData.changeNotice === "no"}
                      onChange={() => handleChange("changeNotice", "no")}
                      label="No"
                      description="Keep the original notice period fixed for employee requests."
                    />
                  </InlineInfoCard>
                </RadioOptionCard>

                <RadioOptionCard
                  name="selfResign"
                  checked={formData.selfResign === "no"}
                  onChange={() => {
                    handleChange("selfResign", "no");
                    handleChange("changeNotice", "no");
                  }}
                  label="No"
                  description="Employees cannot initiate resignation from this policy."
                />
              </div>
            </InlineInfoCard>

            <InlineInfoCard title="Manager-Initiated Separation">
              <p className="text-sm text-[#475467]">
                Control whether managers can start separation and request
                adjustments to the notice period.
              </p>

              <div className="space-y-3">
                <RadioOptionCard
                  name="managerInitiate"
                  checked={formData.managerInitiate === "yes"}
                  onChange={() => handleChange("managerInitiate", "yes")}
                  label="Yes"
                  description="Managers can initiate the separation flow for their team members."
                >
                  <InlineInfoCard title="Manager Notice Change Request">
                    <RadioOptionCard
                      name="managerChangeNotice"
                      checked={formData.managerChangeNotice === "yes"}
                      onChange={() => handleChange("managerChangeNotice", "yes")}
                      label="Yes"
                      description="Allow managers to request changes to the notice period."
                    />
                    <RadioOptionCard
                      name="managerChangeNotice"
                      checked={formData.managerChangeNotice === "no"}
                      onChange={() => handleChange("managerChangeNotice", "no")}
                      label="No"
                      description="Managers must continue with the existing notice period."
                    />
                  </InlineInfoCard>
                </RadioOptionCard>

                <RadioOptionCard
                  name="managerInitiate"
                  checked={formData.managerInitiate === "no"}
                  onChange={() => {
                    handleChange("managerInitiate", "no");
                    handleChange("managerChangeNotice", "no");
                  }}
                  label="No"
                  description="Managers cannot start separation from this policy."
                />
              </div>
            </InlineInfoCard>
          </div>

          <InlineInfoCard title="Approval Notification">
            <p className="text-sm text-[#475467]">
              Choose who should receive the communication when the exit request
              reaches approval.
            </p>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <RadioOptionCard
                name="notifyOn"
                checked={formData.notifyOn === "approvers"}
                onChange={() => handleChange("notifyOn", "approvers")}
                label="Notify Approvers"
                description="Send approval updates to the approvers in the flow."
              />

              <RadioOptionCard
                name="notifyOn"
                checked={formData.notifyOn === "employee"}
                onChange={() => handleChange("notifyOn", "employee")}
                label="Notify Employee"
                description="Send the approval update directly to the employee."
              />
            </div>
          </InlineInfoCard>

          <div className="flex flex-col gap-3 border-t border-[#EAECF0] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className={secondaryButtonClassName}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={primaryButtonClassName}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExitPolicyCreate;
