"use client";

import Image from "next/image";
import { useState } from "react";

function AdventureImage({ src, portrait = false, name }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) return portrait
    ? <span className="text-3xl" role="img" aria-label={failed ? "Portrait indisponible" : "Portrait non publié"}>✨</span>
    : <div className="grid aspect-[512/130] w-full place-items-center bg-violet-500/15 type-overline text-foreground-secondary">{failed ? "Bannière indisponible" : "Asset bannière non publié"}</div>;
  return <Image src={src} alt={`${portrait ? "Portrait" : "Bannière"} ${name}`} width={portrait ? 256 : 512} height={portrait ? 256 : 130} unoptimized className={portrait ? "max-h-full w-auto object-contain" : "aspect-[512/130] h-auto w-full object-cover"} onError={() => setFailed(true)} />;
}

const itemLabels = {
  INCENSE: "Encens",
  DAILY_ADVENTURE_INCENSE: "Encens d’aventure quotidienne",
  STAR_PIECE: "Morceau d’Étoile",
  LUCKY_EGG: "Œuf Chance",
};

const combatLabels = {
  COMBAT_TYPE_RAID: "Raid",
  COMBAT_TYPE_DMAX: "Dynamax",
  COMBAT_TYPE_GMAX: "Gigamax",
};

function percentage(multiplier) {
  return `+${Math.round((Number(multiplier) - 1) * 100)} %`;
}

function durationLabel(seconds) {
  const minutes = Number(seconds) / 60;
  return Number.isInteger(minutes) ? `${minutes} min` : `${seconds} s`;
}

function effectRows(effect) {
  const value = effect.effect || {};
  if (effect.effectType === "ENCOUNTER_RANGE") return [["Portée Pokémon", `${value.pokemonVisibleRangeMeters} m`], ["Portée rencontre", `${value.encounterRangeMeters} m`], ["Portée serveur", `${value.serverAllowedEncounterRangeMeters} m`]];
  if (effect.effectType === "ITEM_TIME_PAUSE") return (value.items || []).map((item) => ["Temps suspendu", itemLabels[item] || item]);
  if (effect.effectType === "DAY_INCENSE" || effect.effectType === "NIGHT_INCENSE") return [["Bonus Encens", value.incenseBonus === "DAY" ? "Jour" : "Nuit"], ["Évolution", value.incenseBonus === "DAY" ? "Évolutions de jour pendant la nuit" : "Évolutions de nuit pendant le jour"]];
  if (effect.effectType === "ATTACK_BONUS" || effect.effectType === "DEFENSE_BONUS") return (value.attributes || []).flatMap((attribute) => (attribute.combatTypes || []).map((combatType) => [combatLabels[combatType] || combatType, attribute.attackMultiplier ? `${percentage(attribute.attackMultiplier)} Attaque` : `${percentage(attribute.defenseMultiplier)} Défense`]));
  if (effect.effectType === "MAX_MOVE_LEVEL") return [["Niveau des Capacités Max", `+${value.numAllMaxMoveLevelIncrease}`], ["Exclusions", (value.excludedPokedexIds || []).join(", ")]];
  if (effect.effectType === "CATCH_FREEZE" || effect.effectType === "CATCH_RING_SLOW") return [["Vitesse du cercle", `×${value.catchCircleTimeScaleOverride}`], ["Bonus capture", `×${value.catchRateIncreaseMultiplier}`], ["Seuil de vitesse", `×${value.catchCircleSpeedChangeThreshold}`], ["Échelle extérieure", `×${value.catchCircleOuterTimeScaleOverride}`]];
  if (effect.effectType === "MEGA_RAID_DAMAGE") return [["Dégâts en Méga-Raid", `×${value.megaRaidDamageMultiplier}`], ["Super Méga-Raid", `+${value.additionalSuperMegaRaidShieldsBroken} bouclier brisé`]];
  if (effect.effectType === "APPRAISAL_VISIBILITY") return [["Évaluation visible avant capture", (value.visibleAppraisalTiers || []).map((tier) => `${tier}★`).join(" · ")]];
  return [];
}

export function AdventureEffectCard({ effect, compact = false }) {
  if (!effect) return null;
  const french = effect.localization?.fr || {};
  const english = effect.localization?.en || {};
  const localized = { name: french.name || english.name || effect.moveRef, description: french.description || english.description || "Description non publiée.", fallback: !french.description && Boolean(english.description) };
  const rows = effectRows(effect);
  const source = (effect.sources || [])[0];
  return (
    <article className="overflow-hidden rounded-[1.7rem] border border-line bg-surface shadow-raised" data-adventure-effect={effect.id}>
      <AdventureImage key={effect.assets?.banner || "missing-banner"} src={effect.assets?.banner} name={localized.name} />
      <div className={compact ? "p-3" : "p-4 sm:p-5"}>
        <div className="flex items-start gap-4">
          <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl border border-line bg-surface-inset-subtle p-2">
            <AdventureImage key={effect.assets?.portrait || "missing-portrait"} src={effect.assets?.portrait} portrait name={localized.name} />
          </span>
          <span className="min-w-0 flex-1"><span className="type-overline text-foreground-secondary">✨ Effet d’aventure</span><strong className="mt-1 block text-xl font-black text-domain-foreground">{localized.name}</strong><span className="mt-1 block font-mono text-[11px] text-disabled">{effect.moveRef}</span>{localized.fallback ? <span className="mt-2 inline-flex rounded-full border border-amber-200/30 bg-amber-300/10 px-2 py-1 text-[10px] font-black text-foreground">Description EN · traduction FR non publiée</span> : null}</span>
        </div>
        <p className="mt-4 text-sm font-semibold leading-6 text-foreground">{localized.description}</p>
        <div className={`mt-4 grid gap-2 ${compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"}`}>
          {rows.map(([label, value], index) => <span className="rounded-2xl border border-line bg-surface-inset-subtle px-3 py-2" key={`${label}-${index}`}><small className="block type-overline-compact text-disabled">{label}</small><strong className="mt-1 block break-words text-domain-foreground">{value}</strong></span>)}
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <span className="rounded-2xl border border-line bg-surface-inset-subtle px-3 py-2"><small className="block type-overline-compact text-disabled">Bonbons</small><strong className="mt-1 block text-domain-foreground">{effect.cost?.candy?.amount} {effect.cost?.candy?.pokemonId}</strong></span>
          {effect.cost?.stardust !== undefined ? <span className="rounded-2xl border border-line bg-surface-inset-subtle px-3 py-2"><small className="block type-overline-compact text-disabled">Poussières</small><strong className="mt-1 block text-domain-foreground">{Number(effect.cost.stardust).toLocaleString("fr-FR")}</strong></span> : null}
          {effect.cost?.megaEnergy ? <span className="rounded-2xl border border-line bg-surface-inset-subtle px-3 py-2"><small className="block type-overline-compact text-disabled">Méga-Énergie {effect.cost.megaEnergy.megaEnergyType}</small><strong className="mt-1 block text-domain-foreground">{effect.cost.megaEnergy.amount} {effect.cost.megaEnergy.pokemonId}</strong></span> : null}
          <span className="rounded-2xl border border-line bg-surface-inset-subtle px-3 py-2"><small className="block type-overline-compact text-disabled">Durée</small><strong className="mt-1 block text-domain-foreground">{durationLabel(effect.duration?.durationSeconds)}</strong></span>
        </div>
        {!compact ? <details className="mt-4 rounded-2xl border border-line bg-surface-inset-subtle p-3 text-xs text-muted"><summary className="cursor-pointer font-black text-foreground">Source et fiabilité</summary><div className="mt-3 space-y-1"><p>{source?.source || "Source non renseignée"} · {source?.confidence || "-"}</p><p>Vérifié le {effect.metadata?.lastVerifiedAt ? new Date(effect.metadata.lastVerifiedAt).toLocaleDateString("fr-FR") : "-"}</p>{source?.sourceUrl ? <a className="break-all text-foreground-secondary underline" href={source.sourceUrl} target="_blank" rel="noreferrer">Voir la source</a> : null}<p>Raw structuré : {effect.bonusEffects?.status === "AVAILABLE" ? "disponible" : "non publié"}</p></div></details> : null}
      </div>
    </article>
  );
}
