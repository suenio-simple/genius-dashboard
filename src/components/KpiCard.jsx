export default function KpiCard({ label, badge, value, footer }) {
  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">{label}</span>
          {badge}
        </div>
        <div className="text-2xl font-bold text-slate-900 mt-2 tracking-tight">{value}</div>
      </div>
      <div className="mt-3 text-[11px]">{footer}</div>
    </div>
  )
}
