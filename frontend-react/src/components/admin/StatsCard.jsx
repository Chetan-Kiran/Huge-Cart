export default function StatsCard({ title, value, icon: Icon, color }) {
  return (
    <div className="rounded-[28px] bg-surface p-6 shadow-md border border-border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-caramel text-sm">{title}</p>

          <h2 className="mt-2 text-4xl font-black text-espresso">{value}</h2>
        </div>

        <div
          className="h-14 w-14 rounded-2xl flex items-center justify-center"
          style={{ backgroundColor: color }}
        >
          <Icon className="text-white" />
        </div>
      </div>
    </div>
  );
}
