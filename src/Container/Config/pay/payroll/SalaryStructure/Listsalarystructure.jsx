import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const countries = ["India", "USA"];

const locationData = {
  India: ["Mumbai", "Delhi"],
  USA: ["New York", "Chicago"],
};

const Listsalarystructure = () => {
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState("Active");
  const [selectedLocation, setSelectedLocation] = useState("");

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const locations = ["Mumbai", "Delhi", "New York", "Chicago"];

  // ✅ Dummy Table Data
  const policiesData = [
    {
      id: 1,
      name: "India Structure",
      components: 3,
      createdBy: "Maria",
      assignedEmployees: 5,
      createdAt: "12 Jun, 2025 11:10 AM",
      status: "Active",
      location: "Mumbai",
    },
    {
      id: 2,
      name: "USA Structure",
      components: 2,
      createdBy: "John",
      assignedEmployees: 4,
      createdAt: "13 Jun, 2025 09:30 AM",
      status: "Draft",
      location: "New York",
    },
    {
      id: 3,
      name: "Delhi Payroll",
      components: 4,
      createdBy: "Aman",
      assignedEmployees: 6,
      createdAt: "14 Jun, 2025 01:00 PM",
      status: "Active",
      location: "Delhi",
    },
  ];

  // ✅ Filtering Logic
  const filteredPolicies = useMemo(() => {
    return policiesData.filter((policy) => {
      const statusMatch = policy.status === statusFilter;
      const locationMatch =
        !selectedLocation || policy.location === selectedLocation;
      return statusMatch && locationMatch;
    });
  }, [statusFilter, selectedLocation]);

  const handleClear = () => {
    setSelectedLocation("");
    setStatusFilter("Active");
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
     navigate(
      `/config/pay/payroll/salary-Structure/create?country=${encodeURIComponent(
        selectedCountry
      )}&office=${applyAll ? "ALL" : encodeURIComponent(selectedOffice)}`
    );

    // console.log({
    //   country: selectedCountry,
    //   office: applyAll ? "ALL_OFFICES" : selectedOffice,
    // });

    setShowDialog(false);
    setSelectedCountry("");
    setSelectedOffice("");
    setApplyAll(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold">Salary Structure</h1>

          <button
            onClick={() => setShowDialog(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            + Create
          </button>
        </div>

        {/* ✅ Status + Location Filter */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-2 bg-gray-200 p-1 rounded-lg">
            {["Active", "Draft"].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-1.5 text-sm rounded-md transition ${
                  statusFilter === tab
                    ? "bg-white shadow font-medium"
                    : "text-gray-600"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="border rounded-lg px-4 py-2 bg-white"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            <button
              onClick={handleClear}
              className="border px-4 py-2 rounded-lg bg-white hover:bg-gray-100"
            >
              Clear ✕
            </button>
          </div>
        </div>

        {/* ✅ Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="text-left text-sm text-gray-500 border-b">
              <tr>
                <th className="p-4">Salary Structure Name</th>
                <th className="p-4">Components</th>
                <th className="p-4">Created By</th>
                <th className="p-4">Assigned</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredPolicies.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center p-10 text-gray-400">
                    No salary structures found.
                  </td>
                </tr>
              )}

              {filteredPolicies.map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="p-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="font-medium">{s.name}</div>
                      <div className="text-xs text-gray-500">
                        {s.createdAt}
                      </div>
                    </div>
                  </td>

                  <td className="p-4 font-semibold">{s.components}</td>

                  <td className="p-4">{s.createdBy}</td>

                  <td className="p-4">{s.assignedEmployees}</td>

                  <td className="p-4 text-right">
                    <button className="text-blue-600">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ✅ Dialog Modal */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-[480px] rounded-2xl shadow-xl p-6 relative">

            <button
              onClick={() => setShowDialog(false)}
              className="absolute top-5 right-5 text-gray-500 hover:text-black text-lg"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-1">
              Creating for Which Country
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Please select where this shift will be applied.
            </p>

            {/* Country */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Select Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setSelectedOffice("");
                  setApplyAll(false);
                }}
                className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>

              {/* Apply All */}
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="checkbox"
                  checked={applyAll}
                  onChange={() => {
                    setApplyAll(!applyAll);
                    setSelectedOffice("");
                  }}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-500">
                  Apply to all offices in this country
                </span>
              </div>
            </div>

            {/* Office Dropdown */}
            {!applyAll && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Select Office
                </label>
                <select
                  value={selectedOffice}
                  onChange={(e) => setSelectedOffice(e.target.value)}
                  disabled={!selectedCountry}
                  className="w-full border rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose Office</option>
                  {selectedCountry &&
                    locationData[selectedCountry].map((office) => (
                      <option key={office} value={office}>
                        {office}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDialog(false)}
                className="px-5 py-2.5 rounded-lg border bg-gray-100 hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                onClick={handleContinue}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
              >
                Continue
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default Listsalarystructure;