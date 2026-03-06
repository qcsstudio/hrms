import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const BusinessUnit = () => {
  const token = localStorage.getItem("authToken");

  const navigate = useNavigate();
  const axiosInstance = createAxios(token);

  const [data, setData] = useState([]);
  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/config/delete-buinessUnit/${id}`, { meta: { auth: "ADMIN_AUTH" } });
    } catch (error) {
      console.error("Error deleting business unit:", error);
    }
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (unit) => {
    navigate(
      "/config/hris/Company_data/create-buisness-unit",
      {
        state: {
          isEdit: true,
          data: unit
        }
      }
    );
  };

  const handleCreate = () => {
    navigate("/config/hris/Company_data/create-buisness-unit");
  };

  useEffect(()=>{
    const fetchallbussinessunit = async () => {
      try {
        const response = await axiosInstance.get("/config/all-buinessUnit",{
          meta:{auth:"ADMIN_AUTH"}
        });
        setData(response.data);
      } catch (error) {
        console.error("Error fetching business units:", error);
      }
    };

    fetchallbussinessunit();
  },[])

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-semibold">Business Unit</h1>
          <p className="text-sm text-gray-500">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Create +
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-6 text-sm text-gray-500 font-medium px-4 py-3 border-b">
        <div>Business Unit Name</div>
        <div>Created By</div>
        <div>Assigned Employee</div>
        <div>Location</div>
        <div>Business Unit Head</div>
        <div className="text-right">Action</div>
      </div>

      {/* Rows */}
      <div className="space-y-3 mt-3">
        {data?.length === 0 ? (
          <div className="text-center text-gray-400 py-10">
            No Business Units Found
          </div>
        ) : data?.map((unit,idx) => (
          <div
            key={idx}
            className="grid grid-cols-6 items-center bg-white p-4 rounded-xl border shadow-sm"
          >
            <div>
              <p className="font-medium">{unit?.data?.businessUnitName}</p>
              <p className="text-xs text-gray-400">{new Date(unit?.data?.createdAt).toLocaleString("en-US", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
              }).replace(",", "")}</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
                {unit?.data?.addedByName.charAt(0)}
              </div>
              <span className="text-sm">{unit?.data?.addedByImage || "--"}</span>
            </div>

            <div>
              {unit.assignedEmployees.length > 0 ? (
                <div className="flex -space-x-2">
                  {unit?.data?.assignedEmployees.slice(0, 3).map((emp, index) => (
                    <div
                      key={index}
                      className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs border-2 border-white"
                    >
                      {emp?.name?.charAt(0)}
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-sm text-gray-500">
                  No Employee Assigned
                </span>
              )}
            </div>

            <div className="text-sm">{unit?.data?.locationName}</div> 
            <div className="text-sm">{unit?.data?.businessHead || "—"}</div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleEdit(unit)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ✏️
              </button>

              <button
                onClick={() => handleDelete(unit.id)}
                className="p-2 rounded-md hover:bg-gray-100"
              >
                ⋮
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BusinessUnit;
