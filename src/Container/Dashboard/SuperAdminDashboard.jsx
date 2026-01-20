import React from 'react'
import { statslogo1, statslogo2, statslogo3, statslogo4, discardicon, CreateCompanycicon, employee, action, action2 } from '../../allAssetsImport/allAssets'
import { Link } from 'react-router-dom'

const SuperAdminDashboard = () => {
  return (
    <div className='w-full p-5 bg-gray-50'>
      {/* Top Stats */}
      <div className='flex gap-5'>
        {/* Total Companies */}
        <div className='bg-white w-full p-4 rounded-lg'>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Total<br />Companies</h2>
            <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo1} />
            </div>
          </div>
          <h1 className='text-2xl font-bold mt-2'>257</h1>
          <p className='text-sm text-gray-400'>+08 this month</p>
        </div>

        {/* Active Companies */}
        <div className='bg-white w-full p-4 rounded-lg'>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Active<br />Companies</h2>
            <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo2} />
            </div>
          </div>
          <h1 className='text-2xl font-bold mt-2'>89</h1>
          <p className='text-sm text-gray-400'>76% activation rate</p>
        </div>

        {/* Trials */}
        <div className='bg-white w-full p-4 rounded-lg'>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Trials</h2>
            <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo3} />
            </div>
          </div>
          <h1 className='text-2xl font-bold mt-2'>5</h1>
          <p className='text-sm text-gray-400'>Expiring in 3 days</p>
        </div>

        {/* Monthly Revenue */}
        <div className='bg-white w-full p-4 rounded-lg'>
          <div className='flex justify-between'>
            <h2 className='font-semibold'>Monthly<br />Subscription Revenue</h2>
            <div className='bg-emerald-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo4} />
            </div>
          </div>
          <h1 className='text-2xl font-bold mt-2'>23</h1>
          <p className='text-sm text-gray-400'>+08 this month</p>
        </div>
      </div>

      {/* Companies Section */}
      <div className='mt-10'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='text-xl font-semibold'>Companies</h1>
            <p className='text-sm text-gray-400'>Manage all tenants: onboarding, plans, status, and quick actions.</p>
          </div>
          <div className='flex gap-3'>
            <Link className='flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-lg px-4 py-2' to='/org-setup'>
              Discard <img src={discardicon} />
            </Link>
            <button className='flex items-center gap-2 bg-blue-600 text-white rounded-lg px-4 py-2'>
              Create Company <img src={CreateCompanycicon} />
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className='flex justify-between mt-5'>
          <div className='flex bg-gray-100 border border-gray-300 rounded-lg'>
            {['All', 'Active', 'Pause', 'Completed', 'Draft'].map((item) => (
              <button key={item} className='px-4 py-2 text-gray-600'>
                {item}
              </button>
            ))}
          </div>
          <button className='border border-gray-300 rounded-lg px-4 py-2 bg-white'>Sort</button>
        </div>

        {/* Table Header */}
        <div className='border-b-2 border-gray-300 mt-5'>
          <ul className='flex justify-between text-gray-400 py-2'>
            <li>Company</li>
            <li>Admin</li>
            <li>Status</li>
            <li>Employees</li>
            <li>Action</li>
          </ul>
        </div>

        {/* Row */}
        {[{ name: 'Dash Global Private Limited', url: 'dashglobal.com.IN', status: 'Active', statusStyle: 'bg-emerald-100 text-emerald-700 border-emerald-200', emp: '126' },
          { name: 'Shilpa Advisory', url: 'shilpa.lk.LK', status: 'Paused', statusStyle: 'bg-yellow-100 text-yellow-700 border-yellow-200', emp: '56' },
          { name: 'Acme Manufacturing', url: 'acmemfg.com.US', status: 'Draft', statusStyle: 'bg-blue-100 text-blue-700 border-blue-200', emp: '---' }
        ].map((row, idx) => (
          <div key={idx} className='flex justify-between items-center border-2 border-gray-300 rounded-2xl p-3 my-4'>
            <div className='w-1/5'>
              <h3 className='font-semibold'>{row.name}</h3>
              <p className='text-sm text-gray-400'>{row.url}</p>
            </div>
            <div className='w-1/5'>
              <h3 className='font-semibold'>HR Admin</h3>
              <p className='text-sm text-gray-400'>hr@dashglobal.com</p>
            </div>
            <div className='w-1/5'>
              <button className={`px-3 py-1 rounded-lg border ${row.statusStyle}`}>{row.status}</button>
            </div>
            <div className='w-1/5'>
              <div className='flex items-center justify-center gap-2 bg-gray-100 rounded-lg px-3 py-1 w-fit'>
                <span>{row.emp}</span>
                <img src={employee} />
              </div>
            </div>
            <div className='flex gap-2'>
              <img src={action2} />
              <img src={action} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SuperAdminDashboard