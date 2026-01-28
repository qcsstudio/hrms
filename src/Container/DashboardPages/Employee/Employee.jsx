import React from 'react'
import { statslogo1, statslogo2, statslogo3, statslogo4 } from '../../../allAssetsImport/allAssets'

const employee = [
    {
        title: "Attandance",
        value: "92 %",
        status: "Stable",
        icon: statslogo1
    },
    {
        title: "Leave Balance",
        value: "12.2",
        status: "1 Pending",
        icon: statslogo2
    },
    {
        title: "late marks",
        value: "2",
        status: "Watch",
        icon: statslogo3
    },
    {
        title: "my Requests",
        value: "1 %",
        status: "In Progress",
        icon: statslogo4
    },
]

const actionss = [
    {
        title: "Request attendance regularization",
        discription: "Missed punch / late mark correction",
        button: "Request"
    },
    {
        title: "View documents",
        discription: "Offer letter, policies, uploads",
        button2: "Open"
    },
    {
        title: "Raise a helpdesk request",
        discription: "HR / IT / Admin support",
        button3: "Raise"
    },
]


const Employee = () => {
    return (
        <>
            <div className='bg-gray-50 p-5'>
                <div className='flex justify-between  p-[14px] '>
                    <div>
                        <h1 className='font-bold text-[20px] text-[#212529]'>Employees</h1>
                        <p className='text-[12px] text-[#000000]/35'>Manage employee directory, documents, and role-based actions.</p>
                    </div>

                    <button className='bg-[#0575E6] text-[#FFFFFF]  rounded-md w-[150px] h-[40px]'>Apply Leave</button>

                </div>
                <div className='flex gap-3 bg-[white] m-[20px]'>
                    <div>
                        <img className='w-[76px] h-[76px] bg-[#F0F3FF] p-[10px]' src={statslogo1} />
                    </div>
                    <div className='space-y-2'>
                        <h1 className=' text-[14px] font-medium text-[#000000]/45'>Natasia Bunny</h1>
                        <p className='text-[12px] text-[#000000]/35'>EMP-1003 • Team Lead (Sales) • Bengaluru<br />Reports to Sarah Johnson • Status: Active • Employment: Full-time</p>
                        <p className='text-[#1E3A8A] bg-[#F1F5FF] w-[190px] text-center'>natasia@company.com</p>
                    </div>
                </div>
                <div className='flex '>
                    <div className='grid grid-cols-2 gap-[20px] w-[60%] m-[20px] '>
                        {employee.map((item, index) => (
                            <div
                                key={index}
                                className='flex bg-white h-[137px] justify-between items-center p-5'
                            >
                                <div>
                                    <div className='font-medium'>{item.title}</div>
                                    <div className='text-[22px] font-bold'>{item.value}</div>
                                    <div className='bg-[#E9FFEF] rounded-md w-24 h-6 text-center border-[#C5F5D5] text-[#10B981]'>
                                        {item.status}
                                    </div>
                                </div>

                                <div className='w-[50px] h-[50px]'>
                                    <img src={item.icon} alt="" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='m-[20px] w-[40%] bg-[white]'>
                        <div className='p-[10px]'>
                            <h1>My Actions</h1>
                            <p className='text-gray-300 text-[14px]'>Self-service actions only.</p>
                        </div>
                        {actionss.map((item, index) => (
                            <div key={index}>

                                <div className='flex justify-between w-[514px] bg-[#F8F9FA] m-[14px] h-[50px] p-[10px]'>
                                    <div>
                                        <div>{item.title}</div>
                                        <div className='text-gray-300 text-[14px]' >{item.discription}</div>

                                    </div>
                                    <div>
                                        <div className='text-[white] bg-[#0575E6] rounded-md h-[30px] w-[80px]  text-center'>

                                            {item.button}
                                            {item.button2}
                                            {item.button3}
                                        </div>









                                    </div>
                                </div>


                            </div>
                        ))}
                    </div>
                </div>






            </div>





        </>
    )
}

export default Employee
