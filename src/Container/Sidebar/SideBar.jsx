
import { Link, useLocation, useNavigate } from "react-router-dom"
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setActiveUrl, setOpenMenu, setShowSettingsMenu } from "../../Redux/sidebarSlice";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";

const SideBar = () => {

  const { openMenu, showSettingsMenu, activeUrl, isConfig } = useSelector((state) => state.sidebar)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [configdropdown, setConfigdropdown] = useState({
    hris: true,
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

      // config=============================================================
      //Company Data============================
      case "global-default":
        navigate("/config/hris/Account-management/Global-defaults");
        break;

      case "branding-setup":
        navigate("/config/hris/Account-management/Branding-setup");
        break;

      case "company-offices":
        navigate("/config/hris/Account-management/Company-office");
        break;

      case "incorporation-details":
        navigate("/config/hris/Account-management/Incorporation-details");
        break;

      //Employee Data============================
      case "employeeId":
        navigate("/config/hris/Employee-data/employeeId");
        break;
      case "probation":
        navigate("/config/hris/Employee-data/probation-list");
        break;
      case "approvalWorkflow":
        navigate("/config/hris/Employee-data/Approval-workflow");
        break;
      case "defaultPrivacyPolicy":
        navigate("/config/hris/Employee-data/default-privacy-policy");
        break;
      case "defaultPermission":
        navigate("/config/hris/Employee-data/default-permission");
        break;
      case "permissionPolicy":
        navigate("/config/hris/Employee-data/Permission-policy");
        break;
      case "exitPolicy":
        navigate("/config/hris/Employee-data/exitPolicy-list");
        break;
      case "exitReason":
        navigate("/config/hris/Employee-data/Exit-reason");
        break;
      case "customData":
        navigate("/config/hris/Employee-data/custom-list");
        break;
      case "commonAccess":
        navigate("/config/hris/Employee-data/Common-access");
        break;
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
          {/* =============================HRIS====================================== */}
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('hris')}>HRIS</h1>
            {
              configdropdown.hris && <div className="px-4">
                {/* Account Management==================================== */}

                <h1 className={`px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center  `} onClick={() => handleInnerConfigDropdown('accountManagement', 'hris')}>Account Management<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.accountManagement ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.accountManagement && <div className="pl-4">
                    <h1 className={`px-4 py-2    font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#EEF2FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('global-default')} >Global Default</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Branding-setup' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('branding-setup')} >Branding Setup</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Company-office' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('company-offices')}>Company Offices</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Incorporation-details' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('incorporation-details')}>Incorporation details</h1>
                  </div>
                }
                {/* Company Data================================================== */}
                <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('companyData', 'hris')}>Company Data <span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.companyData ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.companyData && <div className="px-4">
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Bussiness Unit</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Department</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`}>Designation</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`}>Team</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`}>Grade</h1>
                  </div>
                }
                {/* Employee Data======================================= */}
                <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('employeeData', 'hris')}>Employee Data <span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhris.employeeData ? 'rotate-180' : ''}`} /></span></h1>
                {
                  innerconfigdropdownhris.employeeData && <div className="px-4">
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/employeeId' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('employeeId')}>Employee Id</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/probation-list' || location.pathname === '/config/hris/Employee-data/probation-create' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('probation')}>Probation</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/Approval-workflow' || location.pathname === '/config/hris/Employee-data/approval-workflow/create' || location.pathname.includes('Employee-data/approval-workflow/edit') ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('approvalWorkflow')}>Approval Workflow</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/default-privacy-policy' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('defaultPrivacyPolicy')}>Default Profile Privacy</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/default-permission' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('defaultPermission')}>Default Permission</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('permissionPolicy')}> Permission Policy</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/exitPolicy-list' || location.pathname === '/config/hris/Employee-data/exitPolicy/create' || location.pathname.includes('/exitPolicy-edit') ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('exitPolicy')}> Exit Policy</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/Exit-reason' || location.pathname === '/config/hris/Employee-data/exit-reason/create' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('exitReason')}> Exit Reason</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/custom-list' || location.pathname === '/config/hris/Employee-data/custom-create' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('customData')}> Custom Data</h1>
                    <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Employee-data/Common-access' ?
                      'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} onClick={() => changeTab('commonAccess')}> Common Access</h1>
                  </div>
                }
              </div>
            }
          </div>


          {/* =================Track============================================== */}

          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('track')}>Track</h1>
            {
              configdropdown.track && <div className="px-4">
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('attendance', 'track')}>Attendance<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdowntrack.attendance ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdowntrack.attendance && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Shift</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Clock-in-Method</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Attendance Policy</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Extra Time (Compoff)</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Attendance Request Cycle</h1>

                </div>
              }
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('leave', 'track')}>Leave<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdowntrack.leave ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdowntrack.leave && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Week-off</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Leave type</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Leave Policy</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Holiday Plan</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Leave Cycle Transition</h1>
                </div>
              }
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " >Device Integration<span><MdArrowDropDown className={`text-[20px] `} /></span></h1>

            </div>
        }
          </div>
          {/* ===================Pay========================== */}
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('pay')}>Pay</h1>
           {
              configdropdown.pay &&  <div className="px-4">
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('expensive', 'pay')}>Expensive<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownpay.expensive ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdownpay.expensive && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Expensive Cycle</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Currency Conversion</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Fuel & Distance Unit</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Compensator</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Expensive Policy</h1>

                </div>
              }
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('payroll', 'pay')}>Payroll<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownpay.payroll ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdownpay.payroll && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Payroll Method</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Salary Cycle</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Payroll Signatory</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Misc</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Component</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Salary Structure</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Flexible Benifit plan</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Payroll Tag</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >FNF Policy</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Overtime Payment Policy</h1>

                </div>
              }
            </div>
}

          </div>
          {/* ======================Organise============================================= */}
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('organise')} >Organise</h1>
          {
              configdropdown.organise &&  <div className="px-4">
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('letter', 'organise')}>Letter<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownorganise.expensive ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdownorganise.letter && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Page Layout</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Template</h1>
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Authorized Signatory</h1>
                </div>
              }
            </div>
}
          </div>
          {/* ===================================Resolve=========================================== */}
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('resolve')} >Resolve</h1>
          {
              configdropdown.resolve &&  <div className="px-4">
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('checklist', 'resolve')}>Checklist<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownresolve.checklist ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdownresolve.checklist && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Checklist</h1>

                </div>
              }
              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('policycenter', 'resolve')}>Policy Center<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownresolve.policycenter ? 'rotate-180' : ''}`} /></span></h1>
              {
                innerconfigdropdownresolve.policycenter && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Company Policy</h1>

                </div>
              }
            </div>
}
          </div>
          {/* ===================================HR Ops===================================================== */}
          <div>
            <h1 className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]" onClick={() => handleConfigDropdown('hrops')}>HR Ops</h1>
           {
              configdropdown.hrops && <div className="px-4">

              <h1 className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center " onClick={() => handleInnerConfigDropdown('asset', 'hrops')}>Asset<span><MdArrowDropDown className={`text-[20px] ${innerconfigdropdownhrops.asset ? 'rotate-180' : ''}`} /></span></h1>

              {
                innerconfigdropdownhrops.asset && <div className="px-4">
                  <h1 className={`px-4 py-2  font-medium text-[14px] ${loacation.pathname === '/config/hris/Account-management/Global-defaults' ?
                    'bg-[#E9F4FF] rounded-md text-[#0575E6]' : 'text-[#64748B]'}`} >Asset Category</h1>
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
