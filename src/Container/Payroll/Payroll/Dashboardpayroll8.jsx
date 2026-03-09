import React from 'react'
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1'
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2'

const incometax=[
    {
    name      :"Projected Tax",
    amount:"Rs. 0.00",
   
},
    {
    name      :"TDS Deducted",
    amount:"42,600",
   
},
    {
    name      :"Remaining",
    amount:"9,400",
   
},
]

const Dashboardpayroll8 = () => {
  return (
    <div>
        <ReusableComponent1/>
        <Resuablecomponent3/>
        <div className='p-6'    >
            <div>
            <p  className='text-[#000000]' >Income Tax</p>
            <div className='flex justify-between mt-[10px]'>

           
          {incometax.map((item,index)=>{
            return(
              <div className='flex justify-between  w-[356px] bg-[#F8F9FA] rounded-[10px] items-center px-[10px] h-[48px]  '>
                <p className='text-[#000000] text-[12px]'>{item.name}</p>
                <p className='text-[#000000] font-medium text-[14px]'>{item.amount}</p>
              </div>
            )
          })}
           </div>


            </div>

            <div className='mt-[20px]'>
                <p className='font-medium'>Regime Choice</p>
                <div className=' flex justify-between mt-[10px]'>
                    <div >
                         <p className='text-[15px]'>Select text regime</p>
                   
                    <div>

                   
                   
                    <select className='w-[535px] border border-[#868E9633] rounded-[10px] h-[40px] mt-[7px]'>
                      <option>choose account</option>
                        <option>opt 2</option>
                        <option>opt 3</option>
                       
                    </select>
                     </div>
                      </div>
                     <div>

                   
                    <p className='text-[15px]'>Effective from</p>
                     <div  >

                    
                    <select  className='w-[535px] border border-[#868E9633] rounded-[10px] h-[40px] mt-[7px]' >
                        <option>choose account </option>
                        <option>opt 2</option>
                        <option>opt 3</option>
                    </select>
                     </div>

  </div>
            </div>
            </div>

            <div className='mt-[16px] flex justify-between'>
                <p className='text-[#1677FF] text-[12px]' >This projection uses your current salary + declarations + verified proofs. Changes in variable pay or LOP can change final tax.</p>
           
           <div className='flex gap-[10px]'>
            <button className=' border border-[#868E961A] bg-[#E4E9EE4D] text-[#344054] h-[40px] w-[130px] rounded-lg' >Recalculate</button>
            <button className='bg-[#0575E6] rounded-lg text-white w-[85px] h-[40px]'>save</button>
           </div>

            </div>
        </div>

     
    </div>
  )
}

export default Dashboardpayroll8
