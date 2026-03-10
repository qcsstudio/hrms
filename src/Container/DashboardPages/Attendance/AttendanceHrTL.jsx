import React, { useEffect, useRef, useState } from 'react'
import { action, action2, group, vector, vector2 } from '../../../allAssetsImport/allAssets'
import DatePicker from 'react-datepicker'
import { FaAngleDown, FaRegCalendarAlt } from 'react-icons/fa'
import "react-datepicker/dist/react-datepicker.css";




const attandance = [

    {
        name: "Present",
        value: 10,
        status: "On Track"
    },
    {
        name: "Absent",
        value: 1,
        status: "Action"
    },
    {
        name: "Late",
        value: 2,
        status: "watch"
    },
    {
        name: "On Leave",
        value: 1,
        status: "Approved"
    },
    {
        name: "Not Marked",
        value: 1,
        status: "Follow Up"
    },
]
const employyeDetails = [
    {
        name: "Aman Raj",
        email: "aman.raj@company.com",
        department: "Engineering",
        role: "Employee",
        status: "Present",
        joining: "12 jun 2025",
        actionicon: action,
        actionicon1: action2



    },
    {
        name: "Pooja Sharma",
        email: "pooja@company.com",
        department: "HR",
        role: "Manager",
        status: "Late",
        joining: "03-feb-2025",
        actionicon: action,
        actionicon1: action2



    },
    {
        name: "Vivek Kumar",
        email: "vivek.kumar@company.com",
        department: "Sales",
        role: "Team Lead",
        status: "On Leave",
        joining: "---",
        actionicon2: group,
        actionicon3: vector


    },
    {
        name: "Neha Mehta",
        email: "neha.mehta@company.com",
        department: "Operations",
        role: "Not Marked",
        status: "Inactive",
        joining: "19-feb-25",

        actionicon4: vector2


    },
]

const DivDropdown = ({ value, options, onSelect }) => {
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
        <div ref={dropdownRef} className='relative w-full'>
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
                            className={`w-full text-left px-4 py-2 text-sm border-none shadow-none outline-none focus:outline-none focus:ring-0 transition-colors ${value === option ? 'bg-blue-50 text-[#111827] font-medium' : 'text-[#334155] hover:bg-blue-50 active:bg-blue-100'}`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}


const AttendanceHrTL = () => {
    const [activeFilter, setActiveFilter] = useState("All Employee");
    const [activeAttendanceTab, setActiveAttendanceTab] = useState("All Employees");
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [rangePreset, setRangePreset] = useState("Custom");
    const [locationFilter, setLocationFilter] = useState("Location");
    const [statusFilter, setStatusFilter] = useState("Status");

    const handleRangePresetChange = (preset) => {
        setRangePreset(preset);

        const today = new Date();
        const end = new Date(today);
        const start = new Date(today);

        if (preset === "Today") {
            setDateRange([start, end]);
            return;
        }

        if (preset === "Last 7 Days") {
            start.setDate(today.getDate() - 6);
            setDateRange([start, end]);
            return;
        }

        if (preset === "This Month") {
            start.setDate(1);
            setDateRange([start, end]);
            return;
        }

        if (preset === "Last Month") {
            const firstDayCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayPreviousMonth = new Date(firstDayCurrentMonth);
            lastDayPreviousMonth.setDate(0);
            const firstDayPreviousMonth = new Date(
                lastDayPreviousMonth.getFullYear(),
                lastDayPreviousMonth.getMonth(),
                1
            );
            setDateRange([firstDayPreviousMonth, lastDayPreviousMonth]);
            return;
        }

        setDateRange([null, null]);
    };

    const filteredAttendanceEmployees = employyeDetails.filter((item) => {
        if (activeAttendanceTab === "All Employees") return true
        if (activeAttendanceTab === "Not Marked") {
            return item.status === "Inactive" || item.role === "Not Marked"
        }
        return item.status === activeAttendanceTab
    })

    return (
        <>

            <div className='p-[15px] bg-[#F8F9FA] card-animate'>
                <div className='flex justify-between items-center gap-4 flex-wrap'>
                    <div>
                        <h1 className='font-bold text-[20px] text-[#212529]'>Attendance</h1>
                        <p className='text-[12px] text-[#000000]/35'>Track attendance, review exceptions, and manage regularization approvals.</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='h-[40px] border border-[#D1D5DB] bg-white rounded-lg px-5 py-2 text-sm font-medium text-[#344054] shadow-none outline-none focus:outline-none focus:ring-0 hover:bg-gray-50'>+ Download Report</button>
                        <button className='h-[40px] border border-[#C4DBFF] bg-[#EAF2FF] rounded-lg px-5 py-2 text-sm font-medium text-[#1677FF] shadow-none outline-none focus:outline-none focus:ring-0'>Policy</button>
                    </div>
                </div>
                <div className="flex bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2 mt-[20px] w-fit">
                    {['All Employee', 'My Team', 'Me'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveFilter(item)}
                            className={`px-4 py-2 rounded-lg border-none shadow-none outline-none transition-transform duration-200 focus:outline-none focus:ring-0 hover:-translate-y-[1px] hover:shadow-none active:scale-[0.99] ${activeFilter === item
                                    ? 'bg-white text-[#212529] border border-[#E5E7EB] shadow-sm'
                                    : 'bg-transparent text-[#6B7280]'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3 mt-[20px] w-full max-w-[980px]'>
                    <div className="relative">
                        <DatePicker
                            selected={startDate}
                            onChange={(update) => {
                                setDateRange(update);
                                setRangePreset("Custom");
                            }}
                            startDate={startDate}
                            endDate={endDate}
                            selectsRange
                            isClearable
                            placeholderText="Select date range"
                            dateFormat="dd MMM yyyy"
                            className='border border-[#DEE2E6] h-[40px] w-full rounded-lg pl-9 pr-10 text-[14px] font-medium text-[#344054] bg-white shadow-none outline-none focus:outline-none focus:ring-0'
                            wrapperClassName="w-full attendance-date-range"
                        />
                        <span className="pointer-events-none absolute left-3 top-2.5 text-gray-400">
                            <FaRegCalendarAlt />
                        </span>
                    </div>
                    <DivDropdown
                        value={rangePreset}
                        options={["Custom", "Today", "Last 7 Days", "This Month", "Last Month"]}
                        onSelect={handleRangePresetChange}
                    />
                    <DivDropdown
                        value={locationFilter}
                        options={["Location", "All Locations", "Delhi", "Mumbai", "Remote"]}
                        onSelect={setLocationFilter}
                    />
                    <DivDropdown
                        value={statusFilter}
                        options={["Status", "All", "Present", "Late", "On Leave", "Inactive"]}
                        onSelect={setStatusFilter}
                    />
                </div>
                {/* ........................................... */}
                <div className='mt-[20px] grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 list-stagger'>
                    {attandance.map((item, index) => (
                        <div key={index} className='bg-white border border-[#E5E7EB] px-4 py-5 font-medium rounded-lg space-y-2 surface-card' style={{ "--stagger": index }}>

                            <div className='font-medium'>
                                {item.name}
                                <div className='font-bold text-[23px]'>
                                    {item.value}
                                </div>
                            </div>
                            <div className={`rounded-md min-w-[92px] h-[26px] px-2 text-[12px] leading-none font-medium flex items-center justify-center ${item.status === "On Track" ? "text-[#10B981] border border-[#C5F5D5] bg-[#E9FFEF]" : item.status === "Action" ? "text-[#B91C1C] border border-[#FAC2C2] bg-[#FDECEC]" :
                                item.status === "watch" ? "text-[#F59E0B] border border-[#FDE2AD] bg-[#FFF3D6]" :
                                    item.status === "Approved" ? "text-[#334155] border border-[#D2D8E0] bg-[#F2F4F6]" : "text-[#F59E0B] bg-[#FFF3D6] border border-[#FDE2AD]"} `}>
                                {item.status}

                            </div>

                        </div>
                    ))}
                </div>


                {/* ................................. */}

                <div className='mt-[20px]'>
                    <div className="inline-flex w-fit bg-[#F4F4F5] border border-[#DEE2E6] rounded-[9px] px-1 py-1 gap-2">
                        {['All Employees', 'Present', 'Late', 'On Leave', 'Not Marked'].map((item) => (
                            <button
                                key={item}
                                onClick={() => setActiveAttendanceTab(item)}
                                className={`px-4 py-2 rounded-lg border-none shadow-none outline-none transition-transform duration-200 focus:outline-none focus:ring-0 hover:-translate-y-[1px] hover:shadow-none active:scale-[0.99] ${activeAttendanceTab === item
                                        ? 'bg-white text-[#212529] border border-[#E5E7EB] shadow-sm'
                                        : 'bg-transparent text-[#6B7280]'
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                    <div className="mt-6">
                        <table className="w-full border-separate border-spacing-y-4">

                            {/* HEADER */}
                            <thead>
                                <tr className="text-[#8F97A3] text-[16px] font-medium">
                                    <th className="text-left pl-6">Employee</th>
                                    <th className="text-left">Department</th>
                                    <th className="text-left">Role</th>
                                    <th className="text-left">Status</th>
                                    <th className="text-left">Joining</th>
                                    <th className="text-right pr-6">Action</th>
                                </tr>
                            </thead>

                            {/* BODY */}
                            <tbody className="list-stagger">
                                {filteredAttendanceEmployees.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white/90 border border-[#E5E7EB] rounded-[6px] shadow-[0_1px_2px_rgba(15,23,42,0.05)] transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_4px_10px_rgba(15,23,42,0.08)]"
                                        style={{ "--stagger": index }}
                                    >
                                        {/* Employee */}
                                        <td className="pl-6 py-3 rounded-[6px]">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#D9D9D9]" />
                                                <div>
                                                    <div className="text-[15px]">
                                                        {item.name}
                                                    </div>
                                                    <div className="text-xs text-[#000000]/35">
                                                        {item.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Department */}
                                        <td className="py-3 text-[15px]">
                                            {item.department}
                                        </td>

                                        {/* Role */}
                                        <td className="py-3 text-[15px]">
                                            {item.role}
                                        </td>

                                        {/* Status */}
                                        <td className="py-3">
                                            <span className={`inline-flex items-center justify-center px-3 h-7 rounded-md text-xs font-medium
                                                            ${item.status === "Present"
                                                        ? "bg-[#ECFDF3] text-[#2B8A3E] border border-[#D3F9D8]"
                                                        : item.status === "On Leave"
                                                            ? "bg-[#F2F4F6] text-[#334155] border border-[#D2D8E0]"
                                                            : item.status === "Late"
                                                                ? "bg-[#FFF3D6] text-[#F59E0B] border border-[#FDE2AD]"
                                                                : "bg-[#FDECEC] text-[#B91C1C] border border-[#FAC2C2]"
                                                    }`}>
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Joining */}
                                        <td className="py-3 text-xs text-[#6B7280]">
                                            {item.joining || "-----"}
                                        </td>

                                        {/* Action */}
                                        <td className="pr-6 py-3 rounded-[6px] ">
                                            <div className="flex justify-end gap-3 table-action-icons">
                                                {item.actionicon && <img src={item.actionicon} />}
                                                {item.actionicon1 && <img src={item.actionicon1} />}
                                                {item.actionicon2 && <img src={item.actionicon2} />}
                                                {item.actionicon3 && <img src={item.actionicon3} />}
                                                {item.actionicon4 && <img src={item.actionicon4} />}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>


                </div>
            </div>
        </>
    )
}

export default AttendanceHrTL

