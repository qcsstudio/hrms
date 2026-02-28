import React, { useState } from 'react'
import { IoCloudUploadOutline } from 'react-icons/io5'
import createAxios from '../../utils/axios.config'
import { useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const WorkSpaceSetup = ({ onBack }) => {
  const { token } = useSelector((state) => state.user)

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)

  
  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")

      const companyId = localStorage.getItem('companyId')


  const navigate = useNavigate()
  const axiosInstance = createAxios(token,inviteToken)

  // ✅ FILE CHANGE (Only Excel allowed)
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    const allowedTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ]

    if (!allowedTypes.includes(selectedFile.type)) {
      alert('Only Excel files (.xls, .xlsx) are allowed')
      e.target.value = ''
      return
    }

    setFile(selectedFile)
  }

  // ✅ CONTINUE SETUP (100% HIT GUARANTEE)
  const handlenext = async () => {
    console.log('CLICKED → Continue Setup')

    if (!file) {
      alert('Please upload an Excel file first')
      return
    }

    if (!token || !companyId) {
      alert('Authentication or Company missing')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)

      const res = await axiosInstance.post(
        `/companies/${companyId}/bulk-upload-employees`,
        formData,
        {
          meta: { auth: "ADMIN_AUTH" }
        }
      )

      console.log('UPLOAD SUCCESS:', res.data)
      if (inviteToken) {
        setShowSuccessPopup(true)

      } else {
        navigate('/dashboard')
      }

    } catch (error) {
      console.error('UPLOAD ERROR:', error.response || error)
      alert(
        error?.response?.data?.message ||
        'Bulk upload failed'
      )
    } finally {
      setLoading(false)
    }
  }

    const handleInvitenext = async () => {
    // console.log('CLICKED → Continue Setup')

    if (!file) {
      toast.info('Please upload an Excel file first')
      return
    }

    if (!token || !companyId) {
      toast.info('Authentication or CompanyId missing')
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('file', file)

      const res = await axiosInstance.post(
        `invites/${companyId}/workspace-setup`,
        formData,
        {
          meta: { auth: "X_TENANT_TOKEN" }
        }
      )
      toast.success("WorkSpace setup Successfully Done!")
      // console.log('UPLOAD SUCCESS:', res.data)
      if (inviteToken) {
        setShowSuccessPopup(true)

      } else {
        navigate('/dashboard')
      }

    } catch (error) {
      console.error('UPLOAD ERROR:', error.response || error)
      toast.error(
        error?.response?.data?.message ||
        'Bulk upload failed'
      )
    } finally {
      setLoading(false)
    }
  }


  const handleskip = () => {
    if (inviteToken) {
      setShowSuccessPopup(true)

    } else {
      navigate('/dashboard')
    }

  }

  const hnadleSubmit = ()=>{
    inviteToken? handleInvitenext(): handlenext()
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

        <p className="text-sm text-gray-600">Drop your files here</p>
        <p className="text-sm text-gray-500">or click to browse</p>

        <input
          id="bulkUpload"
          type="file"
          className="hidden"
          accept=".xls,.xlsx"
          onChange={handleFileChange}
        />
      </label>

      {/* Selected File */}
      {file && (
        <p className="mt-3 text-sm text-gray-600">
          Selected file: <span className="font-medium">{file.name}</span>
        </p>
      )}

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button
          type="button"
          className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium"
          disabled
        >
          Upload
        </button>

        <button
          type="button"
          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
        >
          Download Template
        </button>
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between mt-8">
        <button
          type="button"
          className="h-11 w-[100px] border rounded-lg"
          onClick={onBack}
        >
          Cancel
        </button>
        <div className='flex gap-5'>
          <button onClick={handleskip} className="h-11 w-[170px] border rounded-lg">skip</button>
          <button
            type="button"
            className="h-11 w-[170px] border rounded-lg"
            onClick={hnadleSubmit}
            disabled={loading}
          >
            {loading ? 'Uploading...' : 'Continue Setup'}
          </button>

        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[350px] text-center shadow-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Upload Successful
            </h3>
            <p className="text-sm text-gray-600 mb-5">
              Please check your email for further instructions.
            </p>
          </div>
        </div>
      )}


    </div>
  )
}

export default WorkSpaceSetup
