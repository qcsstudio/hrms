import React from "react";
import { useNavigate } from "react-router-dom";

const CreateExitReason = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Create Exit Reason</h1>
          <p className="text-sm text-gray-500">Add a new exit reason for employees</p>
        </div>

        <div className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Exit Type
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              defaultValue=""
            >
              <option value="" disabled>Choose Type</option>
              <option value="resignation">Resignation</option>
              <option value="termination">Termination</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={() => navigate("/config/hris/Employee-data/Exit-reason")}
            className="px-5 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateExitReason;
