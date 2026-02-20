import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import createAxios from "../../../../utils/axios.config";

const CreateDesignation = ({ onCancel }) => {
  const { token } = useSelector((state) => state.user);
  const [partOfDept, setPartOfDept] = useState(false);
  const [designationName, setDesignationName] = useState("");
  const [department, setDepartment] = useState("");

  const navigate = useNavigate()
     const axiosInstance = createAxios(token);

  const handleSave = async () => {
    try {
      if (!token) return;

      if (!designationName)
        return alert("Enter designation name");

      if (partOfDept === "yes" && !department)
        return alert("Select department");

   




      const payload = {
        designationName,
        isPartOfDepartment: partOfDept === "yes",
        ...(partOfDept === "yes" && {
          departmentId: "65fa11111111111111111111",
          departmentName: department
        })
      };

      const res = await axiosInstance.post(
        "/config/create-designation",
        payload,{
          meta:{auth:"ADMIN_AUTH"}
        }
      );

      console.log("Created:", res.data);
      alert("Designation created");


    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Error creating designation");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create Designation</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage employee directory, documents, and role-based actions.
        </p>
      </div>

      {/* Form */}
      <div className="bg-white border rounded-lg p-6 max-w-2xl space-y-6">

        {/* Designation Name */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Designation Name
          </label>
          <input
            type="text"
            placeholder="Enter designation name"
            value={designationName}
            onChange={(e) => setDesignationName(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Radio Section */}
        <div>
          <label className="block text-sm font-medium mb-3">
            Is this Job Title only a part of specific functional Department?
          </label>

          {/* YES Option */}
          <div className="border rounded-lg p-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                value="yes"
                checked={partOfDept === "yes"}
                onChange={(e) => setPartOfDept(e.target.value)}
              />
              Yes
            </label>

            {/* Department Dropdown */}
            {partOfDept === "yes" && (
              <div className="mt-4 pl-6">
                <label className="block text-sm font-medium mb-2">
                  Department
                </label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select department</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="HR">HR</option>
                  <option value="Finance">Finance</option>
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
                checked={partOfDept === "no"}
                onChange={(e) => setPartOfDept(e.target.value)}
              />
              No
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-4">
          <button
            // onClick={onCancel}
            onClick={() => navigate('/config/hris/Company_data/designation')}
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

export default CreateDesignation;