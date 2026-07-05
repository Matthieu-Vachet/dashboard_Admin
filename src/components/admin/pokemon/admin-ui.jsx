"use client";

import { Filter, Gauge, Image as ImageIcon, Layers } from "lucide-react";
import { pokemonVariantLabel, preferredPokemonImage } from "@/components/site/pokemon-style";

export const panelClass =
  "rounded-2xl border border-white/10 bg-white/[0.055] p-4 shadow-[0_22px_90px_rgba(0,0,0,.24)] backdrop-blur-xl sm:p-5";
export const fieldClass =
  "min-h-12 w-full rounded-2xl border border-white/10 bg-slate-950/45 px-4 text-sm font-bold text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-400/10";
export const buttonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.075] px-4 py-2 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15";
export const primaryButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-2 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.26)] transition hover:scale-[1.01]";

const generationFilters = [
  ["all", "Toutes", null],
  ["1", "Kanto", "/ui/PokedexV2/kanto_starters.png"],
  ["2", "Johto", "/ui/PokedexV2/jhoto_starters.png"],
  ["3", "Hoenn", "/ui/PokedexV2/hoenn_starters.png"],
  ["4", "Sinnoh", "/ui/PokedexV2/sinnoh_starters.png"],
  ["5", "Unys", "/ui/PokedexV2/unova_starters.png"],
  ["6", "Kalos", "/ui/PokedexV2/kalos_starters.png"],
  ["7", "Alola", "/ui/PokedexV2/alola_starters.png"],
  ["8", "Galar", "/ui/PokedexV2/galar_starters.png"],
  ["hisui", "Hisui", "/ui/PokedexV2/hisui_starters.png"],
  ["9", "Paldea", "/ui/PokedexV2/paldea_starters.png"],
];

const assetStatTone = {
  cyan: "from-sky-500/24 via-cyan-300/12 to-slate-900/20 text-cyan-100 border-cyan-200/25",
  violet: "from-violet-500/24 via-fuchsia-300/10 to-slate-900/20 text-violet-100 border-violet-200/25",
  green: "from-emerald-400/24 via-teal-300/10 to-slate-900/20 text-emerald-100 border-emerald-200/25",
  amber: "from-amber-400/24 via-orange-300/10 to-slate-900/20 text-amber-100 border-amber-200/25",
};

const categoryLabels = {
  custom: "Règles personnalisées",
  pokemon: "Fiches Pokémon",
  form: "Formes",
  mega: "Méga / Primo",
  dynamax: "Dynamax",
  gigantamax: "Gigamax",
  assets: "Assets",
  moves: "Attaques",
  pvp: "PvP",
  availability: "Disponibilité",
  localization: "Localisation",
  reference: "Références",
  official: "Officiel",
  news: "Actualités",
  gamemaster: "Game Master",
  shuffle: "Shuffle",
};

export function formatCount(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

export function issueLabel(value) {
  return categoryLabels[value] || value || "Autre";
}

export function Panel({ title, eyebrow, action, children, className = "" }) {
  return (
    <section className={`${panelClass} ${className}`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow ? (
            <p className="mb-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-200/70">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function BarList({ items, labelKey = "id", valueKey = "count" }) {
  const max = Math.max(...items.map((item) => Number(item[valueKey]) || 0), 1);
  return (
    <div className="space-y-3">
      {items.length ? (
        items.map((item) => {
          const value = Number(item[valueKey]) || 0;
          return (
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3" key={item[labelKey]}>
              <div className="mb-2 flex items-center justify-between gap-3 text-sm">
                <span className="min-w-0 truncate font-black text-slate-100">{issueLabel(item[labelKey])}</span>
                <strong className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 font-mono text-xs font-black text-white">
                  {formatCount(value)}
                </strong>
              </div>
              <span className="block h-2.5 overflow-hidden rounded-full bg-white/10">
                <i
                  className="block h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                  style={{ width: `${(value / max) * 100}%` }}
                />
              </span>
              <p className="mt-2 text-xs font-bold leading-5 text-slate-400">
                {item[labelKey] === "custom"
                  ? "Issues remontées par tes règles JSON ajoutées."
                  : "Issues détectées par le checker intégré."}
              </p>
            </div>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucune donnée à afficher.
        </p>
      )}
    </div>
  );
}

export function AssetStatCard({ label, value, icon, tone = "cyan", detail }) {
  return (
    <article
      className={`relative min-w-0 overflow-hidden rounded-2xl border bg-gradient-to-br p-3 shadow-[0_18px_65px_rgba(0,0,0,.22)] ${assetStatTone[tone] || assetStatTone.cyan}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(255,255,255,.22),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.1),transparent_45%)]" />
      <div className="relative grid min-w-0 grid-cols-[3rem_minmax(0,1fr)] items-center gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-white/10 bg-slate-950/45 p-2 shadow-inner">
          {icon ? <img className="h-8 max-h-8 w-8 max-w-8 object-contain" src={icon} alt="" /> : <Gauge size={21} />}
        </span>
        <span className="min-w-0">
          <span className="block truncate text-xs font-black uppercase tracking-[0.18em] text-white/72">
            {label}
          </span>
          <strong className="block max-w-full overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[clamp(1.6rem,3vw,2.75rem)] font-black leading-none text-white drop-shadow-[0_0_18px_rgba(255,255,255,.16)]">
            {formatCount(value)}
          </strong>
        </span>
      </div>
      {detail ? (
        <p className="relative mt-3 truncate text-xs font-bold text-white/70">{detail}</p>
      ) : null}
    </article>
  );
}

export function GenerationFilterBar({ value, onChange }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/30 p-3 shadow-[0_18px_70px_rgba(0,0,0,.2)]">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-100/75">
          <Filter size={15} /> Générations
        </span>
        <button className="text-xs font-black text-cyan-100 underline-offset-4 hover:underline" type="button" onClick={() => onChange("all")}>
          Tout afficher
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 2xl:grid-cols-11">
        {generationFilters.map(([id, label, image]) => {
          const active = value === id;
          return (
            <button
              className={`group relative min-h-[74px] overflow-hidden rounded-2xl border px-3 py-2 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/45 ${
                active
                  ? "border-cyan-200/50 bg-cyan-400/15 shadow-[0_14px_45px_rgba(34,211,238,.16)]"
                  : "border-white/10 bg-white/[0.045]"
              }`}
              key={id}
              type="button"
              onClick={() => onChange(id)}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_10%,rgba(34,211,238,.22),transparent_38%)] opacity-0 transition group-hover:opacity-100" />
              {image ? (
                <img
                  className={`absolute bottom-1 right-1 h-14 max-w-[68%] object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,.35)] transition duration-300 group-hover:scale-105 group-hover:opacity-100 ${
                    active ? "opacity-100 saturate-125" : "opacity-45 saturate-75"
                  }`}
                  src={image}
                  alt=""
                  loading="lazy"
                />
              ) : (
                <Layers className="absolute bottom-3 right-3 text-cyan-100/60" size={24} />
              )}
              <span className="relative block text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                {id === "all" ? "Filtre" : `Gén. ${id}`}
              </span>
              <strong className="relative mt-1 block text-sm font-black text-white">{label}</strong>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export function CompletionList({ items }) {
  return (
    <div className="space-y-3">
      {items.length ? (
        items.map((item) => {
          const percent = item.percent ?? Math.round((item.complete / Math.max(item.count, 1)) * 100);
          return (
            <div className="grid grid-cols-[5.5rem_1fr_4.6rem] items-center gap-3 text-sm" key={item.generation || item.id}>
              <span className="truncate font-bold text-slate-300">
                {item.generation ? `Gén. ${item.generation}` : item.id}
              </span>
              <span className="h-3 overflow-hidden rounded-full bg-white/10">
                <i
                  className="block h-full rounded-full bg-gradient-to-r from-emerald-300 via-cyan-400 to-sky-500"
                  style={{ width: `${Math.min(100, percent)}%` }}
                />
              </span>
              <strong className="text-right font-black text-white">{percent}%</strong>
              <span className="col-start-2 text-xs font-bold text-slate-500">
                {item.complete || 0}/{item.count || 0} fiches complètes
              </span>
            </div>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucune donnée à afficher.
        </p>
      )}
    </div>
  );
}

export function HistoryList({ history = [] }) {
  return (
    <div className="space-y-3">
      {history.length ? (
        history.map((item) => (
          <div
            className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
            key={`${item.hash}-${item.date}`}
          >
            <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
              {item.date}
            </span>
            <strong className="mt-1 block text-sm font-black text-white">{item.subject}</strong>
            <small className="mt-1 block font-mono text-xs text-cyan-200/70">{item.hash}</small>
          </div>
        ))
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Historique indisponible pour le moment.
        </p>
      )}
    </div>
  );
}

export function MiniCardList({ entries, onOpen }) {
  return (
    <div className="grid gap-3">
      {entries.length ? (
        entries.map((entry) => {
          const issues = entry.issues?.length || 0;
          const image = preferredPokemonImage(entry) || entry.shinyImage;
          return (
            <button
              className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/10"
              key={entry.key}
              type="button"
              onClick={() => onOpen(entry)}
            >
              <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-2xl border border-white/10 bg-white/[0.055] p-1.5 shadow-inner">
                {image ? (
                  <img className="max-h-full object-contain drop-shadow-[0_12px_20px_rgba(0,0,0,.4)] transition group-hover:scale-110" src={image} alt="" />
                ) : (
                  <ImageIcon className="text-cyan-100/60" size={22} />
                )}
              </span>
              <span className="min-w-0">
                <strong className="block truncate font-black text-white">{entry.name}</strong>
                <small className="mt-1 block truncate text-xs font-bold text-slate-400">
                  {entry.dexId} · {pokemonVariantLabel(entry)}
                </small>
              </span>
              <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-100">
                {issues}
              </span>
            </button>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Rien à afficher ici.
        </p>
      )}
    </div>
  );
}

export function ControlCardsPanel({ title = "Fiches à contrôler", entries, onOpen, description }) {
  const customIssueCount = entries.reduce((total, entry) => total + (entry.issues?.length || 0), 0);

  return (
    <Panel
      title={title}
      eyebrow="contrôle de fiche"
      action={
        <span className="rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-100">
          {formatCount(customIssueCount)} clé(s)
        </span>
      }
    >
      <p className="mb-4 rounded-2xl border border-amber-200/15 bg-amber-400/10 p-4 text-sm font-bold leading-6 text-amber-50/85">
        {description || "Toutes les fiches Pokémon qui ne respectent pas une règle active sont regroupées ici, avec leur sprite Home quand il existe."}
      </p>
      <MiniCardList entries={entries} onOpen={onOpen} />
    </Panel>
  );
}

export function JsonIssueList({ entries }) {
  return (
    <div className="grid gap-3">
      {entries.length ? (
        entries.map((entry) => {
          const customIssues = (entry.issues || []).filter((issue) => issue.category === "custom");
          return (
            <article
              className="rounded-2xl border border-white/10 bg-slate-950/35 p-4"
              key={entry.key}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="min-w-0">
                  <strong className="block truncate font-black text-white">{entry.name}</strong>
                  <small className="mt-1 block truncate text-xs font-bold text-slate-400">
                    {entry.kind} · {entry.file}
                  </small>
                </span>
                <span className="rounded-full border border-amber-300/30 bg-amber-400/10 px-3 py-1 text-xs font-black text-amber-100">
                  {customIssues.length}
                </span>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {customIssues.slice(0, 8).map((issue) => (
                  <span
                    className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200"
                    key={`${entry.key}-${issue.ruleId}-${issue.path}`}
                  >
                    {issue.path}
                  </span>
                ))}
              </div>
            </article>
          );
        })
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Rien à afficher ici.
        </p>
      )}
    </div>
  );
}
