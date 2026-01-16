import React from 'react'

const payroll=[
    {
        name:"Next Pay Day",
        date:"31-Jan-2016",
        info:"Monthly payroll • Status: Processing"
    },
    {
        name:"Estimated Net Pay (Jan)",
        date:"₹ 78,420",
        info:"May change based on LOP / variable pay"
    },
    {
        name:"YTD Net Pay",
        date:"₹ 6,88,120",
        info:"Apr 2025 → Jan 2026"
    },
    {
        name:"This Month Status",
        date:"Processing",
        info:"In Progress"
    },
]

const payrolllist=[
    {
            month:"Dec 2025",
            value:"Gross: ₹ 1,05,000",
            netpay:"78,420",
            status:"paid",
                paidon:"31 Dec 2025",
                action:"open"
    },
    {
            month:" Nov 2025",
            value:"Gross: ₹ 1,02,000",
            netpay:"80,420",
            status:"paid",
                paidon:"31 nov 2025",
                action:"open"
    },
        {
                month:"Oct 2025",
                value:"Gross: ₹ 1,01,000",
                netpay:"76  ,420",
                status:"paid",
                    paidon:"31 oct   2025",
                    action:"open"
        },
]

const DashboardPayroll1 = () => {
  return (
    <div className='p-[10px] bg-gray-50'> 
             <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-medium text-[22px]'>Payroll</h1>
                    <p className='text-[14px] text-gray-300'>Your payslips, salary structure, tax documents, and payroll support.</p>
                </div>
                <div className='flex gap-[10px]'>
                    <button className='text-[#1677FF] border border-[#C4DBFF] font-medium bg-[#EAF2FF] rounded h-[40px] w-[93px]'>Policy</button>
                    <button className='bg-[#0575E6] font-medium text-[#E4E9EE] rounded h-[40px] w-[110px]'>Raise Query</button>
                </div>
            </div>
            
            <div className='mt-[20px]'>
                <div className='flex justify-between'>
                    {payroll.map((item,index)=>(
                        <div key={index} className='w-[272px] bg-[white] h-[110px] '>

                            <div className='fonr-medium text-[16px]'>
                                {item.name}
                            </div>
                            <div className='font-bold text-[24px]'>
                                {item.date}
                            </div>
                            <div className={`${item.info==="In Progress"?"text-[#F59E0B] w-[90px] text-center bg-[#FFF3D6]":"text-gray-300 text-[14px]"}`} >
                                {item.info}
                            </div>


                        </div>
                    ))}

                </div>
                {/* 2222222222222222222222222222 */}

                <div className='mt-[40px]'>
                    <div>
                        <h1 className='font-medium text-[22px]'>My Payroll</h1>
                        <p className='text-[14px] text-gray-300'>Everything you need payslips, tax, attendance impact, and support.</p>
                    </div>
                    <div>
                       <button className='border border-[#DEE2E6] w-[685px] items-center rounded-md h-[40px] bg-[#F4F4F5] flex  gap-[30px]'>
                        <button className='pl-[10px]'>Payslips</button>
                        <button className='bg-[white] rounded-md w-[140px] h-[33px]'>Salary Structure</button>
                        <button>Attendance</button>
                        <button>Tax & Docs</button>
                        <button>Bank & Payment</button>
                        <button>Claims</button>
                       </button>

                    </div>
                    <div className='mt-[20px]'>
                        <ul className='flex text-[#8F97A3] border-b-2 border-[#E3E5E8] justify-between px-[20px]'>
                            <li className=' w-[215px]'>Month</li>
                            <li className='  w-[60px] yy'>Net Pay</li>
                            <li >Status</li>
                            <li className='  w-[200px]'>Paid On</li>
                            <li>Status/Action</li>
                        </ul>


                    </div>
                    <div>
       
                    {payrolllist.map((item,index)=>(
                        <div key={index} className='bg-[white] mt-[10px] h-[64px] items-center flex justify-between border border-[#0000001A] '>
                            <div className='pl-[20px]'>
                                <div  className='w-[200px]'>

                                {item.month}
                                <div className='text-gray-300 text-[14px]'>
                                    
                                {item.value}
                                </div>
                           
                                </div>
                            
                            </div>
                            <div>
                                {item.netpay}
                            </div>
                            <div >
                                {item.status}
                            </div>
                            <div className='     w-[250px]'>
                                {item.paidon}
                            </div>
                            <div className='pr-[20px] '>
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

export default DashboardPayroll1
