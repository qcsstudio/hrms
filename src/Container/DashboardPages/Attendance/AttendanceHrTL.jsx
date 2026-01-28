import React from 'react'
import { action, action2, group, vector, vector2 } from '../../../allAssetsImport/allAssets'




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


const AttendanceHrTL = () => {
    return (
        <>

            <div className='p-[15px] bg-[#F8F9FA] '>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-[20px] text-[#212529]'>Attendance</h1>
                        <p className='text-[12px] text-[#000000]/35'>Track attendance, review exceptions, and manage regularization approvals.</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='border border-[#868E961A] text-[#344054]  bg-[#E4E9EE4D] box-border w-[200px] h-[40px] rounded-lg '>+ Download Report</button>
                        <button className='border border-[#C4DBFF] bg-[#EAF2FF] h-[40px] w-[94px] box-border rounded-lg text-[#1677FF] font-bold'>Policy</button>
                    </div>
                </div>
                <div className='border border-[#DEE2E6] bg-[#F4F4F5] w-[283px] justify-evenly flex mt-[20px] h-[40px] rounded-md text-[#212529] '>
                    <button>All Employees</button>
                    <button>My Team</button>
                    <button>Me</button>
                </div>
                <div className='grid grid-cols-4 gap-3 justify-evenly mt-[10px] w-[77%] mt-[20px]  '>
                    <select className='border border-[#DEE2E6]  h-[40px] rounded-md text-[#344054] font-semibold text-[#344054] '>
                        <option>dd-mm-yyyy</option>
                        <option>..</option>
                    </select>
                    <select className='border border-[#DEE2E6]  h-[40px] rounded-md text-[#344054] font-semibold'>
                        <option>This Month</option>
                        <option>...</option>
                    </select>
                    <select className='border border-[#DEE2E6]  h-[40px] rounded-md text-[#344054] font-semibold'>
                        <option>Location</option>
                        <option>...</option>
                    </select>
                    <select className='border border-[#DEE2E6]  h-[40px] rounded-md text-[#344054] font-semibold'>
                        <option>Status</option>
                        <option>..</option>
                    </select>
                </div>
                {/* ........................................... */}
                <div className='mt-[20px] grid grid-cols-5 justify-evenly gap-3'>
                    {attandance.map((item, index) => (
                        <div key={index} className=' bg-[white]  px-4 py-5 font-medium rounded-lg space-y-2'>

                            <div className='font-medium'>
                                {item.name}
                                <div className='font-bold text-[23px]'>
                                    {item.value}
                                </div>
                            </div>
                            <div className={` rounded-[4px] w-[77px] h-[26px] text-[15px] flex items-center justify-evenly ${item.status === "On Track" ? "text-[#10B981] border border-[#C5F5D5] bg-[#E9FFEF]" : item.status === "Action" ? "text-[#B91C1C] border border-[#FAC2C2] bg-[#FDECEC]" :
                                item.status === "watch" ? "text-[#F59E0B] border border-[#FDE2AD] bg-[#FFF3D6]" :
                                    item.status === "Approved" ? "text-[#334155] border border-[#D2D8E0] bg-[#F2F4F6]" : "text-[#F59E0B] bg-[#FFF3D6] border border-[#FDE2AD]"} `}>
                                {item.status}

                            </div>

                        </div>
                    ))}
                </div>


                {/* ................................. */}

                <div className='mt-[20px]'>
                    <div className='w-[495px] flex justify-around border border-[#DEE2E6] h-[40px] rounded-[5px] font-medium text-[#212529]'>
                        <button>All Employees</button>
                        <button>Present</button>
                        <button>Late</button>
                        <button>On Leave</button>
                        <button>Not Marked</button>
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
                            <tbody>
                                {employyeDetails.map((item, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border border-[#E5E7EB] rounded-xl"
                                    >
                                        {/* Employee */}
                                        <td className="pl-6 py-4">
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
                                        <td className="py-4 text-[15px]">
                                            {item.department}
                                        </td>

                                        {/* Role */}
                                        <td className="py-4 text-[15px]">
                                            {item.role}
                                        </td>

                                        {/* Status */}
                                        <td className="py-4">
                                            <span
                                                className={`inline-flex items-center justify-center px-3 h-7 rounded-md text-xs 
                                                            ${item.status === "Active"
                                                        ? "bg-[#ECFDF3] text-[#2B8A3E] border border-[#D3F9D8]"
                                                        : item.status === "Pending Invite"
                                                            ? "bg-[#F2F4F6] text-[#334155] border border-[#D2D8E0]"
                                                            : "bg-[#FDECEC] text-[#B91C1C] border border-[#FAC2C2]"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>

                                        {/* Joining */}
                                        <td className="py-4 text-xs text-[#6B7280]">
                                            {item.joining || "-----"}
                                        </td>

                                        {/* Action */}
                                        <td className="pr-6 py-4">
                                            <div className="flex justify-end gap-3">
                                                {item.actionicon && <img src={item.actionicon} />}
                                                {item.actionicon1 && <img src={item.actionicon1} />}
                                                {item.actionicon2 && <img src={item.actionicon2} />}
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
