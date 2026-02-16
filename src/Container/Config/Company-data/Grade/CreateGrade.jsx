import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGrade = () => {
  const [gradeName, setGradeName] = useState("");

  const handleCancel = () => {
    console.log("Cancelled");
    setGradeName("");
  };

  const handleSave = () => {
    if (!gradeName.trim()) {
      alert("Grade name is required");
      return;
    }

    console.log("New Grade:", gradeName);
    setGradeName("");
  };

  const navigate = useNavigate()

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Create Grade
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
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
            placeholder="Enter Grade Name"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            // onClick={handleCancel}
            onClick={()=>navigate('/config/hris/Company_data/grade')}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>

      </div>
    </div>
  );
};

export default CreateGrade;