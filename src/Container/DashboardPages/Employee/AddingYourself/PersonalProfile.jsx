import React, { useState } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import createAxios from '../../../../utils/axios.config'
import { useSelector } from 'react-redux';

const PersonalProfile = ({ onSuccess, onPrevious }) => {
  const { completeData } = useSelector(
    (state) => state.employeeInvite
  )

  const [formData, setFormData] = useState({
    about: {
      salutation: "",
      preferredName: "",
      aboutYourself: "",
    },
    addresses: [
      {
        addressType: "",
        line1: "",
        line2: "",
        country: "",
        state: "",
        city: "",
      },
    ],
    contacts: [
      {
        contactType: "",
        contactTag: "",
        details: "",
        country: "",
        state: "",
        city: "",
      },
    ],
    biodata: {
      gender: "",
      bloodGroup: "",
      genderPronoun: "",
      challenged: false,
      maritalStatus: "",
      spouseOrPartnerName: "",
    },
    importantDates: {
      birthDate: "",
      partnerBirthDate: null,
      marriageAnniversary: null,
    },
    dependents: [
      {
        fullName: "",
        relationship: "",
        birthDate: "",
        emergencyContactNumber: "",
      },
    ],
  })


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

  const handleChange = (path, value) => {
    setFormData(prev => {
      const updated = { ...prev }
      let temp = updated

      for (let i = 0; i < path.length - 1; i++) {
        temp = temp[path[i]]
      }

      temp[path[path.length - 1]] = value
      return updated
    })
  }

  const axiosInstance = createAxios()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {

      const res = axiosInstance.post(`/employees/${completeData.employeeId}/personal`, formData)

      if (res.status === 200) {
        onSuccess()
      }

    } catch (error) {
      console.log("api is not respond", error)

    }

    // axios.post("/api/profile", formData)
  }
  const handleSkip = () => {
    onSuccess()
  }
  return (
    <div className=" h-[600px] overflow-y-scroll no-scrollbar ">
      <div className="mx-auto">
        <div className="bg-white rounded-lg p-5">

          {/* Form */}
          {/* changeTab() */}
          <form className="px-6 pb-6 " onSubmit={handleSubmit}>

            {/* About */}
            <div className='flex justify-between cursor-pointer cursor-pointer ' onClick={() => toggleSection("about")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">About</h2>
              <IoIosArrowDown
                className={`transition-transform ${dropsection.about ? "rotate-180" : ""
                  }`} />
            </div>
            <hr className='border-black/20' />
            {dropsection.about && (
              <div className='space-y-3 mt-3'>
                <div>
                  <label className="block text-gray-900 text-sm  mb-1.5">Salutation</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                    value={formData.about.salutation}
                    onChange={(e) =>
                      handleChange(["about", "salutation"], e.target.value)
                    }
                    >
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
                    value={formData.about.preferredName}
                    onChange={(e) =>
                      handleChange(["about", "preferredName"], e.target.value)
                    }
                  />
                </div>
                {/* About Yourself */}
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">About Yourself</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                    rows="3"
                    placeholder="Tell us about yourself"
                    value={formData.about.aboutYourself}
                    onChange={(e) =>
                      handleChange(["about", "aboutYourself"], e.target.value)
                    }
                  />
                </div>

              </div>
            )}

            {/* Address */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("address")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Address</h2>
              <IoIosArrowDown
                className={`transition-transform ${dropsection.address ? "rotate-180" : ""
                  }`} />
            </div>
            <hr className='border-black/20' />
            {dropsection.address && (
              <div className='space-y-3 mt-3'>
                <div>
                  <label className="block text-gray-900 text-sm mb-1.5">Address Type</label>

                  <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                    value={formData.addresses[0].addressType}
                    onChange={(e) =>
                      handleChange(["addresses", 0, "addressType"], e.target.value)
                    }>
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
                      value={formData.addresses[0].line1}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "line1"], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Address Line Two (Optional)</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                      placeholder="Enter address"
                      value={formData.addresses[0].line2}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "line2"], e.target.value)
                      }
                    />
                  </div>
                </div>
                {/* Country, State, City */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.addresses[0].country}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "country"], e.target.value)
                      }>
                      <option>Select Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">State/Province</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.addresses[0].state}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "state"], e.target.value)
                      }>
                      <option>Select Province</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.addresses[0].city}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "city"], e.target.value)
                      }>
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
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].contactType}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "contactType"], e.target.value)
                      }>
                      <option>Contact Type</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Contact Tag</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].contactTag}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "contactTag"], e.target.value)
                      }>
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
                    value={formData.contacts[0].details}
                    onChange={(e) =>
                      handleChange(["contacts", 0, "details"], e.target.value)
                    }
                  />
                </div>
                {/* Country, State, City (Second Set) */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Country</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].country}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "country"], e.target.value)
                      }
                    >
                      <option>Select Country</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">State/Province</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].state}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "state"], e.target.value)
                      }>
                      <option>Select Province</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].city}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "city"], e.target.value)
                      }>
                      <option>Select City</option>
                    </select>
                  </div>
                </div>

              </div>
            )}
            <hr className='border-black/20' />


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
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata[0].gender}
                      onChange={(e) =>
                        handleChange(["biodata", 0, "gender"], e.target.value)
                      }>
                      <option>Gender</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Blood Group (optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata[0].bloodGroup}
                      onChange={(e) =>
                        handleChange(["biodata", 0, "bloodGroup"], e.target.value)
                      }>
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                {/* Gender, Challenge, Marital Status */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Gender pronoun (Optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata[0].genderPronoun}
                      onChange={(e) =>
                        handleChange(["biodata", 0, "genderPronoun"], e.target.value)
                      }>
                      <option>Select</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Challenge (Optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata[0].challenged}
                      onChange={(e) =>
                        handleChange(["biodata", 0, "challenged"], e.target.value)
                      }>
                      <option>Select</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Marital status (Optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata[0].maritalStatus}
                      onChange={(e) =>
                        handleChange(["biodata", 0, "maritalStatus"], e.target.value)
                      }>
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
                    value={formData.biodata[0].spouseOrPartnerName}
                    onChange={(e) =>
                      handleChange(["biodata", 0, "spouseOrPartnerName"], e.target.value)
                    }
                  />
                </div>

              </div>
            )}
            <hr className='border-black/20' />

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
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.importantDates[0].birthDate}
                      onChange={(e) =>
                        handleChange(["importantDates", 0, "birthDate"], e.target.value)
                      }>
                      <option>Birth Date</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Your partner birth date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                      value={formData.importantDates[0].partnerBirthDate}
                      onChange={(e) =>
                        handleChange(["importantDates", 0, "partnerBirthDate"], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Marriage anniversary</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                      value={formData.importantDates[0].marriageAnniversary}
                      onChange={(e) =>
                        handleChange(["importantDates", 0, "marriageAnniversary"], e.target.value)
                      }
                    />
                  </div>
                </div>

              </div>
            )}
            <hr className='border-black/20' />


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
                      value={formData.dependents[0].fullName}
                      onChange={(e) =>
                        handleChange(["dependents", 0, "fullname"], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Select Relationship</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.dependents[0].relationship}
                      onChange={(e) =>
                        handleChange(["dependents", 0, "relationship"], e.target.value)
                      }>
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
                      value={formData.dependents[0].emergencyContactNumber}
                      onChange={(e) =>
                        handleChange(["dependents", 0, "emergencyContactNumber"], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Birth Date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                      value={formData.dependents[0].birthDate}
                      onChange={(e) =>
                        handleChange(["dependents", 0, "birthDate"], e.target.value)
                      }
                    />
                  </div>
                </div>

              </div>
            )}
            <div className='flex justify-between'>

              <div>
                <button type='button' onClick={onPrevious}>previous</button>
              </div>

              <div className='flex gap-2'>
                <button type='button' onClick={handleSkip} className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7]'>Skip</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                  Save & Continue
                </button>
              </div>


            </div>
          </form>
        </div>
      </div >
    </div >
  )
}
export default PersonalProfile