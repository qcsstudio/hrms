import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { deductions, deductionsData } from '../../Data/Payroll/Payroll'

const Dashboardpayroll6 = () => {
  return (
    <div>
        <ReusableComponent1/>
        <Resuablecomponent3/>
        <Reusablecomponent2 colums={deductions} tableData={deductionsData}/>
     
    </div>
  )
}

export default Dashboardpayroll6
