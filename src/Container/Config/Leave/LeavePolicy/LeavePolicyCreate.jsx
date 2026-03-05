import { useState } from "react";

const STEPS = ["Select Leave Types", "Usage Policy", "Hourly Leave", "Leave Config", "Preview"];
const LEAVE_TYPES = ["Hourly Leave", "Medical Leave", "Unpaid Leave*", "Custom Leave*"];
const SANDWICH_SUB = ["In between leave (intervening/sandwiched)", "Before leave (prefix)", "After leave (suffix)"];
const SANDWICH_KEYS = [
  { key: "mandatory", label: "Deduct if mandatory holidays occurs" },
  { key: "optional",  label: "Deduct if optional holidays occurs" },
  { key: "weeklyoff", label: "Deduct if weekly-offs occurs" },
];

// ── UI Atoms ──────────────────────────────────────────────────────────────────

const Inp = ({ placeholder, value, onChange, suffix, style }) => (
  <div style={{ display:"flex", alignItems:"center", border:"1px solid #d1d5db", borderRadius:6, background:"#fff", overflow:"hidden", ...style }}>
    <input value={value||""} onChange={onChange} placeholder={placeholder||"Enter value"}
      style={{ flex:1, border:"none", outline:"none", padding:"8px 12px", fontSize:13, color:"#374151", background:"transparent" }}/>
    {suffix && <span style={{ padding:"0 10px", fontSize:12, color:"#94a3b8", borderLeft:"1px solid #e5e7eb", whiteSpace:"nowrap" }}>{suffix}</span>}
  </div>
);

const Sel = ({ placeholder, value, onChange, options=[], style }) => (
  <select value={value||""} onChange={onChange}
    style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:6, padding:"8px 12px", fontSize:13, color:value?"#374151":"#9ca3af", background:"#fff", outline:"none", ...style }}>
    <option value="">{placeholder||"Select"}</option>
    {options.map(o=><option key={o} value={o}>{o}</option>)}
  </select>
);

const Txt = ({ placeholder, value, onChange, rows=3 }) => (
  <textarea value={value||""} onChange={onChange} placeholder={placeholder||"Enter description"} rows={rows}
    style={{ width:"100%", border:"1px solid #d1d5db", borderRadius:6, padding:"8px 12px", fontSize:13, color:"#374151", resize:"vertical", outline:"none", boxSizing:"border-box" }}/>
);

const Lbl = ({ children, sm, bold }) => (
  <p style={{ fontSize:sm?12:13, fontWeight:bold?700:"normal", color:sm?"#6b7280":"#374151", marginBottom:4, marginTop:sm?6:10 }}>{children}</p>
);

const SecHead = ({ title }) => (
  <div style={{ borderBottom:"2px solid #e5e7eb", marginBottom:10, marginTop:20, paddingBottom:4 }}>
    <span style={{ fontWeight:700, fontSize:13, color:"#374151" }}>{title}</span>
  </div>
);

const FRow = ({ children, gap=12, style }) => (
  <div style={{ display:"flex", gap, alignItems:"flex-start", ...style }}>{children}</div>
);

const RR = ({ label, checked, onChange, children, indent=0 }) => (
  <div style={{ border:"1px solid #e5e7eb", borderRadius:6, marginBottom:4 }}>
    <div onClick={onChange} style={{ display:"flex", alignItems:"center", gap:10, padding:`10px ${12+indent*16}px`, cursor:"pointer", background:checked?"#eff6ff":"#fff", borderRadius:(checked&&children)?"6px 6px 0 0":6 }}>
      <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${checked?"#3b82f6":"#d1d5db"}`, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {checked && <div style={{ width:8, height:8, borderRadius:"50%", background:"#3b82f6" }}/>}
      </div>
      <span style={{ fontSize:13, color:"#374151" }}>{label}</span>
    </div>
    {checked && children && (
      <div style={{ padding:"8px 12px 12px 38px", background:"#f0f7ff", borderTop:"1px solid #e5e7eb", borderRadius:"0 0 6px 6px" }}>{children}</div>
    )}
  </div>
);

const CR = ({ label, checked, onChange, children, indent=0 }) => (
  <div style={{ border:"1px solid #e5e7eb", borderRadius:6, marginBottom:4 }}>
    <div onClick={onChange} style={{ display:"flex", alignItems:"center", gap:10, padding:`10px ${12+indent*16}px`, cursor:"pointer", background:"#fff", borderRadius:6 }}>
      <div style={{ width:16, height:16, borderRadius:"50%", border:`2px solid ${checked?"#3b82f6":"#d1d5db"}`, background:"#fff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
        {checked && <div style={{ width:8, height:8, borderRadius:"50%", background:"#3b82f6" }}/>}
      </div>
      <span style={{ fontSize:13, color:"#374151" }}>{label}</span>
    </div>
    {checked && children && (
      <div style={{ padding:"8px 12px 12px 38px", borderTop:"1px solid #e5e7eb" }}>{children}</div>
    )}
  </div>
);

const SubOpts = () => (
  <div style={{ display:"flex", flexDirection:"column", gap:4, marginTop:6 }}>
    {SANDWICH_SUB.map(sub=>(
      <div key={sub} style={{ border:"1px solid #e5e7eb", borderRadius:6, padding:"8px 12px", background:"#f9fafb", display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ width:14, height:14, borderRadius:"50%", border:"2px solid #3b82f6", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#3b82f6" }}/>
        </div>
        <span style={{ fontSize:12, color:"#374151" }}>{sub}</span>
      </div>
    ))}
  </div>
);

const SandwichSection = ({ sandwiched, onSandwich, sandwichTypes, onToggleType }) => (
  <>
    <RR label="Yes, deduct leaves for applied dates and additional leaves in the following manner"
      checked={sandwiched==="yes"} onChange={()=>onSandwich("yes")}>
      {SANDWICH_KEYS.map(({key,label})=>(
        <CR key={key} label={label} checked={sandwichTypes.includes(key)} onChange={()=>onToggleType(key)}>
          <SubOpts/>
        </CR>
      ))}
    </RR>
    <RR label="No, deduct leaves only for applied dates" checked={sandwiched==="no"} onChange={()=>onSandwich("no")}/>
  </>
);

// ── CIRCLE STEPPER ─────────────────────────────────────────────────────────────

function Stepper({ currentStep }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-evenly",width:"100%", marginBottom:32 }}>
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;

        return (
          <div key={label} style={{ display:"flex", alignItems:"center" }}>
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
              {/* Circle */}
              <div style={{
                width:32, height:32, borderRadius:"50%",
                border:`2px solid ${isActive||isDone?"#3b82f6":"#d1d5db"}`,
                background: isDone ? "#3b82f6" : "#fff",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, fontWeight:600,
                color: isDone ? "#fff" : isActive ? "#3b82f6" : "#9ca3af",
                transition:"all 0.3s",
              }}>
                {isDone ? "✓" : stepNum}
              </div>
              {/* Label */}
              <span style={{
                fontSize:11, marginTop:4, whiteSpace:"nowrap", textAlign:"center",
                color: isActive ? "#3b82f6" : "#9ca3af",
                fontWeight: isActive ? 700 : 400,
                maxWidth:80, overflow:"hidden", textOverflow:"ellipsis",
              }}>
                {label}
              </span>
            </div>

            {/* Connector line */}
            {idx < STEPS.length - 1 && (
              <div style={{
                height:1, width:60, margin:"0 8px", marginBottom:20,
                background: isDone ? "#3b82f6" : "#e5e7eb",
                transition:"background 0.3s",
              }}/>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── PREVIEW ROW ────────────────────────────────────────────────────────────────

function PreviewRow({ label, value }) {
  const display = value === true ? "yes" : value === false ? "no" : value || "—";
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", border:"1px solid #f0f0f0", borderRadius:8, padding:"10px 16px", background:"#f9fafb", marginBottom:6 }}>
      <span style={{ fontSize:13, color:"#6b7280" }}>{label}</span>
      <span style={{ fontSize:13, fontWeight:600, color: display==="yes"?"#16a34a": display==="no"?"#ef4444":"#374151", textTransform:"capitalize" }}>
        {Array.isArray(display) ? display.join(", ") : String(display)}
      </span>
    </div>
  );
}

// ── MAIN COMPONENT ────────────────────────────────────────────────────────────

export default function CreateLeavePolicy({ onBack }) {
  const [step, setStep] = useState(1);

  const [s1, setS1] = useState({ policyName:"", description:"", selectedTypes:[] });

  const [s2, setS2] = useState({
    leaveName:"", usageLimitType:"", maxDaysLeave:"", maxConsecutive:"",
    halfDay:"yes",
    limitFuture:"yes", futureDuration:"", futureApplyAtLeast:"", futureNotEarlier:"",
    allowPast:"yes", pastDays:"",
    sandwiched:"yes", sandwichTypes:["mandatory","optional","weeklyoff"],
    clubbing:"yes", clubbingTypes:"",
  });

  const [s3, setS3] = useState({
    hourlyName:"", maxHours:"", employmentType:"",
    calcType:"prorate", prorateFrom:"joining",
    joinMonthCalc:"irrespective", joinAfterDays:"",
    includeExtendedProbation:false,
    probationMonthCalc:"full", probationAfterDays:"",
    noProRateType:"all",
    joinsOnOrBefore:"", joinsOnOrBeforeDays:"", joinsOnOrBeforeMonth:"", elseCalcFrom:"",
    disbursal:"credited",
    carryForward:"carry", carryType:"all", minHoursPerDay:"", leaveHours:"",
    approval:"bypass",
  });

  const [s4, setS4] = useState({
    leaveName4:"", allocation:"auto", annualDays:"",
    gender:"", empType4:"", marital:"",
    calcType4:"prorate", prorateFrom4:"joining",
    joinCalc4:"irrespective", joinAfterDays4:"",
    extProbation4:false,
    probCalc4:"full", probAfterDays4:"",
    noProRate4:"all",
    joinsOnOrBefore4:"", joinsOnOrBeforeDays4:"", joinsMonth4:"", elseCalcFrom4:"",
    disbursal4:"credited",
    limitProbationCredit:"yes", creditUntilProbationSel:"", creditUntilProbationDays:"",
    attachments:"yes", attachmentDays:"", attachmentNote:"",
    maxProbationDays:"",
    accumProbation:"yes",
    applyDuringProbation1:"yes",
    applyDuringProbation2:"yes",
    afterConfirmPeriod:"", afterConfirmMax:"",
    maxConsecutive4:"",
    halfDay4:"yes",
    limitFuture4:"yes", futureDuration4:"", futureApplyAtLeast4:"", futureNotEarlier4:"",
    allowPast4:"yes", pastDays4:"",
    sandwiched4:"yes", sandwichTypes4:["mandatory","optional","weeklyoff"],
    clubbing4:"yes", clubbingTypes4:"",
    overutil:"allow", overutilType:"deduct", deductFrom:"",
    carryForward4:true, carryFwdLimit:"", carryFwdUnused:"",
    encash4:true, encashLimit:"", encashUnused:"",
    giftLeave:"yes", giftLeavesPerYear:"",
    giftReceive:"yes",
  });

  const u1 = p => setS1(prev=>({...prev,...p}));
  const u2 = p => setS2(prev=>({...prev,...p}));
  const u3 = p => setS3(prev=>({...prev,...p}));
  const u4 = p => setS4(prev=>({...prev,...p}));
  const toggleArr = (arr,val) => arr.includes(val)?arr.filter(x=>x!==val):[...arr,val];

  return (
    <div style={{ fontFamily:"sans-serif", fontSize:14, color:"#1e293b", background:"#fff", minHeight:"100vh" }}>

      {/* Header */}
      <div style={{ padding:"20px 24px 0" }}>
        <h1 style={{ fontSize:20, fontWeight:700, color:"#111827", margin:0 }}>Create Leave Policy</h1>
        <p style={{ fontSize:13, color:"#9ca3af", marginTop:2, marginBottom:24 }}>Manage employee directory, documents, and role-based actions.</p>
      </div>

      {/* ── Circle Stepper ── */}
      <div style={{ padding:"0px" }}>
        <Stepper currentStep={step} />
      </div>

      <hr style={{ border:"none", borderTop:"1px solid #f0f0f0", margin:"0 24px 24px" }}/>

      {/* ── Step Content ── */}
      <div style={{ padding:"0 24px", paddingBottom:100 }}>

        {/* STEP 1 */}
        {step===1 && (
          <div>
            <Lbl>Policy Name</Lbl>
            <Inp value={s1.policyName} onChange={e=>u1({policyName:e.target.value})} placeholder="Enter policy name"/>

            <Lbl>Let's write a brief description about this policy</Lbl>
            <Txt value={s1.description} onChange={e=>u1({description:e.target.value})} rows={4} placeholder="Enter description"/>

            <Lbl>Choose the type of leaves you would like to enable in this policy</Lbl>
            <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:8 }}>
              {LEAVE_TYPES.map(type=>{
                const sel = s1.selectedTypes.includes(type);
                return (
                  <div key={type} onClick={()=>u1({selectedTypes:toggleArr(s1.selectedTypes,type)})}
                    style={{ display:"flex", alignItems:"center", gap:10, border:`1px solid ${sel?"#3b82f6":"#e5e7eb"}`, borderRadius:6, padding:"12px 16px", cursor:"pointer", background:sel?"#eff6ff":"#f9fafb" }}>
                    <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${sel?"#3b82f6":"#9ca3af"}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      {sel && <div style={{ width:8, height:8, borderRadius:"50%", background:"#3b82f6" }}/>}
                    </div>
                    <span style={{ fontSize:13, color:"#374151" }}>{type}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step===2 && (
          <div>
            <Lbl>Let's give this leave a name</Lbl>
            <Inp value={s2.leaveName} onChange={e=>u2({leaveName:e.target.value})} placeholder="Enter leave name"/>

            <SecHead title="Usage Policy"/>
            <Lbl>Let's configure the leave usage limits</Lbl>
            <FRow>
              <div style={{ flex:1 }}><Sel value={s2.usageLimitType} onChange={e=>u2({usageLimitType:e.target.value})} options={["Per Month","Per Year"]}/></div>
              <div style={{ flex:1 }}><Inp value={s2.maxDaysLeave} onChange={e=>u2({maxDaysLeave:e.target.value})} suffix="Days" placeholder="Maximum days"/></div>
            </FRow>

            <Lbl>How many maximum consecutive leaves you want to allow?</Lbl>
            <FRow gap={8}><Inp value={s2.maxConsecutive} onChange={e=>u2({maxConsecutive:e.target.value})} style={{ maxWidth:180 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>

            <Lbl>Would you like to allow half-day leave applications?</Lbl>
            <RR label="Yes" checked={s2.halfDay==="yes"} onChange={()=>u2({halfDay:"yes"})}/>
            <RR label="No"  checked={s2.halfDay==="no"}  onChange={()=>u2({halfDay:"no"})}/>

            <Lbl>Do you want to limit leave applications for future dates?</Lbl>
            <RR label="Yes" checked={s2.limitFuture==="yes"} onChange={()=>u2({limitFuture:"yes"})}>
              <FRow>
                <div style={{ flex:1 }}>
                  <Lbl sm>If leave duration is greater than</Lbl>
                  <FRow gap={6}><Inp value={s2.futureDuration} onChange={e=>u2({futureDuration:e.target.value})} style={{ flex:1 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </div>
                <div style={{ flex:1 }}>
                  <Lbl sm>Employee must apply at least</Lbl>
                  <FRow gap={6}><Inp value={s2.futureApplyAtLeast} onChange={e=>u2({futureApplyAtLeast:e.target.value})} style={{ flex:1 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </div>
              </FRow>
              <Lbl sm>But not earlier than</Lbl>
              <FRow gap={6}><Inp value={s2.futureNotEarlier} onChange={e=>u2({futureNotEarlier:e.target.value})} style={{ maxWidth:180 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
            </RR>
            <RR label="No" checked={s2.limitFuture==="no"} onChange={()=>u2({limitFuture:"no"})}/>

            <Lbl>Do you want to allow leave application for past dates?</Lbl>
            <RR label="Yes" checked={s2.allowPast==="yes"} onChange={()=>u2({allowPast:"yes"})}>
              <Lbl sm>Leave application can be made upto days after actual leave date</Lbl>
              <FRow gap={6}><Inp value={s2.pastDays} onChange={e=>u2({pastDays:e.target.value})} style={{ maxWidth:180 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
            </RR>
            <RR label="No" checked={s2.allowPast==="no"} onChange={()=>u2({allowPast:"no"})}/>

            <SecHead title="Sandwiched/Intervening Leaves"/>
            <Lbl>If leaves are applied next to or in-between holidays/weekly-offs, should there be additional leave deductions?</Lbl>
            <SandwichSection sandwiched={s2.sandwiched} onSandwich={v=>u2({sandwiched:v})} sandwichTypes={s2.sandwichTypes} onToggleType={k=>u2({sandwichTypes:toggleArr(s2.sandwichTypes,k)})}/>

            <SecHead title="Leave Clubbing"/>
            <Lbl>Allow employees to apply for different types of leaves, adjacent to each other</Lbl>
            <RR label="Yes" checked={s2.clubbing==="yes"} onChange={()=>u2({clubbing:"yes"})}>
              <Lbl sm>For the following type(s) of leaves</Lbl>
              <Sel value={s2.clubbingTypes} onChange={e=>u2({clubbingTypes:e.target.value})}/>
            </RR>
            <RR label="No, deduct leaves only for applied dates" checked={s2.clubbing==="no"} onChange={()=>u2({clubbing:"no"})}/>
          </div>
        )}

        {/* STEP 3 */}
        {step===3 && (
          <div>
            <Lbl>Let's give this hourly leave a name</Lbl>
            <Inp value={s3.hourlyName} onChange={e=>u3({hourlyName:e.target.value})} placeholder="Enter hourly leave name"/>

            <Lbl>Maximum hours allocated per month</Lbl>
            <Inp value={s3.maxHours} onChange={e=>u3({maxHours:e.target.value})} suffix="HRS" placeholder="Enter hours"/>

            <SecHead title="Who, How & When (Calculations & Disbursal)"/>
            <Lbl>Who can avail this leave balance?</Lbl>
            <Lbl sm>Employment Type</Lbl>
            <Sel value={s3.employmentType} onChange={e=>u3({employmentType:e.target.value})} options={["Full-time","Part-time","Contract"]}/>

            <Lbl>How will the leave balance be calculated?</Lbl>
            <RR label="Pro-rate" checked={s3.calcType==="prorate"} onChange={()=>u3({calcType:"prorate"})}>
              <RR label="Pro-rate from joining date" checked={s3.prorateFrom==="joining"} onChange={()=>u3({prorateFrom:"joining"})} indent={1}>
                <RR label="Calculate leaves for the joining month, irrespective of joining date" checked={s3.joinMonthCalc==="irrespective"} onChange={()=>u3({joinMonthCalc:"irrespective"})} indent={1}/>
                <RR label="Calculate half month's leave for joining month, if employee joins after" checked={s3.joinMonthCalc==="half"} onChange={()=>u3({joinMonthCalc:"half"})} indent={1}>
                  <FRow gap={6}><Inp value={s3.joinAfterDays} onChange={e=>u3({joinAfterDays:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </RR>
              </RR>
              <RR label="Pro-rate from probation end date" checked={s3.prorateFrom==="probation"} onChange={()=>u3({prorateFrom:"probation"})} indent={1}>
                <CR label="Include extended probation, if any" checked={s3.includeExtendedProbation} onChange={()=>u3({includeExtendedProbation:!s3.includeExtendedProbation})} indent={1}/>
                <RR label="Calculate leaves for the probation end month" checked={s3.probationMonthCalc==="full"} onChange={()=>u3({probationMonthCalc:"full"})} indent={1}/>
                <RR label="Calculate half month's leave for probation end month, if probation end date is after" checked={s3.probationMonthCalc==="half"} onChange={()=>u3({probationMonthCalc:"half"})} indent={1}>
                  <FRow gap={6}><Inp value={s3.probationAfterDays} onChange={e=>u3({probationAfterDays:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </RR>
              </RR>
            </RR>
            <RR label="Do not pro-rate" checked={s3.calcType==="noprorate"} onChange={()=>u3({calcType:"noprorate"})}>
              <RR label="Don't pro-rate, calculate all leaves irrespective of any joining or probation date" checked={s3.noProRateType==="all"} onChange={()=>u3({noProRateType:"all"})} indent={1}/>
              <RR label="Don't pro-rate, if employees joins on or before" checked={s3.noProRateType==="conditional"} onChange={()=>u3({noProRateType:"conditional"})} indent={1}>
                <FRow gap={8} style={{ marginTop:6 }}>
                  <Sel value={s3.joinsOnOrBefore} onChange={e=>u3({joinsOnOrBefore:e.target.value})} options={["1","5","10","15"]}/>
                  <Inp value={s3.joinsOnOrBeforeDays} onChange={e=>u3({joinsOnOrBeforeDays:e.target.value})} suffix="Days"/>
                  <Sel value={s3.joinsOnOrBeforeMonth} onChange={e=>u3({joinsOnOrBeforeMonth:e.target.value})} options={["January","February","March","April","May","June","July","August","September","October","November","December"]}/>
                </FRow>
                <Lbl sm>Else for other employees calculate from</Lbl>
                <Sel value={s3.elseCalcFrom} onChange={e=>u3({elseCalcFrom:e.target.value})} options={["Joining Date","Probation End Date"]}/>
              </RR>
            </RR>

            <Lbl>When will the leave balance be available?</Lbl>
            <RR label="Leave balance will be accrued (at the beginning of month)" checked={s3.disbursal==="accrued"} onChange={()=>u3({disbursal:"accrued"})}/>
            <RR label="Leave balance will be credited all at once" checked={s3.disbursal==="credited"} onChange={()=>u3({disbursal:"credited"})}/>

            <SecHead title="Carry Forward"/>
            <Lbl>How do we handle unused leave balance, at the end of a month?</Lbl>
            <RR label="Don't do anything, let the hourly leave balance lapse" checked={s3.carryForward==="lapse"} onChange={()=>u3({carryForward:"lapse"})}/>
            <RR label="Carry forward" checked={s3.carryForward==="carry"} onChange={()=>u3({carryForward:"carry"})}>
              <RR label="Carry forward all unused leaves to the next cycle" checked={s3.carryType==="all"} onChange={()=>u3({carryType:"all"})} indent={1}/>
              <RR label="Carry forward only a limited amount" checked={s3.carryType==="limited"} onChange={()=>u3({carryType:"limited"})} indent={1}>
                <Lbl sm>Allow only a minimum hours leave in a day</Lbl>
                <FRow>
                  <div style={{ flex:1 }}><Sel value={s3.minHoursPerDay} onChange={e=>u3({minHoursPerDay:e.target.value})}/></div>
                  <div style={{ flex:1 }}>
                    <Lbl sm>Leave Hours</Lbl>
                    <Inp value={s3.leaveHours} onChange={e=>u3({leaveHours:e.target.value})} suffix="HRS"/>
                  </div>
                </FRow>
                <p style={{ fontSize:11, color:"#e57373", marginTop:6 }}>Note: Remaining leaves will be discarded/lapsed, if any</p>
              </RR>
            </RR>

            <SecHead title="Approval Workflow"/>
            <Lbl>How do you want to process an application of Hourly Leave?</Lbl>
            <RR label="Follow existing Leave Approval Workflow" checked={s3.approval==="existing"} onChange={()=>u3({approval:"existing"})}/>
            <RR label="Bypass existing workflow, directly send to Reporting Manager(s) for approval" checked={s3.approval==="bypass"} onChange={()=>u3({approval:"bypass"})}/>
            <RR label="Auto-approve hourly leave applications and notify manager/admin" checked={s3.approval==="auto"} onChange={()=>u3({approval:"auto"})}/>
          </div>
        )}

        {/* STEP 4 */}
        {step===4 && (
          <div>
            <Lbl>Let's give this leave a name</Lbl>
            <Inp value={s4.leaveName4} onChange={e=>u4({leaveName4:e.target.value})} placeholder="Enter leave name"/>

            <SecHead title="Leave Allocation"/>
            <Lbl>How do you want to define annual allotment of leave balance?</Lbl>
            <RR label="Automatically allocate annual leave balance" checked={s4.allocation==="auto"} onChange={()=>u4({allocation:"auto"})}>
              <FRow gap={8} style={{ marginTop:6 }}>
                <Inp value={s4.annualDays} onChange={e=>u4({annualDays:e.target.value})} style={{ maxWidth:160 }} placeholder="Enter days"/>
                <span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span>
              </FRow>
            </RR>
            <RR label="Manually allocate leave balance per month" checked={s4.allocation==="manual"} onChange={()=>u4({allocation:"manual"})}/>

            <SecHead title="Who, How & When (Calculations & Disbursal)"/>
            <Lbl>Who can avail this leave balance?</Lbl>
            <Lbl sm>Gender</Lbl>
            <Sel value={s4.gender} onChange={e=>u4({gender:e.target.value})} options={["Male","Female","All"]}/>
            <Lbl sm>Employment Type</Lbl>
            <Sel value={s4.empType4} onChange={e=>u4({empType4:e.target.value})} options={["Full-time","Part-time","Contract"]}/>
            <Lbl sm>Marital Status</Lbl>
            <Sel value={s4.marital} onChange={e=>u4({marital:e.target.value})} options={["Single","Married","Any"]}/>

            <Lbl>How will the leave balance be calculated?</Lbl>
            <RR label="Pro-rate" checked={s4.calcType4==="prorate"} onChange={()=>u4({calcType4:"prorate"})}>
              <RR label="Pro-rate from joining date" checked={s4.prorateFrom4==="joining"} onChange={()=>u4({prorateFrom4:"joining"})} indent={1}>
                <RR label="Calculate leaves for the joining month, irrespective of joining date" checked={s4.joinCalc4==="irrespective"} onChange={()=>u4({joinCalc4:"irrespective"})} indent={1}/>
                <RR label="Calculate half month's leave for joining month, if employee joins after" checked={s4.joinCalc4==="half"} onChange={()=>u4({joinCalc4:"half"})} indent={1}>
                  <FRow gap={6}><Inp value={s4.joinAfterDays4} onChange={e=>u4({joinAfterDays4:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </RR>
              </RR>
              <RR label="Pro-rate from probation end date" checked={s4.prorateFrom4==="probation"} onChange={()=>u4({prorateFrom4:"probation"})} indent={1}>
                <CR label="Include extended probation, if any" checked={s4.extProbation4} onChange={()=>u4({extProbation4:!s4.extProbation4})} indent={1}/>
                <RR label="Calculate leaves for the probation end month" checked={s4.probCalc4==="full"} onChange={()=>u4({probCalc4:"full"})} indent={1}/>
                <RR label="Calculate half month's leave for probation end month, if after" checked={s4.probCalc4==="half"} onChange={()=>u4({probCalc4:"half"})} indent={1}>
                  <FRow gap={6}><Inp value={s4.probAfterDays4} onChange={e=>u4({probAfterDays4:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
                </RR>
              </RR>
            </RR>
            <RR label="Do not pro-rate" checked={s4.calcType4==="noprorate"} onChange={()=>u4({calcType4:"noprorate"})}>
              <RR label="Don't pro-rate, calculate all leaves irrespective of any joining or probation date" checked={s4.noProRate4==="all"} onChange={()=>u4({noProRate4:"all"})} indent={1}/>
              <RR label="Don't pro-rate, if employees joins on or before" checked={s4.noProRate4==="conditional"} onChange={()=>u4({noProRate4:"conditional"})} indent={1}>
                <FRow gap={8} style={{ marginTop:6 }}>
                  <Sel value={s4.joinsOnOrBefore4} onChange={e=>u4({joinsOnOrBefore4:e.target.value})} options={["1","5","10","15"]}/>
                  <Inp value={s4.joinsOnOrBeforeDays4} onChange={e=>u4({joinsOnOrBeforeDays4:e.target.value})} suffix="Days"/>
                  <Sel value={s4.joinsMonth4} onChange={e=>u4({joinsMonth4:e.target.value})} options={["January","February","March","April","May","June","July","August","September","October","November","December"]}/>
                </FRow>
                <Lbl sm>Else for other employees calculate from</Lbl>
                <Sel value={s4.elseCalcFrom4} onChange={e=>u4({elseCalcFrom4:e.target.value})} options={["Joining Date","Probation End Date"]}/>
              </RR>
            </RR>

            <Lbl>When will the leave balance be available?</Lbl>
            <RR label="Leave balance will be accrued" checked={s4.disbursal4==="accrued"} onChange={()=>u4({disbursal4:"accrued"})}/>
            <RR label="Leave balance will be credited all at once" checked={s4.disbursal4==="credited"} onChange={()=>u4({disbursal4:"credited"})}>
              <Lbl>Do you want to limit credit during probation?</Lbl>
              <RR label="Yes" checked={s4.limitProbationCredit==="yes"} onChange={()=>u4({limitProbationCredit:"yes"})} indent={1}>
                <Lbl sm>Credit only leaves until probation ends</Lbl>
                <FRow gap={8}><Sel value={s4.creditUntilProbationSel} onChange={e=>u4({creditUntilProbationSel:e.target.value})} options={["1","2","3","5","10"]}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
              </RR>
              <RR label="No" checked={s4.limitProbationCredit==="no"} onChange={()=>u4({limitProbationCredit:"no"})} indent={1}/>
            </RR>

            <SecHead title="Usage Policy"/>
            <Lbl>Do you want to keep attachments compulsory for this leave?</Lbl>
            <RR label="Yes" checked={s4.attachments==="yes"} onChange={()=>u4({attachments:"yes"})}>
              <Lbl sm>Supporting documents required if leave duration is greater than</Lbl>
              <FRow gap={6}><Inp value={s4.attachmentDays} onChange={e=>u4({attachmentDays:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
              <Lbl sm>Explanatory note visible to employee</Lbl>
              <Txt value={s4.attachmentNote} onChange={e=>u4({attachmentNote:e.target.value})} rows={3}/>
            </RR>
            <RR label="No" checked={s4.attachments==="no"} onChange={()=>u4({attachments:"no"})}/>

            <Lbl bold>During Probation</Lbl>
            <Lbl>Allow only a maximum of days leave in a probation month</Lbl>
            <FRow gap={6}><Inp value={s4.maxProbationDays} onChange={e=>u4({maxProbationDays:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>

            <Lbl>Allow accumulation of balance in probation period</Lbl>
            <RR label="Yes" checked={s4.accumProbation==="yes"} onChange={()=>u4({accumProbation:"yes"})}/>
            <RR label="No"  checked={s4.accumProbation==="no"}  onChange={()=>u4({accumProbation:"no"})}/>

            <Lbl>Do you want to allow employees to apply this leave during probation?</Lbl>
            <RR label="Yes" checked={s4.applyDuringProbation1==="yes"} onChange={()=>u4({applyDuringProbation1:"yes"})}/>
            <RR label="No"  checked={s4.applyDuringProbation1==="no"}  onChange={()=>u4({applyDuringProbation1:"no"})}/>

            <Lbl bold>After Confirmation</Lbl>
            <FRow>
              <div style={{ flex:1 }}><Lbl sm>Period</Lbl><Sel value={s4.afterConfirmPeriod} onChange={e=>u4({afterConfirmPeriod:e.target.value})} options={["Monthly","Yearly"]}/></div>
              <div style={{ flex:1 }}><Lbl sm>Maximum Leaves</Lbl><Sel value={s4.afterConfirmMax} onChange={e=>u4({afterConfirmMax:e.target.value})} options={["5","10","15","20"]}/></div>
            </FRow>

            <Lbl>How many maximum consecutive leaves you want to allow?</Lbl>
            <FRow gap={6}><Inp value={s4.maxConsecutive4} onChange={e=>u4({maxConsecutive4:e.target.value})} style={{ maxWidth:160 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>

            <Lbl>Would you like to allow half-day leave applications?</Lbl>
            <RR label="Yes" checked={s4.halfDay4==="yes"} onChange={()=>u4({halfDay4:"yes"})}/>
            <RR label="No"  checked={s4.halfDay4==="no"}  onChange={()=>u4({halfDay4:"no"})}/>

            <Lbl>Do you want to limit leave applications for future dates?</Lbl>
            <RR label="Yes" checked={s4.limitFuture4==="yes"} onChange={()=>u4({limitFuture4:"yes"})}>
              <FRow>
                <div style={{ flex:1 }}><Lbl sm>If leave duration is greater than</Lbl><FRow gap={6}><Inp value={s4.futureDuration4} onChange={e=>u4({futureDuration4:e.target.value})} style={{ flex:1 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow></div>
                <div style={{ flex:1 }}><Lbl sm>Employee must apply at least</Lbl><FRow gap={6}><Inp value={s4.futureApplyAtLeast4} onChange={e=>u4({futureApplyAtLeast4:e.target.value})} style={{ flex:1 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow></div>
              </FRow>
              <Lbl sm>But not earlier than</Lbl>
              <FRow gap={6}><Inp value={s4.futureNotEarlier4} onChange={e=>u4({futureNotEarlier4:e.target.value})} style={{ maxWidth:180 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
            </RR>
            <RR label="No" checked={s4.limitFuture4==="no"} onChange={()=>u4({limitFuture4:"no"})}/>

            <Lbl>Do you want to allow leave application for past dates?</Lbl>
            <RR label="Yes" checked={s4.allowPast4==="yes"} onChange={()=>u4({allowPast4:"yes"})}>
              <Lbl sm>Leave application can be made upto days after actual leave date</Lbl>
              <FRow gap={6}><Inp value={s4.pastDays4} onChange={e=>u4({pastDays4:e.target.value})} style={{ maxWidth:180 }}/><span style={{ fontSize:12, color:"#6b7280", paddingTop:10 }}>Days</span></FRow>
            </RR>
            <RR label="No" checked={s4.allowPast4==="no"} onChange={()=>u4({allowPast4:"no"})}/>

            <SecHead title="Sandwiched/Intervening Leaves"/>
            <Lbl>If leaves are applied next to or in-between holidays/weekly-offs, should there be additional leave deductions?</Lbl>
            <SandwichSection sandwiched={s4.sandwiched4} onSandwich={v=>u4({sandwiched4:v})} sandwichTypes={s4.sandwichTypes4} onToggleType={k=>u4({sandwichTypes4:toggleArr(s4.sandwichTypes4,k)})}/>

            <SecHead title="Leave Clubbing"/>
            <Lbl>Allow employees to apply for different types of leaves, adjacent to each other</Lbl>
            <RR label="Yes" checked={s4.clubbing4==="yes"} onChange={()=>u4({clubbing4:"yes"})}>
              <Lbl sm>For the following type(s) of leaves</Lbl>
              <Sel value={s4.clubbingTypes4} onChange={e=>u4({clubbingTypes4:e.target.value})}/>
            </RR>
            <RR label="No, deduct leaves only for applied dates" checked={s4.clubbing4==="no"} onChange={()=>u4({clubbing4:"no"})}/>

            <SecHead title="Leave Overutilization"/>
            <Lbl>How do we handle leave applications which exceed the available leave balance?</Lbl>
            <RR label="Don't allow leave applications in excess of available balance" checked={s4.overutil==="deny"} onChange={()=>u4({overutil:"deny"})}/>
            <RR label="Allow leave applications in excess of available balance" checked={s4.overutil==="allow"} onChange={()=>u4({overutil:"allow"})}>
              <RR label="Count excess leaves as paid (leave balance will go into negative)" checked={s4.overutilType==="paid"} onChange={()=>u4({overutilType:"paid"})} indent={1}/>
              <RR label="Count excess leaves as unpaid" checked={s4.overutilType==="unpaid"} onChange={()=>u4({overutilType:"unpaid"})} indent={1}/>
              <RR label="Deduct excess leaves from another leave type" checked={s4.overutilType==="deduct"} onChange={()=>u4({overutilType:"deduct"})} indent={1}>
                <Sel value={s4.deductFrom} onChange={e=>u4({deductFrom:e.target.value})}/>
              </RR>
            </RR>

            <SecHead title="Carry Forward & Encashment"/>
            <Lbl>What do we do about unused leave balance, at the end of a leave cycle/year?</Lbl>
            <RR label="Don't do anything, let the leave balance lapse" checked={!s4.carryForward4&&!s4.encash4} onChange={()=>u4({carryForward4:false,encash4:false})}/>
            <CR label="Carry forward" checked={s4.carryForward4} onChange={()=>u4({carryForward4:!s4.carryForward4})}>
              <FRow>
                <div style={{ flex:1 }}><Sel value={s4.carryFwdLimit} onChange={e=>u4({carryFwdLimit:e.target.value})}/></div>
                <div style={{ flex:1 }}><Lbl sm>Unused leaves</Lbl><Inp value={s4.carryFwdUnused} onChange={e=>u4({carryFwdUnused:e.target.value})}/></div>
              </FRow>
            </CR>
            <CR label="Encash" checked={s4.encash4} onChange={()=>u4({encash4:!s4.encash4})}>
              <FRow>
                <div style={{ flex:1 }}><Sel value={s4.encashLimit} onChange={e=>u4({encashLimit:e.target.value})}/></div>
                <div style={{ flex:1 }}><Lbl sm>Unused leaves</Lbl><Inp value={s4.encashUnused} onChange={e=>u4({encashUnused:e.target.value})}/></div>
              </FRow>
            </CR>

            <SecHead title="Gift A Leave"/>
            <Lbl>How about allowing employees to "Gift" their leave balance to colleagues?</Lbl>
            <RR label="Yes" checked={s4.giftLeave==="yes"} onChange={()=>u4({giftLeave:"yes"})}>
              <Lbl sm>Allow employees to gift leaves per year</Lbl>
              <Inp value={s4.giftLeavesPerYear} onChange={e=>u4({giftLeavesPerYear:e.target.value})} placeholder="Enter number"/>
              <Lbl>Allow employees to receive gifted leaves?</Lbl>
              <RR label="Yes" checked={s4.giftReceive==="yes"} onChange={()=>u4({giftReceive:"yes"})} indent={1}/>
              <RR label="No"  checked={s4.giftReceive==="no"}  onChange={()=>u4({giftReceive:"no"})} indent={1}/>
            </RR>
            <RR label="No" checked={s4.giftLeave==="no"} onChange={()=>u4({giftLeave:"no"})}/>
          </div>
        )}

        {/* STEP 5 — PREVIEW */}
        {step===5 && (
          <div>
            <p style={{ fontSize:13, color:"#9ca3af", marginBottom:16 }}>Review your leave policy settings before saving.</p>

            {/* Step 1 summary */}
            <SecHead title="Step 1 — Select Leave Types"/>
            <PreviewRow label="Policy Name" value={s1.policyName}/>
            <PreviewRow label="Description" value={s1.description}/>
            <PreviewRow label="Selected Leave Types" value={s1.selectedTypes.length ? s1.selectedTypes : "—"}/>

            {/* Step 2 summary */}
            <SecHead title="Step 2 — Usage Policy"/>
            <PreviewRow label="Leave Name" value={s2.leaveName}/>
            <PreviewRow label="Usage Limit Type" value={s2.usageLimitType}/>
            <PreviewRow label="Max Days Leave" value={s2.maxDaysLeave}/>
            <PreviewRow label="Max Consecutive Days" value={s2.maxConsecutive}/>
            <PreviewRow label="Half Day Allowed" value={s2.halfDay}/>
            <PreviewRow label="Limit Future Applications" value={s2.limitFuture}/>
            <PreviewRow label="Allow Past Applications" value={s2.allowPast}/>
            <PreviewRow label="Sandwiched Leaves" value={s2.sandwiched}/>
            <PreviewRow label="Leave Clubbing" value={s2.clubbing}/>

            {/* Step 3 summary */}
            <SecHead title="Step 3 — Hourly Leave"/>
            <PreviewRow label="Hourly Leave Name" value={s3.hourlyName}/>
            <PreviewRow label="Max Hours / Month" value={s3.maxHours}/>
            <PreviewRow label="Employment Type" value={s3.employmentType}/>
            <PreviewRow label="Calculation Type" value={s3.calcType}/>
            <PreviewRow label="Disbursal" value={s3.disbursal}/>
            <PreviewRow label="Carry Forward" value={s3.carryForward}/>
            <PreviewRow label="Approval Workflow" value={s3.approval}/>

            {/* Step 4 summary */}
            <SecHead title="Step 4 — Leave Config"/>
            <PreviewRow label="Leave Name" value={s4.leaveName4}/>
            <PreviewRow label="Allocation" value={s4.allocation}/>
            <PreviewRow label="Annual Days" value={s4.annualDays}/>
            <PreviewRow label="Gender" value={s4.gender}/>
            <PreviewRow label="Employment Type" value={s4.empType4}/>
            <PreviewRow label="Marital Status" value={s4.marital}/>
            <PreviewRow label="Calculation Type" value={s4.calcType4}/>
            <PreviewRow label="Disbursal" value={s4.disbursal4}/>
            <PreviewRow label="Attachments Required" value={s4.attachments}/>
            <PreviewRow label="Max Probation Days" value={s4.maxProbationDays}/>
            <PreviewRow label="Accumulate During Probation" value={s4.accumProbation}/>
            <PreviewRow label="Apply During Probation" value={s4.applyDuringProbation1}/>
            <PreviewRow label="Half Day Allowed" value={s4.halfDay4}/>
            <PreviewRow label="Max Consecutive Days" value={s4.maxConsecutive4}/>
            <PreviewRow label="Sandwiched Leaves" value={s4.sandwiched4}/>
            <PreviewRow label="Leave Clubbing" value={s4.clubbing4}/>
            <PreviewRow label="Overutilization Policy" value={s4.overutil}/>
            <PreviewRow label="Carry Forward" value={s4.carryForward4?"yes":"no"}/>
            <PreviewRow label="Encashment" value={s4.encash4?"yes":"no"}/>
            <PreviewRow label="Gift A Leave" value={s4.giftLeave}/>
          </div>
        )}

      </div>

      {/* Fixed bottom nav */}
      <div style={{ position:"fixed", bottom:0, left:0, right:0, background:"#fff", borderTop:"1px solid #e5e7eb", padding:"14px 24px", display:"flex", justifyContent:"space-between", alignItems:"center", zIndex:100 }}>
        <button
          onClick={()=>step===1?(onBack&&onBack()):setStep(step-1)}
          style={{ display:"flex", alignItems:"center", gap:6, border:"1px solid #d1d5db", background:"#fff", borderRadius:6, padding:"8px 18px", fontSize:13, color:"#374151", cursor:"pointer", fontWeight:500 }}>
          ← {step===1?"Back to List":"Previous"}
        </button>

        <div style={{ display:"flex", gap:12 }}>
          <button
            onClick={()=>{}}
            style={{ border:"1px solid #3b82f6", background:"#fff", color:"#3b82f6", borderRadius:6, padding:"8px 18px", fontSize:13, cursor:"pointer", fontWeight:500 }}>
            Save as Draft
          </button>

          {step < 5
            ? <button onClick={()=>setStep(step+1)} style={{ background:"#3b82f6", color:"#fff", border:"none", borderRadius:6, padding:"8px 20px", fontSize:13, cursor:"pointer", fontWeight:600 }}>Next →</button>
            : <button onClick={()=>onBack&&onBack()} style={{ background:"#22c55e", color:"#fff", border:"none", borderRadius:6, padding:"8px 20px", fontSize:13, cursor:"pointer", fontWeight:600 }}>✓ Save Policy</button>
          }
        </div>
      </div>

    </div>
  );
}