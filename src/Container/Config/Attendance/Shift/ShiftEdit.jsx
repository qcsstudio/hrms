import React, { useState } from "react";
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
        cutOffMins: "15",
      },
    ],
  },
};

export default function ShiftEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const shift = mockShifts[id] || mockShifts["1"];

  const [shiftName, setShiftName] = useState(shift.name);
  const [description, setDescription] = useState(shift.description);
  const [shiftsPerDay, setShiftsPerDay] = useState(shift.shiftsPerDay);
  const [isFlexible, setIsFlexible] = useState(shift.isFlexible);

  const shiftCount =
    shiftsPerDay === "two" ? 2 : shiftsPerDay === "three" ? 3 : 1;

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-6xl">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Edit Shift</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {/* Shift Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Shift Name
          </label>
          <input
            type="text"
            value={shiftName}
            onChange={(e) => setShiftName(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Internal description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 min-h-[80px]"
          />
        </div>

        {/* Shift Per Day */}
        <div>
          <label className="block text-sm font-medium mb-1">
            How many shifts are there in one day?
          </label>
          <select
            value={shiftsPerDay}
            onChange={(e) => setShiftsPerDay(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select</option>
            <option value="one">One Shift</option>
            <option value="two">Two Shifts</option>
            <option value="three">Three Shifts</option>
          </select>
        </div>

        {/* Flexible */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Is this shift a flexible-shift?
          </label>

          <div className="space-y-3">
            <div className="border rounded-lg px-4 py-3 flex items-center gap-2">
              <input
                type="radio"
                name="flex"
                value="yes"
                checked={isFlexible === "yes"}
                onChange={(e) => setIsFlexible(e.target.value)}
              />
              <span>Yes</span>
            </div>

            <div className="border rounded-lg px-4 py-3 flex items-center gap-2">
              <input
                type="radio"
                name="flex"
                value="no"
                checked={isFlexible === "no"}
                onChange={(e) => setIsFlexible(e.target.value)}
              />
              <span>No</span>
            </div>
          </div>
        </div>

        {/* Shift Time Sections */}
        <div
          className={`grid gap-8 ${
            shiftCount > 1
              ? `grid-cols-${shiftCount}`
              : "grid-cols-1 max-w-xl"
          }`}
        >
          {Array.from({ length: shiftCount }).map((_, i) => {
            const time = shift.times[i] || {};

            return (
              <div key={i} className="space-y-4">
                <h2 className="text-lg font-semibold">
                  {i === 0
                    ? "First Shift Time"
                    : i === 1
                    ? "Second Shift Time"
                    : "Third Shift Time"}
                </h2>

                {/* Start Time */}
                <div>
                  <label className="block text-sm mb-1">
                    Shift Start Time
                  </label>
                  <input
                    type="text"
                    defaultValue={time.start}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* End Time */}
                <div>
                  <label className="block text-sm mb-1">
                    Shift End Time
                  </label>
                  <input
                    type="text"
                    defaultValue={time.end}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                {/* Start-off */}
                <div>
                  <label className="block text-sm mb-1">
                    Start-off
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={time.startOffHrs}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Hrs</span>
                    <input
                      type="text"
                      defaultValue={time.startOffMins}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Mins</span>
                  </div>
                </div>

                {/* Cut-off */}
                <div>
                  <label className="block text-sm mb-1">
                    Cut-off
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      defaultValue={time.cutOffHrs}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Hrs</span>
                    <input
                      type="text"
                      defaultValue={time.cutOffMins}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Mins</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="flex justify-between pt-6 border-t">
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full">
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/track")}
              className="px-6 py-2 border rounded-lg"
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