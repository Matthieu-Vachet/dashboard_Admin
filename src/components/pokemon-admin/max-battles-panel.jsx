"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw, Sparkles, Zap } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

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

function totalBattles(currentMaxBattle) {
  return Object.values(currentMaxBattle || {}).reduce((total, pokemon) => total + values(pokemon).length, 0);
}

function sortedTierEntries(currentMaxBattle) {
  return Object.entries(currentMaxBattle || {}).sort(([left], [right]) => {
    const leftTier = Number(left.match(/\d+/)?.[0] || 99);
    const rightTier = Number(right.match(/\d+/)?.[0] || 99);
    return leftTier - rightTier || left.localeCompare(right);
  });
}

function MaxPill({ children, tone = "" }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {children}
    </span>
  );
}

function MaxBattleCard({ pokemon }) {
  const name = pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon inconnu";
  const english = pokemon.names?.English && pokemon.names.English !== name ? pokemon.names.English : null;
  const cp = pokemon.cpRange?.length === 2 ? `${pokemon.cpRange[0]} - ${pokemon.cpRange[1]}` : pokemon.cpRange?.[0] || "n/a";

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35">
      <div className="relative grid min-h-[152px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(14,165,233,.2),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.9),rgba(30,64,175,.58))] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]" />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-sky-100/25 bg-sky-300/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-sky-50">
          <Zap size={12} /> {pokemon.tier || "Max"}
        </span>
        {pokemon.shiny ? (
          <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50">
            <Sparkles size={12} /> Shiny
          </span>
        ) : null}
        {pokemon.unmatched ? (
          <span className="absolute bottom-3 right-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
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
        <div className="min-w-0">
          <h3 className="truncate text-lg font-black text-white">{name}</h3>
          {english ? <p className="truncate text-xs font-bold text-slate-400">{english}</p> : null}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {values(pokemon.types).map((type) => (
            <MaxPill key={type} tone={typeTone[type] || "border-white/10 bg-white/10 text-white"}>
              {type}
            </MaxPill>
          ))}
          {pokemon.form ? <MaxPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</MaxPill> : null}
          {pokemon.costume ? <MaxPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{pokemon.costume}</MaxPill> : null}
        </div>
        <p className="rounded-2xl border border-white/10 bg-white/[0.055] p-3 text-sm font-black text-slate-200">
          <small className="block text-[10px] uppercase tracking-[0.16em] text-slate-500">CP Max Battle</small>
          {cp}
        </p>
      </div>
    </article>
  );
}

function MaxBattleSection({ id, pokemon }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-950/26 p-4">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[0.06] p-2">
            <img className="max-h-full object-contain" src="/ui/max_battles/max-battles.webp" alt="" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-cyan-100/70">max battle</p>
            <h3 className="truncate text-xl font-black text-white">{id}</h3>
          </div>
        </div>
        <span className="rounded-full border border-cyan-200/25 bg-cyan-400/12 px-3 py-1.5 text-xs font-black text-cyan-50">
          {pokemon.length}
        </span>
      </div>
      {pokemon.length ? (
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-4">
          {pokemon.map((item, index) => (
            <MaxBattleCard key={`${id}-${item.form || item.id || item.sourceName}-${index}`} pokemon={item} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun boss dans ce tier.
        </p>
      )}
    </section>
  );
}

export function MaxBattlesPanel({
  maxBattles,
  loading = false,
  busyAction = "",
  onRefresh,
  onDownload,
  onImportMongo,
  onRegenerate,
}) {
  const currentMaxBattle = maxBattles?.data?.currentMaxBattle || maxBattles?.currentMaxBattle || {};
  const buckets = maxBattles?.meta?.buckets || Object.fromEntries(
    Object.entries(currentMaxBattle).map(([key, pokemon]) => [key, values(pokemon).length]),
  );
  const total = totalBattles(currentMaxBattle);
  const tierEntries = sortedTierEntries(currentMaxBattle);

  return (
    <div className="space-y-5">
      <Panel
        title="Max Battles Pokémon GO"
        eyebrow="Snacknap + JSON local"
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
              <RotateCcw size={17} /> {busyAction === "regenerate" ? "Régénération..." : "Régénérer Max"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Boss Max" value={total} icon="/ui/max_battles/max-battles.webp" tone="cyan" detail="Tous tiers actifs" />
          <AssetStatCard label="Tier 1" value={buckets.Tier1 || 0} icon="/ui/max_battles/max-battles.webp" tone="green" detail="Difficulté 1" />
          <AssetStatCard label="Tier 2" value={buckets.Tier2 || 0} icon="/ui/max_battles/max-battles.webp" tone="violet" detail="Difficulté 2" />
          <AssetStatCard label="Tier 3+" value={Object.entries(buckets).reduce((sum, [key, value]) => sum + (Number(key.match(/\d+/)?.[0] || 0) >= 3 ? value : 0), 0)} icon="/ui/max_battles/ic_shiny.png" tone="amber" detail="Tiers élevés" />
        </div>
        <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86">
          Données lues depuis `max-battles/currentsMaxBattle.json`, générées depuis Snacknap puis enrichies par les formes Dynamax/Gigantamax locales.
        </p>
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement des Max Battles">
          <p className="font-bold text-slate-300">Lecture du JSON Max Battles en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {tierEntries.map(([id, pokemon]) => (
          <MaxBattleSection key={id} id={id} pokemon={values(pokemon)} />
        ))}
      </div>
    </div>
  );
}
