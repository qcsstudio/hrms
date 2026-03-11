import React, { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  employee,
  action,
  action2,
  create_company, statslogo1, statslogo2, statslogo3, statslogo4
} from '../../allAssetsImport/allAssets'
import { Link } from 'react-router-dom'
import { FaAngleDown, FaPlus } from 'react-icons/fa'
import createAxios from '../../utils/axios.config'
import Statics from './Statics'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SuperAdminDashboard = () => {
  // const token = localStorage.getItem("authToken")
  const token = localStorage.getItem("authToken")


  const [openInviteModal, setOpenInviteModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState("All")
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState("company_asc")

  // popup form
  const [formData, setFormData] = useState({
    email: '',
    trialDuration: '',
    linkExpiryHours: ''
  })

  const [dashboarddata, setDashboarddata] = useState({
    companies: [],
    total: 0,
    thisMonthCompanies:0,
    activeCompanies:0,
    activationRate:0

  })
  const axiosInstance = createAxios(token)

  const companiesData = [
    {
      name: 'Dash Global Private Limited',
      url: 'dashglobal.com.IN',
      status: 'Active',
      statusStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200',
      emp: '126'
    },
    {
      name: 'Shilpa Advisory',
      url: 'shilpa.lk.LK',
      status: 'Paused',
      statusStyle: 'bg-yellow-100 text-yellow-700 border-yellow-200',
      emp: '56'
    },
    {
      name: 'Acme Manufacturing',
      url: 'acmemfg.com.US',
      status: 'Draft',
      statusStyle: 'bg-blue-100 text-blue-700 border-blue-200',
      emp: '---'
    }
  ]
  const statsData = [
    {
      title: (
        <>
          Total<br />Companies
        </>
      ),
      value: dashboarddata.total,
      subtitle: `+${dashboarddata.thisMonthCompanies} this month` ,
      icon: statslogo1,
      bg: 'bg-indigo-100'
    },
    {
      title: (
        <>
          Active<br />Companies
        </>
      ),
      value: dashboarddata.activeCompanies,
      subtitle: `${dashboarddata.activationRate}% activation rate`,
      icon: statslogo2,
      bg: 'bg-indigo-100'
    },
    {
      title: 'Trials',
      value: '5',
      subtitle: 'Expiring in 3 days',
      icon: statslogo3,
      bg: 'bg-indigo-100'
    },
    {
      title: (
        <>
          Monthly<br />Subscription Revenue
        </>
      ),
      value: '23',
      subtitle: '+08 this month',
      icon: statslogo4,
      bg: 'bg-emerald-100'
    }
  ]

  useEffect(() => {
    const fetchdashboarddata = async () => {
      const statusParam =
        activeFilter === "All" ? "" : `status=${activeFilter.toUpperCase()}`;
      const res = await axiosInstance.get(`/auth/super-admin/dashboard${statusParam ? `?${statusParam}` : ""}`, {
        meta: { auth: "ADMIN_AUTH" }
      })
      setDashboarddata({
        companies: res?.data?.data,
        total: res?.data?.total,
        thisMonthCompanies:res?.data?.thisMonthCompanies,
        activeCompanies:res?.data?.activeCompanies,
        activationRate:res?.data?.activationRate
      })
      console.log("superadmin dashboard data:=====", res?.data)

    };
    fetchdashboarddata()
  }, [activeFilter])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  function calculateExpiry(hours) {
    const date = new Date()
    date.setHours(date.getHours() + Number(hours))
    return date.toISOString()
  }

  async function handlesetuplink() {
    try {
      // const token = localStorage.getItem('authToken')

      const payload = {
        email: formData.email,
        trial: Boolean(formData.trialDuration),
        linkExpiry: calculateExpiry(formData.linkExpiryHours)
      }

      await axiosInstance.post('invites/send-setup-link', payload,
        {
          meta: { auth: "ADMIN_AUTH" }
        }
      )
      setOpenInviteModal(false)
      setFormData({ email: '', trialDuration: '', linkExpiryHours: '' })
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const sortedCompanies = useMemo(() => {
    const companies = [...(dashboarddata?.companies || [])]

    const getEmployeeCount = (value) => {
      const count = Number(value)
      return Number.isFinite(count) ? count : 0
    }

    switch (sortBy) {
      case "company_desc":
        return companies.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""))
      case "employees_desc":
        return companies.sort((a, b) => getEmployeeCount(b?.totalEmployees) - getEmployeeCount(a?.totalEmployees))
      case "employees_asc":
        return companies.sort((a, b) => getEmployeeCount(a?.totalEmployees) - getEmployeeCount(b?.totalEmployees))
      case "company_asc":
      default:
        return companies.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""))
    }
  }, [dashboarddata?.companies, sortBy])

   const getStatusStyle = (status) => {
    const normalizedStatus = (status || "").toUpperCase();
    switch (normalizedStatus) {
      case "ACTIVE":
        return "border border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981] px-2 rounded-md";
      case "PAUSED":
        return "border border-[#FFEEAB] bg-[#FFF4C8] text-[#AB653B] px-2 rounded-md";
      case "DRAFT":
        return "border border-[#D6E8FF] bg-[#EFF6FF] text-[#1D4ED8] px-2 rounded-md";
      default:
        return "border border-gray-200 bg-gray-100 text-gray-600 px-2 rounded-md";
    }
  };

  const formatStatusLabel = (status) =>
    (status || "")
      .toLowerCase()
      .split("_")
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  return (
    <div className="w-full p-5 bg-gray-50 card-animate">
      <Statics data={statsData} />

      {/* Companies Header */}
      <div className="mt-10 card-animate relative">
        <div className="scrolldiv sticky top-0 z-[100] bg-white  pb-2 rounded-md">
        <div className="md:flex justify-between items-center p-3 ">
          <div className='space-y-2 mb-3 md:space-y-0 md:mb-0  md:w-2/5'>
            <h1 className="text-xl font-semibold">Companies</h1>
            <p className="text-sm text-gray-400 ">
              Manage all tenants: onboarding, plans, status, and quick actions.
            </p>
          </div>

          <div className="flex gap-3 ">
            <Link
              to="/org-setup"
              className="flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-lg px-6 py-2  shadow-none outline-none focus:outline-none focus:ring-0 active:scale-[0.99]"
            >
              <span className="leading-none">Create Company</span> <img src={create_company} className="w-5 h-5 object-contain" />
            </Link>

            <button
              onClick={() => setOpenInviteModal(true)}
              className="flex items-center gap-2 bg-[#0575E6] border border-[#E4E9EE] rounded-lg px-6 py-2 text-white shadow-none border-none outline-none focus:outline-none focus:ring-0 active:scale-[0.99]"
            >
              <span className="leading-none">Create Invite Link</span> <FaPlus className="text-[14px]" />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between mt-5 px-3">
          <div className="flex bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2">
            {['All', 'Active', 'Paused', 'Draft'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`px-4 py-2 rounded-lg transition-colors border-none shadow-none outline-none focus:outline-none focus:ring-0 ${activeFilter === item
                  ? 'bg-white text-[#212529] border border-[#E5E7EB] shadow-sm'
                  : 'bg-transparent text-[#6B7280]'
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="relative">
            <button
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="border flex items-center gap-2 border-gray-300 rounded-lg px-4 py-2 bg-white w-[110px] h-[40px] text-[#334155] shadow-none outline-none focus:outline-none focus:ring-0 transition-transform duration-200 hover:-translate-y-[1px] hover:shadow-none active:scale-[0.99]"
            >
              Sort <FaAngleDown className={`${isSortOpen ? "rotate-180" : ""} transition-transform`} />
            </button>

            {isSortOpen && (
              <div className="absolute right-0 mt-2 w-[220px] rounded-lg border border-gray-200 bg-white shadow-none z-20 overflow-hidden">
                <button
                  onClick={() => { setSortBy("company_asc"); setIsSortOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors ${sortBy === "company_asc" ? "bg-blue-50 font-medium" : ""}`}
                >
                  Company (A-Z)
                </button>
                <button
                  onClick={() => { setSortBy("company_desc"); setIsSortOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors ${sortBy === "company_desc" ? "bg-blue-50 font-medium" : ""}`}
                >
                  Company (Z-A)
                </button>
                <button
                  onClick={() => { setSortBy("employees_desc"); setIsSortOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors ${sortBy === "employees_desc" ? "bg-blue-50 font-medium" : ""}`}
                >
                  Employees (High-Low)
                </button>
                <button
                  onClick={() => { setSortBy("employees_asc"); setIsSortOpen(false) }}
                  className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors ${sortBy === "employees_asc" ? "bg-blue-50 font-medium" : ""}`}
                >
                  Employees (Low-High)
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table Header */}
        <div className="mt-5 px-3 md-768-table-scroll">
          <div className="border-b-2 border-gray-300 md-768-table-width">
            <ul className="flex justify-between text-gray-400 py-2">
              <li>Company</li>
              <li>Admin</li>
              <li>Status</li>
              <li>Employees</li>
              <li>Action</li>
            </ul>
          </div>
        </div>
</div>
        {/* Rows */}
        {/* {filteredCompanies.map((row, idx) => ( */}
        <div className="list-stagger relative z-10 px-3 md-768-table-scroll">
          <div className="md-768-table-width">
          {sortedCompanies?.map((row, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center rounded-[6px] p-3 my-4 bg-white/90 border border-[#E5E7EB] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)]"
              style={{ "--stagger": idx }}
            >
            <div className="w-1/5">
              <h3 className="text-[15px]">{row.name}</h3>
              <p className="text-[12px] text-[#000000]/35">{row.industryType}</p>
            </div>

            <div className="w-1/5">
              <h3 className="text-[15px]">{row.adminDetails.name || "No Admin Assign"}</h3>
              <p className="text-[12px] text-[#000000]/35">{row.adminDetails.email}</p>
            </div>

            <div className="w-1/5">
              <span
                className={`inline-flex items-center text-[14px] shadow-none ${getStatusStyle(row.status)}`}
              >
                {formatStatusLabel(row.status)}
              </span>
            </div>

            <div className="w-1/5">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 w-fit">
                <img src={employee} />
                <span>{row.totalEmployees}</span>
              </div>
            </div>

            <div className="flex gap-2 table-action-icons">
              <img src={action2} />
              <img src={action} />
            </div>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Invite Modal */}
            {openInviteModal && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50">
          <div className="bg-white w-[520px] rounded-xl p-6">
            <h2 className="text-lg font-semibold">Invite Company Admin</h2>
            <p className="text-sm text-gray-400 mt-1">
              Send a secure setup link so the company can onboard themselves.
            </p>

            <div className="mt-5 space-y-4">
              <div>
                <label className="text-sm font-medium">Admin Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 py-2"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Trial</label>
                <select
                  name="trialDuration"
                  value={formData.trialDuration}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 pr-10 py-2 appearance-none bg-white"
                >
                  <option value="">Choose trial</option>
                  <option value="15days">15 Days</option>
                  <option value="1month">1 Month</option>
                  <option value="2month">2 Month</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Link Expiry</label>
                <select
                  name="linkExpiryHours"
                  value={formData.linkExpiryHours}
                  onChange={handleChange}
                  className="w-full mt-1 border rounded-lg px-3 pr-10 py-2 appearance-none bg-white"
                >
                  {/* <option value="">Choose expiry</option> */}
                  <option value="24">24 Hours</option>
                  <option value="48">48 Hours</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setOpenInviteModal(false)}
                className="px-4 py-2 border rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handlesetuplink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Send Setup Link
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}

export default SuperAdminDashboard



