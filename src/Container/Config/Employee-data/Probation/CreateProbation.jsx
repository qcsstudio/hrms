import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useDispatch, useSelector } from "react-redux";
import { getprobitiondata } from "../../../../Redux/configSlices/probitionSlice";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const textareaClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

export default function CreateProbation() {
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const axiosInstance = createAxios(token);
  const dispatch = useDispatch();

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

    if (name === "probationDurationDays") {
      setFormData((prev) => ({
        ...prev,
        [name]: Number(value),
      }));
      return;
    }

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
        formData,
        { meta: { auth: "ADMIN_AUTH" } }
      );

      console.log(res?.data);
      dispatch(getprobitiondata(res?.data?.data));

      navigate("/config/hris/Employee-data/probation-list");
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleCancel = () => {
    navigate("/config/hris/Employee-data/probation-list");
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900">Create Probation</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
          <div>
            <label className="text-sm font-medium text-gray-700">Policy Name</label>
            <input
              type="text"
              name="policyName"
              value={formData.policyName}
              onChange={handleChange}
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Lets write a brief description about this policy
            </label>
            <textarea
              rows={4}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={textareaClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              What will be the initial Probation Duration for this Plan?
            </label>
            <select
              name="probationDurationDays"
              value={formData.probationDurationDays}
              onChange={handleChange}
              className={fieldClassName}
            >
              <option value="">Choose Account</option>
              <option value={30}>30 Days</option>
              <option value={60}>60 Days</option>
              <option value={90}>90 Days</option>
              <option value={180}>180 Days</option>
            </select>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">
              Is early employee confirmation allowed?
            </p>
            <div className="space-y-3">
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="isEarlyConfirmationAllowed"
                  value="true"
                  checked={formData.isEarlyConfirmationAllowed === true}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="isEarlyConfirmationAllowed"
                  value="false"
                  checked={formData.isEarlyConfirmationAllowed === false}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Auto confirm employee?</p>
            <div className="space-y-3">
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="isAutoConfirm"
                  value="true"
                  checked={formData.isAutoConfirm === true}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="isAutoConfirm"
                  value="false"
                  checked={formData.isAutoConfirm === false}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">Do you want to notify employee?</p>
            <div className="space-y-3">
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="notifyEmployee"
                  value="true"
                  checked={formData.notifyEmployee === true}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">Yes</span>
              </label>
              <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
                <input
                  type="radio"
                  name="notifyEmployee"
                  value="false"
                  checked={formData.notifyEmployee === false}
                  onChange={handleChange}
                />
                <span className="text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className={`${flatSecondaryButtonClassName} w-full sm:w-auto`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={`${flatPrimaryButtonClassName} w-full sm:w-auto`}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
