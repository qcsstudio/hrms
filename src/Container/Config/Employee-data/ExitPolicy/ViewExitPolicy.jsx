import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ViewExitPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    notice: "",
    selfResign: "yes",
    changeNotice: "yes",
    managerInitiate: "yes",
    managerChangeNotice: "yes",
    notifyOn: "employee",
  });

  // Dummy Data (Replace with API)
  const dummyData = [
    {
      id: "1",
      name: "15 Days",
      description: "Standard exit policy",
      notice: 40,
      selfResign: "yes",
      changeNotice: "yes",
      managerInitiate: "yes",
      managerChangeNotice: "no",
      notifyOn: "employee",
    },
    {
      id: "2",
      name: "IMMEDIATE",
      description: "Immediate exit",
      notice: 0,
      selfResign: "no",
      changeNotice: "no",
      managerInitiate: "yes",
      managerChangeNotice: "yes",
      notifyOn: "approvers",
    },
  ];

  useEffect(() => {
    const policy = dummyData.find((item) => item.id === id);
    if (policy) {
      setFormData(policy);
    }
  }, [id]);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          View Exit Policy
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 space-y-6">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Exit Policy Name
          </label>
          <input
            type="text"
            value={formData.name}
            disabled
            className="w-full border rounded-lg px-4 py-2.5 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Description
          </label>
          <textarea
            rows={4}
            value={formData.description}
            disabled
            className="w-full border rounded-lg px-4 py-2.5 bg-gray-100"
          />
        </div>

        {/* Notice */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Notice Period (Days)
          </label>
          <input
            type="number"
            value={formData.notice}
            disabled
            className="w-full border rounded-lg px-4 py-2.5 bg-gray-100"
          />
        </div>

        {/* Self Resign */}
        <div>
          <p className="text-sm font-medium mb-3">
            Can the employee self-resign?
          </p>

          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                checked={formData.selfResign === "yes"}
                disabled
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                checked={formData.selfResign === "no"}
                disabled
              />{" "}
              No
            </label>
          </div>

          {formData.selfResign === "yes" && (
            <div className="mt-4 pl-6 border-l-2 border-gray-200">
              <p className="text-sm font-medium mb-3">
                Can the employee request change in notice period?
              </p>

              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    checked={formData.changeNotice === "yes"}
                    disabled
                  />{" "}
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={formData.changeNotice === "no"}
                    disabled
                  />{" "}
                  No
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Manager Initiate */}
        <div>
          <p className="text-sm font-medium mb-3">
            Can manager initiate separation?
          </p>

          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                checked={formData.managerInitiate === "yes"}
                disabled
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                checked={formData.managerInitiate === "no"}
                disabled
              />{" "}
              No
            </label>
          </div>

          {formData.managerInitiate === "yes" && (
            <div className="mt-4 pl-6 border-l-2 border-gray-200">
              <p className="text-sm font-medium mb-3">
                Can manager request change in notice period?
              </p>

              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    checked={
                      formData.managerChangeNotice === "yes"
                    }
                    disabled
                  />{" "}
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={
                      formData.managerChangeNotice === "no"
                    }
                    disabled
                  />{" "}
                  No
                </label>
              </div>
            </div>
          )}
        </div>

        {/* Notify */}
        <div>
          <p className="text-sm font-medium mb-3">
            Notify on approval
          </p>

          <div className="flex gap-6">
            <label>
              <input
                type="radio"
                checked={formData.notifyOn === "approvers"}
                disabled
              />{" "}
              Approvers
            </label>

            <label>
              <input
                type="radio"
                checked={formData.notifyOn === "employee"}
                disabled
              />{" "}
              Employee
            </label>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-4 mt-8">
        <button
          onClick={() =>
            navigate("/config/hris/Employee-data/exitPolicy-list")
          }
          className="px-5 py-2.5 border rounded-lg"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewExitPolicy;
