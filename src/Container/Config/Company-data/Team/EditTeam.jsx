import { useEffect, useRef, useState } from "react";
import { FaAngleDown } from "react-icons/fa";

const fieldClassName =
  "mt-2 w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500";

const radioCardClassName =
  "border border-gray-200 rounded-lg p-4 bg-white transition-colors hover:border-gray-300";

const flatSecondaryButtonClassName =
  "px-6 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium shadow-none hover:shadow-none hover:bg-gray-100 transition hover:translate-y-0";

const flatPrimaryButtonClassName =
  "px-6 py-2.5 rounded-lg bg-blue-600 text-white font-medium shadow-none hover:shadow-none hover:bg-blue-700 transition hover:translate-y-0";

const TEAM_LEAD_OPTIONS = [
  { value: "p1", label: "TuPac" },
  { value: "p2", label: "Jessi Pinkman" },
  { value: "p3", label: "John Wick" },
];

const FormDivSelect = ({ options = [], value, onSelect, placeholder = "Select" }) => {
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
        onClick={() => setIsOpen((prev) => !prev)}
        className="mt-2 w-full h-[42px] border border-gray-300 rounded-lg bg-white px-4 text-sm text-left text-gray-900 shadow-none outline-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex items-center justify-between"
      >
        <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
          {selectedOption?.label || placeholder}
        </span>
        <FaAngleDown
          className={`text-[12px] text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-full overflow-hidden rounded-xl border border-[#D6DDE8] bg-white shadow-[0_10px_24px_rgba(15,23,42,0.10)] z-20">
          {options.map((option) => {
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
          })}
        </div>
      )}
    </div>
  );
};

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
    <div className="p-8 mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Edit Team</h1>
        <p className="text-sm text-gray-500 mt-1">Update team details.</p>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-xl border border-gray-200 max-w-3xl">
        <div>
          <label className="text-sm font-medium text-gray-700">Team Name</label>
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className={fieldClassName}
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700">Do you want to assign a Team Lead?</p>
          <div className="mt-3 space-y-3">
            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                id="tl-yes"
                name="assignLead"
                value="yes"
                checked={assignLead === "yes"}
                onChange={(e) => setAssignLead(e.target.value)}
              />
              <span className="text-sm text-gray-700">Yes</span>
            </label>

              {assignLead === "yes" && (
                <div className="pl-6">
                  <label className="text-sm font-medium text-gray-700">Select Team Lead</label>
                  <FormDivSelect
                    value={selectedLead}
                    onSelect={setSelectedLead}
                    options={TEAM_LEAD_OPTIONS}
                    placeholder="Select Employee"
                  />
                </div>
              )}

            <label className={`${radioCardClassName} flex items-center gap-2 cursor-pointer`}>
              <input
                type="radio"
                id="tl-no"
                name="assignLead"
                value="no"
                checked={assignLead === "no"}
                onChange={(e) => setAssignLead(e.target.value)}
              />
              <span className="text-sm text-gray-700">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-2">
          <button
            type="button"
            onClick={handleCancel}
            className={flatSecondaryButtonClassName}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleUpdate}
            className={flatPrimaryButtonClassName}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeam;
