"use client";

import { AlertTriangle, CheckCircle2, Image as ImageIcon, Link2 } from "lucide-react";
import { useState } from "react";
import { preferredPokemonImage } from "@/components/site/pokemon-style";
import { Modal } from "@/components/ui/modal";
import { AssetStatCard, Panel } from "./admin-ui";

function assetKey(value) {
  const source = decodeURIComponent(String(value || "").split("?")[0]);
  return source.split("/").pop()?.toLowerCase() || "";
}

function locationCardsForEntry(entry) {
  const locationCards = Array.isArray(entry?.assets?.locationCards)
    ? entry.assets.locationCards
    : [];

  return locationCards
    .map((asset) => (typeof asset === "string" ? { image: asset } : asset || {}))
    .map((asset) => ({
      image: asset.image || asset.url || asset.asset || null,
      label: asset.name || asset.title || null,
    }))
    .filter((asset) => asset.image);
}

function hasLocationCardReference(entry) {
  const locationCards = entry?.assets?.locationCards;
  if (Array.isArray(locationCards)) return locationCards.length > 0;
  return Number(locationCards || 0) > 0;
}

function libraryCard(asset) {
  return {
    image: asset.url,
    filename: asset.filename || assetKey(asset.url),
    label: asset.label || asset.filename || "Location card",
    entries: [],
  };
}

function BackgroundPreview({ background, onOpen, onPreview }) {
  const linked = background.entries || [];
  return (
    <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/42 shadow-[0_18px_70px_rgba(0,0,0,.2)]">
      <button
        aria-label={`Agrandir ${background.label}`}
        className="relative block aspect-[16/7] min-h-[180px] w-full overflow-hidden bg-slate-950 p-4"
        type="button"
        onClick={() => onPreview?.(background)}
      >
        <span className="absolute inset-0 scale-110 bg-cover bg-center opacity-45 blur-xl" style={{ backgroundImage: `url("${background.image}")` }} />
        <img className="absolute inset-0 h-full w-full object-contain" src={background.image} alt="" loading="lazy" />
        <span className="absolute inset-0 bg-gradient-to-b from-slate-950/25 via-transparent to-slate-950/85" />
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.14)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex h-full min-h-[148px] flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <span className="rounded-full border border-white/12 bg-slate-950/58 px-3 py-1 text-xs font-black text-white">Location card</span>
            <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black ${linked.length ? "border-emerald-200/30 bg-emerald-400/16 text-emerald-50" : "border-amber-200/30 bg-amber-400/16 text-amber-50"}`}>
              {linked.length ? <CheckCircle2 size={13} /> : <AlertTriangle size={13} />}
              {linked.length ? "Lié" : "Sans lien"}
            </span>
          </div>
          <div>
            <strong className="block break-words text-xl font-black text-white drop-shadow">{background.label}</strong>
            <span className="mt-2 inline-flex rounded-full border border-white/12 bg-slate-950/58 px-3 py-1 text-xs font-black text-cyan-50">
              {linked.length} Pokémon
            </span>
          </div>
        </div>
      </button>

      <div className="border-t border-white/10 p-4">
        {linked.length ? (
          <div className="grid max-h-72 gap-2 overflow-auto pr-1">
            {linked.slice(0, 28).map((entry) => (
              <button
                className="grid min-w-0 grid-cols-[42px_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.055] px-2.5 py-2 text-left transition hover:border-cyan-200/40 hover:bg-cyan-400/12"
                key={entry.key}
                type="button"
                onClick={() => onOpen?.(entry)}
              >
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950/40 p-1">
                  {preferredPokemonImage(entry) ? (
                    <img className="h-full w-full object-contain" src={preferredPokemonImage(entry)} alt={entry.name || "Pokémon"} loading="lazy" />
                  ) : (
                    <ImageIcon className="text-amber-200/75" size={18} aria-label="Asset Pokémon absent" />
                  )}
                </span>
                <span className="min-w-0">
                  <strong className="block truncate text-sm font-black text-white">{entry.name}</strong>
                  <small className="block truncate text-xs font-bold text-slate-400">N° {entry.dexId} · {entry.form || "normal"}</small>
                </span>
                <Link2 className="text-cyan-100/70" size={15} />
              </button>
            ))}
            {linked.length > 28 ? <p className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-black text-slate-300">+{linked.length - 28} autres fiches</p> : null}
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">Aucun Pokémon n’utilise cette location card pour le moment.</p>
        )}
      </div>
    </article>
  );
}

export function BackgroundPanel({ entries = [], library = [], linkedAssets = [], loading = false, search = "", onOpen }) {
  const [preview, setPreview] = useState(null);

  if (loading) {
    return (
      <Panel title="Backgrounds Pokémon" eyebrow="LocationCards + liens fiches">
        <p className="rounded-2xl border border-white/10 bg-slate-950/35 p-5 text-sm font-bold text-slate-300">
          Chargement de la bibliothèque LocationCards et des liens avec les fiches Pokémon...
        </p>
      </Panel>
    );
  }

  const groups = new Map(
    library.map((asset) => {
      const card = libraryCard(asset);
      return [assetKey(card.filename || card.image), card];
    }),
  );
  const entriesByFile = new Map(entries.map((entry) => [String(entry.file || ""), entry]));
  const entriesByVariant = new Map(entries.map((entry) => [
    `${String(entry.dexId || "").padStart(4, "0")}:${String(entry.form || "normal").toLowerCase()}`,
    entry,
  ]));
  for (const asset of linkedAssets) {
    const key = assetKey(asset.filename || asset.url);
    if (!key) continue;
    const group = groups.get(key) || {
      image: asset.url,
      filename: key,
      label: asset.details || key.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
      entries: [],
    };
    const linkedEntry = entriesByFile.get(String(asset.file || ""))
      || entriesByVariant.get(`${String(asset.dexId || "").padStart(4, "0")}:${String(asset.form || "normal").toLowerCase()}`);
    if (linkedEntry && !group.entries.some((entry) => entry.key === linkedEntry.key)) {
      group.entries.push(linkedEntry);
    }
    groups.set(key, group);
  }

  for (const entry of entries) {
    const cards = locationCardsForEntry(entry);
    if (!cards.length && !hasLocationCardReference(entry)) continue;
    for (const card of cards) {
      const key = assetKey(card.image);
      if (!key) continue;
      const group = groups.get(key) || {
        image: card.image,
        filename: key,
        label: card.label || key.replace(/\.[^.]+$/, "").replace(/[_-]+/g, " "),
        entries: [],
      };
      if (!group.entries.some((linkedEntry) => linkedEntry.key === entry.key)) group.entries.push(entry);
      groups.set(key, group);
    }
  }

  const needle = search.trim().toLowerCase();
  const backgrounds = [...groups.values()]
    .filter((background) => !needle || JSON.stringify([background.label, background.filename, background.entries.map((entry) => [entry.name, entry.dexId, entry.form])]).toLowerCase().includes(needle))
    .sort((left, right) => right.entries.length - left.entries.length || left.label.localeCompare(right.label, "fr"));
  const linkedEntries = backgrounds.reduce((total, background) => total + background.entries.length, 0);
  const emptyCount = backgrounds.filter((background) => !background.entries.length).length;
  return (
    <div className="space-y-5">
      <Panel title="Backgrounds Pokémon" eyebrow="LocationCards + liens fiches">
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Location cards" value={backgrounds.length} icon="/ui/backgrounds/catchCards/ic_catch_card.png" tone="cyan" detail="Bibliothèque Assets API" />
          <AssetStatCard label="Liens Pokémon" value={linkedEntries} icon="/ui/backgrounds/catchCards/ic_catch_card_notification.png" tone="green" detail="Fiches associées" />
          <AssetStatCard label="Sans Pokémon" value={emptyCount} icon="/ui/backgrounds/catchCards/ic_catch_card.png" tone="amber" detail="À rattacher" />
          <AssetStatCard label="Avec Pokémon" value={backgrounds.length - emptyCount} icon="/ui/backgrounds/catchCards/ic_catch_card_notification.png" tone="violet" detail="Location cards reliées" />
        </div>
        <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86">
          Cette section lit la bibliothèque <code>LocationCards</code> de PokemonGo-Assets-API et rapproche chaque image des fiches qui la référencent dans <code>assets.locationCards</code>. Les catchCards de capture ne sont pas utilisées ici.
        </p>
      </Panel>

      <section className="grid items-stretch gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {backgrounds.map((background) => <BackgroundPreview key={background.filename || background.image} background={background} onOpen={onOpen} onPreview={setPreview} />)}
      </section>

      <Modal
        open={Boolean(preview)}
        title={preview?.label || "Location card"}
        description={preview ? `${preview.entries.length} Pokémon associé(s)` : undefined}
        className="max-w-6xl"
        onClose={() => setPreview(null)}
      >
        {preview ? (
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-950/40 p-2">
            <img className="mx-auto max-h-[72dvh] w-full object-contain" src={preview.image} alt={preview.label || "Location card"} />
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
