import { Link, useLocation, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { setActiveUrl, setOpenMenu } from "../../Redux/sidebarSlice";
import { toast } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import {
  addEmployee_logo,
  attendance_logo,
  attendance_logo_blue,
  call_logo,
  dashboard_logo,
  dashboard_logo_blue,
  employee_logo,
  employee_logo_blue,
  hierarcy_logo,
  leave_logo,
  leave_logo_blue,
  notification_logo,
  notification_logo_blue,
  operation_logo,
  payroll_logo,
  payroll_logo_blue,
  settings_logo,
  settings_logo_blue,
  support_logo,
  support_logo_blue,
} from "../../allAssetsImport/allAssets";
import createAxios from "../../utils/axios.config";

const PUNCH_COOLDOWN_SECONDS = 10;

const SideBar = () => {
  const token = localStorage.getItem('authToken')
  const axiosInstance = createAxios(token)

  const { openMenu, activeUrl, isConfig } = useSelector(
    (state) => state.sidebar,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [configdropdown, setConfigdropdown] = useState({
    hris: true,
    track: false,
    pay: false,
    organise: false,
    resolve: false,
    hrops: false,
  });

  const handleConfigDropdown = (menu) => {
    setConfigdropdown((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  const [innerconfigdropdownhris, setInnerConfigdropdownhris] = useState({
    accountManagement: false,
    companyData: false,
    employeeData: false,
  });

  const [innerconfigdropdowntrack, setInnerConfigdropdowntrack] = useState({
    attendance: false,
    leave: false,
    deviceintegration: false,
  });

  const [innerconfigdropdownpay, setInnerConfigdropdownpay] = useState({
    expensive: false,
    payroll: false,
  });

  const [innerconfigdropdownorganise, setInnerConfigdropdownorganise] =
    useState({
      letter: false,
    });
  const [innerconfigdropdownresolve, setInnerConfigdropdownresolve] = useState({
    checklist: false,
    policycenter: false,
  });

  const [innerconfigdropdownhrops, setInnerConfigdropdownhrops] = useState({
    asset: false,
  });

  const handleInnerConfigDropdown = (menu, dropdownType) => {
    if (dropdownType === "hris") {
      setInnerConfigdropdownhris((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    } else if (dropdownType === "track") {
      setInnerConfigdropdowntrack((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    } else if (dropdownType === "pay") {
      setInnerConfigdropdownpay((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    } else if (dropdownType === "organise") {
      setInnerConfigdropdownorganise((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    } else if (dropdownType === "resolve") {
      setInnerConfigdropdownresolve((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    } else if (dropdownType === "hrops") {
      setInnerConfigdropdownhrops((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    }
  };

  const onActivate = async (id) => {
    try {
      dispatch(setLoading(true));
      const response = await axiosInstance.post(`/api/add-active-user/${id}`);
      if (response.status == 200) {
        const msg = response.data.message;
        dispatch(getActiveuser());
        dispatch(setSelectedAccount(response?.data?.data));
        toast.success(msg);
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 1000);
      }
    } catch (error) {
      console.log(error, "==>");
    }
  };

  // for mobile and tabview--------------
  const [isMobile, setIsMobile] = useState(false);
  const [isPunchedIn, setIsPunchedIn] = useState(() => {
    return localStorage.getItem("sidebarPunchState") === "in";
  });
  const [isPunchSubmitting, setIsPunchSubmitting] = useState(false);
  const [punchCooldown, setPunchCooldown] = useState(() => {
    const cooldownEndAt = Number(localStorage.getItem("sidebarPunchCooldownEndAt"));

    if (!cooldownEndAt) {
      return 0;
    }

    const remainingSeconds = Math.ceil((cooldownEndAt - Date.now()) / 1000);
    return remainingSeconds > 0 ? remainingSeconds : 0;
  });
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (punchCooldown <= 0) {
      localStorage.removeItem("sidebarPunchCooldownEndAt");
      return;
    }

    const intervalId = window.setInterval(() => {
      const cooldownEndAt = Number(localStorage.getItem("sidebarPunchCooldownEndAt"));
      const remainingSeconds = Math.ceil((cooldownEndAt - Date.now()) / 1000);

      if (remainingSeconds <= 0) {
        setPunchCooldown(0);
        localStorage.removeItem("sidebarPunchCooldownEndAt");
        window.clearInterval(intervalId);
        return;
      }

      setPunchCooldown(remainingSeconds);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [punchCooldown]);

  //-------------------

  const userRole = localStorage.getItem("role");
  console.log(userRole, "5454545455454545")
  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isCompanyAdmin = userRole === "COMPANY_ADMIN";
  const isEMP = userRole === "EMPLOYEE";
  const isHR = userRole === "HR";
  const isTL = userRole === "TL";

  const ddfinerole = isHR || isEMP || isTL
  console.log(ddfinerole, "ddfineroleddfineroleddfinerole")
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

    if (
      hostname === "qcsstudios.com" ||
      hostname === "www.qcsstudios.com" ||
      hostname === "localhost"
    ) {
      return null;
    }

    const parts = hostname.split(".");

    if (parts.length === 3) {
      return parts[0];
    }

    if (parts.length === 4 && parts[0] === "www") {
      return parts[1];
    }
    return null;
  };

  // Change Tab
  const changeTab = (tabName) => {
    dispatch(setActiveUrl(tabName));
    const slug = getCompanySlug();
    switch (tabName) {
      case "home":
        if (slug) {
          navigate("/dashboard/companyadmin-dashboard");
        } else {
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
      case "Performance":
        navigate("/dashboard/performance");
        break;
      case "announcement":
        navigate("/dashboard/announcement");
        break;

      // config=============================================================
      //Account Management============================
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
      // Company Data==============================
      case "bussinessunit":
        navigate("/config/hris/Company_data/buisness-unit-list");
        break;
      case "department":
        navigate("/config/hris/Company_data/department");
        break;
      case "designation":
        navigate("/config/hris/Company_data/designation");
        break;
      case "team":
        navigate("/config/hris/Company_data/team");
        break;
      case "grade":
        navigate("/config/hris/Company_data/grade");
        break;
      // track===================================================================
      // Attendance===========================
      case "shift":
        navigate("/config/track/Attendance/shift/list");
        break;
      case "clock-in-method":
        navigate("/config/track/Attendance/clock-in-method/list");
        break;
      case "attendencepolicy":
        navigate("/config/track/Attendance/attendance-policy/list");
        break;
      case "extratime":
        navigate("/config/track/Attendance/extra-time/list");
        break;
      case "attendancereqcycle":
        navigate("/config/track/Attendance/attendanceRequest");
        break;

      case "week-off":
        navigate("/config/track/leave/Weekly-off/list");
        break;
      case "leave-type":
        navigate("/config/track/leave/leave-type");
        break;
      case "leave-policy":
        navigate("/config/track/leave/leave-policy/list");
        break;
      case "holiday-plan":
        navigate("/config/track/leave/holiday-plan/list");
        break;
      case "leave-cycle":
        navigate("/config/track/leave/leave-cycle");
        break;

      // Pay=======================================================================
      // expensive======================
      case "expensive-cycle":
        navigate("/config/pay/expensive/expense-cycle");
        break;
      case "currency-conversion":
        navigate("/config/pay/expensive/currency-conversion");
        break;
      case "fuel-distance":
        navigate("/config/pay/expensive/fuel-configuration");
        break;
      case "compensator":
        navigate("/config/pay/expensive/compensator");
        break;
      case "expensive-policy":
        navigate("/config/pay/expensive/expense-policy/list");
        break;

      //payroll================================

      case "payroll-methods":
        navigate("/config/pay/payroll/payroll-method");
        break;
      case "salary-cycle":
        navigate("/config/pay/payroll/salary-cycle");
        break;
      case "payroll-signatory":
        navigate("/config/pay/payroll/payroll-signature");
        break;
      case "misc":
        navigate("/config/pay/payroll/payroll-misc");
        break;
      case "component":
        navigate("/config/pay/payroll/payroll-component");
        break;
      case "salary-structure":
        navigate("/config/pay/payroll/salary-Structure/list");
        break;
      case "benifit-plan":
        navigate("/config/pay/");
        break;
      case "payroll-tag":
        navigate("/config/pay/payroll/payroll-tag");
        break;
      case "fnf-policy":
        navigate("/config/pay/payroll/fnc-policy");
        break;
      case "overtime-payment":
        navigate("/config/pay/payroll/overtime_payment-Policy");
        break;

      // organise===============

      case "page-layout":
        navigate("/config/organise/page-layout");
        break;
      case "template":
        navigate("/config/organise/template/list");
        break;
      case "authorized-signatory":
        navigate("/config/organise/authority-signature");
        break;

      // resolve================

      case "checklist":
        navigate("/config/resolve/checklist/list");
        break;
      case "company-policy":
        navigate("/config/resolve/policy-center/list");
        break;

      // Hr Opps===================
      case "asset-category":
        navigate("/config/hrops/hrops-assests/list");
        break;
      // ========================
      case "deviceintegration":
        navigate("/config/track/deviceintegration");
        break;
      default:
        if (slug) {
          navigate("/dashboard/companyadmin-dashboard");
        } else {
          navigate("/dashboard/superadmin-dashboard");
        }
        break;
    }
  };

  const loacation = useLocation();

  const handlePunchAction = async () => {
    if (isPunchSubmitting || punchCooldown > 0) {
      return;
    }

    try {
      setIsPunchSubmitting(true);
      const type = isPunchedIn ? "Punch-Out" : "Punch-In";
      const url =
        type === "Punch-In" ? "/attendance/punch-in" : "/attendance/punch-out";

      const res = await axiosInstance.post(url, null, {
        meta: { auth: "ADMIN_AUTH" }
      });
      const nextPunchState = type === "Punch-In";
      const cooldownEndAt = Date.now() + PUNCH_COOLDOWN_SECONDS * 1000;

      setIsPunchedIn(nextPunchState);
      setPunchCooldown(PUNCH_COOLDOWN_SECONDS);
      localStorage.setItem("sidebarPunchState", nextPunchState ? "in" : "out");
      localStorage.setItem("sidebarPunchCooldownEndAt", cooldownEndAt.toString());
      toast.success(
        res?.data?.message ||
        (type === "Punch-In"
          ? "Clock in successful"
          : "Clock out successful")
      );
    } catch (error) {
      console.error("Punch API failed", error);
      toast.error(
        error?.response?.data?.message || "Unable to process punch action"
      );
    } finally {
      setIsPunchSubmitting(false);
    }
  };

  return (
    <>
      {isConfig ? (
        <nav
          className={`sidebar transition-all ease-linear duration-300 flex flex-col justify-between ${openMenu ? "w-[100%]" : "w-[100%]"} h-[90vh] bg-[#fff] overflow-hidden select-none`}
        >
          <div className="h-fit overflow-y-scroll hide-scrollbar">
            {openMenu && (
              <>
                {/* =============================HRIS====================================== */}
                <div >
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("hris")}
                  >
                    HRIS
                  </h1>
                  {configdropdown.hris && (
                    <div className="px-4">
                      {/* Account Management==================================== */}
                      <h1
                        className={`px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center  `}
                        onClick={() =>
                          handleInnerConfigDropdown("accountManagement", "hris")
                        }
                      >
                        Account Management
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownhris.accountManagement ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownhris.accountManagement && (
                        <div className="pl-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Account-management/Global-defaults"
                              ? "bg-[#EEF2FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("global-default")}
                          >
                            Global Default
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Account-management/Branding-setup"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("branding-setup")}
                          >
                            Branding Setup
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Account-management/Company-office"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("company-offices")}
                          >
                            Company Offices
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Account-management/Incorporation-details"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("incorporation-details")}
                          >
                            Incorporation details
                          </h1>
                        </div>
                      )}
                      {/* Company Data================================================== */}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("companyData", "hris")
                        }
                      >
                        Company Data{" "}
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownhris.companyData ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownhris.companyData && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Company_data/buisness-unit-list"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("bussinessunit")}
                          >
                            Bussiness Unit
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Company_data/department"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("department")}
                          >
                            Department
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes('designation')
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("designation")}
                          >
                            Designation
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Company_data/team"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("team")}
                          >
                            Team
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Company_data/grade"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("grade")}
                          >
                            Grade
                          </h1>
                        </div>
                      )}
                      {/* Employee Data======================================= */}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("employeeData", "hris")
                        }
                      >
                        Employee Data{" "}
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownhris.employeeData ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownhris.employeeData && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/employeeId"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("employeeId")}
                          >
                            Employee Id
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/probation-list" ||
                              location.pathname ===
                              "/config/hris/Employee-data/probation-create"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("probation")}
                          >
                            Probation
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/Approval-workflow" ||
                              location.pathname ===
                              "/config/hris/Employee-data/approval-workflow/create" ||
                              location.pathname.includes(
                                "Employee-data/approval-workflow/edit",
                              )
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("approvalWorkflow")}
                          >
                            Approval Workflow
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/default-privacy-policy"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("defaultPrivacyPolicy")}
                          >
                            Default Profile Privacy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/default-permission"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("defaultPermission")}
                          >
                            Default Permission
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Account-management/Global-defaults"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("permissionPolicy")}
                          >
                            Permission Policy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/exitPolicy-list" ||
                              location.pathname ===
                              "/config/hris/Employee-data/exitPolicy/create" ||
                              location.pathname.includes("/exitPolicy-edit")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("exitPolicy")}
                          >
                            Exit Policy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/Exit-reason" ||
                              location.pathname ===
                              "/config/hris/Employee-data/exit-reason/create"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("exitReason")}
                          >
                            Exit Reason
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/custom-list" ||
                              location.pathname ===
                              "/config/hris/Employee-data/custom-create"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("customData")}
                          >
                            Custom Data
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/hris/Employee-data/Common-access"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("commonAccess")}
                          >
                            Common Access
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* =================Track============================================== */}
                <div>
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("track")}
                  >
                    Track
                  </h1>
                  {configdropdown.track && (
                    <div className="px-4">
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("attendance", "track")
                        }
                      >
                        Attendance
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdowntrack.attendance ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdowntrack.attendance && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes("/config/track/Attendance/shift")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("shift")}
                          >
                            Shift
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes("/config/track/Attendance/clock-in-method")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("clock-in-method")}
                          >
                            Clock-in-Method
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes("/config/track/Attendance/attendance-policy")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("attendencepolicy")}
                          >
                            Attendance Policy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px]  ${loacation.pathname.includes("/config/track/Attendance/extra-time")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("extratime")}
                          >
                            Extra Time (Compoff)
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px]  ${loacation.pathname.includes("/config/track/Attendance/attendanceRequest")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("attendancereqcycle")}
                          >
                            Attendance Request Cycle
                          </h1>
                        </div>
                      )}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("leave", "track")
                        }
                      >
                        Leave
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdowntrack.leave ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdowntrack.leave && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/leave/Weekly-off/list"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("week-off")}
                          >
                            Week-off
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/leave/leave-type"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("leave-type")}
                          >
                            Leave type
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/leave/leave-policy/list" ||
                              loacation.pathname ===
                              "/config/track/leave/leave-policy/create"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("leave-policy")}
                          >
                            Leave Policy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/leave/holiday-plan/list" ||
                              loacation.pathname ===
                              "/config/track/leave/holiday-plan/create"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("holiday-plan")}
                          >
                            Holiday Plan
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/leave/leave-cycle"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("leave-cycle")}
                          >
                            Leave Cycle Transition
                          </h1>
                        </div>
                      )}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("deviceintegration", "track")
                        }
                      >
                        Device Integration
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdowntrack.deviceintegration ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdowntrack.deviceintegration && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/track/deviceintegration"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("deviceintegration")}
                          >
                            Device-Integration
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ===================Pay========================== */}
                <div>
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("pay")}
                  >
                    Pay
                  </h1>
                  {configdropdown.pay && (
                    <div className="px-4">
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("expensive", "pay")
                        }
                      >
                        Expensive
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownpay.expensive ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownpay.expensive && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/expensive/expense-cycle"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("expensive-cycle")}
                          >
                            Expensive Cycle
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/expensive/currency-conversion"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("currency-conversion")}
                          >
                            Currency Conversion
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/expensive/fuel-configuration"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("fuel-distance")}
                          >
                            Fuel & Distance Unit
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/expensive/compensator"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("compensator")}
                          >
                            Compensator
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/expensive/expense-policy/list" ||
                              loacation.pathname ===
                              "/config/pay/expensive/create-expense-policy"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("expensive-policy")}
                          >
                            Expensive Policy
                          </h1>
                        </div>
                      )}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("payroll", "pay")
                        }
                      >
                        Payroll
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownpay.payroll ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownpay.payroll && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-method"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("payroll-methods")}
                          >
                            Payroll Method
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/salary-cycle"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("salary-cycle")}
                          >
                            Salary Cycle
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-signature"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("payroll-signatory")}
                          >
                            Payroll Signatory
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-misc"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("misc")}
                          >
                            Misc
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-component"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("component")}
                          >
                            Component
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes(
                              "/config/pay/payroll/salary-Structure",
                            )
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("salary-structure")}
                          >
                            Salary Structure
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-taghh"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("benifit-plan")}
                          >
                            Flexible Benifit plan
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/payroll-tag"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("payroll-tag")}
                          >
                            Payroll Tag
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/fnc-policy"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("fnf-policy")}
                          >
                            FNF Policy
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/pay/payroll/overtime_payment-Policy"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("overtime-payment")}
                          >
                            Overtime Payment Policy
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ======================Organise============================================= */}
                <div>
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("organise")}
                  >
                    Organise
                  </h1>
                  {configdropdown.organise && (
                    <div className="px-4">
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("letter", "organise")
                        }
                      >
                        Letter
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownorganise.expensive ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownorganise.letter && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/organise/page-layout"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("page-layout")}
                          >
                            Page Layout
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/organise/template/list"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("template")}
                          >
                            Template
                          </h1>
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname ===
                              "/config/organise/authority-signature"
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("authorized-signatory")}
                          >
                            Authorized Signatory
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ===================================Resolve=========================================== */}
                <div>
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("resolve")}
                  >
                    Resolve
                  </h1>
                  {configdropdown.resolve && (
                    <div className="px-4">
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("checklist", "resolve")
                        }
                      >
                        Checklist
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownresolve.checklist ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownresolve.checklist && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes(
                              "/config/resolve/checklist",
                            )
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("checklist")}
                          >
                            Checklist
                          </h1>
                        </div>
                      )}
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("policycenter", "resolve")
                        }
                      >
                        Policy Center
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownresolve.policycenter ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownresolve.policycenter && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes(
                              "/config/resolve/policy-center",
                            )
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("company-policy")}
                          >
                            Company Policy
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ===================================HR Ops===================================================== */}
                <div>
                  <h1
                    className="px-4 text-[#64748B]  mt-3 font-bold text-[16px]"
                    onClick={() => handleConfigDropdown("hrops")}
                  >
                    HR Ops
                  </h1>
                  {configdropdown.hrops && (
                    <div className="px-4">
                      <h1
                        className="px-4 py-[1px] text-[#64748B]  mt-3 font-medium text-[14px] flex justify-between items-center "
                        onClick={() =>
                          handleInnerConfigDropdown("asset", "hrops")
                        }
                      >
                        Asset
                        <span>
                          <MdArrowDropDown
                            className={`text-[20px] ${innerconfigdropdownhrops.asset ? "rotate-180" : ""}`}
                          />
                        </span>
                      </h1>
                      {innerconfigdropdownhrops.asset && (
                        <div className="px-4">
                          <h1
                            className={`px-4 py-2 font-medium text-[14px] ${loacation.pathname.includes("/config/hrops")
                              ? "bg-[#E9F4FF] rounded-md text-[#0575E6]"
                              : "text-[#64748B]"
                              }`}
                            onClick={() => changeTab("asset-category")}
                          >
                            Asset Category
                          </h1>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </nav>
      ) : (
        <nav
          className={`sidebar transition-all ease-linear duration-300 flex flex-col justify-between ${openMenu ? "w-[100%]" : "w-[100%]"} h-[90vh] bg-[#fff] overflow-hidden select-none`}
        >
          {/* ===============================Open Sidebar (full labels)======================== */}
          {openMenu && (
            <div className="flex flex-col justify-between h-screen ">


              <ul className="w-[100%] h-[100%] py-[1.5rem] flex flex-col gap-[.5rem] px-5  h-fit overflow-y-scroll hide-scrollbar">
                {/* ================= Dashboard ================= */}
                <li
                  className={`transition-all duration-500 w-[100%] 
  ${location.pathname === "/dashboard/companyadmin-dashboard" || location.pathname === '/dashboard/superadmin-dashboard' ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                  onClick={() => changeTab("home")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    <img
                      src={dashboard_logo}
                      width={20}
                      height={20}
                      alt="dashboard"
                    />
                  </div>
                  <span>Dashboard</span>
                </li>

                {/* ================= Employees ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname === "/dashboard/employee" ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("employee")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={employee_logo}
                        width={20}
                        height={20}
                        alt="employee"
                      />
                    </div>
                    <span>{isEMP ? "Employee" : "Employees"}</span>
                  </li>
                )}

                {/* ================= Attendance ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname === "/dashboard/attendance" ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("attendance")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={attendance_logo}
                        width={20}
                        height={20}
                        alt="attendance"
                      />
                    </div>
                    <span>Attendance</span>
                  </li>
                )}

                {/* ================= Payroll ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname === "/dashboard/payroll" ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("DashboardPayroll1")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={payroll_logo}
                        width={20}
                        height={20}
                        alt="payroll"
                      />
                    </div>
                    <span>Payroll</span>
                  </li>
                )}

                {/* ================= Leave ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname === "/dashboard/leave-management" ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("leave-management")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img src={leave_logo} width={20} height={20} alt="leave" />
                    </div>
                    <span>Leave Management</span>
                  </li>
                )}

                {/* ================= Performance ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname.includes('performance') ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("Performance")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={leave_logo}
                        width={20}
                        height={20}
                        alt="performance"
                      />
                    </div>
                    <span>Performance</span>
                  </li>
                )}

                {/* ================= Announcements ================= */}
                {!isSuperAdmin && (
                  <li
                    className={`transition-all duration-500 w-[100%]
  ${location.pathname.includes('announcement') ? "bg-[#EEF2FF] rounded-md text-[#0575E6]" : "text-[#64748B]"}
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]`}
                    onClick={() => changeTab("announcement")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={notification_logo}
                        width={20}
                        height={20}
                        alt="announcement"
                      />
                    </div>
                    <span>Announcements</span>
                  </li>
                )}

                {/* ================= Billing (ONLY SUPER ADMIN) ================= */}
                {isSuperAdmin && (
                  <li
                    className="transition-all duration-500 w-[100%] text-[#64748B]
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]"
                    onClick={() => changeTab("billing")}
                  >
                    <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                      <img
                        src={payroll_logo}
                        width={20}
                        height={20}
                        alt="billing"
                      />
                    </div>
                    <span>Billing</span>
                  </li>
                )}

                {/* ================= Settings ================= */}
                <li
                  className="transition-all duration-500 w-[100%] text-[#64748B]
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]"
                  onClick={() => changeTab("settings")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    <img
                      src={settings_logo}
                      width={20}
                      height={20}
                      alt="settings"
                    />
                  </div>
                  <span>Settings</span>
                </li>

                {/* ================= Support ================= */}
                <li
                  className="transition-all duration-500 w-[100%] text-[#64748B]
  h-[2.76rem] py-[0.75rem] pl-[1.8rem] text-[0.87rem] cursor-pointer flex items-center gap-[0.75rem]"
                  onClick={() => changeTab("support")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    <img
                      src={support_logo}
                      width={20}
                      height={20}
                      alt="support"
                    />
                  </div>
                  <span>Support</span>
                </li>
              </ul>
              {
                ddfinerole && (
                  <div className="  p-2">
                    <button
                      className="bg-[#0575E6] px-4 py-2 w-full rounded-lg text-white disabled:opacity-60"
                      onClick={handlePunchAction}
                      disabled={isPunchSubmitting || punchCooldown > 0}
                    >
                      {isPunchSubmitting
                        ? "Please wait..."
                        : punchCooldown > 0
                          // ? `${isPunchedIn ? "Clock-out" : "Clock-in"} in ${punchCooldown}s`
                          ? `${isPunchedIn ? "Clock-out" : "Clock-in"}`
                          : isPunchedIn
                            ? "Clock-out"
                            : "Clock-in"}
                    </button>
                    <div className="flex justify-evenly my-3">
                      <button><img src={addEmployee_logo} /></button>
                      <button><img src={call_logo} /></button>
                      <button><img src={hierarcy_logo} /></button>
                      <button><img src={operation_logo} /></button>

                    </div>

                  </div>
                )
              }

            </div>
          )}

          {/* ===============================Closed Sidebar (icons only)======================== */}
          {!openMenu && (
            <ul className="w-[100%] h-[100%] px-[1.62rem] py-[1.5rem] flex flex-col gap-[.5rem]">
              {/* Dashboard */}
              <li
                className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "home" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                onClick={() => changeTab("home")}
              >
                <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                  {activeUrl === "home" ? (
                    <img src={dashboard_logo_blue} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />
                  ) : (
                    <img src={dashboard_logo} width={20} height={20} alt="home_icon" className="w-[100%] h-[100%]" />
                  )}
                </div>
              </li>

              {/* Employee */}
              {!isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "employee" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("employee")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "employee" ? (
                      <img src={employee_logo_blue} width={20} height={20} alt="employee_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={employee_logo} width={20} height={20} alt="employee_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Attendance */}
              {!isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "attendance" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("attendance")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "attendance" ? (
                      <img src={attendance_logo_blue} width={20} height={20} alt="attendance_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={attendance_logo} width={20} height={20} alt="attendance_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Leave Management */}
              {!isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "leave-management" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("leave-management")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "leave-management" ? (
                      <img src={leave_logo_blue} width={20} height={20} alt="leave_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={leave_logo} width={20} height={20} alt="leave_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Payroll */}
              {!isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "DashboardPayroll1" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("DashboardPayroll1")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "DashboardPayroll1" ? (
                      <img src={payroll_logo_blue} width={20} height={20} alt="payroll_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={payroll_logo} width={20} height={20} alt="payroll_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Announcements / Notification */}
              {!isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "notification" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("notification")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "notification" ? (
                      <img src={notification_logo_blue} width={20} height={20} alt="notification_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={notification_logo} width={20} height={20} alt="notification_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Billing (Super Admin only) */}
              {isSuperAdmin && (
                <li
                  className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "billing" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                  onClick={() => changeTab("billing")}
                >
                  <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                    {activeUrl === "billing" ? (
                      <img src={payroll_logo_blue} width={20} height={20} alt="billing_icon" className="w-[100%] h-[100%]" />
                    ) : (
                      <img src={payroll_logo} width={20} height={20} alt="billing_icon" className="w-[100%] h-[100%]" />
                    )}
                  </div>
                </li>
              )}

              {/* Settings */}
              <li
                className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "settings" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                onClick={() => changeTab("settings")}
              >
                <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                  {activeUrl === "settings" ? (
                    <img src={settings_logo_blue} width={20} height={20} alt="settings_icon" className="w-[100%] h-[100%]" />
                  ) : (
                    <img src={settings_logo} width={20} height={20} alt="settings_icon" className="w-[100%] h-[100%]" />
                  )}
                </div>
              </li>

              {/* Support */}
              <li
                className={`transition-all duration-500 w-[2.5rem] h-[2.76rem] flex justify-center items-center ${activeUrl === "support" ? "bg-[#EEF2FF] text-[#fff]" : "text-[#64748B] bg-[#ffffff]"} cursor-pointer gap-[0.75rem] rounded-[.5rem] py-[0.75rem]`}
                onClick={() => changeTab("support")}
              >
                <div className="iconContainer w-[1.25rem] h-[1.25rem] flex justify-center items-center">
                  {activeUrl === "support" ? (
                    <img src={support_logo_blue} width={20} height={20} alt="support_icon" className="w-[100%] h-[100%]" />
                  ) : (
                    <img src={support_logo} width={20} height={20} alt="support_icon" className="w-[100%] h-[100%]" />
                  )}
                </div>
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
};

export default SideBar;
