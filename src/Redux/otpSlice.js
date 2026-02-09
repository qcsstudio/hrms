// Redux/otpSlice.js
import { createSlice } from "@reduxjs/toolkit"

const otpSlice = createSlice({
  name: "otp",
  initialState: {
    verified: false,
    otpData: null,
  },
  reducers: {
    setOtpVerified: (state, action) => {
      state.verified = true
      state.otpData = action.payload
    },
    clearOtp: (state) => {
      state.verified = false
      state.otpData = null
    }
  }
})

export const { setOtpVerified, clearOtp } = otpSlice.actions
export default otpSlice.reducer
