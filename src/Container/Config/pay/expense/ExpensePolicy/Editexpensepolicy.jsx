import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../../utils/axios.config";

const categories = [
  "Allowance",
  "Travel",
  "Personal Vehicle Expense",
  "Stay",
  "Skill Development",
  "Meals and Entertainment",
  "Utilities",
  "Office Expenses",
  "Commute",
];

const trainClasses = [
  "1A - First class AC",
  "2A - AC two tier",
  "2S - Seater class",
  "3A - AC three tier",
  "CC - AC chair car",
  "General",
  "SL - Sleeper class",
];
const busClasses = [
  "AC Seater",
  "AC-Semi sleeper",
  "AC Sleeper",
  "Non-AC Seater",
  "Non-AC Semi-Sleeper",
  "Non AC Sleeper",
];
const airClasses = [
  "All",
  "Business Class",
  "Economy Class",
  "First Class",
  "Premium Class",
];
const fuelTypes = ["Diesel", "Electricity", "Natural Gas (CNG)", "Petrol"];
const consumptionTypes = ["Volume", "Distance"];

const getStoredOfficeIds = () => {
  const rawValue =
    localStorage.getItem("companyOfficeId") ||
    localStorage.getItem("officeId") ||
    "";

  if (!rawValue) return [];

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((item) => typeof item === "string" && item.trim());
    }
  } catch (error) {
    // Ignore invalid JSON and use string fallback.
  }

  return /^[a-f\d]{24}$/i.test(rawValue) ? [rawValue] : [];
};

const steps = [
  { id: 1, label: "Policy Details" },
  { id: 2, label: "Expense Limits" },
  { id: 3, label: "Advance Settings" },
];

const blue = {
  activeCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#2563EB",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    border: "2px solid #2563EB",
    flexShrink: 0,
  },
  completedCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#DBEAFE",
    color: "#2563EB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    border: "2px solid #2563EB",
    flexShrink: 0,
  },
  inactiveCircle: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    backgroundColor: "#fff",
    color: "#9CA3AF",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: 14,
    border: "2px solid #D1D5DB",
    flexShrink: 0,
  },
  activeLine: { flex: 1, height: 2, backgroundColor: "#2563EB", margin: "0 8px", marginBottom: 16 },
  inactiveLine: { flex: 1, height: 2, backgroundColor: "#D1D5DB", margin: "0 8px", marginBottom: 16 },
  activeLabel: { marginTop: 4, fontSize: 12, fontWeight: 600, color: "#2563EB", whiteSpace: "nowrap" },
  inactiveLabel: { marginTop: 4, fontSize: 12, fontWeight: 500, color: "#9CA3AF", whiteSpace: "nowrap" },
  primaryBtn: {
    backgroundColor: "#2563EB",
    color: "#fff",
    border: "none",
    padding: "10px 24px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  outlineBtn: {
    backgroundColor: "#fff",
    color: "#374151",
    border: "1px solid #D1D5DB",
    padding: "10px 24px",
    borderRadius: 6,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },
  input: {
    height: 40,
    borderRadius: 8,
    border: "1px solid #DCE3EE",
    backgroundColor: "#fff",
    padding: "0 12px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  select: {
    height: 40,
    borderRadius: 8,
    border: "1px solid #DCE3EE",
    backgroundColor: "#fff",
    padding: "0 12px",
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  faintLabel: {
    fontSize: 12,
    color: "#7B8794",
    fontWeight: 500,
  },
};

const Toggle = ({ value, onChange }) => (
  <div
    onClick={() => onChange(!value)}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      backgroundColor: value ? "#2563EB" : "#D1D5DB",
      position: "relative",
      cursor: "pointer",
      flexShrink: 0,
      transition: "background-color 0.2s",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 2,
        left: value ? 22 : 2,
        width: 20,
        height: 20,
        borderRadius: "50%",
        backgroundColor: "#fff",
        boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
        transition: "left 0.2s",
      }}
    />
  </div>
);

const EditExpensePolicy = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const navigate = useNavigate();
  const { id } = useParams();

  const [step, setStep] = useState(1);
  const [policyName, setPolicyName] = useState("");
  const [description, setDescription] = useState("");
  const [categorySelections, setCategorySelections] = useState({});
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const [catLimits, setCatLimits] = useState({});
  const [trainClass, setTrainClass] = useState("");
  const [busClass, setBusClass] = useState("");
  const [airClass, setAirClass] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [consumptionType, setConsumptionType] = useState("");
  const [advancePayment, setAdvancePayment] = useState(true);
  const [maxWithoutReceipt, setMaxWithoutReceipt] = useState("");
  const [advanceRequest, setAdvanceRequest] = useState(true);
  const [maxAdvance, setMaxAdvance] = useState("");
  const [lowerLimit, setLowerLimit] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExpensePolicy = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/config/getOne/expensePolicy/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const policy = response?.data?.data || response?.data?.expensePolicy || response?.data || {};

        setPolicyName(policy?.policyName || "");
        setDescription(policy?.description || "");
        setMonthlyLimit(policy?.monthlyLimit != null ? String(policy.monthlyLimit) : "");
        setCategorySelections({
          Allowance: policy?.categories?.allowance ? "enabled" : "disabled",
          Travel: policy?.categories?.travel ? "enabled" : "disabled",
          "Personal Vehicle Expense": policy?.categories?.personalVehicle ? "enabled" : "disabled",
          Stay: policy?.categories?.stay ? "enabled" : "disabled",
          "Skill Development": policy?.categories?.skillDevelopment ? "enabled" : "disabled",
          "Meals and Entertainment": policy?.categories?.mealsEntertainment ? "enabled" : "disabled",
          Utilities: policy?.categories?.utilities ? "enabled" : "disabled",
          "Office Expenses": policy?.categories?.officeExpenses ? "enabled" : "disabled",
          Commute: policy?.categories?.commute ? "enabled" : "disabled",
        });
        setCatLimits({
          Allowance: {
            limit: policy?.limits?.allowance?.limit != null ? String(policy.limits.allowance.limit) : "",
            amount: policy?.limits?.allowance?.amount != null ? String(policy.limits.allowance.amount) : "",
          },
          Travel: {
            limit: policy?.limits?.travel?.limit != null ? String(policy.limits.travel.limit) : "",
            amount: policy?.limits?.travel?.amount != null ? String(policy.limits.travel.amount) : "",
          },
          "Personal Vehicle Expense": {
            limit:
              policy?.limits?.personalVehicle?.limit != null
                ? String(policy.limits.personalVehicle.limit)
                : "",
            amount:
              policy?.limits?.personalVehicle?.amount != null
                ? String(policy.limits.personalVehicle.amount)
                : "",
          },
          Stay: {
            limit: policy?.limits?.stay?.limit != null ? String(policy.limits.stay.limit) : "",
            amount: policy?.limits?.stay?.amount != null ? String(policy.limits.stay.amount) : "",
          },
          "Skill Development": { limit: "", amount: "" },
          "Meals and Entertainment": { limit: "", amount: "" },
          Utilities: { limit: "", amount: "" },
          "Office Expenses": { limit: "", amount: "" },
          Commute: { limit: "", amount: "" },
        });
        setTrainClass(policy?.travelSettings?.trainClass?.[0] || "");
        setBusClass(policy?.travelSettings?.busClass?.[0] || "");
        setAirClass(policy?.travelSettings?.airClass?.[0] || "");
        setFuelType(policy?.vehicleSettings?.fuelType?.[0] || "");
        setConsumptionType(policy?.vehicleSettings?.consumptionType?.[0] || "");
        setAdvancePayment(Boolean(policy?.advanceSettings?.advancePayment));
        setMaxWithoutReceipt(
          policy?.advanceSettings?.maxWithoutReceipt != null
            ? String(policy.advanceSettings.maxWithoutReceipt)
            : ""
        );
        setAdvanceRequest(Boolean(policy?.advanceSettings?.advanceRequest));
        setMaxAdvance(
          policy?.advanceSettings?.maxAdvance != null
            ? String(policy.advanceSettings.maxAdvance)
            : ""
        );
        setLowerLimit(
          policy?.advanceSettings?.lowerLimit != null
            ? String(policy.advanceSettings.lowerLimit)
            : ""
        );
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load expense policy");
      } finally {
        setLoading(false);
      }
    };

    fetchExpensePolicy();
  }, [axiosInstance, id]);

  const updateCatLimit = (cat, field, val) => {
    setCatLimits((prev) => ({ ...prev, [cat]: { ...prev[cat], [field]: val } }));
  };

  const handleUpdate = async () => {
    if (!policyName.trim()) {
      toast.error("Please enter policy name");
      return;
    }

    const payload = {
      policyName: policyName.trim(),
      companyOfficeId: getStoredOfficeIds(),
      description: description.trim(),
      monthlyLimit: Number(monthlyLimit) || 0,
      allowance: categorySelections["Allowance"] === "enabled",
      travel: categorySelections["Travel"] === "enabled",
      personalVehicle: categorySelections["Personal Vehicle Expense"] === "enabled",
      stay: categorySelections["Stay"] === "enabled",
      skillDevelopment: categorySelections["Skill Development"] === "enabled",
      mealsEntertainment: categorySelections["Meals and Entertainment"] === "enabled",
      utilities: categorySelections["Utilities"] === "enabled",
      officeExpenses: categorySelections["Office Expenses"] === "enabled",
      commute: categorySelections["Commute"] === "enabled",
      allowanceLimit: Number(catLimits["Allowance"]?.limit) || 0,
      allowanceAmount: Number(catLimits["Allowance"]?.amount) || 0,
      travelLimit: Number(catLimits["Travel"]?.limit) || 0,
      travelAmount: Number(catLimits["Travel"]?.amount) || 0,
      personalVehicleLimit: Number(catLimits["Personal Vehicle Expense"]?.limit) || 0,
      personalVehicleAmount: Number(catLimits["Personal Vehicle Expense"]?.amount) || 0,
      stayLimit: Number(catLimits["Stay"]?.limit) || 0,
      stayAmount: Number(catLimits["Stay"]?.amount) || 0,
      skillDevelopmentLimit: Number(catLimits["Skill Development"]?.limit) || 0,
      skillDevelopmentAmount: Number(catLimits["Skill Development"]?.amount) || 0,
      mealsEntertainmentLimit: Number(catLimits["Meals and Entertainment"]?.limit) || 0,
      mealsEntertainmentAmount: Number(catLimits["Meals and Entertainment"]?.amount) || 0,
      utilitiesLimit: Number(catLimits["Utilities"]?.limit) || 0,
      utilitiesAmount: Number(catLimits["Utilities"]?.amount) || 0,
      officeExpensesLimit: Number(catLimits["Office Expenses"]?.limit) || 0,
      officeExpensesAmount: Number(catLimits["Office Expenses"]?.amount) || 0,
      commuteLimit: Number(catLimits["Commute"]?.limit) || 0,
      commuteAmount: Number(catLimits["Commute"]?.amount) || 0,
      trainClass: trainClass ? [trainClass] : [],
      busClass: busClass ? [busClass] : [],
      airClass: airClass ? [airClass] : [],
      fuelType: fuelType ? [fuelType] : [],
      consumptionType: consumptionType ? [consumptionType] : [],
      advancePayment,
      maxWithoutReceipt: Number(maxWithoutReceipt) || 0,
      advanceRequest,
      maxAdvance: Number(maxAdvance) || 0,
      lowerLimit: Number(lowerLimit) || 0,
    };

    try {
      setIsSaving(true);
      await axiosInstance.put(`/config/update/expensePolicy/${id}`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      toast.success("Expense policy updated successfully");
      navigate("/config/pay/expensive/expense-policy/list");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update expense policy");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: "24px 32px" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Edit Expense Policy</h1>
      <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4, marginBottom: 24 }}>
        Update policy details, expense limits, and advance settings.
      </p>

      {loading && (
        <div style={{ marginBottom: 16, fontSize: 13, color: "#6B7280" }}>Loading policy...</div>
      )}

      <div style={{ backgroundColor: "#EFF6FF", borderRadius: 8, padding: "16px 24px", marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          {steps.map((s, idx) => (
            <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={step === s.id ? blue.activeCircle : step > s.id ? blue.completedCircle : blue.inactiveCircle}>
                  {step > s.id ? "✓" : s.id}
                </div>
                <span style={step === s.id ? blue.activeLabel : blue.inactiveLabel}>{s.label}</span>
              </div>
              {idx < steps.length - 1 && <div style={step > s.id ? blue.activeLine : blue.inactiveLine} />}
            </div>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Policy Name</p>
            <input style={blue.input} value={policyName} onChange={(e) => setPolicyName(e.target.value)} />
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</p>
            <textarea
              style={{ ...blue.input, height: 80, padding: "8px 12px", resize: "none" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Select the categories and types to be assigned</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {categories.map((cat) => (
                <div key={cat}>
                  <p style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>{cat}</p>
                  <div
                    style={{
                      border: categorySelections[cat] === "enabled" ? "2px solid #2563EB" : "1px solid #D1D5DB",
                      borderRadius: 6,
                      overflow: "hidden",
                    }}
                  >
                    <select
                      value={categorySelections[cat] || ""}
                      onChange={(e) =>
                        setCategorySelections((prev) => ({ ...prev, [cat]: e.target.value }))
                      }
                      style={{ ...blue.select, border: "none", outline: "none" }}
                    >
                      <option value="">Choose Account</option>
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingTop: 8 }}>
            <button style={blue.outlineBtn} onClick={() => navigate("/config/pay/expensive/expense-policy/list")}>
              Cancel
            </button>
            <button style={blue.primaryBtn} onClick={() => setStep(2)}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 8 }}>
              Assign monthly expense limit to <strong>{policyName || "this"}</strong> Policy
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <input
                style={{ ...blue.input, width: 154, fontSize: 12 }}
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(e.target.value)}
                placeholder="Choose Account"
              />
              <span style={{ fontSize: 13, color: "#6B7280" }}>Rs</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: 8 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "170px 238px 238px",
                columnGap: 24,
                padding: "8px 0 4px",
                borderBottom: "1px solid #E5E7EB",
              }}
            >
              <span style={{ ...blue.faintLabel, paddingLeft: 18 }}>categories</span>
              <span style={blue.faintLabel}>Limit</span>
              <span style={blue.faintLabel}>Amount</span>
            </div>

            {categories.map((cat) => (
              <div key={cat}>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "170px 238px 238px",
                    columnGap: 24,
                    padding: "12px 0",
                    alignItems: "start",
                  }}
                >
                  <span style={{ fontSize: 13, color: "#111827", paddingTop: 8, paddingLeft: 18 }}>{cat}</span>
                  <input
                    style={{ ...blue.input, width: 155, fontSize: 12 }}
                    value={catLimits[cat]?.limit || ""}
                    onChange={(e) => updateCatLimit(cat, "limit", e.target.value)}
                    placeholder="Choose Account"
                  />
                  <input
                    style={{ ...blue.input, width: 155, fontSize: 12 }}
                    value={catLimits[cat]?.amount || ""}
                    onChange={(e) => updateCatLimit(cat, "amount", e.target.value)}
                    placeholder="Choose Account"
                  />
                </div>

                {cat === "Travel" && (
                  <div style={{ marginLeft: 194, width: 336, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
                    {[
                      { label: "Train", value: trainClass, onChange: setTrainClass, options: trainClasses },
                      { label: "Bus", value: busClass, onChange: setBusClass, options: busClasses },
                      { label: "Air", value: airClass, onChange: setAirClass, options: airClasses },
                    ].map((field) => (
                      <div key={field.label}>
                        <p style={{ fontSize: 13, color: "#111827", marginBottom: 4 }}>{field.label}</p>
                        <select value={field.value} onChange={(e) => field.onChange(e.target.value)} style={{ ...blue.select, width: "100%", fontSize: 12 }}>
                          <option value="">Enter Class</option>
                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                )}

                {cat === "Personal Vehicle Expense" && (
                  <div style={{ marginLeft: 194, width: 336, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, color: "#111827", marginBottom: 4 }}>Fuel</p>
                      <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} style={{ ...blue.select, width: "100%", fontSize: 12 }}>
                        <option value="">Enter Fuel Type</option>
                        {fuelTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, color: "#111827", marginBottom: 4 }}>Consumption type</p>
                      <select value={consumptionType} onChange={(e) => setConsumptionType(e.target.value)} style={{ ...blue.select, width: "100%", fontSize: 12 }}>
                        <option value="">Enter Consumption Type</option>
                        {consumptionTypes.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
            <button style={blue.outlineBtn} onClick={() => setStep(1)}>Back</button>
            <button style={blue.primaryBtn} onClick={() => setStep(3)}>Next</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #D1D5DB",
              borderRadius: 8,
              padding: "16px",
              backgroundColor: advancePayment ? "#EFF6FF" : "#fff",
            }}
          >
            <span style={{ fontSize: 13, color: "#374151" }}>Allow employee to request for advance payment</span>
            <Toggle value={advancePayment} onChange={setAdvancePayment} />
          </div>

          {advancePayment && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Maximum amount without receipt</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input style={{ ...blue.input, width: 160 }} value={maxWithoutReceipt} onChange={(e) => setMaxWithoutReceipt(e.target.value)} />
                <span style={{ fontSize: 14, color: "#6B7280" }}>Rs</span>
              </div>
            </div>
          )}

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              border: "1px solid #D1D5DB",
              borderRadius: 8,
              padding: "16px",
              backgroundColor: advanceRequest ? "#EFF6FF" : "#fff",
            }}
          >
            <span style={{ fontSize: 13, color: "#374151" }}>Allow employee to request for advance amount</span>
            <Toggle value={advanceRequest} onChange={setAdvanceRequest} />
          </div>

          {advanceRequest && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Maximum amount for advance</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input style={{ ...blue.input, width: 160 }} value={maxAdvance} onChange={(e) => setMaxAdvance(e.target.value)} />
                  <span style={{ fontSize: 14, color: "#6B7280" }}>Rs</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Lower limit of balance for new advance request</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input style={{ ...blue.input, width: 160 }} value={lowerLimit} onChange={(e) => setLowerLimit(e.target.value)} />
                  <span style={{ fontSize: 14, color: "#6B7280" }}>Rs</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
            <button style={blue.outlineBtn} onClick={() => setStep(2)}>Back</button>
            <button
              style={{ ...blue.primaryBtn, opacity: isSaving ? 0.7 : 1, cursor: isSaving ? "not-allowed" : "pointer" }}
              onClick={handleUpdate}
              disabled={isSaving}
            >
              {isSaving ? "Updating..." : "Update"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditExpensePolicy;
