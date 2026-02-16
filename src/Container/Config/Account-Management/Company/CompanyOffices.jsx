import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from '../../../../utils/axios.config'
import { useSelector } from "react-redux";



const CompanyOffices = () => {
  const { token } = useSelector((state) => state.user)
  console.log("Token in CompanyOffices:", token);

  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(null);
  const menuRef = useRef(null);

  const [offices, setOffices] = useState([]);

   const axiosInstance = createAxios(token)
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEdit = (office) => {
    navigate(
      `/config/hris/Account-management/Company-office/edit/${office._id}`,
      { state: { office } },
    );
  };

  const handleView = (office) => {
    navigate(
      office?.id
        ? `/config/hris/Account-management/Company-office/view/${office._id}`
        : `/config/hris/Account-management/Company-office/view`,
      { state: { office } },
    );
  };

  const handleDelete = async(office) => {
    try {
      const res = await axiosInstance.delete(`/config/company-office-delete/${office._id}`, { meta: { auth: "ADMIN_AUTH" } });
      console.log("Delete response:", res.data);
      setOffices((prev) => prev.filter((o) => o._id !== office._id));
    } catch (error) {
      console.log("Error deleting office:", error);
    }
  };
 
  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const res = await axiosInstance.get(
          "/config/company-offices-getAll",
          { meta: { auth: "ADMIN_AUTH" } }
        );
        console.log("API response:", res.data);
        setOffices(res.data.offices);
      } catch (error) {
        console.log("Error fetching offices:", error);
      }
    };

    fetchOffices();
  }, [token]);


  return (
    <div className="p-8  mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Company Offices
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        <button
          onClick={() => navigate("/config/hris/Account-management/Company-office/create")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Create <span className="text-lg font-bold">+</span>
        </button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-3 text-sm text-gray-500 border-b border-dashed">
        <span>Location Name</span>
        <span>Address Type</span>
        <span>City</span>
        <span>Postal Code</span>
        <span>Action</span>
      </div>

      {/* Rows */}
      <div className="space-y-3 mt-3">
        {offices?.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-[2fr_2fr_1fr_1fr_auto] gap-4 px-6 py-5 bg-white rounded-xl border items-center"
          >
            <div>
              <p className="font-medium text-gray-900">{item?.locationName}</p>
              <p className="text-xs text-gray-400 mt-1"> {new Date(item.createdAt).toLocaleDateString()}</p>
            </div>

            <p className="text-sm text-gray-800"> {item.addressType}</p>

            <p className="text-sm text-gray-800"> {item.address?.city || "N/A"}</p>

            <p className="text-sm text-gray-800">
              {item.address?.postalCode || "N/A"}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-2 relative" ref={menuRef}>
              {/* Edit */}
              <button
                onClick={() => handleEdit(item)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>

              {/* Three dots */}
              <button
                onClick={() => setOpenMenu(openMenu === index ? null : index)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
              >
                ⋮
              </button>

              {/* Dropdown */}
              {openMenu === index && (
                <div className="absolute right-0 top-10 w-36 bg-white border rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      handleView(item);
                      setOpenMenu(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    👁 View
                  </button>

                  <button
                    onClick={() => {
                      handleDelete(item);
                      setOpenMenu(null);
                    }}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    🗑 Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyOffices;
