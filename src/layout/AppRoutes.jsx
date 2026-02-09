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
import LeaveManagementHr from '../Container/DashboardPages/LeaveManagement/LeaveManagementHr'
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

          <Route path="leave-management" element={<LeaveManagementHr />} />

          <Route path="payroll" element={<DashboardPayroll1 />} />
        </Route>
          <Route path="/Addingyourself" element={<Addingyourself />} />
          <Route path="/employee-Profile" element={<EmployeeProfile />} />

        
      </Routes>

    </>
  )
}

export default AppRoutes;