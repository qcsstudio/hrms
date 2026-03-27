import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createAxios from "../../../utils/axios.config";

const AssetsCategoryCreate = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const axiosInstance = useMemo(() => createAxios(token), [token]);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [assetName, setAssetName] = useState("");
  const [brand, setBrand] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [assetType, setAssetType] = useState("physical");
  const [acknowledgement, setAcknowledgement] = useState("no");
  const [warranty, setWarranty] = useState("no");
  const valueTypes = [
    { id: "text", label: "Abc" },
    { id: "number", label: "123" },
    { id: "date", label: "Date" },
    { id: "list", label: "List" },
  ];
  const emptyField = {
    fieldLabel: "",
    inputValueType: "text",
    isMandatory: false,
    options: [],
  };
  const [customFields, setCustomFields] = useState([emptyField]);

  const buildPayload = () => {
    const attributes = customFields
      .map((field) => {
        const trimmedLabel = field.fieldLabel.trim();
        const trimmedOptions = (field.options || [])
          .map((option) => option.trim())
          .filter(Boolean);

        if (!trimmedLabel) {
          return null;
        }

        const attribute = {
          fieldLabel: trimmedLabel,
          inputValueType: field.inputValueType,
        };

        if (field.isMandatory) {
          attribute.isMandatory = true;
        }

        if (field.inputValueType === "list" && trimmedOptions.length) {
          attribute.options = trimmedOptions;
        }

        return attribute;
      })
      .filter(Boolean);

    return {
      categoryName: categoryName.trim(),
      assetName: assetName.trim(),
      brand: brand.trim(),
      condition,
      description: description.trim(),
      assetType,
      acknowledgement,
      warranty,
      attributes,
    };
  };

  const handleSave = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name is required");
      setStep(1);
      return;
    }

    if (!assetName.trim()) {
      toast.error("Asset name is required");
      setStep(1);
      return;
    }

    if (!condition) {
      toast.error("Condition is required");
      setStep(1);
      return;
    }

    const hasInvalidField = customFields.some((field) => {
      if (!field.fieldLabel.trim()) {
        return true;
      }

      if (field.inputValueType === "list") {
        return !(field.options || []).some((option) => option.trim());
      }

      return false;
    });

    if (hasInvalidField) {
      toast.error("Please complete all required custom field details");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = buildPayload();
      const response = await axiosInstance.post(
        "/config/create-asset-category",
        payload,
        {
          meta: { auth: "ADMIN_AUTH" },
        }
      );

      toast.success(
        response?.data?.message || "Asset category created successfully"
      );
      setStep(3);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to create asset category"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const addCustomField = () => {
    setCustomFields((prev) => [...prev, { ...emptyField }]);
  };

  const deleteCustomField = (index) => {
    const updated = customFields.filter((_, i) => i !== index);
    setCustomFields(updated.length ? updated : [{ ...emptyField }]);
  };

  const updateField = (index, key, value) => {
    const updated = [...customFields];
    updated[index] = { ...updated[index], [key]: value };
    setCustomFields(updated);
  };

  const changeValueType = (index, type) => {
    const updated = [...customFields];
    updated[index] = {
      ...updated[index],
      inputValueType: type,
      options: [],
    };
    setCustomFields(updated);
  };

  const addOption = (index) => {
    const updated = [...customFields];
    updated[index].options = [...updated[index].options, ""];
    setCustomFields(updated);
  };

  const updateOption = (fieldIndex, optionIndex, value) => {
    const updated = [...customFields];
    updated[fieldIndex].options[optionIndex] = value;
    setCustomFields(updated);
  };

  const deleteOption = (fieldIndex, optionIndex) => {
    const updated = [...customFields];
    updated[fieldIndex].options.splice(optionIndex, 1);
    setCustomFields(updated);
  };

  const renderPreview = (field) => {
    const previewLabel = field.fieldLabel || "Review";

    if (field.inputValueType === "text") {
      return (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-500 mb-2">Review</p>
          <p className="text-sm font-medium text-gray-700 mb-2">{previewLabel}</p>
          <input
            placeholder="Eg. ABC"
            disabled
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-400 cursor-not-allowed"
          />
        </div>
      );
    }

    if (field.inputValueType === "number") {
      return (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-500 mb-2">Review</p>
          <p className="text-sm font-medium text-gray-700 mb-2">{previewLabel}</p>
          <input
            type="text"
            placeholder="Eg. 123"
            disabled
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-400 cursor-not-allowed"
          />
        </div>
      );
    }

    if (field.inputValueType === "date") {
      return (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-500 mb-2">Review</p>
          <p className="text-sm font-medium text-gray-700 mb-2">{previewLabel}</p>
          <input
            type="text"
            placeholder="Eg. DD/MM/YYYY"
            disabled
            className="w-full border border-gray-300 rounded p-2 bg-white text-gray-400 cursor-not-allowed"
          />
        </div>
      );
    }

    if (field.inputValueType === "list") {
      return (
        <div className="border rounded-lg p-3 bg-gray-50">
          <p className="text-xs font-medium text-gray-500 mb-2">Review</p>
          <p className="text-sm font-medium text-gray-700 mb-2">{previewLabel}</p>
          <select className="w-full border border-gray-300 rounded p-2 bg-white">
            <option value="">Eg. Select option</option>
            {field.options.map((option, index) => (
              <option key={index} value={option}>
                {option || `Option ${index + 1}`}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return null;
  };

  const renderGeneratedField = (field, index) => {
    const label = field.fieldLabel || `Field ${index + 1}`;

    if (field.inputValueType === "text") {
      return (
        <input
          className="w-full border border-gray-300 rounded p-2"
          placeholder={`Eg. ${label}`}
        />
      );
    }

    if (field.inputValueType === "number") {
      return (
        <input
          type="number"
          className="w-full border border-gray-300 rounded p-2"
          placeholder="Eg. 123"
        />
      );
    }

    if (field.inputValueType === "date") {
      return (
        <input
          type="date"
          className="w-full border border-gray-300 rounded p-2"
        />
      );
    }

    if (field.inputValueType === "list") {
      return (
        <select className="w-full border border-gray-300 rounded p-2">
          <option value="">Select option</option>
          {field.options.map((option, optionIndex) => (
            <option key={optionIndex} value={option}>
              {option || `Option ${optionIndex + 1}`}
            </option>
          ))}
        </select>
      );
    }

    return null;
  };

  /* 🔵 Reusable Radio Card */
  const RadioCard = ({ selected, onClick, label, subtitle }) => (
    <button
      type="button"
      onClick={onClick}
      className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all
        ${
          selected
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }
      `}
    >
      {/* Radio Circle */}
      <span
        className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center
          ${selected ? "border-blue-500" : "border-gray-400"}
        `}
      >
        {selected && (
          <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        )}
      </span>

      {/* Text */}
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        {subtitle && (
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-muted/30 flex">
      <div className="flex-1 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold mb-1">Add New Category</h1>
          <p className="text-sm text-muted-foreground mb-8">
            Manage employee directory, documents, and role-based actions.
          </p>

          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    step >= item ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item}
                </div>
                <span className={`text-sm font-medium ${step === item ? "text-blue-600" : "text-gray-500"}`}>
                  {item === 1 ? "Category Details" : item === 2 ? "Required Fields" : "Generated Form"}
                </span>
                {item < 3 && <div className="w-16 h-px bg-gray-300" />}
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Category Name
                </label>
                <input
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Choose Account"
                  className="w-full px-4 py-2.5 rounded-lg border"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <input
                  value={assetName}
                  onChange={(e) => setAssetName(e.target.value)}
                  placeholder="Asset Name"
                  className="px-4 py-2.5 rounded-lg border"
                />
                <input
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="Brand"
                  className="px-4 py-2.5 rounded-lg border"
                />
                <select
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                  className="px-4 py-2.5 rounded-lg border"
                >
                  <option value="">Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Details of the assets"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border mb-8"
              />

              <div className="mb-8 space-y-3">
                <RadioCard
                  selected={assetType === "physical"}
                  onClick={() => setAssetType("physical")}
                  label="Physical"
                  subtitle="Any material object like laptops, notebooks, test tubes."
                />
                <RadioCard
                  selected={assetType === "digital"}
                  onClick={() => setAssetType("digital")}
                  label="Digital"
                  subtitle="Any software, application, or license."
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-semibold mb-3">
                  Acknowledgement Required?
                </label>
                <div className="space-y-3">
                  <RadioCard
                    selected={acknowledgement === "yes"}
                    onClick={() => setAcknowledgement("yes")}
                    label="Yes"
                  />
                  <RadioCard
                    selected={acknowledgement === "no"}
                    onClick={() => setAcknowledgement("no")}
                    label="No"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold mb-3">
                  Are assets under this category covered under warranty?
                </label>
                <div className="space-y-3">
                  <RadioCard
                    selected={warranty === "yes"}
                    onClick={() => setWarranty("yes")}
                    label="Yes"
                  />
                  <RadioCard
                    selected={warranty === "no"}
                    onClick={() => setWarranty("no")}
                    label="No"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Add Required Fields</h3>
                <button
                  onClick={addCustomField}
                  className="px-4 py-2 rounded-full bg-blue-600 text-white"
                >
                  + Add Custom Field
                </button>
              </div>

              {customFields.map((field, i) => (
                <div key={i} className="mb-8 border-b pb-6 flex gap-3 items-center">
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => deleteCustomField(i)}
                  >
                    🗑
                  </button>

                  <div className="flex-1">
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <input
                        className="border rounded p-2"
                        placeholder="Input Field"
                        value={field.fieldLabel}
                        onChange={(e) =>
                          updateField(i, "fieldLabel", e.target.value)
                        }
                      />
                      {renderPreview(field)}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium mb-2">
                          Input Value Type
                        </p>
                        <div className="flex gap-2">
                          {valueTypes.map((vt) => (
                            <button
                              key={vt.id}
                              onClick={() => changeValueType(i, vt.id)}
                              className={`w-10 h-10 rounded-full border ${
                                field.inputValueType === vt.id
                                  ? "bg-blue-600 text-white"
                                  : "bg-white text-gray-500"
                              }`}
                            >
                              {vt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={field.isMandatory}
                          onChange={() =>
                            updateField(i, "isMandatory", !field.isMandatory)
                          }
                        />
                        Mandatory Field
                      </label>
                    </div>

                    {field.inputValueType === "list" && (
                      <div className="mt-4">
                        {field.options.map((o, oi) => (
                          <div key={oi} className="flex gap-2 mb-2 items-center">
                            <button
                              className="text-red-500"
                              onClick={() => deleteOption(i, oi)}
                            >
                              🗑
                            </button>

                            <input
                              className="border rounded p-2 w-full"
                              placeholder="Add option"
                              value={o}
                              onChange={(e) =>
                                updateOption(i, oi, e.target.value)
                              }
                            />
                          </div>
                        ))}

                        <button
                          className="text-blue-600 text-sm"
                          onClick={() => addOption(i)}
                        >
                          + Add Option
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div className="mb-8">
              <div className="mb-6">
                <h3 className="font-bold text-lg">Generated Form</h3>
                <p className="text-sm text-gray-500 mt-1">
                  Ye form aapke banaye hue required fields ke according render ho raha hai.
                </p>
              </div>

              <div className="space-y-5">
                {customFields.map((field, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium mb-2">
                      {field.fieldLabel || `Field ${index + 1}`}
                      {field.isMandatory ? " *" : ""}
                    </label>
                    {renderGeneratedField(field, index)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-10 border-t pt-6">
            <button
              onClick={() => navigate("/assets-category")}
              className="px-6 py-2.5 border rounded-lg"
            >
              Cancel
            </button>

            {step > 1 && (
              <button
                onClick={() => setStep((prev) => prev - 1)}
                className="px-6 py-2.5 border rounded-lg"
              >
                Back
              </button>
            )}

            {step === 1 ? (
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                Next
              </button>
            ) : step === 2 ? (
              <button
                onClick={handleSave}
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            ) : (
              <button
                onClick={() => navigate("/config/hrOps/hrops-assests/list")}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
              >
                Finish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsCategoryCreate;
