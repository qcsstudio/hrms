import React from 'react'
import { action } from '../../../allAssetsImport/allAssets'

const cards = [
    {
        name: "shift",
        time: "General (09:30-18:30)"
    },
    {
        name: "Expected Hours",
        time: "8h 30m"
    },
    {
        name: "Punch In / Out",
        time: "09:19 AM"
    },
    {
        name: "Over Time",
        time: "----"
    },
    {
        name: "Worked ",
        time: "6h 12m"
    },
    {
        name: "Break",
        time: "38m"
    },
]
const Attandance = [
    {
        name: "present",
        value: "General (09:30-18:30)"
    },
    {
        name: "Late",
        value: "2"
    },
    {
        name: "Absent",
        value: "1"
    },
    {
        name: "Not Marked",
        value: "1"
    },

]
const day = [
    {
        name: "Mon",
        value: "P"
    },
    {
        name: "Tue",
        value: "P"
    },
    {
        name: "Wed",
        value: "A"
    },
    {
        name: "Thu",
        value: "P"
    },
    {
        name: "Fri",
        value: "L"
    },
    {
        name: "Sat",
        value: "WO"
    },
    {
        name: "Sun",
        value: "WO"
    },
]

const requests = [
    {
        name: "Regularization • Apr 12",
        value: "Pending with Manager/HR • submitted 2 days ago",
        status: "Fixed",
        secstatus: "Open"

    },
    {
        name: "Regularization • Apr 12",
        value: "Pending with Manager/HR • submitted 2 days ago",
        status3: "view",


    }
]
const requests2=[
    {
        title:"Regularization • Apr 12",
        discription:"Pending with Manager/HR • submitted 2 days ago",
        status:"Pending"
    },
    {
       title:"Regularization • Apr 12",
        discription:"Pending with Manager/HR • submitted 2 days ago",
        status2:"Approved",
        status3:"Details"  
    }
]

const myattandanceLog=[
    {
        date:"Apr 24",
        punchIn:"09:18",
        Punchout:"---",
        Hours:"6h 12m",
        status:"Present",
        action:"View",
    },
    {
        date:"Apr 23",
        punchIn:"09:18",
        Punchout:"---",
        Hours:"---",
        status:"Not Marked",
        action:"Request",
    },
    {
        date:"Apr 22",
        punchIn:"---",
        Punchout:"---",
        Hours:"6h 12m",
        status:"Late",
        action:"View",
    },
]





const DashboardAttandanceEmployee = () => {
    return (
        <div className='p-[10px] bg-[#F8F9FA] '>

            <div className='flex  justify-between'>
                <div>
                    <h1 className='font-bold text-[20px]'>Attandance</h1>
                    <p className='text-gray-300 text-[14px]'>Track attendance, review exceptions, and manage regularization approvals.</p>
                </div>
                <div className='p-[10px] flex gap[8px] w-[25%] gap-[5px] border'>
                    <button className='border-2 border-[#868E961A] text-[#344054] rounded-md  bg-[#E4E9EE4D] p-[10px] font-medium'>+ Download Report</button>
                    <button className='text-[white] rounded-md bg-[#0575E6] p-[10px]'>Punch Out</button>
                </div>
            </div>

            <div className='flex gap-[10px]' >
                <select className='border border[#DEE2E6] font-medium bg-[#FFFFFF] w-[230px] h-[40px] p-[8px]  rounded'>
                    <option>dd-mm-yyyy</option>
                    <option></option>
                    <option></option>
                </select>
                <select className='border border[#DEE2E6] font-medium bg-[#FFFFFF] w-[230px] h-[40px] p-[8px] rounded'>
                    <option>This month</option>
                    <option></option>
                    <option></option>
                </select>

            </div>
            {/* 222222222222222222222222222222222222222222222222222 */}

            <div className='flex'   >
                <div className=' w-[50%] bg-[#FFFFFF]'>
                    <h1>My Actions</h1>
                    <p className='text-gray-300'>Self-service actions only.</p>

                    <div className=' flex flex-wrap w-[100%] gap-[12px] '>

                        {cards.map((item, index) => (
                            <div key={index} className='border-2 border-[#DEE2E6] rounden-md w-[48%] h-[84px] rounded  '>
                                <div className='text-gray-300 ml-[10px] mt-[15px]'>{item.name}</div>
                                <div className='ml-[10px] '>{item.time}</div>

                            </div>
                        ))}
                    </div>
                </div>
                {/* '''''''''''''''''''''''''''''''''''''' */}
                <div className=' w-[50%] bg-[#FFFFFF]   '>


                    <div className='flex justify-between'>
                        <div>
                            <h1 className='font-medium'>This Month</h1>
                            <p className='text-gray-300 text-[14px]'>Quick monthly overview (P/L/A/NM)</p>

                        </div>
                        <div className='mr-[12px]'>
                            <button className='border-2 border-[#868E961A] text-[#344054] rounded-md  bg-[#E4E9EE4D] h-[40px] font-medium'>Open Full Calandar</button>
                        </div>
                    </div>
                    <div>
                        <div className='flex  w-[100%] flex-wrap gap-[12px]'>
                            {Attandance.map((item, index) => (
                                <div key={index} className='border-2 border-[#DEE2E6] rounden-md w-[48%] h-[84px] rounded '>
                                    <div className='text-gray-300 ml-[10px] mt-[15px]'>{item.name}</div>
                                    <div className='ml-[10px] '>{item.value}</div>

                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='flex w-full  justify-between mt-[25px] '>
                        {day.map((item, index) => (
                            <div key={index} className='border-2 border-[#DEE2E6] rounded-md w-[70px] h-[75px] text-center  '>
                                <div className='font-medium text-[19px]'>{item.name}</div>

                                <div className={` font-bold text-[22px] bg-[#ECFDF3] w-[40px] h-[34px] ml-[12px] 
                                ${item.value === "P" ? "text-green-500" : item.value === "A" ? "text-red-500" : item.value === "L" ? "text-yellow-500" : "text-blue-900"} `}>{item.value}</div>



                            </div>

                        ))}
                    </div>



                </div>





            </div>

            {/* 3333333333333333333333333333333333333333333333333 */}
            <div className=' mt-[20px]'>
 
               <div className='flex justify-between w-[100%]  '>
                    <div >
                        <h1 className='font-bold text-[23px] w-[100%]' >Exceptions & My Requests</h1>
                        <p className='text-gray-300 text-[14px]'>Fix issues quickly and track approvals</p>
                    </div>
                    <div>
                        <button className='text-[white] rounded-md bg-[#0575E6] p-[10px]'>New Regularization +</button>
                    </div>
                </div>
         
            <div className='mt-[30px] flex justify-between w-[100%]  '>
                <div  className='w-[50%] '>
                  

                
                    <div className='w-[100%] mt-[20px]' >

                        <h1 className='font-medium'>My Requests</h1>
                        <div>
                            {requests.map((item, index) => (
                                <div key={index} className='  mt-2 rounded-lg ' >
                                    <div className='flex justify-between bg-gray-100 mt-[10px]  rounded-md p-2 box-border  ' >

                                        <div className=' mt-[10px]'    >
                                            <div>{item.name}</div>
                                            <div>

                                            </div>
                                            <div className='text-gray-300 text-[14px]'>{item.value}</div>

                                        </div>
                                        <div className='flex gap-3 items-center flex-nowrap'>
                                            {item.status && (
                                                <div className='bg-[#0575E6] text-white px-3 py-1 rounded whitespace-nowrap'>
                                                    {item.status}
                                                </div>
                                            )}

                                            {item.secstatus && (
                                                <div className='border border-[#868E961A] bg-[#E4E9EE4D] text-[#344054] px-3 py-1 rounded whitespace-nowrap'>
                                                    {item.secstatus}
                                                </div>
                                            )}

                                            {item.status3 && (
                                                <div className='border border-[#868E961A] bg-[#E4E9EE4D] text-[#344054] px-3 py-1 rounded whitespace-nowrap'>
                                                    {item.status3}
                                                </div>
                                            )}
                                        </div>


                                    </div>
                                </div>

                            ))}
                        </div>
                           


                    </div>



                </div>
               
               <div className='w-[49%] '>

                    <div className=' w-[100%] mt-[20px]' >

                        <h1 className='font-medium'>My Requests</h1>
                        <div >
                            {requests2.map((item,index)=>(
                                <div key={index} className='mt-[10px]'  >
                                   <div  className=' bg-gray-100  p-2  rounded-md flex justify-between items-center  '>
                                    <div className='mt-[10px]'>
                                        
                                    <div >{item.title}</div>
                                    <div  className='text-gray-300 text-[14px]'>{item.discription}</div>
                                    </div>


                                         <div>
                                        {item.status && (
                                            <div className='border border-[#868E961A] bg-[#E4E9EE4D] px-3 py-1 text-[#344054] px-3 py-1 rounded whitespace-nowrap'>
                                                {item.status}
                                            </div>
                                        )}
                                      
                                        <div className='flex gap-2'>
                                            {item.status2 && (
                                                <div className='text-[#2B8A3E] border-border[#D3F9D8] px-3 py-1 bg-[#ECFDF3]' >{item.status2}</div>
                                                
                                            )}
                                            {item.status3 && (
                                                <div className='border border-[#868E961A] bg-[#E4E9EE4D] font-medium text-[#344054] px-3 py-1 rounded whitespace-nowrap' >{item.status3}</div>
                                            )}
                                        </div>
                                    </div>

                                    
                                   </div>
                               
                                </div>
                            ))}
                        </div>


                    </div>


               </div>

            </div>


        </div>


<div className='mt-[30px] '>
    <div className='flex justify-between'>
        <div>
        <h1 className='font-bold text-[22px]'>My Attendance Log</h1>
        <p className='text-gray-300 text-[14px]' >Last 7 days (Quick Audit)</p>

        </div>
        <div>
            <button className='text-[white] rounded-md bg-[#0575E6] p-[10px] w-[180px]'>View Full History</button>
        </div>
        </div>

        <div className='mt-[4px] border-b'>
            <ul className='flex justify-between text-[#8F97A3] border-b-2 border-[#8F97A3] text-[20px] p-4'>
                <li>Date</li>
                <li>In</li>
                <li>Out</li>
                <li>Hours</li>
                <li>Status</li>
                <li>Action</li>
            </ul>
            <div className='mt-[20px]' >
                {myattandanceLog.map((item,index)=>(
                    <div key={index} className='flex justify-between border-2 p-5 border-[#0000001A] h-[73  px] w-[100%] mt-[15px] rounded-md items-center bg-[white]'>
                        <div>
                            {item.date}
                        </div>
                        <div>
                            {item.punchIn}
                        </div>
                        <div>
                            {item.Punchout}
                        </div>
                        <div>
                            {item.Hours}
                        </div>


                        <div className={` rounded h-[27px] text-center   ${item.status==="Present"?" text-[#2B8A3E] bg-[#ECFDF3] w-[73px] ": item.status==="Not Marked" ?"text-[#334155] w-[96px]  bg-[#F2F4F6] border border-[#D2D8E0]":  "text-[#F59E0B] w-[54px] border border-[#FDE2AD] bg-[#FFF3D6] "}`} >
                           {item.status}
                        </div>


                                


                        <div className={` h-[35px] rounded-md flex items-center justify-evenly ${item.action==="Request"?"text-[white] bg-[#0575E6] w-[94px]":"text-[#344054] bg-[#E4E9EE4D] w-[72px] border border-[#868E961A]"}`}>
                           {item.action}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    



</div>



            




        </div>
    )
}

export default DashboardAttandanceEmployee
