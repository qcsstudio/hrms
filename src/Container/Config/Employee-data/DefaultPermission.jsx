import { useState, useEffect } from "react";

const permissionData = {
  HRIS: [
    { name: "Interface Branding", tag: "config" },
    { name: "Approval Workflow", desc: "Bulk update employee's assigned approval workflow" },
    { name: "Employee ID", tag: "config", desc: "Define employee id for everyone in your company" },
    { name: "Approval Workflow", tag: "config", desc: "Create and manage approval workflows in your company" },
    { name: "Business Unit", tag: "config", desc: "Create and configure business units in your company" },
    { name: "Reporting Hierarchy", desc: "Birds eye view of your company" },
    { name: "Team", desc: "Bulk update employee's assigned team" },
    { name: "Bank Detail" },
    { name: "Exit Policy" },
  ],
  Track: [{ name: "Attendance" }, { name: "Leave Policy" }],
  Pay: [{ name: "Payroll Settings" }],
  Resolve: [{ name: "Tickets" }],
  Organize: [{ name: "Departments" }],
  Asset: [{ name: "Asset Category" }],
};

export default function DefaultPermission() {
  const [selectedProduct, setSelectedProduct] = useState("HRIS");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [search, setSearch] = useState("");
  const [permissions, setPermissions] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // ✅ Sidebar state

  useEffect(() => {
    const defaultPermissions = {};
    Object.keys(permissionData).forEach((product) => {
      defaultPermissions[product] = {};
      permissionData[product].forEach((feature) => {
        defaultPermissions[product][feature.name] = "deny";
      });
    });
    setPermissions(defaultPermissions);
  }, []);

  const handleAccessChange = (level) => {
    setPermissions((prev) => ({
      ...prev,
      [selectedProduct]: {
        ...prev[selectedProduct],
        [selectedFeature]: level,
      },
    }));
  };

  const filteredFeatures =
    permissionData[selectedProduct]?.filter((f) =>
      f.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <main className="relative p-6 bg-gray-100 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          Default Permission for Employee
        </h2>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-md">
          Save
        </button>
      </div>

      <div className="bg-white rounded-md shadow grid grid-cols-3">

        {/* LEFT PRODUCT */}
        <div className="border-r">
          <div className="bg-blue-700 text-white p-4 font-semibold">
            Product
          </div>

          {Object.keys(permissionData).map((product) => (
            <div
              key={product}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedFeature(null);
              }}
              className={`flex justify-between items-center p-4 cursor-pointer border-b
                ${selectedProduct === product ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              {product}
              <span className="text-xl">›</span>
            </div>
          ))}
        </div>

        {/* MIDDLE FEATURES */}
        <div className="border-r">
          <div className="bg-blue-700 text-white p-4 font-semibold flex items-center justify-between">
            <span>Page / Features</span>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-black px-4 py-1.5 rounded-full w-48 outline-none border border-gray-200"
            />
          </div>

          {filteredFeatures.map((feature) => (
            <div
              key={feature.name}
              onClick={() => setSelectedFeature(feature.name)}
              className={`flex justify-between p-4 border-b cursor-pointer
                ${selectedFeature === feature.name ? "bg-gray-200" : "hover:bg-gray-100"}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  {feature.tag && (
                    <span className="bg-gray-700 text-white text-xs px-2 py-1 rounded">
                      {feature.tag}
                    </span>
                  )}
                  <span className="font-medium">{feature.name}</span>
                </div>
                {feature.desc && (
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                )}
              </div>
              <span className="text-xl">›</span>
            </div>
          ))}
        </div>

        {/* RIGHT ACCESS */}
        <div>
          <div className="bg-blue-700 text-white p-4 font-semibold flex justify-between items-center">
            <span>Access Level</span>
            <button
              onClick={() => setIsSidebarOpen(true)} // ✅ Open Sidebar
              className="bg-gray-200 text-blue-700 px-3 py-1 rounded-md text-sm"
            >
              Change Log
            </button>
          </div>

          {selectedFeature && (
            <div className="p-6 space-y-6">
              {["full", "view", "deny"].map((level) => (
                <label key={level} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="access"
                    checked={
                      permissions[selectedProduct]?.[selectedFeature] === level
                    }
                    onChange={() => handleAccessChange(level)}
                    className="w-5 h-5"
                  />
                  <span className="text-lg">
                    {level === "full"
                      ? "Full Access"
                      : level === "view"
                      ? "View Access"
                      : "Deny Access"}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* OVERLAY pop up right side =================================================== */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/60  flex  justify-end z-50">
             <div
        className={`w-[543px] bg-white rounded-xl shadow-lg p-6 relative`}
      >
        <div className="p-6 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Feature Change Logs</h3>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="text-xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="p-6 text-gray-500">
          No logs available
        </div>
      </div>

          </div>
      )}

      {/* ✅ SIDEBAR */}
   

    </main>
  );
}
