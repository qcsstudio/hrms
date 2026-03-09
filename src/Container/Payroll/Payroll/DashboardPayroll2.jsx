import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import Reusablecomponent2 from './payrollreuseablecomponents/Payrollreusablecomponent2'
// import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'
// import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
// import { extraPayment, payslipdata } from '../../Data/Payroll/Payroll'



const DashboardPayroll2 = () => {
  return (
    <div>
      <ReusableComponent1/>
     <Resuablecomponent3 showDownloadButton={true} showFilter={true}/> 
      <Reusablecomponent2   colums={extraPayment} tableData={payslipdata} />  

     
    </div>
  )
}

export default DashboardPayroll2
  