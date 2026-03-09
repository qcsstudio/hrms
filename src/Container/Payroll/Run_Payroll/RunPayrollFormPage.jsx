// ─── Page 3: Run Payroll Form + Draft Summary Modal ───
// Route: /payroll/run/form  OR  navigate("form")

import { useState } from "react";

const KVRow = ({ label, value }) => (
  <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border border-gray-100 rounded-lg">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-semibold text-sm text-gray-900">{value}</span>
  </div>
);

const RunPayrollFormPage = ({ navigate }) => {
  const [form, setForm] = useState({ month: "", type: "", forWhom: "", employee: "" });
  const [showModal, setShowModal] = useState(false);

  const handleSave = () => setShowModal(true);
  const handleApprove = () => { setShowModal(false); navigate("post-approve"); };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payroll Run</h1>
          <p className="text-sm text-gray-400 mt-1">Process and finalize monthly payroll</p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-6 max-w-2xl">
          <div className="space-y-5">

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Payroll Month</label>
              <select
                value={form.month}
                onChange={e => setForm({ ...form, month: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500"
              >
                <option value="">Choose Account</option>
                <option>January 2026</option>
                <option>February 2026</option>
                <option>March 2026</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Payroll Type</label>
              <select
                value={form.type}
                onChange={e => setForm({ ...form, type: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500"
              >
                <option value="">Choose Account</option>
                <option>Regular</option>
                <option>Off-Cycle</option>
                <option>Bonus</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">For whom would you like to run payroll?</label>
              <select
                value={form.forWhom}
                onChange={e => setForm({ ...form, forWhom: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500"
              >
                <option value="">Choose Account</option>
                <option>All Employees</option>
                <option>Specific Department</option>
                <option>Specific Employee</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">Employee Name</label>
              <select
                value={form.employee}
                onChange={e => setForm({ ...form, employee: e.target.value })}
                className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500 text-gray-500"
              >
                <option value="">Choose Account</option>
                <option>All</option>
                <option>Natashia Bunny</option>
                <option>John Doe</option>
              </select>
            </div>

          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={() => navigate("payroll-run")}
              className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>

      </div>

      {/* ─── Draft Summary Modal ─── */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

            {/* Modal Header */}
            <div className="flex items-start justify-between p-6 pb-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">Draft Summary</h2>
                <p className="text-sm text-gray-400 mt-0.5">Download the template, fill employee details, then upload file.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-200 rounded-lg w-8 h-8 flex items-center justify-center text-gray-400 hover:bg-gray-50 text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 space-y-3 pb-2">
              <KVRow label="Payroll Type" value="Regular" />
              <KVRow label="Total Employees Processed" value="4" />
              <KVRow label="Estimated Net Payroll" value="₹ 42,80,000" />
            </div>

            {/* Modal Footer */}
            <div className="flex gap-3 p-6 pt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
              >
                Approve and Lock Payroll
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default RunPayrollFormPage;
