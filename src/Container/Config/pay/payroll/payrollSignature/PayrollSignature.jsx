import { useState } from "react";

const PayrollSignature = () => {
  const [activeTab, setActiveTab] = useState("salary-cycle");
  const [addOpen, setAddOpen] = useState(false);
  const [assignOpen, setAssignOpen] = useState(false);
  const [earlyRun, setEarlyRun] = useState(false);
  const [skipAttendance, setSkipAttendance] = useState("yes");

  // DEFAULT SELECT = NO
  const [isExisting, setIsExisting] = useState("no");

  const timelineEntries = [
    { month: "Feb", year: "2026", name: "Ravi Kant Sankhyan" },
    { month: "Feb", year: "2026", name: "Ravi Kant Sankhyan" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6 relative">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Salary Cycle
          </h1>
          <p className="text-sm text-gray-500">
            Your payslips, salary structure, tax documents, and payroll support.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setAssignOpen(true)}
            className="px-4 py-2 border rounded-md bg-white text-sm hover:bg-gray-50"
          >
            Assign Signing Authority
          </button>
          <button
            onClick={() => setAddOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
          >
            Add Signing Authority
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}
      <div className="flex border rounded-md bg-gray-200 w-fit overflow-hidden mb-6">
        {["salary-cycle", "early-run", "no-attendance"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 text-sm transition ${
              activeTab === tab
                ? "bg-white text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab === "salary-cycle"
              ? "Salary Cycle"
              : tab === "early-run"
              ? "Early Run Payroll"
              : "No-Attendance Payroll"}
          </button>
        ))}
      </div>

      {/* ================= SALARY CYCLE ================= */}
      {activeTab === "salary-cycle" && (
        <div className="relative">

          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-300" />

          <div className="space-y-8">
            {timelineEntries.map((entry, i) => (
              <div key={i} className="flex gap-6 relative">

                {/* Date Circle */}
                <div className="z-10">
                  <div className="h-14 w-14 rounded-full border bg-white flex flex-col items-center justify-center text-xs text-gray-500 shadow-sm">
                    <span className="font-medium">{entry.month}</span>
                    <span>{entry.year}</span>
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1 bg-white border rounded-lg p-5 shadow-sm">
                  <div className="text-xs text-gray-500 mb-2">
                    Present
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-red-300" />
                    <div>
                      <p className="text-sm font-medium text-blue-700">
                        {entry.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Payslip · Form 16
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= EARLY RUN ================= */}
      {activeTab === "early-run" && (
        <div className="bg-white p-6 rounded-lg border shadow-sm space-y-6">
          <div className="flex justify-between items-center border rounded-lg p-4">
            <span className="text-sm">
              Do you want to early run payroll for the current month?
            </span>

            <button
              onClick={() => setEarlyRun(!earlyRun)}
              className={`w-11 h-6 rounded-full transition ${
                earlyRun ? "bg-blue-600" : "bg-gray-300"
              } relative`}
            >
              <div
                className={`h-5 w-5 bg-white rounded-full absolute top-0.5 transition ${
                  earlyRun ? "right-0.5" : "left-0.5"
                }`}
              />
            </button>
          </div>

          <div>
            <label className="text-sm font-medium block mb-2">
              How many days prior to schedule do you want to payroll?
            </label>
            <input
              type="text"
              placeholder="Number of Days"
              className="w-full border rounded-md p-2"
            />
          </div>
        </div>
      )}

      {/* ================= NO ATTENDANCE ================= */}
      {activeTab === "no-attendance" && (
        <div className="bg-white border p-6 rounded-lg shadow-sm space-y-4">
          <h3 className="text-sm font-medium">
            Do you wish to skip attendance-leave data & assume present?
          </h3>

          {["yes", "no"].map((option) => (
            <div
              key={option}
              onClick={() => setSkipAttendance(option)}
              className={`border rounded-lg p-4 cursor-pointer transition ${
                skipAttendance === option
                  ? "border-blue-600 bg-blue-50"
                  : "hover:bg-gray-50"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}

      {/* ================= ADD SIGNING AUTHORITY DRAWER ================= */}
      {addOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[480px] bg-white p-8 overflow-y-auto shadow-xl">

            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-semibold">
                Add Signing Authority
              </h2>
              <button
                onClick={() => setAddOpen(false)}
                className="text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </div>

            {/* Existing Label */}
            {isExisting === "yes" && (
              <div className="text-right text-red-500 text-sm font-medium mb-4">
                Existing Employee
              </div>
            )}

            <div className="space-y-6">

              {/* Radio */}
              <div>
                <label className="text-sm font-medium block mb-3">
                  Is the employee existing
                </label>

                <div className="flex gap-4">
                  {["yes", "no"].map((opt) => (
                    <div
                      key={opt}
                      onClick={() => setIsExisting(opt)}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer flex items-center gap-3 transition ${
                        isExisting === opt
                          ? "border-blue-600 ring-2 ring-blue-200"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <div
                        className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                          isExisting === opt
                            ? "border-blue-600"
                            : "border-gray-400"
                        }`}
                      >
                        {isExisting === opt && (
                          <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                        )}
                      </div>
                      <span className="capitalize">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inputs */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Employee Name
                </label>
                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Choose Account"
                />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Father Name
                </label>
                <input
                  className="w-full border rounded-lg p-3"
                  placeholder="Choose Account"
                />
              </div>

              {isExisting === "no" && (
                <>
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Designation
                    </label>
                    <input
                      className="w-full border rounded-lg p-3"
                      placeholder="Choose Account"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Gender
                    </label>
                    <select className="w-full border rounded-lg p-3">
                      <option>Choose Account</option>
                      <option>Male</option>
                      <option>Female</option>
                    </select>
                  </div>
                </>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={() => setAddOpen(false)}
                  className="px-6 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= ASSIGN AUTHORITY DRAWER ================= */}
      {assignOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
          <div className="w-full sm:w-[480px] bg-white p-8 shadow-xl">

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                Assign Authority
              </h2>
              <button onClick={() => setAssignOpen(false)}>✕</button>
            </div>

            <div className="space-y-5">

              <div>
                <label className="text-sm font-medium block mb-2">
                  Effective From
                </label>
                <input className="w-full border rounded-lg p-3" />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Select Signing Authority
                </label>
                <input className="w-full border rounded-lg p-3" />
              </div>

              <div>
                <label className="text-sm font-medium block mb-2">
                  Select fallback (Optional)
                </label>
                <input className="w-full border rounded-lg p-3" />
              </div>

              <div className="flex gap-4">
                <div className="flex-1 border rounded-lg p-4 flex justify-between">
                  Pay Slip <span>✓</span>
                </div>
                <div className="flex-1 border rounded-lg p-4 flex justify-between">
                  Form 16 <span>✓</span>
                </div>
              </div>

              <div className="flex justify-end pt-6">
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                  Save
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PayrollSignature;