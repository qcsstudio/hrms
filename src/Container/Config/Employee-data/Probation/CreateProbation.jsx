import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { getprobitiondata } from "../../../../Redux/configSlices/probitionSlice";

const PROBATION_LIST_ROUTE = "/config/hris/Employee-data/probation-list";

const probationDurationOptions = [
  { value: 30, label: "30 Days" },
  { value: 60, label: "60 Days" },
  { value: 90, label: "90 Days" },
  { value: 180, label: "180 Days" },
];

const inputClassName =
  "mt-2 h-[42px] w-full rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const textareaClassName =
  "mt-2 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const dropdownTriggerClassName =
  "mt-2 flex h-[42px] w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-4 text-left text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCE9FF] focus:border-[#84ADFF]";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none";

const DivSelect = ({ value, onSelect, options, placeholder = "Choose Duration" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${dropdownTriggerClassName} ${isOpen ? "border-[#98B9F8]" : ""}`}
      >
        <span className={selectedOption ? "text-[#101828]" : "text-[#98A2B3]"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-[#667085] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)]">
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-4 py-3 text-left text-sm shadow-none outline-none transition-colors focus:outline-none focus:ring-0 ${
                  isSelected
                    ? "bg-[#E8EDF4] font-semibold text-[#111827]"
                    : "text-[#1F2937] hover:bg-[#F4F7FB] active:bg-[#EDEFF4]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ title, children }) => {
  return (
    <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
      <p className="text-sm font-medium text-[#101828]">{title}</p>
      <div className="mt-2 text-sm leading-6 text-[#475467]">{children}</div>
    </div>
  );
};

const ChoiceCard = ({
  name,
  checked,
  onChange,
  label,
  description,
}) => {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors ${
        checked
          ? "border-[#A8CAFF] bg-[#EFF6FF]"
          : "border-[#E4E7EC] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 accent-[#0575E6]"
      />

      <div>
        <p className="text-sm font-medium text-[#101828]">{label}</p>
        <p className="mt-1 text-xs leading-5 text-[#667085]">{description}</p>
      </div>
    </label>
  );
};

const BooleanSection = ({ title, description, name, value, onChange }) => {
  return (
    <div className="rounded-2xl border border-[#E4E7EC] bg-[#FCFCFD] p-5">
      <div className="mb-4">
        <p className="text-sm font-semibold text-[#101828]">{title}</p>
        <p className="mt-1 text-sm leading-6 text-[#667085]">{description}</p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <ChoiceCard
          name={name}
          checked={value === true}
          onChange={() => onChange(name, true)}
          label="Yes"
          description="Enable this option for the probation policy."
        />

        <ChoiceCard
          name={name}
          checked={value === false}
          onChange={() => onChange(name, false)}
          label="No"
          description="Keep this option turned off for the probation policy."
        />
      </div>
    </div>
  );
};

export default function CreateProbation() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const axiosInstance = createAxios(token);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    policyName: "",
    description: "",
    probationDurationDays: "",
    isEarlyConfirmationAllowed: false,
    isAutoConfirm: false,
    notifyEmployee: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (name === "probationDurationDays") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBooleanChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.post("/config/create-probation", formData, {
        meta: { auth: "ADMIN_AUTH" },
      });

      console.log(res?.data);
      dispatch(getprobitiondata(res?.data?.data));

      navigate(PROBATION_LIST_ROUTE);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => {
    navigate(PROBATION_LIST_ROUTE);
  };

  const selectedDuration = probationDurationOptions.find(
    (option) => option.value === formData.probationDurationDays
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              Create Probation
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Configure the probation policy using the same structured employee
              settings layout followed across the module.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Policy Summary
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              {selectedDuration?.label || "Duration not selected"}
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-[#344054]">
                  Policy Name
                </label>
                <input
                  type="text"
                  name="policyName"
                  value={formData.policyName}
                  onChange={handleChange}
                  placeholder="Enter probation policy name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#344054]">
                  Probation Duration
                </label>
                <DivSelect
                  value={formData.probationDurationDays}
                  onSelect={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      probationDurationDays: value,
                    }))
                  }
                  options={probationDurationOptions}
                  placeholder="Choose Duration"
                />
              </div>
            </div>

            <InfoCard title="Policy Guidance">
              Set the initial probation period first, then decide whether
              employees can be confirmed early, confirmed automatically, and
              notified during the workflow.
            </InfoCard>
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Description
            </label>
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write a short description for this probation policy"
              className={textareaClassName}
            />
          </div>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <BooleanSection
              title="Early Confirmation"
              description="Choose whether employees can be confirmed before the full probation period ends."
              name="isEarlyConfirmationAllowed"
              value={formData.isEarlyConfirmationAllowed}
              onChange={handleBooleanChange}
            />

            <BooleanSection
              title="Auto Confirmation"
              description="Choose whether the employee should be confirmed automatically when the probation period completes."
              name="isAutoConfirm"
              value={formData.isAutoConfirm}
              onChange={handleBooleanChange}
            />

            <BooleanSection
              title="Employee Notification"
              description="Choose whether the employee should receive communication about probation updates."
              name="notifyEmployee"
              value={formData.notifyEmployee}
              onChange={handleBooleanChange}
            />
          </div>

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
}
