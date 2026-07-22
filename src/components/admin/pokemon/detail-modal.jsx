"use client";

/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useId, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  preferredPokemonImage,
  typeBackground,
  typeColors,
  typeIcon,
  typeName,
} from "@/components/site/pokemon-style";
import { pokemonVariantBadges } from "@/lib/pokemon-variant-resolver";
import { uiAssets } from "@/components/site/ui-assets";
import { Checkbox } from "@/components/ui/checkbox";
import { EmptyState } from "@/components/admin/shared/state-system";

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

const tabIcons = {
  overview: "/ui/icons/tabs/ic_alola.png",
  cp: "/ui/icons/tabs/today_evolve.png",
  moves: "/ui/icons/TodayView_Icon_AttackMove.webp",
  pvp: "/ui/icons/tabs/today_battle.png",
  shadow: "/ui/icons/tabs/ic_shadow_filter.png",
  assets: "/ui/icons/tabs/ic_mythical.png",
  checks: "/ui/icons/probleme.svg",
  json: "/ui/icons/tabs/today_postcard.png",
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

const catchCardTypes = [
  "GRASS",
  "WATER",
  "FIRE",
  "ELECTRIC",
  "PSYCHIC",
  "DRAGON",
  "FAIRY",
  "STEEL",
  "GHOST",
  "DARK",
  "FIGHTING",
  "ICE",
  "GROUND",
  "ROCK",
  "POISON",
  "FLYING",
  "BUG",
  "NORMAL",
];

function valueOrDash(value, suffix = "") {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "object") return JSON.stringify(value);
  return `${value}${suffix}`;
}

function Section({
  title,
  eyebrow,
  icon,
  children,
  tone = "cyan",
  plain = false,
  backgroundIndex = 0,
  backgroundType = "",
}) {
  const toneClass = sectionTones[tone] || sectionTones.cyan;
  const sectionBackgroundType =
    backgroundType ||
    catchCardTypes[
      (String(title).length + String(tone).length + backgroundIndex) %
        catchCardTypes.length
    ];
  return (
    <section
      className={`pokemon-detail-section relative overflow-hidden rounded-3xl border bg-gradient-to-br to-slate-950/18 p-4 shadow-[0_20px_70px_rgba(0,0,0,.2)] backdrop-blur sm:p-5 ${toneClass}`}
      style={
        plain
          ? undefined
          : catchCardStyle(backgroundIndex, sectionBackgroundType)
      }
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(255,255,255,.13),transparent_34%)]" />
      <div className="relative">
        {eyebrow ? (
          <p className="mb-1 text-xs font-black uppercase tracking-[0.24em] text-cyan-200/70">
            {eyebrow}
          </p>
        ) : null}
        <h3 className="mb-4 flex items-center gap-3 text-lg font-black tracking-tight text-domain-foreground sm:text-xl">
          {icon ? (
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-line bg-surface-inset p-2">
              <img
                className="pokemon-interface-icon max-h-full object-contain"
                src={icon}
                alt=""
              />
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

function catchCardForIndex(index, preferredType) {
  const types = [preferredType, ...catchCardTypes].filter(Boolean);
  return catchCardBackground(types[index % types.length]);
}

function catchCardStyle(index = 0, preferredType = "NORMAL", opacity = "dark") {
  const background = catchCardForIndex(index, preferredType);
  const overlay =
    opacity === "soft"
      ? "linear-gradient(135deg, rgba(255,255,255,.9), rgba(248,250,252,.82)), linear-gradient(180deg, rgba(15,23,42,.18), rgba(15,23,42,.24))"
      : "linear-gradient(135deg, rgba(2,6,23,.93), rgba(15,23,42,.89)), linear-gradient(180deg, rgba(255,255,255,.055), rgba(255,255,255,.015))";
  return {
    backgroundImage: background ? `${overlay}, url("${background}")` : overlay,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
}

function formatForm(value) {
  const raw = String(value || "normal").trim();
  const normalized = raw.toLowerCase().replace(/[_-]+/g, " ");
  const labels = {
    base: "Base",
    normal: "Normal",
    alola: "Alola",
    alolan: "Alola",
    galar: "Galar",
    galarian: "Galarian",
    hisui: "Hisui",
    hisuian: "Hisuian",
    paldea: "Paldea",
    paldean: "Paldean",
    mega: "Méga",
    "mega x": "Méga X",
    "mega y": "Méga Y",
    primal: "Primo",
    dynamax: "Dynamax",
    gigantamax: "Gigamax",
  };
  return (
    labels[normalized] ||
    normalized.replace(/\b\w/g, (letter) => letter.toUpperCase())
  );
}

function rgbaColor(color, alpha = 1) {
  if (!color || typeof color !== "object") return "";
  const channel = (value) =>
    Math.max(0, Math.min(255, Math.round(Number(value || 0) * 255)));
  return `rgba(${channel(color.r)}, ${channel(color.g)}, ${channel(color.b)}, ${color.a ?? alpha})`;
}

function TypeBadge({ type, typeCatalog = [], compact = false }) {
  if (!type) return null;
  const icon = typeIcon(type, typeCatalog);
  return (
    <span
      className={`inline-flex min-w-0 items-center gap-2 rounded-full border border-white/20 bg-surface-inset font-black text-domain-foreground shadow-[0_8px_22px_rgba(0,0,0,.18)] ${compact ? "px-2.5 py-1 text-xs" : "px-3 py-1.5 text-sm"}`}
      style={{
        backgroundColor: `color-mix(in srgb, ${typeColors[type] || "#64748b"} 54%, rgba(2,6,23,.45))`,
      }}
    >
      {icon ? (
        <img
          className={
            compact
              ? "h-4 w-4 shrink-0 object-contain"
              : "h-5 w-5 shrink-0 object-contain"
          }
          src={icon}
          alt=""
        />
      ) : null}
      <span className="truncate">{typeName(type, typeCatalog)}</span>
    </span>
  );
}

function TypeBadgeList({ types = [], typeCatalog = [] }) {
  const list = types.filter(Boolean);
  if (!list.length) return <span>-</span>;
  return (
    <span className="flex flex-wrap gap-2">
      {list.map((type) => (
        <TypeBadge type={type} typeCatalog={typeCatalog} compact key={type} />
      ))}
    </span>
  );
}

function DataGrid({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item, index) => (
        <div
          className={`grid min-h-24 grid-cols-[2.45rem_minmax(0,1fr)] gap-3 rounded-2xl border p-4 text-left shadow-[0_12px_38px_rgba(0,0,0,.18)] ${cardTones[index % cardTones.length]}`}
          key={item.label}
        >
          <span className="grid h-10 w-10 place-items-center rounded-2xl border border-line bg-surface-control">
            {item.icon ? (
              <img
                className="pokemon-interface-icon h-6 w-6 object-contain"
                src={item.icon}
                alt=""
              />
            ) : (
              <span className="h-3 w-3 rounded-full bg-cyan-300" />
            )}
          </span>
          <span className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-[0.16em] text-muted">
              {item.label}
            </span>
            <strong className="mt-2 block overflow-wrap-anywhere text-base font-black leading-snug text-domain-foreground [overflow-wrap:anywhere]">
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
    <Section
      title="Noms traduits"
      eyebrow="localisation"
      icon={uiAssets.icons.pokeball}
      tone="emerald"
    >
      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {entries.map(([language, value], index) => (
          <div
            className={`grid grid-cols-[2.2rem_minmax(0,1fr)] gap-3 rounded-2xl border p-3 ${cardTones[index % cardTones.length]}`}
            key={language}
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-line bg-surface-control p-1.5 text-xs font-black text-cyan-100">
              <span className="text-lg">{languageFlags[language] || "🏳️"}</span>
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                {languageLabels[language] || language}
              </span>
              <strong className="mt-1 block break-words text-domain-foreground">
                {value}
              </strong>
            </span>
          </div>
        ))}
      </div>
    </Section>
  );
}

function EmptyInline({ children }) {
  return <EmptyState title={children} />;
}

function CandyAmount({ value, icon, label = "bonbons" }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 align-middle">
      {icon ? (
        <img className="h-5 w-5 shrink-0 object-contain" src={icon} alt="" />
      ) : null}
      <span>
        {valueOrDash(value)} {label}
      </span>
    </span>
  );
}

function RewardValue({ candy, stardust, candyIcon }) {
  return (
    <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
      <CandyAmount value={candy} icon={candyIcon} />
      <span className="inline-flex items-center gap-2">
        <img
          className="h-5 w-5 shrink-0 object-contain"
          src={uiAssets.icons.stardust}
          alt=""
        />
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
  return <TypeBadge type={type} typeCatalog={typeCatalog} compact />;
}

function signedEnergy(value) {
  if (value === null || value === undefined || value === "") return undefined;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  return numeric > 0 ? `+${numeric}` : numeric;
}

function perSecond(numerator, durationMs) {
  const value = Number(numerator);
  const duration = Number(durationMs);
  if (!Number.isFinite(value) || !Number.isFinite(duration) || duration <= 0)
    return undefined;
  return (value / (duration / 1000)).toFixed(2);
}

function energyBars(energy) {
  const cost = Math.abs(Number(energy));
  if (!Number.isFinite(cost) || cost <= 0) return undefined;
  if (cost <= 33) return "3 barres";
  if (cost <= 50) return "2 barres";
  return "1 barre";
}

function isStab(moveType, pokemonTypes = []) {
  return Boolean(
    moveType &&
    pokemonTypes.filter(Boolean).map(String).includes(String(moveType)),
  );
}

const displayedMoveKeys = new Set([
  "id",
  "slug",
  "names",
  "type",
  "power",
  "energy",
  "durationMs",
  "combat",
]);

function formatMoveExtraValue(value) {
  if (value === null || value === undefined || value === "") return null;
  if (Array.isArray(value)) return value.length ? value.join(", ") : null;
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}

function moveExtraRows(move) {
  if (!move || typeof move !== "object") return [];
  return Object.entries(move)
    .filter(([key]) => !displayedMoveKeys.has(key))
    .map(([key, value]) => [key, formatMoveExtraValue(value)])
    .filter(([, value]) => value);
}

function formatBuffValue(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number" && value > 0) return `+${value}`;
  return String(value);
}

function BuffGrid({ buffs }) {
  if (!buffs || typeof buffs !== "object") return null;
  const rows = [
    [
      "Chance",
      buffs.activationChance !== undefined ? `${buffs.activationChance}%` : "-",
    ],
    ["Attaque lanceur", formatBuffValue(buffs.attackerAttackStatsChange)],
    ["Défense lanceur", formatBuffValue(buffs.attackerDefenseStatsChange)],
    ["Attaque cible", formatBuffValue(buffs.targetAttackStatsChange)],
    ["Défense cible", formatBuffValue(buffs.targetDefenseStatsChange)],
  ];
  return (
    <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
      {rows.map(([label, value]) => (
        <span
          className="rounded-xl border border-line bg-surface-inset-strong px-3 py-2"
          key={label}
        >
          <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
            {label}
          </small>
          <strong className="mt-1 block text-domain-foreground">{value}</strong>
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
    <Section
      title="Sorties chromatiques"
      icon={uiAssets.icons.shiny}
      tone="violet"
    >
      <div className="grid gap-3 lg:grid-cols-2">
        {items.map(([label, record, icon]) => {
          const released = Boolean(record?.released);
          return (
            <article
              className={`rounded-2xl border p-4 ${
                released
                  ? "border-emerald-300/25 bg-emerald-400/10"
                  : "border-line bg-surface-flat"
              }`}
              key={label}
            >
              <div className="flex items-start gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-line bg-surface-inset-medium p-2">
                  <img
                    className="pokemon-interface-icon max-h-full object-contain"
                    src={icon}
                    alt=""
                  />
                </span>
                <span className="min-w-0">
                  <strong className="block font-black text-domain-foreground">
                    {label}
                  </strong>
                  <span
                    className={
                      released
                        ? "mt-1 block text-sm font-bold text-emerald-100"
                        : "mt-1 block text-sm font-bold text-muted"
                    }
                  >
                    {released
                      ? "Disponible dans Pokémon GO"
                      : "Pas encore disponible"}
                  </span>
                </span>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <span className="rounded-xl border border-line bg-surface-inset px-3 py-2">
                  <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                    Date
                  </small>
                  <strong className="mt-1 block text-domain-foreground">
                    {formatDate(record?.releaseDate)}
                  </strong>
                </span>
                <span className="rounded-xl border border-line bg-surface-inset px-3 py-2">
                  <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                    Évènement
                  </small>
                  <strong className="mt-1 block break-words text-domain-foreground">
                    {record?.event || "-"}
                  </strong>
                </span>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}

function MoveList({ title, moves, typeCatalog = [], icon, pokemonTypes = [] }) {
  const list = moveArray(moves)
    .filter(Boolean)
    .map((move) => (typeof move === "string" ? { id: move } : move));
  return (
    <Section title={title} icon={icon}>
      {list.length ? (
        <div className="grid gap-3">
          {list.map((move) => {
            const energy = move.energy ?? move.combat?.energy;
            const stab = isStab(move.type, pokemonTypes);
            return (
              <div
                className="rounded-2xl border border-line bg-surface-inset-strong p-4 text-sm transition hover:border-cyan-200/35 hover:bg-cyan-400/10"
                key={move.id || move.slug || moveName(move)}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <span className="min-w-0">
                    <strong className="block break-words text-base font-black text-domain-foreground">
                      {moveName(move)}
                    </strong>
                    <small className="mt-1 block font-mono text-xs text-disabled">
                      {move.id}
                    </small>
                  </span>
                  <span className="flex flex-wrap items-center justify-end gap-2">
                    {stab ? (
                      <span className="rounded-full border border-amber-200/40 bg-amber-300/18 px-3 py-1 text-xs font-black text-amber-50">
                        STAB
                      </span>
                    ) : null}
                    <MoveTypePill type={move.type} typeCatalog={typeCatalog} />
                  </span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Puissance", move.power],
                    ["Énergie", signedEnergy(energy)],
                    ["Barres", energyBars(energy)],
                    [
                      "Durée",
                      move.durationMs ? `${move.durationMs} ms` : undefined,
                    ],
                    ["DPS", perSecond(move.power, move.durationMs)],
                    ["EPS", perSecond(move.energy, move.durationMs)],
                    ["Tours PvP", move.combat?.turns],
                    ["Puissance PvP", move.combat?.power],
                    ["Énergie PvP", signedEnergy(move.combat?.energy)],
                  ].map(([label, value]) => (
                    <span
                      className="rounded-xl border border-line bg-surface-minimal px-3 py-2"
                      key={label}
                    >
                      <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                        {label}
                      </small>
                      <strong className="mt-1 block break-words text-domain-foreground">
                        {valueOrDash(value)}
                      </strong>
                    </span>
                  ))}
                </div>
                <BuffGrid buffs={move.combat?.buffs} />
                {moveExtraRows(move).length ? (
                  <div className="mt-3 rounded-2xl border border-line bg-surface-inset p-3">
                    <span className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                      Données avancées JSON
                    </span>
                    <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {moveExtraRows(move).map(([label, value]) => (
                        <span
                          className="min-w-0 rounded-xl border border-line bg-surface-minimal px-3 py-2"
                          key={label}
                        >
                          <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                            {label}
                          </small>
                          <strong className="mt-1 block break-words text-xs text-domain-foreground">
                            {value}
                          </strong>
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyInline>Aucune attaque renseignée.</EmptyInline>
      )}
    </Section>
  );
}

function findEntryByFormId(entries = [], formId) {
  const target = String(formId || "").toUpperCase();
  if (!target) return null;
  return (entries || []).find((item) =>
    [item.formId, item.id, item.baseFormId]
      .filter(Boolean)
      .map((value) => String(value).toUpperCase())
      .includes(target),
  );
}

function PokemonMiniCard({
  item,
  onClick,
  suffix,
  direction,
  compact = false,
}) {
  if (!item) return null;
  const clickable = typeof onClick === "function";
  const image = preferredPokemonImage(item);
  const Tag = clickable ? "button" : "div";
  return (
    <Tag
      className={`w-full rounded-2xl border border-line bg-surface-inset-strong text-left transition ${compact ? "p-2 sm:p-3" : "p-3"} ${clickable ? "hover:-translate-y-0.5 hover:border-cyan-200/45 hover:bg-cyan-400/10" : ""}`}
      type={clickable ? "button" : undefined}
      onClick={clickable ? () => onClick(item) : undefined}
    >
      <div
        className={`flex items-center ${compact ? "gap-2 sm:gap-3" : "gap-3"} ${direction === "previous" ? "sm:flex-row-reverse sm:text-right" : ""}`}
      >
        <span
          className={`grid shrink-0 place-items-center rounded-2xl border border-line bg-surface-emphasis p-2 ${compact ? "h-10 w-10 sm:h-14 sm:w-14" : "h-14 w-14"}`}
        >
          {image ? (
            <img
              className="max-h-full object-contain drop-shadow-xl"
              src={image}
              alt=""
            />
          ) : null}
        </span>
        <span className="min-w-0">
          <strong
            className={`block truncate font-black text-domain-foreground ${compact ? "text-xs sm:text-sm" : "text-sm"}`}
          >
            {item.name || item.id || item.formId}
          </strong>
          <small
            className={`mt-1 truncate font-mono font-bold text-foreground-secondary ${compact ? "hidden text-[11px] min-[430px]:block sm:block" : "block text-[11px]"}`}
          >
            N° {item.dexId || "?"} · {formatForm(item.form)}
          </small>
          {suffix ? (
            <span
              className={`mt-1 block font-black text-cyan-100 ${compact ? "text-[10px] sm:text-xs" : "text-xs"}`}
            >
              {suffix}
            </span>
          ) : null}
        </span>
      </div>
    </Tag>
  );
}

function CandyFamilyPanel({ entry, payload, allEntries = [], onOpenRelated }) {
  const candy =
    payload.assets?.candy ||
    payload.sourceData?.assets?.candy ||
    entry.assets?.candy ||
    null;
  if (!candy) return null;
  const familyId = candy.familyId;
  const familyMembers =
    familyId === undefined || familyId === null
      ? []
      : (allEntries || [])
          .filter(
            (item) =>
              String(item.assets?.candy?.familyId ?? "") === String(familyId),
          )
          .sort((a, b) => Number(a.dexId || 0) - Number(b.dexId || 0));
  const primary = rgbaColor(candy.primaryColor, 1);
  const secondary = rgbaColor(candy.secondaryColor, 1);
  return (
    <Section
      title="Famille bonbon"
      icon={candy.image || uiAssets.icons.candy}
      tone="amber"
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)]">
        <div className="rounded-2xl border border-line bg-surface-inset-strong p-4">
          <div className="flex items-center gap-4">
            <span
              className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-line-medium bg-surface-emphasis p-3 shadow-inner"
              style={{
                background:
                  primary && secondary
                    ? `linear-gradient(135deg, ${primary}, ${secondary})`
                    : undefined,
              }}
            >
              {candy.image ? (
                <img
                  className="max-h-full object-contain drop-shadow-2xl"
                  src={candy.image}
                  alt=""
                />
              ) : null}
            </span>
            <span className="min-w-0">
              <small className="block text-xs font-black uppercase tracking-[0.16em] text-muted">
                familyId
              </small>
              <strong className="mt-1 block text-2xl font-black text-domain-foreground">
                {valueOrDash(familyId)}
              </strong>
              <span className="mt-2 block text-sm font-bold text-foreground">
                {familyMembers.length || 1} membre(s) dans la famille
              </span>
            </span>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {familyMembers.length ? (
            familyMembers.map((item) => (
              <PokemonMiniCard
                item={item}
                onClick={onOpenRelated}
                key={item.key}
              />
            ))
          ) : (
            <EmptyInline>
              Aucun membre de famille trouvé dans le catalogue chargé.
            </EmptyInline>
          )}
        </div>
      </div>
    </Section>
  );
}
function getLocalizedEntityLabel(value, language = "French") {
  if (!value) return null;

  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (typeof value === "object") {
    return (
      value.names?.[language] ||
      value.names?.French ||
      value.names?.English ||
      value.name ||
      value.slug ||
      value.id ||
      null
    );
  }

  return null;
}

function EvolutionPanel({
  evolutions = [],
  allEntries = [],
  onOpenRelated,
  candyIcon,
}) {
  return (
    <Section title="Évolutions" icon={uiAssets.icons.megaEnergy} tone="emerald">
      {evolutions.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {evolutions.map((evolution, index) => {
            const target = findEntryByFormId(
              allEntries,
              evolution.targetFormId,
            );
            const itemLabel =
              getLocalizedEntityLabel(evolution.item) ||
              getLocalizedEntityLabel(evolution.evolutionItem);
            const suffix = [
              evolution.candies !== undefined
                ? `${evolution.candies} bonbons`
                : null,
              itemLabel ? `Item: ${itemLabel}` : null,
              (evolution.quests || []).length
                ? `${evolution.quests.length} quête(s)`
                : null,
            ]
              .filter(Boolean)
              .join(" · ");
            return (
              <div
                className="space-y-2"
                key={`${evolution.targetFormId || index}-${index}`}
              >
                <PokemonMiniCard
                  item={
                    target || {
                      name: evolution.targetFormId,
                      formId: evolution.targetFormId,
                    }
                  }
                  onClick={target ? onOpenRelated : null}
                  suffix={suffix || "Coût non renseigné"}
                />
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-inset-strong px-3 py-1 text-xs font-black text-domain-foreground">
                    {candyIcon ? (
                      <img
                        className="h-4 w-4 object-contain"
                        src={candyIcon}
                        alt=""
                      />
                    ) : null}
                    {valueOrDash(evolution.candies)} bonbons
                  </span>
                  {itemLabel ? (
                    <span className="rounded-full border border-line bg-surface-inset-strong px-3 py-1 text-xs font-black text-domain-foreground">
                      {itemLabel}
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyInline>
          Aucune évolution sortante renseignée pour cette forme.
        </EmptyInline>
      )}
    </Section>
  );
}

function DetailNavigation({ previousEntry, nextEntry, onPrevious, onNext }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      <PokemonMiniCard
        item={previousEntry}
        onClick={onPrevious ? () => onPrevious() : null}
        suffix="← Fiche précédente"
        direction="previous"
        compact
      />
      <PokemonMiniCard
        item={nextEntry}
        onClick={onNext ? () => onNext() : null}
        suffix="Fiche suivante →"
        compact
      />
    </div>
  );
}

function AssetGallery({ entry, payload }) {
  const [preview, setPreview] = useState(null);
  const assets = [];
  const add = (group, label, url, meta = "", options = {}) => {
    if (url)
      assets.push({ group, label, url, meta, badges: options.badges || [] });
  };

  add("Pokémon GO", "Image principale", payload.assets?.image || entry.image);
  add(
    "Pokémon GO",
    "Image shiny",
    payload.assets?.shinyImage || entry.shinyImage,
    "shiny",
    { badges: ["shiny"] },
  );
  add("Portraits", "Portrait", payload.assets?.portrait, "méga / primo");
  add("Pokémon Home", "Home", payload.assets?.home?.image);
  add("Pokémon Home", "Home shiny", payload.assets?.home?.shinyImage, "shiny", {
    badges: ["shiny"],
  });

  for (const [index, asset] of (payload.assetForms || []).entries()) {
    const badges = assetBadges(asset);
    const meta = assetMeta([
      asset.form,
      asset.costume,
      isFemaleAsset(asset) ? "Forme femelle" : "",
    ]);
    add("Variantes GO", `Variante ${index + 1}`, asset.image, meta, { badges });
    add(
      "Variantes GO",
      `Variante shiny ${index + 1}`,
      asset.shinyImage,
      assetMeta(["shiny", meta]),
      { badges: uniqueBadges(["shiny", ...badges]) },
    );
  }
  for (const [index, asset] of (
    payload.assets?.home?.variants || []
  ).entries()) {
    const badges = assetBadges(asset);
    const meta = assetMeta([
      asset.detail,
      asset.view,
      asset.form,
      asset.gender,
      asset.genderCode,
      isFemaleAsset(asset) ? "Forme femelle" : "",
    ]);
    add(
      "Variantes Home",
      `Home ${index + 1}`,
      asset.image || asset.shinyImage,
      meta,
      { badges },
    );
  }
  for (const [index, asset] of (
    payload.assets?.shuffle?.variants || []
  ).entries()) {
    add(
      "Pokémon Shuffle",
      `Shuffle ${index + 1}`,
      asset.image,
      asset.tags?.join(" · ") || asset.state || "",
    );
  }
  for (const [index, asset] of (
    payload.assets?.locationCards || []
  ).entries()) {
    add(
      "Backgrounds",
      `Background ${index + 1}`,
      asset.image,
      asset.name || asset.date || "",
    );
  }
  const groups = [
    ...assets
      .reduce((map, asset) => {
        if (!map.has(asset.group)) map.set(asset.group, []);
        map.get(asset.group).push(asset);
        return map;
      }, new Map())
      .entries(),
  ];

  return (
    <Section title="Galerie liée à la fiche" icon={uiAssets.icons.result} plain>
      {assets.length ? (
        <div className="space-y-5">
          {groups.map(([group, groupAssets]) => (
            <div key={group}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h4 className="font-black text-domain-foreground">{group}</h4>
                <span className="rounded-full border border-line bg-surface-control px-3 py-1 text-xs font-black text-foreground-secondary">
                  {groupAssets.length}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {groupAssets.map((asset, index) => (
                  <button
                    className="overflow-hidden rounded-3xl border border-line bg-surface-inset-strong text-left transition hover:-translate-y-0.5 hover:border-cyan-200/40 hover:bg-cyan-400/10"
                    key={`${asset.url}-${index}`}
                    type="button"
                    onClick={() => setPreview(asset)}
                  >
                    <div className="relative flex aspect-square items-center justify-center bg-[radial-gradient(circle_at_30%_15%,rgba(125,211,252,.2),transparent_38%),rgba(255,255,255,.04)] p-4">
                      <AssetBadges
                        badges={asset.badges}
                        className="absolute left-2 top-2 sm:left-3 sm:top-3"
                      />
                      <img
                        className="max-h-full object-contain drop-shadow-2xl"
                        src={asset.url}
                        alt={asset.label}
                      />
                    </div>
                    <div className="border-t border-line p-3">
                      <strong className="block truncate text-sm font-black text-domain-foreground">
                        {asset.label}
                      </strong>
                      <span className="mt-1 block truncate text-xs font-bold text-muted">
                        {asset.meta || "standard"}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          {preview ? (
            <div
              className="fixed inset-0 z-[1120] grid place-items-center bg-slate-950/86 p-4 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={`Aperçu asset ${preview.label}`}
              onClick={() => setPreview(null)}
            >
              <div
                className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-line bg-[#07111f]"
                onClick={(event) => event.stopPropagation()}
              >
                <div className="flex items-center justify-between gap-3 border-b border-line p-4">
                  <strong className="truncate text-xl font-black text-domain-foreground">
                    {preview.label}
                  </strong>
                  <button
                    className="grid h-10 w-10 place-items-center rounded-full bg-surface-emphasis text-2xl"
                    type="button"
                    onClick={() => setPreview(null)}
                    aria-label="Fermer l’aperçu de l’asset"
                  >
                    ×
                  </button>
                </div>
                <div className="grid max-h-[78dvh] place-items-center overflow-auto p-5">
                  <img
                    className="max-h-[70dvh] object-contain"
                    src={preview.url}
                    alt={preview.label}
                  />
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
  return (
    asset.isFemale === true ||
    asset.gender === "female-difference" ||
    asset.genderCode === "fd"
  );
}

function isMaleAsset(asset = {}) {
  return (
    asset.isMale === true ||
    asset.gender === "male-difference" ||
    asset.genderCode === "md"
  );
}

function uniqueBadges(badges) {
  return [...new Set(badges.filter(Boolean))];
}

function assetBadges(asset = {}) {
  const form = String(asset.form || asset.detail || "").toLowerCase();
  const costume = String(asset.costume || "").trim();
  const badges = [];
  if (isFemaleAsset(asset)) badges.push("female");
  if (isMaleAsset(asset)) badges.push("male");
  if (
    costume ||
    (form &&
      !["normal", "standard"].includes(form) &&
      !variantBadgeForForm(form))
  )
    badges.push("event");
  if (asset.gigantamax || form.includes("gigantamax"))
    badges.push("gigantamax");
  const formBadge = variantBadgeForForm(form);
  if (formBadge) badges.push(formBadge);
  return uniqueBadges(badges);
}

function variantBadgeForForm(form) {
  if (form.includes("mega")) return "mega";
  if (form.includes("primal")) return "primal";
  if (form.includes("alola")) return "alola";
  if (form.includes("galar")) return "galar";
  if (form.includes("hisui")) return "hisui";
  if (form.includes("paldea")) return "paldea";
  if (form.includes("dynamax")) return "dynamax";
  if (form.includes("gigantamax")) return "gigantamax";
  return "";
}

function assetMeta(parts) {
  return parts.filter(Boolean).join(" · ");
}

const assetBadgeConfig = {
  female: [
    "♀",
    "Femelle",
    "border-fuchsia-300/45 bg-fuchsia-500/18 text-fuchsia-100",
  ],
  male: ["♂", "Mâle", "border-sky-300/45 bg-sky-500/18 text-sky-100"],
  event: ["✦", "Event", "border-amber-300/45 bg-amber-500/18 text-amber-100"],
  mega: ["Μ", "Méga", "border-violet-300/45 bg-violet-500/18 text-violet-100"],
  primal: [
    "Ω",
    "Primo",
    "border-orange-300/45 bg-orange-500/18 text-orange-100",
  ],
  alola: [
    "A",
    "Alola",
    "border-yellow-200/45 bg-yellow-400/18 text-yellow-100",
  ],
  galar: [
    "G",
    "Galar",
    "border-indigo-300/45 bg-indigo-500/18 text-indigo-100",
  ],
  hisui: ["H", "Hisui", "border-stone-200/45 bg-stone-400/18 text-stone-100"],
  paldea: ["P", "Paldea", "border-rose-300/45 bg-rose-500/18 text-rose-100"],
  dynamax: ["D", "Dyna", "border-red-300/45 bg-red-500/18 text-red-100"],
  gigantamax: ["G", "Giga", "border-red-300/45 bg-red-500/18 text-red-100"],
  shiny: ["✦", "Shiny", "border-cyan-200/45 bg-cyan-400/18 text-cyan-100"],
};

function AssetBadges({ badges = [], className = "" }) {
  if (!badges.length) return null;
  return (
    <div
      className={`flex max-w-[calc(100%-1rem)] flex-wrap gap-1.5 ${className}`}
    >
      {badges.map((badge) => {
        const config = assetBadgeConfig[badge];
        if (!config) return null;
        const [symbol, label, tone] = config;
        return (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[9px] font-black uppercase leading-none tracking-[0.08em] shadow-[0_0_18px_rgba(255,255,255,.1)] sm:text-[10px] ${tone}`}
            key={badge}
          >
            <span aria-hidden="true">{symbol}</span>
            <span>{label}</span>
          </span>
        );
      })}
    </div>
  );
}

function IssuesPanel({ entry }) {
  return (
    <Section
      title="Contrôles de fiche"
      icon={uiAssets.icons.problem}
      tone="amber"
    >
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
                <pre className="mt-3 max-h-44 overflow-auto rounded-xl border border-line bg-slate-950/50 p-3 font-mono text-xs leading-5 text-amber-50">
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
              <article
                className="rounded-2xl border border-line bg-surface-faint p-4"
                key={key}
              >
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 object-contain"
                    src={icons[key]}
                    alt=""
                  />
                  <strong className="block font-black text-domain-foreground">
                    {label}
                  </strong>
                </div>
                <span className="mt-2 block text-sm font-bold text-disabled">
                  Aucune donnée PvP renseignée.
                </span>
              </article>
            );
          }
          const rank = value.rank1 || {};
          const ivs = rank.ivs || {};
          const moves = value.bestMovesets || {};
          return (
            <article
              className="rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4"
              key={key}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex min-w-0 items-center gap-3">
                  <img
                    className="h-12 w-12 shrink-0 object-contain"
                    src={icons[key]}
                    alt=""
                  />
                  <strong className="text-lg font-black text-domain-foreground">
                    {label}
                  </strong>
                </span>
                <span className="rounded-full bg-surface-inset-strong px-3 py-1 text-xs font-black text-cyan-100">
                  {value.tierRank || "Non classé"}
                </span>
              </div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  ["Niveau", rank.level],
                  ["PC", rank.cp],
                  [
                    "IV",
                    `${ivs.attack ?? "?"}/${ivs.defense ?? "?"}/${ivs.stamina ?? "?"}`,
                  ],
                ].map(([name, data]) => (
                  <span
                    className="rounded-xl border border-line bg-surface-inset px-3 py-2"
                    key={name}
                  >
                    <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                      {name}
                    </small>
                    <strong className="mt-1 block text-domain-foreground">
                      {valueOrDash(data)}
                    </strong>
                  </span>
                ))}
              </div>
              <div className="mt-3 rounded-xl border border-line bg-surface-inset p-3">
                <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-disabled">
                  Meilleur moveset
                </small>
                <strong className="mt-1 block break-words text-domain-foreground">
                  {moveName(moves.fast, moveDetails)}
                  {(moves.charged || []).length
                    ? ` + ${(moves.charged || []).map((id) => moveName(id, moveDetails)).join(" / ")}`
                    : ""}
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

function AdminActions({
  entry,
  assetChecked,
  onAssetChecked,
  onCopyPatch,
  onAuditUrls,
  onAssetAudit,
  extraPanel,
}) {
  return (
    <Section title="Outils admin" eyebrow="privé" icon={uiAssets.icons.radar}>
      <div className="flex flex-wrap gap-3">
        <label className="inline-flex min-h-12 items-center gap-3 rounded-2xl border border-emerald-300/25 bg-emerald-400/10 px-4 py-3 text-sm font-black text-emerald-50 transition hover:border-emerald-200/50 hover:bg-emerald-400/18">
          <Checkbox
            className="h-5 w-5 accent-emerald-400"
            checked={Boolean(assetChecked)}
            onChange={(event) =>
              onAssetChecked?.(entry.key, event.target.checked)
            }
          />
          Assets OK
        </label>
        <button
          className="rounded-2xl border border-line bg-surface-emphasis px-4 py-3 text-sm font-black text-domain-foreground transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onCopyPatch?.(entry)}
        >
          Copier le brouillon JSON
        </button>
        <button
          className="rounded-2xl border border-line bg-surface-emphasis px-4 py-3 text-sm font-black text-domain-foreground transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onAuditUrls?.(entry)}
        >
          Vérifier les URLs
        </button>
        <button
          className="rounded-2xl border border-line bg-surface-emphasis px-4 py-3 text-sm font-black text-domain-foreground transition hover:border-cyan-200/50 hover:bg-cyan-400/15"
          type="button"
          onClick={() => onAssetAudit?.(entry)}
        >
          Audit assets
        </button>
      </div>
      {extraPanel ? (
        <div className="mt-4 rounded-2xl border border-line bg-slate-950/55 p-4 text-sm text-foreground">
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
  previousEntry,
  nextEntry,
  allEntries = [],
  onOpenRelated,
  typeCatalog = [],
  weatherCatalog = [],
}) {
  const dialogTitleId = useId();
  const [activeTab, setActiveTab] = useState("overview");
  const payload = useMemo(() => detail?.detail || detail || {}, [detail]);
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
  const shinyAvailability =
    payload.shinyAvailability || payload.sourceData?.shinyAvailability || null;
  const shadowShinyAvailability =
    payload.shadowShinyAvailability ||
    payload.sourceData?.shadowShinyAvailability ||
    null;
  const pvp = payload.pvp || {};
  const moveDetails = payload.moveDetails || {};
  const cpByLevel = payload.cpByLevel || [];
  const captureRewards = payload.captureRewards || {};
  const secondMove = payload.secondChargeMoveCost || {};
  const names = payload.names || payload.sourceData?.names || {};
  const region = payload.region || {};
  const weatherNames = (payload.weatherBoost || entry.weatherBoost || [])
    .map((weatherId) => {
      const item = (weatherCatalog || []).find(
        (weather) => weather.id === weatherId || weather.slug === weatherId,
      );
      return item?.names?.French || weatherId;
    })
    .filter(Boolean);
  const mainType = String(
    entry.primaryType || payload.primaryType || "NORMAL",
  ).toUpperCase();
  const pokemonTypes = [
    String(entry.primaryType || payload.primaryType || "").toUpperCase(),
    entry.secondaryType || payload.secondaryType
      ? String(entry.secondaryType || payload.secondaryType).toUpperCase()
      : null,
  ].filter(Boolean);
  const mainTypeColor = typeColors[mainType] || "#38bdf8";
  const displayPokemon = {
    ...entry,
    ...payload,
    assets: {
      ...(entry.assets || {}),
      ...(payload.assets || {}),
      assetForms:
        payload.assetForms || entry.assetForms || entry.eventAssets || [],
    },
    eventAssets: entry.eventAssets,
    eventAsset: entry.eventAsset,
  };
  const displayImage = preferredPokemonImage(displayPokemon, {
    shiny: entry?.presentationVariant?.shiny === true,
  });
  const displayVariantBadges = pokemonVariantBadges(displayPokemon).filter(
    (label) =>
      label.startsWith("Costume :") ||
      label.startsWith("Forme :") ||
      label === "Forme femelle",
  );
  const candyIcon =
    payload.assets?.candy?.image ||
    payload.sourceData?.assets?.candy?.image ||
    entry.assets?.candy?.image ||
    null;
  const catchBackground = catchCardBackground(mainType);

  return createPortal(
    <div
      className="pokemon-modal-overlay fixed inset-0 z-[1100] flex items-end justify-center bg-slate-950/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="pokemon-detail-modal flex max-h-[96dvh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[2rem] border border-line text-domain-foreground shadow-[0_30px_120px_rgba(0,0,0,.65)] sm:max-h-[92dvh] sm:rounded-[2rem]"
        style={{
          background: `linear-gradient(180deg, color-mix(in srgb, ${mainTypeColor} 24%, #0d1a2b), #08111f 72%)`,
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="pokemon-detail-modal-header relative shrink-0 overflow-hidden border-b border-line bg-cover bg-center px-4 py-3 sm:px-6 sm:py-4"
          style={{
            backgroundImage: `${
              catchBackground
                ? `linear-gradient(135deg, rgba(4,10,22,.86), color-mix(in srgb, ${mainTypeColor} 13%, rgba(4,10,22,.82))), url("${catchBackground}"), `
                : ""
            }${typePanelBackground(mainType, typeCatalog)}, radial-gradient(circle_at_8%_0%,${mainTypeColor}88,transparent_36%), radial-gradient(circle_at_92%_15%,rgba(255,255,255,.18),transparent_34%)`,
          }}
        >
          <div className="absolute inset-0 opacity-16 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:34px_34px]" />
          <div className="relative flex items-center gap-4 pr-12 sm:gap-6">
            <div className="grid h-24 w-24 shrink-0 place-items-center sm:h-32 sm:w-32 lg:h-36 lg:w-36">
              {displayImage ? (
                <img
                  className="max-h-full object-contain drop-shadow-[0_22px_42px_rgba(0,0,0,.42)]"
                  src={displayImage}
                  alt={entry.name}
                />
              ) : (
                <span className="h-16 w-16 rounded-full border-[10px] border-white/25" />
              )}
            </div>
            <div className="min-w-0">
              <span className="font-mono text-xs font-black uppercase tracking-[0.22em] text-cyan-100/80 sm:text-sm">
                N° {entry.dexId}
              </span>
              <h2 id={dialogTitleId} className="mt-1 truncate text-3xl font-black tracking-tight text-domain-foreground sm:text-4xl">
                {entry.name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <TypeBadgeList types={pokemonTypes} typeCatalog={typeCatalog} />
                <span className="rounded-full border border-white/20 bg-surface-emphasis px-3 py-1.5 text-sm font-black text-domain-foreground">
                  {formatForm(payload.form || entry.form || "normal")}
                </span>
                {displayVariantBadges.map((label) => (
                  <span
                    className="rounded-full border border-fuchsia-200/35 bg-fuchsia-300/16 px-3 py-1.5 text-sm font-black text-fuchsia-50"
                    key={label}
                  >
                    🏷 {label}
                  </span>
                ))}
                {availability.shinyReleased || shinyAvailability?.released ? (
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-100/35 bg-cyan-300/16 px-3 py-1.5 text-sm font-black text-cyan-50">
                    <img
                      className="h-4 w-4 object-contain"
                      src={uiAssets.icons.shiny}
                      alt=""
                    />
                    Shiny
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-sm font-bold text-foreground">
                {region.names?.French || payload.regionId || "Région inconnue"}{" "}
                · {entry.profile || entry.kind} · Gén. {entry.generation || "?"}
              </p>
            </div>
            <button
              className="absolute right-0 top-0 grid h-10 w-10 place-items-center rounded-full border border-white/30 bg-surface-emphasis text-2xl font-light text-domain-foreground transition hover:bg-white/20"
              type="button"
              onClick={onClose}
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
        </div>

        <div
          className="pokemon-detail-modal-body min-h-0 flex-1 overflow-auto p-4 sm:p-6"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px), radial-gradient(circle at 8% 0%, ${mainTypeColor}3d, transparent 30%), radial-gradient(circle at 92% 10%, color-mix(in srgb, ${mainTypeColor} 28%, transparent), transparent 28%)`,
            backgroundSize: "30px 30px, 30px 30px, auto, auto",
          }}
        >
          <DetailNavigation
            previousEntry={previousEntry}
            nextEntry={nextEntry}
            onPrevious={onPrevious}
            onNext={onNext}
          />

          <nav
            className="mt-4 flex flex-wrap gap-2 pb-2"
            aria-label="Onglets de fiche"
          >
            {tabs.map((tab) => (
              <button
                className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-black transition sm:px-4 ${
                  activeTab === tab
                    ? tab === "checks"
                      ? "border-red-200/60 bg-gradient-to-r from-red-500 to-amber-400 text-domain-foreground shadow-[0_12px_35px_rgba(248,113,113,.24)]"
                      : "border-cyan-200/50 bg-gradient-to-r from-cyan-400 to-blue-500 text-domain-foreground shadow-[0_12px_35px_rgba(14,165,233,.25)]"
                    : tab === "checks"
                      ? "border-red-300/35 bg-red-500/10 text-red-100 hover:bg-red-500/20"
                      : "border-line bg-surface-subtle text-foreground hover:bg-surface-emphasis"
                }`}
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tabIcons[tab] ? (
                  <img
                    className="h-5 w-5 shrink-0 object-contain"
                    src={tabIcons[tab]}
                    alt=""
                  />
                ) : null}
                <span>{tabLabels[tab]}</span>
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
                <Section
                  title="Identifiants"
                  icon={uiAssets.icons.tag}
                  tone="violet"
                >
                  <DataGrid
                    type={mainType}
                    items={[
                      {
                        label: "ID",
                        value: valueOrDash(payload.id),
                        icon: uiAssets.icons.tag,
                      },
                      {
                        label: "Form ID",
                        value: valueOrDash(payload.formId),
                        icon: uiAssets.icons.tag,
                      },
                      {
                        label: "Slug",
                        value: valueOrDash(payload.slug),
                        icon: uiAssets.icons.search,
                      },
                      {
                        label: "Région",
                        value: region.names?.French || payload.regionId || "-",
                        icon: uiAssets.icons.pokedex,
                      },
                      {
                        label: "Génération",
                        value: valueOrDash(
                          payload.generation || entry.generation,
                        ),
                        icon: uiAssets.icons.pokemon,
                      },
                      {
                        label: "Classe",
                        value: valueOrDash(payload.pokemonClass),
                        icon: uiAssets.icons.tag,
                      },
                      {
                        label: "Forme",
                        value: formatForm(payload.form || entry.form),
                        icon: uiAssets.icons.pokemon,
                      },
                      {
                        label: "Fichier",
                        value: valueOrDash(entry.file),
                        icon: uiAssets.icons.copy,
                      },
                    ]}
                  />
                </Section>
                <Section
                  title="Identité et capture"
                  icon={uiAssets.icons.pokedexKanto}
                  tone="cyan"
                >
                  <DataGrid
                    type={mainType}
                    items={[
                      {
                        label: "Types",
                        value: (
                          <TypeBadgeList
                            types={pokemonTypes}
                            typeCatalog={typeCatalog}
                          />
                        ),
                        icon: uiAssets.icons.type,
                      },
                      {
                        label: "Boost météo",
                        value: weatherNames.join(", ") || "-",
                        icon: uiAssets.icons.weatherBoost,
                      },
                      {
                        label: "Taille",
                        value: valueOrDash(size.height, " m"),
                        icon: uiAssets.icons.height,
                      },
                      {
                        label: "Poids",
                        value: valueOrDash(size.weight, " kg"),
                        icon: uiAssets.icons.weight,
                      },
                      {
                        label: "Distance buddy",
                        value: valueOrDash(payload.buddyDistance, " km"),
                        icon: uiAssets.icons.buddy,
                      },
                      {
                        label: "Taux capture",
                        value: valueOrDash(payload.catchRate, "%"),
                        icon: uiAssets.icons.grass,
                      },
                      {
                        label: "Taux fuite",
                        value: valueOrDash(payload.fleeRate, "%"),
                        icon: uiAssets.icons.grass,
                      },
                      {
                        label: "Énergie méga",
                        value: valueOrDash(payload.megaEnergyReward),
                        icon: uiAssets.icons.megaEnergy,
                      },
                      {
                        label: "Coût méga",
                        value: valueOrDash(payload.energyCost),
                        icon: uiAssets.icons.megaEnergy,
                      },
                      {
                        label: "Récompenses",
                        value: (
                          <RewardValue
                            candy={captureRewards.candy}
                            stardust={captureRewards.stardust}
                            candyIcon={candyIcon}
                          />
                        ),
                        icon: candyIcon || uiAssets.icons.candy,
                      },
                      {
                        label: "2e attaque",
                        value: (
                          <RewardValue
                            candy={secondMove.candy}
                            stardust={secondMove.stardust}
                            candyIcon={candyIcon}
                          />
                        ),
                        icon: candyIcon || uiAssets.icons.candy,
                      },
                    ]}
                  />
                </Section>
                <CandyFamilyPanel
                  entry={entry}
                  payload={payload}
                  allEntries={allEntries}
                  onOpenRelated={onOpenRelated}
                />
                <EvolutionPanel
                  evolutions={payload.evolutions || []}
                  allEntries={allEntries}
                  onOpenRelated={onOpenRelated}
                  candyIcon={candyIcon}
                />
                <Section
                  title="Disponibilité"
                  icon={uiAssets.icons.shiny}
                  tone="emerald"
                >
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {Object.entries(availability).map(([key, value]) => (
                      <span
                        className={`inline-flex min-h-9 items-center justify-between gap-2 rounded-2xl border px-3 py-2 text-xs font-black ${
                          value
                            ? "border-emerald-300/35 bg-emerald-400/15 text-emerald-100"
                            : "border-line bg-surface-flat text-muted"
                        }`}
                        key={key}
                      >
                        <span className="truncate">
                          {availabilityLabels[key] || key}
                        </span>
                        <span
                          className={`h-2.5 w-2.5 shrink-0 rounded-full ${value ? "bg-emerald-300" : "bg-slate-600"}`}
                        />
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
                <Section
                  title="Statistiques de base"
                  icon={uiAssets.icons.swords}
                  tone="rose"
                >
                  <DataGrid
                    type={mainType}
                    items={[
                      {
                        label: "Attaque",
                        value: valueOrDash(stats.attack),
                        icon: uiAssets.icons.swords,
                      },
                      {
                        label: "Défense",
                        value: valueOrDash(stats.defense),
                        icon: uiAssets.icons.shieldAlt,
                      },
                      {
                        label: "Endurance",
                        value: valueOrDash(stats.stamina),
                        icon: uiAssets.icons.up,
                      },
                    ]}
                  />
                </Section>
                <Section
                  title="PC max et rencontres"
                  icon={uiAssets.icons.maxPc}
                  tone="cyan"
                >
                  <DataGrid
                    type={mainType}
                    items={[
                      {
                        label: "PC 50",
                        value: valueOrDash(maxCp.maxLevel50),
                        icon: uiAssets.icons.maxPc,
                      },
                      {
                        label: "PC 40",
                        value: valueOrDash(maxCp.maxLevel40),
                        icon: uiAssets.icons.maxPc,
                      },
                      {
                        label: "Raid 20",
                        value: valueOrDash(maxCp.raidLevel20),
                        icon: uiAssets.icons.maxPc,
                      },
                      {
                        label: "Météo 25",
                        value: valueOrDash(maxCp.weatherBoostLevel25),
                        icon: uiAssets.icons.maxPc,
                      },
                      {
                        label: "Recherche 15",
                        value: valueOrDash(maxCp.researchLevel15),
                        icon: uiAssets.icons.maxPc,
                      },
                    ]}
                  />
                </Section>
                <Section
                  title="PC par niveau"
                  icon={uiAssets.icons.maxPc}
                  tone="violet"
                >
                  {cpByLevel.length ? (
                    <div className="grid max-h-[48dvh] gap-2 overflow-auto pr-1 sm:grid-cols-2 lg:grid-cols-4">
                      {cpByLevel.map((row) => (
                        <div
                          className="flex items-center justify-between rounded-2xl border border-line bg-surface-flat px-4 py-3"
                          key={row.level}
                        >
                          <span className="font-bold text-foreground-secondary">
                            Niv. {row.level}
                          </span>
                          <strong className="font-black text-domain-foreground">
                            {row.cp ??
                              `${row.minCp ?? "?"} - ${row.maxCp ?? "?"} PC`}
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
                <MoveList
                  title="Attaques rapides"
                  moves={moveCollection(
                    moveDetails,
                    "quickMoves",
                    payload.quickMoves,
                  )}
                  typeCatalog={typeCatalog}
                  icon={uiAssets.icons.maxPc}
                  pokemonTypes={pokemonTypes}
                />
                <MoveList
                  title="Attaques chargées"
                  moves={moveCollection(
                    moveDetails,
                    "cinematicMoves",
                    payload.cinematicMoves,
                  )}
                  typeCatalog={typeCatalog}
                  icon={uiAssets.icons.attackMove}
                  pokemonTypes={pokemonTypes}
                />
                <MoveList
                  title="Attaques elite rapides"
                  moves={moveCollection(
                    moveDetails,
                    "eliteQuickMoves",
                    payload.eliteQuickMoves,
                  )}
                  typeCatalog={typeCatalog}
                  icon={uiAssets.icons.maxPc}
                  pokemonTypes={pokemonTypes}
                />
                <MoveList
                  title="Attaques elite chargées"
                  moves={moveCollection(
                    moveDetails,
                    "eliteCinematicMoves",
                    payload.eliteCinematicMoves,
                  )}
                  typeCatalog={typeCatalog}
                  icon={uiAssets.icons.attackMove}
                  pokemonTypes={pokemonTypes}
                />
                <MoveList
                  title="Attaques Max / GMax"
                  moves={moveCollection(
                    moveDetails,
                    "maxMoves",
                    payload.maxBattle?.moves,
                  )}
                  typeCatalog={typeCatalog}
                  icon={uiAssets.icons.breadBadge}
                  pokemonTypes={pokemonTypes}
                />
              </>
            ) : null}

            {activeTab === "pvp" ? (
              <PvpPanel pvp={pvp} moveDetails={moveDetails} />
            ) : null}

            {activeTab === "shadow" ? (
              <Section
                title="Shadow / Purification"
                icon={uiAssets.icons.shadow}
                tone="violet"
              >
                <DataGrid
                  type={mainType}
                  items={[
                    {
                      label: "Shadow",
                      value: availability.shadow ? "Oui" : "Non",
                      icon: uiAssets.icons.shadow,
                    },
                    {
                      label: "Purification",
                      value: valueOrDash(
                        payload.shadow?.purificationCost?.stardust,
                        " poussières",
                      ),
                      icon: uiAssets.icons.purified,
                    },
                    {
                      label: "Bonbons",
                      value: (
                        <CandyAmount
                          value={payload.shadow?.purificationCost?.candy}
                          icon={candyIcon}
                        />
                      ),
                      icon: candyIcon || uiAssets.icons.candy,
                    },
                    {
                      label: "Sortie",
                      value: formatDate(
                        payload.shadow?.firstReleaseDate ||
                          payload.shadow?.releaseDate,
                      ),
                      icon: uiAssets.icons.radar,
                    },
                    {
                      label: "Catch CP",
                      value: `Normal ${formatRange(payload.shadow?.catchCp?.normal)} / Météo ${formatRange(payload.shadow?.catchCp?.weatherBoosted)}`,
                      icon: uiAssets.icons.cp,
                    },
                  ]}
                />
              </Section>
            ) : null}

            {activeTab === "assets" ? (
              <AssetGallery entry={entry} payload={payload} />
            ) : null}
            {activeTab === "checks" ? <IssuesPanel entry={entry} /> : null}
            {activeTab === "json" ? (
              <div className="space-y-4">
                <Section
                  title="JSON principal"
                  icon={uiAssets.icons.copy}
                  tone="cyan"
                  plain
                >
                  <JsonBlock payload={payload.sourceData || payload} />
                </Section>
                <Section
                  title="JSON assets"
                  icon={uiAssets.icons.result}
                  tone="cyan"
                  plain
                >
                  {payload.assetSourceData ? (
                    <JsonBlock payload={payload.assetSourceData} />
                  ) : (
                    <EmptyInline>
                      Aucun fichier asset séparé lié à cette fiche
                      {payload.assetSourceFile
                        ? ` (${payload.assetSourceFile}).`
                        : "."}
                    </EmptyInline>
                  )}
                </Section>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
