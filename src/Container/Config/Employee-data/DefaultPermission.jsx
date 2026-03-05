import { useState, useEffect } from "react";

const permissionData = {
  HRIS: [
    { name: "Interface Branding", tag: "config" },

    {
      name: "Approval Workflow",
      desc: "Bulk update employee's assigned approval workflow",
    },
    {
      name: "Approval Workflow Management",
      tag: "config",
      desc: "Create and manage approval workflows in your company",
    },

    {
      name: "Employee ID",
      tag: "config",
      desc: "Define employee id for everyone in your company",
    },
    {
      name: "Employee ID Management",
      desc: "Manually assign and update employee ID",
    },

    {
      name: "Business Unit",
      tag: "config",
      desc: "Create and configure business units in your company",
    },

    {
      name: "Reporting Hierarchy",
      desc: "Birds eye view of your company structure",
    },

    { name: "Team", desc: "Bulk update employee's assigned team" },
    {
      name: "Team Configuration",
      tag: "config",
      desc: "Create and configure teams in your company",
    },

    { name: "Bank Detail" },

    { name: "Exit Policy", desc: "Bulk assign exit policy to employees" },
    {
      name: "Exit Policy Configuration",
      tag: "config",
      desc: "Create and configure employee exit policies",
    },

    { name: "Deactivate & Exit Employee" },

    { name: "Custom Data", tag: "config" },

    { name: "Add New Employee", desc: "Bulk add new employees" },

    {
      name: "Exit Reason",
      tag: "config",
      desc: "Create and configure reasons of employee exit in your company",
    },

    {
      name: "Grade",
      tag: "config",
      desc: "Create and configure grades in your company",
    },
    { name: "Grade Assignment", desc: "Bulk update employee's assigned grade" },

    {
      name: "Reporting Office",
      desc: "Bulk update employee's reporting office from one location to another",
    },

    {
      name: "Company Attributes",
      desc: "Filter employees using attributes like Business Unit, Department, Team",
    },

    {
      name: "Invite Employee",
      desc: "Generate company code and invite employees",
    },

    {
      name: "Profile",
      desc: "Employee profile with personal and work details",
    },

    {
      name: "Report Robo",
      desc: "Generate or schedule reports and view report history",
    },

    { name: "Incorporation Details", tag: "config" },

    {
      name: "Identity & Statutory",
      desc: "Download and upload statutory employee documents",
    },

    {
      name: "Notification Center",
      desc: "Centralized place to view notifications",
    },

    {
      name: "Probation",
      tag: "config",
      desc: "Create and manage probation settings",
    },
    {
      name: "Probation Management",
      desc: "Plan, extend and confirm employee probation",
    },

    { name: "Company Offices", tag: "config" },

    {
      name: "Employee Attributes",
      desc: "Filter employees using personal attributes like name, blood group etc",
    },

    {
      name: "Initiate Resignation",
      desc: "Employees initiate resignation or managers terminate employees",
    },

    {
      name: "Personal Profile Privacy",
      desc: "Control amount of personal information shared with others",
    },

    {
      name: "Employment Type",
      desc: "Bulk update employment types like full-time or part-time",
    },

    {
      name: "Employee Personal Details",
      desc: "Bulk add and update employee personal details",
    },

    {
      name: "Default Permission",
      desc: "Bulk assign default permissions to employees",
    },
    {
      name: "Default Permission Configuration",
      tag: "config",
      desc: "Define default feature access permissions",
    },

    {
      name: "Designation",
      tag: "config",
      desc: "Create and configure job designations",
    },
    {
      name: "Designation Change",
      desc: "Plan designation changes and promotions",
    },

    {
      name: "Directory",
      desc: "View all employees and profiles from directory",
    },

    { name: "Directory Dates" },

    {
      name: "Request Center",
      desc: "Requests sent and received for approval workflow",
    },

    { name: "Email Branding", tag: "config" },

    {
      name: "Permission Policy",
      tag: "config",
      desc: "Create permission policies for roles like Payroll Manager etc",
    },
    {
      name: "Permission Policy Assignment",
      desc: "Assign permission policy to employees",
    },

    { name: "Export Directory Data", desc: "Export employee directory data" },

    { name: "Global Default", tag: "config" },

    { name: "Common Access", tag: "config" },

    {
      name: "Notify Employees",
      desc: "Send announcements to selected employees",
    },

    { name: "Self Service", desc: "Bulk update employee self-service access" },

    {
      name: "Department",
      tag: "config",
      desc: "Create and configure departments",
    },

    { name: "Mobile Device History", desc: "View mobile app login activity" },

    {
      name: "Notification Preferences",
      desc: "Configure notification preferences",
    },

    {
      name: "Default Profile Privacy",
      tag: "config",
      desc: "Control personal details visibility",
    },

    {
      name: "Managers",
      desc: "Bulk update employee primary and secondary managers",
    },

    {
      name: "Employee Work Details",
      desc: "Bulk update employee designation, department and business unit",
    },
  ],

  Track: [
    { name: "Shift", desc: "Create and configure shifts", tag: "config" },
    {
      name: "Export Biometric Mapping Data",
      desc: "Export biometric mapping CSV file",
    },
    { name: "Attendance Logs", desc: "View all attendance punch logs" },
    { name: "Shift Planning", desc: "Plan and assign shifts" },
    { name: "Extra Time", desc: "Assign comp-off or extra pay" },
    { name: "WFH/OD Request", desc: "Work from home or out duty request" },
    {
      name: "Export Biometric Logs Data",
      desc: "Export biometric attendance CSV",
    },
    { name: "Delete Attendance Logs", desc: "Delete incorrect punches" },
    { name: "Holiday Plan", desc: "Create holiday plans", tag: "config" },
    { name: "Bulk Leave Application", desc: "Download and upload leave data" },
    { name: "Auto Regularize", desc: "Auto update attendance for absent days" },
    { name: "Export Attendance Logs", desc: "Export attendance data" },
    {
      name: "Attendance Request Cycle",
      desc: "Configure attendance request cycle",
      tag: "config",
    },
    { name: "Biometric Device", desc: "Add biometric device" },
    { name: "Clock-in Request", desc: "Manual clock-in request" },
    { name: "Biometric Mapping", desc: "Map biometric user IDs" },
    { name: "Update Attendance Logs", desc: "Edit attendance logs" },
    {
      name: "Clock-in Method",
      desc: "Configure clock-in method",
      tag: "config",
    },
    { name: "Leave Type", desc: "Define leave types", tag: "config" },
    { name: "Leave Balance", desc: "View leave balances" },
    {
      name: "Attendance Regularization",
      desc: "Bulk attendance regularization",
    },
    { name: "Leave Policy Planning", desc: "Assign leave policy" },
    { name: "Holiday View", desc: "View holidays" },
    { name: "Weekly-off", desc: "Configure weekly off", tag: "config" },
    {
      name: "Extra Time (Compoff)",
      desc: "Configure comp-off policy",
      tag: "config",
    },
    { name: "Bulk Regularize", desc: "Bulk update clock in/out" },
    { name: "Holiday Planning", desc: "Assign holiday plan" },
    { name: "Leave Policy", desc: "Configure leave policy", tag: "config" },
    {
      name: "Attendance Policy",
      desc: "Configure attendance policy",
      tag: "config",
    },
  ],

  Pay: [
    {
      name: "Advance Request",
      desc: "Lets you apply an advance money request for expenses to be incurred",
    },
    {
      name: "Expense",
      desc: "Expense dashboard with an overview of all expenses incurred",
    },
    {
      name: "Flexible Benefit Plan",
    },
    {
      name: "Extra Payments (Individual actions)",
    },
    {
      name: "Fuel & Distance Unit",
      tag: "config",
      desc: "Lets you configure the fuel cost for different types of fuels that your employee's vehicle might consume while traveling",
    },
    {
      name: "Annual Payslip",
    },
    {
      name: "Expense Policy",
      tag: "config",
      desc: "Bulk assign expense policy to employees",
    },
    {
      name: "Employee Payroll Details",
    },
    {
      name: "Proration Upload",
    },
    {
      name: "Employee's Payslip",
    },
    {
      name: "Package & Proration",
    },
    {
      name: "Extra Deductions",
    },
    {
      name: "Flexible Benefit Plan",
      tag: "config",
    },
    {
      name: "Form 12B",
    },
    {
      name: "Tax Sheet",
    },
    {
      name: "Payroll Dashboard",
    },
    {
      name: "Compensator",
      tag: "config",
      desc: "Lets you add employees as compensators to pay employees for expenses incurred or lend an advance",
    },
    {
      name: "Overtime Payment Policy",
      tag: "config",
    },
    {
      name: "Payroll Tag",
      tag: "config",
    },
    {
      name: "Compensator Dashboard",
      desc: "Lets designated employees pay for expenses incurred or lend an advance",
    },
    {
      name: "Extra Deduction",
    },
    {
      name: "Form 16",
    },
    {
      name: "Salary Cycle",
      tag: "config",
    },
    {
      name: "Salary Planner",
    },
    {
      name: "Loans",
    },
    {
      name: "IT declaration & submission",
    },
    {
      name: "Payslip Upload",
    },
    {
      name: "Company Bank Detail",
      tag: "config",
    },
    {
      name: "Misc",
      tag: "config",
    },
    {
      name: "Run Payroll",
    },
    {
      name: "Salary Structure",
    },
    {
      name: "Extra Payment (Employee view)",
    },
    {
      name: "Payroll Exceptions",
    },
    {
      name: "Salary Advances",
    },
    {
      name: "Loan",
    },
    {
      name: "Payroll Signatory",
      tag: "config",
    },
    {
      name: "FNF Settlement Policy",
    },
    {
      name: "Overtime Payment",
    },
    {
      name: "Expense Cycle",
      tag: "config",
      desc: "Define your company's monthly expense cycle",
    },
    {
      name: "Salary advance",
    },
    {
      name: "Variable Payments",
    },
    {
      name: "Expense Type",
      tag: "config",
      desc: "Most frequently incurred expense types available in your HRMS",
    },
    {
      name: "Component",
      tag: "config",
    },
    {
      name: "Currency Conversion",
      tag: "config",
    },
    {
      name: "FNF Policy",
      tag: "config",
    },
    {
      name: "Income tax",
    },
    {
      name: "Salary Structure",
      tag: "config",
    },
    {
      name: "Expense Request",
      desc: "Lets You apply  a request for incurred expenses",
    },
    {
      name: "Payroll Method",
      tag: "config",
    },
    {
      name: "Extra Payments (Bulk actions)",
    },
  ],
  Resolve: [
    { name: "Company Policy", tag: "config" },
    { name: "My & Shared Checklist" },
    { name: "HRMS Policy" },
    {
      name: "Checklist",
      tag: "config",
    },
    {
      name: "Policy Center",
    },
  ],
  Organize: [
    {
      name: "My Drive",
      desc: "Lets employees save, share and view shared files and organise their data on sumHR cloud",
      tag: "",
    },
    {
      name: "Page Layout",
      desc: "Configure page layout settings",
      tag: "config",
    },
    {
      name: "Post Office",
      desc: "Manage and track company postal communications",
      tag: "",
    },
    {
      name: "Company Drive",
      desc: "Lets the company organise its files and share it with employees.",
      tag: "",
    },
    {
      name: "Letter Box",
      desc: "Manage and store company letters and documents",
      tag: "",
    },
    {
      name: "Share Files & Folders",
      desc: "Lets employees share files in their own 'My Drive' section with other members of the company",
      tag: "",
    },
    {
      name: "Upload Files",
      desc: "Lets employees upload files in their own 'My Drive' section",
      tag: "",
    },
    {
      name: "Create Folders",
      desc: "Lets employees organise their own 'My Drive' section by creating folders",
      tag: "",
    },
    {
      name: "Authorized Signatory",
      desc: "Configure authorized signatories for company documents",
      tag: "config",
    },
    {
      name: "Template",
      tag: "config",
    },
  ],
  Asset: [
    { name: "Asset Category", tag: "config" },
    {
      name: "Asset Assignment",
    },
  ],
};

export default function DefaultPermission() {
  const [selectedProduct, setSelectedProduct] = useState("HRIS");
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [search, setSearch] = useState("");
  const [permissions, setPermissions] = useState({});
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      f.name.toLowerCase().includes(search.toLowerCase()),
    ) || [];

  return (
    <main className="relative p-6 bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Default Permission</h2>

          <select className="border rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded">
          Save
        </button>
      </div>

      <div className="bg-white rounded shadow grid grid-cols-3">
        {/* PRODUCT COLUMN */}
        <div className="border-r flex flex-col">
          <div className="bg-blue-700 text-white p-4 font-semibold">
            Product
          </div>

          <div className="h-[70vh] overflow-y-auto">
            {Object.keys(permissionData).map((product) => (
              <div
                key={product}
                onClick={() => {
                  setSelectedProduct(product);
                  setSelectedFeature(null);
                  setSearch("");
                }}
                className={`flex justify-between p-4 border-b cursor-pointer
                ${
                  selectedProduct === product
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                {product}
                <span>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* FEATURES COLUMN */}
        <div className="border-r flex flex-col">
          <div className="bg-blue-700 text-white p-4 flex justify-between items-center">
            <span>Page / Features</span>

            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-black px-3 py-1 rounded-full w-40"
            />
          </div>

          {/* FEATURE SCROLL AREA */}
          <div className="h-[70vh] overflow-y-auto">
            {filteredFeatures.map((feature, index) => (
              <div
                key={index}
                onClick={() => setSelectedFeature(feature.name)}
                className={`flex justify-between p-4 border-b cursor-pointer
                ${
                  selectedFeature === feature.name
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
              >
                <div>
                  <div className="flex gap-2 items-center">
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

                <span>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* ACCESS COLUMN */}
        <div>
          <div className="bg-blue-700 text-white p-4 flex justify-between">
            <span>Access Level</span>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="bg-gray-200 text-blue-700 px-3 py-1 rounded text-sm"
            >
              Change Log
            </button>
          </div>

          {selectedFeature && (
            <div className="p-6 space-y-6">
              {["full", "view", "deny"].map((level) => (
                <label key={level} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="access"
                    checked={
                      permissions[selectedProduct]?.[selectedFeature] === level
                    }
                    onChange={() => handleAccessChange(level)}
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

      {/* OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-white shadow transition-transform duration-300
        ${isSidebarOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b flex justify-between">
          <h3 className="font-semibold">Feature Change Logs</h3>

          <button onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>

        <div className="p-6 text-gray-500">No logs available</div>
      </div>
    </main>
  );
}