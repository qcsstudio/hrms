import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ---------------- YES / NO BOX COMPONENT ---------------- */

function YesNoBox({ label, value, onChange, name }) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>

      {/* YES */}
      <label
        className={`flex items-center justify-between border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "yes"
            ? "bg-blue-50 border-blue-500"
            : "hover:border-gray-400"
        }`}
      >
        <div className="flex items-center">
          <input
            type="radio"
            name={name}
            value="yes"
            checked={value === "yes"}
            onChange={(e) => onChange(e.target.value)}
            className="mr-2"
          />
          Yes
        </div>

        {value === "yes" && (
          <span className="text-green-600 font-semibold">✔</span>
        )}
      </label>

      {/* NO */}
      <label
        className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer transition ${
          value === "no"
            ? "bg-blue-50 border-blue-500"
            : "hover:border-gray-400"
        }`}
      >
        <input
          type="radio"
          name={name}
          value="no"
          checked={value === "no"}
          onChange={(e) => onChange(e.target.value)}
          className="mr-2"
        />
        No
      </label>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */

export default function ClockInMethodCreate() {
  const navigate = useNavigate();

  const [clockType, setClockType] = useState("only");
  const [trackBreak, setTrackBreak] = useState("no");
  const [biometric, setBiometric] = useState("no");
  const [directionalDevice, setDirectionalDevice] = useState("no");
  const [webAttendance, setWebAttendance] = useState("no");
  const [ipRestriction, setIpRestriction] = useState("no");
  const [mobileAttendance, setMobileAttendance] = useState("yes");
  const [gpsAttendance, setGpsAttendance] = useState("no");

  return (
    <div className="max-w-4xl p-6">
      {/* ================= HEADER ================= */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Clock-in Method</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="space-y-6">
        {/* ================= DEVICE NAME ================= */}
        <div>
          <label className="text-sm font-medium">Device Name</label>
          <input
            type="text"
            placeholder="Choose Account"
            className="mt-1 w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* ================= DESCRIPTION ================= */}
        <div>
          <label className="text-sm font-medium">
            Kindly, provide internal description for other admins who would
            view this setting
          </label>
          <textarea
            placeholder="Choose Account"
            className="mt-1 w-full border rounded-lg px-3 py-2 min-h-[80px]"
          />
        </div>

        {/* ================= CLOCK TYPE + BREAK ================= */}
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <p className="text-sm font-medium">
              Do employees need to clock-in and clock-out, or only clock-in is sufficient?
            </p>

            <label
              className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer ${
                clockType === "both" ? "bg-blue-50 border-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                name="clockType"
                value="both"
                checked={clockType === "both"}
                onChange={(e) => setClockType(e.target.value)}
                className="mr-2"
              />
              Clock-in and clock out, both required
            </label>

            <label
              className={`flex items-center border rounded-lg px-4 py-3 cursor-pointer ${
                clockType === "only" ? "bg-blue-50 border-blue-500" : ""
              }`}
            >
              <input
                type="radio"
                name="clockType"
                value="only"
                checked={clockType === "only"}
                onChange={(e) => setClockType(e.target.value)}
                className="mr-2"
              />
              Only Clock in required
            </label>
          </div>

          <YesNoBox
            label="Would you like to track break durations between Clock-out and Clock-in times?"
            value={trackBreak}
            onChange={setTrackBreak}
            name="trackBreak"
          />
        </div>

        {/* ================= BREAK TIME ================= */}
        {trackBreak === "yes" && (
          <div>
            <p className="text-sm font-medium">
              How much time is allocated to employee as break-time?
            </p>

            <div className="flex gap-4 mt-2">
              <div>
                <input
                  type="number"
                  className="w-24 border rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Hrs</p>
              </div>

              <div>
                <input
                  type="number"
                  className="w-24 border rounded-lg px-3 py-2"
                />
                <p className="text-xs text-gray-500 mt-1">Mins</p>
              </div>
            </div>
          </div>
        )}

        {/* ================= BIOMETRIC ================= */}
        <YesNoBox
          label="Would you like to enable biometric attendance?"
          value={biometric}
          onChange={setBiometric}
          name="biometric"
        />

        {/* If Biometric = YES */}
        {biometric === "yes" && (
          <YesNoBox
            label="Do you wish to track attendance with separate device for recording in-time and a separate device for recording out-time (use in/out directional devices)?"
            value={directionalDevice}
            onChange={setDirectionalDevice}
            name="directional"
          />
        )}

        {/* If Biometric = NO */}
        {biometric === "no" && (
          <YesNoBox
            label="Would you like to enable web based attendance via Windows Linux Mac browser"
            value={webAttendance}
            onChange={setWebAttendance}
            name="web"
          />
        )}

        {/* ================= IP ================= */}
        <YesNoBox
          label="Would you like to enforce IP Network restrictions as well"
          value={ipRestriction}
          onChange={setIpRestriction}
          name="ip"
        />

        {/* ================= MOBILE ================= */}
        <YesNoBox
          label="Would you like to enable mobile based attendance (via Android/iOS-app)"
          value={mobileAttendance}
          onChange={setMobileAttendance}
          name="mobile"
        />

        {/* ================= GPS ================= */}
        <YesNoBox
          label="Would you like to enforce GPS location based attendance"
          value={gpsAttendance}
          onChange={setGpsAttendance}
          name="gps"
        />

        {/* If GPS YES → Show blue card */}
        {gpsAttendance === "yes" && (
          <div className="border rounded-lg p-4 bg-blue-100">
            <div className="flex justify-between items-center">
              <span className="font-medium">Yes</span>
              <span className="text-green-600 font-bold">✔</span>
            </div>

            <p className="text-blue-700 mt-3 cursor-pointer">
              Select GPS
            </p>

            <p className="text-red-500 text-sm mt-1">
              Please select GPS
            </p>
          </div>
        )}

        {/* ================= FOOTER ================= */}
        <div className="flex justify-between pt-6 border-t">
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-full">
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/track/Attendance/clock-in-method/list")}
              className="px-5 py-2"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-full">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}