import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { overtimepayment, overtimepaymentData } from '../../Data/Payroll/Payroll'


const Overtime=[
    {
    name:"Overtime(this month)",
    value:"12 jan 2026"
},
    {
    name:"Approved OT",
    value:"2h"
},
    {
    name:"Estimated payout",
    value:"1,200"
},
]

const Dashboardpayroll10 = () => {
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
    <Reusablecomponent2 colums={overtimepayment} tableData={overtimepaymentData}/>
    </div>
  )
}

export default Dashboardpayroll10
