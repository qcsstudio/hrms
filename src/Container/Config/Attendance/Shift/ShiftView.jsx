import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockShifts = {
  "1": {
    name: "Leap Of Faith",
    description: "Default office shift for all departments",
    shiftsPerDay: "one",
    isFlexible: "no",
    times: [
      {
        start: "8:00 AM",
        end: "6:30 PM",
        startOffHrs: "0",
        startOffMins: "15",
        cutOffHrs: "0",
        cutOffMins: "30",
      },
    ],
  },
  "2": {
    name: "Remote Shift",
    description: "Remote work shift",
    shiftsPerDay: "two",
    isFlexible: "yes",
    times: [
      {
        start: "8:00 AM",
        end: "12:00 PM",
        startOffHrs: "0",
        startOffMins: "10",
        cutOffHrs: "0",
        cutOffMins: "15",
      },
      {
        start: "1:00 PM",
        end: "5:00 PM",
        startOffHrs: "0",
        startOffMins: "10",
        cutOffHrs: "0",
        startOffMins: "10",
        cutOffHrs: "0",
        cutOffMins: "15",
      },
    ],
  },
};

export default function ShiftView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const shift = mockShifts[id] || mockShifts["1"];

  const shiftCount =
    shift.shiftsPerDay === "two"
      ? 2
      : shift.shiftsPerDay === "three"
      ? 3
      : 1;

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">View Shift</h1>
          <p className="text-sm text-gray-500 mt-1">
            View shift details and timing configuration.
          </p>
        </div>

        <button
          onClick={() => navigate(`/config/track/Attendance/shift/edit/${id}`)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          Edit
        </button>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
        {/* Shift Name */}
        <div>
          <p className="text-sm text-gray-500">Shift Name</p>
          <p className="font-medium text-lg">{shift.name}</p>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-gray-500">Internal Description</p>
          <p className="font-medium">{shift.description}</p>
        </div>

        {/* Shift Count */}
        <div>
          <p className="text-sm text-gray-500">Shifts Per Day</p>
          <p className="font-medium capitalize">
            {shift.shiftsPerDay} Shift
          </p>
        </div>

        {/* Flexible */}
        <div>
          <p className="text-sm text-gray-500">Flexible Shift</p>
          <span
            className={`inline-block px-3 py-1 text-sm rounded-full ${
              shift.isFlexible === "yes"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {shift.isFlexible === "yes" ? "Yes" : "No"}
          </span>
        </div>

        {/* Time Sections */}
        <div
          className={`grid gap-8 ${
            shiftCount === 1
              ? "grid-cols-1 max-w-xl"
              : shiftCount === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          {shift.times.slice(0, shiftCount).map((time, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-gray-50 space-y-3"
            >
              <h2 className="font-semibold text-lg">
                {i === 0
                  ? "First Shift"
                  : i === 1
                  ? "Second Shift"
                  : "Third Shift"}
              </h2>

              <div>
                <p className="text-sm text-gray-500">Start Time</p>
                <p className="font-medium">{time.start}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">End Time</p>
                <p className="font-medium">{time.end}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Start-off</p>
                <p className="font-medium">
                  {time.startOffHrs} Hrs {time.startOffMins} Mins
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Cut-off</p>
                <p className="font-medium">
                  {time.cutOffHrs} Hrs {time.cutOffMins} Mins
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-6 border-t">
          <button
            onClick={() => navigate("/config/track/Attendance/shift/list")}
            className="px-6 py-2 border rounded-lg"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}