import { useState } from "react";

const SalaryCycle = () => {
  const [activeTab, setActiveTab] = useState("salary-cycle");

  // Salary Cycle State
  const [cycleName, setCycleName] = useState("Month to Month Payroll");
  const [customizeAttendance, setCustomizeAttendance] = useState(false);

  // Early Run State
  const [earlyRun, setEarlyRun] = useState(false);
  const [days, setDays] = useState("");

  // No Attendance State
  const [skipAttendance, setSkipAttendance] = useState("yes");

  const cycleRows = [
    { monthToMonth: true, definedWorkdays: true, excludeWeeklyOff: true },
    { monthToMonth: true, definedWorkdays: true, excludeWeeklyOff: false },
    { monthToMonth: true, definedWorkdays: false, excludeWeeklyOff: true },
    { monthToMonth: true, definedWorkdays: false, excludeWeeklyOff: false },
  ];

  const logRows = [
    { earlyBy: true, month: true, scheduledDate: true },
    { earlyBy: true, month: true, scheduledDate: false },
    { earlyBy: false, month: true, scheduledDate: true },
    { earlyBy: false, month: true, scheduledDate: false },
  ];

  const Cell = ({ active }) => (
    <div className="flex justify-center">
      {active ? (
        <span className="text-blue-600 font-bold">✓</span>
      ) : (
        <span className="text-gray-400">—</span>
      )}
    </div>
  );

  const Toggle = ({ checked, onChange }) => (
    <div
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
        checked ? "bg-blue-600" : "bg-gray-300"
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
          checked ? "translate-x-5" : ""
        }`}
      />
    </div>
  );

  return (
    <div className="p-6 space-y-6">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-xl font-semibold">Salary Cycle</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {activeTab !== "salary-cycle" && (
          <button className="px-5 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
            Save
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex bg-gray-100 border rounded-lg w-fit overflow-hidden">
        {["salary-cycle", "early-run", "no-attendance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm ${
              activeTab === tab
                ? "bg-white text-blue-600 font-medium"
                : "text-gray-600"
            }`}
          >
            {tab === "salary-cycle" && "Salary Cycle"}
            {tab === "early-run" && "Early Run Payroll"}
            {tab === "no-attendance" && "No-Attendance Payroll"}
          </button>
        ))}
      </div>

      {/* ================= Salary Cycle Tab ================= */}
      {activeTab === "salary-cycle" && (
        <div className="space-y-6">

          <div>
            <label className="text-sm font-semibold block mb-2">
              Salary Cycle
            </label>
            <select className="border rounded-md px-3 py-2 w-full max-w-sm">
              <option>Month to Month Payroll</option>
              <option>Bi-Weekly Payroll</option>
              <option>Weekly Payroll</option>
            </select>
          </div>

          {/* Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 text-xs font-medium text-gray-500">
              <span>Select Type</span>
              <span className="text-center">Month to Month Payroll</span>
              <span className="text-center">Defined Workdays</span>
              <span className="text-center">Exclude weekly off</span>
            </div>

            {cycleRows.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 px-4 py-4 border-t items-center"
              >
                <div>
                  <div className="h-4 w-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                </div>
                <Cell active={row.monthToMonth} />
                <Cell active={row.definedWorkdays} />
                <Cell active={row.excludeWeeklyOff} />
              </div>
            ))}
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">
              Enter Payroll Cycle Name
            </label>
            <input
              value={cycleName}
              onChange={(e) => setCycleName(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div className="flex justify-between items-center border rounded-lg p-4">
            <span className="text-sm">
              Do you want to customize the attendance cycle for run payroll?
            </span>
            <Toggle
              checked={customizeAttendance}
              onChange={setCustomizeAttendance}
            />
          </div>
        </div>
      )}

      {/* ================= Early Run Payroll ================= */}
      {activeTab === "early-run" && (
        <div className="space-y-6">

          <div className="flex justify-between items-center border rounded-lg p-4">
            <span className="text-sm">
              Do you want to early run payroll for the current month?
            </span>
            <Toggle checked={earlyRun} onChange={setEarlyRun} />
          </div>

          <div>
            <label className="text-sm font-semibold block mb-2">
              How many days prior to schedule do you want to payroll?
            </label>
            <input
              placeholder="Number of Days"
              value={days}
              onChange={(e) => setDays(e.target.value)}
              className="border rounded-md px-3 py-2 w-full"
            />
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Logs</h3>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 text-xs font-medium text-gray-500">
                <span>Month</span>
                <span className="text-center">Early By</span>
                <span className="text-center">Month</span>
                <span className="text-center">Scheduled payroll date</span>
              </div>

              {logRows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 px-4 py-4 border-t items-center"
                >
                  <div>
                    <div className="h-4 w-4 rounded-full border-2 border-blue-600 flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-blue-600" />
                    </div>
                  </div>
                  <Cell active={row.earlyBy} />
                  <Cell active={row.month} />
                  <Cell active={row.scheduledDate} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= No Attendance Payroll ================= */}
      {activeTab === "no-attendance" && (
        <div className="space-y-4">

          <h3 className="text-sm font-semibold">
            Do you wish to skip attendance-leave data & assume present for all
            working days to run payroll?
          </h3>

          <div className="space-y-3 max-w-2xl">
            {["yes", "no"].map((option) => (
              <label
                key={option}
                className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer ${
                  skipAttendance === option
                    ? "border-blue-600 bg-blue-50"
                    : ""
                }`}
              >
                <input
                  type="radio"
                  name="attendance"
                  checked={skipAttendance === option}
                  onChange={() => setSkipAttendance(option)}
                  className="accent-blue-600"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            (you will be able to upload LOP for deductions if any)
          </p>
        </div>
      )}
    </div>
  );
};

export default SalaryCycle;