import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaAngleDown } from "react-icons/fa";
import { FiChevronRight, FiSearch, FiX } from "react-icons/fi";

const permissionData = {
  HRIS: [
    { name: "Interface Branding", tag: "config" },

    {
      name: "Approval Workflow",
      desc: "Bulk update employee's assigned approval workflow",
    },
    {
      name: "Approval Workflow Management",
      tag: "config",
      desc: "Create and manage approval workflows in your company",
    },

    {
      name: "Employee ID",
      tag: "config",
      desc: "Define employee id for everyone in your company",
    },
    {
      name: "Employee ID Management",
      desc: "Manually assign and update employee ID",
    },

    {
      name: "Business Unit",
      tag: "config",
      desc: "Create and configure business units in your company",
    },

    {
      name: "Reporting Hierarchy",
      desc: "Birds eye view of your company structure",
    },

    { name: "Team", desc: "Bulk update employee's assigned team" },
    {
      name: "Team Configuration",
      tag: "config",
      desc: "Create and configure teams in your company",
    },

    { name: "Bank Detail" },

    { name: "Exit Policy", desc: "Bulk assign exit policy to employees" },
    {
      name: "Exit Policy Configuration",
      tag: "config",
      desc: "Create and configure employee exit policies",
    },

    { name: "Deactivate & Exit Employee" },

    { name: "Custom Data", tag: "config" },

    { name: "Add New Employee", desc: "Bulk add new employees" },

    {
      name: "Exit Reason",
      tag: "config",
      desc: "Create and configure reasons of employee exit in your company",
    },

    {
      name: "Grade",
      tag: "config",
      desc: "Create and configure grades in your company",
    },
    { name: "Grade Assignment", desc: "Bulk update employee's assigned grade" },

    {
      name: "Reporting Office",
      desc: "Bulk update employee's reporting office from one location to another",
    },

    {
      name: "Company Attributes",
      desc: "Filter employees using attributes like Business Unit, Department, Team",
    },

    {
      name: "Invite Employee",
      desc: "Generate company code and invite employees",
    },

    {
      name: "Profile",
      desc: "Employee profile with personal and work details",
    },

    {
      name: "Report Robo",
      desc: "Generate or schedule reports and view report history",
    },

    { name: "Incorporation Details", tag: "config" },

    {
      name: "Identity & Statutory",
      desc: "Download and upload statutory employee documents",
    },

    {
      name: "Notification Center",
      desc: "Centralized place to view notifications",
    },

    {
      name: "Probation",
      tag: "config",
      desc: "Create and manage probation settings",
    },
    {
      name: "Probation Management",
      desc: "Plan, extend and confirm employee probation",
    },

    { name: "Company Offices", tag: "config" },

    {
      name: "Employee Attributes",
      desc: "Filter employees using personal attributes like name, blood group etc",
    },

    {
      name: "Initiate Resignation",
      desc: "Employees initiate resignation or managers terminate employees",
    },

    {
      name: "Personal Profile Privacy",
      desc: "Control amount of personal information shared with others",
    },

    {
      name: "Employment Type",
      desc: "Bulk update employment types like full-time or part-time",
    },

    {
      name: "Employee Personal Details",
      desc: "Bulk add and update employee personal details",
    },

    {
      name: "Default Permission",
      desc: "Bulk assign default permissions to employees",
    },
    {
      name: "Default Permission Configuration",
      tag: "config",
      desc: "Define default feature access permissions",
    },

    {
      name: "Designation",
      tag: "config",
      desc: "Create and configure job designations",
    },
    {
      name: "Designation Change",
      desc: "Plan designation changes and promotions",
    },

    {
      name: "Directory",
      desc: "View all employees and profiles from directory",
    },

    { name: "Directory Dates" },

    {
      name: "Request Center",
      desc: "Requests sent and received for approval workflow",
    },

    { name: "Email Branding", tag: "config" },

    {
      name: "Permission Policy",
      tag: "config",
      desc: "Create permission policies for roles like Payroll Manager etc",
    },
    {
      name: "Permission Policy Assignment",
      desc: "Assign permission policy to employees",
    },

    { name: "Export Directory Data", desc: "Export employee directory data" },

    { name: "Global Default", tag: "config" },

    { name: "Common Access", tag: "config" },

    {
      name: "Notify Employees",
      desc: "Send announcements to selected employees",
    },

    { name: "Self Service", desc: "Bulk update employee self-service access" },

    {
      name: "Department",
      tag: "config",
      desc: "Create and configure departments",
    },

    { name: "Mobile Device History", desc: "View mobile app login activity" },

    {
      name: "Notification Preferences",
      desc: "Configure notification preferences",
    },

    {
      name: "Default Profile Privacy",
      tag: "config",
      desc: "Control personal details visibility",
    },

    {
      name: "Managers",
      desc: "Bulk update employee primary and secondary managers",
    },

    {
      name: "Employee Work Details",
      desc: "Bulk update employee designation, department and business unit",
    },
  ],

  Track: [
    { name: "Shift", desc: "Create and configure shifts", tag: "config" },
    {
      name: "Export Biometric Mapping Data",
      desc: "Export biometric mapping CSV file",
    },
    { name: "Attendance Logs", desc: "View all attendance punch logs" },
    { name: "Shift Planning", desc: "Plan and assign shifts" },
    { name: "Extra Time", desc: "Assign comp-off or extra pay" },
    { name: "WFH/OD Request", desc: "Work from home or out duty request" },
    {
      name: "Export Biometric Logs Data",
      desc: "Export biometric attendance CSV",
    },
    { name: "Delete Attendance Logs", desc: "Delete incorrect punches" },
    { name: "Holiday Plan", desc: "Create holiday plans", tag: "config" },
    { name: "Bulk Leave Application", desc: "Download and upload leave data" },
    { name: "Auto Regularize", desc: "Auto update attendance for absent days" },
    { name: "Export Attendance Logs", desc: "Export attendance data" },
    {
      name: "Attendance Request Cycle",
      desc: "Configure attendance request cycle",
      tag: "config",
    },
    { name: "Biometric Device", desc: "Add biometric device" },
    { name: "Clock-in Request", desc: "Manual clock-in request" },
    { name: "Biometric Mapping", desc: "Map biometric user IDs" },
    { name: "Update Attendance Logs", desc: "Edit attendance logs" },
    {
      name: "Clock-in Method",
      desc: "Configure clock-in method",
      tag: "config",
    },
    { name: "Leave Type", desc: "Define leave types", tag: "config" },
    { name: "Leave Balance", desc: "View leave balances" },
    {
      name: "Attendance Regularization",
      desc: "Bulk attendance regularization",
    },
    { name: "Leave Policy Planning", desc: "Assign leave policy" },
    { name: "Holiday View", desc: "View holidays" },
    { name: "Weekly-off", desc: "Configure weekly off", tag: "config" },
    {
      name: "Extra Time (Compoff)",
      desc: "Configure comp-off policy",
      tag: "config",
    },
    { name: "Bulk Regularize", desc: "Bulk update clock in/out" },
    { name: "Holiday Planning", desc: "Assign holiday plan" },
    { name: "Leave Policy", desc: "Configure leave policy", tag: "config" },
    {
      name: "Attendance Policy",
      desc: "Configure attendance policy",
      tag: "config",
    },
  ],

  Pay: [
    {
      name: "Advance Request",
      desc: "Lets you apply an advance money request for expenses to be incurred",
    },
    {
      name: "Expense",
      desc: "Expense dashboard with an overview of all expenses incurred",
    },
    {
      name: "Flexible Benefit Plan",
    },
    {
      name: "Extra Payments (Individual actions)",
    },
    {
      name: "Fuel & Distance Unit",
      tag: "config",
      desc: "Lets you configure the fuel cost for different types of fuels that your employee's vehicle might consume while traveling",
    },
    {
      name: "Annual Payslip",
    },
    {
      name: "Expense Policy",
      tag: "config",
      desc: "Bulk assign expense policy to employees",
    },
    {
      name: "Employee Payroll Details",
    },
    {
      name: "Proration Upload",
    },
    {
      name: "Employee's Payslip",
    },
    {
      name: "Package & Proration",
    },
    {
      name: "Extra Deductions",
    },
    {
      name: "Flexible Benefit Plan",
      tag: "config",
    },
    {
      name: "Form 12B",
    },
    {
      name: "Tax Sheet",
    },
    {
      name: "Payroll Dashboard",
    },
    {
      name: "Compensator",
      tag: "config",
      desc: "Lets you add employees as compensators to pay employees for expenses incurred or lend an advance",
    },
    {
      name: "Overtime Payment Policy",
      tag: "config",
    },
    {
      name: "Payroll Tag",
      tag: "config",
    },
    {
      name: "Compensator Dashboard",
      desc: "Lets designated employees pay for expenses incurred or lend an advance",
    },
    {
      name: "Extra Deduction",
    },
    {
      name: "Form 16",
    },
    {
      name: "Salary Cycle",
      tag: "config",
    },
    {
      name: "Salary Planner",
    },
    {
      name: "Loans",
    },
    {
      name: "IT declaration & submission",
    },
    {
      name: "Payslip Upload",
    },
    {
      name: "Company Bank Detail",
      tag: "config",
    },
    {
      name: "Misc",
      tag: "config",
    },
    {
      name: "Run Payroll",
    },
    {
      name: "Salary Structure",
    },
    {
      name: "Extra Payment (Employee view)",
    },
    {
      name: "Payroll Exceptions",
    },
    {
      name: "Salary Advances",
    },
    {
      name: "Loan",
    },
    {
      name: "Payroll Signatory",
      tag: "config",
    },
    {
      name: "FNF Settlement Policy",
    },
    {
      name: "Overtime Payment",
    },
    {
      name: "Expense Cycle",
      tag: "config",
      desc: "Define your company's monthly expense cycle",
    },
    {
      name: "Salary advance",
    },
    {
      name: "Variable Payments",
    },
    {
      name: "Expense Type",
      tag: "config",
      desc: "Most frequently incurred expense types available in your HRMS",
    },
    {
      name: "Component",
      tag: "config",
    },
    {
      name: "Currency Conversion",
      tag: "config",
    },
    {
      name: "FNF Policy",
      tag: "config",
    },
    {
      name: "Income tax",
    },
    {
      name: "Salary Structure",
      tag: "config",
    },
    {
      name: "Expense Request",
      desc: "Lets You apply  a request for incurred expenses",
    },
    {
      name: "Payroll Method",
      tag: "config",
    },
    {
      name: "Extra Payments (Bulk actions)",
    },
  ],
  Resolve: [
    { name: "Company Policy", tag: "config" },
    { name: "My & Shared Checklist" },
    { name: "HRMS Policy" },
    {
      name: "Checklist",
      tag: "config",
    },
    {
      name: "Policy Center",
    },
  ],
  Organize: [
    {
      name: "My Drive",
      desc: "Lets employees save, share and view shared files and organise their data on sumHR cloud",
      tag: "",
    },
    {
      name: "Page Layout",
      desc: "Configure page layout settings",
      tag: "config",
    },
    {
      name: "Post Office",
      desc: "Manage and track company postal communications",
      tag: "",
    },
    {
      name: "Company Drive",
      desc: "Lets the company organise its files and share it with employees.",
      tag: "",
    },
    {
      name: "Letter Box",
      desc: "Manage and store company letters and documents",
      tag: "",
    },
    {
      name: "Share Files & Folders",
      desc: "Lets employees share files in their own 'My Drive' section with other members of the company",
      tag: "",
    },
    {
      name: "Upload Files",
      desc: "Lets employees upload files in their own 'My Drive' section",
      tag: "",
    },
    {
      name: "Create Folders",
      desc: "Lets employees organise their own 'My Drive' section by creating folders",
      tag: "",
    },
    {
      name: "Authorized Signatory",
      desc: "Configure authorized signatories for company documents",
      tag: "config",
    },
    {
      name: "Template",
      tag: "config",
    },
  ],
  Asset: [
    { name: "Asset Category", tag: "config" },
    {
      name: "Asset Assignment",
    },
  ],
};

const productNames = Object.keys(permissionData);

const audienceOptions = [
  { value: "employee", label: "Employee" },
  { value: "manager", label: "Manager" },
];

const accessLevelOptions = [
  {
    value: "full",
    label: "Full Access",
    description: "Allows complete feature usage and configuration access.",
  },
  {
    value: "view",
    label: "View Access",
    description: "Allows visibility without edit or configuration actions.",
  },
  {
    value: "deny",
    label: "Deny Access",
    description: "Removes access to this feature for the selected audience.",
  },
];

const buttonBaseClassName =
  "inline-flex items-center justify-center rounded-lg border shadow-none outline-none transition-all duration-200 focus:outline-none focus:ring-0 active:scale-[0.99]";

const primaryButtonClassName =
  `${buttonBaseClassName} h-[40px] border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white hover:-translate-y-[1px] hover:bg-[#0467CA] hover:shadow-none`;

const secondaryButtonClassName =
  `${buttonBaseClassName} h-[40px] border-[#D0D5DD] bg-white px-5 text-sm font-medium text-[#344054] hover:-translate-y-[1px] hover:bg-[#F9FAFB] hover:shadow-none`;

const iconButtonClassName =
  `${buttonBaseClassName} h-9 w-9 border-[#D0D5DD] bg-white text-[#667085] hover:-translate-y-[1px] hover:bg-[#F9FAFB] hover:text-[#101828] hover:shadow-none`;

const dropdownTriggerClassName =
  "flex h-[40px] w-full items-center justify-between rounded-lg border border-[#DEE2E6] bg-white px-3 text-left text-sm font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 hover:border-[#C7CED8] focus:outline-none focus:ring-0";

const searchFieldClassName =
  "flex h-[40px] w-full items-center gap-2 rounded-lg border border-[#DEE2E6] bg-white px-3 text-sm text-[#667085] shadow-none transition-colors duration-200 hover:border-[#C7CED8] focus-within:border-[#98B9F8] focus-within:ring-0";

const summaryCardClassName =
  "rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]";

const panelClassName =
  "min-w-0 overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_12px_32px_rgba(15,23,42,0.06)]";

const statusLabelMap = {
  full: "Full",
  view: "View",
  deny: "Deny",
};

const statusBadgeClassMap = {
  full: "border border-[#ABEFC6] bg-[#ECFDF3] text-[#067647]",
  view: "border border-[#B2DDFF] bg-[#EFF8FF] text-[#175CD3]",
  deny: "border border-[#FECDD6] bg-[#FFF1F3] text-[#C01048]",
};

const buildDefaultPermissions = () =>
  Object.fromEntries(
    Object.entries(permissionData).map(([product, features]) => [
      product,
      Object.fromEntries(features.map((feature) => [feature.name, "deny"])),
    ])
  );

const DivDropdown = ({
  value,
  options,
  onSelect,
  placeholder = "Choose",
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({ top: 0, left: 0, width: 0 });
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const clickedTrigger = dropdownRef.current?.contains(event.target);
      const clickedMenu = menuRef.current?.contains(event.target);

      if (!clickedTrigger && !clickedMenu) {
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

      const estimatedMenuHeight = Math.min(options.length * 44 + 16, 240);
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const openUpward =
        spaceBelow < estimatedMenuHeight && spaceAbove > estimatedMenuHeight;

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
  }, [isOpen, options.length]);

  return (
    <div ref={dropdownRef} className={className}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${dropdownTriggerClassName} ${
          isOpen ? "border-[#98B9F8]" : ""
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
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[99999] max-h-60 overflow-auto rounded-lg border border-[#DEE2E6] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)]"
            style={{
              top: `${menuStyle.top}px`,
              left: `${menuStyle.left}px`,
              width: `${menuStyle.width}px`,
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-4 py-2.5 text-left text-sm shadow-none outline-none transition-colors duration-200 hover:translate-y-0 focus:outline-none focus:ring-0 ${
                  value === option.value
                    ? "bg-[#F5F9FF] font-medium text-[#111827]"
                    : "text-[#334155] hover:bg-[#F5F9FF] active:bg-[#E7F0FF]"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

const AccessLevelCard = ({ option, checked, onSelect }) => {
  return (
    <label
      className={`flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition-colors duration-200 ${
        checked
          ? "border-[#A8CAFF] bg-[#F5F9FF]"
          : "border-[#E5E7EB] bg-white hover:border-[#D4DCE6]"
      }`}
    >
      <input
        type="radio"
        name="access"
        checked={checked}
        onChange={onSelect}
        className="mt-0.5 h-4 w-4 accent-[#0575E6]"
      />

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-medium text-[#101828]">{option.label}</p>
          {checked ? (
            <span className="inline-flex rounded-full bg-[#E7F0FF] px-2 py-0.5 text-[11px] font-medium text-[#175CD3]">
              Selected
            </span>
          ) : null}
        </div>
        <p className="mt-1 text-sm leading-6 text-[#667085]">
          {option.description}
        </p>
      </div>
    </label>
  );
};

export default function DefaultPermission() {
  const [selectedProduct, setSelectedProduct] = useState(productNames[0]);
  const [selectedFeature, setSelectedFeature] = useState(
    permissionData[productNames[0]]?.[0]?.name || null
  );
  const [selectedAudience, setSelectedAudience] = useState(
    audienceOptions[0].value
  );
  const [search, setSearch] = useState("");
  const [permissions, setPermissions] = useState(buildDefaultPermissions);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const selectedProductFeatures = permissionData[selectedProduct] || [];

  const filteredFeatures = useMemo(
    () =>
      selectedProductFeatures.filter((feature) =>
        feature.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, selectedProductFeatures]
  );

  useEffect(() => {
    if (!filteredFeatures.length) {
      setSelectedFeature(null);
      return;
    }

    const hasSelectedFeature = filteredFeatures.some(
      (feature) => feature.name === selectedFeature
    );

    if (!hasSelectedFeature) {
      setSelectedFeature(filteredFeatures[0].name);
    }
  }, [filteredFeatures, selectedFeature]);

  const productStats = useMemo(
    () =>
      productNames.map((product) => {
        const productPermissions = permissions[product] || {};
        const activePermissions = Object.values(productPermissions).filter(
          (value) => value !== "deny"
        ).length;

        return {
          name: product,
          total: permissionData[product]?.length || 0,
          activePermissions,
        };
      }),
    [permissions]
  );

  const selectedAudienceLabel =
    audienceOptions.find((option) => option.value === selectedAudience)?.label ||
    "Employee";
  const grantedAccessCount = Object.values(permissions[selectedProduct] || {}).filter(
    (value) => value !== "deny"
  ).length;
  const fullAccessCount = Object.values(permissions[selectedProduct] || {}).filter(
    (value) => value === "full"
  ).length;
  const viewAccessCount = Object.values(permissions[selectedProduct] || {}).filter(
    (value) => value === "view"
  ).length;
  const currentAccessLevel =
    permissions[selectedProduct]?.[selectedFeature] || "deny";
  const activeFeature = selectedProductFeatures.find(
    (feature) => feature.name === selectedFeature
  );
  const selectedFeatureIndex = selectedProductFeatures.findIndex(
    (feature) => feature.name === selectedFeature
  );

  const handleAccessChange = (level) => {
    if (!selectedFeature) {
      return;
    }

    setPermissions((prev) => ({
      ...prev,
      [selectedProduct]: {
        ...prev[selectedProduct],
        [selectedFeature]: level,
      },
    }));
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] p-[15px] card-animate">
      <div className="mx-auto w-full max-w-[1700px]">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.12em] text-[#0575E6]">
              Employee Data Configuration
            </p>
            <h1 className="mt-2 text-[22px] font-bold text-[#212529]">
              Default Permission
            </h1>
            <p className="mt-1 max-w-[780px] text-[13px] leading-6 text-[#667085]">
              Set default access for each module and feature using the same
              control sizing, corner radius, and panel rhythm used across the
              updated admin screens.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <DivDropdown
              value={selectedAudience}
              options={audienceOptions}
              onSelect={setSelectedAudience}
              placeholder="Choose audience"
              className="w-full sm:min-w-[220px]"
            />

            <button
              type="button"
              className={`${primaryButtonClassName} min-w-[152px]`}
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className={summaryCardClassName}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Products
            </p>
            <p className="mt-2 text-[24px] font-semibold text-[#212529]">
              {productNames.length}
            </p>
            <p className="mt-1 text-[13px] text-[#667085]">
              Configure access defaults for the selected audience.
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Visible Features
            </p>
            <p className="mt-2 text-[24px] font-semibold text-[#212529]">
              {filteredFeatures.length}/{selectedProductFeatures.length}
            </p>
            <p className="mt-1 text-[13px] text-[#667085]">
              Inside {selectedProduct} for {selectedAudienceLabel}.
            </p>
          </div>

          <div className={summaryCardClassName}>
            <p className="text-[12px] font-medium uppercase tracking-[0.08em] text-[#0575E6]">
              Granted Access
            </p>
            <p className="mt-2 text-[24px] font-semibold text-[#212529]">
              {grantedAccessCount}
            </p>
            <p className="mt-1 text-[13px] text-[#667085]">
              {fullAccessCount} full access and {viewAccessCount} view-only
              entries.
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[260px_minmax(0,1.2fr)_minmax(320px,0.9fr)]">
          <section className={panelClassName}>
            <div className="border-b border-[#EEF2F6] px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-semibold text-[#212529]">
                    Product
                  </h2>
                  <p className="mt-1 text-[13px] text-[#667085]">
                    Choose the module you want to configure.
                  </p>
                </div>
                <span className="inline-flex rounded-full bg-[#F5F9FF] px-3 py-1 text-[12px] font-medium text-[#175CD3]">
                  {productNames.length}
                </span>
              </div>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-4">
              <div className="space-y-3">
                {productStats.map((product) => (
                  <button
                    key={product.name}
                    type="button"
                    onClick={() => {
                      setSelectedProduct(product.name);
                      setSearch("");
                    }}
                    className={`w-full rounded-lg border px-4 py-4 text-left shadow-none transition-all duration-200 hover:translate-y-0 ${
                      selectedProduct === product.name
                        ? "border-[#C4DBFF] bg-[#F5F9FF]"
                        : "border-[#EEF2F6] bg-white hover:border-[#D9E4F2] hover:bg-[#FCFCFD]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-[#101828]">
                          {product.name}
                        </p>
                        <p className="mt-1 text-[13px] text-[#667085]">
                          {product.total} features
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="inline-flex rounded-full bg-white px-2.5 py-1 text-[11px] font-medium text-[#344054]">
                          {product.activePermissions}/{product.total}
                        </span>
                        <FiChevronRight className="h-4 w-4 text-[#98A2B3]" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className={panelClassName}>
            <div className="border-b border-[#EEF2F6] px-5 py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-[16px] font-semibold text-[#212529]">
                      Page / Features
                    </h2>
                    <span className="inline-flex rounded-full bg-[#F5F9FF] px-3 py-1 text-[12px] font-medium text-[#175CD3]">
                      {filteredFeatures.length}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-[#667085]">
                    Search and select a feature inside {selectedProduct}.
                  </p>
                </div>

                <label className={`${searchFieldClassName} lg:max-w-[260px]`}>
                  <FiSearch className="h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search features"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    className="w-full border-none bg-transparent text-[14px] text-[#212529] outline-none placeholder:text-[#98A2B3]"
                  />
                </label>
              </div>
            </div>

            <div className="max-h-[68vh] overflow-y-auto p-4">
              {filteredFeatures.length === 0 ? (
                <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-5 py-12 text-center">
                  <p className="text-sm font-medium text-[#101828]">
                    No features found
                  </p>
                  <p className="mt-2 text-sm text-[#667085]">
                    Try a different search term for {selectedProduct}.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredFeatures.map((feature) => {
                    const featurePermission =
                      permissions[selectedProduct]?.[feature.name] || "deny";

                    return (
                      <button
                        key={feature.name}
                        type="button"
                        onClick={() => setSelectedFeature(feature.name)}
                        className={`w-full rounded-lg border px-4 py-4 text-left shadow-none transition-all duration-200 hover:translate-y-0 ${
                          selectedFeature === feature.name
                            ? "border-[#C4DBFF] bg-[#F5F9FF]"
                            : "border-[#EEF2F6] bg-white hover:border-[#D9E4F2] hover:bg-[#FCFCFD]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              {feature.tag ? (
                                <span className="inline-flex rounded-full bg-[#101828] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.04em] text-white">
                                  {feature.tag}
                                </span>
                              ) : null}

                              <span className="text-sm font-semibold text-[#101828]">
                                {feature.name}
                              </span>
                            </div>

                            <p className="mt-2 text-[13px] leading-6 text-[#667085]">
                              {feature.desc ||
                                "Default permission can be configured for this feature."}
                            </p>
                          </div>

                          <div className="flex flex-col items-end gap-2">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusBadgeClassMap[featurePermission]}`}
                            >
                              {statusLabelMap[featurePermission]}
                            </span>
                            <FiChevronRight className="h-4 w-4 text-[#98A2B3]" />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <section className={panelClassName}>
            <div className="border-b border-[#EEF2F6] px-5 py-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-[16px] font-semibold text-[#212529]">
                    Access Level
                  </h2>
                  <p className="mt-1 text-[13px] text-[#667085]">
                    Apply a default level for the selected feature.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setIsSidebarOpen(true)}
                  className={secondaryButtonClassName}
                >
                  Change Log
                </button>
              </div>
            </div>

            {selectedFeature ? (
              <div className="space-y-5 p-5">
                <div className="rounded-xl border border-[#D9E4F2] bg-[#F8FBFF] p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        {activeFeature?.tag ? (
                          <span className="inline-flex rounded-full bg-[#101828] px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.04em] text-white">
                            {activeFeature.tag}
                          </span>
                        ) : null}
                        <p className="text-[16px] font-semibold text-[#101828]">
                          {selectedFeature}
                        </p>
                      </div>

                      <p className="mt-2 text-[13px] leading-6 text-[#667085]">
                        {activeFeature?.desc ||
                          "Choose the default access level for this feature."}
                      </p>
                    </div>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${statusBadgeClassMap[currentAccessLevel]}`}
                    >
                      {statusLabelMap[currentAccessLevel]}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-lg border border-white/70 bg-white/80 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
                        Applies To
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#101828]">
                        {selectedAudienceLabel}
                      </p>
                    </div>

                    <div className="rounded-lg border border-white/70 bg-white/80 px-3 py-3">
                      <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#98A2B3]">
                        Feature Position
                      </p>
                      <p className="mt-1 text-sm font-medium text-[#101828]">
                        {selectedFeatureIndex + 1} of {selectedProductFeatures.length}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {accessLevelOptions.map((option) => (
                    <AccessLevelCard
                      key={option.value}
                      option={option}
                      checked={currentAccessLevel === option.value}
                      onSelect={() => handleAccessChange(option.value)}
                    />
                  ))}
                </div>

                <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] p-4">
                  <p className="text-[13px] leading-6 text-[#667085]">
                    These defaults are used when assigning access to new{" "}
                    {selectedAudienceLabel.toLowerCase()} entries for this
                    module.
                  </p>

                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      className={`${primaryButtonClassName} min-w-[152px]`}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-5">
                <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-5 py-12 text-center">
                  <p className="text-sm font-medium text-[#101828]">
                    No feature selected
                  </p>
                  <p className="mt-2 text-sm text-[#667085]">
                    Select a feature from the middle panel to review and update
                    its default access level.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {isSidebarOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-[#101828]/25 shadow-none hover:translate-y-0 hover:shadow-none"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close change log overlay"
          />

          <aside className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-[#E5E7EB] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.16)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#EEF2F6] px-6 py-5">
              <div>
                <h3 className="text-[16px] font-semibold text-[#212529]">
                  Feature Change Logs
                </h3>
                <p className="mt-1 text-[13px] text-[#667085]">
                  Review recent permission updates for this screen.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsSidebarOpen(false)}
                className={iconButtonClassName}
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 px-6 py-10">
              <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-[#FCFCFD] px-5 py-10 text-center">
                <p className="text-sm font-medium text-[#101828]">
                  No logs available
                </p>
                <p className="mt-2 text-sm text-[#667085]">
                  Change history will appear here once permission updates are
                  tracked for this module.
                </p>
              </div>
            </div>
          </aside>
        </>
      ) : null}
    </main>
  );
}
