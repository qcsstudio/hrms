import { useState } from "react";

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);

const DROPDOWN_ITEMS = [
  "Package & Proration","Payslip","Tax Sheet","IT Declaration & Submission",
  "Income Tax","Form 16","Loan","Extra Payment","Extra Deduction",
  "Over Time Payment","Annual Payslip","Salary Advance",
];

// ─── Badges ───
const BadgePaid = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Paid</span>;
const BadgeApproved = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Approved</span>;
const BadgePending = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Pending Proof</span>;
const BadgeProcessing = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">In Progress</span>;
const BadgeReady = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">Ready</span>;
const BadgeReview = () => <span className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">Under Review</span>;

// ─── Reusable KV Row ───
const KVRow = ({ label, value }) => (
  <div className="flex items-center justify-between px-3 py-2.5 bg-gray-50 border border-gray-100 rounded-lg">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-semibold text-sm">{value}</span>
  </div>
);

// ─── Table Header ───
const TH = ({ cols, children }) => (
  <div className="grid px-3 py-2 bg-gray-100 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1" style={{ gridTemplateColumns: cols }}>
    {children}
  </div>
);

// ─── Table Row ───
const TR = ({ cols, children }) => (
  <div className="grid items-center px-3 py-2.5 border border-gray-100 rounded-lg bg-gray-50 hover:bg-gray-100 text-sm" style={{ gridTemplateColumns: cols }}>
    {children}
  </div>
);

// ─── Summary Cards ───
const SummaryCards = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {[
      { label: "Next Pay Day", value: "31-Jan-2016", sub: "Monthly payroll · Status: Processing" },
      { label: "Estimated Net Pay (Jan)", value: "₹ 78,420", sub: "May change based on LOP / variable pay" },
      { label: "YTD Net Pay", value: "₹ 6,88,120", sub: "Apr 2025 → Jan 2026" },
    ].map(c => (
      <div key={c.label} className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1">
        <span className="text-xs text-gray-500 font-medium">{c.label}</span>
        <span className="text-xl font-bold text-gray-900">{c.value}</span>
        <span className="text-xs text-gray-400">{c.sub}</span>
      </div>
    ))}
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-500 font-medium">This Month Status</span>
      <span className="text-xl font-bold text-gray-900">Processing</span>
      <div className="mt-1"><BadgeProcessing /></div>
    </div>
  </div>
);

// ─── Package & Proration ───
const PackageProrationSection = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Current Salary Structure</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[["Annual CTC","₹ 12,00,000"],["Fixed Pay","₹ 10,50,000"],["Variable Bonus","₹ 1,50,000"],["Pay Cycle","Monthly"]].map(([k,v])=>(
          <KVRow key={k} label={k} value={v} />
        ))}
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Monthly Components</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-sm font-medium mb-3">Earnings</h4>
          <div className="space-y-2">
            {[["Basic","₹ 35,000"],["HRA","₹ 18,000"],["Special Allowance","₹ 22,000"],["Conveyance","₹ 2,000"],["Variable (avg)","₹ 12,500"]].map(([k,v])=>(
              <KVRow key={k} label={k} value={v} />
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium mb-3">Deductions</h4>
          <div className="space-y-2">
            {[["Employer PF","₹ 4,200"],["Insurance","₹ 900"],["Gratuity","₹ 1,400"],["LOP (If Any)","₹ 2,000"],["Other","₹ 12,500"]].map(([k,v])=>(
              <KVRow key={k} label={k} value={v} />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Payslip ───
const PayslipSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Payslips</h3>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Download Full Report</button>
    </div>
    <TH cols="2fr 1fr 1fr 1fr 80px"><span>Month</span><span>Net Pay</span><span>Status</span><span>Paid On</span><span></span></TH>
    <div className="space-y-2">
      {[{month:"Dec 2025",gross:"1,05,000",net:"78,420",date:"31 Dec 2025"},{month:"Nov 2025",gross:"1,02,500",net:"80,010",date:"30 Nov 2025"},{month:"Oct 2025",gross:"1,01,000",net:"76,880",date:"31 Oct 2025"}].map(r=>(
        <TR key={r.month} cols="2fr 1fr 1fr 1fr 80px">
          <div><div className="font-medium text-sm">{r.month}</div><div className="text-xs text-gray-400">Gross: ₹ {r.gross}</div></div>
          <span className="font-semibold">₹ {r.net}</span>
          <span><BadgePaid /></span>
          <span>{r.date}</span>
          <span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Open</button></span>
        </TR>
      ))}
    </div>
  </div>
);

// ─── Tax Sheet ───
const TaxSheetSection = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Tax Sheet</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[["Total Gross","₹ 9,40,000"],["TDS Deduction","₹ 42,600"],["Total Deduction","₹ 1,50,000"],["Projected Tax","₹ 52,000"],["Taxable Income","₹ 7,90,000"],["Remaining","₹ 9,400"]].map(([k,v])=>(
          <KVRow key={k} label={k} value={v} />
        ))}
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Monthly TDS Deduction</h3>
      <TH cols="2fr 1fr 1fr 1fr 110px"><span>Month</span><span>Gross</span><span>TDS</span><span>PF</span><span></span></TH>
      <div className="space-y-2">
        {[{month:"Dec 2025",net:"78,420",gross:"1,05,000",tds:"4,800",pf:"4,200"},{month:"Nov 2025",net:"80,010",gross:"1,02,000",tds:"4,200",pf:"4,200"}].map(r=>(
          <TR key={r.month} cols="2fr 1fr 1fr 1fr 110px">
            <div><div className="font-medium text-sm">{r.month}</div><div className="text-xs text-gray-400">Net: ₹ {r.net}</div></div>
            <span className="font-semibold">₹ {r.gross}</span>
            <span className="font-semibold">₹ {r.tds}</span>
            <span className="font-semibold">₹ {r.pf}</span>
            <span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Open Payslip</button></span>
          </TR>
        ))}
      </div>
    </div>
  </div>
);

// ─── IT Declaration ───
const ITDeclarationSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">IT Declaration & Proof Submission</h3>
    <TH cols="2fr 1fr 1fr 1fr 80px"><span>Section</span><span>Declared</span><span>Proof</span><span>Status</span><span></span></TH>
    <div className="space-y-2">
      {[{section:"80C",sub:"PPF/ELSS/LIC",declared:"1,50,000",proof:"Upload PDF",status:"pending",btn:"Upload"},{section:"80D",sub:"Medical insurance",declared:"25,000",proof:"Uploaded",status:"approved",btn:"View"},{section:"HRA",sub:"Rent receipts",declared:"1,20,000",proof:"Upload receipts",status:"pending",btn:"Upload"}].map(r=>(
        <TR key={r.section} cols="2fr 1fr 1fr 1fr 80px">
          <div><div className="font-medium text-sm">{r.section}</div><div className="text-xs text-gray-400">{r.sub}</div></div>
          <span className="font-semibold">₹ {r.declared}</span>
          <span>{r.proof}</span>
          <span>{r.status==="approved"?<BadgeApproved />:<BadgePending />}</span>
          <span className="text-right">{r.btn==="Upload"?<button className="bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium">Upload</button>:<button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button>}</span>
        </TR>
      ))}
    </div>
  </div>
);

// ─── Income Tax ───
const IncomeTaxSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Income Tax</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <KVRow label="Projected Tax" value="₹ 52,000" />
      <KVRow label="TDS Deducted" value="₹ 42,600" />
      <KVRow label="Remaining" value="₹ 9,400" />
    </div>
    <h4 className="font-semibold text-sm mb-3">Regime Choice</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="flex flex-col gap-1"><label className="text-xs font-medium">Select tax regime</label><select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500"><option>Choose Account</option></select></div>
      <div className="flex flex-col gap-1"><label className="text-xs font-medium">Effective from</label><input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500" placeholder="Choose Account" /></div>
    </div>
    <p className="text-xs text-indigo-600 mt-3">This projection uses your current salary + declarations + verified proofs. Changes in variable pay or LOP can change final tax.</p>
    <div className="flex justify-end gap-3 mt-4">
      <button className="border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100">Recalculate</button>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Save</button>
    </div>
  </div>
);

// ─── Form 16 ───
const Form16Section = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <div className="flex items-center justify-between mb-4">
      <h3 className="font-semibold text-gray-900">Form 16</h3>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Download Full Report</button>
    </div>
    <TH cols="2fr 1fr 1fr 1fr 80px"><span>Financial Year</span><span>Part A</span><span>Part B</span><span>Status</span><span></span></TH>
    <div className="space-y-2">
      <TR cols="2fr 1fr 1fr 1fr 80px"><span className="font-medium">FY 2024-25</span><span>Available</span><span>Available</span><span><BadgeReady /></span><span className="text-right"><button className="bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium">Upload</button></span></TR>
      <TR cols="2fr 1fr 1fr 1fr 80px"><span className="font-medium">FY 2025-26</span><span>—</span><span>—</span><span><BadgePending /></span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Info</button></span></TR>
    </div>
  </div>
);

// ─── Loan ───
const LoanSection = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Loans (Company / Partner)</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <KVRow label="Active Loan" value="1" />
        <KVRow label="Total Outstanding" value="₹ 72,000" />
        <KVRow label="EMI (monthly)" value="₹ 6,000" />
      </div>
      <h4 className="font-semibold text-sm mb-3">Active Loan</h4>
      <TH cols="2fr 1fr 1fr 1fr 110px"><span>Loan ID</span><span>Principal</span><span>Outstanding</span><span>EMI</span><span></span></TH>
      <div className="mt-1">
        <TR cols="2fr 1fr 1fr 1fr 110px">
          <div><div className="font-medium">LN-LN-9007</div><div className="text-xs text-gray-400">Started: Jun 2025</div></div>
          <span className="font-semibold">₹ 1,20,000</span>
          <span className="font-semibold">₹ 72,000</span>
          <span className="font-semibold">₹ 6,000</span>
          <span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">EMI Schedule</button></span>
        </TR>
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Apply For Loan</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Loan Type</label><select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500"><option>Choose Account</option></select></div>
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Amount</label><input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500" placeholder="Enter amount" /></div>
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Tenure</label><select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500"><option>Choose Account</option></select></div>
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Expected EMI (mock)</label><input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500" placeholder="Auto calculated" /></div>
      </div>
      <div className="flex flex-col gap-1 mt-4"><label className="text-xs font-medium">Reason</label><textarea className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-20 resize-none" placeholder="Enter reason" /></div>
      <div className="flex justify-end gap-3 mt-4">
        <button className="border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100">Save Draft</button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Submit</button>
      </div>
    </div>
  </div>
);

// ─── Extra Payment ───
const ExtraPaymentSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Extra Payment</h3>
    <TH cols="1.5fr 1fr 1fr 2fr 80px"><span>Type</span><span>Amount</span><span>Month</span><span>Reason / Notes</span><span></span></TH>
    <div className="space-y-2">
      <TR cols="1.5fr 1fr 1fr 2fr 80px"><div><div className="font-medium">Bonus</div><div className="text-xs text-gray-400">Performance</div></div><span className="font-semibold">₹ 15,000</span><span>Dec 2025</span><span>Quarterly bonus payout</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button></span></TR>
      <TR cols="1.5fr 1fr 1fr 2fr 80px"><div><div className="font-medium">Arrears</div><div className="text-xs text-gray-400">Revision</div></div><span className="font-semibold">₹ 4,200</span><span>Nov 2025</span><span>Salary revision arrears</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button></span></TR>
    </div>
  </div>
);

// ─── Extra Deduction ───
const ExtraDeductionSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Extra Deduction</h3>
    <TH cols="1.5fr 1fr 1fr 2fr 110px"><span>Type</span><span>Amount</span><span>Month</span><span>Reason / Notes</span><span></span></TH>
    <div className="space-y-2">
      <TR cols="1.5fr 1fr 1fr 2fr 110px"><div><div className="font-medium">Recovery</div><div className="text-xs text-gray-400">Advance</div></div><span className="font-semibold">₹ 2,000</span><span>Jan 2026</span><span>Advance EMI Recovery</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Details</button></span></TR>
      <TR cols="1.5fr 1fr 1fr 2fr 110px"><div><div className="font-medium">Asset Deduction</div><div className="text-xs text-gray-400">Damage</div></div><span className="font-semibold">₹ 1,500</span><span>Oct 2025</span><span>Asset Damage Penalty</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View in Payslip</button></span></TR>
    </div>
  </div>
);

// ─── Over Time ───
const OvertimeSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Overtime Payment</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <KVRow label="Overtime (This month)" value="12 Jan 2026" />
      <KVRow label="Approved OT" value="2h" />
      <KVRow label="Estimated payout" value="₹ 1,200" />
    </div>
    <h4 className="font-semibold text-sm mb-3">Overtime Entries</h4>
    <TH cols="1fr 1fr 1fr 1fr 80px"><span>Date</span><span>Hours</span><span>Approval</span><span>Cheque Month</span><span></span></TH>
    <div className="space-y-2">
      <TR cols="1fr 1fr 1fr 1fr 80px"><span>12 Jan 2026</span><span>1h 30m</span><span><BadgeApproved /></span><span>Jan 2026</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Details</button></span></TR>
      <TR cols="1fr 1fr 1fr 1fr 80px"><span>18 Jan 2026</span><span>1h 00m</span><span><BadgePending /></span><span>Jan 2026</span><span className="text-right"><button className="bg-indigo-600 text-white rounded-full px-3 py-1 text-xs font-medium">Request</button></span></TR>
    </div>
  </div>
);

// ─── Annual Payslip ───
const AnnualPayslipSection = () => (
  <div className="bg-white border border-gray-200 rounded-xl p-5">
    <h3 className="font-semibold text-gray-900 mb-4">Annual Payslip</h3>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
      <KVRow label="Total Gross" value="₹ 12,60,000" />
      <KVRow label="Total Deductions" value="₹ 3,10,000" />
      <KVRow label="Total Net" value="₹ 9,50,000" />
    </div>
    <h4 className="font-semibold text-sm mb-3">Monthly Summary</h4>
    <TH cols="1fr 1fr 1fr 1fr 80px"><span>Month</span><span>Gross</span><span>Deductions</span><span>Net</span><span></span></TH>
    <div className="space-y-2">
      <TR cols="1fr 1fr 1fr 1fr 80px"><span>Dec 2025</span><span className="font-semibold">₹ 1,05,000</span><span className="font-semibold">₹ 26,580</span><span className="font-semibold">₹ 78,420</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button></span></TR>
      <TR cols="1fr 1fr 1fr 1fr 80px"><span>Nov 2025</span><span className="font-semibold">₹ 1,02,000</span><span className="font-semibold">₹ 22,490</span><span className="font-semibold">₹ 80,010</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button></span></TR>
    </div>
    <div className="flex justify-end gap-3 mt-4">
      <button className="border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100">Download Annual PDF</button>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Email Statement</button>
    </div>
  </div>
);

// ─── Salary Advance ───
const SalaryAdvanceSection = () => (
  <div className="space-y-6">
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h3 className="font-semibold text-gray-900 mb-4">Salary Advance</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <KVRow label="Eligible Limit" value="₹ 30,000" />
        <KVRow label="Outstanding" value="₹ 8,000" />
        <KVRow label="Next EMI" value="₹ 2,000" />
      </div>
      <h4 className="font-semibold text-sm mb-3">Request Advance</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Select tax regime</label><select className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500"><option>Choose Account</option></select></div>
        <div className="flex flex-col gap-1"><label className="text-xs font-medium">Effective from</label><input className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500" placeholder="Choose Account" /></div>
      </div>
      <div className="flex flex-col gap-1 mt-4"><label className="text-xs font-medium">Reason</label><textarea className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white outline-none focus:border-indigo-500 h-20 resize-none" placeholder="Enter reason" /></div>
      <div className="flex justify-end gap-3 mt-4">
        <button className="border border-gray-200 rounded-full px-4 py-2 text-sm font-medium hover:bg-gray-100">Save Draft</button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2 text-sm font-medium">Submit Request</button>
      </div>
    </div>
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <h4 className="font-semibold text-sm mb-3">Monthly Summary</h4>
      <TH cols="2fr 1fr 1fr 1fr 110px"><span>Request</span><span>Amount</span><span>Status</span><span>EMIs</span><span></span></TH>
      <div className="space-y-2">
        <TR cols="2fr 1fr 1fr 1fr 110px"><div><div className="font-medium">ADV-1182</div><div className="text-xs text-gray-400">Submitted: 10 Jan</div></div><span className="font-semibold">₹ 10,000</span><span><BadgeReview /></span><span>3 Months</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">Request Again</button></span></TR>
        <TR cols="2fr 1fr 1fr 1fr 110px"><div><div className="font-medium">ADV-1120</div><div className="text-xs text-gray-400">Submitted: 02 Dec</div></div><span className="font-semibold">₹ 9,000</span><span><BadgeApproved /></span><span>4 Months</span><span className="text-right"><button className="border border-gray-200 rounded-full px-3 py-1 text-xs font-medium hover:bg-gray-100">View</button></span></TR>
      </div>
    </div>
  </div>
);

const SECTION_COMPONENTS = {
  "Package & Proration": PackageProrationSection,
  "Payslip": PayslipSection,
  "Tax Sheet": TaxSheetSection,
  "IT Declaration & Submission": ITDeclarationSection,
  "Income Tax": IncomeTaxSection,
  "Form 16": Form16Section,
  "Loan": LoanSection,
  "Extra Payment": ExtraPaymentSection,
  "Extra Deduction": ExtraDeductionSection,
  "Over Time Payment": OvertimeSection,
  "Annual Payslip": AnnualPayslipSection,
  "Salary Advance": SalaryAdvanceSection,
};

// ─── Money Icon SVG ───
const MoneyIcon = () => (
  <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center mx-auto mb-3">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="1.8">
      <rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/>
    </svg>
  </div>
);
const GearIcon = () => (
  <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center mx-auto mb-3">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8">
      <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>
    </svg>
  </div>
);
const CalendarIcon = () => (
  <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
    </svg>
  </div>
);

// ─── Run Payroll Tab — full multi-step flow ───
const RunPayrollTab = () => {
  const [step, setStep] = useState("overview"); // overview | form | draft-summary | post-approve
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [form, setForm] = useState({ month: "", type: "", forWhom: "", employee: "" });

  // ── Step 1: Overview (Image 1 — My Payroll + Company Payroll) ──
  if (step === "overview") return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payroll</h2>
          <p className="text-sm text-gray-500 mt-1">Manage salary processing and view payroll records</p>
        </div>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* My Payroll */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">My Payroll</h3>
            <div className="space-y-3">
              <KVRow label="Last Salary Credited" value="₹ 85,000" />
              <KVRow label="Last Payroll Date" value="31 Jan 2026" />
              <KVRow label="Tax Deducted" value="₹ 4,200" />
            </div>
            <div className="flex gap-3 mt-5">
              <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">View My Payslips</button>
              <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium">Download Latest</button>
            </div>
          </div>
          {/* Company Payroll */}
          <div>
            <h3 className="text-base font-semibold text-gray-900 mb-4">Company Payroll</h3>
            <div className="space-y-3">
              <KVRow label="Current Month" value="Feb 2026" />
              <KVRow label="Total Employees" value="142" />
              <KVRow label="Estimated Payroll" value="₹ 42,80,000" />
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={()=>setStep("payroll-run")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Run Payroll</button>
              <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium">View History</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ── Step 2: Payroll Run page (Images 2/3) ──
  if (step === "payroll-run") return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payroll Run</h2>
          <p className="text-sm text-gray-500 mt-1">Process and finalize monthly payroll</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700">Payroll Reports</button>
          <button onClick={()=>setStep("form")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Run Payroll</button>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Overview</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Open Runs</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">2</div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Draft / Review</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Blockers</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-xs text-gray-400">Needs fix before finalize</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Last Finalized</div>
            <div className="text-xl font-bold text-gray-900 mb-1">Jan-2016</div>
            <div className="text-xs text-gray-400">Paid on Jan 31</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Next Pay Date</div>
            <div className="text-xl font-bold text-gray-900 mb-1">Feb-28-2016</div>
            <div className="text-xs text-gray-400">Cutoff: Feb 24</div>
          </div>
        </div>
      </div>

      {/* Payroll Overview */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Payroll Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
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
          <button onClick={()=>setStep("form")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Run payroll</button>
          <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium">View Details</button>
        </div>
      </div>
    </div>
  );

  // ── Step 3: Run Payroll Form (Image 4) ──
  if (step === "form") return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payroll Run</h2>
        <p className="text-sm text-gray-500 mt-1">Process and finalize monthly payroll</p>
      </div>
      <div className="bg-white border border-gray-200 rounded-xl p-6 max-w-2xl">
        <div className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Payroll Month</label>
            <select value={form.month} onChange={e=>setForm({...form,month:e.target.value})} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500">
              <option value="">Choose Account</option>
              <option>January 2026</option><option>February 2026</option><option>March 2026</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Payroll Type</label>
            <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500">
              <option value="">Choose Account</option>
              <option>Regular</option><option>Off-Cycle</option><option>Bonus</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">For whom would you like to run payroll?</label>
            <select value={form.forWhom} onChange={e=>setForm({...form,forWhom:e.target.value})} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500">
              <option value="">Choose Account</option>
              <option>All Employees</option><option>Specific Department</option><option>Specific Employee</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Employee Name</label>
            <select value={form.employee} onChange={e=>setForm({...form,employee:e.target.value})} className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm bg-white outline-none focus:border-blue-500">
              <option value="">Choose Account</option>
              <option>All</option><option>Natashia Bunny</option><option>John Doe</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-8">
          <button onClick={()=>setStep("payroll-run")} className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium">Cancel</button>
          <button onClick={()=>setShowDraftModal(true)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Save</button>
        </div>
      </div>

      {/* Draft Summary Modal (Image 5) */}
      {showDraftModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4">
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Draft Summary</h3>
                  <p className="text-sm text-gray-400 mt-0.5">Download the template, fill employee details, then upload file.</p>
                </div>
                <button onClick={()=>setShowDraftModal(false)} className="border border-gray-200 rounded-lg w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg leading-none">×</button>
              </div>
            </div>
            <div className="px-6 space-y-3">
              <KVRow label="Payroll Type" value="Regular" />
              <KVRow label="Total Employees Processed" value="4" />
              <KVRow label="Estimated Net Payroll" value="₹ 42,80,000" />
            </div>
            <div className="flex gap-3 p-6 pt-8">
              <button onClick={()=>setShowDraftModal(false)} className="flex-1 border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-4 py-2.5 text-sm font-medium">Cancel</button>
              <button onClick={()=>{setShowDraftModal(false);setStep("post-approve");}} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2.5 text-sm font-medium">Approve and Lock Payroll</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // ── Step 4: Post-Approve view (Image 6) ──
  if (step === "post-approve") return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payroll Run</h2>
          <p className="text-sm text-gray-500 mt-1">Process and finalize monthly payroll</p>
        </div>
        <div className="flex gap-3">
          <button className="border border-gray-300 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium text-gray-700">Payroll Reports</button>
          <button onClick={()=>setStep("form")} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Run Payroll</button>
        </div>
      </div>

      {/* Quick Overview */}
      <div className="mb-2">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Quick Overview</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Open Runs</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">2</div>
            <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-700">Draft / Review</span>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Blockers</div>
            <div className="text-2xl font-bold text-gray-900 mb-2">3</div>
            <div className="text-xs text-gray-400">Needs fix before finalize</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Last Finalized</div>
            <div className="text-xl font-bold text-gray-900 mb-1">Jan-2016</div>
            <div className="text-xs text-gray-400">Paid on Jan 31</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-sm text-gray-500 mb-1">Next Pay Date</div>
            <div className="text-xl font-bold text-gray-900 mb-1">Feb-28-2016</div>
            <div className="text-xs text-gray-400">Cutoff: Feb 24</div>
          </div>
        </div>
      </div>

      {/* Payroll Overview — post approve */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mt-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-4">Payroll Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
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
          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 py-2.5 text-sm font-medium">Generate Payslips</button>
          <button className="border border-gray-200 bg-white hover:bg-gray-50 rounded-lg px-5 py-2.5 text-sm font-medium">Download Bank Reciets</button>
        </div>
      </div>
    </div>
  );

  return null;
};

// ─── Main App ───
const PayrollDashboard = () => {
  const [topTab, setTopTab] = useState("My Payroll");
  const [activeSection, setActiveSection] = useState("Package & Proration");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-6">

        {/* Page Header — only for My Payroll tab */}
        {topTab === "My Payroll" && (
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Payroll</h2>
              <p className="text-sm text-gray-500 mt-1">Your payslips, salary structure, tax documents, and payroll support.</p>
            </div>
            <div className="flex gap-2">
              <button className="border border-gray-200 bg-white rounded-full px-5 py-2 text-sm font-medium hover:bg-gray-50">Policy</button>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-5 py-2 text-sm font-medium">Raise Query</button>
            </div>
          </div>
        )}

        {/* Top Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-6">
          {["My Payroll","Run Payroll"].map(tab=>(
            <button
              key={tab}
              onClick={()=>setTopTab(tab)}
              className={`px-5 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${topTab===tab ? "bg-white border border-gray-200 -mb-px text-gray-900" : "text-gray-500 hover:text-gray-900 bg-transparent border-none"}`}
            >{tab}</button>
          ))}
        </div>

        {topTab==="My Payroll" ? (
          <>
            {/* Page Header — only for My Payroll */}
            <SummaryCards />
            <div className="mt-8">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900">My Payroll</h3>
                <p className="text-sm text-gray-500 mt-0.5">Everything you need: payslips, tax, attendance impact, and support.</p>
              </div>

              {/* Dropdown + Month Filter */}
              <div className="flex items-center justify-between mb-6">
                <div className="relative">
                  <button
                    onClick={()=>setDropdownOpen(!dropdownOpen)}
                    className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-medium bg-white flex items-center gap-2 min-w-56 justify-between hover:bg-gray-50"
                  >
                    {activeSection} <ChevronDownIcon />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute left-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-64 overflow-hidden">
                      {DROPDOWN_ITEMS.map(item=>(
                        <button
                          key={item}
                          onClick={()=>{setActiveSection(item);setDropdownOpen(false);}}
                          className={`block w-full text-left px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${activeSection===item?"font-semibold bg-gray-50":""}`}
                        >{item}</button>
                      ))}
                    </div>
                  )}
                </div>
                <select className="border border-gray-200 rounded-lg px-4 py-2.5 text-sm bg-white cursor-pointer outline-none">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>

              <ActiveComponent />
            </div>
          </>
        ) : (
          <RunPayrollTab />
        )}
      </div>
    </div>
  );
};

export default PayrollDashboard;