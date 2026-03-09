import React from 'react';

const Resuablecomponent3 = ({
  title = 'My Payroll',
  subtitle = 'Everything you need payslips, tax, attendance impact, and support.',
  onDownload = () => {},
  showDownloadButton = false,
  tabs = [
    'Package & Proration',
    'Payslips',
    'Tax Sheet',
    'loan',
    'Extra Payment',
    'Extra Deduction',
    'IT declaration & submission',
    'Income tax',
    'Form 16',
    'Over Time Payment',
    'Annual Payslip',
    'Annual Payslip',
    'Attendance',
    'Tax & Docs',
    'Bank & Payment',
    'Claims',
  ],
  selectedTab = 'Package & Proration',
  onTabChange = () => {},
  filterOptions = ['This Month', 'Last Month', 'Last 3 Months', 'Last 6 Months'],
  selectedFilter = 'This Month',
  onFilterChange = () => {},
  showFilter = false,
}) => {
  return (
    <div className="bg-white px-6">
      
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

        {showDownloadButton && (
          <button 
            onClick={onDownload}
            className="bg-[#0575E6] text-white px-[18px] h-[40px] rounded-md"
          >
            Download Full Report
          </button>
        )}
      </div>

      {/* Tabs + Filter */}
      <div className="flex justify-between items-center mt-[20px]">
        
        {/* TABS DROPDOWN - LEFT SIDE (YE TUMNE DELETE KAR DIYA THA!) */}
        <select 
          value={selectedTab}
          onChange={(e) => onTabChange(e.target.value)}
          className="border border-[#DEE2E6] bg-[#F3F3F4] h-[40px] rounded-md px-[14px] text-[14px] min-w-[300px]"
        >
          {tabs.map((tab, idx) => (
            <option key={idx} value={tab} className="text-[14px] text-[#495057] font-[medium]">
              {tab}
            </option>
          ))}
        </select>

        {/* FILTER DROPDOWN - RIGHT SIDE (YE CONDITIONAL HAI) */}
        {showFilter && (
          <select 
            value={selectedFilter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="border border-[#DEE2E6] bg-[#F9FAFB] h-[40px] w-[260px] rounded-md px-[10px]"
          >
            {filterOptions.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

      </div>
    </div>
  );
};

export default Resuablecomponent3;