import React from 'react'

const days=[
  {
    name:"On Leave Today",
    value:12,
    title:"In your team"
  },
  {
    name:"Upcoming(7 days",
    value:31,
    title:"Plan Coverage"
  },
  {
    name:"Pending approvals",
    value:12,
    title:"Need action"
  },
  {
    name:"Avg Approval Time",
    value: "9h",
    title:"SLA indicator"
  },
]
 const ApprovalQueue=[
  {
    name:"Neha Mehta • Casual Leave",
    title:"Apr 12 → Apr 13 • 2 days • Reason: Family function • ⚠ 2 team members already off",
  status:["Approve","Reject","Ask Info"]
  },
  {
    name:"Aman Raj • Sick Leave",
    title:"Apr 10 (Half day) • Attachment required",
   status:["Approve","Reject","Ask Info"]
  },
  {
    name:"Priya Singh • WFH",
    title:"Apr 11 • 1 day • Reason: Home maintenance",
  status:["Approve","Reject","Ask Info"]
  },
 ]


const LeaveManagement2 = () => {
  return (
    <>
    <div className='p-[10px] bg-gray-50'>

      {/* heading */}
       <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-[22px]'>Leave Management</h1>
                    <p className='text-[14px] text-gray-300'>Apply leaves, manage approvals, configure policies & balances.</p>
                </div>
                <div className='flex gap-[10px]'>
                    <button className='text-[#1677FF] border border-[#C4DBFF] font-medium bg-[#EAF2FF] rounded h-[40px] w-[93px]'>Policy</button>
                    <button className='bg-[#0575E6] font-medium text-[#E4E9EE] rounded h-[40px] w-[110px]'>Apply Leave</button>
                </div>
            </div>

            {/* 2222222 */}
            <div className='mt-[20px] border justify-between border-[#DEE2E6] rounded-md bg-[#F3F3F4] flex h-[40px] w-[290px] px-[6px] gap-[6px]'>
  <button >All Employees</button>
  <button className=' bg-white rounded-md text-[14px] w-[80px]'>My Team</button>
  <button>Me</button>
</div>

{/* 3333333333333333 */}
<div className='mt-[20px]'>

  <div className='flex w-[100%] gap-[15px] '>
    <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
      <option>dd-mm-yyyy</option>
      <option></option>
    </select>
    <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
      <option>This Month</option>
      <option></option>
    </select>
    <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
      <option>Location</option>
      <option></option> 
    </select>
    <select className='border border-[#DEE2E6] w-[230px] h-[40px] bg-[#FFFFFF] px-2 rounded-md'>
      <option>Status</option>
      <option></option>
    </select>
  </div>

</div>
<div className='flex mt-[30px] justify-between w-[100%]'>
  {days.map((item,index)=>(
    <div key={index} className='w-[300px] h-[110px] rounded-[10px]  bg-[white]'>
      <div className='font-medium  text-[17px]'>
        {item.name}
      </div>
      <div className='font-bold text-[23px]'>
        {item.value}
      </div>
      <div className='text-gray-300 text-[14px]'>
        {item.title}
      </div>

    </div>
  ))}
</div>

<div>
  <h1 className='font-medium text-[18px]'>Approval Queue</h1>
  <p className='text-gray-300 text-[14px]'>Approve / Reject / Ask for details. Overlap warnings keep staffing safe.</p>

  <div className='mt-[20px] bg-[white]'>
    {ApprovalQueue.map((item,index)=>(
      <div key={index} className='mt-[14px] bg-[#F8F9FA] flex justify-between'>
        <div>
        <div>
          {item.name}
        </div>
        <div className='text-gray-300 text-[14px] '>
          {item.title}
        </div>
        </div>
        
        <div className='flex gap-[10px]'>
        {item.status.map((status,i)=>(
        <div key={i} className={`  rounded-md h-[32px] w-[90px] text-center  ${status==="Approve"?"text-[white] bg-[#0575E6] ":
        status==="Reject"?"text-[#B91C1C] bg-[#FDECEC] border border-[#FAC2C2]":
        "text-[#344054] border border-[#868E961A] bg-[#E4E9EE4D]" }`}>
          {status}

        </div>
        ))}
        </div>
         
      </div>
    ))}

  </div>
</div>







    </div>
    
    
    
    
    </>
    
  )
}

export default LeaveManagement2
