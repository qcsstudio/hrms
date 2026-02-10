import React, { useState } from 'react'
import PersonalProfile from './PersonalProfile';
import { Link } from 'react-router-dom';
import WorkProfile from './WorkProfile';
const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  
  const tabs = ['Personal', 'Work Profile', 'Education', 'Documents'];

 const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex + 1])
    }
  }

 const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab)
    if (currentIndex < tabs.length - 1) {
      setActiveTab(tabs[currentIndex - 1])
    }
  }


   function changeTab() {
    switch(activeTab){
      case "Personal" :
        return <PersonalProfile  onSuccess={goToNextTab} onPrevious={goToPreviousTab}/>
        
      case "Work Profile" :
        return <WorkProfile/>
        
      case "Education" :
        return <EducationProfile/>
        
      case "Documents" :
        return <DocumentsProfile/>
        
        default :
        return null


    }


    
  }


  return (
    <div className=" w-[1280px] mx-auto p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="bg-white p-6 mb-6 rounded-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-900 mb-1">
                You are adding yourself as an employee of QuantumCrafters Studio.
              </h1>
              <p className="text-gray-500 text-sm">
                Please complete the below profile completely or click on "Let me in".
              </p>
            </div>
            <Link to="/login" className="px-4 py-1.5 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600">
              Let me In
            </Link>
          </div>
          {/* Profile Card */}
          <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white">
            <div className="h-16 w-16 rounded-full border border-gray-300 bg-gray-50 flex-shrink-0"></div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Myke Tyson</p>
              <p className="text-gray-600">📞 1234567890 ✉️ test1@gmail.com</p>
            </div>
          </div>
        </div>
        {/* Tabs and Form Container */}
        <div className="bg-white rounded-lg">
          {/* Tabs */}
          <div className="px-6 pt-6 pb-4">
            <div className="flex bg-[#F5F5F5] rounded-lg p-1 w-fit gap-0.5">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
          {/* Form */}
          {changeTab()}
       
        </div>
      </div>
    </div>
  )
}
export default EmployeeProfile