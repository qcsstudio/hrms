export const StatsBar = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 list-stagger">
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="rounded-lg border border-[#E5E7EB] bg-white px-4 py-5 surface-card"
          style={{ "--stagger": index }}
        >
          <p className="text-[14px] font-medium text-[#52525B]">{stat.label}</p>
          <p className="mt-1 text-[28px] font-bold text-[#212529]">{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
