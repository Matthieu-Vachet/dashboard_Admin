"use client";

import { Check, ChevronDown, Menu, Search, X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { fieldClass } from "./admin-ui";

const groupLabels = {
  data: "Données Pokémon",
  combat: "Combat",
  events: "Événements",
  maintenance: "Maintenance",
  quality: "Qualité & supervision",
};

function SectionIcon({ icon, active = false, compact = false }) {
  const size = compact ? "h-7 w-7 rounded-lg" : "h-9 w-9 rounded-xl";
  if (typeof icon === "string") {
    return (
      <span className={`grid ${size} shrink-0 place-items-center border p-1.5 ${active ? "border-cyan-200/40 bg-cyan-300/15" : "border-white/10 bg-black/20"}`}>
        <img className="h-full w-full object-contain" src={icon} alt="" loading="lazy" />
      </span>
    );
  }
  const Icon = icon;
  return (
    <span className={`grid ${size} shrink-0 place-items-center border ${active ? "border-cyan-200/40 bg-cyan-300/15 text-cyan-100" : "border-white/10 bg-black/20 text-slate-400"}`}>
      <Icon size={compact ? 15 : 18} aria-hidden="true" />
    </span>
  );
}

function filterItems(items, query) {
  const needle = query.trim().toLocaleLowerCase("fr");
  if (!needle) return items;
  return items.filter((item) => `${item.label} ${groupLabels[item.group] || ""}`.toLocaleLowerCase("fr").includes(needle));
}

export function AdminSectionNavigation({ items, active, onSelect }) {
  const activeItem = items.find((item) => item.id === active) || items[0];
  const activeGroup = activeItem?.group || "data";
  const [desktopGroup, setDesktopGroup] = useState(activeGroup);
  const [mobileGroup, setMobileGroup] = useState(activeGroup);
  const [desktopQuery, setDesktopQuery] = useState("");
  const [mobileQuery, setMobileQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileSearchRef = useRef(null);

  useEffect(() => {
    if (!mobileOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    mobileSearchRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  const desktopItems = useMemo(() => filterItems(items, desktopQuery), [items, desktopQuery]);
  const visibleDesktopItems = desktopQuery ? desktopItems : desktopItems.filter((item) => item.group === desktopGroup);
  const visibleMobileItems = useMemo(() => {
    const filtered = filterItems(items, mobileQuery);
    return mobileQuery ? filtered : filtered.filter((item) => item.group === mobileGroup);
  }, [items, mobileGroup, mobileQuery]);

  function selectItem(item) {
    setDesktopGroup(item.group);
    setMobileGroup(item.group);
    setDesktopQuery("");
    setMobileQuery("");
    setMobileOpen(false);
    onSelect(item.id);
  }

  return (
    <nav className="mt-4" aria-label="Sections Admin Pokémon">
      <button
        className="flex min-h-14 w-full items-center gap-3 rounded-2xl border border-cyan-200/20 bg-slate-950/55 p-2.5 text-left shadow-[0_18px_50px_rgba(2,6,23,.22)] lg:hidden"
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={mobileOpen}
      >
        <SectionIcon icon={activeItem?.icon} active />
        <span className="min-w-0 flex-1">
          <small className="block truncate text-[9px] font-black uppercase tracking-[.17em] text-cyan-200/70">{groupLabels[activeGroup]}</small>
          <strong className="block truncate text-sm font-black text-white">{activeItem?.label}</strong>
        </span>
        <Menu className="mr-1 text-cyan-100" size={20} aria-hidden="true" />
      </button>

      <div className="hidden rounded-2xl border border-white/10 bg-slate-950/45 p-3 lg:block">
        <div className="flex items-center gap-2">
          <label className="relative min-w-[17rem] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" size={15} />
            <input
              className={`${fieldClass} min-h-10 py-2 pl-10`}
              value={desktopQuery}
              onChange={(event) => setDesktopQuery(event.target.value)}
              placeholder="Rechercher une section…"
              aria-label="Rechercher une section Admin Pokémon"
            />
          </label>
          <div className="flex max-w-[68%] gap-1.5 overflow-x-auto" aria-label="Groupes de sections">
            {Object.entries(groupLabels).map(([id, label]) => {
              const selected = desktopGroup === id && !desktopQuery;
              return (
                <button
                  className={`shrink-0 rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] transition ${selected ? "border-cyan-200/35 bg-cyan-300/14 text-white" : "border-white/8 bg-white/[.035] text-slate-400 hover:text-white"}`}
                  key={id}
                  type="button"
                  onClick={() => { setDesktopGroup(id); setDesktopQuery(""); }}
                  aria-pressed={selected}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-2 flex min-h-10 gap-1.5 overflow-x-auto pb-0.5" aria-live="polite">
          {visibleDesktopItems.map((item) => {
            const selected = item.id === active;
            return (
              <button
                className={`flex min-h-10 shrink-0 items-center gap-2 rounded-xl border px-2.5 text-xs font-black transition ${selected ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-transparent bg-white/[.025] text-slate-300 hover:border-white/10 hover:bg-white/[.06] hover:text-white"}`}
                key={item.id}
                type="button"
                onClick={() => selectItem(item)}
                aria-current={selected ? "page" : undefined}
              >
                <SectionIcon icon={item.icon} active={selected} compact />
                {item.label}
              </button>
            );
          })}
          {!visibleDesktopItems.length ? <p className="px-3 py-2 text-xs font-bold text-slate-400">Aucune section trouvée.</p> : null}
        </div>
      </div>

      {mobileOpen && typeof document !== "undefined" ? createPortal((
        <div className="fixed inset-0 z-[90] bg-slate-950/96 backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation Admin Pokémon">
          <div className="mx-auto flex h-full w-full max-w-lg flex-col p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-[max(1rem,env(safe-area-inset-top))]">
            <header className="flex items-center justify-between gap-3">
              <div>
                <small className="text-[10px] font-black uppercase tracking-[.2em] text-cyan-200/70">Admin Pokémon</small>
                <h2 className="text-xl font-black text-white">Changer de section</h2>
              </div>
              <button className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/[.06] text-white" type="button" onClick={() => setMobileOpen(false)} aria-label="Fermer la navigation">
                <X size={20} />
              </button>
            </header>
            <label className="relative mt-4 block">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                ref={mobileSearchRef}
                className={`${fieldClass} min-h-12 pl-12`}
                value={mobileQuery}
                onChange={(event) => setMobileQuery(event.target.value)}
                placeholder="Section, outil ou donnée…"
                aria-label="Rechercher une section"
              />
            </label>
            {!mobileQuery ? (
              <div className="mt-3 flex gap-2 overflow-x-auto pb-2" aria-label="Groupes de sections">
                {Object.entries(groupLabels).map(([id, label]) => (
                  <button
                    className={`flex shrink-0 items-center gap-1.5 rounded-xl border px-3 py-2 text-[10px] font-black uppercase tracking-[.08em] ${mobileGroup === id ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[.04] text-slate-400"}`}
                    key={id}
                    type="button"
                    onClick={() => setMobileGroup(id)}
                    aria-pressed={mobileGroup === id}
                  >
                    {label}<ChevronDown className={mobileGroup === id ? "rotate-180" : ""} size={13} />
                  </button>
                ))}
              </div>
            ) : null}
            <div className="mt-2 grid min-h-0 flex-1 auto-rows-min grid-cols-1 gap-2 overflow-y-auto pr-1 min-[430px]:grid-cols-2">
              {visibleMobileItems.map((item) => {
                const selected = item.id === active;
                return (
                  <button
                    className={`flex min-h-16 min-w-0 items-center gap-3 rounded-2xl border p-3 text-left transition ${selected ? "border-cyan-200/45 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[.04] text-slate-300"}`}
                    key={item.id}
                    type="button"
                    onClick={() => selectItem(item)}
                    aria-current={selected ? "page" : undefined}
                  >
                    <SectionIcon icon={item.icon} active={selected} />
                    <span className="min-w-0 flex-1">
                      <strong className="block truncate text-sm font-black">{item.label}</strong>
                      <small className="block truncate text-[9px] font-black uppercase tracking-[.1em] text-slate-500">{groupLabels[item.group]}</small>
                    </span>
                    {selected ? <Check className="shrink-0 text-cyan-200" size={18} /> : null}
                  </button>
                );
              })}
              {!visibleMobileItems.length ? <p className="col-span-full rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm font-bold text-slate-400">Aucune section ne correspond.</p> : null}
            </div>
          </div>
        </div>
      ), document.body) : null}
    </nav>
  );
}
