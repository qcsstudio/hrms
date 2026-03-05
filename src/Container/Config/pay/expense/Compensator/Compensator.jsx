import { useState, useMemo } from "react";

/* ---------- Mock Data ---------- */
const availableNames = [
  { id: 1, name: "Vishal" },
  { id: 2, name: "Pankaj" },
  { id: 3, name: "Rohit" },
  { id: 4, name: "Yogesh" },
  { id: 5, name: "Tanya" },
  { id: 6, name: "Tanya" },
];

const businessUnits = ["Unit A", "Unit B", "Unit C"];
const departments = ["Engineering", "HR", "Finance", "Marketing"];
const locations = ["Mumbai", "Delhi", "Bangalore", "Pune"];

const countries = ["India", "USA"];
const locationData = {
  India: ["Mumbai", "Delhi", "Bangalore"],
  USA: ["New York", "Texas", "California"],
};

const tableRows = [
  {
    id: 1,
    name: "Vishal",
    empId: "EMP001",
    role: "Primary",
    hasAssigned: true,
    assignedCount: 5,
    location: "Mumbai",
    status: "Active",
  },
  {
    id: 2,
    name: "Pankaj",
    empId: "EMP002",
    role: "Secondary",
    hasAssigned: false,
    assignedCount: 0,
    location: "Delhi",
    status: "Draft",
  },
  {
    id: 3,
    name: "Rohit",
    empId: "EMP003",
    role: "Primary",
    hasAssigned: true,
    assignedCount: 2,
    location: "Bangalore",
    status: "Active",
  },
];

export default function Compensator() {
  /* ---------- UI ---------- */
  const [showCountryDialog, setShowCountryDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);

  /* ---------- Filters ---------- */
  const [statusFilter, setStatusFilter] = useState("Active");
  const [selectedLocation, setSelectedLocation] = useState("");

  /* ---------- Drawer ---------- */
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [businessUnit, setBusinessUnit] = useState("");
  const [department, setDepartment] = useState("");
  const [location, setLocation] = useState("");

  /* ---------- Country Dialog ---------- */
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  /* ---------- Helpers ---------- */
  const toggleTag = (id) => {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleContinue = () => {
    if (!selectedCountry) return alert("Please select country");
    if (!applyAll && !selectedOffice) return alert("Please select office");

    setShowCountryDialog(false);
    setShowDrawer(true);
  };

  const handleClear = () => {
    setStatusFilter("Active");
    setSelectedLocation("");
  };

  /* ---------- Table Filter ---------- */
  const filteredRows = useMemo(() => {
    return tableRows.filter((row) => {
      const statusMatch = row.status === statusFilter;
      const locationMatch = selectedLocation
        ? row.location === selectedLocation
        : true;
      return statusMatch && locationMatch;
    });
  }, [statusFilter, selectedLocation]);

  return (
    <div className="min-h-screen bg-[#F8F9FB] p-6">
      {/* ---------- Header ---------- */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold">Compensator Configuration</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory and roles
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md"
        >
          Create +
        </button>
      </div>

      {/* ---------- FILTER BAR (STATUS + LOCATION + CLEAR) ---------- */}
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

          <button onClick={handleClear} className="border px-4 py-2 rounded-lg">
            Clear ✕
          </button>
        </div>
      </div>

      {/* ---------- TABLE ---------- */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Emp ID</th>
              <th className="px-4 py-3 text-left">Role</th>
              <th className="px-4 py-3 text-left">Assigned</th>
              <th className="px-4 py-3 text-left">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">
                  No records found
                </td>
              </tr>
            )}

            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t">
                <td className="px-4 py-3">{row.name}</td>
                <td className="px-4 py-3">{row.empId}</td>

                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      row.role === "Primary"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {row.role}
                  </span>
                </td>

                <td className="px-4 py-3">
                  {row.assignedCount > 0 ? (
                    <span className="text-sm text-gray-600">
                      {row.assignedCount} Employees
                    </span>
                  ) : (
                    <span className="text-sm text-gray-500">
                      No Employee Assigned
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">{row.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- COUNTRY DIALOG ---------- */}
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

      {/* ---------- DRAWER OVERLAY ---------- */}
      {showDrawer && (
        <div
          onClick={() => setShowDrawer(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* ---------- DRAWER ---------- */}
      <div
        className={`fixed top-0 right-0 h-full w-[440px] bg-white z-50 shadow-xl transition-transform duration-300 ${
          showDrawer ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 border-b flex justify-between">
          <h2 className="font-semibold">Add Compensator</h2>
          <button onClick={() => setShowDrawer(false)}>✕</button>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label className="text-sm font-medium block mb-1">
              Select Compensator
            </label>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Choose Account"
              className="w-full h-10 px-3 border rounded-md"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {availableNames.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleTag(item.id)}
                className={`px-3 py-1.5 rounded-md border ${
                  selectedTags.includes(item.id)
                    ? "bg-gray-100 border-gray-900"
                    : "border-gray-200"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">
              Business Unit
            </label>
            <select
              value={businessUnit}
              onChange={(e) => setBusinessUnit(e.target.value)}
              className="w-full h-10 px-3 border rounded-md"
            >
              <option value="">Select Business Unit</option>
              {businessUnits.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Department</label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full h-10 px-3 border rounded-md"
            >
              <option value="">Select Department</option>
              {departments.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full h-10 px-3 border rounded-md"
            >
              <option value="">Select Location</option>
              {locations.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="p-6 border-t flex justify-end">
          <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
