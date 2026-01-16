import React, { useState } from 'react'
import discardicon from "/assets/Images/discardicon.png"

const EmployeeDashboard3 = () => {
  
    const[formData,setFormData]=useState({
        fullName:"",
        workEmail:"",
        Phone:"",
        employeeId:"",
        department:"",
        Designaition:"",
        // reportingManagrr:"",
        location:"",
        joiningDate:"",
        EmployeeTyepe:"",
        Shift:"",
        ProbationEndDate:"",
        systemRole:"",
        reportingManagrr:"",
        locationBranch:""

    })

    const handleChange=(e)=>{
       const{name,value}=e.target
       setFormData({
        ...formData,
        [name]:value
       })
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("submitted")
        console.log(formData)
        setFormData({
            fullName:"",
        workEmail:"",
        Phone:"",
        employeeId:"",
        department:"",
        Designaition:"",
    
        location:"",    
        joiningDate:"",
        EmployeeTyepe:"",
        Shift:"",
        ProbationEndDate:"",
        systemRole:"",
        reportingManagrr:"",
        locationBranch:""
        })
    }
 


    return (
        <form onSubmit={handleSubmit}>
        <div className=' p-[20px]'>
            <div className='flex  justify-between'>
                <div>
                    <h1 className='font-bold text-[20px]'>Add Employee</h1>
                    <p className='text-gray-300 text-[14px]'>Create an employee profile, assign job details, and send login invite.</p>
                </div>
                <div className='w-[300px] flex gap-[30px]'>
                    <button className='border border-[#E7EBEd] bg-[#E4E9EE4D] text-[#344054] w-[167px] h-[40px] font-medium rounded-md '>+ Import Employees</button>
                    <div className='border border-[#E7EBEd] items-center justify-evenly flex bg-[#E4E9EE4D] font-medium text-[#344054] w-[100px] h-[40px] rounded-md' >
                        <button >Cancel</button>
                        <img className='w-[20px] h-[20px]' src={discardicon} />

                    </div>
                </div>
            </div>

            <div className='mt-[30px] border border-gray-300 '>
                <h1 className='border-b-2 p-[7px]   border-[#E7EBEd] font-bold'>Basic Info:</h1>

                <div>
                    <div className='flex gap-3'>
                        <div className='w-[100%]  box-border '>


                            <h1 className='mt-[9px] font-medium'>Full Name</h1>
                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' value={formData.fullName} name='fullName' onChange={handleChange}></input>
                        </div>
                        <div className='w-[100%]'>
                            <h1 className='mt-[9px] font-medium'>Work Email</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='workEmail' value={formData.workEmail} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div>

                </div>
                <div>
                    <div className='flex gap-3'>
                        <div className='w-[100%] '>


                            <h1  className='mt-[9px] font-medium' >Phone</h1>
                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='Phone' value={formData.Phone} onChange={handleChange}></input>
                        </div>
                        <div className='w-[100%]'>
                            <h1  className='mt-[9px] font-medium' >Employee ID</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='employeeId' value={formData.employeeId} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div>

                </div>


                <div>
                    <h1  className='mt-[9px] font-medium border-b-2 border-[#E7EBEd]' >Job Details</h1>
                    <div className='flex gap-3'>
                        <div className='w-[100%] '>


                            <h1  className='mt-[9px] font-medium' >Department</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='department' value={formData.department} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>                </div>
                        <div className='w-[100%]'>
                            <h1  className='mt-[9px] font-medium' >Designation/Role</h1>

                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='Designaition' value={formData.Designaition} onChange={handleChange} ></input>

                        </div>
                    </div>

                    <div className='flex gap-3'>
                        <div className='w-[100%] '>







                            <h1  className='mt-[9px] font-medium' >Reporting Manager</h1>
                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='reportingManagrr' value={formData.reportingManagrr} onChange={handleChange}></input>
                        </div>
                        <div className='w-[100%]'>
                            <h1  className='mt-[9px] font-medium' >Location/Branch</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='location' value={formData.location} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div> <div className='flex gap-3'>
                        <div className='w-[100%] '>








                            <h1  className='mt-[9px] font-medium' >Joining Date</h1>
                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='joiningDate' value={formData.joiningDate} onChange={handleChange}></input>
                        </div>
                        <div className='w-[100%]'>
                            <h1  className='mt-[9px] font-medium' >Employee Type</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='EmployeeTyepe' value={formData.EmployeeTyepe} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-3'>
                        <div className='w-[100%] '>







                            <h1  className='mt-[9px] font-medium' >Shift</h1>
                            <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='Shift' value={formData.Shift} onChange={handleChange}  >
                                 <option value="" className='text-8xl[gray-200]'>choose account</option>
                                <option>1</option>
                                <option>12</option>
                            </select>
                        </div>
                        <div className='w-[100%]'>
                            <h1  className='mt-[9px] font-medium' >Probation End Date</h1>

                            <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='ProbationEndDate' value={formData.ProbationEndDate} onChange={handleChange}></input>

                        </div>
                    </div>

                </div>

                <div>
                    <h1  className='mt-[9px] font-medium border-b-2 border-[#E7EBEd]' >Accept & Invite</h1>
                    <div className='w-full'>
                        <h1 className='mt-[9px] font-medium'>System Role</h1>
                        <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='systemRole' value={formData.systemRole} onChange={handleChange}  >
                             <option value="">choose account</option>
                            <option>1</option>
                            <option>12</option>
                        </select>                       
                        </div>
                </div>


            </div>

            <div className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] font-medium mt-[20px]'>
                white Label
            </div>
            <div className='flex gap-3 mt-[40px]'>
                <div className='w-[100%] '>







                    <h1 className='font-medium'>Reporting manager</h1>
                    <input className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd]' type='text' placeholder='choose Account' name='reportingManagrr' value={formData.reportingManagrr} onChange={handleChange}></input>


                </div>
                <div className='w-[100%] '>
                    <h1 className='font-medium' >Location/Branch</h1>

                    <select className='border w-[100%] rounded-md p-[10px] border-2 border-[#E7EBEd] ' name='locationBranch' value={formData.locationBranch} onChange={handleChange}  >
                         <option value="" className=''>choose account</option>
                        <option>1</option>
                        <option>12</option>
                    </select>
                </div>
            </div>




        </div>
        <button type='submit' className='border'>submit</button>
        </form>
    )
}

export default EmployeeDashboard3
