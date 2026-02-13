import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditExitPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

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

  // Load Edit Data
  useEffect(() => {
    if (isEdit) {
      const policy = dummyData.find((item) => item.id === id);
      if (policy) {
        setFormData(policy);
      }
    }
  }, [id]);

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    if (isEdit) {
      console.log("Update API call", formData);
    } else {
      console.log("Create API call", formData);
    }

    navigate("/config/hris/Employee-data/exitPolicy-list");
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {isEdit ? "Edit Exit Policy" : "Create Exit Policy"}
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
            onChange={(e) => handleChange("name", e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5"
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
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5"
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
            onChange={(e) => handleChange("notice", e.target.value)}
            className="w-full border rounded-lg px-4 py-2.5"
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
                onChange={() => {
                  handleChange("selfResign", "yes");
                }}
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                checked={formData.selfResign === "no"}
                onChange={() => {
                  handleChange("selfResign", "no");
                  handleChange("changeNotice", "no");
                }}
              />{" "}
              No
            </label>
          </div>

          {/* Show only if Yes */}
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
                    onChange={() =>
                      handleChange("changeNotice", "yes")
                    }
                  />{" "}
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={formData.changeNotice === "no"}
                    onChange={() =>
                      handleChange("changeNotice", "no")
                    }
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
                onChange={() =>
                  handleChange("managerInitiate", "yes")
                }
              />{" "}
              Yes
            </label>

            <label>
              <input
                type="radio"
                checked={formData.managerInitiate === "no"}
                onChange={() => {
                  handleChange("managerInitiate", "no");
                  handleChange("managerChangeNotice", "no");
                }}
              />{" "}
              No
            </label>
          </div>

          {/* Show only if Yes */}
          {formData.managerInitiate === "yes" && (
            <div className="mt-4 pl-6 border-l-2 border-gray-200">
              <p className="text-sm font-medium mb-3">
                Can manager request change in notice period?
              </p>

              <div className="flex gap-6">
                <label>
                  <input
                    type="radio"
                    checked={formData.managerChangeNotice === "yes"}
                    onChange={() =>
                      handleChange(
                        "managerChangeNotice",
                        "yes"
                      )
                    }
                  />{" "}
                  Yes
                </label>

                <label>
                  <input
                    type="radio"
                    checked={formData.managerChangeNotice === "no"}
                    onChange={() =>
                      handleChange(
                        "managerChangeNotice",
                        "no"
                      )
                    }
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
                onChange={() =>
                  handleChange("notifyOn", "approvers")
                }
              />{" "}
              Approvers
            </label>

            <label>
              <input
                type="radio"
                checked={formData.notifyOn === "employee"}
                onChange={() =>
                  handleChange("notifyOn", "employee")
                }
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
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg"
        >
          {isEdit ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
};

export default EditExitPolicy;
