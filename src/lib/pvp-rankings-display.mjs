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

function entryName(entry) {
  return entry?.pokemon?.names?.French || entry?.pokemon?.names?.English || entry?.sourceIdentity?.speciesName || entry?.sourceIdentity?.speciesId || "Pokémon";
}

function entryType(entry) {
  return String(entry?.pokemon?.types?.[0] || "NORMAL").toUpperCase();
}

export function filterChecklistEntries({ catalogue = [], owned = {}, query = "", filter = "all", sort = "rank" }) {
  const needle = query.trim().toLocaleLowerCase("fr");
  return catalogue.filter((entry) => {
    const checked = Boolean(owned[checklistIdentity(entry)]);
    const haystack = `${entryName(entry)} ${entry.sourceIdentity?.speciesId || ""} ${(entry.pokemon?.types || []).join(" ")}`.toLocaleLowerCase("fr");
    return (!needle || haystack.includes(needle)) && (filter === "all" || (filter === "owned" ? checked : !checked));
  }).sort((left, right) => sort === "name"
    ? entryName(left).localeCompare(entryName(right), "fr")
    : sort === "type"
      ? entryType(left).localeCompare(entryType(right)) || left.rank - right.rank
      : left.rank - right.rank);
}

export function toggleChecklistEntry(state, league, entry) {
  const id = checklistIdentity(entry);
  const owned = state?.contexts?.[league] || {};
  const contexts = { ...(state?.contexts || {}), [league]: { ...owned, [id]: !owned[id] } };
  if (!contexts[league][id]) delete contexts[league][id];
  return { schemaVersion: 1, contexts };
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
