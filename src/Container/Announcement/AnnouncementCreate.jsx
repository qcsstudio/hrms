import React from 'react'
import { useNavigate } from 'react-router-dom'

const AnnouncementCreate = () => {
  const navigate = useNavigate()
  return (
    <>
    <div className="max-w-[1180px] mx-auto px-6 pt-7 pb-10">
  {/* Header */}
  <div className="flex justify-between items-center gap-4 flex-wrap mb-6">
    <div>
      <h1 className="m-0 text-[32px] font-extrabold text-[#111827]">
        Create Announcement
      </h1>
      <p className="mt-2 text-sm text-[#64748b]">
        Publish company notices, HR updates, events, policy changes, and
        important system alerts.
      </p>
    </div>

    <div className="flex gap-3 flex-wrap">
      <button className="h-[46px] px-[18px] border-none rounded-xl bg-[#eef2f7] text-[#334155] text-sm font-bold cursor-pointer"
      onClick={() => navigate("/dashboard/announcement")}>
        Cancel
      </button>
      <button className="h-[46px] px-5 border-none rounded-xl bg-[#1677f2] text-white text-sm font-bold cursor-pointer">
        Publish Announcement
      </button>
    </div>
  </div>

  <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-5 items-start">
    {/* Left Main Form */}
    <div className="flex flex-col gap-5">
      {/* Basic Details */}
      <div className="bg-white rounded-[20px] p-[22px] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h2 className="m-0 mb-[18px] text-[20px] font-extrabold text-[#111827]">
          Basic Details
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Announcement Title
            </label>
            <input
              type="text"
              placeholder="Enter announcement title"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Category
              </label>
              <select className="w-full h-12 border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none">
                <option>Select category</option>
                <option>General</option>
                <option>HR Notice</option>
                <option>Policy Update</option>
                <option>Holiday</option>
                <option>Event</option>
                <option>Payroll</option>
                <option>IT / System Notice</option>
                <option>Compliance</option>
              </select>
            </div>

            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Priority
              </label>
              <select className="w-full h-12 border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none">
                <option>Normal</option>
                <option>Important</option>
                <option>Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Audience
              </label>
              <select className="w-full h-12 border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none">
                <option>All Employees</option>
                <option>Managers Only</option>
                <option>HR Team</option>
                <option>Specific Department</option>
                <option>Specific Branch</option>
              </select>
            </div>

            <div>
              <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
                Publish Type
              </label>
              <select className="w-full h-12 border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none">
                <option>Publish Now</option>
                <option>Schedule</option>
                <option>Save as Draft</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="bg-white rounded-[20px] p-[22px] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h2 className="m-0 mb-[18px] text-[20px] font-extrabold text-[#111827]">
          Announcement Message
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Short Summary
            </label>
            <input
              type="text"
              placeholder="Write a short one-line summary"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Full Message
            </label>
            <textarea
              placeholder="Write the full announcement message here..."
              className="w-full h-[180px] box-border border border-[#dbe3ee] rounded-xl p-[14px] text-sm bg-[#f8fafc] outline-none resize-none leading-[1.6]"
            />
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Attachment
            </label>

            <div className="border border-dashed border-[#cbd5e1] rounded-[14px] p-[18px] bg-[#f8fafc] text-center">
              <div className="text-sm font-bold text-[#334155] mb-[6px]">
                Upload Attachment
              </div>
              <div className="text-[13px] text-[#64748b] mb-[10px]">
                PDF, image, policy file, circular, or supporting document
              </div>
              <button className="h-10 px-4 border-none rounded-[10px] bg-[#e9eff8] text-[#334155] text-[13px] font-bold cursor-pointer">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scheduling */}
      <div className="bg-white rounded-[20px] p-[22px] shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h2 className="m-0 mb-[18px] text-[20px] font-extrabold text-[#111827]">
          Schedule &amp; Visibility
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Publish Date
            </label>
            <input
              type="date"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Publish Time
            </label>
            <input
              type="time"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Expiry Date
            </label>
            <input
              type="date"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>

          <div>
            <label className="block mb-[6px] text-[13px] font-bold text-[#475569]">
              Expiry Time
            </label>
            <input
              type="time"
              className="w-full h-12 box-border border border-[#dbe3ee] rounded-xl px-[14px] text-sm bg-[#f8fafc] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="flex items-center gap-[10px] p-[14px] border border-[#e2e8f0] rounded-xl bg-[#f8fafc] text-sm text-[#334155]">
            <input type="checkbox" defaultChecked />
            Pin this announcement on dashboard
          </label>

          <label className="flex items-center gap-[10px] p-[14px] border border-[#e2e8f0] rounded-xl bg-[#f8fafc] text-sm text-[#334155]">
            <input type="checkbox" defaultChecked />
            Send push / email notification
          </label>

          <label className="flex items-center gap-[10px] p-[14px] border border-[#e2e8f0] rounded-xl bg-[#f8fafc] text-sm text-[#334155]">
            <input type="checkbox" />
            Require employee acknowledgement
          </label>

          <label className="flex items-center gap-[10px] p-[14px] border border-[#e2e8f0] rounded-xl bg-[#f8fafc] text-sm text-[#334155]">
            <input type="checkbox" />
            Allow comments / responses
          </label>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex justify-end gap-3 flex-wrap">
        <button className="h-12 px-5 border-none rounded-xl bg-[#eef2f7] text-[#334155] text-sm font-bold cursor-pointer">
          Save Draft
        </button>
        <button className="h-12 px-5 border-none rounded-xl bg-[#0f172a] text-white text-sm font-bold cursor-pointer">
          Preview
        </button>
        <button className="h-12 px-6 border-none rounded-xl bg-[#1677f2] text-white text-sm font-bold cursor-pointer">
          Publish Now
        </button>
      </div>
    </div>

    {/* Right Sidebar */}
    <div className="flex flex-col gap-5">
      {/* Tips */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h3 className="m-0 mb-[14px] text-[18px] font-extrabold text-[#111827]">
          Announcement Tips
        </h3>

        <div className="flex flex-col gap-3">
          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Use <strong>Urgent</strong> only for downtime, payroll impact,
            compliance deadlines, or emergency messages.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Use acknowledgement when employees must confirm they have read the
            notice.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569] leading-[1.6]">
            Add expiry dates so outdated announcements disappear automatically.
          </div>
        </div>
      </div>

      {/* Preview Card */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h3 className="m-0 mb-[14px] text-[18px] font-extrabold text-[#111827]">
          Live Preview
        </h3>

        <div className="border-l-[5px] border-[#1677f2] bg-[#f8fafc] rounded-[14px] p-4">
          <div className="flex gap-2 flex-wrap mb-[10px]">
            <span className="px-[10px] py-[6px] rounded-full bg-[#dbeafe] text-[#1d4ed8] text-xs font-bold">
              General
            </span>
            <span className="px-[10px] py-[6px] rounded-full bg-[#dcfce7] text-[#166534] text-xs font-bold">
              Normal
            </span>
            <span className="px-[10px] py-[6px] rounded-full bg-[#ede9fe] text-[#6d28d9] text-xs font-bold">
              All Employees
            </span>
          </div>

          <div className="text-[18px] font-extrabold text-[#111827] mb-2">
            Announcement Title Preview
          </div>

          <div className="text-sm text-[#475569] leading-[1.7]">
            This is how the announcement message preview will appear to
            employees on the dashboard or announcements page.
          </div>

          <div className="mt-3 text-xs text-[#64748b]">
            Publish: 25 Mar 2026 • Expires: 31 Mar 2026
          </div>
        </div>
      </div>

      {/* Audience Rules */}
      <div className="bg-white rounded-[20px] p-5 shadow-[0_8px_24px_rgba(15,23,42,0.06)]">
        <h3 className="m-0 mb-[14px] text-[18px] font-extrabold text-[#111827]">
          Audience Options
        </h3>

        <div className="flex flex-col gap-[10px]">
          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569]">
            <strong className="text-[#334155]">All Employees</strong>
            <br />
            Visible across the organization.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569]">
            <strong className="text-[#334155]">Managers Only</strong>
            <br />
            Restricted to reporting managers and leads.
          </div>

          <div className="p-3 rounded-xl bg-[#f8fafc] text-[13px] text-[#475569]">
            <strong className="text-[#334155]">
              Specific Department / Branch
            </strong>
            <br />
            Useful for local events, department policies, or branch notices.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default AnnouncementCreate