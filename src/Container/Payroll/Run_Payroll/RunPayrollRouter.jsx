// ─── RunPayrollRouter.jsx ───
// Drop this wherever you render the Run Payroll tab.
// Pass an optional initialRoute prop to deep-link to any page.
//
// Pages / Routes:
//   "overview"      →  PayrollOverviewPage    (/payroll)
//   "payroll-run"   →  PayrollRunPage         (/payroll/run)
//   "form"          →  RunPayrollFormPage     (/payroll/run/form)
//   "post-approve"  →  PostApprovePage        (/payroll/run/complete)
//
// Usage with React Router (example):
//   import { useNavigate } from "react-router-dom";
//   const nav = useNavigate();
//   <RunPayrollRouter
//     initialRoute="overview"
//     onNavigate={(route) => nav(`/payroll/${route}`)}
//   />

import { useState } from "react";

// ══════════════════════════════════════════
//  Shared helpers (used across all pages)
// ══════════════════════════════════════════
const KVRow = ({ label, value }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-semibold text-sm text-gray-900">{value}</span>
  </div>
);

const MoneyIcon = () => (
  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <circle cx="12" cy="12" r="3"/>
      <path d="M6 12h.01M18 12h.01"/>
    </svg>
  </div>
);

const GearIcon = () => (
  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/>
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  </div>
);

const CalendarIcon = () => (
  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2"/>
      <line x1="16" y1="2" x2="16" y2="6"/>
      <line x1="8" y1="2" x2="8" y2="6"/>
      <line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  </div>
);

// Quick Overview bar — reused on PayrollRunPage + PostApprovePage
const QuickOverview = () => (
  <div className="mb-5">
    <h2 className="text-sm font-semibold text-gray-700 mb-3">Quick Overview</h2>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-1">Open Runs</div>
        <div className="text-2xl font-bold text-gray-900 mb-2">2</div>
        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Draft / Review</span>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-1">Blockers</div>
        <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
        <div className="text-xs text-gray-400">Needs fix before finalize</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-1">Last Finalized</div>
        <div className="text-xl font-bold text-gray-900 mb-1">Jan-2016</div>
        <div className="text-xs text-gray-400">Paid on Jan 31</div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <div className="text-sm text-gray-400 mb-1">Next Pay Date</div>
        <div className="text-xl font-bold text-gray-900 mb-1">Feb-28-2016</div>
        <div className="text-xs text-gray-400">Cutoff: Feb 24</div>
      </div>
    </div>
  </div>
);

// Payroll Overview cards — reused on PayrollRunPage + PostApprovePage
const PayrollOverviewCards = () => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
      <MoneyIcon />
      <div className="text-sm text-gray-500 mb-2">Total Payroll</div>
      <div className="text-2xl font-bold text-gray-900">₹247,580</div>
    </div>
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
      <GearIcon />
      <div className="text-sm text-gray-500 mb-2">Processing Status</div>
      <div className="text-2xl font-bold text-gray-900">85%</div>
    </div>
    <div className="bg-gray-50 border border-gray-100 rounded-xl p-5 text-center">
      <CalendarIcon />
      <div className="text-sm text-gray-500 mb-2">Pay Date</div>
      <div className="text-2xl font-bold text-gray-900">Apr 30, 2025</div>
    </div>
  </div>
);

// ══════════════════════════════════════════
//  PAGE 1 — Payroll Overview
//  Route: /payroll  or  "overview"
// ══════════════════════════════════════════
const PayrollOverviewPage = ({ navigate }) => (
  <div>
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
      <p className="text-sm text-gray-400 mt-1">Manage salary processing and view payroll records</p>
    </div>
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* My Payroll */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">My Payroll</h2>
          <div className="space-y-3">
            <KVRow label="Last Salary Credited" value="₹ 85,000" />
            <KVRow label="Last Payroll Date" value="31 Jan 2026" />
            <KVRow label="Tax Deducted" value="₹ 4,200" />
          </div>
          <div className="flex gap-3 mt-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
              View My Payslips
            </button>
            <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
              Download Latest
            </button>
          </div>
        </div>
        {/* Company Payroll */}
        <div>
          <h2 className="text-base font-semibold text-gray-900 mb-4">Company Payroll</h2>
          <div className="space-y-3">
            <KVRow label="Current Month" value="Feb 2026" />
            <KVRow label="Total Employees" value="142" />
            <KVRow label="Estimated Payroll" value="₹ 42,80,000" />
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => navigate("payroll-run")}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Run Payroll
            </button>
            <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════
//  PAGE 2 — Payroll Run Dashboard
//  Route: /payroll/run  or  "payroll-run"
// ══════════════════════════════════════════
const PayrollRunPage = ({ navigate }) => (
  <div>
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payroll Run</h1>
        <p className="text-sm text-gray-400 mt-1">Process and finalize monthly payroll</p>
      </div>
      <div className="flex gap-3">
        <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors">
          Payroll Reports
        </button>
        <button
          onClick={() => navigate("form")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Run Payroll
        </button>
      </div>
    </div>
    <QuickOverview />
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-5">Payroll Overview</h2>
      <PayrollOverviewCards />
      <div className="flex gap-3">
        <button
          onClick={() => navigate("form")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
        >
          Run payroll
        </button>
        <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
          View Details
        </button>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════
//  PAGE 3 — Run Payroll Form + Modal
//  Route: /payroll/run/form  or  "form"
// ══════════════════════════════════════════
const RunPayrollFormPage = ({ navigate }) => {
  const [form, setForm] = useState({ month: "", type: "", forWhom: "", employee: "" });
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payroll Run</h1>
        <p className="text-sm text-gray-400 mt-1">Process and finalize monthly payroll</p>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-2xl">
        <div className="space-y-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Payroll Month</label>
            <select value={form.month} onChange={e => setForm({ ...form, month: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500">
              <option value="">Choose Account</option>
              <option>January 2026</option><option>February 2026</option><option>March 2026</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Payroll Type</label>
            <select value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500">
              <option value="">Choose Account</option>
              <option>Regular</option><option>Off-Cycle</option><option>Bonus</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">For whom would you like to run payroll?</label>
            <select value={form.forWhom} onChange={e => setForm({ ...form, forWhom: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500">
              <option value="">Choose Account</option>
              <option>All Employees</option><option>Specific Department</option><option>Specific Employee</option>
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Employee Name</label>
            <select value={form.employee} onChange={e => setForm({ ...form, employee: e.target.value })}
              className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500">
              <option value="">Choose Account</option>
              <option>All</option><option>Natashia Bunny</option><option>John Doe</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={() => navigate("payroll-run")}
            className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
            Cancel
          </button>
          <button onClick={() => setShowModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
            Save
          </button>
        </div>
      </div>

      {/* Draft Summary Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-start justify-between p-6 pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Draft Summary</h2>
                <p className="text-sm text-gray-400 mt-0.5">Download the template, fill employee details, then upload file.</p>
              </div>
              <button onClick={() => setShowModal(false)}
                className="border border-gray-200 rounded-lg w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 text-xl leading-none">
                ×
              </button>
            </div>
            <div className="px-6 space-y-3 pb-2">
              <KVRow label="Payroll Type" value="Regular" />
              <KVRow label="Total Employees Processed" value="4" />
              <KVRow label="Estimated Net Payroll" value="₹ 42,80,000" />
            </div>
            <div className="flex gap-3 p-6 pt-6">
              <button onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
                Cancel
              </button>
              <button onClick={() => { setShowModal(false); navigate("post-approve"); }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors">
                Approve and Lock Payroll
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ══════════════════════════════════════════
//  PAGE 4 — Post-Approve / Payroll Locked
//  Route: /payroll/run/complete  or  "post-approve"
// ══════════════════════════════════════════
const PostApprovePage = ({ navigate }) => (
  <div>
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payroll Run</h1>
        <p className="text-sm text-gray-400 mt-1">Process and finalize monthly payroll</p>
      </div>
      <div className="flex gap-3">
        <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors">
          Payroll Reports
        </button>
        <button onClick={() => navigate("form")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
          Run Payroll
        </button>
      </div>
    </div>
    <QuickOverview />
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-gray-800 mb-5">Payroll Overview</h2>
      <PayrollOverviewCards />
      <div className="flex gap-3">
        <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
          Generate Payslips
        </button>
        <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors">
          Download Bank Reciets
        </button>
      </div>
    </div>
  </div>
);

// ══════════════════════════════════════════
//  ROUTER — wires all 4 pages
// ══════════════════════════════════════════
const PAGES = {
  "overview":      PayrollOverviewPage,
  "payroll-run":   PayrollRunPage,
  "form":          RunPayrollFormPage,
  "post-approve":  PostApprovePage,
};

const RunPayrollRouter = ({ initialRoute = "overview", onNavigate }) => {
  const [route, setRoute] = useState(initialRoute);

  const navigate = (to) => {
    setRoute(to);
    if (onNavigate) onNavigate(to); // hook into React Router if needed
  };

  const Page = PAGES[route] || PayrollOverviewPage;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-5xl mx-auto">
        <Page navigate={navigate} />
      </div>
    </div>
  );
};

export default RunPayrollRouter;

// ── Named exports for individual page use ──
export {
  PayrollOverviewPage,
  PayrollRunPage,
  RunPayrollFormPage,
  PostApprovePage,
};
