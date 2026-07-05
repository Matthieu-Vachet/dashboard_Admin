"use client";

import { AlertTriangle, CheckCircle2, Image as ImageIcon, Link2 } from "lucide-react";
import { typeColors, typeIcon, typeName, preferredPokemonImage } from "@/components/site/pokemon-style";
import { AssetStatCard, Panel } from "./admin-ui";

const catchCardTypes = [
  "BUG",
  "DARK",
  "DRAGON",
  "ELECTRIC",
  "FAIRY",
  "FIGHTING",
  "FIRE",
  "FLYING",
  "GHOST",
  "GRASS",
  "GROUND",
  "ICE",
  "NORMAL",
  "POISON",
  "PSYCHIC",
  "ROCK",
  "STEEL",
  "WATER",
];

function catchCardPath(type) {
  const label = String(type || "NORMAL").toLowerCase();
  return `/ui/backgrounds/catchCards/CatchCard_TypeBG_${label.charAt(0).toUpperCase()}${label.slice(1)}.png`;
}

function entryBackground(entry) {
  const assets = entry?.assets || {};
  const candidates = [
    assets.background,
    assets.catchCard,
    assets.catchCardBackground,
    assets.locationCard,
    assets.locationCards?.[0],
  ];

  for (const candidate of candidates) {
    if (!candidate) continue;
    if (typeof candidate === "string") return candidate;
    const image = candidate.image || candidate.url || candidate.asset || candidate.background;
    if (image) return image;
  }

  return catchCardPath(String(entry?.primaryType || "NORMAL").toUpperCase());
}

function backgroundLabel(src, fallback) {
  const clean = String(src || fallback || "Background").split("?")[0];
  const filename = clean.split("/").pop() || fallback || "Background";
  return filename.replace(/\.(png|webp|jpg|jpeg)$/i, "").replace(/[_-]+/g, " ");
}

function normalize(value) {
  return String(value || "").trim().toLowerCase();
}

function BackgroundPreview({ background, typeCatalog }) {
  const linked = background.entries || [];
  const firstType = background.type || linked[0]?.primaryType || "NORMAL";
  const color = typeColors[String(firstType).toUpperCase()] || "#38bdf8";

  return (
    <article
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/42 shadow-[0_18px_70px_rgba(0,0,0,.2)]"
      style={{ borderColor: `color-mix(in srgb, ${color} 35%, rgba(255,255,255,.13))` }}
    >
      <div
        className="relative min-h-[170px] overflow-hidden bg-cover bg-center p-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(2,6,23,.38), rgba(2,6,23,.74)), url("${background.image}")`,
        }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex min-h-[138px] flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/12 bg-slate-950/48 px-3 py-1 text-xs font-black text-white">
              {background.group}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black ${linked.length ? "border-emerald-200/30 bg-emerald-400/16 text-emerald-50" : "border-amber-200/30 bg-amber-400/16 text-amber-50"}`}>
              {linked.length ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
              {linked.length ? "Lié" : "Sans lien"}
            </span>
          </div>
          <div>
            <strong className="block text-xl font-black text-white drop-shadow">
              {background.label}
            </strong>
            <span className="mt-2 inline-flex rounded-full border border-white/12 bg-slate-950/48 px-3 py-1 text-xs font-black text-cyan-50">
              {linked.length} Pokémon
            </span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 p-4">
        {background.type ? (
          <div className="mb-3 flex items-center gap-2">
            {typeIcon(background.type, typeCatalog) ? (
              <img className="h-6 w-6 object-contain" src={typeIcon(background.type, typeCatalog)} alt="" />
            ) : null}
            <span className="text-sm font-black text-slate-200">
              {typeName(background.type, typeCatalog)}
            </span>
          </div>
        ) : null}
        {linked.length ? (
          <div className="grid max-h-72 gap-2 overflow-auto pr-1">
            {linked.slice(0, 28).map((entry) => (
              <button
                className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-2.5 py-2 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/12"
                key={entry.key}
                type="button"
                onClick={() => background.onOpen?.(entry)}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950/40 p-1">
                  {preferredPokemonImage(entry) ? (
                    <img className="max-h-full object-contain" src={preferredPokemonImage(entry)} alt="" loading="lazy" />
                  ) : null}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-black text-white">{entry.name}</strong>
                  <small className="block truncate text-xs font-bold text-slate-400">
                    N° {entry.dexId} · {entry.form || "normal"}
                  </small>
                </span>
                <Link2 className="text-cyan-100/70" size={15} />
              </button>
            ))}
            {linked.length > 28 ? (
              <p className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-300">
                +{linked.length - 28} autres fiches
              </p>
            ) : null}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
            Aucun Pokémon n’utilise ce background pour le moment.
          </p>
        )}
      </div>
    </article>
  );
}

export function BackgroundPanel({ entries = [], search = "", onOpen, typeCatalog = [] }) {
  const linkedEntries = entries.map((entry) => ({ entry, image: entryBackground(entry) }));
  const groups = new Map();

  for (const type of catchCardTypes) {
    const image = catchCardPath(type);
    groups.set(normalize(image), {
      image,
      label: `${typeName(type, typeCatalog)} catch card`,
      type,
      group: "CatchCard local",
      entries: [],
      onOpen,
    });
  }

  for (const { entry, image } of linkedEntries) {
    if (!image) continue;
    const key = normalize(image);
    const current = groups.get(key) || {
      image,
      label: backgroundLabel(image, entry.primaryType),
      type: entry.primaryType,
      group: image.includes("/ui/backgrounds/catchCards/") ? "CatchCard local" : "Asset lié",
      entries: [],
      onOpen,
    };
    current.entries.push(entry);
    groups.set(key, current);
  }

  const missingEntries = linkedEntries
    .filter(({ image, entry }) => !image && entry.primaryType)
    .map(({ entry }) => entry);
  const needle = search.trim().toLowerCase();
  const backgrounds = Array.from(groups.values())
    .filter((background) => {
      if (!needle) return true;
      return JSON.stringify({
        label: background.label,
        type: background.type,
        entries: background.entries.map((entry) => [entry.name, entry.dexId, entry.form]),
      }).toLowerCase().includes(needle);
    })
    .sort((left, right) => right.entries.length - left.entries.length || left.label.localeCompare(right.label, "fr"));

  const linkedCount = backgrounds.reduce((total, background) => total + background.entries.length, 0);
  const emptyCount = backgrounds.filter((background) => !background.entries.length).length;

  return (
    <div className="space-y-5">
      <Panel title="Backgrounds Pokémon" eyebrow="catchCards + liens fiches">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Backgrounds" value={backgrounds.length} icon="/ui/backgrounds/catchCards/ic_catch_card.png" tone="cyan" detail="Images disponibles" />
          <AssetStatCard label="Liens Pokémon" value={linkedCount} icon="/ui/backgrounds/catchCards/ic_catch_card_notification.png" tone="green" detail="Fiches associées" />
          <AssetStatCard label="Sans Pokémon" value={emptyCount} icon="/ui/backgrounds/catchCards/ic_catch_card.png" tone="amber" detail="À vérifier" />
          <AssetStatCard label="Fiches sans fond" value={missingEntries.length} icon="/ui/backgrounds/catchCards/ic_catch_card_notification.png" tone="violet" detail="Lien absent" />
        </div>
        <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86">
          Cette section rapproche les backgrounds catchCards locaux, les backgrounds référencés par les fiches et les Pokémon associés. Un fond sans Pokémon reste visible pour repérer les assets disponibles mais non utilisés.
        </p>
      </Panel>

      {missingEntries.length ? (
        <Panel title="Pokémon sans background détecté" eyebrow={`${missingEntries.length} fiche(s)`}>
          <div className="flex max-h-72 flex-wrap gap-2 overflow-auto pr-1">
            {missingEntries.slice(0, 80).map((entry) => (
              <button
                className="inline-flex items-center gap-2 rounded-full border border-amber-200/20 bg-amber-400/10 px-3 py-2 text-xs font-black text-amber-50"
                key={entry.key}
                type="button"
                onClick={() => onOpen?.(entry)}
              >
                <ImageIcon size={14} />
                {entry.dexId} · {entry.name}
              </button>
            ))}
          </div>
        </Panel>
      ) : null}

      <section className="grid items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {backgrounds.map((background) => (
          <BackgroundPreview key={background.image} background={background} typeCatalog={typeCatalog} />
        ))}
      </section>
    </div>
  );
}
