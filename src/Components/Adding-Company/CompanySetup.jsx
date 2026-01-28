import React, { useEffect, useState } from 'react'
import createAxios from '../../utils/axios.config'
import OTPModal from './OTPModal '

const CompanySetup = ({ onNext, onBack }) => {
  const [formData, setFormdata] = useState({
    companyName: "",
    customUrl: "",
    slug: "",
    country: "",
    timezone: "",
    currency: "",
    industryType: ""
  })

    const [showOtpModal, setShowOtpModal] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const axiosInstance = createAxios()

  // 🔥 Page load ke 2 second baad OTP popup
  useEffect(() => {
    if (isOtpVerified) return

    const timer = setTimeout(() => {
      setShowOtpModal(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [isOtpVerified])

   const handleOtpVerified = () => {
    setIsOtpVerified(true)
    setShowOtpModal(false)
  }


  const handleChange = (e) => {
    const { name, value } = e.target
    setFormdata(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!isOtpVerified) {
      alert("Please verify OTP first")
      return
    }

    try {
      const token = localStorage.getItem("authToken")

      const res = await axiosInstance.post("companies", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      localStorage.setItem("companyId", res?.data?.companyId)
      onNext()
    } catch (error) {
      console.log("API Error:", error)
    }
  }

  return (
    <>
      {/* 🔐 OTP Modal */}
     {showOtpModal && !isOtpVerified && (
        <OTPModal onVerify={handleOtpVerified} />
      )}

      {/* ✅ PAGE ALWAYS VISIBLE */}
      <div className="w-[1280px] bg-[#F9FAFB] p-6 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div>
            <h1 className="text-[30px] font-semibold">Company Setup</h1>
            <p className="text-[22px] text-gray-600">
              Add your company basics to configure default settings.
            </p>
          </div>

          <div>
            <p className="mb-1">Company Name</p>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full h-10 border rounded-lg px-3"
            />
          </div>

          <div>
            <p className="mb-1">Custom URL</p>
            <input
              type="text"
              name="customUrl"
              value={formData.customUrl}
              onChange={handleChange}
              className="w-full h-10 border rounded-lg px-3"
            />
          </div>

          <div className="flex gap-5">
            <input
              type="text"
              name="slug"
              placeholder="Slug"
              value={formData.slug}
              onChange={handleChange}
              className="flex-1 h-10 border rounded-lg px-3"
            />

            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="flex-1 h-10 border rounded-lg px-3"
            >
              <option value="">Select Country</option>
              <option>India</option>
              <option>USA</option>
              <option>UK</option>
            </select>
          </div>

          <div className="flex gap-5">
            <input
              type="text"
              name="timezone"
              placeholder="Timezone"
              value={formData.timezone}
              onChange={handleChange}
              className="flex-1 h-10 border rounded-lg px-3"
            />

            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="flex-1 h-10 border rounded-lg px-3"
            >
              <option value="">Select Currency</option>
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
            </select>
          </div>

          <select
            name="industryType"
            value={formData.industryType}
            onChange={handleChange}
            className="w-full h-10 border rounded-lg px-3"
          >
            <option value="">Select Industry</option>
            <option>IT</option>
            <option>Marketing</option>
            <option>Finance</option>
            <option>Healthcare</option>
          </select>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded-lg"
            >
              Continue setup
            </button>
          </div>

        </form>
      </div>
    </>
  )
}

export default CompanySetup
