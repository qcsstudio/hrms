import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import CreateCountryPopup from "../../../../../Components/Popup_Modal/CreateCountryPopup";
import { createPortal } from "react-dom";

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
  const handleCreate = ()=> {
    navigate(`/config/pay/payroll/salary-Structure/create?country=${encodeURIComponent(
        selectedCountry
      )}&office=${applyAll ? "ALL" : encodeURIComponent(selectedOffice)}`)
  }

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
      {showDialog && createPortal(
                  <CreateCountryPopup onClose={()=>setShowDialog(false)} onContinue={handleCreate}/>,document.body)

      }
    </div>
  );
};

export default Listsalarystructure;