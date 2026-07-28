import type { BattleFormMechanic } from "./types";

/**
 * Data-driven registry for battle-only form mechanics. The simulator consumes
 * the mechanic attached to a build and never branches on a species identifier.
 */
export const BATTLE_FORM_MECHANICS: Readonly<Record<string, BattleFormMechanic>> = Object.freeze({
  MIMIKYU_NORMAL: Object.freeze({
    id: "mimikyu-disguise",
    trigger: "first-unshielded-charged-damage",
    damageLimit: 1,
    defenseStageChange: -1,
    transformedFormId: "MIMIKYU_BUSTED",
    label: "Déguisement brisé",
  }),
});

export function getBattleFormMechanic(canonicalId: string) {
  return BATTLE_FORM_MECHANICS[canonicalId.toUpperCase()];
}
