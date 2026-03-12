import React, { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

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
  { value: "Delhi Office", label: "Delhi Office" },
  { value: "Mumbai Office", label: "Mumbai Office" },
];

const BUSINESS_HEAD_OPTIONS = [
  { value: "John Doe", label: "John Doe" },
  { value: "Jane Smith", label: "Jane Smith" },
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

const EditBusinessUnit = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // If data passed via navigate state
  const data = location.state || {
    name: "Leap Of Faith",
    location: "Mohali Office",
    head: "John Doe",
  };

  const [name, setName] = useState(data.name);
  const [unitLocation, setUnitLocation] = useState(data.location);
  const [assignHead, setAssignHead] = useState(data.head ? "yes" : "no");
  const [head, setHead] = useState(data.head || "");
  const [logo, setLogo] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  const handleUpdate = () => {
    // Update logic here
    navigate("/config/hris/Company_data/buisness-unit-list");
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Business Unit</h1>
        <p className="text-sm text-gray-500 mt-1">
          Update business unit details.
        </p>
      </div>

      <div className="max-w-4xl space-y-6 rounded-xl border border-gray-200 bg-white p-6">

        <div>
          <label className="text-sm font-medium text-gray-700">Business Unit Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Location</label>
          <FormDivSelect
            value={unitLocation}
            onSelect={setUnitLocation}
            options={LOCATION_OPTIONS}
            placeholder="Choose Account"
          />
        </div>

        <div className="rounded-xl border border-dashed border-gray-300 bg-[#FCFDFE] p-6">
          <div className="flex justify-between mb-4">
            <label className="text-sm font-medium text-gray-700">Business Unit Logo</label>
            <span className="text-xs text-gray-400">Recommended Size: 280 x 110 px</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
              {logo ? (
                <img
                  src={logo}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400 text-xs">Preview</span>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs text-gray-500">
                Note: Upload photo with max size 2MB for optimum results.
                (Supports .gif, .jpeg, .jpg and .png file types)
              </p>
            </div>

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

        {/* Assign Head */}
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-3">
            Do you want to assign a Business Unit Head? (Optional)
          </label>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                value="yes"
                checked={assignHead === "yes"}
                onChange={(e) => setAssignHead(e.target.value)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {assignHead === "yes" && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Business Unit Head</label>
                <FormDivSelect
                  value={head}
                  onSelect={setHead}
                  options={BUSINESS_HEAD_OPTIONS}
                  placeholder="Choose Account"
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                value="no"
                checked={assignHead === "no"}
                onChange={(e) => {
                  setAssignHead(e.target.value);
                  setHead("");
                }}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className={flatSecondaryButtonClassName}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            className={flatPrimaryButtonClassName}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBusinessUnit;
