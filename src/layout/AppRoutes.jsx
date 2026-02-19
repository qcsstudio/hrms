import React from 'react'
import Login from '../Components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from '../Container/Dashboard/SuperAdminDashboard'
// import Dashboardemployee from '../Employee'
// import EmployeeDashboard1 from '../Container/DashboardPages/Employee/DashboardEmployeeHr'
import AddCompany from '../Components/Adding-Company/AddCompany'
import MainDashboardLayout from './mainLayout'
// import Admindashboard from '../Container/Dashboard/Admindashboard'
// import DashboardAttandance from '../DashboardAttandanceEmployee'
// import LeaveManagementHr from '../LeaveManagementHr'
// import DashboardPayroll1 from '../DashboardPayroll1'
// import DashboardAttandanceEmployee from '../DashboardAttandanceEmployee'
import DashboardPayroll1 from '../Container/Payroll/DashboardPayroll1'
import PrivateRoute from './privateRoute'
import Employee from '../Container/DashboardPages/Employee/Employee'
import EmployeeHrTL from '../Container/DashboardPages/Employee/EmployeeHrTL'
import EmployeeHr from '../Container/DashboardPages/Employee/EmployeeHr'
import AttendanceEmployee from '../Container/DashboardPages/Attendance/AttendanceEmployee'
import DashboardAttandance2 from '../Container/DashboardPages/Attendance/AttendanceHrTL'
import AttendanceHrTL from '../Container/DashboardPages/Attendance/AttendanceHrTL'
import Admindashboard from '../Container/Dashboard/Admindashboard'
import PrivateRouteOrg from './privateRouteOrg'
import Addingyourself from '../Container/DashboardPages/Employee/AddingYourself/Addingyourself'
// import PersonalProfile from '../Container/DashboardPages/Employee/AddingYourself/PersonalProfile'
import EmployeeProfile from '../Container/DashboardPages/Employee/AddingYourself/EmployeeProfile'
import LeavemanagementHr from '../Container/DashboardPages/LeaveManagement/LeavemanagementEmployee'
import LeaveManagement2 from '../Container/DashboardPages/LeaveManagement/LeaveManagementTLHr'
import LeaveManagementTLHr from '../Container/DashboardPages/LeaveManagement/LeaveManagementTLHr'
import LeaveManagementHr1 from '../Container/DashboardPages/LeaveManagement/LeaveManagementHr1'
import GlobalDefaults from '../Container/Config/Account-Management/GlobalDefault'
import BrandingSetup from '../Container/Config/Account-Management/BrandingSetup'
import CompanyOffices from '../Container/Config/Account-Management/Company/CompanyOffices'
import CompanyOfficeCreate from '../Container/Config/Account-Management/Company/CompanyOfficeCreate'
import CompanyOfficeEdit from '../Container/Config/Account-Management/Company/CompanyOfficeEdit'
import IncorporationDetails from '../Container/Config/Account-Management/IncorporationDetails'
import CreateEmployeeId from '../Container/Config/Employee-data/CreateEmployeeId'
import ProbationList from '../Container/Config/Employee-data/Probation/ProbationList'
import CreateProbation from '../Container/Config/Employee-data/Probation/CreateProbation'
import ProbationEdit from '../Container/Config/Employee-data/Probation/ProbationEdit'
import ProbationView from '../Container/Config/Employee-data/Probation/ProbationView'
import ExitReasonList from '../Container/Config/Employee-data/Exitreason/ExitReason'
import CreateExitReason from '../Container/Config/Employee-data/Exitreason/CreateExitReason'
import CommonAccess from '../Container/Config/Employee-data/CommonAccess'
import CreateCustomData from '../Container/Config/Employee-data/custom/CreateCustomData'
import CustomDataList from '../Container/Config/Employee-data/custom/CustomDataList'
import ApprovalWorkflowList from '../Container/Config/Employee-data/Approvalworkflow/ApprovalWorkflow'
import CreateApprovalWorkflow from '../Container/Config/Employee-data/Approvalworkflow/CreateApprovalworkflow'
import EditApprovalWorkflow from '../Container/Config/Employee-data/Approvalworkflow/EditApprovalWorkflow'
import ExitPolicyList from '../Container/Config/Employee-data/ExitPolicy/ExitPolicyList'
import ExitPolicyCreate from '../Container/Config/Employee-data/ExitPolicy/ExitPolicyCreate'
import EditExitPolicy from '../Container/Config/Employee-data/ExitPolicy/EditExitPolicy'
import ViewExitPolicy from '../Container/Config/Employee-data/ExitPolicy/ViewExitPolicy'
import DefaultPrivacyPolicy from '../Container/Config/Employee-data/DefaultPrivacyPolicy'
import DefaultPermission from '../Container/Config/Employee-data/DefaultPermission'
import BusinessUnit from '../Container/Config/Company-data/Buisness-unit/BusinessUnit'
import CreateBusinessUnit from '../Container/Config/Company-data/Buisness-unit/CreateBusinessUnit'
import EditBusinessUnit from '../Container/Config/Company-data/Buisness-unit/EditBusinessUnit'
import ViewBusinessUnit from '../Container/Config/Company-data/Buisness-unit/ViewBusinessUnit'
import Department from '../Container/Config/Company-data/Department/Department'
import CreateDepartment from '../Container/Config/Company-data/Department/CreateDepartment'
import EditDepartment from '../Container/Config/Company-data/Department/EditDepartment'
import ViewDepartment from '../Container/Config/Company-data/Department/ViewDepartment'
import Designation from '../Container/Config/Company-data/Designation/Designation'
import CreateDesignation from '../Container/Config/Company-data/Designation/CreateDesignation'
import EditDesignation from '../Container/Config/Company-data/Designation/EditDesignation'
import ViewDesignation from '../Container/Config/Company-data/Designation/ViewDesignation'
import Grade from '../Container/Config/Company-data/Grade/Grade'
import CreateGrade from '../Container/Config/Company-data/Grade/CreateGrade'
import EditGrade from '../Container/Config/Company-data/Grade/EditGrade'
import ViewGrade from '../Container/Config/Company-data/Grade/ViewGrade'
import Team from '../Container/Config/Company-data/Team/Team'
import CreateTeam from '../Container/Config/Company-data/Team/CreateTeam'
import EditTeam from '../Container/Config/Company-data/Team/EditTeam'
import ViewTeam from '../Container/Config/Company-data/Team/ViewTeam'
import ShiftCreate from '../Container/Config/Attendance/Shift/ShiftCreate'
import ShiftList from '../Container/Config/Attendance/Shift/ShiftList'
import ShiftEdit from '../Container/Config/Attendance/Shift/ShiftEdit'
import ShiftView from '../Container/Config/Attendance/Shift/ShiftView'
import ClockInMethodList from '../Container/Config/Attendance/ClockinMethod/ClockInMethodList'
import ClockInMethodCreate from '../Container/Config/Attendance/ClockinMethod/ClockInMethodCreate'
import ClockInMethodEdit from '../Container/Config/Attendance/ClockinMethod/ClockInMethodEdit'
import ClockInMethodView from '../Container/Config/Attendance/ClockinMethod/ClockInMethodView'
import AttendancePolicyList from '../Container/Config/Attendance/AttendancePolicy/AttendancePolicyList'
import AttendancePolicyCreate from '../Container/Config/Attendance/AttendancePolicy/AttendancePolicyCreate'
import ExtraTimeCreate from '../Container/Config/Attendance/ExtraTime/ExtraTimeCreate'
import ExtraTimeList from '../Container/Config/Attendance/ExtraTime/ExtraTimeList'


const AppRoutes = () => {


  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/org-setup" element={
          <PrivateRouteOrg >
            <AddCompany />
          </PrivateRouteOrg>
        } />
        <Route path="/dashboard" element={
          <PrivateRoute >
            <MainDashboardLayout />
          </PrivateRoute>
        }>
          <Route path="Companyadmin-dashboard" element={<Admindashboard />} />
          <Route path="superadmin-dashboard" element={<SuperAdminDashboard />} />

          <Route path="employee" element={<EmployeeHrTL />} />
          <Route path="employee/add-Employee" element={<EmployeeHr />} />
          {/* <Route path="employee" element={<Employee />} /> */}
          {/* <Route path="employee" element={<EmployeeHr />} /> */}

          <Route path="attendance" element={<AttendanceEmployee />} />
          {/* <Route path="attendance" element={<AttendanceHrTL />} /> */}

          <Route path="leave-management" element={<LeavemanagementHr />} />
          {/* <Route path="leave-management" element={<LeaveManagementTLHr />} /> */}
          {/* <Route path="leave-management" element={<LeaveManagementHr1 />} /> */}

          <Route path="payroll" element={<DashboardPayroll1 />} />
        </Route>
        <Route path="/Addingyourself" element={<Addingyourself />} />
        <Route path="/employee-Profile" element={<EmployeeProfile />} />

        {/* ================config=============== */}
        <Route path="/config/hris"
          element={
            <PrivateRoute >
              <MainDashboardLayout />
            </PrivateRoute>
          }>

          {/*========================== Account Management ===================================*/}
          <Route path="Account-management/Global-defaults" element={<GlobalDefaults />} />
          <Route path="Account-management/Branding-setup" element={<BrandingSetup />} />
          <Route path="Account-management/Incorporation-Details" element={<IncorporationDetails />} />
          <Route path="Account-management/Company-office" element={<CompanyOffices />} />

          <Route path="Account-management/Company-office/create" element={<CompanyOfficeCreate />} />
          <Route path="Account-management/Company-office/edit/:id" element={<CompanyOfficeEdit />} />

          {/* ========================Employee Data=========================== */}
          <Route path="Employee-data/employeeId" element={<CreateEmployeeId />} />
          <Route path="Employee-data/probation-list" element={<ProbationList />} />
          <Route path="Employee-data/probation-create" element={<CreateProbation />} />
          <Route path="Employee-data/probation-edit/:id" element={<ProbationEdit />} />
          <Route path="Employee-data/probation-view/:id" element={<ProbationView />} />

          {/* <Route path="Employee-data/set-permission" element={<SetPermissions />} />   //page nahi hai */}

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

          {/* company data=========================== */}
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

        {/* track===================== */}
        <Route path="/config/track"
          element={
            <PrivateRoute >
              <MainDashboardLayout />
            </PrivateRoute>
          }>

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
        </Route>



      </Routes>

    </>
  )
}

export default AppRoutes;