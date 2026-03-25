import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";

const formatDate = (value) => {
  if (!value) return "-";

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) return value;

  return parsedDate.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getInitials = (value) => {
  if (!value || typeof value !== "string") return "--";

  return value
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
};

const normalizeMethod = (item, index) => {
  const id = item?._id || item?.id || `${index}`;
  const deviceName = item?.deviceName || item?.name || "-";
  const createdByName =
    item?.createdBy?.fullName ||
    item?.createdBy?.name ||
    item?.createdByName ||
    item?.updatedBy?.fullName ||
    "";
  const assignedCount =
    item?.assignedEmployeeCount ??
    item?.assignedCount ??
    item?.employeesCount ??
    0;
  const country =
    item?.country ||
    item?.companyOfficeId?.country?.name ||
    item?.companyOfficeId?.countryName ||
    "-";
  const office =
    item?.office ||
    item?.companyOfficeId?.officeName ||
    item?.companyOfficeId?.name ||
    "-";
  const status =
    item?.isActive === true
      ? "Active"
      : item?.isActive === false
      ? "Draft"
      : item?.status || "Draft";

  const trackingDevices = [
    item?.biometric ? "Biometric" : null,
    item?.webAttendance ? "Web" : null,
    item?.mobileAttendance ? "Mobile" : null,
  ].filter(Boolean);

  return {
    id,
    name: deviceName,
    date: formatDate(item?.createdAt || item?.updatedAt),
    createdBy: getInitials(createdByName || "Admin"),
    assignedCount: Number(assignedCount) || 0,
    trackingDevices,
    breakTracking: Boolean(item?.trackBreak),
    country,
    office,
    status,
  };
};

export default function ClockInMethodList() {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const axiosInstance = React.useMemo(() => createAxios(token), [token]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [methods, setMethods] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    const fetchMethods = async () => {
      try {
        setIsLoading(true);
        const res = await axiosInstance.get("/config/getAll/clock-In-Mehtod", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const list = Array.isArray(res?.data?.data)
          ? res.data.data
          : Array.isArray(res?.data)
          ? res.data
          : [];

        setMethods(list.map((item, index) => normalizeMethod(item, index)));
      } catch (error) {
        console.log("clock in method list error", error);
        setMethods([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMethods();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const locations = [
    ...new Set(methods.map((item) => `${item.country} - ${item.office}`)),
  ];

  const filteredMethods = useMemo(() => {
    let result = methods;

    if (selectedLocation) {
      result = result.filter(
        (item) => `${item.country} - ${item.office}` === selectedLocation
      );
    }

    if (statusFilter) {
      result = result.filter((item) => item.status === statusFilter);
    }

    return result;
  }, [methods, selectedLocation, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this clock-in method?")) {
      setOpenMenu(null);
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      await axiosInstance.delete(`/config/clock-in-method-delete/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setMethods((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to delete clock-in method.");
    } finally {
      setLoading(false);
      setOpenMenu(null);
    }
  };

  const handleClear = () => {
    setSelectedLocation("");
  };

  const handleCreate = () => {
    navigate(
      `/config/track/Attendance/clock-in-method/create?country=${encodeURIComponent(
        selectedCountry
      )}&office=${applyAll ? "ALL" : encodeURIComponent(selectedOffice)}`
    );
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
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
            Clear X
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[2fr_1fr_2fr_1.5fr_1fr_auto] text-xs font-medium text-gray-500 px-4 py-3 border-b">
        <span>Method Name</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Tracking Device</span>
        <span>Break Tracking</span>
        <span className="text-right">Action</span>
      </div>

      <div className="space-y-3 mt-3">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}
        {isLoading ? (
          <div className="bg-white rounded-xl border px-4 py-10 text-center text-sm text-gray-500">
            Loading...
          </div>
        ) : filteredMethods.length === 0 ? (
          <div className="bg-white rounded-xl border px-4 py-10 text-center text-sm text-gray-500">
            Empty
          </div>
        ) : (
          filteredMethods.map((method) => (
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

              <div className="flex gap-2 text-sm flex-wrap">
                {method.trackingDevices.length > 0
                  ? method.trackingDevices.map((device, i) => (
                      <span
                        key={`${method.id}-${device}-${i}`}
                        className="px-2 py-1 rounded bg-gray-100 text-gray-700"
                      >
                        {device}
                      </span>
                    ))
                  : "-"}
              </div>

              <div>{method.breakTracking ? "Yes" : "-"}</div>

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
                  Edit
                </button>

                <button
                  onClick={() =>
                    setOpenMenu(openMenu === method.id ? null : method.id)
                  }
                  className="p-2 rounded-md hover:bg-gray-100"
                >
                  ...
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
                      View
                    </button>

                    <button
                      onClick={() => handleDelete(method.id)}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {showDialog &&
        createPortal(
          <CreateCountryPopup
            onClose={() => setShowDialog(false)}
            onContinue={handleCreate}
          />,
          document.body
        )}
    </div>
  );
}