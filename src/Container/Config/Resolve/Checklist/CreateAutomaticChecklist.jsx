import { useState } from "react";
import { useNavigate } from "react-router-dom";

const checklistPurposes = ["Onboarding", "Offboarding", "Promotion"];
const activityTypes = [
  "Message",
  "Task",
  "Media File",
  "Link",
  "Upload Request",
  "Dependency Task",
];

const businessUnits = ["Chandigarh", "Bangalore", "Delhi"];
const departments = ["Web development", "QA", "Design"];
const designations = ["Chief Executive Officer", "Manager", "Intern"];
const teams = ["Web Designing Team", "Platform Team"];
const locations = ["Chandigarh", "Bangalore", "Delhi"];

export default function CreateAutomaticChecklist() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");

  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [activityType, setActivityType] = useState("");
  const [activityTitle, setActivityTitle] = useState("");
  const [activityDesc, setActivityDesc] = useState("");
  const [dueDays, setDueDays] = useState(0);
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");

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

  return (
    <div className="max-w-6xl mx-auto bg-white min-h-screen relative">
      {/* -------- STEPPER -------- */}
      <div className="py-6 border-b">
        <div className="flex items-center justify-center gap-6">
          <StepItem number={1} label="Define" active={step >= 1} />
          <StepLine active={step >= 2} />
          <StepItem number={2} label="Design" active={step >= 2} />
          <StepLine active={step >= 3} />
          <StepItem number={3} label="Review" active={step >= 3} />
        </div>
      </div>

      <div className="p-8">
        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-6">
              <label className="block text-sm font-medium mb-1">
                Checklist Title
              </label>
              <input
                className="w-full border rounded h-11 px-3"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <label className="block text-sm font-medium mb-1">
                Checklist Description
              </label>
              <textarea
                className="w-full border rounded p-3 h-32"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label className="block text-sm font-medium mb-1">
                What is this checklist for?
              </label>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full border rounded h-11 px-3"
              >
                <option value="">Select Purpose</option>
                {checklistPurposes.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="space-y-6">
              <SelectBox label="Business Unit" data={businessUnits} />
              <SelectBox label="Department" data={departments} />
              <SelectBox label="Designation" data={designations} />
              <SelectBox label="Team" data={teams} />
              <SelectBox label="Office Location" data={locations} />
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
                      <label className="text-sm text-gray-600">
                        Description
                      </label>
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
                    {activityType !== "Media File" &&
                      activityType !== "Link" && (
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
          <div>
            <h3 className="font-medium text-lg mb-4">
              Review checklist before saving
            </h3>
            <p>
              <b>Title:</b> {title}
            </p>
            <p>
              <b>Purpose:</b> {purpose}
            </p>
            <p>
              <b>Activities:</b> {activities.length}
            </p>
          </div>
        )}
      </div>

      {/* -------- FOOTER -------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 flex justify-between max-w-6xl mx-auto">
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
            onClick={() => alert("Checklist Saved")}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Save
          </button>
        )}
      </div>
    </div>
  );
}

/* ---------- STEPPER ---------- */

function StepItem({ number, label, active }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`w-8 h-8 flex items-center justify-center rounded-full ${
          active ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {number}
      </div>
      <span className="mt-1 text-sm text-gray-600">{label}</span>
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

function SelectBox({ label, data }) {
  return (
    <div>
      <label className="text-sm text-gray-500">{label}</label>
      <select className="w-full border rounded h-11 px-3 mt-1">
        <option>Select {label}</option>
        {data.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}
