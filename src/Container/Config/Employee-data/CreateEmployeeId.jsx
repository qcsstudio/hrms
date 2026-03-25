import { useCallback, useEffect, useRef, useState } from "react";
import createAxios from "../../../utils/axios.config";
import { FaAngleDown } from "react-icons/fa";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";

const panelClass =
  "rounded-lg border border-[#E5E7EB] bg-white p-4 surface-card overflow-visible";

const controlClass =
  "h-[40px] w-full rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 transition-colors duration-200 hover:border-[#C7CED8]";

const dropdownControlClass =
  "h-[40px] w-full rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 transition-colors duration-200 hover:border-[#C7CED8] flex items-center justify-between";

const toggleBase =
  "relative inline-flex h-6 w-10 items-center rounded-full border border-transparent transition-colors duration-200 shadow-none outline-none focus:outline-none focus:ring-0";

const idTypeOptions = [
  { value: "company_name", label: "Company Name" },
  { value: "business_unit_name", label: "Business Unit Name" },
  { value: "office_location_name", label: "Office Location Name" },
  { value: "department_name", label: "Depart Name" },
  { value: "custom_text", label: "Custom Text" },
  { value: "numerical_series", label: "Numerical Series Starting from" },
];
const SUFFIX_TYPE = "numerical_series";

const DivDropdown = ({
  value,
  options,
  onSelect,
  placeholder = "Choose Account",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

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

  const selectedOption = options.find((option) => option.value === value);

  const normalizedOptions = options.some((option) => option.value === "")
    ? options
    : [{ value: "", label: placeholder }, ...options];

  const updateMenuPosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const estimatedMenuHeight = Math.min(normalizedOptions.length * 38 + 16, 224);
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const openUpward =
      spaceBelow < estimatedMenuHeight && spaceAbove > estimatedMenuHeight;

    setMenuStyle({
      top: openUpward ? rect.top - estimatedMenuHeight - 8 : rect.bottom + 8,
      left: rect.left,
      width: rect.width,
    });
  }, [normalizedOptions.length]);

  useEffect(() => {
    if (!isOpen) return;
    updateMenuPosition();

    const handleReposition = () => updateMenuPosition();
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen, updateMenuPosition]);

  return (
    <div
      ref={dropdownRef}
      className="relative w-full"
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen((prev) => !prev)}
        disabled={disabled}
        className={`${dropdownControlClass} ${
          disabled ? "cursor-not-allowed bg-[#F2F4F7] text-[#98A2B3]" : ""
        }`}
      >
        <span className={selectedOption ? "text-[#344054]" : "text-[#98A2B3]"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-[#667085] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen &&
        !disabled &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[99999] max-h-56 overflow-auto rounded-lg border border-[#DEE2E6] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
            style={{
              top: `${menuStyle.top}px`,
              left: `${menuStyle.left}px`,
              width: `${menuStyle.width}px`,
            }}
          >
          {normalizedOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              disabled={option.disabled}
              onClick={() => {
                if (option.disabled) return;
                onSelect(option.value);
                setIsOpen(false);
              }}
              className={`w-full border-none px-4 py-2 text-left text-sm shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                value === option.value
                  ? "bg-blue-50 text-[#111827] font-medium"
                  : option.disabled
                  ? "text-[#98A2B3] cursor-not-allowed bg-[#F8FAFC]"
                  : "text-[#334155] hover:bg-blue-50 active:bg-blue-100"
              }`}
            >
              <span>
                {option.label}
                {option.disabled && value !== option.value && (
                  <span className="ml-1 text-[11px] text-[#98A2B3]">
                    (Selected in another field)
                  </span>
                )}
              </span>
            </button>
          ))}
        </div>,
          document.body
        )}
    </div>
  );
};

const SectionRadio = ({ checked, onChange, label }) => {
  return (
    <label
      className={`w-full flex items-center gap-3 rounded-lg border px-4 py-4 cursor-pointer transition-all duration-200 shadow-none ${
        checked
          ? "border-[#A8CAFF] bg-[#EFF6FF]"
          : "border-[#DEE2E6] bg-white hover:border-[#CBD5E1]"
      }`}
    >
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span
        className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border ${
          checked ? "border-[#0575E6]" : "border-[#C4C9D1]"
        }`}
      >
        <span
          className={`h-[10px] w-[10px] rounded-full ${
            checked ? "bg-[#0575E6]" : "bg-transparent"
          }`}
        />
      </span>
      <span className="text-[15px] font-medium text-[#212529]">{label}</span>
    </label>
  );
};

const Toggle = ({ checked, onChange, disabled = false }) => {
  return (
    <button
      type="button"
      onClick={() => !disabled && onChange(!checked)}
      disabled={disabled}
      className={`${toggleBase} ${
        checked ? "bg-[#0575E6]" : "bg-[#D0D5DD]"
      } ${disabled ? "cursor-not-allowed opacity-70" : ""}`}
    >
      <span
        className={`inline-block h-[18px] w-[18px] transform rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-[18px]" : "translate-x-[2px]"
        }`}
      />
    </button>
  );
};

const BlockCard = ({
  checked,
  onCheckedChange,
  title,
  typeValue,
  onTypeChange,
  typeOptions,
  secondaryLabel,
  secondaryType = "text",
  secondaryPlaceholder = "Choose Account",
  secondaryInputMode,
  secondaryPattern,
  secondaryValue,
  onSecondaryChange,
  upperChecked,
  onUpperChange,
  typeLabel = "Select Type",
  showTypeSelect = true,
  showUpperToggle = true,
}) => {
  const isDisabled = !checked;

  return (
    <div className={`${panelClass} relative list-stagger`}>
      <label className="mb-3 flex items-center gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange(e.target.checked)}
          className="h-4 w-4 rounded border border-[#C4C9D1] text-[#0575E6] accent-[#0575E6]"
        />
        <span className="text-[16px] font-semibold text-[#212529]">{title}</span>
      </label>

      {showTypeSelect && (
        <>
          <p className="mb-1 text-[13px] font-medium text-[#212529]">{typeLabel}</p>
          <div className="mb-4">
            <DivDropdown
              value={typeValue}
              options={typeOptions}
              onSelect={onTypeChange}
              placeholder="Choose Account"
              disabled={isDisabled}
            />
          </div>
        </>
      )}

      <p className="mb-1 text-[13px] font-medium text-[#212529]">{secondaryLabel}</p>
      <input
        type={secondaryType}
        disabled={isDisabled}
        inputMode={secondaryInputMode}
        pattern={secondaryPattern}
        className={`${controlClass} mb-4 ${
          isDisabled ? "cursor-not-allowed bg-[#F2F4F7] text-[#98A2B3]" : ""
        }`}
        placeholder={secondaryPlaceholder}
        value={secondaryValue}
        onChange={(e) => onSecondaryChange(e.target.value)}
      />

      {showUpperToggle && (
        <div className="flex items-center justify-between">
          <span className="text-[14px] font-medium text-[#212529]">All Upper Case</span>
          <Toggle checked={upperChecked} onChange={onUpperChange} disabled={isDisabled} />
        </div>
      )}
    </div>
  );
};

export default function CreateEmployeeId() {
  const [mode, setMode] = useState("auto");
  const [assignMethod, setAssignMethod] = useState("oldest");
  const [includeDeactivated, setIncludeDeactivated] = useState("yes");
  const [separatorType, setSeparatorType] = useState("hyphen");

  const [prefix, setPrefix] = useState(false);
  const [prefixType, setPrefixType] = useState("");
  const [prefixText, setPrefixText] = useState("");
  const [prefixChars, setPrefixChars] = useState("");
  const [prefixUpper, setPrefixUpper] = useState(false);

  const [mid, setMid] = useState(false);
  const [midType, setMidType] = useState("");
  const [midText, setMidText] = useState("");
  const [midChars, setMidChars] = useState("");
  const [midUpper, setMidUpper] = useState(false);

  const [suffix, setSuffix] = useState(false);
  const [suffixText, setSuffixText] = useState("");

  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);
  const separatorMap = {
    hyphen: "-",
    forward_slash: "/",
    backward_slash: "\\",
    none: "",
  };
  const selectedSeparator = separatorMap[separatorType];

  const sourceValueMap = {
    company_name: "QCSS",
    business_unit_name: "BU1",
    office_location_name: "BLR",
    department_name: "HR",
    numerical_series: "0001",
  };

  const getPreviewPart = ({
    enabled,
    type,
    customText,
    chars,
    upperCase,
    fallback,
  }) => {
    if (!enabled) return "";
    if (!type) return fallback;

    let value =
      type === "custom_text"
        ? customText?.trim() || fallback
        : sourceValueMap[type] || fallback;

    if (type !== "custom_text") {
      const charCount = Number(chars);
      if (charCount > 0) {
        value = value.slice(0, charCount);
      }
    }

    return upperCase ? value.toUpperCase() : value;
  };

  const previewPrefix = getPreviewPart({
    enabled: prefix,
    type: prefixType,
    customText: prefixText,
    chars: prefixChars,
    upperCase: prefixUpper,
    fallback: "PRF",
  });
  const previewMid = getPreviewPart({
    enabled: mid,
    type: midType,
    customText: midText,
    chars: midChars,
    upperCase: midUpper,
    fallback: "MID",
  });
  const previewSuffix = suffix ? suffixText.trim() || "001" : "";

  const previewEmployeeId =
    [previewPrefix, previewMid, previewSuffix].filter(Boolean).join(selectedSeparator) ||
    "EMP0001";

  useEffect(() => {
    const fetchEmployeeIdConfig = async () => {
      if (!token) return;

      try {
        const response = await axiosInstance.get("/config/employee-id-config-get", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const config = response?.data?.data || response?.data?.config || response?.data || {};
        if (!config || typeof config !== "object") return;

        setMode(config?.assignType === "manual" ? "manual" : "auto");
        setAssignMethod(
          config?.continueSeriesForFutureEmployees
            ? "continue"
            : config?.assignToExistingEmployees
            ? "oldest"
            : "oldest"
        );
        setIncludeDeactivated(config?.includeDeactivatedEmployees ? "yes" : "no");

        if (config?.preview) {
          const previewValue = String(config.preview);
          const resolvedSeparator = previewValue.includes("-")
            ? "hyphen"
            : previewValue.includes("/")
            ? "forward_slash"
            : previewValue.includes("\\")
            ? "backward_slash"
            : "none";

          const separatorSymbol = separatorMap[resolvedSeparator];
          const parts = separatorSymbol ? previewValue.split(separatorSymbol) : [previewValue];

          setSeparatorType(resolvedSeparator);

          setPrefix(false);
          setMid(false);
          setSuffix(false);
          setPrefixType("");
          setMidType("");
          setPrefixText("");
          setMidText("");
          setSuffixText("");

          if (parts[0]) {
            setPrefix(true);
            setPrefixType("custom_text");
            setPrefixText(parts[0]);
            setPrefixUpper(parts[0] === parts[0].toUpperCase());
          }

          if (parts.length === 2 && /^\d+$/.test(parts[1])) {
            setSuffix(true);
            setSuffixText(parts[1]);
          } else {
            if (parts[1]) {
              setMid(true);
              setMidType("custom_text");
              setMidText(parts[1]);
              setMidUpper(parts[1] === parts[1].toUpperCase());
            }
            if (parts[2]) {
              setSuffix(true);
              setSuffixText(parts[2]);
            }
          }
        }
      } catch (error) {
        console.log("get employee id config error", error?.response?.data || error);
        toast.error(error?.response?.data?.message || "Failed to load employee ID config");
      }
    };

    fetchEmployeeIdConfig();
  }, [token]);

  const buildTypeOptions = (currentValue, blockedValues) =>
    idTypeOptions.map((option) => ({
      ...option,
      disabled:
        blockedValues.includes(option.value) && option.value !== currentValue,
    }));

  const handlePrefixTypeChange = (value) => {
    setPrefixType(value);
    if (value === "custom_text") setPrefixChars("");
    else setPrefixText("");
    if (!value) return;
    if (midType === value) setMidType("");
  };

  const handleMidTypeChange = (value) => {
    setMidType(value);
    if (value === "custom_text") setMidChars("");
    else setMidText("");
    if (!value) return;
    if (prefixType === value) setPrefixType("");
  };

  const handlePrefixSecondaryChange = (value) => {
    if (prefixType === "custom_text") {
      setPrefixText(value);
      return;
    }
    setPrefixChars(value.replace(/\D/g, ""));
  };

  const handleMidSecondaryChange = (value) => {
    if (midType === "custom_text") {
      setMidText(value);
      return;
    }
    setMidChars(value.replace(/\D/g, ""));
  };

  const handleSuffixSeriesChange = (value) => {
    setSuffixText(value.replace(/\D/g, ""));
  };

  const sendConfig = async () => {
    if (!token) return;

    const payLoad = {
      assignType: mode === "auto" ? "automatic" : "manual",
      preview: previewEmployeeId,
      assignToExistingEmployees: assignMethod === "oldest",
      includeDeactivatedEmployees: includeDeactivated === "yes",
      continueSeriesForFutureEmployees: assignMethod === "continue",
    };

    try {
      const response = await axiosInstance.post(
        "/config/employee-id-config",
        payLoad,{
          meta:{auth:"ADMIN_AUTH"}
        }
      );
      console.log("Saved:", response.data);
      toast.success(response?.data?.message || "Employee ID config saved successfully");
    } catch (error) {
      console.log("error", error.response?.data);
      toast.error(error?.response?.data?.message || "Failed to save employee ID config");
    }
  };

  return (
    <div className="bg-[#F8F9FA] p-[15px] card-animate">
      <div className="mx-auto max-w-[1700px]">
        <h1 className="text-[20px] font-bold text-[#212529]">Create Employee ID</h1>
        <p className="mt-1 text-[12px] text-[#000000]/35">
          Configure employee ID generation flow and assignment order.
        </p>

        <p className="mt-6 mb-3 text-[14px] font-medium text-[#212529]">
          How would you like to define employee ID?
        </p>

        <div className="space-y-3">
          <SectionRadio
            checked={mode === "manual"}
            onChange={() => setMode("manual")}
            label="Specify it manually"
          />
          <SectionRadio
            checked={mode === "auto"}
            onChange={() => setMode("auto")}
            label="Assign Automatically"
          />
        </div>

        {mode === "auto" && (
          <>
            <div className={`${panelClass} mt-5 grid grid-cols-1 gap-4 md:grid-cols-2`}>
              <div>
                <p className="mb-2 text-[14px] font-medium text-[#212529]">
                  Preview Employee ID
                </p>
                <input
                  readOnly
                  value={previewEmployeeId}
                  className={`${controlClass} bg-[#F8FAFC] text-[#111827]`}
                />
              </div>

              <div>
                <p className="mb-2 text-[14px] font-medium text-[#212529]">
                  Select Separator
                </p>
                <DivDropdown
                  value={separatorType}
                  onSelect={setSeparatorType}
                  options={[
                    { value: "hyphen", label: "- Hyphen" },
                    { value: "forward_slash", label: "/ Forward Slash" },
                    { value: "backward_slash", label: "\\ Backward Slash" },
                    { value: "none", label: "No Separator" },
                  ]}
                />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
              <BlockCard
                checked={prefix}
                onCheckedChange={setPrefix}
                title="Prefix Text"
                typeLabel="Select Prefix Type"
                typeValue={prefixType}
                onTypeChange={handlePrefixTypeChange}
                typeOptions={buildTypeOptions(prefixType, [midType].filter(Boolean))}
                secondaryLabel={
                  prefixType === "custom_text" ? "Custom Text" : "Number of Characters"
                }
                secondaryType={prefixType === "custom_text" ? "text" : "number"}
                secondaryPlaceholder={
                  prefixType === "custom_text" ? "Enter custom text" : "e.g. 4"
                }
                secondaryInputMode={
                  prefixType === "custom_text" ? undefined : "numeric"
                }
                secondaryPattern={prefixType === "custom_text" ? undefined : "[0-9]*"}
                secondaryValue={prefixType === "custom_text" ? prefixText : prefixChars}
                onSecondaryChange={handlePrefixSecondaryChange}
                upperChecked={prefixUpper}
                onUpperChange={setPrefixUpper}
              />

              <BlockCard
                checked={mid}
                onCheckedChange={setMid}
                title="Mid Text"
                typeLabel="Select Mid Type"
                typeValue={midType}
                onTypeChange={handleMidTypeChange}
                typeOptions={buildTypeOptions(midType, [prefixType].filter(Boolean))}
                secondaryLabel={
                  midType === "custom_text" ? "Custom Text" : "Number of Characters"
                }
                secondaryType={midType === "custom_text" ? "text" : "number"}
                secondaryPlaceholder={
                  midType === "custom_text" ? "Enter custom text" : "e.g. 3"
                }
                secondaryInputMode={midType === "custom_text" ? undefined : "numeric"}
                secondaryPattern={midType === "custom_text" ? undefined : "[0-9]*"}
                secondaryValue={midType === "custom_text" ? midText : midChars}
                onSecondaryChange={handleMidSecondaryChange}
                upperChecked={midUpper}
                onUpperChange={setMidUpper}
              />

              <BlockCard
                checked={suffix}
                onCheckedChange={setSuffix}
                title="Suffix Text"
                showTypeSelect={false}
                secondaryLabel="Numerical Series Starting from"
                secondaryType="text"
                secondaryPlaceholder="e.g. 001"
                secondaryInputMode="numeric"
                secondaryPattern="[0-9]*"
                secondaryValue={suffixText}
                onSecondaryChange={handleSuffixSeriesChange}
                showUpperToggle={false}
              />
            </div>

            <p className="mt-8 mb-3 text-[14px] font-medium text-[#212529]">
              How do we assign these IDs to the existing employees?
            </p>

            <div className="space-y-3">
              <SectionRadio
                checked={assignMethod === "oldest"}
                onChange={() => setAssignMethod("oldest")}
                label="Start from the oldest joining date"
              />

              {assignMethod === "oldest" && (
                <div className={`${panelClass} p-4`}>
                  <p className="mb-3 text-[14px] font-medium text-[#212529]">
                    Would you like to include deactivated employees?
                  </p>
                  <div className="space-y-3">
                    <SectionRadio
                      checked={includeDeactivated === "yes"}
                      onChange={() => setIncludeDeactivated("yes")}
                      label="Yes"
                    />
                    <SectionRadio
                      checked={includeDeactivated === "no"}
                      onChange={() => setIncludeDeactivated("no")}
                      label="No"
                    />
                  </div>
                </div>
              )}

              <SectionRadio
                checked={assignMethod === "continue"}
                onChange={() => setAssignMethod("continue")}
                label="Continue series for all future employees"
              />
            </div>
          </>
        )}

        <div className="mt-6">
          <button
            type="button"
            onClick={sendConfig}
            className="h-[40px] rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:bg-[#0467CA] active:scale-[0.99]"
          >
            Save Employee ID Config
          </button>
        </div>
      </div>
    </div>
  );
}
