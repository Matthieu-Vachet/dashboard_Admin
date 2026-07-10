"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { TypeIcons } from "./asset-icons";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
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

function values(data) {
  return Array.isArray(data) ? data : [];
}

function totalEggs(currentEggsList) {
  return Object.values(currentEggsList || {}).reduce((total, pokemon) => total + values(pokemon).length, 0);
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
          </div>
          <Rarity value={pokemon.rarity} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <TypeIcons types={pokemon.types} catalog={typeCatalog} />
          {pokemon.form ? <EggPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</EggPill> : null}
          {pokemon.costume ? <EggPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{pokemon.costume}</EggPill> : null}
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
      defaultOpen={pokemon.length > 0}
      emptyText="Aucun Pokemon dans cette section."
    >
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {pokemon.map((item, index) => (
            <EggCard
              key={`${id}-${item.form || item.id || item.sourceName}-${index}`}
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
  busyAction = "",
  onRefresh,
  onDownload,
  onImportMongo,
  onRegenerate,
  onOpenPokemon,
  typeCatalog = [],
}) {
  const currentEggsList = eggs?.data?.currentEggsList || eggs?.currentEggsList || {};
  const buckets = eggs?.meta?.buckets || Object.fromEntries(
    Object.entries(currentEggsList).map(([key, pokemon]) => [key, values(pokemon).length]),
  );
  const total = totalEggs(currentEggsList);
  const adventureTotal = (buckets["5km_adventure_sync"] || 0) + (buckets["10km_adventure_sync"] || 0);
  const source = eggs?.meta?.source === "mongo" ? "MongoDB" : "JSON déployé";

  return (
    <div className="space-y-5">
      <Panel
        title="Oeufs Pokémon GO"
        eyebrow="LeekDuck + JSON local"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!total}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={buttonClass} type="button" onClick={onImportMongo} disabled={Boolean(busyAction)}>
              <CloudUpload size={17} /> {busyAction === "import" ? "Synchronisation..." : "Synchroniser MongoDB"}
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={Boolean(busyAction)}>
              <RotateCcw size={17} /> {busyAction === "regenerate" ? "Régénération..." : "Régénérer oeufs"}
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
        <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86">
          Source active : {source}. Régénérer parse LeekDuck et met MongoDB à jour; télécharger et synchroniser utilisent le même JSON affiché.
        </p>
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement des oeufs">
          <p className="font-bold text-slate-300">Lecture du JSON oeufs en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {eggSections.map(([id, title, image, tone]) => (
          <EggSection
            key={id}
            id={id}
            title={title}
            image={image}
            tone={tone}
            pokemon={values(currentEggsList[id])}
            onOpenPokemon={onOpenPokemon}
            typeCatalog={typeCatalog}
          />
        ))}
      </div>
    </div>
  );
}
