import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { getprobitiondata } from "../../../../Redux/configSlices/probitionSlice";

export default function CreateProbation() {
  const {token} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const axiosInstance = createAxios(token);
const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    policyName: "",
    description: "",
    probationDurationDays: "",
    isEarlyConfirmationAllowed: false,
    isAutoConfirm: false,
    notifyEmployee: false,
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // select -> number
    if (name === "probationDurationDays") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

    // radio -> boolean
    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        [name]: value === "true",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axiosInstance.post(
        "/config/create-probation",
        formData, // ✅ exact backend format
        { meta: { auth: "ADMIN_AUTH" } }
      );

      console.log(res?.data)
      dispatch(getprobitiondata(res?.data?.data))

      navigate("/config/hris/Employee-data/probation-list");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto bg-white rounded-xl border border-gray-200 shadow-sm p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create Probation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <div className="space-y-6">

          {/* Policy Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Policy Name
            </label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Lets write a brief description about this policy
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm resize-none"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              What will be the initial Probation Duration for this Plan?
            </label>
            <select
              name="probationDurationDays"
              value={formData.probationDurationDays}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white"
            >
              <option value="">Choose Account</option>
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days</option>
              <option value={180}>180 Days</option>
            </select>
          </div>

          {/* Early Confirmation */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Is early employee confirmation allowed?
            </p>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="isEarlyConfirmationAllowed"
                value="true"
                checked={formData.isEarlyConfirmationAllowed === true}
                onChange={handleChange}
              />
              Yes
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="isEarlyConfirmationAllowed"
                value="false"
                checked={formData.isEarlyConfirmationAllowed === false}
                onChange={handleChange}
              />
              No
            </label>
          </div>

          {/* Auto Confirm */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Auto confirm employee?
            </p>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="isAutoConfirm"
                value="true"
                checked={formData.isAutoConfirm === true}
                onChange={handleChange}
              />
              Yes
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="isAutoConfirm"
                value="false"
                checked={formData.isAutoConfirm === false}
                onChange={handleChange}
              />
              No
            </label>
          </div>

          {/* Notify */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">
              Do you want to notify employee?
            </p>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="notifyEmployee"
                value="true"
                checked={formData.notifyEmployee === true}
                onChange={handleChange}
              />
              Yes
            </label>
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="notifyEmployee"
                value="false"
                checked={formData.notifyEmployee === false}
                onChange={handleChange}
              />
              No
            </label>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end mt-10">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

