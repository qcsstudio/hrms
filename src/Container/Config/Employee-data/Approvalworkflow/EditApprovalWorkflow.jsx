import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const mockFetchWorkflow = () => ({
  selected: "all-hands",
  inactionHandling: "yes",
  backupDecision: "backup",
  managerChange: "pending",
  levels: 2,
  hierarchySelect: "manager",
  inactionDays: "",
  inactionAction: "",
  backupPerson: "",
  levelInactionAction: "",
});

const tabConfigs = [
  {
    title: "Define Workflow",
    heading: "HRIS",
    description:
      "HRIS covers employee bank-detail changes and probation confirmations.",
  },
  {
    title: "HRIS Workflow",
    heading: "HRIS",
    description:
      "HRIS covers employee bank-detail changes and probation confirmations.",
  },
  {
    title: "Attendance Workflow",
    heading: "Attendance",
    description:
      "Attendance covers employee check-in, check-out and overtime requests.",
  },
  {
    title: "Leave Workflow",
    heading: "Leave",
    description:
      "Leave covers employee leave applications and compensatory off requests.",
  },
  {
    title: "Expense Workflow",
    heading: "Expense",
    description:
      "Expense covers employee reimbursement and advance salary requests.",
  },
  {
    title: "Exit Workflow",
    heading: "Exit",
    description:
      "Exit covers employee resignation, termination and full & final settlement.",
  },
];

const workflowOptions = [
  {
    id: "full-trust",
    label: "Full-trust workflow",
    description: "All requests auto-approved instantly.",
  },
  {
    id: "free-flowing",
    label: "Free flowing workflow",
    description: "Any one approver can approve.",
  },
  {
    id: "all-hands",
    label: "All-hands-in workflow",
    description: "All approvers must approve.",
  },
  {
    id: "level-based",
    label: "Level-based workflow",
    description: "Multi-level approval workflow.",
  },
];

const hierarchyOptions = [
  { value: "manager", label: "Manager" },
  { value: "hr", label: "HR Admin" },
  { value: "department-head", label: "Department Head" },
];

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const FormDivSelect = ({
  options = [],
  value,
  onSelect,
  placeholder = "Select",
  disabled = false,
}) => {
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
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        className={`mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
          disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
        }`}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
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
                className={`w-full border-none px-4 py-3 text-left text-sm shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                  isSelected
                    ? "bg-[#E8EDF4] text-[#111827] font-semibold"
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

const ChoiceCard = ({ active, children }) => (
  <div
    className={`flex gap-3 rounded-lg border p-4 transition ${
      active ? "border-blue-600 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
    }`}
  >
    {children}
  </div>
);

const EditApprovalWorkflow = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState(null);

  useEffect(() => {
    const data = mockFetchWorkflow();
    setForm(data);
  }, [id]);

  if (!form) {
    return (
      <div className="p-8 mx-auto">
        <div className="max-w-5xl rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500">
          Loading workflow...
        </div>
      </div>
    );
  }

  const config = tabConfigs[activeTab];
  const setFormValue = (patch) => setForm((prev) => ({ ...prev, ...patch }));

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Approval Workflow</h1>
        <p className="text-sm text-gray-500 mt-1">Update existing workflow configuration</p>
      </div>

      <div className="mb-6 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <div className="flex min-w-max">
          {tabConfigs.map((tab, index) => {
            const isActive = activeTab === index;
            return (
              <button
                key={tab.title}
                type="button"
                onClick={() => setActiveTab(index)}
                className={`border-none px-5 py-3 text-sm font-medium transition ${
                  isActive
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "border-b-2 border-transparent text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-5xl space-y-8 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{config.heading}</h3>
          <p className="mt-1 text-sm text-gray-500">{config.description}</p>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-800">Choose workflow type</p>
          <div className="space-y-3">
            {workflowOptions.map((option) => {
              const isSelected = form.selected === option.id;
              return (
                <label key={option.id} className="cursor-pointer">
                  <ChoiceCard active={isSelected}>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setFormValue({ selected: option.id })}
                      className="mt-1 accent-blue-600"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{option.label}</p>
                      <p className="mt-1 text-xs text-gray-500">{option.description}</p>
                    </div>
                  </ChoiceCard>
                </label>
              );
            })}
          </div>
        </div>

        {(form.selected === "free-flowing" || form.selected === "all-hands") && (
          <div>
            <p className="text-sm font-medium text-gray-800">
              Select employees based on their position in hierarchy
            </p>
            <FormDivSelect
              options={hierarchyOptions}
              value={form.hierarchySelect}
              onSelect={(value) => setFormValue({ hierarchySelect: value })}
              placeholder="Choose hierarchy"
            />
          </div>
        )}

        <div>
          <p className="mb-3 text-sm font-medium text-gray-800">
            Do you want to automatically handle inaction on any request by the selected persons
            in this workflow?
          </p>
          <div className="space-y-3">
            {["yes", "no"].map((value) => {
              const isSelected = form.inactionHandling === value;
              return (
                <label key={value} className="cursor-pointer">
                  <ChoiceCard active={isSelected}>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setFormValue({ inactionHandling: value })}
                      className="accent-blue-600"
                    />
                    <span className="text-sm font-medium capitalize text-gray-800">{value}</span>
                  </ChoiceCard>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-800">
            If approvers mentioned above do not exist for any requester, choose backup decision
            maker
          </p>
          <div className="space-y-3">
            {[
              { id: "self", label: "Allow Self Approval" },
              { id: "backup", label: "Select as a back-up decision maker" },
            ].map((option) => {
              const isSelected = form.backupDecision === option.id;
              return (
                <label key={option.id} className="cursor-pointer">
                  <ChoiceCard active={isSelected}>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setFormValue({ backupDecision: option.id })}
                      className="accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-800">{option.label}</span>
                  </ChoiceCard>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <p className="mb-3 text-sm font-medium text-gray-800">
            How do you want to handle requests after change of manager/approver?
          </p>
          <div className="space-y-3">
            {[
              { id: "all", label: "Transfer all request to the New Manager" },
              { id: "pending", label: "Transfer only Pending request to the New Manager" },
            ].map((option) => {
              const isSelected = form.managerChange === option.id;
              return (
                <label key={option.id} className="cursor-pointer">
                  <ChoiceCard active={isSelected}>
                    <input
                      type="radio"
                      checked={isSelected}
                      onChange={() => setFormValue({ managerChange: option.id })}
                      className="accent-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-800">{option.label}</span>
                  </ChoiceCard>
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className={`${flatSecondaryButtonClassName} w-full sm:w-auto`}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => console.log("Updated workflow:", form)}
            className={`${flatPrimaryButtonClassName} w-full sm:w-auto`}
          >
            Update Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApprovalWorkflow;
