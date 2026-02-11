import React, { useState } from 'react'
import {
  discardicon,
  statslogo1,
  statslogo2,
  statslogo3,
  statslogo4,
  action,
  action2,
  group,
  vector,
  vector2
} from '../../../allAssetsImport/allAssets'
import Statics from '../../Dashboard/Statics'
import { useNavigate } from 'react-router-dom'

/* -------------------- EMPLOYEE DATA -------------------- */

const employee = [
  {
    name: "Aman Raj",
    email: "aman.raj@company.com",
    department: "Engineering",
    Role: "Employee",
    Status: "Active",
    joining: "12 Jun 2025",
    actionicon: action,
    actionicon1: action2
  },
  {
    name: "Pooja Sharma",
    email: "pooja@company.com",
    department: "HR",
    Role: "Manager",
    Status: "Active",
    joining: "03 Feb 2024",
    actionicon: action,
    actionicon1: action2
  },
  {
    name: "Vivek Kumar",
    email: "vivek.kumar@company.com",
    department: "Sales",
    Role: "Team Lead",
    Status: "Pending Invite",
    joining: "----",
    actionicon2: group,
    actionicon3: vector
  },
  {
    name: "Neha Mehta",
    email: "neha.mehta@company.com",
    department: "Operations",
    Role: "Employee",
    Status: "Inactive",
    joining: "19 Aug 2023",
    actionicon4: vector2
  }
]

/* -------------------- STATS DATA -------------------- */

const statsData = [
  {
    title: "Team Size",
    value: '13',
    icon: statslogo1,
    bg: 'bg-indigo-100',
    range: "Stable"
  },
  {
    title: "Present Today",
    value: '10',
    range: "2 Not Marked",
    icon: statslogo2,
    bg: 'bg-indigo-100'
  },
  {
    title: "Pending Approvals",
    value: '4',
    range: "2 Due Today",
    icon: statslogo3,
    bg: 'bg-indigo-100'
  },
  {
    title: "Onboarding Task",
    value: '10',
    icon: statslogo4,
    bg: 'bg-emerald-100',
    range: "In Progress"
  }
]

/* -------------------- MAIN COMPONENT -------------------- */

const EmployeeHrTL = () => {

  /* -------- FILTER STATE -------- */
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    location: "",
    status: ""
  })

  /* -------- UNIQUE OPTIONS -------- */
  const getUniqueValues = (key) =>
    [...new Set(employee.map(item => item[key]).filter(Boolean))]

  const departmentOptions = getUniqueValues("department")
  const roleOptions = getUniqueValues("Role")
  const statusOptions = getUniqueValues("Status")
  const locationOptions = ["India", "USA"] // dummy (future ready)

  /* -------- FILTER CHANGE -------- */
  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  /* -------- FILTERED EMPLOYEES -------- */
  const filteredEmployees = employee.filter(item =>
    (!filters.department || item.department === filters.department) &&
    (!filters.role || item.Role === filters.role) &&
    (!filters.status || item.Status === filters.status)
  )

  const navigate = useNavigate()

  const handleAddEmployee = (e) => {
    const value = e.target.value

    if (value === "add") {
      navigate("/dashboard/employee/add-Employee", {
        state: { invite: false }
      })
    }

    if (value === "invite") {
      navigate("/dashboard/employee/add-Employee", {
        state: { invite: true }
      })
    }
  }
  return (
    <div className='bg-gray-50 p-5'>

      {/* ---------------- HEADER ---------------- */}
      <div className='flex justify-between'>
        <div>
          <h1 className='text-[20px] font-bold text-[#212529]'>Employees</h1>
          <p className='text-[#000000]/35 text-[12px]'>
            Manage employee directory, documents, and role-based actions.
          </p>
        </div>

        {/* <button className="bg-[#0575E6] text-white px-4 py-2 rounded w-[198px] h-[40px] font-semibold text-sm" onClick={()=> navigate('/dashboard/employee/add-Employee')}>
          + Add Employee
        </button> */}
        <select
          defaultValue=""
          onChange={handleAddEmployee}
          className='bg-[#0575E6] text-white px-4 py-2 rounded w-[198px] h-[40px] font-semibold text-sm'
        >
          <option value="" disabled className='bg-white text-black'>
         Add Employee
          </option>

          <option value="add" className='bg-white text-black'>
            Add Employee (Without Link)
          </option>

          <option value="invite" className='bg-white text-black'>
            Add Employee Via Invite Link
          </option>
        </select>

      </div>

      {/* ---------------- TABS ---------------- */}
      <div className='my-5 border border-[#DEE2E6] w-[290px] flex justify-around rounded-md h-[40px] bg-[#F4F4F5]'>
        <button>All Employees</button>
        <button>My Team</button>
        <button>Me</button>
      </div>

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className='flex justify-between my-4'>
        <div className='flex gap-3'>

          <select
            name="department"
            value={filters.department}
            onChange={handleFilterChange}
            className='border border-[#DEE2E6] rounded-md w-[210px] h-[40px] bg-white px-3 text-sm'
          >
            <option value="">Department</option>
            {departmentOptions.map((d, i) => (
              <option key={i} value={d}>{d}</option>
            ))}
          </select>

          <select
            name="role"
            value={filters.role}
            onChange={handleFilterChange}
            className='border border-[#DEE2E6] rounded-md w-[210px] h-[40px] bg-white px-3 text-sm'
          >
            <option value="">Role</option>
            {roleOptions.map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>

          <select
            name="location"
            value={filters.location}
            onChange={handleFilterChange}
            className='border border-[#DEE2E6] rounded-md w-[210px] h-[40px] bg-white px-3 text-sm'
          >
            <option value="">Location</option>
            {locationOptions.map((l, i) => (
              <option key={i} value={l}>{l}</option>
            ))}
          </select>

          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className='border border-[#DEE2E6] rounded-md w-[210px] h-[40px] bg-white px-3 text-sm'
          >
            <option value="">Status</option>
            {statusOptions.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>

        </div>

        <div
          onClick={() => setFilters({ department: "", role: "", location: "", status: "" })}
          className='border border-[#DEE2E6] rounded-md w-[90px] h-[40px] flex items-center justify-evenly cursor-pointer'
        >
          <span className='text-sm'>Clear</span>
          <img className='h-5' src={discardicon} />
        </div>
      </div>

      {/* ---------------- STATS ---------------- */}
      <Statics data={statsData} />

      {/* ---------------- TABLE HEADER ---------------- */}
      <ul className='flex justify-between text-[#8F97A3] m-[15px] p-5 items-center border-b-2 border-[#E3E5E8]'>
        <li className='w-[266px]'>Employee</li>
        <li>Department</li>
        <li>Role</li>
        <li>Status</li>
        <li>Joining</li>
        <li>Action</li>
      </ul>

      {/* ---------------- EMPLOYEE ROWS ---------------- */}
      {filteredEmployees.map((item, index) => (
        <div
          key={index}
          className='flex justify-between border border-[#0000001A] m-[15px] p-5 items-center rounded-md bg-white'
        >
          <div>
            <div>{item.name}</div>
            <div className='text-gray-300 w-[270px]'>{item.email}</div>
          </div>

          <div className='w-[120px]'>{item.department}</div>
          <div>{item.Role}</div>

          <div className='border border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981] px-2 rounded-md'>
            {item.Status}
          </div>

          <div className='text-[#52525B]'>{item.joining}</div>

          <div className='flex gap-2'>
            {item.actionicon && <img src={item.actionicon} />}
            {item.actionicon1 && <img src={item.actionicon1} />}
            {item.actionicon2 && <img src={item.actionicon2} />}
            {item.actionicon3 && <img src={item.actionicon3} />}
            {item.actionicon4 && <img src={item.actionicon4} />}
          </div>
        </div>
      ))}

    </div>
  )
}

export default EmployeeHrTL
