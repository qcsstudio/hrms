import React, { useState } from 'react'
const PersonalProfile = () => {
  const [activeTab, setActiveTab] = useState('Personal');
  
  const tabs = ['Personal', 'Work Profile', 'Education', 'Documents'];
  return (
    <div className="bg-gray-50 min-h-screen p-6">
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
            <button className="px-4 py-1.5 bg-blue-500 text-white rounded text-sm font-medium hover:bg-blue-600">
              Let me In
            </button>
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
          <form className="px-6 pb-6 space-y-5">
            {/* About */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">About</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                <option>Salutation</option>
              </select>
            </div>
            {/* Full Name */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">Full Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>
            {/* About Yourself */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">About Yourself</label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 resize-none"
                rows="3"
                placeholder="Tell us about yourself"
              />
            </div>
            {/* Address */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">Address</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                <option>Address Type</option>
              </select>
            </div>
            {/* Address Lines */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Address Line One</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter address"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Address Line Two (Optional)</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter address"
                />
              </div>
            </div>
            {/* Country, State, City */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Country</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select Country</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">State/Province</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select Province</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Select City</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select City</option>
                </select>
              </div>
            </div>
            {/* Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Contact</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Contact Type</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Contact Tag</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
            </div>
            {/* Enter Details */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">Enter Details</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter contact details"
              />
            </div>
            {/* Country, State, City (Second Set) */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Country</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select Country</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">State/Province</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select Province</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Select City</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select City</option>
                </select>
              </div>
            </div>
            {/* Bio Data */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Bio Data</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Gender</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Blood Group (optional)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
            </div>
            {/* Gender, Challenge, Marital Status */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Gender pronoun (Optional)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Challenge (Optional)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Marital status (Optional)</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
            </div>
            {/* Spouse Name */}
            <div>
              <label className="block text-gray-900 text-sm font-medium mb-1.5">Your spouse/partner's name (Optional)</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                placeholder="Enter name"
              />
            </div>
            {/* Important Dates */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Important Dates</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Birth Date</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Your partner birth date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Marriage anniversary</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                />
              </div>
            </div>
            {/* Dependents */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Dependents</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Select Relationship</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 bg-white text-gray-500">
                  <option>Select</option>
                </select>
              </div>
            </div>
            {/* Emergency Contact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Emergency Contact Number</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter contact number"
                />
              </div>
              <div>
                <label className="block text-gray-900 text-sm font-medium mb-1.5">Birth Date</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 text-gray-500"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default PersonalProfile