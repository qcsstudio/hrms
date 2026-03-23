import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const ViewDepartment = ({ onBack }) => {
  const { id: paramId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  // id can come from useParams (:id in route) OR location.state.id (passed via navigate)
  const id = paramId || location.state?.id || location.state?.department?._id || null;
  // No token — this endpoint does not require auth
  const axiosInstance = createAxios(null);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Fetch department by id from useParams ────────────────────────────────
  useEffect(() => {
    if (!id) return;
    const fetchDepartment = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/config/getOne-department/${id}`);
        setData(response?.data?.data || null);
      } catch (err) {
        console.error("Error fetching department:", err);
        setError("Failed to load department.");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [id]);

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    navigate(-1);
  };

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-sm">Loading...</p>
      </div>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !data) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-red-500 text-sm">{error || "No data found."}</p>
      </div>
    );
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">View Department</h1>
        <p className="text-sm text-gray-500 mt-1">Department details</p>
      </div>

      {/* Card */}
      <div className="max-w-2xl bg-white border rounded-lg p-6 space-y-5">

        {/* Department Name */}
        <div>
          <p className="text-xs text-gray-500">Department Name</p>
          <p className="font-medium mt-1">{data.departmentName || "-"}</p>
        </div>

        {/* Linked Business Unit */}
        <div>
          <p className="text-xs text-gray-500">Linked Business Unit</p>
          <p className="mt-1">{data.businessUnitId || "-"}</p>
        </div>

        {/* Parent Department */}
        {data.isSubDepartment && (
          <div>
            <p className="text-xs text-gray-500">Parent Department</p>
            <p className="mt-1">{data.parentDepartmentName || "-"}</p>
          </div>
        )}

        {/* Department Head */}
        <div>
          <p className="text-xs text-gray-500">Department Head</p>
          <p className="mt-1">{data.departmentHead || "-"}</p>
        </div>

        {/* Created By */}
        <div>
          <p className="text-xs text-gray-500">Created By</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-medium">
              {data.addedById ? String(data.addedById).charAt(0).toUpperCase() : "U"}
            </div>
            <span>{data.addedById || "-"}</span>
          </div>
        </div>

        {/* Created On */}
        <div>
          <p className="text-xs text-gray-500">Created On</p>
          <p className="mt-1">
            {data.createdAt
              ? new Date(data.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "-"}
          </p>
        </div>

        {/* Assigned Employees */}
        <div>
          <p className="text-xs text-gray-500">Assigned Employees</p>
          {data.assignedEmployeeList && data.assignedEmployeeList.length > 0 ? (
            <div className="flex -space-x-2 mt-2">
              {data.assignedEmployeeList.slice(0, 5).map((emp, index) => (
                <div
                  key={index}
                  className="w-8 h-8 rounded-full bg-gray-300 border flex items-center justify-center text-xs font-medium"
                >
                  {emp?.name ? emp.name.charAt(0).toUpperCase() : "?"}
                </div>
              ))}
              {data.assignedEmployeeList.length > 5 && (
                <div className="w-8 h-8 rounded-full bg-black text-white border flex items-center justify-center text-xs">
                  +{data.assignedEmployeeList.length - 5}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-400 mt-1">No employees assigned</p>
          )}
        </div>

        {/* Back Button */}
        <div className="flex justify-end pt-4">
          <button
            onClick={handleBack}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDepartment;