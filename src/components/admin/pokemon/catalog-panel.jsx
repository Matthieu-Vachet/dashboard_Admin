"use client";

import { useState } from "react";
import { ChevronDown, Swords, Zap } from "lucide-react";
import { fieldClass, Panel } from "./admin-ui";
import { PokemonArtwork } from "./pokemon-artwork";
import { typeBackground, typeColors, typeIcon, typeName } from "@/components/site/pokemon-style";
import { useAdminPokemonSearch } from "./admin-pokemon-search-context";

function moveTitle(move) {
  return move.names?.French || move.names?.English || move.name || move.id;
}

function moveKind(move) {
  const value = String(move.kind || move.category || move.moveType || "").toLowerCase();
  return value.includes("fast") || value.includes("quick") ? "fast" : "charged";
}

function typePanelBackground(type, typeCatalog = []) {
  const background = typeBackground(type, typeCatalog);
  return background
    ? `linear-gradient(135deg, rgba(2,6,23,.86), rgba(15,23,42,.76)), url("${background}")`
    : "linear-gradient(135deg, rgba(15,23,42,.86), rgba(2,6,23,.78))";
}

function formatBuffValue(value) {
  if (value === null || value === undefined) return "-";
  if (typeof value === "number" && value > 0) return `+${value}`;
  return String(value);
}

function normalizeTypeId(value) {
  return String(value || "").toUpperCase().replace(/[^A-Z0-9]+/g, "_");
}

function relationList(type, key) {
  return (Array.isArray(type?.[key]) ? type[key] : []).map(normalizeTypeId).filter(Boolean);
}

function weatherName(weatherId, weatherCatalog = []) {
  const target = String(weatherId || "").toLowerCase();
  const weather = weatherCatalog.find((item) =>
    [item.id, item.slug, item.weatherId].filter(Boolean).map((value) => String(value).toLowerCase()).includes(target),
  );
  return weather?.names?.French || weather?.names?.English || weatherId || "-";
}

function TypeChip({ type, catalog = [], multiplier }) {
  const id = normalizeTypeId(type);
  const color = typeColors[id] || "#64748b";
  return (
    <span
      className="inline-flex min-h-8 items-center gap-2 rounded-full border px-3 py-1 text-xs font-black text-white"
      style={{
        borderColor: `color-mix(in srgb, ${color} 45%, rgba(255,255,255,.16))`,
        background: `color-mix(in srgb, ${color} 38%, rgba(15,23,42,.72))`,
      }}
    >
      {typeIcon(id, catalog) ? (
        <img className="h-4 w-4 object-contain" src={typeIcon(id, catalog)} alt="" />
      ) : null}
      {typeName(id, catalog)}
      {multiplier ? <span className="opacity-75">x{multiplier}</span> : null}
    </span>
  );
}

function offensiveMultipliers(type, allTypes = []) {
  const attacker = normalizeTypeId(type.id || type.type || type.slug);
  return allTypes.map((targetType) => {
    const target = normalizeTypeId(targetType.id || targetType.type || targetType.slug);
    const doubleFrom = relationList(targetType, "doubleDamageFrom");
    const halfFrom = relationList(targetType, "halfDamageFrom");
    const noFrom = relationList(targetType, "noDamageFrom");
    let multiplier = "1";
    if (noFrom.includes(attacker)) multiplier = "0.391";
    else if (halfFrom.includes(attacker)) multiplier = "0.625";
    else if (doubleFrom.includes(attacker)) multiplier = "1.6";
    return { type: target, multiplier };
  });
}

function TypeCatalogCard({ item, typeCatalog = [], weatherCatalog = [] }) {
  const id = normalizeTypeId(item.id || item.type || item.slug);
  const color = typeColors[id] || "#38bdf8";
  const icon = typeIcon(id, typeCatalog) || item.assets?.icon;
  const background = item.assets?.background || typeBackground(id, typeCatalog);
  const weaknesses = relationList(item, "doubleDamageFrom");
  const resistances = relationList(item, "halfDamageFrom");
  const immunities = relationList(item, "noDamageFrom");
  const multipliers = offensiveMultipliers(item, typeCatalog);

  return (
    <article
      className="relative overflow-hidden rounded-3xl border bg-slate-950/45 shadow-[0_20px_80px_rgba(0,0,0,.22)]"
      style={{
        borderColor: `color-mix(in srgb, ${color} 34%, rgba(255,255,255,.12))`,
        backgroundImage: background
          ? `linear-gradient(135deg, rgba(2,6,23,.82), rgba(15,23,42,.64)), url("${background}")`
          : `linear-gradient(135deg, rgba(2,6,23,.9), color-mix(in srgb, ${color} 18%, rgba(15,23,42,.82)))`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 opacity-18 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:26px_26px]" />
      <div className="relative p-5">
        <div className="grid gap-4 sm:grid-cols-[72px_minmax(0,1fr)]">
          <span className="grid h-[72px] w-[72px] place-items-center rounded-3xl border border-white/12 bg-white/12 p-3 shadow-inner">
            {icon ? <img className="max-h-full object-contain" src={icon} alt="" /> : null}
          </span>
          <span className="min-w-0">
            <span className="text-xs font-black uppercase tracking-[0.22em] text-cyan-100/70">Type</span>
            <strong className="mt-1 block text-3xl font-black text-white">{item.names?.French || typeName(id, typeCatalog)}</strong>
            <span className="mt-1 block font-mono text-sm font-black uppercase text-slate-300">{item.names?.English || id}</span>
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.055] p-4">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">Boost météo</span>
          <strong className="mt-2 block text-white">{weatherName(item.weatherBoost, weatherCatalog)}</strong>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          <section>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-red-100/78">Faiblesses</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {weaknesses.length ? weaknesses.map((type) => <TypeChip key={type} type={type} catalog={typeCatalog} multiplier="1.6" />) : <span className="text-sm font-bold text-slate-400">Aucune</span>}
            </div>
          </section>
          <section>
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100/78">Résistances / immunités</h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {resistances.map((type) => <TypeChip key={type} type={type} catalog={typeCatalog} multiplier="0.625" />)}
              {immunities.map((type) => <TypeChip key={type} type={type} catalog={typeCatalog} multiplier="0.391" />)}
              {!resistances.length && !immunities.length ? <span className="text-sm font-bold text-slate-400">Aucune</span> : null}
            </div>
          </section>
        </div>

        <section className="mt-5">
          <h4 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/78">Multiplicateurs offensifs</h4>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {multipliers.map((row) => (
              <span className="flex min-w-0 items-center justify-between gap-3 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2" key={row.type}>
                <TypeChip type={row.type} catalog={typeCatalog} />
                <strong className="font-mono text-xs text-white">x{row.multiplier}</strong>
              </span>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}

function AdminMoveCard({ move, typeCatalog = [], onOpen }) {
  const [open, setOpen] = useState(false);
  const type = normalizeTypeId(move.type);
  const kind = moveKind(move);
  const color = typeColors[type] || "#64748b";
  const linkedPokemon = Array.isArray(move.pokemon) ? move.pokemon : [];
  const rows = [
    ["Puissance arène/raid", move.power ?? "-"],
    ["Énergie arène/raid", move.energy ?? "-"],
    ["Durée", move.durationMs ? `${move.durationMs} ms` : "-"],
    ["Puissance PvP", move.combat?.power ?? "-"],
    ["Énergie PvP", move.combat?.energy ?? "-"],
    ["Tours PvP", move.combat?.turns ?? "-"],
    ["Catégorie", move.category || move.kind || move.moveType || "-"],
    ["Slug", move.slug || "-"],
  ];
  const buffs = move.combat?.buffs;
  const buffRows = buffs
    ? [
        ["Chance", buffs.activationChance !== undefined ? `${buffs.activationChance}%` : "-"],
        ["Atk lanceur", formatBuffValue(buffs.attackerAttackStatsChange)],
        ["Def lanceur", formatBuffValue(buffs.attackerDefenseStatsChange)],
        ["Atk cible", formatBuffValue(buffs.targetAttackStatsChange)],
        ["Def cible", formatBuffValue(buffs.targetDefenseStatsChange)],
      ]
    : [];

  return (
    <article
      className={`overflow-hidden rounded-3xl border bg-cover bg-center transition ${open ? "shadow-[0_18px_70px_rgba(0,0,0,.28)]" : ""}`}
      style={{ backgroundImage: typePanelBackground(type, typeCatalog), borderColor: `color-mix(in srgb, ${color} ${open ? "68%" : "34%"}, rgba(255,255,255,.14))` }}
    >
      <button
        className={`grid w-full gap-3 p-4 text-left transition sm:grid-cols-[minmax(0,1fr)_auto_auto_auto] ${open ? "bg-white/[0.07]" : "hover:bg-white/[0.04]"}`}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="min-w-0">
          <strong className="block truncate text-base font-black text-white">{moveTitle(move)}</strong>
          <small className="mt-1 block truncate font-mono text-xs font-bold text-slate-400">{move.id}</small>
        </span>
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
          style={{ background: `color-mix(in srgb, ${color} 52%, rgba(255,255,255,.12))` }}
        >
          {typeIcon(type, typeCatalog) ? (
            <img className="h-4 w-4 shrink-0 object-contain" src={typeIcon(type, typeCatalog)} alt="" />
          ) : null}
          {typeName(type, typeCatalog)}
        </span>
        <span className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-xs font-black ${kind === "fast" ? "border-cyan-200/25 bg-cyan-400/14 text-cyan-50" : "border-violet-200/25 bg-violet-400/14 text-violet-50"}`}>
          {kind === "fast" ? <Zap size={14} aria-hidden="true" /> : <Swords size={14} aria-hidden="true" />}
          {kind === "fast" ? "Rapide" : "Chargée"}
        </span>
        <span className="inline-flex items-center justify-end gap-2 text-xs font-black text-cyan-100">
          {linkedPokemon.length} Pokémon <ChevronDown className={open ? "rotate-180 transition" : "transition"} size={15} />
        </span>
      </button>
      {open ? (
        <div className="border-t border-white/10 p-4">
          <div className="grid gap-3 text-sm sm:grid-cols-2 xl:grid-cols-4">
            {rows.map(([label, value]) => (
              <div className="rounded-2xl border border-white/10 bg-slate-950/45 p-3" key={label}>
                <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">{label}</span>
                <strong className="mt-1 block break-words text-white">{value}</strong>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">Traductions</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {Object.entries(move.names || {}).map(([lang, value]) => (
                <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-bold text-slate-200" key={lang}>
                  {lang}: {value}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">Buffs PvP</span>
            {buffRows.length ? (
              <div className="mt-2 grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
                {buffRows.map(([label, value]) => (
                  <span className="rounded-xl bg-white/[0.06] px-3 py-2 text-sm font-bold text-white" key={label}>
                    {label}: {value}
                  </span>
                ))}
              </div>
            ) : (
              <p className="mt-2 text-sm font-bold text-slate-400">Aucun buff PvP renseigné.</p>
            )}
          </div>
          <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/35 p-3">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="block text-xs font-black uppercase tracking-[0.16em] text-slate-500">
                Pokémon liés
              </span>
              <span className="rounded-full border border-cyan-200/20 bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-50">
                {linkedPokemon.length}
              </span>
            </div>
            {linkedPokemon.length ? (
              <div className="flex max-h-72 flex-wrap gap-2 overflow-auto pr-1">
                {linkedPokemon.map((pokemon) => (
                  <button
                    className="inline-flex min-w-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.065] px-2.5 py-1.5 text-xs font-black text-slate-100 transition hover:border-cyan-200/45 hover:bg-cyan-400/15"
                    key={pokemon.key}
                    type="button"
                    onClick={() => onOpen?.(pokemon)}
                  >
                    <PokemonArtwork pokemon={pokemon} className="h-7 w-7 rounded-lg border-0 bg-transparent p-0" />
                    <span className="max-w-[12rem] truncate">
                      {pokemon.dexId} · {pokemon.name}
                    </span>
                    <small className="rounded-full bg-slate-950/40 px-2 py-0.5 text-[10px] uppercase tracking-[0.12em]">
                      {(pokemon.moveSlots || []).join(", ")}
                    </small>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm font-bold text-slate-400">
                Aucun Pokémon lié à cette attaque dans les JSON chargés.
              </p>
            )}
          </div>
        </div>
      ) : null}
    </article>
  );
}

export function CatalogPanel({ catalog = {}, onOpen }) {
  const { combineWith } = useAdminPokemonSearch();
  const [tab, setTab] = useState("moves");
  const [catalogSearch, setCatalogSearch] = useState("");
  const data = catalog || {};
  const labels = {
    moves: "Attaques",
    types: "Types",
    weather: "Météo",
    stickers: "Stickers",
  };
  const rawItems =
    tab === "moves"
      ? data.moves || []
      : tab === "stickers"
        ? data.stickers || []
        : tab === "weather"
          ? data.weather || []
          : data.types || [];
  const effectiveSearch = combineWith(catalogSearch).toLocaleLowerCase("fr");
  const items = rawItems.filter((item) =>
    JSON.stringify(item).toLocaleLowerCase("fr").includes(effectiveSearch),
  );

  return (
    <Panel
      title="Catalogues complets"
      eyebrow="référentiels"
      action={
        <div className="flex max-w-full gap-2 overflow-x-auto pb-1">
          {Object.entries(labels).map(([value, label]) => (
            <button
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-black transition ${
                tab === value
                  ? "border-cyan-200/40 bg-cyan-400/20 text-cyan-50"
                  : "border-white/10 bg-white/[0.06] text-slate-300 hover:bg-white/10"
              }`}
              key={value}
              type="button"
              onClick={() => {
                setTab(value);
                setCatalogSearch("");
              }}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      <label className="mb-4 block">
        <span className="mb-2 block text-xs font-black uppercase tracking-[0.18em] text-slate-500">
          Recherche dans {labels[tab]}
        </span>
        <input
          className={fieldClass}
          value={catalogSearch}
          placeholder={`Chercher dans ${labels[tab].toLowerCase()}...`}
          onChange={(event) => setCatalogSearch(event.target.value)}
        />
      </label>
      {tab === "moves" ? (
        <div className="grid gap-3" key="moves">
          {items.slice(0, 180).map((item, index) => (
            <AdminMoveCard move={item} onOpen={onOpen} typeCatalog={data.types || []} key={`${item.id || item.slug}-${index}`} />
          ))}
        </div>
      ) : tab === "types" ? (
        <div className="grid gap-4 xl:grid-cols-2" key="types">
          {items.map((item, index) => (
            <TypeCatalogCard
              item={item}
              typeCatalog={data.types || []}
              weatherCatalog={data.weather || []}
              key={`${item.id || item.slug || index}`}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" key={tab}>
          {items.slice(0, 180).map((item, index) => {
            const image = item.assets?.background || item.assets?.icon || item.image;
            const label = item.names?.French || item.name || item.id;
            const boosted = Array.isArray(item.boostedTypes) ? item.boostedTypes : [];
            return (
              <article
                className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40"
                key={`${tab}-${item.id || item.filename || label}-${index}`}
              >
                <div
                  className="grid aspect-[4/3] place-items-center bg-white/[0.04] p-4"
                  style={{
                    backgroundImage: item.assets?.background
                      ? `linear-gradient(135deg, rgba(2,6,23,.45), rgba(2,6,23,.7)), url("${item.assets.background}")`
                      : undefined,
                    backgroundSize: "cover",
                  }}
                >
                  {image ? (
                    <img className="max-h-full object-contain drop-shadow-2xl" src={item.assets?.icon || item.image || image} alt={label} />
                  ) : (
                    <span className="h-10 w-10 rounded-full bg-white/10" />
                  )}
                </div>
                <div className="border-t border-white/10 p-3">
                  <strong className="block truncate text-sm font-black text-white">
                    {label}
                  </strong>
                  <span className="mt-1 block truncate text-xs font-bold text-slate-400">
                    {tab === "weather" ? "Météo" : tab === "stickers" ? item.filename || "Sticker" : item.category || item.id}
                  </span>
                  {boosted.length ? (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {boosted.map((type) => (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-slate-200" key={type}>
                          {typeName(type, data.types)}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}
      {!items.length ? (
        <p className="mt-4 rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun résultat dans {labels[tab]}.
        </p>
      ) : null}
    </Panel>
  );
}
