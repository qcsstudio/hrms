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

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosInstance = createAxios();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const [companyData, setCompanyData] = useState(null)

  // 🔹 PAGE LOAD SE PEHLE BRANDING API
  useEffect(() => {
    const hostname = window.location.hostname;
    // example:
    // qcshrms.com
    // xyzcompany.qcshrms.com

    const parts = hostname.split(".");

    if (parts.length > 2) {
      const companySlug = parts[0]; // xyzcompany

      const fetchBranding = async () => {
        try {
          const res = await axiosInstance.get(
            `/companies/company/branding/${companySlug}`
          );

          console.log("Branding API Response:", res.data);
          localStorage.setItem("authToken",res.data.token)
          setCompanyData(res?.data)
        } catch (error) {
          console.log("Branding API Error:", error);
        }
      };

      fetchBranding();
    }
  }, []);

  // 🔹 LOGIN SUBMIT
  const handelSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoader(true);

      const res = await axiosInstance.post("/auth/login", {
        email,
        password
      });

      dispatch(setAddLoginData(res.data));
      console.log("After login response:", res.data);

      const role = res?.data?.role;

      if (role === "SUPER_ADMIN") {
        navigate("/dashboard/superadmin-dashboard");
      } else {
        navigate("/dashboard/Companyadmin-dashboard");
      }
    } catch (error) {
      let msg = error?.response?.data?.message || "Login failed";
      toast.error(msg);
      console.log("Login Error:", error);
    } finally {
      setIsLoader(false);
    }
  };

  return (
    <div className='flex h-screen items-center bg-white'>

      <div className="flex w-[1280px] mx-auto bg-gray-50">

        {/* LEFT SIDE */}
        <div className="w-1/2 mt-[50px]">
          <div className="w-4/5 mx-auto">

            <div className="mt-[50px]">
              {companyData?.company?.logo &&
                <img src={companyData?.company?.logo || "/assets/Images/company-logo.png"} alt="company-logo" className='w-[280px] h-[110px] object-contain border' />
              }

              {
                companyData?.company?.name &&
                <h1 className="text-[34px] font-semibold text-[#000000]">
                  Welcome back, {companyData?.company?.name}
                </h1>
              }
              {
                !companyData?.company?.name &&
                <h1 className="text-[34px]  font-semibold text-[#000000]">
                  Welcome
                </h1>
              }

              <p className="text-[16px] text-[#A7A7A7] mt-1">
                Welcome back! Please enter your details
              </p>
            </div>

            <div className="mt-8">

              {/* FORM */}
              <form onSubmit={handelSubmit}>

                <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
                  <div className="w-[60px] border-r border-gray-300 flex justify-between px-4">
                    <img src={login_Email} alt="email" />
                  </div>
                  <input
                    type="text"
                    placeholder="Your Email"
                    className="w-full outline-none text-[16px] text-[#A7A7A7]"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
                  <div className="w-[60px] border-r border-gray-300 flex justify-between px-4">
                    <img src={Password} alt="password" />
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <input
                      type="password"
                      placeholder="Password"
                      className="outline-none text-[16px] text-[#A7A7A7] w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img src={Password_Show} alt="show" />
                  </div>
                </div>

                <div className="flex justify-between items-center text-[14px] mx-1 mb-4">
                  <p>
                    Remember me <span className="text-[#CECECE]">(15 days)</span>
                  </p>
                  <u className="cursor-pointer font-medium">
                    Forgot Password?
                  </u>
                </div>

                <div className="bg-[#0575E6] h-[70px] rounded-xl flex items-center justify-center">
                  <button
                    type="submit"
                    className="text-white text-[16px] w-full"
                    disabled={isLoader}
                  >
                    {isLoader ? "Logging in..." : "Log in"}
                  </button>
                </div>

              </form>

              <div className='mt-12 w-[70%] text-center mx-auto'>
                <p>
                  By Logging In, you agree to our{" "}
                  <Link to="/" className="text-[#0575E6]">Terms of Service</Link>{" "}
                  and{" "}
                  <Link to="/" className="text-[#0575E6]">Privacy Policy</Link>.
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-1/2 flex items-center justify-center">
          <img src={companyData?.company?.loginImage || "/assets/Images/login-image.png"} alt="login" />
        </div>

      </div>
    </div>
  )
}

export default Login;
