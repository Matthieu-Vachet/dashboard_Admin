"use client";

import { CloudUpload, Download, RefreshCcw, RotateCcw } from "lucide-react";
import { AssetStatCard, buttonClass, Panel, primaryButtonClass } from "./admin-ui";
import { uiAssets } from "../site/ui-assets";

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
  return typeIconMap[type] || typeIconMap[String(type || "").charAt(0).toUpperCase() + String(type || "").slice(1).toLowerCase()];
}

function pokemonName(pokemon) {
  return pokemon.names?.French || pokemon.names?.English || pokemon.sourceName || pokemon.id || "Pokemon";
}

function TypeIcons({ types }) {
  const list = values(types);
  if (!list.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-1.5" aria-label="Types Pokémon">
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
    </div>
  );
}

function StatusIcons({ pokemon }) {
  return (
    <div className="flex items-center gap-1.5">
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
    </div>
  );
}

function PokemonCard({ pokemon, onOpenPokemon }) {
  const name = pokemonName(pokemon);
  const canOpen = Boolean(onOpenPokemon && !pokemon.unmatched);

  return (
    <button
      type="button"
      onClick={() => canOpen && onOpenPokemon(pokemon)}
      disabled={!canOpen}
      className="group min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/34 text-left shadow-[0_16px_45px_rgba(0,0,0,.18)] transition enabled:hover:-translate-y-0.5 enabled:hover:border-cyan-200/35 enabled:hover:bg-cyan-400/8 disabled:cursor-default"
    >
      <div className="relative grid min-h-[126px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_20%,rgba(34,211,238,.18),transparent_44%),linear-gradient(135deg,rgba(15,23,42,.92),rgba(8,47,73,.66))] p-3">
        <div className="absolute left-3 top-3 z-10">
          <StatusIcons pokemon={pokemon} />
        </div>
        {pokemon.unmatched ? (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-red-200/30 bg-red-400/18 px-2 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-50">
            Non matché
          </span>
        ) : null}
        <img
          className="relative z-0 max-h-24 object-contain drop-shadow-[0_18px_32px_rgba(0,0,0,.42)] transition duration-300 group-hover:scale-105"
          src={pokemon.assets?.image || pokemon.assets?.shinyImage || uiAssets.icons.pokemon}
          alt={name}
          loading="lazy"
        />
      </div>
      <div className="space-y-2 border-t border-white/10 p-3">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-black text-white">{name}</h4>
          {pokemon.names?.English && pokemon.names.English !== name ? (
            <p className="truncate text-xs font-bold text-slate-400">{pokemon.names.English}</p>
          ) : null}
        </div>
        <div className="flex min-w-0 items-center justify-between gap-2">
          <TypeIcons types={pokemon.types} />
          {canOpen ? <span className="text-[10px] font-black uppercase tracking-[0.14em] text-cyan-100/60">Ouvrir</span> : null}
        </div>
      </div>
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
        <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
          {pokemon.map((item, index) => (
            <PokemonCard
              key={`${label}-${item.form || item.id || item.sourceName}-${index}`}
              pokemon={item}
              onOpenPokemon={onOpenPokemon}
            />
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

function TrainerCard({ profile, group, onOpenPokemon }) {
  const accent = profile.color?.primary || fallbackAccents[profile.trainerType] || fallbackAccents.grunt;
  const name = profile.trainer || "Rocket";
  const isGrunt = group === "grunt";

  return (
    <article
      className="min-w-0 overflow-hidden rounded-3xl border bg-slate-950/34 shadow-[0_20px_80px_rgba(0,0,0,.24)]"
      style={{
        borderColor: alpha(accent, 0.42),
        boxShadow: `0 20px 90px ${alpha(accent, 0.14)}`,
      }}
    >
      <div
        className="relative overflow-hidden p-4 sm:p-5"
        style={{
          background: `linear-gradient(135deg, ${alpha(accent, isGrunt ? 0.28 : 0.36)}, rgba(15,23,42,.78))`,
        }}
      >
        <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(rgba(255,255,255,.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span className={`${isGrunt ? "h-24 w-20" : "h-24 w-24"} grid shrink-0 place-items-end overflow-hidden rounded-3xl border border-white/18 bg-slate-950/35 p-1`}>
              <img className="max-h-full object-contain drop-shadow-[0_16px_28px_rgba(0,0,0,.4)]" src={trainerImage(profile)} alt={name} loading="lazy" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-white/62">
                {profile.trainerType || "rocket"}
              </p>
              <h3 className="truncate text-xl font-black text-white sm:text-2xl">{name}</h3>
              {profile.quote ? <p className="mt-1 line-clamp-3 text-sm font-bold text-white/72">{profile.quote}</p> : null}
            </div>
          </div>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            {profile.rocketType ? <TypeIcons types={[profile.rocketType]} /> : null}
            <span className="rounded-full border border-red-200/25 bg-red-400/16 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-red-50">
              Team Rocket
            </span>
          </div>
        </div>
      </div>
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
            <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {values(profile.rewards).map((pokemon, index) => (
                <button
                  key={`reward-${pokemon.form || pokemon.id || pokemon.sourceName}-${index}`}
                  type="button"
                  className="flex min-w-0 items-center gap-3 rounded-2xl border border-white/10 bg-slate-950/28 p-2 text-left transition hover:border-emerald-200/35 hover:bg-emerald-400/10"
                  onClick={() => onOpenPokemon?.(pokemon)}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-slate-950/55 p-1 ring-1 ring-white/10">
                    <img
                      className="max-h-full object-contain"
                      src={pokemon.assets?.image || pokemon.assets?.shinyImage || uiAssets.icons.pokemon}
                      alt={pokemonName(pokemon)}
                      loading="lazy"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black text-white">{pokemonName(pokemon)}</span>
                    <span className="mt-1 block">
                      <TypeIcons types={pokemon.types} />
                    </span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        ) : null}
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
  onOpenPokemon,
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
          <AssetStatCard label="Trainers" value={totalTrainers} icon={rocketTrainerAssets.maleGrunt} tone="violet" detail="Giovanni, leaders, grunts" />
          <AssetStatCard label="Giovanni" value={values(currentRocketList.giovanni).length} icon={rocketTrainerAssets.giovanni} tone="amber" detail="Boss actuel" />
          <AssetStatCard label="Leaders" value={groups.find(([title]) => title === "Leaders")?.[1]?.length || 0} icon={rocketTrainerAssets.sierra} tone="cyan" detail="Arlo, Cliff, Sierra" />
          <AssetStatCard label="Pokémon slots" value={totalEntries} icon="/ui/icons/shadow.png" tone="green" detail="Entrées Rocket" />
        </div>
        <p className="mt-4 rounded-2xl border border-violet-300/15 bg-violet-400/10 p-4 text-sm font-bold leading-6 text-violet-50/86">
          Les lineups viennent de LeekDuck, mais les Pokémon affichés utilisent les fiches locales du dashboard. Clique sur une card Pokémon pour ouvrir la fiche.
        </p>
      </Panel>

      {loading && !totalTrainers ? (
        <Panel title="Chargement Rocket">
          <p className="font-bold text-slate-300">Lecture du JSON Rocket en cours.</p>
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
                  key={`${profile.trainerSlug || profile.trainer}-${index}`}
                  profile={profile}
                  group={group}
                  onOpenPokemon={onOpenPokemon}
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
