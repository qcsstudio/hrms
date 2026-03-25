import { useEffect, useState } from "react";
import createAxios from "../../../../utils/axios.config";
import { toast } from "react-toastify";

export default function AttendanceRequest() {
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [lockAttendance, setLockAttendance] = useState(true);
  const [startDay, setStartDay] = useState(29);
  const [endDay, setEndDay] = useState(2);
  const [cutoff, setCutoff] = useState(0);
  const [cycleBypass, setCycleBypass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const sanitizeDay = (value, fallback) => {
    const parsed = Number(value);
    return Number.isInteger(parsed) && parsed >= 1 && parsed <= 31
      ? parsed
      : fallback;
  };

  const sanitizeCutoff = (value, fallback = 0) => {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    if (parsed < 0) return 0;
    if (parsed > 10) return 10;
    return parsed;
  };

  useEffect(() => {
    const fetchAttendanceLockCycle = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/config/attendance-lock-cycle-get", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const data = res?.data?.data || res?.data;
        if (!data || typeof data !== "object") return;

        if (typeof data.isAttendanceLocked === "boolean") {
          setLockAttendance(data.isAttendanceLocked);
        }

        setStartDay((prev) => sanitizeDay(data.lockStartDay, prev));
        setEndDay((prev) => sanitizeDay(data.lockEndDay, prev));
        setCutoff((prev) => sanitizeCutoff(data.regularizationCutOffDays, prev));

        if (typeof data.isCycleBypassEnabled === "boolean") {
          setCycleBypass(data.isCycleBypassEnabled);
        }
      } catch (error) {
        console.log("Error fetching attendance lock cycle:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceLockCycle();
  }, []);

  const handleSave = async () => {
    const payload = {
      isAttendanceLocked: lockAttendance,
      lockStartDay: startDay,
      lockEndDay: endDay,
      regularizationCutOffDays: cutoff,
      isCycleBypassEnabled: cycleBypass,
      description: `Attendance will be locked monthly from ${startDay}th to ${endDay}th`,
    };

    try {
      setSaving(true);
      const res = await axiosInstance.post("/config/attendance-lock-cycle", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });

      toast.success(res?.data?.message || "Attendance lock cycle saved successfully");
    } catch (error) {
      console.log("Error saving attendance lock cycle:", error);
      toast.error(error?.response?.data?.message || "Failed to save attendance lock cycle");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <h1 className="text-xl font-bold text-foreground mb-6">
        Attendance lock cycle
      </h1>

      {loading && (
        <p className="text-sm text-gray-500 mb-4">Loading attendance lock cycle...</p>
      )}

      <p className="text-sm text-primary mb-4">
        Do you wish to lock the attendance?
      </p>

      <div className="border border-border rounded-xl overflow-hidden mb-6">
        
        {/* YES OPTION */}
        <label
          onClick={() => setLockAttendance(true)}
          className={`flex items-center justify-between px-5 py-4 cursor-pointer ${
            lockAttendance ? "bg-gray-100 border-b" : "border-b"
          }`}
        >
          <span className="text-sm font-medium">Yes</span>

          <span
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              lockAttendance ? "border-green-600 bg-green-600" : "border-gray-300"
            }`}
          >
            {lockAttendance && (
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </label>

        {/* SETTINGS WHEN YES */}
        {lockAttendance && (
          <div className="px-8 py-6 space-y-6 bg-white">
            
            {/* START DAY */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Attendance lock start day
              </label>
              <select
                value={startDay}
                onChange={(e) => setStartDay(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-sm w-28"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* END DAY */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                Attendance lock end day
              </label>
              <select
                value={endDay}
                onChange={(e) => setEndDay(Number(e.target.value))}
                className="border rounded-lg px-3 py-2 text-sm w-28"
              >
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* SLIDER */}
            <div>
              <p className="text-sm mb-3">
                Regularization cut-off (Buffer days after cycle end date for
                employees to send request)
              </p>

              <div className="relative pt-8 pb-2">
                <div
                  className="absolute top-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-full -translate-x-1/2"
                  style={{ left: `${(cutoff / 10) * 100}%` }}
                >
                  {cutoff}
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  value={cutoff}
                  onChange={(e) => setCutoff(Number(e.target.value))}
                  className="w-full"
                />

                <div className="flex justify-between text-xs mt-2">
                  {Array.from({ length: 11 }, (_, i) => (
                    <span key={i}>{i}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CYCLE BYPASS */}
            <div className="border-t pt-5">
              <h3 className="text-base font-semibold mb-1">Cycle Bypass</h3>

              <div className="flex items-center justify-between">
                <p className="text-sm text-blue-600">
                  Allow employees to bypass cycle's limitations
                </p>

                {/* INLINE TOGGLE */}
                <button
                  onClick={() => setCycleBypass(!cycleBypass)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                    cycleBypass ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                      cycleBypass ? "translate-x-6" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* NO OPTION */}
        <label
          onClick={() => setLockAttendance(false)}
          className={`flex items-center justify-between px-5 py-4 cursor-pointer ${
            !lockAttendance ? "bg-gray-100" : ""
          }`}
        >
          <span className="text-sm font-medium">No</span>

          <span
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              !lockAttendance ? "border-green-600 bg-green-600" : "border-gray-300"
            }`}
          >
            {!lockAttendance && (
              <svg width="12" height="12" viewBox="0 0 12 12">
                <path
                  d="M2.5 6L5 8.5L9.5 3.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>
        </label>
      </div>

      {/* WARNING */}
      <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-4 py-3 mb-6 flex gap-2">
        <span>⚠</span>
        <p className="text-sm">
          Attendance Request Cycle & Salary Cycle must be kept in-sync for your
          payroll to work correctly.
        </p>
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={handleSave}
        disabled={saving || loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}