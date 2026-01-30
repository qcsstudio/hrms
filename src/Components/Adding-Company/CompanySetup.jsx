import React, { useEffect, useState } from 'react'
import createAxios from '../../utils/axios.config'
import OTPModal from './OTPModal'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCompanyData } from '../../Redux/userSlice'

const CompanySetup = ({ onNext, onBack }) => {

    const { token} = useSelector((state) => state.user) // get superAdmintoken from redux store
      const dispatch = useDispatch();

  const [formData, setFormdata] = useState({
    companyName: "",
    // customUrl: "",
    slug: "",
    country: "",
    timezone: "",
    currency: "",
    industryType: ""
  })

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")

  const axiosInstance = createAxios()

  // after 2 seconds, show OTP modal if inviteToken exists
  useEffect(() => {
    if (!inviteToken) return
    const timer = setTimeout(() => {
      setShowOtpModal(true)
    }, 2000)
    return () => clearTimeout(timer)
  }, [inviteToken])

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

  const handleSubmitSuperAdmin = async () => {
    try {
      const res = await axiosInstance.post("companies", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      dispatch(setCompanyData(
              res.data
            ));
      // localStorage.setItem("companyId", res?.data?.companyId)
      onNext()
    } catch (error) {
      console.log("API Error:", error)
    }
  }
  const handleSubmitInvite = async () => {
    // e.preventDefault()

    if (!isOtpVerified) {
      alert("Please verify OTP first")
      return
    }

    try {
      const res = await axiosInstance.post("/invites/company-setup", formData, {
        headers: { "x-invite-token": inviteToken },
      })
      console.log("invite company-setup ========", res)
      // localStorage.setItem("companyId", res?.data?.companyId)
      onNext()
    } catch (error) {
      console.log("API Error:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (inviteToken) {
        await handleSubmitInvite()
      } else {
        await handleSubmitSuperAdmin()
      }
    } catch (err) {
      console.error(err)
    }
  }



  return (
    <>
      {/* 🔐 OTP Modal */}
      {inviteToken && showOtpModal && !isOtpVerified && (
        <OTPModal onVerify={handleOtpVerified} />
      )}

      {/* ✅ PAGE ALWAYS VISIBLE */}
      <div className="w-[1280px] bg-[#F9FAFB] p-6 mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h1 className="text-[30px] font-semibold">Company Setup</h1>
            <p className="text-[22px] text-gray-600"> Add your company basics to configure default settings. </p>
          </div>
          <div>
            <p className="text-[15px] mb-1">Company name</p>
            <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3" />
          </div>
          {/* <div>
            <p className="text-[15px] mb-1">Custom URL</p>
            <input type="text" name="customUrl" placeholder="app.yourdomain.com/yourcompany" value={formData.customUrl} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3" />
          </div> */}
          <div className="flex gap-5">
            <div className="flex-1">
              <p className="mb-1">Slug</p>
              <input type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3" />
            </div>
            <div className="flex-1">
              <p className="mb-1">Country</p>
              <select name="country" value={formData.country} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3 bg-white" >
                <option value="">Select Country</option> <option value="India">India</option> <option value="USA">USA</option> <option value="UK">UK</option>
              </select>
            </div>
          </div>
          <div className="flex gap-5">
            <div className="flex-1">
              <p className="mb-1">Timezone</p>
              <input type="text" name="timezone" value={formData.timezone} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3" />
            </div>
            <div className="flex-1">
              <p className="mb-1">Currency</p>
              <select name="currency" value={formData.currency} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3 bg-white" >
                <option value="">Select Currency</option>
                <option value="INR">INR</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
          </div>
          <div>
            <p className="text-[15px] mb-1">Industry Type</p>
            <select name="industryType" value={formData.industryType} onChange={handleChange} className="w-full h-10 border border-black/10 rounded-lg px-3 bg-white" >
              <option value="">Select Industry</option>
              <option value="IT">IT</option>
              <option value="Marketing">Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Healthcare">Healthcare</option>
            </select>
          </div>
          <div className="flex justify-between mt-5">
            <button type="button" onClick={onBack} className="w-[100px] h-10 border border-[#30333D] rounded-lg bg-white" > Cancel </button>
            <button type="submit" className="w-[150px] h-10 border border-[#30333D] rounded-lg bg-white" > Continue setup </button>
          </div>
        </form>
      </div>
    </>

  )
}

export default CompanySetup
