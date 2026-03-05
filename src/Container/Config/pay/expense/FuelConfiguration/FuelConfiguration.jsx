import { useState } from "react";

const FuelConfiguration = () => {
  const [fuels, setFuels] = useState([
    { id: 1, name: "Petrol", distance: "", rate: "", unit: "₹ per Liter" },
    { id: 2, name: "Diesel", distance: "", rate: "", unit: "₹ per Liter" },
    { id: 3, name: "Electric Vehicle", distance: "", rate: "", unit: "₹ per kWh" },
    { id: 4, name: "CNG", distance: "", rate: "", unit: "₹ per KG" },
  ]);

  const updateFuel = (id, field, val) => {
    setFuels((prev) =>
      prev.map((f) => (f.id === id ? { ...f, [field]: val } : f))
    );
  };

  const handleSave = () => {
    alert("Fuel configuration saved!");
  };

  return (
    <div className="w-full pl-12 pr-6">
      {/* RIGHT SIDE CONTENT AREA */}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">
            Fuel Configuration
          </h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="rounded-md bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Save
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[160px_1fr_1fr] gap-6 py-3 border-b text-sm text-gray-400 font-medium">
        <span>S.No</span>
        <span>Distance (per km)</span>
        <span>Fuel rate (per liter)</span>
      </div>

      {/* Rows */}
      {fuels.map((fuel) => (
        <div
          key={fuel.id}
          className="grid grid-cols-[160px_1fr_1fr] gap-6 py-4 border-b items-center"
        >
          <span className="text-sm font-medium text-gray-900">
            {fuel.name}
          </span>

          <div className="flex items-center gap-3">
            <input
              value={fuel.distance}
              onChange={(e) =>
                updateFuel(fuel.id, "distance", e.target.value)
              }
              placeholder="Choose Account"
              className="h-10 w-[220px] rounded-md border px-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400">KM</span>
          </div>

          <div className="flex items-center gap-3">
            <input
              value={fuel.rate}
              onChange={(e) =>
                updateFuel(fuel.id, "rate", e.target.value)
              }
              placeholder="Choose Account"
              className="h-10 w-[220px] rounded-md border px-3 text-sm text-gray-700 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-400 whitespace-nowrap">
              {fuel.unit}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FuelConfiguration;