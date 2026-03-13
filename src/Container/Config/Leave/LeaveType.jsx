import { useEffect, useState } from "react";
import createAxios from "../../../utils/axios.config";


const leaveCategories = [


  {
    title: "Select the General types",
    types: ["Custom Leave*", "Hourly Leave", "Medical Leave", "Unpaid Leave*"],
  },
  {
    title: "Select the Important Days types",
    types: [
      "Birthday Leave",
      "Marriage Anniversary Leave",
      "Spouse Birthday Leave",
    ],
  },
  {
    title: "Select the Long Leaves types",
    types: ["Sabbatical Leave", "Vacation Leave"],
  },
  {
    title: "Select the Parental types",
    types: ["Maternity Leave", "Paternity Leave"],
  },
];

const LeaveType = () => {
  const token = localStorage.getItem("authToken");
  const [selected, setSelected] = useState([]);

  const toggleCheckbox = (type) => {
    if (selected.includes(type)) {
      setSelected(selected.filter((item) => item !== type));
    } else {
      setSelected([...selected, type]);
    }
  };
  const axiosInstance = createAxios(token);

  const buildPayload = () => ({
    customLeave: selected.includes("Custom Leave*"),
    hourlyLeave: selected.includes("Hourly Leave"),
    medicalLeave: selected.includes("Medical Leave"),
    unpaidLeave: selected.includes("Unpaid Leave*"),
    birthdayLeave: selected.includes("Birthday Leave"),
    marriageAnniversaryLeave: selected.includes("Marriage Anniversary Leave"),
    spouseBirthdayLeave: selected.includes("Spouse Birthday Leave"),
    sabbaticalLeave: selected.includes("Sabbatical Leave"),
    vacationLeave: selected.includes("Vacation Leave"),
    maternityLeave: selected.includes("Maternity Leave"),
    paternityLeave: selected.includes("Paternity Leave"),
  });

  const applyPayloadToSelection = (payload) => {
    if (!payload) return;
    const mapping = [
      { key: "customLeave", label: "Custom Leave*" },
      { key: "hourlyLeave", label: "Hourly Leave" },
      { key: "medicalLeave", label: "Medical Leave" },
      { key: "unpaidLeave", label: "Unpaid Leave*" },
      { key: "birthdayLeave", label: "Birthday Leave" },
      { key: "marriageAnniversaryLeave", label: "Marriage Anniversary Leave" },
      { key: "spouseBirthdayLeave", label: "Spouse Birthday Leave" },
      { key: "sabbaticalLeave", label: "Sabbatical Leave" },
      { key: "vacationLeave", label: "Vacation Leave" },
      { key: "maternityLeave", label: "Maternity Leave" },
      { key: "paternityLeave", label: "Paternity Leave" },
    ];

    const nextSelected = mapping
      .filter((item) => payload[item.key] === true)
      .map((item) => item.label);
    setSelected(nextSelected);
  };

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      try {
        const res = await axiosInstance.get("/config/getOne/leaveType", {
          meta: { auth: "ADMIN_AUTH" },
        });
        applyPayloadToSelection(res?.data?.data);
      } catch (error) {
        console.log("leave type get error", error);
      }
    };

    fetchLeaveTypes();
  }, []);

  const handleSubmit = async () => {
    try {
      const payload = buildPayload();
      const res = await axiosInstance.post("/config/create/leaveType", payload, {
        meta: { auth: "ADMIN_AUTH" },
      });
      setSelected(res?.data?.selected || selected);
    } catch (error) {
      console.log("leave type create error", error);
    }
  }





  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">
            Select the leave types you would like to allow in your company
          </h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <div className="space-y-6">
          {leaveCategories.map((category) => (
            <div key={category.title}>
              <h3 className="text-sm font-medium text-gray-700 mb-3">
                {category.title}
              </h3>

              <div className="space-y-3">
                {category.types.map((type) => {
                  const isChecked = selected.includes(type);

                  return (
                    <div
                      key={type}
                      onClick={() => toggleCheckbox(type)}
                      className="flex items-center gap-3 p-4 rounded-lg border bg-white hover:bg-gray-50 cursor-pointer transition"
                    >
                      {/* Custom Checkbox */}
                      <div
                        className={`w-5 h-5 flex items-center justify-center rounded border ${
                          isChecked
                            ? "bg-blue-600 border-blue-600"
                            : "border-gray-300"
                        }`}
                      >
                        {isChecked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="white"
                            className="w-3 h-3"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.704 5.29a1 1 0 010 1.42l-7.2 7.2a1 1 0 01-1.42 0l-3.2-3.2a1 1 0 011.42-1.42l2.49 2.49 6.49-6.49a1 1 0 011.42 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>

                      <span className="text-sm text-gray-800">
                        {type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700"
          >
            Save Leave Types
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeaveType;