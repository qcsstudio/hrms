import React from 'react';

const Summrycardcomponent = ({
  payday = [
    { name: 'Next Pay Day', date: '31-Jan-2016', title: 'Monthly payroll • Status: Processing' },
    { name: 'Estimated Net Pay (Jan)', date: '₹ 78,420', title: 'May change based on LOP / variable pay' },
    { name: 'YTD Net Pay', date: '₹ 6,88,120', title: 'Apr 2025 → Jan 2026' },
    { name: 'This Month Status', date: 'Processing', title: 'In Progress' },
  ],

  buttons = [
    { label: 'Policy' },
    { label: 'Raise Query', primary: true },
  ],
}) => {
  return (
    <div className="p-2 bg-gray-50">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-bold text-[22px] text-[#212529]">Payroll</h1>
          <p className="text-gray-300 text-[14px]">
            Your payslips, salary structure, tax documents, and payroll support.
          </p>
        </div>

        <div className="flex gap-2 flex-wrap">
          {buttons.map((btn, idx) => (
            <button
              key={idx}
              className={`h-[40px] rounded-[7px] text-[14px]
              ${btn.primary
                ? 'bg-[#0575E6] text-white w-[110px]'
                : 'bg-[#EAF2FF] text-[#418BFF] w-[93px] border border-[#C4DBFF]'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="flex flex-wrap justify-between mt-6 gap-4">
        {payday.map((item, index) => (
          <div
            key={index}
            className="flex-1 min-w-[150px] max-w-[250px] h-[110px] bg-white rounded-[10px] p-3"
          >
            <div className="font-medium text-[15px]">{item.name}</div>
            <div className="font-bold text-[22px]">{item.date}</div>
            {item.title === 'In Progress' ? (
              <div className="text-[#F59E0B] bg-[#FFF3D6] w-fit px-2 py-1 rounded-sm text-[12px] mt-2 text-center">
                {item.title}
              </div>
            ) : (
              <div className="text-gray-300 text-[12px] mt-2">{item.title}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Summrycardcomponent;
