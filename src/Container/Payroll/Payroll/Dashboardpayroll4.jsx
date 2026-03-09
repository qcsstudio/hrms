import React from 'react';
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1';
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2';

const Dashboardpayroll4 = () => {
  // Loans Data
  const loans = [
    { name: 'Active Loan', value: '1' },
    { name: 'Total Outstanding', value: '₹ 72,000' },
    { name: 'EMI (monthly)', value: '₹ 6,000' },
  ];

  // Active Loan Data
  const activeLoanData = [
    {
      loanId: 'LN-LN-9007',
      startDate: 'Started: Jan 2025',
      principal: '₹ 1,20,000',
      outstanding: '₹ 72,000',
      emi: '₹ 6,000',
      status: 'EMI Schedule',
    },
  ];

  return (
<div>
<ReusableComponent1 />
      <Resuablecomponent3/>

     
    <div className="p-6 bg-gray-50">
     

      {/* Tabs */}
      

      {/* Loans Section */}
      <div className="mt-[20px] bg-white p-4 rounded-md">
        <p className="text-[16px] text-[#000000] font-semibold mb-3">
          Loans (Company / Partner)
        </p>
        <div className="flex gap-[10px] flex-wrap">
          {loans.map((loan, index) => (
            <div
              key={index}
              className="flex justify-between w-[388px] px-[16px] bg-[#F8F9FA] items-center h-[48px] rounded-md"
            >
              <p className="text-[14px] text-[#6B7280]">{loan.name}</p>
              <p className="text-[14px] text-[#000000] font-medium">{loan.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Active Loan Section */}
      <div className="mt-[20px] bg-white p-4 rounded-md">
        <p className="text-[16px] text-[#000000] font-semibold mb-3">Active Loan</p>

        {/* Table Header */}
        <div className="border-b-2 border-[#E3E5E8]">
          <div className="text-[#8F97A3] grid grid-cols-5 px-[20px] bg-[#F9FAFB] py-3 text-[14px]">
            <div>Loan ID</div>
            <div>Principal</div>
            <div>Outstanding</div>
            <div>EMI</div>
            <div></div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="mt-[10px]">
          {activeLoanData.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 border border-2 border-[#0000001A] rounded-md h-[64px] items-center px-4 mt-2"
            >
              <div>
                <div className="font-medium text-[14px]">{item.loanId}</div>
                <div className="text-[12px] text-gray-400">{item.startDate}</div>
              </div>
              <div className="text-[14px]">{item.principal}</div>
              <div className="text-[14px]">{item.outstanding}</div>
              <div className="text-[14px]">{item.emi}</div>
              <div className="text-right">
                <button className="border border-[#868E961A] bg-[#F3F4F6] text-[#344054] rounded-md px-3 py-1 text-[14px]">
                  {item.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apply For Loan Section */}
      <div className="mt-[20px] bg-white p-4 rounded-md">
        <p className="text-[16px] text-[#000000] font-semibold mb-4">Apply For Loan</p>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div >
            <label className="block text-[14px] font-medium mb-2">Loan Type</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-gray-400">
              <option>Choose Account</option>
            </select>

            <label className="block text-[14px] font-medium mb-2 mt-4">Tenure</label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px] text-gray-400">
              <option>Choose Account</option>
            </select>

          
         
            </div>

          {/* Right Column */}
          <div>
            <label className="block text-[14px] font-medium mb-2">Amount</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
              placeholder="Choose Account"
            />

            <label className="block text-[14px] font-medium mb-2 mt-4">
              Expected EMI (mock)
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-[14px]"
              placeholder="Choose Account"
            />
          </div>


         
        </div>
         <div   >
       
            <label className="block text-[14px] font-medium mb-2 mt-4">Reason</label>
               <textarea
              className="w-[100%] border border-gray-300 rounded-md px-3 py-2 text-[14px] h-[120px]"
              placeholder="Choose Account"
            ></textarea>
          </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="border border-gray-300 bg-white text-gray-700 rounded-md px-6 py-2 text-[14px]">
            Save Draft
          </button>
          <button className="bg-[#0575E6] text-white rounded-md px-6 py-2 text-[14px]">
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Dashboardpayroll4;