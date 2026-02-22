import { useState } from "react";

/* ─────────────────────────────────────────────
   YES / NO BOX
───────────────────────────────────────────── */
function YesNoBox({ label, value, onChange, name }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-gray-700">{label}</p>

      {/* YES */}
      <label
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "yes" ? "bg-blue-50 border-blue-500" : "border-gray-200 hover:border-gray-400"
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
        {value === "yes" && <span className="text-green-500 font-semibold">✔</span>}
      </label>

      {/* NO */}
      <label
        className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "no" ? "bg-blue-50 border-blue-500" : "border-gray-200 hover:border-gray-400"
        }`}
      >
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === "no"}
          onChange={(e) => onChange(e.target.value)}
          className="mr-2 accent-blue-500"
        />
        <span className="text-sm">No</span>
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INFO BANNER (replaces Yes/No when locked)
───────────────────────────────────────────── */
function InfoBanner({ message }) {
  return (
    <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
      <span className="text-blue-500 mt-0.5 text-base">ℹ️</span>
      <p className="text-sm text-blue-700">{message}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEPPER
───────────────────────────────────────────── */
const STEPS = ["Describe", "Input Type", "Biometric", "Web", "Mobile", "Preview"];

function Stepper({ currentStep }) {
  return (
    <div className="flex items-start justify-center w-full mb-8 px-4">
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
   STEP PAGES
───────────────────────────────────────────── */

// Step 1: Describe
function StepDescribe({ form, setForm, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">Device Name</label>
        <input
          type="text"
          placeholder="Enter Shift Name"
          value={form.deviceName}
          onChange={(e) => setForm({ ...form, deviceName: e.target.value })}
          className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 ${
            errors.deviceName ? "border-red-400" : "border-gray-200"
          }`}
        />
        {errors.deviceName && (
          <p className="text-red-500 text-xs mt-1">name can not be empty</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium text-blue-600">
          Kindly, provide internal description for other admins who would view this setting
        </label>
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm min-h-[100px] outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}

// Step 2: Input Type
function StepInputType({ form, setForm }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-8">
        {/* Clock type */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Do employees need to clock-in and clock-out, or only clock-in is sufficient?
          </p>
          {[
            { val: "both", label: "Clock-in and clock out, both required" },
            { val: "only", label: "Only Clock in required" },
          ].map(({ val, label }) => (
            <label
              key={val}
              className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
                form.clockType === val
                  ? "bg-blue-50 border-blue-500"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <input
                type="radio"
                name="clockType"
                value={val}
                checked={form.clockType === val}
                onChange={(e) => setForm({ ...form, clockType: e.target.value })}
                className="mr-2 accent-blue-500"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>

        {/* Track break */}
        <YesNoBox
          label="Would you like to track break durations between Clock-out and Clock-in times?"
          value={form.trackBreak}
          onChange={(v) => setForm({ ...form, trackBreak: v })}
          name="trackBreak"
        />
      </div>

      {form.trackBreak === "yes" && (
        <div>
          <p className="text-sm font-medium text-gray-700">
            How much time is allocated to employee as break-time?
          </p>
          <div className="flex gap-4 mt-2">
            <div>
              <input
                type="number"
                className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">Hrs</p>
            </div>
            <div>
              <input
                type="number"
                className="w-24 border border-gray-200 rounded-lg px-3 py-2 text-sm"
                placeholder="0"
              />
              <p className="text-xs text-gray-400 mt-1">Mins</p>
            </div>
          </div>
        </div>
      )}

      <YesNoBox
        label="Would you like to enable Hybrid attendance mode?"
        value={form.hybrid}
        onChange={(v) => setForm({ ...form, hybrid: v })}
        name="hybrid"
      />
    </div>
  );
}

// Step 3: Biometric
function StepBiometric({ form, setForm }) {
  return (
    <div className="space-y-6">
      <YesNoBox
        label="Would you like to enable biometric attendance?"
        value={form.biometric}
        onChange={(v) => setForm({ ...form, biometric: v })}
        name="biometric"
      />

      {form.biometric === "yes" && (
        <YesNoBox
          label="Do you wish to track attendance with separate device for recording in-time and a separate device for recording out-time (use in/out directional devices)?"
          value={form.directionalDevice}
          onChange={(v) => setForm({ ...form, directionalDevice: v })}
          name="directional"
        />
      )}
    </div>
  );
}

// Step 4: Web
// - If biometric = yes → hide Yes/No, show info banner (web is not selectable)
// - If biometric = no → show Yes/No normally
function StepWeb({ form, setForm }) {
  const biometricEnabled = form.biometric === "yes";

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-gray-700">
        Would you like to enable web based attendance via Windows Linux Mac browser?
      </p>

      {biometricEnabled ? (
        <InfoBanner message="Biometric attendance is already enabled. Web-based attendance Yes/No selection is not available when Biometric is active. Web attendance settings are managed through biometric configuration." />
      ) : (
        <YesNoBox
          label=""
          value={form.webAttendance}
          onChange={(v) => setForm({ ...form, webAttendance: v })}
          name="web"
        />
      )}

      {/* IP Restriction — only show if biometric is NOT enabled and web is yes */}
      {!biometricEnabled && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Would you like to enforce IP Network restrictions as well?
          </p>
          {biometricEnabled ? (
            <InfoBanner message="IP restrictions are not configurable when Biometric attendance is active." />
          ) : (
            <YesNoBox
              label=""
              value={form.ipRestriction}
              onChange={(v) => setForm({ ...form, ipRestriction: v })}
              name="ip"
            />
          )}

          {form.ipRestriction === "yes" && (
            <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
              <p className="text-blue-600 mt-1 cursor-pointer text-sm">Select IPs</p>
              <p className="text-red-500 text-xs mt-1">Please select IP</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Step 5: Mobile
// Rules:
//   - biometric = yes → hide Yes/No for mobile, show info banner
//   - biometric = no, web = no → hide Yes/No for mobile, show info banner
//   - biometric = no, web = yes → show Yes/No for mobile normally
function StepMobile({ form, setForm }) {
  const biometricEnabled = form.biometric === "yes";
  const webEnabled = form.webAttendance === "yes";
  const mobileBlocked = biometricEnabled || !webEnabled;

  const bannerMessage = biometricEnabled
    ? "Biometric attendance is already enabled. Mobile attendance Yes/No selection is not available when Biometric is active."
    : "Web-based attendance must be enabled first before configuring mobile attendance. Please go back and enable Web attendance.";

  return (
    <div className="space-y-6">
      <p className="text-sm font-medium text-gray-700">
        Would you like to enable mobile based attendance (via Android/iOS-app)?
      </p>

      {mobileBlocked ? (
        <InfoBanner message={bannerMessage} />
      ) : (
        <YesNoBox
          label=""
          value={form.mobileAttendance}
          onChange={(v) => setForm({ ...form, mobileAttendance: v })}
          name="mobile"
        />
      )}

      {/* GPS — only shown when mobile is NOT blocked */}
      {!mobileBlocked && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Would you like to enforce GPS location based attendance?
          </p>
          <YesNoBox
            label=""
            value={form.gpsAttendance}
            onChange={(v) => setForm({ ...form, gpsAttendance: v })}
            name="gps"
          />

          {form.gpsAttendance === "yes" && (
            <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Yes</span>
                <span className="text-green-500 font-bold">✔</span>
              </div>
              <p className="text-blue-600 mt-3 cursor-pointer text-sm">Select GPS</p>
              <p className="text-red-500 text-xs mt-1">Please select GPS</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Step 6: Preview
function StepPreview({ form }) {
  const biometricEnabled = form.biometric === "yes";

  const rows = [
    { label: "Device Name", value: form.deviceName || "—" },
    { label: "Description", value: form.description || "—" },
    {
      label: "Clock Type",
      value: form.clockType === "both" ? "Clock-in & Clock-out" : "Only Clock-in",
    },
    { label: "Track Break", value: form.trackBreak },
    { label: "Hybrid Mode", value: form.hybrid },
    { label: "Biometric", value: form.biometric },
    ...(form.biometric === "yes"
      ? [{ label: "Directional Device", value: form.directionalDevice }]
      : []),
    {
      label: "Web Attendance",
      value: biometricEnabled ? "Managed via Biometric" : form.webAttendance,
    },
    ...(!biometricEnabled
      ? [{ label: "IP Restriction", value: form.ipRestriction }]
      : []),
    {
      label: "Mobile Attendance",
      value: biometricEnabled ? "Managed via Biometric" : form.mobileAttendance,
    },
    ...(!biometricEnabled
      ? [{ label: "GPS Attendance", value: form.gpsAttendance }]
      : []),
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">
        Review your clock-in method settings before saving.
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
export default function ClockInMethodCreate() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    deviceName: "",
    description: "",
    clockType: "only",
    trackBreak: "no",
    hybrid: "no",
    biometric: "no",
    directionalDevice: "no",
    webAttendance: "no",
    ipRestriction: "no",
    mobileAttendance: "yes",
    gpsAttendance: "no",
  });

  const validate = () => {
    const errs = {};
    if (currentStep === 1 && !form.deviceName.trim()) {
      errs.deviceName = true;
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
    console.log("✅ Final Form Data:", form);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepDescribe form={form} setForm={setForm} errors={errors} />;
      case 2: return <StepInputType form={form} setForm={setForm} />;
      case 3: return <StepBiometric form={form} setForm={setForm} />;
      case 4: return <StepWeb form={form} setForm={setForm} />;
      case 5: return <StepMobile form={form} setForm={setForm} />;
      case 6: return <StepPreview form={form} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Create Clock-in Method</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Stepper */}
        <Stepper currentStep={currentStep} />

        <hr className="mb-8 border-gray-100" />

        {/* Step Content */}
        <div className="max-w-3xl">{renderStep()}</div>

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