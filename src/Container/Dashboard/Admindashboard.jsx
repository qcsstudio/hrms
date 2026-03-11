import React, { useMemo, useState } from 'react'
import {
  Add_employees,
  Post_job,
  Approve_leave,
  Run_payroll,
  Announcement,
  Run_reports,
} from '../../allAssetsImport/allAssets'
import {
  statslogo1,
  statslogo2,
  statslogo3,
  statslogo4,
  TotalPayroll,
  Processingstatus,
  paydate,
  kayecimage,
} from '../../allAssetsImport/allAssets'
import { FaAngleDown, FaChevronLeft, FaChevronRight, FaPlus } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import createAxios from '../../utils/axios.config'
import { createPortal } from 'react-dom'

const quickActions = [
  { img: Add_employees, title: 'Add Employees', desc: 'Create new employee profile' },
  { img: Post_job, title: 'Post Job', desc: 'Create new job posting' },
  { img: Approve_leave, title: 'Approve Leave', desc: 'Review leave requests' },
  { img: Run_payroll, title: 'Run Payroll', desc: 'Process employee salaries' },
  { img: Announcement, title: 'Announcement', desc: 'Share latest updates' },
  { img: Run_reports, title: 'Run Reports', desc: 'Generate HR reports' },
]

const statsCards = [
  { icon: statslogo1, title: 'Total Employees', value: '257', note: '+08 this month', iconWrap: 'bg-[#E8EBFF]' },
  { icon: statslogo2, title: 'Leave Request', value: '8', note: 'Pending approval', iconWrap: 'bg-[#FFECEF]' },
  { icon: statslogo3, title: 'Interview', value: '5', note: 'Schedule this week', iconWrap: 'bg-[#ECECFF]' },
  { icon: statslogo4, title: 'New Applications', value: '23', note: '+08 this week', iconWrap: 'bg-[#E9F8F2]' },
]

const attendanceBars = [
  { day: 'Mon', value: 176, gradient: 'linear-gradient(180deg, #50A3FF 0%, #2E84E6 100%)' },
  { day: 'Tue', value: 198, gradient: 'linear-gradient(180deg, #FF7F7F 0%, #F05252 100%)' },
  { day: 'Wed', value: 150, gradient: 'linear-gradient(180deg, #F4C754 0%, #E0A800 100%)' },
  { day: 'Thu', value: 114, gradient: 'linear-gradient(180deg, #B6E547 0%, #84CC16 100%)' },
  { day: 'Fri', value: 100, gradient: 'linear-gradient(180deg, #75DD61 0%, #22C55E 100%)' },
  { day: 'Sat', value: 160, gradient: 'linear-gradient(180deg, #58E7BE 0%, #16C79A 100%)' },
  { day: 'Sun', value: 190, gradient: 'linear-gradient(180deg, #FFB36B 0%, #FF8A34 100%)' },
]

const leaveRequests = [
  { name: 'Sarah Johnson', date: 'Apr 28 - May 5, 2025', type: 'Annual Leave' },
  { name: 'Michael Chen', date: 'Apr 26 - Apr 27, 2025', type: 'Annual Leave' },
  { name: 'Jessica Williams', date: 'Apr 28 - May 5, 2025', type: 'Annual Leave' },
]

const upcomingEvents = [
  { title: 'Team Building Workshop', date: 'Apr 26, 2025 | 10:00 AM' },
  { title: 'Quarterly Performance Review', date: 'Apr 30, 2025 | 09:00 AM' },
  { title: 'New Employee Orientation', date: 'May 2, 2025 | 11:00 AM' },
  { title: 'HR Policy Training', date: 'May 5, 2025 | 02:00 PM' },
]

const departmentOverviewCards = [
  { img: TotalPayroll, title: 'Total Payroll', value: 'INR 247,580', iconBg: 'bg-[#E9E9FF]' },
  { img: Processingstatus, title: 'Processing Status', value: '85%', iconBg: 'bg-[#E2F3EF]' },
  { img: paydate, title: 'Pay Date', value: 'Apr 30, 2025', iconBg: 'bg-[#FBEFD9]' },
]

const performanceMetrics = [
  { title: 'Average Performance Score', value: '86%', note: '4% from last quarter', noteClass: 'text-[#2AA86C]' },
  { title: 'Goal Completion Rate', value: '78%', note: '2% from last quarter', noteClass: 'text-[#F05252]' },
  { title: 'Pending Reviewal', value: '12', note: 'Due by May 15, 2025', noteClass: 'text-[#98A2B3]' },
]

const topEmployees = [
  { name: 'James Smith', score: '97% Performance' },
  { name: 'Lisa Park', score: '95% Performance' },
  { name: 'Raven', score: '93% Performance' },
  { name: 'Kaycee', score: '87% Performance' },
]

const pieSegments = [
  { label: ['Sales'], color: '#22C55E' },
  { label: ['Product'], color: '#22B8CF' },
  { label: ['Human', 'Resources'], color: '#3B82F6' },
  { label: ['Finance'], color: '#EF4444' },
  { label: ['Engineering'], color: '#F5B14F' },
  { label: ['Marketing'], color: '#84CC16' },
]

const polarToCartesian = (cx, cy, radius, angle) => ({
  x: cx + radius * Math.cos((angle * Math.PI) / 180),
  y: cy + radius * Math.sin((angle * Math.PI) / 180),
})

const describeArc = (cx, cy, radius, startAngle, endAngle) => {
  const start = polarToCartesian(cx, cy, radius, startAngle)
  const end = polarToCartesian(cx, cy, radius, endAngle)
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
}

const weekDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
const calendarEventTemplates = [
  {
    day: 4,
    type: 'birthday',
    title: "Aarav Sharma's Birthday",
    detail: 'Celebrate with the team at 4:00 PM',
  },
  {
    day: 9,
    type: 'anniversary',
    title: 'Nisha Patel Work Anniversary',
    detail: '5 years with the organization',
  },
  {
    day: 14,
    type: 'birthday',
    title: "Riya Khan's Birthday",
    detail: 'Wish in #team-hr channel',
  },
  {
    day: 18,
    type: 'meeting',
    title: 'HR Policy Refresh Session',
    detail: '11:00 AM | Conference Room A',
  },
  {
    day: 24,
    type: 'training',
    title: 'People Manager Workshop',
    detail: '2:30 PM | Zoom',
  },
  {
    day: 28,
    type: 'anniversary',
    title: 'Rahul Verma Work Anniversary',
    detail: '3 years with the organization',
  },
]

const eventTypeStyles = {
  birthday: {
    label: 'Birthday',
    dotClass: 'bg-[#F97316]',
    badgeClass: 'border-[#FED7AA] bg-[#FFF7ED] text-[#C2410C]',
  },
  anniversary: {
    label: 'Work Anniversary',
    dotClass: 'bg-[#4565E5]',
    badgeClass: 'border-[#C7D2FE] bg-[#EEF2FF] text-[#3730A3]',
  },
  meeting: {
    label: 'Meeting',
    dotClass: 'bg-[#14B8A6]',
    badgeClass: 'border-[#99F6E4] bg-[#F0FDFA] text-[#0F766E]',
  },
  training: {
    label: 'Training',
    dotClass: 'bg-[#EAB308]',
    badgeClass: 'border-[#FEF08A] bg-[#FEFCE8] text-[#A16207]',
  },
  default: {
    label: 'Event',
    dotClass: 'bg-[#98A2B3]',
    badgeClass: 'border-[#D0D5DD] bg-[#F8FAFC] text-[#475467]',
  },
}

const getDateKey = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const panelClass = 'rounded-lg border border-[#E5E7EB] bg-white p-5 surface-card'
const buttonBase =
  'inline-flex items-center justify-center rounded-lg border shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 active:scale-[0.99] hover:-translate-y-[1px]'
const primaryButton =
  `${buttonBase} h-[40px] px-5 text-sm font-medium border-[#E4E9EE] bg-[#0575E6] text-white hover:bg-[#0467CA]`
const secondaryButton =
  `${buttonBase} h-[40px] px-5 text-sm font-medium border-[#C4DBFF] bg-[#EAF2FF] text-[#1677FF] hover:bg-[#DDEAFF]`

const Admindashboard = () => {
  const today = new Date()
  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  )
  const [selectedDate, setSelectedDate] = useState(today)

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        year: 'numeric',
      }).format(calendarMonth),
    [calendarMonth],
  )

  const selectedDateLabel = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(selectedDate),
    [selectedDate],
  )

  const calendarCells = useMemo(() => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const firstDayOfMonth = new Date(year, month, 1)
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const mondayFirstStartIndex = (firstDayOfMonth.getDay() + 6) % 7
    const leadingEmpty = Array.from({ length: mondayFirstStartIndex }, () => null)
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, idx) => ({
      day: idx + 1,
    }))

    const totalBeforeTrailing = leadingEmpty.length + currentMonthDays.length
    const trailingEmptyCount = (7 - (totalBeforeTrailing % 7)) % 7
    const trailingEmpty = Array.from({ length: trailingEmptyCount }, () => null)

    return [...leadingEmpty, ...currentMonthDays, ...trailingEmpty]
  }, [calendarMonth])

  const monthEvents = useMemo(() => {
    const year = calendarMonth.getFullYear()
    const month = calendarMonth.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    return calendarEventTemplates
      .filter((template) => template.day <= daysInMonth)
      .map((template, index) => ({
        ...template,
        id: `${template.type}-${template.day}-${index}`,
        date: new Date(year, month, template.day),
      }))
      .sort((left, right) => left.date - right.date)
  }, [calendarMonth])

  const eventsByDate = useMemo(() => {
    const grouped = {}
    monthEvents.forEach((event) => {
      const key = getDateKey(event.date)
      if (!grouped[key]) {
        grouped[key] = []
      }
      grouped[key].push(event)
    })
    return grouped
  }, [monthEvents])

  const selectedDateEvents = eventsByDate[getDateKey(selectedDate)] || []

  const shiftCalendarMonth = (offset) => {
    const nextMonth = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() + offset,
      1,
    )
    const maxDay = new Date(
      nextMonth.getFullYear(),
      nextMonth.getMonth() + 1,
      0,
    ).getDate()
    const nextSelectedDay = Math.min(selectedDate.getDate(), maxDay)

    setCalendarMonth(nextMonth)
    setSelectedDate(
      new Date(nextMonth.getFullYear(), nextMonth.getMonth(), nextSelectedDay),
    )
  }

  const handlePrevMonth = () => shiftCalendarMonth(-1)
  const handleNextMonth = () => shiftCalendarMonth(1)

  const isSameDate = (left, right) =>
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()

  const handleSelectDay = (day) => {
    const selected = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    )
    setSelectedDate(selected)
  }

  // popup api change password

   const [istemporyPassword, setIstemporayPassword] = useState(
    localStorage.getItem("istemporyPassword") === "true"
  );
  const userId = localStorage.getItem('userId')
  const [changepassword, setChangepassword] = useState({
    confirmPassword: "",
    newPassword: ""
  })

  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState({
    newPassword: "",
    confirmPassword: ""
  });


  const dispatch = useDispatch()
  const axiosInstance = createAxios()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChangepassword({ ...changepassword, [name]: value })
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handlechangepassSubmit = async () => {

    const newPassError = validatePassword(changepassword.newPassword);
    const confirmPassError = validatePassword(changepassword.confirmPassword);

    if (newPassError || confirmPassError) {
      setErrors({
        newPassword: newPassError,
        confirmPassword: confirmPassError
      });
      toast.error(newPassError || confirmPassError);
      return;
    }

    if (changepassword.newPassword !== changepassword.confirmPassword) {
      setErrors({
        newPassword: "",
        confirmPassword: "Passwords do not match"
      });
      toast.error("New Password and Confirm Password do not match");
      return;
    }
    if (!changepassword.newPassword || !changepassword.confirmPassword) {
      toast.info("Both fields are required");
      return;
    }

    // if (changepassword.newPassword !== changepassword.confirmPassword) {
    //   toast.info("New Password and Confirm Password do not match");
    //   return;
    // }
    const payload = {
      userId: userId,
      newPassword: changepassword.newPassword,
      confirmPassword: changepassword.confirmPassword
    }
    try {
      const res = await axiosInstance.post('/users/change-password', payload, {
        meta: { auth: "TENANT_ONLY" }
      })
      console.log("after login change password response========", res.data)
      toast.success("Password changed successfully");
      dispatch(setAddLoginData(res.data))
      localStorage.setItem("istemporyPassword", "true");
      setIstemporayPassword(true);

    } catch (error) {
      console.warn("api is not working", error)
    }
  }

  return (
    <div className='p-[15px] bg-[#F8F9FA] card-animate'>
       {/* popup================================== */}
      {!istemporyPassword && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

          {/* Popup Box */}
          <div className="bg-white rounded-2xl p-6 w-[450px] shadow-xl">
            <h1 className='text-[25px] text-center'>Change Password</h1>
            {/* New Password==================== */}
            <h2 className='mb-3'>New Password</h2>
            <div className="relative mb-4 border border-gray-300 rounded-xl px-4 py-3 flex items-center">
              <input
                name="newPassword"
                placeholder="Enter New password"
                type={showNewPassword ? "text" : "password"}
                value={changepassword.newPassword}
                onChange={handleChange}
                className={`flex-1 outline-none ${errors.newPassword ? "text-red-600" : ""
                  }`}
              />

              <button
                type="button"
                onClick={() => setShowNewPassword(prev => !prev)}
                className="text-gray-500 p-0 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-0 active:bg-transparent"
              >
                👁
              </button>
            </div>

            {/* Confirm Password========================= */}
            <h2 className='mb-3'>Confirm Password</h2>
            <div className="relative mb-6 border border-gray-300 rounded-xl px-4 py-3 flex items-center">
              <input
                name="confirmPassword"
                placeholder="Enter new password"
                type={showConfirmPassword ? "text" : "password"}
                value={changepassword.confirmPassword}
                onChange={handleChange}
                className={`flex-1 outline-none ${errors.confirmPassword ? "text-red-600" : ""
                  }`} />

              <button
                type="button"
                onClick={() => setShowConfirmPassword(prev => !prev)}
                className="text-gray-500 p-0 bg-transparent border-none shadow-none outline-none focus:outline-none focus:ring-0 active:bg-transparent"
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
        </div>, document.body
      )}

      <div className='mx-auto max-w-[1700px] space-y-5'>
        <section className='flex items-center justify-between gap-4'>
          <h1 className='text-[20px] font-bold leading-none text-[#212529]'>Employees</h1>

          <button type='button' className='h-[40px] rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 text-sm font-medium text-white shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:bg-[#0467CA] active:scale-[0.99]'>
            <span className='inline-flex items-center gap-2 leading-none'>
              <FaPlus className='text-[14px]' />
              Add Employee
              <FaAngleDown className='text-[13px]' />
            </span>
          </button>
        </section>

        <section>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 list-stagger'>
            {quickActions.map((item, index) => (
              <div
                key={item.title}
                className='group flex items-center gap-3 rounded-lg border border-[#E5E7EB] bg-white p-3 text-left shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:-translate-y-[1px] hover:border-[#CBD5E1] hover:shadow-[0_10px_22px_rgba(15,23,42,0.10)]'
                style={{ '--stagger': index }}
              >
                <div className='flex h-12 w-12 items-center justify-center rounded-md bg-[#F2F4F7] transition-transform duration-300 group-hover:scale-105'>
                  <img src={item.img} alt={item.title} />
                </div>
                <div>
                  <h2 className='text-[15px] font-semibold leading-tight text-[#212529]'>{item.title}</h2>
                  <p className='text-[11px] text-[#98A2B3]'>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 list-stagger'>
          {statsCards.map((item, index) => (
            <div key={item.title} className={`${panelClass} group transition-all duration-200 hover:-translate-y-[2px] hover:shadow-[0_12px_24px_rgba(15,23,42,0.12)]`} style={{ '--stagger': index }}>
              <div className='flex items-start justify-between gap-4'>
                <h2 className='text-[16px] font-semibold leading-tight text-[#151B26] whitespace-pre-line'>{item.title}</h2>
                <div className={`${item.iconWrap} flex h-12 w-12 items-center justify-center rounded-md transition-transform duration-300 group-hover:scale-110`}>
                  <img src={item.icon} alt={item.title} />
                </div>
              </div>
              <p className='mt-3 text-2xl font-bold leading-none text-[#0F172A]'>{item.value}</p>
              <p className='mt-2 text-[13px] text-[#5E6675]'>
                <span className='mr-2 rounded-md bg-[#E2F8EE] px-2 py-[1px] text-[#3CB87E]'>{item.note.split(' ')[0]}</span>
                {item.note.replace(item.note.split(' ')[0], '').trim()}
              </p>
            </div>
          ))}
        </section>

        <section className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
          <div className={`${panelClass} xl:col-span-6`}>
            <div className='flex items-center justify-between'>
              <h2 className='text-[18px] font-semibold text-[#212529]'>Today&apos;s Attendance</h2>
              <p className='text-[13px] text-[#667085]'>April 24, 2025</p>
            </div>

            <div className='mt-6 grid grid-cols-[40px_1fr] gap-3'>
              <div className='h-[270px] flex flex-col justify-between text-[12px] text-[#98A2B3]'>
                {[200, 150, 100, 50, 0].map((tick) => (
                  <span key={tick}>{tick}</span>
                ))}
              </div>

              <div className='relative h-[270px]'>
                <div className='absolute inset-x-0 top-0 h-[220px] flex flex-col justify-between'>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <div key={idx} className='w-full border-t border-dashed border-[#C4CCD8]' />
                  ))}
                </div>

                <div className='absolute inset-x-0 top-0 h-[220px] flex items-end justify-between px-1'>
                  {attendanceBars.map((item) => (
                    <div key={item.day} className='group flex w-[38px] justify-center'>
                      <div
                        className='w-[30px] rounded-full transition-transform duration-300 group-hover:scale-[1.06] group-hover:shadow-[0_8px_18px_rgba(15,23,42,0.20)]'
                        style={{ height: `${(item.value / 200) * 100}%`, background: item.gradient }}
                      />
                    </div>
                  ))}
                </div>

                <div className='absolute inset-x-0 bottom-0 flex justify-between px-1 text-[12px] text-[#98A2B3]'>
                  {attendanceBars.map((item) => (
                    <span key={item.day} className='w-[38px] text-center'>{item.day}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={`${panelClass} xl:col-span-6`}>
            <h2 className='text-[18px] font-semibold text-[#212529]'>Leave Requests</h2>

            <div className='mt-5 space-y-3 list-stagger'>
              {leaveRequests.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className='flex flex-col gap-3 rounded-xl border border-[#E8ECF1] bg-[#EEF0F3] p-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.10)] lg:flex-row lg:items-center lg:justify-between'
                  style={{ '--stagger': index }}
                >
                  <div>
                    <h3 className='text-[15px] font-semibold text-[#212529]'>{item.name}</h3>
                    <p className='text-[13px] text-[#667085]'>{item.date}</p>
                  </div>

                  <div className='flex flex-wrap gap-2'>
                    <button type='button' className='h-7 rounded-md border border-[#BEEFD7] bg-[#E8FAF1] px-3 text-xs font-medium text-[#29B97A] shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:-translate-y-[1px]'>
                      {item.type}
                    </button>
                    <button type='button' className='h-7 rounded-md border border-[#D3F9D8] bg-[#ECFDF3] px-3 text-xs font-medium text-[#2B8A3E] shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:-translate-y-[1px]'>
                      Approve
                    </button>
                    <button type='button' className='h-7 rounded-md border border-[#FAC2C2] bg-[#FDECEC] px-3 text-xs font-medium text-[#B91C1C] shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:-translate-y-[1px]'>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button type='button' className='mt-5 h-[40px] w-full rounded-lg border border-[#C4DBFF] bg-[#EAF2FF] text-sm font-medium text-[#1677FF] shadow-none outline-none focus:outline-none focus:ring-0 transition-all duration-200 hover:-translate-y-[1px] hover:bg-[#DDEAFF] active:scale-[0.99]'>
              View All Request
            </button>
          </div>
        </section>

        <section className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
          <div className={`${panelClass} xl:col-span-4`}>
            <h2 className='text-[18px] font-semibold text-[#212529]'>Upcoming Events</h2>

            <div className='mt-5 space-y-3 list-stagger'>
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.title}
                  className='rounded-xl border border-[#E8ECF1] bg-[#EEF0F3] p-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.10)]'
                  style={{ '--stagger': index }}
                >
                  <h3 className='text-[15px] font-semibold text-[#212529]'>{event.title}</h3>
                  <p className='text-[13px] text-[#667085]'>{event.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`${panelClass} xl:col-span-8`}>
            <h2 className='text-[18px] font-semibold text-[#212529]'>Department Overview</h2>

            <div className='mt-5 grid grid-cols-1 gap-3 md:grid-cols-3'>
              {departmentOverviewCards.map((item) => (
                <div key={item.title} className='group rounded-xl border border-[#E8ECF1] bg-[#EEF0F3] p-4 text-center transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.10)]'>
                  <div className={`mx-auto mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-full ${item.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                    <img src={item.img} alt={item.title} />
                  </div>
                  <h3 className='text-[14px] font-semibold text-[#212529]'>{item.title}</h3>
                  <p className='mt-2 text-2xl font-bold leading-none text-[#111827]'>{item.value}</p>
                </div>
              ))}
            </div>

            <div className='mt-4 flex flex-col gap-3 md:flex-row'>
              <button type='button' className={`w-full md:w-1/2 ${primaryButton}`}>
                Download Report
              </button>
              <button type='button' className={`w-full md:w-1/2 ${secondaryButton}`}>
                View Details
              </button>
            </div>
          </div>
        </section>

        <section className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
          <div className={`${panelClass} xl:col-span-8`}>
            <h2 className='text-[18px] font-semibold text-[#212529]'>Employee Performance Metrics</h2>

            <div className='mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3'>
              {performanceMetrics.map((metric) => (
                <div key={metric.title} className='rounded-xl border border-[#E8ECF1] border-l-[4px] border-l-[#4E6BFF] bg-[#EEF0F3] p-4 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.10)]'>
                  <h3 className='text-[15px] font-medium text-[#212529]'>{metric.title}</h3>
                  <p className='mt-3 text-[32px] font-semibold leading-none text-[#111827]'>{metric.value}</p>
                  <p className={`mt-2 text-[13px] ${metric.noteClass}`}>{metric.note}</p>
                </div>
              ))}
            </div>

            <div className='mt-6'>
              <h3 className='text-[18px] font-semibold text-[#212529]'>Employee Performance Metrics <span className='text-[12px] text-[#98A2B3]'>(TOP 5)</span></h3>
              <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 list-stagger'>
                {topEmployees.map((employee, index) => (
                  <div
                    key={employee.name}
                    className='group flex items-center gap-3 rounded-xl border border-[#E8ECF1] bg-[#EEF0F3] p-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_10px_20px_rgba(15,23,42,0.10)]'
                    style={{ '--stagger': index }}
                  >
                    <img src={kayecimage} alt={employee.name} className='h-[56px] w-[56px] rounded-lg object-cover transition-transform duration-300 group-hover:scale-105' />
                    <div>
                      <h4 className='text-[14px] font-medium text-[#212529]'>{employee.name}</h4>
                      <p className='text-[13px] font-semibold text-[#212529]'>{employee.score}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={`${panelClass} xl:col-span-4`}>
            <h2 className='text-[18px] font-semibold text-[#212529]'>Department Overview</h2>

            <div className='mx-auto mt-5 w-full max-w-[340px]'>
              <svg viewBox='0 0 360 360' className='h-auto w-full overflow-visible'>
                {pieSegments.map((segment, index) => {
                  const centerX = 180
                  const centerY = 180
                  const radius = 76
                  const strokeWidth = 48
                  const segmentStart = -110 + index * 60
                  const segmentEnd = segmentStart + 44
                  const midAngle = segmentStart + (segmentEnd - segmentStart) / 2
                  const arcPath = describeArc(centerX, centerY, radius, segmentStart, segmentEnd)

                  const connectorStart = polarToCartesian(centerX, centerY, radius + strokeWidth / 2 + 4, midAngle)
                  const connectorMid = polarToCartesian(centerX, centerY, radius + strokeWidth / 2 + 18, midAngle)
                  const isRight = Math.cos((midAngle * Math.PI) / 180) >= 0
                  const connectorEnd = {
                    x: connectorMid.x + (isRight ? 18 : -18),
                    y: connectorMid.y,
                  }

                  return (
                    <g key={`${segment.label.join('-')}-${index}`}>
                      <path
                        d={arcPath}
                        fill='none'
                        stroke={segment.color}
                        strokeWidth={strokeWidth}
                        strokeLinecap='round'
                      />

                      <path
                        d={`M ${connectorStart.x} ${connectorStart.y} L ${connectorMid.x} ${connectorMid.y} L ${connectorEnd.x} ${connectorEnd.y}`}
                        fill='none'
                        stroke={segment.color}
                        strokeWidth='1.5'
                        strokeLinecap='round'
                      />

                      <text
                        x={connectorEnd.x + (isRight ? 4 : -4)}
                        y={connectorEnd.y - (segment.label.length > 1 ? 5 : 0)}
                        textAnchor={isRight ? 'start' : 'end'}
                        className='fill-[#475467] text-[11px] font-medium'
                      >
                        {segment.label.map((line, lineIndex) => (
                          <tspan key={`${line}-${lineIndex}`} x={connectorEnd.x + (isRight ? 4 : -4)} dy={lineIndex === 0 ? 0 : 12}>
                            {line}
                          </tspan>
                        ))}
                      </text>
                    </g>
                  )
                })}

                <circle cx='180' cy='180' r='44' fill='white' />
              </svg>
            </div>
          </div>
        </section>

        <section className='grid grid-cols-1 gap-4 xl:grid-cols-12'>
          <div className={`${panelClass} xl:col-span-4`}>
            <div className='flex items-center justify-between'>
              <button
                type='button'
                onClick={handlePrevMonth}
                className='rounded-md p-2 text-[#98A2B3] transition-colors duration-200 hover:bg-[#E6E9EF] hover:text-[#667085]'
              >
                <FaChevronLeft />
              </button>
              <h3 className='text-[18px] font-semibold text-[#212529]'>{monthLabel}</h3>
              <button
                type='button'
                onClick={handleNextMonth}
                className='rounded-md p-2 text-[#98A2B3] transition-colors duration-200 hover:bg-[#E6E9EF] hover:text-[#667085]'
              >
                <FaChevronRight />
              </button>
            </div>

            <div className='mt-5 grid grid-cols-7 gap-y-3 text-center'>
              {weekDays.map((day) => (
                <div key={day} className='text-[11px] font-medium text-[#667085]'>{day}</div>
              ))}

              {calendarCells.map((cell, index) => {
                if (!cell) {
                  return (
                    <div key={`empty-${index}`} className='flex min-h-[42px] flex-col items-center justify-start gap-1'>
                      <span className='h-7 w-7' />
                      <span className='h-[6px]' />
                    </div>
                  )
                }

                const cellDate = new Date(
                  calendarMonth.getFullYear(),
                  calendarMonth.getMonth(),
                  cell.day,
                )
                const cellEvents = eventsByDate[getDateKey(cellDate)] || []
                const isSelected = isSameDate(cellDate, selectedDate)
                const isToday = isSameDate(cellDate, today)

                return (
                  <div key={`day-${cell.day}-${index}`} className='flex min-h-[42px] flex-col items-center justify-start gap-1'>
                    <button
                      type='button'
                      onClick={() => handleSelectDay(cell.day)}
                      className={`flex h-7 w-7 items-center justify-center rounded-full border border-transparent bg-[#F8FAFC] text-[14px] text-[#344054] transition-all duration-200 ${
                        isSelected
                          ? 'border-[#C7D2FE] bg-[#EEF2FF] text-[#3730A3] shadow-none'
                          : isToday
                            ? 'border-[#D4DEFF] bg-[#F3F7FF] text-[#1F2937] hover:bg-[#EEF2FF]'
                            : 'hover:bg-[#EEF2F7]'
                      }`}
                    >
                      {cell.day}
                    </button>

                    <span className='flex h-[6px] items-center gap-[3px]'>
                      {cellEvents.slice(0, 3).map((event) => {
                        const style = eventTypeStyles[event.type] || eventTypeStyles.default
                        return (
                          <span
                            key={`${event.id}-dot`}
                            className={`h-[5px] w-[5px] rounded-full ${style.dotClass}`}
                          />
                        )
                      })}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className='mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
              {['birthday', 'anniversary', 'meeting', 'training'].map((type) => {
                const style = eventTypeStyles[type]
                return (
                  <span key={type} className='inline-flex items-center gap-2 text-[12px] text-[#667085]'>
                    <span className={`h-2.5 w-2.5 rounded-full ${style.dotClass}`} />
                    {style.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className={`${panelClass} xl:col-span-8`}>
            <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <div>
                <h2 className='text-[18px] font-semibold text-[#212529]'>Calendar Events</h2>
                <p className='mt-1 text-[13px] text-[#667085]'>
                  Birthdays, work anniversaries and team activities
                </p>
              </div>
              <span className='inline-flex h-8 items-center rounded-md border border-[#D0D5DD] bg-[#F8FAFC] px-3 text-[12px] font-medium text-[#475467]'>
                {selectedDateLabel}
              </span>
            </div>

            <div className='mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2'>
              <div className='rounded-xl border border-[#E8ECF1] bg-[#F8FAFC] p-4'>
                <h3 className='text-[15px] font-semibold text-[#212529]'>Events on Selected Date</h3>

                {selectedDateEvents.length > 0 ? (
                  <div className='mt-3 space-y-3 list-stagger'>
                    {selectedDateEvents.map((event, index) => {
                      const style = eventTypeStyles[event.type] || eventTypeStyles.default
                      return (
                        <div
                          key={event.id}
                          className='rounded-lg border border-[#E8ECF1] bg-white p-3 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_16px_rgba(15,23,42,0.08)]'
                          style={{ '--stagger': index }}
                        >
                          <div className='flex items-start justify-between gap-3'>
                            <div>
                              <p className='text-[14px] font-semibold text-[#212529]'>{event.title}</p>
                              <p className='mt-1 text-[12px] text-[#667085]'>{event.detail}</p>
                            </div>
                            <span className={`inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-medium ${style.badgeClass}`}>
                              {style.label}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <p className='mt-3 rounded-lg border border-dashed border-[#D0D5DD] bg-white p-3 text-[13px] text-[#98A2B3]'>
                    No events on this date. Select a highlighted day to view details.
                  </p>
                )}
              </div>

              <div className='rounded-xl border border-[#E8ECF1] bg-[#F8FAFC] p-4'>
                <h3 className='text-[15px] font-semibold text-[#212529]'>{monthLabel} Highlights</h3>
                <div className='mt-3 space-y-3 list-stagger'>
                  {monthEvents.map((event, index) => {
                    const style = eventTypeStyles[event.type] || eventTypeStyles.default
                    return (
                      <div
                        key={event.id}
                        className='flex items-center justify-between gap-3 rounded-lg border border-[#E8ECF1] bg-white px-3 py-2 transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_16px_rgba(15,23,42,0.08)]'
                        style={{ '--stagger': index }}
                      >
                        <div>
                          <p className='text-[14px] font-medium text-[#212529]'>{event.title}</p>
                          <p className='text-[12px] text-[#667085]'>{event.detail}</p>
                        </div>
                        <div className='text-right'>
                          <p className='text-[12px] font-medium text-[#344054]'>
                            {event.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </p>
                          <span className={`mt-1 inline-flex h-6 items-center rounded-md border px-2 text-[11px] font-medium ${style.badgeClass}`}>
                            {style.label}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Admindashboard
