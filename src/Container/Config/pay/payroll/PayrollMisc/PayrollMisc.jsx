import { useState } from "react";

// ─── Inline UI Primitives ───────────────────────────────────────────────────

const Switch = ({ checked, onChange }) => (
  <button
    onClick={() => onChange(!checked)}
    style={{
      width: 44,
      height: 24,
      borderRadius: 12,
      border: "none",
      cursor: "pointer",
      background: checked ? "#2563eb" : "#d1d5db",
      position: "relative",
      transition: "background 0.2s",
      flexShrink: 0,
    }}
  >
    <span
      style={{
        position: "absolute",
        top: 2,
        left: checked ? 22 : 2,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: "#fff",
        transition: "left 0.2s",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
    />
  </button>
);

const RadioCard = ({ label, subLabel, checked, onChange, children }) => (
  <div
    onClick={onChange}
    style={{
      border: `1.5px solid ${checked ? "#2563eb" : "#e5e7eb"}`,
      borderRadius: 8,
      padding: "12px 16px",
      cursor: "pointer",
      background: checked ? "#eff6ff" : "#fff",
      marginBottom: 8,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          border: `2px solid ${checked ? "#2563eb" : "#9ca3af"}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {checked && (
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: "50%",
              background: "#2563eb",
            }}
          />
        )}
      </span>
      <span style={{ fontSize: 14, color: "#111827" }}>
        {label}
        {subLabel && (
          <span style={{ color: "#6b7280", marginLeft: 4 }}>{subLabel}</span>
        )}
      </span>
    </div>
    {checked && children && <div style={{ marginTop: 10, marginLeft: 28 }}>{children}</div>}
  </div>
);

const CheckCard = ({ label, checked, onChange }) => (
  <div
    onClick={onChange}
    style={{
      border: `1.5px solid ${checked ? "#2563eb" : "#e5e7eb"}`,
      borderRadius: 8,
      padding: "12px 16px",
      cursor: "pointer",
      background: checked ? "#eff6ff" : "#fff",
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 10,
    }}
  >
    <span
      style={{
        width: 18,
        height: 18,
        borderRadius: 4,
        border: `2px solid ${checked ? "#2563eb" : "#9ca3af"}`,
        background: checked ? "#2563eb" : "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
          <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </span>
    <span style={{ fontSize: 14, color: "#111827" }}>{label}</span>
  </div>
);

const Label = ({ children, style = {} }) => (
  <p style={{ fontSize: 14, color: "#111827", marginBottom: 10, marginTop: 16, ...style }}>
    {children}
  </p>
);

const SelectInput = ({ placeholder = "Choose Account" }) => (
  <div
    style={{
      border: "1.5px solid #e5e7eb",
      borderRadius: 8,
      padding: "10px 14px",
      fontSize: 14,
      color: "#9ca3af",
      background: "#fff",
      marginBottom: 8,
    }}
  >
    {placeholder}
  </div>
);

const NumberInput = ({ placeholder = "Choose Account", suffix }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <div
      style={{
        border: "1.5px solid #e5e7eb",
        borderRadius: 8,
        padding: "10px 14px",
        fontSize: 14,
        color: "#9ca3af",
        background: "#fff",
        flex: 1,
      }}
    >
      {placeholder}
    </div>
    {suffix && <span style={{ fontSize: 14, color: "#6b7280" }}>{suffix}</span>}
  </div>
);

const DateRangePicker = () => (
  <div style={{ display: "flex", gap: 12 }}>
    {["From", "To"].map((lbl) => (
      <div key={lbl} style={{ flex: 1 }}>
        <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 4 }}>{lbl}</p>
        <div
          style={{
            border: "1.5px solid #e5e7eb",
            borderRadius: 8,
            padding: "10px 14px",
            fontSize: 14,
            color: "#9ca3af",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          dd-mm-yyyy
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </div>
      </div>
    ))}
  </div>
);

const SwitchRow = ({ label, checked, onChange, hint }) => (
  <div
    style={{
      border: "1.5px solid #e5e7eb",
      borderRadius: 8,
      padding: "14px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 16,
      background: "#fff",
    }}
  >
    <span style={{ fontSize: 14, color: "#111827" }}>{label}</span>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      {hint && <span style={{ fontSize: 12, color: "#ef4444" }}>{hint}</span>}
      <Switch checked={checked} onChange={onChange} />
    </div>
  </div>
);

// ─── Tab 1: Rounding Options ────────────────────────────────────────────────

const RoundingOptionsTab = () => {
  const [rounding, setRounding] = useState("two-decimal");
  return (
    <div>
      <Label style={{ marginTop: 0 }}>How would you like to round off salary calculations?</Label>
      <RadioCard
        label="Two Decimal Places"
        subLabel="(29.29 ₹)"
        checked={rounding === "two-decimal"}
        onChange={() => setRounding("two-decimal")}
      />
      <RadioCard
        label="Round up to nearest integer"
        subLabel="(30)"
        checked={rounding === "round-up"}
        onChange={() => setRounding("round-up")}
      />
      <RadioCard
        label="Round down to nearest integer"
        subLabel="(29)"
        checked={rounding === "round-down"}
        onChange={() => setRounding("round-down")}
      />
    </div>
  );
};

// ─── Tab 2: Variable / VPF Settings ─────────────────────────────────────────

const VariableVPFTab = () => {
  const [vpf, setVpf] = useState("yes");
  return (
    <div>
      <Label style={{ marginTop: 0 }}>
        Activate Variable dashboard for managers days before payroll run date.
      </Label>
      <SelectInput />
      <Label>Do you want to allow VPF in your company?</Label>
      <RadioCard label="Yes" checked={vpf === "yes"} onChange={() => setVpf("yes")} />
      <RadioCard label="No" checked={vpf === "no"} onChange={() => setVpf("no")} />
    </div>
  );
};

// ─── Tab 3: Flexible Benefits Plan ──────────────────────────────────────────

const FlexibleBenefitsTab = () => {
  const [enabled, setEnabled] = useState(true);
  const [calcMethod, setCalcMethod] = useState("monthly");
  const [unusedMethod, setUnusedMethod] = useState("taxable");

  return (
    <div>
      <SwitchRow
        label="Do you want to early run payroll for the current month?"
        checked={enabled}
        onChange={setEnabled}
        hint={enabled ? "If this is yes then only we are showing Below fields" : ""}
      />
      {enabled && (
        <>
          <Label>Activate Variable dashboard for managers days before payroll run date.</Label>
          <SelectInput />
          <Label>Set cut-off day</Label>
          <SelectInput />
          <Label>How would you like to calculate the benefit amount received by employees?</Label>
          <RadioCard
            label="Calculate and pay employees each month on submission of bills before the FBP cut-off date"
            checked={calcMethod === "monthly"}
            onChange={() => setCalcMethod("monthly")}
          >
            <Label style={{ marginTop: 0 }}>How to treat the unused benefit amount?</Label>
            <RadioCard
              label="Calculate remaining amount as a taxable balancing figure (special allowance)"
              checked={unusedMethod === "taxable"}
              onChange={() => setUnusedMethod("taxable")}
            />
            <RadioCard
              label="Carry forward the unused benefit amount to the next month"
              checked={unusedMethod === "carry"}
              onChange={() => setUnusedMethod("carry")}
            />
          </RadioCard>
          <RadioCard
            label="Paid every month"
            checked={calcMethod === "every-month"}
            onChange={() => setCalcMethod("every-month")}
          />
        </>
      )}
    </div>
  );
};

// ─── Tab 4: Salary Slip Design ───────────────────────────────────────────────

const SalarySlipDesignTab = () => {
  const [showEmpDeduction, setShowEmpDeduction] = useState(true);
  const [showErDeduction, setShowErDeduction] = useState(true);
  const [showBankDetails, setShowBankDetails] = useState(true);
  const [businessAddress, setBusinessAddress] = useState("yes");
  const [businessLogo, setBusinessLogo] = useState("yes");
  const [signingAuth, setSigningAuth] = useState("digital");

  return (
    <div>
      <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111827", marginBottom: 20 }}>
        Design your salary slip
      </h2>

      {/* Logo + Body Layout */}
      <div style={{ display: "flex", gap: 24, marginBottom: 24 }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Logo Placement</p>
          <div
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: 8,
              height: 90,
              display: "flex",
              alignItems: "flex-start",
              padding: 12,
              position: "relative",
              background: "#fff",
            }}
          >
            <div
              style={{
                border: "1.5px solid #d1d5db",
                borderRadius: 4,
                padding: "4px 12px",
                fontSize: 12,
                color: "#6b7280",
              }}
            >
              Logo
            </div>
            <span style={{ position: "absolute", bottom: 10, right: 12, color: "#2563eb" }}>✓</span>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 8 }}>Body Layout</p>
          <div
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: 8,
              height: 90,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: 12,
              position: "relative",
              background: "#fff",
            }}
          >
            <div style={{ flex: 1, height: 50, background: "#e5e7eb", borderRadius: 4 }} />
            <div style={{ flex: 1, height: 50, background: "#e5e7eb", borderRadius: 4 }} />
            <span style={{ position: "absolute", bottom: 10, right: 12, color: "#2563eb" }}>✓</span>
          </div>
        </div>
      </div>

      <Label style={{ marginTop: 0 }}>
        Choose the deduction sections you want to show in the employee's salary slip
      </Label>
      <CheckCard
        label="Show Employee Deduction"
        checked={showEmpDeduction}
        onChange={() => setShowEmpDeduction(!showEmpDeduction)}
      />
      <CheckCard
        label="Show Employer Deduction"
        checked={showErDeduction}
        onChange={() => setShowErDeduction(!showErDeduction)}
      />
      <CheckCard
        label="Show Bank Details"
        checked={showBankDetails}
        onChange={() => setShowBankDetails(!showBankDetails)}
      />

      <Label>Set cut-off day</Label>
      <SelectInput />

      <Label>Do you want to show Business unit address on payslips?</Label>
      <RadioCard label="Yes" checked={businessAddress === "yes"} onChange={() => setBusinessAddress("yes")} />
      <RadioCard label="No" checked={businessAddress === "no"} onChange={() => setBusinessAddress("no")} />

      <Label>Do you want to show Business unit logo on payslips?</Label>
      <RadioCard label="Yes" checked={businessLogo === "yes"} onChange={() => setBusinessLogo("yes")} />
      <RadioCard label="No" checked={businessLogo === "no"} onChange={() => setBusinessLogo("no")} />

      <Label>Signing authority</Label>
      <RadioCard
        label="Digital Signature"
        checked={signingAuth === "digital"}
        onChange={() => setSigningAuth("digital")}
      />
      <RadioCard
        label="None"
        checked={signingAuth === "none"}
        onChange={() => setSigningAuth("none")}
      />
    </div>
  );
};

// ─── Tab 5: Loan Settings ────────────────────────────────────────────────────

const LoanSettingsTab = () => {
  const [loanEnabled, setLoanEnabled] = useState(true);
  const [eligibility, setEligibility] = useState("probation");
  const [noticePeriod, setNoticePeriod] = useState("yes");
  const [loanLimit, setLoanLimit] = useState("percentage");
  const [interestMethod, setInterestMethod] = useState("reducing");

  return (
    <div>
      <SwitchRow
        label="Offer loan facility to employees"
        checked={loanEnabled}
        onChange={setLoanEnabled}
        hint={loanEnabled ? "If this is yes then only we are showing Below fields" : ""}
      />

      {loanEnabled && (
        <>
          <Label>When are employees eligible to avail loans?</Label>
          <CheckCard
            label="Upon probation confirmation"
            checked={eligibility === "probation"}
            onChange={() => setEligibility("probation")}
          />
          <CheckCard
            label="Show Employer Deduction"
            checked={eligibility === "employer"}
            onChange={() => setEligibility("employer")}
          />
          <CheckCard
            label="Show Bank Details"
            checked={eligibility === "bank"}
            onChange={() => setEligibility("bank")}
          />

          <Label>Set cut-off day</Label>
          <SelectInput />

          <Label>When are employees eligible to avail loans?</Label>
          <RadioCard
            label="Upon probation confirmation"
            checked={eligibility === "probation"}
            onChange={() => setEligibility("probation")}
          />
          <RadioCard
            label="How many days after joining"
            checked={eligibility === "days"}
            onChange={() => setEligibility("days")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  border: "1.5px solid #e5e7eb",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 14,
                  color: "#9ca3af",
                  background: "#fff",
                  flex: 1,
                }}
              >
                Choose Account
              </div>
              <span style={{ fontSize: 14, color: "#6b7280" }}>Days</span>
            </div>
          </RadioCard>

          <Label>Allow Employees serving notice period to avail loans?</Label>
          <RadioCard label="Yes" checked={noticePeriod === "yes"} onChange={() => setNoticePeriod("yes")} />
          <RadioCard label="No" checked={noticePeriod === "no"} onChange={() => setNoticePeriod("no")} />

          <Label>
            Employees are eligible to avail loan if their annual/monthly package is greater than
          </Label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                flex: 1,
              }}
            >
              Choose Account
            </div>
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                width: 40,
                textAlign: "center",
              }}
            >
              ₹
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                flex: 1,
              }}
            >
              Choose Account
            </div>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Days</span>
          </div>

          <Label>Maximum loan amount will be limited to one of the following conditions</Label>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <input
              type="radio"
              checked={loanLimit === "percentage"}
              onChange={() => setLoanLimit("percentage")}
              style={{ accentColor: "#2563eb" }}
            />
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                width: 120,
              }}
            >
              Choose Account
            </div>
            <span style={{ fontSize: 14, color: "#6b7280" }}>% Of employee's annual package</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <input
              type="radio"
              checked={loanLimit === "fixed"}
              onChange={() => setLoanLimit("fixed")}
              style={{ accentColor: "#2563eb" }}
            />
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "8px 12px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                width: 120,
              }}
            >
              Choose Account
            </div>
            <span style={{ fontSize: 14, color: "#6b7280" }}>Fixed Amount</span>
          </div>

          <Label>Maximum number of loan installments processed in the company is</Label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                flex: 1,
              }}
            >
              Choose Account
            </div>
            <span style={{ fontSize: 14, color: "#6b7280", alignSelf: "center" }}>Count</span>
          </div>

          <Label>Default interest rate in the company</Label>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div
              style={{
                border: "1.5px solid #e5e7eb",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: 14,
                color: "#9ca3af",
                background: "#fff",
                flex: 1,
              }}
            >
              Choose Account
            </div>
            <span style={{ fontSize: 14, color: "#6b7280", alignSelf: "center" }}>%</span>
          </div>

          <Label>Method for calculating interest</Label>
          <RadioCard
            label="Reducing interest rate"
            checked={interestMethod === "reducing"}
            onChange={() => setInterestMethod("reducing")}
          />
          <RadioCard
            label="Flat interest rate"
            checked={interestMethod === "flat"}
            onChange={() => setInterestMethod("flat")}
          />
        </>
      )}
    </div>
  );
};

// ─── Tab 6: IT Declaration ───────────────────────────────────────────────────

const ITDeclarationTab = () => {
  const [approvalRequired, setApprovalRequired] = useState(true);
  const [midYearAllowed, setMidYearAllowed] = useState("yes");
  const [effectiveApproval, setEffectiveApproval] = useState(true);

  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 8 }}>
        What is the first IT Declaration window For Existing Employees
      </p>
      <DateRangePicker />

      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "16px 0 8px" }}>
        What is the first IT Declaration window For New Employees
      </p>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <input type="radio" style={{ accentColor: "#2563eb" }} />
        <div
          style={{
            border: "1.5px solid #e5e7eb",
            borderRadius: 8,
            padding: "8px 12px",
            fontSize: 14,
            color: "#9ca3af",
            background: "#fff",
            width: 140,
          }}
        >
          Choose Account
        </div>
        <span style={{ fontSize: 14, color: "#6b7280" }}>Days</span>
      </div>

      <SwitchRow
        label="Require approval for declaration to be effective"
        checked={approvalRequired}
        onChange={setApprovalRequired}
      />

      <Label>Allow employees to set declared value in the middle of the financial year?</Label>
      <RadioCard
        label="Yes"
        checked={midYearAllowed === "yes"}
        onChange={() => setMidYearAllowed("yes")}
      />
      <div
        onClick={() => setMidYearAllowed("no")}
        style={{
          border: `1.5px solid ${midYearAllowed === "no" ? "#2563eb" : "#e5e7eb"}`,
          borderRadius: 8,
          padding: "12px 16px",
          cursor: "pointer",
          background: midYearAllowed === "no" ? "#eff6ff" : "#fff",
          marginBottom: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: `2px solid ${midYearAllowed === "no" ? "#2563eb" : "#9ca3af"}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            {midYearAllowed === "no" && (
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#2563eb" }} />
            )}
          </span>
          <span style={{ fontSize: 14, color: "#111827" }}>No</span>
        </div>
        <span style={{ fontSize: 12, color: "#ef4444" }}>If no then it will show nothing</span>
      </div>

      {midYearAllowed === "yes" && (
        <>
          <Label>Kindly select the effective declaration window</Label>
          <DateRangePicker />
          <div style={{ marginTop: 12 }}>
            <SwitchRow
              label="Require approval for the declaration to be effective"
              checked={effectiveApproval}
              onChange={setEffectiveApproval}
            />
          </div>
        </>
      )}
    </div>
  );
};

// ─── Tab 7: IT Submission ─────────────────────────────────────────────────────

const ITSubmissionTab = () => {
  const [proofRequired, setProofRequired] = useState(true);
  const [changeTaxRegime, setChangeTaxRegime] = useState("yes");

  return (
    <div>
      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", marginBottom: 8 }}>
        Standard IT submission window
      </p>
      <DateRangePicker />

      <p style={{ fontSize: 14, fontWeight: 500, color: "#111827", margin: "16px 0 8px" }}>
        Extended IT submission window
      </p>
      <DateRangePicker />

      <div style={{ marginTop: 16 }}>
        <SwitchRow
          label="Require submission of proof for IT declarations?"
          checked={proofRequired}
          onChange={setProofRequired}
        />
      </div>

      <Label>Allow employees to change tax regime when submission window is open?</Label>
      <RadioCard
        label="Yes"
        checked={changeTaxRegime === "yes"}
        onChange={() => setChangeTaxRegime("yes")}
      >
        <p style={{ fontSize: 13, color: "#374151", marginBottom: 8 }}>
          How many days from submission start date window will be open?
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              border: "1.5px solid #e5e7eb",
              borderRadius: 8,
              padding: "8px 12px",
              fontSize: 14,
              color: "#9ca3af",
              background: "#fff",
              width: 140,
            }}
          >
            Choose Account
          </div>
          <span style={{ fontSize: 14, color: "#6b7280" }}>Days</span>
        </div>
      </RadioCard>
      <RadioCard
        label="No"
        checked={changeTaxRegime === "no"}
        onChange={() => setChangeTaxRegime("no")}
      />
    </div>
  );
};

// ─── Tab config ───────────────────────────────────────────────────────────────

const TABS = [
  { id: "rounding", label: "Rounding Options", component: RoundingOptionsTab },
  { id: "vpf", label: "Variable / VPF Settings", component: VariableVPFTab },
  { id: "fbp", label: "Flexible Benefits Plan", component: FlexibleBenefitsTab },
  { id: "salary-slip", label: "Salary Slip Design", component: SalarySlipDesignTab },
  { id: "loan", label: "Loan Settings", component: LoanSettingsTab },
  { id: "it-declaration", label: "IT Declaration", component: ITDeclarationTab },
  { id: "it-submission", label: "IT Submission", component: ITSubmissionTab },
];

// ─── Main Component ───────────────────────────────────────────────────────────

const PayrollMisc = () => {
  const [activeTab, setActiveTab] = useState("rounding");

  const ActiveComponent = TABS.find((t) => t.id === activeTab)?.component || RoundingOptionsTab;

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", background: "#f9fafb", minHeight: "100vh" }}>
      {/* Header */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 18, fontWeight: 600, color: "#111827", margin: 0 }}>
          Payroll Settings
        </h1>
        <button
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 24px",
            fontSize: 14,
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Save
        </button>
      </div>

      {/* Tabs */}
      <div
        style={{
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "0 24px",
          display: "flex",
          gap: 0,
          overflowX: "auto",
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              background: "none",
              border: "none",
              borderBottom: `2.5px solid ${activeTab === tab.id ? "#2563eb" : "transparent"}`,
              padding: "14px 16px",
              fontSize: 13,
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? "#2563eb" : "#6b7280",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
        <div
          style={{
            background: "#fff",
            borderRadius: 12,
            border: "1px solid #e5e7eb",
            padding: 24,
          }}
        >
          <ActiveComponent />
        </div>

        {/* Bottom Save */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
          <button
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollMisc;