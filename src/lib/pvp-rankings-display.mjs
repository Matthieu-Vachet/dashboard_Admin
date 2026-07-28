export const performanceRoles = [
  ["lead", "Ouverture"],
  ["switch", "Changement"],
  ["charger", "Chargeur"],
  ["closer", "Fermeur"],
  ["consistency", "Cohérence"],
  ["attacker", "Attaquant"],
];

export function performanceRadarData(scores = {}) {
  return performanceRoles.map(([id, label]) => ({ id, label, value: Number(scores[id] || 0), fullMark: 100 }));
}

export function moveCounts(fastMove, chargedMove) {
  const gain = Math.abs(Number(fastMove?.combat?.energy || fastMove?.energy || 0));
  const cost = Math.abs(Number(chargedMove?.combat?.energy || chargedMove?.energy || 0));
  if (!gain || !cost) return [];
  let previousTotal = 0;
  return Array.from({ length: 4 }, (_, index) => {
    const total = Math.ceil(((index + 1) * cost) / gain);
    const count = total - previousTotal;
    previousTotal = total;
    return count;
  });
}

export function buffLabels(buffs) {
  if (!buffs) return [];
  const labels = [];
  const rawChance = Number(buffs.activationChance ?? 100);
  const chance = rawChance <= 1 ? Math.round(rawChance * 100) : Math.round(rawChance);
  const fields = [
    ["attackerAttackStatsChange", "Attaque lanceur"],
    ["attackerDefenseStatsChange", "Défense lanceur"],
    ["targetAttackStatsChange", "Attaque cible"],
    ["targetDefenseStatsChange", "Défense cible"],
  ];
  for (const [field, label] of fields) {
    const stages = Number(buffs[field] || 0);
    if (stages) labels.push(`${label} ${stages > 0 ? "+" : ""}${stages}`);
  }
  if (labels.length) labels.push(`${chance} % de chance`);
  return labels;
}

export function checklistIdentity(entry) {
  return entry?.pokemon?.identity?.canonicalId || entry?.pokemonRef || entry?.sourceIdentity?.speciesId || `rank-${entry?.rank}`;
}

export function emptyChecklistState() {
  return { schemaVersion: 2, contexts: {}, legacyV1: { contexts: {} } };
}

function checklistContext(state, league) {
  const context = state?.contexts?.[league];
  return context?.builds ? context : { builds: {} };
}

export function checklistBuildsForEntry(state, league, entry) {
  const canonicalId = checklistIdentity(entry);
  return Object.values(checklistContext(state, league).builds)
    .filter((build) => build?.owned !== false && build?.canonicalId === canonicalId)
    .sort((left, right) => String(left.createdAt || "").localeCompare(String(right.createdAt || "")));
}

export function checklistBuildFromEntry(entry, league, options = {}) {
  const canonicalId = checklistIdentity(entry);
  const ivs = entry?.pvp?.ivs || { attack: 0, defense: 0, stamina: 0 };
  const stamp = options.now || new Date().toISOString();
  return {
    buildId: options.buildId || `${canonicalId}:rank1`,
    canonicalId,
    pokemonRef: entry?.pokemonRef || null,
    sourceSpeciesId: entry?.sourceIdentity?.speciesId || null,
    league,
    rank: Number(entry?.rank) || null,
    ivs: { attack: Number(ivs.attack), defense: Number(ivs.defense), stamina: Number(ivs.stamina) },
    level: Number(entry?.pvp?.level) || 1,
    cp: Number(entry?.pvp?.cp) || null,
    statProduct: Number(entry?.rank1?.statProduct ?? entry?.stats?.product) || null,
    shadow: entry?.variant === "shadow",
    moves: { fast: entry?.moveset?.fast || null, charged: (entry?.moveset?.charged || []).slice(0, 2) },
    shields: 1,
    startingEnergy: 0,
    startingHpPercent: 100,
    startingStages: { attack: 0, defense: 0 },
    owned: true,
    source: options.source || "rank-1",
    createdAt: stamp,
    updatedAt: stamp,
  };
}

export function addChecklistBuild(state, league, entry, options = {}) {
  const base = checklistBuildFromEntry(entry, league, options);
  const context = checklistContext(state, league);
  let buildId = base.buildId;
  if (context.builds[buildId] && options.allowDuplicate) {
    const suffix = options.suffix || String(Date.now());
    buildId = `${checklistIdentity(entry)}:custom:${suffix}`;
  }
  return {
    ...emptyChecklistState(),
    ...state,
    schemaVersion: 2,
    contexts: {
      ...(state?.contexts || {}),
      [league]: { ...context, builds: { ...context.builds, [buildId]: { ...base, buildId } } },
    },
  };
}

export function patchChecklistBuild(state, league, buildId, patch, now = new Date().toISOString()) {
  const context = checklistContext(state, league);
  const current = context.builds[buildId];
  if (!current) return state;
  return {
    ...state,
    contexts: {
      ...state.contexts,
      [league]: { ...context, builds: { ...context.builds, [buildId]: { ...current, ...patch, buildId, updatedAt: now } } },
    },
  };
}

export function removeChecklistBuild(state, league, buildId) {
  const context = checklistContext(state, league);
  const builds = { ...context.builds };
  delete builds[buildId];
  return { ...state, contexts: { ...state.contexts, [league]: { ...context, builds } } };
}

export function migrateChecklistState(stored, catalogue = [], league) {
  const v2 = stored?.schemaVersion === 2
    ? { ...emptyChecklistState(), ...stored, contexts: { ...(stored.contexts || {}) }, legacyV1: { contexts: { ...(stored.legacyV1?.contexts || {}) } } }
    : { ...emptyChecklistState(), legacyV1: { contexts: { ...(stored?.contexts || {}) } }, migratedFrom: stored ? 1 : null };
  const pending = { ...(v2.legacyV1.contexts?.[league] || {}) };
  if (!Object.keys(pending).length) return v2;
  let next = v2;
  for (const [canonicalId, owned] of Object.entries(pending)) {
    if (!owned) { delete pending[canonicalId]; continue; }
    const entry = catalogue.find((candidate) => checklistIdentity(candidate) === canonicalId);
    if (!entry) continue;
    next = addChecklistBuild(next, league, entry, { source: "migration-rank-1", buildId: `${canonicalId}:migrated-rank1` });
    delete pending[canonicalId];
  }
  return {
    ...next,
    legacyV1: { contexts: { ...next.legacyV1.contexts, [league]: pending } },
    migratedAt: next.migratedAt || new Date().toISOString(),
  };
}

function entryName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.sourceIdentity?.speciesName || entry?.sourceIdentity?.speciesId || "Pokémon";
}

function entryType(entry) {
  return String(entry?.pokemon?.types?.[0] || "NORMAL").toUpperCase();
}

export function filterChecklistEntries({ catalogue = [], owned = {}, query = "", filter = "all", sort = "rank" }) {
  const needle = query.trim().toLocaleLowerCase("fr");
  return catalogue.filter((entry) => {
    const id = checklistIdentity(entry);
    const checked = owned?.builds
      ? Object.values(owned.builds).some((build) => build?.owned !== false && build?.canonicalId === id)
      : Boolean(owned[id]);
    const haystack = `${entryName(entry)} ${entry.sourceIdentity?.speciesId || ""} ${(entry.pokemon?.types || []).join(" ")}`.toLocaleLowerCase("fr");
    return (!needle || haystack.includes(needle)) && (filter === "all" || (filter === "owned" ? checked : !checked));
  }).sort((left, right) => sort === "name"
    ? entryName(left).localeCompare(entryName(right), "fr")
    : sort === "type"
      ? entryType(left).localeCompare(entryType(right)) || left.rank - right.rank
      : left.rank - right.rank);
}

export function toggleChecklistEntry(state, league, entry) {
  const builds = checklistBuildsForEntry(state, league, entry);
  if (!builds.length) return addChecklistBuild(state, league, entry);
  return builds.reduce((next, build) => removeChecklistBuild(next, league, build.buildId), state);
}

export function filterGblPeriods(periods = [], { status = "all", tier = "all", cupQuery = "" } = {}) {
  const needle = cupQuery.trim().toLocaleLowerCase("fr");
  return periods
    .filter((period) => status === "all" || period.status === status)
    .map((period) => ({
      ...period,
      competitions: (period.competitions || []).filter((competition) => {
        const searchableCup = `${competition.cup || ""} ${competition.sourceName || ""}`.toLocaleLowerCase("fr");
        return (tier === "all" || competition.tier === tier) && (!needle || searchableCup.includes(needle));
      }),
    }))
    .filter((period) => (tier === "all" && !needle) || period.competitions.length);
}
