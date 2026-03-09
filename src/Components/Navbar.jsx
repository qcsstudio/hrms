import { IoMdMenu } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { toggleMenu, setIsConfig } from "../Redux/sidebarSlice";
import { avatar, navbarLogo, notification, search } from "../allAssetsImport/allAssets";
import { logout } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { BiSolidDownArrow } from "react-icons/bi";



// import { fetchCurrentUser } from "../utils/thunkApis/userThunkApis";

const Navbar = () => {
  const { isConfig } = useSelector((state) => state.sidebar)


  const { user, role } = useSelector((state) => state.user);

  console.log("user:", user)
  console.log("role:", role)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);


  function handleLogout() {

    localStorage.removeItem("authToken");
    dispatch(logout());
    navigate("/login");
  }


  const handleProfileAction = (value) => {
    if (value === "config") {
      dispatch(setIsConfig(true));
    }

    if (value === "normal") {
      dispatch(setIsConfig(false));
    }
    if (value === "logout") {
      setIsLogoutModalOpen(true);
    }
    setIsProfileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (
    <>
      {/* Navbar */}
      <header className='w-[100vw] h-[5rem] bg-[#ffffff] relative z-[1000] overflow-visible'>

        {/* Navbar inner Container */}
        <div className="innerNavContainer w-[100%] h-[100%] px-[1.5rem] py-[1.37rem] flex items-center justify-between relative z-[1001] overflow-visible">

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
            <div ref={profileDropdownRef} className="profileContainer relative w-[4.37rem] h-[2.5rem] flex justify-between cursor-pointer">
              <button
                type="button"
                onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                className="absolute inset-0 w-full h-full border-none bg-transparent shadow-none outline-none focus:outline-none focus:ring-0 z-10"
                aria-label="Profile options"
              />


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
                <span className="text-[10px]"><BiSolidDownArrow /></span>
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 top-[calc(100%+10px)] w-[220px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-none z-[2000]">
                  <div className="w-full text-left px-4 py-2 text-sm text-[#111827] font-medium bg-blue-50">
                    {isConfig ? "Config" : "Normal"}
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProfileAction(isConfig ? "normal" : "config")}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] font-normal border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                  >
                    {isConfig ? "Normal" : "Config"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleProfileAction("logout")}
                    className="w-full text-left px-4 py-2 text-sm text-[#111827] font-normal border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}

            </div>


          </div>

        </div>

      </header>

      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/40">
          <div className="w-[92%] max-w-[420px] rounded-xl bg-white p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-[#111827]">Confirm Logout</h2>
            <p className="mt-2 text-sm text-[#6B7280]">
              Are you sure you want to logout?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsLogoutModalOpen(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 bg-white text-[#111827] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-4 py-2 text-sm rounded-lg bg-[#0575E6] text-white border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#0463c4]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Navbar);

