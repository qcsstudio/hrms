import React, { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";
import createAxios from "../../../../utils/axios.config";
import { formatTimeRange } from "./shiftApiUtils";

const ShiftList = () => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  /* ================= STATES ================= */
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [showDialog, setShowDialog] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [shifts, setShifts] = useState([]);

  const formatDate = (date) => {
    if (!date) return "-";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return "-";

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const normalizeListResponse = (payload) => {
    if (Array.isArray(payload?.data)) return payload.data;
    if (Array.isArray(payload?.result)) return payload.result;
    if (Array.isArray(payload?.shifts)) return payload.shifts;
    if (Array.isArray(payload)) return payload;
    return [];
  };

  const getShiftLocation = (shift) => {
    const offices = shift?.companyOfficeId;
    const officeObj = Array.isArray(offices) ? offices[0] : offices;

    if (officeObj && typeof officeObj === "object") {
      const country =
        typeof officeObj.country === "string"
          ? officeObj.country
          : officeObj?.country?.name || officeObj?.countryName || "-";

      const office =
        officeObj?.officeName ||
        officeObj?.name ||
        officeObj?.office ||
        "-";

      return { country, office };
    }

    return {
      country: shift?.country || "-",
      office: shift?.office || "-",
    };
  };

  const loadShifts = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const res = await axiosInstance.get("/config/getAll-create", {
        meta: { auth: "ADMIN_AUTH" },
      });

      const records = normalizeListResponse(res?.data);
      const mapped = records.map((shift) => {
        const { country, office } = getShiftLocation(shift);
        const employees = Array.isArray(shift?.assignedEmployees)
          ? shift.assignedEmployees.length
          : Number(shift?.assignedCount || 0);

        return {
          id: shift?._id || shift?.id,
          name: shift?.title || shift?.name || "-",
          date: formatDate(shift?.updatedAt || shift?.createdAt),
          assignedCount: Number.isFinite(employees) ? employees : 0,
          time: formatTimeRange(shift?.shiftTimings || shift?.times || []),
          country,
          office,
          status: shift?.isActive ? "Active" : "Draft",
        };
      });

      setShifts(mapped);
    } catch (error) {
      setErrorMessage(
        error?.response?.data?.message || "Unable to fetch shift list."
      );
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    loadShifts();
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
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/config/delete-shift/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setShifts((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert(error?.response?.data?.message || "Unable to delete shift.");
    }
    setOpenMenu(null);
  };

  /* ================= CLEAR ================= */
  const handleClear = () => {
    setSelectedLocation("");
  };

  /* ================= CONTINUE ================= */
  const handleCreate = ({ country, office, applyAll }) => {
    navigate(
      `/config/track/Attendance/shift/create?country=${encodeURIComponent(
        country
      )}&office=${applyAll ? "ALL" : encodeURIComponent(office || "")}`
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
        {loading && <div className="text-sm text-gray-500">Loading shifts...</div>}

        {!loading && errorMessage && (
          <div className="text-sm text-red-600">{errorMessage}</div>
        )}

        {!loading && !errorMessage && filteredShifts.length === 0 && (
          <div className="text-sm text-gray-500">No shift found.</div>
        )}

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
      createPortal(<CreateCountryPopup onClose={()=>setShowDialog(false)} onContinue={handleCreate}/>,document.body)
      }
    </div>
  );
};

export default ShiftList;