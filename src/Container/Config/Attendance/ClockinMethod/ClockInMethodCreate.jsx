import { useState } from "react";

// ── Stepper steps definition ──────────────────────────────────────────────────
const STEPS = [
  { id: 1, label: "Basic Info" },
  { id: 2, label: "Clock Settings" },
  { id: 3, label: "Attendance Method" },
  { id: 4, label: "Review" },
];

// ── Shared UI components ──────────────────────────────────────────────────────

const FieldLabel = ({ children }) => (
  <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8, marginTop: 0 }}>
    {children}
  </p>
);

const SubLabel = ({ children }) => (
  <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>{children}</p>
);

const TextInput = ({ placeholder, value, onChange, style }) => (
  <input
    value={value || ""}
    onChange={onChange}
    placeholder={placeholder || "Enter here..."}
    style={{
      width: "100%", border: "1px solid #d1d5db", borderRadius: 8,
      padding: "10px 14px", fontSize: 13, color: "#374151",
      outline: "none", boxSizing: "border-box",
      background: "#fff", ...style,
    }}
  />
);

const TextArea = ({ placeholder, value, onChange, rows = 3 }) => (
  <textarea
    value={value || ""}
    onChange={onChange}
    placeholder={placeholder || "Enter here..."}
    rows={rows}
    style={{
      width: "100%", border: "1px solid #d1d5db", borderRadius: 8,
      padding: "10px 14px", fontSize: 13, color: "#374151",
      outline: "none", resize: "vertical", boxSizing: "border-box",
      background: "#fff",
    }}
  />
);

// Radio option card
const RadioCard = ({ label, value, checked, onChange, children }) => (
  <div
    onClick={() => onChange(value)}
    style={{
      border: `1.5px solid ${checked ? "#3b82f6" : "#e5e7eb"}`,
      borderRadius: 8, padding: "12px 16px", cursor: "pointer",
      background: checked ? "#eff6ff" : "#fff",
      transition: "all 0.15s", marginBottom: 6,
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{
        width: 17, height: 17, borderRadius: "50%",
        border: `2px solid ${checked ? "#3b82f6" : "#d1d5db"}`,
        background: "#fff", display: "flex", alignItems: "center",
        justifyContent: "center", flexShrink: 0,
      }}>
        {checked && <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />}
      </div>
      <span style={{ fontSize: 13, color: "#374151", fontWeight: checked ? 600 : 400 }}>{label}</span>
      {checked && <span style={{ marginLeft: "auto", color: "#22c55e", fontWeight: 700, fontSize: 15 }}>✓</span>}
    </div>
    {checked && children && (
      <div style={{ marginTop: 10, paddingLeft: 27 }}>{children}</div>
    )}
  </div>
);

// Yes/No toggle group
const YesNo = ({ label, value, onChange, name, yesChildren }) => (
  <div style={{ marginBottom: 20 }}>
    <FieldLabel>{label}</FieldLabel>
    <RadioCard label="Yes" value="yes" checked={value === "yes"} onChange={onChange}>
      {yesChildren}
    </RadioCard>
    <RadioCard label="No" value="no" checked={value === "no"} onChange={onChange} />
  </div>
);

// Section divider
const SectionDivider = ({ title }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0 16px" }}>
    <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
    <span style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, whiteSpace: "nowrap" }}>
      {title}
    </span>
    <div style={{ flex: 1, height: 1, background: "#e5e7eb" }} />
  </div>
);

// Review row
const ReviewRow = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
    <span style={{ fontSize: 12, color: "#6b7280" }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>{value || "—"}</span>
  </div>
);

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function ClockInMethodCreate({ onBack }) {
  const [step, setStep] = useState(1);

  // Step 1 — Basic Info
  const [deviceName, setDeviceName] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 — Clock Settings
  const [clockType, setClockType] = useState("only");
  const [trackBreak, setTrackBreak] = useState("no");
  const [breakHrs, setBreakHrs] = useState("");
  const [breakMins, setBreakMins] = useState("");

  // Step 3 — Attendance Method
  const [biometric, setBiometric] = useState("");          // "yes" | "no"
  const [directionalDevice, setDirectionalDevice] = useState("no");  // only when biometric=yes
  const [webAttendance, setWebAttendance] = useState("no");           // only when biometric=no
  const [ipRestriction, setIpRestriction] = useState("no");
  const [mobileAttendance, setMobileAttendance] = useState("no");
  const [gpsAttendance, setGpsAttendance] = useState("no");

  const canNext = () => {
    if (step === 1) return deviceName.trim() !== "";
    if (step === 3) return biometric !== "";
    return true;
  };

  // ── Step indicator ────────────────────────────────────────────────────────

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 36, gap: 0 }}>
      {STEPS.map((s, i) => {
        const done = step > s.id;
        const active = step === s.id;
        return (
          <div key={s.id} style={{ display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 36, height: 36, borderRadius: "50%",
                background: done ? "#22c55e" : active ? "#3b82f6" : "#f3f4f6",
                border: `2px solid ${done ? "#22c55e" : active ? "#3b82f6" : "#e5e7eb"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: (done || active) ? "#fff" : "#9ca3af",
                fontWeight: 700, fontSize: 14, transition: "all 0.2s",
              }}>
                {done ? "✓" : s.id}
              </div>
              <span style={{
                fontSize: 11, fontWeight: active ? 700 : 400,
                color: active ? "#3b82f6" : done ? "#22c55e" : "#9ca3af",
                whiteSpace: "nowrap",
              }}>{s.label}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{
                width: 80, height: 2, margin: "0 6px", marginBottom: 20,
                background: step > s.id ? "#22c55e" : "#e5e7eb",
                transition: "background 0.3s",
              }} />
            )}
          </div>
        );
      })}
    </div>
  );

  // ── Step content ──────────────────────────────────────────────────────────

  return (
    <div style={{ fontFamily: "sans-serif", margin: "0 auto", padding: "32px 24px 120px", color: "#1e293b" }}>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, color: "#111827" }}>Create Clock-in Method</h1>
        <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 4 }}>
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Stepper */}
      <StepIndicator />

      {/* Card wrapper */}
      <div style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: 28, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>

        {/* ═══════════ STEP 1: Basic Info ═══════════ */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Basic Information</h2>

            <div style={{ marginBottom: 18 }}>
              <FieldLabel>Device Name <span style={{ color: "#ef4444" }}>*</span></FieldLabel>
              <TextInput
                placeholder="Enter device name"
                value={deviceName}
                onChange={e => setDeviceName(e.target.value)}
              />
            </div>

            <div>
              <FieldLabel>Description</FieldLabel>
              <SubLabel>Provide internal description for other admins who would view this setting</SubLabel>
              <TextArea
                placeholder="Enter description..."
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
              />
            </div>
          </div>
        )}

        {/* ═══════════ STEP 2: Clock Settings ═══════════ */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20, color: "#111827" }}>Clock Settings</h2>

            {/* Clock type */}
            <div style={{ marginBottom: 20 }}>
              <FieldLabel>Do employees need to clock-in and clock-out, or only clock-in is sufficient?</FieldLabel>
              <RadioCard
                label="Clock-in and clock-out, both required"
                value="both"
                checked={clockType === "both"}
                onChange={setClockType}
              />
              <RadioCard
                label="Only Clock-in required"
                value="only"
                checked={clockType === "only"}
                onChange={setClockType}
              />
            </div>

            {/* Track break */}
            <YesNo
              label="Would you like to track break durations between Clock-out and Clock-in times?"
              value={trackBreak}
              onChange={setTrackBreak}
              name="trackBreak"
              yesChildren={
                <div>
                  <SubLabel>How much time is allocated to employee as break-time?</SubLabel>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div>
                      <TextInput
                        placeholder="0"
                        value={breakHrs}
                        onChange={e => setBreakHrs(e.target.value)}
                        style={{ width: 90 }}
                      />
                      <p style={{ fontSize: 11, color: "#6b7280", marginTop: 4, textAlign: "center" }}>Hrs</p>
                    </div>
                    <div>
                      <TextInput
                        placeholder="0"
                        value={breakMins}
                        onChange={e => setBreakMins(e.target.value)}
                        style={{ width: 90 }}
                      />
                      <p style={{ fontSize: 11, color: "#6b7280", marginTop: 4, textAlign: "center" }}>Mins</p>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        )}

        {/* ═══════════ STEP 3: Attendance Method ═══════════ */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 6, color: "#111827" }}>Attendance Method</h2>
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>
              Select how employees will record their attendance. Biometric selection affects which other options are available.
            </p>

            {/* ── BIOMETRIC ── */}
            <SectionDivider title="Biometric" />

            <div style={{ marginBottom: 20 }}>
              <FieldLabel>Would you like to enable biometric attendance? <span style={{ color: "#ef4444" }}>*</span></FieldLabel>

              {/* Biometric YES */}
              <RadioCard
                label="Yes — Enable biometric attendance"
                value="yes"
                checked={biometric === "yes"}
                onChange={v => { setBiometric(v); }}
              >
                {/* Only shown when biometric = YES */}
                <div style={{ marginTop: 8 }}>
                  <FieldLabel>Do you wish to track attendance with separate device for recording in-time and a separate device for recording out-time (use in/out directional devices)?</FieldLabel>
                  <RadioCard label="Yes" value="yes" checked={directionalDevice === "yes"} onChange={setDirectionalDevice} />
                  <RadioCard label="No"  value="no"  checked={directionalDevice === "no"}  onChange={setDirectionalDevice} />
                </div>
              </RadioCard>

              {/* Biometric NO */}
              <RadioCard
                label="No — Use other attendance methods"
                value="no"
                checked={biometric === "no"}
                onChange={v => { setBiometric(v); }}
              />

              {biometric === "" && (
                <p style={{ fontSize: 12, color: "#f59e0b", marginTop: 6 }}>⚠ Please select a biometric option to continue.</p>
              )}
            </div>

            {/* ── Fields shown ONLY when biometric = NO ── */}
            {biometric === "no" && (
              <>
                <SectionDivider title="Web Attendance" />
                <YesNo
                  label="Would you like to enable web based attendance via Windows / Linux / Mac browser?"
                  value={webAttendance}
                  onChange={setWebAttendance}
                  name="web"
                />

                <SectionDivider title="IP Restriction" />
                <YesNo
                  label="Would you like to enforce IP Network restrictions as well?"
                  value={ipRestriction}
                  onChange={setIpRestriction}
                  name="ip"
                />

                <SectionDivider title="Mobile Attendance" />
                <YesNo
                  label="Would you like to enable mobile based attendance (via Android / iOS app)?"
                  value={mobileAttendance}
                  onChange={setMobileAttendance}
                  name="mobile"
                />

                <SectionDivider title="GPS" />
                <YesNo
                  label="Would you like to enforce GPS location based attendance?"
                  value={gpsAttendance}
                  onChange={setGpsAttendance}
                  name="gps"
                  yesChildren={
                    <div style={{ background: "#dbeafe", borderRadius: 8, padding: 12, marginTop: 4 }}>
                      <p style={{ fontSize: 13, color: "#1d4ed8", fontWeight: 600, marginBottom: 4, cursor: "pointer" }}>
                        📍 Select GPS Location
                      </p>
                      <p style={{ fontSize: 12, color: "#ef4444" }}>Please select a GPS location</p>
                    </div>
                  }
                />
              </>
            )}

            {/* Info card when biometric = YES */}
            {biometric === "yes" && (
              <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: 14, marginTop: 8 }}>
                <p style={{ fontSize: 13, color: "#15803d", fontWeight: 600, margin: 0 }}>✓ Biometric mode selected</p>
                <p style={{ fontSize: 12, color: "#166534", marginTop: 4 }}>
                  Web, mobile, and GPS attendance options are not applicable when biometric attendance is enabled.
                </p>
              </div>
            )}
          </div>
        )}

        {/* ═══════════ STEP 4: Review ═══════════ */}
        {step === 4 && (
          <div>
            <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#111827" }}>Review & Save</h2>
            <p style={{ fontSize: 12, color: "#6b7280", marginBottom: 20 }}>Review your clock-in method configuration before saving.</p>

            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Basic Info</p>
              <ReviewRow label="Device Name" value={deviceName} />
              <ReviewRow label="Description" value={description || "No description"} />
            </div>

            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16, marginBottom: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Clock Settings</p>
              <ReviewRow label="Clock Type" value={clockType === "both" ? "Clock-in & Clock-out both required" : "Only Clock-in required"} />
              <ReviewRow label="Track Break" value={trackBreak === "yes" ? `Yes (${breakHrs || "0"}h ${breakMins || "0"}m)` : "No"} />
            </div>

            <div style={{ background: "#f8fafc", borderRadius: 8, padding: 16 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Attendance Method</p>
              <ReviewRow label="Biometric" value={biometric === "yes" ? "Enabled" : "Disabled"} />
              {biometric === "yes" && (
                <ReviewRow label="Directional Devices" value={directionalDevice === "yes" ? "Yes" : "No"} />
              )}
              {biometric === "no" && (
                <>
                  <ReviewRow label="Web Attendance" value={webAttendance === "yes" ? "Enabled" : "Disabled"} />
                  <ReviewRow label="IP Restriction" value={ipRestriction === "yes" ? "Enabled" : "Disabled"} />
                  <ReviewRow label="Mobile Attendance" value={mobileAttendance === "yes" ? "Enabled" : "Disabled"} />
                  <ReviewRow label="GPS Attendance" value={gpsAttendance === "yes" ? "Enabled" : "Disabled"} />
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ── Fixed bottom navigation ── */}
      <div style={{
        position: "fixed", bottom: 0, right: 0,width:"100%",zIndex:100,
        background: "#fff", borderTop: "1px solid #e5e7eb",
        padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center",
       
      }}>
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => onBack && onBack()}
            style={{ background: "none", border: "none", fontSize: 13, color: "#6b7280", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button style={{
            border: "1.5px solid #3b82f6", color: "#3b82f6", background: "none",
            borderRadius: 20, padding: "7px 18px", fontSize: 13, cursor: "pointer", fontWeight: 500,
          }}>
            Save as Draft
          </button>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              style={{ border: "1px solid #d1d5db", background: "#fff", borderRadius: 20, padding: "7px 20px", fontSize: 13, cursor: "pointer", color: "#374151", fontWeight: 500 }}
            >
              ← Previous
            </button>
          )}

          {step < STEPS.length ? (
            <button
              onClick={() => { if (canNext()) setStep(step + 1); }}
              style={{
                background: canNext() ? "#3b82f6" : "#d1d5db",
                color: "#fff", border: "none", borderRadius: 20,
                padding: "7px 22px", fontSize: 13, cursor: canNext() ? "pointer" : "not-allowed",
                fontWeight: 600, transition: "background 0.2s",
              }}
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => onBack && onBack()}
              style={{ background: "#22c55e", color: "#fff", border: "none", borderRadius: 20, padding: "7px 22px", fontSize: 13, cursor: "pointer", fontWeight: 600 }}
            >
              ✓ Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}