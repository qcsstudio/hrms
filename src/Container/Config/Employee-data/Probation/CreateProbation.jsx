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
  "mt-2 h-11 w-full rounded-lg border border-[#D0D5DD] bg-white px-4 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 placeholder:text-[#98A2B3] focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const textareaClassName =
  "mt-2 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-4 py-3 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 placeholder:text-[#98A2B3] focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const dropdownTriggerClassName =
  "mt-2 flex h-11 w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-4 text-left text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCE9FF] focus:border-[#84ADFF]";

const draftButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#B2CCFF] bg-[#EFF6FF] px-5 text-sm font-medium text-[#3B82F6] shadow-none transition hover:translate-y-0 hover:bg-[#E0EEFF] hover:shadow-none";

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

const ChoiceRow = ({ name, checked, onChange, label }) => {
  return (
    <label
      className={`flex min-h-[48px] cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
        checked
          ? "border-[#A8CAFF] bg-[#F8FBFF]"
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
      <span className="text-sm font-medium text-[#101828]">{label}</span>
    </label>
  );
};

const BooleanSection = ({ title, name, value, onChange }) => {
  return (
    <div>
      <p className="text-sm font-medium text-[#101828]">{title}</p>
      <div className="mt-3 space-y-2">
        <ChoiceRow
          name={name}
          checked={value === true}
          onChange={() => onChange(name, true)}
          label="yes"
        />

        <ChoiceRow
          name={name}
          checked={value === false}
          onChange={() => onChange(name, false)}
          label="No"
        />
      </div>
    </div>
  );
};

export default function CreateProbation() {
const token = localStorage.getItem("authToken");
const axiosInstance = createAxios(token);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // ── companyOfficeId: read from localStorage on mount, then remove it
  const [companyOfficeId, setCompanyOfficeId] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        setCompanyOfficeId(Array.isArray(parsed) ? parsed : [parsed]);
      }
    } catch (e) {
      console.error("Failed to parse companyOfficeId from localStorage:", e);
    }

    // ── Remove from localStorage after reading
  
  }, []);

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
      // ── Include companyOfficeId in the payload
      const payload = {
        ...formData,
        companyOfficeId,
      };

      const res = await axiosInstance.post("/config/create-probation", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
  localStorage.removeItem("companyOfficeId");
      console.log(res?.data);
      dispatch(getprobitiondata(res?.data?.data));

      navigate("/config/hris/Employee-data/probation-list");
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
      <div className="mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-[32px] font-semibold leading-tight text-[#212529]">
            Create Probation
          </h1>
          <p className="mt-1 text-sm text-[#98A2B3]">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <div className="space-y-5 pb-24">
          <div>
            <label className="text-sm font-medium text-[#344054]">Policy Name</label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              placeholder="Choose Account"
              className={inputClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Lets write a brief description about this policy
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Choose Account"
              className={textareaClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              What will be the initial Probation Duration for this Plan?
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
              placeholder={selectedDuration?.label || "Choose Account"}
            />
          </div>

          <BooleanSection
            title="Is early employee confirmation allowed?"
            name="isEarlyConfirmationAllowed"
            value={formData.isEarlyConfirmationAllowed}
            onChange={handleBooleanChange}
          />

          <BooleanSection
            title="Do you want employee's status to automatically change from ON-Probation to Confirmed when their Probation period is over?"
            name="isAutoConfirm"
            value={formData.isAutoConfirm}
            onChange={handleBooleanChange}
          />

          <BooleanSection
            title="Do you want to notify employee?"
            name="notifyEmployee"
            value={formData.notifyEmployee}
            onChange={handleBooleanChange}
          />
        </div>

        <div className="fixed bottom-0 left-0 right-0 border-t border-[#EAECF0] bg-white/95 px-8 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              className={draftButtonClassName}
            >
              Save as Draft
            </button>

            <div className="flex items-center gap-3">
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
    </div>
  );
}