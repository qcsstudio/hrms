import { useState } from "react";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";

/* -------------------- Mock Data -------------------- */
const availableNames = ["Vishal", "Pankaj", "Rohit", "Yogesh", "Tanya"];

const countries = ["India", "USA", "UK"];

const locationData = {
  India: ["Delhi Office", "Mumbai Office"],
  USA: ["New York Office", "San Francisco Office"],
  UK: ["London Office"],
};

const locations = ["Delhi", "Mumbai", "New York", "London"];

/* -------------------- Component -------------------- */
const CurrencyConversion = () => {
  const [currencies, setCurrencies] = useState([
    { id: 1, name: "U.S Dollar", symbol: "$", rate: "90.60" },
  ]);

  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  /* -------- Filters -------- */
  const [selectedLocation, setSelectedLocation] = useState("");
  const [statusFilter, setStatusFilter] = useState("Active");

  /* -------------------- Functions -------------------- */
  const toggleTag = (name) => {
    setSelectedTags((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };

  const handleContinue = () => {
    if (!selectedCountry) {
      alert("Please select country");
      return;
    }
    if (!applyAll && !selectedOffice) {
      alert("Please select office");
      return;
    }

    setShowCountryDialog(false);
    setShowDrawer(true); // ✅ OPEN RIGHT DRAWER
  };

  const handleSubmit = () => {
    setCurrencies((prev) => [
      ...prev,
      ...selectedTags.map((tag, i) => ({
        id: Date.now() + i,
        name: tag,
        symbol: "¤",
        rate: "0.00",
      })),
    ]);

    setSelectedTags([]);
    setSearch("");
    setShowDrawer(false);
  };

  const handleClear = () => {
    setSelectedLocation("");
    setStatusFilter("Active");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="relative p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold">Currency Conversion</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="px-5 py-2 bg-blue-600 text-white rounded-md"
        >
          Add Currency +
        </button>
      </div>

      {/* ---------------- Status Tabs + Location Filter ---------------- */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
          {["Active", "Draft"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-4 py-1.5 text-sm rounded-md ${
                statusFilter === tab
                  ? "bg-white shadow font-medium"
                  : "text-gray-600"
              }`}
            >
              {tab}
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

      {/* Base Currency */}
      <p className="text-sm mb-2">Your base currency</p>
      <div className="border rounded-md px-4 py-3 mb-6">
        <strong>INR ₹</strong>
      </div>

      {/* Table */}
      <div className="border-t">
        <div className="grid grid-cols-3 py-3 font-semibold text-gray-500">
          <span>Currency</span>
          <span>Symbol</span>
          <span>Conversion Rate</span>
        </div>

        {currencies.map((c) => (
          <div key={c.id} className="grid grid-cols-3 py-4 border-t">
            <span>{c.name}</span>
            <span className="font-semibold">{c.symbol}</span>
            <span>{c.rate}</span>
          </div>
        ))}
      </div>

      {/* ---------------- COUNTRY DIALOG (CENTER) ---------------- */}
      {showCountryDialog &&
            <CreateCountryPopup onClose={()=>setShowCountryDialog(false)}/>

      }

      {/* ---------------- RIGHT DRAWER (CURRENCY CREATE) ---------------- */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/40"
            onClick={() => setShowDrawer(false)}
          />

          <div className="w-[420px] bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold mb-4">Currency</h2>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Choose Account"
              className="w-full border rounded-lg px-3 py-2 mb-4"
            />

            <div className="flex flex-wrap gap-2 mb-6">
              {availableNames.map((name) => (
                <button
                  key={name}
                  onClick={() => toggleTag(name)}
                  className={`px-3 py-1.5 rounded-md border text-sm ${
                    selectedTags.includes(name)
                      ? "bg-blue-100 border-blue-500 text-blue-600"
                      : ""
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConversion;