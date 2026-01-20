import React from 'react'
import Login from '../Components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from '../Container/Dashboard/SuperAdminDashboard'
import Dashboardemployee from '../Employee'
// import EmployeeDashboard1 from '../Container/DashboardPages/Employee/DashboardEmployeeHr'
import AddCompany from '../Components/Adding-Company/AddCompany'
import MainDashboardLayout from './mainLayout'
// import Admindashboard from '../Container/Dashboard/Admindashboard'
// import DashboardAttandance from '../DashboardAttandanceEmployee'
// import LeaveManagementHr from '../LeaveManagementHr'
// import DashboardPayroll1 from '../DashboardPayroll1'
import DashboardEmployeeHr from '../Container/DashboardPages/Employee/DashboardEmployeeHr'
// import DashboardAttandanceEmployee from '../DashboardAttandanceEmployee'
import LeaveManagementHr from '../Container/DashboardPages/LeaveManagement/LeaveManagementHr'
import DashboardPayroll1 from '../Container/Payroll/DashboardPayroll1'
import DashboardAttandanceEmployee from '../Container/DashboardPages/Attendance/DashboardAttandanceEmployee'

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} /> */}
        <Route path="/employee-dashboard" element={<Dashboardemployee />} />
        {/* <Route path="/dashboard-employee" element={<EmployeeDashboard1 />} /> */}
        <Route path="/org-setup" element={<AddCompany />} />
        <Route path="/dashboard" element={<MainDashboardLayout />}>
          {/* <Route path="superadmin-dashboard" element={<Admindashboard />} /> */}
          <Route path="superadmin-dashboard" element={<SuperAdminDashboard />} />

          <Route path="employee" element={<DashboardEmployeeHr />} />
          {/* <Route path="employee" element={<Dashboardemployee />} /> */}
          <Route path="attendance" element={<DashboardAttandanceEmployee />} />
          <Route path="leave-management" element={<LeaveManagementHr/>} />
          <Route path="payroll" element={<DashboardPayroll1 />} />
        </Route>
      </Routes>

    </>
  )
}

export default AppRoutes;