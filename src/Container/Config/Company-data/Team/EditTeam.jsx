import { useState } from "react";

const EditTeam = () => {
  const [teamName, setTeamName] = useState("Design Team");
  const [assignLead, setAssignLead] = useState("yes");
  const [selectedLead, setSelectedLead] = useState("p1");

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleUpdate = () => {
    const updatedData = {
      name: teamName,
      lead: assignLead === "yes" ? selectedLead : "",
    };

    console.log("Updated Team:", updatedData);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Edit Team
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update team details.
        </p>
      </div>

      <div className="space-y-6 max-w-2xl">

        {/* Team Name */}
        <div>
          <label className="text-sm font-semibold">
            Team Name
          </label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Assign Team Lead */}
        <div>
          <label className="text-sm font-semibold">
            Do you want to assign a Team Lead?
          </label>

          <div className="mt-3 space-y-3">

            {/* YES */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="tl-yes"
                  name="assignLead"
                  value="yes"
                  checked={assignLead === "yes"}
                  onChange={(e) => setAssignLead(e.target.value)}
                />
                <label htmlFor="tl-yes" className="cursor-pointer">
                  Yes
                </label>
              </div>

              {assignLead === "yes" && (
                <div className="pl-6 pt-4">
                  <label className="text-sm font-semibold">
                    Select team lead
                  </label>

                  <select
                    value={selectedLead}
                    onChange={(e) => setSelectedLead(e.target.value)}
                    className="mt-2 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Employee</option>
                    <option value="p1">TuPac</option>
                    <option value="p2">Jessi Pinkman</option>
                    <option value="p3">John Wick</option>
                  </select>
                </div>
              )}
            </div>

            {/* NO */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="tl-no"
                  name="assignLead"
                  value="no"
                  checked={assignLead === "no"}
                  onChange={(e) => setAssignLead(e.target.value)}
                />
                <label htmlFor="tl-no" className="cursor-pointer">
                  No
                </label>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditTeam;