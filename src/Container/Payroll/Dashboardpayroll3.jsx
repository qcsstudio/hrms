import React from 'react'
import Summrycardcomponent from './Summrycardcomponent'


const taxSheet = [
  { name: "Total Gross ", value: "9,40,000" },
  { name: "Total Deduction", value: "12,000" },
  { name: "Taxable Income", value: "22,000" },
  { name: "TDS Deduction", value: "28,000" },
  { name: "Projected Tax", value: "102,500" },
  { name: "Remaining", value: "7,500" }, 
];
const TDS=[
  { month: "Dec 2025", value: "Net: ₹ 78,420",gross:"1,05,000",tds:"1200",pf:"4,200",staus:"Open payslip" },
 
]



const Dashboardpayroll3 = () => {
  return (
      <>
      <div className='p-6 bg-gray-50'>

      <Summrycardcomponent/>
      {/* ....................... */}

      <div>
         <div className="mt-5">
        <h1 className="font-bold text-[22px]">Payroll</h1>
        <p className="text-[14px] text-gray-300">
          Your payslips, salary structure, tax documents, and payroll support.
        </p>
      </div>

      {/* Tabs + Dropdown */}
      <div className="mt-5 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-wrap md:flex-nowrap gap-2 border border-[#DEE2E6] bg-[#F3F3F4] rounded-md h-[40px]">
          <button className="px-3">Payslips</button>
          <button className="px-3">Payslip</button>
          <button className="px-3">Tax-Sheet</button>
          <button className="px-3">Tax & Docs</button>
          <button className="px-3">Bank & Payment</button>
          <button className="px-3">Claims</button>
        </div>

        <select className="border border-[#DEE2E6] bg-[#F3F3F4] rounded-md h-[40px] w-full md:w-[220px]">
          <option>This month</option>
          <option></option>
        </select>
      </div>
      </div>
      <div>
          <div className="mt-2 space-y-3 bg-[white]  ">
            <div className='w-[100%] flex gap-[10px]   flex-wrap '>

         
              {taxSheet.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] flex justify-between mt-[5px]  w-[49%] items-center rounded-md h-[48px] px-4"
                >
                  <div className="text-[#000000] text-[12px]">{item.name}</div>
                  <div className="font-medium text-[#000000]">{item.value}</div>
                </div>
              ))}
                 </div>
            </div>
      </div>
      <div className='mt-[30px]'>
        <h1>Monthly TDS Deduction</h1>

        <div className='mt-[10px] border-b-2 border-[#E3E5E8]  '>
          <ul className="text-[#8F97A3] flex gap-[220px] px-[20px]  bg-[#F9FAFB]  ">
            <li>Month</li>
            <li>Gross</li>
            <li>TDS</li>
            <li>PF</li>
          </ul>

         

        </div>
         <div className='mt-[10px] '>
            {TDS.map((item, index) => (
              <div key={index} className='flex gap-[200px] border border-[#0000001A] rounded-md h-[64px] items-center px-4'>
                
                <div >
                  {item.month}
                  <div className='text-[12px] text-gray-300'>

                  {item.value}
                  </div>
                </div>
                <div>
                  {item.gross}
                </div>
              
               
               
                <div className=' w-[60px]'>{item.tds}</div>
                <div className='w-[100px]'>{item.pf}</div>
                <div className='border border-[#868E961A]  bg-[#E4E9EE4D] text-[p#344054] rounded-md text-center text-[14px] w-[100px] h-[26px]'>{item.staus}</div>
              </div>
            ))}
          </div>


       
      </div>




      </div>
        
      </>  
  )
}

export default Dashboardpayroll3
