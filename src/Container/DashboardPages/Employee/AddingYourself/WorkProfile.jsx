import React, { useState } from "react";

const WorkProfile = () => {
  const [formData, setFormData] = useState({
    dateOfJoining: "",
    employmentStage: "",
    employmentType: "",
    employmentGrade: "",
    selfService: "",
    probationEndDate: "",
    confirmationDate: "",
    noticeStartDate: "",
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
    emergencyNumber: "",
    dependentBirthDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data 👉", formData);
  };

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
          name="noticeStartDate"
          value={formData.noticeStartDate}
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

      {/* Buttons */}
      <div className="flex items-center justify-between">
        <button type="button" className="rounded-md border px-4 py-2 text-sm">
          Previous
        </button>

        <div className="flex gap-3">
          <button type="button" className="text-sm text-gray-500">
            Skip
          </button>
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white"
          >
            Save & Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default WorkProfile;
