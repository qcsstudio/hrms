import React from 'react'
import { useNavigate } from 'react-router-dom'

const Announcement = () => {
     const navigate = useNavigate();
  return (
    <>
    <div className="max-w-[1440px] mx-auto p-6">
  {/* Header */}
  <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
    <div>
      <h1 className="m-0 text-[32px] font-extrabold text-[#111827]">
        Announcements
      </h1>
      <p className="mt-2 text-sm text-[#6b7280]">
        Manage company-wide notices, HR updates, policy changes, events, and
        system alerts.
      </p>
    </div>

    <div className="flex gap-3 flex-wrap">
      <button className="h-[46px] px-[18px] border-none rounded-xl bg-[#e8eef8] text-[#334155] text-sm font-bold cursor-pointer">
        Export
      </button>
      <button className="h-[46px] px-5 border-none rounded-xl bg-[#1677f2] text-white text-sm font-bold cursor-pointer" onClick={() => navigate("/dashboard/create-announcement")}>
        + Create Announcement
      </button>
    </div>
  </div>

  {/* Top Cards */}
  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
    <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold text-[#64748b] mb-[10px]">
        Active Announcements
      </div>
      <div className="text-[30px] font-extrabold text-[#111827]">12</div>
      <div className="mt-2 text-[13px] text-[#10b981]">+2 published today</div>
    </div>

    <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold text-[#64748b] mb-[10px]">Scheduled</div>
      <div className="text-[30px] font-extrabold text-[#111827]">4</div>
      <div className="mt-2 text-[13px] text-[#f59e0b]">
        Next publish: 27 Mar, 9:00 AM
      </div>
    </div>

    <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold text-[#64748b] mb-[10px]">
        Acknowledgement Pending
      </div>
      <div className="text-[30px] font-extrabold text-[#111827]">38</div>
      <div className="mt-2 text-[13px] text-[#ef4444]">
        5 urgent notices pending
      </div>
    </div>

    <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
      <div className="text-sm font-bold text-[#64748b] mb-[10px]">
        Expired This Month
      </div>
      <div className="text-[30px] font-extrabold text-[#111827]">9</div>
      <div className="mt-2 text-[13px] text-[#6b7280]">
        Archived automatically
      </div>
    </div>
  </div>

  {/* Main Layout */}
  <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-5 items-start">
    {/* Left Column */}
    <div>
      {/* Filters */}
      <div className="bg-white rounded-[18px] p-4 mb-[18px] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <div className="flex gap-3 flex-wrap items-center">
          <input
            type="text"
            placeholder="Search announcement title or keyword"
            className="flex-1 min-w-[240px] h-[46px] border border-[#dbe3ee] rounded-xl px-[14px] text-sm outline-none bg-[#f8fafc]"
          />

          <select className="h-[46px] min-w-[150px] border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
            <option>Category</option>
            <option>General</option>
            <option>HR Notice</option>
            <option>Policy Update</option>
            <option>Holiday</option>
            <option>Event</option>
            <option>IT / System</option>
            <option>Payroll</option>
          </select>

          <select className="h-[46px] min-w-[140px] border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
            <option>Priority</option>
            <option>Normal</option>
            <option>Important</option>
            <option>Urgent</option>
          </select>

          <select className="h-[46px] min-w-[160px] border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
            <option>Audience</option>
            <option>All Employees</option>
            <option>Managers</option>
            <option>HR Team</option>
            <option>Specific Department</option>
            <option>Specific Branch</option>
          </select>

          <button className="h-[46px] px-4 border-none rounded-xl bg-[#eef2f7] text-[#334155] text-sm font-bold cursor-pointer">
            Clear
          </button>
        </div>
      </div>

      {/* Announcement List */}
      <div className="flex flex-col gap-4">
        {/* Card 1 */}
        <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] border-l-[6px] border-[#ef4444]">
          <div className="flex justify-between gap-4 flex-wrap items-start">
            <div className="flex-1 min-w-[280px]">
              <div className="flex gap-2 flex-wrap mb-[10px]">
                <span className="px-[10px] py-[6px] rounded-full bg-[#fee2e2] text-[#b91c1c] text-xs font-bold">
                  Urgent
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#e0f2fe] text-[#0369a1] text-xs font-bold">
                  IT / System
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold">
                  Pinned
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
                  All Employees
                </span>
              </div>

              <h3 className="m-0 text-[20px] font-extrabold text-[#111827]">
                HRMS Maintenance Notice
              </h3>

              <p className="mt-[10px] mb-[14px] text-sm text-[#475569] leading-[1.7]">
                The HRMS portal will be unavailable tonight from 11:00 PM to
                12:30 AM due to scheduled maintenance. Employees are advised
                to complete attendance regularization and pending approvals
                before downtime.
              </p>

              <div className="flex gap-[18px] flex-wrap text-[13px] text-[#64748b]">
                <div>
                  <strong className="text-[#334155]">Published:</strong> 25 Mar
                  2026, 10:30 AM
                </div>
                <div>
                  <strong className="text-[#334155]">Expires:</strong> 26 Mar
                  2026, 1:00 AM
                </div>
                <div>
                  <strong className="text-[#334155]">Posted by:</strong> HR
                  Admin
                </div>
                <div>
                  <strong className="text-[#334155]">Acknowledgement:</strong>{" "}
                  Required
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] min-w-[150px]">
              <button className="h-10 border-none rounded-[10px] bg-[#1677f2] text-white text-[13px] font-bold cursor-pointer">
                View Details
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#eef2f7] text-[#334155] text-[13px] font-bold cursor-pointer">
                Edit
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#f8fafc] text-[#475569] text-[13px] font-bold cursor-pointer">
                Archive
              </button>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] border-l-[6px] border-[#f59e0b]">
          <div className="flex justify-between gap-4 flex-wrap items-start">
            <div className="flex-1 min-w-[280px]">
              <div className="flex gap-2 flex-wrap mb-[10px]">
                <span className="px-[10px] py-[6px] rounded-full bg-[#fef3c7] text-[#92400e] text-xs font-bold">
                  Important
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#dcfce7] text-[#166534] text-xs font-bold">
                  HR Notice
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
                  All Employees
                </span>
              </div>

              <h3 className="m-0 text-[20px] font-extrabold text-[#111827]">
                Updated Document Submission Deadline
              </h3>

              <p className="mt-[10px] mb-[14px] text-sm text-[#475569] leading-[1.7]">
                All employees must upload updated identity and address proof
                documents on or before 31 March 2026. Incomplete records may
                affect payroll and compliance processing.
              </p>

              <div className="flex gap-[18px] flex-wrap text-[13px] text-[#64748b]">
                <div>
                  <strong className="text-[#334155]">Published:</strong> 24 Mar
                  2026, 4:15 PM
                </div>
                <div>
                  <strong className="text-[#334155]">Expires:</strong> 31 Mar
                  2026, 11:59 PM
                </div>
                <div>
                  <strong className="text-[#334155]">Posted by:</strong> HR
                  Manager
                </div>
                <div>
                  <strong className="text-[#334155]">Acknowledgement:</strong>{" "}
                  Optional
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] min-w-[150px]">
              <button className="h-10 border-none rounded-[10px] bg-[#1677f2] text-white text-[13px] font-bold cursor-pointer">
                View Details
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#eef2f7] text-[#334155] text-[13px] font-bold cursor-pointer">
                Edit
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#f8fafc] text-[#475569] text-[13px] font-bold cursor-pointer">
                Archive
              </button>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] border-l-[6px] border-[#10b981]">
          <div className="flex justify-between gap-4 flex-wrap items-start">
            <div className="flex-1 min-w-[280px]">
              <div className="flex gap-2 flex-wrap mb-[10px]">
                <span className="px-[10px] py-[6px] rounded-full bg-[#dcfce7] text-[#166534] text-xs font-bold">
                  Normal
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#e0f2fe] text-[#0369a1] text-xs font-bold">
                  Event
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
                  Mohali Branch
                </span>
              </div>

              <h3 className="m-0 text-[20px] font-extrabold text-[#111827]">
                Monthly Town Hall Meeting
              </h3>

              <p className="mt-[10px] mb-[14px] text-sm text-[#475569] leading-[1.7]">
                The monthly town hall will take place this Friday at 4:00 PM
                in the main conference hall. Department heads are requested to
                join 15 minutes early for the briefing session.
              </p>

              <div className="flex gap-[18px] flex-wrap text-[13px] text-[#64748b]">
                <div>
                  <strong className="text-[#334155]">Published:</strong> 25 Mar
                  2026, 9:00 AM
                </div>
                <div>
                  <strong className="text-[#334155]">Expires:</strong> 28 Mar
                  2026, 5:30 PM
                </div>
                <div>
                  <strong className="text-[#334155]">Posted by:</strong> Admin
                </div>
                <div>
                  <strong className="text-[#334155]">Acknowledgement:</strong>{" "}
                  Not Required
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] min-w-[150px]">
              <button className="h-10 border-none rounded-[10px] bg-[#1677f2] text-white text-[13px] font-bold cursor-pointer">
                View Details
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#eef2f7] text-[#334155] text-[13px] font-bold cursor-pointer">
                Edit
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#f8fafc] text-[#475569] text-[13px] font-bold cursor-pointer">
                Archive
              </button>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] border-l-[6px] border-[#8b5cf6]">
          <div className="flex justify-between gap-4 flex-wrap items-start">
            <div className="flex-1 min-w-[280px]">
              <div className="flex gap-2 flex-wrap mb-[10px]">
                <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
                  Scheduled
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#fce7f3] text-[#be185d] text-xs font-bold">
                  Holiday
                </span>
                <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
                  All Employees
                </span>
              </div>

              <h3 className="m-0 text-[20px] font-extrabold text-[#111827]">
                Festival Holiday Notice
              </h3>

              <p className="mt-[10px] mb-[14px] text-sm text-[#475569] leading-[1.7]">
                Office will remain closed on 29 March 2026 due to a public
                holiday. Employees on critical support shifts will receive
                separate instructions from their reporting managers.
              </p>

              <div className="flex gap-[18px] flex-wrap text-[13px] text-[#64748b]">
                <div>
                  <strong className="text-[#334155]">Publish On:</strong> 27 Mar
                  2026, 9:00 AM
                </div>
                <div>
                  <strong className="text-[#334155]">Expires:</strong> 29 Mar
                  2026, 11:59 PM
                </div>
                <div>
                  <strong className="text-[#334155]">Posted by:</strong> HR
                  Admin
                </div>
                <div>
                  <strong className="text-[#334155]">Acknowledgement:</strong>{" "}
                  Optional
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[10px] min-w-[150px]">
              <button className="h-10 border-none rounded-[10px] bg-[#8b5cf6] text-white text-[13px] font-bold cursor-pointer">
                Preview
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#eef2f7] text-[#334155] text-[13px] font-bold cursor-pointer">
                Edit
              </button>
              <button className="h-10 border-none rounded-[10px] bg-[#f8fafc] text-[#475569] text-[13px] font-bold cursor-pointer">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Right Column */}
    <div>
      {/* Create Announcement Panel */}
      <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)] mb-[18px]">
        <h2 className="m-0 mb-4 text-[20px] font-extrabold text-[#111827]">
          Create Announcement
        </h2>

        <div className="flex flex-col gap-[14px]">
          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Title
            </label>
            <input
              type="text"
              placeholder="Enter announcement title"
              className="w-full h-11 box-border border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none"
            />
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Category
            </label>
            <select className="w-full h-11 border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
              <option>Select category</option>
              <option>General</option>
              <option>HR Notice</option>
              <option>Policy Update</option>
              <option>Holiday</option>
              <option>Event</option>
              <option>IT / System</option>
              <option>Payroll</option>
            </select>
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Audience
            </label>
            <select className="w-full h-11 border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
              <option>All Employees</option>
              <option>Managers Only</option>
              <option>HR Team</option>
              <option>Specific Department</option>
              <option>Specific Branch</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Priority
              </label>
              <select className="w-full h-11 border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
                <option>Normal</option>
                <option>Important</option>
                <option>Urgent</option>
              </select>
            </div>

            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Publish Type
              </label>
              <select className="w-full h-11 border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none">
                <option>Publish Now</option>
                <option>Schedule</option>
                <option>Save Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Message
            </label>
            <textarea
              placeholder="Write your announcement message here..."
              className="w-full h-[120px] box-border border border-[#dbe3ee] rounded-xl p-3 text-sm bg-[#f8fafc] outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Publish Date
              </label>
              <input
                type="date"
                className="w-full h-11 box-border border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none"
              />
            </div>

            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Expiry Date
              </label>
              <input
                type="date"
                className="w-full h-11 box-border border border-[#dbe3ee] rounded-xl px-3 text-sm bg-[#f8fafc] outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px] mt-1">
            <label className="flex items-center gap-[10px] text-sm text-[#334155]">
              <input type="checkbox" defaultChecked />
              Pin to dashboard
            </label>

            <label className="flex items-center gap-[10px] text-sm text-[#334155]">
              <input type="checkbox" defaultChecked />
              Send notification
            </label>

            <label className="flex items-center gap-[10px] text-sm text-[#334155]">
              <input type="checkbox" />
              Require acknowledgement
            </label>
          </div>

          <div className="flex gap-[10px] mt-2">
            <button className="flex-1 h-11 border-none rounded-xl bg-[#1677f2] text-white text-sm font-bold cursor-pointer">
              Publish
            </button>
            <button className="flex-1 h-11 border-none rounded-xl bg-[#eef2f7] text-[#334155] text-sm font-bold cursor-pointer">
              Save Draft
            </button>
          </div>
        </div>
      </div>

      {/* Quick Rules */}
      <div className="bg-white rounded-[18px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h2 className="m-0 mb-[14px] text-[18px] font-extrabold text-[#111827]">
          Announcement Rules
        </h2>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Use <strong>Urgent</strong> only for system downtime, payroll
            impact, compliance deadlines, or emergency notices.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Pinned announcements appear on employee dashboard until expiry or
            manual unpin.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Enable acknowledgement for policy, compliance, payroll, or
            mandatory training notices.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default Announcement