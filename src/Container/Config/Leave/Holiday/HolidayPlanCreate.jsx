import { useEffect, useMemo, useState } from "react";
import createAxios from "../../../../utils/axios.config";
import { useNavigate, useParams } from "react-router-dom";

const STEPS = ["Describe", "Preferences", "Plan", "Approval", "Preview"];

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
function Toast({ message, type, onClose }) {
  if (!message) return null;
  return (
    <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg text-sm font-medium transition-all ${type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}>
      <span>{type === "success" ? "✔" : "✖"}</span>
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-white opacity-70 hover:opacity-100 text-base">✕</button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEPPER
───────────────────────────────────────────── */
function Stepper({ currentStep }) {
  return (
    <div className="flex items-start justify-evenly w-full mb-8 px-4">
      {STEPS.map((label, idx) => {
        const stepNum = idx + 1;
        const isActive = stepNum === currentStep;
        const isDone = stepNum < currentStep;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all ${isActive ? "border-blue-500 text-blue-500 bg-white"
                  : isDone ? "border-blue-500 bg-blue-500 text-white"
                    : "border-gray-300 text-gray-400 bg-white"
                }`}>
                {isDone ? "✓" : stepNum}
              </div>
              <span className={`text-xs mt-1 whitespace-nowrap ${isActive ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {idx < STEPS.length - 1 && (
              <div className={`h-px w-16 md:w-24 lg:w-32 mx-2 mb-4 ${isDone ? "bg-blue-500" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
   YES / NO BOX
───────────────────────────────────────────── */
function YesNoBox({ label, value, onChange, name }) {
  return (
    <div className="space-y-2">
      {label && <p className="text-sm font-medium text-blue-600">{label}</p>}
      <label className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${value === "yes" ? "bg-blue-50 border-blue-500" : "border-gray-200 hover:border-gray-400"}`}>
        <div className="flex items-center">
          <input type="radio" name={name} value="yes" checked={value === "yes"} onChange={(e) => onChange(e.target.value)} className="mr-2 accent-blue-500" />
          <span className="text-sm">Yes</span>
        </div>
        {value === "yes" && <span className="text-green-500 text-lg">✔</span>}
      </label>
      <label className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${value === "no" ? "bg-gray-50 border-blue-500" : "border-gray-200 hover:border-gray-400"}`}>
        <div className="flex items-center">
          <input type="radio" name={name} value="no" checked={value === "no"} onChange={(e) => onChange(e.target.value)} className="mr-2 accent-blue-500" />
          <span className="text-sm">No</span>
        </div>
        {value === "no" && <span className="text-green-500 text-lg">✔</span>}
      </label>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 1 — Describe
───────────────────────────────────────────── */
function StepDescribe({ form, setForm, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">Holiday Plan Name</label>
        <input
          type="text"
          placeholder="Enter plan name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 ${errors.name ? "border-red-400" : "border-gray-200"}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">Name cannot be empty</p>}
      </div>
      <div>
        <label className="text-sm font-medium text-blue-600">Add a description to help your colleagues</label>
        <textarea
          placeholder="Enter description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 2 — Preferences
───────────────────────────────────────────── */
function StepPreferences({ form, setForm }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-blue-600">For which year are you creating these holiday preferences?</label>
        <select
          value={form.year}
          onChange={(e) => setForm({ ...form, year: e.target.value })}
          className="mt-1 w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
        >
          <option value="">Select year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
      <YesNoBox label="Employees get mandatory holidays" value={form.mandatoryHolidays} onChange={(v) => setForm({ ...form, mandatoryHolidays: v })} name="mandatory" />
      <YesNoBox label="Employees get optional holidays" value={form.optionalHolidays} onChange={(v) => setForm({ ...form, optionalHolidays: v })} name="optional" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   MINI CALENDAR
───────────────────────────────────────────── */
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function MiniCalendar({ holidays, selectedDate, onSelectDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev = new Date(viewYear, viewMonth, 0).getDate();

  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) cells.push({ day: daysInPrev - i, current: false });
  for (let d = 1; d <= daysInMonth; d++)  cells.push({ day: d, current: true });
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++)    cells.push({ day: d, current: false });

  const dateKey = (d) => `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
  const getHoliday = (d) => (holidays || []).find(h => h.date === dateKey(d)) || null;

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Month nav */}
      <div className="bg-blue-600 text-white flex items-center justify-between px-4 py-3">
        <button onClick={prevMonth} className="hover:opacity-80 text-xl font-bold px-1 leading-none">‹</button>
        <span className="font-semibold text-base">{MONTH_NAMES[viewMonth]} {viewYear}</span>
        <button onClick={nextMonth} className="hover:opacity-80 text-xl font-bold px-1 leading-none">›</button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-100">
        {WEEK_DAYS.map(d => (
          <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">{d}</div>
        ))}
      </div>

      {/* Date cells */}
      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          const holiday = cell.current ? getHoliday(cell.day) : null;
          const key = cell.current ? dateKey(cell.day) : null;
          const isSelected = key === selectedDate;
          const isToday = cell.current && cell.day === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear();

          return (
            <div
              key={idx}
              onClick={() => cell.current && onSelectDate(dateKey(cell.day))}
              className={`relative h-12 flex flex-col items-center justify-start pt-1 border-b border-r border-gray-100 text-xs transition
                ${!cell.current ? "text-gray-300 bg-gray-50 cursor-default" : "cursor-pointer"}
                ${isSelected && !holiday ? "bg-blue-100" : ""}
                ${holiday ? (holiday.type === "mandatory" ? "bg-green-100" : "bg-orange-50") : (!isSelected ? "hover:bg-blue-50" : "")}
              `}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-full font-medium
                ${isSelected ? "bg-blue-500 text-white" : isToday ? "bg-blue-200 text-blue-700" : "text-gray-700"}
              `}>
                {cell.day}
              </span>
              {holiday && (
                <span className={`w-2 h-2 rounded-full mt-0.5 ${holiday.type === "mandatory" ? "bg-blue-500" : "bg-orange-400"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 3 — Plan
───────────────────────────────────────────── */
function StepPlan({ form, setForm }) {
  const [holidayName, setHolidayName] = useState("");
  const [holidayType, setHolidayType] = useState("mandatory");
  const [selectedDate, setSelectedDate] = useState(null);
  const [nameError, setNameError] = useState(false);

  const holidays = form.holidays || [];

  /* Format "YYYY-MM-DD" → "DD-MM-YYYY" for display */
  const formatDate = (s) => {
    if (!s) return "";
    const [y, m, d] = s.split("-");
    return `${d}-${m}-${y}`;
  };

  const handleDateSelect = (dateStr) => {
    setSelectedDate(dateStr);
    setNameError(false);
  };

  const handleAddHoliday = () => {
    if (!holidayName.trim()) { setNameError(true); return; }
    if (!selectedDate) return;
    setForm({
      ...form,
      holidays: [...holidays, { name: holidayName.trim(), date: selectedDate, type: holidayType }],
    });
    setHolidayName("");
    setSelectedDate(null);
    setNameError(false);
  };

  const handleDelete = (idx) => {
    const updated = [...holidays];
    updated.splice(idx, 1);
    setForm({ ...form, holidays: updated });
  };

  return (
    <div className="flex gap-10">

      {/* ── Left: Calendar ── */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-600 mb-3">Holiday Plan</p>
        <MiniCalendar
          holidays={holidays}
          selectedDate={selectedDate}
          onSelectDate={handleDateSelect}
        />
      </div>

      {/* ── Right: Form + List ── */}
      <div className="w-80 flex-shrink-0 space-y-5">

        {/* Holiday Name input */}
        <div>
          <label className="text-sm font-medium text-blue-600">Holiday Name</label>
          <input
            type="text"
            placeholder="Holiday Name"
            value={holidayName}
            onChange={e => { setHolidayName(e.target.value); setNameError(false); }}
            className={`mt-1 w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400 ${nameError ? "border-red-400" : "border-gray-200"}`}
          />
          {nameError && <p className="text-red-500 text-xs mt-1">Please enter a holiday name</p>}

          {/* Selected date pill */}
          {selectedDate ? (
            <div className="mt-2 inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-3 py-1">
              <span className="text-xs text-blue-600 font-medium">📅 {formatDate(selectedDate)}</span>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-blue-400 hover:text-blue-600 text-xs leading-none"
              >✕</button>
            </div>
          ) : (
            <p className="text-xs text-gray-400 mt-2">Click a date on the calendar to select</p>
          )}
        </div>

        {/* Holiday Preference toggle — knob LEFT = Mandatory, RIGHT = Optional */}
        <div>
          <label className="text-sm font-medium text-blue-600 block mb-2">Holiday Preference</label>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${holidayType === "mandatory" ? "text-blue-600 font-medium" : "text-gray-400"}`}>
              Mandatory
            </span>
            <button
              onClick={() => setHolidayType(t => t === "mandatory" ? "optional" : "mandatory")}
              style={{
                position: "relative", width: "44px", height: "24px",
                borderRadius: "9999px", backgroundColor: "#60a5fa",
                border: "none", cursor: "pointer", flexShrink: 0,
              }}
            >
              <span style={{
                position: "absolute", top: "3px",
                left: holidayType === "optional" ? "23px" : "3px",
                width: "18px", height: "18px", borderRadius: "50%",
                backgroundColor: "white", boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                transition: "left 0.18s ease", display: "block",
              }} />
            </button>
            <span className={`text-sm ${holidayType === "optional" ? "text-blue-600 font-medium" : "text-gray-400"}`}>
              Optional
            </span>
          </div>
        </div>

        {/* SAVE button */}
        <button
          onClick={handleAddHoliday}
          disabled={!selectedDate}
          className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          SAVE
        </button>

        {/* Holidays list */}
        <div>
          <p className="text-sm font-medium text-blue-600 mb-3">Holidays in this month</p>
          {holidays.length === 0 ? (
            <p className="text-xs text-gray-400">No holidays added yet.</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {holidays.map((h, idx) => (
                <div key={idx} className="flex items-center justify-between py-3">
                  <div className="flex items-center gap-3">
                    {/* M / O badge */}
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ${h.type === "mandatory" ? "bg-blue-500" : "bg-orange-400"
                      }`}>
                      {h.type === "mandatory" ? "M" : "O"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{h.name}</p>
                      <p className="text-xs text-gray-400">{formatDate(h.date)}</p>
                    </div>
                  </div>

                  {/* Delete icon — blue trash SVG matching screenshot */}
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-blue-400 hover:text-red-500 transition p-1 rounded"
                    title="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   EMAIL TOGGLE ROW
───────────────────────────────────────────── */
function EmailRow({ checked, onChange }) {
  return (
    <div
      onClick={onChange}
      className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${checked ? "bg-blue-50 border-blue-200" : "border-gray-200 hover:border-gray-300"
        }`}
    >
      <span className="text-sm text-gray-700">Send email notification to manager</span>
      {checked && (
        <span className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✔</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REUSABLE DATE SELECTION BLOCK
───────────────────────────────────────────── */
function DateSelectionBlock({ title, dateValue, onDateChange, emailChecked, onEmailToggle, daysValue, onDaysChange, emailNewChecked, onEmailNewToggle, noteText }) {
  return (
    <div className="space-y-5">
      <p className="text-sm font-semibold text-blue-600">{title}</p>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-blue-600">Existing Employees</p>
        <p className="text-sm text-gray-600">On</p>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={dateValue}
            onChange={(e) => onDateChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
          />
          {dateValue && <button onClick={() => onDateChange("")} className="text-gray-400 hover:text-gray-600 text-sm">✕</button>}
        </div>
        <p className="text-sm text-blue-500 font-medium">If not selected then</p>
        <EmailRow checked={emailChecked} onChange={onEmailToggle} />
      </div>
      <div className="space-y-3">
        <p className="text-sm font-semibold text-blue-600">New Employees</p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Within</span>
          <input
            type="number"
            value={daysValue}
            onChange={(e) => onDaysChange(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 outline-none focus:border-blue-400"
          />
        </div>
        <p className="text-sm text-gray-700 font-medium">Days Of Joining</p>
        <p className="text-xs text-gray-500">{noteText}</p>
        <p className="text-sm text-blue-500 font-medium">If not selected then</p>
        <EmailRow checked={emailNewChecked} onChange={onEmailNewToggle} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 4 — Approval
───────────────────────────────────────────── */
function StepApproval({ form, setForm }) {
  const hasMandatory = form.mandatoryHolidays === "yes";
  const hasOptional = form.optionalHolidays === "yes";

  return (
    <div className="space-y-8 max-w-2xl">
      {hasMandatory && (
        <DateSelectionBlock
          title="By which date should the employee select his/her mandatory holidays?"
          dateValue={form.existingEmployeeDate || ""}
          onDateChange={(v) => setForm({ ...form, existingEmployeeDate: v })}
          emailChecked={!!form.sendEmailExisting}
          onEmailToggle={() => setForm({ ...form, sendEmailExisting: !form.sendEmailExisting })}
          daysValue={form.newEmployeeDays || ""}
          onDaysChange={(v) => setForm({ ...form, newEmployeeDays: v })}
          emailNewChecked={!!form.sendEmailNew}
          onEmailNewToggle={() => setForm({ ...form, sendEmailNew: !form.sendEmailNew })}
          noteText="Note: If you don't set any restriction for selection of mandatory holidays, then new employees will be able to choose their mandatory holidays upto the end of your calendar cycle."
        />
      )}
      {hasOptional && (
        <>
          <DateSelectionBlock
            title="By which date should the employee select his/her optional holidays?"
            dateValue={form.existingOptionalDate || ""}
            onDateChange={(v) => setForm({ ...form, existingOptionalDate: v })}
            emailChecked={!!form.sendEmailExistingOptional}
            onEmailToggle={() => setForm({ ...form, sendEmailExistingOptional: !form.sendEmailExistingOptional })}
            daysValue={form.newOptionalDays || ""}
            onDaysChange={(v) => setForm({ ...form, newOptionalDays: v })}
            emailNewChecked={!!form.sendEmailNewOptional}
            onEmailNewToggle={() => setForm({ ...form, sendEmailNewOptional: !form.sendEmailNewOptional })}
            noteText="Note: If you don't set any restriction for selection of optional holidays, then new employees will be able to choose their optional holidays upto the end of your calendar cycle."
          />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-blue-600">
              What are the maximum number of optional holidays from the available optional holiday list can select?
            </p>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={form.maxOptionalHolidays || ""}
                onChange={(e) => setForm({ ...form, maxOptionalHolidays: e.target.value })}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-24 outline-none focus:border-blue-400"
              />
              <span className="text-sm text-gray-700">Employees get optional holidays</span>
            </div>
          </div>
        </>
      )}
      {!hasMandatory && !hasOptional && (
        <p className="text-sm text-gray-400">
          No holiday types selected. Please go back to Preferences and enable mandatory or optional holidays.
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP 5 — Preview
───────────────────────────────────────────── */
function StepPreview({ form }) {
  const formatDate = (s) => {
    if (!s) return "—";
    const [y, m, d] = s.split("-");
    return `${d}-${m}-${y}`;
  };

  const rows = [
    { label: "Plan Name", value: form.name || "—" },
    { label: "Description", value: form.description || "—" },
    { label: "Year", value: form.year || "—" },
    { label: "Mandatory Holidays", value: form.mandatoryHolidays },
    { label: "Optional Holidays", value: form.optionalHolidays },
    { label: "Total Holidays Added", value: String((form.holidays || []).length) },
    ...(form.mandatoryHolidays === "yes" ? [
      { label: "Existing Employee Date (Mandatory)", value: formatDate(form.existingEmployeeDate) },
      { label: "Email Notification - Existing (Mandatory)", value: form.sendEmailExisting ? "yes" : "no" },
      { label: "New Employee Days (Mandatory)", value: form.newEmployeeDays || "—" },
      { label: "Email Notification - New (Mandatory)", value: form.sendEmailNew ? "yes" : "no" },
    ] : []),
    ...(form.optionalHolidays === "yes" ? [
      { label: "Existing Employee Date (Optional)", value: formatDate(form.existingOptionalDate) },
      { label: "Email Notification - Existing (Optional)", value: form.sendEmailExistingOptional ? "yes" : "no" },
      { label: "New Employee Days (Optional)", value: form.newOptionalDays || "—" },
      { label: "Email Notification - New (Optional)", value: form.sendEmailNewOptional ? "yes" : "no" },
      { label: "Max Optional Holidays", value: form.maxOptionalHolidays || "—" },
    ] : []),
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-400 mb-4">Review your holiday plan settings before saving.</p>

      {/* Holidays added */}
      {(form.holidays || []).length > 0 && (
        <div className="mb-4 border border-gray-100 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Holidays Added</p>
          </div>
          {form.holidays.map((h, i) => (
            <div key={i} className="flex items-center justify-between px-4 py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-2">
                <span className={`w-5 h-5 rounded text-white text-xs font-bold flex items-center justify-center ${h.type === "mandatory" ? "bg-blue-500" : "bg-orange-400"}`}>
                  {h.type === "mandatory" ? "M" : "O"}
                </span>
                <span className="text-sm text-gray-700">{h.name}</span>
              </div>
              <span className="text-xs text-gray-400">{h.date}</span>
            </div>
          ))}
        </div>
      )}

      {rows.map(({ label, value }) => (
        <div key={label} className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 bg-gray-50">
          <span className="text-sm text-gray-600">{label}</span>
          <span className={`text-sm font-medium capitalize ${value === "yes" ? "text-green-600" : value === "no" ? "text-red-400" : "text-gray-800"}`}>
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
export default function HolidayPlanCreate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "success" });

  const [companyOfficeId,setCompanyOfficeId] = useState([])

  const [form, setForm] = useState({
    name: "", description: "",
    year: "", mandatoryHolidays: "yes", optionalHolidays: "no",
    holidays: [],
    existingEmployeeDate: "", sendEmailExisting: true,
    newEmployeeDays: "", sendEmailNew: true,
    existingOptionalDate: "", sendEmailExistingOptional: true,
    newOptionalDays: "", sendEmailNewOptional: true,
    maxOptionalHolidays: "",
  });

  const token = localStorage.getItem("authToken");
  const companyId = localStorage.getItem("companyId") || "";
  const axiosInstance = useMemo(() => createAxios(token), [token]);

    useEffect(() => {
    try {
      const raw = localStorage.getItem("companyOfficeId");
      if (raw) {
        const parsed = JSON.parse(raw);
        // Could be array or single string — normalise to array
        const ids = Array.isArray(parsed) ? parsed : [parsed];
        setCompanyOfficeId(ids);
      }
    } catch (e) {
      console.error("Failed to parse companyOfficeId from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    const fetchHolidayPlan = async () => {
      if (!isEditMode || !id) return;

      try {
        setIsFetching(true);
        const { data } = await axiosInstance.get(`/config/getOne/holidayPlan/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const holidayPlan = data?.data || data?.holidayPlan || data || {};

        setForm((prev) => ({
          ...prev,
          name: holidayPlan?.name || holidayPlan?.holidayPlanName || "",
          description: holidayPlan?.description || "",
          year: holidayPlan?.year != null ? String(holidayPlan.year) : "",
          mandatoryHolidays: holidayPlan?.mandatoryHolidays || "yes",
          optionalHolidays: holidayPlan?.optionalHolidays || "no",
          holidays: Array.isArray(holidayPlan?.holidays)
            ? holidayPlan.holidays.map((item) => ({
              name: item?.name || "",
              date: item?.date || "",
              type: item?.type || "mandatory",
            }))
            : [],
          existingEmployeeDate: holidayPlan?.existingEmployeeDate || "",
          sendEmailExisting:
            typeof holidayPlan?.sendEmailExisting === "boolean"
              ? holidayPlan.sendEmailExisting
              : true,
          newEmployeeDays:
            holidayPlan?.newEmployeeDays != null ? String(holidayPlan.newEmployeeDays) : "",
          sendEmailNew:
            typeof holidayPlan?.sendEmailNew === "boolean" ? holidayPlan.sendEmailNew : true,
          existingOptionalDate: holidayPlan?.existingOptionalDate || "",
          sendEmailExistingOptional:
            typeof holidayPlan?.sendEmailExistingOptional === "boolean"
              ? holidayPlan.sendEmailExistingOptional
              : true,
          newOptionalDays:
            holidayPlan?.newOptionalDays != null ? String(holidayPlan.newOptionalDays) : "",
          sendEmailNewOptional:
            typeof holidayPlan?.sendEmailNewOptional === "boolean"
              ? holidayPlan.sendEmailNewOptional
              : true,
          maxOptionalHolidays:
            holidayPlan?.maxOptionalHolidays != null
              ? String(holidayPlan.maxOptionalHolidays)
              : "",
        }));
      } catch (err) {
        showToast(err?.response?.data?.message || "Failed to load holiday plan", "error");
      } finally {
        setIsFetching(false);
      }
    };

    fetchHolidayPlan();
  }, [axiosInstance, id, isEditMode]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: "", type: "success" }), 3500);
  };

  const validate = () => {
    const errs = {};
    if (currentStep === 1 && !form.name.trim()) errs.name = true;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => { if (!validate()) return; setCurrentStep(s => Math.min(s + 1, STEPS.length)); };
  const handleBack = () => { setErrors({}); setCurrentStep(s => Math.max(s - 1, 1)); };

  /* ── Build API payload ── */
  const buildPayload = (isDraft = false) => ({
    name: form.name.trim(),
    companyId,
    description: form.description,
    year: Number(form.year),
    mandatoryHolidays: form.mandatoryHolidays,
    optionalHolidays: form.optionalHolidays,
    holidays: (form.holidays || []).map(h => ({ name: h.name, date: h.date, type: h.type })),
    // Mandatory
    existingEmployeeDate: form.existingEmployeeDate || null,
    sendEmailExisting: form.sendEmailExisting,
    newEmployeeDays: form.newEmployeeDays !== "" ? Number(form.newEmployeeDays) : null,
    sendEmailNew: form.sendEmailNew,
    // Optional
    existingOptionalDate: form.existingOptionalDate || null,
    sendEmailExistingOptional: form.sendEmailExistingOptional,
    newOptionalDays: form.newOptionalDays !== "" ? Number(form.newOptionalDays) : null,
    sendEmailNewOptional: form.sendEmailNewOptional,
    maxOptionalHolidays: form.maxOptionalHolidays !== "" ? Number(form.maxOptionalHolidays) : null,
    status: isDraft ? "draft" : "active",
    companyOfficeId
  });


  /* ── Save as Draft ── */
  const handleSaveDraft = async () => {
    if (!form.name.trim()) { setErrors({ name: true }); setCurrentStep(1); return; }
    try {
      setLoading(true);
      const request = isEditMode
        ? axiosInstance.put(`/config/update/holidayPlan/${id}`, buildPayload(true), {
          meta: { auth: "ADMIN_AUTH" },
        })
        : axiosInstance.post("/config/create/holidayplan", buildPayload(true), {
          meta: { auth: "ADMIN_AUTH" },
        });
      const { data } = await request;
      if (data.success) {
        showToast(isEditMode ? "Draft updated successfully!" : "Draft saved successfully!");
      }
    } catch (err) {
      showToast(err?.response?.data?.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  /* ── Final Save ── */
  const handleFinalSave = async () => {
    try {
      setLoading(true);
      const request = isEditMode
        ? axiosInstance.put(`/config/update/holidayPlan/${id}`, buildPayload(false), {
          meta: { auth: "ADMIN_AUTH" },
        })
        : axiosInstance.post("/config/create/holidayplan", buildPayload(false), {
          meta: { auth: "ADMIN_AUTH" },
        });
      const { data } = await request;
      localStorage.removeItem("companyOfficeId");
      if (data.success) {
        showToast(isEditMode ? "Holiday Plan updated successfully!" : "Holiday Plan created successfully!");
        navigate("/config/track/leave/holiday-plan/list");
      }
    } catch (err) {
      showToast(err?.response?.data?.message || "Something went wrong. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <StepDescribe form={form} setForm={setForm} errors={errors} />;
      case 2: return <StepPreferences form={form} setForm={setForm} />;
      case 3: return <StepPlan form={form} setForm={setForm} />;
      case 4: return <StepApproval form={form} setForm={setForm} />;
      case 5: return <StepPreview form={form} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Toast notification */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "success" })} />

      <div className="mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">
            {isEditMode ? "Edit Holiday Plan" : "Create Holiday Plan"}
          </h1>
          <p className="text-sm text-gray-400 mt-1">Manage employee directory, documents, and role-based actions.</p>
        </div>

        {isFetching && (
          <p className="mb-4 text-sm text-gray-500">Loading holiday plan...</p>
        )}

        <Stepper currentStep={currentStep} />
        <hr className="mb-8 border-gray-100" />

        <div>{renderStep()}</div>

        {/* Footer */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-100">
          <button
            onClick={handleSaveDraft}
            disabled={loading}
            className="border border-blue-500 text-blue-500 px-5 py-2 rounded-full text-sm hover:bg-blue-50 transition disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>

          <div className="flex gap-3 items-center">
            {currentStep > 1 && (
              <button onClick={handleBack} disabled={loading} className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition">
                Back
              </button>
            )}
            <button
              onClick={() => navigate("/config/track/leave/holiday-plan/list")}
              className="px-5 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Cancel
            </button>
            {currentStep < STEPS.length ? (
              <button
                onClick={handleNext}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleFinalSave}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-full text-sm hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? (isEditMode ? "Updating..." : "Saving...") : isEditMode ? "Update" : "Save"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
