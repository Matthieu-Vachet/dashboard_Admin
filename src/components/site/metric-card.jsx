const accents = {
  blue: "text-sky-300",
  cyan: "text-cyan-300",
  green: "text-emerald-300",
  amber: "text-amber-300",
  violet: "text-violet-300",
};

const surfaces = {
  blue: "border-sky-300/20 bg-gradient-to-br from-sky-400/14 via-white/[0.055] to-slate-950/20",
  cyan: "border-cyan-300/20 bg-gradient-to-br from-cyan-400/14 via-white/[0.055] to-slate-950/20",
  green: "border-emerald-300/20 bg-gradient-to-br from-emerald-400/14 via-white/[0.055] to-slate-950/20",
  amber: "border-amber-300/20 bg-gradient-to-br from-amber-400/14 via-white/[0.055] to-slate-950/20",
  violet: "border-violet-300/20 bg-gradient-to-br from-violet-400/14 via-white/[0.055] to-slate-950/20",
};

export function MetricCard({ label, value, accent = "blue", icon }) {
  return (
    <article
      className={`grid min-w-0 items-center gap-3 rounded-lg border p-4 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur ${surfaces[accent] || surfaces.blue} ${
        icon ? "grid-cols-[3rem_minmax(0,1fr)]" : ""
      }`}
    >
      {icon ? (
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-line bg-surface-inset p-2">
          <img className="metric-interface-icon max-h-full object-contain" src={icon} alt="" />
        </span>
      ) : null}
      <span className="min-w-0">
        <span className="block truncate text-xs font-bold uppercase tracking-wide text-foreground-secondary">
          {label}
        </span>
        <strong
          className={`mt-2 block whitespace-nowrap font-mono text-3xl font-black leading-none tracking-tight md:text-[2.5rem] ${
            accents[accent] || accents.blue
          }`}
        >
          {value}
        </strong>
      </span>
    </article>
  );
}
