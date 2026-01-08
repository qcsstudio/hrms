import React, { useState } from 'react'

const Accountsetup = () => {
  const [formData, setData] = useState({
    AdminFullname: "",
    Mail: "",
    Contact: ""
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
      AdminFullname: "",
      Mail: "",
      Contact: ""
    })
  }

  return (
    <div className="bg-[#F9FAFB] p-6 rounded-lg max-w-full">
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
            name="AdminFullname"
            placeholder="Choose Account"
            value={formData.AdminFullname}
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
              name="Mail"
              placeholder="Choose Account"
              value={formData.Mail}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Contact</p>
            <input
              type="text"
              name="Contact"
              placeholder="Choose Account"
              value={formData.Contact}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            className="h-11 w-[100px] border border-[#30333D] rounded-lg bg-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="h-11 w-[170px] border border-[#30333D] rounded-lg bg-white"
          >
            Continue Setup
          </button>
        </div>
      </form>
    </div>
  )
}

export default Accountsetup
