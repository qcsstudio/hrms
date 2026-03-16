import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const STEPS = ["Describe", "Define", "Accumulation", "Preview"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const WEEKS = [
  { label: "Week Ht1", sub: null },
  { label: "Week Ht2", sub: null },
  { label: "Week Ht3", sub: null },
  { label: "Week Ht4", sub: null },
  { label: "Week Ht5", sub: "(Only applies for month with 5 weeks)" },
];

const getOfficeDisplayName = (office) =>
  office?.officeName || office?.name || office?.office || office?.title || "";

const getOfficeCountryName = (office) => {
  if (typeof office?.country === "string") return office.country;
  return office?.country?.name || office?.countryName || office?.location?.country || "";
};

const collectOfficeCandidates = (value, bucket) => {
  if (!value) return;

  if (Array.isArray(value)) {
    value.forEach((item) => collectOfficeCandidates(item, bucket));
    return;
  }

  if (typeof value !== "object") return;

  const hasId = Boolean(value?._id || value?.id);
  const hasName = Boolean(getOfficeDisplayName(value));

  if (hasId && hasName) {
    bucket.push(value);
  }

  Object.values(value).forEach((child) => collectOfficeCandidates(child, bucket));
};

const extractCompanyOffices = (payload) => {
  const collected = [];
  collectOfficeCandidates(payload, collected);

  const dedupe = new Map();
  collected.forEach((item) => {
    const id = item?._id || item?.id;
    if (!id || dedupe.has(id)) return;

    dedupe.set(id, {
      id,
      name: getOfficeDisplayName(item),
      country: getOfficeCountryName(item),
    });
  });

  return Array.from(dedupe.values());
};

// Slider-style toggle: off | half | full
const SliderToggle = ({ state, onClick }) => {
  const trackColor =
    state === "full"
      ? "#3b82f6"
      : state === "half"
      ? "#93c5fd"
      : "#e2e8f0";

  const knobPos =
    state === "full" ? "calc(100% - 18px)" : state === "half" ? "calc(50% - 8px)" : "2px";

  const label =
    state === "full" ? "Full Day" : state === "half" ? "Half Day" : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div
        onClick={onClick}
        style={{
          position: "relative",
          width: 52,
          height: 22,
          borderRadius: 999,
          background: trackColor,
          cursor: "pointer",
          transition: "background 0.2s",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 3,
            left: knobPos,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
            transition: "left 0.2s",
          }}
        />
      </div>
      {label && (
        <span style={{
          fontSize: 9,
          fontWeight: 700,
          color: state === "full" ? "#1d4ed8" : "#0369a1",
          whiteSpace: "nowrap",
          letterSpacing: 0.3,
        }}>
          {label}
        </span>
      )}
    </div>
  );
};

const Radio = ({ checked, onChange }) => (
  <div
    onClick={onChange}
    style={{
      width: 18,
      height: 18,
      borderRadius: "50%",
      border: `2px solid ${checked ? "#22c55e" : "#cbd5e1"}`,
      background: checked ? "#22c55e" : "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      flexShrink: 0,
    }}
  >
    {checked && (
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
    )}
  </div>
);

const RefreshSection = ({
  refreshAcc,
  setRefreshAcc,
  refreshFrequency,
  setRefreshFrequency,
}) => (
  <div style={{ padding: "12px 32px", borderTop: "1px solid #e2e8f0" }}>
    <p style={{ fontSize: 12, color: "#3b82f6", marginBottom: 10 }}>
      Refresh accumulated weekly offs?
    </p>

    {["yes", "no"].map((opt) => (
      <div key={opt}>
        <div
          onClick={() => setRefreshAcc(opt)}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
            cursor: "pointer",
            borderBottom:
              opt === "yes" && refreshAcc !== "yes" ? "1px solid #f1f5f9" : "none",
          }}
        >
          <span style={{ fontSize: 13, textTransform: "capitalize" }}>
            {opt === "yes" ? "Yes" : "No"}
          </span>

          <Radio
            checked={refreshAcc === opt}
            onChange={() => setRefreshAcc(opt)}
          />
        </div>

        {opt === "yes" && refreshAcc === "yes" && (
          <div style={{ marginTop: 12, paddingLeft: 8, borderBottom: "1px solid #f1f5f9" }}>
            {[
              {
                value: "monthly",
                label: "Monthly refresh of accumulated weekly off counts",
              },
              {
                value: "yearly",
                label: "Yearly refresh of accumulated weekly off counts",
              },
            ].map((frequencyOption) => (
              <div
                key={frequencyOption.value}
                onClick={() => setRefreshFrequency(frequencyOption.value)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "8px 0",
                  cursor: "pointer",
                  borderBottom:
                    frequencyOption.value === "monthly" ? "1px solid #f1f5f9" : "none",
                }}
              >
                <span style={{ fontSize: 13 }}>{frequencyOption.label}</span>

                <Radio
                  checked={refreshFrequency === frequencyOption.value}
                  onChange={() => setRefreshFrequency(frequencyOption.value)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    ))}
  </div>
);

export default function WeeklyOffCreate() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [currentStep, setCurrentStep] = useState(0);
  const [companyOffices, setCompanyOffices] = useState([]);

  // Step 1 - Describe
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Step 2 - Define
  const [grid, setGrid] = useState(
    Array.from({ length: 5 }, () => Array(7).fill("off"))
  );
  const [specifyLastWeek, setSpecifyLastWeek] = useState("yes");
  const [lastWeekRow, setLastWeekRow] = useState(Array(7).fill("off"));

  // Step 3 - Accumulation
  const [accumulation, setAccumulation] = useState("yes"); // yes | no
  const [accType, setAccType] = useState("unlimited"); // unlimited | limited
  const [refreshAcc, setRefreshAcc] = useState(null); // yes | no | null

  const [refreshFrequency, setRefreshFrequency] = useState("");
  // Limited accumulation states
const [limitCount, setLimitCount] = useState("");
const [refreshAccLimited, setRefreshAccLimited] = useState(null);
const [refreshFreqLimited, setRefreshFreqLimited] = useState("");

  const [draftSaved, setDraftSaved] = useState(false);
  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedCountry = queryParams.get("country") || "";
  const selectedOffice = queryParams.get("office") || "";

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosInstance.get("/config/company-offices-data", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setCompanyOffices(extractCompanyOffices(res?.data));
      } catch (error) {
        setCompanyOffices([]);
      }
    };

    fetchOffices();
  }, []);

  const selectedCompanyOfficeIds = useMemo(() => {
    if (!selectedCountry) return [];

    return companyOffices
      .filter((office) => {
        const sameCountry =
          (office.country || "").trim().toLowerCase() ===
          selectedCountry.trim().toLowerCase();

        if (!sameCountry) return false;
        if (selectedOffice === "ALL") return true;

        return (
          (office.name || "").trim().toLowerCase() ===
          selectedOffice.trim().toLowerCase()
        );
      })
      .map((office) => office.id);
  }, [companyOffices, selectedCountry, selectedOffice]);

  const resolvedCompanyOfficeIds = useMemo(() => {
    if (selectedCompanyOfficeIds.length > 0) return selectedCompanyOfficeIds;

    if (selectedOffice && /^[a-f\d]{24}$/i.test(selectedOffice)) {
      return [selectedOffice];
    }

    const storedOfficeId =
      localStorage.getItem("companyOfficeId") ||
      localStorage.getItem("officeId");

    if (storedOfficeId && /^[a-f\d]{24}$/i.test(storedOfficeId)) {
      return [storedOfficeId];
    }

    return [];
  }, [selectedCompanyOfficeIds, selectedOffice]);

  const buildPayload = (isDraft) => {
    const hasAccumulation = accumulation === "yes";
    const selectedRefreshAcc = accType === "limited" ? refreshAccLimited : refreshAcc;
    const selectedRefreshType = accType === "limited" ? refreshFreqLimited : refreshFrequency;

    return {
      name: name.trim(),
      description: description.trim(),
      grid,
      specifyLastWeek: specifyLastWeek === "yes",
      lastWeekRow,
      accumulation: hasAccumulation,
      accType,
      refreshAcc: hasAccumulation ? selectedRefreshAcc === "yes" : false,
      refreshType: hasAccumulation && selectedRefreshAcc === "yes" ? selectedRefreshType || "monthly" : "",
      limitCount: hasAccumulation && accType === "limited" ? Number(limitCount || 0) : 0,
      isDraft,
      companyOfficeId: resolvedCompanyOfficeIds,
    };
  };

  const saveWeeklyOff = async (isDraft) => {
    try {
      const payload = buildPayload(isDraft);
      await axiosInstance.post("/config/weekOff/create", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setDraftSaved(true);
      setTimeout(() => setDraftSaved(false), 2500);

      if (!isDraft) {
        navigate("/config/track/leave/Weekly-off/list");
      }
    } catch (error) {
      console.log("Weekly off save error:", error);
    }
  };

  const handleSaveAsDraft = () => {
    saveWeeklyOff(true);
  };

  const cycleGrid = (row, col) => {
    const newGrid = grid.map((r) => [...r]);
    const s = newGrid[row][col];
    newGrid[row][col] = s === "off" ? "half" : s === "half" ? "full" : "off";
    setGrid(newGrid);
  };

  const cycleLastWeek = (col) => {
    const newRow = [...lastWeekRow];
    const s = newRow[col];
    newRow[col] = s === "off" ? "half" : s === "half" ? "full" : "off";
    setLastWeekRow(newRow);
  };



  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", fontFamily: "sans-serif", fontSize: 14, color: "#1e293b", background: "#fff" }}>

      {/* Step indicator */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", paddingTop: 28, paddingBottom: 20, gap: 0 ,width:"80%",margin:"0px auto"}}>
        {STEPS.map((step, i) => (
          <div key={step} style={{ display: "flex", alignItems: "center" ,width:"80%"}}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: i <= currentStep ? "#3b82f6" : "#f1f5f9",
                border: `2px solid ${i <= currentStep ? "#3b82f6" : "#cbd5e1"}`,
                color: i <= currentStep ? "#fff" : "#94a3b8",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: 12, marginTop: 4, color: i <= currentStep ? "#3b82f6" : "#94a3b8", fontWeight: i === currentStep ? 600 : 400 }}>
                {step}
              </span>
            </div>
            {i < STEPS.length  && (
              <div style={{ width: 180, height: 1, background: "#e2e8f0", margin: "0 4px", marginBottom: 18 }} />
            )}
          </div>
        ))}
      </div>

      <div style={{ flex: 1,  margin: "0 auto", width: "100%", padding: "0 32px" }}>

        {/* STEP 1 - Describe */}
        {currentStep === 0 && (
          <div style={{  margin: "0 auto" }}>
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontWeight: 600, marginBottom: 6, color: "#374151" }}>Weekly-off Name</p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder=""
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 12px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
              />
            </div>
            <div>
              <p style={{ fontSize: 12, color: "#3b82f6", marginBottom: 6 }}>Let's write a brief description about this Weekly-off</p>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                rows={5}
                style={{ width: "100%", border: "1px solid #d1d5db", borderRadius: 6, padding: "8px 12px", fontSize: 14, resize: "vertical", boxSizing: "border-box" }}
              />
            </div>
          </div>
        )}

        {/* STEP 2 - Define */}
        {currentStep === 1 && (
          <div>
            <p style={{ fontSize: 12, color: "#3b82f6", marginBottom: 12 }}>
              Your week start's on <strong>Monday</strong>
            </p>

            {/* Grid */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", marginBottom: 24 }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "120px repeat(7, 1fr)", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ padding: "10px 12px", fontWeight: 600, fontSize: 12, color: "#64748b" }}>WEEK</div>
                {DAYS.map((d) => (
                  <div key={d} style={{ padding: "10px 8px", fontWeight: 600, fontSize: 12, color: "#64748b", textAlign: "center" }}>{d}</div>
                ))}
              </div>

              {/* Rows */}
              {WEEKS.map((week, wi) => (
                <div
                  key={wi}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "120px repeat(7, 1fr)",
                    borderBottom: wi < WEEKS.length - 1 ? "1px solid #f1f5f9" : "none",
                    background: wi % 2 === 0 ? "#fff" : "#fafafa",
                  }}
                >
                  <div style={{ padding: "14px 12px", fontSize: 12, fontWeight: 500, color: "#374151" }}>
                    {week.label}
                    {week.sub && <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{week.sub}</div>}
                  </div>
                  {DAYS.map((_, di) => (
                    <div
                      key={di}
                      style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "10px 4px" }}
                    >
                      <SliderToggle state={grid[wi][di]} onClick={() => cycleGrid(wi, di)} />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Specify last week */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: "#374151", marginBottom: 12 }}>Would you like to specify offs for the last week of any given month, separately?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["yes", "no"].map((opt) => (
                  <div
                    key={opt}
                    onClick={() => setSpecifyLastWeek(opt)}
                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", cursor: "pointer" }}
                  >
                    <span style={{ fontSize: 13, textTransform: "capitalize" }}>{opt === "yes" ? "Yes" : "No"}</span>
                    <Radio checked={specifyLastWeek === opt} onChange={() => setSpecifyLastWeek(opt)} />
                  </div>
                ))}
              </div>
            </div>

            {specifyLastWeek === "yes" && (
              <div>
                <p style={{ fontSize: 11, color: "#3b82f6", marginBottom: 10 }}>Note: This will override the previous selection for 4th/5th weeks.</p>
                <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "120px repeat(7, 1fr)", background: "#f8fafc" }}>
                    <div style={{ padding: "10px 12px", fontWeight: 600, fontSize: 12, color: "#64748b" }}>Last Week</div>
                    {DAYS.map((_, di) => (
                      <div key={di} style={{ display: "flex", justifyContent: "center", padding: "12px 4px" }}>
                        <SliderToggle state={lastWeekRow[di]} onClick={() => cycleLastWeek(di)} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 3 - Accumulation */}
    {currentStep === 2 && (
          <div>
            <p style={{ fontSize: 13, color: "#374151", marginBottom: 12 }}>Allow accumulation of unused weekly offs?</p>

            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
              {/* Yes */}
              <div
                onClick={() => setAccumulation("yes")}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", cursor: "pointer",
                  background: accumulation === "yes" ? "#eff6ff" : "#fff",
                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <span style={{ fontWeight: 500 }}>Yes</span>
                <Radio checked={accumulation === "yes"} onChange={() => setAccumulation("yes")} />
              </div>

              {/* Sub-options when Yes */}
              {accumulation === "yes" && (
                <div style={{ background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                  {/* Unlimited */}
                  <div
                    onClick={() => setAccType("unlimited")}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "12px 24px", cursor: "pointer", borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>Unlimited Accumulation</span>
                    <Radio checked={accType === "unlimited"} onChange={() => setAccType("unlimited")} />
                  </div>

                  {/* Refresh for Unlimited */}
                  {accType === "unlimited" && (
                    <RefreshSection
                      refreshAcc={refreshAcc}
                      setRefreshAcc={setRefreshAcc}
                      refreshFrequency={refreshFrequency}
                      setRefreshFrequency={setRefreshFrequency}
                    />
                  )}

                  {/* Limited */}
                  <div
                    onClick={() => setAccType("limited")}
                    style={{
                      display: "flex", justifyContent: "space-between", alignItems: "center",
                      padding: "12px 24px", cursor: "pointer", borderBottom: "1px solid #e2e8f0",
                    }}
                  >
                    <span style={{ fontSize: 13 }}>Limited Accumulation</span>
                    <Radio checked={accType === "limited"} onChange={() => setAccType("limited")} />
                  </div>

                  {/* Limited sub-options */}
                  {accType === "limited" && (
                    <div>
                      {/* Limit count input */}
                      <div style={{ padding: "12px 32px", borderBottom: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 13, color: "#374151" }}>Limit to</span>
                          <input
                            type="number"
                            value={limitCount}
                            onChange={(e) => setLimitCount(e.target.value)}
                            style={{
                              width: 60, border: "1px solid #d1d5db", borderRadius: 6,
                              padding: "6px 10px", fontSize: 13, outline: "none", textAlign: "center",
                            }}
                          />
                          <span style={{ fontSize: 13, color: "#374151" }}>Number of weekly offs</span>
                        </div>
                      </div>

                      {/* Refresh for Limited */}
                      <RefreshSection
                        refreshAcc={refreshAccLimited}
                        setRefreshAcc={setRefreshAccLimited}
                        refreshFrequency={refreshFreqLimited}
                        setRefreshFrequency={setRefreshFreqLimited}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* No */}
              <div
                onClick={() => setAccumulation("no")}
                style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 16px", cursor: "pointer",
                  background: accumulation === "no" ? "#eff6ff" : "#fff",
                }}
              >
                <span style={{ fontWeight: 500 }}>No</span>
                <Radio checked={accumulation === "no"} onChange={() => setAccumulation("no")} />
              </div>
            </div>
          </div>
        )}


        {/* STEP 4 - Preview */}
        {currentStep === 3 && (
          <div style={{ margin: "0 auto" }}>

            {/* Basic Info */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 20, marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Basic Info</p>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Weekly-off Name</p>
                  <p style={{ fontWeight: 600, color: "#1e293b" }}>{name || <span style={{ color: "#94a3b8" }}>—</span>}</p>
                </div>
                <div>
                  <p style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>Description</p>
                  <p style={{ color: "#374151" }}>{description || <span style={{ color: "#94a3b8" }}>—</span>}</p>
                </div>
              </div>
            </div>

            {/* Weekly Off Grid Preview */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ padding: "12px 16px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}>Weekly Schedule</p>
              </div>

              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "110px repeat(7, 1fr)", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                <div style={{ padding: "8px 12px", fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>WEEK</div>
                {DAYS.map((d) => (
                  <div key={d} style={{ padding: "8px 4px", fontSize: 10, fontWeight: 600, color: "#94a3b8", textAlign: "center" }}>{d.slice(0, 3)}</div>
                ))}
              </div>

              {/* Grid rows */}
              {WEEKS.map((week, wi) => (
                <div key={wi} style={{ display: "grid", gridTemplateColumns: "110px repeat(7, 1fr)", borderBottom: wi < WEEKS.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                  <div style={{ padding: "10px 12px", fontSize: 11, fontWeight: 500, color: "#374151" }}>{week.label}</div>
                  {DAYS.map((_, di) => {
                    const s = grid[wi][di];
                    return (
                      <div key={di} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", gap: 3 }}>
                        <div style={{
                          width: 36, height: 14, borderRadius: 999,
                          background: s === "full" ? "#3b82f6" : s === "half" ? "#93c5fd" : "#e2e8f0",
                        }} />
                        <span style={{ fontSize: 8, fontWeight: 600, color: s === "full" ? "#1d4ed8" : s === "half" ? "#0369a1" : "#cbd5e1" }}>
                          {s === "full" ? "Full" : s === "half" ? "Half" : "Off"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Last week row if specified */}
              {specifyLastWeek === "yes" && (
                <>
                  <div style={{ padding: "6px 12px", background: "#fef9ec", borderTop: "1px solid #fde68a" }}>
                    <span style={{ fontSize: 10, color: "#b45309", fontWeight: 600 }}>Last Week Override</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "110px repeat(7, 1fr)", background: "#fffbeb" }}>
                    <div style={{ padding: "10px 12px", fontSize: 11, fontWeight: 500, color: "#374151" }}>Last Week</div>
                    {lastWeekRow.map((s, di) => (
                      <div key={di} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "8px 4px", gap: 3 }}>
                        <div style={{
                          width: 36, height: 14, borderRadius: 999,
                          background: s === "full" ? "#3b82f6" : s === "half" ? "#93c5fd" : "#e2e8f0",
                        }} />
                        <span style={{ fontSize: 8, fontWeight: 600, color: s === "full" ? "#1d4ed8" : s === "half" ? "#0369a1" : "#cbd5e1" }}>
                          {s === "full" ? "Full" : s === "half" ? "Half" : "Off"}
                        </span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Accumulation Preview */}
            <div style={{ border: "1px solid #e2e8f0", borderRadius: 8, padding: 20 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>Accumulation</p>

              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: accumulation === "yes" ? 12 : 0 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: accumulation === "yes" ? "#22c55e" : "#f87171",
                }} />
                <span style={{ fontWeight: 600, color: "#1e293b" }}>
                  {accumulation === "yes" ? "Accumulation Allowed" : "No Accumulation"}
                </span>
              </div>

              {accumulation === "yes" && (
                <div style={{ paddingLeft: 16, borderLeft: "2px solid #e2e8f0" }}>
                  <p style={{ fontSize: 12, color: "#64748b", marginBottom: 4 }}>
                    Type: <strong style={{ color: "#1e293b" }}>{accType === "unlimited" ? "Unlimited Accumulation" : "Limited Accumulation"}</strong>
                  </p>
                  {accType === "unlimited" && refreshAcc && (
                    <p style={{ fontSize: 12, color: "#64748b" }}>
                      Refresh Accumulated Offs: <strong style={{ color: "#1e293b", textTransform: "capitalize" }}>{refreshAcc}</strong>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #e2e8f0", padding: "14px 32px", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative" }}>

        {/* Draft saved toast */}
        {draftSaved && (
          <div style={{
            position: "absolute", top: -44, left: "50%", transform: "translateX(-50%)",
            background: "#22c55e", color: "#fff", borderRadius: 6, padding: "8px 20px",
            fontSize: 13, fontWeight: 600, boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            whiteSpace: "nowrap",
          }}>
            ✓ Draft saved successfully!
          </div>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/config/track/leave/Weekly-off/list")}
            style={{ background: "none", border: "none", fontSize: 13, color: "#64748b", cursor: "pointer" }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveAsDraft}
            style={{
              background: "none", border: "1px solid #3b82f6", color: "#3b82f6",
              borderRadius: 6, padding: "6px 16px", fontSize: 13, cursor: "pointer",
            }}
          >
            Save As Draft
          </button>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep((s) => s - 1)}
              style={{ border: "1px solid #e2e8f0", background: "#fff", borderRadius: 6, padding: "7px 18px", fontSize: 13, cursor: "pointer" }}
            >
              Previous
            </button>
          )}

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={() => setCurrentStep((s) => s + 1)}
              style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "7px 18px", fontSize: 13, cursor: "pointer" }}
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => saveWeeklyOff(false)}
              style={{ background: "#3b82f6", color: "#fff", border: "none", borderRadius: 6, padding: "7px 18px", fontSize: 13, cursor: "pointer" }}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
