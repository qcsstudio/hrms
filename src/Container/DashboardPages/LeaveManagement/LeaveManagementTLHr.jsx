import React, { useEffect, useRef, useState } from 'react'
import LeaveManagementHr1 from './LeaveManagementHr1'
import DatePicker from 'react-datepicker'
import { FaAngleDown, FaRegCalendarAlt } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";

const days = [
  {
    name: "On Leave Today",
    value: 12,
    title: "In your team"
  },
  {
    name: "Upcoming (7 days)",
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
    name: "Neha Mehta - Casual Leave",
    title: "Apr 12 to Apr 13 - 2 days - Reason: Family function - 2 team members already off",
    status: ["Approve", "Reject", "Ask Info"]
  },
  {
    name: "Aman Raj - Sick Leave",
    title: "Apr 10 (Half day) - Attachment required",
    status: ["Approve", "Reject", "Ask Info"]
  },
  {
    name: "Priya Singh - WFH",
    title: "Apr 11 - 1 day - Reason: Home maintenance",
    status: ["Approve", "Reject", "Ask Info"]
  },
]

const DivDropdown = ({ value, options, onSelect, widthClass = "w-[230px]" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

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
    <div ref={dropdownRef} className={`relative ${widthClass}`}>
      <button
        type='button'
        onClick={() => setIsOpen((prev) => !prev)}
        className='w-full h-[40px] border border-[#DEE2E6] rounded-lg bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 flex items-center justify-between'
      >
        <span>{value}</span>
        <FaAngleDown className={`text-[12px] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className='absolute left-0 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-none z-20 overflow-hidden'>
          {options.map((option) => (
            <button
              key={option}
              type='button'
              onClick={() => {
                onSelect(option)
                setIsOpen(false)
              }}
              className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${
                value === option
                  ? 'bg-blue-50 text-[#111827] font-medium'
                  : 'text-[#334155] hover:bg-blue-50 active:bg-blue-100'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

const LeaveManagementTLHr = () => {
  const userRole = localStorage.getItem("role")
  const isHR = userRole === "HR"
  const [activeFilter, setActiveFilter] = useState("All Employee")
  const [date, setDate] = useState(null)
  const [monthFilter, setMonthFilter] = useState("This Month")
  const [locationFilter, setLocationFilter] = useState("Location")
  const [statusFilter, setStatusFilter] = useState("Status")

  return (
    <>
      <div className='p-5 bg-gray-50 card-animate'>

        {/* heading */}
        <div className='flex justify-between items-center gap-4 flex-wrap card-animate'>
          <div>
            <h1 className='font-bold text-[22px]'>Leave Management</h1>
            <p className='text-[14px] text-gray-500'>Apply leaves, manage approvals, configure policies & balances.</p>
          </div>
          <div className='flex gap-3'>
            <button className='flex items-center gap-2 bg-gray-200 border border-gray-300 rounded-lg px-6 py-2 text-[#1677FF] text-[16px] font-medium leading-none shadow-none outline-none focus:outline-none focus:ring-0'>
              Policy
            </button>
            <button className='flex items-center gap-2 bg-[#0575E6] border border-[#E4E9EE] rounded-lg px-6 py-2 text-[#E4E9EE] text-[16px] font-medium leading-none shadow-none outline-none focus:outline-none focus:ring-0'>
              Apply Leave
            </button>
          </div>
        </div>

        <div className="inline-flex w-fit bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2 my-4 card-animate">
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

        {/* filters */}
        <div>
          <div className='flex w-[100%] gap-[15px] flex-wrap card-animate'>
            <div className="relative w-[230px]">
              <DatePicker
                selected={date}
                onChange={(pickedDate) => setDate(pickedDate)}
                dateFormat="MM/yyyy"
                showMonthYearPicker
                placeholderText="mm-yyyy"
                className="border border-[#DEE2E6] h-[40px] w-[230px] rounded-lg px-3 pr-8 text-[14px] font-medium text-[#344054] bg-white outline-none focus:outline-none focus:ring-0 shadow-none"
              />
              <span className="absolute right-2 top-2.5 text-gray-400"><FaRegCalendarAlt /></span>
            </div>

            <DivDropdown
              value={monthFilter}
              options={["This Month", "Last Month", "This Quarter", "This Year"]}
              onSelect={setMonthFilter}
            />

            <DivDropdown
              value={locationFilter}
              options={["Location", "All Locations", "Delhi", "Mumbai", "Remote"]}
              onSelect={setLocationFilter}
            />

            <DivDropdown
              value={statusFilter}
              options={["Status", "Approved", "Rejected", "Pending"]}
              onSelect={setStatusFilter}
            />
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-[30px] justify-evenly gap-4 list-stagger'>
          {days.map((item, index) => (
            <div key={index} className='h-[110px] rounded-lg bg-white p-3 border border-[#E5E7EB] surface-card' style={{ "--stagger": index }}>
              <div className='font-medium text-[17px]'>
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

        <div className='my-5 bg-white p-5 rounded-lg surface-card card-animate'>
          <h1 className='font-medium text-[18px]'>Approval Queue</h1>
          <p className='text-gray-300 text-[14px]'>Approve / Reject / Ask for details. Overlap warnings keep staffing safe.</p>

          <div className='mt-[20px] bg-[white] list-stagger'>
            {ApprovalQueue.map((item, index) => (
              <div key={index} className='mt-[14px] bg-[#F8F9FA] flex justify-between p-3 rounded-lg items-center card-animate' style={{ "--stagger": index }}>
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
                    <button key={i} className={`h-[32px] min-w-[90px] px-3 rounded-md text-center text-[13px] font-medium leading-none shadow-none outline-none focus:outline-none focus:ring-0 ${
                      status === "Approve"
                        ? "text-white bg-[#0575E6] border border-[#E4E9EE]"
                        : status === "Reject"
                          ? "text-[#B91C1C] bg-[#FDECEC] border border-[#FAC2C2]"
                          : "text-[#344054] border border-[#D1D5DB] bg-[#EEF2F6]"
                      }`}>
                      {status}
                    </button>
                  ))}
                </div>

              </div>
            ))}

          </div>
        </div>


        {/* ================this part is shown only hr========================== */}
        {/* {
          isHR && <LeaveManagementHr1 />
        } */}
<LeaveManagementHr1 />
      </div>
    </>
  )
}

export default LeaveManagementTLHr
