import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaAngleDown } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import createAxios from "../../../../utils/axios.config";

const LEAVE_TYPES = ["Hourly Leave", "Medical Leave", "Unpaid Leave*", "Custom Leave*"];
const HOURLY_LEAVE_TYPE = "Hourly Leave";
const LOCKED_LEAVE_TYPE = "Unpaid Leave*";
const MAX_POLICY_VARIANTS = 3;
const SANDWICH_SUB = ["In between leave (intervening/sandwiched)", "Before leave (prefix)", "After leave (suffix)"];
const SANDWICH_KEYS = [
  { key: "mandatory", label: "Deduct if mandatory holidays occurs" },
  { key: "optional", label: "Deduct if optional holidays occurs" },
  { key: "weeklyoff", label: "Deduct if weekly-offs occurs" },
];
const SANDWICH_SUBTYPE_TO_FIELD = {
  "In between leave (intervening/sandwiched)": "BetweenLeaves",
  "Before leave (prefix)": "beforeLeaves",
  "After leave (suffix)": "afterLeaves",
};
const MONTH_LABEL_TO_SHORT = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const GAP_CLASSES = {
  6: "gap-[6px]",
  8: "gap-2",
  12: "gap-3",
};

const NUMERIC_INPUT_MAX = 99;
const SELECT_CONTROL_CLASS =
  "flex h-[38px] w-full items-center justify-between rounded-md border border-[#d1d5db] bg-white px-3 text-[13px] outline-none transition-[border-color,background-color,box-shadow] duration-150 hover:border-[#e6ebf2]";

const INDENT_CLASSES = {
  0: "px-3",
  1: "pl-7 pr-3",
};

const cn = (...classes) => classes.filter(Boolean).join(" ");
const normalizeSelectOption = (option) =>
  typeof option === "string"
    ? { value: option, label: option }
    : {
        value: option?.value ?? "",
        label: option?.label ?? String(option?.value ?? ""),
      };
const toBool = (value) => value === true || value === "yes";
const toNumber = (value) => Number(value || 0);
const normalizeLeaveType = (value) =>
  String(value || "")
    .replace(/\*/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-");
const getLeaveTypeLabel = (value) =>
  String(value || "")
    .replace(/\*/g, "")
    .trim();
const normalizeUsageLimitType = (value) =>
  value === "Per Year" ? "yearly" : value === "Per Month" ? "monthly" : String(value || "").trim().toLowerCase();
const normalizeElseCalcFrom = (value) =>
  value === "Joining Date" ? "joiningDate" : value === "Probation End Date" ? "nextMonth" : String(value || "").trim();
const normalizeSimple = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, "");
const normalizeMaritalStatus = (value) => {
  const normalized = normalizeSimple(value);
  return normalized === "any" ? "all" : normalized || "all";
};
const normalizeMonthShort = (value) => MONTH_LABEL_TO_SHORT[value] || value || "";
const createLeaveWindowPayload = (state) => ({
  leaveApplications: toBool(state.limitFuture),
  leaveduration: toNumber(state.futureDuration),
  Employee: toNumber(state.futureApplyAtLeast),
  earlier: toNumber(state.futureNotEarlier),
  leaveApplication: toBool(state.allowPast),
  leaveApplicationDays: toNumber(state.pastDays),
});
const buildDeductSection = (sandwichTypes = [], sandwichSubTypes = {}, sectionKey) =>
  Object.entries(SANDWICH_SUBTYPE_TO_FIELD).reduce(
    (acc, [label, field]) => ({
      ...acc,
      [field]: sandwichTypes.includes(sectionKey) && (sandwichSubTypes?.[sectionKey] || []).includes(label),
    }),
    {
      BetweenLeaves: false,
      beforeLeaves: false,
      afterLeaves: false,
    }
  );
const buildDeductPayload = ({ sandwiched, sandwichTypes, sandwichSubTypes }) => ({
  deductLeave: toBool(sandwiched),
  deductMandatory: buildDeductSection(sandwichTypes, sandwichSubTypes, "mandatory"),
  deductOptional: buildDeductSection(sandwichTypes, sandwichSubTypes, "optional"),
  deductWeekly: buildDeductSection(sandwichTypes, sandwichSubTypes, "weeklyoff"),
});
const getPolicyDisplayName = (value, fallback, index, total) => {
  const baseName = String(value || "").trim() || fallback;
  return total > 1 ? `${baseName} ${index + 1}` : baseName;
};
const createHourlyVariantState = () => ({
  hourlyName: "",
  maxHours: "",
  employmentType: "",
  calcType: "prorate",
  prorateFrom: "joining",
  joinMonthCalc: "irrespective",
  joinAfterDays: "",
  includeExtendedProbation: false,
  probationMonthCalc: "full",
  probationAfterDays: "",
  noProRateType: "all",
  joinsOnOrBefore: "",
  joinsOnOrBeforeDays: "",
  joinsOnOrBeforeMonth: "",
  elseCalcFrom: "",
  disbursal: "credited",
  carryForward: "carry",
  carryType: "all",
  minHoursPerDay: "",
  leaveHours: "",
  approval: "bypass",
});
const createLeaveConfigVariantState = () => ({
  leaveName4: "",
  allocation: "auto",
  annualDays: "",
  gender: "",
  empType4: "",
  marital: "",
  calcType4: "prorate",
  prorateFrom4: "joining",
  joinCalc4: "irrespective",
  joinAfterDays4: "",
  extProbation4: false,
  probCalc4: "full",
  probAfterDays4: "",
  noProRate4: "all",
  joinsOnOrBefore4: "",
  joinsOnOrBeforeDays4: "",
  joinsMonth4: "",
  elseCalcFrom4: "",
  disbursal4: "credited",
  limitProbationCredit: "yes",
  creditUntilProbationSel: "",
  creditUntilProbationDays: "",
  attachments: "yes",
  attachmentDays: "",
  attachmentNote: "",
  maxProbationDays: "",
  accumProbation: "yes",
  applyDuringProbation1: "yes",
  applyDuringProbation2: "yes",
  afterConfirmPeriod: "",
  afterConfirmMax: "",
  maxConsecutive4: "",
  halfDay4: "yes",
  limitFuture4: "yes",
  futureDuration4: "",
  futureApplyAtLeast4: "",
  futureNotEarlier4: "",
  allowPast4: "yes",
  pastDays4: "",
  sandwiched4: "yes",
  sandwichTypes4: ["mandatory", "optional", "weeklyoff"],
  sandwichSubTypes4: {
    mandatory: [],
    optional: [],
    weeklyoff: [],
  },
  clubbing4: "yes",
  clubbingTypes4: "",
  overutil: "allow",
  overutilType: "deduct",
  deductFrom: "",
  carryForward4: true,
  carryFwdLimit: "",
  carryFwdUnused: "",
  encash4: true,
  encashLimit: "",
  encashUnused: "",
  giftLeave: "yes",
  giftLeavesPerYear: "",
  giftReceive: "yes",
});
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
  } catch {
    // Ignore invalid JSON and fall back to plain string handling.
  }

  return /^[a-f\d]{24}$/i.test(rawValue) ? [rawValue] : [];
};

const ChoiceIndicator = ({ checked, muted = false, large = false }) => (
  <span
    className={cn(
      "flex shrink-0 items-center justify-center rounded-full border-2 bg-white",
      large ? "h-[18px] w-[18px]" : "h-4 w-4",
      checked ? "border-[#3b82f6]" : muted ? "border-[#9ca3af]" : "border-[#d1d5db]"
    )}
  >
    {checked && <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />}
  </span>
);

const Inp = ({ placeholder, value, onChange, suffix, className, inputClassName, type = "text", min, max, step = 1 }) => (
  <div className={cn("flex items-center overflow-hidden rounded-md border border-[#d1d5db] bg-white", className)}>
    <input
      type={type}
      value={value ?? ""}
      onChange={onChange}
      min={type === "number" ? min : undefined}
      max={type === "number" ? max ?? NUMERIC_INPUT_MAX : undefined}
      step={type === "number" ? step : undefined}
      inputMode={type === "number" ? "numeric" : undefined}
      placeholder={placeholder || "Enter value"}
      className={cn(
        "min-w-0 flex-1 bg-transparent px-3 py-2 text-[13px] text-[#374151] outline-none placeholder:text-[#9ca3af]",
        inputClassName
      )}
    />
    {suffix && <span className="whitespace-nowrap border-l border-[#e5e7eb] px-[10px] text-xs text-[#94a3b8]">{suffix}</span>}
  </div>
);

const Sel = ({ placeholder, value, onChange, options = [], className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const normalizedOptions = useMemo(() => options.map(normalizeSelectOption), [options]);
  const selectedOption = normalizedOptions.find((option) => String(option.value) === String(value || ""));

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedInsideTrigger = dropdownRef.current?.contains(event.target);
      const clickedInsideMenu = menuRef.current?.contains(event.target);

      if (!clickedInsideTrigger && !clickedInsideMenu) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return undefined;
    }

    const updateMenuPosition = () => {
      const rect = triggerRef.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const estimatedMenuHeight = Math.min(Math.max(normalizedOptions.length, 1) * 40 + 16, 240);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUpward = spaceBelow < estimatedMenuHeight && spaceAbove > estimatedMenuHeight;

      setMenuStyle({
        top: openUpward ? rect.top - estimatedMenuHeight - 8 : rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isOpen, normalizedOptions.length]);

  const handleSelect = (nextValue) => {
    onChange?.({
      target: {
        value: nextValue,
      },
    });
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          SELECT_CONTROL_CLASS,
          isOpen ? "border-[#e3e8ef] bg-white" : "border-[#d1d5db]",
          className
        )}
      >
        <span className={cn("truncate", selectedOption ? "text-[#374151]" : "text-[#9ca3af]")}>
          {selectedOption?.label || placeholder || "Select"}
        </span>
        <FaAngleDown className={cn("text-[12px] text-[#667085] transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[99999] max-h-60 overflow-auto rounded-md border border-[#e7ecf2] bg-white shadow-[0_6px_14px_rgba(15,23,42,0.04)]"
            style={{
              top: `${menuStyle.top}px`,
              left: `${menuStyle.left}px`,
              width: `${menuStyle.width}px`,
            }}
          >
            {normalizedOptions.length ? (
              normalizedOptions.map((option) => (
                <button
                  key={`${option.value}-${option.label}`}
                  type="button"
                  onClick={() => handleSelect(option.value)}
                  className={cn(
                    "w-full border-none px-4 py-2.5 text-left text-sm shadow-none outline-none transition-colors focus:outline-none focus:ring-0",
                    String(value || "") === String(option.value)
                      ? "bg-[#fbfcfe] font-medium text-[#374151]"
                      : "text-[#475569] hover:bg-[#fcfdff] active:bg-[#fafbfd]"
                  )}
                >
                  {option.label}
                </button>
              ))
            ) : (
              <div className="px-4 py-2.5 text-sm text-[#98A2B3]">No options available</div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};

const Txt = ({ placeholder, value, onChange, rows = 3, className }) => (
  <textarea
    value={value || ""}
    onChange={onChange}
    placeholder={placeholder || "Enter description"}
    rows={rows}
    className={cn(
      "box-border w-full resize-y rounded-md border border-[#d1d5db] px-3 py-2 text-[13px] text-[#374151] outline-none placeholder:text-[#9ca3af]",
      className
    )}
  />
);

const Lbl = ({ children, sm, bold }) => (
  <p
    className={cn(
      "mb-1",
      sm ? "mt-1.5 text-xs text-[#6b7280]" : "mt-2.5 text-[13px] text-[#374151]",
      bold ? "font-bold" : "font-normal"
    )}
  >
    {children}
  </p>
);

const SecHead = ({ title }) => (
  <div className="mb-2.5 mt-5 border-b-2 border-[#e5e7eb] pb-1">
    <span className="text-[13px] font-bold text-[#374151]">{title}</span>
  </div>
);

const FRow = ({ children, gap = 12, className }) => (
  <div className={cn("flex flex-wrap items-start", GAP_CLASSES[gap] || GAP_CLASSES[12], className)}>{children}</div>
);

const FieldCol = ({ children, className }) => <div className={cn("min-w-0 flex-1", className)}>{children}</div>;

const InlineUnit = ({ children }) => <span className="pt-2.5 text-xs text-[#6b7280]">{children}</span>;

const RR = ({ label, checked, onChange, children, indent = 0, className, buttonClassName, contentClassName }) => (
  <div className={cn("mb-1 rounded-md border border-[#e5e7eb]", className)}>
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex w-full items-center gap-2.5 py-2.5 text-left",
        INDENT_CLASSES[indent] || INDENT_CLASSES[0],
        checked ? "bg-[#eff6ff]" : "bg-white",
        checked && children ? "rounded-t-md" : "rounded-md",
        buttonClassName
      )}
    >
      <ChoiceIndicator checked={checked} />
      <span className="text-[13px] text-[#374151]">{label}</span>
    </button>
    {checked && children && (
      <div className={cn("rounded-b-md border-t border-[#e5e7eb] bg-[#f0f7ff] px-3 pb-3 pt-2 pl-[38px]", contentClassName)}>
        {children}
      </div>
    )}
  </div>
);

const CR = ({ label, checked, onChange, children, indent = 0 }) => (
  <div className="mb-1 rounded-md border border-[#e5e7eb]">
    <button
      type="button"
      onClick={onChange}
      className={cn(
        "flex w-full items-center gap-2.5 rounded-md bg-white py-2.5 text-left",
        INDENT_CLASSES[indent] || INDENT_CLASSES[0]
      )}
    >
      <ChoiceIndicator checked={checked} />
      <span className="text-[13px] text-[#374151]">{label}</span>
    </button>
    {checked && children && <div className="border-t border-[#e5e7eb] px-3 pb-3 pt-2 pl-[38px]">{children}</div>}
  </div>
);

const SubOpts = ({ selected = [], onToggle }) => (
  <div className="mt-1.5 flex flex-col gap-1">
    {SANDWICH_SUB.map((sub) => (
      <label
        key={sub}
        className="flex cursor-pointer items-center gap-2 rounded-md border border-[#e5e7eb] bg-[#f9fafb] px-3 py-2"
      >
        <input
          type="checkbox"
          checked={selected.includes(sub)}
          onChange={() => onToggle(sub)}
          className="h-[14px] w-[14px] cursor-pointer accent-[#3b82f6]"
        />
        <span className="text-xs text-[#374151]">{sub}</span>
      </label>
    ))}
  </div>
);

const SandwichSection = ({
  sandwiched,
  onSandwich,
  sandwichTypes,
  onToggleType,
  sandwichSubTypes,
  onToggleSubType,
}) => (
  <>
    <RR
      label="Yes, deduct leaves for applied dates and additional leaves in the following manner"
      checked={sandwiched === "yes"}
      onChange={() => onSandwich("yes")}
    >
      {SANDWICH_KEYS.map(({ key, label }) => (
        <CR key={key} label={label} checked={sandwichTypes.includes(key)} onChange={() => onToggleType(key)}>
          <SubOpts selected={sandwichSubTypes?.[key] || []} onToggle={(sub) => onToggleSubType(key, sub)} />
        </CR>
      ))}
    </RR>
    <RR label="No, deduct leaves only for applied dates" checked={sandwiched === "no"} onChange={() => onSandwich("no")} />
  </>
);

function Stepper({ currentStep, steps }) {
  const safeCurrentStep = Math.min(Math.max(currentStep, 1), steps.length);

  return (
    <div className="mb-8 flex w-full justify-evenly gap-2 overflow-x-auto pb-2">
      {steps.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === safeCurrentStep;
        const isDone = stepNum < safeCurrentStep;

        return (
          <div key={`${label}-${stepNum}`} className="flex items-start">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full border-2 text-[13px] font-semibold transition-all",
                  isDone
                    ? "border-[#3b82f6] bg-[#3b82f6] text-white"
                    : isActive
                      ? "border-[#3b82f6] bg-white text-[#3b82f6]"
                      : "border-[#d1d5db] bg-white text-[#9ca3af]"
                )}
              >
                {isDone ? (
                  <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
                    <path d="M3.5 8.5 6.5 11.5 12.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  stepNum
                )}
              </div>
              <span
                className={cn(
                  "mt-1 max-w-20 truncate whitespace-nowrap text-center text-[11px]",
                  isActive ? "font-bold text-[#3b82f6]" : "font-normal text-[#9ca3af]"
                )}
              >
                {label}
              </span>
            </div>

            {idx < steps.length - 1 && (
              <div className={cn("mx-2 mb-5 h-px w-[60px] transition-colors", isDone ? "bg-[#3b82f6]" : "bg-[#e5e7eb]")} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function PreviewRow({ label, value }) {
  const display = value === true ? "yes" : value === false ? "no" : value || "--";

  return (
    <div className="mb-1.5 flex items-center justify-between rounded-lg border border-[#f0f0f0] bg-[#f9fafb] px-4 py-2.5">
      <span className="text-[13px] text-[#6b7280]">{label}</span>
      <span
        className={cn(
          "text-[13px] font-semibold capitalize",
          display === "yes" ? "text-[#16a34a]" : display === "no" ? "text-[#ef4444]" : "text-[#374151]"
        )}
      >
        {Array.isArray(display) ? display.join(", ") : String(display)}
      </span>
    </div>
  );
}

export default function CreateLeavePolicy({ onBack }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [s1, setS1] = useState({
    policyName: "",
    description: "",
    selectedTypes: [LOCKED_LEAVE_TYPE],
    typePolicyCounts: {},
  });

  const [s2, setS2] = useState({
    leaveName: "",
    usageLimitType: "",
    maxDaysLeave: "",
    maxConsecutive: "",
    halfDay: "yes",
    limitFuture: "yes",
    futureDuration: "",
    futureApplyAtLeast: "",
    futureNotEarlier: "",
    allowPast: "yes",
    pastDays: "",
    sandwiched: "yes",
    sandwichTypes: ["mandatory", "optional", "weeklyoff"],
    sandwichSubTypes: {
      mandatory: [],
      optional: [],
      weeklyoff: [],
    },
    clubbing: "yes",
    clubbingTypes: "",
  });

  const [hourlyVariants, setHourlyVariants] = useState([]);
  const [leaveConfigVariants, setLeaveConfigVariants] = useState({
    "Medical Leave": [],
    "Custom Leave*": [],
  });

  const u1 = (payload) => setS1((prev) => ({ ...prev, ...payload }));
  const u2 = (payload) => setS2((prev) => ({ ...prev, ...payload }));
  const toggleArr = (arr, value) => (arr.includes(value) ? arr.filter((item) => item !== value) : [...arr, value]);
  const toggleNestedArr = (source, groupKey, value) => ({
    ...source,
    [groupKey]:
      Array.isArray(source?.[groupKey]) && source[groupKey].includes(value)
        ? source[groupKey].filter((item) => item !== value)
        : [...(source?.[groupKey] || []), value],
  });

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const policyFlowSteps = useMemo(() => {
    const steps = [
      {
        key: normalizeLeaveType(LOCKED_LEAVE_TYPE),
        label: getLeaveTypeLabel(LOCKED_LEAVE_TYPE),
        kind: "usage",
        sourceType: LOCKED_LEAVE_TYPE,
      },
    ];

    LEAVE_TYPES.filter((type) => type !== LOCKED_LEAVE_TYPE).forEach((type) => {
      const policyCount = s1.typePolicyCounts?.[type] || 0;
      const displayType = getLeaveTypeLabel(type);
      const kind = type === HOURLY_LEAVE_TYPE ? "hourly" : "leaveConfig";

      for (let index = 0; index < policyCount; index += 1) {
        steps.push({
          key: `${normalizeLeaveType(type)}-${index + 1}`,
          label: policyCount > 1 ? `${displayType} ${index + 1}` : displayType,
          kind,
          sourceType: type,
          variantIndex: index,
        });
      }
    });

    return steps;
  }, [s1.typePolicyCounts]);
  const stepConfigs = useMemo(
    () => [
      { key: "select-leave-types", label: "Select Leave Types", kind: "select" },
      ...policyFlowSteps,
      { key: "preview", label: "Preview", kind: "preview" },
    ],
    [policyFlowSteps]
  );
  const activeStepConfig = stepConfigs[Math.max(0, Math.min(step - 1, stepConfigs.length - 1))];
  const activeHourlyIndex = activeStepConfig?.kind === "hourly" ? activeStepConfig.variantIndex || 0 : 0;
  const activeLeaveType = activeStepConfig?.kind === "leaveConfig" ? activeStepConfig.sourceType : "Medical Leave";
  const activeLeaveIndex = activeStepConfig?.kind === "leaveConfig" ? activeStepConfig.variantIndex || 0 : 0;
  const s3 = hourlyVariants[activeHourlyIndex] || hourlyVariants[0] || createHourlyVariantState();
  const s4 =
    leaveConfigVariants[activeLeaveType]?.[activeLeaveIndex] ||
    leaveConfigVariants[activeLeaveType]?.[0] ||
    createLeaveConfigVariantState();
  const u3 = (payload) =>
    setHourlyVariants((prev) =>
      prev.map((item, index) => (index === activeHourlyIndex ? { ...item, ...payload } : item))
    );
  const u4 = (payload) =>
    setLeaveConfigVariants((prev) => ({
      ...prev,
      [activeLeaveType]: (prev[activeLeaveType] || []).map((item, index) =>
        index === activeLeaveIndex ? { ...item, ...payload } : item
      ),
    }));

  useEffect(() => {
    setStep((prev) => Math.min(prev, stepConfigs.length));
  }, [stepConfigs.length]);

  const resolvedCompanyOfficeIds = useMemo(() => {
    const officeParam = queryParams.get("office") || "";

    if (officeParam && officeParam !== "ALL" && /^[a-f\d]{24}$/i.test(officeParam)) {
      return [officeParam];
    }

    return getStoredOfficeIds();
  }, [queryParams]);

  const buildHourlyLeaveItem = (variantState, index, total) => ({
    hourlyleaveName: getPolicyDisplayName(variantState.hourlyName, "Hourly Leave", index, total),
    maxHours: toNumber(variantState.maxHours),
    employmentType: normalizeSimple(variantState.employmentType),
    prorateFromJoiningDate: variantState.calcType === "prorate" && variantState.prorateFrom === "joining",
    joinMonthCalc: variantState.joinMonthCalc === "irrespective",
    halfMonthCalc: variantState.joinMonthCalc === "half",
    joinAfterDays: toNumber(variantState.joinAfterDays),
    proratefromPrabationEndDate: variantState.calcType === "prorate" && variantState.prorateFrom === "probation",
    includeExtend: Boolean(variantState.includeExtendedProbation),
    calcLeaveEndMonth: variantState.probationMonthCalc === "full",
    calcHalfLeaves: variantState.probationMonthCalc === "half",
    endMonthDays: toNumber(variantState.probationAfterDays),
    doNotprobationRate: variantState.calcType === "noprorate" && variantState.noProRateType === "all",
    donotProRate: {
      donotSelectRate: toNumber(variantState.joinsOnOrBefore),
      donotDays: toNumber(variantState.joinsOnOrBeforeDays),
      donotMonths: normalizeMonthShort(variantState.joinsOnOrBeforeMonth),
      elseEmployee: normalizeElseCalcFrom(variantState.elseCalcFrom) || "all",
    },
    leaveBalanceStartMonth: variantState.disbursal === "accrued",
    leaveBalanceCred: variantState.disbursal === "credited",
    carryUnsendLeaves: variantState.carryForward === "lapse",
    carryForward: variantState.carryForward === "carry",
    minHoursPerDay: toNumber(variantState.minHoursPerDay),
    leaveHours: toNumber(variantState.leaveHours),
    leaveApproval: variantState.approval === "existing",
    leaveBypass: variantState.approval === "bypass",
    AutoApprove: variantState.approval === "auto",
  });

  const buildLeaveConfigItem = (variantState, nameKey, defaultName, index, total) => ({
    [nameKey]: getPolicyDisplayName(variantState.leaveName4, defaultName, index, total),
    automaticallyLeaveBalance: variantState.allocation === "auto",
    Days: toNumber(variantState.annualDays),
    manuallyLeaveBalance: variantState.allocation === "manual",
    gender: variantState.gender ? normalizeSimple(variantState.gender) : "all",
    employmentType: variantState.empType4 ? normalizeSimple(variantState.empType4) : "all",
    maritalStatus: normalizeMaritalStatus(variantState.marital),
    prorateFromJoiningDate: variantState.calcType4 === "prorate" && variantState.prorateFrom4 === "joining",
    joinMonthCalc: variantState.joinCalc4 === "irrespective",
    halfMonthCalc: variantState.joinCalc4 === "half",
    joinAfterDays: toNumber(variantState.joinAfterDays4),
    proratefromPrabationEndDate: variantState.calcType4 === "prorate" && variantState.prorateFrom4 === "probation",
    includeExtend: Boolean(variantState.extProbation4),
    calcLeaveEndMonth: variantState.probCalc4 === "full",
    calcHalfLeaves: variantState.probCalc4 === "half",
    endMonthDays: toNumber(variantState.probAfterDays4),
    doNotprobationRate: variantState.calcType4 === "noprorate" && variantState.noProRate4 === "all",
    donotProRate: {
      donotSelectRate: toNumber(variantState.joinsOnOrBefore4),
      donotDays: toNumber(variantState.joinsOnOrBeforeDays4),
      donotMonths: normalizeMonthShort(variantState.joinsMonth4),
      elseEmployee: normalizeElseCalcFrom(variantState.elseCalcFrom4) || "all",
    },
    leaveBalanceAccured: variantState.disbursal4 === "accrued",
    leaveBalanceCredit: variantState.disbursal4 === "credited",
    creditDuring: variantState.limitProbationCredit === "yes",
    creditDays: toNumber(variantState.creditUntilProbationSel || variantState.creditUntilProbationDays),
    compulsoryLeave: toBool(variantState.attachments),
    documentRequiredLeaveDays: toNumber(variantState.attachmentDays),
    descriptionEmployee: variantState.attachmentNote.trim(),
    MaximumDays: toNumber(variantState.maxProbationDays),
    accumaltionBalance: toBool(variantState.accumProbation),
    employeesProbation: toBool(variantState.applyDuringProbation1),
    period: normalizeUsageLimitType(variantState.afterConfirmPeriod),
    maximumLeaves: toNumber(variantState.afterConfirmMax),
    consecutiveLeaves: toNumber(variantState.maxConsecutive4),
    halfDay: toBool(variantState.halfDay4),
    ...createLeaveWindowPayload({
      limitFuture: variantState.limitFuture4,
      futureDuration: variantState.futureDuration4,
      futureApplyAtLeast: variantState.futureApplyAtLeast4,
      futureNotEarlier: variantState.futureNotEarlier4,
      allowPast: variantState.allowPast4,
      pastDays: variantState.pastDays4,
    }),
    ...buildDeductPayload({
      sandwiched: variantState.sandwiched4,
      sandwichTypes: variantState.sandwichTypes4,
      sandwichSubTypes: variantState.sandwichSubTypes4,
    }),
    balanceLapse: !variantState.carryForward4 && !variantState.encash4,
    carryForward: {
      carrySelect: variantState.carryForward4 ? String(variantState.carryFwdLimit || "limited").trim().toLowerCase() : "no",
      UnusedLeaves: toNumber(variantState.carryFwdUnused),
    },
    enCash: {
      carrySelect: variantState.encash4 ? String(variantState.encashLimit || "yes").trim().toLowerCase() : "no",
      UnusedLeaves: toNumber(variantState.encashUnused),
    },
    employeeGift: toBool(variantState.giftLeave),
    giftPerYear: toNumber(variantState.giftLeavesPerYear),
    receivedGiftLeaves: toBool(variantState.giftReceive),
  });

  const buildPayload = (status) => {
    const medicalVariants = leaveConfigVariants["Medical Leave"] || [];
    const customVariants = leaveConfigVariants["Custom Leave*"] || [];

    return {
      policyName: s1.policyName.trim(),
      description: s1.description.trim(),
      unpaidLeaveName: s2.leaveName.trim() || "Unpaid Leave",
      leaveUsageLimit: normalizeUsageLimitType(s2.usageLimitType),
      leaveMaximumDays: toNumber(s2.maxDaysLeave),
      maximumLeaves: toNumber(s2.maxConsecutive),
      halfDayLeave: toBool(s2.halfDay),
      ...createLeaveWindowPayload({
        limitFuture: s2.limitFuture,
        futureDuration: s2.futureDuration,
        futureApplyAtLeast: s2.futureApplyAtLeast,
        futureNotEarlier: s2.futureNotEarlier,
        allowPast: s2.allowPast,
        pastDays: s2.pastDays,
      }),
      ...buildDeductPayload({
        sandwiched: s2.sandwiched,
        sandwichTypes: s2.sandwichTypes,
        sandwichSubTypes: s2.sandwichSubTypes,
      }),
      LeavesClubbing: toBool(s2.clubbing),
      typeleaves: s2.clubbingTypes ? 1 : 0,
      hourlyLeave: hourlyVariants.map((variant, index) => buildHourlyLeaveItem(variant, index, hourlyVariants.length)),
      medicalLeave: medicalVariants.map((variant, index) =>
        buildLeaveConfigItem(variant, "MedicalleaveName", "Medical Leave", index, medicalVariants.length)
      ),
      customLeave: customVariants.map((variant, index) =>
        buildLeaveConfigItem(variant, "customleaveName", "Custom Leave", index, customVariants.length)
      ),
      companyOfficeId: resolvedCompanyOfficeIds,
      status,
    };
  };

  const submitPolicy = async (status) => {
    try {
      setIsSubmitting(true);
      const payload = buildPayload(status);

      if (!payload.policyName) {
        toast.error("Policy name is required.");
        return;
      }

      await axiosInstance.post("/config/create/leavePolicy", payload, {
        meta: { auth: "ADMIN_AUTH" },
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(status === "draft" ? "Leave policy saved as draft." : "Leave policy saved successfully.");
      navigate("/config/track/leave/leave-policy/list");
    } catch (error) {
      console.log("leave policy create error", error);
      toast.error(error?.response?.data?.message || "Failed to save leave policy.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDraftSave = () => submitPolicy("draft");
  const handleFinalSave = () => submitPolicy("active");
  const handleLeaveTypeToggle = (type) => {
    if (type === LOCKED_LEAVE_TYPE) return;

    const isSelected = s1.selectedTypes.includes(type);
    const nextPolicyCounts = { ...(s1.typePolicyCounts || {}) };

    if (isSelected) {
      delete nextPolicyCounts[type];
      setS1((prev) => ({
        ...prev,
        selectedTypes: prev.selectedTypes.filter((item) => item !== type),
        typePolicyCounts: nextPolicyCounts,
      }));

      if (type === HOURLY_LEAVE_TYPE) {
        setHourlyVariants([]);
      } else {
        setLeaveConfigVariants((prevConfigs) => ({
          ...prevConfigs,
          [type]: [],
        }));
      }

      return;
    }

    setS1((prev) => ({
      ...prev,
      selectedTypes: [...prev.selectedTypes, type],
      typePolicyCounts: {
        ...nextPolicyCounts,
        [type]: Math.max(1, nextPolicyCounts[type] || 0),
      },
    }));

    if (type === HOURLY_LEAVE_TYPE) {
      setHourlyVariants((prevVariants) => (prevVariants.length ? prevVariants : [createHourlyVariantState()]));
    } else {
      setLeaveConfigVariants((prevConfigs) => ({
        ...prevConfigs,
        [type]: prevConfigs[type]?.length ? prevConfigs[type] : [createLeaveConfigVariantState()],
      }));
    }
  };
  const handlePolicyVariantAdd = (type) => {
    if (type === LOCKED_LEAVE_TYPE) return;

    const currentCount = s1.typePolicyCounts?.[type] || 0;
    const nextCount = currentCount === 0 ? 1 : currentCount + 1;

    if (nextCount > MAX_POLICY_VARIANTS) {
      return;
    }

    setS1((prev) => ({
      ...prev,
      selectedTypes: prev.selectedTypes.includes(type) ? prev.selectedTypes : [...prev.selectedTypes, type],
      typePolicyCounts: {
        ...(prev.typePolicyCounts || {}),
        [type]: nextCount,
      },
    }));

    if (type === HOURLY_LEAVE_TYPE) {
      setHourlyVariants((prevVariants) => [...prevVariants, createHourlyVariantState()]);
    } else {
      setLeaveConfigVariants((prevConfigs) => ({
        ...prevConfigs,
        [type]: [...(prevConfigs[type] || []), createLeaveConfigVariantState()],
      }));
    }
  };
  const handlePolicyVariantRemove = (type, variantIndex) => {
    if (type === LOCKED_LEAVE_TYPE) return;

    const currentCount = s1.typePolicyCounts?.[type] || 0;

    if (currentCount <= 0) {
      return;
    }

    const nextPolicyCounts = { ...(s1.typePolicyCounts || {}) };

    if (currentCount === 1) {
      delete nextPolicyCounts[type];
      setS1((prev) => ({
        ...prev,
        selectedTypes: prev.selectedTypes.filter((item) => item !== type),
        typePolicyCounts: nextPolicyCounts,
      }));

      if (type === HOURLY_LEAVE_TYPE) {
        setHourlyVariants([]);
      } else {
        setLeaveConfigVariants((prevConfigs) => ({
          ...prevConfigs,
          [type]: [],
        }));
      }

      return;
    }

    nextPolicyCounts[type] = currentCount - 1;
    setS1((prev) => ({
      ...prev,
      typePolicyCounts: nextPolicyCounts,
    }));

    if (type === HOURLY_LEAVE_TYPE) {
      setHourlyVariants((prevVariants) => prevVariants.filter((_, index) => index !== variantIndex));
    } else {
      setLeaveConfigVariants((prevConfigs) => ({
        ...prevConfigs,
        [type]: (prevConfigs[type] || []).filter((_, index) => index !== variantIndex),
      }));
    }
  };
  const handleBackAction = () => {
    if (step === 1) {
      if (typeof onBack === "function") {
        onBack();
      } else {
        navigate("/config/track/leave/leave-policy/list");
      }
      return;
    }

    setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-white text-sm text-[#1e293b]">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="px-6 pt-5">
        <h1 className="m-0 text-xl font-bold text-[#111827]">Create Leave Policy</h1>
        <p className="mb-6 mt-0.5 text-[13px] text-[#9ca3af]">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <Stepper currentStep={step} steps={stepConfigs.map((item) => item.label)} />

      <hr className="mx-6 mb-6 border-0 border-t border-[#f0f0f0]" />

      <div className="px-6 pb-[100px]">
        {activeStepConfig?.kind === "select" && (
          <div>
            <Lbl>Policy Name</Lbl>
            <Inp value={s1.policyName} onChange={(e) => u1({ policyName: e.target.value })} placeholder="Enter policy name" />

            <Lbl>Let&apos;s write a brief description about this policy</Lbl>
            <Txt
              value={s1.description}
              onChange={(e) => u1({ description: e.target.value })}
              rows={4}
              placeholder="Enter description"
            />

            <Lbl>Choose the type of leaves you would like to enable in this policy</Lbl>
            <p className="mt-1 text-xs text-[#94a3b8]">You can add up to 3 policy variants for each leave type.</p>
            <div className="mt-2 flex flex-col gap-[6px]">
              {LEAVE_TYPES.map((type) => {
                const selected = s1.selectedTypes.includes(type);
                const isLockedType = type === LOCKED_LEAVE_TYPE;
                const policyCount = s1.typePolicyCounts?.[type] || 0;
                const hasReachedLimit = policyCount >= MAX_POLICY_VARIANTS;
                const displayType = getLeaveTypeLabel(type);

                return (
                  <div
                    key={type}
                    className={cn(
                      "rounded-md border px-4 py-3",
                      selected ? "border-[#3b82f6]" : "border-[#e5e7eb]"
                    )}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <button
                        type="button"
                        disabled={isLockedType}
                        onClick={() => handleLeaveTypeToggle(type)}
                        className={cn(
                          "flex min-w-0 flex-1 appearance-none items-center gap-2.5 border-0 bg-transparent p-0 text-left shadow-none outline-none",
                          isLockedType ? "cursor-default" : "cursor-pointer"
                        )}
                      >
                        <ChoiceIndicator checked={selected} muted large />
                        <span className="truncate text-[13px] text-[#374151]">{displayType}</span>
                      </button>

                    {isLockedType ? (
                      <span className="rounded-full border border-[#bfdbfe] px-2.5 py-1 text-[11px] font-semibold text-[#1d4ed8]">
                        Default
                      </span>
                    ) : (
                      <div className="flex shrink-0 items-center gap-2">
                        {policyCount > 0 && (
                          <span className="rounded-full border border-[#bfdbfe] px-2.5 py-1 text-[11px] font-semibold text-[#1d4ed8]">
                            {policyCount}/{MAX_POLICY_VARIANTS}
                          </span>
                        )}
                        <button
                          type="button"
                            onClick={() => handlePolicyVariantAdd(type)}
                            disabled={hasReachedLimit}
                          className={cn(
                            "rounded-md border px-3 py-1.5 text-xs font-semibold transition",
                            hasReachedLimit
                              ? "cursor-not-allowed border-[#cbd5e1] text-[#94a3b8]"
                              : "border-[#3b82f6] text-[#3b82f6]"
                          )}
                        >
                          Add
                          </button>
                        </div>
                      )}
                    </div>

                    {!isLockedType && policyCount > 0 && (
                      <div className="ml-7 mt-3 flex flex-wrap gap-2">
                        {Array.from({ length: policyCount }).map((_, index) => (
                          <div
                            key={`${type}-${index + 1}`}
                            className="flex items-center gap-2 rounded-[10px] border border-[#c7d1de] px-3 py-2"
                          >
                            <div className="min-w-[92px]">
                              <p className="truncate text-xs font-medium text-[#8b97a7]">{displayType}</p>
                              <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c0c8d4]">
                                Policy {index + 1}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handlePolicyVariantRemove(type, index)}
                              className="flex h-6 w-6 items-center justify-center rounded-full bg-[#176db8] pb-0.5 text-lg leading-none text-white"
                              aria-label={`Remove ${displayType} policy ${index + 1}`}
                            >
                              -
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeStepConfig?.kind === "usage" && (
          <div>
            <Lbl>Let&apos;s give this leave a name</Lbl>
            <Inp value={s2.leaveName} onChange={(e) => u2({ leaveName: e.target.value })} placeholder="Enter leave name" />

            <SecHead title="Usage Policy" />
            <Lbl>Let&apos;s configure the leave usage limits</Lbl>
            <FRow>
              <FieldCol>
                <Sel value={s2.usageLimitType} onChange={(e) => u2({ usageLimitType: e.target.value })} options={["Per Month", "Per Year"]} />
              </FieldCol>
              <FieldCol>
                <Inp
                  value={s2.maxDaysLeave}
                  onChange={(e) => u2({ maxDaysLeave: e.target.value })}
                  type="number"
                  min={0}
                  suffix="Days"
                  placeholder="Maximum days"
                />
              </FieldCol>
            </FRow>

            <Lbl>How many maximum consecutive leaves you want to allow?</Lbl>
            <FRow gap={8}>
              <Inp
                value={s2.maxConsecutive}
                onChange={(e) => u2({ maxConsecutive: e.target.value })}
                type="number"
                min={0}
                className="max-w-[180px]"
              />
              <InlineUnit>Days</InlineUnit>
            </FRow>

            <Lbl>Would you like to allow half-day leave applications?</Lbl>
            <RR label="Yes" checked={s2.halfDay === "yes"} onChange={() => u2({ halfDay: "yes" })} />
            <RR label="No" checked={s2.halfDay === "no"} onChange={() => u2({ halfDay: "no" })} />

            <Lbl>Do you want to limit leave applications for future dates?</Lbl>
            <RR label="Yes" checked={s2.limitFuture === "yes"} onChange={() => u2({ limitFuture: "yes" })}>
              <FRow>
                <FieldCol>
                  <Lbl sm>If leave duration is greater than</Lbl>
                  <FRow gap={6}>
                    <Inp
                      value={s2.futureDuration}
                      onChange={(e) => u2({ futureDuration: e.target.value })}
                      type="number"
                      min={0}
                      className="flex-1"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </FieldCol>
                <FieldCol>
                  <Lbl sm>Employee must apply at least</Lbl>
                  <FRow gap={6}>
                    <Inp
                      value={s2.futureApplyAtLeast}
                      onChange={(e) => u2({ futureApplyAtLeast: e.target.value })}
                      type="number"
                      min={0}
                      className="flex-1"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </FieldCol>
              </FRow>
              <Lbl sm>But not earlier than</Lbl>
              <FRow gap={6}>
                <Inp
                  value={s2.futureNotEarlier}
                  onChange={(e) => u2({ futureNotEarlier: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[180px]"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
            </RR>
            <RR label="No" checked={s2.limitFuture === "no"} onChange={() => u2({ limitFuture: "no" })} />

            <Lbl>Do you want to allow leave application for past dates?</Lbl>
            <RR
              label="Yes"
              checked={s2.allowPast === "yes"}
              onChange={() => u2({ allowPast: "yes" })}
              className="shadow-none transition-transform duration-150 hover:scale-[1.01]"
              buttonClassName="shadow-none"
              contentClassName="shadow-none"
            >
              <Lbl sm>Leave application can be made upto days after actual leave date</Lbl>
              <FRow gap={6}>
                <Inp
                  value={s2.pastDays}
                  onChange={(e) => u2({ pastDays: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[180px]"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
            </RR>
            <RR label="No" checked={s2.allowPast === "no"} onChange={() => u2({ allowPast: "no" })} />

            <SecHead title="Sandwiched/Intervening Leaves" />
            <Lbl>If leaves are applied next to or in-between holidays/weekly-offs, should there be additional leave deductions?</Lbl>
            <SandwichSection
              sandwiched={s2.sandwiched}
              onSandwich={(value) => u2({ sandwiched: value })}
              sandwichTypes={s2.sandwichTypes}
              onToggleType={(key) => u2({ sandwichTypes: toggleArr(s2.sandwichTypes, key) })}
              sandwichSubTypes={s2.sandwichSubTypes}
              onToggleSubType={(groupKey, sub) => u2({ sandwichSubTypes: toggleNestedArr(s2.sandwichSubTypes, groupKey, sub) })}
            />

            <SecHead title="Leave Clubbing" />
            <Lbl>Allow employees to apply for different types of leaves, adjacent to each other</Lbl>
            <RR label="Yes" checked={s2.clubbing === "yes"} onChange={() => u2({ clubbing: "yes" })}>
              <Lbl sm>For the following type(s) of leaves</Lbl>
              <Sel value={s2.clubbingTypes} onChange={(e) => u2({ clubbingTypes: e.target.value })} />
            </RR>
            <RR
              label="No, deduct leaves only for applied dates"
              checked={s2.clubbing === "no"}
              onChange={() => u2({ clubbing: "no" })}
            />
          </div>
        )}

        {activeStepConfig?.kind === "hourly" && (
          <div>
            <Lbl>Let&apos;s give this hourly leave a name</Lbl>
            <Inp value={s3.hourlyName} onChange={(e) => u3({ hourlyName: e.target.value })} placeholder="Enter hourly leave name" />

            <Lbl>Maximum hours allocated per month</Lbl>
            <Inp
              value={s3.maxHours}
              onChange={(e) => u3({ maxHours: e.target.value })}
              type="number"
              min={0}
              suffix="HRS"
              placeholder="Enter hours"
            />

            <SecHead title="Who, How & When (Calculations & Disbursal)" />
            <Lbl>Who can avail this leave balance?</Lbl>
            <Lbl sm>Employment Type</Lbl>
            <Sel value={s3.employmentType} onChange={(e) => u3({ employmentType: e.target.value })} options={["Full-time", "Part-time", "Contract"]} />

            <Lbl>How will the leave balance be calculated?</Lbl>
            <RR label="Pro-rate" checked={s3.calcType === "prorate"} onChange={() => u3({ calcType: "prorate" })}>
              <RR label="Pro-rate from joining date" checked={s3.prorateFrom === "joining"} onChange={() => u3({ prorateFrom: "joining" })} indent={1}>
                <RR
                  label="Calculate leaves for the joining month, irrespective of joining date"
                  checked={s3.joinMonthCalc === "irrespective"}
                  onChange={() => u3({ joinMonthCalc: "irrespective" })}
                  indent={1}
                />
                <RR
                  label="Calculate half month's leave for joining month, if employee joins after"
                  checked={s3.joinMonthCalc === "half"}
                  onChange={() => u3({ joinMonthCalc: "half" })}
                  indent={1}
                >
                  <FRow gap={6}>
                    <Inp
                      value={s3.joinAfterDays}
                      onChange={(e) => u3({ joinAfterDays: e.target.value })}
                      type="number"
                      min={0}
                      className="max-w-[160px]"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </RR>
              </RR>
              <RR
                label="Pro-rate from probation end date"
                checked={s3.prorateFrom === "probation"}
                onChange={() => u3({ prorateFrom: "probation" })}
                indent={1}
              >
                <CR
                  label="Include extended probation, if any"
                  checked={s3.includeExtendedProbation}
                  onChange={() => u3({ includeExtendedProbation: !s3.includeExtendedProbation })}
                  indent={1}
                />
                <RR
                  label="Calculate leaves for the probation end month"
                  checked={s3.probationMonthCalc === "full"}
                  onChange={() => u3({ probationMonthCalc: "full" })}
                  indent={1}
                />
                <RR
                  label="Calculate half month's leave for probation end month, if probation end date is after"
                  checked={s3.probationMonthCalc === "half"}
                  onChange={() => u3({ probationMonthCalc: "half" })}
                  indent={1}
                >
                  <FRow gap={6}>
                    <Inp
                      value={s3.probationAfterDays}
                      onChange={(e) => u3({ probationAfterDays: e.target.value })}
                      type="number"
                      min={0}
                      className="max-w-[160px]"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </RR>
              </RR>
            </RR>
            <RR label="Do not pro-rate" checked={s3.calcType === "noprorate"} onChange={() => u3({ calcType: "noprorate" })}>
              <RR
                label="Don't pro-rate, calculate all leaves irrespective of any joining or probation date"
                checked={s3.noProRateType === "all"}
                onChange={() => u3({ noProRateType: "all" })}
                indent={1}
              />
              <RR
                label="Don't pro-rate, if employees joins on or before"
                checked={s3.noProRateType === "conditional"}
                onChange={() => u3({ noProRateType: "conditional" })}
                indent={1}
              >
                <FRow gap={8} className="mt-1.5">
                  <Sel value={s3.joinsOnOrBefore} onChange={(e) => u3({ joinsOnOrBefore: e.target.value })} options={["1", "5", "10", "15"]} />
                  <Inp
                    value={s3.joinsOnOrBeforeDays}
                    onChange={(e) => u3({ joinsOnOrBeforeDays: e.target.value })}
                    type="number"
                    min={0}
                    suffix="Days"
                  />
                  <Sel
                    value={s3.joinsOnOrBeforeMonth}
                    onChange={(e) => u3({ joinsOnOrBeforeMonth: e.target.value })}
                    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                  />
                </FRow>
                <Lbl sm>Else for other employees calculate from</Lbl>
                <Sel value={s3.elseCalcFrom} onChange={(e) => u3({ elseCalcFrom: e.target.value })} options={["Joining Date", "Probation End Date"]} />
              </RR>
            </RR>

            <Lbl>When will the leave balance be available?</Lbl>
            <RR
              label="Leave balance will be accrued (at the beginning of month)"
              checked={s3.disbursal === "accrued"}
              onChange={() => u3({ disbursal: "accrued" })}
            />
            <RR
              label="Leave balance will be credited all at once"
              checked={s3.disbursal === "credited"}
              onChange={() => u3({ disbursal: "credited" })}
            />

            <SecHead title="Carry Forward" />
            <Lbl>How do we handle unused leave balance, at the end of a month?</Lbl>
            <RR
              label="Don't do anything, let the hourly leave balance lapse"
              checked={s3.carryForward === "lapse"}
              onChange={() => u3({ carryForward: "lapse" })}
            />
            <RR label="Carry forward" checked={s3.carryForward === "carry"} onChange={() => u3({ carryForward: "carry" })}>
              <RR
                label="Carry forward all unused leaves to the next cycle"
                checked={s3.carryType === "all"}
                onChange={() => u3({ carryType: "all" })}
                indent={1}
              />
              <RR
                label="Carry forward only a limited amount"
                checked={s3.carryType === "limited"}
                onChange={() => u3({ carryType: "limited" })}
                indent={1}
              >
                <Lbl sm>Allow only a minimum hours leave in a day</Lbl>
                <FRow>
                  <FieldCol>
                    <Sel value={s3.minHoursPerDay} onChange={(e) => u3({ minHoursPerDay: e.target.value })} options={["Fixed number", "Percentage"]} />
                  </FieldCol>
                  <FieldCol>
                    <Lbl sm>Leave Hours</Lbl>
                    <Inp
                      value={s3.leaveHours}
                      onChange={(e) => u3({ leaveHours: e.target.value })}
                      type="number"
                      min={0}
                      suffix="HRS"
                    />
                  </FieldCol>
                </FRow>
                <p className="mt-1.5 text-[11px] text-[#e57373]">Note: Remaining leaves will be discarded/lapsed, if any</p>
              </RR>
            </RR>

            <SecHead title="Approval Workflow" />
            <Lbl>How do you want to process an application of Hourly Leave?</Lbl>
            <RR
              label="Follow existing Leave Approval Workflow"
              checked={s3.approval === "existing"}
              onChange={() => u3({ approval: "existing" })}
            />
            <RR
              label="Bypass existing workflow, directly send to Reporting Manager(s) for approval"
              checked={s3.approval === "bypass"}
              onChange={() => u3({ approval: "bypass" })}
            />
            <RR
              label="Auto-approve hourly leave applications and notify manager/admin"
              checked={s3.approval === "auto"}
              onChange={() => u3({ approval: "auto" })}
            />
          </div>
        )}

        {activeStepConfig?.kind === "leaveConfig" && (
          <div>
            <Lbl>Let&apos;s give this leave a name</Lbl>
            <Inp value={s4.leaveName4} onChange={(e) => u4({ leaveName4: e.target.value })} placeholder="Enter leave name" />

            <SecHead title="Leave Allocation" />
            <Lbl>How do you want to define annual allotment of leave balance?</Lbl>
            <RR
              label="Automatically allocate annual leave balance"
              checked={s4.allocation === "auto"}
              onChange={() => u4({ allocation: "auto" })}
            >
              <FRow gap={8} className="mt-1.5">
                <Inp
                  value={s4.annualDays}
                  onChange={(e) => u4({ annualDays: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[160px]"
                  placeholder="Enter days"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
            </RR>
            <RR
              label="Manually allocate leave balance per month"
              checked={s4.allocation === "manual"}
              onChange={() => u4({ allocation: "manual" })}
            />

            <SecHead title="Who, How & When (Calculations & Disbursal)" />
            <Lbl>Who can avail this leave balance?</Lbl>
            <Lbl sm>Gender</Lbl>
            <Sel value={s4.gender} onChange={(e) => u4({ gender: e.target.value })} options={["Male", "Female", "All"]} />
            <Lbl sm>Employment Type</Lbl>
            <Sel value={s4.empType4} onChange={(e) => u4({ empType4: e.target.value })} options={["Full-time", "Part-time", "Contract"]} />
            <Lbl sm>Marital Status</Lbl>
            <Sel value={s4.marital} onChange={(e) => u4({ marital: e.target.value })} options={["Single", "Married", "Any"]} />

            <Lbl>How will the leave balance be calculated?</Lbl>
            <RR label="Pro-rate" checked={s4.calcType4 === "prorate"} onChange={() => u4({ calcType4: "prorate" })}>
              <RR label="Pro-rate from joining date" checked={s4.prorateFrom4 === "joining"} onChange={() => u4({ prorateFrom4: "joining" })} indent={1}>
                <RR
                  label="Calculate leaves for the joining month, irrespective of joining date"
                  checked={s4.joinCalc4 === "irrespective"}
                  onChange={() => u4({ joinCalc4: "irrespective" })}
                  indent={1}
                />
                <RR
                  label="Calculate half month's leave for joining month, if employee joins after"
                  checked={s4.joinCalc4 === "half"}
                  onChange={() => u4({ joinCalc4: "half" })}
                  indent={1}
                >
                  <FRow gap={6}>
                    <Inp
                      value={s4.joinAfterDays4}
                      onChange={(e) => u4({ joinAfterDays4: e.target.value })}
                      type="number"
                      min={0}
                      className="max-w-[160px]"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </RR>
              </RR>
              <RR
                label="Pro-rate from probation end date"
                checked={s4.prorateFrom4 === "probation"}
                onChange={() => u4({ prorateFrom4: "probation" })}
                indent={1}
              >
                <CR
                  label="Include extended probation, if any"
                  checked={s4.extProbation4}
                  onChange={() => u4({ extProbation4: !s4.extProbation4 })}
                  indent={1}
                />
                <RR
                  label="Calculate leaves for the probation end month"
                  checked={s4.probCalc4 === "full"}
                  onChange={() => u4({ probCalc4: "full" })}
                  indent={1}
                />
                <RR
                  label="Calculate half month's leave for probation end month, if after"
                  checked={s4.probCalc4 === "half"}
                  onChange={() => u4({ probCalc4: "half" })}
                  indent={1}
                >
                  <FRow gap={6}>
                    <Inp
                      value={s4.probAfterDays4}
                      onChange={(e) => u4({ probAfterDays4: e.target.value })}
                      type="number"
                      min={0}
                      className="max-w-[160px]"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </RR>
              </RR>
            </RR>
            <RR label="Do not pro-rate" checked={s4.calcType4 === "noprorate"} onChange={() => u4({ calcType4: "noprorate" })}>
              <RR
                label="Don't pro-rate, calculate all leaves irrespective of any joining or probation date"
                checked={s4.noProRate4 === "all"}
                onChange={() => u4({ noProRate4: "all" })}
                indent={1}
              />
              <RR
                label="Don't pro-rate, if employees joins on or before"
                checked={s4.noProRate4 === "conditional"}
                onChange={() => u4({ noProRate4: "conditional" })}
                indent={1}
              >
                <FRow gap={8} className="mt-1.5">
                  <Sel value={s4.joinsOnOrBefore4} onChange={(e) => u4({ joinsOnOrBefore4: e.target.value })} options={["1", "5", "10", "15"]} />
                  <Inp
                    value={s4.joinsOnOrBeforeDays4}
                    onChange={(e) => u4({ joinsOnOrBeforeDays4: e.target.value })}
                    type="number"
                    min={0}
                    suffix="Days"
                  />
                  <Sel
                    value={s4.joinsMonth4}
                    onChange={(e) => u4({ joinsMonth4: e.target.value })}
                    options={["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]}
                  />
                </FRow>
                <Lbl sm>Else for other employees calculate from</Lbl>
                <Sel
                  value={s4.elseCalcFrom4}
                  onChange={(e) => u4({ elseCalcFrom4: e.target.value })}
                  options={["Joining Date", "Probation End Date"]}
                />
              </RR>
            </RR>

            <Lbl>When will the leave balance be available?</Lbl>
            <RR label="Leave balance will be accrued" checked={s4.disbursal4 === "accrued"} onChange={() => u4({ disbursal4: "accrued" })} />
            <RR
              label="Leave balance will be credited all at once"
              checked={s4.disbursal4 === "credited"}
              onChange={() => u4({ disbursal4: "credited" })}
            >
              <Lbl>Do you want to limit credit during probation?</Lbl>
              <RR
                label="Yes"
                checked={s4.limitProbationCredit === "yes"}
                onChange={() => u4({ limitProbationCredit: "yes" })}
                indent={1}
              >
                <Lbl sm>Credit only leaves until probation ends</Lbl>
                <FRow gap={8}>
                  <Sel value={s4.creditUntilProbationSel} onChange={(e) => u4({ creditUntilProbationSel: e.target.value })} options={["1", "2", "3", "5", "10"]} />
                  <InlineUnit>Days</InlineUnit>
                </FRow>
              </RR>
              <RR label="No" checked={s4.limitProbationCredit === "no"} onChange={() => u4({ limitProbationCredit: "no" })} indent={1} />
            </RR>

            <SecHead title="Usage Policy" />
            <Lbl>Do you want to keep attachments compulsory for this leave?</Lbl>
            <RR label="Yes" checked={s4.attachments === "yes"} onChange={() => u4({ attachments: "yes" })}>
              <Lbl sm>Supporting documents required if leave duration is greater than</Lbl>
              <FRow gap={6}>
                <Inp
                  value={s4.attachmentDays}
                  onChange={(e) => u4({ attachmentDays: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[160px]"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
              <Lbl sm>Explanatory note visible to employee</Lbl>
              <Txt value={s4.attachmentNote} onChange={(e) => u4({ attachmentNote: e.target.value })} rows={3} />
            </RR>
            <RR label="No" checked={s4.attachments === "no"} onChange={() => u4({ attachments: "no" })} />

            <Lbl bold>During Probation</Lbl>
            <Lbl>Allow only a maximum of days leave in a probation month</Lbl>
            <FRow gap={6}>
              <Inp
                value={s4.maxProbationDays}
                onChange={(e) => u4({ maxProbationDays: e.target.value })}
                type="number"
                min={0}
                className="max-w-[160px]"
              />
              <InlineUnit>Days</InlineUnit>
            </FRow>

            <Lbl>Allow accumulation of balance in probation period</Lbl>
            <RR label="Yes" checked={s4.accumProbation === "yes"} onChange={() => u4({ accumProbation: "yes" })} />
            <RR label="No" checked={s4.accumProbation === "no"} onChange={() => u4({ accumProbation: "no" })} />

            <Lbl>Do you want to allow employees to apply this leave during probation?</Lbl>
            <RR label="Yes" checked={s4.applyDuringProbation1 === "yes"} onChange={() => u4({ applyDuringProbation1: "yes" })} />
            <RR label="No" checked={s4.applyDuringProbation1 === "no"} onChange={() => u4({ applyDuringProbation1: "no" })} />

            <Lbl bold>After Confirmation</Lbl>
            <FRow>
              <FieldCol>
                <Lbl sm>Period</Lbl>
                <Sel value={s4.afterConfirmPeriod} onChange={(e) => u4({ afterConfirmPeriod: e.target.value })} options={["Monthly", "Yearly"]} />
              </FieldCol>
              <FieldCol>
                <Lbl sm>Maximum Leaves</Lbl>
                <Sel value={s4.afterConfirmMax} onChange={(e) => u4({ afterConfirmMax: e.target.value })} options={["5", "10", "15", "20"]} />
              </FieldCol>
            </FRow>

            <Lbl>How many maximum consecutive leaves you want to allow?</Lbl>
            <FRow gap={6}>
              <Inp
                value={s4.maxConsecutive4}
                onChange={(e) => u4({ maxConsecutive4: e.target.value })}
                type="number"
                min={0}
                className="max-w-[160px]"
              />
              <InlineUnit>Days</InlineUnit>
            </FRow>

            <Lbl>Would you like to allow half-day leave applications?</Lbl>
            <RR label="Yes" checked={s4.halfDay4 === "yes"} onChange={() => u4({ halfDay4: "yes" })} />
            <RR label="No" checked={s4.halfDay4 === "no"} onChange={() => u4({ halfDay4: "no" })} />

            <Lbl>Do you want to limit leave applications for future dates?</Lbl>
            <RR label="Yes" checked={s4.limitFuture4 === "yes"} onChange={() => u4({ limitFuture4: "yes" })}>
              <FRow>
                <FieldCol>
                  <Lbl sm>If leave duration is greater than</Lbl>
                  <FRow gap={6}>
                    <Inp
                      value={s4.futureDuration4}
                      onChange={(e) => u4({ futureDuration4: e.target.value })}
                      type="number"
                      min={0}
                      className="flex-1"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </FieldCol>
                <FieldCol>
                  <Lbl sm>Employee must apply at least</Lbl>
                  <FRow gap={6}>
                    <Inp
                      value={s4.futureApplyAtLeast4}
                      onChange={(e) => u4({ futureApplyAtLeast4: e.target.value })}
                      type="number"
                      min={0}
                      className="flex-1"
                    />
                    <InlineUnit>Days</InlineUnit>
                  </FRow>
                </FieldCol>
              </FRow>
              <Lbl sm>But not earlier than</Lbl>
              <FRow gap={6}>
                <Inp
                  value={s4.futureNotEarlier4}
                  onChange={(e) => u4({ futureNotEarlier4: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[180px]"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
            </RR>
            <RR label="No" checked={s4.limitFuture4 === "no"} onChange={() => u4({ limitFuture4: "no" })} />

            <Lbl>Do you want to allow leave application for past dates?</Lbl>
            <RR
              label="Yes"
              checked={s4.allowPast4 === "yes"}
              onChange={() => u4({ allowPast4: "yes" })}
              className="shadow-none transition-transform duration-150 hover:scale-[1.01]"
              buttonClassName="shadow-none"
              contentClassName="shadow-none"
            >
              <Lbl sm>Leave application can be made upto days after actual leave date</Lbl>
              <FRow gap={6}>
                <Inp
                  value={s4.pastDays4}
                  onChange={(e) => u4({ pastDays4: e.target.value })}
                  type="number"
                  min={0}
                  className="max-w-[180px]"
                />
                <InlineUnit>Days</InlineUnit>
              </FRow>
            </RR>
            <RR label="No" checked={s4.allowPast4 === "no"} onChange={() => u4({ allowPast4: "no" })} />

            <SecHead title="Sandwiched/Intervening Leaves" />
            <Lbl>If leaves are applied next to or in-between holidays/weekly-offs, should there be additional leave deductions?</Lbl>
            <SandwichSection
              sandwiched={s4.sandwiched4}
              onSandwich={(value) => u4({ sandwiched4: value })}
              sandwichTypes={s4.sandwichTypes4}
              onToggleType={(key) => u4({ sandwichTypes4: toggleArr(s4.sandwichTypes4, key) })}
              sandwichSubTypes={s4.sandwichSubTypes4}
              onToggleSubType={(groupKey, sub) => u4({ sandwichSubTypes4: toggleNestedArr(s4.sandwichSubTypes4, groupKey, sub) })}
            />

            <SecHead title="Leave Clubbing" />
            <Lbl>Allow employees to apply for different types of leaves, adjacent to each other</Lbl>
            <RR label="Yes" checked={s4.clubbing4 === "yes"} onChange={() => u4({ clubbing4: "yes" })}>
              <Lbl sm>For the following type(s) of leaves</Lbl>
              <Sel value={s4.clubbingTypes4} onChange={(e) => u4({ clubbingTypes4: e.target.value })} />
            </RR>
            <RR
              label="No, deduct leaves only for applied dates"
              checked={s4.clubbing4 === "no"}
              onChange={() => u4({ clubbing4: "no" })}
            />

            <SecHead title="Leave Overutilization" />
            <Lbl>How do we handle leave applications which exceed the available leave balance?</Lbl>
            <RR
              label="Don't allow leave applications in excess of available balance"
              checked={s4.overutil === "deny"}
              onChange={() => u4({ overutil: "deny" })}
            />
            <RR
              label="Allow leave applications in excess of available balance"
              checked={s4.overutil === "allow"}
              onChange={() => u4({ overutil: "allow" })}
            >
              <RR
                label="Count excess leaves as paid (leave balance will go into negative)"
                checked={s4.overutilType === "paid"}
                onChange={() => u4({ overutilType: "paid" })}
                indent={1}
              />
              <RR
                label="Count excess leaves as unpaid"
                checked={s4.overutilType === "unpaid"}
                onChange={() => u4({ overutilType: "unpaid" })}
                indent={1}
              />
              <RR
                label="Deduct excess leaves from another leave type"
                checked={s4.overutilType === "deduct"}
                onChange={() => u4({ overutilType: "deduct" })}
                indent={1}
              >
                <Sel value={s4.deductFrom} onChange={(e) => u4({ deductFrom: e.target.value })} />
              </RR>
            </RR>

            <SecHead title="Carry Forward & Encashment" />
            <Lbl>What do we do about unused leave balance, at the end of a leave cycle/year?</Lbl>
            <RR
              label="Don't do anything, let the leave balance lapse"
              checked={!s4.carryForward4 && !s4.encash4}
              onChange={() => u4({ carryForward4: false, encash4: false })}
            />
            <CR label="Carry forward" checked={s4.carryForward4} onChange={() => u4({ carryForward4: !s4.carryForward4 })}>
              <FRow>
                <FieldCol>
                  <Sel value={s4.carryFwdLimit} onChange={(e) => u4({ carryFwdLimit: e.target.value })} />
                </FieldCol>
                <FieldCol>
                  <Lbl sm>Unused leaves</Lbl>
                  <Inp value={s4.carryFwdUnused} onChange={(e) => u4({ carryFwdUnused: e.target.value })} type="number" min={0} />
                </FieldCol>
              </FRow>
            </CR>
            <CR label="Encash" checked={s4.encash4} onChange={() => u4({ encash4: !s4.encash4 })}>
              <FRow>
                <FieldCol>
                  <Sel value={s4.encashLimit} onChange={(e) => u4({ encashLimit: e.target.value })} />
                </FieldCol>
                <FieldCol>
                  <Lbl sm>Unused leaves</Lbl>
                  <Inp value={s4.encashUnused} onChange={(e) => u4({ encashUnused: e.target.value })} type="number" min={0} />
                </FieldCol>
              </FRow>
            </CR>

            <SecHead title="Gift A Leave" />
            <Lbl>How about allowing employees to "Gift" their leave balance to colleagues?</Lbl>
            <RR label="Yes" checked={s4.giftLeave === "yes"} onChange={() => u4({ giftLeave: "yes" })}>
              <Lbl sm>Allow employees to gift leaves per year</Lbl>
              <Inp
                value={s4.giftLeavesPerYear}
                onChange={(e) => u4({ giftLeavesPerYear: e.target.value })}
                type="number"
                min={0}
                placeholder="Enter number"
              />
              <Lbl>Allow employees to receive gifted leaves?</Lbl>
              <RR label="Yes" checked={s4.giftReceive === "yes"} onChange={() => u4({ giftReceive: "yes" })} indent={1} />
              <RR label="No" checked={s4.giftReceive === "no"} onChange={() => u4({ giftReceive: "no" })} indent={1} />
            </RR>
            <RR label="No" checked={s4.giftLeave === "no"} onChange={() => u4({ giftLeave: "no" })} />
          </div>
        )}

        {activeStepConfig?.kind === "preview" && (
          <div>
            <p className="mb-4 text-[13px] text-[#9ca3af]">Review your leave policy settings before saving.</p>

            <SecHead title="Selected Leave Types" />
            <PreviewRow label="Policy Name" value={s1.policyName} />
            <PreviewRow label="Description" value={s1.description} />
            <PreviewRow
              label="Selected Leave Types"
              value={
                s1.selectedTypes.length
                  ? s1.selectedTypes.map((type) => {
                      const policyCount = s1.typePolicyCounts?.[type] || 0;
                      const displayType = getLeaveTypeLabel(type);
                      return policyCount ? `${displayType} (${policyCount} ${policyCount === 1 ? "policy" : "policies"})` : displayType;
                    })
                  : "--"
              }
            />

            <SecHead title={getLeaveTypeLabel(LOCKED_LEAVE_TYPE)} />
            <PreviewRow label="Leave Name" value={s2.leaveName} />
            <PreviewRow label="Usage Limit Type" value={s2.usageLimitType} />
            <PreviewRow label="Max Days Leave" value={s2.maxDaysLeave} />
            <PreviewRow label="Max Consecutive Days" value={s2.maxConsecutive} />
            <PreviewRow label="Half Day Allowed" value={s2.halfDay} />
            <PreviewRow label="Limit Future Applications" value={s2.limitFuture} />
            <PreviewRow label="Allow Past Applications" value={s2.allowPast} />
            <PreviewRow label="Sandwiched Leaves" value={s2.sandwiched} />
            <PreviewRow label="Leave Clubbing" value={s2.clubbing} />

            <SecHead title={getLeaveTypeLabel(HOURLY_LEAVE_TYPE)} />
            <PreviewRow label="Hourly Leave Name" value={s3.hourlyName} />
            <PreviewRow label="Max Hours / Month" value={s3.maxHours} />
            <PreviewRow label="Employment Type" value={s3.employmentType} />
            <PreviewRow label="Calculation Type" value={s3.calcType} />
            <PreviewRow label="Disbursal" value={s3.disbursal} />
            <PreviewRow label="Carry Forward" value={s3.carryForward} />
            <PreviewRow label="Approval Workflow" value={s3.approval} />

            <SecHead title="Leave Config" />
            <PreviewRow label="Leave Name" value={s4.leaveName4} />
            <PreviewRow label="Allocation" value={s4.allocation} />
            <PreviewRow label="Annual Days" value={s4.annualDays} />
            <PreviewRow label="Gender" value={s4.gender} />
            <PreviewRow label="Employment Type" value={s4.empType4} />
            <PreviewRow label="Marital Status" value={s4.marital} />
            <PreviewRow label="Calculation Type" value={s4.calcType4} />
            <PreviewRow label="Disbursal" value={s4.disbursal4} />
            <PreviewRow label="Attachments Required" value={s4.attachments} />
            <PreviewRow label="Max Probation Days" value={s4.maxProbationDays} />
            <PreviewRow label="Accumulate During Probation" value={s4.accumProbation} />
            <PreviewRow label="Apply During Probation" value={s4.applyDuringProbation1} />
            <PreviewRow label="Half Day Allowed" value={s4.halfDay4} />
            <PreviewRow label="Max Consecutive Days" value={s4.maxConsecutive4} />
            <PreviewRow label="Sandwiched Leaves" value={s4.sandwiched4} />
            <PreviewRow label="Leave Clubbing" value={s4.clubbing4} />
            <PreviewRow label="Overutilization Policy" value={s4.overutil} />
            <PreviewRow label="Carry Forward" value={s4.carryForward4 ? "yes" : "no"} />
            <PreviewRow label="Encashment" value={s4.encash4 ? "yes" : "no"} />
            <PreviewRow label="Gift A Leave" value={s4.giftLeave} />
          </div>
        )}
      </div>

      <div className="fixed inset-x-0 bottom-0 z-[100] flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e7eb] bg-white px-6 py-[14px]">
        <button
          type="button"
          onClick={handleBackAction}
          className="inline-flex items-center gap-1.5 rounded-md border border-[#d1d5db] bg-white px-[18px] py-2 text-[13px] font-medium text-[#374151]"
        >
          <span aria-hidden="true">&larr;</span>
          <span>{step === 1 ? "Back to List" : "Previous"}</span>
        </button>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDraftSave}
            className="rounded-md border border-[#3b82f6] bg-white px-[18px] py-2 text-[13px] font-medium text-[#3b82f6]"
          >
            {isSubmitting ? "Saving..." : "Save as Draft"}
          </button>

          {step < stepConfigs.length ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="rounded-md bg-[#3b82f6] px-5 py-2 text-[13px] font-semibold text-white"
            >
              Next <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalSave}
              disabled={isSubmitting}
              className="rounded-md bg-[#22c55e] px-5 py-2 text-[13px] font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Saving..." : "Save Policy"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
