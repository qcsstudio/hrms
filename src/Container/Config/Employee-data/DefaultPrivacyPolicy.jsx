import React from "react";

const permissionFields = [
  ["Personal Data", "About"],
  ["Address", "Contact"],
  ["Biodata", "Important Dates"],
  ["Dependents", "Medical"],
  ["Identity", "Banking"],
  ["Skills", "Language"],
  ["Work Experience Details", "Education Details"],
  ["Documents", null],
];

export default function DefaultPrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Set Permissions</h1>
          <p className="text-sm text-gray-500">
            Configure access permissions for employee data fields
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-5 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          {permissionFields.map(([left, right], i) => (
            <React.Fragment key={i}>
              {left && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {left}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Choose Account</option>
                    <option value="india">India</option>
                    <option value="all">All</option>
                  </select>
                </div>
              )}

              {right && (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                    {right}
                  </label>
                  <select
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue=""
                  >
                    <option value="" disabled>Choose Account</option>
                    <option value="india">India</option>
                    <option value="all">All</option>
                  </select>
                </div>
              )}

              {left && !right && <div />}
            </React.Fragment>
          ))}
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button className="px-5 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100 transition">
            Cancel
          </button>
          <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 transition">
            Save Permissions
          </button>
        </div>
      </div>
    </div>
  );
}
