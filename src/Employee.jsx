import React, { useState } from 'react'


import { action, action2, CreateCompanycicon, discardicon, employee, statslogo1, statslogo2, statslogo3, statslogo4 } from './allAssetsImport/allAssets'


const Dashboardemployee = () => {
    const [filter, setFilter] = useState("All")

    const companies = [
        {
            name: "Dash Global Private Limited",
            website: "dashglobal.com.IN",
            admin: "HR admin",
            email: "hr@dashglobal.com",
            status: "Active",
            employees: 126
        },
        {
            name: "Shilpa Advisory",
            website: "shilpa.lk.LK",
            admin: "Company Admin",
            email: "hr@dashglobal.com",
            status: "Paused",
            employees: 56
        },
        {
            name: "Acme Manufacturing",
            website: "acmemfg.com.US",
            admin: "HR admin",
            email: "",
            status: "Draft",
            employees: null
        }
    ]

 const filtercompanies=filter==="All"?companies
 :companies.filter(company=>company.status===filter)
    return (
        <>
            <div className='homemainn'>
                <div className='homemain'>
                    <div className='maindiv'>
                        <div className='totalcompanies'>

                            <div>
                                <h2>Total<br />Companies</h2>


                            </div>

                            <div className='totalcompaniesimg'>
                                <img src={statslogo1} />

                            </div>
                        </div>



                        <div>
                            <h1>257</h1>
                            <p>+08 thismonth</p>
                        </div>

                    </div>

                    <div className='activemain'>
                        <div>
                            <div className='Active'>


                                <div>
                                    <h2>Active<br />Companies</h2>


                                </div>
                                <div className='trailsmainimg'>
                                    <img src={statslogo2} />

                                </div>
                            </div>
                            <div>
                                <h1>89</h1>
                                <p>76% activation rate</p>
                            </div>
                        </div>
                    </div>





                    <div className='trailsmain'>
                        <div>
                            <div className='trails'>


                                <div>
                                    <h2>Trials</h2>

                                </div>
                                <div className='trailsmainimg'>
                                    <img src={statslogo3} />

                                </div>
                            </div>
                            <div>
                                <h1>5</h1>
                                <p>Expiring in 3 days</p>
                            </div>
                        </div>
                    </div>

                    <div className='monthlysectionmain'>
                        <div className='monthlysection'>

                            <div>

                                <h2>Monthly <br />Subscription Revenue</h2>

                            </div>

                            <div className='monthlysectionimg'>
                                <img src={statslogo4} />

                            </div>

                        </div>
                        <div>
                            <h1>23</h1>
                            <p>+08 this month</p>
                        </div>
                    </div>



                </div>

                {/* 2nd section starttt..................... */}
                <div className='secondsectionmain'>
                    <div className='secondsectionmainh1'>
                        <div>
                            <h1>Companies</h1>
                            <p>Manage all tenants: onboarding, plans, status, and quick actions.</p>

                        </div>
                        <div className='secondsectiohomebtn'>


                            <button className='btn1'>Discard  <img src={discardicon} /> </button>




                            <button className='btn2'>CreateCompany       <img src={CreateCompanycicon} /></button>



                        </div>
                    </div>
                    <div className='secondsectionmainbtn'>


                        <div className='buttonmain'>
                            <button onClick={()=>setFilter("All")}>All</button>
                            <button onClick={() => setFilter("Active")}>Active</button>
                            <button onClick={() => setFilter("Paused")}>Pause</button>
                            <button onClick={() => setFilter("Draft")}>Draft</button>
                        </div>

                        <div className='sortbtn'>
                            <button>sort</button>
                        </div>
                    </div>
                    <div className='secondsectionmainlist'>
                        <ul>
                            <li>Company</li>
                            <li>Admin</li>
                            <li>Status</li>
                            <li>Employees</li>
                            <li>Action</li>
                        </ul>
                    </div>
                    {filtercompanies.map((item,index)=>    {


                        return(
                            <>
                           
                            <div className='detailssection' key={index}>

                            <div className='detailssectionmain'>

                              <h3>{item.name}</h3>
                              <p>{item.website}</p>
                            </div>
                            <div className='detailssectionhr'>
                                <h3>{item.admin}</h3>
                                <p>{item.email}</p>

                            </div>
                            <div className='detailssectionbtn'>

                                <button className='detailssectionbtn1'>{item.status}</button>
                            </div>
                            <div className='detailssectionemployee'>
                                <div>

                                    <h5>{item.employees}</h5>
                                    <img src={employee} />

                                </div>



                            </div>
                            <div className='detailssectionimg'>
                                <img src={action2} />
                                <img src={action} />


                            </div>
                        </div>
                       
                        
                         </>
                        )

                    })}
                </div>
            </div>
        </>
    )
}

export default Dashboardemployee
