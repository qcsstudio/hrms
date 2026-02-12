import React, { useState } from 'react';
import createAxios from '../../../utils/axios.config';

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

const LeavemanagementEmployee = () => {
  const [showApplyLeavePopup, setShowApplyLeavePopup] = useState(false);

  const [applyLeaveData, setApplyLeaveData] = useState({
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    attachment: null,
  })

  const handleChange = (e) => {
    const { name, value,files } = e.target
    setApplyLeaveData(prev => ({ ...prev, [name]:  files ? files[0] : value, }))
  }

  const axiosInatance = createAxios()

 const handleApplyleave = async () => {
  try {
    const formData = new FormData();

    formData.append("leaveType", applyLeaveData.leaveType);
    formData.append("fromDate", applyLeaveData.fromDate);
    formData.append("toDate", applyLeaveData.toDate);
    formData.append("reason", applyLeaveData.reason);

    if (applyLeaveData.attachment) {
      formData.append("attachment", applyLeaveData.attachment);
    }

    const res = await axiosInatance.post(
      "/leave/apply",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        meta: { auth: "ADMIN_AUTH" }
      }
    );

    console.log(res.data, "apply leave response");
  } catch (error) {
    console.log("Error applying leave:", error);
  }
};


  const handleApplyleavepopup = () => {
    setShowApplyLeavePopup(true);
  }
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
          <button className='bg-[#0575E6] font-medium text-[#E4E9EE] rounded h-[40px] w-[110px]' onClick={handleApplyleavepopup}>Apply Leave</button>
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
      <div className='mt-[20px] flex gap-[10px]  '>

        {/* Left: My Leave Balance */}
        <div className='w-[100%] bg-white rounded-xl p-3'>
          <h1 className='font-medium text-[18px]'>My Leave Balance</h1>
          <p className='text-gray-300 text-[14px]'>Quick glance only (details in requests).</p>
          <div className='w-full grid grid-cols-2 gap-[10px] mt-[20px]'>
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
                        <div key={i} className={`px-3 h-[32px] flex items-center justify-center text-xs rounded border font-medium ${status === "Pending"
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
                <div key={i} className={`px-3 h-[26px] flex items-center justify-center text-xs rounded border font-medium ${status === "Pending"
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

      {/* =======================================apply leave popup===================================== */}

      {showApplyLeavePopup &&
        <div className="fixed inset-0 bg-black/60  flex  justify-end z-50">
          <div className="w-[543px] bg-white rounded-xl shadow-lg p-6 relative">

            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Apply Leave
                </h2>
                <p className="text-sm text-gray-400">
                  Request clarification/documents without approving or rejecting.
                </p>
              </div>
              <button className="w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 text-gray-500" onClick={() => setShowApplyLeavePopup(false)}>
                ✕
              </button>
            </div>

            {/* Leave Details */}
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                Leave Details
              </h3>

              {/* Leave Type */}
              <div className="mb-3">
                <label className="text-xs text-gray-500 mb-1 block">
                  Leave Type
                </label>
                <select
                  name='leaveType'
                  value={applyLeaveData.leaveType}
                  onChange={handleChange}
                  className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                  <option value="" disabled hidden>Choose Account</option>
                  <option value="CASUAL">Casual Leave</option>
                  <option value="SICK">Sick Leave</option>
                  <option value="EARNED">Earned Leave</option>
                  <option value="WFH">WFH</option>
                  <option value="COMP_OFF">Comp Off</option>
                  <option value="UNPAID">Unpaid</option>
                  <option value="HALF_DAY">Half Day</option>
                </select>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    From
                  </label>
                  <input
                    type="date"
                    value={applyLeaveData.fromDate}
                    name='fromDate'
                    onChange={handleChange}
                    className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-1 block">
                    To
                  </label>
                  <input
                    type="date"
                    value={applyLeaveData.toDate}
                    name='toDate'
                    onChange={handleChange}
                    className="w-full h-10 rounded-lg border border-gray-200 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="text-xs text-gray-500 mb-1 block">
                  Reason
                </label>
                <textarea
                  placeholder="Write a short reason (required)"
                  name='reason'
                  onChange={handleChange}
                  value={applyLeaveData.reason}
                  className="w-full h-20 rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Attachment */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <h3 className="text-sm font-semibold text-gray-700">
                Attachment (only if required)
              </h3>
              <p className="text-xs text-gray-400 mb-3">
                Sick leave may require a medical document.
              </p>

              <div className="flex items-center justify-between border border-gray-200 rounded-lg px-3 h-10">
                <span className="text-sm text-gray-400">
                  {applyLeaveData.attachment
                    ? applyLeaveData.attachment.name
                    : "No file chosen"}
                </span>
                <label className="cursor-pointer text-sm border px-3 py-1 rounded-md">
                  Browse
                  <input type="file"
                    name='attachment'
                    onChange={handleChange}
                    // value={applyLeaveData.attachment}
                    className="w-full h-10 rounded-lg  px-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 hidden"
                  />
                </label>

              </div>

              {/* <div className="flex items-center justify-between border rounded-md px-3 py-2">
                    <span className="text-sm text-gray-400">
                        {formData.fileUrl
                            ? formData.fileUrl.name
                            : "No file chosen"}
                    </span>

                    <label className="cursor-pointer text-sm border px-3 py-1 rounded-md">
                        Browse
                        <input
                            type="file"
                            name="fileUrl"
                            onChange={handleChange}
                            className="hidden"
                        />
                    </label>
                </div> */}
            </div>

            {/* Footer Buttons */}
            <div className="flex justify-end gap-3">
              <button className="px-4 py-2 rounded-lg border border-gray-300 text-sm text-gray-700">
                Save Draft
              </button>
              <button className="px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium" onClick={handleApplyleave}>
                Submit
              </button>
            </div>

          </div>
        </div>
      }

    </div>
  );
};

export default LeavemanagementEmployee;
