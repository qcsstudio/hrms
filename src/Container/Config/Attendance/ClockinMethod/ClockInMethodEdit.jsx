import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockMethods = {
  "1": {
    name: "Work From Office",
    description: "Standard office clock-in method with biometric",
    clockType: "both",
    trackBreak: "yes",
    breakHrs: "1",
    breakMins: "0",
    biometric: "yes",
    webAttendance: "no",
    mobileAttendance: "yes",
    gpsAttendance: "no",
    ipRestriction: "yes",
  },
  "2": {
    name: "Work From Home",
    description: "Remote work clock-in via mobile app",
    clockType: "only-clock-in",
    trackBreak: "no",
    breakHrs: "0",
    breakMins: "30",
    biometric: "no",
    webAttendance: "yes",
    mobileAttendance: "yes",
    gpsAttendance: "yes",
    ipRestriction: "no",
  },
};

export default function ClockInMethodEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const method = mockMethods[id || "1"] || mockMethods["1"];

  const [deviceName, setDeviceName] = useState(method.name);
  const [description, setDescription] = useState(method.description);
  const [clockType, setClockType] = useState(method.clockType);
  const [trackBreak, setTrackBreak] = useState(method.trackBreak);
  const [breakHrs, setBreakHrs] = useState(method.breakHrs);
  const [breakMins, setBreakMins] = useState(method.breakMins);
  const [biometric, setBiometric] = useState(method.biometric);
  const [webAttendance, setWebAttendance] = useState(method.webAttendance);
  const [mobileAttendance, setMobileAttendance] = useState(method.mobileAttendance);
  const [gpsAttendance, setGpsAttendance] = useState(method.gpsAttendance);
  const [ipRestriction, setIpRestriction] = useState(method.ipRestriction);

  return (
    <div className="max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-2">Edit Clock-in Method</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage employee directory, documents, and role-based actions.
      </p>

      <div className="space-y-6">

        {/* Device Name */}
        <div>
          <label className="block font-medium mb-1">Device Name</label>
          <input
            type="text"
            value={deviceName}
            onChange={(e) => setDeviceName(e.target.value)}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">
            Internal description for admins
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
          />
        </div>

        {/* Clock Type */}
        <div>
          <label className="block font-medium mb-2">
            Clock Type
          </label>

          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="both"
                checked={clockType === "both"}
                onChange={(e) => setClockType(e.target.value)}
              />
              <span className="ml-2">
                Clock-in and clock-out required
              </span>
            </div>

            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="only-clock-in"
                checked={clockType === "only-clock-in"}
                onChange={(e) => setClockType(e.target.value)}
              />
              <span className="ml-2">Only Clock-in required</span>
            </div>
          </div>
        </div>

        {/* Track Break */}
        <div>
          <label className="block font-medium mb-2">
            Track break duration?
          </label>

          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="yes"
                checked={trackBreak === "yes"}
                onChange={(e) => setTrackBreak(e.target.value)}
              />
              <span className="ml-2">Yes</span>
            </div>

            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="no"
                checked={trackBreak === "no"}
                onChange={(e) => setTrackBreak(e.target.value)}
              />
              <span className="ml-2">No</span>
            </div>
          </div>
        </div>

        {/* Break Time */}
        {trackBreak === "yes" && (
          <div>
            <label className="block font-medium mb-2">
              Break Time
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={breakHrs}
                onChange={(e) => setBreakHrs(e.target.value)}
                className="w-24 border rounded-lg px-3 py-2"
              />
              <span className="self-center">Hrs</span>

              <input
                type="number"
                value={breakMins}
                onChange={(e) => setBreakMins(e.target.value)}
                className="w-24 border rounded-lg px-3 py-2"
              />
              <span className="self-center">Mins</span>
            </div>
          </div>
        )}

        {/* Biometric */}
        <div>
          <label className="block font-medium mb-2">
            Enable biometric attendance?
          </label>

          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="yes"
                checked={biometric === "yes"}
                onChange={(e) => setBiometric(e.target.value)}
              />
              <span className="ml-2">Yes</span>
            </div>

            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="no"
                checked={biometric === "no"}
                onChange={(e) => setBiometric(e.target.value)}
              />
              <span className="ml-2">No</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={() => navigate("/config/track/Attendance/clock-in-method/list")}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>

          <button className="px-6 py-2 bg-black text-white rounded-full">
            Update
          </button>
        </div>

      </div>
    </div>
  );
}