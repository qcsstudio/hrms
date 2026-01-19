import React, { useState } from 'react'
import {
  login_Google,
  login_Email,
  Password,
  Password_Show
} from '../../allAssetsImport/allAssets'

import { useNavigate  } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// import { setAddLoginData } from "../../redux/slices/authSlice";
import { encryptToken } from '../../utils/cryptoEncrypt';
import createAxios from '../../utils/axios.config';
import { setAddLoginData } from '../../Redux/userSlice';

const Login = () => {

  const navigate  = useNavigate ();
  const dispatch = useDispatch();

  const axiosInstance = createAxios()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoader, setIsLoader] = useState(false);

  const handelSubmit = async (e) => {
  e.preventDefault();

  try {

    setIsLoader(true);

    const res = await axiosInstance.post("/auth/superadmin/login", {
      email,
      password
    });
    console.log("res data:====", res.data);

    if (res.status === 200) {
      setIsLoader(false);

      const token = res?.data?.token;

      // ORIGINAL TOKEN STORE KARO
      localStorage.setItem("authToken", token);

      // Agar encryption chahiye to alag key me rakho
      const encryptedToken = encryptToken(token);
      localStorage.setItem("encAuthToken", encryptedToken);

      dispatch(setAddLoginData({
        user: res.data.user,
        token: token
      }));

      // toast.success("Login Successful");
      alert("Login Successful");

      navigate("/dashboard/superadmin-dashboard");
    }

  } catch (error) {
    setIsLoader(false);
    let msg = error?.response?.data?.message || "Login failed";
    toast.error(msg);
    console.log(error, "error");
  }
};

  return (
    <div className="flex w-[1280px] mx-auto bg-gray-50">

      <div className="w-1/2 mt-[50px]">
        <div className="w-4/5 mx-auto">

          <div className="mt-[50px]">
            <h1 className="text-[17px] font-semibold text-black">
              Welcome back, John
            </h1>
            <p className="text-[16px] text-gray-400 mt-1">
              Welcome back! Please enter your details
            </p>
          </div>

          <div className="mt-8">

            <button className="w-full h-[70px] border border-gray-200 rounded-xl bg-white flex items-center justify-center gap-3">
              <img src={login_Google} alt="" />
              <span className="text-[16px] text-black">
                Log In with Google
              </span>
            </button>

            <div className="h-[50px] flex items-center justify-center text-[14px] text-gray-300">
              Or Log In with email
            </div>

            {/* FORM START */}
            <form onSubmit={handelSubmit}>

              <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
                <div className="w-[50px] border-r border-gray-300 flex justify-center">
                  <img src={login_Email} alt="" />
                </div>
                <input
                  type="text"
                  placeholder="enter email"
                  className="w-full outline-none text-[16px] text-gray-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex items-center h-[70px] border border-gray-200 rounded-xl gap-6 px-4 mb-4">
                <div className="w-[60px] border-r border-gray-300 flex justify-center">
                  <img src={Password} alt="" />
                </div>
                <div className="flex justify-between items-center w-full pr-6">
                  <input
                    type="password"
                    placeholder="password"
                    className="outline-none text-[16px] text-gray-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <img src={Password_Show} alt="" />
                </div>
              </div>

              <div className="flex justify-between items-center text-[14px] mx-1 mb-4">
                <p>
                  remember me <span className="text-gray-300">(15 days)</span>
                </p>
                <u className="cursor-pointer">forgot password?</u>
              </div>

              <div className="bg-[#543FD3] h-[70px] rounded-xl flex items-center justify-center">
                <button
                  type="submit"
                  className="text-white text-[16px] font-medium w-full"
                  disabled={isLoader}
                >
                  {isLoader ? "Logging in..." : "log in"}
                </button>
              </div>

            </form>
            {/* FORM END */}

          </div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <img src="/assets/Images/login-image.png" alt="login" />
      </div>

    </div>
  )
}

export default Login
