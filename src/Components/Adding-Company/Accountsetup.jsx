import React, { useState } from 'react'
import createAxios from '../../utils/axios.config'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { getEmptyFields } from 'get_input_empty_fields';
import { toast } from 'react-toastify';


const Accountsetup = ({ onNext, onBack }) => {
  const { token } = useSelector((state) => state.user)
  // get superAdmintoken from redux store


  const [formData, setData] = useState({
    fullName: "",
    email: "",
    contact: "",
    role: ""
  })
  const [errors, setErrors] = useState({})

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
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")
  console.log(inviteToken, "invite token============")
  const navigate = useNavigate();
  const axiosInstance = createAxios(token, inviteToken)
  
  //  async function handleSuperAdmin() {

  async function handlenext() {
    // e.preventDefault()
    const emptyFields = getEmptyFields(formData);

    if (emptyFields.length > 0) {
      emptyFields.forEach(field => {
        setErrors((prev) => ({ ...prev, [field]: `${field} is required` })); // setErrors fields 
      });
      // alert(JSON.stringify(emptyFields))
    } else {
      console.log("All fields filled:", formData);
    }

    try {
      const res = await axiosInstance.post(`companies/${companyId}/admin`, formData, {
        meta: { auth: "ADMIN_AUTH" }
      });

      console.log(res.data);
      toast.success("Admin Account Setup Successfullly Done!")
      onNext()
      // navigate('/');

    } catch (error) {
      console.log("API Error:", error);
      toast.error(error?.response?.data?.message)
    }
  }
  async function handleInviteAccountSetup() {
    // e.preventDefault()
    try {
      const companyId = localStorage.getItem("companyId");

      const res = await axiosInstance.post(`invites/${companyId}/admin-setup`, formData, {
        meta: { auth: "ADMIN_AUTH" }
      });

      console.log(res.data);
      onNext()

    } catch (error) {
      console.log("API Error:", error);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    inviteToken ? handleInviteAccountSetup() : handlenext()
  }

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
          {errors.fullName && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.fullName}.</p>}

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
            {errors.email && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.email}.</p>}

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
            {errors.contact && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.contact}.</p>}

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
            {/* <option value="SUPER_ADMIN">Super Admin</option> */}
          </select>
          {errors.role && <p style={{ color: '#e74c3c', fontSize: '12px', fontStyle: 'italic' }}>{errors.role}.</p>}

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
            onClick={handleSubmit}
          >
            Continue Setup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Accountsetup
