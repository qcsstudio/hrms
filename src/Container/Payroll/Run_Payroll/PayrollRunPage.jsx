// ─── Page 2: Payroll Run Dashboard ───
// Route: /payroll/run  OR  navigate("payroll-run")

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

const PayrollRunPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
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

        {/* Quick Overview */}
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

        {/* Payroll Overview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-5">Payroll Overview</h2>
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
    </div>
  );
};

export default PayrollRunPage;
