import { useState } from "react";

const PayrollMethod = () => {
  const [packageType, setPackageType] = useState("monthly");
  const [salaryMethod, setSalaryMethod] = useState("gross");

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Payroll Method</h1>
        <p className="text-sm text-gray-500">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="space-y-8">
        {/* Package Type Section */}
        <div>
          <h3 className="text-sm font-semibold mb-3">
            How are employees assigned salary packages?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {/* Annual */}
            <label
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition 
                ${packageType === "annual" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="radio"
                name="packageType"
                value="annual"
                checked={packageType === "annual"}
                onChange={() => setPackageType("annual")}
                className="accent-blue-600"
              />
              <span>Annual Package</span>
            </label>

            {/* Monthly */}
            <label
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition 
                ${packageType === "monthly" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="radio"
                name="packageType"
                value="monthly"
                checked={packageType === "monthly"}
                onChange={() => setPackageType("monthly")}
                className="accent-blue-600"
              />
              <span>Monthly Package</span>
            </label>
          </div>
        </div>

        {/* Salary Method Section */}
        <div>
          <h3 className="text-sm font-semibold mb-3">
            Which method would you like to choose for salary assignment?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
            {/* CTC */}
            <label
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition 
                ${salaryMethod === "ctc" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="radio"
                name="salaryMethod"
                value="ctc"
                checked={salaryMethod === "ctc"}
                onChange={() => setSalaryMethod("ctc")}
                className="accent-blue-600"
              />
              <span>Cost to Company</span>
            </label>

            {/* Gross */}
            <label
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition 
                ${salaryMethod === "gross" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="radio"
                name="salaryMethod"
                value="gross"
                checked={salaryMethod === "gross"}
                onChange={() => setSalaryMethod("gross")}
                className="accent-blue-600"
              />
              <span>Gross Pay</span>
            </label>

            {/* Proration */}
            <label
              className={`flex items-center gap-3 border rounded-lg p-4 cursor-pointer transition 
                ${salaryMethod === "proration" ? "border-blue-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="radio"
                name="salaryMethod"
                value="proration"
                checked={salaryMethod === "proration"}
                onChange={() => setSalaryMethod("proration")}
                className="accent-blue-600"
              />
              <span>Proration Upload</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollMethod;