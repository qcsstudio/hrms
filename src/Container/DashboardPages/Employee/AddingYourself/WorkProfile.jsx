import React, { useState } from "react";
import { useSelector } from "react-redux";
import createAxios from "../../../../utils/axios.config";

const WorkProfile = ({ onSuccess, onPrevious }) => {
    const { completeData } = useSelector(
        (state) => state.employeeInvite
    )
    const [formData, setFormData] = useState({
        dateOfJoining: "",
        employmentStage: "",
        employmentType: "",
        employmentGrade: "",
        selfService: "",
        probationEndDate: "",
        confirmationDate: "",
        noticePeriodStart: "",
        exitDate: "",

        officeAddress: "",
        companyName: "",
        startDate: "",
        endDate: "",
        workRole: "",


        birthDate: "",
        partnerBirthDate: "",
        marriageAnniversary: "",

        dependentName: "",
        relationship: "",
        emergencyContactNumber: "",
        dependentBirthDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const axiosInstance = createAxios()
    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            const res = await axiosInstance.put(`/employees/${completeData.employeeId}/work-profile`, formData)

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
        <form
            onSubmit={handleSubmit}
            className="mx-auto max-w-6xl bg-white p-6"
        >
            {/* Work Details */}
            <h2 className="mb-4 border-b pb-2 text-sm font-semibold text-gray-700">
                Work Details
            </h2>

            <label className="text-sm text-gray-600">Date of Joining</label>
            <input
                type="date"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
                placeholder="eg: yourdomain@yourcompany"
                className="mb-4 mt-1 h-10 w-full rounded-md border px-3 text-sm"
            />

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <select
                    name="employmentStage"
                    value={formData.employmentStage}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                >
                    <option value="">Employment Stage</option>
                    <option value="intern">Intern</option>
                    <option value="confirmed">Confirmed</option>
                </select>

                <select
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                >
                    <option value="">Employment Type</option>
                    <option value="fulltime">Full Time</option>
                    <option value="parttime">Part Time</option>
                </select>

                <select
                    name="employmentGrade"
                    value={formData.employmentGrade}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                >
                    <option value="">Employment Grade</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                </select>
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <select
                    name="selfService"
                    value={formData.selfService}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                >
                    <option value="">Self Service</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>

                <input
                    type="date"
                    name="probationEndDate"
                    value={formData.probationEndDate}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
            </div>

            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                <input
                    type="date"
                    name="confirmationDate"
                    value={formData.confirmationDate}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
                <input
                    type="date"
                    name="noticePeriodStart"
                    value={formData.noticePeriodStart}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
                <input
                    type="date"
                    name="exitDate"
                    value={formData.exitDate}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
            </div>

            {/* Reporting Office */}
            <h2 className="mb-4 border-b pb-2 text-sm font-semibold text-gray-700">
                Reporting Office
            </h2>

            <input
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleChange}
                placeholder="Office Address"
                className="mb-6 h-10 w-full rounded-md border px-3 text-sm"
            />

            {/* Current Experience (Static) */}
            <h2 className="mb-4 border-b pb-2 text-sm font-semibold text-gray-700">
                Current Experience
            </h2>

            <div className="mb-6 flex gap-4 rounded-md border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-red-100 font-bold text-red-500">
                    A
                </div>
                <div>
                    <p className="text-sm font-semibold">UI/UX Designer</p>
                    <p className="text-xs text-gray-500">Airbnb</p>
                    <p className="text-xs text-gray-400">
                        Feb 2018 - Feb 2019 · 1 yr 1 mo
                    </p>
                </div>
            </div>

            {/* Past Experience */}
            <h2 className="mb-4 border-b pb-2 text-sm font-semibold text-gray-700">
                Past Experience
            </h2>

            <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company Name"
                className="mb-4 h-10 w-full rounded-md border px-3 text-sm"
            />

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="h-10 rounded-md border px-3 text-sm"
                />
            </div>

            <input
                name="workRole"
                value={formData.workRole}
                onChange={handleChange}
                placeholder="Work Role"
                className="mb-6 h-10 w-full rounded-md border px-3 text-sm"
            />

            <h2 className="text-sm font-medium text-gray-800 mb-4">
                Important Dates
            </h2>

            <div className="grid grid-cols-3 gap-6">
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        name="birthDate"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.birthDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Your partner birth date
                    </label>
                    <input
                        type="date"
                        name="partnerBirthDate"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.partnerBirthDate}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Marriage anniversary
                    </label>
                    <input
                        type="date"
                        name="marriageAnniversary"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.marriageAnniversary}
                        onChange={handleChange}
                    />
                </div>
            </div>

            {/* Dependents */}
            <h2 className="text-sm font-medium text-gray-800 mt-8 mb-4">
                Dependents
            </h2>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="dependentName"
                        placeholder="Choose Account"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.dependentName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Select Relationship
                    </label>
                    <select
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 bg-white focus:outline-none"
                        name="relationship"
                        value={formData.relationship}
                        onChange={handleChange}
                    >
                        <option value="" disabled hidden>
                            Choose Account
                        </option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-6">
                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Emergency Contact Number
                    </label>
                    <input
                        type="text"
                        name="emergencyContactNumber"
                        placeholder="Choose Account"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.emergencyContactNumber}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="text-sm text-gray-700 mb-1 block">
                        Birth Date
                    </label>
                    <input
                        type="date"
                        name="dependentBirthDate"
                        className="w-full h-10 px-3 border rounded-md text-sm text-gray-600 focus:outline-none"
                        value={formData.dependentBirthDate}
                        onChange={handleChange}
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
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                        Save & Continue
                    </button>
                </div>


            </div>
        </form >
    );
};

export default WorkProfile;
