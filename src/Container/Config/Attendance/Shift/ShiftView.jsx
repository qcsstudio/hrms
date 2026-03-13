import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { getShiftCount, toShiftViewModel } from "./shiftApiUtils";

export default function ShiftView() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("authToken");
  const axiosInstance = createAxios(token);

  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchShift = async () => {
      setLoading(true);
      setErrorMessage("");
      try {
        const res = await axiosInstance.get(`/config/getOne-shift/${id}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const raw = res?.data?.data || res?.data?.result || res?.data || {};
        setShift(toShiftViewModel(raw));
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

  const shiftCount = useMemo(() => getShiftCount(shift?.shiftsPerDay || "one"), [shift]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen max-w-6xl">
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
        {loading && <div className="text-sm text-gray-500">Loading shift...</div>}
        {!loading && errorMessage && <div className="text-sm text-red-600">{errorMessage}</div>}

        {!loading && !errorMessage && shift && (
          <>
            <div>
              <p className="text-sm text-gray-500">Shift Name</p>
              <p className="font-medium text-lg">{shift.title || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Internal Description</p>
              <p className="font-medium">{shift.description || "-"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Shifts Per Day</p>
              <p className="font-medium capitalize">{shift.shiftsPerDay} Shift</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Shift Category</p>
              <p className="font-medium">{shift.shiftCategory || "General"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Flexible Shift</p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  shift.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                }`}
              >
                {shift.isActive ? "Active" : "Draft"}
              </span>
            </div>

            <div
              className={`grid gap-8 ${
                shiftCount === 1 ? "grid-cols-1 max-w-xl" : shiftCount === 2 ? "grid-cols-2" : "grid-cols-3"
              }`}
            >
              {shift.shiftTimings.slice(0, shiftCount).map((time, i) => (
                <div key={i} className="border rounded-lg p-4 bg-gray-50 space-y-3">
                  <h2 className="font-semibold text-lg">
                    {i === 0 ? "First Shift" : i === 1 ? "Second Shift" : "Third Shift"}
                  </h2>

                  <div>
                    <p className="text-sm text-gray-500">Start Time</p>
                    <p className="font-medium">{time.startTime || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">End Time</p>
                    <p className="font-medium">{time.endTime || "-"}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Start-off</p>
                    <p className="font-medium">
                      {time.startOff?.hours ?? 0} Hrs {time.startOff?.minutes ?? 0} Mins
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Cut-off</p>
                    <p className="font-medium">
                      {time.cutOff?.hours ?? 0} Hrs {time.cutOff?.minutes ?? 0} Mins
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

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
