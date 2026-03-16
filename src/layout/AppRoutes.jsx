import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PrivateRouteOrg from "./privateRouteOrg";
import MainDashboardLayout from "./mainLayout";
import DeviceIntegration from "../Container/Config/Device-Integration/DeviceIntegration";
import ForgotPassword from "../Components/Auth/ForgotPassword";
import VerifyCode from "../Components/Auth/VerifyCode";
import SetPassword from "../Components/Auth/SetPassword";
import HomePage from "../Components/HomePage";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import LeaveCycle from "../Container/Config/Leave/LeaveCycle";
import LeaveType from "../Container/Config/Leave/LeaveType";
import WeeklyOffCreate from "../Container/Config/Leave/Weekly-off/WeeklyOffCreate";
import WeeklyOffList from "../Container/Config/Leave/Weekly-off/WeeklyOffList";
import LeavePolicyList from "../Container/Config/Leave/LeavePolicy/LeavePolicyList";
import CreateLeavePolicy from "../Container/Config/Leave/LeavePolicy/LeavePolicyCreate";
import HolidayPlanList from "../Container/Config/Leave/Holiday/HolidayPlanList";
import HolidayPlanCreate from "../Container/Config/Leave/Holiday/HolidayPlanCreate";
import PayrollComponent from "../Container/Config/pay/payroll/Component/PayrollComponent";
import OvertimePaymentPolicy from "../Container/Config/pay/payroll/OvertimePaymentPolicy/OvertimePaymentPolicy";
import PayrollMethod from "../Container/Config/pay/payroll/payroll/PayrollMethod";
import PayrollMisc from "../Container/Config/pay/payroll/PayrollMisc/PayrollMisc";
import PayrollSignature from "../Container/Config/pay/payroll/payrollSignature/PayrollSignature";
import PayrollTagList from "../Container/Config/pay/payroll/Payrolltag/PayrollTagList";
import SalaryCycle from "../Container/Config/pay/payroll/SalaryCycle/SalaryCycle";
import CreateSalaryStructure from "../Container/Config/pay/payroll/SalaryStructure/Createsalarystructure";
import Listsalarystructure from "../Container/Config/pay/payroll/SalaryStructure/Listsalarystructure";
import Compensator from "../Container/Config/pay/expense/Compensator/Compensator";
import CurrencyConversion from "../Container/Config/pay/expense/CurrencyConversion/CurrencyConversion";
import ExpenseCycle from "../Container/Config/pay/expense/ExpenseCycle/ExpenseCycle";
import CreateExpensePolicy from "../Container/Config/pay/expense/ExpensePolicy/CreateExpensePolicy";
import EditExpensePolicy from "../Container/Config/pay/expense/ExpensePolicy/Editexpensepolicy";
import ExpensePolicy from "../Container/Config/pay/expense/ExpensePolicy/ExpensePolicy";
import FuelConfiguration from "../Container/Config/pay/expense/FuelConfiguration/FuelConfiguration";
import AuthoritySignature from "../Container/Config/Organise/Authority/AuthoritySignature";
import PageLayout from "../Container/Config/Organise/PageLayout/PageLayout";
import CreateAutomaticChecklist from "../Container/Config/Resolve/Checklist/CreateAutomaticChecklist";
import CreateManualChecklist from "../Container/Config/Resolve/Checklist/CreateManualChecklist";
import Checklist from "../Container/Config/Resolve/Checklist/Checklist";
import CreatePolicy from "../Container/Config/Resolve/PolicyCenter/CreatePolicy";
import PolicyCenter from "../Container/Config/Resolve/PolicyCenter/PolicyCenterList";
import AssetsCategory from "../Container/Config/HrOps/AssetsCategory";
import AssetsCategoryCreate from "../Container/Config/HrOps/AssetsCategoryCreate";
import FNFPolicy from "../Container/Config/pay/payroll/FNFPolicy/FNFPolicy";
import Employee from "../Container/DashboardPages/Employee/Employee";
import AttendanceRequest from "../Container/Config/Attendance/AttendanceRequest/AttendanceRequest";
import Template from "../Container/Config/Organise/Template/Template";
import CreateTemplate from "../Container/Config/Organise/Template/CreateTemplate";
import AttendanceHrTL from "../Container/DashboardPages/Attendance/AttendanceHrTL";
import LeaveManagementTLHr from "../Container/DashboardPages/LeaveManagement/LeaveManagementTLHr";
import LeaveManagementHr1 from "../Container/DashboardPages/LeaveManagement/LeaveManagementHr1";
import PayrollDashboard from "../Container/Payroll/PayrollDashboard";
import PayrollOverviewPage from "../Container/Payroll/Run_Payroll/PayrollOverviewPage";
import PerformanceDashboard from "../Container/DashboardPages/Performance/PerformanceDashboard";
// import DashboardPayroll1 from "../Container/Payroll/Payroll/DashboardPayroll1";
// import PayrollDashboard from "../Container/Payroll/Payroll/PayrollDashboard";
// import DashboardPayroll2 from "../Container/Payroll/Payroll/DashboardPayroll2";
// import Dashboardpayroll3 from "../Container/Payroll/Payroll/Dashboardpayroll3";
// import Dashboardpayroll4 from "../Container/Payroll/Payroll/Dashboardpayroll4";
// import DashboardPayroll5 from "../Container/Payroll/Payroll/DashboardPayroll5";
// import Dashboardpayroll6 from "../Container/Payroll/Payroll/Dashboardpayroll6";
// import Dashboardpayroll7 from "../Container/Payroll/Payroll/Dashboardpayroll7";
// import Dashboardpayroll8 from "../Container/Payroll/Payroll/Dashboardpayroll8";
// import Dashboardpayroll9 from "../Container/Payroll/Payroll/Dashboardpayroll9";
// import Dashboardpayroll10 from "../Container/Payroll/Payroll/Dashboardpayroll10";
// import Dashboardpayroll11 from "../Container/Payroll/Payroll/Dashboardpayroll11";
// import Dashboardpayroll12 from "../Container/Payroll/Payroll/Dashboardpayroll12";

/* ================= AUTH / COMMON ================= */
const Login = lazy(() => import("../Components/Auth/Login"));
const AddCompany = lazy(() => import("../Components/Adding-Company/AddCompany"));

/* ================= DASHBOARDS ================= */
const Admindashboard = lazy(() =>
  import("../Container/Dashboard/Admindashboard")
);
const SuperAdminDashboard = lazy(() =>
  import("../Container/Dashboard/SuperAdminDashboard")
);

/* ================= MAIN MODULES ================= */
const EmployeeHrTL = lazy(() =>
  import("../Container/DashboardPages/Employee/EmployeeHrTL")
);
const AddEmployee = lazy(() =>
  import("../Container/DashboardPages/Employee/AddEmployee")
);
const AttendanceEmployee = lazy(() =>
  import("../Container/DashboardPages/Attendance/AttendanceEmployee")
);
const AttendanceCalendar = lazy(() =>
  import("../Container/DashboardPages/Attendance/Calender")
);
const LeavemanagementEmployee = lazy(() =>
  import("../Container/DashboardPages/LeaveManagement/LeavemanagementEmployee")
);

/* ================= PROFILE ================= */
const Addingyourself = lazy(() =>
  import("../Container/DashboardPages/Employee/AddingYourself/Addingyourself")
);
const EmployeeProfile = lazy(() =>
  import("../Container/DashboardPages/Employee/AddingYourself/EmployeeProfile")
);

/* ================= CONFIG : HRIS ================= */
const GlobalDefaults = lazy(() =>
  import("../Container/Config/Account-Management/GlobalDefault")
);
const BrandingSetup = lazy(() =>
  import("../Container/Config/Account-Management/BrandingSetup")
);
const IncorporationDetails = lazy(() =>
  import("../Container/Config/Account-Management/IncorporationDetails")
);
const CompanyOffices = lazy(() =>
  import("../Container/Config/Account-Management/Company/CompanyOffices")
);
const CompanyOfficeCreate = lazy(() =>
  import("../Container/Config/Account-Management/Company/CompanyOfficeCreate")
);
const CompanyOfficeEdit = lazy(() =>
  import("../Container/Config/Account-Management/Company/CompanyOfficeEdit")
);

/* ================= CONFIG : EMPLOYEE DATA ================= */
const CreateEmployeeId = lazy(() =>
  import("../Container/Config/Employee-data/CreateEmployeeId")
);
const ProbationList = lazy(() =>
  import("../Container/Config/Employee-data/Probation/ProbationList")
);
const CreateProbation = lazy(() =>
  import("../Container/Config/Employee-data/Probation/CreateProbation")
);
const ProbationEdit = lazy(() =>
  import("../Container/Config/Employee-data/Probation/ProbationEdit")
);
const ProbationView = lazy(() =>
  import("../Container/Config/Employee-data/Probation/ProbationView")
);
const ExitReasonList = lazy(() =>
  import("../Container/Config/Employee-data/Exitreason/ExitReason")
);
const CreateExitReason = lazy(() =>
  import("../Container/Config/Employee-data/Exitreason/CreateExitReason")
);
const CommonAccess = lazy(() =>
  import("../Container/Config/Employee-data/CommonAccess")
);
const CreateCustomData = lazy(() =>
  import("../Container/Config/Employee-data/custom/CreateCustomData")
);
const CustomDataList = lazy(() =>
  import("../Container/Config/Employee-data/custom/CustomDataList")
);
const ApprovalWorkflowList = lazy(() =>
  import("../Container/Config/Employee-data/Approvalworkflow/ApprovalWorkflow")
);
const CreateApprovalWorkflow = lazy(() =>
  import("../Container/Config/Employee-data/Approvalworkflow/CreateApprovalworkflow")
);
const EditApprovalWorkflow = lazy(() =>
  import("../Container/Config/Employee-data/Approvalworkflow/EditApprovalWorkflow")
);
const ExitPolicyList = lazy(() =>
  import("../Container/Config/Employee-data/ExitPolicy/ExitPolicyList")
);
const ExitPolicyCreate = lazy(() =>
  import("../Container/Config/Employee-data/ExitPolicy/ExitPolicyCreate")
);
const EditExitPolicy = lazy(() =>
  import("../Container/Config/Employee-data/ExitPolicy/EditExitPolicy")
);
const ViewExitPolicy = lazy(() =>
  import("../Container/Config/Employee-data/ExitPolicy/ViewExitPolicy")
);
const DefaultPrivacyPolicy = lazy(() =>
  import("../Container/Config/Employee-data/DefaultPrivacyPolicy")
);
const DefaultPermission = lazy(() =>
  import("../Container/Config/Employee-data/DefaultPermission")
);

/* ================= CONFIG : COMPANY DATA ================= */
const BusinessUnit = lazy(() =>
  import("../Container/Config/Company-data/Buisness-unit/BusinessUnit")
);
const CreateBusinessUnit = lazy(() =>
  import("../Container/Config/Company-data/Buisness-unit/CreateBusinessUnit")
);
const EditBusinessUnit = lazy(() =>
  import("../Container/Config/Company-data/Buisness-unit/EditBusinessUnit")
);
const ViewBusinessUnit = lazy(() =>
  import("../Container/Config/Company-data/Buisness-unit/ViewBusinessUnit")
);

const Department = lazy(() =>
  import("../Container/Config/Company-data/Department/Department")
);
const CreateDepartment = lazy(() =>
  import("../Container/Config/Company-data/Department/CreateDepartment")
);
const EditDepartment = lazy(() =>
  import("../Container/Config/Company-data/Department/EditDepartment")
);
const ViewDepartment = lazy(() =>
  import("../Container/Config/Company-data/Department/ViewDepartment")
);

const Designation = lazy(() =>
  import("../Container/Config/Company-data/Designation/Designation")
);
const CreateDesignation = lazy(() =>
  import("../Container/Config/Company-data/Designation/CreateDesignation")
);
const EditDesignation = lazy(() =>
  import("../Container/Config/Company-data/Designation/EditDesignation")
);
const ViewDesignation = lazy(() =>
  import("../Container/Config/Company-data/Designation/ViewDesignation")
);

const Grade = lazy(() =>
  import("../Container/Config/Company-data/Grade/Grade")
);
const CreateGrade = lazy(() =>
  import("../Container/Config/Company-data/Grade/CreateGrade")
);
const EditGrade = lazy(() =>
  import("../Container/Config/Company-data/Grade/EditGrade")
);
const ViewGrade = lazy(() =>
  import("../Container/Config/Company-data/Grade/ViewGrade")
);

const Team = lazy(() =>
  import("../Container/Config/Company-data/Team/Team")
);
const CreateTeam = lazy(() =>
  import("../Container/Config/Company-data/Team/CreateTeam")
);
const EditTeam = lazy(() =>
  import("../Container/Config/Company-data/Team/EditTeam")
);
const ViewTeam = lazy(() =>
  import("../Container/Config/Company-data/Team/ViewTeam")
);

/* ================= CONFIG : TRACK ================= */
const ShiftCreate = lazy(() =>
  import("../Container/Config/Attendance/Shift/ShiftCreate")
);
const ShiftList = lazy(() =>
  import("../Container/Config/Attendance/Shift/ShiftList")
);
const ShiftEdit = lazy(() =>
  import("../Container/Config/Attendance/Shift/ShiftEdit")
);
const ShiftView = lazy(() =>
  import("../Container/Config/Attendance/Shift/ShiftView")
);

const ClockInMethodList = lazy(() =>
  import("../Container/Config/Attendance/ClockinMethod/ClockInMethodList")
);
const ClockInMethodCreate = lazy(() =>
  import("../Container/Config/Attendance/ClockinMethod/ClockInMethodCreate")
);
const ClockInMethodEdit = lazy(() =>
  import("../Container/Config/Attendance/ClockinMethod/ClockInMethodEdit")
);
const ClockInMethodView = lazy(() =>
  import("../Container/Config/Attendance/ClockinMethod/ClockInMethodView")
);

const AttendancePolicyList = lazy(() =>
  import("../Container/Config/Attendance/AttendancePolicy/AttendancePolicyList")
);
const AttendancePolicyCreate = lazy(() =>
  import("../Container/Config/Attendance/AttendancePolicy/AttendancePolicyCreate")
);
const ExtraTimeCreate = lazy(() =>
  import("../Container/Config/Attendance/ExtraTime/ExtraTimeCreate")
);
const ExtraTimeList = lazy(() =>
  import("../Container/Config/Attendance/ExtraTime/ExtraTimeList")
);

const AppRoutes = () => {
  const userRole = localStorage.getItem("role");

  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isCompanyAdmin = userRole === "COMPANY_ADMIN";
  const isEMP = userRole === "EMPLOYEE";
  const isHR = userRole === "HR";
  const isTL = userRole === "TL";

  const isRoleHR_TL_companyAdmin = isHR || isTL || isCompanyAdmin
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<GoogleReCaptchaProvider
          reCaptchaKey="6Ld9Gn0sAAAAAG7i8ua3csu4bvG3B54cl27yOdtf"
          scriptProps={{
            async: true,
            defer: true,
            appendTo: "body", // script sirf jab ye page load hoga tab hi attach hoga
            nonce: undefined,
          }}
        >
          <Login />
        </GoogleReCaptchaProvider>} />
        <Route path="/forget-password" element={<ForgotPassword />} />

        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/set-password" element={<SetPassword />} />

        <Route
          path="/org-setup"
          element={
            <PrivateRouteOrg>
              <AddCompany />
            </PrivateRouteOrg>
          }
        />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="performance" element={<PerformanceDashboard />} />
          <Route path="Companyadmin-dashboard" element={<Admindashboard />} />
          <Route path="superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="employee" element={
            // isEMP ? <Employee /> :
            isRoleHR_TL_companyAdmin ? <EmployeeHrTL /> : <Employee />
            //  <EmployeeHrTL /> 
          } />
          <Route path="employee/add-Employee" element={<AddEmployee />} />
          <Route path="attendance" element={
            //  isEMP ?  <AttendanceEmployee /> : <AttendanceHrTL/>
            // <AttendanceEmployee /> 
            isRoleHR_TL_companyAdmin ? <AttendanceHrTL /> : <AttendanceEmployee />
          } />
          <Route path="attendance-calendar" element={<AttendanceCalendar />} />
          <Route path="leave-management" element={
            //  isEMP ?  <LeavemanagementEmployee /> : <LeaveManagementTLHr/>
            // <LeavemanagementEmployee /> 
            isRoleHR_TL_companyAdmin ? <LeaveManagementTLHr /> : <LeavemanagementEmployee />
          } />
          {/* <Route path="payroll" element={<DashboardPayroll1 />} /> */}
          <Route path="payroll" element={<PayrollDashboard />} />
          <Route path="run-payroll" element={<PayrollOverviewPage />} />
          {/* <Route path="payroll" element={<DashboardPayroll2 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll3 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll4 />} /> */}
          {/* <Route path="payroll" element={<DashboardPayroll5 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll6 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll7 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll8 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll9 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll10 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll11 />} /> */}
          {/* <Route path="payroll" element={<Dashboardpayroll12 />} /> */}
          \        </Route>

        <Route path="/Addingyourself" element={<Addingyourself />} />
        <Route path="/employee-Profile" element={<EmployeeProfile />} />

        {/* ================= CONFIG HRIS ================= */}
        <Route
          path="/config/hris"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="Account-management/Global-defaults" element={<GlobalDefaults />} />
          <Route path="Account-management/Branding-setup" element={<BrandingSetup />} />
          <Route path="Account-management/Incorporation-Details" element={<IncorporationDetails />} />
          <Route path="Account-management/Company-office" element={<CompanyOffices />} />
          <Route path="Account-management/Company-office/create" element={<CompanyOfficeCreate />} />
          <Route path="Account-management/Company-office/edit/:id" element={<CompanyOfficeEdit />} />

          <Route path="Employee-data/employeeId" element={<CreateEmployeeId />} />
          <Route path="Employee-data/probation-list" element={<ProbationList />} />
          <Route path="Employee-data/probation-create" element={<CreateProbation />} />
          <Route path="Employee-data/probation-edit/:id" element={<ProbationEdit />} />
          <Route path="Employee-data/probation-view/:id" element={<ProbationView />} />
          <Route path="Employee-data/exit-reason" element={<ExitReasonList />} />
          <Route path="Employee-data/exit-reason/create" element={<CreateExitReason />} />
          <Route path="Employee-data/common-access" element={<CommonAccess />} />
          <Route path="Employee-data/custom-create" element={<CreateCustomData />} />
          <Route path="Employee-data/custom-list" element={<CustomDataList />} />
          <Route path="Employee-data/approval-workflow" element={<ApprovalWorkflowList />} />
          <Route path="Employee-data/approval-workflow/create" element={<CreateApprovalWorkflow />} />
          <Route path="Employee-data/approval-workflow/edit/:id" element={<EditApprovalWorkflow />} />
          <Route path="Employee-data/exitPolicy-list" element={<ExitPolicyList />} />
          <Route path="Employee-data/exitPolicy/create" element={<ExitPolicyCreate />} />
          <Route path="Employee-data/exitPolicy-edit/:id" element={<EditExitPolicy />} />
          <Route path="Employee-data/exitPolicy-view/:id" element={<ViewExitPolicy />} />
          <Route path="Employee-data/default-privacy-policy" element={<DefaultPrivacyPolicy />} />
          <Route path="Employee-data/default-permission" element={<DefaultPermission />} />

          <Route path="Company_data/buisness-unit-list" element={<BusinessUnit />} />
          <Route path="Company_data/create-buisness-unit" element={<CreateBusinessUnit />} />
          <Route path="Company_data/edit-buisness-unit/:id" element={<EditBusinessUnit />} />
          <Route path="Company_data/view-buisness-unit/:id" element={<ViewBusinessUnit />} />

          <Route path="Company_data/department" element={<Department />} />
          <Route path="Company_data/department/create" element={<CreateDepartment />} />
          <Route path="Company_data/department/edit/:id" element={<EditDepartment />} />
          <Route path="Company_data/department/view/:id" element={<ViewDepartment />} />

          <Route path="Company_data/designation" element={<Designation />} />
          <Route path="Company_data/create-designation" element={<CreateDesignation />} />
          <Route path="Company_data/edit-designation/:id" element={<EditDesignation />} />
          <Route path="Company_data/view-designation/:id" element={<ViewDesignation />} />

          <Route path="Company_data/grade" element={<Grade />} />
          <Route path="Company_data/create-grade" element={<CreateGrade />} />
          <Route path="Company_data/edit-grade/:id" element={<EditGrade />} />
          <Route path="Company_data/view-grade/:id" element={<ViewGrade />} />

          <Route path="Company_data/team" element={<Team />} />
          <Route path="Company_data/create-team" element={<CreateTeam />} />
          <Route path="Company_data/edit-team/:id" element={<EditTeam />} />
          <Route path="Company_data/view-team/:id" element={<ViewTeam />} />
        </Route>

        {/* ================= TRACK ================= */}
        <Route
          path="/config/track"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >
          {/* Attendance ===================================== */}
          <Route path="Attendance/shift/create" element={<ShiftCreate />} />
          <Route path="Attendance/shift/list" element={<ShiftList />} />
          <Route path="Attendance/shift/edit/:id" element={<ShiftEdit />} />
          <Route path="Attendance/shift/view/:id" element={<ShiftView />} />

          <Route path="Attendance/clock-in-method/list" element={<ClockInMethodList />} />
          <Route path="Attendance/clock-in-method/create" element={<ClockInMethodCreate />} />
          <Route path="Attendance/clock-in-method/edit/:id" element={<ClockInMethodEdit />} />
          <Route path="Attendance/clock-in-method/view/:id" element={<ClockInMethodView />} />

          <Route path="Attendance/attendance-policy/list" element={<AttendancePolicyList />} />
          <Route path="Attendance/attendance-policy/create" element={<AttendancePolicyCreate />} />
          <Route path="Attendance/extra-time/create" element={<ExtraTimeCreate />} />
          <Route path="Attendance/extra-time/list" element={<ExtraTimeList />} />
          <Route path="deviceintegration" element={<DeviceIntegration />} />
          <Route
            path="Attendance/attendanceRequest"
            element={<AttendanceRequest />}
          />


          {/* Leave =======================================*/}
          <Route path="leave/Weekly-off/list" element={<WeeklyOffList />} />
          <Route path="leave/Weekly-off/create" element={<WeeklyOffCreate />} />
          <Route path="leave/leave-type" element={<LeaveType />} />

          <Route path="leave/leave-policy/list" element={<LeavePolicyList />} />
          <Route path="leave/leave-policy/create" element={<CreateLeavePolicy />} />

          <Route path="leave/holiday-plan/list" element={<HolidayPlanList />} />
          <Route path="leave/holiday-plan/create" element={<HolidayPlanCreate />} />
          <Route path="leave/leave-cycle" element={<LeaveCycle />} />


        </Route>

        {/*========================== config pay====================================== */}

        <Route
          path="/config/pay"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >

          <Route path="payroll/payroll-method" element={<PayrollMethod />} />
          <Route
            path="payroll/payroll-signature"
            element={<PayrollSignature />}
          />
          <Route path="payroll/salary-cycle" element={<SalaryCycle />} />
          <Route path="payroll/payroll-misc" element={<PayrollMisc />} />
          <Route path="payroll/payroll-component" element={<PayrollComponent />} />

          <Route path="payroll/salary-Structure/create" element={<CreateSalaryStructure />} />
          <Route path="payroll/salary-Structure/list" element={<Listsalarystructure />} />

          <Route path="payroll/payroll-tag" element={<PayrollTagList />} />
          <Route path="payroll/fnc-policy" element={<FNFPolicy />} />
          <Route path="payroll/overtime_payment-Policy" element={<OvertimePaymentPolicy />} />

          {/* {expensse} routes=============================== */}
          <Route path="expensive/expense-cycle" element={<ExpenseCycle />} />|
          <Route path="expensive/currency-conversion" element={<CurrencyConversion />} />
          <Route path="expensive/fuel-configuration" element={<FuelConfiguration />} />
          <Route path="expensive/compensator" element={<Compensator />} />


          <Route path="expensive/expense-policy/list" element={<ExpensePolicy />} />
          <Route path="expensive/create-expense-policy" element={<CreateExpensePolicy />} />
          <Route path="expensive/edit-expense-policy/:id" element={<EditExpensePolicy />} />


        </Route>

        {/* config organise============================== */}
        <Route
          path="/config/organise"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >

          <Route path="authority-signature" element={<AuthoritySignature />} />

          <Route path="template/list" element={<Template />} />
          <Route path="template/create" element={<CreateTemplate />} />
          <Route path="page-layout" element={<PageLayout />} />

        </Route>

        {/* config Resolve============================== */}
        <Route
          path="/config/resolve"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >

          <Route path="checklist/create/automatic" element={<CreateAutomaticChecklist />} />
          <Route path="checklist/create/manual" element={<CreateManualChecklist />} />
          <Route path="checklist/list" element={<Checklist />} />

          <Route path="policy-center/create" element={<CreatePolicy />} />
          <Route path="policy-center/list" element={<PolicyCenter />} />

        </Route>

        {/* config hrOpps============================ */}
        <Route
          path="/config/hrops"
          element={
            <PrivateRoute>
              <MainDashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="hrops-assests/list" element={<AssetsCategory />} />
          <Route path="assets-category/create" element={<AssetsCategoryCreate />} />
        </Route>





      </Routes>
    </Suspense >

  );
};

export default AppRoutes;