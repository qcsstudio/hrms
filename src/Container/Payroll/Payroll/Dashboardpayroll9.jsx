import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import { form16, form16Data } from '../../Data/Payroll/Payroll'

const Dashboardpayroll9 = () => {
  return (
    <div>
      <ReusableComponent1/>
      <Resuablecomponent3 showDownloadButton={true}/>
      <Reusablecomponent2 colums={form16} tableData={form16Data}/>
    </div>
  )
}

export default Dashboardpayroll9
