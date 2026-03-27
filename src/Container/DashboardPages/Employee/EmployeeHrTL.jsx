import React, { useEffect, useRef, useState } from 'react'
import {
  discardicon,
  statslogo1,
  statslogo2,
  statslogo3,
  statslogo4,
  action,
  action2
} from '../../../allAssetsImport/allAssets'
import Statics from '../../Dashboard/Statics'
import { useNavigate } from 'react-router-dom'
import { FaAngleDown } from 'react-icons/fa'
import createAxios from '../../../utils/axios.config'

const formatJoiningDate = (value) => {
  if (!value) return "----"

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return "----"

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })
}

const mapDashboardStats = (data) => {
  const employees = Array.isArray(data?.employees) ? data.employees : []
  const notMarkedCount = employees.filter(
    (item) => (item?.attendanceStatus || "").toUpperCase() === "NOT_MARKED"
  ).length

  return [
    {
      title: "Team Size",
      value: String(data?.teamSize ?? 0),
      icon: statslogo1,
      bg: 'bg-indigo-100',
      range: "Stable",
      rangeStyle: "text-[#10B981] border border-[#C5F5D5] bg-[#E9FFEF]"
    },
    {
      title: "Present Today",
      value: String(data?.presentToday ?? 0),
      range: `${notMarkedCount} Not Marked`,
      rangeStyle: "text-[#F59E0B] border border-[#FDE2AD] bg-[#FFF3D6]",
      icon: statslogo2,
      bg: 'bg-indigo-100'
    },
    {
      title: "Pending Approvals",
      value: String(data?.pendingApprovals ?? 0),
      range: "Need Action",
      rangeStyle: "text-[#B91C1C] border border-[#FAC2C2] bg-[#FDECEC]",
      icon: statslogo3,
      bg: 'bg-indigo-100'
    },
    {
      title: "Onboarding Task",
      value: String(employees.length),
      icon: statslogo4,
      bg: 'bg-emerald-100',
      range: "Employees Listed",
      rangeStyle: "text-[#334155] border border-[#D2D8E0] bg-[#F2F4F6]"
    }
  ]
}

const mapEmployees = (employees = []) =>
  employees.map((item) => ({
    id: item?._id,
    name: item?.fullName || "--",
    email: item?.workEmail || "--",
    department: item?.departmentName || item?.department || "--",
    Role: item?.systemRole || "--",
    Status: item?.status || "--",
    joining: formatJoiningDate(item?.dateOfJoining),
    actionicon: action,
    actionicon1: action2
  }))

const FilterDropdown = ({ label, value, options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const selectedLabel = value || label
  const menuItems = [label, ...options.filter((opt) => opt !== value)]

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])

  return (
    <div ref={dropdownRef} className='relative w-[210px]'>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full h-[40px] border border-[#DEE2E6] rounded-lg bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 flex items-center justify-between'
      >
        <span>{value || label}</span>
        <FaAngleDown className={`text-[12px] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute left-0 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-none z-20 overflow-hidden'>
          <div className='w-full text-left px-4 py-2 text-sm text-[#111827] font-medium bg-blue-50'>
            {selectedLabel}
          </div>

          {menuItems.map((item, idx) => (
            <div
              key={idx}
              role='button'
              tabIndex={0}
              onClick={() => {
                onSelect(item === label ? "" : item)
                setIsOpen(false)
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  onSelect(item === label ? "" : item)
                  setIsOpen(false)
                }
              }}
              className='w-full text-left px-4 py-2 text-sm text-[#111827] font-normal border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors cursor-pointer'
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const getEmployeeStatusStyle = (status) => {
  const normalizedStatus = (status || "").toUpperCase()

  if (normalizedStatus === "ACTIVE") {
    return "border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981]"
  }

  if (normalizedStatus === "PENDING INVITE") {
    return "border-[#FDE2AD] bg-[#FFF3D6] text-[#F59E0B]"
  }

  if (normalizedStatus === "INACTIVE") {
    return "border-[#FAC2C2] bg-[#FDECEC] text-[#B91C1C]"
  }

  return "border-[#D2D8E0] bg-[#F2F4F6] text-[#334155]"
}

/* -------------------- MAIN COMPONENT -------------------- */

const EmployeeHrTL = () => {
  const token = localStorage.getItem('authToken')
  const axiosInstance = createAxios(token)

  /* -------- FILTER STATE -------- */
  const [filters, setFilters] = useState({
    department: "",
    role: "",
    location: "",
    status: ""
  })
  const [activeEmployeeTab, setActiveEmployeeTab] = useState("All Employees")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [statsData, setStatsData] = useState(() => mapDashboardStats({}))
  const [employees, setEmployees] = useState([])
  const addEmployeeRef = useRef(null)

  /* -------- UNIQUE OPTIONS -------- */
  const getUniqueValues = (key) =>
    [...new Set(employees.map(item => item[key]).filter(Boolean).filter((item) => item !== "--"))]

  const departmentOptions = getUniqueValues("department")
  const roleOptions = getUniqueValues("Role")
  const statusOptions = getUniqueValues("Status")
  const locationOptions = ["India", "USA"] // dummy (future ready)

  /* -------- FILTERED EMPLOYEES -------- */
  const filteredEmployees = employees.filter(item =>
    (!filters.department || item.department === filters.department) &&
    (!filters.role || item.Role === filters.role) &&
    (!filters.status || item.Status === filters.status)
  )

  const navigate = useNavigate()

  const handleAddEmployee = (value) => {
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

    setIsAddEmployeeOpen(false)
  }

  useEffect(() => {
    const fetchEmployeeDashboard = async () => {
      try {
        const response = await axiosInstance.get('/employees/dashboard', {
          meta: { auth: "ADMIN_AUTH" }
        })

        const apiData = response?.data?.data || response?.data || {}
        const employeeList = Array.isArray(apiData?.employees) ? apiData.employees : []

        setStatsData(mapDashboardStats(apiData))
        setEmployees(mapEmployees(employeeList))
      } catch (error) {
        console.log(error, "employee dashboard api error")
        setStatsData(mapDashboardStats({}))
        setEmployees([])
      }
    }

    fetchEmployeeDashboard()
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (addEmployeeRef.current && !addEmployeeRef.current.contains(event.target)) {
        setIsAddEmployeeOpen(false)
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)
    return () => document.removeEventListener("mousedown", handleOutsideClick)
  }, [])
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
        <div ref={addEmployeeRef} className='relative w-[198px]'>
          <button
            type='button'
            onClick={() => setIsAddEmployeeOpen((prev) => !prev)}
            className='w-full h-[40px] flex items-center justify-center gap-2 bg-[#0575E6] border border-[#E4E9EE] rounded-lg px-6 py-2 text-white shadow-none outline-none focus:outline-none focus:ring-0 active:scale-[0.99]'
          >
            <span className='leading-none text-sm'>Add Employee</span>
            <FaAngleDown className={`text-[14px] transition-transform ${isAddEmployeeOpen ? 'rotate-180' : ''}`} />
          </button>

          {isAddEmployeeOpen && (
            <div className='absolute right-0 mt-2 w-[240px] rounded-lg border border-gray-200 bg-white shadow-sm z-20 overflow-hidden'>
              <button
                type='button'
                onClick={() => handleAddEmployee("add")}
                className='w-full text-left px-4 py-2 text-sm text-[#334155] border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors'
              >
                Add Employee (Without Link)
              </button>
              <button
                type='button'
                onClick={() => handleAddEmployee("invite")}
                className='w-full text-left px-4 py-2 text-sm text-[#334155] border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors'
              >
                Add Employee Via Invite Link
              </button>
            </div>
          )}
        </div>

      </div>

      {/* ---------------- TABS ---------------- */}
      <div className='my-5 border border-[#DEE2E6] w-fit flex rounded-[9px] p-1 gap-2 bg-[#F4F4F5]'>
        {["All Employees", "My Team", "Me"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveEmployeeTab(tab)}
            className={`px-4 py-2 rounded-lg border-none shadow-none outline-none transition-transform duration-200 focus:outline-none focus:ring-0 hover:-translate-y-[1px] hover:shadow-none active:scale-[0.99] ${activeEmployeeTab === tab
              ? "bg-white text-[#212529] border border-[#E5E7EB] shadow-sm"
              : "bg-transparent text-[#6B7280]"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ---------------- FILTER SECTION ---------------- */}
      <div className='flex justify-between my-4'>
        <div className='flex gap-3'>

          <FilterDropdown
            label="Department"
            value={filters.department}
            options={departmentOptions}
            onSelect={(val) => setFilters({ ...filters, department: val })}
          />

          <FilterDropdown
            label="Role"
            value={filters.role}
            options={roleOptions}
            onSelect={(val) => setFilters({ ...filters, role: val })}
          />

          <FilterDropdown
            label="Location"
            value={filters.location}
            options={locationOptions}
            onSelect={(val) => setFilters({ ...filters, location: val })}
          />

          <FilterDropdown
            label="Status"
            value={filters.status}
            options={statusOptions}
            onSelect={(val) => setFilters({ ...filters, status: val })}
          />

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
      <div className='list-stagger'>
        {filteredEmployees.length === 0 ? (
          <div className='border border-[#E5E7EB] my-4 px-3 h-[64px] flex items-center justify-center rounded-[6px] bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.05)] text-sm text-[#8F97A3]'>
            Record not found
          </div>
        ) : (
          filteredEmployees.map((item, index) => (
            <div
              key={item.id || index}
              className='flex justify-between border border-[#E5E7EB] my-4 px-3 h-[64px] items-center rounded-[6px] bg-white/90 shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)]'
              style={{ "--stagger": index }}
            >
              <div>
                <div>{item.name}</div>
                <div className='text-gray-300 text-[12px] w-[270px]'>{item.email}</div>
              </div>

              <div className='w-[120px]'>{item.department}</div>
              <div>{item.Role}</div>

              <div className={`border px-2 rounded-md ${getEmployeeStatusStyle(item.Status)}`}>
                {item.Status}
              </div>

              <div className='text-[#52525B]'>{item.joining}</div>

              <div className='flex gap-2 table-action-icons'>
                {item.actionicon && <img src={item.actionicon} />}
                {item.actionicon1 && <img src={item.actionicon1} />}
                {item.actionicon2 && <img src={item.actionicon2} />}
                {item.actionicon3 && <img src={item.actionicon3} />}
                {item.actionicon4 && <img src={item.actionicon4} />}
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  )
}

export default EmployeeHrTL
