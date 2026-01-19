import React, { useState } from 'react'

import CompanySetup from './CompanySetup';
import WorkSpaceSetup from './WorkSpaceSetup';
import Accountsetup from './Accountsetup';

const steps = ['Company Setup', 'Admin Account Setup', 'Workspace Setup'];;

const AddCompany = () => {
    const [currentStep,setcurrentStep] = useState(0);
    const [activeStep,setactiveStep] = useState(getActiveStep());

      const getActiveStep = () => {
    if (currentStep === 0) return 0; 
    if (currentStep === 1) return 1; 
    if (currentStep === 2) return 2; 
    return 0;
  };



  
    return (
        <>
          <div className="flex items-center justify-between gap-2 mb-8">
            {steps.map((label, index) => {
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <div key={index} className="flex flex-col w-full">
                  {/* progress line */}
                  <div
                    className={`rounded-full h-1 mb-2 
            ${isCompleted ? "bg-gray-400" : isActive ? "bg-blue-400" : "bg-gray-200"}
          `}
                  />
                  <div className="flex flex-row gap-4 px-1 items-center">
                    {/* circle */}
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full  
              ${isCompleted ? "bg-white " : isActive ? "bg-blue-400 text-white " : "bg-gray-300 "}
            `}
                    >
                      {isCompleted ? (
                        <IoIosCheckmarkCircle className="h-5 w-5 text-gray-400" />
                      ) : <div className='w-1 h-1 rounded-full bg-white flex justify-center items-center '></div>
                      }
                    </div>
                    {/* label */}
                    <p
                      className={`text-sm ${isActive ? "font-bold text-black" : "text-gray-500"}`}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
            <CompanySetup/>
            <WorkSpaceSetup/>
            <Accountsetup/>
        </>
    )
}

export default AddCompany