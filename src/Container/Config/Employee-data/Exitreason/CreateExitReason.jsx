import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const EXIT_REASON_LIST_ROUTE = "/config/hris/Employee-data/exit-reason";

const exitTypeOptions = [
  { value: "resignation", label: "Resignation" },
  { value: "termination", label: "Termination" },
];

const dropdownTriggerClassName =
  "mt-2 flex h-[42px] w-full items-center justify-between rounded-lg border border-[#D0D5DD] bg-white px-4 text-left text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#DCE9FF] focus:border-[#84ADFF]";

const textareaClassName =
  "mt-2 w-full resize-none rounded-lg border border-[#D0D5DD] bg-white px-4 py-2.5 text-sm text-[#101828] shadow-none outline-none transition-colors duration-200 focus:border-[#84ADFF] focus:outline-none focus:ring-2 focus:ring-[#DCE9FF]";

const secondaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-6 text-sm font-medium text-[#344054] shadow-none transition hover:translate-y-0 hover:bg-[#F9FAFB] hover:shadow-none";

const primaryButtonClassName =
  "inline-flex h-10 items-center justify-center rounded-lg bg-[#0575E6] px-6 text-sm font-medium text-white shadow-none transition hover:translate-y-0 hover:bg-[#0467CA] hover:shadow-none";

const DivSelect = ({ value, onSelect, options, placeholder = "Choose Type" }) => {
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
            const isSelected = value === option.value;

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

const CreateExitReason = () => {
  const token = localStorage.getItem("authToken");
  const [form, setForm] = useState({
    exitType: "",
    description: "",
  });

  const navigate = useNavigate();
  const axiosInstance = createAxios(token);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.post("/config/create-exit-reason", form, {
        meta: { auth: "ADMIN_AUTH" },
      });
      console.log(res.data, "exit reason created successfully");
      navigate(EXIT_REASON_LIST_ROUTE);
    } catch (error) {
      console.log(error, "api is not working");
    }
  };

  const handleCancel = () => {
    navigate(EXIT_REASON_LIST_ROUTE);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 card-animate">
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-[#101828]">
              Create Exit Reason
            </h1>
            <p className="mt-1 text-sm text-[#667085]">
              Add a standardized reason for employee resignation or termination.
            </p>
          </div>

          <div className="rounded-xl border border-[#D9E4F2] bg-[#F5F9FF] px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Mode
            </p>
            <p className="mt-1 text-sm font-semibold text-[#101828]">
              New exit reason
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-2xl border border-[#E4E7EC] bg-white p-6 shadow-[0_12px_32px_rgba(15,23,42,0.05)]">
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <label className="text-sm font-medium text-[#344054]">Exit Type</label>
              <DivSelect
                value={form.exitType}
                onSelect={(value) =>
                  setForm((prev) => ({
                    ...prev,
                    exitType: value,
                  }))
                }
                options={exitTypeOptions}
                placeholder="Choose Type"
              />
            </div>

            <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-4">
              <p className="text-sm font-medium text-[#101828]">Usage Note</p>
              <p className="mt-2 text-sm leading-6 text-[#475467]">
                Exit reasons help keep resignation and termination records
                consistent across employee workflows and reports.
              </p>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-[#344054]">Description</label>
            <textarea
              name="description"
              onChange={handleChange}
              value={form.description}
              placeholder="Enter description"
              rows={5}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateExitReason;
