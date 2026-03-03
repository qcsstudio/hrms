import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateTeam = ({ onCancel }) => {
  const { token } = useSelector((state) => state.user);
    console.log("token hai====",token)

  const [team, setTeam] = useState({
    teamName: "",
    assignTeamLead: false,
    teamLeadId: ""

  });
  const [assignLead, setAssignLead] = useState("no");
  // const [teamLead, setTeamLead] = useState("");
  const [employee, setEmployee] = useState([])

  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamid");

  const [teamdata,setTeamdata] = useState()
  
  const navigate = useNavigate()
  const axiosInstance = createAxios(token)

 useEffect(() => {
  const fetchTeam = async () => {
    try {
      const res = await axiosInstance.get(`/config/getOne-team/${teamId}`);
      setTeamdata(res?.data);
      console.log("fetch one team ========", res?.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
    fetchTeam();
  
}, []);



  const handleSave = async () => {
    const payload =
    {
      teamName: team.teamName,
      assignTeamLead: team.assignTeamLead,
      teamLeadId: team.teamLeadId,

    }
    const res = await axiosInstance.post(
      "/config/create-team",
      payload,
      {
        meta: { auth: "ADMIN_AUTH" }
      }
    );

    setTeam(res.data);
    console.log("create team=========",res.data)


    console.log("Saved Team:", payload);

    if (onCancel) onCancel();



  };

  const handleUpdate = async()=>{
    await axiosInstance.patch(`/config/update-team/${teamId}`,{
      meta:{auth:"ADMIN_AUTH"}
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setTeam({
      ...team,
      [name]: value
    })

  }


  useEffect(() => {
    const fetchUsers = async () => {
      const res = await axiosInstance.get("/employees/all", {
        meta: { auth: "ADMIN_AUTH" }
      }

      )
      console.log("all Employees============",res.data)
      setEmployee(res.data)
     
    }

    fetchUsers()
  }, [token])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        {teamId ?
          <div className="flex justify-between">
            <h1 className="text-2xl font-semibold">update Team</h1>
            <button className="px-4 py-2 bg-[#0575E6] text-white rounded-md text-sm" onClick={handleUpdate}>Save Changes</button>
          </div>
          :
          <h1 className="text-2xl font-semibold">Create Team</h1>
        }
        <h1 className="text-2xl font-semibold">update Team</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white border rounded-lg p-6 max-w-2xl space-y-6">

        {/* Team Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Team Name
          </label>
          <input
            type="text"
              name="teamName"   
            placeholder="Enter team name"
            value={team.teamName }
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Assign Team Lead */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Do you want to assign a Team Lead?
          </label>

          {/* YES Option */}
          <div className="border rounded-lg p-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="assignTeamLead"

                checked={team.assignTeamLead === true}
                onChange={() => {
                  setTeam({
                    ...team,
                    assignTeamLead: true
                  })
                  setAssignLead("yes");
                }}
              />
              Yes
            </label>

            {/* Dropdown */}
            {assignLead === "yes" && (
              <div className="mt-4 pl-6">
                <label className="block text-sm font-medium mb-2">
                  Select Team Lead
                </label>
                <select
                  name="teamLeadId"
                  value={team.teamLeadId}
                  onChange={handleChange}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >

                  {employee.map((item) => (
                    <option
                      key={item.employees._id}
                      value={item.employees._id}
                    >
                      {item.employees.fullName}
                    </option>
                  ))}


                </select>
              </div>
            )}
          </div>

          {/* NO Option */}
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"

                name="assignTeamLead"

                checked={team.assignTeamLead === false}
                onChange={() => {
                  setTeam({
                    ...team,
                    assignTeamLead: false
                  })
                  setAssignLead("no");
                }}
              />
              No
            </label>
          </div>
        </div>

        {/* Buttons */}
        {
          !teamId && <div className="flex justify-end gap-3 pt-4">
            <button
              // onClick={onCancel}
              onClick={() => navigate('/config/hris/Company_data/team')}
              className="px-4 py-2 border rounded-md text-sm"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm"
            >
              Save
            </button>
          </div>
        }

      </div>
    </div>
  );
};

export default CreateTeam;