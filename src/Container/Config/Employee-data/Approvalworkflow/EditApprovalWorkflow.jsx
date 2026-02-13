import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

/* -------------------- Mock Fetch (replace with API) -------------------- */
const mockFetchWorkflow = () => ({
  selected: "all-hands",
  inactionHandling: "yes",
  backupDecision: "backup",
  managerChange: "pending",
  levels: 2,
  hierarchySelect: "manager",
});

/* -------------------- Tabs Config -------------------- */

const tabConfigs = [
  { title: "Define Workflow", heading: "HRIS", description: "HRIS covers employee bank-detail changes and probation confirmations." },
  { title: "HRIS Workflow", heading: "HRIS", description: "HRIS covers employee bank-detail changes and probation confirmations." },
  { title: "Attendance Workflow", heading: "Attendance", description: "Attendance covers employee check-in, check-out and overtime requests." },
  { title: "Leave Workflow", heading: "Leave", description: "Leave covers employee leave applications and compensatory off requests." },
  { title: "Expense Workflow", heading: "Expense", description: "Expense covers employee reimbursement and advance salary requests." },
  { title: "Exit Workflow", heading: "Exit", description: "Exit covers employee resignation, termination and full & final settlement." },
];

/* -------------------- Workflow Options -------------------- */

const workflowOptions = [
  { id: "full-trust", label: "Full-trust workflow", description: "All requests auto-approved instantly." },
  { id: "free-flowing", label: "Free flowing workflow", description: "Any one approver can approve." },
  { id: "all-hands", label: "All-hands-in workflow", description: "All approvers must approve." },
  { id: "level-based", label: "Level-based workflow", description: "Multi-level approval workflow." },
];

/* -------------------- Header Actions -------------------- */

const HeaderActions = ({ id }) => {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

//   return (
//     <div className="relative flex items-center gap-3">
//       {/* Edit */}
//       <button
//         onClick={() => navigate(`/approval-workflow/edit/${id}`)}
//         className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//         title="Edit"
//       >
//         ✏️
//       </button>

//       {/* More */}
//       <button
//         onClick={() => setOpenMenu((p) => !p)}
//         className="w-9 h-9 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100"
//         title="More"
//       >
//         ⋮
//       </button>

//       {/* Dropdown */}
//       {openMenu && (
//         <div className="absolute right-0 top-11 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
//           <button
//             onClick={() => {
//               setOpenMenu(false);
//               console.log("Delete workflow:", id);

//               // API example:
//               // fetch(`/api/workflows/${id}`, { method: "DELETE" })
//               //   .then(() => navigate("/approval-workflow"));
//             }}
//             className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
//           >
//             🗑 Delete
//           </button>
//         </div>
//       )}
//     </div>
//   );
};

/* -------------------- Main Component -------------------- */

const EditApprovalWorkflow = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState(null);

  useEffect(() => {
    // Replace with API call using ID
    const data = mockFetchWorkflow();
    setForm(data);
  }, [id]);

  if (!form) {
    return <div className="p-10 text-gray-500">Loading workflow...</div>;
  }

  const config = tabConfigs[activeTab];

  return (
    <div className="min-h-screen bg-gray-50 p-6">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Edit Approval Workflow</h1>
          <p className="text-sm text-gray-500">Update existing workflow configuration</p>
        </div>

        <HeaderActions id={id} />
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

      {/* Content */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-1">{config.heading}</h3>
        <p className="text-sm text-gray-500 mb-5">{config.description}</p>

        {/* Workflow Type */}
        <div className="space-y-3">
          {workflowOptions.map((opt) => {
            const active = form.selected === opt.id;
            return (
              <label
                key={opt.id}
                className={`flex gap-3 p-4 rounded-lg border cursor-pointer transition ${
                  active
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  checked={active}
                  onChange={() => setForm({ ...form, selected: opt.id })}
                  className="mt-1 accent-blue-600"
                />
                <div>
                  <p className="text-sm font-medium text-gray-900">{opt.label}</p>
                  <p className="text-xs text-gray-500 mt-1">{opt.description}</p>
                </div>
              </label>
            );
          })}
        </div>

        {/* Hierarchy */}
        {(form.selected === "free-flowing" || form.selected === "all-hands") && (
          <div className="mt-5">
            <p className="text-sm font-medium text-gray-800 mb-2">
              Select employees based on hierarchy
            </p>
            <select
              value={form.hierarchySelect}
              onChange={(e) => setForm({ ...form, hierarchySelect: e.target.value })}
              className="w-full h-11 rounded-md border border-gray-300 bg-white px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Choose Account</option>
              <option value="manager">Manager</option>
              <option value="hr">HR Admin</option>
              <option value="department-head">Department Head</option>
            </select>
          </div>
        )}

        {/* Inaction */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Auto-handle inaction?
          </p>
          <div className="flex gap-4">
            {["yes", "no"].map((v) => (
              <label
                key={v}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                  form.inactionHandling === v
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  checked={form.inactionHandling === v}
                  onChange={() => setForm({ ...form, inactionHandling: v })}
                  className="accent-blue-600"
                />
                <span className="text-sm capitalize">{v}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Backup */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Backup decision
          </p>
          <div className="flex gap-4">
            {["self", "backup"].map((v) => (
              <label
                key={v}
                className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                  form.backupDecision === v
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-200"
                }`}
              >
                <input
                  type="radio"
                  checked={form.backupDecision === v}
                  onChange={() => setForm({ ...form, backupDecision: v })}
                  className="accent-blue-600"
                />
                <span className="text-sm">
                  {v === "self" ? "Allow Self Approval" : "Select Backup Approver"}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Manager Change */}
        <div className="mt-8">
          <p className="text-sm font-medium text-gray-800 mb-3">
            Manager change handling
          </p>
          <div className="space-y-3">
            <label
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                form.managerChange === "all"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={form.managerChange === "all"}
                onChange={() => setForm({ ...form, managerChange: "all" })}
                className="accent-blue-600"
              />
              <span className="text-sm">
                Transfer all requests to new manager
              </span>
            </label>

            <label
              className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer ${
                form.managerChange === "pending"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={form.managerChange === "pending"}
                onChange={() => setForm({ ...form, managerChange: "pending" })}
                className="accent-blue-600"
              />
              <span className="text-sm">
                Transfer only pending requests
              </span>
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-10 pt-5 border-t border-gray-200">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => console.log("Updated workflow:", form)}
            className="px-6 py-2.5 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Update Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditApprovalWorkflow;
