import React from 'react'
import { Link } from 'react-router-dom'

const HomePage = () => {
    return (
        <>
            <div className='w-full h-screen justify-center items-center border flex '>
                <div>

                    <h1 className='text-[30px] font-bold '>Home Page is not Ready Go to Login Page</h1>
                    <div className='flex justify-center'>

                    <Link to='/login' className='no-underline text-blue-600 text-center text-[25px]  ' >Login Page</Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default HomePage