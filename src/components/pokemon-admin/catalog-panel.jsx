"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { fieldClass, Panel } from "./admin-ui";
import { typeBackground, typeColors, typeIcon, typeName } from "../site/pokemon-style";

function moveTitle(move) {
  return move.names?.French || move.names?.English || move.name || move.id;
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

function AdminMoveCard({ move, typeCatalog = [], onOpen }) {
  const [open, setOpen] = useState(false);
  const type = move.type;
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
      className="overflow-hidden rounded-3xl border border-white/10 bg-cover bg-center"
      style={{ backgroundImage: typePanelBackground(type, typeCatalog) }}
    >
      <button
        className="grid w-full gap-3 p-4 text-left sm:grid-cols-[minmax(0,1fr)_auto_auto]"
        type="button"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="min-w-0">
          <strong className="block truncate text-base font-black text-white">{moveTitle(move)}</strong>
          <small className="mt-1 block truncate font-mono text-xs font-bold text-slate-400">{move.id}</small>
        </span>
        <span
          className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-xs font-black text-white"
          style={{ background: `color-mix(in srgb, ${typeColors[type] || "#64748b"} 52%, rgba(255,255,255,.12))` }}
        >
          {typeIcon(type, typeCatalog) ? (
            <img className="h-4 w-4 shrink-0 object-contain" src={typeIcon(type, typeCatalog)} alt="" />
          ) : null}
          {typeName(type, typeCatalog)}
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
                    {pokemon.image ? <img className="h-7 w-7 object-contain" src={pokemon.image} alt="" /> : null}
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
  const items = rawItems.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(catalogSearch.trim().toLowerCase()),
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
