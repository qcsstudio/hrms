import React from 'react';

const leaveBalance = [
    { name: "Annual", value: 10 },
    { name: "Sick", value: 7 },
    { name: "Casual", value: 4 },
    { name: "Comp-Off", value: 1 },
];

const leaveBalance2 = [
    { name: "Casual Leave • Pending", value: "Apr 23 → Apr 24 • 2 days • Reason: Family function", status: "Pending", status2: "Open" },
    { name: "WFH • Approved", value: "Apr 21 • 1 day", status3: "View" },
    { name: "Low balance reminder", value: "Casual Leave is running low (4 remaining)", status4: "Info" },
];

const LeaveHistory = [
    { leavetype: "Casual Leave", date: "Apr23-apr-24", days: 2, reason: "Family Function", statuses: ["Pending", "Open"] },
    { leavetype: "WFH", date: "Apr21", days: 1, reason: "Work at Home", statuses: ["Rejected", "Reapply"] },
    { leavetype: "Sick Leave", date: "Apr10-apr-11", days: 2, reason: "Fever", statuses: ["Approved"] },
];

const Dashboardleavemanagement = () => {
    return (
        <div className='bg-gray-50 p-5 '>

            {/* Header */}
            <div className='flex justify-between items-center'>
                <div>
                    <h1 className='font-bold text-[22px]'>Leave Management</h1>
                    <p className='text-[14px] text-gray-300'>Apply leaves, manage approvals, configure policies & balances.</p>
                </div>
                <div className='flex gap-[10px]'>
                    <button className='text-[#1677FF] border border-[#C4DBFF] font-medium bg-[#EAF2FF] rounded h-[40px] w-[93px]'>Policy</button>
                    <button className='bg-[#0575E6] font-medium text-[#E4E9EE] rounded h-[40px] w-[110px]'>Apply Leave</button>
                </div>
            </div>

            {/* Filters */}
            <div className='flex gap-[10px] mt-[20px]'>
                <select className='border border-[#DEE2E6] h-[40px] w-[230px] rounded'>
                    <option>dd-mm-yyyy</option>
                </select>
                <select className='border border-[#DEE2E6] h-[40px] w-[230px] rounded'>
                    <option>This Month</option>
                </select>
            </div>

            {/* Leave Balance & Requests */}
            <div className='mt-[20px] flex gap-[10px] flex-wrap'>

                {/* Left: My Leave Balance */}
                <div className='w-[100%]'>
                    <h1 className='font-medium text-[18px]'>My Leave Balance</h1>
                    <p className='text-gray-300 text-[14px]'>Quick glance only (details in requests).</p>
                    <div className='w-full flex flex-wrap gap-[10px] mt-[20px]'>
                        {leaveBalance.map((item, index) => (
                            <div key={index} className='flex-1 min-w-[120px] h-[90px] border-2 border-[#DEE2E6] rounded-[10px] flex flex-col justify-center px-[8px]'>
                                <div className='font-medium text-[15px]'>{item.name}</div>
                                <div className='font-bold text-[23px]'>{item.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: My Leave Requests */}
                <div className='w-[100%] bg-white p-4 rounded-[10px]'>
                    <h1 className='font-medium'>My Leave Requests</h1>
                    <p className='text-gray-300 text-[14px]'>Quick glance only (details in requests).</p>
                    <div className='mt-[10px]'>
                        {leaveBalance2.map((item, index) => (
                            <div key={index} className='bg-[#F8F9FA] w-full h-auto flex justify-between items-center p-3 rounded mb-2'>
                                <div>
                                    <div className='font-medium'>{item.name}</div>
                                    <div className='text-gray-600 text-sm'>{item.value}</div>
                                </div>
                                <div className='flex gap-2 justify-end text-right'>
                                    {Object.keys(item)
                                        .filter(key => key.startsWith("status"))
                                        .map((key, i) => {
                                            const status = item[key];
                                            if (!status) return null;
                                            return (
                                                <div key={i} className={`px-3 h-[32px] flex items-center justify-center text-xs rounded border font-medium ${
                                                    status === "Pending"
                                                        ? "text-[#F59E0B] border-[#FDE2AD] bg-[#FFF3D6]"
                                                        : status === "Open"
                                                        ? "text-[#344054] border-[#868E961A] bg-[#E4E9EE4D]"
                                                        : status === "Rejected"
                                                        ? "text-[#B91C1C] border-[#FAC2C2] bg-[#FDECEC]"
                                                        : status === "Reapply"
                                                        ? "text-white border-[#0575E6] bg-[#0575E6]"
                                                        : "text-[#2B8A3E] border-[#D3F9D8] bg-[#ECFDF3]"
                                                }`}>{status}</div>
                                            );
                                        })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Leave History */}
            <div className='mt-[40px] w-full'>
                <h1 className='font-bold text-[23px]'>Leave History</h1>
                <p className='text-gray-300 text-[14px]'>All previous leave requests.</p>

                {/* Table Header */}
                <ul className='flex text-[#8F97A3] border-b-2     border-[#E3E5E8] text-[18px] font-medium mt-[10px]'>
                    <li className='flex-1 text-left'>Leave Type</li>
                    <li className='flex-1 text-left'>Dates</li>
                    <li className='flex-1 text-left'>Days</li>
                    <li className='flex-1 text-left'>Reason</li>
                    <li className='flex-1 text-right  justify-end mr-[10px]'>Status/Action</li>
                </ul>

                {/* Table Rows */}
                {LeaveHistory.map((item, index) => (
                    <div key={index} className='flex border-2 border-[#0000001A] mt-[14px]  rounded-md items-center bg-white h-[64px] w-full'>
                        <div className='flex-1 text-left ml-2'>{item.leavetype}</div>
                        <div className='flex-1 text-left'>{item.date}</div>
                        <div className='flex-1 text-left'>{item.days}</div>
                        <div className='flex-1 text-left'>{item.reason}</div>
                        <div className='flex-1 flex gap-2 justify-end text-right mr-[10px]'>
                            {item.statuses.map((status, i) => (
                                <div key={i} className={`px-3 h-[26px] flex items-center justify-center text-xs rounded border font-medium ${
                                    status === "Pending"
                                        ? "text-[#F59E0B] border-[#FDE2AD] bg-[#FFF3D6]"
                                        : status === "Open"
                                        ? "text-[#344054] border-[#868E961A] bg-[#E4E9EE4D]"
                                        : status === "Rejected"
                                        ? "text-[#B91C1C] border-[#FAC2C2] bg-[#FDECEC]"
                                        : status === "Reapply"
                                        ? "text-white border-[#0575E6] bg-[#0575E6]"
                                        : "text-[#2B8A3E] border-[#D3F9D8] bg-[#ECFDF3]"
                                }`}>{status}</div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Dashboardleavemanagement;
