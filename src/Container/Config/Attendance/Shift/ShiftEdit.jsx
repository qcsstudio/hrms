import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import {
  buildShiftPayload,
  getShiftCount,
  toShiftViewModel,
  validateRequiredShiftTimes,
} from "./shiftApiUtils";

export default function ShiftEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shiftCategory, setShiftCategory] = useState("one");
  const [colorCode, setColorCode] = useState("#00FF00");
  const [shiftsPerDay, setShiftsPerDay] = useState("one");
  const [isFlexible, setIsFlexible] = useState("no");
  const [shiftTimings, setShiftTimings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shiftCount = getShiftCount(shiftsPerDay);

  useEffect(() => {
    setShiftCategory(shiftsPerDay);
  }, [shiftsPerDay]);

  useEffect(() => {
    const fetchShift = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get(`/config/getOne-shift/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const raw = res?.data?.data || res?.data?.result || res?.data || {};
        const viewModel = toShiftViewModel(raw);

        setTitle(viewModel.title);
        setDescription(viewModel.description);
        setShiftCategory(viewModel.shiftCategory);
        setColorCode(viewModel.colorCode);
        setShiftsPerDay(viewModel.shiftsPerDay);
        setShiftTimings(viewModel.shiftTimings);
        setIsFlexible("no");
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Unable to fetch shift details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchShift();
    }
  }, [id]);

  const updateShiftTime = (index, field, value) => {
    setShiftTimings((prev) => {
      const next = [...prev];

      if (field === "startTime" || field === "endTime") {
        next[index] = { ...next[index], [field]: value };
        return next;
      }

      const [group, key] = field.split(".");
      next[index] = {
        ...next[index],
        [group]: {
          ...next[index][group],
          [key]: value,
        },
      };

      return next;
    });
  };

  const handleUpdate = async (activeState) => {
    setErrorMessage("");
    if (!title.trim()) {
      setErrorMessage("Shift name is required.");
      return;
    }

    const timeValidationMessage = validateRequiredShiftTimes(shiftTimings, shiftsPerDay);
    if (timeValidationMessage) {
      setErrorMessage(timeValidationMessage);
      return;
    }

    const payload = buildShiftPayload({
      title: title.trim(),
      description: description.trim(),
      shiftCategory,
      colorCode,
      isActive: activeState,
      shiftsPerDay,
      shiftTimings,
    });

    try {
      setSaving(true);
      await axiosInstance.put(`/config/update-shift/${id}`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/track/Attendance/shift/list");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to update shift.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-6xl">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Edit Shift</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>
        <button
          onClick={() => handleUpdate(true)}
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 disabled:opacity-60"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {loading && <div className="text-sm text-gray-500">Loading shift...</div>}
        {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}

        <div>
          <label className="block text-sm font-medium mb-1">Shift Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Internal description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 min-h-20"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Shift Category</label>
            <select
              value={shiftCategory}
              onChange={(e) => setShiftCategory(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="one">one</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Color Code</label>
            <input
              type="text"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            How many shifts are there in one day?
          </label>
          <select
            value={shiftsPerDay}
            onChange={(e) => setShiftsPerDay(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="one">One Shift</option>
            <option value="two">Two Shifts</option>
            <option value="three">Three Shifts</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Is this shift a flexible-shift?</label>

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

        <div
          className={`grid gap-8 ${
            shiftCount === 1 ? "grid-cols-1 max-w-xl" : shiftCount === 2 ? "grid-cols-2" : "grid-cols-3"
          }`}
        >
          {Array.from({ length: shiftCount }).map((_, i) => {
            const time = shiftTimings[i] || {};

            return (
              <div key={i} className="space-y-4">
                <h2 className="text-lg font-semibold">
                  {i === 0 ? "First Shift Time" : i === 1 ? "Second Shift Time" : "Third Shift Time"}
                </h2>

                <div>
                  <label className="block text-sm mb-1">Shift Start Time</label>
                  <input
                    type="time"
                    value={time?.startTime || ""}
                    onChange={(e) => updateShiftTime(i, "startTime", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Shift End Time</label>
                  <input
                    type="time"
                    value={time?.endTime || ""}
                    onChange={(e) => updateShiftTime(i, "endTime", e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm mb-1">Start-off</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={time?.startOff?.hours ?? 0}
                      onChange={(e) => updateShiftTime(i, "startOff.hours", e.target.value)}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Hrs</span>
                    <input
                      type="number"
                      value={time?.startOff?.minutes ?? 0}
                      onChange={(e) => updateShiftTime(i, "startOff.minutes", e.target.value)}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Mins</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm mb-1">Cut-off</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={time?.cutOff?.hours ?? 0}
                      onChange={(e) => updateShiftTime(i, "cutOff.hours", e.target.value)}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Hrs</span>
                    <input
                      type="number"
                      value={time?.cutOff?.minutes ?? 0}
                      onChange={(e) => updateShiftTime(i, "cutOff.minutes", e.target.value)}
                      className="w-24 border rounded-lg px-2 py-2"
                    />
                    <span>Mins</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between pt-6 border-t">
          <button
            onClick={() => handleUpdate(false)}
            disabled={saving}
            className="border border-blue-600 text-blue-600 px-6 py-2 rounded-full disabled:opacity-60"
          >
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/track/Attendance/shift/list")}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpdate(true)}
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-2 rounded-full disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
