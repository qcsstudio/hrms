import { useState } from "react";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const EditGrade = () => {
  // Internal state (no props)
  const [gradeName, setGradeName] = useState("Leap Of Faith");

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleUpdate = () => {
    console.log("Updated Grade:", gradeName);
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Grade</h1>
        <p className="text-sm text-gray-500 mt-1">Update grade details.</p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Grade Name</label>
          <input
            type="text"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            className={fieldClassName}
          />
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className={flatSecondaryButtonClassName}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            className={flatPrimaryButtonClassName}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditGrade;
