import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBusinessUnit = () => {
  const navigate = useNavigate();
  const [assignHead, setAssignHead] = useState("yes");
  const [logo, setLogo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
    //   setLogo(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  const handleSave = () => {
    // Save logic here
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Create Business Unit</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      <div className="max-w-3xl space-y-6">

        {/* Business Unit Name */}
        <div>
          <label className="text-sm font-semibold block mb-2">
            Business Unit Name
          </label>
          <input
            type="text"
            placeholder="Choose Account"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold block mb-2">
            Location
          </label>
          <select className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Choose Account</option>
            <option>Mohali Office</option>
            <option>Delhi Office</option>
            <option>Mumbai Office</option>
          </select>
        </div>

        {/* Logo Upload */}
        <div className="border border-dashed rounded-xl p-6 bg-white">
          <div className="flex justify-between mb-4">
            <label className="text-sm font-semibold">
              Business Unit Logo
            </label>
            <span className="text-xs text-gray-400">
              Recommended Size: 280 x 110 px
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Preview Box */}
            <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
              {logo ? (
                <img
                  src={logo}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-xs">Preview</span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Note: Upload photo with max size 2MB for optimum results.
                (Supports .gif, .jpeg, .jpg and .png file types)
              </p>
            </div>

            <label className="bg-blue-600 text-white px-6 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
              Upload
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        {/* Assign Head */}
        <div>
          <label className="text-sm font-semibold block mb-3">
            Do you want to assign a Business Unit Head? (Optional)
          </label>

          {/* YES Option */}
          <div className="border rounded-xl p-4 mb-3 bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                checked={assignHead === "yes"}
                onChange={(e) => setAssignHead(e.target.value)}
              />
              yes
            </label>

            {assignHead === "yes" && (
              <div className="mt-4">
                <label className="text-sm font-semibold block mb-2">
                  Business Unit Head
                </label>
                <select className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Choose Account</option>
                  <option>John Doe</option>
                  <option>Jane Smith</option>
                </select>
              </div>
            )}
          </div>

          {/* NO Option */}
          <div className="border rounded-xl p-4 bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                checked={assignHead === "no"}
                onChange={(e) => setAssignHead(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            onClick={handleCancel}
            className="px-6 py-2 rounded-lg border bg-white hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateBusinessUnit;