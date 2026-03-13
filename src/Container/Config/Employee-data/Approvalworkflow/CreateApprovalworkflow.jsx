import { useState } from "react";

/* -------------------- Config -------------------- */

const workflowOptions = [
  {
    id: "full-trust",
    label: "Full-trust workflow",
    description:
      "Selecting this workflow means that all requests will be approved as soon as they're applied. Managers and admins will be notified about the requests, they can revoke the request if they wish to.",
  },
  {
    id: "free-flowing",
    label: "Free flowing workflow",
    description:
      "In this workflow, any 1 of the recipients can approve the request, irrespective of the number of recipients involved.",
  },
  {
    id: "all-hands",
    label: "All-hands-in workflow",
    description:
      "In this workflow, all recipients are required to approve the request. Even if 1 of the recipients doesn't approve, the request will remain pending. Similarly, even if 1 of the recipients reject the request, the entire request will be rejected irrespective of recipients' approvals.",
  },
  {
    id: "level-based",
    label: "Level-based workflow",
    description:
      "In this workflow, you can create up to 5 levels of approvals. As a request is approved at the first level, it will move to the next level and so on. The request will remain pending until it receives approval on all the levels.",
  },
];

const exitWorkflowOptions = [
  {
    id: "all-hands",
    label: "All-hands-in workflow",
    description:
      "In this workflow, all recipients are required to approve the request. Even if 1 of the recipients doesn't approve, the request will remain pending. Similarly, even if 1 of the recipients reject the request, the entire request will be rejected irrespective of recipients' approvals.",
  },
  {
    id: "level-based",
    label: "Level-based workflow",
    description:
      "In this workflow, you can create up to 5 levels of approvals. As a request is approved at the first level, it will move to the next level and so on. The request will remain pending until it receives approval on all the levels.",
  },
];

const tabs = [
  { title: "Define Workflow" },
  { title: "HRIS Workflow" },
  { title: "Attendance Workflow" },
  { title: "Leave Workflow" },
  { title: "Expense Workflow" },
  { title: "Exit Workflow" },
];

const workflowMeta = {
  HRIS: {
    heading: "HRIS",
    description: "HRIS covers employee bank-detail changes and probation confirmations.",
    showSameAsHRIS: false,
    workflowOptions: workflowOptions,
    isExit: false,
  },
  Attendance: {
    heading: "Attendance Workflow",
    description:
      "This workflow covers requests for Clock-in/WFH/OD requests, regularisations, and Geo-radius Clock-in requests.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
    isExit: false,
  },
  Leave: {
    heading: "Leave Workflow",
    description:
      "This workflow covers leave requests, optional holiday selections, and gifting of leaves.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
    isExit: false,
  },
  Expense: {
    heading: "Expense Workflow",
    description: "This workflow covers expense advance requests, and general expense claims.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
    isExit: false,
  },
  Exit: {
    heading: "Exit Workflow",
    description: "This workflow covers resignations via employee and terminations via managers.",
    showSameAsHRIS: false,
    workflowOptions: exitWorkflowOptions,
    isExit: true,
  },
};

const defaultWorkflowState = () => ({
  sameAsHRIS: "no",
  workflowType: "",
  approverSelect: "",
  levels: 1,
  inactionHandling: "no",
  inactionDays: "",
  inactionAction: "",
  backupDecision: "",
  backupPerson: "",
  managerChange: "",
});

/* -------------------- Checkmark Icon -------------------- */
const CheckIcon = () => (
  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* -------------------- Radio Option (with description) -------------------- */
const RadioOption = ({ label, description, checked, onChange, children }) => (
  <div>
    <div
      onClick={onChange}
      className={`flex items-start gap-3 px-4 py-3 border rounded cursor-pointer transition-colors ${
        checked ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="mt-0.5 flex-shrink-0">
        {checked ? (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <CheckIcon />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-800">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>}
      </div>
    </div>
    {/* Inline sub-content shown below the selected option */}
    {checked && children && (
      <div className="px-4 py-3 border border-t-0 border-blue-200 bg-blue-50 rounded-b">
        {children}
      </div>
    )}
  </div>
);

/* -------------------- Simple Radio -------------------- */
const SimpleRadio = ({ label, checked, onChange, children }) => (
  <div>
    <div
      onClick={onChange}
      className={`flex items-center gap-3 px-4 py-3 border rounded cursor-pointer transition-colors ${
        checked ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
      }`}
    >
      <div className="flex-shrink-0">
        {checked ? (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <CheckIcon />
          </div>
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white" />
        )}
      </div>
      <span className="text-sm text-gray-800">{label}</span>
    </div>
    {checked && children && (
      <div className="px-4 py-3 border border-t-0 border-blue-200 bg-blue-50 rounded-b">
        {children}
      </div>
    )}
  </div>
);

/* -------------------- Dropdown -------------------- */
const Dropdown = ({ value, onChange, placeholder, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 border border-gray-300 rounded bg-white px-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

/* -------------------- Define Workflow Tab -------------------- */
const DefineWorkflowTab = ({ onNext }) => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <p className="text-sm font-medium text-gray-800 mb-4">Kindly Define your approval workflow details</p>
      <div className="mb-5">
        <label className="block text-sm font-medium text-blue-600 mb-1">Workflow Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Workflow Name"
          className="w-full border border-blue-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Internal description for other admins who would view this setting
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Description"
          rows={5}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>
      <button
        onClick={onNext}
        className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
      >
        Save & Next
      </button>
    </div>
  );
};

/* -------------------- Workflow Config Tab -------------------- */
const WorkflowConfigTab = ({ metaKey, isLast, onNext, onSkip }) => {
  const meta = workflowMeta[metaKey];
  const [state, setState] = useState(defaultWorkflowState());
  const patch = (obj) => setState((s) => ({ ...s, ...obj }));

  // When sameAsHRIS = yes, still show the full form (per screenshots)
  const showFullForm = true;

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-0.5">{meta.heading}</h2>
      <p className="text-sm text-gray-500 mb-4">{meta.description}</p>

      {/* Same as HRIS */}
      {meta.showSameAsHRIS && (
        <div className="mb-5">
          <p className="text-sm font-medium text-blue-600 mb-2">
            Should we use the same configurations as HRIS Workflow?
          </p>
          <div className="space-y-2">
            <SimpleRadio label="Yes" checked={state.sameAsHRIS === "yes"} onChange={() => patch({ sameAsHRIS: "yes" })} />
            <SimpleRadio label="No" checked={state.sameAsHRIS === "no"} onChange={() => patch({ sameAsHRIS: "no" })} />
          </div>
        </div>
      )}

      {/* Workflow type */}
      <div className="mb-5">
        <p className="text-sm font-medium text-blue-600 mb-2">What type of workflow would you like</p>
        <div className="space-y-2">
          {meta.workflowOptions.map((opt) => (
            <RadioOption
              key={opt.id}
              label={opt.label}
              description={opt.description}
              checked={state.workflowType === opt.id}
              onChange={() => patch({ workflowType: opt.id })}
            >
              {/* All-hands: show approver dropdown */}
              {opt.id === "all-hands" && (
                <div>
                  <p className="text-xs font-medium text-blue-600 mb-1">
                    Select employees based on their position in hierarchy
                  </p>
                  <Dropdown
                    value={state.approverSelect}
                    onChange={(v) => patch({ approverSelect: v })}
                    placeholder="Select Approver"
                    options={[
                      { value: "manager", label: "Manager" },
                      { value: "hr", label: "HR Admin" },
                      { value: "dept-head", label: "Department Head" },
                    ]}
                  />
                </div>
              )}
              {/* Level-based: show add/remove level buttons */}
              {opt.id === "level-based" && (
                <div className="space-y-2 mt-1">
                  <button
                    onClick={() => patch({ levels: Math.min(5, state.levels + 1) })}
                    className="flex items-center gap-2"
                  >
                    <span className="w-8 h-8 bg-blue-700 text-white text-lg rounded flex items-center justify-center font-bold">+</span>
                    <span className="text-sm text-gray-700">Add Level for approval</span>
                  </button>
                  <button
                    onClick={() => patch({ levels: Math.max(1, state.levels - 1) })}
                    className="flex items-center gap-2"
                  >
                    <span className="w-8 h-8 bg-blue-700 text-white text-lg rounded flex items-center justify-center font-bold">−</span>
                    <span className="text-sm text-gray-700">Remove Level for approval</span>
                  </button>
                  {state.levels > 1 && (
                    <p className="text-xs text-gray-500">Current levels: {state.levels}</p>
                  )}
                </div>
              )}
            </RadioOption>
          ))}
        </div>
      </div>

      {/* Inaction handling */}
      <div className="mb-5">
        <p className="text-sm font-medium text-blue-600 mb-2">
          Do you want to automatically handle inaction on any request by the selected persons in this workflow?
        </p>
        <div className="space-y-2">
          <SimpleRadio
            label="Yes"
            checked={state.inactionHandling === "yes"}
            onChange={() => patch({ inactionHandling: "yes" })}
          >
            {/* Inaction Yes: days input + action dropdown */}
            <div className="space-y-3">
              <div>
                <p className="text-xs font-medium text-blue-600 mb-1">
                  Select the number of days you want to forward if request is inacted
                </p>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={state.inactionDays}
                    onChange={(e) => patch({ inactionDays: e.target.value })}
                    className="w-16 border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    min="1"
                  />
                  <span className="text-sm text-gray-700">Days</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 mb-0.5">Select action for inaction on any request</p>
                <p className="text-xs font-medium text-blue-600 mb-1">Select action</p>
                <Dropdown
                  value={state.inactionAction}
                  onChange={(v) => patch({ inactionAction: v })}
                  placeholder=""
                  options={[
                    { value: "approve", label: "Auto Approve" },
                    { value: "reject", label: "Auto Reject" },
                    { value: "escalate", label: "Escalate" },
                  ]}
                />
              </div>
            </div>
          </SimpleRadio>
          <SimpleRadio
            label="No"
            checked={state.inactionHandling === "no"}
            onChange={() => patch({ inactionHandling: "no" })}
          />
        </div>
      </div>

      {/* Backup decision maker */}
      <div className="mb-5">
        <p className="text-sm font-medium text-blue-600 mb-2">
          If approvers mentioned above don't exist for any particular employee (requester), then consider following for back-up decision maker
        </p>
        <div className="space-y-2">
          <SimpleRadio
            label="Allow Self Approval"
            checked={state.backupDecision === "self"}
            onChange={() => patch({ backupDecision: "self" })}
          />
          <SimpleRadio
            label="Select as a back-up decision maker"
            checked={state.backupDecision === "backup"}
            onChange={() => patch({ backupDecision: "backup" })}
          >
            {/* Backup dropdown */}
            <div>
              <p className="text-xs font-medium text-blue-600 mb-1">Select back-up</p>
              <Dropdown
                value={state.backupPerson}
                onChange={(v) => patch({ backupPerson: v })}
                placeholder=""
                options={[
                  { value: "manager", label: "Manager" },
                  { value: "hr", label: "HR Admin" },
                  { value: "dept-head", label: "Department Head" },
                ]}
              />
            </div>
          </SimpleRadio>
        </div>
      </div>

      {/* Manager change */}
      <div className="mb-7">
        <p className="text-sm font-medium text-blue-600 mb-2">
          How do you want to handle requests after change of manager/approver?
        </p>
        <div className="space-y-2">
          <SimpleRadio
            label="Transfer all requests to the new Manager"
            checked={state.managerChange === "all"}
            onChange={() => patch({ managerChange: "all" })}
          />
          <SimpleRadio
            label="Transfer only pending requests to New Manager"
            checked={state.managerChange === "pending"}
            onChange={() => patch({ managerChange: "pending" })}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex gap-3">
        {!isLast && (
          <button
            onClick={onSkip}
            className="px-5 py-2 border border-gray-300 text-sm font-medium text-gray-700 rounded hover:bg-gray-100 transition"
          >
            Skip
          </button>
        )}
        <button
          onClick={onNext}
          className="px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
        >
          {isLast ? "Save" : "Save & Next"}
        </button>
      </div>
    </div>
  );
};

/* -------------------- Main Component -------------------- */
const CreateApprovalWorkflow = () => {
  const [activeTab, setActiveTab] = useState(0);

  const goNext = () => {
    if (activeTab < tabs.length - 1) setActiveTab(activeTab + 1);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Tab bar */}
      <div className="border-b border-gray-200 px-4">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 transition font-medium ${
                activeTab === i
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 0 && <DefineWorkflowTab onNext={goNext} />}
      {activeTab === 1 && (
        <WorkflowConfigTab metaKey="HRIS" isLast={false} onNext={goNext} onSkip={goNext} />
      )}
      {activeTab === 2 && (
        <WorkflowConfigTab metaKey="Attendance" isLast={false} onNext={goNext} onSkip={goNext} />
      )}
      {activeTab === 3 && (
        <WorkflowConfigTab metaKey="Leave" isLast={false} onNext={goNext} onSkip={goNext} />
      )}
      {activeTab === 4 && (
        <WorkflowConfigTab metaKey="Expense" isLast={false} onNext={goNext} onSkip={goNext} />
      )}
      {activeTab === 5 && (
        <WorkflowConfigTab metaKey="Exit" isLast={true} onNext={() => alert("Saved!")} onSkip={goNext} />
      )}
    </div>
  );
};

export default CreateApprovalWorkflow;