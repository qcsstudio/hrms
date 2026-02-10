import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toggleMenu } from "../Redux/sidebarSlice";
import { avatar, downArrow, navbarLogo, notification, search } from "../allAssetsImport/allAssets";
import { logout } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";


// import { fetchCurrentUser } from "../utils/thunkApis/userThunkApis";

const Navbar = () => {

  const user = useSelector((state) => state.user.user);

  console.log("user:", user)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  function handleLogout() {
    alert("go back")
    dispatch(logout());
    navigate("/login");
  }


  return (
    <>
      {/* Navbar */}
      <header className='w-[100vw] h-[5rem] bg-[#ffffff] '>

        {/* Navbar inner Container */}
        <div className="innerNavContainer w-[100%] h-[100%] px-[1.5rem] py-[1.37rem] flex items-center justify-between">

          {/* Logo & menu button */}
          <div className="leftNavbarContainer h-[100%] flex items-center  gap-[1.25rem]">

            <div className="menuButtonContainer ">
              <IoMdMenu className='text-[1.7rem] cursor-pointer' onClick={() => dispatch(toggleMenu())} />
            </div>

            <div className="logoContainer">
              <Link href={`/dashboard`}>
                <img src={navbarLogo} alt={"logo_image"} className=' object-contain cursor-pointer select-none' />
              </Link>
            </div>

          </div>

          {/* search bar */}
          <div className="centerNavbarContainer w-[34.12rem] h-[2.25rem] flex items-center  gap-[1.25rem] bg-[#F5F6F7] rounded-[0.5rem] justify-center">


            <div className="logoContainer flex items-center">

              <img src={search} width={194} height={40} alt={"search_icons"} className='w-[1.25rem] h-[1.25rem] cursor-pointer select-none' />
              <p className="searchText ml-[0.75rem] text-[#797F8F] text-[0.87rem] select-none">Search</p>
            </div>

          </div>

          {/* Profile & notification Container */}
          <div className="rightNavbarContainer h-[100%] flex items-center gap-[1.5rem]">

            {/* notification container */}
            <div className="notificationConatiner w-[1.4rem] h-[1.4rem] relative cursor-pointer">
              <img src={notification} width={20} height={20} alt={"notificatio_icon"} className='w-[100%] h-[100%] cursor-pointer select-none' />

              <div className="indicator w-[0.65rem] h-[0.625rem] rounded-[50%] bg-[#ffffff] absolute flex justify-center items-center top-[0rem] right-[0rem] p-[.1rem] ">
                <div className="colorIcon w-[100%] h-[100%] rounded-[50%] bg-[#f57600]"></div>
              </div>
            </div>

            {/* Profile Container */}
            <div className="profileContainer relative w-[4.37rem] h-[2.5rem] flex justify-between border cursor-pointer">

              {/* Invisible Select (FULL CONTAINER CLICKABLE) */}
              <select
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              >
                <option value="">Config Settings</option>

                <option value="logout">Logout</option>
              </select>

              {/* avatar Icon */}
              <div className="avatarContainer w-[2.5rem] h-[2.5rem] rounded-full overflow-hidden z-0">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-full h-full rounded-full select-none"
                />
              </div>

              {/* arrow / text area */}
              <div className="avatarContainer w-[1.25rem] h-full flex justify-center items-center z-0">
                <span className="text-[10px]">▼</span>
              </div>

            </div>


          </div>

        </div>

      </header>
    </>
  );
};

export default React.memo(Navbar);

