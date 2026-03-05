import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AssetsCategoryCreate = () => {
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState("");
  const [assetName, setAssetName] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [assetType, setAssetType] = useState("physical");
  const [acknowledgement, setAcknowledgement] = useState("no");
  const [warranty, setWarranty] = useState("no");

  const handleSave = () => {
    navigate("/config/hrOps/hrops-assests/list");
  };

  /* 🔵 Reusable Radio Card */
  const RadioCard = ({ selected, onClick, label, subtitle }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      {/* Radio Circle */}
      <span
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selected ? "border-blue-500" : "border-gray-400"}
        `}
      >
        {selected && (
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        )}
      </span>

      {/* Text */}
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold mb-1">Add New Category</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Manage employee directory, documents, and role-based actions.
          </p>

          {/* Category Name */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Choose Account"
              className="w-full px-4 py-2.5 rounded-lg border"
            />
          </div>

          {/* Asset Name / Brand / Condition */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <input
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              placeholder="Asset Name"
              className="px-4 py-2.5 rounded-lg border"
            />
            <input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="px-4 py-2.5 rounded-lg border"
            />
            <select
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="px-4 py-2.5 rounded-lg border"
            >
              <option value="">Condition</option>
              <option value="new">New</option>
              <option value="used">Used</option>
              <option value="refurbished">Refurbished</option>
            </select>
          </div>

          {/* Description */}
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Details of the assets"
            rows={4}
            className="w-full px-4 py-3 rounded-lg border mb-8"
          />

          {/* Asset Type */}
          <div className="mb-8 space-y-3">
            <RadioCard
              selected={assetType === "physical"}
              onClick={() => setAssetType("physical")}
              label="Physical"
              subtitle="Any material object like laptops, notebooks, test tubes."
            />
            <RadioCard
              selected={assetType === "digital"}
              onClick={() => setAssetType("digital")}
              label="Digital"
              subtitle="Any software, application, or license."
            />
          </div>

          {/* Acknowledgement */}
          <div className="mb-8">
            <label className="block text-sm font-semibold mb-3">
              Acknowledgement Required?
            </label>
            <div className="space-y-3">
              <RadioCard
                selected={acknowledgement === "yes"}
                onClick={() => setAcknowledgement("yes")}
                label="Yes"
              />
              <RadioCard
                selected={acknowledgement === "no"}
                onClick={() => setAcknowledgement("no")}
                label="No"
              />
            </div>
          </div>

          {/* Warranty */}
          <div className="mb-10">
            <label className="block text-sm font-semibold mb-3">
              Are assets under this category covered under warranty?
            </label>
            <div className="space-y-3">
              <RadioCard
                selected={warranty === "yes"}
                onClick={() => setWarranty("yes")}
                label="Yes"
              />
              <RadioCard
                selected={warranty === "no"}
                onClick={() => setWarranty("no")}
                label="No"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-10 border-t pt-6">
            <button
              onClick={() => navigate("/assets-category")}
              className="px-6 py-2.5 border rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsCategoryCreate;