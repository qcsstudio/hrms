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

export default function ClockInMethodView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const method = mockMethods[id || "1"] || mockMethods["1"];

  const FieldCard = ({ label, value }) => (
    <div className="bg-white border rounded-xl p-4 shadow-sm">
      <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
        {label}
      </p>
      <p className="text-sm font-semibold text-gray-800">
        {value}
      </p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">View Clock-in Method</h1>
        <p className="text-sm text-gray-500 mt-1">
          Detailed configuration information.
        </p>
      </div>

      {/* Main Card */}
      <div className="bg-gray-50 border rounded-2xl p-6 shadow-md">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FieldCard label="Device Name" value={method.name} />

          <FieldCard
            label="Clock Type"
            value={
              method.clockType === "both"
                ? "Clock-in & Clock-out required"
                : "Only Clock-in required"
            }
          />

          <FieldCard
            label="Track Break Duration"
            value={method.trackBreak.toUpperCase()}
          />

          {method.trackBreak === "yes" && (
            <FieldCard
              label="Break Time"
              value={`${method.breakHrs} Hrs ${method.breakMins} Mins`}
            />
          )}

          <FieldCard
            label="Biometric Attendance"
            value={method.biometric.toUpperCase()}
          />

          <FieldCard
            label="Web Attendance"
            value={method.webAttendance.toUpperCase()}
          />

          <FieldCard
            label="Mobile Attendance"
            value={method.mobileAttendance.toUpperCase()}
          />

          <FieldCard
            label="GPS Attendance"
            value={method.gpsAttendance.toUpperCase()}
          />

          <FieldCard
            label="IP Restriction"
            value={method.ipRestriction.toUpperCase()}
          />

        </div>

        {/* Description Full Width */}
        <div className="mt-6 bg-white border rounded-xl p-4 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Description
          </p>
          <p className="text-sm text-gray-800">
            {method.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t">
          <button
            onClick={() => navigate("/config/track/Attendance/clock-in-method/list")}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Back
          </button>

          {/* <button
            onClick={() => navigate(`/track/clock-in-method/edit/${id}`)}
            className="px-6 py-2 bg-black text-white rounded-full hover:opacity-90"
          >
            Edit
          </button> */}
        </div>

      </div>
    </div>
  );
}