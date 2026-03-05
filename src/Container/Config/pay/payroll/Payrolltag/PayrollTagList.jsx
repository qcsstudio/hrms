import React, { useState, useRef, useEffect } from "react";

const PayrollTagList = () => {
  const dropdownRef = useRef(null);

  /* ================= STATES ================= */
  const [showDialog, setShowDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const [openMenu, setOpenMenu] = useState(null);

  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState("Boolean");

  const [payrollTags, setPayrollTags] = useState([
    {
      id: 1,
      name: "Salary Structure Name",
      createdDate: "12 Jun 2025 11:10 AM",
      valueType: "Boolean",
      createdBy: "Admin",
      assignedCount: 12,
    },
  ]);

  /* ================= LOCATION DATA ================= */
  const locationData = {
    India: ["HeadOffice", "Branch1"],
    USA: ["Branch1"],
  };

  const countries = Object.keys(locationData);

  /* ================= OUTSIDE CLICK CLOSE ================= */
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ================= CONTINUE (OPEN DRAWER) ================= */
  const handleContinue = () => {
    if (!selectedCountry) {
      alert("Please select country");
      return;
    }

    if (!applyAll && !selectedOffice) {
      alert("Please select office");
      return;
    }

    setShowDialog(false);
    setShowDrawer(true);
  };

  /* ================= SAVE ================= */
  const handleSave = () => {
    if (!newName) {
      alert("Please enter tag name");
      return;
    }

    const newTag = {
      id: Date.now(),
      name: newName,
      createdDate: new Date().toLocaleString(),
      valueType: newType,
      createdBy: "Admin",
      assignedCount: 0,
    };

    setPayrollTags((prev) => [...prev, newTag]);

    setShowDrawer(false);
    setNewName("");
    setNewType("Boolean");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Payroll Tag</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => setShowDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          Create +
        </button>
      </div>

      {/* ================= TABLE HEADER ================= */}
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Payroll Tag Name</div>
        <div>Value Type</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div className="text-right">Action</div>
      </div>

      {/* ================= LIST ================= */}
      <div className="space-y-4 mt-4">
        {payrollTags.map((tag) => (
          <div
            key={tag.id}
            className="bg-white rounded-xl border px-4 py-4 grid grid-cols-[2fr_1fr_1fr_1fr_auto] items-center"
          >
            <div>
              <p className="font-medium">{tag.name}</p>
              <p className="text-xs text-gray-400">{tag.createdDate}</p>
            </div>

            <div>{tag.valueType}</div>
            <div>{tag.createdBy}</div>
            <div>{tag.assignedCount} Employees</div>

            <div className="flex justify-end">
              <button className="p-2 rounded-md hover:bg-gray-100">⋮</button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= COUNTRY DIALOG ================= */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[480px] rounded-2xl shadow-xl p-6 relative">
            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-5 right-5"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-6">
              Creating for Which Country
            </h2>

            <select
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedOffice("");
              }}
              className="w-full border rounded-xl px-4 py-3 mb-4"
            >
              <option value="">Choose Country</option>
              {countries.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>

            <div className="flex items-center gap-2 mb-4">
              <input
                type="checkbox"
                checked={applyAll}
                onChange={() => setApplyAll(!applyAll)}
              />
              Apply to all offices
            </div>

            {!applyAll && (
              <select
                value={selectedOffice}
                onChange={(e) => setSelectedOffice(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 mb-6"
              >
                <option value="">Choose Office</option>
                {selectedCountry &&
                  locationData[selectedCountry].map((office) => (
                    <option key={office}>{office}</option>
                  ))}
              </select>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleContinue}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RIGHT DRAWER FORM ================= */}
      {showDrawer && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="flex-1 bg-black/30"
            onClick={() => setShowDrawer(false)}
          />

          <div className="w-[500px] bg-white h-full shadow-2xl p-8">
            <div className="flex justify-between mb-6">
              <h3 className="text-xl font-semibold">
                Create Payroll Tag
              </h3>
              <button onClick={() => setShowDrawer(false)}>✕</button>
            </div>

            <p className="text-gray-500 mb-6">
              Country: <strong>{selectedCountry}</strong>{" "}
              {applyAll ? "(All Offices)" : `- ${selectedOffice}`}
            </p>

            <div className="mb-5">
              <label className="block text-sm font-medium mb-2">
                Tag Name
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm font-medium mb-3">
                Value Type
              </label>

              <div className="space-y-3">
                <label className="flex items-center gap-3 border rounded-xl px-4 py-3">
                  <input
                    type="radio"
                    value="Boolean"
                    checked={newType === "Boolean"}
                    onChange={(e) => setNewType(e.target.value)}
                  />
                  Boolean
                </label>

                <label className="flex items-center gap-3 border rounded-xl px-4 py-3">
                  <input
                    type="radio"
                    value="Drop Down"
                    checked={newType === "Drop Down"}
                    onChange={(e) => setNewType(e.target.value)}
                  />
                  Drop Down
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSave}
                className="px-6 py-2.5 rounded-lg bg-blue-600 text-white"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayrollTagList;