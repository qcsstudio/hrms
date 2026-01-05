import React from 'react'
import './Home.css'
import { vector } from '../../allAssetsImport/allAssets';
import { vector1 } from '../../allAssetsImport/allAssets';
import { vector2 } from '../../allAssetsImport/allAssets';
import { Action} from '../../allAssetsImport/allAssets';
import { Action2} from '../../allAssetsImport/allAssets';


const Home = () => {
    return (
        <>
            <div className='homemain'>
                <div className='maindiv'>
                    <div className='totalcompanies'>

                         <div>
                            <h2>total</h2>
                            <h2> companies</h2>

                        </div>

                        <div className='totalcompaniesimg'>
                            <img  src={vector} />
                        </div>
                    </div>



                    <div>
                        <h1>257</h1>
                        <p>+08 thismonth</p>
                    </div>

                </div>


                <div className='monthlysectionmain'>
                    <div className='monthlysection'>
                 
                    <div>

                 <h2>Monthly </h2>
                    <h2>Subscription Revenue</h2>
                    </div>
                  
                    <div className='monthlysectionimg'>
                        <img src={vector2} />
                    </div>
                           
                    </div>
                    <div>
                        <h1>23</h1>
                        <p>+08 this month</p>
                    </div>
                </div>
                <div className='trailsmain'>
                    <div>
                        <div className='trails'>

                      
                        <div>
                        <h2>Trials</h2>

                        </div>
                        <div className='trailsmainimg'>
                            <img src={vector1} />
                        </div>
                          </div>
                        <div>
                            <h1>5</h1>
                            <p>Expiring in 3 days</p>
                        </div>
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
                    <div className>
                        <button className='btn1'>Discard</button>
                        <button className='btn2'>CreateCompany</button>
                    </div>
                </div>
                <div className='secondsectionmainbtn'>

              
                <div className='buttonmain'>
                    <button>All</button>
                    <button>Active</button>
                    <button>Pause</button>
                    <button>Completed</button>
                    <button>Draft</button>
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
                
                <div className='detailssection'>
                    <div className='detailssectionmain'>

                    <h3>Dash Global Private Limited</h3>
                    <p>dashglobal.com.IN</p>
                    </div>
                    <div className='detailssectionhr'>
                    <h3>HR admin</h3>
                    <p>hr@dashglobal.com</p>

                    </div>
                    <div className='detailssectionbtn'>

                    <button className='detailssectionbtn1'>Active</button>
                    </div>
                    <div className='detailssectionemployee'>
                    <h5>126</h5>

                    </div>
                    <div className='detailssectionimg'>
                    <img src={Action}/>
                    <img src={Action2}/>

                    </div>
                </div>
                {/* 22222222222222222 */}   
                <div className='detailssection'>
                    <div className='detailssectionmain'>

                    <h3>Shilpa Advisory</h3>
                    <p>shilpa.lk.LK</p>
                    </div>
                    <div className='detailssectionhr'>
                    <h3>Company Admin </h3>
                    <p>hr@dashglobal.com</p>

                    </div>
                    <div className='detailssectionbtn'>

                    <button className='detailssectionbtn2'>Paused</button>
                    </div>
                    <div className='detailssectionemployee'>
                    <h5>56</h5>

                    </div>
                   <div className='detailssectionimg'>
                    <img src={Action}/>
                    <img src={Action2}/>

                    </div>
                </div>
                {/* /'333333333333333333333' */}
                <div className='detailssection'>
                    <div className='detailssectionmain'>

                    <h3>Acme Manufacturing</h3>
                    <p>acmemfg.com.US</p>
                    </div>
                    <div className='detailssectionhr'>
                    <h3>HR admin</h3>
                   

                    </div>
                    <div className='detailssectionbtn'>

                    <button className='detailssectionbtn3'>Draft</button>
                    </div>
                    <div className='detailssectionemployee'>
                    <h5>----</h5>

                    </div>
                   <div className='detailssectionimg'>
                    <img src={Action}/>
                    <img src={Action2}/>

                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Home
