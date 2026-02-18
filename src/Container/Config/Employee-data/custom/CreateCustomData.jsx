import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from '../../../../utils/axios.config'
import { useSelector } from "react-redux";

const valueTypes = [
  { id: "text", label: "Abc" },
  { id: "number", label: "123" },
  { id: "date", label: "📅" },
  { id: "list", label: "≡" },
];

const emptyField = {
  fieldLabel: "",
  inputValueType: "text",
  isMandatory: false,
  options: [],
  isMultiSelect: false,
};

const CreateCustomData = () => {
const {token} = useSelector(state=>state.user)

  const navigate = useNavigate();

  /* ================= TOP SECTION ================= */
  const [sectionName, setSectionName] = useState("");
  const [classifyIdentity, setClassifyIdentity] = useState("yes");
  const [expiryNotification, setExpiryNotification] = useState(false);
  const [expiryToggle, setExpiryToggle] = useState(false);
  const [editRights, setEditRights] = useState("");

  /* ================= CUSTOM FIELDS ================= */
  const [customFields, setCustomFields] = useState([emptyField]);

  /* ================= HANDLERS ================= */
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
      isMultiSelect: false,
    };
    setCustomFields(updated);
  };

  /* ================= LIST OPTIONS ================= */
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

  /* ================= PREVIEW ================= */
  const renderPreview = (field) => {
    if (field.inputValueType === "text")
      return (
        <input
          placeholder="Eg. ABC"
          className="w-full border border-gray-300 rounded p-2"
        />
      );

    if (field.inputValueType === "number")
      return (
        <input
          type="number"
          placeholder="123"
          className="w-full border border-gray-300 rounded p-2"
        />
      );

    if (field.inputValueType === "date")
      return (
        <input
          type="date"
          className="w-full border border-gray-300 rounded p-2"
        />
      );

    if (field.inputValueType === "list")
      return (
        <select
          multiple={field.isMultiSelect}
          className="w-full border border-gray-300 rounded p-2"
        >
          {field.options.map((o, i) => (
            <option key={i}>{o}</option>
          ))}
        </select>
      );
  };

  const axiosInstance = createAxios(token)

  /* ================= SAVE ================= */
  const handleSave = async() => {
    const payload = {
      sectionName,
      classifyUnderEmployeeIdentity: classifyIdentity === "yes",
      includeMandatoryExpiryDate: expiryToggle,
      pushNotificationOnExpiry: expiryNotification,
      editRights,
      isActive: true,

      customFields: customFields.map((f) => ({
        fieldLabel: f.fieldLabel,
        inputValueType: f.inputValueType,
        isMandatory: f.isMandatory,
      })),

      fieldValues: {
        document_name: "Passport",
        document_number: "A12345678",
        expiry_date: "2030-12-31",
        document_type: "Government ID",
      },
    };
    try {

      const res = await axiosInstance.post(`/config/create-customData`,payload,{
        meta : {auth:"ADMIN_AUTH"}
      })
      console.log(res.data)
      navigate('/config/hris/Employee-data/custom-list')
    } catch (error) {
      console.log("api is not working",error)
      
    }

    console.log("BACKEND PAYLOAD 👉", payload);
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-5">
      <h1 className="text-2xl font-bold mb-6">Add Custom Data</h1>

      {/* Section Name */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">
          What is this custom data section called?
        </p>
        <input
          className="w-full border border-gray-300 rounded p-2"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
        />
      </div>

      {/* Identity */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-3">
          Would you like to classify this section under Employee Identity?
        </p>

        <label className="flex gap-2 mb-3">
          <input
            type="radio"
            checked={classifyIdentity === "yes"}
            onChange={() => setClassifyIdentity("yes")}
          />
          Yes
        </label>

        {classifyIdentity === "yes" && (
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 border p-3 rounded bg-gray-50">
              <input
                type="checkbox"
                checked={expiryNotification}
                onChange={() => setExpiryNotification(!expiryNotification)}
              />
              <span className="text-sm text-gray-500">
                Push notification upon document expiry
              </span>
            </div>

            <div className="flex items-center gap-3 border p-3 rounded bg-gray-50">
              <input
                type="checkbox"
                checked={expiryToggle}
                onChange={() => setExpiryToggle(!expiryToggle)}
              />
              <span className="text-sm text-gray-500">
                Include Expiry Date
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Rights */}
      <div className="mb-8">
        <p className="text-sm font-medium mb-2">
          How would you like to configure edit rights?
        </p>
        <select
          className="w-full border border-gray-300 rounded p-2"
          value={editRights}
          onChange={(e) => setEditRights(e.target.value)}
        >
          <option value="">Select Option</option>
          <option value="admin_only">Admin Only</option>
          <option value="manager_admin">Manager & Admin</option>
          <option value="all">Employee, Manager & Admin</option>
        </select>
      </div>

      {/* REQUIRED FIELDS */}
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
          <div key={i} className="mb-8 border-b pb-6 flex gap-3">
            
            {/* LEFT DELETE FIELD */}
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
                  <label className="flex items-center gap-2 mb-2">
                    <input
                      type="checkbox"
                      checked={field.isMultiSelect}
                      onChange={() =>
                        updateField(i, "isMultiSelect", !field.isMultiSelect)
                      }
                    />
                    Multi Select
                  </label>

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

      {/* FOOTER */}
      <div className="flex justify-end gap-3 border-t pt-4">
        <button
          className="px-4 py-2 border rounded"
          onClick={() =>
            navigate("/config/hris/Employee-data/custom-list")
          }
        >
          Cancel
        </button>

        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default CreateCustomData;
