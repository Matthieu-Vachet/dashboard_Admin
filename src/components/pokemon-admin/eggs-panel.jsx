"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

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

const typeTone = {
  Normal: "bg-slate-400/22 text-slate-50 border-slate-200/25",
  Fire: "bg-orange-400/22 text-orange-50 border-orange-200/25",
  Water: "bg-sky-400/22 text-sky-50 border-sky-200/25",
  Grass: "bg-emerald-400/22 text-emerald-50 border-emerald-200/25",
  Electric: "bg-yellow-300/22 text-yellow-50 border-yellow-100/25",
  Ice: "bg-cyan-200/22 text-cyan-50 border-cyan-100/25",
  Fighting: "bg-red-400/22 text-red-50 border-red-200/25",
  Poison: "bg-purple-400/22 text-purple-50 border-purple-200/25",
  Ground: "bg-amber-500/22 text-amber-50 border-amber-200/25",
  Flying: "bg-indigo-300/22 text-indigo-50 border-indigo-100/25",
  Psychic: "bg-pink-400/22 text-pink-50 border-pink-200/25",
  Bug: "bg-lime-400/22 text-lime-50 border-lime-200/25",
  Rock: "bg-stone-400/22 text-stone-50 border-stone-200/25",
  Ghost: "bg-violet-500/22 text-violet-50 border-violet-200/25",
  Dragon: "bg-blue-500/22 text-blue-50 border-blue-200/25",
  Dark: "bg-zinc-500/22 text-zinc-50 border-zinc-200/25",
  Steel: "bg-slate-300/22 text-slate-50 border-slate-100/25",
  Fairy: "bg-fuchsia-300/22 text-fuchsia-50 border-fuchsia-100/25",
};

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
        <img key={index} className="h-5 w-5 object-contain" src="/ui/eggs/rareté.png" alt="" />
      ))}
    </div>
  );
}

function EggCard({ pokemon }) {
  const name = pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon inconnu";
  const english = pokemon.names?.English && pokemon.names.English !== name ? pokemon.names.English : null;

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35">
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
          {values(pokemon.types).map((type) => (
            <EggPill key={type} tone={typeTone[type] || "border-white/10 bg-white/10 text-white"}>
              {type}
            </EggPill>
          ))}
          {pokemon.form ? <EggPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</EggPill> : null}
          {pokemon.costume ? <EggPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{pokemon.costume}</EggPill> : null}
        </div>
        <p className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-sm font-black text-slate-200">
          <small className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">CP oeuf</small>
          {pokemon.cp || "n/a"}
        </p>
      </div>
    </article>
  );
}

function EggSection({ id, title, image, pokemon }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/26 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] p-2">
            <img className="max-h-full object-contain" src={image} alt="" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">{id}</p>
            <h3 className="truncate text-xl font-black text-white">{title}</h3>
          </div>
        </div>
        <span className="rounded-full border border-cyan-200/25 bg-cyan-400/12 px-3 py-1.5 text-xs font-black text-cyan-50">
          {pokemon.length}
        </span>
      </div>
      {pokemon.length ? (
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {pokemon.map((item, index) => (
            <EggCard key={`${id}-${item.form || item.id || item.sourceName}-${index}`} pokemon={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun Pokemon dans cette section.
        </p>
      )}
    </section>
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
}) {
  const currentEggsList = eggs?.data?.currentEggsList || eggs?.currentEggsList || {};
  const buckets = eggs?.meta?.buckets || Object.fromEntries(
    Object.entries(currentEggsList).map(([key, pokemon]) => [key, values(pokemon).length]),
  );
  const total = totalEggs(currentEggsList);
  const adventureTotal = (buckets["5km_adventure_sync"] || 0) + (buckets["10km_adventure_sync"] || 0);

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
              <CloudUpload size={17} /> {busyAction === "import" ? "Envoi..." : "Envoyer MongoDB"}
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
          Données lues depuis `eggs/currentEggs.json`, générées depuis LeekDuck puis enrichies par les fiches Pokémon locales.
        </p>
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement des oeufs">
          <p className="font-bold text-slate-300">Lecture du JSON oeufs en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {eggSections.map(([id, title, image]) => (
          <EggSection key={id} id={id} title={title} image={image} pokemon={values(currentEggsList[id])} />
        ))}
      </div>
    </div>
  );
}
