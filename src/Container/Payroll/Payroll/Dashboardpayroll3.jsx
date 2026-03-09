import React from 'react';
import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1';
import Resuablecomponent3 from './payrollreuseablecomponents/PayrollResuablecomponent2';
// import ReusableComponent1 from './payrollreuseablecomponents/PayrollReusableComponent1';

const Dashboardpayroll3 = () => {
  // Tax Sheet Data
  const taxSheet = [
    { name: 'Total Gross', value: '₹ 9,40,000' },
    { name: 'TDS Deduction', value: '₹ 42,600' },
    { name: 'Total Deduction', value: '₹ 1,50,000' },
    { name: 'Projected Tax', value: '₹ 52,000' },
    { name: 'Taxable Income', value: '₹ 7,90,000' },
    { name: 'Remaining', value: '₹ 9,400' },
  ];

  // Monthly TDS Data
  const TDS = [
    {
      month: 'Dec 2025',
      value: 'Net: ₹ 78,420',
      gross: '₹ 1,05,000',
      tds: '₹ 4,800',
      pf: '₹ 4,200',
      status: 'Open Payslip',
    },
    {
      month: 'Nov 2025',
      value: 'Net: ₹ 76,500',
      gross: '₹ 1,02,000',
      tds: '₹ 4,500',
      pf: '₹ 4,200',
      status: 'Open Payslip',
    },
  ];

  return (
    <div className="p-6 bg-gray-50">
      <ReusableComponent1/>
      <Resuablecomponent3 showDownloadButton={true}/>

      {/* Tax Sheet */}
      <div className="mt-5 bg-white p-4 rounded-md">
        <h1 className="font-bold text-[18px] mb-4">Tax Sheet</h1>
        <div className="w-full flex gap-[10px] flex-wrap">
          {taxSheet.map((item, index) => (
            <div
              key={index}
              className="bg-[#F8F9FA] flex justify-between mt-[5px] w-[49%] items-center rounded-md h-[48px] px-4"
            >
              <div className="text-[#000000] text-[12px]">{item.name}</div>
              <div className="font-medium text-[#000000]">{item.value}</div>
            </div>
          ))}
        </div>

        {/* Monthly TDS Deduction */}
        <div className="mt-[30px]">
          <h2 className="font-semibold text-[16px] mb-3">Monthly TDS Deduction</h2>

          {/* Table Header */}
          <div className="border-b-2 border-[#E3E5E8]">
            <div className="text-[#8F97A3] grid grid-cols-5 px-[20px] bg-[#F9FAFB] py-3 text-[14px]">
              <div>Month</div>
              <div>Gross</div>
              <div>TDS</div>
              <div>PF</div>
              <div></div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="mt-[10px]">
            {TDS.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-5 border border-[#0000001A] rounded-md h-[64px] items-center px-4 mt-2"
              >
                <div>
                  <div className="font-medium text-[14px]">{item.month}</div>
                  <div className="text-[12px] text-gray-400">{item.value}</div>
                </div>
                <div>{item.gross}</div>
                <div>{item.tds}</div>
                <div>{item.pf}</div>
                <div className="text-right">
                  <button className="border border-[#868E961A] bg-[#F3F4F6] text-[#344054] rounded-md px-3 py-1 text-[14px]">
                    {item.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpayroll3;