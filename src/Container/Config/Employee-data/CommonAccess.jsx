import { useState } from "react";
import { useNavigate } from "react-router-dom";

const sections = [
  {
    title: "Who's in today",
    subtitle: "How much data would you like the employee & manager* to view",
    options: [
      {
        id: "whos-dept",
        label: "Department",
        hasToggle: true,
        toggleLabel: "Show clock-in time for members in the department",
      },
      { id: "whos-org", label: "Organization" },
    ],
  },
  {
    title: "Calendar's data level",
    subtitle: "How much data would you like the employee & manager* to view",
    options: [
      { id: "cal-dept", label: "Department" },
      { id: "cal-org", label: "Organization" },
    ],
  },
];

const CommonAccess = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState({});
  const [toggles, setToggles] = useState({});

  const toggle = (id) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSwitch = (id) => {
    setToggles((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* FULL WIDTH CONTENT */}
      <div className=" mx-auto p-8">

        {/* Header */}
        <h1 className="text-2xl font-semibold mb-6">Common Access</h1>

        <div className="space-y-6">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-xl border border-gray-300 bg-white p-6"
            >
              <h4 className="font-semibold mb-1">{section.title}</h4>
              <p className="text-sm text-gray-500 mb-4">
                {section.subtitle}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {section.options.map((opt) => (
                  <div
                    key={opt.id}
                    className="rounded-lg border border-gray-300 p-4 flex flex-col gap-3"
                  >
                    {/* Checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={!!checked[opt.id]}
                        onChange={() => toggle(opt.id)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">
                        {opt.label}
                      </span>
                    </div>

                    {/* Toggle Switch */}
                    {opt.hasToggle && (
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 max-w-[75%]">
                          {opt.toggleLabel}
                        </span>

                        <button
                          onClick={() => toggleSwitch(opt.id)}
                          className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                            toggles[opt.id] ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                              toggles[opt.id] ? "translate-x-5" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-blue-600 mt-4">
          Managers will always have access to their report's data
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-300">
          <button
            className="px-4 py-2 rounded border border-gray-300 bg-white hover:bg-gray-50"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>

          <button className="px-5 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default CommonAccess;
