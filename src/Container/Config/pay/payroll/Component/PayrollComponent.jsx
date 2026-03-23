import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import createAxios from "../../../../../utils/axios.config";
import { createPortal } from "react-dom";

/* ───── India Payroll Component Data ───── */
const componentCards = [
  {
    type: "Income", name: "Basic Pay", code: "BASIC",
    attributes: [
      { label: "Income", ok: true }, { label: "CTC", ok: true }, { label: "Taxed", ok: true },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: false }, { label: "Statutory Deduction", ok: false },
    ], journal: "-",
  },
  {
    type: "Income", name: "Dearness Allowance", code: "DA",
    attributes: [
      { label: "Income", ok: true }, { label: "CTC", ok: true }, { label: "Taxed", ok: true },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: false }, { label: "Statutory Deduction", ok: false },
    ], journal: "-",
  },
  {
    type: "Income", name: "HRA", code: "HRA",
    attributes: [
      { label: "Income", ok: true }, { label: "CTC", ok: true }, { label: "Taxed", ok: true },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: false }, { label: "Statutory Deduction", ok: false },
    ], journal: "-",
  },
  {
    type: "Income", name: "Special Allowance", code: "SPECIAL",
    attributes: [
      { label: "Income", ok: true }, { label: "CTC", ok: true }, { label: "Taxed", ok: true },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: false }, { label: "Statutory Deduction", ok: false },
    ], journal: "-",
  },
  {
    type: "Income", name: "Performance Bonus", code: "BONUS_VAR",
    attributes: [
      { label: "Income", ok: true }, { label: "CTC", ok: true }, { label: "Taxed", ok: true },
      { label: "Variable", ok: true }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: false }, { label: "Statutory Deduction", ok: false },
    ], journal: "-",
  },
  {
    type: "Deduction", name: "EPF (Employee)", code: "PF_EE",
    attributes: [
      { label: "Deduction", ok: true }, { label: "Gross Salary", ok: false }, { label: "Taxed", ok: false },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: true }, { label: "Statutory Deduction", ok: true },
    ], journal: "-",
  },
  {
    type: "Deduction", name: "ESI (Employee)", code: "ESI_EE",
    attributes: [
      { label: "Deduction", ok: true }, { label: "Gross Salary", ok: false }, { label: "Taxed", ok: false },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: true }, { label: "Statutory Deduction", ok: true },
    ], journal: "-",
  },
  {
    type: "Deduction", name: "Professional Tax", code: "PT",
    attributes: [
      { label: "Deduction", ok: true }, { label: "Gross Salary", ok: false }, { label: "Taxed", ok: false },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: true }, { label: "Statutory Deduction", ok: true },
    ], journal: "-",
  },
  {
    type: "Deduction", name: "Labour Welfare Fund", code: "LWF_EE",
    attributes: [
      { label: "Deduction", ok: true }, { label: "Gross Salary", ok: false }, { label: "Taxed", ok: false },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: true }, { label: "Statutory Deduction", ok: true },
    ], journal: "-",
  },
  {
    type: "Deduction", name: "TDS (New Regime)", code: "TDS",
    attributes: [
      { label: "Deduction", ok: true }, { label: "Gross Salary", ok: false }, { label: "Taxed", ok: false },
      { label: "Variable", ok: false }, { label: "Accrual", ok: false },
      { label: "Statutory", ok: true }, { label: "Statutory Deduction", ok: true },
    ], journal: "-",
  },
];
void componentCards;

/* Readymade component options (shown in dropdown when "Use readymade" is checked) */
const readymadeOptions = [
  "Additional Pref Allowance",
  "Administrative Allowance",
  "Annual Bonus",
  "Band Pay",
  "Bonus Allowance",
  "CAP Allowance",
  "Car Lease",
  "Earned Leave",
  "Food Allowance",
  "Gratuity",
  "House Rent Allowance",
  "Leave Travel Allowance",
  "Medical Allowance",
  "Night Shift Allowance",
  "Overtime Pay",
  "Performance Bonus",
  "Petrol Allowance",
  "Special Allowance",
  "Transport Allowance",
  "Uniform Allowance",
];

const taxGroupOptions = [
  { value: "s10-iii", label: "Section 10 (10 iii)" },
  { value: "s10-13a", label: "Section 10 (13 A) HRA Bill" },
  { value: "s10-14-border", label: "Section 10(14) Border Area Allowance" },
  { value: "s10-14-children", label: "Section 10(14) Children Education Allowance" },
  { value: "s10-14-compensatory", label: "Section 10(14) Compensatory Field Area Allowance" },
  { value: "s10-14-comp-modified", label: "Section 10(14) Compensatory Modified Area Allowance" },
  { value: "s10-14-conveyance", label: "Section 10(14) Conveyance Allowance" },
  { value: "s10-14-helper", label: "Section 10(14) Helper/Assistant Allowance" },
  { value: "s10-14-hostel", label: "Section 10(14) Hostel Expenditure Allowance" },
  { value: "s10-14-research", label: "Section 10(14) Research Allowance" },
  { value: "s10-14-special-comp", label: "Section 10(14) Special Compensatory Allowance" },
  { value: "s10-14-transport", label: "Section 10(14) Transport Allowance" },
  { value: "s10-14-tribal", label: "Section 10(14) Tribal Area Allowance" },
  { value: "s10-14-underground", label: "Section 10(14) Underground Allowance" },
  { value: "s10-14-uniform", label: "Section 10(14) Uniform Allowance" },
  { value: "s10-general", label: "Section 10 (General)" },
  { value: "s10-tax-free", label: "Section 10 (Tax Free)" },
];

/* ══════════════════════════════════════
   SVG ICONS
══════════════════════════════════════ */
const IcoCheck = () => (
  <svg className="w-3.5 h-3.5 text-green-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IcoX = () => (
  <svg className="w-3.5 h-3.5 text-red-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);
const IcoCopy = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
);
const IcoBack = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
  </svg>
);
const IcoClose = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
const IcoChevron = () => (
  <svg className="w-4 h-4 text-gray-500 shrink-0" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
  </svg>
);

/* ══════════════════════════════════════
   CUSTOM PRIMITIVES
══════════════════════════════════════ */

/* Square Checkbox (like in screenshots) */
const Checkbox = ({ checked, onChange, label }) => (
  <label className="flex items-center gap-3 cursor-pointer select-none">
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-400"
      }`}
    >
      {checked && (
        <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
          <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
    {label && <span className="text-sm text-gray-700">{label}</span>}
  </label>
);

/* Tick (for card selectable) */
const Tick = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    className={`h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
      checked ? "bg-blue-600 border-blue-600" : "bg-white border-gray-300 hover:border-blue-400"
    }`}
  >
    {checked && (
      <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

/* Radio dot (circle style matching screenshots) */
const RadioDot = ({ selected }) => (
  <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
    selected ? "border-blue-600" : "border-gray-400"
  }`}>
    {selected && <span className="w-2.5 h-2.5 rounded-full bg-blue-600 block" />}
  </span>
);

/* Inline Yes/No radio row (side by side like screenshots) */
const YesNo = ({ label, value, onChange, note }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    {label && <p className="text-sm font-semibold text-gray-800 mb-3">{label}</p>}
    <div className="flex items-center gap-10">
      <button type="button" onClick={() => onChange("yes")}
        className="flex items-center gap-2 text-sm text-gray-700">
        <RadioDot selected={value === "yes"} />
        Yes
      </button>
      <button type="button" onClick={() => onChange("no")}
        className="flex items-center gap-2 text-sm text-gray-700">
        <RadioDot selected={value === "no"} />
        No
      </button>
    </div>
    {note && <p className="text-xs text-gray-500 mt-2">{note}</p>}
  </div>
);

/* Stacked radio (for type selection group) */
const RadioRow = ({ label, selected, onClick, note }) => (
  <>
    <button type="button" onClick={onClick}
      className="flex items-center gap-3 w-full text-sm text-gray-700 py-2">
      <RadioDot selected={selected} />
      {label}
    </button>
    {note && selected && (
      <p className="text-xs text-gray-500 ml-8 -mt-1 mb-1">{note}</p>
    )}
  </>
);

/* Dropdown select */
const Dropdown = ({ value, onChange, placeholder, options }) => {
  const [open, setOpen] = useState(false);
  const sel = options.find((o) => (o.value || o) === value);
  const displayLabel = sel ? (sel.label || sel) : null;
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((p) => !p)}
        className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
        <span className={displayLabel ? "text-gray-900" : "text-gray-400"}>{displayLabel || placeholder}</span>
        <IcoChevron />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg max-h-56 overflow-y-auto">
            {options.map((opt) => {
              const val = opt.value || opt;
              const lbl = opt.label || opt;
              return (
                <button key={val} type="button"
                  onClick={() => { onChange(val); setOpen(false); }}
                  className={`w-full px-4 py-3 text-sm text-left hover:bg-blue-50 transition-colors ${value === val ? "bg-blue-50 text-blue-700" : "text-gray-800"}`}>
                  {lbl}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

/* Text input with label above */
const FieldInput = ({ label, value, onChange, placeholder }) => (
  <div>
    {label && <label className="block text-sm text-gray-500 mb-1">{label}</label>}
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
);

/* Journal voucher section */
const JournalField = ({ value, onChange }) => (
  <div className="border border-gray-200 rounded-lg p-4">
    <label className="block text-sm text-gray-400 mb-2">Journal voucher (Optional)"</label>
    <input type="text" value={value} onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" />
  </div>
);

/* Component card (main grid) */
const Card = ({ card, selectable, selected, onSelect }) => (
  <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
    <div className={`text-center text-xs font-medium py-1.5 ${card.type === "Income" ? "bg-violet-100 text-violet-700" : "bg-blue-600 text-white"}`}>
      {card.type}
    </div>
    <div className="p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-gray-900 truncate pr-1">{card.name}</h4>
        {selectable
          ? <Tick checked={!!selected} onChange={onSelect} />
          : <button type="button" className="text-gray-400 hover:text-gray-600"><IcoCopy /></button>
        }
      </div>
      <div className="space-y-1.5">
        {card.attributes.map((a, i) => (
          <div key={i} className="flex items-center justify-between text-xs">
            <span className="text-gray-500">{a.label}</span>
            {a.ok ? <IcoCheck /> : <IcoX />}
          </div>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-gray-100">
        <p className="text-xs font-medium text-gray-700">Journal Voucher</p>
        <p className="text-xs text-gray-400">{card.journal}</p>
      </div>
    </div>
  </div>
);

/* ══════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════ */
const PayrollComponent = () => {
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [activeTab, setActiveTab]          = useState("all");
  const [newOpen, setNewOpen]              = useState(false);
  const [statutoryView, setStatutoryView]  = useState(false);
  const [selectedStatutory, setSelectedSt] = useState({});
  const [statutory, setStatutory]          = useState([]);
  const [saving, setSaving]                = useState(false);
  const [loading, setLoading]              = useState(false);
  const [components, setComponents]        = useState([]);

  /* panel form */
  const [useReadymade, setUseReadymade]   = useState(false);
  const [readymadeComp, setReadymadeComp] = useState("");
  const [compName, setCompName]           = useState("");
  const [compType, setCompType]           = useState("");
  const [subType, setSubType]             = useState("");
  const [isVariable, setIsVariable]       = useState("");
  const [extraPay, setExtraPay]           = useState("");
  const [isTaxable, setIsTaxable]         = useState("");
  const [taxGroup, setTaxGroup]           = useState("");
  const [accrual, setAccrual]             = useState("");
  const [journal, setJournal]             = useState("");

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
      if (typeof parsed === "string" && parsed.trim()) {
        return [parsed.trim()];
      }
    } catch (error) {
      if (typeof rawValue === "string" && rawValue.trim()) {
        return [rawValue.trim()];
      }
    }

    return [];
  };

  const generateComponentCode = (value) => {
    const base = (value || "")
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "")
      .slice(0, 10);

    if (!base) {
      return `COMP${Date.now().toString().slice(-4)}`;
    }

    return `${base}${Date.now().toString().slice(-3)}`;
  };

  const mapApiComponentToCard = (item = {}) => {
    const type = item?.Income
      ? "Income"
      : item?.employeeDeduction || item?.employerDeduction
      ? "Deduction"
      : "Deduction";

    return {
      id: item?._id || item?.id || item?.componentCode || item?.componentName,
      type,
      name: item?.componentName || "-",
      code: item?.componentCode || item?._id || item?.id,
      attributes: [
        { label: "Income", ok: Boolean(item?.Income) },
        { label: "CTC", ok: Boolean(item?.CTC) },
        { label: "Taxed", ok: Boolean(item?.isTaxable) },
        { label: "Variable", ok: Boolean(item?.isVariable) },
        { label: "Accrual", ok: Boolean(item?.willAccrue) },
        { label: "Statutory", ok: Boolean(item?.isStatutory) },
        { label: "Statutory Deduction", ok: Boolean(item?.isStatutoryDeduction) },
      ],
      journal: item?.journalVoucher ? "Enabled" : "-",
    };
  };

  const fetchComponents = async (tab = activeTab) => {
    const endpoint =
      tab === "income"
        ? "/config/get-all/component?status=1"
        : tab === "deduction"
        ? "/config/get-all/component?status=2"
        : "/config/get-all/component";

    try {
      setLoading(true);
      const response = await axiosInstance.get(endpoint, {
        meta: { auth: "ADMIN_AUTH" },
      });

      const list = Array.isArray(response?.data)
        ? response.data
        : Array.isArray(response?.data?.data)
        ? response.data.data
        : Array.isArray(response?.data?.components)
        ? response.data.components
        : [];

      setComponents(list.map(mapApiComponentToCard));
    } catch (error) {
      console.error("Error fetching payroll components:", error);
      setComponents([]);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setUseReadymade(false); setReadymadeComp(""); setCompName(""); setCompType("");
    setSubType(""); setIsVariable(""); setExtraPay(""); setIsTaxable("");
    setTaxGroup(""); setAccrual(""); setJournal("");
  };

  useEffect(() => {
    fetchComponents(activeTab);
  }, [activeTab]);

  useEffect(() => {
    setStatutory(components);
  }, [components]);

  const handleOpenStatutoryView = async () => {
    setStatutory(
      componentCards.filter(
        (c) =>
          c.type === "Deduction" &&
          c.attributes.some((a) => a.label === "Statutory" && a.ok)
      )
    );
    setStatutoryView(true);
  };

  const handleCreateComponent = async () => {
    const componentName = compName.trim() || readymadeComp.trim();
    const companyOfficeId = getStoredOfficeIds();

    if (!componentName) {
      toast.error("Component name is required.");
      return;
    }

    if (!compType) {
      toast.error("Please select component type.");
      return;
    }

    const payload = {
      componentName,
      componentCode: generateComponentCode(componentName),
      useReadymade,
      readymadeComponent: useReadymade ? readymadeComp : "",
      Income: compType === "income",
      employeeDeduction: compType === "employee-deduction",
      employerDeduction: compType === "employer-deduction",
      CTC: subType === "ctc",
      Non_Ctc: subType === "non-ctc",
      isVariable: isVariable === "yes",
      isExtraPayment: extraPay === "yes",
      isTaxable: isTaxable === "yes",
      taxGroup: taxGroup || "General",
      willAccrue: accrual === "yes",
      recoverExtraDeduction:
        (compType === "employee-deduction" || compType === "employer-deduction") &&
        extraPay === "yes",
      isStatutory: false,
      isStatutoryDeduction: false,
      journalVoucher: Boolean(journal.trim()),
      isActive: true,
      companyOfficeId,
    };

    try {
      setSaving(true);
      await axiosInstance.post("/config/create/component", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success("Component created successfully!");
      reset();
      setNewOpen(false);
      fetchComponents(activeTab);
    } catch (error) {
      console.error("Error creating payroll component:", error);
      toast.error(
        error?.response?.data?.message || "Failed to create component. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs     = ["all", "income", "deduction"];
  const tabLabel = { all: "All", income: "Income", deduction: "Deduction" };


  /* ── Statutory chooser view ── */
  if (statutoryView) return (
    <div className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={() => setStatutoryView(false)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors">
          <IcoBack />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Choose Statutory Components</h1>

        
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {statutory.map((c) => (
          <Card key={c.code} card={c} selectable
            selected={!!selectedStatutory[c.code]}
            onSelect={(v) => setSelectedSt((p) => ({ ...p, [c.code]: v }))} />
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <button type="button" onClick={() => setStatutoryView(false)}
          className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
          Save
        </button>
      </div>
    </div>
  );

  /* ── Main view ── */
  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Components</h1>
          <p className="text-sm text-gray-500 mt-0.5">Your payslips, salary structure, tax documents, and payroll support.</p>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={handleOpenStatutoryView}
            className="px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
            Choose Statutory Component
          </button>
          <button type="button" onClick={() => { reset(); setNewOpen(true); }}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors">
            New Component +
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 border border-gray-200">
          {tabs.map((t) => (
            <button key={t} type="button" onClick={() => setActiveTab(t)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${activeTab === t ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}>
              {tabLabel[t]}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setActiveTab("all")}
          className="text-xs text-gray-400 flex items-center gap-1 hover:text-gray-600">
          Clear <IcoClose />
        </button>
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {loading && (
          <div className="col-span-full py-10 text-center text-sm text-gray-500">
            Loading...
          </div>
        )}
        {!loading && components.length === 0 && (
          <div className="col-span-full py-10 text-center text-sm text-gray-500">
            No data found
          </div>
        )}
        {!loading && components.map((c) => (
          <Card key={c.id || c.code} card={c} />
        ))}
      </div>

      {/* ══ NEW COMPONENT PANEL ══ */}
      {newOpen && createPortal(
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40 z-4000" onClick={() => setNewOpen(false)} />

          {/* Slide-over */}
          <div className="fixed inset-y-0 right-0 z-5000 w-full max-w-md bg-white shadow-2xl flex flex-col">

            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <button type="button" onClick={() => setNewOpen(false)} className="text-gray-500 hover:text-gray-800">
                <IcoClose />
              </button>
              <h2 className="text-base font-bold text-gray-900 text-center flex-1">Create new component</h2>
              <div className="w-5" /> {/* spacer */}
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-4">

              {/* ── Readymade checkbox ── */}
              <Checkbox
                checked={useReadymade}
                onChange={(v) => { setUseReadymade(v); setReadymadeComp(""); }}
                label="Use readymade salary components"
              />

              {/* ── Select component dropdown (only when readymade is checked) ── */}
              {useReadymade && (
                <div>
                  <label className="block text-sm text-gray-500 mb-1">Select component</label>
                  <Dropdown
                    value={readymadeComp}
                    onChange={setReadymadeComp}
                    placeholder="Enter"
                    options={readymadeOptions}
                  />
                </div>
              )}

              {/* ── Component name ── */}
              <FieldInput
                label="Component name"
                value={compName}
                onChange={setCompName}
                placeholder=""
              />

              {/* ── Type selector (all in one bordered box) ── */}
              <div className="border border-gray-200 rounded-lg px-4 py-3 space-y-1">
                <RadioRow label="Income" selected={compType === "income"}
                  onClick={() => { setCompType("income"); setSubType(""); setIsTaxable(""); setTaxGroup(""); }} />
                {compType === "income" && (
                  <div className="ml-8 space-y-1 border-l-2 border-gray-200 pl-4 pb-1">
                    <RadioRow label="Non-CTC" selected={subType === "non-ctc"} onClick={() => setSubType("non-ctc")} />
                    <RadioRow label="CTC" selected={subType === "ctc"} onClick={() => setSubType("ctc")} />
                  </div>
                )}
                <RadioRow label="Employee Deduction" selected={compType === "employee-deduction"}
                  onClick={() => { setCompType("employee-deduction"); setSubType(""); setIsTaxable(""); setTaxGroup(""); }} />
                {compType === "employee-deduction" && (
                  <p className="text-xs text-gray-500 ml-8">Note: Employee deduction is from gross</p>
                )}
                <RadioRow label="Employer Deduction" selected={compType === "employer-deduction"}
                  onClick={() => { setCompType("employer-deduction"); setSubType(""); setIsTaxable(""); setTaxGroup(""); }} />
                {compType === "employer-deduction" && (
                  <div className="ml-8 space-y-1 border-l-2 border-gray-200 pl-4 pb-1">
                    <RadioRow label="Non-CTC" selected={subType === "non-ctc"} onClick={() => setSubType("non-ctc")} />
                    <RadioRow label="CTC" selected={subType === "ctc"} onClick={() => setSubType("ctc")} />
                  </div>
                )}
              </div>

              {/* ══ INCOME fields ══ */}
              {compType === "income" && <>
                <YesNo label="Is this variable?" value={isVariable} onChange={setIsVariable} />
                <YesNo label="Do you want to use this component to pay extra payment?" value={extraPay} onChange={setExtraPay} />
                <YesNo label="Is this taxable component?" value={isTaxable}
                  onChange={(v) => { setIsTaxable(v); if (v === "yes") setTaxGroup(""); }} />
                {isTaxable === "no" && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm text-gray-500 mb-1.5">Select Tax Group</label>
                    <Dropdown value={taxGroup} onChange={setTaxGroup} placeholder="Choose Tax Group" options={taxGroupOptions} />
                  </div>
                )}
                <YesNo
                  label="Will this component accrue?"
                  value={accrual}
                  onChange={setAccrual}
                />
                <JournalField value={journal} onChange={setJournal} />
              </>}

              {/* ══ EMPLOYEE DEDUCTION fields ══ */}
              {compType === "employee-deduction" && <>
                <YesNo label="Do you want to use this component to recover extra deduction?" value={extraPay} onChange={setExtraPay} />
                <YesNo label="Is this taxable component?" value={isTaxable}
                  onChange={(v) => { setIsTaxable(v); if (v === "yes") setTaxGroup(""); }} />
                {isTaxable === "no" && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm text-gray-500 mb-1.5">Select Tax Group</label>
                    <Dropdown value={taxGroup} onChange={setTaxGroup} placeholder="Choose Tax Group" options={taxGroupOptions} />
                  </div>
                )}
                <JournalField value={journal} onChange={setJournal} />
              </>}

              {/* ══ EMPLOYER DEDUCTION fields ══ */}
              {compType === "employer-deduction" && <>
                <YesNo label="Do you want to use this component to recover extra deduction?" value={extraPay} onChange={setExtraPay} />
                <JournalField value={journal} onChange={setJournal} />
              </>}

            </div>

            {/* Footer — Create Component button */}
            <div className="px-5 py-4 border-t border-gray-100">
              <button type="button" onClick={handleCreateComponent} disabled={saving}
                className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {saving ? "Creating..." : "Create Component"}
              </button>
            </div>
          </div>
        </>,
          document.body
      )}
    </div>
  );
};

export default PayrollComponent;
