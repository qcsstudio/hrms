import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../utils/axios.config";

// ─── Data ────────────────────────────────────────────────────────────────────

const steps = [
  { id: 1, title: "Cycle Setup",        desc: "Name, type, dates, applicability" },
  { id: 2, title: "Reviewers",          desc: "Categories, weightage & selection" },
  { id: 3, title: "Competencies",       desc: "Choose competency framework" },
  { id: 4, title: "Form Sections",      desc: "Sections & questions (PDF spec)" },
  { id: 5, title: "Workflow & Controls",desc: "Approvals, controls, notifications" },
  { id: 6, title: "Preview",            desc: "Review and launch" },
];

const cycleTypes = [
  "Annual Appraisal","Mid-Year Review","Probation Review",
  "Promotion Review","Leadership Review","Special Review",
];

const reviewerCats = [
  { key: "manager",      label: "Reporting Manager",                      default: 40, anon: false },
  { key: "peers",        label: "Peers",                                  default: 20, anon: true  },
  { key: "subordinates", label: "Subordinates",                           default: 20, anon: true  },
  { key: "self",         label: "Self",                                   default: 10, anon: false },
  { key: "others",       label: "Other Stakeholders / Internal Customers",default: 10, anon: true  },
];

const competencies = [
  "Leadership","Teamwork","Communication","Accountability",
  "Problem-solving","Customer focus","Innovation","Discipline","Technical competency",
];

const formSections = [
  { title: "Section 1 – Communication Skills", questions: ["Communicates clearly and effectively","Listens actively to others","Shares information promptly","Maintains professional communication"] },
  { title: "Section 2 – Teamwork and Collaboration", questions: ["Works well with colleagues","Supports team members when needed","Demonstrates respect for others","Contributes positively to team goals"] },
  { title: "Section 3 – Leadership and Initiative", questions: ["Takes ownership of responsibilities","Demonstrates leadership qualities","Makes sound decisions","Shows initiative in solving problems"] },
  { title: "Section 4 – Job Knowledge and Performance", questions: ["Has strong knowledge of the job role","Completes work accurately","Meets deadlines consistently","Produces high-quality work"] },
  { title: "Section 5 – Customer Focus / Service Orientation", questions: ["Responds effectively to customer needs","Maintains positive relationships","Handles complaints professionally","Demonstrates commitment to service quality"] },
  { title: "Section 6 – Personal Attributes", questions: ["Demonstrates integrity and honesty","Is dependable","Adapts well to change","Maintains a positive attitude"] },
];

const ratingScale = [
  { score: 1, meaning: "Poor" },
  { score: 2, meaning: "Needs Improvement" },
  { score: 3, meaning: "Meets Expectations" },
  { score: 4, meaning: "Exceeds Expectations" },
  { score: 5, meaning: "Outstanding" },
];

const overallAssessmentQs = [
  "What are the employee's main strengths?",
  "What areas require improvement?",
  "What training or development is recommended?",
  "Is this employee ready for higher responsibilities? (Yes/No)",
  "Additional comments",
];

// ─── Tiny primitives (no external imports) ───────────────────────────────────

function Toggle({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 44, height: 24, borderRadius: 12,
        background: checked ? "#3b5bdb" : "#d1d5db",
        position: "relative", cursor: "pointer",
        transition: "background .2s", flexShrink: 0,
      }}
    >
      <div style={{
        position: "absolute", top: 3,
        left: checked ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left .18s",
        boxShadow: "0 1px 4px rgba(0,0,0,.18)",
      }} />
    </div>
  );
}

function Checkbox({ checked, onChange }) {
  return (
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer",
        border: checked ? "none" : "1.5px solid #d1d5db",
        background: checked ? "#3b5bdb" : "#fff",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "background .15s",
      }}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 4L4 7L10 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    </div>
  );
}

function Badge({ children, color = "outline" }) {
  const styles = {
    outline: { border: "1px solid #e5e7eb", background: "#f9fafb", color: "#374151" },
    blue:    { border: "none", background: "#3b5bdb", color: "#fff" },
    green:   { border: "none", background: "#d1fae5", color: "#065f46" },
    red:     { border: "none", background: "#fee2e2", color: "#991b1b" },
  };
  return (
    <span style={{
      display: "inline-block", fontSize: 12, fontWeight: 600,
      borderRadius: 20, padding: "3px 11px",
      ...styles[color],
    }}>{children}</span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PerformanceSurveyCreate360() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  // Step 1
  const [name, setName]             = useState("");
  const [desc, setDesc]             = useState("");
  const [cycleType, setCycleType]   = useState("Annual Appraisal");
  const [startDate, setStartDate]   = useState("");
  const [endDate, setEndDate]       = useState("");
  const [deadline, setDeadline]     = useState("");
  const [departments, setDepts]     = useState("");
  const [grades, setGrades]         = useState("");

  // Step 2
  const [weights, setWeights] = useState(Object.fromEntries(reviewerCats.map(r => [r.key, r.default])));
  const [keepAnon, setKeepAnon]         = useState(true);
  const [minRev, setMinRev]             = useState(3);
  const [maxRev, setMaxRev]             = useState(8);
  const [selHr, setSelHr]               = useState(true);
  const [selEmp, setSelEmp]             = useState(true);
  const [selMgr, setSelMgr]             = useState(true);
  const [selAuto, setSelAuto]           = useState(true);
  const [custQs, setCustQs]             = useState(3);

  // Step 3
  const [selComps, setSelComps] = useState(["Leadership","Teamwork","Communication","Accountability","Problem-solving"]);

  // Step 4
  const [enabledSec, setEnabledSec]     = useState(formSections.map((_, i) => i));
  const [inclOverall, setInclOverall]   = useState(true);
  const [autoSummary, setAutoSummary]   = useState(true);

  // Step 5
  const [reqHr, setReqHr]               = useState(true);
  const [reqDept, setReqDept]           = useState(false);
  const [autoSave, setAutoSave]         = useState(true);
  const [audit, setAudit]               = useState(true);
  const [rbac, setRbac]                 = useState(true);
  const [expExcel, setExpExcel]         = useState(true);
  const [expPdf, setExpPdf]             = useState(true);
  const [mobile, setMobile]             = useState(true);
  const [notifEmail, setNotifEmail]     = useState(true);
  const [notifApp, setNotifApp]         = useState(true);
  const [notifSms, setNotifSms]         = useState(false);
  const [reminderDays, setReminderDays] = useState(3);
  const [isLaunching, setIsLaunching]   = useState(false);
  const [launchError, setLaunchError]   = useState("");

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const totalQs = enabledSec.reduce((s, i) => s + formSections[i].questions.length, 0);

  const toList = (value) =>
    value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

  const buildSurveyPayload = () => ({
    name,
    description: desc,
    cycleType,
    startDate,
    endDate,
    reviewDeadline: deadline,
    applicableDepartments: toList(departments),
    applicableJobGrades: toList(grades),
    reviewerWeights: weights,
    reviewerSelection: {
      hrCanNominate: selHr,
      employeeCanSuggest: selEmp,
      managerApproves: selMgr,
      autoAllocateHierarchy: selAuto,
      keepAnonymous: keepAnon,
      minReviewers: minRev,
      maxReviewers: maxRev,
      customerRatingQuestions: custQs,
    },
    selectedCompetencies: selComps,
    formSections: enabledSec.map((sectionIndex, index) => ({
      title: formSections[sectionIndex].title,
      enabled: true,
      order: index + 1,
      questions: formSections[sectionIndex].questions.map((questionText) => ({
        questionText,
        ratingScale: 5,
        hasComment: true,
      })),
    })),
    overallAssessment: {
      include: inclOverall,
      questions: inclOverall ? overallAssessmentQs : [],
      autoGenerateFinalSummary: autoSummary,
    },
    workflow: {
      requireHrApproval: reqHr,
      requireDeptHeadApproval: reqDept,
      autoSaveResponses: autoSave,
      auditTrail: audit,
      roleBasedAccessControl: rbac,
      exportToExcel: expExcel,
      exportToPdf: expPdf,
      mobileFriendly: mobile,
    },
    notifications: {
      email: notifEmail,
      inApp: notifApp,
      sms: notifSms,
      reminderDaysBefore: reminderDays,
    },
    status: "draft",
    launchedAt: null,
    closedAt: null,
  });

  const handleLaunchSurvey = async () => {
    setLaunchError("");
    setIsLaunching(true);

    try {
      const response = await axiosInstance.post("/auth/SetupSurvey-preception", buildSurveyPayload(), {
        meta: { auth: "ADMIN_AUTH" },
      });
      const cycleId =
        response?.data?.data?._id ||
        response?.data?.data?.id ||
        response?.data?.data?.cycleId ||
        response?.data?.data?.surveyId ||
        response?.data?.data?.[0]?._id ||
        response?.data?.data?.[0]?.id ||
        response?.data?.data?.[0]?.cycleId ||
        response?.data?.data?.[0]?.surveyId ||
        response?.data?.survey?._id ||
        response?.data?.survey?.id ||
        response?.data?.survey?.cycleId ||
        response?.data?.survey?.surveyId ||
        response?.data?.preception?._id ||
        response?.data?.preception?.id ||
        response?.data?.preception?.cycleId ||
        response?.data?.preception?.surveyId ||
        response?.data?._id ||
        response?.data?.id ||
        response?.data?.cycleId ||
        response?.data?.surveyId ||
        "";

      if (cycleId) {
        localStorage.setItem("surveyCycleId", cycleId);
      }

      navigate("/dashboard/survey-questions", { state: { cycleId } });
    } catch (error) {
      console.error("Setup survey preception API failed:", error);
      setLaunchError(
        error?.response?.data?.message || "Survey launch failed. Please try again."
      );
    } finally {
      setIsLaunching(false);
    }
  };

  // ── Shared style tokens ──
  const T = {
    page:    { minHeight: "100vh", background: "#f3f4f6", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", padding: "28px 20px" },
    wrap:    { maxWidth: 900, margin: "0 auto" },
    card:    { background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, padding: "22px 24px", marginBottom: 18 },
    label:   { display: "block", fontSize: 12, fontWeight: 600, color: "#6b7280", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.05em" },
    input:   { width: "100%", fontSize: 13, padding: "8px 11px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#111827", outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
    select:  { width: "100%", fontSize: 13, padding: "8px 11px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#111827", outline: "none", fontFamily: "inherit", cursor: "pointer", boxSizing: "border-box" },
    tarea:   { width: "100%", fontSize: 13, padding: "8px 11px", border: "1px solid #d1d5db", borderRadius: 8, background: "#fff", color: "#111827", outline: "none", fontFamily: "inherit", resize: "vertical", minHeight: 88, lineHeight: 1.6, boxSizing: "border-box" },
    sep:     { border: "none", borderTop: "1px solid #f3f4f6", margin: "16px 0" },
    row:     { display: "flex", alignItems: "center", justifyContent: "space-between", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 14px" },
    grid2:   { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
    grid3:   { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 },
    secTitle:{ fontSize: 17, fontWeight: 700, color: "#111827", marginBottom: 16 },
    subTitle:{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 10 },
    muted:   { fontSize: 12, color: "#9ca3af" },
    tag:     { display: "inline-block", fontSize: 12, fontWeight: 500, border: "1px solid #e5e7eb", borderRadius: 6, padding: "3px 10px", margin: "2px 2px", color: "#374151", background: "#f9fafb" },
    btnOut:  { display:"inline-flex", alignItems:"center", gap:4, padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"1px solid #d1d5db", background:"#fff", color:"#374151", fontFamily:"inherit" },
    btnPri:  { display:"inline-flex", alignItems:"center", gap:4, padding:"8px 22px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"1px solid #3b5bdb", background:"#3b5bdb", color:"#fff", fontFamily:"inherit" },
    btnGrn:  { display:"inline-flex", alignItems:"center", gap:4, padding:"8px 22px", borderRadius:8, fontSize:13, fontWeight:600, cursor:"pointer", border:"1px solid #059669", background:"#059669", color:"#fff", fontFamily:"inherit" },
  };

  // ── Stepper ──
  const Stepper = () => (
    <div style={{ ...T.card, padding: "14px 20px", overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", minWidth: 620 }}>
        {steps.map((s, i) => (
          <div key={s.id} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex",
                alignItems: "center", justifyContent: "center", flexShrink: 0,
                fontSize: 12, fontWeight: 700,
                background: step > s.id ? "#10b981" : step === s.id ? "#3b5bdb" : "#f3f4f6",
                color: step >= s.id ? "#fff" : "#9ca3af",
                border: step < s.id ? "1px solid #e5e7eb" : "none",
              }}>
                {step > s.id
                  ? <svg width="12" height="10" viewBox="0 0 12 10"><path d="M1 5L4.5 8.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : s.id}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: step === s.id ? "#111827" : "#9ca3af" }}>{s.title}</div>
                <div style={{ fontSize: 10, color: "#d1d5db" }}>{s.desc}</div>
              </div>
            </div>
            {i < steps.length - 1 && <div style={{ flex: 1, height: 1, background: "#e5e7eb", margin: "0 8px" }} />}
          </div>
        ))}
      </div>
    </div>
  );

  // ── Step 1 ──
  const Step1 = () => (
    <div style={T.card}>
      <div style={T.secTitle}>Cycle Setup</div>
      <div style={{ ...T.grid2, marginBottom: 14 }}>
        <div><label style={T.label}>Cycle Name</label><input style={T.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Annual Appraisal 2026" /></div>
        <div><label style={T.label}>Cycle Type</label>
          <select style={T.select} value={cycleType} onChange={e => setCycleType(e.target.value)}>
            {cycleTypes.map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div><label style={T.label}>Start Date</label><input type="date" style={T.input} value={startDate} onChange={e => setStartDate(e.target.value)} /></div>
        <div><label style={T.label}>End Date</label><input type="date" style={T.input} value={endDate} onChange={e => setEndDate(e.target.value)} /></div>
        <div><label style={T.label}>Review Deadline</label><input type="date" style={T.input} value={deadline} onChange={e => setDeadline(e.target.value)} /></div>
        <div><label style={T.label}>Applicable Departments</label><input style={T.input} value={departments} onChange={e => setDepts(e.target.value)} placeholder="e.g. Engineering, Sales" /></div>
        <div style={{ gridColumn: "1/-1" }}><label style={T.label}>Applicable Job Grades</label><input style={T.input} value={grades} onChange={e => setGrades(e.target.value)} placeholder="e.g. L3, L4, L5" /></div>
      </div>
      <div><label style={T.label}>Description</label><textarea style={T.tarea} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Describe the purpose of this cycle..." /></div>
    </div>
  );

  // ── Step 2 ──
  const Step2 = () => (
    <div style={T.card}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <div style={T.secTitle}>Reviewer Categories & Weightage</div>
        <Badge color={totalWeight === 100 ? "blue" : "red"}>Total: {totalWeight}%</Badge>
      </div>
      <p style={{ ...T.muted, marginBottom: 14 }}>Suggested weights per spec — Manager 40%, Peers 20%, Subordinates 20%, Self 10%, Other Stakeholders 10%.</p>
      {reviewerCats.map(r => (
        <div key={r.key} style={{ ...T.row, marginBottom: 8 }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>{r.label}</div>
            {r.anon && <div style={T.muted}>Responses kept anonymous</div>}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <input type="number" value={weights[r.key]} onChange={e => setWeights({ ...weights, [r.key]: +e.target.value })}
              style={{ ...T.input, width: 72, textAlign: "center" }} />
            <span style={{ ...T.muted, width: 14 }}>%</span>
          </div>
        </div>
      ))}
      <hr style={T.sep} />
      <div style={{ ...T.subTitle }}>Reviewer Selection</div>
      <div style={{ ...T.grid2, marginBottom: 14 }}>
        {[
          { v: selHr,   set: setSelHr,   label: "HR can nominate reviewers" },
          { v: selEmp,  set: setSelEmp,  label: "Employee can suggest reviewers" },
          { v: selMgr,  set: setSelMgr,  label: "Manager approves reviewers" },
          { v: selAuto, set: setSelAuto, label: "Auto-allocate from reporting hierarchy" },
        ].map(o => (
          <label key={o.label} style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 12px", cursor: "pointer",
            background: o.v ? "rgba(59,91,219,.04)" : "#fff", borderColor: o.v ? "#3b5bdb" : "#e5e7eb" }}>
            <Checkbox checked={o.v} onChange={o.set} />
            <span style={{ fontSize: 13, color: "#111827" }}>{o.label}</span>
          </label>
        ))}
      </div>
      <div style={{ ...T.row, marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Keep peer & subordinate responses anonymous</div>
          <div style={T.muted}>Recommended by spec</div>
        </div>
        <Toggle checked={keepAnon} onChange={setKeepAnon} />
      </div>
      <div style={T.grid3}>
        <div><label style={T.label}>Minimum Reviewers</label><input type="number" style={T.input} value={minRev} onChange={e => setMinRev(+e.target.value)} /></div>
        <div><label style={T.label}>Maximum Reviewers</label><input type="number" style={T.input} value={maxRev} onChange={e => setMaxRev(+e.target.value)} /></div>
        <div>
          <label style={T.label}>Customer Rating Questions</label>
          <input type="number" style={T.input} value={custQs} onChange={e => setCustQs(+e.target.value)} />
          <div style={{ ...T.muted, marginTop: 4 }}>End customer provides N rating questions (default 3)</div>
        </div>
      </div>
    </div>
  );

  // ── Step 3 ──
  const Step3 = () => (
    <div style={T.card}>
      <div style={T.secTitle}>Select Competencies</div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 16 }}>
        Per spec: Leadership, Teamwork, Communication, Accountability, Problem-solving, Customer focus, Innovation, Discipline, Technical competency.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
        {competencies.map(c => {
          const on = selComps.includes(c);
          return (
            <label key={c} style={{ display: "flex", alignItems: "center", gap: 10, border: `1px solid ${on ? "#3b5bdb" : "#e5e7eb"}`,
              borderRadius: 8, padding: "10px 12px", cursor: "pointer", background: on ? "rgba(59,91,219,.04)" : "#fff" }}>
              <Checkbox checked={on} onChange={v => setSelComps(v ? [...selComps, c] : selComps.filter(x => x !== c))} />
              <span style={{ fontSize: 13, color: "#111827" }}>{c}</span>
            </label>
          );
        })}
      </div>
    </div>
  );

  // ── Step 4 ──
  const Step4 = () => (
    <div style={T.card}>
      <div style={T.secTitle}>Form Sections & Questions</div>
      <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 14 }}>Standard 6-section appraisal form per the 360 spec. Each question uses a 1–5 rating with comments.</p>

      {/* Rating scale */}
      <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 10, padding: "14px 16px", marginBottom: 18 }}>
        <div style={{ ...T.subTitle, marginBottom: 10 }}>Rating Scale</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
          {ratingScale.map(r => (
            <div key={r.score} style={{ textAlign: "center", border: "1px solid #e5e7eb", borderRadius: 8, padding: "10px 6px", background: "#fff" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#111827" }}>{r.score}</div>
              <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>{r.meaning}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {formSections.map((s, i) => {
          const on = enabledSec.includes(i);
          return (
            <div key={i} style={{ border: `1px solid ${on ? "#3b5bdb" : "#e5e7eb"}`, borderRadius: 10, padding: "12px 16px",
              background: on ? "rgba(59,91,219,.02)" : "#fff" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <div style={{ paddingTop: 1 }}>
                  <Checkbox checked={on} onChange={v => setEnabledSec(v ? [...enabledSec, i] : enabledSec.filter(x => x !== i))} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#111827", marginBottom: 8 }}>{s.title}</div>
                  <ul style={{ paddingLeft: 18, margin: 0 }}>
                    {s.questions.map(q => (
                      <li key={q} style={{ fontSize: 13, color: "#6b7280", marginBottom: 4, lineHeight: 1.4 }}>{q}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <hr style={T.sep} />

      {/* Overall assessment */}
      <div style={{ ...T.row, marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Include Overall Assessment (Manager)</div>
          <div style={T.muted}>Strengths, improvements, training, readiness, comments</div>
        </div>
        <Toggle checked={inclOverall} onChange={setInclOverall} />
      </div>
      {inclOverall && (
        <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 8, padding: "12px 16px", marginBottom: 10 }}>
          <ul style={{ paddingLeft: 18, margin: 0 }}>
            {overallAssessmentQs.map(q => (
              <li key={q} style={{ fontSize: 13, color: "#374151", marginBottom: 4 }}>{q}</li>
            ))}
          </ul>
        </div>
      )}
      <div style={T.row}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Auto-generate Final Summary</div>
          <div style={T.muted}>System computes overall average and per-section scores</div>
        </div>
        <Toggle checked={autoSummary} onChange={setAutoSummary} />
      </div>
    </div>
  );

  // ── Step 5 ──
  const Step5 = () => (
    <div style={T.card}>
      <div style={T.secTitle}>Workflow, Controls & Notifications</div>

      <div style={{ ...T.subTitle }}>Approval Workflow</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        <div style={T.row}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Require HR Approval</div>
            <div style={T.muted}>HR approves and closes the cycle</div>
          </div>
          <Toggle checked={reqHr} onChange={setReqHr} />
        </div>
        <div style={T.row}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Require Department Head Approval</div>
          <Toggle checked={reqDept} onChange={setReqDept} />
        </div>
      </div>

      <hr style={T.sep} />
      <div style={T.subTitle}>Important Controls</div>
      <div style={{ ...T.grid2, marginBottom: 16 }}>
        {[
          { v: autoSave,  set: setAutoSave,  label: "Auto-save responses" },
          { v: audit,     set: setAudit,     label: "Audit trail" },
          { v: rbac,      set: setRbac,      label: "Role-based access control" },
          { v: expExcel,  set: setExpExcel,  label: "Export to Excel" },
          { v: expPdf,    set: setExpPdf,    label: "Export to PDF" },
          { v: mobile,    set: setMobile,    label: "Mobile-friendly interface" },
        ].map(c => (
          <div key={c.label} style={T.row}>
            <span style={{ fontSize: 13, color: "#111827" }}>{c.label}</span>
            <Toggle checked={c.v} onChange={c.set} />
          </div>
        ))}
      </div>

      <hr style={T.sep} />
      <div style={T.subTitle}>Notification Channels</div>
      <div style={{ ...T.grid3, marginBottom: 14 }}>
        {[
          { v: notifEmail, set: setNotifEmail, label: "Email" },
          { v: notifApp,   set: setNotifApp,   label: "In-app" },
          { v: notifSms,   set: setNotifSms,   label: "SMS" },
        ].map(ch => (
          <div key={ch.label} style={T.row}>
            <span style={{ fontSize: 13, color: "#111827" }}>{ch.label}</span>
            <Toggle checked={ch.v} onChange={ch.set} />
          </div>
        ))}
      </div>
      <div>
        <label style={T.label}>Reminder Days Before Deadline</label>
        <input type="number" style={{ ...T.input, width: 130 }} value={reminderDays} onChange={e => setReminderDays(+e.target.value)} />
      </div>
    </div>
  );

  // ── Step 6 ──
  const Step6 = () => (
    <div style={T.card}>
      <div style={T.secTitle}>Preview & Launch</div>
      <div style={{ ...T.grid2, marginBottom: 12 }}>
        {[
          { k: "Cycle Name", v: name || "—" },
          { k: "Type",       v: cycleType },
          { k: "Dates",      v: `${startDate || "—"} → ${endDate || "—"}` },
          { k: "Deadline",   v: deadline || "—" },
        ].map(item => (
          <div key={item.k} style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 8, padding: "12px 14px" }}>
            <div style={T.muted}>{item.k}</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "#111827", marginTop: 3 }}>{item.v}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ ...T.subTitle, marginBottom: 8 }}>Reviewer Weightage</div>
        <div>{reviewerCats.filter(r => weights[r.key] > 0).map(r => (
          <span key={r.key} style={T.tag}>{r.label}: {weights[r.key]}%</span>
        ))}</div>
      </div>

      <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
        <div style={{ ...T.subTitle, marginBottom: 8 }}>Competencies ({selComps.length})</div>
        <div>{selComps.map(c => <span key={c} style={T.tag}>{c}</span>)}</div>
      </div>

      <div style={{ background: "#f9fafb", border: "1px solid #f3f4f6", borderRadius: 8, padding: "12px 14px" }}>
        <div style={{ ...T.subTitle, marginBottom: 8 }}>Form Sections ({enabledSec.length}) — {totalQs} questions</div>
        <ul style={{ paddingLeft: 18, margin: 0 }}>
          {enabledSec.map(i => <li key={i} style={{ fontSize: 13, color: "#374151", marginBottom: 3 }}>{formSections[i].title}</li>)}
        </ul>
        {inclOverall  && <div style={{ ...T.muted, marginTop: 6 }}>+ Overall Assessment included</div>}
        {autoSummary  && <div style={T.muted}>+ Final Summary auto-generated</div>}
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return Step1();
      case 2:
        return Step2();
      case 3:
        return Step3();
      case 4:
        return Step4();
      case 5:
        return Step5();
      case 6:
        return Step6();
      default:
        return null;
    }
  };

  return (
    <div style={T.page}>
      <div style={T.wrap}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div>
            <button style={{ fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer", padding: 0, marginBottom: 6 }}>
              ← Back to Performance
            </button>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: "#111827", margin: 0 }}>Create 360° Appraisal Survey</h1>
            <p style={{ fontSize: 13, color: "#6b7280", margin: 0 }}>Configured per the 360 Appraisal System spec.</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 600, border: "1px solid #d1d5db", borderRadius: 20, padding: "4px 12px", color: "#374151", background: "#fff", whiteSpace: "nowrap" }}>
            Step {step} of {steps.length}
          </span>
        </div>

        <Stepper />

        {renderStepContent()}

        {launchError && (
          <p style={{ margin: "0 0 12px", fontSize: 13, fontWeight: 600, color: "#b91c1c", textAlign: "right" }}>
            {launchError}
          </p>
        )}

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={{ ...T.btnOut, opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? "not-allowed" : "pointer" }}
            disabled={step === 1}
            onClick={() => setStep(s => Math.max(1, s - 1))}
          >
            ‹ Back
          </button>
          {step < 6
            ? <button style={T.btnPri} onClick={() => setStep(s => Math.min(6, s + 1))}>Next ›</button>
            : (
              <button
                style={{ ...T.btnGrn, opacity: isLaunching ? 0.7 : 1, cursor: isLaunching ? "not-allowed" : "pointer" }}
                onClick={handleLaunchSurvey}
                disabled={isLaunching}
              >
                {isLaunching ? "Launching..." : "Launch Survey"}
              </button>
            )
          }
        </div>

      </div>
    </div>
  );
}
