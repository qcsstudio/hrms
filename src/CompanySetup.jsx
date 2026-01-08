import React, { useState } from 'react'

const CompanySetup = () => {
  const [formData, setFormdata] = useState({
    CompanyName: "",
    Slug: "",
    Country: "",
    Time: "",
    Currency: ""
  })

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
      CompanyName: "",
      Slug: "",
      Country: "",
      Time: "",
      Currency: ""
    })
  }

  return (
    <div className="w-full bg-[#F9FAFB] p-6">

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Heading */}
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
            name="CompanyName"
            placeholder="Choose Account"
            value={formData.CompanyName}
            onChange={handleChange}
            className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Slug & Country */}
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <p className="mb-1">Slug</p>
            <input
              type="text"
              name="Slug"
              placeholder="Choose account"
              value={formData.Slug}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Country</p>
            <input
              type="text"
              name="Country"
              placeholder="Choose account"
              value={formData.Country}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Time & Currency */}
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <p className="mb-1">Time</p>
            <input
              type="text"
              name="Time"
              placeholder="Choose Account"
              value={formData.Time}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Currency</p>
            <input
              type="text"
              name="Currency"
              placeholder="Choose Account"
              value={formData.Currency}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-5">
          <button
            type="button"
            className="w-[100px] h-10 border border-[#30333D] rounded-lg bg-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-[150px] h-10 border border-[#30333D] rounded-lg bg-white"
          >
            Continue setup
          </button>
        </div>

      </form>
    </div>
  )
}

export default CompanySetup
