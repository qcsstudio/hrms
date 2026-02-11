import React, { useState } from 'react'
import createAxios from '../../../../utils/axios.config';
import { useSelector } from 'react-redux';

const EducationProfile = ({ setEducation,onPrevious,onSuccess }) => {
    const { completeData } = useSelector(
        (state) => state.employeeInvite
    )

    const [formData, setFormData] = useState({
        educationType: "",
        instituteName: "",
        startDate: "",
        endDate: "",
        universityName: "",
        levelOfStudy: "",
        fieldOfStudy: "",
        activities: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const axiosInstance = createAxios()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axiosInstance.put(`/employees/${completeData.employeeId}/education`, formData)

            if (res.status === 200) {
                onSuccess()
            }

        } catch (error) {
            console.log("api is not respond", error)

        }


    }

     const handleSkip = () => {
        onSuccess()
    }
    return (
        <>
            {
                setEducation ? <div className="w-full bg-white rounded-lg  p-6">
                    <h2 className="text-sm font-semibold text-gray-700 mb-4">
                        Education Details
                    </h2>

                    {/* Education Type */}
                    <div className="mb-4">
                        <label className="block text-xs text-gray-600 mb-1">
                            Education Type
                        </label>
                        <select
                            name="educationType"
                            value={formData.educationType}
                            onChange={handleChange}
                            className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                        >
                            <option value="" disabled hidden>select education type</option>
                            <option value="School">School</option>
                            <option value="Undergraduate">Undergraduate</option>
                            <option value="Graduate">Graduate</option>
                            <option value="Post Graduate">Post Graduate</option>
                            <option value="Doctorate">Doctorate</option>
                            <option value="Custom">Custom</option>
                        </select>
                    </div>

                    {/* Institute + Dates */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Institute name
                            </label>
                            <input
                                type="text"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleChange}
                                placeholder="Choose Account"
                                className="w-full border rounded-md px-3 py-2 text-sm outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* University + Level */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                University Name
                            </label>
                            <input
                                type="text"
                                name="universityName"
                                value={formData.universityName}
                                onChange={handleChange}
                                placeholder="Choose Account"
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Level of study
                            </label>
                            <select
                                name="levelOfStudy"
                                value={formData.levelOfStudy}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            >
                                <option value="">Choose Account</option>
                                <option value="High School">High School</option>
                                <option value="Diploma">Diploma</option>
                                <option value="Bachelor">Bachelor</option>
                                <option value="Master">Master</option>
                            </select>
                        </div>
                    </div>

                    {/* Field + Activities */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Field of study / major (optional)
                            </label>
                            <input
                                type="text"
                                name="fieldOfStudy"
                                value={formData.fieldOfStudy}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-xs text-gray-600 mb-1">
                                Activities (optional)
                            </label>
                            <input
                                type="text"
                                name="activities"
                                value={formData.activities}
                                onChange={handleChange}
                                className="w-full border rounded-md px-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                  <div className='flex justify-between sticky bottom-0 mt-5'>

                <div>
                    <button type='button' className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md' onClick={onPrevious}>previous</button>
                </div>

                <div className='flex gap-2'>
                    <button type='button' onClick={handleSkip} className='border px-4 py-2 border-[#D1D3D8] bg-[#E2E4E7] rounded-md'>Skip</button>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
                        Save & Continue
                    </button>
                </div>


            </div>
                </div> : <>

                    <h2 className='font-semibold text-[#344054]'>Education </h2>
                    <hr className='border-[#e0dede]' />
                    <div className='border-[#e0dede] border rounded-md h-[100px] mt-3'>
                        <h1 className='font-semibold text-gray-500 p-5'> No Education Added</h1>
                    </div>
                </>
            }





        </>
    )
}

export default EducationProfile