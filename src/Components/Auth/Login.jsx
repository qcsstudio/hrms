import React from 'react'
import './Login.css'
import { login_Google, } from '../../allAssetsImport/allAssets'
import { login_Email } from '../../allAssetsImport/allAssets'
import { Password } from '../../allAssetsImport/allAssets'
import { Password_Show } from '../../allAssetsImport/allAssets'


const Login = () => {
    return (
        <>
            <div className="main">
                <div style={{ width: "50%", marginTop:"50px"}}>

                    <div style={{width:"80%",margin:"0px auto",}}>

                       <div >
                        <div className="heading">
                            <h1>Welcome back, John</h1>
                        </div>
                        <div className="paragraph">

                            <p>Welcome back! Please enter your details</p>

                       </div>

                        </div>


                        <div className="form" style={{border:'none'}}>
                            <button className="formbtn">
                                <img src={login_Google} />
                                Log In with Google
                            </button>
                            <div className="login">
                                Or Log In with email
                            </div>

                            <div className="inputemail">
                                <div className='emailiconBorder'>

                                    <img src={login_Email} />
                                </div>
                                <input type="text" placeholder="enter email" />
                            </div>
                            <div className="inputpasswordmain">
                                <div className='passwordiconBorder'>

                                    <img src={Password} />
                                </div>
                                <div className='inputpassword'>
                                    <input type="password" placeholder="password" />

                                    <img src={Password_Show} />
                                </div>
                            </div>
                            <div className="forgotpass">
                                <p>remember me<span style={{ color: "#CECECE" }}>(15 days)</span></p>
                                <u>forgot password?</u>
                            </div>

                            <div className="loginbtn">
                                <button>log in</button>
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div>
                        <img src="/assets/Images/login-image.png" />
                    </div>





                </div>


            </div>
        </>
    )
}

export default Login