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
                    <option value="" hidden disabled>Salutation</option>
                    <option value="Mr">Mr</option>
                    <option value="Mrs">Mrs</option>
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
                    <option value="" disabled hidden>Address Type</option>
                    <option value="Present">Present</option>
                    <option value="Permanent">Permanent</option>
                    <option value="Other">Other</option>
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
                      <option value="" disabled hidden>Select Country</option>
                      <option value="India">India</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">State/Province</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.addresses[0].state}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "state"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select Province</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="punjab">Punjab</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.addresses[0].city}
                      onChange={(e) =>
                        handleChange(["addresses", 0, "city"], e.target.value)
                      }>
                      <option value="" hidden disabled>Select City</option>
                      <option value="Bangalore">Bangalore</option>
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
             <hr className='border-black/20' />
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
                      <option value="" disabled hidden>Contact Type</option>
                      <option value="Email">Email</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Desk Phone">Desk Phone</option>
                      <option value="Skype">Skype</option>
                      <option value="Hangout">Hangout</option>
                      <option value="Slack">Slack</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Twitter">Twitter</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Behance">Behance</option>
                      <option value="Dribble">Dribble</option>
                      <option value="Git Hub">Git Hub</option>
                      <option value="Quora">Quora</option>
                      <option value="Personal Blog">Personal Blog</option>
                      <option value="Whatsapp">Whatsapp</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Contact Tag</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].contactTag}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "contactTag"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select Contact Tag</option>
                      <option value="Work ">Work</option>
                      <option value="Personal ">Personal</option>
                      <option value="Other ">Other</option>
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
                      <option value="" disabled hidden>Select Country</option>
                      <option value="india" >India</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">State/Province</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].state}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "state"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select Province</option>
                      <option value="karnatka" >karnatka</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Select City</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.contacts[0].city}
                      onChange={(e) =>
                        handleChange(["contacts", 0, "city"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select City</option>
                      <option value="Banglore">Banglore</option>
                    </select>
                  </div>
                </div>

              </div>
            )}
           


            {/* Bio Data */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("biodata")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Bio Data</h2>
              <IoIosArrowDown
                className={`transition-transform ${dropsection.biodata ? "rotate-180" : ""
                  }`} />
            </div>
              <hr className='border-black/20' />
            {dropsection.biodata && (
              <div className='space-y-3 mt-3'>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Gender</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata.gender}
                      onChange={(e) =>
                        handleChange(["biodata", "gender"], e.target.value)
                      }>
                      <option value="" disabled hidden>Gender</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Blood Group (optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata.bloodGroup}
                      onChange={(e) =>
                        handleChange(["biodata", "bloodGroup"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
                {/* Gender, Challenge, Marital Status */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Gender pronoun (Optional)</label>
                   
                    <input type='text'
                      className='w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500'
                      placeholder="Enter biodata genderPronoun"
                      value={formData.biodata.genderPronoun}
                      onChange={(e) =>
                        handleChange(["biodata", "genderPronoun"], e.target.value)
                      } />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Challenge (Optional)</label>
                    
                    <input type='text'
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      placeholder="Enter biodata challenged"
                      value={formData.biodata.challenged}
                      onChange={(e) =>
                        handleChange(["biodata", "challenged"], e.target.value)
                      } />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm mb-1.5">Marital status (Optional)</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.biodata.maritalStatus}
                      onChange={(e) =>
                        handleChange(["biodata", "maritalStatus"], e.target.value)
                      }>
                      <option value="" disabled hidden>Select Marital Status</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Partnered">Partnered</option>
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
                    value={formData.biodata.spouseOrPartnerName}
                    onChange={(e) =>
                      handleChange(["biodata", "spouseOrPartnerName"], e.target.value)
                    }
                  />
                </div>

              </div>
            )}
          

            {/* Important Dates */}
            <div className='flex justify-between cursor-pointer  mt-5' onClick={() => toggleSection("importantDates")}>

              <h2 className="block text-gray-900 text-sm font-medium mb-1.5">Important Dates</h2>
              <IoIosArrowDown
                className={`transition-transform ${dropsection.importantDates ? "rotate-180" : ""
                  }`} />
            </div>
            <hr className='border-black/20' />
            {dropsection.importantDates && (
              <div className='space-y-3 mt-3'>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Birth Date</label>
                    <input
                     type='date' 
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500"
                      value={formData.importantDates.birthDate}
                      onChange={(e) =>
                        handleChange(["importantDates", "birthDate"], e.target.value)
                      }/>
                      
                  
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Your partner birth date</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                      value={formData.importantDates.partnerBirthDate}
                      onChange={(e) =>
                        handleChange(["importantDates", "partnerBirthDate"], e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 text-sm  mb-1.5">Marriage anniversary</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                      value={formData.importantDates.marriageAnniversary}
                      onChange={(e) =>
                        handleChange(["importantDates", "marriageAnniversary"], e.target.value)
                      }
                    />
                  </div>
                </div>

              </div>
            )}
            


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
                      <option value="" disabled hidden>Select Relationship</option>
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Brother">Brother</option>
                      <option value="Sister">Sister</option>
                      <option value="Wife">Wife</option>
                      <option value="Son">Son</option>
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
            <div className='flex justify-between sticky bottom-0 mt-5'>

              <div>
                <button type='button' className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md' onClick={onPrevious}>previous</button>
              </div>

              <div className='flex gap-2'>
                <button type='button' onClick={handleSkip} className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md'>Skip</button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
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