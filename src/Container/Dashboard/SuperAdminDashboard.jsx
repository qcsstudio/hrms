import React, { useEffect, useState } from 'react'
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
  const { token } = useSelector((state) => state.user)


  const [openInviteModal, setOpenInviteModal] = useState(false)
  const [activeFilter, setActiveFilter] = useState("")

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

  return (
    <div className="w-full p-5 bg-gray-50">
      <Statics data={statsData} />

      {/* Companies Header */}
      <div className="mt-10">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Companies</h1>
            <p className="text-sm text-gray-400">
              Manage all tenants: onboarding, plans, status, and quick actions.
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              to="/org-setup"
              className="flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-lg px-4 py-2"
            >
              Create Company <img src={create_company} />
            </Link>

            <button
              onClick={() => setOpenInviteModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2"
            >
              Create Invite Link <FaPlus />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between mt-5">
          <div className="flex bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2">
            {['All', 'Active', 'Paused', 'Completed', 'Draft'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveFilter(item)}
                className={`px-4 py-2 text-[#212529] ${activeFilter === item
                  ? ' bg-white rounded-lg'
                  : ''
                  }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button className="border flex items-center gap-2 border-gray-300 rounded-lg px-4 py-2 bg-white w-[81px] h-[40px] text-[#3344054]">
            Sort <FaAngleDown />

          </button>
        </div>

        {/* Table Header */}
        <div className="border-b-2 border-gray-300 mt-5">
          <ul className="flex justify-between text-gray-400 py-2">
            <li>Company</li>
            <li>Admin</li>
            <li>Status</li>
            <li>Employees</li>
            <li>Action</li>
          </ul>
        </div>

        {/* Rows */}
        {/* {filteredCompanies.map((row, idx) => ( */}
        {dashboarddata?.companies?.map((row, idx) => (
          <div
            key={idx}
            className="flex justify-between items-center border-2 border-gray-300 rounded-2xl p-3 my-4"
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
              <button
                className={`px-3 py-1 rounded-lg border ${row.statusStyle}`}
              >
                {row.status}
              </button>
            </div>

            <div className="w-1/5">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1 w-fit">
                <img src={employee} />
                <span>{row.totalEmployees}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <img src={action2} />
              <img src={action} />
            </div>
          </div>
        ))}
      </div>

      {/* Invite Modal */}
      {openInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
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
                  className="w-full mt-1 border rounded-lg px-3 py-2"
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
                  className="w-full mt-1 border rounded-lg px-3 py-2"
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
        </div>
      )}
    </div>
  )
}

export default SuperAdminDashboard
