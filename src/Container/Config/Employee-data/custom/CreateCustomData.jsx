import { useState } from "react";
import { useNavigate } from "react-router-dom";

const valueTypes = [
  { id: "text", label: "Abc" },
  { id: "number", label: "123" },
  { id: "date", label: "📅" },
  { id: "list", label: "≡" },
];

const CreateCustomData = () => {
  const navigate = useNavigate();

  const [classifyIdentity, setClassifyIdentity] = useState("yes");
  const [selectedValueType, setSelectedValueType] = useState("text");
  const [mandatoryField, setMandatoryField] = useState(false);
  const [expiryNotification, setExpiryNotification] = useState(false);
  const [expiryToggle, setExpiryToggle] = useState(false);

  return (
    <div className="min-h-screen  p-5">

      
          {/* Header */}
          <h1 className="text-2xl font-bold mb-6">Add Custom Data</h1>

          {/* Section Name */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-2">
              What is this custom data section called?
            </p>
            <input
              type="text"
              placeholder="Enter section name"
              className="w-full border border-gray-300 rounded p-2"
            />
          </div>

          {/* Classify Under Employee Identity */}
          <div className="mb-6">
            <p className="text-sm font-medium mb-3">
              Would you like to classify this section under Employee Identity?
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={classifyIdentity === "yes"}
                  onChange={() => setClassifyIdentity("yes")}
                />
                Yes
              </label>

              {classifyIdentity === "yes" && (
                <div className="ml-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Expiry Notification */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Expiry Notification
                    </p>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-gray-50">
                      <input
                        type="checkbox"
                        checked={expiryNotification}
                        onChange={() =>
                          setExpiryNotification(!expiryNotification)
                        }
                      />
                      <span className="text-sm text-gray-500">
                        Push notification upon document expiry
                      </span>
                    </div>
                  </div>

                  {/* Expiry Toggle */}
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Include Expiry Date
                    </p>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-300 bg-gray-50">
                      <input
                        type="text"
                        placeholder="Enter expiry label"
                        className="flex-1 border border-gray-300 rounded p-2"
                      />
                      <input
                        type="checkbox"
                        checked={expiryToggle}
                        onChange={() => setExpiryToggle(!expiryToggle)}
                      />
                    </div>
                  </div>
                </div>
              )}

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={classifyIdentity === "no"}
                  onChange={() => setClassifyIdentity("no")}
                />
                No
              </label>
            </div>
          </div>

          {/* Edit Rights */}
          <div className="mb-8">
            <p className="text-sm font-medium mb-2">
              How would you like to configure edit rights?
            </p>
            <select className="w-full border border-gray-300 rounded p-2">
              <option value="">Select Option</option>
              <option value="admin">Admin Only</option>
              <option value="manager">Manager & Admin</option>
              <option value="employee">Employee, Manager & Admin</option>
            </select>
          </div>

          {/* Add Required Fields */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold">Add Required Fields</h3>
              <button className="px-4 py-2 rounded-full bg-blue-600 text-white">
                + Add Custom Field
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm font-medium mb-2">Input Field</p>
                <input
                  type="text"
                  placeholder="Enter field name"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Preview</p>
                <input
                  type="text"
                  placeholder="Eg. ABC"
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium mb-2">Input Value Type</p>
                <div className="flex gap-2">
                  {valueTypes.map((vt) => (
                    <button
                      key={vt.id}
                      onClick={() => setSelectedValueType(vt.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-medium border ${
                        selectedValueType === vt.id
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-500 border-gray-300"
                      }`}
                    >
                      {vt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Mandatory Field</p>
                <input
                  type="checkbox"
                  checked={mandatoryField}
                  onChange={() => setMandatoryField(!mandatoryField)}
                />
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-300">
            <button
              className="px-4 py-2 rounded border border-gray-300"
              onClick={() => navigate("/config/hris/Employee-data/custom-list")}
            >
              Cancel
            </button>

            <button className="px-4 py-2 rounded bg-blue-600 text-white">
              Save
            </button>
          </div>

     
    
    </div>
  );
};

export default CreateCustomData;
