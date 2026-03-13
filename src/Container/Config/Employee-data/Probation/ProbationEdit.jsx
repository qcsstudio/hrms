import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const textareaClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const flatSecondaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg border border-gray-300 bg-white text-gray-700 text-sm font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "inline-flex items-center justify-center h-10 px-6 rounded-lg bg-blue-600 text-white text-sm font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

export default function ProbationEdit() {
  const { token } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({
    policyName: "",
    probationDurationDays: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const axiosInstance = createAxios(token);

  const handleSave = async () => {
    console.log("Updated Probation:", form);
    const payload = {
      ...form,
      _id: id,
    };

    try {
      await axiosInstance.post(`/config/create-probation`, payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      navigate("/config/hris/Employee-data/probation-list");
    } catch (error) {
      console.log("api is not working", error);
    }
  };

  useEffect(() => {
    const fetchprobition = async () => {
      const res = await axiosInstance.get(`/config/probation-get/${id}`, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setForm({
        policyName: res?.data?.data?.policyName || "",
        probationDurationDays: res?.data?.data?.probationDurationDays || "",
        description: res?.data?.data?.description || "",
      });

      console.log("fetchprobition single view====", res?.data);
    };

    fetchprobition();
  }, [id, token]);

  return (
    <div className="p-8">
      <div className="max-w-4xl">
        <div className="mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Probation Plan
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Update probation configuration and settings
            </p>
          </div>
        </div>

        <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Probation Name
            </label>
            <input
              type="text"
              name="policyName"
              value={form.policyName}
              onChange={handleChange}
              placeholder="Enter probation name"
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Duration (Days)
            </label>
            <input
              type="number"
              name="probationDurationDays"
              value={form.probationDurationDays}
              onChange={handleChange}
              placeholder="Enter duration"
              className={fieldClassName}
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter description"
              className={textareaClassName}
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate("/config/hris/Employee-data/probation-list")}
              className={`${flatSecondaryButtonClassName} w-full sm:w-auto`}
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              className={`${flatPrimaryButtonClassName} w-full sm:w-auto`}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
