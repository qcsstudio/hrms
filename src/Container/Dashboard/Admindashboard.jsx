import React, { useState } from 'react'
import { Add_employees, Post_job, Approve_leave, Run_payroll, Announcement, Run_reports } from '../../allAssetsImport/allAssets'
import { statslogo1, statslogo2, statslogo3, statslogo4, TotalPayroll, Processingstatus, paydate, kayecimage } from '../../allAssetsImport/allAssets'
import { useDispatch, useSelector } from 'react-redux'
import createAxios from '../../utils/axios.config'
import { setAddLoginData } from '../../Redux/userSlice'

const Admindashboard = () => {
  const { istemporyPassword, user } = useSelector(state => state.user)
  const [changepassword, setChangepassword] = useState({
    oldPassword: "",
    newPassword: ""
  })

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const dispatch = useDispatch()
  const axiosInstance = createAxios()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangepassword({ ...changepassword, [name]: value })
  }
  const handlechangepassSubmit = async () => {
    const payload = {
      oldPassword: changepassword.oldPassword,
      newPassword: changepassword.newPassword,
      userId: user.id
    }
    try {
      const res = await axiosInstance.post('/users/change-password', payload, {
        meta: { auth: "TENANT_ONLY" }
      })
      console.log("after login change password response========", res.data)
      dispatch(setAddLoginData(res.data))

    } catch (error) {
      console.warn("api is not working", error)
    }
  }
  return (
    <div className='p-5'>
      {/* popup================================== */}
      {!istemporyPassword && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          {/* Popup Box */}
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">

            {/* Old Password */}
            <div className="relative mb-4 border border-gray-300 rounded-xl px-4 py-3 flex items-center">
              <input
                name="oldPassword"
                placeholder="Enter old password"
                type={showOldPassword ? "text" : "password"}
                value={changepassword.oldPassword}
                onChange={handleChange}
                className="flex-1 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowOldPassword(prev => !prev)}
                className="text-gray-500"
              >
                👁
              </button>
            </div>

            {/* New Password */}
            <div className="relative mb-6 border border-gray-300 rounded-xl px-4 py-3 flex items-center">
              <input
                name="newPassword"
                placeholder="Enter new password"
                type={showNewPassword ? "text" : "password"}
                value={changepassword.newPassword}
                onChange={handleChange}
                className="flex-1 outline-none"
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(prev => !prev)}
                className="text-gray-500"
              >
                👁
              </button>
            </div>

            {/* Save Button */}
            <button
              onClick={handlechangepassSubmit}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700"
            >
              Save
            </button>

          </div>
        </div>
      )}


      {/* Top Action Buttons */}
      <div className='flex  justify-between gap-4'>
        {[
          { img: Add_employees, title: 'Add Employees', desc: 'Create new employee profile' },
          { img: Post_job, title: 'Post Job', desc: 'Create new job posting' },
          { img: Approve_leave, title: 'Approve Leave', desc: 'Review leave requests' },
          { img: Run_payroll, title: 'Run Payroll', desc: 'Process employee salaries' },
          { img: Announcement, title: 'Announcement', desc: 'Share latest updates' },
          { img: Run_reports, title: 'Run Reports', desc: 'Generate HR reports' }
        ].map((item, idx) => (
          <button key={idx} className='flex items-center bg-white gap-3 p-3 rounded-lg shadow-sm'>
            <div className='w-12 h-12 flex items-center justify-center'>
              <img src={item.img} alt={item.title} />
            </div>
            <div className='text-left'>
              <h1 className='text-sm font-semibold'>{item.title}</h1>
              <p className='text-xs text-black'>{item.desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Stats Section */}
      <div className='flex  gap-5 mt-8'>
        {/* Total Employees */}
        <div className='bg-white w-full md:w-1/4 p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Total<br />Employees</h2>
            <div className='bg-blue-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo1} alt='' />
            </div>
          </div>
          <div className='mt-2'>
            <h1 className='text-2xl font-bold'>257</h1>
            <p className='text-xs'>+08 this month</p>
          </div>
        </div>

        {/* Leave Requests */}
        <div className='bg-white w-full md:w-1/4 p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Leave<br />Requests</h2>
            <div className='bg-green-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo2} alt='' />
            </div>
          </div>
          <div className='mt-2'>
            <h1 className='text-2xl font-bold'>8</h1>
            <p className='text-xs'>Pending approval</p>
          </div>
        </div>

        {/* Interview */}
        <div className='bg-white w-full md:w-1/4 p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>Interview</h2>
            <div className='bg-purple-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo3} alt='' />
            </div>
          </div>
          <div className='mt-2'>
            <h1 className='text-2xl font-bold'>5</h1>
            <p className='text-xs'>Schedule this week</p>
          </div>
        </div>

        {/* New Applications */}
        <div className='bg-white w-full md:w-1/4 p-4 rounded-lg shadow'>
          <div className='flex justify-between items-center'>
            <h2 className='text-lg font-semibold'>New<br />Applications</h2>
            <div className='bg-teal-100 w-12 h-12 flex items-center justify-center rounded'>
              <img src={statslogo4} alt='' />
            </div>
          </div>
          <div className='mt-2'>
            <h1 className='text-2xl font-bold'>23</h1>
            <p className='text-xs'>+08 this month</p>
          </div>
        </div>
      </div>

      {/* Leave Requests List & Graph */}
      <div className='flex flex-col md:flex-row gap-5 mt-8'>
        <div className='md:w-1/2 bg-gray-100 h-64 flex items-center justify-center'>Graph</div>
        <div className='md:w-1/2 space-y-4'>
          <h1 className='text-lg font-semibold'>Leave requests</h1>

          {[
            { name: 'Sarah Johnson', date: 'Apr 28 - May 5, 2025' },
            { name: 'Michael Chen', date: 'Apr 26 - May 5, 2025' },
            { name: 'Jessica Williams', date: 'Apr 28 - May 5, 2025' }
          ].map((req, idx) => (
            <div key={idx} className='flex justify-between items-center bg-gray-100 p-3 rounded-lg'>
              <div>
                <h2 className='font-semibold'>{req.name}</h2>
                <p className='text-xs'>{req.date}</p>
              </div>
              <div className='flex gap-2'>
                <button className='bg-green-500 text-white px-2 py-1 rounded'>Annual leave</button>
                <button className='bg-green-100 text-green-500 px-2 py-1 rounded'>Approve</button>
                <button className='bg-red-500 text-white px-2 py-1 rounded'>Reject</button>
              </div>
            </div>
          ))}
          <button className='w-full border border-blue-700 bg-blue-100 text-blue-700 py-2 rounded-lg'>View All Requests</button>
        </div>
      </div>

      {/* Upcoming Events & Department Overview */}
      <div className='flex flex-col md:flex-row gap-5 mt-8'>
        {/* Upcoming Events */}
        <div className='md:w-1/3 space-y-3'>
          <h1 className='text-lg font-semibold'>Upcoming events</h1>
          {[
            { title: 'Team Building Workshop', date: 'Apr 26, 2025 • 10:00 AM' },
            { title: 'Quarterly Performance Review', date: 'Apr 30, 2025 • 09:00 AM' },
            { title: 'New Employee Orientation', date: 'May 2, 2025 • 11:00 AM' },
            { title: 'HR Policy Training', date: 'May 5, 2025 • 02:00 PM' }
          ].map((event, idx) => (
            <div key={idx} className='bg-gray-100 p-3 rounded-lg'>
              <h1 className='font-semibold'>{event.title}</h1>
              <p className='text-xs'>{event.date}</p>
            </div>
          ))}
        </div>

        {/* Department Overview */}
        <div className='md:w-2/3'>
          <div className='flex justify-end'>
            <h3 className='text-lg font-semibold'>Department Overview</h3>
          </div>
          <div className='flex justify-between mt-3 gap-3'>
            {[
              { img: TotalPayroll, title: 'Total Payroll', value: '247,580' },
              { img: Processingstatus, title: 'Processing Status', value: '85%' },
              { img: paydate, title: 'Pay Date', value: 'Apr 30,2025' }
            ].map((item, idx) => (
              <div key={idx} className='bg-gray-100 text-center w-1/3 p-4 rounded-lg'>
                <img src={item.img} className='mx-auto mb-2 rounded-full p-2 bg-gray-200' />
                <h3 className='font-semibold'>{item.title}</h3>
                <h1 className='text-xl font-bold'>{item.value}</h1>
              </div>
            ))}
          </div>
          <div className='flex justify-evenly mt-3 gap-3'>
            <button className='w-1/2 bg-blue-700 text-white py-2 rounded-lg'>Download Report</button>
            <button className='w-1/2 bg-blue-100 text-blue-700 py-2 rounded-lg'>View Details</button>
          </div>
        </div>
      </div>

      {/* Employee Performance Metrics */}
      <div className='flex flex-col md:flex-row gap-5 mt-8'>
        <div className='md:w-2/3 space-y-4'>
          <h2 className='text-lg font-semibold'>Employee Performance Metrics</h2>
          <div className='flex justify-between gap-3'>
            {[
              { title: 'Average Performance Score', value: '86%', desc: '4% from last quarter' },
              { title: 'Goal Completion Rate', value: '78%', desc: '2% from last quarter' },
              { title: 'Pending Reviewal', value: '12', desc: 'Due by May 15, 2025' }
            ].map((metric, idx) => (
              <div key={idx} className='bg-gray-100 border-l-4 border-blue-700 p-3 rounded-lg w-1/3'>
                <h3 className='font-semibold'>{metric.title}</h3>
                <h1 className='text-xl font-bold'>{metric.value}</h1>
                <p className='text-xs'>{metric.desc}</p>
              </div>
            ))}
          </div>

          {/* Top Employees */}
          <div>
            <h1 className='font-semibold'>Employee Performance Metrics</h1>
            <div className='flex justify-between mt-2'>
              {[...Array(4)].map((_, idx) => (
                <div key={idx} className='flex items-center gap-2'>
                  <img src={kayecimage} className='w-12 h-12 rounded-full' />
                  <p className='text-sm'>Name<br />Performance %</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='md:w-1/3 border border-red-500 flex items-center justify-center'>hello</div>
      </div>
    </div >
  )
}

export default Admindashboard
