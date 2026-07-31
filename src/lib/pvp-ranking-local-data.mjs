function finiteNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
}

export function findLocalPokemonForRanking(entry, localEntries = []) {
  const references = new Set([
    entry?.pokemonRef,
    entry?.pokemon?.formId,
    entry?.pokemon?.id,
  ].filter(Boolean).map(String));
  return localEntries.find((candidate) => [candidate?.key, candidate?.formId, candidate?.id]
    .filter(Boolean)
    .some((value) => references.has(String(value)))) || null;
}

export function enrichPvpRankingWithLocalData(entry, localEntries = []) {
  const local = findLocalPokemonForRanking(entry, localEntries);
  if (!local) return entry;
  const sourceCost = local.secondChargeMoveCost || local.sourceData?.secondChargeMoveCost;
  const sourceCandy = local.assets?.candy || local.sourceData?.assets?.candy;
  const sourceBuddyDistance = local.buddyDistance ?? local.sourceData?.buddyDistance;
  const hasCost = sourceCost && typeof sourceCost === "object";
  return {
    ...entry,
    pokemon: {
      ...(entry.pokemon || {}),
      assets: {
        ...(entry.pokemon?.assets || {}),
        ...(sourceCandy ? { candy: sourceCandy } : {}),
      },
    },
    pvp: {
      ...(entry.pvp || {}),
      buddyDistanceKm: sourceBuddyDistance == null
        ? entry.pvp?.buddyDistanceKm ?? null
        : finiteNumberOrNull(sourceBuddyDistance),
      candyFamilyId: sourceCandy?.familyId == null
        ? entry.pvp?.candyFamilyId ?? null
        : finiteNumberOrNull(sourceCandy.familyId),
      secondChargedMoveCost: hasCost
        ? {
            candy: finiteNumberOrNull(sourceCost.candy),
            stardust: finiteNumberOrNull(sourceCost.stardust),
          }
        : entry.pvp?.secondChargedMoveCost || { candy: null, stardust: null },
      localDataProvenance: {
        ...(entry.pvp?.localDataProvenance || {}),
        ...(sourceBuddyDistance == null ? {} : { buddyDistance: "pokemon.sourceData.buddyDistance" }),
        ...(sourceCandy?.familyId == null ? {} : { candyFamily: "pokemon.sourceData.assets.candy.familyId" }),
        ...(hasCost ? { secondChargedMoveCost: "pokemon.sourceData.secondChargeMoveCost" } : {}),
      },
    },
  };
}

export function normalizeSuggestedTeammate(item = {}) {
  const pokemon = item?.pokemon && typeof item.pokemon === "object" ? item.pokemon : {};
  const rawName = typeof item.rawName === "string"
    ? item.rawName
    : typeof item.providerAlias === "string"
      ? item.providerAlias
      : null;
  const label = pokemon.names?.French || pokemon.names?.English || rawName || "Pokémon non résolu";
  return { ...item, pokemon, rawName, label };
}

export function pvpTeammatesErrorMessage(payload, fallback = "Suggested Teammates indisponibles.") {
  const error = payload?.error;
  if (typeof error === "string" && error.trim() && error !== "[object Object]") return error;
  if (error && typeof error === "object") {
    for (const value of [error.message, error.code]) {
      if (typeof value === "string" && value.trim() && value !== "[object Object]") return value;
    }
  }
  return fallback;
}
