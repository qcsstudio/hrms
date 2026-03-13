import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const PROBATION_LIST_ROUTE = "/config/hris/Employee-data/probation-list";

const probationDurationOptions = [
  { value: "30", label: "30 Days" },
  { value: "60", label: "60 Days" },
  { value: "90", label: "90 Days" },
  { value: "180", label: "180 Days" },
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

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

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
            const isSelected = String(option.value) === String(value);

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

export default function ProbationEdit() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosInstance = createAxios(token);

  const [form, setForm] = useState({
    policyName: "",
    probationDurationDays: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    console.log("Updated Probation:", form);
    const payload = {
      ...form,
      _id: id,
    };

    try {
      await axiosInstance.post(`/config/create-probation`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate(PROBATION_LIST_ROUTE);
    } catch (error) {
      console.log("api is not working", error);
    }
  };

  const handleCancel = () => {
    navigate(PROBATION_LIST_ROUTE);
  };

  useEffect(() => {
    const fetchprobition = async () => {
      try {
        const res = await axiosInstance.get(`/config/probation-get/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        setForm({
          policyName: res?.data?.data?.policyName || "",
          probationDurationDays: String(
            res?.data?.data?.probationDurationDays || ""
          ),
          description: res?.data?.data?.description || "",
        });

        console.log("fetchprobition single view====", res?.data);
      } catch (error) {
        console.log("failed to fetch probation", error);
      }
    };

    fetchprobition();
  }, [id, token]);

  const selectedDuration = probationDurationOptions.find(
    (option) => String(option.value) === String(form.probationDurationDays)
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              Edit Probation Plan
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Update the probation policy using the same structured layout
              followed across the employee settings module.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Current Duration
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
                  Probation Name
                </label>
                <input
                  type="text"
                  name="policyName"
                  value={form.policyName}
                  onChange={handleChange}
                  placeholder="Enter probation plan name"
                  className={inputClassName}
                />
              </div>

              <div>
                <label className="text-sm font-medium text-[#344054]">
                  Probation Duration
                </label>
                <DivSelect
                  value={form.probationDurationDays}
                  onSelect={(value) =>
                    setForm((prev) => ({
                      ...prev,
                      probationDurationDays: value,
                    }))
                  }
                  options={probationDurationOptions}
                  placeholder="Choose Duration"
                />
              </div>
            </div>

            <InfoCard title="Edit Guidance">
              Update the duration or description carefully so the probation plan
              remains aligned with employee confirmation timelines.
            </InfoCard>
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={5}
              placeholder="Write a short description for this probation plan"
              className={textareaClassName}
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
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
