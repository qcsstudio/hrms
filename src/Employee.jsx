import React, { useState } from 'react'
import {
  action,
  action2,
  CreateCompanycicon,
  discardicon,
  employee,
  statslogo1,
  statslogo2,
  statslogo3,
  statslogo4
} from './allAssetsImport/allAssets'

const Dashboardemployee = () => {
  const [filter, setFilter] = useState("All")

  const companies = [
    {
      name: "Dash Global Private Limited",
      website: "dashglobal.com.IN",
      admin: "HR admin",
      email: "hr@dashglobal.com",
      status: "Active",
      employees: 126
    },
    {
      name: "Shilpa Advisory",
      website: "shilpa.lk.LK",
      admin: "Company Admin",
      email: "hr@dashglobal.com",
      status: "Paused",
      employees: 56
    },
    {
      name: "Acme Manufacturing",
      website: "acmemfg.com.US",
      admin: "HR admin",
      email: "",
      status: "Draft",
      employees: null
    }
  ]

  const filteredCompanies =
    filter === "All"
      ? companies
      : companies.filter(c => c.status === filter)

  return (
    <div className="w-full p-5 bg-[#F9FAFB] space-y-8">

      {/* ===== TOP STATS ===== */}
      <div className="flex gap-5 w-full">

        {/* Total Companies */}
        <div className="flex-1 bg-white p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Total<br />Companies</h2>
            <div className="w-[50px] h-[50px] bg-[#F0F3FF] flex items-center justify-center">
              <img src={statslogo1} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2">257</h1>
          <p className="text-gray-400">+08 this month</p>
        </div>

        {/* Active Companies */}
        <div className="flex-1 bg-white p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Active<br />Companies</h2>
            <div className="w-[50px] h-[50px] bg-[#EFEEFC] flex items-center justify-center">
              <img src={statslogo2} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2">89</h1>
          <p className="text-gray-400">76% activation rate</p>
        </div>

        {/* Trials */}
        <div className="flex-1 bg-white p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">Trials</h2>
            <div className="w-[50px] h-[50px] bg-[#EFEEFC] flex items-center justify-center">
              <img src={statslogo3} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2">5</h1>
          <p className="text-gray-400">Expiring in 3 days</p>
        </div>

        {/* Revenue */}
        <div className="flex-1 bg-white p-4">
          <div className="flex justify-between">
            <h2 className="font-semibold">
              Monthly <br /> Subscription Revenue
            </h2>
            <div className="w-[50px] h-[50px] bg-[#E9F9F3] flex items-center justify-center">
              <img src={statslogo4} />
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-2">23</h1>
          <p className="text-gray-400">+08 this month</p>
        </div>

      </div>

      {/* ===== COMPANIES SECTION ===== */}
      <div className="space-y-4">

        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold">Companies</h1>
            <p className="text-gray-300">
              Manage all tenants: onboarding, plans, status, and quick actions.
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 h-10 w-[100px] rounded-lg border bg-[#E4E9EE4D]">
              Discard <img src={discardicon} />
            </button>
            <button className="flex items-center gap-2 h-10 w-[140px] rounded-lg bg-[#0575E6] text-white">
              CreateCompany <img src={CreateCompanycicon} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex justify-between">
          <div className="flex w-[397px] justify-evenly bg-[#F4F4F5] border rounded-lg">
            {["All", "Active", "Paused", "Draft"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="h-10 text-[#495057]"
              >
                {f}
              </button>
            ))}
          </div>

          <button className="h-10 w-[80px] border rounded-lg bg-white">
            Sort
          </button>
        </div>

        {/* Table Header */}
        <div className="border-b flex justify-between text-[#8F97A3] pb-2">
          <span>Company</span>
          <span>Admin</span>
          <span>Status</span>
          <span>Employees</span>
          <span>Action</span>
        </div>

        {/* Rows */}
        {filteredCompanies.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-2 border-gray-300 rounded-2xl p-3"
          >
            <div className="w-[20%]">
              <h3>{item.name}</h3>
              <p>{item.website}</p>
            </div>

            <div className="w-[20%]">
              <h3>{item.admin}</h3>
              <p>{item.email}</p>
            </div>

            <div className="w-[20%]">
              <button className="h-[26px] px-3 rounded-lg border bg-[#ECFDF3] text-[#2B8A3E]">
                {item.status}
              </button>
            </div>

            <div className="w-[18%]">
              <div className="flex items-center gap-2 bg-[#F3F3F4] rounded-lg h-[26px] w-[55px] justify-center">
                <h5>{item.employees ?? "—"}</h5>
                <img src={employee} className="w-5 h-5" />
              </div>
            </div>

            <div className="flex gap-2">
              <img src={action2} className="w-5 h-5" />
              <img src={action} className="w-5 h-5" />
            </div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Dashboardemployee
