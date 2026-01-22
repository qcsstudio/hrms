import React, { useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'

const WorkSpaceSetup = ({ onBack }) => {
  const [file, setFile] = useState(null)

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
    console.log(e.target.files[0])
  }
    const axiosInstance = createAxios()
   async function handlenext() {
    try {
      const token = localStorage.getItem("authToken");
      const companyId = localStorage.getItem("companyId");

      const res = await axiosInstance.post(`companies/${companyId}/workspace`, file, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log(res.data);
      onNext()

    } catch (error) {
      console.log("API Error:", error);
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-xl shadow-sm p-6">
      
      {/* Header */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Bulk Upload
      </h2>

      {/* Upload Box */}
      <label
        htmlFor="bulkUpload"
        className="cursor-pointer border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 h-44 flex flex-col items-center justify-center text-center hover:border-blue-400 transition"
      >
        <IoCloudUploadOutline className="text-[35px] text-gray-300 mb-1" />

        <p className="text-sm text-gray-600">
          Drop your files here
        </p>
        <p className="text-sm text-gray-500">
          or click to browse
        </p>

        {/* Hidden Input */}
        <input
          id="bulkUpload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>

      {/* Selected File Name */}
      {file && (
        <p className="mt-3 text-sm text-gray-600">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
        >
          Upload
        </button>

        <button
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Download Template
        </button>
      </div>
    </div>
  )
}

export default WorkSpaceSetup
