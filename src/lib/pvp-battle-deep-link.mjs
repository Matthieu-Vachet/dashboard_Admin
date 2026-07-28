export function encodePvpBattle(value) {
  const bytes = new TextEncoder().encode(JSON.stringify(value));
  return btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join(""));
}

export function decodePvpBattle(value) {
  const bytes = Uint8Array.from(atob(value), (character) => character.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}

export function pvpBattleUrl(configuration, base = "/pokemon-admin") {
  const url = new URL(base, typeof window === "undefined" ? "https://dashboard.local" : window.location.origin);
  url.searchParams.set("section", "pvp-simulator");
  url.searchParams.set("pvpBattle", encodePvpBattle(configuration));
  return typeof window === "undefined" ? `${url.pathname}${url.search}` : url.toString();
}

export function fighterFromRanking(entry, presetLabel = "Rank 1") {
  const canonicalId = entry?.pokemon?.identity?.canonicalId || entry?.pokemonRef || null;
  const ivs = entry?.pvp?.ivs;
  const level = Number(entry?.pvp?.level);
  if (!canonicalId || !ivs || !Number.isFinite(level) || !entry?.moveset?.fast || !entry?.moveset?.charged?.length) return null;
  return {
    canonicalId,
    level,
    ivs: {
      attack: Number(ivs.attack),
      defense: Number(ivs.defense),
      stamina: Number(ivs.stamina),
    },
    shadow: entry?.variant === "shadow",
    fastMoveId: entry.moveset.fast,
    chargedMoveIds: entry.moveset.charged.slice(0, 2),
    shields: 1,
    startingEnergy: 0,
    startingHpPercent: 100,
    startingStages: { attack: 0, defense: 0 },
    presetLabel,
  };
}

export function fighterFromChecklistBuild(build) {
  if (!build?.canonicalId || !build?.ivs || !Number.isFinite(Number(build.level))) return null;
  return {
    canonicalId: build.canonicalId,
    level: Number(build.level),
    ivs: {
      attack: Number(build.ivs.attack),
      defense: Number(build.ivs.defense),
      stamina: Number(build.ivs.stamina),
    },
    shadow: Boolean(build.shadow),
    fastMoveId: build.moves?.fast || "",
    chargedMoveIds: (build.moves?.charged || []).slice(0, 2),
    shields: Number.isInteger(build.shields) ? build.shields : 1,
    startingEnergy: Number.isInteger(build.startingEnergy) ? build.startingEnergy : 0,
    startingHpPercent: Number(build.startingHpPercent) || 100,
    startingStages: build.startingStages || { attack: 0, defense: 0 },
    presetLabel: "Mes IV",
  };
}
