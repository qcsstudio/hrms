import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProbationView() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState(null);

  useEffect(() => {
    // Replace with API call later
    setData({
      name: "6 Months",
      duration: 180,
      description: "Default probation plan",
      status: "Active",
    });
  }, [id]);

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Probation Plan Details
            </h1>
            <p className="text-sm text-gray-500">
              View probation configuration
            </p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="border border-gray-300 px-4 py-2 rounded-lg text-sm hover:bg-gray-100"
          >
            Back
          </button>
        </div>

        {/* Details */}
        <div className="space-y-6">

          <div>
            <label className="text-sm text-gray-500">Probation Name</label>
            <p className="text-lg font-medium text-gray-900">
              {data.name}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Duration (Days)</label>
            <p className="text-lg font-medium text-gray-900">
              {data.duration}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Description</label>
            <p className="text-gray-800">
              {data.description}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Status</label>
            <p className="text-lg font-semibold text-green-600">
              {data.status}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
