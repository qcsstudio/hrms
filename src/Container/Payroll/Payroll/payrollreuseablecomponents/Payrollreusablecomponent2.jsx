import React from 'react';

const Reusablecomponent2 = ({ colums, tableData }) => {
  return (
    <div className='p-6'>
      {/* Table Header */}
      <div className="grid grid-cols-5 text-gray-400 text-[15px] font-medium mt-[10px] p-6 bg-[#F9FAFB] h-[1px] border-b-2 border-[#E3E5E8]">
        {colums.map((col, idx) => (
          <div key={idx}>{col}</div>
        ))}
      </div>

      {/* Rows */}
      {tableData.map((item, index) => (
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
            <span className="bg-[#E9FBEF] text-[#16A34A] border border-[#D3F9D8] px-[12px] py-[3px] rounded-md text-[13px]">
              {item.status}
            </span>
          </div>

          {/* Paid On */}
<div className={`${item.paidOn === "ready"  ? "bg-[#E9FBEF] text-[#16A34A] border border-[#D3F9D8]":item.paidOn === ""  ? "bg-[#E9FBEF] text-[#16A34A] border border-[#D3F9D8]" : "text-black"} px-[12px] py-[3px] rounded-md text-[13px] whitespace-nowrap text-center w-fit`}>
  {item.paidOn}
</div>
          {/* Button */}
          <div className='flex justify-end'>
            <div className='min-w-[60px] h-[26px] px-3 flex items-center justify-center bg-[#E4E9EE4D] border border-[#868E961A] text-[#344054] text-[13px] rounded-md whitespace-nowrap'>
              {item.status2}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reusablecomponent2;