"use client";

import { ChevronDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { fieldClass } from "./admin-ui";

const groupLabels = {
  data: "Données Pokémon",
  combat: "Combat",
  events: "Événements",
  maintenance: "Maintenance",
  quality: "Qualité & supervision",
};

function SectionIcon({ icon, active }) {
  if (typeof icon === "string") {
    return (
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border p-1.5 ${active ? "border-cyan-200/35 bg-cyan-300/15 shadow-[0_0_22px_rgba(34,211,238,.24)]" : "border-white/8 bg-black/20"}`}>
        <img className="h-full w-full object-contain" src={icon} alt="" loading="lazy" />
      </span>
    );
  }
  const Icon = icon;
  return (
    <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl border ${active ? "border-cyan-200/35 bg-cyan-300/15 text-cyan-100" : "border-white/8 bg-black/20 text-slate-400"}`}>
      <Icon size={17} aria-hidden="true" />
    </span>
  );
}

export function AdminSectionNavigation({ items, active, onSelect }) {
  const activeGroup = items.find((item) => item.id === active)?.group || "data";
  const [openGroups, setOpenGroups] = useState([activeGroup]);
  const [query, setQuery] = useState("");

  const grouped = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("fr");
    return Object.entries(groupLabels).map(([id, label]) => ({
      id,
      label,
      items: items.filter((item) => item.group === id && (!needle || item.label.toLocaleLowerCase("fr").includes(needle))),
    })).filter((group) => group.items.length);
  }, [items, query]);

  function toggleGroup(groupId) {
    setOpenGroups((current) => current.includes(groupId)
      ? current.filter((id) => id !== groupId)
      : [...current, groupId]);
  }

  function selectItem(item) {
    setQuery("");
    setOpenGroups([item.group]);
    onSelect(item.id);
  }

  const shortcuts = ["overview", "my-collection", "shiny"]
    .map((id) => items.find((item) => item.id === id))
    .filter(Boolean);

  return (
    <nav className="mt-4 rounded-2xl border border-white/10 bg-slate-950/38 p-3" aria-label="Sections Admin Pokémon">
      <label className="relative mb-3 block">
        <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          className={`${fieldClass} min-h-10 py-2 pl-11`}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Rechercher une section…"
          aria-label="Rechercher une section Admin Pokémon"
        />
      </label>
      <div className="mb-3 flex gap-2 overflow-x-auto pb-1 lg:hidden" aria-label="Accès rapides">
        {shortcuts.map((item) => (
          <button
            className={`shrink-0 rounded-xl border px-3 py-2 text-xs font-black ${item.id === active ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-white/10 bg-white/[0.05] text-slate-300"}`}
            key={item.id}
            type="button"
            onClick={() => selectItem(item)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="grid items-start gap-2 lg:grid-cols-2 2xl:grid-cols-5">
        {grouped.map((group) => {
          const isOpen = Boolean(query) || group.id === activeGroup || openGroups.includes(group.id);
          const containsActive = group.items.some((item) => item.id === active);
          return (
            <section className={`overflow-hidden rounded-xl border ${containsActive ? "border-cyan-200/25 bg-cyan-400/[0.07]" : "border-white/8 bg-white/[0.035]"}`} key={group.id}>
              <button
                className="flex min-h-11 w-full items-center justify-between gap-2 px-3 text-left text-xs font-black uppercase tracking-[0.12em] text-slate-200"
                type="button"
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
              >
                <span className="truncate">{group.label}</span>
                <ChevronDown className={`shrink-0 transition ${isOpen ? "rotate-180" : ""}`} size={16} />
              </button>
              {isOpen ? (
                <div className="grid gap-1 border-t border-white/8 p-1.5">
                  {group.items.map((item) => {
                    const selected = item.id === active;
                    return (
                      <button
                        className={`flex min-h-11 min-w-0 items-center gap-2 rounded-xl border px-2.5 text-left text-xs font-black transition ${selected ? "border-cyan-200/40 bg-cyan-300/15 text-white" : "border-transparent text-slate-300 hover:border-white/10 hover:bg-white/[0.06] hover:text-white"}`}
                        key={item.id}
                        type="button"
                        onClick={() => selectItem(item)}
                        aria-current={selected ? "page" : undefined}
                      >
                        <SectionIcon icon={item.icon} active={selected} />
                        <span className="min-w-0 truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </section>
          );
        })}
      </div>
      {!grouped.length ? <p className="p-4 text-center text-sm font-bold text-slate-400">Aucune section ne correspond à la recherche.</p> : null}
    </nav>
  );
}
