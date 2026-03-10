import { useState } from "react";
import { StatsBar } from "./StatsBar";

const PerformanceDashboard = () => {
  const [activeFilter, setActiveFilter] = useState("All Employee");

  const stats = [
    { label: "Completion Rate", value: "78%" },
    { label: "High Performers", value: "24" },
    { label: "Active PIPs", value: "6" },
    { label: "Promotion Eligible", value: "12" },
  ];

  const employees = [
    {
      name: "Elena Marchetti",
      manager: "Sarah Lee",
      score: 4.2,
      band: "High Performer",
      status: "Completed",
    },
    {
      name: "James Okafor",
      manager: "Sarah Lee",
      score: 4.2,
      band: "Critical",
      status: "PIP Active",
    },
    {
      name: "Anya Petrova",
      manager: "David Chen",
      score: 3.8,
      band: "High Performer",
      status: "Completed",
    },
    {
      name: "Marcus Webb",
      manager: "David Chen",
      score: 2.9,
      band: "Critical",
      status: "PIP Active",
    },
    {
      name: "Suki Tanaka",
      manager: "Sarah Lee",
      score: 4.5,
      band: "High Performer",
      status: "Completed",
    },
  ];

  return (
    <div className="bg-[#F8F9FA] p-[15px] card-animate">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[20px] font-bold text-[#212529]">
            360 Performance Intelligence
          </h1>
          <p className="text-[12px] text-[#000000]/35">
            Simple view: latest released result with manager and HR review summary.
          </p>
        </div>
        <div className="flex gap-2">
          <button className="h-[40px] rounded-lg border border-[#D1D5DB] bg-white px-5 py-2 text-sm font-medium text-[#344054] shadow-none outline-none transition-all duration-200 focus:outline-none focus:ring-0 hover:bg-gray-50 active:scale-[0.99]">
            + Download Report
          </button>
          <button className="h-[40px] rounded-lg border border-[#E4E9EE] bg-[#0575E6] px-5 py-2 text-sm font-medium text-white shadow-none outline-none transition-all duration-200 focus:outline-none focus:ring-0 hover:bg-[#0467CA] active:scale-[0.99]">
            + Create Survey
          </button>
        </div>
      </div>

      <div className="my-5 inline-flex w-fit gap-2 rounded-[9px] border border-[#DEE2E6] bg-[#F4F4F5] p-1">
        {["All Employee", "My Team", "Me"].map((item) => (
          <button
            key={item}
            onClick={() => setActiveFilter(item)}
            className={`rounded-lg px-4 py-2 border-none shadow-none outline-none transition-transform duration-200 focus:outline-none focus:ring-0 hover:-translate-y-[1px] hover:shadow-none active:scale-[0.99] ${
              activeFilter === item
                ? "bg-white text-[#212529] border border-[#E5E7EB] shadow-sm"
                : "bg-transparent text-[#6B7280]"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="grid w-full grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        <select className="h-[40px] rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-0 hover:border-[#C7CED8]">
          <option>Review Cycle</option>
          <option>Q1 2026</option>
          <option>Q4 2025</option>
        </select>
        <select className="h-[40px] rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-0 hover:border-[#C7CED8]">
          <option>Department</option>
          <option>Engineering</option>
          <option>Sales</option>
        </select>
        <select className="h-[40px] rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-0 hover:border-[#C7CED8]">
          <option>Band</option>
          <option>High Performer</option>
          <option>Critical</option>
        </select>
        <select className="h-[40px] rounded-lg border border-[#DEE2E6] bg-white px-3 text-[14px] font-medium text-[#344054] shadow-none outline-none transition-colors duration-200 focus:outline-none focus:ring-0 hover:border-[#C7CED8]">
          <option>Status</option>
          <option>Completed</option>
          <option>PIP Active</option>
        </select>
      </div>

      <div className="mt-5">
        <StatsBar stats={stats} />
      </div>

      <div className="mt-5">
        <div className="mb-3">
          <h2 className="text-[18px] font-medium text-[#212529]">
            Performance Overview
          </h2>
          <p className="text-[14px] text-[#6B7280]">
            Track ratings, performance bands, and follow-up status.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-[14px] font-medium text-[#8F97A3]">
                <th className="pl-6">Employee</th>
                <th>Manager</th>
                <th>Score</th>
                <th>Band</th>
                <th className="pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="list-stagger">
              {employees.map((emp, index) => (
                <tr
                  key={index}
                  className="rounded-xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(15,23,42,0.08)]"
                  style={{ "--stagger": index }}
                >
                  <td className="pl-6 py-4 text-[15px] text-[#212529]">{emp.name}</td>
                  <td className="py-4 text-[15px] text-[#52525B]">{emp.manager}</td>
                  <td className="py-4 text-[15px] text-[#212529]">{emp.score}</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center justify-center rounded-md border px-3 h-7 text-xs font-medium ${
                        emp.band === "High Performer"
                          ? "border-[#C5F5D5] bg-[#E9FFEF] text-[#10B981]"
                          : "border-[#FDE2AD] bg-[#FFF3D6] text-[#F59E0B]"
                      }`}
                    >
                      {emp.band}
                    </span>
                  </td>
                  <td className="pr-6 py-4">
                    <span
                      className={`inline-flex items-center justify-center rounded-md border px-3 h-7 text-xs font-medium ${
                        emp.status === "Completed"
                          ? "border-[#D3F9D8] bg-[#ECFDF3] text-[#2B8A3E]"
                          : "border-[#FAC2C2] bg-[#FDECEC] text-[#B91C1C]"
                      }`}
                    >
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
