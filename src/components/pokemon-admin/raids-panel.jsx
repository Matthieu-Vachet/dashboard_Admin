"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw, Sparkles } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

const raidSections = [
  ["ultra_beast", "Ultra Beast", "/ui/raids/ultra_breche_raids.png", "cyan"],
  ["mega", "Méga", "/ui/raids/mega_raids.png", "violet"],
  ["lvl5", "5 étoiles", "/ui/raids/5_star_raids.png", "amber"],
  ["lvl3", "3 étoiles", "/ui/raids/3_star_raids.png", "green"],
  ["lvl1", "1 étoile", "/ui/raids/1_star_raids.png", "cyan"],
  ["shadow_lvl5", "Shadow 5 étoiles", "/ui/raids/shadow_icon.png", "violet"],
  ["shadow_lvl3", "Shadow 3 étoiles", "/ui/raids/teamrocket_r.png", "amber"],
  ["shadow_lvl1", "Shadow 1 étoile", "/ui/raids/teamrocket_r.png", "green"],
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

function totalRaids(currentList) {
  return Object.values(currentList || {}).reduce((total, bosses) => total + values(bosses).length, 0);
}

function compactList(items, limit = 4) {
  const list = values(items).filter(Boolean);
  if (list.length <= limit) return list.join(", ");
  return `${list.slice(0, limit).join(", ")} +${list.length - limit}`;
}

function RaidPill({ children, tone = "" }) {
  return (
    <span className={`inline-flex min-h-7 items-center rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {children}
    </span>
  );
}

function RaidCard({ boss }) {
  const name = boss.names?.French || boss.names?.English || boss.sourceName || boss.id || "Boss inconnu";
  const english = boss.names?.English && boss.names.English !== name ? boss.names.English : null;
  const cp = boss.cpRange?.length === 2 ? `${boss.cpRange[0]} - ${boss.cpRange[1]}` : "n/a";
  const boosted = boss.cpRangeBoost?.length === 2 ? `${boss.cpRangeBoost[0]} - ${boss.cpRangeBoost[1]}` : "n/a";
  const counters = Object.entries(boss.counter || {})
    .slice(0, 4)
    .map(([type, multiplier]) => `${type} x${multiplier}`);

  return (
    <article className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/38 shadow-[0_18px_70px_rgba(0,0,0,.2)] transition hover:-translate-y-0.5 hover:border-cyan-200/35">
      <div className="relative grid min-h-[150px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_15%,rgba(34,211,238,.18),transparent_42%),linear-gradient(135deg,rgba(15,23,42,.88),rgba(8,47,73,.68))] p-4">
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.1)_1px,transparent_1px)] [background-size:24px_24px]" />
        {boss.shiny ? (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-amber-100/25 bg-amber-300/18 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-amber-50">
            <Sparkles size={12} /> Shiny
          </span>
        ) : null}
        {boss.unmatched ? (
          <span className="absolute right-3 top-3 rounded-full border border-red-200/30 bg-red-400/16 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
            Non matché
          </span>
        ) : null}
        <img
          className="relative z-10 max-h-28 object-contain drop-shadow-[0_18px_34px_rgba(0,0,0,.38)] transition duration-300 group-hover:scale-105"
          src={boss.assets?.image || boss.assets?.shinyImage || uiAssets.icons.pokemon}
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
          {values(boss.types).map((type) => (
            <RaidPill key={type} tone={typeTone[type] || "border-white/10 bg-white/10 text-white"}>
              {type}
            </RaidPill>
          ))}
          {boss.form ? <RaidPill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{boss.form}</RaidPill> : null}
          {boss.costume ? <RaidPill tone="border-fuchsia-200/25 bg-fuchsia-400/12 text-fuchsia-50">{boss.costume}</RaidPill> : null}
        </div>
        <div className="grid gap-2 text-xs font-bold text-slate-300 sm:grid-cols-2">
          <span className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">CP</small>
            {cp}
          </span>
          <span className="rounded-2xl border border-white/10 bg-white/[0.055] p-3">
            <small className="block text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">Boost météo</small>
            {boosted}
          </span>
        </div>
        <p className="text-xs font-bold leading-5 text-slate-400">
          Météo: {compactList(boss.weather) || "n/a"}
        </p>
        <p className="text-xs font-bold leading-5 text-slate-400">
          Faiblesses: {counters.length ? counters.join(", ") : "n/a"}
        </p>
        {boss.note ? <p className="text-xs font-bold leading-5 text-cyan-100/80">{boss.note}</p> : null}
      </div>
    </article>
  );
}

function RaidSection({ id, title, image, bosses }) {
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
          {bosses.length}
        </span>
      </div>
      {bosses.length ? (
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {bosses.map((boss, index) => (
            <RaidCard key={`${id}-${boss.form || boss.id || boss.sourceName}-${index}`} boss={boss} />
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
          Aucun boss dans cette section.
        </p>
      )}
    </section>
  );
}

export function RaidsPanel({
  raids,
  loading = false,
  busyAction = "",
  onRefresh,
  onDownload,
  onImportMongo,
  onRegenerate,
}) {
  const currentList = raids?.data?.currentList || raids?.currentList || {};
  const buckets = raids?.meta?.buckets || Object.fromEntries(
    Object.entries(currentList).map(([key, bosses]) => [key, values(bosses).length]),
  );
  const total = totalRaids(currentList);
  const openBugs = values(currentList.shadow_lvl5).length + values(currentList.shadow_lvl3).length + values(currentList.shadow_lvl1).length;

  return (
    <div className="space-y-5">
      <Panel
        title="Raids Pokémon GO"
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
              <RotateCcw size={17} /> {busyAction === "regenerate" ? "Régénération..." : "Régénérer raids"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Boss actifs" value={total} icon="/ui/raids/5_star_raids.png" tone="cyan" detail="Toutes sections raids" />
          <AssetStatCard label="Méga" value={buckets.mega || 0} icon="/ui/raids/mega_raids.png" tone="violet" detail="Raids Méga actifs" />
          <AssetStatCard label="Shadow" value={openBugs} icon="/ui/raids/teamrocket_r.png" tone="amber" detail="Raids obscurs" />
          <AssetStatCard label="Ultra Beast" value={buckets.ultra_beast || 0} icon="/ui/raids/ultra_breche_raids.png" tone="green" detail="Ultra-brèches" />
        </div>
        <p className="mt-4 rounded-2xl border border-cyan-300/15 bg-cyan-400/10 p-4 text-sm font-bold leading-6 text-cyan-50/86">
          Données lues depuis `raids/currentRaids.json`, générées à partir de LeekDuck puis enrichies par les fiches Pokémon locales.
        </p>
      </Panel>

      {loading && !total ? (
        <Panel title="Chargement des raids">
          <p className="font-bold text-slate-300">Lecture du JSON raids en cours.</p>
        </Panel>
      ) : null}

      <div className="space-y-4">
        {raidSections.map(([id, title, image]) => (
          <RaidSection key={id} id={id} title={title} image={image} bosses={values(currentList[id])} />
        ))}
      </div>
    </div>
  );
}
