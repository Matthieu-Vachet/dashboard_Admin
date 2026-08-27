export const UNMATCHED_REASON_CODES = Object.freeze([
  "NO_CANONICAL_MATCH",
  "AMBIGUOUS_MATCH",
  "SOURCE_ID_UNKNOWN",
  "FORM_MISMATCH",
  "VARIANT_MISMATCH",
  "NAME_MISMATCH",
  "MISSING_ALIAS",
]);

export const unmatchedReasonLabels = Object.freeze({
  NO_CANONICAL_MATCH: "Aucune correspondance canonique",
  AMBIGUOUS_MATCH: "Correspondance ambiguë",
  SOURCE_ID_UNKNOWN: "Identifiant source inconnu",
  FORM_MISMATCH: "Forme non concordante",
  VARIANT_MISMATCH: "Variante non concordante",
  NAME_MISMATCH: "Nom non concordant",
  MISSING_ALIAS: "Alias manquant",
});

const reasonCodeSet = new Set(UNMATCHED_REASON_CODES);
const terminalStatuses = new Set(["resolved", "ignored", "false-positive", "closed"]);

function firstDefined(...values) {
  return values.find((value) => value !== undefined && value !== null && value !== "");
}

function reasonCode(value, entry = {}) {
  const token = String(value || "").trim().toUpperCase().replace(/[^A-Z0-9]+/g, "_");
  if (reasonCodeSet.has(token)) return token;
  if (token.includes("AMBIG")) return "AMBIGUOUS_MATCH";
  if (token.includes("FORM")) return "FORM_MISMATCH";
  if (token.includes("VARIANT") || token.includes("COSTUME") || token.includes("ASSET")) return "VARIANT_MISMATCH";
  if (token.includes("NAME")) return "NAME_MISMATCH";
  if (token.includes("ALIAS")) return "MISSING_ALIAS";
  if (token.includes("SOURCE_ID") || token.includes("IDENTIFIER") || token === "ID_UNKNOWN") return "SOURCE_ID_UNKNOWN";
  if (!firstDefined(entry.sourceId, entry.rawId, entry.id) && !firstDefined(entry.sourceName, entry.rawName, entry.name)) return "SOURCE_ID_UNKNOWN";
  return "NO_CANONICAL_MATCH";
}

function confidence(entry, candidates) {
  const direct = Number(firstDefined(entry.confidence, entry.matchConfidence, entry.resolutionConfidence, entry.score));
  if (Number.isFinite(direct)) return Math.max(0, Math.min(1, direct));
  const scores = candidates.map((candidate) => Number(candidate?.confidence ?? candidate?.score)).filter(Number.isFinite);
  return scores.length ? Math.max(0, Math.min(1, Math.max(...scores))) : 0;
}

export function normalizeUnmatchedEntry(entry = {}, options = {}) {
  const sourceId = firstDefined(entry.sourceId, entry.rawId, entry.id, null);
  const name = firstDefined(entry.name, entry.sourceName, entry.rawName, entry.pokemonName, null);
  const sourceValue = firstDefined(entry.sourceValue, entry.rawAlias, entry.sourceAlias, entry.alias, entry.value, sourceId, name, null);
  const rawReason = firstDefined(entry.reason, entry.reasonCode, entry.mappingStatus, entry.status, "unknown");
  const candidates = Array.isArray(entry.candidates ?? entry.ambiguousCandidates)
    ? (entry.candidates ?? entry.ambiguousCandidates)
    : [];
  const rawStatus = String(firstDefined(entry.reportStatus, entry.diagnosticStatus, entry.status, "open")).trim().toLowerCase();

  return {
    ...entry,
    provider: firstDefined(entry.provider, options.provider, "Indisponible"),
    occurrenceId: firstDefined(entry.occurrenceId, entry.entryId) ?? null,
    sourceId,
    name,
    sourceValue,
    reason: reasonCode(rawReason, entry),
    reasonDetails: firstDefined(entry.reasonDetails, entry.detail, entry.message, rawReason, null),
    candidates,
    confidence: confidence(entry, candidates),
    destination: firstDefined(entry.destination, entry.eventualDestination, entry.canonicalId, entry.identityId, entry.localFile, null),
    status: terminalStatuses.has(rawStatus) ? rawStatus : "open",
    shiny: Boolean(firstDefined(entry.shiny, entry.isShiny, false)),
    shinyDetails: firstDefined(entry.shinyDetails) ?? null,
    dexNr: firstDefined(entry.dexNr, entry.pokemonId) ?? null,
    bucket: firstDefined(entry.bucket) ?? null,
    rank: firstDefined(entry.rank) ?? null,
  };
}

export function createUnmatchedEntriesReport(entries = [], options = {}) {
  const seen = new Set();
  const normalizedEntries = (Array.isArray(entries) ? entries : [])
    .map((entry) => normalizeUnmatchedEntry(entry, options))
    .filter((entry) => {
      const key = JSON.stringify([entry.occurrenceId, entry.provider, entry.sourceId, entry.name, entry.sourceValue, entry.sourceForm, entry.sourceCostume, entry.reason]);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  const expectedCount = Math.max(0, Number(options.expectedCount) || 0);
  const total = Math.max(expectedCount, normalizedEntries.length);
  return {
    schema: "UnmatchedEntriesReport@1",
    total,
    detailedCount: normalizedEntries.length,
    missingDetailCount: Math.max(total - normalizedEntries.length, 0),
    complete: total === normalizedEntries.length,
    entries: normalizedEntries,
  };
}
