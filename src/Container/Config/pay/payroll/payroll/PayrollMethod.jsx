import { useEffect, useState } from "react";
import createAxios from "../../../../../utils/axios.config";
import { toast } from "react-toastify";

const PayrollMethod = () => {
  const [packageType, setPackageType] = useState("monthly");
  const [salaryMethod, setSalaryMethod] = useState("gross");
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  // ── GET /config/payroll-method on mount → prefill radio buttons
  useEffect(() => {
    const fetchPayrollMethod = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/config/payroll-method", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const data = response?.data?.data || response?.data;

        // Prefill from API response — matches schema enum values
        if (data?.packageType) setPackageType(data.packageType);
        if (data?.salaryMethod) setSalaryMethod(data.salaryMethod);
      } catch (error) {
        console.error("Error fetching payroll method:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayrollMethod();
  }, []);

  // ── POST /config/payroll-method on Save
  const handleSave = async () => {
    try {
      setSaving(true);

      const payload = {
        packageType,
        salaryMethod,
      };

      const response = await axiosInstance.post("/config/payroll-method", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      console.log("Payroll method saved:", response?.data);
      toast.success("Payroll method saved successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error saving payroll method:", error);
      toast.error("Failed to save payroll method. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold">Payroll Method</h1>
        <p className="text-sm text-gray-500">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="text-sm text-gray-400 mb-4">Loading payroll method...</div>
      )}

      <div className="space-y-8">
        {/* Package Type Section — 2 columns */}
        <div>
          <h3 className="text-sm font-semibold mb-3">
            How are employees assigned salary packages?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
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

        {/* Salary Method Section — 3 columns in one row */}
        <div>
          <h3 className="text-sm font-semibold mb-3">
            Which method would you like to choose for salary assignment?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl">
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

      {/* Save Button — bottom right */}
      <div className="flex justify-end mt-8">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || loading}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default PayrollMethod;