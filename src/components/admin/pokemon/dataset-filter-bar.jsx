"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { fieldClass } from "./admin-ui";

export function DatasetFilterBar({
  query,
  onQueryChange,
  placeholder = "Rechercher un Pokémon...",
  resultCount = 0,
  totalCount = 0,
  toggles = [],
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_16px_55px_rgba(0,0,0,.16)]">
      <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
        <label className="relative min-w-0 flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={17} />
          <input
            className={`${fieldClass} pl-11`}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
          />
        </label>
        <div className="flex flex-wrap items-center gap-2">
          {toggles.map((toggle) => (
            <button
              key={toggle.id}
              type="button"
              aria-pressed={toggle.active}
              onClick={toggle.onClick}
              className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-xs font-black transition ${
                toggle.active
                  ? "border-cyan-200/35 bg-cyan-300/16 text-cyan-50"
                  : "border-white/10 bg-white/[0.055] text-slate-300 hover:border-white/20 hover:text-white"
              }`}
            >
              {toggle.icon || <SlidersHorizontal size={15} />}
              {toggle.label}
            </button>
          ))}
          <span className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs font-black text-slate-300">
            {resultCount} / {totalCount}
          </span>
        </div>
      </div>
    </section>
  );
}
