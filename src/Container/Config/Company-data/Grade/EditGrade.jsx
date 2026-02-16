import { useState } from "react";

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
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Edit Grade
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update grade details.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 max-w-2xl">
        
        {/* Grade Name */}
        <div>
          <label className="text-sm font-semibold">
            Grade Name
          </label>
          <input
            type="text"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditGrade;