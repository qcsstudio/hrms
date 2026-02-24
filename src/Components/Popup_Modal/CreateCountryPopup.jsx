import React from "react";

const CreateCountryPopup = ({ onClose, onContinue }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal */}
      <div className="w-full max-w-xl rounded-xl bg-white shadow-lg">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Creating for Which Country
            </h2>
            <p className="text-sm text-gray-500">
              Please select where this policy will be applied.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5">
          {/* Select Country */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Select Country
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Choose Account</option>
            </select>

            <div className="mt-2 flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
              />
              <span className="text-sm text-gray-600">
                Apply to all offices in this country
              </span>
            </div>
          </div>

          {/* Select Office */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-800">
              Select Office
            </label>
            <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Choose Account</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={onContinue}
            className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCountryPopup;