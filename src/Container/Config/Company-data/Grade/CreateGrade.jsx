import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const CreateGrade = () => {
  const { token } = useSelector((state) => state.user);
  const [gradeName, setGradeName] = useState("");
  const axiosInstance = createAxios(token)

  const [searchParams] = useSearchParams();
  const gradeId = searchParams.get("id");
  const navigate = useNavigate()


  const handleCancel = () => {
    console.log("Cancelled");
    setGradeName("");
  };




  const handleSave = async () => {
    if (!gradeName.trim()) {
      alert("Grade name is required");
      return;
    }

    try {


      const res = await axiosInstance.post("/config/create-grade", { gradeName }, {
        meta: { auth: "ADMIN_AUTH" },

      });

      console.log(res.data);


      setGradeName("");
      navigate("/config/hris/Company_data/grade");

    } catch (error) {
      console.log("error", error);
    }
  };


  useEffect(() => {
    if (!gradeId) return;
    const edituser = async () => {

      try {
        const res = await axiosInstance.get(`/config/getOne-grade/${gradeId}`)
        setGradeName(res.data.gradeName)
        console.log(res.data)

      }
      catch (error) {
        console.log("error", error)
      }
    }
    edituser()
  }, [gradeId])

  const handleupdateGrade = async () => {
    try {
      const res = await axiosInstance.patch(`/config/update-grade/${gradeId}`, { gradeName },
        { meta: { auth: "ADMIN_AUTH" } }
      )
      setGradeName(res.data.gradeName)
      console.log(res.data)

      navigate("/config/hris/Company_data/grade")

    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        {gradeId ? <div className="flex justify-between gap-2">
          <h1 className="text-2xl font-bold">
            Update Grade
          </h1>
          <button onClick={handleupdateGrade}>Update Changes</button>

        </div>
          : <h1 className="text-2xl font-bold">
            Create Grade
          </h1>}

        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6 max-w-2xl">

        {/* Grade Name */}
        <div>
          <label className="text-sm font-semibold">
            Grade Name
          </label>
          <input
            type="text"
            placeholder="Enter Grade Name"
            value={gradeName}
            onChange={(e) => setGradeName(e.target.value)}
            className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>



      </div>

      {
        !gradeId && <div className="flex justify-end gap-3 pt-6">
          <button
            // onClick={handleCancel}
            onClick={() => navigate('/config/hris/Company_data/grade')}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      }
    </div>
  );
};

export default CreateGrade;