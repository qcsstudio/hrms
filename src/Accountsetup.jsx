import React, { useState } from 'react'
import './AccountSetup.css'

const Accountsetup = () => {
    const [formData, setData] = useState({
        AdminFullname: "",
        Mail: "",
        Contact: ""

    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...formData,
            [name]: value
        })

    }
    const handlesSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        console.log("submitted")
        setData({
            AdminFullname: "",
            Mail: "",
            Contact: ""
        })
    }

    return (
        <>
        <div className='accountsetupmain'>

      
            <h1>Admin Account Setup</h1>
            <p>Create the main admin who will manage this workspace.</p>
            <form onSubmit={handlesSubmit}>
                <div className='Adminname'>
                    <p className='AdminnameP'>admin's Fullname</p>
                    <input className='AdminnameInput' type='text' placeholder='Choose Account' name='AdminFullname' value={formData.AdminFullname} onChange={(handleChange)}></input>
                </div>
                <div className='adminaccountsecond'>
                    <div>
                    <p>Mail</p>
                    <input className='AdminmailInput' type='text' placeholder='Choose Account' name='Mail' value={formData.Mail} onChange={(handleChange)}></input>

                    </div>
                    <div>
                        <p>Contact</p>
                        <input className='AdmincontactInput' type='text' placeholder='Choose Account' name='Contact' value={formData.Contact} onChange={(handleChange)}></input>
                    </div>
                </div>
                <div className='adminaccountbtn' >
                    <button className='adminaccountbtn1' >Cancel</button>
                    <button className='adminaccountbtn2' >Continue Setup</button>
                </div>
                <button type='submit'>submit</button>




            </form>
              </div>




        </>
    )
}

export default Accountsetup
