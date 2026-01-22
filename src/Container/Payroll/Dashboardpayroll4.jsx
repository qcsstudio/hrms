import React from 'react'
import Summrycardcomponent from './Summrycardcomponent'



const loans=[
    { name: "Active Loan", value: "1", },
    { name: "Total Outstanding", value: "72,000", },
    { name: "EMI (monthly)", value: "8,000", },

]
const ActiveLoan=[
  { loanid: "LN-9007", month: "Started: 2025",principal:"1,20,000",outstanding:"6,000",emi:"8,000",staus:"EMI Schedule" },
 
]
const Dashboardpayroll4 = () => {
  return (
    <div className='p-6 bg-gray-50'>
        <Summrycardcomponent/>


        
      <div>
         <div className="mt-5">
        <h1 className="font-bold text-[22px]">Payroll</h1>
        <p className="text-[14px] text-gray-300">
          Your payslips, salary structure, tax documents, and payroll support.
        </p>
      </div>

      {/* Tabs + Dropdown */}
      <div className="mt-5 flex flex-col md:flex-row md:justify-between gap-4">
        <div className="flex flex-wrap md:flex-nowrap gap-2 border border-[#DEE2E6] bg-[#F3F3F4] text-[#212529] rounded-md h-[40px]">
          <button className="px-3">Payslips</button>
          <button className="px-3">Payslip</button>
          <button className="px-3">Tax Sheet</button>
          <button className="px-3">Tax & Docs</button>  
          <button className="px-3">Bank & Payment</button>
          <button className="px-3">Claims</button>
        </div>

        <select className="border border-[#DEE2E6] text-[#212529] bg-[#F3F3F4] rounded-md h-[40px] w-full md:w-[220px]">
          <option>This month</option>
          <option></option>
        </select>
      </div>
      </div>
      {/* ................................... */}

      <div className='mt-[20px] bg-[white]'>
        <div>
            <p className='text-[16px] text-[#000000] font-medium'>Loans (Company / Partner)</p>

        </div>
        <div className='flex gap-[10px]'>
            {loans.map((loan) => (
                <div className='mt-[10px] flex justify-between w-[355px] px-[10px] bg-[#F8F9FA] items-center h-[48px] rounded-md'>
                    <p className='text-[14px] text-[#000000]'>{loan.name}</p>
                    <p className='text-[14px] text-[#000000]'>{loan.value}</p>
                </div>
            ))}

        </div>

      </div>
      {/* ..... */}
       <div className='mt-[20px] bg-[white]'>
        <div>
            <p className='text-[16px] text-[#000000] font-medium'>Active Loan</p>

        </div> 
        
        <div className='mt-[10px] border-b-2 border-[#E3E5E8]  '>
          <ul className="text-[#8F97A3] flex gap-[220px] px-[20px]  bg-[#F9FAFB]  ">
            <li>Loan ID</li>
            <li>Principal</li>
            <li>Outstanding</li>
            <li>EMI</li>
          </ul>
        </div>
        <div>
             <div className='mt-[10px] '>
            {ActiveLoan.map((item, index) => (
              <div     div key={index} className='flex gap-[200px] border border-[#0000001A] rounded-md h-[64px] items-center px-4'>
                
                <div className='border w-[80px]'>
                  {item.loanid}
                  <div className='text-[12px] text-gray-300'>

                  {item.month}
                  </div>
                </div>
                <div className='border w-[93px]'>
                  {item.principal}
                </div>
              
               
               
                <div className=' w-[40px]'>{item.outstanding}</div>
                <div className='w-[20px]'>{item.emi}</div>
                <div className='border border-[#868E961A]  bg-[#E4E9EE4D] text-[p#344054] rounded-md text-center text-[14px] w-[100px] h-[26px]'>{item.staus}</div>
              </div>
            ))}
          </div>


        </div>


         

        </div>  

      
    </div>
  )
}

export default Dashboardpayroll4
