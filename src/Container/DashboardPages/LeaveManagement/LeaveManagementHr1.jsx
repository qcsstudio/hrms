import React from 'react'
import {action }from '../../../allAssetsImport/allAssets'

 const leavebalance=[
  {
    name:"Aman raj",
    email:"aman.raj@company.com",
    annual:10,
    sick:7,
    casual:7,
    status:"History",
    icon:action

  },
  {
    name:"Aman raj",
    email:"aman.raj@company.com",
    annual:2,
    sick:6,
    casual:1,
    status:"Low",
     icon:action

  },
 ]

 const reports=[
    {
   name:"Monthly Leave Summary",
     value:"Download / Pending / Rejected + Totals",
     status:"Download"   
    },
    {
   name:" Department Wise Leave Report",
     value:"Trends by team/ department",
     status:"Download"   
    },
    {
   name:"Leave type Usage ",
     value:"CL/ SL / AL / WFH",
     status:"Download"   
    },
 ]
 const Holiday=[
    {
   name:"Republic Day",
     value:"Jan 26, 2026 • National Holiday",
     status:"Fixed"   
    },
    {
   name:"Holi",
     value:"Mar 14, 2026 • Regional",
     status:"Regional"   
    },
    {
   name:"Priya Singh • WFH",
     value:"Apr 11 • 1 day • Reason: Home maintenance",
     status:"Fixed"   
    },
 ]

const LeaveManagementHr1 = () => {
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
 <div className='mt-[15px]'>
    <ul className='flex justify-between font-medium text-[18 px] text-[#8F97A3] border-b-2 border-[#E3E5E8] '>
        <li className='pl-[30px]'>Date</li>
        <li>Annual</li>
        <li>Sick</li>
        <li>Casual</li>
        <li className='pr-[40px]'>Action</li>
    </ul>
    {leavebalance.map((item,index)=>(
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
        <div  className='w-[90px] font-medium'>
            {item.sick}
        </div>
        <div  className='w-[90px] font-medium'>
            {item.casual}
        </div>
        <div className='flex gap-[10px]  '>
        <div  className={` h-[26px] rounded-md ${item.status==="History"?"bg-[#F2F4F6] w-[77px] text-center border border-[#D2D8E0] text-[#334155]":
            "text-[#B91C1C] bg-[#FDECEC] w-[77px] text-center border border-[#FAC2C2]"}`}>
            {item.status}
        </div>
            <img className='w-[25px] h-[25px]' src={item.icon}/>

        </div>
        
        
        </div>
    ))}
 </div>
 {/* 222222222222222222222222222222 */}
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
 
 {reports.map((item,index)=>(
    <div key={index}className='bg-[#F8F9FA] mt-[10px] rounded-md flex justify-between h-[50px] items-center'>
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


 {/* 333333333333333333333333333333 */}
 <div className='mt-[20px]'>

 <div className='flex justify-between'>
    <div>
  <h1 className='font-bold text-[24px] '>Holidays</h1>
  <p className='text-gray-300 text-[14px]'>Used for leave calculations adn future sandwich reules.</p>

  </div>
    <div>
           <button className='bg-[#0575E6]  rounded-md font-medium text-[14px] w-[118px] h-[40px] text-[white]'>Add Holiday</button>
    </div>
    </div>


    <div className='bg-[white]'>
        {Holiday.map((item,index)=>(
            <div key={index} className='bg-[#F8F9FA] mt-[15px] rounded-md flex justify-between h-[50px] items-center'>
                <div>
                <div>
                    {item.name}
                </div>
                <div className='text-gray-300 text-[14px]'>
                    {item.value}
                </div>
                </div>
                <div className={` h-[32px] w-[75px] rounded-md text-center font-medium       ${item.status==="Fixed"?"text-[#2B8A3E] border border-[#D3F9D8] bg-[#ECFDF3]":"text-[#7C6EFF] bg-[#F1EDFF] w-[97px] border border-[#DCD3FF]"}`}>
                    {item.status}
                </div>
            </div>
        ))}
    </div>

 </div>






</div>
  )
}

export default LeaveManagementHr1
