import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditBusinessUnit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If data passed via navigate state
  const data = location.state || {
    name: "Leap Of Faith",
    location: "Mohali Office",
    head: "John Doe",
  };

  const [name, setName] = useState(data.name);
  const [unitLocation, setUnitLocation] = useState(data.location);
  const [assignHead, setAssignHead] = useState(data.head ? "yes" : "no");
  const [head, setHead] = useState(data.head || "");
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

  const handleUpdate = () => {
    // Update logic here
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold">Edit Business Unit</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update business unit details.
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
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Location */}
        <div>
          <label className="text-sm font-semibold block mb-2">
            Location
          </label>
          <select
            value={unitLocation}
            onChange={(e) => setUnitLocation(e.target.value)}
            className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
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

          {/* YES */}
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
                <select
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Account</option>
                  <option value="John Doe">John Doe</option>
                  <option value="Jane Smith">Jane Smith</option>
                </select>
              </div>
            )}
          </div>

          {/* NO */}
          <div className="border rounded-xl p-4 bg-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                checked={assignHead === "no"}
                onChange={(e) => {
                  setAssignHead(e.target.value);
                  setHead("");
                }}
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
            onClick={handleUpdate}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessUnit;