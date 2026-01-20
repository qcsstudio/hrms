import React, { useState } from 'react'

const WorkSpaceSetup = ({onBack}) => {
  const [formData, setformData] = useState({
    employeelist: "",
    Trial: "",
    Partner: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setformData({
      ...formData,
      [name]: value
    })
  }

  const HandleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    setformData({
      employeelist: "",
      Trial: "",
      Partner: ""
    })
  }

  return (
    <div className="w-full bg-[#F9FAFB] p-6">

      <h1 className="text-xl font-semibold mb-1">
        Workspace Setup
      </h1>
      <p className="text-gray-500 mb-6">
        Choose a plan, add employees, and set white-label preferences.
      </p>

      {/* Trial */}
      <div className="w-full h-10 border border-black/10 flex items-center px-3 mb-4 rounded-md">
        <p>Trial</p>
      </div>

      {/* White Label */}
      <div className="w-full h-10 border border-black/10 flex items-center px-3 mb-6 rounded-md">
        <p>White label</p>
      </div>

      <form onSubmit={HandleSubmit} className="space-y-6">

        {/* Employee List & Trial Date */}
        <div className="flex gap-5 w-full">
          <div className="flex-1">
            <p className="mb-1">Employee list</p>
            <input
              type="text"
              name="employeelist"
              placeholder="Choose Account"
              value={formData.employeelist}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1">
            <p className="mb-1">Trial and Date</p>
            <input
              type="text"
              name="Trial"
              placeholder="Choose Account"
              value={formData.Trial}
              onChange={handleChange}
              className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Partner / Reseller */}
        <div>
          <p className="mb-1">Partner / Reseller</p>
          <input
            type="text"
            name="Partner"
            placeholder="Choose Account"
            value={formData.Partner}
            onChange={handleChange}
            className="w-full h-10 border border-black/10 rounded-lg px-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
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
          >
            Continue Setup
          </button>
        </div>

      </form>
    </div>
  )
}

export default WorkSpaceSetup
