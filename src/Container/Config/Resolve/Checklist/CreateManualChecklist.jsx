import { useState } from "react";
import { useNavigate } from "react-router-dom";

const purposes = ["Onboarding", "Offboarding", "Promotion"];
const activityTypes = [
  "Task",
  "Message",
  "Media File",
  "Link",
  "Upload Request",
];

export default function CreateManualChecklist() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  /* ================= STEP 1 ================= */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");

  /* ================= STEP 2 ================= */
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [activityType, setActivityType] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [dueDays, setDueDays] = useState(0);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleEmployee = (emp) => {
    setSelectedEmployees((prev) =>
      prev.includes(emp) ? prev.filter((e) => e !== emp) : [...prev, emp],
    );
      setShowDropdown(false);
  };

  const removeEmployee = (emp) => {
    setSelectedEmployees((prev) => prev.filter((e) => e !== emp));
  };
  const allEmployees = [
    "pawar VERMA",
    "Tanya [Panku_Leap_3]",
    "Vishal [Panku_Leap_2]",
    "VISHAL [Panku_Leap_4]",
  ];
  const addActivity = () => {
    if (!activityType || !activityTitle) return;

    setActivities((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: activityType,
        title: activityTitle,
        desc: activityDesc,
        dueDays,
        file,
        link,
      },
    ]);

    setActivityType("");
    setActivityTitle("");
    setActivityDesc("");
    setDueDays(0);
    setFile(null);
    setLink("");
    setShowForm(false);
  };

  /* ================= STEP 3 ================= */

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* ================= STEPPER ================= */}
      <div className="bg-white border rounded-lg p-4 mb-6">
        <div className="flex items-center justify-center gap-6">
          <StepItem number={1} label="Define" active={step >= 1} />
          <StepLine active={step >= 2} />
          <StepItem number={2} label="Design" active={step >= 2} />
          <StepLine active={step >= 3} />
          <StepItem number={3} label="Review" active={step >= 3} />
        </div>
      </div>

      {/* ================= STEP 1 ================= */}
    {step === 1 && (
  <div className="space-y-5">

    {/* Checklist Title */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Checklist Title
      </label>
      <input
        className="w-full border rounded px-3 h-10"
        placeholder="Enter checklist title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>

    {/* Checklist Description */}
    <div>
      <label className="block text-sm font-medium mb-1">
        Checklist Description
      </label>
      <textarea
        className="w-full border rounded p-3"
        placeholder="Enter checklist description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
    </div>

    {/* Purpose */}
    <div>
      <label className="block text-sm font-medium mb-1">
        What is this checklist for?
      </label>
      <select
        className="w-full border rounded px-3 h-10"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
      >
        <option value="">Select purpose</option>
        {purposes.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>
    </div>

  </div>
)}

      {/* ================= STEP 2 ================= */}
      {step === 2 && (
        <div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-3 text-blue-600 font-medium mb-6"
          >
            <span className="bg-blue-600 text-white w-7 h-7 flex items-center justify-center rounded-full">
              +
            </span>
            Add new activity
          </button>

          {showForm && (
            <div className="border rounded-lg p-6 bg-blue-50 space-y-4">
              {/* ACTIVITY TYPE */}
              <select
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className="w-64 border rounded h-11 px-3"
              >
                <option value="">Select Activity Type</option>
                {activityTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              {/* SHOW FORM AFTER TYPE SELECTED */}
              {activityType && (
                <>
                  {/* TITLE */}
                  <div>
                    <label className="text-sm text-gray-600">Title</label>
                    <input
                      placeholder="Enter title"
                      value={activityTitle}
                      onChange={(e) => setActivityTitle(e.target.value)}
                      className="w-full border rounded h-11 px-3 mt-1"
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className="text-sm text-gray-600">Description</label>
                    <textarea
                      value={activityDesc}
                      onChange={(e) => setActivityDesc(e.target.value)}
                      className="w-full border rounded p-3 h-28 mt-1"
                      placeholder="Enter description"
                    />
                  </div>

                  {/* MEDIA FILE */}
                  {activityType === "Media File" && (
                    <div className="border-dashed border-2 p-6 rounded text-center">
                      <input
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </div>
                  )}

                  {/* LINK */}
                  {activityType === "Link" && (
                    <input
                      placeholder="Enter URL"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      className="w-full border rounded h-11 px-3"
                    />
                  )}

                  {/* DUE DAYS */}
                  {activityType !== "Media File" && activityType !== "Link" && (
                    <div>
                      <label className="text-sm text-gray-600">
                        Due days after assignment
                      </label>
                      <input
                        type="number"
                        value={dueDays}
                        onChange={(e) => setDueDays(e.target.value)}
                        className="w-24 border rounded h-11 px-3 mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        *Day 0 is the Date of joining
                      </p>
                    </div>
                  )}

                  <button
                    onClick={addActivity}
                    className="bg-blue-600 text-white px-6 py-2 rounded"
                  >
                    ADD
                  </button>
                </>
              )}
            </div>
          )}

          <p className="mt-8 text-sm text-gray-500 text-center">
            Activities start on (Date of joining)
          </p>

          {activities.map((a) => (
            <div key={a.id} className="border rounded p-4 mt-4">
              <b>{a.title}</b> ({a.type})
            </div>
          ))}
        </div>
      )}

      {/* ================= STEP 3 ================= */}
      {step === 3 && (
        <div className="space-y-6">
          <p className="font-medium">Assign this checklist to:</p>

          {/* MULTI SELECT DROPDOWN */}
          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className="border rounded px-3 py-2 flex flex-wrap gap-2 cursor-pointer"
            >
              {selectedEmployees.length === 0 && (
                <span className="text-gray-400">Individual employees</span>
              )}

              {selectedEmployees.map((emp) => (
                <span
                  key={emp}
                  className="bg-gray-200 px-2 py-1 rounded flex items-center gap-1 text-sm"
                >
                  {emp}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeEmployee(emp);
                    }}
                    className="text-gray-600 font-bold"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            {/* DROPDOWN LIST */}
            {showDropdown && (
              <div className="absolute z-10 bg-white border rounded w-full mt-1 max-h-48 overflow-auto">
                {allEmployees.map((emp) => (
                  <div
                    key={emp}
                    onClick={() => toggleEmployee(emp)}
                    className="px-3 py-2 hover:bg-blue-50 cursor-pointer flex justify-between"
                  >
                    <span>{emp}</span>
                    {selectedEmployees.includes(emp) && "✓"}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SELECTED EMPLOYEES WITH DATE */}
          <div className="space-y-4">
            {selectedEmployees.map((emp) => (
              <div key={emp} className="flex items-center justify-between">
                <p>{emp}</p>
                <input type="date" className="border rounded px-3 h-10" />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <div className="flex justify-between mt-10">
        <button
          onClick={() => (step === 1 ? navigate(-1) : setStep(step - 1))}
          className="text-gray-600"
        >
          Cancel
        </button>

        {step < 3 ? (
          <button
            onClick={() => setStep(step + 1)}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Next
          </button>
        ) : (
          <button
            onClick={() => alert("Checklist Created")}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

/* ================= STEPPER COMPONENTS ================= */

function StepItem({ number, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        {number}
      </div>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
}

function StepLine({ active }) {
  return (
    <div
      className={`w-24 h-1 rounded ${active ? "bg-blue-600" : "bg-gray-300"}`}
    />
  );
}
