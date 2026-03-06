import { useState } from "react";

/* ------------------ HELPERS ------------------ */

const FieldLabel = ({ children }) => (
  <label className="text-sm font-medium text-gray-700 block mb-1">
    {children}
  </label>
);

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
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="h-10 rounded-md border border-gray-300 px-3 text-sm w-full"
  >
    <option value="">{placeholder}</option>
    {options.map((o) => (
      <option key={o} value={o}>
        {o}
      </option>
    ))}
  </select>
);

/* ------------------ OPTIONS ------------------ */

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
    <div className="border rounded-md p-5 space-y-5">

      <p className="font-semibold">{title}</p>

      {/* YES */}
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
          {/* MINIMUM HOURS */}
          <div>
            <FieldLabel>
              Minimum overtime hours required to be eligible for payment
            </FieldLabel>

            <div className="grid grid-cols-2 gap-3">
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
          </div>

          {/* BIFURCATIONS */}
          {section.bifurcations.map((bif) => (
            <div key={bif.id} className="grid grid-cols-3 gap-4">

              {/* START TIME */}
              <div>
                <FieldLabel>Start hour & minute</FieldLabel>

                <div className="grid grid-cols-2 gap-2">
                  <SelectInput
                    value={bif.startHours}
                    onChange={(v) =>
                      updateBif(bif.id, "startHours", v)
                    }
                    options={hourOptions}
                    placeholder="Hours"
                  />

                  <SelectInput
                    value={bif.startMin}
                    onChange={(v) =>
                      updateBif(bif.id, "startMin", v)
                    }
                    options={minOptions}
                    placeholder="Min"
                  />
                </div>
              </div>

              {/* END TIME */}
              <div>
                <FieldLabel>End hour & minute</FieldLabel>

                <div className="grid grid-cols-2 gap-2">
                  <SelectInput
                    value={bif.endHours}
                    onChange={(v) =>
                      updateBif(bif.id, "endHours", v)
                    }
                    options={hourOptions}
                    placeholder="Hours"
                  />

                  <SelectInput
                    value={bif.endMin}
                    onChange={(v) =>
                      updateBif(bif.id, "endMin", v)
                    }
                    options={minOptions}
                    placeholder="Min"
                  />
                </div>
              </div>

              {/* PAYMENT */}
              <div>
                <FieldLabel>Payment calculation</FieldLabel>

                <SelectInput
                  value={bif.paymentCalc}
                  onChange={(v) =>
                    updateBif(bif.id, "paymentCalc", v)
                  }
                  options={paymentOptions}
                  placeholder="Choose"
                />
              </div>
            </div>
          ))}

          {/* ADD BIFURCATION */}
          <button
            onClick={addBifurcation}
            className="text-blue-600 text-sm font-medium"
          >
            + Add More Bifurcations
          </button>
        </>
      )}

      {/* NO */}
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

/* ------------------ MAIN COMPONENT ------------------ */

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

      <div className="flex-1 p-8 space-y-6">

        <h1 className="text-xl font-bold">
          New Overtime Payment Policy
        </h1>

        {/* POLICY NAME */}
        <div>
          <FieldLabel>Extrtime payment policy name</FieldLabel>

          <input
            value={policyName}
            onChange={(e) => setPolicyName(e.target.value)}
            placeholder="Enter policy name"
            className="w-full h-10 border rounded px-3"
          />
        </div>

        <OvertimeSectionBlock
          title="Pay when an employee does overtime on a work day"
          section={workDay}
          onChange={setWorkDay}
        />

        <OvertimeSectionBlock
          title="Pay when an employee does overtime on a non-work day (includes weekly off & mandatory holiday)"
          section={nonWorkDay}
          onChange={setNonWorkDay}
        />

        {/* CALC METHOD */}
        <div>
          <FieldLabel>
            How do you want to calculate work hours?
          </FieldLabel>

          <SelectInput
            value={calcMethod}
            onChange={setCalcMethod}
            options={calcOptions}
          />
        </div>

        {/* APPROVAL */}
        <div>
          <FieldLabel>
            Do you want employees to work extra time only on approval?
          </FieldLabel>

          <SelectInput
            value={approval}
            onChange={setApproval}
            options={approvalOptions}
          />
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Save Policy
        </button>

      </div>
    </div>
  );
}