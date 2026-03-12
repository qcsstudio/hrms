import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from '../../../utils/axios.config'
import { useDispatch, useSelector } from "react-redux";
import { handleincorporation } from "../../../Redux/configSlices/incorporationslice";
import { FaAngleDown } from "react-icons/fa";

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

const FormDivSelect = ({
  options = [],
  value,
  onSelect,
  placeholder = "Select",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const normalizedOptions = options;

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full h-[40px] border border-[#DEE2E6] rounded-lg bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 flex items-center justify-between"
      >
        <span className={value ? "text-[#344054]" : "text-[#98A2B3]"}>
          {value || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-[16px] border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
          {normalizedOptions.map((option) => {
            const isSelected = value === option;

            return (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onSelect(option);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-6 py-5 text-left text-sm leading-none shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                  isSelected
                    ? "bg-[#E8EDF4] text-[#111827] font-semibold"
                    : "text-[#1F2937] hover:bg-[#F4F7FB] active:bg-[#EDEFF4]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};


/* ---------- Main Component ---------- */

const IncorporationDetails = () => {
  const { incorporationid } = useSelector(state => state.incorporation);

  const navigate = useNavigate();
  // const { token } = useSelector(state => state.user);
  const token =localStorage.getItem('authToken')
  console.log(token, "555555555555555555555")

  const dispatch = useDispatch();
  const axiosInstance = createAxios(token);

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
        // const axiosInstance = createAxios(token);

        const res = await axiosInstance.get(
          `/config/incorporation-get`,
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
      // const axiosInstance = createAxios(token);

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
            <FormDivSelect
              value={form.companyType}
              onSelect={(selectedValue) =>
                setForm({ ...form, companyType: selectedValue })
              }
              options={[
                "Private Limited",
                "Public Limited",
                "LLP"
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
