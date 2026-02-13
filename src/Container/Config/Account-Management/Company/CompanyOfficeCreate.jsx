import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import createAxios from "../../../../utils/axios.config";
import { useSelector } from "react-redux";

const CompanyOfficeCreate = () => {
   const { token } = useSelector((state) => state.user) // get superAdmintoken from redux store
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    locationName: "",
    addressType: "",
    address1: "",
    address2: "",
    country: "india",
    state: "",
    city: "",
    postalCode: "",
    timezone: "india",
    ipAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const axiosInstance = createAxios(token)
  console.log("token hai bhai login ka==============",token)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/config/company-office', formData,
       {
        meta: { auth: "ADMIN_AUTH" }
      }
      );
      console.log("Company office created:", res.data);
      if (res.status === 200) {
        setFormData({
          locationName: "",
          addressType: "",
          address1: "",
          address2: "",
          country: "india",
          state: "",
          city: "",
          postalCode: "",
          timezone: "india",
          ipAddress: "",
        })
        navigate("/config/hris/Account-management/Company-office")
      }

    } catch (error) {
      console.log("Error creating company office:", error);

    }
  };

  return (
    <div className="p-8  mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Create Company Office
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>


      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location + Address Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Location Name
            </label>
            <input
              name="locationName"
              value={formData.locationName}
              onChange={handleChange}
              placeholder="India"
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address Type
            </label>
            <select
              name="addressType"
              value={formData.addressType}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="primary">Primary Office / Registered Office</option>
              <option value="branch">Branch Office</option>
              <option value="remote">Remote Office</option>
            </select>
          </div>
        </div>

        {/* Address Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 1
            </label>
            <textarea
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Address Line 2
            </label>
            <textarea
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Country + State */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Select Country
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="india">India</option>
              <option value="us">United States</option>
              <option value="uk">United Kingdom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              State / Province
            </label>
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="punjab">Punjab</option>
              <option value="haryana">Haryana</option>
              <option value="delhi">Delhi</option>
            </select>
          </div>
        </div>

        {/* City + Postal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              City / Zone
            </label>
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="mohali">Mohali</option>
              <option value="chandigarh">Chandigarh</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Postal Code
            </label>
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
          </div>
        </div>

        {/* Timezone + IP */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">
              Timezone
            </label>
            <select
              name="timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="india">India</option>
              <option value="utc">UTC</option>
              <option value="est">EST</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              IP Address
            </label>
            <select
              name="ipAddress"
              value={formData.ipAddress}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="">Select</option>
              <option value="auto">Auto Detect</option>
              <option value="manual">Manual Entry</option>
            </select>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 pt-6">
          <button
            type="button"
            onClick={() => navigate("/config/hris/Account-management/Company-office")}
            className="px-6 py-2.5 rounded-lg border bg-white hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyOfficeCreate;
