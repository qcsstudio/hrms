"use client"
import AddAccounts from "@/components/AccountComponents/AddAccounts";
import EmailChangePopUp from "@/components/common/EmailChangePopUp";
// import Loading from "@/components/common/Loading";
import PasswordChangePopUp from "@/components/common/PasswordChangePopUp";
import SideBar from "@/components/common/SideBar";
// import Navbar from "@/components/Navbar";
import { uiContext } from "@/Context/ui.context";
import { userContext } from "@/Context/user.context";
// import Image from "next/image";
import { useContext } from "react";


const layout = ({ children }) => {

  const { openPopUp, setOpenPopUp,openEmailPopUp, setEmailOpenPopUp,uiLoading } = useContext(uiContext);
  const {openAddAccount, setOpenAddAccount}  = useContext(userContext);
    const {openMenu, setOpenMenu, activeUrl,setActiveUrl} = useContext(uiContext);

  // if(uiLoading){

  return(
     <>
     <div className="mainContainer relative flex flex-col w-[100vw] h-[100vh] overflow-y-hidden bg-[#ffffff]">
        {/* <Navbar /> */}

        {/* Lower Container - Modified for mobile */}
        <div className="lower w-full h-full flex flex-col md:flex-row relative overflow-y-hidden">
          {/* Mobile Sidebar Backdrop */}
          {openMenu && (
            <div 
              className="md:hidden fixed  z-40"
              onClick={() => setOpenMenu(false)}
            ></div>
          )}

          {/* Sidebar Container - Modified for mobile */}
          <div className={`
            ${openMenu 
              ? 'fixed md:relative left-0 w-[70%] sm:w-[30%]  xs:w-[50%] xs-large:w-[40%]  md:w-[40%] lg:w-[30%] xl:w-[20%] z-50' 
              : 'hidden md:block md:w-[10%] lg:w-[8%] xl:w-[6%]'} 
            h-full transition-none md:transition-all md:duration-300
          `}>
            <SideBar/>
          </div>

          {/* Dashboard Container - Modified for mobile */}
          <div className={`
            w-full md:${openMenu ? 'w-[85%]' : 'w-[94%]'} 
            transition-all duration-300 h-full bg-[#f5f9ff] 
            rounded-tl-[.5rem] overflow-y-auto
          `}>
            {children}
          </div>
        </div>

        {/* Background Images */}
        {/* <Image className='bgImageFloating absolute z-0 top-16 left-36 select-none' src={`/images/dashboardImages/instagram.png`} height={350} width={350} alt='ad' />
        <Image className='bgImageFloating absolute z-0  top-[21rem] right-36 select-none' src={`/images/dashboardImages/linkedin.png`} height={300} width={300} alt='dwa' />
        <Image className='bgImageFloating absolute z-0  bottom-0 left-96 select-none' src={`/images/dashboardImages/pinterest.png`} height={250} width={250} alt='dwa' />
        <Image className='bgImageFloating absolute z-0 right-32 bottom-0 select-none' src={`/images/dashboardImages/facebook.png`} height={200} width={200} alt='wda' /> */}

        {/* POP-UP */}

        {openPopUp == true && <PasswordChangePopUp/>}

        {openEmailPopUp && <EmailChangePopUp/>}

        {openAddAccount && <AddAccounts/>}
      </div>
    </>
  );
};

export default layout;
