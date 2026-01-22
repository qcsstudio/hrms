import Summrycardcomponent from "./Summrycardcomponent";

const salarystructure = [
  { name: "Annual CTC", value: "12,00,000" },
  { name: "Variable Bonus", value: "12,00,000" },
  { name: "Fixed Pay", value: "12,00,000" },
  { name: "Pay Cycle", value: "Monthly" },
];

const Earnings = [
  { name: "Basic", value: "35,000" },
  { name: "HRA", value: "12,000" },
  { name: "Special Allowance", value: "22,000" },
  { name: "Conveyance", value: "2,000" },
  { name: "Variable  (avg)", value: "12,500" },
];

const Deductions = [
  { name: "Employer PF", value: "4200" },
  { name: "Insurance", value: "900" },
  { name: "Gratuity", value: "1400" },
  { name: "LOP  (If Any)", value: "1400" },
  { name: "Other", value: "12,500" },
];

export default function DashboardPayroll1() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Summary Card */}
      <div>
        <Summrycardcomponent />
      </div>

      {/* Header */}
      <div className="mt-5">
        <h1 className="font-bold text-[22px]">Payroll</h1>
        <p className="text-[14px] text-gray-300">
          Your payslips, salary structure, tax documents, and payroll support.
        </p>
      </div>

      {/* Tabs + Dropdown */}
      <div className="mt-5 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-wrap md:flex-nowrap gap-2 border border-[#DEE2E6] bg-[#F3F3F4] rounded-md h-[40px]">
          <button className="px-3">Package & Proration</button>
          <button className="px-3">Payslips</button>
          <button className="px-3">Attendance</button>
          <button className="px-3">Tax & Docs</button>
          <button className="px-3">Bank & Payment</button>
          <button className="px-3">Claims</button>
        </div>

        <select className="border border-[#DEE2E6] bg-[#F3F3F4] rounded-md h-[40px] w-full md:w-[220px]">
          <option>This month</option>
          <option></option>
        </select>
      </div>

      {/* Current Salary Structure */}
      <div className="mt-5 bg-white p-4 rounded-md">
        <p className="text-lg font-semibold">Current Salary Structure</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {salarystructure.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] flex justify-between items-center h-[48px] rounded-md px-4"
            >
              <div className="text-[#000000] text-[12px]">{item.name}</div>
              <div className="font-medium text-[#000000]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Components */}
      <div className="mt-5 bg-white p-4 rounded-md">
        <h1 className="font-bold text-[22px]">Monthly Components</h1>
        <div className="mt-5 flex flex-col md:flex-row gap-4">
          {/* Earnings */}
          <div className="flex-1">
            <p className="text-[14px] font-medium px-2">Earnings</p>
            <div className="mt-2 space-y-3">
              {Earnings.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] flex justify-between items-center rounded-md h-[48px] px-4"
                >
                  <div className="text-[#000000] text-[12px]">{item.name}</div>
                  <div className="font-medium text-[#000000]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deductions */}
          <div className="flex-1">
            <p className="text-[14px] font-medium px-2">Deductions</p>
            <div className="mt-2 space-y-3">
              {Deductions.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] flex justify-between items-center rounded-md h-[48px] px-4"
                >
                  <div className="text-[#000000] text-[12px]">{item.name}</div>
                  <div className="font-medium text-[#000000]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


