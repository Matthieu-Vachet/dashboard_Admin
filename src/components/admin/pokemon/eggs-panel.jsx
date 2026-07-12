"use client";

import { Download, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { TypeIcons } from "./asset-icons";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { DatasetSourceHeader } from "./dataset-source-header";
import { DatasetFilterBar } from "./dataset-filter-bar";
import { TierSection } from "./tier-section";
import { uiAssets } from "@/components/site/ui-assets";

const eggSections = [
  ["1km", "1 km", "/ui/eggs/1_km.png", "cyan"],
  ["2km", "2 km", "/ui/eggs/2_km.png", "green"],
  ["5km", "5 km", "/ui/eggs/5_km.png", "violet"],
  ["5km_adventure_sync", "5 km Adventure Sync", "/ui/eggs/5_km.png", "amber"],
  ["7km", "7 km", "/ui/eggs/7_km.png", "cyan"],
  ["7km_route_gift", "7 km Cadeau route", "/ui/eggs/7_km.png", "green"],
  ["10km", "10 km", "/ui/eggs/10_km.png", "violet"],
  ["10km_adventure_sync", "10 km Adventure Sync", "/ui/eggs/10_km.png", "amber"],
  ["12km", "12 km", "/ui/eggs/12_km.png", "cyan"],
];

const knownEggSections = new Set(eggSections.map(([id]) => id));

function values(data) {
  return Array.isArray(data) ? data : [];
}

function totalEggs(currentEggsList) {
  return Object.values(currentEggsList || {}).reduce((total, pokemon) => total + values(pokemon).length, 0);
}

function titleFromKey(key) {
  return String(key)
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function allEggSections(currentEggsList) {
  const unknown = Object.entries(currentEggsList || {})
    .filter(([id]) => !knownEggSections.has(id))
    .map(([id, pokemon]) => [
      id,
      values(pokemon)[0]?.sourceCategory || values(pokemon)[0]?.sectionTitle || titleFromKey(id),
      "/ui/eggs/2_km.png",
      "cyan",
    ]);
  return [...eggSections, ...unknown];
}

function EggPill({ children, tone = "" }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {children}
    </span>
  );
}

function Rarity({ value }) {
  const count = Math.max(0, Math.min(Number(value) || 0, 5));
  if (!count) return <span className="text-xs font-black text-slate-500">Rarete n/a</span>;
  return (
    <div className="flex items-center gap-1" aria-label={`Rarete ${count}`}>
      {Array.from({ length: count }).map((_, index) => (
        <img key={index} className="h-5 w-5 object-contain" src="/ui/eggs/rarity.png" alt="" />
      ))}
    </div>
  );
}

function EggCard({ pokemon, onOpenPokemon, typeCatalog = [] }) {
  const name = pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon inconnu";
  const english = pokemon.names?.English && pokemon.names.English !== name ? pokemon.names.English : null;
  const sourceName = pokemon.sourceName && ![name, english].filter(Boolean).includes(pokemon.sourceName) ? pokemon.sourceName : null;
  const canOpen = Boolean(onOpenPokemon && !pokemon.unmatched);

  return (
    <button
      className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 text-left shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35 disabled:cursor-default"
      type="button"
      disabled={!canOpen}
      onClick={() => canOpen && onOpenPokemon(pokemon)}
    >
      <div className="relative grid min-h-[148px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(250,204,21,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.88),rgba(14,116,144,.58))] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]" />
        {pokemon.shiny ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50">
            <Sparkles size={12} /> Shiny
          </span>
        ) : null}
        {pokemon.unmatched ? (
          <span className="absolute right-3 top-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
            Non matché
          </span>
        ) : null}
        <img
          className="relative z-10 max-h-28 object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,.38)] transition duration-300 group-hover:scale-105"
          src={pokemon.assets?.image || pokemon.assets?.shinyImage || uiAssets.icons.pokemon}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="space-y-3 border-t border-white/10 p-4">
        <div className="flex min-w-0 items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black text-white">{name}</h3>
            {english ? <p className="truncate text-xs font-bold text-slate-400">{english}</p> : null}
            {sourceName ? <p className="mt-1 truncate text-[11px] font-bold text-cyan-100/65">Source : {sourceName}</p> : null}
          </div>
          <Rarity value={pokemon.rarity} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TypeIcons types={pokemon.types} catalog={typeCatalog} />
          {pokemon.form ? <EggPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</EggPill> : null}
          {pokemon.costume ? <EggPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{pokemon.costume}</EggPill> : null}
          {pokemon.assets?.sourceImage ? <EggPill tone="border-emerald-200/20 bg-emerald-400/10 text-emerald-50">Asset source</EggPill> : null}
        </div>
        <p className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-sm font-black text-slate-200">
          <small className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">CP oeuf</small>
          {pokemon.cp || "n/a"}
        </p>
      </div>
    </button>
  );
}

function EggSection({ id, title, image, tone, pokemon, onOpenPokemon, typeCatalog = [] }) {
  return (
    <TierSection
      id={id}
      title={title}
      image={image}
      count={pokemon.length}
      tone={tone}
      defaultOpen={false}
      emptyText="Aucun Pokemon dans cette section."
    >
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {pokemon.map((item) => (
            <EggCard
              key={`${id}-${item.form || item.id || item.sourceName}-${item.costume || "standard"}-${item.rarity || ""}`}
              pokemon={item}
              onOpenPokemon={onOpenPokemon}
              typeCatalog={typeCatalog}
            />
          ))}
        </div>
    </TierSection>
  );
}

export function EggsPanel({
  eggs,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
  typeCatalog = [],
}) {
  const [query, setQuery] = useState("");
  const [shinyOnly, setShinyOnly] = useState(false);
  const [rareOnly, setRareOnly] = useState(false);
  const currentEggsList = useMemo(() => eggs?.data?.currentEggsList || eggs?.currentEggsList || {}, [eggs]);
  const buckets = eggs?.meta?.buckets || Object.fromEntries(
    Object.entries(currentEggsList).map(([key, pokemon]) => [key, values(pokemon).length]),
  );
  const total = totalEggs(currentEggsList);
  const adventureTotal = (buckets["5km_adventure_sync"] || 0) + (buckets["10km_adventure_sync"] || 0);
  const sections = useMemo(() => allEggSections(currentEggsList), [currentEggsList]);
  const normalizedQuery = query.trim().toLowerCase();
  const filteredSections = useMemo(() => sections.map((section) => {
    const [id] = section;
    const pokemon = values(currentEggsList[id]).filter((entry) => {
      if (shinyOnly && !entry.shiny) return false;
      if (rareOnly && Number(entry.rarity || 0) < 4) return false;
      if (!normalizedQuery) return true;
      return [entry.sourceName, entry.id, entry.form, entry.costume, entry.sourceCategory, ...Object.values(entry.names || {}), ...values(entry.types)]
        .filter(Boolean).join(" ").toLowerCase().includes(normalizedQuery);
    });
    return [...section, pokemon];
  }), [currentEggsList, normalizedQuery, rareOnly, sections, shinyOnly]);
  const visibleTotal = filteredSections.reduce((sum, section) => sum + section[4].length, 0);

  return (
    <div className="space-y-5">
      <Panel
        title="Oeufs Pokémon GO"
        eyebrow="MongoDB + LeekDuck"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading || regenerating}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!eggs?.current || !total || loading || regenerating}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={loading || regenerating}>
              <RotateCcw size={17} /> {regenerating ? "Régénération..." : "Régénérer oeufs"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Pokemon oeufs" value={total} icon="/ui/eggs/2_km.png" tone="cyan" detail="Toutes categories" />
          <AssetStatCard label="Adventure Sync" value={adventureTotal} icon="/ui/eggs/10_km.png" tone="violet" detail="Recompenses marche" />
          <AssetStatCard label="Cadeaux route" value={buckets["7km_route_gift"] || 0} icon="/ui/eggs/7_km.png" tone="green" detail="Oeufs de routes" />
          <AssetStatCard label="12 km" value={buckets["12km"] || 0} icon="/ui/eggs/12_km.png" tone="amber" detail="Oeufs Rocket" />
        </div>
        <DatasetSourceHeader dataset={eggs} total={total} refreshError={refreshError} />
      </Panel>

      <DatasetFilterBar
        query={query}
        onQueryChange={setQuery}
        placeholder="Rechercher Pokémon, type, forme ou catégorie d'œuf..."
        resultCount={visibleTotal}
        totalCount={total}
        toggles={[
          { id: "shiny", label: "Shiny", active: shinyOnly, onClick: () => setShinyOnly((value) => !value), icon: <Sparkles size={15} /> },
          { id: "rare", label: "Rareté 4+", active: rareOnly, onClick: () => setRareOnly((value) => !value) },
        ]}
      />

      {loading && !total ? (
        <Panel title="Chargement des oeufs">
          <p className="font-bold text-slate-300">Lecture des oeufs MongoDB en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {filteredSections.map(([id, title, image, tone, pokemon]) => (
          <EggSection
            key={`${id}-${pokemon.length > 0 ? "active" : "empty"}`}
            id={id}
            title={title}
            image={image}
            tone={tone}
            pokemon={pokemon}
            onOpenPokemon={onOpenPokemon}
            typeCatalog={typeCatalog}
          />
        ))}
      </div>
    </div>
  );
}
