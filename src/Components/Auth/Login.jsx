import React, { useState, useEffect } from 'react'
import {
  login_Google,
  login_Email,
  Password,
  Password_Show
} from '../../allAssetsImport/allAssets'

import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import createAxios from '../../utils/axios.config';
import { setAddLoginData } from '../../Redux/userSlice';
import { getSlug } from '../CompanySlug';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosInstance = createAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);
  const [companyData, setCompanyData] = useState(null);

  // const [forgetpaswword, setForgetpassword] = useState(false)
  const [confirmforgetemail, setConfirmforgetemail] = useState("")
  // const [verifyotp, setVerifyotp] = useState(false)
  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  // const [resetPassword, setResetPassword] = useState(false)

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Error states
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: ""
  });

  // Track touched fields for better UX
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  // Password validation function
  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  // Handle field blur to show errors after user leaves field
  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));

    // Validate on blur
    if (field === 'email') {
      setErrors(prev => ({ ...prev, email: validateEmail(email) }));
    } else if (field === 'password') {
      setErrors(prev => ({ ...prev, password: validatePassword(password) }));
    }
  };

  // Real-time validation as user types
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Only show error if field has been touched
    if (touched.email) {
      setErrors(prev => ({ ...prev, email: validateEmail(value) }));
    }
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    // Only show error if field has been touched
    if (touched.password) {
      setErrors(prev => ({ ...prev, password: validatePassword(value) }));
    }
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: "" }));
    }
  };

  // 🔹 PAGE LOAD SE PEHLE BRANDING API
  useEffect(() => {
    const hostname = window.location.hostname;
    const parts = hostname.split(".");

    if (parts.length > 2) {
      const companySlug = parts[0];

      const fetchBranding = async () => {
        try {
          const res = await axiosInstance.get(
            `/companies/company/branding/${companySlug}`
          );
          setCompanyData(res?.data);
        } catch (error) {
          console.log("Branding API Error:", error);
          // Show branding error but don't block login
          toast.info("Using default company branding");
        }
      };

      fetchBranding();
    }
  }, []);

  const slug = getSlug();

  // Validate all fields before submission
  const validateForm = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
      general: ""
    });

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true
    });

    return !emailError && !passwordError;
  };

  // 🔹 LOGIN SUBMIT
  const handelSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      // Show toast for first error
      if (errors.email) {
        toast.error(errors.email);
      } else if (errors.password) {
        toast.error(errors.password);
      }
      return;
    }

    try {
      setIsLoader(true);
      setErrors(prev => ({ ...prev, general: "" }));

      const res = await axiosInstance.post("/auth/login", {
        email,
        password
      },
        slug && { meta: { auth: "TENANT_ONLY" } }
      );

      dispatch(setAddLoginData(res.data));
      localStorage.setItem("authToken", res.data.token);

      const role = res?.data?.user?.role;

      // Success toast
      toast.success("Login successful! Redirecting...");

      if (role === "SUPER_ADMIN") {
        navigate("/dashboard/superadmin-dashboard");
      } else {
        navigate("/dashboard/Companyadmin-dashboard");
      }
    } catch (error) {
      // Handle different error scenarios with user-friendly messages
      let errorMessage = "Login failed. Please try again.";

      if (error.code === 'ECONNABORTED') {
        errorMessage = "Connection timeout. Please check your internet and try again.";
      } else if (!error.response) {
        errorMessage = "Network error. Please check your internet connection.";
      } else {
        // Handle specific HTTP status codes
        switch (error.response.status) {
          case 400:
            errorMessage = error.response?.data?.message || "Invalid request. Please check your input.";
            break;
          case 401:
            errorMessage = "Invalid email or password. Please try again.";
            break;
          case 403:
            errorMessage = "Your account has been locked. Please contact support.";
            break;
          case 404:
            errorMessage = "Account not found. Please check your email or sign up.";
            break;
          case 422:
            errorMessage = "Please verify your email address before logging in.";
            break;
          case 429:
            errorMessage = "Too many failed attempts. Please try again after 15 minutes.";
            break;
          case 500:
          case 502:
          case 503:
            errorMessage = "Server error. Please try again later.";
            break;
          default:
            errorMessage = error.response?.data?.message || errorMessage;
        }
      }

      // Set general error and show toast
      setErrors(prev => ({ ...prev, general: errorMessage }));
      toast.error(errorMessage);
      console.log("Login Error:", error);
    } finally {
      setIsLoader(false);
    }
  };

  // Get input field class based on error state
  const getInputFieldClass = (field) => {
    const baseClass = "w-full outline-none text-[16px]";
    const hasError = touched[field] && errors[field];
    return `${baseClass} ${hasError ? 'text-red-600' : 'text-[#A7A7A7]'}`;
  };

  // Get container class based on error state
  const getContainerClass = (field) => {
    const baseClass = "flex items-center h-[70px] border rounded-xl gap-6 px-4 mb-4 transition-colors duration-200";
    const hasError = touched[field] && errors[field];
    return `${baseClass} ${hasError ? 'border-red-500 bg-red-50' : 'border-gray-200'}`;
  };

  const STEPS = {
    LOGIN: "LOGIN",
    FORGOT: "FORGOT",
    VERIFY_OTP: "VERIFY_OTP",
    RESET_PASSWORD: "RESET_PASSWORD",
  };

  const [step, setStep] = useState(STEPS.LOGIN);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // navigate("/verify-code");
  //   try {
  //     const payload = {
  //       email: confirmforgetemail
  //     }
  //     await axiosInstance.post('/users/send-otp', payload)
  //     setVerifyotp(true)


  //   } catch (error) {
  //     console.warn("api is not working ", error)

  //   }
  // };
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users/send-otp", {
        email: confirmforgetemail,
      });

      toast.success("OTP sent");
      setStep(STEPS.VERIFY_OTP); // ✅ next screen
    } catch (err) {
      toast.error("Failed to send OTP");
    }
  };

  // const handleotpSubmit = async (e) => {
  //   e.preventDefault();
  //   const payload = {
  //     email:"uighui",
  //     otp:""
  //   }
  //   try {
  //     await axiosInstance.post('/users/verify-otp'.payload)
  //     setResetPassword(true)

  //   } catch (error) {
  //     console.warn("api is not working", error)

  //   }

  // }

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/users/verify-otp", {
        email: confirmforgetemail,
        otp: code,
      });

      toast.success("OTP verified");
      setStep(STEPS.RESET_PASSWORD); // ✅ next
    } catch (err) {
      toast.error("Invalid OTP");
    }
  };
  // const handlechangepassword = async(e)=>{
  //       e.preventDefault();
  //   try {
  //     await axiosInstance.post('/users/reset-password',payload)
  //     setForgetpassword(false)
  //     setVerifyotp(false)
  //     setResetPassword(false)



  //   } catch (error) {
  //     console.warn("api is not working",error)

  //   }

  // }
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await axiosInstance.post("/users/reset-password", {
        email: confirmforgetemail,
        newPassword,
        confirmPassword,
      });

      toast.success("Password reset successful");

      // cleanup
      setConfirmforgetemail("");
      setCode("");
      setNewPassword("");
      setConfirmPassword("");
      setStep(STEPS.LOGIN);
    } catch (err) {
      toast.error("Reset failed");
    }
  };

  return (
    <div className='flex h-screen items-center bg-white'>
      <div className="flex w-[1280px] mx-auto bg-gray-50">

        {/* LEFT SIDE */}
        {step === STEPS.LOGIN && <div className="w-1/2 mt-[50px]">
          <div className="w-4/5 mx-auto">

            <div className="mt-[50px]">
              {companyData?.company?.logo &&
                <img
                  src={companyData?.company?.logo || "/assets/Images/company-logo.png"}
                  alt="company-logo"
                  className='w-[280px] h-[110px] object-contain border'
                />
              }

              {companyData?.company?.name ? (
                <h1 className="text-[34px] font-semibold text-[#000000]">
                  Welcome back, {companyData?.company?.name}
                </h1>
              ) : (
                <h1 className="text-[34px] font-semibold text-[#000000]">
                  Welcome
                </h1>
              )}

              <p className="text-[16px] text-[#A7A7A7] mt-1">
                Welcome back! Please enter your details
              </p>
            </div>

            {/* General Error Message */}
            {errors.general && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-sm">{errors.general}</span>
              </div>
            )}

            <div className="mt-8">
              {/* FORM */}
              <form onSubmit={handelSubmit} noValidate>

                {/* Email Field */}
                <div className="relative">
                  <div className={getContainerClass('email')}>
                    <div className="w-[60px] border-r border-gray-300 flex justify-between px-4">
                      <img src={login_Email} alt="email" />
                    </div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className={getInputFieldClass('email')}
                      value={email}
                      onChange={handleEmailChange}
                      onBlur={() => handleBlur('email')}
                      disabled={isLoader}
                    />
                  </div>
                  {/* Email Error Message */}
                  {touched.email && errors.email && (
                    <p className="text-red-500 text-sm mt-1 ml-4 flex items-center gap-1">
                      <span className="text-xs">⚠</span> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="relative">
                  <div className={getContainerClass('password')}>
                    <div className="w-[60px] border-r border-gray-300 flex justify-between px-4">
                      <img src={Password} alt="password" />
                    </div>
                    <div className="flex justify-between items-center w-full">
                      <input
                        // type="password"
                          type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        className={getInputFieldClass('password')}
                        value={password}
                        onChange={handlePasswordChange}
                        onBlur={() => handleBlur('password')}
                        disabled={isLoader}
                      />
                      <button type='button' onClick={() => setShowPassword(prev => !prev)}>
                      <img src={Password_Show} alt="show" className="cursor-pointer" />
                      </button>
                    </div>
                  </div>
                  {/* Password Error Message */}
                  {touched.password && errors.password && (
                    <p className="text-red-500 text-sm mt-1 ml-4 flex items-center gap-1">
                      <span className="text-xs">⚠</span> {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-center text-[14px] mx-1 mb-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4" />
                    <span>
                      Remember me <span className="text-[#CECECE]">(15 days)</span>
                    </span>
                  </label>
                  <button
                    type="button"
                    // onClick={() => navigate("/forget-password")}
                    // onClick={() => setForgetpassword(true)}
                    onClick={() => setStep(STEPS.FORGOT)}
                    className="text-[#0575E6] hover:underline font-medium"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoader}
                  className={`w-full h-[70px] rounded-xl flex items-center justify-center text-white text-[16px] font-medium transition-all duration-200 ${isLoader
                    ? 'bg-[#0575E6]/70 cursor-not-allowed'
                    : 'bg-[#0575E6] hover:bg-[#0463c4] active:transform active:scale-[0.99]'
                    }`}
                >
                  {isLoader ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Logging in...
                    </div>
                  ) : "Log in"}
                </button>

              </form>

              <div className='mt-12 w-[70%] text-center mx-auto'>
                <p className="text-gray-600">
                  By Logging In, you agree to our{" "}
                  <Link to="/terms" className="text-[#0575E6] hover:underline">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#0575E6] hover:underline">Privacy Policy</Link>.
                </p>
              </div>

            </div>
          </div>
        </div>
        }
        {step === STEPS.FORGOT && <div className='w-1/2 mt-[50px]'>
          <div className="flex-1 flex flex-col px-[80px] py-[60px] bg-white">
            {/* Logo */}
            <div className="mb-10">
              {companyData?.company?.logo &&
                <img
                  src={companyData?.company?.logo || "/assets/Images/company-logo.png"}
                  alt="company-logo"
                  className='w-[280px] h-[110px] object-contain border'
                />
              }
            </div>

            {/* Back Button */}
            <button
              onClick={() => setStep(STEPS.LOGIN)}
              className="flex items-center gap-2 bg-none border-none cursor-pointer text-[15px] text-[#111] font-medium mb-6 p-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
              Back to login
            </button>

            <h1 className="text-[32px] font-bold text-[#111] mb-2">
              Forgot Your Password
            </h1>

            <p className="text-[15px] text-[#999] mb-9">
              Please enter your registered email address.
            </p>

            <form onSubmit={handleSendOtp}>
              {/* Email Input */}
              <div className="relative mb-6 border-[1.5px] border-gray-300 rounded-xl px-[50px] py-[14px] flex items-center">
                {/* Email Icon */}
                <svg
                  className="absolute left-4 w-[22px] h-[22px] text-[#888]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>

                <input
                  type="email"
                  placeholder="Your Email"
                  value={confirmforgetemail}
                  onChange={(e) => setConfirmforgetemail(e.target.value)}
                  // disabled
                  required
                  className="w-full border-none outline-none bg-transparent text-[15px] text-[#333]"
                />

                {/* Check Icon */}
                <svg
                  className="absolute right-4 w-5 h-5 text-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#4A7BF7] text-white rounded-[30px] text-[16px] font-semibold cursor-pointer"
              >
                Submit
              </button>
            </form>

            <p className="text-center text-[13px] text-[#999] mt-auto pt-10">
              By Logging In, you agree to our{" "}
              <a href="#" className="text-[#111] underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#111] underline">
                Privacy Policy
              </a>.
            </p>
          </div>

        </div>}

        {step === STEPS.VERIFY_OTP && <div className='w-1/2 mt-[50px]'>
          <div className="flex min-h-screen font-['Segoe_UI',sans-serif]">
            {/* Left Side */}
            <div className="flex-1 flex flex-col px-[80px] py-[60px] bg-white">
              {/* Logo Placeholder */}
              <div className="mb-10">
                {companyData?.company?.logo &&
                  <img
                    src={companyData?.company?.logo || "/assets/Images/company-logo.png"}
                    alt="company-logo"
                    className='w-[280px] h-[110px] object-contain border'
                  />
                }
              </div>

              {/* Back Button */}
              <button
                onClick={() => setStep(STEPS.LOGIN)}
                className="flex items-center gap-2 bg-none border-none cursor-pointer text-[15px] text-[#111] font-medium mb-6 p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-[18px] h-[18px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Back to login
              </button>

              <h1 className="text-[32px] font-bold text-[#111] mb-2">
                Verify Code
              </h1>

              <p className="text-[15px] text-[#999] mb-9">
                An authentication code has been sent to your email.
              </p>

              <form onSubmit={handleVerifyOtp}>
                {/* Input Field */}
                <div className="relative mb-6 border-[1.5px] border-gray-300 rounded-xl px-5 py-[14px] flex items-center">
                  <input
                    type={showCode ? "text" : "password"}
                    placeholder="Enter Code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full border-none outline-none bg-transparent text-[15px] text-[#333]"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCode(!showCode)}
                    className="bg-none border-none cursor-pointer text-[#888] p-0"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-[22px] h-[22px]"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-[#4A7BF7] text-white rounded-[30px] text-[16px] font-semibold cursor-pointer"
                >
                  Verify
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-[13px] text-[#999] mt-auto pt-10">
                By Logging In, you agree to our{" "}
                <a href="#" className="text-[#111] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#111] underline">
                  Privacy Policy
                </a>.
              </p>
            </div>

          
          </div>
        </div>}

        {step === STEPS.RESET_PASSWORD && <div className='w-1/2 mt-[50px]'>
          <div className="flex min-h-screen font-['Segoe_UI',sans-serif]">
            {/* Left Side */}
            <div className="flex-1 flex flex-col px-[80px] py-[60px] bg-white">
              {/* Logo */}
              <div className="mb-10">
                <div className="w-[240px] h-[80px] bg-gray-300 rounded" />
              </div>

              {/* Back Button */}
              <button
                onClick={() => setStep(STEPS.LOGIN)}
                className="flex items-center gap-2 bg-none border-none cursor-pointer text-[15px] text-[#111] font-medium mb-6 p-0"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-[18px] h-[18px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
                Back to login
              </button>

              <h1 className="text-[32px] font-bold text-[#111] mb-2">
                Forgot Your Password
              </h1>
              <p className="text-[15px] text-[#999] mb-9">
                 Please create a new secure password.
              </p>

              <form onSubmit={handleResetPassword}>

                {/* Email (READ ONLY) */}
                <div className="relative mb-6 border-[1.5px] border-gray-300 rounded-xl px-[50px] py-[14px] flex items-center">
                  <svg
                    className="absolute left-4 w-[22px] h-[22px] text-[#888]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75"
                    />
                  </svg>

                  <input
                    type="email"
                    value={confirmforgetemail}
                    disabled
                    className="w-full border-none outline-none bg-transparent text-[15px] text-[#333] opacity-70"
                  />
                </div>

                {/* New Password */}
                <div className="relative mb-6 border-[1.5px] border-gray-300 rounded-xl px-[20px] py-[14px]">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full border-none outline-none bg-transparent text-[15px]"
                  />
                </div>

                {/* Confirm Password */}
                <div className="relative mb-6 border-[1.5px] border-gray-300 rounded-xl px-[20px] py-[14px]">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full border-none outline-none bg-transparent text-[15px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#4A7BF7] text-white rounded-[30px] text-[16px] font-semibold"
                >
                  Submit
                </button>

              </form>

              <p className="text-center text-[13px] text-[#999] mt-auto pt-10">
                By Logging In, you agree to our{" "}
                <a href="#" className="text-[#111] underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#111] underline">
                  Privacy Policy
                </a>.
              </p>
            </div>


          </div>
        </div>}

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex items-center justify-center">
          <img
            src={companyData?.company?.loginImage || "/assets/Images/login-image.png"}
            alt="login illustration"
            className="max-w-full h-auto"
          />
        </div>

      </div>
    </div>
  )
}

export default Login;