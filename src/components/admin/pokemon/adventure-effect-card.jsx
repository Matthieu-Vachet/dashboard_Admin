"use client";

import Image from "next/image";
import {
  Clock3,
  Eye,
  Gauge,
  LocateFixed,
  Moon,
  PauseCircle,
  Shield,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { uiAssets } from "@/components/site/ui-assets";

function AdventureImage({ src, portrait = false, name }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return portrait
    ? <Sparkles aria-label={failed ? "Portrait indisponible" : "Portrait non publié"} className="text-violet-200" size={32} />
    : <div className="grid aspect-[512/130] w-full place-items-center bg-violet-500/15 type-overline text-foreground-secondary">{failed ? "Bannière indisponible" : "Asset bannière non publié"}</div>;
  return <Image src={src} alt={`${portrait ? "Portrait" : "Bannière"} ${name}`} width={portrait ? 256 : 512} height={portrait ? 256 : 130} unoptimized className={portrait ? "max-h-full w-auto object-contain" : "aspect-[512/130] h-auto w-full object-cover"} onError={() => setFailed(true)} />;
}

function MetricIcon({ icon }) {
  if (!icon) return null;
  if (typeof icon === "string") return <Image src={icon} alt="" aria-hidden="true" width={32} height={32} unoptimized className="h-8 w-8 object-contain" />;
  const Icon = icon;
  return <Icon aria-hidden="true" className="text-violet-200" size={24} strokeWidth={2.2} />;
}

function AdventureEffectMetric({ label, value, icon }) {
  return (
    <div className="flex min-h-20 min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface-inset-subtle px-3 py-3" data-adventure-effect-metric={label}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-violet-200/20 bg-violet-400/10">
        <MetricIcon icon={icon} />
      </span>
      <span className="min-w-0 flex-1">
        <small className="block type-overline-compact text-disabled">{label}</small>
        <strong className="mt-1 block break-words text-sm text-domain-foreground">{value}</strong>
      </span>
    </div>
  );
}

const itemLabels = {
  INCENSE: "Encens",
  DAILY_ADVENTURE_INCENSE: "Encens d’aventure quotidienne",
  STAR_PIECE: "Morceau d’Étoile",
  LUCKY_EGG: "Œuf Chance",
};

function percentage(multiplier) {
  return `+${Math.round((Number(multiplier) - 1) * 100)} %`;
}

function durationLabel(seconds) {
  const minutes = Number(seconds) / 60;
  return Number.isInteger(minutes) ? `${minutes} min` : `${seconds} s`;
}

function combatMetrics(attribute) {
  const combatTypes = attribute.combatTypes || [];
  const bonus = attribute.attackMultiplier
    ? `${percentage(attribute.attackMultiplier)} Attaque`
    : `${percentage(attribute.defenseMultiplier)} Défense`;
  return [
    ...(combatTypes.includes("COMBAT_TYPE_RAID") ? [{ label: "Raids", value: bonus, icon: uiAssets.icons.raid }] : []),
    ...(combatTypes.some((type) => ["COMBAT_TYPE_DMAX", "COMBAT_TYPE_GMAX"].includes(type)) ? [{ label: "Combats Max", value: bonus, icon: uiAssets.icons.collectionMax }] : []),
  ];
}

function effectMetrics(effect) {
  const value = effect.effect || {};
  if (effect.effectType === "ENCOUNTER_RANGE") return [
    { label: "Portée Pokémon", value: `${value.pokemonVisibleRangeMeters} m`, icon: LocateFixed },
    { label: "Portée rencontre", value: `${value.encounterRangeMeters} m`, icon: Gauge },
    { label: "Portée serveur", value: `${value.serverAllowedEncounterRangeMeters} m`, icon: Zap },
  ];
  if (effect.effectType === "ITEM_TIME_PAUSE") return (value.items || []).map((item) => ({ label: "Temps suspendu", value: itemLabels[item] || item, icon: PauseCircle }));
  if (effect.effectType === "DAY_INCENSE" || effect.effectType === "NIGHT_INCENSE") {
    const day = value.incenseBonus === "DAY";
    return [
      { label: "Bonus Encens", value: day ? "Jour" : "Nuit", icon: day ? Sun : Moon },
      { label: "Évolution", value: day ? "Évolutions de jour pendant la nuit" : "Évolutions de nuit pendant le jour", icon: Sparkles },
    ];
  }
  if (effect.effectType === "ATTACK_BONUS" || effect.effectType === "DEFENSE_BONUS") return (value.attributes || []).flatMap(combatMetrics);
  if (effect.effectType === "MAX_MOVE_LEVEL") return [{ label: "Niveau des Capacités Max", value: `+${value.numAllMaxMoveLevelIncrease}`, icon: uiAssets.icons.collectionMax }];
  if (effect.effectType === "CATCH_FREEZE" || effect.effectType === "CATCH_RING_SLOW") return [
    { label: "Vitesse du cercle", value: `×${value.catchCircleTimeScaleOverride}`, icon: Snowflake },
    { label: "Bonus capture", value: `×${value.catchRateIncreaseMultiplier}`, icon: uiAssets.icons.pokeball },
    { label: "Seuil de vitesse", value: `×${value.catchCircleSpeedChangeThreshold}`, icon: Gauge },
    { label: "Échelle extérieure", value: `×${value.catchCircleOuterTimeScaleOverride}`, icon: LocateFixed },
  ];
  if (effect.effectType === "MEGA_RAID_DAMAGE") return [
    { label: "Dégâts en Méga-Raid", value: `×${value.megaRaidDamageMultiplier}`, icon: uiAssets.icons.raid },
    { label: "Super Méga-Raid", value: `+${value.additionalSuperMegaRaidShieldsBroken} bouclier brisé`, icon: Shield },
  ];
  if (effect.effectType === "APPRAISAL_VISIBILITY") return [{ label: "Évaluation avant capture", value: (value.visibleAppraisalTiers || []).map((tier) => `${tier}★`).join(" · "), icon: Eye }];
  return [];
}

function ExclusionChips({ effect }) {
  const identifiers = effect.effect?.excludedPokedexIds || [];
  if (!identifiers.length) return null;
  const presentation = new Map((effect.excludedPokemon || []).map((pokemon) => [pokemon.pokemonId, pokemon]));
  return (
    <div className="mt-4">
      <span className="type-overline-compact text-disabled">Exclusions</span>
      <div className="mt-2 flex flex-wrap gap-2">
        {identifiers.map((identifier) => {
          const pokemon = presentation.get(identifier);
          return (
            <span className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface-inset-subtle px-3 py-1.5 type-caption-strong text-domain-foreground" key={identifier}>
              {pokemon?.image ? <Image src={pokemon.image} alt="" aria-hidden="true" width={32} height={32} unoptimized className="h-8 w-8 object-contain" /> : <Star aria-hidden="true" size={16} />}
              {pokemon?.name || identifier}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function AdventureEffectCard({ effect, compact = false }) {
  if (!effect) return null;
  const french = effect.localization?.fr || {};
  const english = effect.localization?.en || {};
  const localized = {
    name: french.name || english.name || effect.moveRef,
    description: french.description || english.description || "Description non publiée.",
    fallback: !french.description && Boolean(english.description),
  };
  const pokemon = effect.pokemon?.[0] || null;
  const pokemonName = pokemon?.name || pokemon?.names?.French || pokemon?.names?.English || null;
  const portrait = effect.assets?.portrait || pokemon?.image || null;
  const candy = pokemon?.candy?.image || uiAssets.icons.candy;
  const metrics = effectMetrics(effect);
  const costMetrics = [
    { label: "Bonbons", value: `${effect.cost?.candy?.amount} ${pokemonName || effect.cost?.candy?.pokemonId}`, icon: candy },
    ...(effect.cost?.stardust !== undefined ? [{ label: "Poussières", value: Number(effect.cost.stardust).toLocaleString("fr-FR"), icon: uiAssets.icons.stardust }] : []),
    ...(effect.cost?.megaEnergy ? [{ label: `Méga-Énergie ${effect.cost.megaEnergy.megaEnergyType}`, value: `${effect.cost.megaEnergy.amount} ${effect.cost.megaEnergy.pokemonId}`, icon: uiAssets.icons.megaEnergy }] : []),
    { label: "Durée", value: durationLabel(effect.duration?.durationSeconds), icon: Clock3 },
  ];
  return (
    <article className="flex h-full min-w-0 flex-col overflow-hidden rounded-[1.7rem] border border-line bg-surface shadow-raised" data-adventure-effect={effect.id}>
      <AdventureImage key={effect.assets?.banner || "missing-banner"} src={effect.assets?.banner} name={localized.name} />
      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4 sm:p-5"}`}>
        <div className="flex min-w-0 items-start gap-4">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-line bg-surface-inset-subtle p-2">
            <AdventureImage key={portrait || "missing-portrait"} src={portrait} portrait name={localized.name} />
          </span>
          <span className="min-w-0 flex-1">
            <span className="type-overline text-foreground-secondary">Effet d’aventure</span>
            <strong className="mt-1 block type-title-card text-domain-foreground">{localized.name}</strong>
            <span className="mt-1 block truncate font-mono text-[11px] text-disabled">{effect.moveRef}</span>
            {pokemon ? <span className="mt-2 inline-flex rounded-full border border-violet-200/25 bg-violet-300/10 px-2 py-1 text-[10px] font-black text-foreground">{pokemonName || pokemon.formId} · {pokemon.formId}</span> : null}
            {localized.fallback ? <span className="mt-2 inline-flex rounded-full border border-amber-200/30 bg-amber-300/10 px-2 py-1 text-[10px] font-black text-foreground">Description EN · traduction FR non publiée</span> : null}
          </span>
        </div>
        <p className="mt-4 type-body-strong text-foreground">{localized.description}</p>
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-2">
          {metrics.map((metric, index) => <AdventureEffectMetric {...metric} key={`${metric.label}-${index}`} />)}
        </div>
        <ExclusionChips effect={effect} />
        <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,11rem),1fr))] gap-2 border-t border-line pt-4">
          {costMetrics.map((metric) => <AdventureEffectMetric {...metric} key={metric.label} />)}
        </div>
      </div>
    </article>
  );
}
