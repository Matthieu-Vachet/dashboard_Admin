"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const toneStyles = {
  cyan: {
    shell: "border-cyan-200/20 bg-cyan-400/[0.055]",
    icon: "border-cyan-200/20 bg-cyan-400/12",
    count: "border-cyan-200/30 bg-cyan-400/14 text-cyan-50",
    text: "text-cyan-100/72",
    glow: "rgba(34,211,238,.16)",
  },
  blue: {
    shell: "border-sky-200/20 bg-sky-400/[0.055]",
    icon: "border-sky-200/20 bg-sky-400/12",
    count: "border-sky-200/30 bg-sky-400/14 text-sky-50",
    text: "text-sky-100/72",
    glow: "rgba(56,189,248,.16)",
  },
  violet: {
    shell: "border-violet-200/22 bg-violet-400/[0.06]",
    icon: "border-violet-200/22 bg-violet-400/12",
    count: "border-violet-200/30 bg-violet-400/14 text-violet-50",
    text: "text-violet-100/72",
    glow: "rgba(167,139,250,.15)",
  },
  amber: {
    shell: "border-amber-200/22 bg-amber-400/[0.06]",
    icon: "border-amber-200/22 bg-amber-400/12",
    count: "border-amber-200/30 bg-amber-400/14 text-amber-50",
    text: "text-amber-100/74",
    glow: "rgba(251,191,36,.14)",
  },
  green: {
    shell: "border-emerald-200/20 bg-emerald-400/[0.055]",
    icon: "border-emerald-200/20 bg-emerald-400/12",
    count: "border-emerald-200/30 bg-emerald-400/14 text-emerald-50",
    text: "text-emerald-100/72",
    glow: "rgba(52,211,153,.14)",
  },
  red: {
    shell: "border-red-200/22 bg-red-400/[0.06]",
    icon: "border-red-200/22 bg-red-400/12",
    count: "border-red-200/30 bg-red-400/14 text-red-50",
    text: "text-red-100/74",
    glow: "rgba(248,113,113,.15)",
  },
};

export function TierSection({
  id,
  title,
  image,
  count = 0,
  tone = "cyan",
  defaultOpen = false,
  emptyText = "Aucune donnée dans cette section.",
  children,
}) {
  const [open, setOpen] = useState(defaultOpen);
  const style = toneStyles[tone] || toneStyles.cyan;

  return (
    <section
      className={`relative overflow-hidden rounded-3xl border ${style.shell} shadow-[0_18px_70px_rgba(0,0,0,.18)]`}
      style={{ boxShadow: `0 18px 70px rgba(0,0,0,.18), inset 0 1px 0 ${style.glow}` }}
    >
      <button
        className="grid w-full cursor-pointer list-none gap-3 p-4 text-left sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex min-w-0 items-center gap-3">
          {image ? (
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl border ${style.icon} p-2`}>
              <img className="max-h-full object-contain" src={image} alt="" />
            </span>
          ) : null}
          <span className="min-w-0">
            <span className={`block text-[10px] font-black uppercase tracking-[0.22em] ${style.text}`}>
              {id}
            </span>
            <strong className="mt-1 block truncate text-xl font-black text-white sm:text-2xl">
              {title}
            </strong>
          </span>
        </span>
        <span className="inline-flex items-center justify-end gap-3">
          <span className={`rounded-full border px-3 py-1.5 text-xs font-black ${style.count}`}>
            {count}
          </span>
          <ChevronDown className={`text-white/70 transition ${open ? "rotate-180" : ""}`} size={20} />
        </span>
      </button>
      {open ? (
        <div className="border-t border-white/10 p-3 sm:p-4">
          {count ? children : (
            <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
              {emptyText}
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
}
