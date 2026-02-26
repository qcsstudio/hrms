import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./privateRoute";
import PrivateRouteOrg from "./privateRouteOrg";
import MainDashboardLayout from "./mainLayout";
import DeviceIntegration from "../Container/Config/Device-Integration/DeviceIntegration";

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
const EmployeeHr = lazy(() =>
  import("../Container/DashboardPages/Employee/EmployeeHr")
);
const AttendanceEmployee = lazy(() =>
  import("../Container/DashboardPages/Attendance/AttendanceEmployee")
);
const LeavemanagementHr = lazy(() =>
  import("../Container/DashboardPages/LeaveManagement/LeavemanagementEmployee")
);
const DashboardPayroll1 = lazy(() =>
  import("../Container/Payroll/DashboardPayroll1")
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
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>

        <Route path="/login" element={<Login />} />

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
          <Route path="Companyadmin-dashboard" element={<Admindashboard />} />
          <Route path="superadmin-dashboard" element={<SuperAdminDashboard />} />
          <Route path="employee" element={<EmployeeHrTL />} />
          <Route path="employee/add-Employee" element={<EmployeeHr />} />
          <Route path="attendance" element={<AttendanceEmployee />} />
          <Route path="leave-management" element={<LeavemanagementHr />} />
          <Route path="payroll" element={<DashboardPayroll1 />} />
        </Route>

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
        </Route>

      </Routes>
    </Suspense>
    
  );
};

export default AppRoutes;