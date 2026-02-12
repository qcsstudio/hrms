
import { Link, useLocation, useNavigate } from "react-router-dom"
// import { sideBarData } from "@/data/sideBar.data"
// import { useContext, useEffect, useState } from "react";
// import { uiContext } from "@/Context/ui.context"
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";

import { useState, useEffect, useRef } from "react";
import { setActiveUrl, setOpenMenu, setShowSettingsMenu } from "../../Redux/sidebarSlice";
// import { analysis, analysisactive, automation, automationactive, calender, calenderactive, createpost, createpostActive, home, homeactive, inbox, inboxactive, influencer, influenceractive, library, libraryactive, reports, reportsactive, settings, settingsactive, support, supportactive } from "../../allAssetsImport/allAssets";
// import createAxios from "../../utils/axios.config";
// import { decryptToken } from "../../utils/cryptoEncrypt";
// import ActiveUserDropdown from "../DashboardComponents/activeUserDropdown";
// import { useReactSelector } from "../../utils/hooks/customeHooks";
// import { getActiveuser } from "../../utils/thunkApis/dashboardThunkApis";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";

const SideBar = () => {

  const { openMenu, showSettingsMenu, activeUrl, isConfig } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hasFetchedRef = useRef(false);

  //Dashboard sidebar account-------------


  // useEffect(() => {
  //   if (hasFetchedRef.current) return; 
  //   hasFetchedRef.current = true;
  //   dispatch(getActiveuser());
  // }, [dispatch]);


  const [configdropdown, setConfigdropdown] = useState({
    hris: false,
    track: false,
    pay: false,
    organise: false,
    resolve: false,
    hrops: false,

  })

  const handleConfigDropdown = (menu) => {
    setConfigdropdown(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  }

  const [innerconfigdropdownhris, setInnerConfigdropdownhris] = useState({
    accountManagement: false,
    companyData: false,
    employeeData: false,
  }
  )

  const [innerconfigdropdowntrack, setInnerConfigdropdowntrack] = useState({
    attendance: false,
    leave: false,
  })

  const [innerconfigdropdownpay, setInnerConfigdropdownpay] = useState({
    expensive: false,
    payroll: false,
  })

  const [innerconfigdropdownorganise, setInnerConfigdropdownorganise] = useState({
    letter: false,

  })
  const [innerconfigdropdownresolve, setInnerConfigdropdownresolve] = useState({
    checklist: false,
    policycenter: false
  })

  const [innerconfigdropdownhrops, setInnerConfigdropdownhrops] = useState({
    asset: false,
  })

  const handleInnerConfigDropdown = (menu, dropdownType) => {
    if (dropdownType === 'hris') {
      setInnerConfigdropdownhris(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    } else if (dropdownType === 'track') {
      setInnerConfigdropdowntrack(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
    else if (dropdownType === 'pay') {
      setInnerConfigdropdownpay(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
    else if (dropdownType === 'organise') {
      setInnerConfigdropdownorganise(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
    else if (dropdownType === 'resolve') {
      setInnerConfigdropdownresolve(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
    else if (dropdownType === 'hrops') {
      setInnerConfigdropdownhrops(prev => ({
        ...prev,
        [menu]: !prev[menu]
      }));
    }
  }


  const onActivate = async (id) => {
    try {
      dispatch(setLoading(true))
      const response = await axiosInstance.post(`/api/add-active-user/${id}`)
      if (response.status == 200) {
        const msg = response.data.message
        dispatch(getActiveuser())
        dispatch(setSelectedAccount(response?.data?.data))
        toast.success(msg)
        setTimeout(() => {
          dispatch(setLoading(false))
        }, 1000)
      }
    } catch (error) {
      console.log(error, "==>")
    }
  }

  // for mobile and tabview--------------
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    // Check screen size on mount and resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Set initial value
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //-------------------


  useEffect(() => {
    const storageVal = localStorage.getItem("openMenu");
    if (storageVal != null) {
      dispatch(setOpenMenu(storageVal === "true"));
    } else {
      localStorage.setItem("openMenu", true);
    }
  }, []);

  const getCompanySlug = () => {
    const hostname = window.location.hostname;

    // main domains (NO SLUG)
    if (
      hostname === "qcsstudios.com" ||
      hostname === "www.qcsstudios.com" ||
      hostname === "localhost"
    ) {
      return null;
    }

    // company subdomain
    // example: abc.qcsstudios.com OR www.abc.qcsstudios.com
    const parts = hostname.split(".");

    if (parts.length === 3) {
      // abc.qcsstudios.com
      return parts[0];
    }

    if (parts.length === 4 && parts[0] === "www") {
      // www.abc.qcsstudios.com
      return parts[1];
    }

    return null;
  };



  // Change Tab
  const changeTab = (tabName) => {
    if (tabName === "settings") {
      dispatch(setShowSettingsMenu(true));

    }
    else {
      dispatch(setShowSettingsMenu(false));
    }
    dispatch(setActiveUrl(tabName));
    const slug = getCompanySlug();
    switch (tabName) {
      case "home":
        if (slug) {
          // ✅ company admin
          navigate("/dashboard/companyadmin-dashboard");
        } else {
          // ✅ super admin
          navigate("/dashboard/superadmin-dashboard");
        }
        break;
      case "employee":
        navigate("/dashboard/employee");
        break;
      case "attendance":
        navigate("/dashboard/attendance");
        break;
      case "leave-management":
        navigate("/dashboard/leave-management");
        break;
      case "DashboardPayroll1":
        navigate("/dashboard/payroll");
        break;

      // case "billing":
      //   navigate("/dashboard/settings/billing");
      //   dispatch(setShowSettingsMenu(true));
      //   break;

      default:
        navigate("/dashboard");
        break;
    }
  };
  const loacation = useLocation()
  return <>

    {/* flex flex-col justify-between */}
    {isConfig ? <nav className={`sidebar transition-all ease-linear duration-300 flex flex-col justify-between   ${openMenu ? 'w-[100%]' : 'w-[100%]'} h-[90vh] bg-[#fff] overflow-hidden select-none`}>
      <div>
        {openMenu && <>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('hris')}>HRIS</h1>
            {
              configdropdown.hris && <div className="pl-4">
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('accountManagement', 'hris')}>Account Management<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.accountManagement ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.accountManagement && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Global Default</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Branding Setup</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Company Offices</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Incorporation details</h1>
                  </div>
                }
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('companyData', 'hris')}>Company Data <span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.companyData ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.companyData && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Bussiness Unit</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Department</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Designation</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Team</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Grade</h1>
                  </div>
                }

                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('employeeData', 'hris')}>Employee Data <span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.employeeData ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.employeeData && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Employee Id</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Probation</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Approval Workflow</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Default Profile Privacy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]">Default Permission</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]"> Permission Policy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]"> Exit Policy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]"> Exit Reason</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]"> Custom Data</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]"> Common Access</h1>
                  </div>
                }
              </div>
            }

          </div>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('track')}>Track</h1>
            {
              configdropdown.track && <div className="pl-4">
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('attendance', 'track')}>Attendance<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdowntrack.attendance ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdowntrack.attendance && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Shift</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Clock-in-Method</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Attendance Policy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Extra Time (Compoff)</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Attendance Request Cycle</h1>

                  </div>
                }
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('leave', 'track')}>Leave<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdowntrack.leave ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdowntrack.leave && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Week-off</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Leave type</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Leave Policy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Holiday Plan</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Leave Cycle Transition</h1>

                  </div>
                }

              </div>

            }
          </div>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('pay')}>Pay</h1>
            {
              configdropdown.pay && <div className="pl-4">
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('expensive', 'pay')}>Expensive<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownpay.expensive ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownpay.expensive && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Expensive Cycle</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Currency Conversion</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Fuel & Distance Unit</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Compensator</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Expensive Policy</h1>

                  </div>
                }
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('payroll', 'pay')}>Payroll<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownpay.payroll ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownpay.payroll && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Payroll Method</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Salary Cycle</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Payroll Signatory</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Misc</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Component</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Salary Structure</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Flexible Benifit plan</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Payroll Tag</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >FNF Policy</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Overtime Payment Policy</h1>

                  </div>
                }

              </div>
            }

          </div>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('organise')}>Organise</h1>
            {
              configdropdown.organise && <div className="pl-4">
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('letter', 'organise')}>Letter<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownorganise.expensive ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownorganise.letter && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Page Layout</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Template</h1>
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Authorized Signatory</h1>
                  </div>
                }
              </div>
            }


          </div>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('resolve')}>Resolve</h1>
            {
              configdropdown.resolve && <div className="pl-4">
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('checklist', 'resolve')}>Checklist<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownresolve.checklist ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownresolve.checklist && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Checklist</h1>

                  </div>
                }
                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('policycenter', 'resolve')}>Policy Center<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownresolve.policycenter ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownresolve.policycenter && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Company Policy</h1>

                  </div>
                }
              </div>
            }

          </div>
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('hrops')}>HR Ops</h1>
             {
              configdropdown.hrops && <div className="pl-4">

                <h1 className="px-4 text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('asset', 'hrops')}>Asset<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhrops.asset ? 'rotate-180' : ''}`} /></span></h1>
                
                {
                  innerconfigdropdownhrops.asset && <div className="pl-4">
                    <h1 className="px-4 text-[#64748B]  mt-2 font-medium text-[14px]" >Asset Category</h1>
                    </div>
                }
                </div>
}

          </div>



        </>
        }

      </div>
    </nav> :
      <nav className={`sidebar transition-all ease-linear duration-300 flex flex-col justify-between ${openMenu ? 'w-[100%]' : 'w-[100%]'} h-[90vh] bg-[#fff] overflow-hidden select-none`}>
        {/* ===============================Big Sidebar======================== */}
        <div >
          {openMenu && !showSettingsMenu &&
            <ul className={`w-[100%] h-[100%]  py-[1.5rem]  flex flex-col gap-[.5rem] ${isMobile ? 'pr-[0rem]' : 'pl-[0.93rem'}`}>
              <li className={`transition-all duration-500 w-[100%] ${loacation.pathname === '/dashboard' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('home')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {loacation.pathname === '/dashboard' ? <img src={homeactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={home} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Dashboard</span>
              </li>

              <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/createpost' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('employee')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {location.pathname === '/dashboard/createpost' ? <img src={createpostActive} width={20} height={20} alt="createPost_icon" className="w-[100%] h-[100%]" /> :
                  <img src={createpost} width={20} height={20} alt="createPost_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Employees</span>
              </li>
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/schedule-post' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('attendance')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'calendar' ? <img src={calenderactive} width={20} height={20} alt="calendar_icon" className="w-[100%] h-[100%]" /> :
                  <img src={calender} width={20} height={20} alt="calender_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Attendance</span>
              </li>
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === 'contentLibrary' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('DashboardPayroll1')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'contentLibrary' ? <img src={libraryactive} width={20} height={20} alt="contentLibrary_icon" className="w-[100%] h-[100%]" /> :
                  <img src={library} width={20} height={20} alt="contentLibrary_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Payroll</span>
              </li>
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/analytics' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('leave-management')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'analytics' ? <img src={analysisactive} width={20} height={20} alt="analytics_icon" className="w-[100%] h-[100%]" /> :
                  <img src={analysis} width={20} height={20} alt="analytics_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Leave Management</span>
              </li>
              <hr className="text-[#E2E8F0]" />
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/inbox' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('inboxAndListing')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'inboxAndListing' ? <img src={inboxactive} width={20} height={20} alt="Inbox_icon" className="w-[100%] h-[100%]" /> :
                  <img src={inbox} width={20} height={20} alt="inbox_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Performance</span>
              </li>
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === 'reportsAndExports' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('reportsAndExports')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'reportsAndExports' ? <img src={settingsactive} width={20} height={20} alt="Inbox_icon" className="w-[100%] h-[100%]" /> :
                  <img src={settings} width={20} height={20} alt="inbox_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span>Announcements</span>
              </li>
              {/* <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/influencer-space' ?
              `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
              onClick={() => changeTab('influencerSpace')}>
              <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'influencerSpace' ? <img src={influenceractive} width={20} height={20} alt="Inbox_icon" className="w-[100%] h-[100%]" /> :
                  <img src={influencer} width={20} height={20} alt="inbox_icon" className="w-[100%] h-[100%]" />}
              </div>
              <span>Settings</span>
            </li> */}
              <li className={`transition-all duration-500 w-[100%] text-[#64748B]
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('settings')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                <img src={settings} width={20} height={20} alt="inbox_icon" className="w-[100%] h-[100%]" />
              </div> */}
                <span>Settings</span>
              </li>
              <li className={`transition-all duration-500 w-[100%] ${location.pathname === '/dashboard/automation-rules' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('automation-rules')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'automation-rules' ? <img src={automationactive} width={20} height={20} alt="Inbox_icon" className="w-[100%] h-[100%]" /> :
                  <img src={automation} width={20} height={20} alt="inbox_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                <span> Support</span>
              </li>

            </ul>}

          {/*============================= settings tab ====================================*/}

          {openMenu && showSettingsMenu && (
            <ul className={`w-[100%] h-[100%]  py-[1.5rem] flex flex-col gap-[.5rem] ${isMobile ? 'pr-[0rem]' : 'pl-[0.93rem'}`}>
              <li className={`transition-all duration-500  w-[80%]  flex justify-center items-center gap-4 my-5 text-[20px]  `} onClick={() => dispatch(setShowSettingsMenu(false))}>
                <span><SlArrowLeft /></span> Settings</li>

              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'account-setting' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('account-setting')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'account-setting' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'}
                  width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'}
                    width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Account Settings
              </li>

              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'security' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('security')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'security' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Security</li>
              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'user-roles' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('user-roles')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'user-roles' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                User & Roles</li>
              {/* <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'channel' ?
            `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
              'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
            onClick={() => changeTab('channel')}>
            <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'channel' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div>
            Channel
          </li> */}
              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'billing' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('billing')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'billing' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Billing
              </li>
              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'notification' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('notification')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'notification' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Notification
              </li>
              <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'help&support' ?
                `bg-[#2597f0] ${isMobile ? 'active-mobile rounded-e-[3rem] ' :
                  'active rounded-s-[3rem] '} text-[#fff]` : 'text-[#64748B] bg-[#ffffff]'}
              h-[2.76rem] py-[0.75rem] pl-[1.8rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem] `}
                onClick={() => changeTab('help&support')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'help&support' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Help & Support
              </li>
              <li className={`transition-all duration-500  w-[100%] ${activeUrl === 'signout' ? 'text-[#ffffff] bg-[#2597f0] active' : 'text-[#64748B] bg-[#ffffff]'} h-[2.76rem] py-[0.75rem] pl-[1.8rem] rounded-s-[3rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`} onClick={() => logouthandle()}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'signout' ? <img src={'/newUi/images/sidebarImages/white/supportWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/supportBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}
                Sign Out
              </li>

            </ul>
          )}

          {/* ========================small settings sidebar============================ */}

          {!openMenu && showSettingsMenu ? (<ul className="w-[100%] h-[100%] px-[1.62rem] py-[1.5rem] flex flex-col gap-[.5rem]">
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'account-setting' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('account-setting')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'account-setting' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'security' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('security')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'security' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'user-roles' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('user-roles')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'user-roles' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'channel' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('channel')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'channel' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'billing' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('billing')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'billing' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'notification' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('notification')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'notification' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>
            <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'help&support' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('help&support')}>
              {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
              {activeUrl === 'help&support' ? <img src={'/newUi/images/sidebarImages/white/createPostWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> : <img src={'/newUi/images/sidebarImages/black/createPostBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
            </div> */}

            </li>

          </ul>
          ) :
            !openMenu && (<ul className="w-[100%] h-[100%] px-[1.62rem] py-[1.5rem] flex flex-col gap-[.5rem]">

              {/* <li className={`transition-all duration-500 w-[100%] ${activeUrl === 'home' ? 'bg-[#2597f0] active  text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'} h-[2.76rem] py-[0.75rem] pl-[1.8rem] rounded-s-[3rem]  text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`} onClick={()=>changeTab('home')}>
          <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
            {activeUrl === 'home' ? <img src={'/newUi/images/sidebarImages/white/homeWhite.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]"/> :<img src={'/newUi/images/sidebarImages/black/homeBlack.svg'} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]"/>}
          </div>
          Home
        </li> */}

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'home' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('home')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'home' ? <img src={homeactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={home} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'createPost' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('createPost')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'createPost' ? <img src={createpostActive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={createpost} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'calendar' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('calendar')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'calendar' ? <img src={calenderactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={calender} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'contentLibrary' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('contentLibrary')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'contentLibrary' ? <img src={libraryactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={library} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'analytics' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('analytics')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'analytics' ? <img src={analysisactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={analysis} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'inboxAndListing' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('inboxAndListing')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'inboxAndListing' ? <img src={inboxactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={inbox} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'reportsAndExports' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('reportsAndExports')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'reportsAndExports' ? <img src={reportsactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={reports} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'influencerSpace' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('influencerSpace')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'influencerSpace' ? <img src={influenceractive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={influencer} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'automationRules' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('automationRules')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'automationRules' ? <img src={automationactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={automation} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'settings' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('settings')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'settings' ? <img src={settingsactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={settings} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

              <li className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === 'support' ? 'bg-[#2597f0]   text-[#fff]' : 'text-[#64748B] bg-[#ffffff]'}  cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`} onClick={() => changeTab('support')}>
                {/* <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                {activeUrl === 'support' ? <img src={supportactive} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" /> :
                  <img src={support} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />}
              </div> */}

              </li>

            </ul>
            )}

        </div>
      </nav>
    }



  </>
};

export default SideBar;
