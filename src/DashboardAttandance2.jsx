import React from 'react'
import { action, action2, group, vector, vector2 } from './allAssetsImport/allAssets'




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
        name: "late",
        value: 2,
        status: "watch"
    },
    {
        name: "Present",
        value: 1,
        status: "Approved"
    },
    {
        name: "Present",
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
        status: "Active",
        joining: "12 jun 2025",
        actionicon: action,
        actionicon1: action2



    },
    {
        name: "Pooja Sharma",
        email: "pooja@company.com",
        department: "HR",
        role: "Manager",
        status: "Active",
        joining: "03-feb-2025",
        actionicon: action,
        actionicon1: action2



    },
    {
        name: "Vivek Kumar",
        email: "vivek.kumar@company.com",
        department: "Sales",
        role: "Team Lead",
        status: "Pending Invite",
        joining: "---",
        actionicon2: group,
        actionicon3: vector


    },
    {
        name: "Neha Mehta",
        email: "neha.mehta@company.com",
        department: "Operations",
        role: "Employee",
        status: "Inactive",
        joining: "19-feb-25",

        actionicon4: vector2


    },
]


const DashboardAttandance2 = () => {
    return (
        <>

            <div className='p-[15px] bg-[#F8F9FA] '>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-[22px]'>Attendance</h1>
                        <p className='text-[14px] text-gray-300'>Track attendance, review exceptions, and manage regularization approvals.</p>
                    </div>
                    <div className='flex gap-2'>
                        <button className='border border-[#868E961A] text-[#344054]  bg-[#E4E9EE4D] box-border w-[200px] h-[40px] rounded-lg '>+ Download Report</button>
                        <button className='border border-[#C4DBFF] bg-[#EAF2FF] h-[40px] w-[94px] box-border rounded-lg text-[#1677FF] font-bold'>Policy</button>
                    </div>


                </div>

                <div className='border border-[#DEE2E6] bg-[#F4F4F5] w-[283px] justify-around flex mt-[20px] h-[40px] rounded-md'>
                    <button>All Employees</button>
                    <button>My Team</button>
                    <button>Me</button>
                </div>
                <div className='flex justify-between mt-[10px] w-[77%] mt-[20px] '>
                    <select className='border border-[#DEE2E6] w-[230px] h-[40px] rounded-md '>
                        <option>dd-mm-yyyy</option>
                        <option>..</option>
                    </select>
                    <select className='border border-[#DEE2E6] w-[230px] h-[40px] rounded-md'>
                        <option>This Month</option>
                        <option>...</option>
                    </select>
                    <select className='border border-[#DEE2E6] w-[230px] h-[40px] rounded-md'>
                        <option>Location</option>
                        <option>...</option>
                    </select>
                    <select className='border border-[#DEE2E6] w-[230px] h-[40px] rounded-md'>
                        <option>Status</option>
                        <option>..</option>
                    </select>
                </div>
                {/* ........................................... */}

                <div className='mt-[20px] flex justify-between'>


                    {attandance.map((item, index) => (
                        <div key={index} className='w-[240px] h-[110px] bg-[white]'>
                            <div>
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
                    <div className='border-b-2  border-[#8F97A3] mt-[20px]'>
                        <ul className='flex justify-between text-[#8F97A3]'>
                            <li className='w-[270px]' >Employee</li>
                            <li >Department</li>
                            <li>Role</li>
                            <li >Status</li>
                            <li>Joining</li>
                            <li>Action</li>
                        </ul>
                    </div>
                    <div>
                        {employyeDetails.map((item, index) => (
                            <div key={index} className=' border border-[#0000001A] flex justify-between h-[70px] mt-[15px] bg-[white] rounded-md items-center'>
                                <div className='flex gap-[10px]' >
                                    <div className='h-[40px] w-[40px] rounded-full bg-[#D9D9D9]'>
                                    </div>

                                    <div>
                                        <div>
                                            {item.name}

                                        </div>
                                        <div className='text-gray-300 w-[270px]'>
                                            {item.email}

                                        </div>

                                    </div>

                                </div>
                                <div className=' w-[120px]'>
                                    {item.department}

                                </div>
                                <div >
                                    {item.role}

                                </div>
                                <div className="w-[130px] flex justify-center">

                                <div className={` w-[120px] rounded h-[26px] text-center ${item.status==="Active"?"text-[#2B8A3E] border border-[#D3F9D8] bg-[#ECFDF3]":item.status==="Pending Invite"?"text-[#334155] border border-[#D2D8E0]  bg-[#F2F4F6] text-[#334155]":"text-[#B91C1C] border border-[#FAC2C2] bg-[#FDECEC]"}`}>
                                    {item.status}

                                </div>

                                </div>
                                <div className='text-[#52525B]'>
                                    {item.joining}

                                </div>
                                <div className='flex items-start gap-2  '>
                                    {item.actionicon && <img src={item.actionicon} />}
                                    {item.actionicon1 && <img src={item.actionicon1} />}
                                    {item.actionicon2 && <img src={item.actionicon2} />}
                                    {item.actionicon3 && <img src={item.actionicon3} />}
                                    {item.actionicon4 && <img src={item.actionicon4} />}

                                </div>
                            </div>

                        ))}
                    </div>




                </div>











            </div>



        </>
    )
}

export default DashboardAttandance2
