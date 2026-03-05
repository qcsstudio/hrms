import { useState } from "react";

/* ------------------ HELPERS ------------------ */
const defaultBifurcation = () => ({
  id: Date.now() + Math.random(),
  startHours: "",
  startMin: "",
  endHours: "",
  endMin: "",
  paymentCalc: "",
});

const SelectInput = ({
  value,
  onChange,
  placeholder = "Choose",
  options = [],
  error = false,
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className={`h-10 rounded-md border px-3 text-sm w-full
      ${error ? "border-red-500" : "border-gray-300"}`}
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

const hourOptions = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, "0")
);
const minOptions = Array.from({ length: 60 }, (_, i) =>
  String(i).padStart(2, "0")
);

const paymentOptions = ["1x Basic Pay", "1.5x Basic Pay", "2x Basic Pay"];
const calcOptions = ["Punch Based", "Shift Based", "Manual Entry"];
const approvalOptions = [
  "Yes, Only for Current & Future Dates",
  "Yes, for Past, Current & Future Dates",
  "No, approval is not required",
];

/* ------------------ SECTION BLOCK ------------------ */
const OvertimeSectionBlock = ({ title, section, onChange }) => {
  const addBifurcation = () =>
    onChange({
      ...section,
      bifurcations: [...section.bifurcations, defaultBifurcation()],
    });

  const updateBif = (id, field, val) => {
    onChange({
      ...section,
      bifurcations: section.bifurcations.map((b) =>
        b.id === id ? { ...b, [field]: val } : b
      ),
    });
  };

  return (
    <div className="border rounded-md p-4 space-y-4">
      <p className="font-semibold">{title}</p>

      <label className="flex gap-2 items-center">
        <input
          type="radio"
          checked={section.enabled}
          onChange={() => onChange({ ...section, enabled: true })}
        />
        Yes
      </label>

      {section.enabled && (
        <>
          <div className="grid grid-cols-2 gap-2">
            <SelectInput
              value={section.minHours}
              onChange={(v) => onChange({ ...section, minHours: v })}
              options={hourOptions}
              placeholder="Hours"
            />
            <SelectInput
              value={section.minMin}
              onChange={(v) => onChange({ ...section, minMin: v })}
              options={minOptions}
              placeholder="Min"
            />
          </div>

          {section.bifurcations.map((bif) => (
            <div key={bif.id} className="grid grid-cols-3 gap-3">
              <SelectInput
                value={bif.startHours}
                onChange={(v) =>
                  updateBif(bif.id, "startHours", v)
                }
                options={hourOptions}
                placeholder="Start Hr"
              />

              <SelectInput
                value={bif.endHours}
                onChange={(v) =>
                  updateBif(bif.id, "endHours", v)
                }
                options={hourOptions}
                placeholder="End Hr"
              />

              <SelectInput
                value={bif.paymentCalc}
                onChange={(v) =>
                  updateBif(bif.id, "paymentCalc", v)
                }
                options={paymentOptions}
                placeholder="Payment"
              />
            </div>
          ))}

          <button
            onClick={addBifurcation}
            className="text-blue-600 text-sm font-medium"
          >
            + Add More Bifurcations
          </button>
        </>
      )}

      <label className="flex gap-2 items-center">
        <input
          type="radio"
          checked={!section.enabled}
          onChange={() => onChange({ ...section, enabled: false })}
        />
        No
      </label>
    </div>
  );
};

/* ------------------ RIGHT PANEL ------------------ */
const RuleHelperPanel = () => (
  <div className="w-80 border-l bg-gray-50 p-4 space-y-4">
    <p className="font-semibold text-sm">Package</p>
    <p className="text-sm">Basic Pay</p>

    <div className="text-sm space-y-1">
      <p>If</p>
      <p>Else</p>
      <p>Then</p>
    </div>

    <div className="grid grid-cols-2 gap-2 text-xs">
      <div className="border rounded p-2">
        <p className="font-semibold mb-1">Arithmetic</p>
        <p>+ − × ÷ %</p>
      </div>

      <div className="border rounded p-2">
        <p className="font-semibold mb-1">Relational</p>
        <p>= ≠ &gt; &lt; ≥ ≤</p>
      </div>
    </div>

    <p className="text-xs text-gray-500">
      Dropdown values & logic preview
    </p>
  </div>
);

/* ------------------ MAIN ------------------ */
export default function OvertimePaymentPolicy() {
  const [policyName, setPolicyName] = useState("");

  const [workDay, setWorkDay] = useState({
    enabled: true,
    minHours: "",
    minMin: "",
    bifurcations: [defaultBifurcation()],
  });

  const [nonWorkDay, setNonWorkDay] = useState({
    enabled: true,
    minHours: "",
    minMin: "",
    bifurcations: [defaultBifurcation()],
  });

  const [calcMethod, setCalcMethod] = useState("");
  const [approval, setApproval] = useState("");

  return (
    <div className="flex min-h-screen">
      {/* LEFT */}
      <div className="flex-1 p-8 space-y-6">
        <h1 className="text-xl font-bold">
          New Overtime Payment Policy
        </h1>

        <input
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
          placeholder="Overtime payment policy name"
          className="w-full h-10 border rounded px-3"
        />

        <OvertimeSectionBlock
          title="Pay when employee does overtime on a work day"
          section={workDay}
          onChange={setWorkDay}
        />

        <OvertimeSectionBlock
          title="Pay when employee does overtime on a non-work day"
          section={nonWorkDay}
          onChange={setNonWorkDay}
        />

        <SelectInput
          value={calcMethod}
          onChange={setCalcMethod}
          options={calcOptions}
          placeholder="How do you want to calculate work hours?"
        />

        <SelectInput
          value={approval}
          onChange={setApproval}
          options={approvalOptions}
          placeholder="Approval requirement"
        />

        <div className="pt-4">
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Save Policy
          </button>
        </div>
      </div>

      {/* RIGHT */}
      {/* <RuleHelperPanel /> */}
    </div>
  );
}