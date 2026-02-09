import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";

const PersonalProfile = () => {

  const [dropsection, setDropsection] = useState({
    about: true,
    address: false,
    contact: false,
    biodata: false,
    importantDates: false,
    dependents: false
  })

  const toggleSection = (key) => {
    setDropsection((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className=" h-[600px] overflow-y-scroll no-scrollbar ">
      <div className="mx-auto">
        <div className="bg-white rounded-lg p-5">

          {/* Form */}
          {/* changeTab() */}
          <form className="px-6 pb-6 ">
            {/* About */}
            <div className='flex justify-between cursor-pointer cursor-pointer ' onClick={() => toggleSection("about")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">About</h2>
              <IoIosArrowDown
                className={`transition-transform ${dropsection.about ? "rotate-180" : ""
                }`} />
            </div>
                <hr className='border-black/20'/>
            

            {dropsection.about && (
              <div className='space-y-3 mt-3'>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Salutation</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Salutation</option>
                  </select>
                </div>
                {/* Full Name */}
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter full name"
                  />
                </div>
                {/* About Yourself */}
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">About Yourself</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                    rows="3"
                    placeholder="Tell us about yourself"
                  />
                </div>

              </div>
            )}
            
            {/* Address */}
            <div className='flex justify-between cursor-pointer  mt-5'  onClick={() => toggleSection("address")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Address</h2>
             <IoIosArrowDown
                className={`transition-transform ${dropsection.address ? "rotate-180" : ""
                  }`} />
            </div>
             <hr className='border-black/20'/>
            {dropsection.address && (
            <div className='space-y-3 mt-3'>
              <div>
                <label className="block text-gray-900 text-sm mb-1.5">Address Type</label>

                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Address Type</option>
                </select>
              </div>
              {/* Address Lines */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Address Line One</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter address"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Address Line Two (Optional)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter address"
                  />
                </div>
              </div>
              {/* Country, State, City */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Country</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">State/Province</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select Province</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select City</option>
                  </select>
                </div>
              </div>

            </div>
            )}
           
            {/* Contact */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("contact")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Contact</h2>
             <IoIosArrowDown
                className={`transition-transform ${dropsection.contact ? "rotate-180" : ""
                  }`} />
            </div>
             {dropsection.contact && (
            <div className='space-y-3 mt-3'>


              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Contact Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Contact Type</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Contact Tag</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              {/* Enter Details */}
              <div>
                <label className="block text-gray-900 text-sm  mb-1.5">Enter Details</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter contact details"
                />
              </div>
              {/* Country, State, City (Second Set) */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Country</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select Country</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">State/Province</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select Province</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select City</option>
                  </select>
                </div>
              </div>

            </div>
             )}
             <hr className='border-black/20'/>
            {/* Bio Data */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("biodata")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Bio Data</h2>
             <IoIosArrowDown
                className={`transition-transform ${dropsection.biodata ? "rotate-180" : ""
                  }`} />
            </div>
            {dropsection.biodata && (
            <div className='space-y-3 mt-3'>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Gender</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Gender</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Blood Group (optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              {/* Gender, Challenge, Marital Status */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Gender pronoun (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Challenge (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Marital status (Optional)</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              {/* Spouse Name */}
              <div>
                <label className="block text-gray-900 text-sm mb-1.5">Your spouse/partner's name (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter name"
                />
              </div>

            </div>
            )}
            <hr className='border-black/20'/>
            {/* Important Dates */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("importantDates")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Important Dates</h2>
             <IoIosArrowDown
                className={`transition-transform ${dropsection.importantDates ? "rotate-180" : ""
                  }`} />
            </div>
              {dropsection.importantDates && (
            <div className='space-y-3 mt-3'>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Birth Date</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Birth Date</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Your partner birth date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Marriage anniversary</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                  />
                </div>
              </div>

            </div>
              )}
              <hr className='border-black/20'/>
            {/* Dependents */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("dependents")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1">Dependents</h2>
             <IoIosArrowDown
                className={`transition-transform ${dropsection.dependents ? "rotate-180" : ""
                  }`} />
            </div>
             {dropsection.dependents && (
            <div className='space-y-3 mt-3'>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Select Relationship</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                    <option>Select</option>
                  </select>
                </div>
              </div>
              {/* Emergency Contact */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Emergency Contact Number</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                    placeholder="Enter contact number"
                  />
                </div>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Birth Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                  />
                </div>
              </div>

            </div>
             )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default PersonalProfile