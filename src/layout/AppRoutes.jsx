import React from 'react'
import Login from '../Components/Auth/Login'
import { Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from '../Container/Dashboard/SuperAdminDashboard'
import Dashboardemployee from '../Employee'
import EmployeeDashboard1 from '../EmployeeDashboard1'
import AddCompany from '../Container/AddCompany'

const AppRoutes = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/employee-dashboard" element={<Dashboardemployee />} />
        <Route path="/dashboard-employee" element={<EmployeeDashboard1 />} />
        <Route path="/add-company" element={<AddCompany />} />
    </Routes>
    
    </>
  )
}

export default AppRoutes