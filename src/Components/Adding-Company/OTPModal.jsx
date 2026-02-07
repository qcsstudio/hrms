import React, { useRef, useState } from "react"
import createAxios from "../../utils/axios.config"
import { useSearchParams } from "react-router-dom"

const OTPModal = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""])
  const [loading, setLoading] = useState(false)
  const [searchParams] = useSearchParams()

  const inputRefs = useRef([])
  const token = searchParams.get("token")
  const axiosInstance = createAxios()

  // 🔹 Handle input change
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // 🔹 CTRL + A → select all OTP boxes
  const handleKeyDown = (e, index) => {

    // CTRL + A → select all
    if (e.ctrlKey && e.key.toLowerCase() === "a") {
      e.preventDefault()
      inputRefs.current.forEach((input) => input?.select())
      return
    }

    // BACKSPACE behavior
    if (e.key === "Backspace") {
      e.preventDefault()

      setOtp((prev) => {
        const copy = [...prev]

        // agar current box me value hai → sirf wahi clear
        if (copy[index]) {
          copy[index] = ""
        }
        // warna previous box pe jao aur clear karo
        else if (index > 0) {
          copy[index - 1] = ""
          setTimeout(() => {
            inputRefs.current[index - 1]?.focus()
          }, 0)
        }

        return copy
      })
    }
  }

  // 🔹 Clear OTP one-by-one (last → first)
  const clearOtpOneByOne = () => {
    let index = otp.length - 1

    const interval = setInterval(() => {
      setOtp((prev) => {
        const copy = [...prev]
        copy[index] = ""
        return copy
      })

      inputRefs.current[index]?.focus()
      index--

      if (index < 0) {
        clearInterval(interval)
        inputRefs.current[0]?.focus()
      }
    }, 120)
  }

  // 🔹 Verify OTP
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

      if (res.status === 200) {
        onVerify()
      }
    } catch (err) {
      alert("OTP Verification Failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[460px] rounded-2xl px-8 py-6 shadow-xl">

          <h2 className="text-2xl font-semibold text-gray-900">
            Enter OTP
          </h2>
          <p className="text-sm text-gray-400 mt-1 mb-6">
            We have sent a OTP to your Email.
          </p>

          {/* OTP Inputs */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-14 h-12 border border-gray-300 rounded-lg 
             text-center text-lg font-medium 
             focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

            ))}
          </div>

          {/* Verify Button */}
          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 
                       text-white rounded-xl text-sm font-semibold 
                       transition disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          {/* Resend */}
          <p className="text-center text-sm text-gray-400 mt-5">
            Didn’t receive code?{" "}
            <span className="text-blue-600 font-medium cursor-pointer hover:underline">
              Resend OTP
            </span>
          </p>

        </div>
      </div>
    </>
  )
}

export default OTPModal
