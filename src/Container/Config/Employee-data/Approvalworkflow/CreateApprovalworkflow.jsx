import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

const tabConfigs = [
  {
    title: "Define Workflow",
    heading: "HRIS",
    description:
      "HRIS covers employee bank-detail changes and probation confirmations.",
  },
  {
    title: "HRIS Workflow",
    heading: "HRIS",
    description:
      "HRIS covers employee bank-detail changes and probation confirmations.",
  },
  {
    title: "Attendance Workflow",
    heading: "Attendance",
    description:
      "Attendance covers employee check-in, check-out and overtime requests.",
  },
  {
    title: "Leave Workflow",
    heading: "Leave",
    description:
      "Leave covers employee leave applications and compensatory off requests.",
  },
  {
    title: "Expense Workflow",
    heading: "Expense",
    description:
      "Expense covers employee reimbursement and advance salary requests.",
  },
  {
    title: "Exit Workflow",
    heading: "Exit",
    description:
      "Exit covers employee resignation, termination and full & final settlement.",
  },
];

const defaultTabState = () => ({
  selected: "all-hands",
  inactionHandling: "yes",
  backupDecision: "backup",
  managerChange: "pending",
  levels: 1,
  hierarchySelect: "",
  inactionDays: "",
  inactionAction: "",
  backupPerson: "",
  levelInactionAction: "",
});

/* -------------------- Component -------------------- */

const CreateApprovalWorkflow = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [tabStates, setTabStates] = useState(
    tabConfigs.map(() => defaultTabState())
  );

  const current = tabStates[activeTab];
  const setCurrent = (patch) => {
    setTabStates((prev) =>
      prev.map((s, i) => (i === activeTab ? { ...s, ...patch } : s))
    );
  };

  const config = tabConfigs[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">
          Create Approval Workflow
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 mb-6">
        <div className="flex overflow-x-auto">
          {tabConfigs.map((tab, i) => (
            <button
              key={tab.title}
              onClick={() => setActiveTab(i)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition ${
                activeTab === i
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-1">{config.heading}</h3>
        <p className="text-sm text-gray-500 mb-5">{config.description}</p>

        <p className="text-sm font-medium text-gray-800 mb-3">
          Is early employee confirmation allowed?
        </p>

        {/* Workflow Options */}
        <div className="space-y-3">
          {workflowOptions.map((opt) => {
            const active = current.selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex gap-3 p-4 rounded-lg border cursor-pointer transition
                  ${
                    active
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 bg-white hover:bg-gray-50"
                  }`}
              >
                <input
                  type="radio"
                  name={`workflow-${activeTab}`}
                  checked={active}
                  onChange={() => setCurrent({ selected: opt.id })}
                  className="mt-1 accent-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {opt.label}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {opt.description}
                  </p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Hierarchy Select */}
        {(current.selected === "free-flowing" ||
          current.selected === "all-hands") && (
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-800 mb-2">
              Select employees based on their position in hierarchy
            </p>
            <select
              value={current.hierarchySelect}
              onChange={(e) => setCurrent({ hierarchySelect: e.target.value })}
              className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Choose Account</option>
              <option value="manager">Manager</option>
              <option value="hr">HR Admin</option>
              <option value="department-head">Department Head</option>
            </select>
          </div>
        )}

        {/* Inaction Handling */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Do you want to automatically handle inaction on any request by the
            selected persons in this workflow?
          </p>

          <div className="space-y-3">
            {["yes", "no"].map((value) => {
              const active = current.inactionHandling === value;
              return (
                <label
                  key={value}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                    ${
                      active
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    checked={active}
                    onChange={() =>
                      setCurrent({ inactionHandling: value })
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium capitalize text-gray-800">
                    {value}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Backup Decision */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            If approvers mentioned above don't exist for any particular employee
            (requester), then consider following for back-up decision maker
          </p>

          <div className="space-y-3">
            {[
              { id: "self", label: "Allow Self Approval" },
              { id: "backup", label: "Select as a back-up decision maker" },
            ].map((opt) => {
              const active = current.backupDecision === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                    ${
                      active
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    checked={active}
                    onChange={() =>
                      setCurrent({ backupDecision: opt.id })
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Manager Change */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            How do you want to handle requests after change of manager/approver?
          </p>

          <div className="space-y-3">
            {[
              {
                id: "all",
                label: "Transfer all request to the New Manager",
              },
              {
                id: "pending",
                label:
                  "Transfer only Pending request to the New Manager",
              },
            ].map((opt) => {
              const active = current.managerChange === opt.id;
              return (
                <label
                  key={opt.id}
                  className={`flex items-center gap-3 p-4 rounded-lg border cursor-pointer transition
                    ${
                      active
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-200 bg-white"
                    }`}
                >
                  <input
                    type="radio"
                    checked={active}
                    onChange={() =>
                      setCurrent({ managerChange: opt.id })
                    }
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-800">
                    {opt.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 mt-10 pt-5 border-t border-gray-200">
          <button
            onClick={() => navigate("/config/hris/Employee-data/Approval-workflow")}
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="px-6 py-2.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateApprovalWorkflow;
