import React, { useState } from 'react'
import createAxios from '../../utils/axios.config'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Accountsetup = ({ onNext, onBack }) => {
      const { token,companyId} = useSelector((state) => state.user) // get superAdmintoken from redux store
      console.log(companyId,"11111111111111")

  const [formData, setData] = useState({
    fullName: "",
    email: "",
    contact: "",
    role: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...formData,
      [name]: value
    })
  }

  const handlesSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setData({
      fullName: "",
      email: "",
      contact: "",
      role: ""
    })
  }
  const navigate = useNavigate();
  const axiosInstance = createAxios()
  //  async function handleSuperAdmin() {
  async function handlenext() {
    try {
      // const token = localStorage.getItem("authToken");
      // const companyId = localStorage.getItem("companyId");

      const res = await axiosInstance.post(`companies/${companyId}/admin`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);
      onNext()
      // navigate('/');

    } catch (error) {
      console.log("API Error:", error);
    }
  }
  // async function handleInviteAccountSetup() {
  //   try {
  //     const token = localStorage.getItem("authToken");
  //     const companyId = localStorage.getItem("companyId");

  //     const res = await axiosInstance.post(`companies/${companyId}/admin`, formData, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     console.log(res.data);
  //     onNext()

  //   } catch (error) {
  //     console.log("API Error:", error);
  //   }
  // }

  return (
    <div className="bg-[#F9FAFB] p-6 rounded-lg w-[1280px]">
      <h1 className="text-xl font-semibold mb-1">
        Admin Account Setup
      </h1>
      <p className="text-gray-500 mb-6">
        Create the main admin who will manage this workspace.
      </p>

      <form onSubmit={handlesSubmit} className="space-y-6">

        {/* Admin Full Name */}
        <div>
          <p className="text-[#484848] mb-1">
            Admin&apos;s Fullname
          </p>
          <input
            type="text"
            name="fullName"
            placeholder="Choose Account"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Mail & Contact */}
        <div className="flex gap-5">
          <div className="flex-1">
            <p className="mb-1">Mail</p>
            <input
              type="text"
              name="email"
              placeholder="Choose Account"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Contact</p>
            <input
              type="text"
              name="contact"
              placeholder="Choose Account"
              value={formData.contact}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <p className="text-[#484848] mb-1">
            Role
          </p>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          >
            <option value="">Select Role</option>
            <option value="COMPANY_ADMIN">Admin</option>
            <option value="SUPER_ADMIN">Super Admin</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="h-11 w-[100px] border border-[#30333D] rounded-lg bg-white"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 w-[170px] border border-[#30333D] rounded-lg bg-white"
            onClick={handlenext}
          >
            Continue Setup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Accountsetup
