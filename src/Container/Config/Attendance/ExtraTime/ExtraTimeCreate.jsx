import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

export default function ExtraTimeCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const isEditMode = Boolean(id);

  const [step, setStep] = useState(1);
  const [loadingPolicy, setLoadingPolicy] = useState(false);

  /* ── Radio dot ── */
  const RDot = ({ checked }) => (
    <div className={`w-[18px] h-[18px] rounded-full border-2 bg-white flex items-center justify-center flex-shrink-0 ${checked ? "border-blue-600" : "border-gray-400"}`}>
      {checked && <div className="w-[9px] h-[9px] rounded-full bg-blue-600" />}
    </div>
  );

  /* ── Radio card ── */
  const RCard = ({ checked, label, onClick, children }) => (
    <div className={`rounded-lg mb-1.5 bg-white overflow-hidden ${checked ? "border-[1.5px] border-blue-300" : "border border-gray-200"}`}>
      <div className="flex items-center gap-2.5 px-4 py-3 cursor-pointer" onClick={onClick}>
        <RDot checked={checked} />
        <span className="text-sm text-gray-800 leading-relaxed">{label}</span>
      </div>
      {checked && children && (
        <div className="px-4 pb-4 pl-11" onClick={e => e.stopPropagation()}>{children}</div>
      )}
    </div>
  );

  /* ── Info note ── */
  const InfoRow = ({ text }) => (
    <div className="flex items-start gap-2 border border-blue-200 rounded-lg px-3.5 py-2.5 bg-blue-50 mb-1.5">
      <span className="text-blue-600 text-base leading-none flex-shrink-0">ⓘ</span>
      <span className="text-xs text-gray-700 leading-relaxed">{text}</span>
    </div>
  );

  /* ── Blue question label ── */
  const Q = ({ text }) => (
    <p className="text-sm text-blue-600 font-medium mb-2.5 mt-0 leading-snug">{text}</p>
  );

  /* ── Field label ── */
  const FL = ({ children }) => (
    <p className="text-xs text-gray-700 mb-1 mt-0">{children}</p>
  );

  /* ── Input ── */
  const Inp = ({ placeholder, value, onChange, className = "" }) => (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 bg-white outline-none w-full ${className}`}
    />
  );

  /* ── Preview row ── */
  const PRow = ({ label, value }) => !value ? null : (
    <div className="flex gap-4 py-2 border-b border-gray-50">
      <span className="text-xs text-gray-500 min-w-[260px] flex-shrink-0">{label}</span>
      <span className="text-xs text-gray-900 font-medium">{value}</span>
    </div>
  );

  /* ── Preview section ── */
  const PSec = ({ title, icon, children }) => (
    <div className="mb-4 bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-5 py-3 bg-slate-50 border-b border-gray-200 flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-sm font-bold text-blue-900">{title}</span>
      </div>
      <div className="px-5 pt-2 pb-3.5">{children}</div>
    </div>
  );

  /* ════ STATE ════ */
  const [policyName, setPolicyName]         = useState("");
  const [policyDesc, setPolicyDesc]         = useState("");

  const [s2benefit, setS2benefit]           = useState("yes");
  const [s2earnType, setS2earnType]         = useState("hours");
  const [s2minHrs, setS2minHrs]             = useState("");
  const [s2earnDays, setS2earnDays]         = useState("");
  const [s2canAccum, setS2canAccum]         = useState("yes");
  const [s2accumMonths, setS2accumMonths]   = useState("");
  const [s2limitDay, setS2limitDay]         = useState("");
  const [s2perHrDays, setS2perHrDays]       = useState("");
  const [s2perHrLimit, setS2perHrLimit]     = useState("");
  const [s2minThresh, setS2minThresh]       = useState("yes");
  const [s2threshMins, setS2threshMins]     = useState("");

  const [s3benefit, setS3benefit]           = useState("yes");
  const [s3earnType, setS3earnType]         = useState("both");
  const [s3minHrs, setS3minHrs]             = useState("");
  const [s3earnDays, setS3earnDays]         = useState("");
  const [s3canAccum, setS3canAccum]         = useState("yes");
  const [s3accumMonths, setS3accumMonths]   = useState("");
  const [s3limitDay, setS3limitDay]         = useState("");
  const [s3perHrDays, setS3perHrDays]       = useState("");
  const [s3perHrLimit, setS3perHrLimit]     = useState("");

  const [approvalReq, setApprovalReq]       = useState("yes");
  const [creditApproval, setCreditApproval] = useState("yes");
  const [unusedBalance, setUnusedBalance]   = useState("lapse");
  const [lapseDays, setLapseDays]           = useState("");
  const [attachments, setAttachments]       = useState("yes");
  const [attachDays, setAttachDays]         = useState("");
  const [attachDesc, setAttachDesc]         = useState("");
  const [pastDates, setPastDates]           = useState("yes");
  const [pastDays, setPastDays]             = useState("");

  const yn = v => v === "yes" ? "Yes" : "No";
  const toNumber = (value, fallback = 0) => {
    if (value === "" || value === null || value === undefined) return fallback;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  };
  const toNullableNumber = (value) => {
    if (value === "" || value === null || value === undefined) return null;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  };

  const boolToYesNo = (value) => (value ? "yes" : "no");

  const toInputString = (value) => {
    if (value === null || value === undefined) return "";
    return String(value);
  };

  const prefillPolicy = (policy = {}) => {
    setPolicyName(policy?.policyName || "");
    setPolicyDesc(policy?.policyDescription || "");

    const working = policy?.workingDayBenefits || {};
    setS2benefit(boolToYesNo(working?.benefitEnabled));
    setS2earnType(working?.earnType === "each-hour" ? "each-hour" : "hours");
    setS2minHrs(toInputString(working?.minimumHoursRequired));
    setS2earnDays(toInputString(working?.leavesEarnedPerCycle));
    setS2canAccum(boolToYesNo(working?.canAccumulateHours));
    setS2accumMonths(toInputString(working?.accumulationOverMonths));
    setS2limitDay(toInputString(working?.compOffLimitPerDay));
    setS2perHrDays(toInputString(working?.leavesPerHourOfOT));
    setS2perHrLimit(toInputString(working?.compOffLimitPerDayEachHour));
    setS2minThresh(boolToYesNo(working?.minimumThresholdEnabled));
    setS2threshMins(toInputString(working?.minimumThresholdMinutes));

    const nonWorking = policy?.nonWorkingDayBenefits || {};
    setS3benefit(boolToYesNo(nonWorking?.benefitEnabled));
    setS3earnType(nonWorking?.earnType === "each-hour" ? "each-hour" : "both");
    setS3minHrs(toInputString(nonWorking?.minimumHoursRequired));
    setS3earnDays(toInputString(nonWorking?.leavesEarnedPerCycle));
    setS3canAccum(boolToYesNo(nonWorking?.canAccumulateHours));
    setS3accumMonths(toInputString(nonWorking?.accumulationOverMonths));
    setS3limitDay(toInputString(nonWorking?.compOffLimitPerDay));
    setS3perHrDays(toInputString(nonWorking?.leavesPerHourOfOT));
    setS3perHrLimit(toInputString(nonWorking?.compOffLimitPerDayEachHour));

    const settings = policy?.extraTimePolicy || {};
    setApprovalReq(boolToYesNo(settings?.approvalRequired));
    setCreditApproval(boolToYesNo(settings?.creditApprovalRequired));
    setUnusedBalance(settings?.unusedBalanceHandling || "lapse");
    setLapseDays(toInputString(settings?.lapseDays));
    setAttachments(boolToYesNo(settings?.attachmentsRequired));
    setAttachDays(toInputString(settings?.attachmentRequiredIfDaysGreaterThan));
    setAttachDesc(settings?.attachmentInstructions || "");
    setPastDates(boolToYesNo(settings?.allowPastDateApplications));
    setPastDays(toInputString(settings?.pastDateApplicationDaysLimit));
  };

  useEffect(() => {
    const fetchPolicyById = async () => {
      if (!isEditMode) return;

      setLoadingPolicy(true);
      try {
        const res = await axiosInstance.get(`/config/extra-time-getOne/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        const policyData = res?.data?.data || {};
        prefillPolicy(policyData);
      } catch (error) {
        console.log("extra time getOne error", error);
      } finally {
        setLoadingPolicy(false);
      }
    };

    fetchPolicyById();
  }, [axiosInstance, id, isEditMode]);

  const buildPayload = (status) => ({
    policyName: policyName.trim(),
    policyDescription: policyDesc.trim(),
    workingDayBenefits: {
      benefitEnabled: s2benefit === "yes",
      earnType: s2earnType === "each-hour" ? "each-hour" : s2earnType,
      minimumHoursRequired: s2earnType === "hours" ? toNumber(s2minHrs, 0) : null,
      leavesEarnedPerCycle: s2earnType === "hours" ? toNumber(s2earnDays, 0) : null,
      canAccumulateHours: s2canAccum === "yes",
      accumulationOverMonths: s2canAccum === "yes" ? toNullableNumber(s2accumMonths) : null,
      compOffLimitPerDay: s2earnType === "hours" ? toNumber(s2limitDay, 0) : null,
      leavesPerHourOfOT: s2earnType === "each-hour" ? toNumber(s2perHrDays, 0) : null,
      compOffLimitPerDayEachHour: s2earnType === "each-hour" ? toNumber(s2perHrLimit, 0) : null,
      minimumThresholdEnabled: s2minThresh === "yes",
      minimumThresholdMinutes: s2minThresh === "yes" ? toNumber(s2threshMins, 0) : 0,
    },
    nonWorkingDayBenefits: {
      benefitEnabled: s3benefit === "yes",
      earnType: s3earnType === "each-hour" ? "each-hour" : s3earnType,
      minimumHoursRequired: s3earnType === "both" ? toNumber(s3minHrs, 0) : null,
      leavesEarnedPerCycle: s3earnType === "both" ? toNumber(s3earnDays, 0) : null,
      canAccumulateHours: s3canAccum === "yes",
      accumulationOverMonths: s3canAccum === "yes" ? toNullableNumber(s3accumMonths) : null,
      compOffLimitPerDay: s3earnType === "both" ? toNumber(s3limitDay, 0) : null,
      leavesPerHourOfOT: s3earnType === "each-hour" ? toNumber(s3perHrDays, 0) : null,
      compOffLimitPerDayEachHour: s3earnType === "each-hour" ? toNumber(s3perHrLimit, 0) : null,
    },
    extraTimePolicy: {
      approvalRequired: approvalReq === "yes",
      creditApprovalRequired: creditApproval === "yes",
      unusedBalanceHandling: unusedBalance,
      lapseDays: unusedBalance === "lapse" ? toNumber(lapseDays, 0) : 0,
      attachmentsRequired: attachments === "yes",
      attachmentRequiredIfDaysGreaterThan: attachments === "yes" ? toNumber(attachDays, 0) : 0,
      attachmentInstructions: attachments === "yes" ? attachDesc.trim() : "",
      allowPastDateApplications: pastDates === "yes",
      pastDateApplicationDaysLimit: pastDates === "yes" ? toNumber(pastDays, 0) : 0,
    },
    status,
  });

  const savePolicy = async (status) => {
    try {
      const payload = buildPayload(status);
      if (isEditMode) {
        await axiosInstance.put(`/config/extra-time-policy-update/${id}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/extra-time", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }
      navigate("/config/track/Attendance/extra-time/list");
    } catch (error) {
      console.log("extra time create error", error);
    }
  };

  const STEPS = [
    { id: 1, label: "Describe" },
    { id: 2, label: "Working Day\nBenefits" },
    { id: 3, label: "Non-Working Day\nBenefits" },
    { id: 4, label: "Extra Time\nPolicy" },
    { id: 5, label: "Preview" },
  ];

  return (
    <div className="font-sans bg-white min-h-screen pb-20">

      {/* ════ STEP BAR ════ */}
      <div className="flex items-start justify-center px-14 pt-6 pb-4 border-b border-gray-200 bg-white sticky top-0 z-10">
        {STEPS.map((s, i) => {
          const active = s.id === step;
          const done   = s.id < step;
          return (
            <div key={s.id} className={`flex items-start ${i < STEPS.length - 1 ? "flex-1" : ""}`}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${active ? "bg-white border-2 border-blue-600 text-blue-600"
                  : done   ? "bg-blue-600 text-white"
                  :          "bg-gray-200 text-gray-400"}`}>
                  {s.id}
                </div>
                <span className={`text-[11px] text-center leading-tight max-w-[88px] whitespace-pre-line
                  ${active        ? "font-semibold text-blue-600"
                  : s.id > step   ? "text-gray-400"
                  :                 "text-gray-600"}`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-[1.5px] mt-[18px] mx-1.5 ${done ? "bg-blue-600" : "bg-gray-300"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* ════ CONTENT ════ */}
      <div className="max-w-3xl mx-auto px-7 pt-9">
        {loadingPolicy && (
          <div className="text-sm text-gray-500 mb-4">Loading policy details...</div>
        )}

        {/* ── STEP 1: Describe ── */}
        {step === 1 && (
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2 mt-0">Extra Time Name</p>
              <input
                placeholder="Enter Extra Time Name"
                value={policyName}
                onChange={e => setPolicyName(e.target.value)}
                className="w-full max-w-[800px] px-3.5 py-2.5 border-2 border-blue-600 rounded-lg text-sm text-gray-700 outline-none"
              />
            </div>
            <div>
              <p className="text-sm text-blue-600 font-medium mb-2 mt-0">Lets write a brief desciption about this extra time</p>
              <textarea
                placeholder="Description"
                value={policyDesc}
                onChange={e => setPolicyDesc(e.target.value)}
                rows={7}
                className="w-full max-w-[800px] px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none resize-y"
              />
            </div>
          </div>
        )}

        {/* ── STEP 2: Working Day Benefits ── */}
        {step === 2 && (
          <div>
            <Q text="Do you wish to offer any benefit to employees for extra time (OT) spent on a working day?" />

            <RCard checked={s2benefit === "yes"} label="yes" onClick={() => setS2benefit("yes")}>
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-semibold text-gray-700 m-0">Please choose a benefit</p>

                <RCard checked={true} label="Give compensatory off against extra-time (OT)" onClick={() => {}}>
                  <div className="flex flex-col gap-2.5">

                    <RCard checked={s2earnType === "hours"} label="Employees earn comp-off leaves only if the employee completes certain number of hours" onClick={() => setS2earnType("hours")}>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-5 flex-wrap">
                          <div>
                            <FL>Minimum hours required</FL>
                            <div className="flex items-center gap-1.5">
                              <Inp placeholder="Choose Account" value={s2minHrs} onChange={e => setS2minHrs(e.target.value)} className="!w-36" />
                              <span className="text-xs text-gray-500">Hours</span>
                            </div>
                          </div>
                          <div>
                            <FL>an employee to earn leaves</FL>
                            <div className="flex items-center gap-1.5">
                              <Inp placeholder="Choose Account" value={s2earnDays} onChange={e => setS2earnDays(e.target.value)} className="!w-36" />
                              <span className="text-xs text-gray-500">Days</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <FL>Can extra time hours be accumulated?</FL>
                          <RCard checked={s2canAccum === "yes"} label="Yes" onClick={() => setS2canAccum("yes")}>
                            <div>
                              <FL>Hours can be accumulated over</FL>
                              <div className="flex items-center gap-1.5">
                                <Inp placeholder="Choose Account" value={s2accumMonths} onChange={e => setS2accumMonths(e.target.value)} className="!w-36" />
                                <span className="text-xs text-gray-500">Months</span>
                              </div>
                            </div>
                          </RCard>
                          <RCard checked={s2canAccum === "no"} label="No" onClick={() => setS2canAccum("no")} />
                        </div>
                        <div>
                          <FL>Limit the number of comp-off leaves earned in one day to</FL>
                          <Inp placeholder="Choose Account" value={s2limitDay} onChange={e => setS2limitDay(e.target.value)} className="!w-36" />
                        </div>
                      </div>
                    </RCard>

                    <RCard checked={s2earnType === "each-hour"} label="Employees earn comp-off leaves for each hour of extra time" onClick={() => setS2earnType("each-hour")}>
                      <div className="flex flex-col gap-3">
                        <div>
                          <FL>Employees receive leave(s) for each hour of extra time</FL>
                          <div className="flex items-center gap-1.5">
                            <Inp placeholder="Choose Account" value={s2perHrDays} onChange={e => setS2perHrDays(e.target.value)} className="!w-36" />
                            <span className="text-xs text-gray-500">Days</span>
                          </div>
                        </div>
                        <div>
                          <FL>Limit the number of comp-off leaves earned in one day to</FL>
                          <div className="flex items-center gap-1.5">
                            <Inp placeholder="Choose Account" value={s2perHrLimit} onChange={e => setS2perHrLimit(e.target.value)} className="!w-36" />
                            <span className="text-xs text-gray-500">Days</span>
                          </div>
                        </div>
                      </div>
                    </RCard>

                    <div className="h-px bg-gray-100 my-1" />
                    <Q text="Do you wish to set a minimum threshold (mins) before which extra-time (OT) will not be considered for benefits?" />
                    <RCard checked={s2minThresh === "yes"} label="yes" onClick={() => setS2minThresh("yes")}>
                      <div className="flex flex-col gap-2.5">
                        <div>
                          <FL>Minimum threshold is</FL>
                          <div className="flex items-center gap-1.5">
                            <Inp placeholder="Choose Account" value={s2threshMins} onChange={e => setS2threshMins(e.target.value)} className="!w-36" />
                            <span className="text-xs text-gray-500">Minutes</span>
                          </div>
                        </div>
                        <InfoRow text="Note: this duration will be included in calculating extra-time, once the employee crosses the threshold" />
                      </div>
                    </RCard>
                    <RCard checked={s2minThresh === "no"} label="No, there is no minimum threshold" onClick={() => setS2minThresh("no")} />

                  </div>
                </RCard>
              </div>
            </RCard>

            <RCard checked={s2benefit === "no"} label="No" onClick={() => setS2benefit("no")} />
          </div>
        )}

        {/* ── STEP 3: Non-Working Day Benefits ── */}
        {step === 3 && (
          <div>
            <Q text="Do you wish to offer any benefit to employees for extra time (OT) spent on a non working day?" />

            <RCard checked={s3benefit === "yes"} label="yes" onClick={() => setS3benefit("yes")}>
              <div className="flex flex-col gap-2.5">
                <p className="text-xs font-semibold text-gray-700 m-0">Please choose a benefit</p>

                <RCard checked={true} label="Give compensatory off against extra-time (OT)" onClick={() => {}}>
                  <div className="flex flex-col gap-2.5">

                    <RCard checked={s3earnType === "both"} label="Employees earn comp-off leaves for each hour of extra time only if the employee completes certain number of hours" onClick={() => setS3earnType("both")}>
                      <div className="flex flex-col gap-3">
                        <div className="flex gap-5 flex-wrap">
                          <div>
                            <FL>Minimum hours required</FL>
                            <div className="flex items-center gap-1.5">
                              <Inp placeholder="Choose Account" value={s3minHrs} onChange={e => setS3minHrs(e.target.value)} className="!w-36" />
                              <span className="text-xs text-gray-500">Hours</span>
                            </div>
                          </div>
                          <div>
                            <FL>an employee to earn leaves</FL>
                            <div className="flex items-center gap-1.5">
                              <Inp placeholder="Choose Account" value={s3earnDays} onChange={e => setS3earnDays(e.target.value)} className="!w-36" />
                              <span className="text-xs text-gray-500">Days</span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <FL>Can extra time hours be accumulated?</FL>
                          <RCard checked={s3canAccum === "yes"} label="Yes" onClick={() => setS3canAccum("yes")}>
                            <div>
                              <FL>Hours can be accumulated over</FL>
                              <div className="flex items-center gap-1.5">
                                <Inp placeholder="Choose Account" value={s3accumMonths} onChange={e => setS3accumMonths(e.target.value)} className="!w-36" />
                                <span className="text-xs text-gray-500">Months</span>
                              </div>
                            </div>
                          </RCard>
                          <RCard checked={s3canAccum === "no"} label="No" onClick={() => setS3canAccum("no")} />
                        </div>
                        <div>
                          <FL>Limit the number of comp-off leaves earned in one day to</FL>
                          <Inp placeholder="Choose Account" value={s3limitDay} onChange={e => setS3limitDay(e.target.value)} className="!w-36" />
                        </div>
                      </div>
                    </RCard>

                    <RCard checked={s3earnType === "each-hour"} label="Employees earn comp-off leaves for each hour of extra time" onClick={() => setS3earnType("each-hour")}>
                      <div className="flex flex-col gap-3">
                        <div>
                          <FL>Employees receive leave(s) for each hour of extra time</FL>
                          <div className="flex items-center gap-1.5">
                            <Inp placeholder="Choose Account" value={s3perHrDays} onChange={e => setS3perHrDays(e.target.value)} className="!w-36" />
                            <span className="text-xs text-gray-500">Days</span>
                          </div>
                        </div>
                        <div>
                          <FL>Limit the number of comp-off leaves earned in one day to</FL>
                          <div className="flex items-center gap-1.5">
                            <Inp placeholder="Choose Account" value={s3perHrLimit} onChange={e => setS3perHrLimit(e.target.value)} className="!w-36" />
                            <span className="text-xs text-gray-500">Days</span>
                          </div>
                        </div>
                      </div>
                    </RCard>

                  </div>
                </RCard>
              </div>
            </RCard>

            <RCard checked={s3benefit === "no"} label="No" onClick={() => setS3benefit("no")} />
          </div>
        )}

        {/* ── STEP 4: Extra Time Policy ── */}
        {step === 4 && (
          <div className="flex flex-col gap-5">

            <div>
              <Q text="Do you want employees to work extra time only on approval? (Employee will not receive extra time benefits if prior approval to work extra time is not taken)" />
              <RCard checked={approvalReq === "yes"} label="yes" onClick={() => setApprovalReq("yes")}>
                <InfoRow text="Allow employees to get past dated extra time approval" />
              </RCard>
              <RCard checked={approvalReq === "no"} label="No" onClick={() => setApprovalReq("no")} />
            </div>

            <div>
              <Q text="Does crediting comp-off leaves require approval?" />
              <RCard checked={creditApproval === "yes"} label="yes" onClick={() => setCreditApproval("yes")} />
              <RCard checked={creditApproval === "no"} label="No" onClick={() => setCreditApproval("no")} />
            </div>

            <div>
              <Q text="How do we handle unused comp-off balance?" />
              <RCard checked={unusedBalance === "lapse"} label="Comp-off will lapse days after earning" onClick={() => setUnusedBalance("lapse")}>
                <div className="flex items-center gap-1.5">
                  <Inp placeholder="Choose Account" value={lapseDays} onChange={e => setLapseDays(e.target.value)} className="!w-36" />
                  <span className="text-xs text-gray-500">Days</span>
                </div>
              </RCard>
              <RCard checked={unusedBalance === "retain"} label="Does not lapse, retain all unused comp-off credit for future use" onClick={() => setUnusedBalance("retain")} />
              <RCard checked={unusedBalance === "leave-cycle"} label="Lapse at the end of Leave Cycle" onClick={() => setUnusedBalance("leave-cycle")} />
            </div>

            <div>
              <Q text="Do you want to keep attachments (supporting documents) compulsory when applying the earned comp-off leaves?" />
              <RCard checked={attachments === "yes"} label="yes" onClick={() => setAttachments("yes")}>
                <div className="flex flex-col gap-3">
                  <div>
                    <FL>Only if leave duration is greater than</FL>
                    <div className="flex items-center gap-1.5">
                      <Inp placeholder="Choose Account" value={attachDays} onChange={e => setAttachDays(e.target.value)} className="!w-36" />
                      <span className="text-xs text-gray-500">Days</span>
                    </div>
                  </div>
                  <div>
                    <FL>feel free to add description text here for any special instructions regarding attachments required?</FL>
                    <Inp placeholder="Choose Account" value={attachDesc} onChange={e => setAttachDesc(e.target.value)} />
                  </div>
                </div>
              </RCard>
              <RCard checked={attachments === "no"} label="No" onClick={() => setAttachments("no")} />
            </div>

            <div>
              <Q text="Do you want to allow leave application for past dates?" />
              <RCard checked={pastDates === "yes"} label="yes" onClick={() => setPastDates("yes")}>
                <div>
                  <FL>Leave application can be made upto days after actual leave date</FL>
                  <div className="flex items-center gap-1.5">
                    <Inp placeholder="Choose Account" value={pastDays} onChange={e => setPastDays(e.target.value)} className="!w-36" />
                    <span className="text-xs text-gray-500">Days</span>
                  </div>
                </div>
              </RCard>
              <RCard checked={pastDates === "no"} label="No" onClick={() => setPastDates("no")} />
            </div>

          </div>
        )}

        {/* ── STEP 5: Preview ── */}
        {step === 5 && (
          <div>
            <div className="text-center mb-7">
              <h2 className="text-xl font-bold text-gray-900 m-0 mb-1">Policy Preview</h2>
              <p className="text-sm text-gray-500 m-0">Review all your selections before saving</p>
            </div>

            <PSec title="Basic Info" icon="📋">
              <PRow label="Extra Time Name" value={policyName || "—"} />
              <PRow label="Description" value={policyDesc || "—"} />
            </PSec>

            <PSec title="Working Day Benefits" icon="💼">
              <PRow label="Offer benefit for working day OT" value={yn(s2benefit)} />
              {s2benefit === "yes" && <>
                <PRow label="Earn type" value={s2earnType === "hours" ? "Only if completes certain hours" : "For each hour of OT"} />
                {s2earnType === "hours" && <>
                  <PRow label="Minimum hours required" value={s2minHrs ? `${s2minHrs} Hours` : "—"} />
                  <PRow label="Leaves earned per cycle" value={s2earnDays ? `${s2earnDays} Days` : "—"} />
                  <PRow label="Can hours accumulate" value={yn(s2canAccum)} />
                  {s2canAccum === "yes" && <PRow label="Accumulate over" value={s2accumMonths ? `${s2accumMonths} Months` : "—"} />}
                  <PRow label="Limit comp-off per day" value={s2limitDay || "—"} />
                </>}
                {s2earnType === "each-hour" && <>
                  <PRow label="Leaves per hour of OT" value={s2perHrDays ? `${s2perHrDays} Days` : "—"} />
                  <PRow label="Limit comp-off per day" value={s2perHrLimit ? `${s2perHrLimit} Days` : "—"} />
                </>}
                <PRow label="Minimum threshold set" value={yn(s2minThresh)} />
                {s2minThresh === "yes" && <PRow label="Threshold duration" value={s2threshMins ? `${s2threshMins} Minutes` : "—"} />}
              </>}
            </PSec>

            <PSec title="Non-Working Day Benefits" icon="🏖️">
              <PRow label="Offer benefit for non-working day OT" value={yn(s3benefit)} />
              {s3benefit === "yes" && <>
                <PRow label="Earn type" value={s3earnType === "both" ? "Each hour only if completes certain hours" : "For each hour of OT"} />
                {s3earnType === "both" && <>
                  <PRow label="Minimum hours required" value={s3minHrs ? `${s3minHrs} Hours` : "—"} />
                  <PRow label="Leaves per cycle" value={s3earnDays ? `${s3earnDays} Days` : "—"} />
                  <PRow label="Can hours accumulate" value={yn(s3canAccum)} />
                  {s3canAccum === "yes" && <PRow label="Accumulate over" value={s3accumMonths ? `${s3accumMonths} Months` : "—"} />}
                  <PRow label="Limit comp-off per day" value={s3limitDay || "—"} />
                </>}
                {s3earnType === "each-hour" && <>
                  <PRow label="Leaves per hour of OT" value={s3perHrDays ? `${s3perHrDays} Days` : "—"} />
                  <PRow label="Limit comp-off per day" value={s3perHrLimit ? `${s3perHrLimit} Days` : "—"} />
                </>}
              </>}
            </PSec>

            <PSec title="Extra Time Policy" icon="📋">
              <PRow label="Approval required for extra time" value={yn(approvalReq)} />
              <PRow label="Credit comp-off requires approval" value={yn(creditApproval)} />
              <PRow label="Unused comp-off handling" value={unusedBalance === "lapse" ? `Lapse after ${lapseDays || "?"} days` : unusedBalance === "retain" ? "Retain all unused credit" : "Lapse at end of Leave Cycle"} />
              <PRow label="Attachments compulsory" value={yn(attachments)} />
              {attachments === "yes" && <>
                <PRow label="Required if leave >" value={attachDays ? `${attachDays} Days` : "—"} />
                <PRow label="Attachment instructions" value={attachDesc || "—"} />
              </>}
              <PRow label="Allow past date applications" value={yn(pastDates)} />
              {pastDates === "yes" && <PRow label="Apply up to after leave date" value={pastDays ? `${pastDays} Days` : "—"} />}
            </PSec>
          </div>
        )}

      </div>

      {/* ════ BOTTOM BAR ════ */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-8 py-3.5 flex items-center justify-between z-20">
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate("/config/track/Attendance/extra-time/list")}
            className="px-4 py-2.5 bg-transparent text-gray-700 border-none text-sm font-semibold cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={() => savePolicy("draft")}
            className="px-4 py-2.5 bg-blue-50 text-blue-600 border-none rounded-md text-sm font-semibold cursor-pointer"
          >
            Save As Draft
          </button>
        </div>
        <div className="flex items-center gap-2.5">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="px-6 py-2.5 bg-transparent text-blue-600 border-none text-sm font-semibold cursor-pointer"
            >
              Previous
            </button>
          )}
          <button
            onClick={() => {
              if (step === 5) {
                savePolicy("active");
                return;
              }
              setStep((s) => Math.min(5, s + 1));
            }}
            className="px-8 py-2.5 bg-blue-600 text-white border-none rounded-lg text-sm font-semibold cursor-pointer"
          >
            {step === 5 ? "Save Policy" : "Next"}
          </button>
        </div>
      </div>

    </div>
  );
}