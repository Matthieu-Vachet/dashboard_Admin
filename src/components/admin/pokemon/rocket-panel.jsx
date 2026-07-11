"use client";

import { useState } from "react";
import { ChevronDown, Download, RefreshCcw, RotateCcw } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { CurrentDatasetDiagnostics } from "./current-dataset-diagnostics";
import { uiAssets } from "@/components/site/ui-assets";

const rocketTrainerAssets = {
  arlo: "/ui/rocket/leader-arlo.webp",
  cliff: "/ui/rocket/leader-cliff.webp",
  giovanni: "/ui/rocket/boss-giovanni.webp",
  sierra: "/ui/rocket/leader-sierra.webp",
  maleGrunt: "/ui/rocket/male-grunt.webp",
  femaleGrunt: "/ui/rocket/female-grunt.webp",
};

const typeIconMap = {
  Normal: "/ui/Types/ico_0_normal.png",
  Fighting: "/ui/Types/ico_1_fighting.png",
  Flying: "/ui/Types/ico_2_flying.png",
  Poison: "/ui/Types/ico_3_poison.png",
  Ground: "/ui/Types/ico_4_ground.png",
  Rock: "/ui/Types/ico_5_rock.png",
  Bug: "/ui/Types/ico_6_bug.png",
  Ghost: "/ui/Types/ico_7_ghost.png",
  Steel: "/ui/Types/ico_8_steel.png",
  Fire: "/ui/Types/ico_9_fire.png",
  Water: "/ui/Types/ico_10_water.png",
  Grass: "/ui/Types/ico_11_grass.png",
  Electric: "/ui/Types/ico_12_electric.png",
  Psychic: "/ui/Types/ico_13_psychic.png",
  Ice: "/ui/Types/ico_14_ice.png",
  Dragon: "/ui/Types/ico_15_dragon.png",
  Dark: "/ui/Types/ico_16_dark.png",
  Fairy: "/ui/Types/ico_17_fairy.png",
};

const fallbackAccents = {
  giovanni: "#ef4444",
  leader: "#8b5cf6",
  grunt: "#06b6d4",
  other: "#10b981",
};

function values(data) {
  return Array.isArray(data) ? data : [];
}

function textKey(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
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

function rocketTextList(rocketTexts) {
  return values(rocketTexts?.data?.rocketTexts || rocketTexts?.rocketTexts);
}

function profileGender(profile) {
  const source = `${profile?.trainer || ""} ${profile?.trainerSlug || ""}`.toLowerCase();
  if (source.includes("female")) return "female";
  if (source.includes("male")) return "male";
  return null;
}

function profileCharacter(profile) {
  const source = `${profile?.trainer || ""} ${profile?.trainerSlug || ""}`.toLowerCase();
  if (source.includes("giovanni")) return "giovanni";
  if (source.includes("arlo")) return "arlo";
  if (source.includes("cliff")) return "cliff";
  if (source.includes("sierra")) return "sierra";
  return null;
}

function findRocketText(profile, texts) {
  const quoteKey = textKey(profile?.quote);
  if (quoteKey) {
    const byQuote = texts.find((entry) => {
      const variants = Object.values(entry.textVariants || {}).flatMap((items) => values(items));
      return [...Object.values(entry.texts || {}), ...variants].some((value) => textKey(value) === quoteKey);
    });
    if (byQuote) return byQuote;
  }

  const trainerType = String(profile?.trainerType || "").toLowerCase();
  const type = String(profile?.rocketType || "").toUpperCase();
  const gender = profileGender(profile);
  const character = profileCharacter(profile);
  return texts.find((entry) => {
    if (trainerType && String(entry.trainerType || "").toLowerCase() !== trainerType) return false;
    if (type && entry.type && String(entry.type).toUpperCase() !== type) return false;
    if (gender && entry.gender && entry.gender !== gender) return false;
    if (character && entry.character && entry.character !== character) return false;
    return true;
  }) || null;
}

function trainerGroups(currentRocketList) {
  const leaders = currentRocketList?.leaders || {};
  const others = Array.isArray(currentRocketList?.others)
    ? currentRocketList.others
    : Object.values(currentRocketList?.others || {}).flatMap(values);
  return [
    ["Giovanni", values(currentRocketList?.giovanni), "giovanni"],
    ["Leaders", Object.values(leaders).flatMap(values), "leader"],
    ["Grunts", values(currentRocketList?.grunts), "grunt"],
    ["Autres", others, "other"],
  ];
}

function totalPokemon(profiles) {
  return profiles.reduce(
    (total, profile) => total + Object.values(profile.slots || {}).reduce((slotTotal, slot) => slotTotal + values(slot).length, 0),
    0,
  );
}

function trainerImage(profile) {
  if (profile.assets?.trainerImage) return profile.assets.trainerImage;
  const trainer = String(profile.trainer || "").toLowerCase();
  if (trainer.includes("female")) return rocketTrainerAssets.femaleGrunt;
  if (trainer.includes("arlo")) return rocketTrainerAssets.arlo;
  if (trainer.includes("cliff")) return rocketTrainerAssets.cliff;
  if (trainer.includes("sierra")) return rocketTrainerAssets.sierra;
  if (trainer.includes("giovanni")) return rocketTrainerAssets.giovanni;
  return rocketTrainerAssets.maleGrunt;
}

function typeIcon(type) {
  const label = String(type || "");
  return typeIconMap[label] || typeIconMap[label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()];
}

function pokemonName(pokemon) {
  return pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon";
}

function TypeIcons({ types }) {
  const list = values(types);
  if (!list.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" aria-label="Types Pokémon">
      {list.map((type) => {
        const icon = typeIcon(type);
        return icon ? (
          <span key={type} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-slate-950/35 p-1.5" title={type}>
            <img className="h-full w-full object-contain" src={icon} alt={type} loading="lazy" />
          </span>
        ) : (
          <span key={type} className="grid h-8 w-8 place-items-center rounded-full border border-white/10 bg-white/10 text-[10px] font-black text-white" title={type}>
            {String(type).slice(0, 2).toUpperCase()}
          </span>
        );
      })}
    </span>
  );
}

function StatusIcons({ pokemon }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      {pokemon.shadow ? (
        <span className="grid h-8 w-8 place-items-center rounded-full border border-violet-200/20 bg-violet-400/16 p-1.5" title="Shadow">
          <img className="h-full w-full object-contain" src="/ui/icons/shadow.png" alt="Shadow" loading="lazy" />
        </span>
      ) : null}
      {pokemon.shiny ? (
        <span className="grid h-8 w-8 place-items-center rounded-full border border-amber-200/20 bg-amber-300/16 p-1.5" title="Shiny">
          <img className="h-full w-full object-contain" src="/ui/icons/ic_shiny_white.webp" alt="Shiny" loading="lazy" />
        </span>
      ) : null}
    </span>
  );
}

function PokemonCard({ pokemon, onOpenPokemon, compact = false }) {
  const name = pokemonName(pokemon);
  const canOpen = Boolean(onOpenPokemon && !pokemon.unmatched);

  return (
    <button
      type="button"
      onClick={() => canOpen && onOpenPokemon(pokemon)}
      disabled={!canOpen}
      className="group grid min-w-0 grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-2xl border border-white/10 bg-slate-950/34 p-3 text-left shadow-[0_14px_40px_rgba(0,0,0,.16)] transition enabled:hover:-translate-y-0.5 enabled:hover:border-cyan-200/35 enabled:hover:bg-cyan-400/8 disabled:cursor-default"
    >
      <span className="relative grid h-[72px] w-[72px] place-items-center rounded-2xl border border-white/10 bg-slate-950/48 p-2">
        <img
          className="max-h-full object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,.4)] transition duration-300 group-hover:scale-105"
          src={pokemon.assets?.image || pokemon.assets?.shinyImage || uiAssets.icons.pokemon}
          alt={name}
          loading="lazy"
        />
      </span>
      <span className="min-w-0 space-y-2">
        <span className="flex min-w-0 items-start justify-between gap-2">
          <span className="min-w-0">
            <strong className="block truncate text-sm font-black text-white">{name}</strong>
            {!compact && pokemon.names?.English && pokemon.names.English !== name ? (
              <span className="block truncate text-xs font-bold text-slate-400">{pokemon.names.English}</span>
            ) : null}
          </span>
          <StatusIcons pokemon={pokemon} />
        </span>
        <span className="flex min-w-0 items-center justify-between gap-2">
          <TypeIcons types={pokemon.types} />
          {canOpen ? <span className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100/60">Ouvrir</span> : null}
        </span>
      </span>
    </button>
  );
}

function SlotBlock({ label, pokemon, onOpenPokemon }) {
  return (
    <section className="min-w-0 rounded-2xl border border-white/10 bg-slate-950/24 p-3">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-xs font-black uppercase tracking-[0.18em] text-cyan-100/72">{label}</h4>
        <span className="rounded-full border border-white/10 bg-white/[0.07] px-2 py-1 text-[10px] font-black text-white">{pokemon.length}</span>
      </div>
      {pokemon.length ? (
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {pokemon.map((item, index) => (
            <PokemonCard key={`${label}-${item.form || item.id || item.sourceName}-${index}`} pokemon={item} onOpenPokemon={onOpenPokemon} />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/12 p-3 text-sm font-bold text-slate-400">
          Aucun Pokémon.
        </p>
      )}
    </section>
  );
}

function TrainerCard({ profile, group, rocketText, onOpenPokemon, defaultOpen = false }) {
  const [open, setOpen] = useState(Boolean(defaultOpen));
  const accent = profile.color?.primary || fallbackAccents[profile.trainerType] || fallbackAccents.grunt;
  const name = profile.trainer || "Rocket";
  const isGrunt = group === "grunt";
  const frQuote = rocketText?.texts?.French || profile.quote || "Phrase Rocket indisponible.";
  const englishQuote = rocketText?.texts?.English && rocketText.texts.English !== frQuote ? rocketText.texts.English : profile.quote;
  const pokemonCount = Object.values(profile.slots || {}).reduce((sum, slot) => sum + values(slot).length, 0);

  return (
    <details
      className="group min-w-0 overflow-hidden rounded-3xl border bg-slate-950/34 shadow-[0_20px_80px_rgba(0,0,0,.24)]"
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
      style={{
        borderColor: alpha(accent, 0.42),
        boxShadow: `0 20px 90px ${alpha(accent, 0.14)}`,
      }}
    >
      <summary
        className="relative grid cursor-pointer list-none gap-4 overflow-hidden p-4 marker:hidden sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-5"
        style={{
          background: `linear-gradient(135deg, ${alpha(accent, isGrunt ? 0.28 : 0.36)}, rgba(15,23,42,.78))`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        <span className="relative flex min-w-0 items-center gap-4">
          <span className={`${isGrunt ? "h-24 w-20" : "h-24 w-24"} grid shrink-0 place-items-end overflow-hidden rounded-3xl border border-white/18 bg-slate-950/35 p-1`}>
            <img className="max-h-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.4)]" src={trainerImage(profile)} alt={name} loading="lazy" />
          </span>
          <span className="min-w-0">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-white/62">
              {profile.trainerType || "rocket"}
            </span>
            <span className="block truncate text-xl font-black text-white sm:text-2xl">{name}</span>
            <span className="mt-1 line-clamp-2 text-sm font-bold text-white/78">{frQuote}</span>
            {englishQuote && englishQuote !== frQuote ? <span className="mt-1 block line-clamp-1 text-xs font-bold text-white/45">{englishQuote}</span> : null}
          </span>
        </span>
        <span className="relative flex flex-wrap items-center gap-2 sm:justify-end">
          {profile.rocketType ? <TypeIcons types={[profile.rocketType]} /> : null}
          <span className="rounded-full border border-red-200/25 bg-red-400/16 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-red-50">
            {pokemonCount} Pokémon
          </span>
          <ChevronDown className="text-white/70 transition group-open:rotate-180" size={22} />
        </span>
      </summary>
      <div className="space-y-4 p-4 sm:p-5">
        <div className="grid gap-4">
          <SlotBlock label="Slot 1" pokemon={values(profile.slots?.slot1)} onOpenPokemon={onOpenPokemon} />
          <SlotBlock label="Slot 2" pokemon={values(profile.slots?.slot2)} onOpenPokemon={onOpenPokemon} />
          <SlotBlock label="Slot 3" pokemon={values(profile.slots?.slot3)} onOpenPokemon={onOpenPokemon} />
        </div>
        {values(profile.rewards).length ? (
          <section className="rounded-2xl border border-emerald-200/18 bg-emerald-400/8 p-3">
            <div className="mb-3 flex items-center justify-between gap-2">
              <h4 className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100/75">Récompenses possibles</h4>
              <span className="rounded-full bg-emerald-300/14 px-2 py-1 text-[10px] font-black text-emerald-50">
                {values(profile.rewards).length}
              </span>
            </div>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {values(profile.rewards).map((pokemon, index) => (
                <PokemonCard
                  key={`reward-${pokemon.form || pokemon.id || pokemon.sourceName}-${index}`}
                  pokemon={pokemon}
                  onOpenPokemon={onOpenPokemon}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </details>
  );
}

export function RocketPanel({
  rocket,
  rocketTexts,
  loading = false,
  regenerating = false,
  refreshError = "",
  onRefresh,
  onDownload,
  onRegenerate,
  onOpenPokemon,
}) {
  const currentRocketList = rocket?.data?.currentRocketList || rocket?.currentRocketList || {};
  const texts = rocketTextList(rocketTexts);
  const groups = trainerGroups(currentRocketList);
  const profiles = groups.flatMap(([, items]) => items);
  const totalTrainers = profiles.length;
  const totalEntries = totalPokemon(profiles);
  const translatedProfiles = profiles.filter((profile) => findRocketText(profile, texts)).length;

  return (
    <div className="space-y-5">
      <Panel
        title="Team GO Rocket"
        eyebrow="MongoDB + LeekDuck"
        action={
          <div className="flex flex-wrap gap-2">
            <button className={buttonClass} type="button" onClick={onRefresh} disabled={loading || regenerating}>
              <RefreshCcw size={17} /> {loading ? "Chargement..." : "Actualiser"}
            </button>
            <button className={buttonClass} type="button" onClick={onDownload} disabled={!rocket?.current || !totalTrainers || loading || regenerating}>
              <Download size={17} /> Télécharger JSON
            </button>
            <button className={primaryButtonClass} type="button" onClick={onRegenerate} disabled={loading || regenerating}>
              <RotateCcw size={17} /> {regenerating ? "Régénération..." : "Régénérer Rocket"}
            </button>
          </div>
        }
      >
        <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AssetStatCard label="Trainers" value={totalTrainers} icon={rocketTrainerAssets.maleGrunt} tone="violet" detail="Giovanni, leaders, grunts" />
          <AssetStatCard label="Textes FR" value={translatedProfiles} icon="/ui/icons/radar.png" tone="cyan" detail={`${texts.length} références`} />
          <AssetStatCard label="Leaders" value={groups.find(([title]) => title === "Leaders")?.[1]?.length || 0} icon={rocketTrainerAssets.sierra} tone="amber" detail="Arlo, Cliff, Sierra" />
          <AssetStatCard label="Pokémon slots" value={totalEntries} icon="/ui/icons/shadow.png" tone="green" detail="Entrées Rocket" />
        </div>
        <CurrentDatasetDiagnostics dataset={rocket} total={totalTrainers} refreshError={refreshError} />
      </Panel>

      {loading && !totalTrainers ? (
        <Panel title="Chargement Rocket">
          <p className="font-bold text-slate-300">Lecture des lineups MongoDB en cours.</p>
        </Panel>
      ) : null}

      {groups.map(([title, items, group]) => (
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
            <div className={`grid gap-5 ${group === "grunt" ? "2xl:grid-cols-2" : ""}`}>
              {items.map((profile, index) => (
                <TrainerCard
                  key={`${profile.trainerSlug || profile.trainer}-${textKey(profile.quote) || index}`}
                  profile={profile}
                  group={group}
                  rocketText={findRocketText(profile, texts)}
                  onOpenPokemon={onOpenPokemon}
                  defaultOpen={group !== "grunt" && index === 0}
                />
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
