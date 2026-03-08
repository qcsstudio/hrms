import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";

const initialCategories = [
  {
    id: 1,
    name: "Desktop",
    description: "No Employee Assigned",
    assetType: "Physical",
    status: "active",
    country: "India",
    location: "Bangalore",
  },
  {
    id: 2,
    name: "Laptop",
    description: "No Employee Assigned",
    assetType: "Physical",
    status: "active",
    country: "USA",
    location: "New York",
  },
];

const countries = ["India", "USA"];

const locationData = {
  India: ["Bangalore", "Delhi"],
  USA: ["New York", "San Francisco"],
};

const AssetsCategory = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("active");
  const [categories] = useState(initialCategories);

  // location filter
  const [selectedLocation, setSelectedLocation] = useState("");

  // country modal state
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const locations = Array.from(
    new Set(categories.map((c) => c.location))
  );

  const handleClear = () => {
    setSelectedLocation("");
  };

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/hrops/assets-category/create", {
      state: {
        country: selectedCountry,
        office: applyAll ? "ALL" : selectedOffice,
      },
    });
  };

  const filtered = categories.filter((c) => {
    if (activeTab === "active" && c.status !== "active") return false;
    if (activeTab === "draft" && c.status !== "draft") return false;
    if (selectedLocation && c.location !== selectedLocation) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-muted/30 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-1">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Create Assets Category
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage employee directory, documents, and role-based actions.
            </p>
          </div>
          <button
            onClick={() => setShowCountryDialog(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Create +
          </button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex rounded-full border border-border bg-background overflow-hidden">
            {["active", "draft", "me"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  activeTab === tab
                    ? "bg-background text-foreground shadow-sm border border-border rounded-full"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "me" ? "Me" : tab}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded-lg px-4 py-2"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc}>{loc}</option>
              ))}
            </select>

            <button
              onClick={handleClear}
              className="border px-4 py-2 rounded-lg"
            >
              Clear ✕
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 px-6 py-3 text-sm font-medium text-muted-foreground border-b border-dashed border-border">
          <span>Category Name</span>
          <span>Description</span>
          <span>Asset Type</span>
          <span>Location</span>
          <span className="text-right">Action</span>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-3 mt-3">
          {filtered.map((cat) => (
            <div
              key={cat.id}
              className="grid grid-cols-[1fr_1fr_1fr_1fr_auto] gap-4 items-center px-6 py-5 bg-background rounded-xl border border-border"
            >
              <span className="text-sm font-medium">{cat.name}</span>
              <span className="text-sm text-muted-foreground">
                {cat.description}
              </span>
              <span className="text-sm">{cat.assetType}</span>
              <span className="text-sm">{cat.location}</span>

              <div className="flex items-center gap-2 justify-end">
                <button className="p-1.5 rounded-md hover:bg-muted/50">✏️</button>
                <button className="p-1.5 rounded-md hover:bg-muted/50">⋮</button>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No categories found.
            </div>
          )}
        </div>
      </div>

      {/* Country / Office Modal */}
      {showCountryDialog && createPortal(
      <CreateCountryPopup onClose={()=>setShowCountryDialog(false)} onContinue={handleCreate}/>,document.body)
 
      }
    </div>
  );
};

export default AssetsCategory;