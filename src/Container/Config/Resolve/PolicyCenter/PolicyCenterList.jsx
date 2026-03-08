import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";

const avatarUrl =
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face";

const initialPolicies = [
  { id: 1, name: "Employee Handbook", createdBy: "Admin" },
  { id: 2, name: "Leave Policy", createdBy: "Admin" },
  { id: 3, name: "Employee Handbook", createdBy: "Admin" },
];

// country / office data
const countries = ["India", "USA", "UK"];
const locationData = {
  India: ["Bangalore", "Delhi"],
  USA: ["New York", "San Francisco"],
  UK: ["London"],
};

const tabs = ["All", "Active", "Archive"];
const locations = ["India", "USA", "UK"];

const PolicyCenter = () => {
  const navigate = useNavigate();

  // existing state
  const [tab, setTab] = useState("All");
  const [policies] = useState(initialPolicies);

  // filter state
  const [selectedLocation, setSelectedLocation] = useState("");

  // dialog state
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const handleClear = () => {
    setTab("All");
    setSelectedLocation("");
  };

  const handleCreate = () => {
    setShowCountryDialog(false);
    navigate("/config/resolve/policy-center/create");
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-foreground">Policy center</h1>
          <p className="text-sm text-muted-foreground">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* CREATE BUTTON – background color OK */}
        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
          {/* {/* <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          > */}

        </button>
      </div>

      {/* Tabs + Filters */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex border rounded-md overflow-hidden">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium ${tab === t
                  ? "bg-muted text-foreground"
                  : "text-muted-foreground hover:bg-muted/50"
                }`}
            >
              {t}
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

      {/* Table header */}
      <div className="grid grid-cols-[1fr_200px_100px] gap-4 px-5 py-3 text-sm text-muted-foreground font-medium border-b">
        <span>Policy Name</span>
        <span>Created By</span>
        <span className="text-right">Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-3 mt-3">
        {policies.map((policy) => (
          <div
            key={policy.id}
            className="grid grid-cols-[1fr_200px_100px] gap-4 items-center px-5 py-4 border rounded-lg bg-background hover:shadow-sm transition-shadow"
          >
            <span className="text-sm font-medium">{policy.name}</span>
            <img
              src={avatarUrl}
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex justify-end gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground">
                ✎
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-muted text-muted-foreground">
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* COUNTRY SELECT POPUP */}
      {showCountryDialog && createPortal(
        <CreateCountryPopup onClose={() => setShowCountryDialog(false)} onContinue={handleCreate} />,document.body)

      }
    </div>
  );
};

export default PolicyCenter;