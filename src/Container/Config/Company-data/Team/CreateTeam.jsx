import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import createAxios from "../../../../utils/axios.config";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const FormDivSelect = ({
  options = [],
  value,
  onSelect,
  placeholder = "Select",
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={selectRef} className="relative w-full">
      <button
        type="button"
        disabled={disabled}
        onClick={() => {
          if (!disabled) setIsOpen((prev) => !prev);
        }}
        className={`mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between ${
          disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""
        }`}
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-gray-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && !disabled && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
          {options.length === 0 ? (
            <div className="px-4 py-3 text-sm text-gray-500">No options available</div>
          ) : (
            options.map((option) => {
              const isSelected = value === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onSelect(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full border-none px-4 py-3 text-left text-sm shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                    isSelected
                      ? "bg-[#E8EDF4] text-[#111827] font-semibold"
                      : "text-[#1F2937] hover:bg-[#F4F7FB] active:bg-[#EDEFF4]"
                  }`}
                >
                  {option.label}
                </button>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

const CreateTeam = ({ onCancel }) => {
  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const teamId = searchParams.get("teamid");
  const isEdit = Boolean(teamId);

  const axiosInstance = createAxios(token);

  const [team, setTeam] = useState({
    teamName: "",
    assignTeamLead: false,
    teamLeadId: "",
    teamLeadName: "",
  });
  const [employees, setEmployees] = useState([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);

  const employeeOptions = employees.map((emp) => ({
    value: emp.value,
    label: emp.label,
  }));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("/employees/all", {
          meta: { auth: "ADMIN_AUTH" },
        });

        const rawList = Array.isArray(res?.data?.data) ? res.data.data : [];
        const normalized = rawList
          .map((item) => {
            const id = item?._id;
            const fullName = item?.fullName;
            if (!id || !fullName) return null;
            return { value: id, label: fullName };
          })
          .filter(Boolean);

        setEmployees(normalized);
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load employees");
      }
    };

    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (!isEdit || !teamId) return;

    const fetchTeam = async () => {
      try {
        setIsLoadingTeam(true);
        const res = await axiosInstance.get(`/config/getOne-team/${teamId}`, {
          meta: { auth: "ADMIN_AUTH" },
        });

        const source = res?.data?.data || res?.data?.team || res?.data || {};
        const inferredLeadId =
          source?.teamLeadId ||
          source?.leadId ||
          source?.teamLead?._id ||
          source?.lead?._id ||
          "";

        setTeam({
          teamName: source?.teamName || source?.name || "",
          assignTeamLead:
            typeof source?.assignTeamLead === "boolean"
              ? source.assignTeamLead
              : Boolean(inferredLeadId || source?.lead),
          teamLeadId: inferredLeadId,
          teamLeadName:
            source?.teamLeadName ||
            source?.teamLead?.fullName ||
            source?.lead?.fullName ||
            "",
        });
      } catch (error) {
        toast.error(error?.response?.data?.message || "Failed to load team details");
      } finally {
        setIsLoadingTeam(false);
      }
    };

    fetchTeam();
  }, [isEdit, teamId]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }

    navigate("/config/hris/Company_data/team");
  };

  const handleSave = async () => {
    try {
      if (!team.teamName.trim()) {
        toast.error("Enter team name");
        return;
      }

      if (team.assignTeamLead && !team.teamLeadId) {
        toast.error("Select team lead");
        return;
      }

      const payload = {
        teamName: team.teamName.trim(),
        assignTeamLead: team.assignTeamLead,
        teamLeadId: team.assignTeamLead ? team.teamLeadId : "",
        teamLeadName: team.assignTeamLead ? team.teamLeadName : "",
      };
      console.log("team payload", payload);

      if (isEdit) {
        await axiosInstance.patch(`/config/update-team/${teamId}`, payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      } else {
        await axiosInstance.post("/config/create-team", payload, {
          meta: { auth: "ADMIN_AUTH" },
        });
      }

      navigate("/config/hris/Company_data/team");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8 mx-auto">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            {isEdit ? "Edit Team" : "Create Team"}
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {isEdit && (
          <button
            type="button"
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        )}
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            name="teamName"
            placeholder="Enter team name"
            value={team.teamName}
            onChange={(e) => setTeam((prev) => ({ ...prev, teamName: e.target.value }))}
            className={fieldClassName}
            disabled={isLoadingTeam}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Do you want to assign a Team Lead?</p>

          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                name="assignTeamLead"
                checked={team.assignTeamLead === true}
                onChange={() => setTeam((prev) => ({ ...prev, assignTeamLead: true }))}
                disabled={isLoadingTeam}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

            {team.assignTeamLead && (
              <div className="pl-6">
                <label className="text-sm font-medium text-gray-700">Select Team Lead</label>
                <FormDivSelect
                  value={team.teamLeadId}
                  onSelect={(value) => {
                    const selectedEmployee = employees.find((employee) => employee.value === value);
                    setTeam((prev) => ({
                      ...prev,
                      teamLeadId: value,
                      teamLeadName: selectedEmployee?.label || "",
                    }));
                  }}
                  options={employeeOptions}
                  placeholder="Select team lead"
                  disabled={isLoadingTeam}
                />
              </div>
            )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                name="assignTeamLead"
                checked={team.assignTeamLead === false}
                onChange={() =>
                  setTeam((prev) => ({
                    ...prev,
                    assignTeamLead: false,
                    teamLeadId: "",
                    teamLeadName: "",
                  }))
                }
                disabled={isLoadingTeam}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Cancel
          </button>

          {!isEdit && (
            <button
              type="button"
              onClick={handleSave}
              className="px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
