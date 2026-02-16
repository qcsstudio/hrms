import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTeam = ({ onCancel }) => {
  const [teamName, setTeamName] = useState("");
  const [assignLead, setAssignLead] = useState("no");
  const [teamLead, setTeamLead] = useState("");

  const handleSave = () => {
    const payload = {
      teamName,
      assignLead,
      teamLead: assignLead === "yes" ? teamLead : null,
    };

    console.log("Saved Team:", payload);

    if (onCancel) onCancel();
  };

  const navigate = useNavigate()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Team</h1>
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
            placeholder="Enter team name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
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
                value="yes"
                checked={assignLead === "yes"}
                onChange={(e) => setAssignLead(e.target.value)}
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
                  value={teamLead}
                  onChange={(e) => setTeamLead(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee</option>
                  <option value="TuPac">TuPac</option>
                  <option value="Jessi Pinkman">Jessi Pinkman</option>
                  <option value="Walter White">Walter White</option>
                  <option value="Saul Goodman">Saul Goodman</option>
                </select>
              </div>
            )}
          </div>

          {/* NO Option */}
          <div className="border rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="no"
                checked={assignLead === "no"}
                onChange={(e) => {
                  setAssignLead("no");
                  setTeamLead("");
                }}
              />
              No
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            // onClick={onCancel}
            onClick={()=>navigate('/config/hris/Company_data/team')}
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
      </div>
    </div>
  );
};

export default CreateTeam;