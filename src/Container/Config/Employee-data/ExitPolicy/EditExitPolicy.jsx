import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { toast } from "react-toastify";

const EXIT_POLICY_LIST_ROUTE = "/config/hris/Employee-data/exitPolicy-list";

const token = localStorage.getItem("authToken");
const axiosInstance = createAxios(token);

const fieldClassName =
  "mt-2 w-full rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const textareaClassName =
  "mt-2 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none";

const RadioOptionCard = ({ name, checked, onChange, label, description, children }) => {
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
          {description && (
            <p className="mt-1 text-xs leading-5 text-[#667085]">{description}</p>
          )}
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

const EditExitPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    notice: "",
    selfResign: true,
    changeNotice: true,
    managerInitiate: true,
    managerChangeNotice: true,
    notifyOn: "employee",
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // ── GET /config/getOne-exit-policy/:id → prefill form fields
  useEffect(() => {
    if (!id) return;

    const fetchPolicy = async () => {
      try {
        setLoading(true);

        const response = await axiosInstance.get(
          `/config/getOne-exit-policy/${id}`,
          // { meta: { auth: "ADMIN_AUTH" } }
        );

        const data = response?.data?.data || response?.data;

        if (data) {
          setFormData({
            name: data.name || "",
            description: data.description || "",
            notice: data.notice || "",
            selfResign: data.selfResign ?? true,
            changeNotice: data.changeNotice ?? true,
            managerInitiate: data.managerInitiate ?? true,
            managerChangeNotice: data.managerChangeNotice ?? true,
            notifyOn: data.notifyOn || "employee",
          });
        }
      } catch (error) {
        console.error("Error fetching exit policy:", error);
        toast.error("Failed to load exit policy data.", {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [id]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCancel = () => {
    navigate(EXIT_POLICY_LIST_ROUTE, { replace: true });
  };

  // ── PUT /config/update-exit-policy/:id
  const handleSubmit = async () => {
    try {
      setSaving(true);

      const payload = {
        ...formData,
        notice: Number(formData.notice),
      };

      const response = await axiosInstance.put(
        `/config/update-exit-policy/${id}`,
        payload,
        // { meta: { auth: "ADMIN_AUTH" } }
      );

      console.log("Exit policy updated:", response?.data);

      toast.success("Exit policy updated successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      navigate(EXIT_POLICY_LIST_ROUTE);
    } catch (error) {
      console.error("Error updating exit policy:", error);
      toast.error("Failed to update exit policy. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              Edit Exit Policy
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Review the exit settings and update the policy details using the
              same config UI style followed across the module.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Policy Mode
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              Editing existing policy
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-sm text-gray-400 mb-4">Loading policy data...</div>
        )}

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
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
                disabled={loading}
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
                disabled={loading}
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
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <InlineInfoCard title="Employee Resignation">
              <p className="text-sm text-[#475467]">
                Decide whether employees can start the resignation flow on their
                own and request notice period changes.
              </p>

              <div className="space-y-3">
                <RadioOptionCard
                  name="selfResign"
                  checked={formData.selfResign === true}
                  onChange={() => handleChange("selfResign", true)}
                  label="Yes"
                  description="Employees can initiate their own resignation request."
                >
                  <InlineInfoCard title="Notice Period Change Request">
                    <RadioOptionCard
                      name="changeNotice"
                      checked={formData.changeNotice === true}
                      onChange={() => handleChange("changeNotice", true)}
                      label="Yes"
                      description="Allow employees to ask for changes in their notice period."
                    />
                    <RadioOptionCard
                      name="changeNotice"
                      checked={formData.changeNotice === false}
                      onChange={() => handleChange("changeNotice", false)}
                      label="No"
                      description="Keep the original notice period fixed for employee requests."
                    />
                  </InlineInfoCard>
                </RadioOptionCard>

                <RadioOptionCard
                  name="selfResign"
                  checked={formData.selfResign === false}
                  onChange={() => {
                    handleChange("selfResign", false);
                    handleChange("changeNotice", false);
                  }}
                  label="No"
                  description="Employees cannot start the resignation process themselves."
                />
              </div>
            </InlineInfoCard>

            <InlineInfoCard title="Manager-Initiated Separation">
              <p className="text-sm text-[#475467]">
                Control whether managers can begin separation and whether they
                can request changes to the notice duration.
              </p>

              <div className="space-y-3">
                <RadioOptionCard
                  name="managerInitiate"
                  checked={formData.managerInitiate === true}
                  onChange={() => handleChange("managerInitiate", true)}
                  label="Yes"
                  description="Managers can initiate separation for their team members."
                >
                  <InlineInfoCard title="Manager Notice Change Request">
                    <RadioOptionCard
                      name="managerChangeNotice"
                      checked={formData.managerChangeNotice === true}
                      onChange={() => handleChange("managerChangeNotice", true)}
                      label="Yes"
                      description="Managers can request a change in the notice period."
                    />
                    <RadioOptionCard
                      name="managerChangeNotice"
                      checked={formData.managerChangeNotice === false}
                      onChange={() => handleChange("managerChangeNotice", false)}
                      label="No"
                      description="Managers must continue with the existing notice period."
                    />
                  </InlineInfoCard>
                </RadioOptionCard>

                <RadioOptionCard
                  name="managerInitiate"
                  checked={formData.managerInitiate === false}
                  onChange={() => {
                    handleChange("managerInitiate", false);
                    handleChange("managerChangeNotice", false);
                  }}
                  label="No"
                  description="Managers cannot start the separation process from this policy."
                />
              </div>
            </InlineInfoCard>
          </div>

          <InlineInfoCard title="Approval Notification">
            <p className="text-sm text-[#475467]">
              Choose who should receive the notification once this exit flow
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
              disabled={saving}
              className={secondaryButtonClassName}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || saving}
              className={`${primaryButtonClassName} disabled:opacity-50`}
            >
              {saving ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExitPolicy;