import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { extraPayment, extraPaymentData } from '../../Data/Payroll/Payroll'


const DashboardPayroll5 = () => {
  return (
    <div>
        <ReusableComponent1/>
    <Resuablecomponent3/>
    {/* <div className='p-6'>
        <p>Extra payment</p>
    </div> */}

    <Reusablecomponent2 colums={extraPayment} tableData={extraPaymentData}/>   
    </div>
  )
}

export default DashboardPayroll5
