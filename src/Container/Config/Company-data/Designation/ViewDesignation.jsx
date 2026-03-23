import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";

const token = localStorage.getItem("authToken");
const axiosInstance = createAxios(token);

const ViewDesignation = ({ onBack, data }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [designationData, setDesignationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ── Fetch getOne designation on mount
  useEffect(() => {
    const fetchDesignation = async () => {
      if (data) {
        setDesignationData(data);
        return;
      }

      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await axiosInstance.get(`/config/getOne-designation/${id}`);
        const result = response.data;
        const fetched = result?.data || result?.designation || result;
        setDesignationData(fetched);
      } catch (err) {
        console.error("Error fetching designation:", err);
        setError(err.message || "Failed to load designation data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDesignation();
  }, [id, data]);

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    navigate("/config/hris/Company_data/designation");
  };

  const designationName = designationData?.designationName || designationData?.name || "—";
  const departmentName  = designationData?.departmentName || designationData?.linkedDept || "—";
  const isPartOfDept    = designationData?.isPartOfDepartment;

  return (
    <div className="p-8 mx-auto">
      {/* Header — same as EditDesignation */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">View Designation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-sm text-gray-500 mb-4">Loading designation data...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-sm text-red-500 mb-4 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      {/* Card — same structure as EditDesignation */}
      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">

        {/* Designation Name — read-only field box */}
        <div>
          <label className="text-sm font-medium text-gray-700">Designation Name</label>
          <div className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-gray-50">
            {designationName}
          </div>
        </div>

        {/* Is Part of Department — read-only radio style */}
        <div>
          <p className="text-sm font-medium text-gray-700">
            Is this Job Title only a part of specific functional Department?
          </p>

          <div className="mt-3 space-y-3">
            {/* Yes card */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${isPartOfDept ? "border-blue-500" : "border-gray-300"}`}>
                {isPartOfDept && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              <span className="text-sm text-gray-700">Yes</span>
            </div>

            {/* Department field — only shown if isPartOfDept is true */}
            {isPartOfDept && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Department</label>
                <div className="mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-gray-50 px-4 text-sm text-gray-900 flex items-center">
                  {departmentName}
                </div>
              </div>
            )}

            {/* No card */}
            <div className="border border-gray-200 rounded-lg p-4 bg-white flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${!isPartOfDept ? "border-blue-500" : "border-gray-300"}`}>
                {!isPartOfDept && <div className="w-2 h-2 rounded-full bg-blue-500" />}
              </div>
              <span className="text-sm text-gray-700">No</span>
            </div>
          </div>
        </div>

        {/* Back button — same position as Cancel/Update in EditDesignation */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleBack}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewDesignation;