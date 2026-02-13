import { useState } from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
      {children}
    </div>
  );
};

const RadioBox = ({ checked, onChange, label }) => {
  return (
    <label
      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition ${
        checked ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
      }`}
    >
      <input type="radio" checked={checked} onChange={onChange} />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
};

const Toggle = ({ checked, onChange }) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-10 h-5 rounded-full relative transition ${
        checked ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 bg-white rounded-full transition ${
          checked ? "left-5" : "left-1"
        }`}
      />
    </button>
  );
};

export default function CreateEmployeeId() {
  const [mode, setMode] = useState("auto");
  const [assignMethod, setAssignMethod] = useState("oldest");
  const [includeDeactivated, setIncludeDeactivated] = useState("yes");

  const [prefix, setPrefix] = useState(false);
  const [mid, setMid] = useState(false);
  const [suffix, setSuffix] = useState(false);

  const [prefixUpper, setPrefixUpper] = useState(false);
  const [midUpper, setMidUpper] = useState(false);
  const [suffixUpper, setSuffixUpper] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        {/* Header */}
        <h1 className="text-2xl font-semibold">Create Employee ID</h1>
        <p className="text-sm text-gray-500 mb-8">
          Manage employee directory, documents, and role-based actions.
        </p>

        {/* Mode */}
        <p className="text-sm font-medium mb-3">
          How would you like to define employee ID?
        </p>

        <div className="space-y-3 mb-8">
          <RadioBox
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
            label="Specify it manually"
          />

          <RadioBox
            checked={mode === "auto"}
            onChange={() => setMode("auto")}
            label="Assign Automatically"
          />
        </div>

        {mode === "auto" && (
          <>
            {/* Prefix / Mid / Suffix */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              
              {/* Prefix */}
              <Card>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={prefix}
                    onChange={(e) => setPrefix(e.target.checked)}
                  />
                  <span className="font-medium">Prefix Text</span>
                </label>

                <p className="text-xs text-gray-500 mb-1">Select Prefix Type</p>
                <select className="w-full border rounded-lg p-2 mb-4">
                  <option>Choose Account</option>
                  <option>Department</option>
                  <option>Custom</option>
                </select>

                <p className="text-xs text-gray-500 mb-1">Custom Text</p>
                <input
                  className="w-full border rounded-lg p-2 mb-4"
                  placeholder="Choose Account"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm">All Upper Case</span>
                  <Toggle checked={prefixUpper} onChange={setPrefixUpper} />
                </div>
              </Card>

              {/* Mid */}
              <Card>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={mid}
                    onChange={(e) => setMid(e.target.checked)}
                  />
                  <span className="font-medium">Mid Text</span>
                </label>

                <p className="text-xs text-gray-500 mb-1">Select Prefix Type</p>
                <select className="w-full border rounded-lg p-2 mb-4">
                  <option>Choose Account</option>
                  <option>Random</option>
                </select>

                <p className="text-xs text-gray-500 mb-1">
                  Number of Characters
                </p>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2 mb-4"
                  placeholder="Choose Account"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm">All Upper Case</span>
                  <Toggle checked={midUpper} onChange={setMidUpper} />
                </div>
              </Card>

              {/* Suffix */}
              <Card>
                <label className="flex items-center gap-2 mb-4">
                  <input
                    type="checkbox"
                    checked={suffix}
                    onChange={(e) => setSuffix(e.target.checked)}
                  />
                  <span className="font-medium">Suffix Text</span>
                </label>

                <p className="text-xs text-gray-500 mb-1">Select Prefix Type</p>
                <select className="w-full border rounded-lg p-2 mb-4">
                  <option>Choose Account</option>
                  <option>Year</option>
                  <option>Custom</option>
                </select>

                <p className="text-xs text-gray-500 mb-1">
                  Number of Characters
                </p>
                <input
                  type="number"
                  className="w-full border rounded-lg p-2 mb-4"
                  placeholder="Choose Account"
                />

                <div className="flex items-center justify-between">
                  <span className="text-sm">All Upper Case</span>
                  <Toggle checked={suffixUpper} onChange={setSuffixUpper} />
                </div>
              </Card>
            </div>

            {/* Assignment */}
            <p className="text-sm font-medium mb-3">
              How do we assign these IDs to the existing employees?
            </p>

            <div className="space-y-3 mb-6">
              <RadioBox
                checked={assignMethod === "oldest"}
                onChange={() => setAssignMethod("oldest")}
                label="Start from the oldest joining date"
              />

              {assignMethod === "oldest" && (
                <div className="ml-6 space-y-3">
                  <p className="text-sm font-medium">
                    Would you like to include deactivated employees?
                  </p>

                  <RadioBox
                    checked={includeDeactivated === "yes"}
                    onChange={() => setIncludeDeactivated("yes")}
                    label="Yes"
                  />

                  <RadioBox
                    checked={includeDeactivated === "no"}
                    onChange={() => setIncludeDeactivated("no")}
                    label="No"
                  />
                </div>
              )}

              <RadioBox
                checked={assignMethod === "continue"}
                onChange={() => setAssignMethod("continue")}
                label="Continue series for all future employees"
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
