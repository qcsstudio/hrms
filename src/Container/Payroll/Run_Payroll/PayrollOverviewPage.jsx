// ─── Page 1: Payroll Overview ───
// Route: /payroll  OR  navigate("overview")

const KVRow = ({ label, value }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-semibold text-sm text-gray-900">{value}</span>
  </div>
);

const PayrollOverviewPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="mx-auto">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payroll</h1>
          <p className="text-sm text-gray-400 mt-1">Manage salary processing and view payroll records</p>
        </div>

        {/* Two-panel card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* Left — My Payroll */}
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

            {/* Right — Company Payroll */}
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
    </div>
  );
};

export default PayrollOverviewPage;
