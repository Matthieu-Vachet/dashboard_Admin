"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw, Shield, Sparkles } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

const fallbackAccents = {
  giovanni: "#ef4444",
  leader: "#8b5cf6",
  grunt: "#06b6d4",
};

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

function hexToRgb(hex) {
  const normalized = String(hex || "").replace("#", "").trim();
  if (!/^[0-9a-f]{6}$/i.test(normalized)) return null;
  return {
    r: Number.parseInt(normalized.slice(0, 2), 16),
    g: Number.parseInt(normalized.slice(2, 4), 16),
    b: Number.parseInt(normalized.slice(4, 6), 16),
  };
}

function alpha(hex, opacity) {
  const rgb = hexToRgb(hex);
  return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})` : `rgba(34, 211, 238, ${opacity})`;
}

function trainerGroups(currentRocketList) {
  const leaders = currentRocketList?.leaders || {};
  return [
    ["Giovanni", values(currentRocketList?.giovanni), "giovanni"],
    ["Leaders", Object.values(leaders).flatMap(values), "leader"],
    ["Grunts", values(currentRocketList?.grunts), "grunt"],
  ];
}

function totalPokemon(profiles) {
  return profiles.reduce(
    (total, profile) => total + Object.values(profile.slots || {}).reduce((slotTotal, slot) => slotTotal + values(slot).length, 0),
    0,
  );
}

function Pill({ children, tone = "" }) {
  return (
    <span className={`inline-flex min-h-7 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-black ${tone}`}>
      {children}
    </span>
  );
}

function PokemonChip({ pokemon, compact = false }) {
  const name = pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon";
  return (
    <article className="min-w-0 rounded-2xl border border-white/10 bg-white/[0.055] p-3">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-slate-950/55 p-1.5 ring-1 ring-white/10">
          <img
            className="max-h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,.35)]"
            src={pokemon.assets?.image || pokemon.assets?.shinyImage || uiAssets.icons.pokemon}
            alt={name}
            loading="lazy"
          />
        </span>
        <div className="min-w-0 flex-1">
          <h4 className="truncate text-sm font-black text-white">{name}</h4>
          <div className="mt-1 flex flex-wrap gap-1">
            {pokemon.shadow ? (
              <Pill tone="border-violet-200/25 bg-violet-400/14 text-violet-50">
                <Shield size={11} /> Shadow
              </Pill>
            ) : null}
            {pokemon.shiny ? (
              <Pill tone="border-amber-200/25 bg-amber-300/16 text-amber-50">
                <Sparkles size={11} /> Shiny
              </Pill>
            ) : null}
            {pokemon.unmatched ? <Pill tone="border-red-200/30 bg-red-400/16 text-red-50">Non matché</Pill> : null}
          </div>
        </div>
      </div>
      {!compact ? (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {values(pokemon.types).map((type) => (
            <Pill key={type} tone={typeTone[type] || "border-white/10 bg-white/10 text-white"}>
              {type}
            </Pill>
          ))}
          {pokemon.form ? <Pill tone="border-cyan-200/25 bg-cyan-400/12 text-cyan-50">{pokemon.form}</Pill> : null}
        </div>
      ) : null}
    </article>
  );
}

function SlotColumn({ label, pokemon }) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/28 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/70">{label}</h4>
        <span className="rounded-full bg-white/10 px-2 py-1 text-[10px] font-black text-white">{pokemon.length}</span>
      </div>
      <div className="grid gap-2">
        {pokemon.length ? (
          pokemon.map((item, index) => (
            <PokemonChip key={`${label}-${item.form || item.id || item.sourceName}-${index}`} pokemon={item} />
          ))
        ) : (
          <p className="rounded-xl border border-dashed border-white/12 p-3 text-sm font-bold text-slate-400">
            Aucun Pokémon.
          </p>
        )}
      </div>
    </section>
  );
}

function TrainerCard({ profile }) {
  const accent = profile.color?.primary || fallbackAccents[profile.trainerType] || fallbackAccents.grunt;
  const name = profile.trainer || "Rocket";

  return (
    <article
      className="overflow-hidden rounded-3xl border bg-slate-950/36 shadow-[0_20px_80px_rgba(0,0,0,.24)]"
      style={{
        borderColor: alpha(accent, 0.45),
        boxShadow: `0 20px 90px ${alpha(accent, 0.16)}`,
      }}
    >
      <div
        className="relative overflow-hidden p-4 sm:p-5"
        style={{
          background: `linear-gradient(135deg, ${alpha(accent, 0.34)}, rgba(15,23,42,.75))`,
        }}
      >
        <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-3xl border border-white/18 bg-slate-950/38 p-1">
              {profile.assets?.trainerImage ? (
                <img className="h-full w-full object-contain" src={profile.assets.trainerImage} alt={name} loading="lazy" />
              ) : (
                <span className="text-3xl font-black text-white">{name.slice(0, 1)}</span>
              )}
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/62">
                {profile.trainerType || "rocket"}
              </p>
              <h3 className="truncate text-2xl font-black text-white">{name}</h3>
              {profile.quote ? <p className="mt-1 line-clamp-2 text-sm font-bold text-white/72">{profile.quote}</p> : null}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.rocketType ? <Pill tone="border-cyan-200/25 bg-cyan-400/14 text-cyan-50">{profile.rocketType}</Pill> : null}
            <Pill tone="border-red-200/25 bg-red-400/16 text-red-50">Team GO Rocket</Pill>
          </div>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid gap-3 xl:grid-cols-3">
          <SlotColumn label="Slot 1" pokemon={values(profile.slots?.slot1)} />
          <SlotColumn label="Slot 2" pokemon={values(profile.slots?.slot2)} />
          <SlotColumn label="Slot 3" pokemon={values(profile.slots?.slot3)} />
        </div>
        <section className="rounded-2xl border border-emerald-200/18 bg-emerald-400/8 p-3">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100/75">Récompenses possibles</h4>
            <span className="rounded-full bg-emerald-300/14 px-2 py-1 text-[10px] font-black text-emerald-50">
              {values(profile.rewards).length}
            </span>
          </div>
          {values(profile.rewards).length ? (
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {values(profile.rewards).map((item, index) => (
                <PokemonChip key={`reward-${item.form || item.id || item.sourceName}-${index}`} pokemon={item} compact />
              ))}
            </div>
          ) : (
            <p className="text-sm font-bold text-slate-400">Aucune récompense indiquée par la source.</p>
          )}
        </section>
      </div>
    </article>
  );
}

export function RocketPanel({
  rocket,
  loading = false,
  busyAction = "",
  onRefresh,
  onDownload,
  onImportMongo,
  onRegenerate,
}) {
  const currentRocketList = rocket?.data?.currentRocketList || rocket?.currentRocketList || {};
  const groups = trainerGroups(currentRocketList);
  const profiles = groups.flatMap(([, items]) => items);
  const totalTrainers = profiles.length;
  const totalEntries = totalPokemon(profiles);

  return (
    <div className="space-y-5">
      <Panel
        title="Team GO Rocket"
        eyebrow="LeekDuck + JSON local"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!totalTrainers}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={buttonClass} type="button" onClick={onImportMongo} disabled={Boolean(busyAction)}>
              <CloudUpload size={17} /> {busyAction === "import" ? "Envoi..." : "Envoyer MongoDB"}
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={Boolean(busyAction)}>
              <RotateCcw size={17} /> {busyAction === "regenerate" ? "Régénération..." : "Régénérer Rocket"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Trainers" value={totalTrainers} icon="/ui/rocket/boss-giovanni.webp" tone="violet" detail="Giovanni, leaders, grunts" />
          <AssetStatCard label="Giovanni" value={values(currentRocketList.giovanni).length} icon="/ui/rocket/boss-giovanni.webp" tone="amber" detail="Boss actuel" />
          <AssetStatCard label="Leaders" value={groups.find(([title]) => title === "Leaders")?.[1]?.length || 0} icon="/ui/rocket/leader-sierra.webp" tone="cyan" detail="Arlo, Cliff, Sierra" />
          <AssetStatCard label="Pokémon slots" value={totalEntries} icon={uiAssets.icons.pokemon} tone="green" detail="Entrées matchées" />
        </div>
        <p className="mt-4 rounded-2xl border border-violet-300/15 bg-violet-400/10 p-4 text-sm font-bold leading-6 text-violet-50/86">
          Les lineups viennent de LeekDuck, mais les Pokémon affichés utilisent les fiches locales du dashboard.
        </p>
      </Panel>

      {loading && !totalTrainers ? (
        <Panel title="Chargement Rocket">
          <p className="font-bold text-slate-300">Lecture du JSON Rocket en cours.</p>
        </Panel>
      ) : null}

      {groups.map(([title, items, tone]) => (
        <section key={title} className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-cyan-100/62">rocket group</p>
              <h2 className="text-2xl font-black text-white">{title}</h2>
            </div>
            <span className="rounded-full border border-white/12 bg-white/[0.08] px-3 py-1.5 text-xs font-black text-white">
              {items.length}
            </span>
          </div>
          {items.length ? (
            <div className={`grid gap-4 ${tone === "grunt" ? "xl:grid-cols-2" : ""}`}>
              {items.map((profile, index) => (
                <TrainerCard key={`${profile.trainerSlug || profile.trainer}-${index}`} profile={profile} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-white/15 p-4 text-sm font-bold text-slate-400">
              Aucun profil Rocket dans cette section.
            </p>
          )}
        </section>
      ))}
    </div>
  );
}
