import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShiftCreate = () => {
  const navigate = useNavigate();
  const [shiftsPerDay, setShiftsPerDay] = useState("two");
  const [isFlexible, setIsFlexible] = useState("no");

  const shiftCount =
    shiftsPerDay === "three" ? 3 : shiftsPerDay === "two" ? 2 : 1;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Create Shifts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>
      </div>

      <div className="space-y-6">

        {/* Shift Name */}
        <div>
          <label className="text-sm font-medium">Shift Name</label>
          <input
            type="text"
            placeholder="Choose Account"
            className="w-full mt-2 border rounded-lg px-4 py-2 bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Internal description</label>
          <textarea
            placeholder="Choose Account"
            className="w-full mt-2 border rounded-lg px-4 py-3 bg-white min-h-[100px]"
          />
        </div>

        {/* Shift Count */}
        <div>
          <label className="text-sm font-medium">
            How many shifts are there in one day?
          </label>
          <select
            value={shiftsPerDay}
            onChange={(e) => setShiftsPerDay(e.target.value)}
            className="w-full mt-2 border rounded-lg px-4 py-2 bg-white"
          >
            <option value="one">One Shift</option>
            <option value="two">Two Shifts</option>
            <option value="three">Three Shifts</option>
          </select>
        </div>

        {/* Flexible Shift */}
        <div>
          <label className="text-sm font-medium">
            Is this shift a flexible-shift?
          </label>

          <div className="mt-3 space-y-3">
            <div className="border rounded-lg px-4 py-3 flex items-center gap-3">
              <input
                type="radio"
                value="yes"
                checked={isFlexible === "yes"}
                onChange={(e) => setIsFlexible(e.target.value)}
              />
              <span>yes</span>
            </div>

            <div className="border rounded-lg px-4 py-3 flex items-center gap-3">
              <input
                type="radio"
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
          className={`grid gap-10 ${
            shiftCount > 1 ? "grid-cols-2" : "grid-cols-1 max-w-xl"
          }`}
        >
          {Array.from({ length: shiftCount }).map((_, i) => (
            <div key={i} className="space-y-4">
              <h2 className="text-xl font-semibold">
                {i === 0
                  ? "First Shift Time"
                  : i === 1
                  ? "Second Shift Time"
                  : "Third Shift Time"}
              </h2>

              {/* Start Time */}
              <div>
                <label className="text-sm font-medium">
                  Shift Start Time
                </label>
                <div className="relative mt-2">
                  <input
                    type="time"
                    className="w-full border rounded-lg px-4 py-2 bg-white"
                  />
                </div>
              </div>

              {/* End Time */}
              <div>
                <label className="text-sm font-medium">
                  Shift End Time
                </label>
                <div className="relative mt-2">
                  <input
                    type="time"
                    className="w-full border rounded-lg px-4 py-2 bg-white"
                  />
                </div>
              </div>

              {/* Start-off */}
              <div>
                <label className="text-sm font-medium">Start-off</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="00"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Hrs</span>

                  <input
                    type="number"
                    placeholder="00"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Mins</span>
                </div>
              </div>

              {/* Cut-off */}
              <div>
                <label className="text-sm font-medium">Cut-off</label>
                <div className="flex items-center gap-3 mt-2">
                  <input
                    type="number"
                    placeholder="00"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Hrs</span>

                  <input
                    type="number"
                    placeholder="00"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Mins</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-between items-center pt-8 border-t mt-6">
          <button className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg">
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/track/Attendance/shift/list")}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShiftCreate;