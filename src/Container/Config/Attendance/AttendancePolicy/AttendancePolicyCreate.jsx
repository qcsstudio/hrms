import { useState } from "react";

export default function AttendancePolicyCreate() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    policyName: "", policyDesc: "",
    wfhOd: "wfh", wfhCount: "", backupCount: "",
    restrictRequests: "no", restrictCount: "",
    autoActions: "yes", noShowAction: null,
    leaveSubAction: "create-request", absentLeaveType: "", absentLeavesDeduct: "",
    lateComers: "yes", lateType: "grace-hours",
    graceHrs: "", graceMins: "", graceTriggerHrs: "", graceTriggerMins: "",
    graceMaxHrs: "", graceMaxMins: "",
    gracePenalty: "deduct-refill", gracePenaltyLeaveType: "", gracePenaltyLeavesDeduct: "",
    gracePenaltyPerLateDay: "", gracePenaltyDeductPolicy: "auto-leave",
    graceCountNum: "", graceCountTriggerHrs: "", graceCountTriggerMins: "",
    graceCountMaxHrs: "", graceCountMaxMins: "", graceUsageCount: "",
    timeReq: "yes-daily",
    halfDayMode: "percent", halfDayPct: "", halfDayHrs: "", halfDayMins: "",
    halfDayPenalty: "yes", halfDayLeaveType: "", halfDayLeavesDeduct: "",
    halfDayLeavesPerLate: "", halfDayDeductPolicy: "auto-leave",
    fullDayMode: "percent", fullDayPct: "", fullDayHrs: "", fullDayMins: "",
    fullDayPenalty: "yes", fullDayLeaveType: "", fullDayLeavesDeduct: "",
    fullDayLeavesPerLate: "", fullDayDeductPolicy: "auto-leave",
    weeklyHrs: "", weeklyMins: "",
    weeklyPenalty: "yes", weeklyLeaveType: "", weeklyLeavesDeduct: "",
    weeklyLeavesPerLate: "", weeklyDeductPolicy: "auto-leave",
  });

  const set = (key, val) => setData(prev => ({ ...prev, [key]: val }));

  const iStyle = { width: "100%", padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", color: "#374151", background: "#fff", outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  const selStyle = { ...iStyle, appearance: "none", WebkitAppearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", paddingRight: "36px", cursor: "pointer" };
  const leaveOpts = ["Casual Leave", "Sick Leave", "Earned Leave", "Unpaid Leave"];
  const numOpts = ["0.5", "1", "1.5", "2"];

  /* ── helpers ── */
  const Sel = ({ label, val, onChange }) => (
    <div>
      {label && <p style={{ fontSize: "13px", color: "#374151", marginBottom: "6px", marginTop: 0 }}>{label}</p>}
      <select style={{ ...selStyle, color: val ? "#374151" : "#9ca3af" }} value={val || ""} onChange={e => onChange(e.target.value)}>
        <option value="">Choose Account</option>
        {(label && label.toLowerCase().includes("number") ? numOpts : leaveOpts).map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const HM = ({ label, hv, mv, onH, onM }) => (
    <div>
      {label && <p style={{ fontSize: "13px", color: "#374151", marginBottom: "6px", marginTop: 0 }}>{label}</p>}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <input placeholder="--" value={hv || ""} onChange={e => onH(e.target.value)} style={{ ...iStyle, width: "90px" }} />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Hrs</span>
        <input placeholder="--" value={mv || ""} onChange={e => onM(e.target.value)} style={{ ...iStyle, width: "90px" }} />
        <span style={{ fontSize: "12px", color: "#6b7280" }}>Mins</span>
      </div>
    </div>
  );

  const RadioDot = ({ checked, onClick }) => (
    <div onClick={onClick} style={{ width: "20px", height: "20px", borderRadius: "50%", border: checked ? "2px solid #2563eb" : "2px solid #9ca3af", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: "12px", cursor: "pointer" }}>
      {checked && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#2563eb" }} />}
    </div>
  );

  const Tick = ({ on }) => (
    <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: on ? "#16a34a" : "transparent", border: on ? "none" : "2px solid #9ca3af", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginLeft: "12px" }}>
      {on ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7L5.5 10.5L12 3.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        : <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#e5e7eb" }} />}
    </div>
  );

  /* flat row with radio on right */
  const FRow = ({ label, selected, onClick, isLast, children }) => (
    <div>
      <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", cursor: "pointer", borderBottom: (selected && children) || !isLast ? "1px solid #e5e7eb" : "none" }}>
        <span style={{ fontSize: "14px", color: "#374151", lineHeight: "1.5" }}>{label}</span>
        <RadioDot checked={selected} onClick={onClick} />
      </div>
      {selected && children && <div style={{ padding: "14px 18px 18px", background: "#f9fafb", borderBottom: isLast ? "none" : "1px solid #e5e7eb" }} onClick={e => e.stopPropagation()}>{children}</div>}
    </div>
  );

  /* big top card (yes/no toggle, tick on right) */
  const TCard = ({ label, selected, onClick, children }) => (
    <div style={{ border: "1px solid #d1d5db", borderRadius: "8px", overflow: "hidden", marginBottom: "8px" }}>
      <div onClick={onClick} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: selected ? "#e0f2fe" : "#fff", cursor: "pointer" }}>
        <span style={{ fontSize: "14px", fontWeight: "500", color: "#111827", lineHeight: "1.5" }}>{label}</span>
        <Tick on={selected} />
      </div>
      {selected && children && <div style={{ background: "#f3f4f6", padding: "20px 24px", borderTop: "1px solid #e5e7eb" }} onClick={e => e.stopPropagation()}>{children}</div>}
    </div>
  );

  /* flat option group card */
  const FGroup = ({ children }) => (
    <div style={{ border: "1px solid #d1d5db", borderRadius: "8px", overflow: "hidden", background: "#fff" }}>{children}</div>
  );

  /* blue question */
  const Q = ({ text }) => <p style={{ fontSize: "14px", color: "#2563eb", fontWeight: "500", marginBottom: "10px", marginTop: 0, lineHeight: "1.55" }}>{text}</p>;

  /* deduction policy inline radio group */
  const DeductPolicy = ({ val, onChange }) => (
    <div style={{ marginTop: "10px" }}>
      <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", marginTop: 0 }}>Deduction Policy</p>
      <FGroup>
        <FRow label="Deduct automatically and notify employee, approvers and admin" selected={val === "auto-notify"} onClick={() => onChange("auto-notify")} />
        <FRow label="Automatically send a leave request on behalf of the employee, using the leave approval workflow" selected={val === "auto-leave"} onClick={() => onChange("auto-leave")} isLast />
      </FGroup>
    </div>
  );

  /* penalty leave block inline (yes / no-notify / no-absent) */
  const PenaltyBlock = ({ q, penVal, setPen, ltVal, setLt, ldVal, setLd, lplVal, setLpl, dpVal, setDp }) => (
    <div style={{ marginTop: "10px" }}>
      <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", marginTop: 0 }}>{q}</p>
      <FGroup>
        <FRow label="Yes" selected={penVal === "yes"} onClick={() => setPen("yes")}>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Sel label="Choose leave type" val={ltVal} onChange={setLt} />
            <Sel label="Number of leaves to deduct" val={ldVal} onChange={setLd} />
            <Sel label="Number of leaves to deduct per Late day after the first time" val={lplVal} onChange={setLpl} />
            <DeductPolicy val={dpVal} onChange={setDp} />
          </div>
        </FRow>
        <FRow label="No (Manager will be notified about this breach but no action will be taken)" selected={penVal === "no-notify"} onClick={() => setPen("no-notify")} />
        <FRow label="No (Mark the employee as absent)" selected={penVal === "no-absent"} onClick={() => setPen("no-absent")} isLast />
      </FGroup>
    </div>
  );

  /* preview row */
  const PRow = ({ label, value }) => (!value || value === "—") ? null : (
    <div style={{ display: "flex", gap: "16px", padding: "10px 0", borderBottom: "1px solid #f3f4f6" }}>
      <span style={{ fontSize: "13px", color: "#6b7280", minWidth: "240px", flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: "13px", color: "#111827", fontWeight: "500" }}>{value}</span>
    </div>
  );
  const PSec = ({ title, icon, children }) => (
    <div style={{ marginBottom: "20px", background: "#fff", border: "1px solid #e5e7eb", borderRadius: "10px", overflow: "hidden" }}>
      <div style={{ padding: "13px 20px", background: "#f8fafc", borderBottom: "1px solid #e5e7eb", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "16px" }}>{icon}</span>
        <span style={{ fontSize: "14px", fontWeight: "700", color: "#1e3a5f" }}>{title}</span>
      </div>
      <div style={{ padding: "8px 20px 12px" }}>{children}</div>
    </div>
  );

  /* label lookup maps */
  const noShowMap = { forgot: "Assume employee forgot to clock attendance", "assume-leave": "Assume employee was on Leave" };
  const leaveSubMap = { "create-request": "Create a leave request on behalf of employee", "auto-deduct": "Automatically deduct the employee's leave" };
  const lateTypeMap = { "grace-hours": "Based on exceeding Grace Hours", "grace-counts": "Based on exceeding Grace Counts" };
  const gracePenMap = { "deduct-refill": "Deduct leaves & refill grace hours", "deduct-no-refill": "Deduct leaves, no refill — all subsequent Late-Marks deducted" };
  const dpMap = { "auto-notify": "Deduct automatically & notify", "auto-leave": "Auto send leave request via approval workflow" };
  const penMap = { yes: "Yes – Deduct leaves", "no-notify": "No – Notify manager only", "no-absent": "No – Mark as absent" };
  const yNo = v => v === "yes" ? "Yes" : v === "no" ? "No" : (v || "—");

  return (
    <div style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", background: "#f9fafb", minHeight: "100vh", paddingBottom: "80px" }}>

      {/* ════ STEP BAR ════ */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "22px 32px 14px", borderBottom: "1px solid #e2e8f0", background: "#fff", position: "sticky", top: 0, zIndex: 10 }}>
        {[{ id: 1, label: "Describe" }, { id: 2, label: "Work Request" }, { id: 3, label: "Absenteeism" }, { id: 4, label: "Punctuality" }, { id: 5, label: "Time At Work" }, { id: 6, label: "Preview" }].map((s, i, arr) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: i < arr.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "5px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: s.id <= step ? "#2563eb" : "#e2e8f0", outline: s.id === step ? "3px solid #bfdbfe" : "none", outlineOffset: "1px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "600", color: s.id <= step ? "#fff" : "#9ca3af", flexShrink: 0 }}>{s.id}</div>
              <span style={{ fontSize: "11px", fontWeight: s.id === step ? "700" : "400", whiteSpace: "nowrap", color: s.id === step ? "#2563eb" : s.id > step ? "#9ca3af" : "#374151" }}>{s.label}</span>
            </div>
            {i < arr.length - 1 && <div style={{ flex: 1, height: "1.5px", background: s.id < step ? "#2563eb" : "#d1d5db", margin: "0 4px", marginBottom: "18px" }} />}
          </div>
        ))}
      </div>

      {/* ════ PAGE CONTENT ════ */}
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "32px 28px" }}>

        {/* ── STEP 1: Describe ── */}
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Policy Name</label>
              <input placeholder="Enter policy name" value={data.policyName} onChange={e => set("policyName", e.target.value)} style={iStyle} />
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "500", color: "#374151", display: "block", marginBottom: "6px" }}>Lets write a brief description about this policy</label>
              <textarea placeholder="Write a description..." value={data.policyDesc} onChange={e => set("policyDesc", e.target.value)} rows={4} style={{ ...iStyle, resize: "vertical" }} />
            </div>
          </div>
        )}

        {/* ── STEP 2: Work Request ── */}
        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
              <Q text="Define request limit for Work From Home (WFH) or Out Duty (OD) requests (optional)" />
              <FGroup>
                <FRow label="Work From Home" selected={data.wfhOd === "wfh"} onClick={() => set("wfhOd", "wfh")}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <input placeholder="Number of requests" value={data.wfhCount} onChange={e => set("wfhCount", e.target.value)} style={{ ...iStyle, width: "200px" }} />
                    <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>How many requests can an employee send each month?</p>
                  </div>
                </FRow>
                <FRow label="Select as a back-up decision maker" selected={data.wfhOd === "backup"} onClick={() => set("wfhOd", "backup")} isLast>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <input placeholder="Number of requests" value={data.backupCount} onChange={e => set("backupCount", e.target.value)} style={{ ...iStyle, width: "200px" }} />
                    <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>How many requests can an employee send each month?</p>
                  </div>
                </FRow>
              </FGroup>
            </div>
            <div>
              <Q text="Do you wish to restrict employees to send attendance request for a month?" />
              <FGroup>
                <FRow label="Yes" selected={data.restrictRequests === "yes"} onClick={() => set("restrictRequests", "yes")}>
                  <div>
                    <p style={{ fontSize: "13px", color: "#374151", marginBottom: "6px", marginTop: 0 }}>Number of requests to restrict</p>
                    <input placeholder="--" value={data.restrictCount} onChange={e => set("restrictCount", e.target.value)} style={{ ...iStyle, width: "160px" }} />
                  </div>
                </FRow>
                <FRow label="No" selected={data.restrictRequests === "no"} onClick={() => set("restrictRequests", "no")} isLast />
              </FGroup>
            </div>
          </div>
        )}

        {/* ── STEP 3: Absenteeism ── */}
        {step === 3 && (
          <div>
            <Q text="Do you wish to take auto-actions when an employee's logs are not available for a day?" />
            <div style={{ border: "1px solid #d1d5db", borderRadius: "8px", overflow: "hidden" }}>
              {/* YES */}
              <div onClick={() => set("autoActions", "yes")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: data.autoActions === "yes" ? "#e0f2fe" : "#fff", cursor: "pointer", borderBottom: "1px solid #d1d5db" }}>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#111827" }}>Yes</span>
                <Tick on={data.autoActions === "yes"} />
              </div>
              {data.autoActions === "yes" && (
                <div style={{ background: "#f3f4f6", padding: "20px 24px", borderBottom: "1px solid #d1d5db" }} onClick={e => e.stopPropagation()}>
                  <Q text="How would you like us to handle No-show situations, when employees don't clock-in for the day and havent applied for any Leave request either?" />
                  <FGroup>
                    <FRow label="Assume employee forgot to clock attendance" selected={data.noShowAction === "forgot"} onClick={() => set("noShowAction", "forgot")} />
                    <FRow label="Assume employee was on Leave" selected={data.noShowAction === "assume-leave"} onClick={() => set("noShowAction", "assume-leave")} isLast>
                      <FGroup>
                        <FRow label="Create a leave request on behalf of the employee" selected={data.leaveSubAction === "create-request"} onClick={() => set("leaveSubAction", "create-request")}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <Sel label="Choose leave type" val={data.absentLeaveType} onChange={v => set("absentLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.absentLeavesDeduct} onChange={v => set("absentLeavesDeduct", v)} />
                          </div>
                        </FRow>
                        <FRow label="Automatically deduct the employee's leave" selected={data.leaveSubAction === "auto-deduct"} onClick={() => set("leaveSubAction", "auto-deduct")} isLast>
                          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                            <Sel label="Choose leave type" val={data.absentLeaveType} onChange={v => set("absentLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.absentLeavesDeduct} onChange={v => set("absentLeavesDeduct", v)} />
                          </div>
                        </FRow>
                      </FGroup>
                    </FRow>
                  </FGroup>
                </div>
              )}
              {/* NO */}
              <div onClick={() => set("autoActions", "no")} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 20px", background: data.autoActions === "no" ? "#e0f2fe" : "#fff", cursor: "pointer" }}>
                <span style={{ fontSize: "15px", fontWeight: "500", color: "#111827" }}>No</span>
                <Tick on={data.autoActions === "no"} />
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4: Punctuality ── */}
        {step === 4 && (
          <div>
            <Q text="Do you wish to identify/track or penalize late-comers in any way?" />
            <TCard label="Yes" selected={data.lateComers === "yes"} onClick={() => set("lateComers", "yes")}>
              <FGroup>
                {/* Grace Hours */}
                <FRow label="Late marks will be counted on exceeding grace hours" selected={data.lateType === "grace-hours"} onClick={() => set("lateType", "grace-hours")}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <HM label="Monthly grace hours employees get is" hv={data.graceHrs} mv={data.graceMins} onH={v => set("graceHrs", v)} onM={v => set("graceMins", v)} />
                    <HM label="Each grace count must trigger after" hv={data.graceTriggerHrs} mv={data.graceTriggerMins} onH={v => set("graceTriggerHrs", v)} onM={v => set("graceTriggerMins", v)} />
                    <HM label="Maximum allowed duration" hv={data.graceMaxHrs} mv={data.graceMaxMins} onH={v => set("graceMaxHrs", v)} onM={v => set("graceMaxMins", v)} />
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", marginTop: 0 }}>What will be the penalty on late-marks after exhausting the Grace hours</p>
                      <FGroup>
                        <FRow label="Deduct leaves and refill grace hours back to full capacity" selected={data.gracePenalty === "deduct-refill"} onClick={() => set("gracePenalty", "deduct-refill")}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Sel label="Choose leave type" val={data.gracePenaltyLeaveType} onChange={v => set("gracePenaltyLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.gracePenaltyLeavesDeduct} onChange={v => set("gracePenaltyLeavesDeduct", v)} />
                            <DeductPolicy val={data.gracePenaltyDeductPolicy} onChange={v => set("gracePenaltyDeductPolicy", v)} />
                          </div>
                        </FRow>
                        <FRow label="Deduct leaves but do not refill grace hours, and consider every following Late-Mark eligible for deduction too (till month end), as per below:" selected={data.gracePenalty === "deduct-no-refill"} onClick={() => set("gracePenalty", "deduct-no-refill")} isLast>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Sel label="Choose leave type" val={data.gracePenaltyLeaveType} onChange={v => set("gracePenaltyLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.gracePenaltyLeavesDeduct} onChange={v => set("gracePenaltyLeavesDeduct", v)} />
                            <Sel label="Number of leaves to deduct per Late day after the first time" val={data.gracePenaltyPerLateDay} onChange={v => set("gracePenaltyPerLateDay", v)} />
                            <DeductPolicy val={data.gracePenaltyDeductPolicy} onChange={v => set("gracePenaltyDeductPolicy", v)} />
                          </div>
                        </FRow>
                      </FGroup>
                    </div>
                  </div>
                </FRow>
                {/* Grace Counts */}
                <FRow label="Late marks will be counted on exceeding grace counts" selected={data.lateType === "grace-counts"} onClick={() => set("lateType", "grace-counts")} isLast>
                  <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                    <div>
                      <p style={{ fontSize: "13px", color: "#374151", marginBottom: "6px", marginTop: 0 }}>Number of grace counts available in a month is</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <input placeholder="--" value={data.graceCountNum} onChange={e => set("graceCountNum", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>Count</span>
                      </div>
                    </div>
                    <HM label="Each grace count must trigger after" hv={data.graceCountTriggerHrs} mv={data.graceCountTriggerMins} onH={v => set("graceCountTriggerHrs", v)} onM={v => set("graceCountTriggerMins", v)} />
                    <HM label="Maximum allowed duration" hv={data.graceCountMaxHrs} mv={data.graceCountMaxMins} onH={v => set("graceCountMaxHrs", v)} onM={v => set("graceCountMaxMins", v)} />
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                        <input placeholder="--" value={data.graceUsageCount} onChange={e => set("graceUsageCount", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                        <span style={{ fontSize: "12px", color: "#6b7280" }}>Usage Count</span>
                      </div>
                      <p style={{ fontSize: "13px", color: "#374151", margin: 0 }}>Exceeding max limit will be considered as additional</p>
                    </div>
                    <div>
                      <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", marginBottom: "8px", marginTop: 0 }}>What will be the penalty after exceeding the grace counts available in a month?</p>
                      <FGroup>
                        <FRow label="Deduct leaves and refill grace hours back to full capacity" selected={data.gracePenalty === "deduct-refill"} onClick={() => set("gracePenalty", "deduct-refill")}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Sel label="Choose leave type" val={data.gracePenaltyLeaveType} onChange={v => set("gracePenaltyLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.gracePenaltyLeavesDeduct} onChange={v => set("gracePenaltyLeavesDeduct", v)} />
                            <DeductPolicy val={data.gracePenaltyDeductPolicy} onChange={v => set("gracePenaltyDeductPolicy", v)} />
                          </div>
                        </FRow>
                        <FRow label="Deduct leaves but do not refill grace hours, and consider every following Late-Mark eligible for deduction too (till month end), as per below:" selected={data.gracePenalty === "deduct-no-refill"} onClick={() => set("gracePenalty", "deduct-no-refill")}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                            <Sel label="Choose leave type" val={data.gracePenaltyLeaveType} onChange={v => set("gracePenaltyLeaveType", v)} />
                            <Sel label="Number of leaves to deduct" val={data.gracePenaltyLeavesDeduct} onChange={v => set("gracePenaltyLeavesDeduct", v)} />
                            <Sel label="Number of leaves to deduct per Late day after the first time" val={data.gracePenaltyPerLateDay} onChange={v => set("gracePenaltyPerLateDay", v)} />
                            <DeductPolicy val={data.gracePenaltyDeductPolicy} onChange={v => set("gracePenaltyDeductPolicy", v)} />
                          </div>
                        </FRow>
                        <FRow label="No penalty or deductions for exhausting Grace counts. Just record the Late-Marks based on the grace count's configured breach-time limit." selected={false} onClick={() => {}} isLast />
                      </FGroup>
                    </div>
                  </div>
                </FRow>
              </FGroup>
            </TCard>
            <TCard label="No" selected={data.lateComers === "no"} onClick={() => set("lateComers", "no")} />
          </div>
        )}

        {/* ── STEP 5: Time At Work ── */}
        {step === 5 && (
          <div>
            <Q text="Do you wish to set time at work requirements for your company? Here you can specify number of hours an employee needs to be at-work in order to meet the company's attendance expectations." />
            <TCard label="Yes, employees are required to work minimum hours, and penalties will be set for not meeting this requirement" selected={data.timeReq === "yes-daily"} onClick={() => set("timeReq", "yes-daily")}>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {/* Daily header */}
                <div style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: "8px", padding: "12px 16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: 0 }}>⊙ Employees are required to work minimum hours, every day</p>
                </div>
                {/* Half day */}
                <div style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: "0 0 8px" }}>⊙ Required time-at-work for Half-working day, and penalty (if any) in case of deficit</p>
                  <p style={{ fontSize: "13px", color: "#374151", margin: "0 0 10px" }}>Minimum duration required to count the work-day as a Half day</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="radio" checked={data.halfDayMode === "percent"} onChange={() => set("halfDayMode", "percent")} style={{ accentColor: "#2563eb" }} />
                      <input placeholder="--" value={data.halfDayPct} onChange={e => set("halfDayPct", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>% of Shift's total duration</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="radio" checked={data.halfDayMode === "hrs"} onChange={() => set("halfDayMode", "hrs")} style={{ accentColor: "#2563eb" }} />
                      <input placeholder="--" value={data.halfDayHrs} onChange={e => set("halfDayHrs", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Hrs</span>
                      <input placeholder="--" value={data.halfDayMins} onChange={e => set("halfDayMins", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Mins</span>
                    </div>
                  </div>
                  <PenaltyBlock q="Do you want to deduct leaves as penalty if the employee is unable to complete the required minimum hours for Half-working day?" penVal={data.halfDayPenalty} setPen={v => set("halfDayPenalty", v)} ltVal={data.halfDayLeaveType} setLt={v => set("halfDayLeaveType", v)} ldVal={data.halfDayLeavesDeduct} setLd={v => set("halfDayLeavesDeduct", v)} lplVal={data.halfDayLeavesPerLate} setLpl={v => set("halfDayLeavesPerLate", v)} dpVal={data.halfDayDeductPolicy} setDp={v => set("halfDayDeductPolicy", v)} />
                </div>
                {/* Full day */}
                <div style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: "0 0 8px" }}>⊙ Required time-at-work for Full-working day, and penalty (if any) in case of deficit</p>
                  <p style={{ fontSize: "13px", color: "#374151", margin: "0 0 10px" }}>Minimum duration required to count the work-day as a Full day</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "12px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="radio" checked={data.fullDayMode === "percent"} onChange={() => set("fullDayMode", "percent")} style={{ accentColor: "#2563eb" }} />
                      <input placeholder="--" value={data.fullDayPct} onChange={e => set("fullDayPct", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>% of Shift's total duration</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <input type="radio" checked={data.fullDayMode === "hrs"} onChange={() => set("fullDayMode", "hrs")} style={{ accentColor: "#2563eb" }} />
                      <input placeholder="--" value={data.fullDayHrs} onChange={e => set("fullDayHrs", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Hrs</span>
                      <input placeholder="--" value={data.fullDayMins} onChange={e => set("fullDayMins", e.target.value)} style={{ ...iStyle, width: "90px" }} />
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>Mins</span>
                    </div>
                  </div>
                  <PenaltyBlock q="Do you want to deduct leaves as penalty if the employee is unable to complete the required minimum hours for Full-working day?" penVal={data.fullDayPenalty} setPen={v => set("fullDayPenalty", v)} ltVal={data.fullDayLeaveType} setLt={v => set("fullDayLeaveType", v)} ldVal={data.fullDayLeavesDeduct} setLd={v => set("fullDayLeavesDeduct", v)} lplVal={data.fullDayLeavesPerLate} setLpl={v => set("fullDayLeavesPerLate", v)} dpVal={data.fullDayDeductPolicy} setDp={v => set("fullDayDeductPolicy", v)} />
                </div>
                {/* Weekly */}
                <div style={{ background: "#fff", border: "1px solid #d1d5db", borderRadius: "8px", padding: "16px" }}>
                  <p style={{ fontSize: "13px", fontWeight: "600", color: "#374151", margin: "0 0 12px" }}>⊙ Employees are required to work minimum hours, every week</p>
                  <HM label="Required time-at-work or hours for one week, and penalty (if any) in case of deficit" hv={data.weeklyHrs} mv={data.weeklyMins} onH={v => set("weeklyHrs", v)} onM={v => set("weeklyMins", v)} />
                  <PenaltyBlock q="Do you want to deduct leaves as penalty if the employee is unable to complete the required minimum hours?" penVal={data.weeklyPenalty} setPen={v => set("weeklyPenalty", v)} ltVal={data.weeklyLeaveType} setLt={v => set("weeklyLeaveType", v)} ldVal={data.weeklyLeavesDeduct} setLd={v => set("weeklyLeavesDeduct", v)} lplVal={data.weeklyLeavesPerLate} setLpl={v => set("weeklyLeavesPerLate", v)} dpVal={data.weeklyDeductPolicy} setDp={v => set("weeklyDeductPolicy", v)} />
                </div>
              </div>
            </TCard>
            <TCard label="No, there is no time-at-work requirement. Employees can spend any amount of time at work, even if it's less than their stipulated shift-duration" selected={data.timeReq === "no"} onClick={() => set("timeReq", "no")} />
          </div>
        )}

        {/* ── STEP 6: Preview ── */}
        {step === 6 && (
          <div>
            <div style={{ marginBottom: "24px", textAlign: "center" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", color: "#111827", margin: "0 0 4px" }}>Policy Preview</h2>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>Review all your selections before saving</p>
            </div>

            <PSec title="Basic Info" icon="📋">
              <PRow label="Policy Name" value={data.policyName || "—"} />
              <PRow label="Description" value={data.policyDesc || "—"} />
            </PSec>

            <PSec title="Work Request" icon="🏠">
              <PRow label="WFH / OD Request Type" value={data.wfhOd === "wfh" ? "Work From Home" : data.wfhOd === "backup" ? "Back-up Decision Maker" : "—"} />
              {data.wfhOd === "wfh" && <PRow label="Max WFH Requests / Month" value={data.wfhCount || "—"} />}
              {data.wfhOd === "backup" && <PRow label="Max Backup Requests / Month" value={data.backupCount || "—"} />}
              <PRow label="Restrict Attendance Requests" value={yNo(data.restrictRequests)} />
              {data.restrictRequests === "yes" && <PRow label="Max Requests Allowed / Month" value={data.restrictCount || "—"} />}
            </PSec>

            <PSec title="Absenteeism" icon="📅">
              <PRow label="Auto-actions for No-show" value={yNo(data.autoActions)} />
              {data.autoActions === "yes" && <>
                <PRow label="No-show Handling" value={noShowMap[data.noShowAction] || "—"} />
                {data.noShowAction === "assume-leave" && <>
                  <PRow label="Leave Action" value={leaveSubMap[data.leaveSubAction] || "—"} />
                  <PRow label="Leave Type" value={data.absentLeaveType || "—"} />
                  <PRow label="Leaves to Deduct" value={data.absentLeavesDeduct || "—"} />
                </>}
              </>}
            </PSec>

            <PSec title="Punctuality" icon="⏰">
              <PRow label="Track / Penalize Late-comers" value={yNo(data.lateComers)} />
              {data.lateComers === "yes" && <>
                <PRow label="Late Mark Tracking" value={lateTypeMap[data.lateType] || "—"} />
                {data.lateType === "grace-hours" && <>
                  <PRow label="Monthly Grace Hours" value={(data.graceHrs || data.graceMins) ? `${data.graceHrs || "0"} Hrs ${data.graceMins || "0"} Mins` : "—"} />
                  <PRow label="Grace Trigger After" value={(data.graceTriggerHrs || data.graceTriggerMins) ? `${data.graceTriggerHrs || "0"} Hrs ${data.graceTriggerMins || "0"} Mins` : "—"} />
                  <PRow label="Max Allowed Duration" value={(data.graceMaxHrs || data.graceMaxMins) ? `${data.graceMaxHrs || "0"} Hrs ${data.graceMaxMins || "0"} Mins` : "—"} />
                  <PRow label="Penalty After Grace Exhausted" value={gracePenMap[data.gracePenalty] || "—"} />
                  <PRow label="Leave Type for Penalty" value={data.gracePenaltyLeaveType || "—"} />
                  <PRow label="Leaves to Deduct" value={data.gracePenaltyLeavesDeduct || "—"} />
                  {data.gracePenalty === "deduct-no-refill" && <PRow label="Leaves per Late Day" value={data.gracePenaltyPerLateDay || "—"} />}
                  <PRow label="Deduction Policy" value={dpMap[data.gracePenaltyDeductPolicy] || "—"} />
                </>}
                {data.lateType === "grace-counts" && <>
                  <PRow label="Grace Counts / Month" value={data.graceCountNum || "—"} />
                  <PRow label="Usage Count Limit" value={data.graceUsageCount || "—"} />
                </>}
              </>}
            </PSec>

            <PSec title="Time At Work" icon="⏱️">
              <PRow label="Time-at-Work Requirement" value={data.timeReq === "yes-daily" ? "Yes – Minimum hours required with penalties" : data.timeReq === "no" ? "No – No time-at-work requirement" : "—"} />
              {data.timeReq === "yes-daily" && <>
                <PRow label="Half-Day Min Duration" value={data.halfDayMode === "percent" ? (data.halfDayPct ? `${data.halfDayPct}% of shift duration` : "—") : (data.halfDayHrs || data.halfDayMins) ? `${data.halfDayHrs || "0"} Hrs ${data.halfDayMins || "0"} Mins` : "—"} />
                <PRow label="Half-Day Penalty" value={penMap[data.halfDayPenalty] || "—"} />
                {data.halfDayPenalty === "yes" && <>
                  <PRow label="Half-Day Leave Type" value={data.halfDayLeaveType || "—"} />
                  <PRow label="Half-Day Leaves to Deduct" value={data.halfDayLeavesDeduct || "—"} />
                  <PRow label="Half-Day Deduction Policy" value={dpMap[data.halfDayDeductPolicy] || "—"} />
                </>}
                <PRow label="Full-Day Min Duration" value={data.fullDayMode === "percent" ? (data.fullDayPct ? `${data.fullDayPct}% of shift duration` : "—") : (data.fullDayHrs || data.fullDayMins) ? `${data.fullDayHrs || "0"} Hrs ${data.fullDayMins || "0"} Mins` : "—"} />
                <PRow label="Full-Day Penalty" value={penMap[data.fullDayPenalty] || "—"} />
                {data.fullDayPenalty === "yes" && <>
                  <PRow label="Full-Day Leave Type" value={data.fullDayLeaveType || "—"} />
                  <PRow label="Full-Day Leaves to Deduct" value={data.fullDayLeavesDeduct || "—"} />
                  <PRow label="Full-Day Deduction Policy" value={dpMap[data.fullDayDeductPolicy] || "—"} />
                </>}
                <PRow label="Weekly Required Hours" value={(data.weeklyHrs || data.weeklyMins) ? `${data.weeklyHrs || "0"} Hrs ${data.weeklyMins || "0"} Mins` : "—"} />
                <PRow label="Weekly Penalty" value={penMap[data.weeklyPenalty] || "—"} />
                {data.weeklyPenalty === "yes" && <>
                  <PRow label="Weekly Leave Type" value={data.weeklyLeaveType || "—"} />
                  <PRow label="Weekly Leaves to Deduct" value={data.weeklyLeavesDeduct || "—"} />
                  <PRow label="Weekly Deduction Policy" value={dpMap[data.weeklyDeductPolicy] || "—"} />
                </>}
              </>}
            </PSec>
          </div>
        )}
      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #e5e7eb", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 20 }}>
        <div style={{ display: "flex", gap: "12px" }}>
          <button style={{ padding: "10px 20px", background: "transparent", color: "#374151", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Cancel</button>
          <button style={{ padding: "10px 20px", background: "transparent", color: "#2563eb", border: "1.5px solid #2563eb", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Save As Draft</button>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {step > 1 && <button onClick={() => setStep(s => Math.max(1, s - 1))} style={{ padding: "10px 24px", background: "transparent", color: "#2563eb", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>Previous</button>}
          <button onClick={() => setStep(s => Math.min(6, s + 1))} style={{ padding: "10px 28px", background: "#2563eb", color: "#fff", border: "none", borderRadius: "6px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>{step === 6 ? "Save Policy" : "Next"}</button>
        </div>
      </div>

    </div>
  );
}