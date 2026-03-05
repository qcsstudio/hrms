import { useState } from "react";

const categories = [
  "Allowance", "Travel", "Personal Vehicle Expense", "Stay",
  "Skill Development", "Meals and Entertainment", "Utilities", "Office Expenses", "Commute",
];

const trainClasses = ["All", "AC Seater", "AC Semi sleeper", "AC Sleeper", "Non-AC Seater", "Non-AC Semi-Sleeper", "Non AC Sleeper"];
const busClasses = ["All", "AC Seater", "AC Semi sleeper", "AC Sleeper", "Non-AC Seater", "Non-AC Semi-Sleeper", "Non AC Sleeper"];
const airClasses = ["All", "Business Class", "Economy Class", "First Class", "Premium Class"];
const fuelTypes = ["All", "Diesel", "Electricity", "Natural Gas (CNG)", "Petrol"];
const consumptionTypes = ["All", "Volume", "Distance"];

const steps = [
  { id: 1, label: "Policy Details" },
  { id: 2, label: "Expense Limits" },
  { id: 3, label: "Advance Settings" },
];

// Blue shared styles
const blue = {
  activeCircle: {
    width: 36, height: 36, borderRadius: "50%",
    backgroundColor: "#2563EB", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold", fontSize: 14, border: "2px solid #2563EB", flexShrink: 0,
  },
  completedCircle: {
    width: 36, height: 36, borderRadius: "50%",
    backgroundColor: "#DBEAFE", color: "#2563EB",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold", fontSize: 14, border: "2px solid #2563EB", flexShrink: 0,
  },
  inactiveCircle: {
    width: 36, height: 36, borderRadius: "50%",
    backgroundColor: "#fff", color: "#9CA3AF",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: "bold", fontSize: 14, border: "2px solid #D1D5DB", flexShrink: 0,
  },
  activeLine: { flex: 1, height: 2, backgroundColor: "#2563EB", margin: "0 8px", marginBottom: 16 },
  inactiveLine: { flex: 1, height: 2, backgroundColor: "#D1D5DB", margin: "0 8px", marginBottom: 16 },
  activeLabel: { marginTop: 4, fontSize: 12, fontWeight: 600, color: "#2563EB", whiteSpace: "nowrap" },
  inactiveLabel: { marginTop: 4, fontSize: 12, fontWeight: 500, color: "#9CA3AF", whiteSpace: "nowrap" },
  primaryBtn: {
    backgroundColor: "#2563EB", color: "#fff", border: "none",
    padding: "10px 24px", borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: "pointer",
  },
  outlineBtn: {
    backgroundColor: "#fff", color: "#374151", border: "1px solid #D1D5DB",
    padding: "10px 24px", borderRadius: 6, fontSize: 14, fontWeight: 500, cursor: "pointer",
  },
  input: {
    height: 40, borderRadius: 6, border: "1px solid #D1D5DB",
    backgroundColor: "#fff", padding: "0 12px", fontSize: 14, outline: "none",
    width: "100%", boxSizing: "border-box",
  },
  select: {
    height: 40, borderRadius: 6, border: "1px solid #D1D5DB",
    backgroundColor: "#fff", padding: "0 12px", fontSize: 14, outline: "none",
    width: "100%", boxSizing: "border-box",
  },
};

// Fixed Toggle Component — thumb stays inside using overflow:hidden + left positioning
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

const CreateExpensePolicy = () => {
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

  const updateCatLimit = (cat, field, val) => {
    setCatLimits((prev) => ({ ...prev, [cat]: { ...prev[cat], [field]: val } }));
  };

  const handleSubmit = () => {
    alert("Expense policy created!");
  };

  return (
    <div style={{ maxWidth: 820, padding: "24px 32px" }}>
      <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>Create Expense Policy</h1>
      <p style={{ fontSize: 13, color: "#6B7280", marginTop: 4, marginBottom: 24 }}>
        Manage employee directory, documents, and role-based actions.
      </p>

      {/* ── Stepper ── */}
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
              {idx < steps.length - 1 && (
                <div style={step > s.id ? blue.activeLine : blue.inactiveLine} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── Step 1 ── */}
      {step === 1 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Lets give this policy a name</p>
            <input style={blue.input} value={policyName} onChange={(e) => setPolicyName(e.target.value)} placeholder="Enter policy name" />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Description</p>
            <textarea
              style={{ ...blue.input, height: 80, padding: "8px 12px", resize: "none" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={3}
            />
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Select the categories and types to be assigned</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {categories.map((cat) => (
                <div key={cat}>
                  <p style={{ fontSize: 13, marginBottom: 4, color: "#374151" }}>{cat}</p>
                  <div style={{
                    border: categorySelections[cat] === "enabled" ? "2px solid #2563EB" : "1px solid #D1D5DB",
                    borderRadius: 6, overflow: "hidden",
                    boxShadow: categorySelections[cat] === "enabled" ? "0 0 0 2px #DBEAFE" : "none",
                  }}>
                    <select
                      value={categorySelections[cat] || ""}
                      onChange={(e) => setCategorySelections((prev) => ({ ...prev, [cat]: e.target.value }))}
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
            <button style={blue.outlineBtn}>Cancel</button>
            <button style={blue.primaryBtn} onClick={() => setStep(2)}>Next</button>
          </div>
        </div>
      )}

      {/* ── Step 2 ── */}
      {step === 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 8 }}>
              Assign monthly expense limit to <strong>{policyName || "this"}</strong> Policy
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <input style={{ ...blue.input, width: 160 }} value={monthlyLimit} onChange={(e) => setMonthlyLimit(e.target.value)} placeholder="Enter amount" />
              <span style={{ fontSize: 14, color: "#6B7280" }}>₹</span>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", gap: 16, padding: "12px 0", fontSize: 13, color: "#6B7280", fontWeight: 600 }}>
              <span>Categories</span><span>Limit</span><span>Amount</span>
            </div>
            {categories.map((cat) => (
              <div key={cat}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 180px 180px", gap: 16, padding: "12px 0", borderTop: "1px solid #E5E7EB", alignItems: "center" }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{cat}</span>
                  <input style={blue.input} value={catLimits[cat]?.limit || ""} onChange={(e) => updateCatLimit(cat, "limit", e.target.value)} placeholder="Enter limit" />
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <input style={blue.input} value={catLimits[cat]?.amount || ""} onChange={(e) => updateCatLimit(cat, "amount", e.target.value)} placeholder="Enter amount" />
                    <span style={{ fontSize: 14, color: "#6B7280" }}>₹</span>
                  </div>
                </div>
                {cat === "Travel" && (
                  <div style={{ marginLeft: 32, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
                    {[
                      { label: "Train", value: trainClass, onChange: setTrainClass, options: trainClasses },
                      { label: "Bus", value: busClass, onChange: setBusClass, options: busClasses },
                      { label: "Air", value: airClass, onChange: setAirClass, options: airClasses },
                    ].map((field) => (
                      <div key={field.label}>
                        <p style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>{field.label}</p>
                        <select value={field.value} onChange={(e) => field.onChange(e.target.value)} style={{ ...blue.select, width: 300 }}>
                          <option value="">Enter Class</option>
                          {field.options.map((o) => <option key={o} value={o}>{o}</option>)}
                        </select>
                      </div>
                    ))}
                  </div>
                )}
                {cat === "Personal Vehicle Expense" && (
                  <div style={{ marginLeft: 32, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12 }}>
                    <div>
                      <p style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>Fuel</p>
                      <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} style={{ ...blue.select, width: 300 }}>
                        <option value="">Enter Fuel Type</option>
                        {fuelTypes.map((o) => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <p style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>Consumption type</p>
                      <select value={consumptionType} onChange={(e) => setConsumptionType(e.target.value)} style={{ ...blue.select, width: 300 }}>
                        <option value="">Enter Consumption Type</option>
                        {consumptionTypes.map((o) => <option key={o} value={o}>{o}</option>)}
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

      {/* ── Step 3 ── */}
      {step === 3 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

          {/* Toggle 1 */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
            backgroundColor: advancePayment ? "#EFF6FF" : "#fff",
          }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Allow employee to request for advance payment</span>
            <Toggle value={advancePayment} onChange={setAdvancePayment} />
          </div>

          {advancePayment && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Maximum amount without receipt</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input style={{ ...blue.input, width: 160 }} value={maxWithoutReceipt} onChange={(e) => setMaxWithoutReceipt(e.target.value)} placeholder="Enter amount" />
                <span style={{ fontSize: 14, color: "#6B7280" }}>₹</span>
              </div>
            </div>
          )}

          {/* Toggle 2 */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            border: "1px solid #D1D5DB", borderRadius: 8, padding: "16px",
            backgroundColor: advanceRequest ? "#EFF6FF" : "#fff",
          }}>
            <span style={{ fontSize: 13, color: "#374151" }}>Allow employee to request for advance amount</span>
            <Toggle value={advanceRequest} onChange={setAdvanceRequest} />
          </div>

          {advanceRequest && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Maximum amount for advance</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input style={{ ...blue.input, width: 160 }} value={maxAdvance} onChange={(e) => setMaxAdvance(e.target.value)} placeholder="Enter amount" />
                  <span style={{ fontSize: 14, color: "#6B7280" }}>₹</span>
                </div>
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>Lower limit of balance for new advance request</p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input style={{ ...blue.input, width: 160 }} value={lowerLimit} onChange={(e) => setLowerLimit(e.target.value)} placeholder="Enter amount" />
                  <span style={{ fontSize: 14, color: "#6B7280" }}>₹</span>
                </div>
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 8 }}>
            <button style={blue.outlineBtn} onClick={() => setStep(2)}>Back</button>
            <button style={blue.primaryBtn} onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateExpensePolicy;