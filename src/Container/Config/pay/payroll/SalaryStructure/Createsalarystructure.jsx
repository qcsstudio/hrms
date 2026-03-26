import { useEffect, useMemo, useState } from "react";
import createAxios from "../../../../../utils/axios.config";

const FORMULA_OPTIONS = [
  "40% of Basic Pay", "50% of CTC", "Flat Amount", "% of Gross Salary",
  "% of Basic Pay", "Statutory Formula",
];

const STEPS = [
  { number: 1, label: "Define" },
  { number: 2, label: "Income Component selection" },
  { number: 3, label: "Component design" },
  { number: 4, label: "Deduction component selection" },
  { number: 5, label: "Deduction component design" },
  { number: 6, label: "LOP & Arrears" },
  { number: 7, label: "Trial run" },
];

const LOP_COLUMNS = ["Loss of Pay", "LOP's Arrears", "Salary Arrears", "New Joinee", "FNF"];
const LOP_FIELDS = ["lossOfPay", "lopArrears", "salaryArrears", "newJoinee", "fnf"];

const mapApiComponent = (item = {}) => ({
  id: item?._id || item?.id || item?.componentCode || item?.componentName,
  name: item?.componentName || "-",
  type: item?.Income ? "income" : "deduction",
  properties: item?.Income
    ? [
        { label: "Income", enabled: Boolean(item?.Income) },
        { label: "CTC", enabled: Boolean(item?.CTC) },
        { label: "Taxed", enabled: Boolean(item?.isTaxable) },
        { label: "Variable", enabled: Boolean(item?.isVariable) },
        { label: "Accrual", enabled: Boolean(item?.willAccrue) },
        { label: "Statutory", enabled: Boolean(item?.isStatutory) },
        { label: "Statutory Deduction", enabled: Boolean(item?.isStatutoryDeduction) },
      ]
    : [
        { label: "Deduction", enabled: true },
        { label: "Employee Deduction", enabled: Boolean(item?.employeeDeduction) },
        { label: "Employer Deduction", enabled: Boolean(item?.employerDeduction) },
        { label: "Taxed", enabled: Boolean(item?.isTaxable) },
        { label: "Variable", enabled: Boolean(item?.isVariable) },
        { label: "Statutory", enabled: Boolean(item?.isStatutory) },
        { label: "Statutory Deduction", enabled: Boolean(item?.isStatutoryDeduction) },
      ],
  journalVoucher: item?.journalVoucher ? "Enabled" : "-",
});

const S = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#111827",
  },
  container: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "28px 24px",
  },
  heading: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
    color: "#111827",
  },
  subheading: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 24,
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    padding: 24,
    marginBottom: 16,
  },
  stepperWrap: {
    display: "flex",
    alignItems: "flex-start",
    overflowX: "auto",
    gap: 0,
  },
  stepItem: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  stepItemLast: {
    display: "flex",
    alignItems: "center",
    flex: "none",
  },
  stepContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minWidth: 80,
  },
  stepCircleActive: {
    width: 36, height: 36, borderRadius: "50%",
    background: "#3b5fe2", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 14, border: "2px solid #3b5fe2",
  },
  stepCircleCompleted: {
    width: 36, height: 36, borderRadius: "50%",
    background: "#3b5fe2", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 700, fontSize: 14, border: "2px solid #3b5fe2",
  },
  stepCircleInactive: {
    width: 36, height: 36, borderRadius: "50%",
    background: "#fff", color: "#9ca3af",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 600, fontSize: 14, border: "2px solid #d1d5db",
  },
  stepLabelActive: {
    fontSize: 11, marginTop: 6, textAlign: "center",
    color: "#3b5fe2", fontWeight: 600, maxWidth: 90, lineHeight: 1.3,
  },
  stepLabelInactive: {
    fontSize: 11, marginTop: 6, textAlign: "center",
    color: "#6b7280", maxWidth: 90, lineHeight: 1.3,
  },
  stepLine: {
    flex: 1, height: 2, background: "#3b5fe2", margin: "0 4px", marginBottom: 20,
  },
  stepLineInactive: {
    flex: 1, height: 2, background: "#e5e7eb", margin: "0 4px", marginBottom: 20,
  },
  label: { fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 },
  input: {
    width: "100%", padding: "9px 12px", borderRadius: 8,
    border: "1px solid #d1d5db", fontSize: 14, color: "#111827",
    background: "#fff", outline: "none", boxSizing: "border-box",
  },
  textarea: {
    width: "100%", padding: "10px 12px", borderRadius: 8,
    border: "1.5px solid #3b5fe2", fontSize: 14, color: "#111827",
    background: "#fff", outline: "none", resize: "vertical", minHeight: 120,
    boxSizing: "border-box",
  },
  compCard: (selected) => ({
    borderRadius: 10,
    border: selected ? "2px solid #3b5fe2" : "1px solid #e5e7eb",
    background: "#fff",
    cursor: "pointer",
    overflow: "hidden",
    boxShadow: selected ? "0 0 0 3px #dbe4ff" : "none",
    transition: "box-shadow 0.15s",
    minWidth: 180,
  }),
  compCardHeader: (type) => ({
    background: "#f9fafb",
    borderBottom: "1px solid #e5e7eb",
    padding: "7px 12px",
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    fontWeight: 500,
  }),
  compCardBody: { padding: "12px 14px" },
  compCardTitle: { fontWeight: 700, fontSize: 14, color: "#111827", marginBottom: 10 },
  propRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, fontSize: 13 },
  checkOn: { color: "#3b5fe2", fontSize: 16 },
  checkOff: { color: "#ef4444", fontSize: 16 },
  jvSection: { borderTop: "1px solid #f3f4f6", paddingTop: 8, marginTop: 8 },
  jvLabel: { fontSize: 12, fontWeight: 600, color: "#374151" },
  jvValue: { fontSize: 12, color: "#9ca3af" },
  compCardFooter: { display: "flex", justifyContent: "center", paddingBottom: 10 },
  searchWrap: { position: "relative", maxWidth: 360, marginBottom: 20 },
  searchIcon: { position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", fontSize: 15 },
  searchInput: {
    width: "100%", padding: "9px 12px 9px 34px", borderRadius: 20,
    border: "1px solid #e5e7eb", fontSize: 13, outline: "none",
    background: "#f9fafb", boxSizing: "border-box",
  },
  compGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(185px, 1fr))", gap: 16 },
  tabBar: { display: "flex", gap: 4, borderBottom: "2px solid #e5e7eb", marginBottom: 24 },
  tab: (active) => ({
    padding: "8px 18px", fontSize: 13, fontWeight: active ? 600 : 500,
    color: active ? "#3b5fe2" : "#6b7280",
    borderBottom: active ? "2.5px solid #3b5fe2" : "2.5px solid transparent",
    marginBottom: -2, cursor: "pointer", background: "none", border: "none",
    borderBottomWidth: 2.5, borderBottomStyle: "solid",
    borderBottomColor: active ? "#3b5fe2" : "transparent",
  }),
  radioCard: (active) => ({
    border: active ? "1.5px solid #3b5fe2" : "1px solid #e5e7eb",
    borderRadius: 10, padding: "14px 16px", marginBottom: 12, cursor: "pointer",
  }),
  radioRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4 },
  radioCircle: (active) => ({
    width: 16, height: 16, borderRadius: "50%",
    border: active ? "5px solid #3b5fe2" : "2px solid #9ca3af",
    background: "#fff", flexShrink: 0,
  }),
  radioLabel: { fontSize: 14, fontWeight: 600, color: "#111827" },
  select: {
    width: "100%", padding: "9px 12px", borderRadius: 8,
    border: "1px solid #d1d5db", fontSize: 13, color: "#374151",
    background: "#fff", outline: "none", marginTop: 8,
  },
  table: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
  th: { fontSize: 13, fontWeight: 600, color: "#6b7280", padding: "10px 12px", textAlign: "center" },
  thLeft: { fontSize: 13, fontWeight: 600, color: "#6b7280", padding: "10px 12px", textAlign: "left" },
  td: { padding: "8px 12px", textAlign: "center", verticalAlign: "middle" },
  tdLeft: { padding: "8px 12px", textAlign: "left", verticalAlign: "middle" },
  rowNameBox: {
    background: "#fff", border: "1px solid #e5e7eb", borderRadius: 8,
    padding: "8px 14px", fontSize: 13, fontWeight: 500, display: "inline-block",
  },
  switchOuter: (on) => ({
    width: 40, height: 22, borderRadius: 11,
    background: on ? "#3b5fe2" : "#d1d5db",
    position: "relative", cursor: "pointer", flexShrink: 0, transition: "background 0.2s",
  }),
  switchKnob: (on) => ({
    width: 16, height: 16, borderRadius: "50%", background: "#fff",
    position: "absolute", top: 3, left: on ? 21 : 3, transition: "left 0.2s",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
  }),
  checkbox: (checked) => ({
    width: 16, height: 16, borderRadius: 4, border: checked ? "none" : "1.5px solid #d1d5db",
    background: checked ? "#3b5fe2" : "#fff", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  }),
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 },
  btnOutline: {
    padding: "9px 20px", borderRadius: 8, border: "1px solid #d1d5db",
    background: "#fff", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151",
  },
  btnGhost: {
    padding: "9px 20px", borderRadius: 8, border: "none",
    background: "none", fontSize: 14, fontWeight: 500, cursor: "pointer", color: "#374151",
  },
  btnPrimary: {
    padding: "9px 24px", borderRadius: 8, border: "none",
    background: "#3b5fe2", color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  selectAllRow: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    border: "1px solid #e5e7eb", borderRadius: 8, padding: "12px 16px", marginBottom: 16,
  },
  trialTable: { width: "100%", borderCollapse: "separate", borderSpacing: 0 },
  trialTh: { fontSize: 13, fontWeight: 600, color: "#6b7280", padding: "10px 12px", textAlign: "left", borderBottom: "1px solid #e5e7eb" },
  trialTd: { padding: "10px 12px", fontSize: 14, color: "#111827", borderBottom: "1px solid #f3f4f6" },
  emptyMsg: { color: "#9ca3af", fontSize: 14, padding: 8 },
};

function Stepper({ currentStep }) {
  return (
    <div style={S.stepperWrap}>
      {STEPS.map((step, index) => {
        const isActive = step.number === currentStep;
        const isCompleted = step.number < currentStep;
        return (
          <div key={step.number} style={index < STEPS.length - 1 ? S.stepItem : S.stepItemLast}>
            <div style={S.stepContent}>
              <div style={isActive ? S.stepCircleActive : isCompleted ? S.stepCircleCompleted : S.stepCircleInactive}>
                {step.number}
              </div>
              <span style={isActive ? S.stepLabelActive : S.stepLabelInactive}>{step.label}</span>
            </div>
            {index < STEPS.length - 1 && <div style={isCompleted ? S.stepLine : S.stepLineInactive} />}
          </div>
        );
      })}
    </div>
  );
}

function CompCard({ component, selected, onToggle }) {
  return (
    <div style={S.compCard(selected)} onClick={() => onToggle(component.id)}>
      <div style={S.compCardHeader(component.type)}>
        {component.type === "income" ? "Income" : "Deduction"}
      </div>
      <div style={S.compCardBody}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={S.compCardTitle}>{component.name}</span>
          <span style={{ color: "#9ca3af", fontSize: 14 }}>ⓘ</span>
        </div>
        {component.properties.map((p) => (
          <div key={p.label} style={S.propRow}>
            <span style={{ color: "#374151" }}>{p.label}</span>
            {p.enabled ? <span style={S.checkOn}>✔</span> : <span style={S.checkOff}>✘</span>}
          </div>
        ))}
        <div style={S.jvSection}>
          <div style={S.jvLabel}>Journal Voucher</div>
          <div style={S.jvValue}>{component.journalVoucher}</div>
        </div>
      </div>
      <div style={S.compCardFooter}>
        <span style={{ color: selected ? "#3b5fe2" : "#d1d5db", fontSize: 18 }}>✔</span>
      </div>
    </div>
  );
}

function Switch({ checked, onChange }) {
  return (
    <div style={S.switchOuter(checked)} onClick={() => onChange(!checked)}>
      <div style={S.switchKnob(checked)} />
    </div>
  );
}

function Checkbox({ checked, onChange }) {
  return (
    <div style={S.checkbox(checked)} onClick={() => onChange(!checked)}>
      {checked && <span style={{ color: "#fff", fontSize: 11, lineHeight: 1 }}>✔</span>}
    </div>
  );
}

export default function CreateSalaryStructure() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [currentStep, setCurrentStep] = useState(1);
  const [components, setComponents] = useState([]);
  const [componentLoading, setComponentLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [selectedIncomeIds, setSelectedIncomeIds] = useState([]);
  const [incomeSearch, setIncomeSearch] = useState("");

  const [incomeDesigns, setIncomeDesigns] = useState({});
  const [activeIncomeTab, setActiveIncomeTab] = useState("");

  const [selectedDeductionIds, setSelectedDeductionIds] = useState([]);
  const [deductionSearch, setDeductionSearch] = useState("");

  const [deductionDesigns, setDeductionDesigns] = useState({});
  const [activeDeductionTab, setActiveDeductionTab] = useState("");

  const [lopConfigs, setLopConfigs] = useState({});
  const [grossPay, setGrossPay] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        setComponentLoading(true);
        const response = await axiosInstance.get("/config/get-all/component", {
          meta: { auth: "ADMIN_AUTH" },
        });
        const list = Array.isArray(response?.data)
          ? response.data
          : Array.isArray(response?.data?.data)
          ? response.data.data
          : Array.isArray(response?.data?.components)
          ? response.data.components
          : [];

        setComponents(list.map(mapApiComponent));
      } catch (error) {
        console.error("Error fetching salary structure components:", error);
        setComponents([]);
      } finally {
        setComponentLoading(false);
      }
    };

    fetchComponents();
  }, [axiosInstance]);

  const incomeComponents = components.filter((component) => component.type === "income");
  const deductionComponents = components.filter((component) => component.type === "deduction");

  const selectedIncomeComponents = incomeComponents.filter((c) => selectedIncomeIds.includes(c.id));
  const selectedDeductionComponents = deductionComponents.filter((c) => selectedDeductionIds.includes(c.id));
  const allComponentNames = [
    ...selectedIncomeComponents.map((c) => c.name),
    ...selectedDeductionComponents.map((c) => c.name),
  ];

  const toggleId = (id, selectedIds, setSelectedIds) => {
    setSelectedIds(selectedIds.includes(id) ? selectedIds.filter((i) => i !== id) : [...selectedIds, id]);
  };

  const getDesign = (designs, id) => designs[id] || { mode: "formula", formulaValue: "", fixedAmount: "" };
  const updateDesign = (designs, setDesigns, id, updates) => {
    setDesigns({ ...designs, [id]: { ...getDesign(designs, id), ...updates } });
  };

  const getLopConfig = (componentName) => (
    lopConfigs[componentName] || { lossOfPay: false, lopArrears: false, salaryArrears: false, newJoinee: false, fnf: false }
  );

  const updateLop = (componentName, field, value) => {
    setLopConfigs({ ...lopConfigs, [componentName]: { ...getLopConfig(componentName), [field]: value } });
  };

  const allLopSelected = allComponentNames.length > 0 && allComponentNames.every((componentName) => {
    const config = getLopConfig(componentName);
    return config.lossOfPay && config.lopArrears && config.salaryArrears && config.newJoinee && config.fnf;
  });

  const toggleAllLop = () => {
    const newValue = !allLopSelected;
    const newConfigs = {};
    allComponentNames.forEach((componentName) => {
      newConfigs[componentName] = {
        lossOfPay: newValue,
        lopArrears: newValue,
        salaryArrears: newValue,
        newJoinee: newValue,
        fnf: newValue,
      };
    });
    setLopConfigs(newConfigs);
  };

  const trialResults = allComponentNames.map((componentName) => {
    const annual = grossPay ? Math.round(Number(grossPay) * (0.1 + Math.abs(Math.sin(componentName.length)) * 0.3)) : 0;
    return { name: componentName, annual, monthly: Math.round(annual / 12) };
  });

  const renderComponentSelection = (list, selectedIds, setSelectedIds, search, setSearch) => {
    const filtered = list.filter((component) => component.name.toLowerCase().includes(search.toLowerCase()));

    return (
      <div>
        <div style={S.searchWrap}>
          <span style={S.searchIcon}>🔍</span>
          <input
            style={S.searchInput}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {componentLoading ? (
          <p style={S.emptyMsg}>Loading components...</p>
        ) : filtered.length === 0 ? (
          <p style={S.emptyMsg}>No components found.</p>
        ) : (
          <div style={S.compGrid}>
            {filtered.map((component) => (
              <CompCard
                key={component.id}
                component={component}
                selected={selectedIds.includes(component.id)}
                onToggle={(id) => toggleId(id, selectedIds, setSelectedIds)}
              />
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderDesign = (list, designs, setDesigns, activeTab, setActiveTab) => {
    if (list.length === 0) return <p style={S.emptyMsg}>No components selected. Go back and select components.</p>;

    const tab = activeTab || list[0]?.id || "";

    return (
      <div style={{ maxWidth: 680 }}>
        <div style={S.tabBar}>
          {list.map((component) => (
            <button key={component.id} style={S.tab(tab === component.id)} onClick={() => setActiveTab(component.id)}>
              {component.name}
            </button>
          ))}
        </div>
        {list.filter((component) => tab === component.id).map((component) => {
          const design = getDesign(designs, component.id);

          return (
            <div key={component.id}>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>{component.name}</div>
              <div style={S.radioCard(design.mode === "formula")} onClick={() => updateDesign(designs, setDesigns, component.id, { mode: "formula" })}>
                <div style={S.radioRow}>
                  <div style={S.radioCircle(design.mode === "formula")} />
                  <span style={S.radioLabel}>Formula</span>
                </div>
                {design.mode === "formula" && (
                  <select
                    style={S.select}
                    value={design.formulaValue}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateDesign(designs, setDesigns, component.id, { formulaValue: e.target.value });
                    }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="">Select any of these</option>
                    {FORMULA_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                )}
              </div>
              <div style={S.radioCard(design.mode === "fixed")} onClick={() => updateDesign(designs, setDesigns, component.id, { mode: "fixed" })}>
                <div style={S.radioRow}>
                  <div style={S.radioCircle(design.mode === "fixed")} />
                  <span style={S.radioLabel}>Fixed Amount</span>
                </div>
                {design.mode === "fixed" && (
                  <input
                    type="number"
                    style={{ ...S.input, marginTop: 8 }}
                    placeholder="Enter Amount"
                    value={design.fixedAmount}
                    onChange={(e) => {
                      e.stopPropagation();
                      updateDesign(designs, setDesigns, component.id, { fixedAmount: e.target.value });
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ maxWidth: 560 }}>
            <div style={{ marginBottom: 20 }}>
              <label style={S.label}>Let&apos;s give this salary structure a name!</label>
              <input
                style={S.input}
                placeholder="Enter structure name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label style={S.label}>Description</label>
              <textarea
                style={S.textarea}
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        );
      case 2:
        return renderComponentSelection(incomeComponents, selectedIncomeIds, setSelectedIncomeIds, incomeSearch, setIncomeSearch);
      case 3:
        return renderDesign(selectedIncomeComponents, incomeDesigns, setIncomeDesigns, activeIncomeTab, setActiveIncomeTab);
      case 4:
        return renderComponentSelection(deductionComponents, selectedDeductionIds, setSelectedDeductionIds, deductionSearch, setDeductionSearch);
      case 5:
        return renderDesign(selectedDeductionComponents, deductionDesigns, setDeductionDesigns, activeDeductionTab, setActiveDeductionTab);
      case 6:
        return (
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16 }}>Loss of Pay and Arrears</div>
            <div style={S.selectAllRow}>
              <span style={{ fontWeight: 600, fontSize: 14 }}>Select All</span>
              <Switch checked={allLopSelected} onChange={toggleAllLop} />
            </div>
            {allComponentNames.length === 0 ? (
              <p style={S.emptyMsg}>No components selected. Go back and select components.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={S.table}>
                  <thead>
                    <tr>
                      <th style={S.thLeft}>Month</th>
                      {LOP_COLUMNS.map((col) => <th key={col} style={S.th}>{col}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {allComponentNames.map((componentName) => {
                      const config = getLopConfig(componentName);
                      return (
                        <tr key={componentName}>
                          <td style={S.tdLeft}>
                            <span style={S.rowNameBox}>{componentName}</span>
                          </td>
                          {LOP_FIELDS.map((field) => (
                            <td key={field} style={S.td}>
                              <Checkbox
                                checked={config[field]}
                                onChange={(value) => updateLop(componentName, field, value)}
                              />
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      case 7:
        return (
          <div style={{ maxWidth: 680 }}>
            <div style={{ marginBottom: 24 }}>
              <label style={S.label}>Enter annual gross pay</label>
              <input
                type="number"
                style={{ ...S.input, maxWidth: 360 }}
                placeholder="Enter amount"
                value={grossPay}
                onChange={(e) => setGrossPay(e.target.value)}
              />
            </div>
            {grossPay && allComponentNames.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 12 }}>Generated values</div>
                <table style={S.trialTable}>
                  <thead>
                    <tr>
                      <th style={{ ...S.trialTh, minWidth: 160 }}></th>
                      <th style={S.trialTh}>Annual Probation</th>
                      <th style={S.trialTh}>Monthly proration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trialResults.map((result) => (
                      <tr key={result.name}>
                        <td style={S.trialTd}>
                          <span style={S.rowNameBox}>{result.name}</span>
                        </td>
                        <td style={S.trialTd}>Rs. {result.annual.toLocaleString()}</td>
                        <td style={S.trialTd}>Rs. {result.monthly.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {grossPay && allComponentNames.length === 0 && (
              <p style={S.emptyMsg}>No components selected. Go back and select income/deduction components.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  if (saved) {
    return (
      <div style={{ ...S.page, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>Salary structure saved!</div>
          <button style={S.btnPrimary} onClick={() => { setSaved(false); setCurrentStep(1); }}>Create Another</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.page}>
      <div style={S.container}>
        <h1 style={S.heading}>Create new salary structure</h1>
        <p style={S.subheading}>Manage employee directory, documents, and role-based actions.</p>

        <div style={S.card}>
          <Stepper currentStep={currentStep} />
        </div>

        <div style={{ ...S.card, minHeight: 340 }}>
          {renderStep()}
        </div>

        <div style={S.navRow}>
          <button style={S.btnOutline} onClick={() => { setSaved(false); setCurrentStep(1); }}>Cancel</button>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            {currentStep > 1 && (
              <button style={S.btnOutline} onClick={() => setCurrentStep(currentStep - 1)}>Previous</button>
            )}
            {currentStep < 7 && (
              <button style={S.btnGhost} onClick={() => setCurrentStep(currentStep + 1)}>Skip</button>
            )}
            {currentStep < 7 ? (
              <button style={S.btnPrimary} onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
            ) : (
              <button style={S.btnPrimary} onClick={() => setSaved(true)}>Save</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
