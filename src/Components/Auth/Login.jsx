import React from 'react'
import {
  login_Google,
  login_Email,
  Password,
  Password_Show
} from '../../allAssetsImport/allAssets'

const Login = () => {
  return (
    <div className="flex w-[1280px] mx-auto bg-gray-50">
      
      {/* Left Section */}
      <div className="w-1/2 mt-[50px]">
        <div className="w-4/5 mx-auto">
          
          {/* Heading */}
          <div className="mt-[50px]">
            <h1 className="text-[17px] font-semibold text-black">
              Welcome back, John
            </h1>
            <p className="text-[16px] text-gray-400 mt-1">
              Welcome back! Please enter your details
            </p>
          </div>

          {/* Form */}
          <div className="mt-8">
            
            {/* Google Login */}
            <button className="w-full h-[70px] border border-gray-200 rounded-xl bg-white flex items-center justify-center gap-3">
              <img src={login_Google} alt="" />
              <span className="text-[16px] text-black">
                Log In with Google
              </span>
            </button>

            {/* Divider */}
            <div className="h-[50px] flex items-center justify-center text-[14px] text-gray-300">
              Or Log In with email
            </div>

            {/* Email Input */}
            <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
              <div className="w-[50px] border-r border-gray-300 flex justify-center">
                <img src={login_Email} alt="" />
              </div>
              <input
                type="text"
                placeholder="enter email"
                className="w-full outline-none text-[16px] text-gray-400"
              />
            </div>

            {/* Password Input */}
            <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
              <div className="w-[60px] border-r border-gray-300 flex justify-center">
                <img src={Password} alt="" />
              </div>
              <div className="flex justify-between items-center w-full pr-6">
                <input
                  type="password"
                  placeholder="password"
                  className="outline-none text-[16px] text-gray-400"
                />
                <img src={Password_Show} alt="" />
              </div>
            </div>

            {/* Remember / Forgot */}
            <div className="flex justify-between items-center text-[14px] mx-1 mb-4">
              <p>
                remember me <span className="text-gray-300">(15 days)</span>
              </p>
              <u className="cursor-pointer">forgot password?</u>
            </div>

            {/* Login Button */}
            <div className="bg-[#543FD3] h-[70px] rounded-xl flex items-center justify-center">
              <button className="text-white text-[16px] font-medium">
                log in
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-1/2 flex items-center justify-center">
        <img src="/assets/Images/login-image.png" alt="login" />
      </div>

    </div>
  )
}

export default Login
