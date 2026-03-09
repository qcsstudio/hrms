import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { Annualpayslip2, AnnualpayslipData2 } from '../../Data/Payroll/Payroll'


const Overtime=[
    {
    name:"Eligible Limit",
    value:"30,000"
},
    {
    name:"Outstanding",
    value:"8,000"
},
    {
    name:"Next EMI",
    value:"2,000"
},
]

const Dashboardpayroll12 = () => {
  return (
    <div>
<ReusableComponent1/>
<Resuablecomponent3/>



 <div className='p-6'>
   <p>Salary Advance</p>
    <div className='flex  justify-between'>
    {Overtime.map((item,index)=>(
        <div key={index} className='bg-[#F8F9FA] flex justify-between mt-[10px] w-[360px] px-[10px] h-[48px] items-center rounded-[10px]' >
            <div className='text-[12px]'>{item.name}</div>
            <div className='text-[14px]'>{item.value}</div>
        </div>
    ))}

</div>
<div className='mt-[10px]'>
    <p>Request Advance</p>
<div className='flex  gap-[20px] w-[100%]'>
    <div  className='mt-[10px]'>
        <p>Select text regime</p>
        <select className='border w-[538px] border border-[#868E9633] mt-[10px] rounded-[10px] px-[10px] h-[40px]'>
            <option>choose account</option>
            <option>choose account</option>
        </select>
    </div>

    <div >
        <p>Effective from</p>
 <input  className='border w-[538px] border border-[#868E9633] rounded-[10px] px-[10px] h-[40px]' type='text' placeholder='choose Account'></input>
    </div>
    </div>

    <p  className='mt-[10px]'>Reason</p>
      <div>
      <textarea className='border border-[#868E9633] rounded-[10px] w-full'
     

        placeholder="Choose Account"
        rows={5}
      />
    </div>
</div>


 </div>
  <div className='flex gap-[10px]  justify-end'>
        <button className='border-[#868E961A] bg-[#E4E9EE4D] rounded-[10px] text-[#344054] h-[40px] w-[202px]'>Save Draft</button>
        <button className='h-[40px] w-[170px] bg-[#0575E6] text-[white] rounded-[10px]'>Submit Request</button>
    </div>
   <Reusablecomponent2 colums={Annualpayslip2} tableData={AnnualpayslipData2}/>
    </div>

    
  )
}

export default Dashboardpayroll12
