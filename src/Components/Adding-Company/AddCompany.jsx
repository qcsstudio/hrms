import React, { useEffect, useState } from 'react'

import CompanySetup from './CompanySetup';
import WorkSpaceSetup from './WorkSpaceSetup';
import Accountsetup from './Accountsetup';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import BrandAssetsUpload from './BrandAssetsUpload';

const steps = ['Company Setup', 'Admin Account Setup','Branding', 'Workspace Setup'];

const AddCompany = () => {
  const [currentStep, setCurrentStep] = useState(0);
  useEffect(() => {
    setCurrentStep(0);
  }, []);
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CompanySetup onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <Accountsetup onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <BrandAssetsUpload onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <WorkSpaceSetup onBack={handleBack} />;
      default:
        return null;
    }
  };

  return (
    <>
    {/* <div className='w-[1280px] mx-auto h-screen  border border-red-400 flex flex-col justify-center'> */}

   
      <div className="flex items-center justify-center gap-2 mt-10 mb-8 w-[1280px] mx-auto">
        {steps.map((label, index) => {
          const isActive = index === currentStep;
          const isCompleted = index < currentStep;

          return (
            <div key={index} className="flex flex-col w-full ">
              <div
                className={`rounded-full h-1 mb-2 
                  ${isCompleted ? "bg-gray-400" : isActive ? "bg-blue-400 " : "bg-gray-200"}
                `}
              />

              <div className="flex flex-row gap-4 px-1 items-center">
                <div
                  className={`w-5 h-5 flex items-center justify-center rounded-full  
                    ${isCompleted ? "bg-white" : isActive ? "bg-blue-400 " : "bg-gray-300"}
                  `}
                >
                  {isCompleted ? (
                    <IoIosCheckmarkCircle className="h-5 w-5 text-gray-400" />
                  ) : (
                    <div className='w-1 h-1 rounded-full bg-white'></div>
                  )}
                </div>
                <p
                  className={`text-sm ${
                    isActive ? "font-medium text-[#3C4257]" : "text-gray-500"
                  }`}
                >
                  {label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {renderStep()}
       {/* </div> */}
    </>
  );
};

export default AddCompany;
