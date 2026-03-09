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

// ─── Main App ───
const PayrollDashboard = () => {
  const [topTab, setTopTab] = useState("My Payroll");
  const [activeSection, setActiveSection] = useState("Package & Proration");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-6 py-6">

        {/* Page Header */}
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
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Run Payroll</h3>
            <p className="text-sm text-gray-500">Payroll processing features will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollDashboard;
