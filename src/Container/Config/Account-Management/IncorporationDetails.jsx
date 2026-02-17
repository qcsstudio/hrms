import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from '../../../utils/axios.config'
import { useDispatch, useSelector } from "react-redux";
import { handleincorporation } from "../../../Redux/configSlices/incorporationslice";

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

const FormInput = ({ placeholder, type = "text", value, onChange }) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  />
);


const FormSelect = ({ options = [], value, onChange }) => (
  <select
    value={value}
    onChange={onChange}
    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
  >
    <option value="">Select</option>
    {options.map((opt) => (
      <option key={opt.value} value={opt.label}>
        {opt.label}
      </option>
    ))}
  </select>
);


/* ---------- Main Component ---------- */

const IncorporationDetails = () => {
  const { incorporationid } = useSelector(state => state.incorporation);

  const navigate = useNavigate();
  const { token } = useSelector(state => state.user);
  console.log(token, "555555555555555555555")

  const dispatch = useDispatch();
  // const axiosInstance = createAxios(token);

  const [form, setForm] = useState({
    legalName: "",
    incorporationDate: "",
    companyType: "",
    cin: "",
    gstin: "",
    pan: "",
    tan: ""
  });

 

  // get api =============================
  useEffect(() => {
    const fetchincorporation = async () => {
      try {
        const axiosInstance = createAxios(token);

        const res = await axiosInstance.get(
          `/config/incorporation-get/${incorporationid}`,
          { meta: { auth: "ADMIN_AUTH" } }
        );

        const data = res?.data?.incorporation;

        if (data) {
          setForm({
            legalName: data.companyLegalName || "",
            incorporationDate: data.incorporationDate
              ? data.incorporationDate.split("T")[0]
              : "",
            companyType: data.companyType || "",
            cin: data.cin || "",
            gstin: data.gstin || "",
            pan: data.pan || "",
            tan: data.tan || ""
          });
        }

      } catch (err) {
        console.error("Error fetching incorporation:", err);
      }
    };

    fetchincorporation();
  }, [token, incorporationid]);


  // POST API=============================
  const handleSave = async () => {
    try {
      const axiosInstance = createAxios(token);

      const payload = {
        companyLegalName: form.legalName,
        incorporationDate: form.incorporationDate,
        companyType: form.companyType,
        cin: form.cin,
        gstin: form.gstin,
        pan: form.pan,
        tan: form.tan
      };

      const res = await axiosInstance.post(
        "/config/incorporation",
        payload,
        { meta: { auth: "ADMIN_AUTH" } }
      );
      console.log(res, "/config/incorporation======================")

      dispatch(handleincorporation(res?.data?.incorporation));
      alert("Incorporation details saved successfully");
    } catch (err) {
      console.error("Save failed", err);
      alert("Failed to save details");
    }
  };


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
            <FormInput
              placeholder="India"
              value={form.legalName}
              onChange={(e) =>
                setForm({ ...form, legalName: e.target.value })
              }
            />
          </FormField>


          <FormField label="Incorporation Date (Optional)">
            <FormInput
              type="date"
              value={form.incorporationDate}
              onChange={(e) =>
                setForm({ ...form, incorporationDate: e.target.value })
              }
            />
          </FormField>

        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Company Type (Optional)">
            <FormSelect
              value={form.companyType}
              onChange={(e) =>
                setForm({ ...form, companyType: e.target.value })
              }
              options={[
                { value: "private", label: "Private Limited" },
                { value: "public", label: "Public Limited" },
                { value: "llp", label: "LLP" }
              ]}
            />
          </FormField>


          <FormField label="CIN (Optional)">
            <FormInput
              value={form.cin}
              onChange={(e) =>
                setForm({ ...form, cin: e.target.value })
              }
            />
          </FormField>

        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="GSTIN (Optional)">
            <FormInput
              value={form.gstin}
              onChange={(e) =>
                setForm({ ...form, gstin: e.target.value })
              }
            />
          </FormField>


          <FormField label="PAN (Optional)">
            <FormInput
              value={form.pan}
              onChange={(e) =>
                setForm({ ...form, pan: e.target.value })
              }
            />
          </FormField>

        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="TAN (Optional)">
            <FormInput
              value={form.tan}
              onChange={(e) =>
                setForm({ ...form, tan: e.target.value })
              }
            />
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
          onClick={handleSave}
          className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default IncorporationDetails;
