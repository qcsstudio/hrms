import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

export default function ProbationEdit() {
  const { token } = useSelector(state => state.user)

  const navigate = useNavigate();
  const { id } = useParams(); // probation id
  const [form, setForm] = useState({
    policyName: "",
    probationDurationDays: "",
    description: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const axiosInstance = createAxios(token)

  const handleSave = async () => {
    console.log("Updated Probation:", form);
    const payload = {
      ...form,
      _id: id
    }

    try {
      await axiosInstance.post(`/config/create-probation`, payload, {
        meta: { auth: "ADMIN_AUTH" }
      })
      navigate("/config/hris/Employee-data/probation-list");


    } catch (error) {
      console.log("api is not working", error)

    }
  };

  useEffect(() => {
    // if (!id) return;
    const fetchprobition = async () => {

      const res = await axiosInstance.get(`/config/probation-get/${id}`, {
        meta: { auth: "ADMIN_AUTH" }
      })
      setForm({
        policyName: res?.data?.data?.policyName || "",
        probationDurationDays: res?.data?.data?.probationDurationDays || "",
        description: res?.data?.data?.description || ""
      });

      console.log("fetchprobition single view====", res?.data)
    };

    fetchprobition()
  }, [id, token]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className=" mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Edit Probation Plan
            </h1>
            <p className="text-sm text-gray-500">
              Update probation configuration and settings
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        {/* Card */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Probation Name
            </label>
            <input
              type="text"
              name="policyName"
              value={form.policyName}
              onChange={handleChange}
              placeholder="Enter probation name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration (Days)
            </label>
            <input
              type="number"
              name="probationDurationDays"
              value={form.probationDurationDays}
              onChange={handleChange}
              placeholder="Enter duration"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Enter description"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="disabled">Disabled</option>
            </select>
          </div> */}

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate("/config/hris/Employee-data/probation-list")}
              className="px-5 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
