import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProbation() {
  const navigate = useNavigate();

  const [earlyConfirm, setEarlyConfirm] = useState("no");
  const [autoChange, setAutoChange] = useState("no");
  const [notify, setNotify] = useState("no");
  const [duration, setDuration] = useState("");

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create Probation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Form */}
        <div className="space-y-6">

          {/* Policy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Policy Name
            </label>
            <input
              type="text"
              placeholder="Choose Account"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Lets write a brief description about this policy
            </label>
            <textarea
              rows={4}
              placeholder="Choose Account"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What will be the initial Probation Duration for this Plan?
            </label>

            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Account</option>
              <option value="30">30 Days</option>
              <option value="60">60 Days</option>
              <option value="90">90 Days</option>
              <option value="180">180 Days</option>
            </select>
          </div>

          {/* Early Confirmation */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Is early employee confirmation allowed?
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={earlyConfirm === "yes"}
                  onChange={() => setEarlyConfirm("yes")}
                />
                <span className="text-sm">Yes</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={earlyConfirm === "no"}
                  onChange={() => setEarlyConfirm("no")}
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          {/* Auto Change Status */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Do you want employee's status to automatically change from ON-Probation to Confirmed when their Probation period is over?
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={autoChange === "yes"}
                  onChange={() => setAutoChange("yes")}
                />
                <span className="text-sm">Yes</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={autoChange === "no"}
                  onChange={() => setAutoChange("no")}
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>

          {/* Notify */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Do you want to notify employee?
            </p>

            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  checked={notify === "no"}
                  onChange={() => setNotify("no")}
                />
                <span className="text-sm">No</span>
              </label>
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-between mt-10 pt-5 border-t border-gray-200">

          <button className="px-5 py-2.5 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition">
            Save as Draft
          </button>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/config/hris/Employee-data/probation-list")}
              className="px-5 py-2.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button className="px-6 py-2.5 text-sm rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
              Save
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
