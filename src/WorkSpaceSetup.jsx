import React, { useState } from 'react'
import './WorkSpaceSetup.css'

const WorkSpaceSetup = () => {
    const [formData,setformData]=useState({
        employeelist:"",
        Trial:"",
        Partner:""

    })
    const handleChange=(e)=>{
        const{name,value}=e.target
        setformData({
            ...formData,
            [name]:value
        })

    }
    const HandleSubmit=(e)=>{
        e.preventDefault()
        console.log(formData)
        console.log("submitted")
        setformData({
             employeelist:"",
        Trial:"",
        Partner:""
        })
    }
    return (
   <>
   <div className='WorkSpaceSetupmain'>
    <h1>Workspace Setup</h1>
    <p>Choose a plan, add employees, and set white-label preferences.</p>

   <div className='WorkSpaceSetupTrial'>
    <p>Trial</p>
   </div>
   <div className='WorkSpaceSetupwhitelevel'>
    <p>White label</p>
   </div>
   <form onSubmit={HandleSubmit}>
    <div className='WorkSpaceSetupInputmain'>

   
    <div>
    <p>Employee list</p>
    <input className='employeelistInput' type='text' placeholder='Choose Account' name='employeelist' value={formData.employeelist} onChange={handleChange}></input>

    </div>
    <div>
         <p>Trial and Date</p>
    <input className='TrialanddateInput' type='text' placeholder='Choose Account'name='Trial' value={formData.Trial} onChange={handleChange}></input>

    </div>
     </div>
    <div>
         <p>Partner/Reseller</p>
    <input className='PartnerresellerInput' type='text' placeholder='Choose Account'name='Partner' value={formData.Partner} onChange={handleChange}></input>    
    </div>
    <div className='WorkSpaceSetbtn'>
        <button className='WorkSpaceSetbtn1'>Cancel</button>
        <button className='WorkSpaceSetbtn2'>continue Setup</button>
    </div>
    <button type='submit'>button</button>
   </form>
   </div>
   
   
   
   
    </>
  )
}

export default WorkSpaceSetup
