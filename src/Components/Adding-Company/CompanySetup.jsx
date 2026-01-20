import React, { useState } from 'react'
import createAxios from '../../utils/axios.config'

const CompanySetup = ({ onNext, onBack }) => {
  const [formData, setFormdata] = useState({
    name: "",
    slug: "",
    country: "",
    timezone: "",
    currency: ""
  })

  const axiosInstance = createAxios()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)

    setFormdata({
      name: "",
      slug: "",
      country: "",
      timezone: "",
      currency: ""
    })
  }

  async function handlenext() {
    try {
      const token = localStorage.getItem("authToken");

      const res = await axiosInstance.post(`companies`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);
      localStorage.setItem("companyId", res?.data?.companyId);
      onNext()

    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <div className="w-[1280px] bg-[#F9FAFB] p-6  mx-auto ">

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <h1 className="text-[30px] font-semibold w-full">
            Company Setup
          </h1>
          <p className="text-[22px] text-gray-600 w-full">
            Add your company basics to configure default settings.
          </p>
        </div>

        {/* Company Name */}
        <div>
          <p className="text-[15px] text-black mb-1">
            Company name
          </p>
          <input
            type="text"
            name="name"
            placeholder="Choose Account"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-10 border border-black/10 rounded-lg px-3"
          />
        </div>

        {/* Slug & Country */}
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <p className="mb-1">Slug</p>
            <input
              type="text"
              name="slug"
              placeholder="Choose account"
              value={formData.slug}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Country</p>
            <input
              type="text"
              name="country"
              placeholder="Choose account"
              value={formData.country}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3"
            />
          </div>
        </div>

        {/* Timezone & Currency */}
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <p className="mb-1">Timezone</p>
            <input
              type="text"
              name="timezone"
              placeholder="Choose Account"
              value={formData.timezone}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Currency</p>
            <input
              type="text"
              name="currency"
              placeholder="Choose Account"
              value={formData.currency}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3"
            />
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="w-[100px] h-10 border border-[#30333D] rounded-lg bg-white"
            onClick={onBack}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-[150px] h-10 border border-[#30333D] rounded-lg bg-white"
            onClick={handlenext}
          >
            Continue setup
          </button>
        </div>

      </form>
    </div>
  )
}

export default CompanySetup
