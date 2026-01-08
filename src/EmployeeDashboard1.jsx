import React from 'react'
import { discardicon,statslogo1,statslogo2,statslogo3,statslogo4 } from './allAssetsImport/allAssets'

const EmployeeDashboard1 = () => {
    return (
        <>
            <div className='bg-gray-50 p-5 '>




                <div className='flex justify-between'>
                    <div>

                        <h1>Employees</h1>
                        <p className='text-gray-200'>Manage employee directory, documents, and role-based actions.</p>
                    </div>

                    <button className="bg-[#0575E6] text-white px-4 py-2  rounded">
                        + Add Employees
                    </button>
                </div>
                <div className='m-5 border border-[#DEE2E6] w-[290px] flex justify-around rounded-md h-[40px]'>
                    <button>All Employees</button>
                    <button>My Team</button>
                    <button>Me</button>
                </div>

                <div className='flex justify-between'>
                    <div className='flex gap-3'>
                        <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white '>Department</button>
                        <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Role</button>
                        <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Location</button>
                        <button className='border border-[#DEE2E6] text-left rounded-md w-[210px] h-[40px] bg-white'>Status</button>
                    </div>
                    <div className='border border-[#DEE2E6] rounded-md w-[90px] h-[40px] flex items-center justify-evenly'>
                        <button >clear</button>
                        <img className='h-5' src={discardicon} />
                    </div>
                </div>


                {/* 2nd///////////////////////// */}
              
                       <div className='flex justify-between m-7'>
                       <div className='bg-white w-[23%] p-4 rounded-lg'>
                         <div className='flex justify-between'>
                            <div>
                           <h2 className='font-semibold'>Team Size</h2>
                           <h1>13</h1>
                           <button className='border border-[#C5F5D5]  text-red-#10B981 !text-red-#10B981 bg-[#E9FFEF] w-[61px] h[20px] rounded'>stable</button>

                            </div>
                           <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
                             <img src={statslogo1} />
                           </div>
                         </div>

                       </div>

                        <div className='bg-white w-[23%] p-4 rounded-lg'>
                          <div>
                                 <div className='flex justify-between'>
                                  <div>
                                   <h2 className='font-semibold'>Present today</h2>
                                   <p>10</p>
                                    <button className='border border-[#C5F5D5] text-red-#10B981 !text-red-#10B981 bg-[#E9FFEF] w-[61px] h[20px] rounded'>2 Not Marked</button>

                                  </div>
                                   <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
                                     <img src={statslogo2} />
                                   </div>
                                    </div>
                                 </div>

                               </div>
                               <div className='bg-white w-[23%] p-4 rounded-lg'>
                                         <div className='flex justify-between'>
                                           <h2 className='font-semibold'>Trials</h2>
                                           <div className='bg-indigo-100 w-12 h-12 flex items-center justify-center rounded'>
                                             <img src={statslogo3} />
                                           </div>
                                         </div>
                                         <h1 className='text-2xl font-bold mt-2'>5</h1>
                                         <p className='text-sm text-gray-400'>Expiring in 3 days</p>
                                       </div>
                               
                                       {/* Monthly Revenue */}
                                       <div className='bg-white w-[23%] p-4 rounded-lg'>
                                         <div className='flex justify-between'>
                                           <h2 className='font-semibold'>Monthly<br />Subscription Revenue</h2>
                                           <div className='bg-emerald-100 w-12 h-12 flex items-center justify-center rounded'>
                                             <img src={statslogo4} />
                                           </div>
                                         </div>
                                         <h1 className='text-2xl font-bold mt-2'>23</h1>
                                         <p className='text-sm text-gray-400'>+08 this month</p>
                                       </div>
                                       </div>  
        
               




                </div>

















            

        </>
    )
}

export default EmployeeDashboard1
