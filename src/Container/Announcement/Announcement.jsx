import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SUMMARY_CARDS = [
  {
    title: "Active Announcements",
    value: "12",
    note: "+2 published today",
    noteClassName: "text-[#10b981]",
  },
  {
    title: "Scheduled",
    value: "4",
    note: "Next publish: 27 Mar, 9:00 AM",
    noteClassName: "text-[#f59e0b]",
  },
  {
    title: "Acknowledgement Pending",
    value: "38",
    note: "5 urgent notices pending",
    noteClassName: "text-[#ef4444]",
  },
  {
    title: "Expired This Month",
    value: "9",
    note: "Archived automatically",
    noteClassName: "text-[#64748b]",
  },
];

const ANNOUNCEMENTS = [
  {
    accentClassName: "border-[#ef4444]",
    title: "HRMS Maintenance Notice",
    description:
      "The HRMS portal will be unavailable tonight from 11:00 PM to 12:30 AM due to scheduled maintenance. Employees are advised to complete attendance regularization and pending approvals before downtime.",
    meta: [
      { label: "Published", value: "25 Mar 2026, 10:30 AM" },
      { label: "Expires", value: "26 Mar 2026, 1:00 AM" },
      { label: "Posted by", value: "HR Admin" },
      { label: "Acknowledgement", value: "Required" },
    ],
    badges: [
      { label: "Urgent", className: "bg-[#fee2e2] text-[#b91c1c]" },
      { label: "IT / System", className: "bg-[#e0f2fe] text-[#0369a1]" },
      { label: "Pinned", className: "bg-[#fef3c7] text-[#92400e]" },
      { label: "All Employees", className: "bg-[#ede9fe] text-[#6d28d9]" },
    ],
    actions: [
      { label: "View Details", className: "bg-[#1677f2] text-white" },
      { label: "Edit", className: "bg-[#eef2f7] text-[#334155]" },
      { label: "Archive", className: "bg-[#f8fafc] text-[#475569]" },
    ],
  },
  {
    accentClassName: "border-[#f59e0b]",
    title: "Updated Document Submission Deadline",
    description:
      "All employees must upload updated identity and address proof documents on or before 31 March 2026. Incomplete records may affect payroll and compliance processing.",
    meta: [
      { label: "Published", value: "24 Mar 2026, 4:15 PM" },
      { label: "Expires", value: "31 Mar 2026, 11:59 PM" },
      { label: "Posted by", value: "HR Manager" },
      { label: "Acknowledgement", value: "Optional" },
    ],
    badges: [
      { label: "Important", className: "bg-[#fef3c7] text-[#92400e]" },
      { label: "HR Notice", className: "bg-[#dcfce7] text-[#166534]" },
      { label: "All Employees", className: "bg-[#ede9fe] text-[#6d28d9]" },
    ],
    actions: [
      { label: "View Details", className: "bg-[#1677f2] text-white" },
      { label: "Edit", className: "bg-[#eef2f7] text-[#334155]" },
      { label: "Archive", className: "bg-[#f8fafc] text-[#475569]" },
    ],
  },
  {
    accentClassName: "border-[#10b981]",
    title: "Monthly Town Hall Meeting",
    description:
      "The monthly town hall will take place this Friday at 4:00 PM in the main conference hall. Department heads are requested to join 15 minutes early for the briefing session.",
    meta: [
      { label: "Published", value: "25 Mar 2026, 9:00 AM" },
      { label: "Expires", value: "28 Mar 2026, 5:30 PM" },
      { label: "Posted by", value: "Admin" },
      { label: "Acknowledgement", value: "Not Required" },
    ],
    badges: [
      { label: "Normal", className: "bg-[#dcfce7] text-[#166534]" },
      { label: "Event", className: "bg-[#e0f2fe] text-[#0369a1]" },
      { label: "Mohali Branch", className: "bg-[#ede9fe] text-[#6d28d9]" },
    ],
    actions: [
      { label: "View Details", className: "bg-[#1677f2] text-white" },
      { label: "Edit", className: "bg-[#eef2f7] text-[#334155]" },
      { label: "Archive", className: "bg-[#f8fafc] text-[#475569]" },
    ],
  },
  {
    accentClassName: "border-[#8b5cf6]",
    title: "Festival Holiday Notice",
    description:
      "Office will remain closed on 29 March 2026 due to a public holiday. Employees on critical support shifts will receive separate instructions from their reporting managers.",
    meta: [
      { label: "Publish On", value: "27 Mar 2026, 9:00 AM" },
      { label: "Expires", value: "29 Mar 2026, 11:59 PM" },
      { label: "Posted by", value: "HR Admin" },
      { label: "Acknowledgement", value: "Optional" },
    ],
    badges: [
      { label: "Scheduled", className: "bg-[#ede9fe] text-[#6d28d9]" },
      { label: "Holiday", className: "bg-[#fce7f3] text-[#be185d]" },
      { label: "All Employees", className: "bg-[#ede9fe] text-[#6d28d9]" },
    ],
    actions: [
      { label: "Preview", className: "bg-[#8b5cf6] text-white" },
      { label: "Edit", className: "bg-[#eef2f7] text-[#334155]" },
      { label: "Cancel", className: "bg-[#f8fafc] text-[#475569]" },
    ],
  },
];

const FILTER_OPTIONS = [
  {
    key: "category",
    label: "Category",
    options: ["General", "HR Notice", "Policy Update", "Holiday", "Event", "IT / System", "Payroll"],
  },
  {
    key: "priority",
    label: "Priority",
    options: ["Normal", "Important", "Urgent"],
  },
  {
    key: "audience",
    label: "Audience",
    options: ["All Employees", "Managers", "HR Team", "Specific Department", "Specific Branch"],
  },
];

const panelClass = "rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]";
const metricCardClass =
  "rounded-[20px] border border-[#E5E7EB] bg-white p-5 sm:p-6 shadow-[0_6px_16px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_24px_rgba(15,23,42,0.08)]";
const primaryButtonClass =
  "inline-flex h-[40px] items-center justify-center rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none transition-all duration-200 focus:outline-none focus:ring-0 hover:bg-[#0467CA] active:scale-[0.99]";
const secondaryButtonClass =
  "inline-flex h-[40px] items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-5 text-sm font-medium text-[#344054] shadow-none outline-none transition-all duration-200 focus:outline-none focus:ring-0 hover:bg-gray-50 active:scale-[0.99]";
const mutedActionButtonClass =
  "inline-flex h-[36px] items-center justify-center rounded-lg border border-[#D0D5DD] bg-white px-4 text-[13px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#F9FAFB]";
const filledActionButtonClass = "inline-flex h-[36px] items-center justify-center rounded-lg bg-[#0575E6] px-4 text-[13px] font-medium text-white";

function DivDropdown({ label, value, options, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const selectedLabel = value || label;
  const menuItems = [label, ...options.filter((option) => option !== value)];

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-[40px] w-full items-center justify-between rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0"
      >
        <span>{selectedLabel}</span>
        <FaAngleDown className={`text-[12px] transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="absolute left-0 z-20 mt-2 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-none">
          <div className="w-full bg-blue-50 px-4 py-2 text-left text-sm font-medium text-[#111827]">{selectedLabel}</div>

          {menuItems.map((item) => (
            <button
              key={`${label}-${item}`}
              type="button"
              onClick={() => {
                onSelect(item === label ? "" : item);
                setIsOpen(false);
              }}
              className="w-full border-none px-4 py-2 text-left text-sm text-[#111827] shadow-none outline-none transition-colors focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100"
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Announcement() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    category: "",
    priority: "",
    audience: "",
  });

  return (
    <div className="bg-[#F8F9FA] p-[15px] card-animate">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5">
        <div className={`${panelClass} flex flex-wrap items-start justify-between gap-4`}>
          <div>
            <h1 className="text-[20px] font-bold text-[#212529]">Announcements</h1>
            <p className="mt-1 text-[12px] text-[#667085]">
              Manage company-wide notices, HR updates, policy changes, events, and system alerts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button className={secondaryButtonClass}>Export</button>
            <button className={primaryButtonClass} onClick={() => navigate("/dashboard/create-announcement")}>
              + Create Announcement
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SUMMARY_CARDS.map((card) => (
            <div key={card.title} className={metricCardClass}>
              <div>
                <div className="text-[14px] font-medium text-[#667085]">{card.title}</div>
                <div className="mt-3 text-[28px] font-bold text-[#111827]">{card.value}</div>
                <div className={`mt-4 text-[13px] font-medium ${card.noteClassName}`}>{card.note}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {FILTER_OPTIONS.map((filter) => (
            <DivDropdown
              key={filter.key}
              label={filter.label}
              value={filters[filter.key]}
              options={filter.options}
              onSelect={(nextValue) =>
                setFilters((prev) => ({
                  ...prev,
                  [filter.key]: nextValue,
                }))
              }
            />
          ))}
        </div>

        <div className="flex flex-col gap-4">
          {ANNOUNCEMENTS.map((announcement) => (
            <div
              key={announcement.title}
              className={`rounded-xl border border-[#E5E7EB] border-l-[6px] bg-white p-5 shadow-[0_6px_16px_rgba(15,23,42,0.04)] ${announcement.accentClassName}`}
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-[280px] flex-1">
                  <div className="mb-[10px] flex flex-wrap gap-2">
                    {announcement.badges.map((badge) => (
                      <span
                        key={`${announcement.title}-${badge.label}`}
                        className={`inline-flex h-7 items-center rounded-md border border-transparent px-3 text-xs font-medium ${badge.className}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>

                  <h3 className="m-0 text-[18px] font-semibold text-[#212529]">{announcement.title}</h3>

                  <p className="mb-[14px] mt-[10px] text-[14px] leading-[1.7] text-[#52525B]">{announcement.description}</p>

                  <div className="flex flex-wrap gap-x-[18px] gap-y-2 text-[13px] text-[#667085]">
                    {announcement.meta.map((item) => (
                      <div key={`${announcement.title}-${item.label}`}>
                        <strong className="text-[#344054]">{item.label}:</strong> {item.value}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex min-w-[150px] flex-col gap-[10px]">
                  {announcement.actions.map((action, index) => (
                    <button
                      key={`${announcement.title}-${action.label}`}
                      className={index === 0 ? filledActionButtonClass : mutedActionButtonClass}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}