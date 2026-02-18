import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

export default function ProbationView() {
  const {token} = useSelector(state=>state.user)
  const {probitionid} = useSelector(state=>state.probition)
  console.log("probitionid=====",probitionid)
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();

  const axiosInstance = createAxios(token)
  useEffect(() => {
    const fetchprobition = async()=>{

      const res = await axiosInstance.get(`/config/probation-get/${id}`,{
        meta:{auth:"ADMIN_AUTH"}
      })
      setData(res?.data?.data)
      console.log("fetchprobition single view====",res?.data)
    }

    fetchprobition()
  }, [token]);

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
              {data.policyName}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Duration (Days)</label>
            <p className="text-lg font-medium text-gray-900">
              {data.probationDurationDays}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500">Description</label>
            <p className="text-gray-800">
              {data.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}