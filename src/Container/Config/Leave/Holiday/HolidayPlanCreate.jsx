import { useState } from "react";

const STEPS = ["Describe", "Preferences", "Plan", "Approval", "Preview"];

/* ─────────────────────────────────────────────
   STEPPER
───────────────────────────────────────────── */
function Stepper({ currentStep }) {
  return (
    <div className="flex items-start justify-evenly w-full mb-8 px-4">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${
                  isActive
                    ? "border-blue-500 text-blue-500 bg-white"
                    : isDone
                    ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}
              >
                {isDone ? "✓" : stepNum}
              </div>
              <span
                className={`text-xs mt-1 whitespace-nowrap ${
                  isActive ? "text-blue-500 font-semibold" : "text-gray-400"
                }`}
              >
                {label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                className={`h-px w-16 md:w-24 lg:w-32 mx-2 mb-4 ${
                  isDone ? "bg-blue-500" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   YES / NO BOX  (matches clockInMethod style)
───────────────────────────────────────────── */
function YesNoBox({ label, value, onChange, name }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-blue-600">{label}</p>}

      <label
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "yes"
            ? "bg-blue-50 border-blue-500"
            : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <div className="flex items-center">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={(e) => onChange(e.target.value)}
            className="mr-2 accent-blue-500"
          />
          <span className="text-sm">Yes</span>
        </div>
        {value === "yes" && <span className="text-green-500 text-lg">✔</span>}
      </label>

      <label
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "no"
            ? "bg-gray-50 border-blue-500"
            : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <div className="flex items-center">
          <input
            type="radio"
            name={name}
            value="no"
            checked={value === "no"}
            onChange={(e) => onChange(e.target.value)}
            className="mr-2 accent-blue-500"
          />
          <span className="text-sm">No</span>
        </div>
        {value === "no" && <span className="text-green-500 text-lg">✔</span>}
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 1 — Describe
───────────────────────────────────────────── */
function StepDescribe({ form, setForm, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">
          Holiday Plan Name
        </label>
        <input
          type="text"
          placeholder="Enter plan name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 ${
            errors.name ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">Name cannot be empty</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-blue-600">
          Add a description to help your colleagues
        </label>
        <textarea
          placeholder="Enter description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 2 — Preferences
───────────────────────────────────────────── */
function StepPreferences({ form, setForm }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">
          For which year are you creating these holiday preferences?
        </label>
        <select
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
          <option value="">Select year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>

      <YesNoBox
        label="Employees get mandatory holidays"
        value={form.mandatoryHolidays}
        onChange={(v) => setForm({ ...form, mandatoryHolidays: v })}
        name="mandatory"
      />

      <YesNoBox
        label="Employees get optional holidays"
        value={form.optionalHolidays}
        onChange={(v) => setForm({ ...form, optionalHolidays: v })}
        name="optional"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 3 — Plan
───────────────────────────────────────────── */
function StepPlan({ form, setForm }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">
          Existing Employees Date
        </label>
        <input
          type="date"
          value={form.existingEmployeeDate}
          onChange={(e) =>
            setForm({ ...form, existingEmployeeDate: e.target.value })
          }
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={form.sendEmailExisting}
          onChange={() =>
            setForm({ ...form, sendEmailExisting: !form.sendEmailExisting })
          }
          className="accent-blue-500"
        />
        Send email notification to manager
      </label>

      <div>
        <label className="text-sm font-medium text-blue-600">
          New Employee (Within days of joining)
        </label>
        <input
          type="number"
          placeholder="Enter days"
          value={form.newEmployeeDays}
          onChange={(e) =>
            setForm({ ...form, newEmployeeDays: e.target.value })
          }
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
        <input
          type="checkbox"
          checked={form.sendEmailNew}
          onChange={() =>
            setForm({ ...form, sendEmailNew: !form.sendEmailNew })
          }
          className="accent-blue-500"
        />
        Send email notification to manager
      </label>

      {form.optionalHolidays === "yes" && (
        <div>
          <label className="text-sm font-medium text-blue-600">
            Maximum optional holidays
          </label>
          <input
            type="number"
            placeholder="Enter number"
            value={form.maxOptionalHolidays}
            onChange={(e) =>
              setForm({ ...form, maxOptionalHolidays: e.target.value })
            }
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 4 — Approval
───────────────────────────────────────────── */
function StepApproval({ form, setForm }) {
  return (
    <div className="space-y-6">
      <YesNoBox
        label="Is approval required for optional holidays?"
        value={form.approvalRequired}
        onChange={(v) => setForm({ ...form, approvalRequired: v })}
        name="approval"
      />

      {form.approvalRequired === "yes" && (
        <div>
          <label className="text-sm font-medium text-blue-600">
            Who approves optional holiday requests?
          </label>
          <select
            value={form.approver}
            onChange={(e) => setForm({ ...form, approver: e.target.value })}
            className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
          >
            <option value="">Select approver</option>
            <option value="manager">Direct Manager</option>
            <option value="hr">HR</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      )}

      <YesNoBox
        label="Send notification to approver when request is raised?"
        value={form.notifyApprover}
        onChange={(v) => setForm({ ...form, notifyApprover: v })}
        name="notifyApprover"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 5 — Preview
───────────────────────────────────────────── */
function StepPreview({ form }) {
  const rows = [
    { label: "Plan Name", value: form.name || "—" },
    { label: "Description", value: form.description || "—" },
    { label: "Year", value: form.year || "—" },
    { label: "Mandatory Holidays", value: form.mandatoryHolidays },
    { label: "Optional Holidays", value: form.optionalHolidays },
    { label: "Existing Employee Date", value: form.existingEmployeeDate || "—" },
    {
      label: "Email Notification (Existing)",
      value: form.sendEmailExisting ? "yes" : "no",
    },
    { label: "New Employee Days", value: form.newEmployeeDays || "—" },
    {
      label: "Email Notification (New)",
      value: form.sendEmailNew ? "yes" : "no",
    },
    ...(form.optionalHolidays === "yes"
      ? [{ label: "Max Optional Holidays", value: form.maxOptionalHolidays || "—" }]
      : []),
    { label: "Approval Required", value: form.approvalRequired },
    ...(form.approvalRequired === "yes"
      ? [
          { label: "Approver", value: form.approver || "—" },
          { label: "Notify Approver", value: form.notifyApprover },
        ]
      : []),
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">
        Review your holiday plan settings before saving.
      </p>
      {rows.map(({ label, value }) => (
        <div
          key={label}
          className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 bg-gray-50"
        >
          <span className="text-sm text-gray-600">{label}</span>
          <span
            className={`text-sm font-medium capitalize ${
              value === "yes"
                ? "text-green-600"
                : value === "no"
                ? "text-red-400"
                : "text-gray-800"
            }`}
          >
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HolidayPlanCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    // Step 1
    name: "",
    description: "",
    // Step 2
    year: "",
    mandatoryHolidays: "yes",
    optionalHolidays: "no",
    // Step 3
    existingEmployeeDate: "",
    sendEmailExisting: true,
    newEmployeeDays: "",
    sendEmailNew: true,
    maxOptionalHolidays: "",
    // Step 4
    approvalRequired: "no",
    approver: "",
    notifyApprover: "no",
  });

  const validate = () => {
    const errs = {};
    if (currentStep === 1 && !form.name.trim()) {
      errs.name = true;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (!validate()) return;
    setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 1));
  };

  const handleSave = () => {
    console.log("✅ Holiday Plan:", form);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepDescribe form={form} setForm={setForm} errors={errors} />;
      case 2:
        return <StepPreferences form={form} setForm={setForm} />;
      case 3:
        return <StepPlan form={form} setForm={setForm} />;
      case 4:
        return <StepApproval form={form} setForm={setForm} />;
      case 5:
        return <StepPreview form={form} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            Create Holiday Plan
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        <hr className="mb-8 border-gray-100" />

        {/* Step Content */}
        <div className="">{renderStep()}</div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="border border-blue-500 text-blue-500 px-5 py-2 rounded-full text-sm hover:bg-blue-50 transition"
          >
            Save as Draft
          </button>

          <div className="flex gap-3 items-center">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Back
              </button>
            )}

            <button className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition">
              Cancel
            </button>

            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}