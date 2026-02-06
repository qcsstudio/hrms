import React, { useState } from "react"
import createAxios from "../../utils/axios.config"
import { useSearchParams } from "react-router-dom"

const OTPModal = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()
  // const [apiResponse,setApiresponse] = useState(null)

  const token = searchParams.get("token")
  const axiosInstance = createAxios()

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleVerify = async () => {
    const enteredOtp = otp.join("")

    if (enteredOtp.length !== 4) {
      alert("Enter valid OTP")
      return
    }

    try {
      setLoading(true)

      const res = await axiosInstance.post("/invites/validate-otp", {
        otp: enteredOtp,
        token
      })

      // setApiresponse(res.data.message)
      // alert(res.data.message)
      if (res.status === 200) {
        onVerify() // ✅ THIS CLOSES MODAL
      } else {
        alert("Invalid OTP")
      }
    } catch (err) {
      alert(res?.data?.message)
      alert("Error: ",err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-40" />

      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[420px] rounded-xl p-6">

          <h2 className="text-xl font-bold mb-4">Enter OTP</h2>

          <div className="flex gap-2 mb-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 border text-center text-lg"
              />
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full bg-blue-600 text-white h-10 rounded"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

        </div>
      </div>
    </>
  )
}

export default OTPModal
