"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { preferredPokemonImage, typeBackground, typeColors, typeIcon, typeName } from "../site/pokemon-style";
import { uiAssets } from "../site/ui-assets";

const tabLabels = {
  overview: "Aperçu",
  cp: "PC & stats",
  moves: "Attaques",
  pvp: "PvP",
  shadow: "Shadow",
  assets: "Assets",
  checks: "Contrôle de fiche",
  json: "JSON",
};

const typeBackgroundNames = {
  BUG: "Bug",
  DARK: "Dark",
  DRAGON: "Dragon",
  ELECTRIC: "Electric",
  FAIRY: "Fairy",
  FIGHTING: "Fighting",
  FIRE: "Fire",
  FLYING: "Flying",
  GHOST: "Ghost",
  GRASS: "Grass",
  GROUND: "Ground",
  ICE: "Ice",
  NORMAL: "Normal",
  POISON: "Poison",
  PSYCHIC: "Psychic",
  ROCK: "Rock",
  STEEL: "Steel",
  WATER: "Water",
};

const sectionTones = {
  cyan: "border-cyan-200/20 bg-cyan-400/10 from-cyan-400/15",
  emerald: "border-emerald-200/20 bg-emerald-400/10 from-emerald-400/15",
  violet: "border-violet-200/20 bg-violet-400/10 from-violet-400/15",
  amber: "border-amber-200/20 bg-amber-400/10 from-amber-400/15",
  rose: "border-rose-200/20 bg-rose-400/10 from-rose-400/15",
};

const cardTones = [
  "border-cyan-200/16 bg-cyan-400/[0.075]",
  "border-emerald-200/16 bg-emerald-400/[0.075]",
  "border-violet-200/16 bg-violet-400/[0.075]",
  "border-amber-200/16 bg-amber-400/[0.075]",
];

function valueOrDash(value, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return `${value}${suffix}`;
}

function Section({ title, eyebrow, icon, children, tone = "cyan" }) {
  const toneClass = sectionTones[tone] || sectionTones.cyan;
  return (
    <section className={`relative overflow-hidden rounded-3xl border bg-gradient-to-br to-slate-950/18 p-4 shadow-[0_20px_70px_rgba(0,0,0,.2)] backdrop-blur sm:p-5 ${toneClass}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,.13),transparent_34%)]" />
      <div className="relative">
      {eyebrow ? (
        <p className="mb-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70">
          {eyebrow}
        </p>
      ) : null}
      <h3 className="mb-4 flex items-center gap-3 text-lg font-black tracking-tight text-white sm:text-xl">
        {icon ? (
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/35 p-2">
            <img className="pokemon-interface-icon max-h-full object-contain" src={icon} alt="" />
          </span>
        ) : null}
        <span>{title}</span>
      </h3>
      {children}
      </div>
    </section>
  );
}

/** Construit un fond de panneau à partir du type principal quand l'asset existe. */
function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.68), rgba(8,13,25,.52)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.7), rgba(2,6,23,.58))";
}

/** Retrouve le background Catch Card correspondant au type Pokémon. */
function catchCardBackground(type) {
  const name = typeBackgroundNames[String(type || "").toUpperCase()];
  return name ? `/ui/backgrounds/catchCards/CatchCard_TypeBG_${name}.png` : "";
}

function DataGrid({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <div
          className={`grid grid-cols-[2.45rem_minmax(0,1fr)] gap-3 rounded-2xl border p-4 text-left shadow-[0_12px_38px_rgba(0,0,0,.18)] ${cardTones[index % cardTones.length]}`}
          key={item.label}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-white/10 bg-white/[0.06]">
            {item.icon ? (
              <img className="pokemon-interface-icon h-6 w-6 object-contain" src={item.icon} alt="" />
            ) : (
              <span className="h-3 w-3 rounded-full bg-cyan-300" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
              {item.label}
            </span>
            <strong className="mt-2 block break-words text-base font-black text-white">
              {item.value}
            </strong>
          </span>
        </div>
      ))}
    </div>
  );
}

const languageLabels = {
  English: "Anglais",
  German: "Allemand",
  French: "Français",
  Italian: "Italien",
  Japanese: "Japonais",
  Korean: "Coréen",
  Spanish: "Espagnol",
};

const languageFlags = {
  English: "🇬🇧",
  German: "🇩🇪",
  French: "🇫🇷",
  Italian: "🇮🇹",
  Japanese: "🇯🇵",
  Korean: "🇰🇷",
  Spanish: "🇪🇸",
};

function TranslationGrid({ names = {} }) {
  const entries = Object.entries(names || {}).filter(([, value]) => value);
  if (!entries.length) return null;
  return (
    <Section title="Noms traduits" eyebrow="localisation" icon={uiAssets.icons.pokeball} tone="emerald">
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {entries.map(([language, value], index) => (
          <div className={`grid grid-cols-[2.2rem_minmax(0,1fr)] gap-3 rounded-2xl border p-3 ${cardTones[index % cardTones.length]}`} key={language}>
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.06] p-1.5 text-xs font-black text-cyan-100">
              <span className="text-lg">{languageFlags[language] || "🏳️"}</span>
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                {languageLabels[language] || language}
              </span>
              <strong className="mt-1 block break-words text-white">{value}</strong>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EmptyInline({ children }) {
  return (
    <p className="rounded-2xl border border-dashed border-white/15 bg-white/[0.035] p-4 text-sm font-bold text-slate-300">
      {children}
    </p>
  );
}

function CandyAmount({ value, icon, label = "bonbons" }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
      {icon ? <img className="h-5 w-5 shrink-0 object-contain" src={icon} alt="" /> : null}
      <span>{valueOrDash(value)} {label}</span>
    </span>
  );
}

function RewardValue({ candy, stardust, candyIcon }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <CandyAmount value={candy} icon={candyIcon} />
      <span className="inline-flex items-center gap-2">
        <img className="h-5 w-5 shrink-0 object-contain" src={uiAssets.icons.stardust} alt="" />
        <span>{valueOrDash(stardust)} poussières</span>
      </span>
    </span>
  );
}

function moveArray(moves) {
  if (!moves) return [];
  if (Array.isArray(moves)) return moves;
  if (typeof moves === "object") return Object.values(moves);
  return [];
}

function moveCollection(details, key, fallback) {
  const detailed = details?.[key];
  const detailedList = moveArray(detailed).filter(Boolean);
  return detailedList.length ? detailed : fallback;
}

function moveName(move, allMoves = {}) {
  if (!move) return "-";
  if (typeof move === "string") {
    const found = Object.values(allMoves)
      .flatMap(moveArray)
      .find((item) => item.id === move);
    return found?.names?.French || found?.names?.English || move;
  }
  return move.names?.French || move.names?.English || move.id || "-";
}

function formatRange(range) {
  if (!range || typeof range !== "object") return "-";
  if (range.min === undefined && range.max === undefined) return "-";
  return `${range.min ?? "?"} - ${range.max ?? "?"}`;
}

function formatDate(value) {
  if (!value) return "-";
  return String(value);
}

function MoveTypePill({ type, typeCatalog }) {
  if (!type) return null;
  return (
    <span
      className="inline-flex min-w-0 items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
      style={{ background: `color-mix(in srgb, ${typeColors[type] || "#64748b"} 55%, rgba(255,255,255,.12))` }}
    >
      {typeIcon(type, typeCatalog) ? (
        <img className="h-4 w-4 shrink-0 object-contain" src={typeIcon(type, typeCatalog)} alt="" />
      ) : null}
      <span className="truncate">{typeName(type, typeCatalog)}</span>
    </span>
  );
}

function formatBuffValue(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number" && value > 0) return `+${value}`;
  return String(value);
}

function BuffGrid({ buffs }) {
  if (!buffs || typeof buffs !== "object") return null;
  const rows = [
    ["Chance", buffs.activationChance !== undefined ? `${buffs.activationChance}%` : "-"],
    ["Attaque lanceur", formatBuffValue(buffs.attackerAttackStatsChange)],
    ["Défense lanceur", formatBuffValue(buffs.attackerDefenseStatsChange)],
    ["Attaque cible", formatBuffValue(buffs.targetAttackStatsChange)],
    ["Défense cible", formatBuffValue(buffs.targetDefenseStatsChange)],
  ];
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {rows.map(([label, value]) => (
        <span className="rounded-xl border border-white/10 bg-slate-950/45 px-3 py-2" key={label}>
          <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</small>
          <strong className="mt-1 block text-white">{value}</strong>
        </span>
      ))}
    </div>
  );
}

const availabilityLabels = {
  released: "Sorti",
  shinyReleased: "Shiny",
  shadowShinyReleased: "Shadow shiny",
  tradable: "Échange",
  pokemonHomeTransfer: "Home",
  shadow: "Shadow",
  dynamax: "Dyna",
  gigantamax: "GMax",
  apex: "Apex",
};

function ReleaseStatusGrid({ shinyAvailability, shadowShinyAvailability }) {
  const items = [
    ["Chromatique", shinyAvailability, uiAssets.icons.shiny],
    ["Shadow chromatique", shadowShinyAvailability, uiAssets.icons.shadow],
  ];
  return (
    <Section title="Sorties chromatiques" icon={uiAssets.icons.shiny} tone="violet">
      <div className="grid gap-3 lg:grid-cols-2">
        {items.map(([label, record, icon]) => {
          const released = Boolean(record?.released);
          return (
            <article
              className={`rounded-2xl border p-4 ${
                released
                  ? "border-emerald-300/25 bg-emerald-400/10"
                  : "border-white/10 bg-white/[0.045]"
              }`}
              key={label}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-white/10 bg-slate-950/40 p-2">
                  <img className="pokemon-interface-icon max-h-full object-contain" src={icon} alt="" />
                </span>
                <span className="min-w-0">
                  <strong className="block font-black text-white">{label}</strong>
                  <span className={released ? "mt-1 block text-sm font-bold text-emerald-100" : "mt-1 block text-sm font-bold text-slate-400"}>
                    {released ? "Disponible dans Pokémon GO" : "Pas encore disponible"}
                  </span>
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <span className="rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2">
                  <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Date</small>
                  <strong className="mt-1 block text-white">{formatDate(record?.releaseDate)}</strong>
                </span>
                <span className="rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2">
                  <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Évènement</small>
                  <strong className="mt-1 block break-words text-white">{record?.event || "-"}</strong>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function MoveList({ title, moves, typeCatalog = [], icon }) {
  const list = moveArray(moves).filter(Boolean).map((move) =>
    typeof move === "string" ? { id: move } : move,
  );
  return (
    <Section title={title} icon={icon}>
      {list.length ? (
        <div className="grid gap-3">
          {list.map((move) => (
            <div
              className="overflow-hidden rounded-2xl border border-white/10 bg-cover bg-center p-4 text-sm"
              style={{ backgroundImage: typePanelBackground(move.type, typeCatalog) }}
              key={move.id || move.slug || moveName(move)}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <span className="min-w-0">
                  <strong className="block break-words font-black text-white">
                    {moveName(move)}
                  </strong>
                  <small className="mt-1 block font-mono text-xs text-slate-500">{move.id}</small>
                </span>
                <MoveTypePill type={move.type} typeCatalog={typeCatalog} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Puissance", move.power],
                  ["Énergie", move.energy ?? move.combat?.energy],
                  ["Durée", move.durationMs ? `${move.durationMs} ms` : undefined],
                  ["Tours PvP", move.combat?.turns],
                  ["Puissance PvP", move.combat?.power],
                ].map(([label, value]) => (
                  <span className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2" key={label}>
                    <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{label}</small>
                    <strong className="mt-1 block break-words text-white">{valueOrDash(value)}</strong>
                  </span>
                ))}
              </div>
              <BuffGrid buffs={move.combat?.buffs} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyInline>Aucune attaque renseignée.</EmptyInline>
      )}
    </Section>
  );
}

function AssetGallery({ entry, payload }) {
  const [preview, setPreview] = useState(null);
  const assets = [];
  const add = (group, label, url, meta = "", options = {}) => {
    if (url) assets.push({ group, label, url, meta, female: Boolean(options.female) });
  };

  add("Pokémon GO", "Image principale", payload.assets?.image || entry.image);
  add("Pokémon GO", "Image shiny", payload.assets?.shinyImage || entry.shinyImage, "shiny");
  add("Portraits", "Portrait", payload.assets?.portrait, "méga / primo");
  add("Pokémon Home", "Home", payload.assets?.home?.image);
  add("Pokémon Home", "Home shiny", payload.assets?.home?.shinyImage, "shiny");

  for (const [index, asset] of (payload.assetForms || []).entries()) {
    const female = isFemaleAsset(asset);
    const meta = assetMeta([asset.form, asset.costume, female ? "Forme femelle" : ""]);
    add("Variantes GO", `Variante ${index + 1}`, asset.image, meta, { female });
    add("Variantes GO", `Variante shiny ${index + 1}`, asset.shinyImage, assetMeta(["shiny", female ? "Forme femelle" : ""]), { female });
  }
  for (const [index, asset] of (payload.assets?.home?.variants || []).entries()) {
    const female = isFemaleAsset(asset);
    const meta = assetMeta([asset.detail, asset.view, asset.form, asset.gender, asset.genderCode, female ? "Forme femelle" : ""]);
    add("Variantes Home", `Home ${index + 1}`, asset.image || asset.shinyImage, meta, { female });
  }
  for (const [index, asset] of (payload.assets?.shuffle?.variants || []).entries()) {
    add("Pokémon Shuffle", `Shuffle ${index + 1}`, asset.image, asset.tags?.join(" · ") || asset.state || "");
  }
  for (const [index, asset] of (payload.assets?.locationCards || []).entries()) {
    add("Backgrounds", `Background ${index + 1}`, asset.image, asset.name || asset.date || "");
  }
  const groups = [...assets.reduce((map, asset) => {
    if (!map.has(asset.group)) map.set(asset.group, []);
    map.get(asset.group).push(asset);
    return map;
  }, new Map()).entries()];

  return (
    <Section title="Galerie liée à la fiche" icon={uiAssets.icons.result}>
      {assets.length ? (
        <div className="space-y-5">
          {groups.map(([group, groupAssets]) => (
            <div key={group}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-black text-white">{group}</h4>
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-black text-slate-300">{groupAssets.length}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {groupAssets.map((asset, index) => (
                  <button
                    className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/45 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/10"
                    key={`${asset.url}-${index}`}
                    type="button"
                    onClick={() => setPreview(asset)}
                  >
                    <div className="relative flex aspect-square items-center justify-center bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.2),transparent_38%),rgba(255,255,255,.04)] p-4">
                      {asset.female ? <FemaleAssetBadge className="absolute left-3 top-3" /> : null}
                      <img className="max-h-full object-contain drop-shadow-2xl" src={asset.url} alt={asset.label} />
                    </div>
                    <div className="border-t border-white/10 p-3">
                      <div className="flex min-w-0 items-start justify-between gap-2">
                        <strong className="block truncate text-sm font-black text-white">{asset.label}</strong>
                        {asset.female ? <FemaleAssetBadge compact /> : null}
                      </div>
                      <span className="mt-1 block truncate text-xs font-bold text-slate-400">{asset.meta || "standard"}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {preview ? (
            <div className="fixed inset-0 z-[1120] grid place-items-center bg-slate-950/86 p-4 backdrop-blur-md" role="presentation" onClick={() => setPreview(null)}>
              <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#07111f]" onClick={(event) => event.stopPropagation()}>
                <div className="flex items-center justify-between gap-3 border-b border-white/10 p-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <strong className="truncate text-xl font-black text-white">{preview.label}</strong>
                    {preview.female ? <FemaleAssetBadge /> : null}
                  </div>
                  <button className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-2xl" type="button" onClick={() => setPreview(null)}>×</button>
                </div>
                <div className="grid max-h-[78dvh] place-items-center overflow-auto p-5">
                  <img className="max-h-[70dvh] object-contain" src={preview.url} alt={preview.label} />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyInline>Aucun asset lié à cette fiche.</EmptyInline>
      )}
    </Section>
  );
}

function isFemaleAsset(asset = {}) {
  return asset.isFemale === true || asset.gender === "female-difference" || asset.genderCode === "fd";
}

function assetMeta(parts) {
  return parts.filter(Boolean).join(" · ");
}

function FemaleAssetBadge({ compact = false, className = "" }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full border border-fuchsia-300/45 bg-fuchsia-500/18 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-fuchsia-100 shadow-[0_0_24px_rgba(217,70,239,.22)] ${className}`}
    >
      <span aria-hidden="true">♀</span>
      <span>{compact ? "Femelle" : "Forme femelle"}</span>
    </span>
  );
}

function IssuesPanel({ entry }) {
  return (
    <Section title="Contrôles de fiche" icon={uiAssets.icons.problem} tone="amber">
      {(entry.issues || []).length ? (
        <div className="space-y-3">
          {entry.issues.map((issue) => (
            <div
              className="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-4"
              key={`${issue.path}-${issue.issue}`}
            >
              <strong className="block break-words font-mono text-sm text-amber-100">
                {issue.path}
              </strong>
              <span className="mt-1 block text-sm font-bold text-amber-200/80">
                {issue.issue} · attendu {issue.expected} · actuel {issue.actual}
              </span>
              {issue.ruleName ? (
                <span className="mt-2 inline-flex rounded-full border border-amber-200/25 bg-amber-200/10 px-3 py-1 text-xs font-black text-amber-100">
                  Règle: {issue.ruleName}
                </span>
              ) : null}
              {issue.suggested !== undefined ? (
                <pre className="mt-3 max-h-44 overflow-auto rounded-xl border border-white/10 bg-slate-950/50 p-3 font-mono text-xs leading-5 text-amber-50">
                  {JSON.stringify(issue.suggested, null, 2)}
                </pre>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <EmptyInline>Aucun problème détecté.</EmptyInline>
      )}
    </Section>
  );
}

function PvpPanel({ pvp, moveDetails }) {
  const labels = {
    littleCup: "Little Cup",
    greatLeague: "Great League",
    ultraLeague: "Ultra League",
    masterLeague: "Master League",
  };
  const icons = {
    littleCup: uiAssets.icons.littleLeague,
    greatLeague: uiAssets.icons.greatLeague,
    ultraLeague: uiAssets.icons.ultraLeague,
    masterLeague: uiAssets.icons.masterLeague,
  };
  const leagues = Object.entries(labels);
  return (
    <Section title="Ligues PvP" icon={uiAssets.icons.battle}>
      <div className="grid gap-3 lg:grid-cols-2">
        {leagues.map(([key, label]) => {
          const value = pvp?.[key];
          if (!value) {
            return (
              <article className="rounded-2xl border border-white/10 bg-white/[0.035] p-4" key={key}>
                <div className="flex items-center gap-3">
                  <img className="h-10 w-10 object-contain" src={icons[key]} alt="" />
                  <strong className="block font-black text-white">{label}</strong>
                </div>
                <span className="mt-2 block text-sm font-bold text-slate-500">Aucune donnée PvP renseignée.</span>
              </article>
            );
          }
          const rank = value.rank1 || {};
          const ivs = rank.ivs || {};
          const moves = value.bestMovesets || {};
          return (
            <article className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4" key={key}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex min-w-0 items-center gap-3">
                  <img className="h-12 w-12 shrink-0 object-contain" src={icons[key]} alt="" />
                  <strong className="text-lg font-black text-white">{label}</strong>
                </span>
                <span className="rounded-full bg-slate-950/45 px-3 py-1 text-xs font-black text-cyan-100">
                  {value.tierRank || "Non classé"}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  ["Niveau", rank.level],
                  ["PC", rank.cp],
                  ["IV", `${ivs.attack ?? "?"}/${ivs.defense ?? "?"}/${ivs.stamina ?? "?"}`],
                ].map(([name, data]) => (
                  <span className="rounded-xl border border-white/10 bg-slate-950/35 px-3 py-2" key={name}>
                    <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">{name}</small>
                    <strong className="mt-1 block text-white">{valueOrDash(data)}</strong>
                  </span>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-white/10 bg-slate-950/35 p-3">
                <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Meilleur moveset</small>
                <strong className="mt-1 block break-words text-white">
                  {moveName(moves.fast, moveDetails)}
                  {(moves.charged || []).length ? ` + ${(moves.charged || []).map((id) => moveName(id, moveDetails)).join(" / ")}` : ""}
                </strong>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function JsonBlock({ payload }) {
  return (
    <pre className="max-h-[62dvh] overflow-auto rounded-3xl border border-cyan-300/15 bg-slate-950 p-4 text-xs leading-6 text-cyan-50 shadow-inner sm:text-sm">
      {JSON.stringify(payload, null, 2)}
    </pre>
  );
}

function AdminActions({ entry, assetChecked, onAssetChecked, onCopyPatch, onAuditUrls, onAssetAudit, extraPanel }) {
  return (
    <Section title="Outils admin" eyebrow="privé" icon={uiAssets.icons.radar}>
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-50 transition hover:border-emerald-200/50 hover:bg-emerald-400/18">
          <input
            className="h-5 w-5 accent-emerald-400"
            type="checkbox"
            checked={Boolean(assetChecked)}
            onChange={(event) => onAssetChecked?.(entry.key, event.target.checked)}
          />
          Assets OK
        </label>
        <button
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onCopyPatch?.(entry)}
        >
          Copier le brouillon JSON
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onAuditUrls?.(entry)}
        >
          Vérifier les URLs
        </button>
        <button
          className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onAssetAudit?.(entry)}
        >
          Audit assets
        </button>
      </div>
      {extraPanel ? (
        <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/55 p-4 text-sm text-slate-200">
          {extraPanel}
        </div>
      ) : null}
    </Section>
  );
}

export function DetailModal({
  open,
  entry,
  detail,
  mode = "public",
  onClose,
  onCopyPatch,
  onAuditUrls,
  onAssetAudit,
  assetChecked = false,
  onAssetChecked,
  extraPanel,
  onPrevious,
  onNext,
  typeCatalog = [],
  weatherCatalog = [],
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const payload = detail?.detail || detail || {};
  const tabs = useMemo(
    () =>
      [
        "overview",
        "cp",
        "moves",
        "pvp",
        payload.shadow || entry?.availability?.shadow ? "shadow" : null,
        "assets",
        (entry?.issues || []).length ? "checks" : null,
        "json",
      ].filter(Boolean),
    [entry, payload],
  );

  useEffect(() => {
    setActiveTab("overview");
  }, [entry?.key]);

  useEffect(() => {
    if (!tabs.includes(activeTab)) setActiveTab("overview");
  }, [activeTab, tabs]);

  if (!open || !entry || typeof document === "undefined") return null;

  const stats = payload.stats || entry.stats || {};
  const maxCp = payload.maxCp || entry.maxCp || {};
  const size = payload.size || {};
  const availability = payload.availability || entry.availability || {};
  const shinyAvailability = payload.shinyAvailability || payload.sourceData?.shinyAvailability || null;
  const shadowShinyAvailability =
    payload.shadowShinyAvailability || payload.sourceData?.shadowShinyAvailability || null;
  const pvp = payload.pvp || {};
  const moveDetails = payload.moveDetails || {};
  const cpByLevel = payload.cpByLevel || [];
  const captureRewards = payload.captureRewards || {};
  const secondMove = payload.secondChargeMoveCost || {};
  const names = payload.names || payload.sourceData?.names || {};
  const region = payload.region || {};
  const weatherNames = (payload.weatherBoost || entry.weatherBoost || [])
    .map((weatherId) => {
      const item = (weatherCatalog || []).find((weather) => weather.id === weatherId || weather.slug === weatherId);
      return item?.names?.French || weatherId;
    })
    .filter(Boolean);
  const mainType = String(entry.primaryType || payload.primaryType || "NORMAL").toUpperCase();
  const mainTypeColor = typeColors[mainType] || "#38bdf8";
  const displayImage = preferredPokemonImage({
    ...entry,
    assets: payload.assets || entry.assets,
    image: payload.assets?.portrait || payload.assets?.image || entry.image,
    homeImage:
      payload.assets?.home?.image ||
      payload.assets?.home?.shinyImage ||
      entry.homeImage,
    shuffleImage:
      payload.assets?.shuffle?.variants?.find((asset) => !asset?.shiny && asset?.image)?.image ||
      payload.assets?.shuffle?.variants?.find((asset) => asset?.image)?.image ||
      entry.shuffleImage,
  });
  const candyIcon =
    payload.assets?.candy?.image ||
    payload.sourceData?.assets?.candy?.image ||
    entry.assets?.candy?.image ||
    null;
  const shinyHeroImage =
    payload.assets?.portraitShiny ||
    payload.assets?.shinyImage ||
    entry.shinyImage ||
    null;
  const catchBackground = catchCardBackground(mainType);

  return createPortal(
    (
    <div className="fixed inset-0 z-[1100] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-md sm:items-center sm:p-6" role="presentation" onClick={onClose}>
      <div
        className="max-h-[96dvh] w-full max-w-6xl overflow-hidden rounded-t-[2rem] border border-white/10 text-white shadow-[0_30px_120px_rgba(0,0,0,.65)] sm:max-h-[92dvh] sm:rounded-[2rem]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${mainTypeColor} 24%, #0d1a2b), #08111f 72%)`,
        }}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="relative overflow-hidden border-b border-white/10 bg-cover bg-center px-4 py-5 sm:px-6 sm:py-6"
          style={{
            backgroundImage: `${
              catchBackground
                ? `linear-gradient(135deg, rgba(4,10,22,.62), color-mix(in srgb, ${mainTypeColor} 24%, rgba(4,10,22,.32))), url("${catchBackground}"), `
                : ""
            }${typePanelBackground(mainType, typeCatalog)}, radial-gradient(circle_at_8%_0%,${mainTypeColor}88,transparent_36%), radial-gradient(circle_at_92%_15%,rgba(255,255,255,.18),transparent_34%)`,
          }}
        >
          <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]" />
          {shinyHeroImage ? (
            <img
              className="pointer-events-none absolute -bottom-16 -right-20 h-80 w-80 rotate-6 object-contain opacity-24 blur-[0.35px] saturate-125 sm:-bottom-28 sm:-right-32 sm:h-[30rem] sm:w-[30rem] lg:-right-44 lg:h-[38rem] lg:w-[38rem]"
              src={shinyHeroImage}
              alt=""
            />
          ) : null}
          <div className="relative flex items-center gap-4 pr-14">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-white/80 bg-white shadow-[0_18px_60px_rgba(0,0,0,.32)] sm:h-36 sm:w-36">
              {displayImage ? (
                <img className="max-h-[8.2rem] object-contain drop-shadow-[0_16px_34px_rgba(0,0,0,.28)] sm:max-h-[10.2rem]" src={displayImage} alt={entry.name} />
              ) : (
                <span className="h-10 w-10 rounded-full border-[10px] border-slate-900/20" />
              )}
            </div>
            <div className="min-w-0">
              <span className="font-mono text-sm font-black uppercase tracking-[0.24em] text-cyan-100/80">
                N° {entry.dexId}
              </span>
              <h2 className="mt-1 truncate text-3xl font-black tracking-tight text-white sm:text-5xl">
                {entry.name}
              </h2>
              <p className="mt-2 text-sm font-bold text-slate-200 sm:text-base">
                {entry.profile || entry.kind} · {entry.form || "normal"} · Gén. {entry.generation || "?"}
              </p>
            </div>
            <button
              className="absolute right-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-white/30 bg-white/10 text-3xl font-light text-white transition hover:bg-white/20"
              type="button"
              onClick={onClose}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="max-h-[calc(96dvh-150px)] overflow-auto p-4 sm:max-h-[calc(92dvh-165px)] sm:p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), radial-gradient(circle at 8% 0%, ${mainTypeColor}3d, transparent 30%), radial-gradient(circle at 92% 10%, color-mix(in srgb, ${mainTypeColor} 28%, transparent), transparent 28%)`,
            backgroundSize: "30px 30px, 30px 30px, auto, auto",
          }}
        >
          <div className="grid grid-cols-2 gap-3">
            <button className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-black transition hover:bg-white/10" type="button" onClick={onPrevious}>
              Fiche précédente
            </button>
            <button className="rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-400 px-4 py-3 text-sm font-black text-white shadow-[0_14px_45px_rgba(14,165,233,.28)] transition hover:scale-[1.01]" type="button" onClick={onNext}>
              Fiche suivante
            </button>
          </div>

          <nav className="mt-4 flex flex-wrap gap-2 pb-2" aria-label="Onglets de fiche">
            {tabs.map((tab) => (
              <button
                className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                  activeTab === tab
                    ? tab === "checks"
                      ? "border-red-200/60 bg-gradient-to-r from-red-500 to-amber-400 text-white shadow-[0_12px_35px_rgba(248,113,113,.24)]"
                      : "border-cyan-200/50 bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-[0_12px_35px_rgba(14,165,233,.25)]"
                    : tab === "checks"
                      ? "border-red-300/35 bg-red-500/10 text-red-100 hover:bg-red-500/20"
                      : "border-white/10 bg-white/[0.055] text-slate-200 hover:bg-white/10"
                }`}
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </nav>

          {payload.error ? (
            <div className="mt-4 rounded-2xl border border-red-300/30 bg-red-500/10 p-4 text-sm font-bold text-red-100">
              {payload.error}
            </div>
          ) : null}

          <div className="mt-4 space-y-4">
            {activeTab === "overview" ? (
              <>
                {mode === "admin" ? (
                  <AdminActions
                    entry={entry}
                    assetChecked={assetChecked}
                    onAssetChecked={onAssetChecked}
                    onCopyPatch={onCopyPatch}
                    onAuditUrls={onAuditUrls}
                    onAssetAudit={onAssetAudit}
                    extraPanel={extraPanel}
                  />
                ) : null}
                <TranslationGrid names={names} />
                <Section title="Identifiants" icon={uiAssets.icons.tag} tone="violet">
                  <DataGrid
                    items={[
                      { label: "ID", value: valueOrDash(payload.id), icon: uiAssets.icons.tag },
                      { label: "Form ID", value: valueOrDash(payload.formId), icon: uiAssets.icons.tag },
                      { label: "Slug", value: valueOrDash(payload.slug), icon: uiAssets.icons.search },
                      { label: "Région", value: region.names?.French || payload.regionId || "-", icon: uiAssets.icons.pokedex },
                      { label: "Génération", value: valueOrDash(payload.generation || entry.generation), icon: uiAssets.icons.pokemon },
                      { label: "Classe", value: valueOrDash(payload.pokemonClass), icon: uiAssets.icons.tag },
                      { label: "Forme", value: valueOrDash(payload.form || entry.form), icon: uiAssets.icons.pokemon },
                      { label: "Fichier", value: valueOrDash(entry.file), icon: uiAssets.icons.copy },
                    ]}
                  />
                </Section>
                <Section title="Identité et capture" icon={uiAssets.icons.pokedexKanto} tone="cyan">
                  <DataGrid
                    items={[
                      { label: "Types", value: [entry.primaryType, entry.secondaryType].filter(Boolean).map((type) => typeName(type, typeCatalog)).join(" / ") || "-", icon: uiAssets.icons.type },
                      { label: "Boost météo", value: weatherNames.join(", ") || "-", icon: uiAssets.icons.weatherBoost },
                      { label: "Taille", value: valueOrDash(size.height, " m"), icon: uiAssets.icons.height },
                      { label: "Poids", value: valueOrDash(size.weight, " kg"), icon: uiAssets.icons.weight },
                      { label: "Distance buddy", value: valueOrDash(payload.buddyDistance, " km"), icon: uiAssets.icons.buddy },
                      { label: "Taux capture", value: valueOrDash(payload.catchRate, "%"), icon: uiAssets.icons.grass },
                      { label: "Taux fuite", value: valueOrDash(payload.fleeRate, "%"), icon: uiAssets.icons.grass },
                      { label: "Énergie méga", value: valueOrDash(payload.megaEnergyReward), icon: uiAssets.icons.megaEnergy },
                      { label: "Coût méga", value: valueOrDash(payload.energyCost), icon: uiAssets.icons.megaEnergy },
                      { label: "Récompenses", value: <RewardValue candy={captureRewards.candy} stardust={captureRewards.stardust} candyIcon={candyIcon} />, icon: candyIcon || uiAssets.icons.candy },
                      { label: "2e attaque", value: <RewardValue candy={secondMove.candy} stardust={secondMove.stardust} candyIcon={candyIcon} />, icon: candyIcon || uiAssets.icons.candy },
                    ]}
                  />
                </Section>
                <Section title="Disponibilité" icon={uiAssets.icons.shiny} tone="emerald">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(availability).map(([key, value]) => (
                      <span
                        className={`inline-flex min-h-9 items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-xs font-black ${
                          value
                            ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-100"
                            : "border-white/10 bg-white/[0.045] text-slate-400"
                        }`}
                        key={key}
                      >
                        <span className="truncate">{availabilityLabels[key] || key}</span>
                        <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${value ? "bg-emerald-300" : "bg-slate-600"}`} />
                      </span>
                    ))}
                  </div>
                </Section>
                <ReleaseStatusGrid
                  shinyAvailability={shinyAvailability}
                  shadowShinyAvailability={shadowShinyAvailability}
                />
              </>
            ) : null}

            {activeTab === "cp" ? (
              <>
                <Section title="Statistiques de base" icon={uiAssets.icons.swords} tone="rose">
                  <DataGrid
                    items={[
                      { label: "Attaque", value: valueOrDash(stats.attack), icon: uiAssets.icons.swords },
                      { label: "Défense", value: valueOrDash(stats.defense), icon: uiAssets.icons.shieldAlt },
                      { label: "Endurance", value: valueOrDash(stats.stamina), icon: uiAssets.icons.up },
                    ]}
                  />
                </Section>
                <Section title="PC max et rencontres" icon={uiAssets.icons.maxPc} tone="cyan">
                  <DataGrid
                    items={[
                      { label: "PC 50", value: valueOrDash(maxCp.maxLevel50), icon: uiAssets.icons.maxPc },
                      { label: "PC 40", value: valueOrDash(maxCp.maxLevel40), icon: uiAssets.icons.maxPc },
                      { label: "Raid 20", value: valueOrDash(maxCp.raidLevel20), icon: uiAssets.icons.maxPc },
                      { label: "Météo 25", value: valueOrDash(maxCp.weatherBoostLevel25), icon: uiAssets.icons.maxPc },
                      { label: "Recherche 15", value: valueOrDash(maxCp.researchLevel15), icon: uiAssets.icons.maxPc },
                    ]}
                  />
                </Section>
                <Section title="PC par niveau" icon={uiAssets.icons.maxPc} tone="violet">
                  {cpByLevel.length ? (
                    <div className="grid max-h-[48dvh] gap-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
                      {cpByLevel.map((row) => (
                        <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3" key={row.level}>
                          <span className="font-bold text-slate-300">Niv. {row.level}</span>
                          <strong className="font-black text-white">
                            {row.cp ?? `${row.minCp ?? "?"} - ${row.maxCp ?? "?"} PC`}
                          </strong>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <EmptyInline>Pas de table PC calculée.</EmptyInline>
                  )}
                </Section>
              </>
            ) : null}

            {activeTab === "moves" ? (
              <>
                <MoveList title="Attaques rapides" moves={moveCollection(moveDetails, "quickMoves", payload.quickMoves)} typeCatalog={typeCatalog} icon={uiAssets.icons.maxPc} />
                <MoveList title="Attaques chargées" moves={moveCollection(moveDetails, "cinematicMoves", payload.cinematicMoves)} typeCatalog={typeCatalog} icon={uiAssets.icons.attackMove} />
                <MoveList title="Attaques elite rapides" moves={moveCollection(moveDetails, "eliteQuickMoves", payload.eliteQuickMoves)} typeCatalog={typeCatalog} icon={uiAssets.icons.maxPc} />
                <MoveList title="Attaques elite chargées" moves={moveCollection(moveDetails, "eliteCinematicMoves", payload.eliteCinematicMoves)} typeCatalog={typeCatalog} icon={uiAssets.icons.attackMove} />
                <MoveList title="Attaques Max / GMax" moves={moveCollection(moveDetails, "maxMoves", payload.maxBattle?.moves)} typeCatalog={typeCatalog} icon={uiAssets.icons.breadBadge} />
              </>
            ) : null}

            {activeTab === "pvp" ? (
              <PvpPanel pvp={pvp} moveDetails={moveDetails} />
            ) : null}

            {activeTab === "shadow" ? (
              <Section title="Shadow / Purification" icon={uiAssets.icons.shadow} tone="violet">
                <DataGrid
                  items={[
                    { label: "Shadow", value: availability.shadow ? "Oui" : "Non", icon: uiAssets.icons.shadow },
                    { label: "Purification", value: valueOrDash(payload.shadow?.purificationCost?.stardust, " poussières"), icon: uiAssets.icons.purified },
                    { label: "Bonbons", value: <CandyAmount value={payload.shadow?.purificationCost?.candy} icon={candyIcon} />, icon: candyIcon || uiAssets.icons.candy },
                    { label: "Sortie", value: formatDate(payload.shadow?.firstReleaseDate || payload.shadow?.releaseDate), icon: uiAssets.icons.radar },
                    {
                      label: "Catch CP",
                      value: `Normal ${formatRange(payload.shadow?.catchCp?.normal)} / Météo ${formatRange(payload.shadow?.catchCp?.weatherBoosted)}`,
                      icon: uiAssets.icons.cp,
                    },
                  ]}
                />
              </Section>
            ) : null}

            {activeTab === "assets" ? <AssetGallery entry={entry} payload={payload} /> : null}
            {activeTab === "checks" ? <IssuesPanel entry={entry} /> : null}
            {activeTab === "json" ? (
              <div className="space-y-4">
                <Section title="JSON principal" icon={uiAssets.icons.copy} tone="cyan">
                  <JsonBlock payload={payload.sourceData || payload} />
                </Section>
                <Section title="JSON assets" icon={uiAssets.icons.result} tone="cyan">
                  {payload.assetSourceData ? (
                    <JsonBlock payload={payload.assetSourceData} />
                  ) : (
                    <EmptyInline>
                      Aucun fichier asset séparé lié à cette fiche
                      {payload.assetSourceFile ? ` (${payload.assetSourceFile}).` : "."}
                    </EmptyInline>
                  )}
                </Section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
    ),
    document.body,
  );
}
