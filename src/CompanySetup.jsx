import React, { useState } from 'react'
import './Companysetup.css'

const CompanySetup = () => {
    const [formData, setFormdata] = useState({
        CompanyName: "",
        Slug: "",
        Country: "",
        Time: "",
        Currency: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormdata({
            ...formData,
            [name]: value

        })


    }
    const handleSubmit = (a) => {
        a.preventDefault()

        console.log("submitted")

        console.log(formData)
        setFormdata({
            CompanyName: "",
            Slug: "",
            Country: "",
            Time: "",
            Currency: ""

        })
    }

    return (
        <>
              <div className='main'>

              

            <form onSubmit={handleSubmit}>
      

          


                    <div>
                        <h1 className='CompanySetupH1'>Company Setup</h1>
                        <p className='CompanySetupP'>Add your company basics to configure default settings.</p>
                      </div>
                        <div className='Companyname'>
                            <p  className='CompanynameP'>Company name</p>
                            <input  className='CompanynameInput' type='text' placeholder='Choose Account' name='CompanyName' value={formData.CompanyName} onChange={(handleChange)}></input>
                        </div>
                        <div className='Companysetupsecondinp'>
                            <div>
                            <p>Slug</p>
                            <input className='SlugInput' type='text' placeholder='Choose account' name='Slug' value={formData.Slug} onChange={(handleChange)}></input>

                            </div>
                            
                            <div>
                            <p>Country</p>

                            <input type='text' className='CountryInput' placeholder='Choose account' name='Country' value={formData.Country} onChange={(handleChange)}></input>
                            </div>

                        </div>
                        <div className='CompanysetupthirddInp'>
                            <div>
                            <p>Time</p>
                            <input className='TimeInput' type='text' placeholder='Choose Account' name='Time' value={formData.Time} onChange={(handleChange)}></input>

                            </div>
                            <div>
                            <p>Currency</p>
                            <input  className='CurrencyInput' type='text' placeholder='Choose Account' name='Currency' value={formData.Currency} onChange={(handleChange)}></input>

                            </div>
                        </div>
                        <div className='companySetbtnclass'>
                            <button className='cancelbtn'>Cancel</button>
                            <button  type='submit' className='continuebtn' >Continue setup</button>
                        </div>




                
                        
            </form>

            </div>
        </>
    )
}

export default CompanySetup
