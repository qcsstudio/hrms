import React, { useState } from 'react'
import LeaveManagementHr1 from './LeaveManagementHr1'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";   // 👈 yaha


const days = [
  {
    name: "On Leave Today",
    value: 12,
    title: "In your team"
  },
  {
    name: "Upcoming(7 days",
    value: 31,
    title: "Plan Coverage"
  },
  {
    name: "Pending approvals",
    value: 12,
    title: "Need action"
  },
  {
    name: "Avg Approval Time",
    value: "9h",
    title: "SLA indicator"
  },
]
const ApprovalQueue = [
  {
    name: "Neha Mehta • Casual Leave",
    title: "Apr 12 → Apr 13 • 2 days • Reason: Family function • ⚠ 2 team members already off",
    status: ["Approve", "Reject", "Ask Info"]
  },
  {
    name: "Aman Raj • Sick Leave",
    title: "Apr 10 (Half day) • Attachment required",
    status: ["Approve", "Reject", "Ask Info"]
  },
  {
    name: "Priya Singh • WFH",
    title: "Apr 11 • 1 day • Reason: Home maintenance",
    status: ["Approve", "Reject", "Ask Info"]
  },
]


const LeaveManagementTLHr = () => {
  const userRole = localStorage.getItem("role");

  const isSuperAdmin = userRole === "SUPER_ADMIN";
  const isCompanyAdmin = userRole === "COMPANY_ADMIN";
  const isEMP = userRole === "EMPLOYEE";
  const isHR = userRole === "HR";
  const isTL = userRole === "TL";
  const [activeFilter, setActiveFilter] = useState("All Employee")
   const [date, setDate] = useState(null)
    const currentYear = new Date().getFullYear()
  return (
    <>
      <div className='p-5 bg-gray-50 '>

        {/* heading */}
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-[22px]'>Leave Management</h1>
            <p className='text-[14px] text-gray-300'>Apply leaves, manage approvals, configure policies & balances.</p>
          </div>
          <div className='flex gap-[10px]'>
            <button className='text-[#1677FF] border border-[#C4DBFF] font-medium bg-[#EAF2FF] rounded h-[40px] w-[93px]'>Policy</button>
            <button className='bg-[#0575E6] font-medium text-[#E4E9EE] rounded h-[40px] w-[110px]'>Apply Leave</button>
          </div>
        </div>

        <div className="inline-flex w-fit bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2 my-4">
            {['All Employee', 'My Team', 'Me'].map((item) => (
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

        {/* 3333333333333333 */}
        <div >

          <div className='flex w-[100%] gap-[15px] '>
             <div className="relative">
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        dateFormat="MM/yyyy"
                        showMonthYearPicker
                         placeholderText="mm-yyyy"
                        className="border border-[#DEE2E6] h-[40px] w-[230px] rounded p-2 pr-8"
                      />
                      {/* <span className="absolute left-2 top-2.5 text-gray-400">mm-yyyy</span> */}
                      <span className="absolute right-2 top-2.5 text-gray-400">📅</span>
                    </div>
            <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
              <option>This Month</option>
              <option></option>
            </select>
            <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
              <option>Location</option>
              <option></option>
            </select>
            <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
              <option>Status</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[30px] justify-evenly gap-4'>
          {days.map((item, index) => (
            <div key={index} className=' h-[110px] rounded-lg  bg-[white] p-3'>
              <div className='font-medium  text-[17px]'>
                {item.name}
              </div>
              <div className='font-bold text-[23px]'>
                {item.value}
              </div>
              <div className='text-gray-300 text-[14px]'>
                {item.title}
              </div>

            </div>
          ))}
        </div>

        <div className='my-5 bg-white p-5 rounded-lg'>
          <h1 className='font-medium text-[18px]'>Approval Queue</h1>
          <p className='text-gray-300 text-[14px]'>Approve / Reject / Ask for details. Overlap warnings keep staffing safe.</p>

          <div className='mt-[20px] bg-[white]'>
            {ApprovalQueue.map((item, index) => (
              <div key={index} className='mt-[14px] bg-[#F8F9FA] flex justify-between p-3 rounded-lg items-center'>
                <div>
                  <div>
                    {item.name}
                  </div>
                  <div className='text-gray-300 text-[14px] '>
                    {item.title}
                  </div>
                </div>

                <div className='flex gap-[10px]'>
                  {item.status.map((status, i) => (
                    <div key={i} className={`  rounded-md h-[32px] w-[90px] text-center  ${status === "Approve" ? "text-[white] bg-[#0575E6] " :
                      status === "Reject" ? "text-[#B91C1C] bg-[#FDECEC] border border-[#FAC2C2]" :
                        "text-[#344054] border border-[#868E961A] bg-[#E4E9EE4D]"}`}>
                      {status}

                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>


            {/* ================this part is shown only hr========================== */}
            {
              isHR && <LeaveManagementHr1/>
            }
            




      </div>




    </>

  )
}

export default LeaveManagementTLHr
