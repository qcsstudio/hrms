import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";

const ShiftList = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  /* ================= STATES ================= */
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [shifts, setShifts] = useState([
    {
      id: 1,
      name: "Morning Shift",
      date: "12 Jun 2025 11:10 AM",
      assignedCount: 15,
      time: "8:00AM to 6:30PM",
      country: "India",
      office: "HeadOffice",
      status: "Active",
    },
    {
      id: 2,
      name: "Night Shift",
      date: "15 Jun 2025 10:00 AM",
      assignedCount: 0,
      time: "9:00PM to 6:00AM",
      country: "USA",
      office: "Branch1",
      status: "Draft",
    },
    {
      id: 3,
      name: "General Shift",
      date: "20 Jun 2025",
      assignedCount: 8,
      time: "10:00AM to 7:00PM",
      country: "India",
      office: "Branch1",
      status: "Active",
    },
  ]);

  const locationData = {
    India: ["HeadOffice", "Branch1"],
    USA: ["Branch1"],
  };

  const countries = Object.keys(locationData);

  /* ================= OUTSIDE CLICK CLOSE ================= */
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

  /* ================= UNIQUE LOCATIONS ================= */
  const locations = [
    ...new Set(shifts.map((s) => `${s.country} - ${s.office}`)),
  ];

  /* ================= FILTER ================= */
  const filteredShifts = useMemo(() => {
    let result = shifts;

    if (selectedLocation) {
      result = result.filter(
        (shift) => `${shift.country} - ${shift.office}` === selectedLocation
      );
    }

    if (statusFilter) {
      result = result.filter((shift) => shift.status === statusFilter);
    }

    return result;
  }, [shifts, selectedLocation, statusFilter]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    setShifts((prev) => prev.filter((item) => item.id !== id));
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
      `/config/track/Attendance/shift/create?country=${encodeURIComponent(
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
          <h1 className="text-2xl font-semibold">Shift Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage shifts location wise.
          </p>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* ================= STATUS + FILTER ================= */}
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

      {/* ================= TABLE HEADER ================= */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Shift Name</div>
        <div>Country</div>
        <div>Office</div>
        <div>Employees</div>
        <div>Time</div>
        <div className="text-right">Action</div>
      </div>

      {/* ================= SHIFT LIST ================= */}
      <div className="space-y-4 mt-4">
        {filteredShifts.map((shift) => (
          <div
            key={shift.id}
            className="bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center"
          >
            <div>
              <p className="font-medium">{shift.name}</p>
              <p className="text-xs text-gray-400">{shift.date}</p>
            </div>

            <div>{shift.country}</div>
            <div>{shift.office}</div>
            <div>{shift.assignedCount}</div>
            <div>{shift.time}</div>

            {/* ================= ACTION WITH 3 DOT ================= */}
            <div
              className="flex items-center justify-end gap-2 relative"
              ref={dropdownRef}
            >
              <button
                onClick={() =>
                  navigate(
                    `/config/track/Attendance/shift/edit/${shift.id}`
                  )
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✏
              </button>

              <button
                onClick={() =>
                  setOpenMenu(openMenu === shift.id ? null : shift.id)
                }
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ⋮
              </button>

              {openMenu === shift.id && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-md shadow-md z-10">
                  <button
                    onClick={() =>
                      navigate(
                        `/config/track/Attendance/shift/view/${shift.id}`
                      )
                    }
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => handleDelete(shift.id)}
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
      {showDialog && 
      <CreateCountryPopup onClose={()=>setShowDialog(false)}/>
      }
    </div>
  );
};

export default ShiftList;