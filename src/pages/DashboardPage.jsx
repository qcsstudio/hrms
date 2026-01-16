// import SideBar from "../components/common/SideBar";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { setOpenMenu } from "../redux/sidebarSlice";
import { Outlet } from "react-router-dom";
import SideBar from "../Container/Sidebar/SideBar";


const Dashboardlayout = ({ children }) => {

      const {openMenu} = useSelector((state) => state.sidebar)

    // const handleLogin = () => {
    //     const authToken = localStorage.getItem("authToken")
    //     const authParamas = new URLSearchParams({
    //         response_type: "code",
    //         client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    //         redirect_uri: `${import.meta.env.VITE_BACKEND_URL}/api/auth/linkedin/callback`,
    //         scope: "openid profile email w_member_social r_ads_reporting r_organization_social rw_organization_admin w_member_social rw_events r_ads w_organization_social rw_ads r_basicprofile r_events r_organization_admin email r_1st_connections_size",
    //         state: authToken
    //     })

    //     window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${authParamas}`
    // }


  return(
     <>
     <div className="mainContainer relative flex flex-col w-[100vw] h-[100vh] overflow-y-hidden bg-[#ffffff]">
        <Navbar />
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
            h-screen transition-none md:transition-all md:duration-300
          `}>
            <SideBar/>
          </div>

          {/* Dashboard Container - Modified for mobile */}
       
          <div className={`
            w-full md:${openMenu ? 'w-[85%]' : 'w-[94%]'} 
            transition-all duration-300 h-full bg-[#f5f9ff] 
            rounded-tl-[.5rem] overflow-y-auto
          `}>
           {/* <ChatBotLauncher/> */}
              <Outlet/>
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboardlayout;
