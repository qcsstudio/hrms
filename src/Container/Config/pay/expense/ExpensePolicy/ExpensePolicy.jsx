import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExpensePolicy = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showCountryDialog, setShowCountryDialog] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  const [applyAll, setApplyAll] = useState(false);

  const tabs = ["All", "Active", "Inactive"];
  const locations = ["India", "USA"];

  const countries = ["India", "USA"];
  const locationData = {
    India: ["Bangalore", "Mumbai", "Delhi"],
    USA: ["New York", "California"],
  };

  const policies = [
    {
      id: 1,
      name: "Travel Policy",
      limit: "₹ 10000",
      assignedUsers: [
        "https://i.pravatar.cc/150?img=1",
        "https://i.pravatar.cc/150?img=2",
        "https://i.pravatar.cc/150?img=3",
        "https://i.pravatar.cc/150?img=4",
        "https://i.pravatar.cc/150?img=5",
      ],
    },
    {
      id: 2,
      name: "Food Policy",
      limit: "₹ 8000",
      assignedUsers: [
        "https://i.pravatar.cc/150?img=6",
        "https://i.pravatar.cc/150?img=7",
      ],
    },
  ];

  const handleClear = () => {
    setSelectedLocation("");
  };

  const handleContinue = () => {
    if (!selectedCountry) {
      alert("Please select a country");
      return;
    }
    if (!applyAll && !selectedOffice) {
      alert("Please select an office");
      return;
    }
    setShowCountryDialog(false);
    navigate("/config/pay/expensive/create-expense-policy");
  };

  return (
    <div>
      {/* Header */}
       <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-lg font-semibold">Expense Policy</h1>
          <p className="text-sm text-gray-500">
            {/* Manage employee directory and roles */}
          </p>
        </div>

        <button
          onClick={() => setShowCountryDialog(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-md"
        >
          Create +
        </button>
      </div>

      {/* Tabs + Filter */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex border rounded-md overflow-hidden">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 text-sm font-medium ${
                tab === t
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

          <button onClick={handleClear} className="border px-4 py-2 rounded-lg">
            Clear ✕
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1fr_120px_120px_1fr_80px] gap-4 py-3 text-sm text-muted-foreground font-medium border-b">
        <span>Policy Name</span>
        <span>Monthly Limit</span>
        <span>Created By</span>
        <span>Assigned Employee</span>
        <span>Action</span>
      </div>

      {/* Rows */}
      {policies.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1fr_120px_120px_1fr_80px] gap-4 py-4 border-b items-center"
        >
          <span className="text-sm font-medium">{row.name}</span>
          <span className="text-sm">{row.limit}</span>

          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs">
            A
          </div>

          {/* Assigned Employees (Avatar Group) */}
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {row.assignedUsers.slice(0, 3).map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt="user"
                  className="w-7 h-7 rounded-full border-2 border-white object-cover"
                />
              ))}

              {row.assignedUsers.length > 3 && (
                <div className="w-7 h-7 rounded-full bg-muted border-2 border-white flex items-center justify-center text-[10px] font-medium text-muted-foreground">
                  +{row.assignedUsers.length - 3}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (policies?.id) {
                  navigate(
                    `/config/pay/payroll/edit-expense-policy/${policies.id}`,
                  );
                } else {
                  console.log("ID not found");
                }
              }}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              ✏️
            </button>

            <button className="text-muted-foreground hover:text-foreground">
              ⋮
            </button>
          </div>
        </div>
      ))}

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
  );
};

export default ExpensePolicy;
