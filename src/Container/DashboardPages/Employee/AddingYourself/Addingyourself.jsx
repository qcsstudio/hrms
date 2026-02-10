import React, { useEffect, useState } from "react";
import createAxios from "../../../../utils/axios.config";
import { useNavigate, useSearchParams } from "react-router-dom";
import OTPModal from "../../../../Components/Adding-Company/OTPModal";
import { useDispatch, useSelector } from "react-redux"
import { completeInviteFailure, completeInviteSuccess } from "../../../../Redux/employeeInviteSlice";

const Addingyourself = () => {
  const otpData = useSelector((state) => state.otp.otpData)
  const isVerified = useSelector((state) => state.otp.verified)

  console.log("otpData:===", otpData)
  console.log("isVerified:==", isVerified)

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate()

  const [showOtpModal, setShowOtpModal] = useState(false)
  const [isOtpVerified, setIsOtpVerified] = useState(false)

  const [searchParams] = useSearchParams()
  const inviteToken = searchParams.get("token")


  useEffect(() => {
    if (!inviteToken) return
    const timer = setTimeout(() => setShowOtpModal(true), 2000)
    return () => clearTimeout(timer)
  }, [inviteToken])

  const handleOtpVerified = () => {
    setIsOtpVerified(isVerified)
    setShowOtpModal(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const axiosInstance = createAxios()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        ...formData,
        inviteId: otpData?.inviteId
      }

      const res = await axiosInstance.post('/employee-invites/complete', payload)
      console.log("employee-invites/complete=====", res)

      if (res.status === 200) {
        dispatch(completeInviteSuccess(res.data))
        navigate('/employee-Profile')
      }
      else {
        dispatch(completeInviteFailure("Something went wrong"))
        alert("API is not working")
      }


    } catch (error) {
      console.log("Api is not responding", err)

    }


  };

  return (
    <>
      {inviteToken && showOtpModal && !isOtpVerified && (
        <OTPModal onVerify={handleOtpVerified} api="/employee-invites/verify" />
      )}

      <div className="p-10 max-w-[1100px]">
        {/* Heading */}
        <p className="text-black font-semibold text-[30px] max-w-[850px] leading-tight">
          You are adding yourself as an employee of QuantumCrafters Studio.
        </p>
        <p className="text-[#6B6B6B] text-[16px] mt-2">
          Please complete the below profile completely or click on “Let me in”.
        </p>

        {/* Full Name */}
        <div className="mt-8">
          <label className="text-[14px] text-black block mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full h-[44px] rounded-[10px] border border-[#0000001A] px-4 outline-none"
          />
        </div>

        {/* Date of Birth */}
        <div className="mt-5">
          <label className="text-[14px] text-black block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter your DOB"
            className="w-full h-[44px] rounded-[10px] border border-[#0000001A] px-4 outline-none"
          />
        </div>

        {/* Email & Phone */}
        <div className="flex gap-6 mt-5">
          <div className="flex-1">
            <label className="text-[14px] text-black block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full h-[44px] rounded-[10px] border border-[#0000001A] px-4 outline-none"
            />
          </div>

          <div className="flex-1">
            <label className="text-[14px] text-black block mb-1">
              Phone Number
            </label>
            <input
              name="phone"
              placeholder="Enter your Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full h-[44px] rounded-[10px] border border-[#0000001A] px-4 outline-none bg-white"
            />

          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-14">
          <button
            className="px-8 py-2 rounded-lg border border-[#E4E9EE] bg-[#F7F9FB] text-[#2D2D2D]"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-8 py-2 rounded-lg border border-[#E4E9EE] bg-[#F7F9FB] text-[#2D2D2D]"
          >
            Continue Setup
          </button>
        </div>
      </div>
    </>
  );
};

export default Addingyourself;
