import React from 'react';

const MyPayrollComponent2 = ({
  title = 'My Payroll',
  subtitle = 'Everything you need payslips, tax, attendance impact, and support.',

  tabs = [
    'Package & Proration',
    'Payslips',
    'Attendance',
    'Tax & Docs',
    'Bank & Payment',
    'Claims',
  ],

  filter = 'This Month',

  data = [
    {
      month: 'Dec 2025',
      gross: '₹ 1,05,000',
      net: '₹ 78,420',
      status: 'Paid',
      paidOn: '31 Dec 2025',
    },
    {
      month: 'Nov 2025',
      gross: '₹ 1,02,500',
      net: '₹ 80,010',
      status: 'Paid',
      paidOn: '30 Nov 2025',
    },
    {
      month: 'Oct 2025',
      gross: '₹ 1,01,000',
      net: '₹ 76,880',
      status: 'Paid',
      paidOn: '31 Oct 2025',
    },
  ],
}) => {
  return (
    <div className="p-[10px] bg-white">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="font-bold text-[22px] text-[#212529]">
            {title}
          </h1>
          <p className="text-gray-300 text-[12px]">
            {subtitle}
          </p>
        </div>

        <button className="bg-[#0575E6] text-white px-[18px] h-[40px] rounded-md">
          Download Full Report
        </button>

      </div>

      {/* Tabs + Filter */}
      <div className="flex justify-between items-center mt-[20px]">

        <div className="flex bg-[#F3F3F4] border border-[#DEE2E6] rounded-md h-[40px]">

          {tabs.map((tab, idx) => (
            <button
              key={idx}
              className={`px-[14px] text-[14px] mt-[3px]
              ${tab === 'Payslips'
                ? 'bg-white rounded-md shadow-sm h-[32px]  text-center'
                : ''
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        <select className="border border-[#DEE2E6] bg-[#F9FAFB] h-[40px] w-[160px] rounded-md px-[10px]">
          <option>{filter}</option>
        </select>

      </div>

      {/* Table Header */}
      <div className="grid grid-cols-5 text-gray-400 text-[15px] font-medium mt-[25px] px-[10px]">
        <div>Month</div>
        <div>Net Pay</div>
        <div>Status</div>
        <div>Paid On</div>
        <div></div>
      </div>

      {/* Rows */}
      {data.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-5 items-center bg-white border border-[#0000001A] rounded-lg mt-[12px] p-[12px]"
        >

          {/* Month */}
          <div>
            <div className="font-medium">{item.month}</div>
            <div className="text-gray-300 text-[12px]">
              Gross : {item.gross}
            </div>
          </div>

          {/* Net Pay */}
          <div>{item.net}</div>

          {/* Status */}
          <div>
            <span className="bg-[#E9FBEF] text-[#16A34A]  border border-[#D3F9D8] px-[12px] py-[3px] rounded-md text-[13px]">
              {item.status}
            </span>
          </div>

          {/* Paid On */}
          <div>{item.paidOn}</div>

          {/* Button */}
          <div className="text-right">
            <button className="bg-[#F3F4F6] px-[12px] py-[5px] rounded-md text-[14px]">
              Open
            </button>
          </div>

        </div>
      ))}

    </div>
  );
};

export default MyPayrollComponent2;
