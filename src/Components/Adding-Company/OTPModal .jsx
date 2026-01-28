import React, { useState } from "react";
import createAxios from "../../utils/axios.config";
import { useSearchParams } from "react-router-dom";

const OTPModal = ({ onVerify }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
const token = searchParams.get("token");

  const axiosInstance = createAxios();

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

 const handleVerify = async () => {
  const enteredOtp = otp.join("");

  if (enteredOtp.length !== 4) {
    alert("Please enter valid OTP");
    return;
  }

  if (!token) {
    alert("Invalid or missing token");
    return;
  }

  try {
    setLoading(true);

    const res = await axiosInstance.post("/invites/validate-otp", {
      otp: enteredOtp,
      token: token, // 👈 token bhi bhej diya
    });

    if (res.data.success) {
      onVerify();
    } else {
      alert("Invalid OTP");
    }
  } catch (error) {
    alert("OTP verification failed");
    console.log(error);
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60  z-40"></div>

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-white w-[420px] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-1">Enter OTP</h2>
          <p className="text-xs text-black/40 mb-5">
            We have sent an OTP to your mobile number
          </p>

          {/* OTP Inputs */}
          <div className="flex justify-between items-center mb-5 ">
            {otp.map((digit, index) => (
            //   <div key={index} className="flex items-center justify-between">
            <>
           
                <input
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="w-12 h-12 border rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {index < 3 && <span >-</span>}
                 </>
            //   </div>
            ))}
          </div>

          <button
            onClick={handleVerify}
            disabled={loading}
            className="w-full h-11 bg-[#0575E6] text-white rounded-lg text-[16px] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>

          <p className="text-[14px] text-black/40 mt-4 text-center">
            Didn’t receive code?
            <span className="text-[#3568FF] cursor-pointer ml-1">
              Resend OTP
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default OTPModal;
