import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";
import createAxios from "../../../../utils/axios.config";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const flatUploadButtonClassName =
  "inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white cursor-pointer shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const LOCATION_OPTIONS = [
  { value: "Mohali Office", label: "Mohali Office" },
  { value: "Delhi Main Branch", label: "Delhi Main Branch" },
  { value: "Mumbai Office", label: "Mumbai Office" },
];

const BUSINESS_HEAD_OPTIONS = [
  { value: "john doe", label: "John Doe" },
  { value: "jane smith", label: "Jane Smith" },
];

const FormDivSelect = ({ options = [], value, onSelect, placeholder = "Select", disabled = false }) => {
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

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        className={`mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
          disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
        }`}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
          {options.map((option) => {
            const isSelected = value === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onSelect(option.value);
                  setIsOpen(false);
                }}
                className={`w-full border-none px-4 py-3 text-left text-sm shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                  isSelected
                    ? "bg-[#E8EDF4] text-[#111827] font-semibold"
                    : "text-[#1F2937] hover:bg-[#F4F7FB] active:bg-[#EDEFF4]"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

const CreateBusinessUnit = () => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const location = useLocation();
  const axiosInstance = createAxios(token);

  const isEdit = location.state?.isEdit || false;
  const editData = location.state?.data || null;

  const [assignHead, setAssignHead] = useState(false);
  const [logoPreview, setLogoPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [companyOfficeId] = useState([]);

  const [form, setForm] = useState({
    businessUnitName: "",
    locationName: "",
    businessHead: "",
  });

  useEffect(() => {
    if (isEdit && editData) {
      setForm({
        businessUnitName: editData.name || "",
        locationName: editData.location || "",
        businessHead: editData.head || "",
      });

      setAssignHead(Boolean(editData.head));
      setLogoPreview(editData.logo || null);
    }
  }, [isEdit, editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  const handleSave = async () => {
    try {
      const payload = {
        businessUnitName: form.businessUnitName,
        locationName: form.locationName,
        logo: logoFile || null,
        assignBusinessHead: assignHead,
        businessHead: assignHead ? form.businessHead : null,
        companyOfficeId: [companyOfficeId],
      };

      await axiosInstance.post("/config/create-buinessUnit", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        meta: { auth: "ADMIN_AUTH" },
      });

      navigate("/config/hris/Company_data/buisness-unit-list");
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        businessUnitId: editData.id,
        businessUnitName: form.businessUnitName,
        locationName: form.locationName,
        logo: logoFile || editData.logo,
        assignBusinessHead: assignHead,
        businessHead: assignHead ? form.businessHead : null,
      };

      await axiosInstance.put(`/config/update-buinessUnit/${editData.id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        meta: { auth: "ADMIN_AUTH" },
      });

      navigate("/config/hris/Company_data/buisness-unit-list");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Business Unit" : "Create Business Unit"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {isEdit && (
          <button type="button" onClick={handleUpdate} className={flatPrimaryButtonClassName}>
            Save Changes
          </button>
        )}
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6">
        <div>
          <label className="text-sm font-medium text-gray-700">Business Unit Name</label>
          <input
            name="businessUnitName"
            value={form.businessUnitName}
            onChange={handleChange}
            className={fieldClassName}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <FormDivSelect
            value={form.locationName}
            onSelect={(selectedLocation) =>
              setForm((prev) => ({ ...prev, locationName: selectedLocation }))
            }
            options={LOCATION_OPTIONS}
            placeholder="Choose Account"
          />
        </div>

        <div className="rounded-xl border border-dashed border-gray-300 bg-[#FCFDFE] p-6">
          <div className="mb-4 flex justify-between">
            <label className="text-sm font-medium text-gray-700">Business Unit Logo</label>
            <span className="text-xs text-gray-400">Recommended Size: 280 x 110 px</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              {logoPreview ? (
                <img src={logoPreview} alt="preview" className="h-full w-full object-cover" />
              ) : (
                <span className="text-xs text-gray-400">Preview</span>
              )}
            </div>

            <p className="flex-1 text-xs text-gray-500">
              Upload photo (max 2MB). Supported: jpg, jpeg, png, gif
            </p>

            <label className={flatUploadButtonClassName}>
              Upload
              <input
                type="file"
                className="hidden"
                accept=".jpg,.jpeg,.png,.gif"
                onChange={handleImageUpload}
              />
            </label>
          </div>
        </div>

        <div>
          <label className="mb-3 block text-sm font-medium text-gray-700">
            Do you want to assign a Business Unit Head? (Optional)
          </label>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex cursor-pointer items-center gap-2`}>
              <input
                type="radio"
                checked={assignHead === true}
                onChange={() => setAssignHead(true)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {assignHead && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Business Unit Head</label>
                <FormDivSelect
                  value={form.businessHead}
                  onSelect={(selectedHead) =>
                    setForm((prev) => ({ ...prev, businessHead: selectedHead }))
                  }
                  options={BUSINESS_HEAD_OPTIONS}
                  placeholder="Choose Account"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex cursor-pointer items-center gap-2`}>
              <input
                type="radio"
                checked={assignHead === false}
                onChange={() => setAssignHead(false)}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {!isEdit && (
          <div className="flex justify-end gap-4 pt-2">
            <button type="button" onClick={handleCancel} className={flatSecondaryButtonClassName}>
              Cancel
            </button>

            <button type="button" onClick={handleSave} className={flatPrimaryButtonClassName}>
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateBusinessUnit;
