import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { Annualpayslip, AnnualpayslipData } from '../../Data/Payroll/Payroll'



const Overtime=[
    {
    name:"Total Gross",
    value:"12,60,60000"
},
    {
    name:"Total Deductions ",
    value:"3,10,000"
},
    {
    name:"Total Net",
    value:"9,50,000"
},
]
const Dashboardpayroll11 = () => {
  return (
    <div>
        <ReusableComponent1/>
        <Resuablecomponent3/>

        <div className='p-6 mt-[10px]'>


    <p>Overtime Payment</p>
    <div className='flex  justify-between'>
    {Overtime.map((item,index)=>(
        <div key={index} className='bg-[#F8F9FA] flex justify-between mt-[10px] w-[360px] px-[10px] h-[48px] items-center rounded-[10px]' >
            <div className='text-[12px]'>{item.name}</div>
            <div className='text-[14px]'>{item.value}</div>
        </div>
    ))}
    
</div>
    </div>
    <Reusablecomponent2 colums={Annualpayslip} tableData={AnnualpayslipData}/>
    <div className='flex gap-[10px]  justify-end'>
        <button className='border-[#868E961A] bg-[#E4E9EE4D] rounded-[10px] text-[#344054] h-[40px] w-[202px]'>Download Annual PDF</button>
        <button className='h-[40px] w-[170px] bg-[#0575E6] text-[white] rounded-[10px]'>Email Statement</button>
    </div>
   
    </div>
  )
}

export default Dashboardpayroll11
