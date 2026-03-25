
import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

export default function ClockInMethodEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState({
    deviceName: "",
    description: "",
    clockType: "only",
    trackBreak: "no",
    breakHrs: "0",
    breakMins: "0",
    hybrid: "no",
    biometric: "no",
    directionalDevice: "no",
    webAttendance: "no",
    ipRestriction: "no",
    mobileAttendance: "yes",
    gpsAttendance: "no",
    companyOfficeId: [],
    isActive: true,
  });

  useEffect(() => {
    const fetchClockInMethod = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get(`/config/getOne/clock-In-Method/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });
        const data = res?.data?.data || {};
        setForm({
          deviceName: data.deviceName || "",
          description: data.description || "",
          clockType: data.clockType || "only",
          trackBreak: data.trackBreak ? "yes" : "no",
          breakHrs: data.breakDuration?.hours?.toString() || "0",
          breakMins: data.breakDuration?.minutes?.toString() || "0",
          hybrid: data.hybrid ? "yes" : "no",
          biometric: data.biometric ? "yes" : "no",
          directionalDevice: data.directionalDevice ? "yes" : "no",
          webAttendance: data.webAttendance ? "yes" : "no",
          ipRestriction: data.ipRestriction ? "yes" : "no",
          mobileAttendance: data.mobileAttendance ? "yes" : "no",
          gpsAttendance: data.gpsAttendance ? "yes" : "no",
          companyOfficeId: data.companyOfficeId || [],
          isActive: data.isActive !== false,
        });
      } catch (error) {
        setErrorMessage(error?.response?.data?.message || "Unable to fetch clock-in method.");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchClockInMethod();
  }, [id, token]);

  const buildPayload = () => ({
    deviceName: form.deviceName.trim(),
    description: form.description.trim(),
    clockType: form.clockType,
    trackBreak: form.trackBreak === "yes",
    breakDuration: {
      hours: form.trackBreak === "yes" ? Number(form.breakHrs || 0) : 0,
      minutes: form.trackBreak === "yes" ? Number(form.breakMins || 0) : 0,
    },
    hybrid: form.hybrid === "yes",
    biometric: form.biometric === "yes",
    directionalDevice: form.biometric === "yes" ? form.directionalDevice === "yes" : false,
    webAttendance: form.webAttendance === "yes",
    ipRestriction: form.ipRestriction === "yes",
    mobileAttendance: form.mobileAttendance === "yes",
    gpsAttendance: form.gpsAttendance === "yes",
    companyOfficeId: form.companyOfficeId,
    isActive: form.isActive !== false,
  });

  const handleUpdate = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      await axiosInstance.put(`/config/clock-in-method-update/${id}`, buildPayload(), {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/track/Attendance/clock-in-method/list");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to update clock-in method.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this clock-in method?")) return;
    setLoading(true);
    setErrorMessage("");
    try {
      await axiosInstance.delete(`/config/clock-in-method-delete/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/track/Attendance/clock-in-method/list");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || "Unable to delete clock-in method.");
    } finally {
      setLoading(false);
    }
  };

  // ...existing UI code, replace mockMethods usage with form state
  return (
    <div className="max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-2">Edit Clock-in Method</h1>
      <p className="text-sm text-gray-500 mb-6">
        Manage employee directory, documents, and role-based actions.
      </p>

      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      {errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}

      <div className="space-y-6">
        {/* Device Name */}
        <div>
          <label className="block font-medium mb-1">Device Name</label>
          <input
            type="text"
            value={form.deviceName}
            onChange={(e) => setForm({ ...form, deviceName: e.target.value })}
            className="w-full border rounded-lg px-3 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-medium mb-1">
            Internal description for admins
          </label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
          />
        </div>

        {/* Clock Type */}
        <div>
          <label className="block font-medium mb-2">
            Clock Type
          </label>
          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="both"
                checked={form.clockType === "both"}
                onChange={(e) => setForm({ ...form, clockType: e.target.value })}
              />
              <span className="ml-2">
                Clock-in and clock-out required
              </span>
            </div>
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="only"
                checked={form.clockType === "only"}
                onChange={(e) => setForm({ ...form, clockType: e.target.value })}
              />
              <span className="ml-2">Only Clock-in required</span>
            </div>
          </div>
        </div>

        {/* Track Break */}
        <div>
          <label className="block font-medium mb-2">
            Track break duration?
          </label>
          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="yes"
                checked={form.trackBreak === "yes"}
                onChange={(e) => setForm({ ...form, trackBreak: e.target.value })}
              />
              <span className="ml-2">Yes</span>
            </div>
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="no"
                checked={form.trackBreak === "no"}
                onChange={(e) => setForm({ ...form, trackBreak: e.target.value })}
              />
              <span className="ml-2">No</span>
            </div>
          </div>
        </div>

        {/* Break Time */}
        {form.trackBreak === "yes" && (
          <div>
            <label className="block font-medium mb-2">
              Break Time
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                value={form.breakHrs}
                onChange={(e) => setForm({ ...form, breakHrs: e.target.value })}
                className="w-24 border rounded-lg px-3 py-2"
              />
              <span className="self-center">Hrs</span>
              <input
                type="number"
                value={form.breakMins}
                onChange={(e) => setForm({ ...form, breakMins: e.target.value })}
                className="w-24 border rounded-lg px-3 py-2"
              />
              <span className="self-center">Mins</span>
            </div>
          </div>
        )}

        {/* Biometric */}
        <div>
          <label className="block font-medium mb-2">
            Enable biometric attendance?
          </label>
          <div className="space-y-2">
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="yes"
                checked={form.biometric === "yes"}
                onChange={(e) => setForm({ ...form, biometric: e.target.value })}
              />
              <span className="ml-2">Yes</span>
            </div>
            <div className="border rounded-lg px-4 py-2 flex items-center">
              <input
                type="radio"
                value="no"
                checked={form.biometric === "no"}
                onChange={(e) => setForm({ ...form, biometric: e.target.value })}
              />
              <span className="ml-2">No</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t">
          <button
            onClick={() => navigate("/config/track/Attendance/clock-in-method/list")}
            className="px-4 py-2 border rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-6 py-2 bg-black text-white rounded-full"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white rounded-full"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}