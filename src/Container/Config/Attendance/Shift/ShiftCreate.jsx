import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import {
  buildEmptyTimings,
  buildShiftPayload,
  extractCompanyOffices,
  getShiftCount,
  validateRequiredShiftTimes,
} from "./shiftApiUtils";

const ShiftCreate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const queryParams = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const selectedCountry = queryParams.get("country") || "";
  const selectedOffice = queryParams.get("office") || "";

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [shiftCategory, setShiftCategory] = useState("two");
  const [colorCode, setColorCode] = useState("#00FF00");
  const [shiftsPerDay, setShiftsPerDay] = useState("two");
  const [isFlexible, setIsFlexible] = useState("no");
  const [shiftTimings, setShiftTimings] = useState(buildEmptyTimings(3));
  const [companyOffices, setCompanyOffices] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const shiftCount = getShiftCount(shiftsPerDay);

  useEffect(() => {
    setShiftCategory(shiftsPerDay);
  }, [shiftsPerDay]);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosInstance.get("/config/company-offices-data", {
          meta: { auth: "ADMIN_AUTH" },
        });
        setCompanyOffices(extractCompanyOffices(res?.data));
      } catch (error) {
        setCompanyOffices([]);
      }
    };

    fetchOffices();
  }, []);

  const selectedCompanyOfficeIds = useMemo(() => {
    if (!selectedCountry) return [];

    return companyOffices
      .filter((office) => {
        const sameCountry =
          (office.country || "").trim().toLowerCase() ===
          selectedCountry.trim().toLowerCase();
        if (!sameCountry) return false;
        if (selectedOffice === "ALL") return true;

        return (
          (office.name || "").trim().toLowerCase() ===
          selectedOffice.trim().toLowerCase()
        );
      })
      .map((office) => office.id);
  }, [companyOffices, selectedCountry, selectedOffice]);

  const resolvedCompanyOfficeIds = useMemo(() => {
    if (selectedCompanyOfficeIds.length > 0) return selectedCompanyOfficeIds;

    if (!selectedOffice || selectedOffice === "ALL") return [];

    // Fallback: if office query already contains an object id, pass it directly.
    if (/^[a-f\d]{24}$/i.test(selectedOffice)) {
      return [selectedOffice];
    }

    return [];
  }, [selectedCompanyOfficeIds, selectedOffice]);

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

  const handleSubmit = async (activeState) => {
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
      companyOfficeId: resolvedCompanyOfficeIds,
    });

    try {
      setIsSaving(true);
      await axiosInstance.post("/config/shift-create", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/track/Attendance/shift/list");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to create shift.");
    } finally {
      setIsSaving(false);
    }
  };

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
        {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}

        {/* Shift Name */}
        <div>
          <label className="text-sm font-medium">Shift Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter shift name"
            className="w-full mt-2 border rounded-lg px-4 py-2 bg-white"
          />
        </div>

        {/* Description */}
        <div>
          <label className="text-sm font-medium">Internal description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter internal description"
            className="w-full mt-2 border rounded-lg px-4 py-3 bg-white min-h-25"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Shift Category</label>
            <select
              value={shiftCategory}
              onChange={(e) => setShiftCategory(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-2 bg-white"
            >
              <option value="one">one</option>
              <option value="two">two</option>
              <option value="three">three</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Color Code</label>
            <input
              type="text"
              value={colorCode}
              onChange={(e) => setColorCode(e.target.value)}
              className="w-full mt-2 border rounded-lg px-4 py-2 bg-white"
            />
          </div>
        </div>

        {(selectedCountry || selectedOffice) && (
          <div className="text-xs text-gray-500">
            Country: {selectedCountry || "-"} | Office: {selectedOffice || "-"}
          </div>
        )}

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
                    value={shiftTimings[i]?.startTime || ""}
                    onChange={(e) => updateShiftTime(i, "startTime", e.target.value)}
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
                    value={shiftTimings[i]?.endTime || ""}
                    onChange={(e) => updateShiftTime(i, "endTime", e.target.value)}
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
                    value={shiftTimings[i]?.startOff?.hours ?? 0}
                    onChange={(e) => updateShiftTime(i, "startOff.hours", e.target.value)}
                    min="0"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Hrs</span>

                  <input
                    type="number"
                    value={shiftTimings[i]?.startOff?.minutes ?? 0}
                    onChange={(e) => updateShiftTime(i, "startOff.minutes", e.target.value)}
                    min="0"
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
                    value={shiftTimings[i]?.cutOff?.hours ?? 0}
                    onChange={(e) => updateShiftTime(i, "cutOff.hours", e.target.value)}
                    min="0"
                    className="w-24 border rounded-lg px-3 py-2 bg-white"
                  />
                  <span className="text-sm text-gray-500">Hrs</span>

                  <input
                    type="number"
                    value={shiftTimings[i]?.cutOff?.minutes ?? 0}
                    onChange={(e) => updateShiftTime(i, "cutOff.minutes", e.target.value)}
                    min="0"
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
          <button
            onClick={() => handleSubmit(false)}
            disabled={isSaving}
            className="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg disabled:opacity-60"
          >
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/track/Attendance/shift/list")}
              className="border px-5 py-2 rounded-lg"
            >
              Cancel
            </button>

            <button
              onClick={() => handleSubmit(true)}
              disabled={isSaving}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-60"
            >
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ShiftCreate;