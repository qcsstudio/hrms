import React, { useState, useRef } from "react";

const initialSignatories = [
  {
    id: "1",
    fullName: "Ajay Kumar",
    signatureImage: null,
    status: true,
    country: "India",
    location: "Bangalore",
  },
  {
    id: "2",
    fullName: "Ravi Sharma",
    signatureImage: null,
    status: true,
    country: "USA",
    location: "New York",
  },
];

const countries = ["India", "USA"];

const locationData = {
  India: ["Bangalore", "Delhi"],
  USA: ["New York", "San Francisco"],
};

const AuthoritySignature = () => {
  const [signatories, setSignatories] = useState(initialSignatories);
  const [activeTab, setActiveTab] = useState("all");

  // location filter
  const [selectedLocation, setSelectedLocation] = useState("");

  // drawer
  const [drawerMode, setDrawerMode] = useState(null); // add | edit | view
  const [selectedSignatory, setSelectedSignatory] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  // form
  const [fullName, setFullName] = useState("");
  const [signaturePreview, setSignaturePreview] = useState(null);

  // country modal
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const fileInputRef = useRef(null);

  const locations = Array.from(
    new Set(signatories.map((s) => s.location))
  );

  const handleClear = () => {
    setSelectedLocation("");
  };

  const openAddDrawer = () => {
    setDrawerMode("add");
    setFullName("");
    setSignaturePreview(null);
  };

  const openEditDrawer = (data) => {
    setDrawerMode("edit");
    setSelectedSignatory(data);
    setFullName(data.fullName);
    setSignaturePreview(data.signatureImage);
    setOpenDropdown(null);
  };

  const openViewDrawer = (data) => {
    setDrawerMode("view");
    setSelectedSignatory(data);
    setFullName(data.fullName);
    setSignaturePreview(data.signatureImage);
    setOpenDropdown(null);
  };

  const closeDrawer = () => {
    setDrawerMode(null);
    setSelectedSignatory(null);
  };

  const handleSave = () => {
    if (!fullName.trim()) return;

    if (drawerMode === "add") {
      setSignatories((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          fullName,
          signatureImage: signaturePreview,
          status: true,
          country: selectedCountry,
          location: applyAll ? "ALL" : selectedOffice,
        },
      ]);
    }

    if (drawerMode === "edit") {
      setSignatories((prev) =>
        prev.map((s) =>
          s.id === selectedSignatory.id
            ? { ...s, fullName, signatureImage: signaturePreview }
            : s
        )
      );
    }

    closeDrawer();
  };

  const handleDelete = (id) => {
    setSignatories((prev) => prev.filter((s) => s.id !== id));
    setOpenDropdown(null);
  };

  const handleSignatureUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (ev) => setSignaturePreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleContinue = () => {
    setShowCountryDialog(false);
    openAddDrawer();
  };

  const filteredSignatories = signatories.filter((s) => {
    if (activeTab === "active" && !s.status) return false;
    if (activeTab === "archive" && s.status) return false;
    if (selectedLocation && s.location !== selectedLocation) return false;
    return true;
  });

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 relative">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Signatories</h1>
          <button
            onClick={() => setShowCountryDialog(true)}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Create +
          </button>
        </div>

        {/* Tabs & Filters */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <div className="flex rounded-full border overflow-hidden">
            {["all", "active", "archive"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-1.5 text-sm capitalize ${
                  activeTab === tab
                    ? "bg-white border shadow-sm"
                    : "text-gray-500"
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

        {/* Table */}
        <div className="bg-white border rounded-lg overflow-hidden">
          <div className="grid grid-cols-12 bg-gray-100 px-6 py-3 text-sm font-semibold">
            <div className="col-span-3">Full Name</div>
            <div className="col-span-3">Signature</div>
            <div className="col-span-2">Location</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Action</div>
          </div>

          {filteredSignatories.map((s) => (
            <div
              key={s.id}
              className="grid grid-cols-12 items-center px-6 py-4 border-t"
            >
              <div className="col-span-3">{s.fullName}</div>

              <div className="col-span-3">
                {s.signatureImage ? (
                  <img src={s.signatureImage} alt="" className="h-8" />
                ) : (
                  <div className="w-24 h-8 border-2 border-dashed rounded" />
                )}
              </div>

              <div className="col-span-2">{s.location}</div>
              <div className="col-span-2">{s.status ? "Active" : "Inactive"}</div>

              <div className="col-span-2 flex justify-end gap-2">
                <button
                  onClick={() => openEditDrawer(s)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 text-sm text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Country / Office Modal */}
      {showCountryDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[480px] p-6 rounded-xl relative">
            <button
              onClick={() => setShowCountryDialog(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Creating for Which Country
            </h2>

            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedOffice("");
              }}
              className="w-full border rounded-lg px-4 py-3 mb-4"
            >
              <option value="">Choose Country</option>
              {countries.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={applyAll}
                onChange={() => setApplyAll(!applyAll)}
              />
              <span className="text-sm">Apply to all offices</span>
            </div>

            {!applyAll && (
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 mb-6"
              >
                <option value="">Choose Office</option>
                {selectedCountry &&
                  locationData[selectedCountry].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
              </select>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCountryDialog(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        {/* RIGHT SIDE DRAWER */}
      {drawerMode && (
        <>
          <div className="fixed inset-0 bg-black/40" onClick={closeDrawer} />

          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col z-50">
            <div className="flex justify-between p-6 border-b">
              <h2 className="text-xl font-bold capitalize">
                {drawerMode} Signatory
              </h2>
              <button onClick={closeDrawer}>✕</button>
            </div>

            <div className="flex-1 p-6">
              <label className="block text-sm mb-2">Full Name</label>
              <input
                type="text"
                value={fullName}
                disabled={drawerMode === "view"}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border px-4 py-3 rounded mb-6"
              />

              <label className="block text-sm mb-2">Signature</label>
              <div className="border rounded p-4 flex justify-between items-center">
                <span>
                  {signaturePreview ? (
                    <img src={signaturePreview} alt="" className="h-8" />
                  ) : (
                    "No file"
                  )}
                </span>

                {drawerMode !== "view" && (
                  <>
                    <button
                      onClick={() => fileInputRef.current.click()}
                      className="border px-4 py-1 rounded"
                    >
                      Browse
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={handleSignatureUpload}
                    />
                  </>
                )}
              </div>
            </div>

            {drawerMode !== "view" && (
              <div className="p-6 flex justify-end border-t">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-8 py-2 rounded"
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default AuthoritySignature;
