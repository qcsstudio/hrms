import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ================= INITIAL DATA ================= */
const initialMethods = [
  {
    id: 1,
    name: "Work From Office",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "JD",
    assignedCount: 15,
    trackingDevices: ["⚙️", "🖨️"],
    breakTracking: true,
    country: "India",
    office: "HeadOffice",
    status: "Active",
  },
  {
    id: 2,
    name: "Work From Home",
    date: "12 Jun 2025  11:10 AM",
    createdBy: "AK",
    assignedCount: 0,
    trackingDevices: ["🖥️", "📱"],
    breakTracking: false,
    country: "USA",
    office: "Branch1",
    status: "Draft",
  },
  {
    id: 3,
    name: "Hybrid Policy",
    date: "15 Jun 2025",
    createdBy: "RM",
    assignedCount: 8,
    trackingDevices: ["💻"],
    breakTracking: true,
    country: "India",
    office: "Branch1",
    status: "Active",
  },
];

export default function ClockInMethodList() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const [methods, setMethods] = useState(initialMethods);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const locationData = {
    India: ["HeadOffice", "Branch1"],
    USA: ["Branch1"],
  };

  const countries = Object.keys(locationData);

  /* ================= CLOSE DROPDOWN ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= LOCATIONS ================= */
  const locations = [
    ...new Set(methods.map((item) => `${item.country} - ${item.office}`)),
  ];

  /* ================= FILTER ================= */
  const filteredMethods = useMemo(() => {
    let result = methods;

    if (selectedLocation) {
      result = result.filter(
        (item) =>
          `${item.country} - ${item.office}` === selectedLocation
      );
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    return result;
  }, [methods, selectedLocation, statusFilter]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setMethods((prev) => prev.filter((item) => item.id !== id));
    setOpenMenu(null);
  };

  /* ================= CLEAR ================= */
  const handleClear = () => {
    setSelectedLocation("");
  };

  /* ================= CONTINUE ================= */
  const handleContinue = () => {
    if (!selectedCountry) {
      alert("Please select country");
      return;
    }

    if (!applyAll && !selectedOffice) {
      alert("Please select office");
      return;
    }

    navigate(
      `/config/track/Attendance/clock-in-method/create?country=${encodeURIComponent(
        selectedCountry
      )}&office=${applyAll ? "ALL" : encodeURIComponent(selectedOffice)}`
    );

    setShowDialog(false);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Clock In Methods</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage clock-in methods location wise.
          </p>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* ================= STATUS + LOCATION ================= */}
      <div className="flex justify-between items-center mb-6">

        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-1.5 text-sm rounded-md transition ${
                statusFilter === tab
                  ? "bg-white shadow font-medium"
                  : "text-gray-600"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="border rounded-lg px-4 py-2 bg-white"
          >
            <option value="">All Locations</option>
            {locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))}
          </select>

          <button
            onClick={handleClear}
            className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100"
          >
            Clear ✕
          </button>
        </div>
      </div>

      {/* ================= TABLE ================= */}
      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_1fr_auto] text-xs font-medium text-gray-500 px-4 py-3 border-b">
        <span>Method Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Tracking Device</span>
        <span>Break Tracking</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3 mt-3">
        {filteredMethods.map((method) => (
          <div
            key={method.id}
            className="bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_2fr_1.5fr_1fr_auto] items-center gap-4"
          >
            <div>
              <p className="font-medium text-sm">{method.name}</p>
              <p className="text-xs text-gray-500">{method.date}</p>
              <p className="text-xs text-gray-400 mt-1">
                {method.country} - {method.office}
              </p>
            </div>

            <div className="h-9 w-9 flex items-center justify-center rounded-full bg-amber-100 text-amber-700 text-xs font-medium">
              {method.createdBy}
            </div>

            <div>
              {method.assignedCount > 0
                ? `${method.assignedCount} Employees`
                : "No Employee Assigned"}
            </div>

            <div className="flex gap-2 text-lg">
              {method.trackingDevices.map((icon, i) => (
                <span key={i}>{icon}</span>
              ))}
            </div>

            <div>{method.breakTracking ? "☕" : "-"}</div>

            {/* ACTION */}
            <div
              className="flex items-center justify-end gap-2 relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  navigate(
                    `/config/track/Attendance/clock-in-method/edit/${method.id}`
                  )
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✏
              </button>

              <button
                onClick={() =>
                  setOpenMenu(openMenu === method.id ? null : method.id)
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ⋮
              </button>

              {openMenu === method.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={() =>
                      navigate(
                        `/config/track/Attendance/clock-in-method/view/${method.id}`
                      )
                    }
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => handleDelete(method.id)}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[480px] rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1">
              Creating for Which Country
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please select where this policy will be applied.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedOffice("");
                }}
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={applyAll}
                  onChange={() => setApplyAll(!applyAll)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-500">
                  Apply to all offices in this country
                </span>
              </div>
            </div>

            {!applyAll && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Office
                </label>
                <select
                  value={selectedOffice}
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  disabled={!selectedCountry}
                  className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Office</option>
                  {selectedCountry &&
                    locationData[selectedCountry].map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-5 py-2.5 rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleContinue}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}