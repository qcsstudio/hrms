import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createAxios from "../../../../utils/axios.config";

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
  },
  Attendance: {
    heading: "Attendance Workflow",
    description:
      "This workflow covers requests for Clock-in/WFH/OD requests, regularisations, and Geo-radius Clock-in requests.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
  },
  Leave: {
    heading: "Leave Workflow",
    description:
      "This workflow covers leave requests, optional holiday selections, and gifting of leaves.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
  },
  Expense: {
    heading: "Expense Workflow",
    description: "This workflow covers expense advance requests, and general expense claims.",
    showSameAsHRIS: true,
    workflowOptions: workflowOptions,
  },
  Exit: {
    heading: "Exit Workflow",
    description: "This workflow covers resignations via employee and terminations via managers.",
    showSameAsHRIS: false,
    workflowOptions: exitWorkflowOptions,
  },
};

const APPROVER_OPTIONS = [
  { value: "manager", label: "Manager" },
  { value: "hr", label: "HR Admin" },
  { value: "dept-head", label: "Department Head" },
  { value: "additional-employee", label: "Additional Employee" },
  { value: "ceo", label: "CEO" },
  { value: "vp", label: "VP" },
];

const createDefaultLevel = () => ({
  approver: "",
  tags: [],
  additionalEmployee: "",
});

const defaultWorkflowState = () => ({
  sameAsHRIS: "no",
  workflowType: "",
  allHandsTags: [],
  allHandsEmployee: "",
  levels: [createDefaultLevel()],
  inactionHandling: "no",
  inactionDays: "",
  inactionAction: "",
  backupDecision: "",
  backupPerson: "",
  managerChange: "",
});

const cloneWorkflowState = (state) => ({
  ...state,
  allHandsTags: [...(state.allHandsTags || [])],
  allHandsEmployee: state.allHandsEmployee || "",
  levels: (state.levels || []).map((level) => ({
    approver: level.approver || "",
    tags: [...(level.tags || [])],
    additionalEmployee: level.additionalEmployee || "",
  })),
});

/* -------------------- API Body Builders -------------------- */

// Maps UI workflowType id → API workflowType string
const mapWorkflowType = (id) => {
  const map = {
    "full-trust": "full_trust",
    "free-flowing": "free_flow",
    "all-hands": "all_hands_in",
    "level-based": "level_based",
  };
  return map[id] || id;
};

// Maps UI inactionAction → API inactionAction
const mapInactionAction = (action) => {
  const map = {
    approve: "auto_approve",
    reject: "auto_reject",
    escalate: "escalate",
  };
  return map[action] || action;
};

const getApproverValueFromTags = (tags = []) => {
  const selectedTag = tags.find((tag) => tag !== "Additional Employee");
  return APPROVER_OPTIONS.find((option) => option.label === selectedTag)?.value || "";
};

const mapHierarchyRoleLabel = (label) => {
  const roleMap = {
    Manager: "Manager",
    "HR Admin": "HR",
    "Department Head": "Department Head",
    "Additional Employee": "Additional Employee",
    CEO: "CEO",
    VP: "VP",
  };

  return roleMap[label] || label;
};

const toArray = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (!value) return [];
  return [value];
};

// Builds a single workflow tab body from UI state
// Only includes fields that have actual values — avoids sending empty strings
// that fail backend enum validation (e.g. workflowType: "")
const buildWorkflowBody = (state, showSameAsHRIS) => {
  const body = {
    sameAsHRIS: showSameAsHRIS ? state.sameAsHRIS === "yes" : false,
    autoHandleInaction: state.inactionHandling === "yes",
    self_approval: false,
    backup_person: false,
  };

  // Only send workflowType if user actually selected one
  if (state.workflowType) {
    body.workflowType = mapWorkflowType(state.workflowType);
  }

  if (state.workflowType === "all-hands") {
    body.allHandsTags = (state.allHandsTags || []).map(mapHierarchyRoleLabel);
    body.allHandsEmployee = toArray(state.allHandsEmployee);
  }

  if (state.workflowType === "level-based") {
    body.approvalLevels = state.levels.length;
    body.levelApprovers = state.levels.map((lvl, i) => {
      const hierarchyRoles = (lvl.tags || []).map(mapHierarchyRoleLabel);
      const hasOnlyAdditionalEmployees =
        hierarchyRoles.length > 0 &&
        hierarchyRoles.every((role) => role === "Additional Employee");

      return {
        levelNumber: i + 1,
        hierarchyRoles,
        approverEmployeeId: null,
        approverHierarchyId:
          hasOnlyAdditionalEmployees || hierarchyRoles.length === 0
            ? null
            : lvl.approver || getApproverValueFromTags(lvl.tags) || null,
        additionalEmployees: toArray(lvl.additionalEmployee),
      };
    });
  }

  if (state.inactionHandling === "yes") {
    if (state.inactionDays) body.forwardAfterDays = Number(state.inactionDays);
    if (state.inactionAction) body.inactionAction = mapInactionAction(state.inactionAction);
  }

  // Backup decision maker — booleans per schema
  // self_approval: Boolean, backup_person: Boolean, backupEmployeeId: ObjectId
  if (state.backupDecision === "self") {
    body.self_approval = true;
    body.backup_person = false;
    body.backupEmployeeId = null;
  } else if (state.backupDecision === "backup") {
    body.self_approval = false;
    body.backup_person = true;
    if (state.backupPerson) body.backupEmployeeId = state.backupPerson;
  }

  // Manager change — booleans per schema
  // transferToNewuser: Boolean (transfer all), transferToManagerChange: Boolean (pending only)
  if (state.managerChange === "all") {
    body.transferToNewuser = true;
    body.transferToManagerChange = false;
  } else if (state.managerChange === "pending") {
    body.transferToNewuser = false;
    body.transferToManagerChange = true;
  }

  return body;
};

/* -------------------- Icons -------------------- */
const CheckIcon = () => (
  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
    <path d="M1 4L4.5 7.5L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronDown = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* -------------------- Multi-Select Tag Input -------------------- */
const MultiSelectTagInput = ({
  tags,
  onTagsChange,
  options,
  placeholder,
  disabledLabels = [],
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggle = (label) => {
    if (disabledLabels.includes(label) && !tags.includes(label)) return;
    if (tags.includes(label)) onTagsChange(tags.filter((t) => t !== label));
    else onTagsChange([...tags, label]);
  };

  const remove = (e, label) => {
    e.stopPropagation();
    onTagsChange(tags.filter((t) => t !== label));
  };

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((v) => !v)}
        className="min-h-[38px] w-full border border-gray-300 rounded bg-white px-2 py-1 flex flex-wrap items-center gap-1 cursor-pointer"
      >
        {tags.length === 0 && (
          <span className="text-sm text-gray-400 px-1">{placeholder}</span>
        )}
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-white border border-gray-300 rounded px-2 py-0.5 text-sm text-gray-700"
          >
            {tag}
            <button
              onClick={(e) => remove(e, tag)}
              className="text-gray-500 hover:text-gray-700 leading-none font-medium"
            >
              ×
            </button>
          </span>
        ))}
        <div className="ml-auto pl-2 flex items-center gap-1 text-gray-400 flex-shrink-0">
          {tags.length > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); onTagsChange([]); }}
              className="hover:text-gray-600 text-base leading-none"
            >
              ×
            </button>
          )}
          <span className="border-l border-gray-200 pl-2">
            <ChevronDown />
          </span>
        </div>
      </div>

      {open && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded shadow-lg max-h-48 overflow-y-auto">
          {options.map((opt) => {
            const isSelected = tags.includes(opt.label);
            const isDisabled = disabledLabels.includes(opt.label) && !isSelected;

            return (
              <div
                key={opt.value}
                onClick={() => !isDisabled && toggle(opt.label)}
                className={`px-3 py-2 text-sm flex items-center justify-between ${
                  isDisabled
                    ? "text-gray-400 bg-gray-50 cursor-not-allowed"
                    : isSelected
                    ? "text-blue-600 font-medium bg-blue-50 cursor-pointer hover:bg-blue-50"
                    : "text-gray-700 cursor-pointer hover:bg-blue-50"
                }`}
              >
                {opt.label}
                {isSelected && (
                  <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                    <CheckIcon />
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

/* -------------------- Dropdown -------------------- */
const Dropdown = ({ value, onChange, placeholder, options, disabledValues = [] }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full h-9 border border-gray-300 rounded bg-white px-3 pr-8 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 appearance-none"
    >
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          disabled={disabledValues.includes(o.value) && value !== o.value}
        >
          {o.label}
        </option>
      ))}
    </select>
    {/* <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
      <ChevronDown />
    </div> */}
  </div>
);

/* -------------------- Radio Option (card with description) -------------------- */
const RadioOption = ({ label, description, checked, onChange, children }) => (
  <div>
    <div
      onClick={onChange}
      className={`flex items-start gap-3 px-4 py-3 border rounded cursor-pointer transition-colors ${
        checked ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
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
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {description && (
          <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
    {checked && children && (
      <div className="mt-3 space-y-3 px-1">
        {children}
      </div>
    )}
  </div>
);

/* -------------------- Simple Radio -------------------- */
const SimpleRadio = ({ label, checked, onChange }) => (
  <div
    onClick={onChange}
    className={`flex items-center justify-between px-4 py-3 border rounded cursor-pointer transition-colors ${
      checked ? "border-blue-300 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"
    }`}
  >
    <span className="text-sm text-gray-800">{label}</span>
    {checked ? (
      <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
        <CheckIcon />
      </div>
    ) : (
      <div className="w-5 h-5 rounded-full border-2 border-gray-300 bg-white flex-shrink-0" />
    )}
  </div>
);

/* -------------------- Level-Based Approvers -------------------- */
const LevelBasedApprovers = ({ levels, onLevelsChange, employeeOptions }) => {
  const addLevel = () => {
    if (levels.length < 5) onLevelsChange([...levels, createDefaultLevel()]);
  };
  const removeLevel = () => {
    if (levels.length > 1) onLevelsChange(levels.slice(0, -1));
  };
  const updateLevel = (index, patch) => {
    onLevelsChange(levels.map((lvl, i) => (i === index ? { ...lvl, ...patch } : lvl)));
  };
  const getDisabledLabelsForLevel = (currentIndex) =>
    levels
      .flatMap((level, index) => (index === currentIndex ? [] : level.tags || []));
  const getDisabledEmployeesForLevel = (currentIndex) =>
    levels
      .flatMap((level, index) =>
        index === currentIndex || !level.additionalEmployee ? [] : [level.additionalEmployee]
      );

  return (
    <div className="space-y-3">
      {levels.map((lvl, index) => (
        <div key={index}>
          <p className="text-xs font-medium text-blue-600 mb-1">
            Level-{index + 1}&nbsp;&nbsp;Select employees based on their position in hierarchy
          </p>
          <MultiSelectTagInput
            tags={lvl.tags || []}
            onTagsChange={(value) =>
              updateLevel(index, {
                tags: value,
                approver: getApproverValueFromTags(value),
                additionalEmployee: value.includes("Additional Employee")
                  ? lvl.additionalEmployee
                  : "",
              })
            }
            options={APPROVER_OPTIONS}
            placeholder="Select Approver"
            disabledLabels={getDisabledLabelsForLevel(index)}
          />
          {(lvl.tags || []).includes("Additional Employee") && (
            <div className="mt-3">
              <p className="text-sm font-medium text-blue-600 mb-1">
                Select certain specific employees who will also receive the request for action
              </p>
              <Dropdown
                value={lvl.additionalEmployee || ""}
                onChange={(value) => updateLevel(index, { additionalEmployee: value })}
                placeholder="Select Employee"
                options={employeeOptions}
                disabledValues={getDisabledEmployeesForLevel(index)}
              />
            </div>
          )}
        </div>
      ))}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={addLevel}
          disabled={levels.length >= 5}
          className="flex items-center gap-3 disabled:opacity-40"
        >
          <span className="w-10 h-10 bg-blue-700 text-white text-xl rounded flex items-center justify-center font-bold">
            +
          </span>
          <span className="text-sm text-gray-700">Add Level for approval</span>
        </button>
        <button
          onClick={removeLevel}
          disabled={levels.length <= 1}
          className="flex items-center gap-3 disabled:opacity-40"
        >
          <span className="w-10 h-10 bg-blue-700 text-white text-xl rounded flex items-center justify-center font-bold">
            −
          </span>
          <span className="text-sm text-gray-700">Remove Level for approval</span>
        </button>
      </div>
    </div>
  );
};

/* -------------------- Define Workflow Tab -------------------- */
const DefineWorkflowTab = ({ defineState, onDefineChange, onNext }) => {
  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <p className="text-sm font-medium text-gray-800 mb-4">
        Kindly Define your approval workflow details
      </p>
      <div className="mb-5">
        <label className="block text-sm font-medium text-blue-600 mb-1">Workflow Name</label>
        <input
          type="text"
          value={defineState.workflowName}
          onChange={(e) => onDefineChange({ workflowName: e.target.value })}
          placeholder="Enter Workflow Name"
          className="w-full border border-blue-500 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-blue-600 mb-1">
          Internal description for other admins who would view this setting
        </label>
        <textarea
          value={defineState.description}
          onChange={(e) => onDefineChange({ description: e.target.value })}
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
const WorkflowConfigTab = ({
  metaKey,
  isLast,
  onNext,
  onSkip,
  state,
  setState,
  employeeOptions,
}) => {
  const meta = workflowMeta[metaKey];
  const patch = (obj) => setState((s) => ({ ...s, ...obj }));
  const showAdditionalEmployeeField = state.allHandsTags.includes("Additional Employee");

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
            <SimpleRadio
              label="Yes"
              checked={state.sameAsHRIS === "yes"}
              onChange={() => patch({ sameAsHRIS: "yes" })}
            />
            <SimpleRadio
              label="No"
              checked={state.sameAsHRIS === "no"}
              onChange={() => patch({ sameAsHRIS: "no" })}
            />
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
              {/* All-hands: multi-select hierarchy + specific employee */}
              {opt.id === "all-hands" && (
                <>
                  <div>
                    <p className="text-sm font-medium text-blue-600 mb-1">
                      Select employees based on their position in hierarchy
                    </p>
                    <MultiSelectTagInput
                      tags={state.allHandsTags}
                      onTagsChange={(v) =>
                        patch({
                          allHandsTags: v,
                          allHandsEmployee: v.includes("Additional Employee")
                            ? state.allHandsEmployee
                            : "",
                        })
                      }
                      options={APPROVER_OPTIONS}
                      placeholder="Select Approver"
                    />
                  </div>
                  {showAdditionalEmployeeField && (
                    <div>
                      <p className="text-sm font-medium text-blue-600 mb-1">
                        Select certain specific employees who will also receive the request for action
                      </p>
                      <Dropdown
                        value={state.allHandsEmployee}
                        onChange={(v) => patch({ allHandsEmployee: v })}
                        placeholder="Select Employee"
                        options={employeeOptions}
                      />
                    </div>
                  )}
                </>
              )}

              {/* Level-based */}
              {opt.id === "level-based" && (
                <LevelBasedApprovers
                  levels={state.levels}
                  onLevelsChange={(newLevels) => patch({ levels: newLevels })}
                  employeeOptions={employeeOptions}
                />
              )}
            </RadioOption>
          ))}
        </div>
      </div>

      {/* Inaction handling */}
      <div className="mb-5">
        <p className="text-sm font-medium text-blue-600 mb-2">
          Do you want to automatically handle inaction on any request by the selected persons in this
          workflow?
        </p>

        <SimpleRadio
          label="Yes"
          checked={state.inactionHandling === "yes"}
          onChange={() => patch({ inactionHandling: "yes" })}
        />

        {state.inactionHandling === "yes" && (
          <div className="border-l border-r border-b border-blue-200 bg-white px-4 py-4 space-y-4">
            <div>
              <p className="text-sm font-medium text-blue-600 mb-2">
                Select the number of days you want to forward if request is inacted
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={state.inactionDays}
                  onChange={(e) => patch({ inactionDays: e.target.value })}
                  className="w-24 h-10 border border-gray-300 rounded px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  min="1"
                />
                <span className="text-sm text-gray-700">Days</span>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">
                Select action for inaction on any request
              </p>
              <p className="text-sm font-medium text-blue-600 mb-1">Select action</p>
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
        )}

        <div className="mt-2">
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
          If approvers mentioned above don't exist for any particular employee (requester), then
          consider following for back-up decision maker
        </p>
        <div className="space-y-2">
          <SimpleRadio
            label="Allow Self Approval"
            checked={state.backupDecision === "self"}
            onChange={() => patch({ backupDecision: "self" })}
          />
          <div>
            <SimpleRadio
              label="Select as a back-up decision maker"
              checked={state.backupDecision === "backup"}
              onChange={() => patch({ backupDecision: "backup" })}
            />
            {state.backupDecision === "backup" && (
              <div className="border-l border-r border-b border-blue-200 bg-white px-4 py-3">
                <p className="text-xs font-medium text-blue-600 mb-1">Select back-up</p>
                <Dropdown
                  value={state.backupPerson}
                  onChange={(v) => patch({ backupPerson: v })}
                  placeholder="select employee"
                  options={employeeOptions}
                />
              </div>
            )}
          </div>
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

  // Define Workflow tab state
  const [defineState, setDefineState] = useState({
    workflowName: "",
    description: "",
  });

  // Per-tab workflow states (lifted up so we can collect all on final Save)
  const [hrisState, setHrisState] = useState(defaultWorkflowState());
  const [attendanceState, setAttendanceState] = useState(defaultWorkflowState());
  const [leaveState, setLeaveState] = useState(defaultWorkflowState());
  const [expenseState, setExpenseState] = useState(defaultWorkflowState());
  const [exitState, setExitState] = useState(defaultWorkflowState());

  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [createResponse, setCreateResponse] = useState(null);
  const [companyOfficeId, setCompanyOfficeId] = useState([]);
  const [employeeOptions, setEmployeeOptions] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Could be array or single string — normalise to array
        const ids = Array.isArray(parsed) ? parsed : [parsed];
        setCompanyOfficeId(ids);
      }
    } catch (e) {
      toast.error("Failed to read office data. Please try again.");
    }
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const axiosInstance = createAxios(token);
        const response = await axiosInstance.get("/employees/all", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const rawEmployees = Array.isArray(response?.data?.data) ? response.data.data : [];
        const normalizedEmployees = rawEmployees
          .map((employee) => {
            const id = employee?._id;
            const fullName = employee?.fullName;

            if (!id || !fullName) return null;

            return {
              value: id,
              label: fullName,
            };
          })
          .filter(Boolean);

        setEmployeeOptions(normalizedEmployees);
      } catch (error) {
        toast.error(
          error?.response?.data?.message || "Failed to load employees."
        );
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (attendanceState.sameAsHRIS === "yes") {
      setAttendanceState((prev) => ({
        ...cloneWorkflowState(hrisState),
        sameAsHRIS: "yes",
      }));
    }

    if (leaveState.sameAsHRIS === "yes") {
      setLeaveState((prev) => ({
        ...cloneWorkflowState(hrisState),
        sameAsHRIS: "yes",
      }));
    }

    if (expenseState.sameAsHRIS === "yes") {
      setExpenseState((prev) => ({
        ...cloneWorkflowState(hrisState),
        sameAsHRIS: "yes",
      }));
    }
  }, [
    hrisState,
    attendanceState.sameAsHRIS,
    leaveState.sameAsHRIS,
    expenseState.sameAsHRIS,
  ]);

  const trimmedWorkflowName = defineState.workflowName.trim();
  const trimmedDescription = defineState.description.trim();

  /* -------------------- Build single full payload for one POST -------------------- */
  // Backend creates one doc with all tabs nested under tabs.{tabName}
  // workflowName is required at schema root — must be included in every call
  // Solution: send all tabs in one POST using defineWorkflow tabName
  // which carries workflowName + all other tabs data together
  const buildFullPayload = () => {
    const defineWorkflow = {
      workflowName: trimmedWorkflowName,
      description: trimmedDescription,
    };
    const hrisWorkflow = buildWorkflowBody(hrisState, false);
    const attendanceWorkflow = buildWorkflowBody(attendanceState, true);
    const leaveWorkflow = buildWorkflowBody(leaveState, true);
    const expenseWorkflow = buildWorkflowBody(expenseState, true);
    const exitWorkflow = buildWorkflowBody(exitState, false);

    return {
      workflowName: trimmedWorkflowName,
      description: trimmedDescription,
      defineWorkflow,
      hrisWorkflow,
      attendanceWorkflow,
      leaveWorkflow,
      expenseWorkflow,
      exitWorkflow,
      tabs: {
        defineWorkflow,
        hrisWorkflow,
        attendanceWorkflow,
        leaveWorkflow,
        expenseWorkflow,
        exitWorkflow,
      },
      assignedEmployeeList: [],
    };
  };

  const validateBeforeSave = () => {
    if (!trimmedWorkflowName) {
      toast.error("Workflow Name is required.", {
        position: "top-right",
        autoClose: 3000,
      });
      setActiveTab(0);
      return false;
    }

    return true;
  };

  const goNext = () => {
    if (!validateBeforeSave()) return;
    if (activeTab < tabs.length - 1) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleTabChange = (nextTabIndex) => {
    if (nextTabIndex === activeTab) return;
    if (!validateBeforeSave()) return;
    setActiveTab(nextTabIndex);
  };

  /* -------------------- Final Save — single POST with all tabs -------------------- */
  const handleSave = async () => {
    setSaving(true);
    try {
      if (!validateBeforeSave()) return;

      const token = localStorage.getItem("authToken");
      const axiosInstance = createAxios(token);
      const body = buildFullPayload();
      console.log("Approval workflow create payload:", body);
      const response = await axiosInstance.post(
        `/config/createWorkflow?tabName=defineWorkflow`,
        body,
        {
          meta: { auth: "ADMIN_AUTH" },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setCreateResponse(response?.data || null);

      toast.success(response?.data?.message || "Workflow added successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      localStorage.removeItem("companyOfficeId");

      setTimeout(() => {
        navigate("/config/hris/Employee-data/Approval-workflow");
      }, 1500);
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to save. Please try again.";
      toast.error(errMsg, {
        position: "top-right",
        autoClose: 4000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
      {createResponse && (
        <div className="mx-4 mt-4 rounded border border-green-200 bg-green-50 p-3 text-xs text-gray-700">
          <p className="mb-2 font-semibold text-green-700">Create API Response</p>
          <pre className="whitespace-pre-wrap break-words">{JSON.stringify(createResponse, null, 2)}</pre>
        </div>
      )}
      <div className="border-b border-gray-200 px-4">
        <div className="flex overflow-x-auto">
          {tabs.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => handleTabChange(i)}
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

      {activeTab === 0 && (
        <DefineWorkflowTab
          defineState={defineState}
          onDefineChange={(patch) => setDefineState((s) => ({ ...s, ...patch }))}
          onNext={goNext}
        />
      )}
      {activeTab === 1 && (
        <WorkflowConfigTab
          metaKey="HRIS"
          isLast={false}
          onNext={goNext}
          onSkip={goNext}
          state={hrisState}
          setState={setHrisState}
          employeeOptions={employeeOptions}
        />
      )}
      {activeTab === 2 && (
        <WorkflowConfigTab
          metaKey="Attendance"
          isLast={false}
          onNext={goNext}
          onSkip={goNext}
          state={attendanceState}
          setState={setAttendanceState}
          employeeOptions={employeeOptions}
        />
      )}
      {activeTab === 3 && (
        <WorkflowConfigTab
          metaKey="Leave"
          isLast={false}
          onNext={goNext}
          onSkip={goNext}
          state={leaveState}
          setState={setLeaveState}
          employeeOptions={employeeOptions}
        />
      )}
      {activeTab === 4 && (
        <WorkflowConfigTab
          metaKey="Expense"
          isLast={false}
          onNext={goNext}
          onSkip={goNext}
          state={expenseState}
          setState={setExpenseState}
          employeeOptions={employeeOptions}
        />
      )}
      {activeTab === 5 && (
        <WorkflowConfigTab
          metaKey="Exit"
          isLast={true}
          onNext={handleSave}
          onSkip={goNext}
          state={exitState}
          setState={setExitState}
          employeeOptions={employeeOptions}
        />
      )}
    </div>
  );
};

export default CreateApprovalWorkflow;
