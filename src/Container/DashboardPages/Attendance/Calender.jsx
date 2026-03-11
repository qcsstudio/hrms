import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import createAxios from '../../../utils/axios.config'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

// Backend status → display label mapping
const STATUS_MAP = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
  LATE: 'Late',
  LEAVE: 'Leave',
  NOT_MARKED: 'Not Marked',
  WEEK_OFF: 'Week Off',
  // lowercase fallbacks
  present: 'Present',
  absent: 'Absent',
  late: 'Late',
  leave: 'Leave',
  not_marked: 'Not Marked',
  week_off: 'Week Off',
  Present: 'Present',
  Absent: 'Absent',
  Late: 'Late',
  Leave: 'Leave',
}

const STATUS_STYLES = {
  Present: 'bg-[#ECFDF3] text-[#2B8A3E] border border-[#D3F9D8]',
  Leave: 'bg-[#FFF3D6] text-[#F59E0B] border border-[#FDE2AD]',
  Late: 'bg-[#FFF3D6] text-[#F59E0B] border border-[#FDE2AD]',
  Absent: 'bg-[#FEE2E2] text-[#DC2626] border border-[#FECACA]',
  'Not Marked': 'bg-[#F2F4F6] text-[#334155] border border-[#D2D8E0]',
  'Week Off': 'bg-[#F8F9FA] text-[#6B7280] border border-[#DEE2E6]',
}

const DAYS = ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN']

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function getCalendarWeeks(year, month) {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)

  // Get Monday-based day of week (0=Mon, 6=Sun)
  let startDow = firstDay.getDay() - 1
  if (startDow < 0) startDow = 6

  // Start from the Monday of the first week
  const start = new Date(firstDay)
  start.setDate(start.getDate() - startDow)

  const weeks = []
  const current = new Date(start)

  while (weeks.length < 6) {
    const week = []
    for (let i = 0; i < 7; i++) {
      week.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }
    weeks.push(week)
    if (current > lastDay && weeks.length >= 5) break
  }

  return weeks
}

function formatDateKey(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

const Calender = () => {
  const navigate = useNavigate()
//   const { token } = useSelector(state => state.user)
const token = localStorage.getItem('authToken')
  const axiosInstance = createAxios(token)

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [attendanceData, setAttendanceData] = useState({}) // key: "YYYY-MM-DD" → display label
  const [loading, setLoading] = useState(false)

  const weeks = getCalendarWeeks(currentYear, currentMonth)

  // Fetch calendar data from API
  const fetchCalendarData = async (year, month) => {
    setLoading(true)
    try {
      const res = await axiosInstance.get('/attendance/calendar', {
        params: { month: month + 1, year }, // backend expects 1-indexed month
        meta: { auth: "ADMIN_AUTH" }
      })

      const map = {}
      const data = res.data
      if (Array.isArray(data)) {
        data.forEach((item) => {
          const key = new Date(item.date).toISOString().slice(0, 10)
          map[key] = STATUS_MAP[item.status] || item.status
        })
      }
      setAttendanceData(map)
    } catch (error) {
      console.error("Calendar API failed:", error)
      setAttendanceData({})
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalendarData(currentYear, currentMonth)
  }, [currentYear, currentMonth])

  const getStatus = (date) => {
    const key = formatDateKey(date)
    if (attendanceData[key]) return attendanceData[key]
    // Sat/Sun default to Week Off if not in API data
    const dow = date.getDay()
    if (dow === 0 || dow === 6) return 'Week Off'
    if (date.getMonth() !== currentMonth) return null
    return 'Not Marked'
  }

  const goToPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  return (
    <div className='p-[10px] bg-[#F8F9FA] min-h-screen'>
      {/* Header */}
      <div className='flex justify-between items-start'>
        <div>
          <h1 className='font-bold text-[20px]'>Attendance</h1>
          <p className='text-gray-300 text-[14px]'>Track attendance, review exceptions, and manage regularization approvals.</p>
        </div>
        <button className='text-white rounded-md bg-[#0575E6] p-[10px] font-medium'>
          New Regularization
        </button>
      </div>

      {/* Filters */}
      <div className='flex gap-[10px] mt-5 items-center'>
        <DatePicker
          selected={new Date(currentYear, currentMonth)}
          onChange={(date) => {
            if (date) {
              setCurrentMonth(date.getMonth())
              setCurrentYear(date.getFullYear())
            }
          }}
          dateFormat='MM - yyyy'
          showMonthYearPicker
          className='border border-[#DEE2E6] font-semibold text-[#344054] bg-[#FFFFFF] w-[230px] h-[40px] p-[8px] rounded cursor-pointer'
          placeholderText='mm - yyyy'
        />

        <div className='flex items-center gap-2 border border-[#DEE2E6] bg-white rounded h-[40px] px-3'>
          <button onClick={goToPrevMonth} className='text-[#344054] font-bold text-lg hover:text-[#0575E6]'>
            ‹
          </button>
          <span className='font-semibold text-[#344054] w-[100px] text-center'>
            {MONTHS[currentMonth]}
          </span>
          <button onClick={goToNextMonth} className='text-[#344054] font-bold text-lg hover:text-[#0575E6]'>
            ›
          </button>
        </div>

        <button
          onClick={() => navigate('/dashboard/attendance')}
          className='border-2 border-[#868E961A] text-[#344054] rounded-md bg-[#E4E9EE4D] h-[40px] font-semibold px-4 ml-auto'
        >
          ← Back to Attendance
        </button>
      </div>

      {/* Calendar Grid */}
      <div className='mt-6 bg-white rounded-xl border border-[#DEE2E6] overflow-hidden'>
        {/* Day Headers */}
        <div className='grid grid-cols-7'>
          {DAYS.map((day) => (
            <div key={day} className='text-[#6B7280] font-semibold text-[14px] py-3 px-4 border-b border-r border-[#DEE2E6] last:border-r-0 bg-[#F8F9FA]'>
              {day}
            </div>
          ))}
        </div>

        {loading ? (
          <div className='flex items-center justify-center py-20 text-[#6B7280]'>Loading calendar...</div>
        ) : (
        <>
        {/* Weeks */}
        {weeks.map((week, wi) => (
          <div key={wi} className='grid grid-cols-7'>
            {week.map((date, di) => {
              const isCurrentMonth = date.getMonth() === currentMonth
              const status = getStatus(date)

              return (
                <div
                  key={di}
                  className={`min-h-[90px] py-3 px-4 border-b border-r border-[#DEE2E6] last:border-r-0 ${!isCurrentMonth ? 'bg-[#FAFAFA]' : 'bg-white'}`}
                >
                  <div className={`font-bold text-[16px] mb-2 ${!isCurrentMonth ? 'text-[#C4C4C4]' : 'text-[#111827]'}`}>
                    {date.getDate()}
                  </div>
                  {status && (
                    <span className={`inline-block text-[12px] font-medium px-2 py-[2px] rounded ${STATUS_STYLES[status] || ''}`}>
                      {status}
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        ))}
        </>
        )}
      </div>
    </div>
  )
}

export default Calender
