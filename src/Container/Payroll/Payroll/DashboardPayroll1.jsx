import React from 'react';
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1';
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2';

const DashboardPayroll1 = () => {
  const salarystructure = [
    { name: 'Basic Salary', value: '₹ 45,000' },
    { name: 'HRA', value: '₹ 18,000' },
    { name: 'Special Allowance', value: '₹ 12,000' },
    { name: 'Transport Allowance', value: '₹ 3,200' },
    { name: 'Medical Allowance', value: '₹ 1,250' },
    { name: 'Other Allowances', value: '₹ 5,000' }
  ];

  const Earnings = [
    { name: 'Basic Salary', value: '₹ 45,000' },
    { name: 'HRA', value: '₹ 18,000' },
    { name: 'Special Allowance', value: '₹ 12,000' },
    { name: 'Transport Allowance', value: '₹ 3,200' },
    { name: 'Total Earnings', value: '₹ 78,200' }
  ];

  const Deductions = [
    { name: 'Provident Fund', value: '₹ 5,400' },
    { name: 'Professional Tax', value: '₹ 200' },
    { name: 'Income Tax', value: '₹ 8,500' },
    { name: 'Total Deductions', value: '₹ 14,100' }
  ];

  return (
    <div>

  <ReusableComponent1/>
  <Resuablecomponent3 showFilter  ={true}/>




    <div className="min-h-screen bg-gray-50 p-6">
      {/* Current Salary Structure */}
      <div className="mt-5 bg-white p-4 rounded-md">
        <p className="text-lg font-semibold">Current Salary Structure</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {salarystructure.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] flex justify-between items-center h-[48px] rounded-md px-4"
            >
              <div className="text-[#000000] text-[12px]">{item.name}</div>
              <div className="font-medium text-[#000000]">{item.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Monthly Components */}
      <div className="mt-5 bg-white p-4 rounded-md">
        <h1 className="font-bold text-[22px]">Monthly Components</h1>
        <div className="mt-5 flex flex-col md:flex-row gap-4">
          {/* Earnings */}
          <div className="flex-1">
            <p className="text-[14px] font-medium px-2">Earnings</p>
            <div className="mt-2 space-y-3">
              {Earnings.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] flex justify-between items-center rounded-md h-[48px] px-4"
                >
                  <div className="text-[#000000] text-[12px]">{item.name}</div>
                  <div className="font-medium text-[#000000]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Deductions */}
          <div className="flex-1">
            <p className="text-[14px] font-medium px-2">Deductions</p>
            <div className="mt-2 space-y-3">
              {Deductions.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#F8F9FA] flex justify-between items-center rounded-md h-[48px] px-4"
                >
                  <div className="text-[#000000] text-[12px]">{item.name}</div>
                  <div className="font-medium text-[#000000]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
  );
};

export default DashboardPayroll1;