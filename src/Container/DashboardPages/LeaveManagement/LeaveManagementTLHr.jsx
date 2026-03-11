import React, { useEffect, useRef, useState } from 'react'
import LeaveManagementHr1 from './LeaveManagementHr1'
import { createPortal } from 'react-dom'
import DatePicker from 'react-datepicker'
import { FaAngleDown, FaRegCalendarAlt } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
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

const quickTemplates = ['Upload DOC', 'Clarify Reason', 'Full/Half-Day', 'Handover Plan', 'Change Dates']
const responseDueOptions = ['4 Hours', '24 Hours', '48 Hours', '3 Days']

const getApprovalSummary = (item, index) => {
  const [employeeName = '', leaveType = ''] = (item?.name || '').split(' - ')
  const titleParts = (item?.title || '').split(' - ')
  const reasonPart = titleParts.find((part) => part.toLowerCase().startsWith('reason:'))
  const hasAttachmentRequirement = (item?.title || '').toLowerCase().includes('attachment required')

  return {
    requestId: `REQ-${1024 + index}`,
    employee: employeeName || '-',
    leaveType: leaveType || '-',
    dates: titleParts[0] || '-',
    duration: titleParts[1] || '-',
    reason: reasonPart ? reasonPart.replace(/reason:/i, '').trim() : '-',
    attachment: hasAttachmentRequirement ? 'Required' : 'Not Required'
  }
}

const DivDropdown = ({ value, options, onSelect, widthClass = "w-[230px]", direction = "down" }) => {
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
        <div className={`${direction === "up" ? "absolute left-0 bottom-full mb-2" : "absolute left-0 mt-2"} w-full rounded-lg border border-gray-200 bg-white shadow-none z-20 overflow-hidden`}>
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
  const [activeFilter, setActiveFilter] = useState("All Employee")
  const [date, setDate] = useState(null)
  const [monthFilter, setMonthFilter] = useState("This Month")
  const [locationFilter, setLocationFilter] = useState("Location")
  const [statusFilter, setStatusFilter] = useState("Status")
  const [showAskInfoDrawer, setShowAskInfoDrawer] = useState(false)
  const [selectedApprovalSummary, setSelectedApprovalSummary] = useState(null)
  const [askInfoForm, setAskInfoForm] = useState({
    details: '',
    responseDue: '24 Hours'
  })

  const handleOpenAskInfo = (requestItem, index) => {
    setSelectedApprovalSummary(getApprovalSummary(requestItem, index))
    setAskInfoForm({
      details: '',
      responseDue: '24 Hours'
    })
    setShowAskInfoDrawer(true)
  }

  const handleTemplateClick = (template) => {
    setAskInfoForm((prev) => ({
      ...prev,
      details: prev.details ? `${prev.details}\n${template}` : template
    }))
  }

  const handleAskInfoSubmit = () => {
    setShowAskInfoDrawer(false)
  }

  useEffect(() => {
    if (!showAskInfoDrawer) {
      return
    }

    const previousBodyOverflow = document.body.style.overflow

    const handleEscClose = (event) => {
      if (event.key === 'Escape') {
        setShowAskInfoDrawer(false)
      }
    }

    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', handleEscClose)

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.removeEventListener('keydown', handleEscClose)
    }
  }, [showAskInfoDrawer])

  return (
    <>
      <div className='p-5 bg-gray-50 card-animate'>
        <style>{`
          @keyframes askInfoSlideIn {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
        `}</style>

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
                    <button
                      key={i}
                      type='button'
                      onClick={() => {
                        if (status === 'Ask Info') {
                          handleOpenAskInfo(item, index)
                        }
                      }}
                      className={`h-[32px] min-w-[90px] px-3 rounded-md text-center text-[13px] font-medium leading-none shadow-none outline-none focus:outline-none focus:ring-0 ${
                      status === "Approve"
                        ? "text-white bg-[#0575E6] border border-[#E4E9EE]"
                        : status === "Reject"
                          ? "text-[#B91C1C] bg-[#FDECEC] border border-[#FAC2C2]"
                          : "text-[#344054] border border-[#D1D5DB] bg-[#EEF2F6]"
                      }`}
                    >
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

      {showAskInfoDrawer &&
        createPortal(
          <div className='fixed inset-0 z-[1300]'>
            <button
              type='button'
              onClick={() => setShowAskInfoDrawer(false)}
              aria-label='Close ask info drawer'
              className='absolute inset-0 border-none bg-black/35'
            />

            <div
              className='absolute right-0 top-0 h-full w-full max-w-[720px] border-l border-[#E5E7EB] bg-[#F8F9FA] shadow-xl flex flex-col overflow-hidden'
              style={{ animation: 'askInfoSlideIn 260ms ease-out' }}
            >
              <div className='sticky top-0 z-20 flex items-start justify-between border-b border-[#E5E7EB] bg-[#F8F9FA] px-5 py-4'>
                <div>
                  <h1 className='text-[22px] font-semibold text-[#111827]'>Ask Info</h1>
                  <p className='mt-1 text-[13px] text-[#667085]'>Request clarification/documents without approving or rejecting.</p>
                </div>

                <button
                  type='button'
                  onClick={() => setShowAskInfoDrawer(false)}
                  className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#D0D5DD] bg-white text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#F9FAFB]'
                >
                  <RxCross2 className='text-[18px]' />
                </button>
              </div>

              <div className='flex-1 overflow-y-auto px-5 py-5 space-y-5'>
              <div className='rounded-xl border border-[#E5E7EB] bg-white p-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <h2 className='text-[16px] font-semibold text-[#344054]'>Request Summary</h2>

                  <div className='flex flex-wrap items-center gap-2'>
                    <span className='inline-flex h-[30px] min-w-[90px] items-center justify-center rounded-md border border-[#D4D8DE] bg-[#F2F4F7] px-3 text-[12px] font-medium text-[#344054]'>
                      {selectedApprovalSummary?.requestId || 'REQ-0000'}
                    </span>
                    <span className='inline-flex h-[30px] min-w-[140px] items-center justify-center rounded-md border border-[#A9C9FF] bg-[#E9F2FF] px-3 text-[12px] font-medium text-[#1677FF]'>
                      Pending Approval
                    </span>
                    <span className='inline-flex h-[30px] min-w-[104px] items-center justify-center rounded-md border border-[#F5B5B5] bg-[#FDECEC] px-3 text-[12px] font-medium text-[#D92D20]'>
                      Overlap Risk
                    </span>
                  </div>
                </div>

                <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-2'>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Employee</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.employee}</p>
                  </div>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Leave Type</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.leaveType}</p>
                  </div>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Dates</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.dates}</p>
                  </div>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Duration</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.duration}</p>
                  </div>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Reason</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.reason}</p>
                  </div>
                  <div className='rounded-lg border border-[#EAECF0] bg-[#F8FAFC] p-3'>
                    <p className='text-[12px] text-[#667085]'>Attachment</p>
                    <p className='mt-1 text-[16px] font-semibold text-[#111827]'>{selectedApprovalSummary?.attachment}</p>
                  </div>
                </div>
              </div>

              <div className='rounded-xl border border-[#E5E7EB] bg-white p-4'>
                <div className='flex flex-wrap items-center justify-between gap-2'>
                  <h2 className='text-[16px] font-semibold text-[#344054]'>What do you need from employee?</h2>
                  <button type='button' className='text-[13px] font-medium text-[#1677FF] bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-0'>
                    Use quick template to save time
                  </button>
                </div>

                <div className='mt-5'>
                  <label className='mb-2 block text-[14px] font-medium text-[#111827]'>Details</label>
                  <textarea
                    value={askInfoForm.details}
                    onChange={(event) => setAskInfoForm((prev) => ({ ...prev, details: event.target.value }))}
                    placeholder='Write what clarification/documents are needed'
                    className='min-h-[120px] w-full rounded-lg border border-[#D0D5DD] bg-white px-3 py-2 text-[14px] text-[#111827] outline-none focus:border-[#0575E6]'
                  />
                </div>

                <div className='mt-4 flex flex-wrap gap-3'>
                  {quickTemplates.map((template) => (
                    <button
                      key={template}
                      type='button'
                      onClick={() => handleTemplateClick(template)}
                      className='h-[36px] rounded-lg border border-[#D0D5DD] bg-[#F8FAFC] px-3 text-[13px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-[#EEF2F6]'
                    >
                      {template}
                    </button>
                  ))}
                </div>

                <div className='mt-5'>
                  <DivDropdown
                    value={`Response Due: ${askInfoForm.responseDue}`}
                  options={responseDueOptions.map((option) => `Response Due: ${option}`)}
                  onSelect={(value) =>
                    setAskInfoForm((prev) => ({
                      ...prev,
                      responseDue: value.replace('Response Due: ', '')
                    }))
                  }
                  widthClass='w-full'
                  direction='up'
                />
              </div>
              </div>
              </div>

              <div className='border-t border-[#E5E7EB] bg-[#F8F9FA] px-5 py-4 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => setShowAskInfoDrawer(false)}
                  className='h-[40px] rounded-lg border border-[#D0D5DD] bg-white px-4 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  onClick={handleAskInfoSubmit}
                  className='h-[40px] rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-[14px] font-medium text-white shadow-none outline-none focus:outline-none focus:ring-0'
                >
                  Send Request
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

export default LeaveManagementTLHr
