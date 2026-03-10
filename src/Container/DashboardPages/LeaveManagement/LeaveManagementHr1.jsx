import React, { useEffect, useState } from 'react'
import { action } from '../../../allAssetsImport/allAssets'
import { createPortal } from 'react-dom'
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import createAxios from '../../../utils/axios.config';


const leavebalance = [
    {
        name: "Aman raj",
        email: "aman.raj@company.com",
        annual: 10,
        sick: 7,
        casual: 7,
        status: "History",
        icon: action

    },
    {
        name: "Aman raj",
        email: "aman.raj@company.com",
        annual: 2,
        sick: 6,
        casual: 1,
        status: "Low",
        icon: action

    },
]

const reports = [
    {
        name: "Monthly Leave Summary",
        value: "Download / Pending / Rejected + Totals",
        status: "Download"
    },
    {
        name: " Department Wise Leave Report",
        value: "Trends by team/ department",
        status: "Download"
    },
    {
        name: "Leave type Usage ",
        value: "CL/ SL / AL / WFH",
        status: "Download"
    },
]


const LeaveManagementHr1 = ({ holidayData }) => {
    const token = localStorage.getItem('authToken')
    const axiosInstance = createAxios(token)
    const Holiday = [
        {
            name: "Republic Day",
            value: "Jan 26, 2026 • National Holiday",
            status: "Fixed"
        },
        {
            name: "Holi",
            value: "Mar 14, 2026 • Regional",
            status: "Regional"
        },
        {
            name: "Priya Singh • WFH",
            value: "Apr 11 • 1 day • Reason: Home maintenance",
            status: "Fixed"
        },
    ]

    const [showDropdown, setShowDropdown] = useState(false)
    const [showSinglePopup, setShowSinglePopup] = useState(false)
    const [showBulkPopup, setShowBulkPopup] = useState(false)

    const [formHoliday,setFormHoliday] = useState({
        name:"",
        date:"",
        type:"",
        description:"",
        isNotification:false
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormHoliday((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleHolidaysubmit = async()=>{
        try {
            const res = await axiosInstance.post('/holiday',formHoliday,{
                meta:{auth:"ADMIN_AUTH"}
            })
            console.log(res?.data,"holiday res========")
        } catch (error) {
            console.log(error,"api is not working")
            toast.error(error?.response?.data?.message)
            
        }
    }



    return (
        <div className='p-[10px] bg-gray-50'>
            <div className='flex justify-between'>
                <div>
                    <h1 className='font-bold text-[24px] '>Leave Balance</h1>
                    <p className='text-gray-300 text-[14px]'>Credit / Debit Adjustment & Bulk Upload</p>

                </div>
                <div className='flex gap-[10px] h-[40px]'>
                    <button className='border border-[#868E961A] bg-[#E4E9EE4D] w-[163px]  rounded-md font-medium text-[14px] text-[#344054]'>Download Template</button>
                    <button className='border border-[#868E961A] bg-[#E4E9EE4D] w-[110px]  rounded-md font-medium text-[14px] text-[#344054]'>Upload CSV</button>
                    <button className='bg-[#0575E6]  rounded-md font-medium text-[14px] w-[118px]  text-[white]'>Export All</button>
                </div>
            </div>

            {/* leave Balance============================== */}
            <div className='mt-[15px]'>
                <ul className='flex justify-between font-medium text-[18 px] text-[#8F97A3] border-b-2 border-[#E3E5E8] '>
                    <li className='pl-[30px]'>Date</li>
                    <li>Annual</li>
                    <li>Sick</li>
                    <li>Casual</li>
                    <li className='pr-[40px]'>Action</li>
                </ul>
                {leavebalance.map((item, index) => (
                    <div key={index} className='flex  border justify-between mt-[16px] rounded-md  items-center border-[#0000001A] h-[64px]'>
                        <div className='flex items-center ml-[10px] gap-[8px]'>
                            <div className='bg-[#D9D9D9] rounded-full h-[35px] w-[35px]'>

                            </div>
                            <div className='w-[90px] font-medium '>


                                {item.name}
                                <div className='text-gray-300 text-[15px]'>

                                    {item.email}
                                </div>
                            </div>




                        </div>
                        <div className='w-[90px] font-medium'>
                            {item.annual}
                        </div>
                        <div className='w-[90px] font-medium'>
                            {item.sick}
                        </div>
                        <div className='w-[90px] font-medium'>
                            {item.casual}
                        </div>
                        <div className='flex gap-[10px]  '>
                            <div className={` h-[26px] rounded-md ${item.status === "History" ? "bg-[#F2F4F6] w-[77px] text-center border border-[#D2D8E0] text-[#334155]" :
                                "text-[#B91C1C] bg-[#FDECEC] w-[77px] text-center border border-[#FAC2C2]"}`}>
                                {item.status}
                            </div>
                            <img className='w-[25px] h-[25px]' src={item.icon} />

                        </div>


                    </div>
                ))}
            </div>
            {/* Reports======================= */}
            <div className='mt-[20px]'>
                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-[24px] '>Reports</h1>
                        <p className='text-gray-300 text-[14px]'>Download Summaries for audit and analysis</p>

                    </div>
                    <div>
                        <button className='bg-[#0575E6]  rounded-md font-medium text-[14px] w-[118px] h-[40px] text-[white]'>Export All</button>
                    </div>
                </div>

                <div className='bg-[white] mt-[20px]'>

                    {reports.map((item, index) => (
                        <div key={index} className='bg-[#F8F9FA] mt-[10px] rounded-md flex justify-between h-[50px] items-center'>
                            <div>
                                <div>
                                    {item.name}

                                </div>
                                <div className='text-gray-300 text-[14px]'>
                                    {item.value}

                                </div>

                            </div>
                            <div className='bg-[#E4E9EE4D] text-[#344054] w-[110px] font-medium text-center rounded h-[32px] border border-[#868E961A]'>
                                {item.status}

                            </div>
                        </div>
                    ))}


                </div>

            </div>


            {/* Holidays========================= */}
            <div className='mt-[20px]'>

                <div className='flex justify-between'>
                    <div>
                        <h1 className='font-bold text-[24px] '>Holidays</h1>
                        <p className='text-gray-300 text-[14px]'>Used for leave calculations adn future sandwich reules.</p>

                    </div>
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="bg-[#0575E6] rounded-md font-medium text-[14px] w-[118px] h-[40px] text-white"
                        >
                            Add Holiday
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-[140px] bg-white border border-gray-200 rounded-md shadow-lg z-50">

                                <div
                                    onClick={() => {
                                        setShowSinglePopup(true)
                                        setShowDropdown(false)
                                    }}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    Single
                                </div>

                                <div
                                    onClick={() => {
                                        setShowBulkPopup(true)
                                        setShowDropdown(false)
                                    }}
                                    className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                                >
                                    Bulk
                                </div>

                            </div>
                        )}
                    </div>
                </div>


                <div className='bg-[white]'>
                    {holidayData?.map((item, index) => (
                        <div key={index} className='bg-[#F8F9FA] mt-[15px] rounded-md flex justify-between h-[50px] items-center'>
                            <div>
                                <div>
                                    {item?.name}
                                </div>
                                <div className='text-gray-300 text-[14px]'>
                                    {item?.value}•{item?.description}
                                </div>
                            </div>
                            <div className={` h-[32px] w-[75px] rounded-md text-center font-medium ${item?.type === "Fixed" ? "text-[#2B8A3E] border border-[#D3F9D8] bg-[#ECFDF3]" : "text-[#7C6EFF] bg-[#F1EDFF] w-[97px] border border-[#DCD3FF]"}`}>
                                {item?.type}
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {showSinglePopup && createPortal(
                <div className="fixed inset-0 bg-black/60  flex  justify-end z-1000">
                    <div className="w-[543px] bg-white rounded-xl shadow-lg p-6 relative">
                        <div className='flex justify-between mb-10'>
                            <h1 className='font-medium'>Add Holiday</h1>
                            <button onClick={() => setShowSinglePopup(false)} className='bg-transparent'><RxCross2 className='bg-red' />
                            </button>

                        </div>
                        {/* name=========== */}
                        <div>
                            <h2>Name: </h2>
                            <div className='my-2 border p-2 rounded-lg border-[#868E96]'>
                                <input
                                 type='text'
                                 onChange={handleChange}
                                 name='name'
                                 value={formHoliday.name}
                                 placeholder='Enter holiday name'
                                  className='w-full focus:outline-none focus:outline-none focus:border-none focus:ring-0' />
                            </div>
                        </div>
                        {/* date=========== */}
                        <div>
                            <h2>Date: </h2>
                            <div className='my-2 border p-2 rounded-lg border-[#868E96]'>
                                <input
                                 type='date'
                                 onChange={handleChange}
                                 name='date'
                                 value={formHoliday.date}
                                  placeholder='Enter holiday name' 
                                  className='w-full focus:outline-none focus:outline-none focus:border-none focus:ring-0' />
                            </div>
                        </div>
                        {/* type=========== */}
                        <div>
                            <h2>Type: </h2>
                            <div className='my-2 border p-2 rounded-lg border-[#868E96]'>
                                {/* <input 
                                type='text'
                                onChange={handleChange}
                                name='type'
                                value={formHoliday.type}
                                 placeholder='Enter holiday type'
                                  className='w-full focus:outline-none focus:outline-none focus:border-none focus:ring-0' /> */}
                                  <select
                                    name='type'
                                    value={formHoliday.type}
                                    onChange={handleChange}
                                    className='w-full focus:outline-none focus:outline-none focus:border-none focus:ring-0'
                                  >
                                    <option value="FIXED">Fixed</option>
                                    <option value="REGIONAL">Regional</option>
                                    <option value="COMPANY_HOLIDAY">Company Holiday</option>
                                    <option value="SPECIAL_HOLIDAY">Special Holiday</option>
                                  </select>
                            </div>
                        </div>
                        {/* description=========== */}
                        <div>
                            <h2>Description: </h2>
                            <div className='my-2 border p-2 rounded-lg border-[#868E96]'>
                                <input 
                                type='text'
                                onChange={handleChange}
                                name='description'
                                value={formHoliday.description}
                                 placeholder='Enter holiday Description' 
                                 className='w-full focus:outline-none focus:outline-none focus:border-none focus:ring-0' />
                            </div>
                        </div>

                        {/* toggle button=========== */}
                        <div className='flex justify-between my-5'>
                            <h2>Push Notification</h2>
                            <button
                                    type="button"
                                    onClick={() => setFormHoliday((prev) => ({ ...prev, isNotification: !prev.isNotification }))}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 ${formHoliday.isNotification ? "bg-blue-500" : "bg-gray-300"
                                        }`}
                                >
                                    <span
                                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${formHoliday.isNotification ? "translate-x-5" : "translate-x-1"
                                            }`}
                                    />
                                </button>
                        </div>
                        {/* =================button============ */}
                        <div className='flex justify-end fixed bottom-10 float-end'>
                            <button className='bg-[#0575E6] px-4 py-2 text-white rounded-md ' onClick={handleHolidaysubmit}>Save</button>
                        </div>
                    </div>
                </div>, document.body
            )}
        </div>
    )
}

export default LeaveManagementHr1
