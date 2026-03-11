import React, { useEffect, useRef, useState } from 'react'
import { action } from '../../../allAssetsImport/allAssets'
import { createPortal } from 'react-dom'
import { RxCross2 } from 'react-icons/rx'
import { FaAngleDown } from 'react-icons/fa'
import { toast } from 'react-toastify'
import createAxios from '../../../utils/axios.config'

const leaveBalanceRows = [
  {
    name: 'Aman Raj',
    email: 'aman.raj@company.com',
    annual: 10,
    sick: 7,
    casual: 7,
    status: 'History',
    icon: action
  },
  {
    name: 'Aman Raj',
    email: 'aman.raj@company.com',
    annual: 2,
    sick: 6,
    casual: 1,
    status: 'Low',
    icon: action
  }
]

const reports = [
  {
    name: 'Monthly Leave Summary',
    value: 'Download, pending, rejected, and totals',
    status: 'Download'
  },
  {
    name: 'Department Wise Leave Report',
    value: 'Trends by team and department',
    status: 'Download'
  },
  {
    name: 'Leave Type Usage',
    value: 'CL, SL, AL, and WFH distribution',
    status: 'Download'
  }
]

const initialHolidayForm = {
  name: '',
  date: '',
  type: '',
  description: '',
  isNotification: false
}

const allowedBulkExtensions = ['csv', 'xls', 'xlsx', 'xlsm', 'ods', 'tsv', 'txt']
const acceptedBulkFormats = '.csv,.xls,.xlsx,.xlsm,.ods,.tsv,.txt'
const drawerSlideInStyle = { animation: 'drawerSlideIn 280ms ease-out' }

const LeaveManagementHr1 = ({ holidayData = [] }) => {
  const token = localStorage.getItem('authToken')
  const axiosInstance = createAxios(token)

  const [showDropdown, setShowDropdown] = useState(false)
  const [showSinglePopup, setShowSinglePopup] = useState(false)
  const [showBulkPopup, setShowBulkPopup] = useState(false)
  const [formHoliday, setFormHoliday] = useState(initialHolidayForm)
  const [bulkFile, setBulkFile] = useState(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormHoliday((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const getHolidayTypeClass = (type) => {
    const normalizedType = (type || '').toUpperCase()

    if (normalizedType === 'FIXED') {
      return 'text-[#2B8A3E] border border-[#D3F9D8] bg-[#ECFDF3]'
    }

    if (normalizedType === 'REGIONAL') {
      return 'text-[#7C6EFF] bg-[#F1EDFF] border border-[#DCD3FF]'
    }

    return 'text-[#344054] border border-[#D2D8E0] bg-[#EEF2F6]'
  }

  const handleHolidaySubmit = async () => {
    if (!formHoliday.name || !formHoliday.date || !formHoliday.type) {
      toast.error('Name, date, and type are required')
      return
    }

    try {
      const res = await axiosInstance.post('/holiday', formHoliday, {
        meta: { auth: 'ADMIN_AUTH' }
      })

      console.log(res?.data, 'holiday response')
      toast.success('Holiday added successfully')
      setShowSinglePopup(false)
      setFormHoliday(initialHolidayForm)
    } catch (error) {
      console.log(error, 'holiday api error')
      toast.error(error?.response?.data?.message || 'Failed to add holiday')
    }
  }

  const isBulkFormatAllowed = (file) => {
    const extension = file?.name?.split('.').pop()?.toLowerCase()
    return extension ? allowedBulkExtensions.includes(extension) : false
  }

  const handleBulkFileChange = (e) => {
    const file = e.target.files?.[0]

    if (!file) {
      return
    }

    if (!isBulkFormatAllowed(file)) {
      toast.error('Unsupported file format. Use CSV, XLS, XLSX, XLSM, ODS, TSV, or TXT.')
      e.target.value = ''
      return
    }

    setBulkFile(file)
  }

  const handleBulkUploadSubmit = async () => {
    if (!bulkFile) {
      toast.error('Please select a file for bulk upload')
      return
    }

    const formData = new FormData()
    formData.append('file', bulkFile)

    try {
      const res = await axiosInstance.post('/holiday/bulk-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        meta: { auth: 'ADMIN_AUTH' }
      })

      console.log(res?.data, 'bulk holiday upload response')
      toast.success('Bulk holiday file uploaded successfully')
      setShowBulkPopup(false)
      setBulkFile(null)
    } catch (error) {
      console.log(error, 'bulk holiday upload error')
      toast.error(error?.response?.data?.message || 'Bulk upload failed')
    }
  }

  return (
    <div className='mt-5 space-y-5 bg-gray-50'>
      <style>{`
        @keyframes drawerSlideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
      <div className='rounded-lg border border-[#E5E7EB] bg-white p-4 card-animate'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-[20px] font-bold text-[#212529]'>Leave Balance</h1>
            <p className='text-[12px] text-[#000000]/35'>Credit and debit adjustment with bulk upload support.</p>
          </div>
          <div className='flex flex-wrap gap-2'>
            <button className='h-[40px] rounded-md border border-[#D2D8E0] bg-[#EEF2F6] px-4 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0'>
              Download Template
            </button>
            <button className='h-[40px] rounded-md border border-[#D2D8E0] bg-[#EEF2F6] px-4 text-[14px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0'>
              Upload CSV
            </button>
            <button className='h-[40px] rounded-md bg-[#0575E6] px-4 text-[14px] font-medium text-white'>
              Export All
            </button>
          </div>
        </div>

        <div className='mt-5 overflow-x-auto'>
          <div className='min-w-[760px]'>
            <div className='grid grid-cols-12 border-b border-[#E3E5E8] pb-3 text-[14px] font-medium text-[#8F97A3]'>
              <div className='col-span-5'>Employee</div>
              <div className='col-span-1 text-center'>Annual</div>
              <div className='col-span-1 text-center'>Sick</div>
              <div className='col-span-1 text-center'>Casual</div>
              <div className='col-span-4 text-right'>Action</div>
            </div>

            <div className='mt-3 space-y-3'>
              {leaveBalanceRows.map((item, index) => (
                <div key={index} className='grid grid-cols-12 items-center rounded-lg border border-[#E5E7EB] bg-white px-3 py-3'>
                  <div className='col-span-5 flex items-center gap-3'>
                    <div className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#D9D9D9] text-[12px] font-semibold text-[#344054]'>
                      {item.name?.[0] || 'U'}
                    </div>
                    <div>
                      <p className='text-[14px] font-medium text-[#111827]'>{item.name}</p>
                      <p className='text-[13px] text-gray-500'>{item.email}</p>
                    </div>
                  </div>
                  <div className='col-span-1 text-center text-[14px] font-medium text-[#111827]'>{item.annual}</div>
                  <div className='col-span-1 text-center text-[14px] font-medium text-[#111827]'>{item.sick}</div>
                  <div className='col-span-1 text-center text-[14px] font-medium text-[#111827]'>{item.casual}</div>
                  <div className='col-span-4 flex items-center justify-end gap-2'>
                    <span   
                      className={`inline-flex h-[28px] min-w-[78px] items-center justify-center rounded-md border px-3 text-[12px] font-medium ${
                        item.status === 'History'
                          ? 'border-[#D2D8E0] bg-[#F2F4F6] text-[#334155]'
                          : 'border-[#FAC2C2] bg-[#FDECEC] text-[#B91C1C]'
                      }`}
                    >
                      {item.status}
                    </span>
                    <button
                      type='button'
                      className='bg-transparent p-0 border-none shadow-none outline-none focus:outline-none focus:ring-0'
                    >
                      <img className='h-[20px] w-[20px]' src={item.icon} alt='row action' />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-lg border border-[#E5E7EB] bg-white p-4 card-animate'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-[20px] font-bold text-[#212529]'>Reports</h1>
            <p className='text-[12px] text-[#000000]/35'>Download summaries for audit and analysis.</p>
          </div>
          <button className='h-[40px] rounded-md bg-[#0575E6] px-4 text-[14px] font-medium text-white'>Export All</button>
        </div>

        <div className='mt-4 space-y-3'>
          {reports.map((item, index) => (
            <div key={index} className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#EEF2F6] bg-[#F8F9FA] px-3 py-3'>
              <div>
                <p className='text-[15px] font-medium text-[#111827]'>{item.name}</p>
                <p className='text-[13px] text-gray-500'>{item.value}</p>
              </div>
              <button className='h-[32px] min-w-[110px] rounded-md border border-[#D2D8E0] bg-[#EEF2F6] px-3 text-[13px] font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0'>
                {item.status}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className='rounded-lg border border-[#E5E7EB] bg-white p-4 card-animate'>
        <div className='flex flex-wrap items-start justify-between gap-4'>
          <div>
            <h1 className='text-[20px] font-bold text-[#212529]'>Holidays</h1>
            <p className='text-[12px] text-[#000000]/35'>Used for leave calculations and future sandwich rules.</p>
          </div>

          <div ref={dropdownRef} className='relative w-[198px]'>
            <button
              type='button'
              onClick={() => setShowDropdown((prev) => !prev)}
              className='w-full h-[40px] flex items-center justify-center gap-2 bg-[#0575E6] border border-[#E4E9EE] rounded-lg px-4 py-2 text-white shadow-none outline-none focus:outline-none focus:ring-0 active:scale-[0.99]'
            >
              Add Holiday
              <FaAngleDown className={`text-[12px] transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
            </button>

            {showDropdown && (
              <div className='absolute right-0 mt-2 w-[240px] rounded-lg border border-gray-200 bg-white shadow-sm z-20 overflow-hidden'>
                <button
                  type='button'
                  onClick={() => {
                    setShowSinglePopup(true)
                    setShowDropdown(false)
                  }}
                  className='w-full text-left px-4 py-2 text-sm text-[#334155] border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors'
                >
                  Single
                </button>
                <button
                  type='button'
                  onClick={() => {
                    setShowDropdown(false)
                    setShowBulkPopup(true)
                  }}
                  className='w-full text-left px-4 py-2 text-sm text-[#334155] border-none shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-blue-50 active:bg-blue-100 transition-colors'
                >
                  Bulk
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='mt-4 space-y-3'>
          {holidayData.length > 0 ? (
            holidayData.map((item, index) => {
              const holidayDetail = [item?.value, item?.description].filter(Boolean).join(' - ')

              return (
                <div key={index} className='flex flex-wrap items-center justify-between gap-3 rounded-md border border-[#EEF2F6] bg-[#F8F9FA] px-3 py-3'>
                  <div>
                    <p className='text-[15px] font-medium text-[#111827]'>{item?.name || '-'}</p>
                    <p className='text-[13px] text-gray-500'>{holidayDetail || 'No description available'}</p>
                  </div>
                  <span
                    className={`inline-flex h-[32px] items-center justify-center rounded-md px-3 text-[12px] font-medium uppercase ${getHolidayTypeClass(item?.type)}`}
                  >
                    {item?.type || 'N/A'}
                  </span>
                </div>
              )
            })
          ) : (
            <div className='rounded-md border border-dashed border-[#D2D8E0] bg-[#F8F9FA] px-4 py-6 text-center text-[14px] text-[#667085]'>
              No holidays added yet.
            </div>
          )}
        </div>
      </div>

      {showSinglePopup &&
        createPortal(
          <div className='fixed inset-0 z-[1100]'>
            <button
              type='button'
              onClick={() => setShowSinglePopup(false)}
              aria-label='Close add holiday drawer'
              className='absolute inset-0 border-none bg-black/35'
            />
            <div
              className='absolute right-0 top-0 h-full w-full max-w-[560px] overflow-y-auto border-l border-[#E5E7EB] bg-white p-6 shadow-xl'
              style={drawerSlideInStyle}
            >
              <div className='mb-5 flex items-start justify-between border-b border-[#E5E7EB] pb-4'>
                <div>
                  <h1 className='text-[20px] font-semibold text-[#111827]'>Add Holiday</h1>
                  <p className='text-[13px] text-gray-500'>Create a holiday entry for leave calculations.</p>
                </div>
                <button
                  type='button'
                  onClick={() => setShowSinglePopup(false)}
                  className='rounded-md p-1 text-[#667085] hover:bg-[#F3F4F6]'
                >
                  <RxCross2 />
                </button>
              </div>

              <div className='space-y-4'>
                <div>
                  <label className='mb-1 block text-[13px] font-medium text-[#344054]'>Name</label>
                  <input
                    type='text'
                    name='name'
                    value={formHoliday.name}
                    onChange={handleChange}
                    placeholder='Enter holiday name'
                    className='h-[40px] w-full rounded-lg border border-[#D0D5DD] px-3 text-[14px] text-[#111827] outline-none focus:border-[#0575E6]'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-[13px] font-medium text-[#344054]'>Date</label>
                  <input
                    type='date'
                    name='date'
                    value={formHoliday.date}
                    onChange={handleChange}
                    className='h-[40px] w-full rounded-lg border border-[#D0D5DD] px-3 text-[14px] text-[#111827] outline-none focus:border-[#0575E6]'
                  />
                </div>

                <div>
                  <label className='mb-1 block text-[13px] font-medium text-[#344054]'>Type</label>
                  <select
                    name='type'
                    value={formHoliday.type}
                    onChange={handleChange}
                    className='h-[40px] w-full rounded-lg border border-[#D0D5DD] px-3 text-[14px] text-[#111827] outline-none focus:border-[#0575E6]'
                  >
                    <option value='' disabled>
                      Select holiday type
                    </option>
                    <option value='FIXED'>Fixed</option>
                    <option value='REGIONAL'>Regional</option>
                    <option value='COMPANY_HOLIDAY'>Company Holiday</option>
                    <option value='SPECIAL_HOLIDAY'>Special Holiday</option>
                  </select>
                </div>

                <div>
                  <label className='mb-1 block text-[13px] font-medium text-[#344054]'>Description</label>
                  <textarea
                    name='description'
                    value={formHoliday.description}
                    onChange={handleChange}
                    placeholder='Enter holiday description'
                    className='min-h-[90px] w-full rounded-lg border border-[#D0D5DD] px-3 py-2 text-[14px] text-[#111827] outline-none focus:border-[#0575E6]'
                  />
                </div>

                <div className='flex items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F8FAFC] px-3 py-2'>
                  <p className='text-[14px] text-[#344054]'>Push Notification</p>
                  <button
                    type='button'
                    onClick={() => setFormHoliday((prev) => ({ ...prev, isNotification: !prev.isNotification }))}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${
                      formHoliday.isNotification ? 'bg-blue-500' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                        formHoliday.isNotification ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowSinglePopup(false)
                    setFormHoliday(initialHolidayForm)
                  }}
                  className='h-[40px] rounded-md border border-[#D0D5DD] px-4 text-[14px] font-medium text-[#344054]'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='h-[40px] rounded-md bg-[#0575E6] px-4 text-[14px] font-medium text-white'
                  onClick={handleHolidaySubmit}
                >
                  Save
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {showBulkPopup &&
        createPortal(
          <div className='fixed inset-0 z-[1100]'>
            <button
              type='button'
              onClick={() => {
                setShowBulkPopup(false)
                setBulkFile(null)
              }}
              aria-label='Close bulk upload drawer'
              className='absolute inset-0 border-none bg-black/35'
            />
            <div
              className='absolute right-0 top-0 h-full w-full max-w-[560px] overflow-y-auto border-l border-[#E5E7EB] bg-white p-6 shadow-xl'
              style={drawerSlideInStyle}
            >
              <div className='mb-5 flex items-start justify-between border-b border-[#E5E7EB] pb-4'>
                <div>
                  <h1 className='text-[20px] font-semibold text-[#111827]'>Bulk Holiday Upload</h1>
                  <p className='text-[13px] text-gray-500'>Upload holiday file in CSV, XLS, XLSX, XLSM, ODS, TSV, or TXT format.</p>
                </div>
                <button
                  type='button'
                  onClick={() => {
                    setShowBulkPopup(false)
                    setBulkFile(null)
                  }}
                  className='rounded-md p-1 text-[#667085] hover:bg-[#F3F4F6]'
                >
                  <RxCross2 />
                </button>
              </div>

              <div className='rounded-lg border border-dashed border-[#D0D5DD] bg-[#F8FAFC] p-4'>
                <p className='mb-3 text-[13px] text-[#475467]'>
                  Choose file:
                  <span className='font-medium text-[#344054]'> {bulkFile?.name || 'No file selected'}</span>
                </p>
                <label className='inline-flex cursor-pointer items-center rounded-md border border-[#D0D5DD] bg-white px-4 py-2 text-[14px] font-medium text-[#344054] hover:bg-[#F9FAFB]'>
                  Browse File
                  <input
                    type='file'
                    accept={acceptedBulkFormats}
                    onChange={handleBulkFileChange}
                    className='hidden'
                  />
                </label>
                <p className='mt-3 text-[12px] text-[#667085]'>
                  Supported formats: CSV, XLS, XLSX, XLSM, ODS, TSV, TXT
                </p>
              </div>

              <div className='mt-6 flex justify-end gap-3'>
                <button
                  type='button'
                  onClick={() => {
                    setShowBulkPopup(false)
                    setBulkFile(null)
                  }}
                  className='h-[40px] rounded-md border border-[#D0D5DD] px-4 text-[14px] font-medium text-[#344054]'
                >
                  Cancel
                </button>
                <button
                  type='button'
                  className='h-[40px] rounded-md bg-[#0575E6] px-4 text-[14px] font-medium text-white'
                  onClick={handleBulkUploadSubmit}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  )
}

export default LeaveManagementHr1
