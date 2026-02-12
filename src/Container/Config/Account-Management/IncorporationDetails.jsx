import React from "react";
import { useNavigate } from "react-router-dom";

/* ---------- Custom Components ---------- */

const PageHeader = ({ title, subtitle }) => (
  <div className="mb-8">
    <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);

const FormField = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

const FormInput = ({ placeholder, type = "text" }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
);

const FormSelect = ({ options = [], defaultValue }) => (
  <select
    defaultValue={defaultValue}
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

/* ---------- Main Component ---------- */

const IncorporationDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="p-8  mx-auto">
      <PageHeader
        title="Incorporation Details"
        subtitle="Manage employee directory, documents, and role-based actions."
      />

      <div className="space-y-6">
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Company Legal Name">
            <FormInput placeholder="India" />
          </FormField>

          <FormField label="Incorporation Date (Optional)">
            <FormInput placeholder="Choose Account" />
          </FormField>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Company Type (Optional)">
            <FormSelect
              defaultValue="india"
              options={[
                { value: "india", label: "India" },
                { value: "private", label: "Private Limited" },
                { value: "public", label: "Public Limited" },
                { value: "llp", label: "LLP" },
              ]}
            />
          </FormField>

          <FormField label="CIN (Optional)">
            <FormInput placeholder="Choose Account" />
          </FormField>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="GSTIN (Optional)">
            <FormInput placeholder="India" />
          </FormField>

          <FormField label="PAN (Optional)">
            <FormInput placeholder="Choose Account" />
          </FormField>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="TAN (Optional)">
            <FormInput placeholder="India" />
          </FormField>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-10">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
        >
          Cancel
        </button>

        <button
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default IncorporationDetails;
