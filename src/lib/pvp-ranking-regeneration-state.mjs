const idleStatuses = new Set(["", "idle"]);
const runningStatuses = new Set(["pending", "queued", "accepted", "running", "processing"]);
const successStatuses = new Set(["completed", "complete", "success", "succeeded", "unchanged"]);
const partialStatuses = new Set(["partial", "warning", "completed-with-warnings"]);
const failedStatuses = new Set(["failed", "error"]);
const cancelledStatuses = new Set(["cancelled", "canceled"]);

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function candidates(value) {
  const output = [];
  const queue = [{ value, depth: 0 }];
  const visited = new Set();
  const nestedKeys = ["data", "run", "report", "result", "diagnostics", "sourceRun", "current"];
  while (queue.length) {
    const current = queue.shift();
    if (!isRecord(current?.value) || current.depth > 6 || visited.has(current.value)) continue;
    visited.add(current.value);
    output.push(current.value);
    for (const key of nestedKeys) {
      if (isRecord(current.value[key])) queue.push({ value: current.value[key], depth: current.depth + 1 });
    }
  }
  return output;
}

function warningKey(value) {
  if (typeof value === "string") return value.trim();
  if (!isRecord(value)) return String(value || "");
  return JSON.stringify(value);
}

function rawWarnings(records) {
  const seen = new Set();
  const output = [];
  for (const record of records) {
    if (!Array.isArray(record.warnings)) continue;
    for (const warning of record.warnings) {
      const key = warningKey(warning);
      if (!key || seen.has(key)) continue;
      seen.add(key);
      output.push(warning);
    }
  }
  return output;
}

function humanizeIdentifier(value) {
  return String(value || "")
    .replace(/[_-]+/g, " ")
    .replace(/\b\p{L}/gu, (letter) => letter.toLocaleUpperCase("fr"));
}

function structuredWarning(warning, index) {
  if (!isRecord(warning)) return null;
  const code = String(warning.code || warning.warningCode || warning.type || "PVP_GENERATION_WARNING").trim();
  const entity = String(
    warning.entity
      || warning.entityName
      || warning.speciesName
      || warning.speciesId
      || warning.sourceId
      || `Avertissement ${index + 1}`,
  ).trim();
  const reason = String(warning.reason || warning.message || warning.description || "Cause non détaillée par le provider.").trim();
  return {
    code,
    entity,
    reason,
    impact: String(warning.impact || "Le résultat est conservé, mais ce point doit être contrôlé dans le rapport de génération.").trim(),
    action: String(warning.action || warning.recommendedAction || "Contrôler le snapshot source avant la prochaine régénération.").trim(),
    informational: warning.informational === true || warning.affectsStatus === false,
    raw: warning,
  };
}

export function normalizePvpRankingWarning(warning, index = 0) {
  const structured = structuredWarning(warning, index);
  if (structured) return structured;

  const raw = String(warning || "").trim();
  const rankOne = raw.match(/^([^:]+):\s*([^:]+?)\s+sans Rank 1 calculable\.?$/i);
  if (rankOne) {
    const format = rankOne[1].trim();
    const speciesId = rankOne[2].trim();
    const exactVolcarona = format.toLowerCase() === "bayou-1500" && speciesId.toLowerCase() === "volcarona";
    return {
      code: "RANK1_INELIGIBLE_AT_SOURCE_LEVEL_FLOOR",
      entity: `${humanizeIdentifier(speciesId)} · ${format}`,
      reason: exactVolcarona
        ? "Le Game Master PvPoke fixe le niveau source minimal à 20 ; même avec 0/0/0 IV, Volcarona atteint 1 822 PC et dépasse la limite de 1 500 PC."
        : "Le niveau minimal imposé par la source ne permet aucune combinaison d’IV légale sous la limite de PC de ce format.",
      impact: "Le classement reste exploitable, mais aucun profil Rank 1, niveau, PC ou IV légal ne peut être publié pour cette entrée.",
      action: "Aucune action opérateur : conserver l’entrée source et attendre une évolution des règles ou du niveau minimal publié par PvPoke.",
      informational: false,
      raw,
    };
  }

  const missingMoves = raw.match(/^(\d+)\s+entr(?:e|é)e?s?\s+avec attaque non match(?:e|é)e?s?\s*:\s*(.+)\.?$/i);
  if (missingMoves) {
    const summary = missingMoves[2].replace(/\.$/, "").trim();
    const sentinelOnly = /^none\s*\(\d+\)$/i.test(summary);
    return {
      code: sentinelOnly ? "MOVE_UNMATCHED:none" : "MOVE_UNMATCHED",
      entity: sentinelOnly
        ? "Unown · great (Ligue Super · 1 500 PC)"
        : `${missingMoves[1]} entrée(s) PvPoke · ${summary}`,
      reason: sentinelOnly
        ? "La ligne PvPoke d’Unown contient la sentinelle « none » après Pouvoir Caché et Lutte pour signifier l’absence d’une seconde attaque chargée ; ce n’est pas un identifiant d’attaque."
        : `La source référence une ou plusieurs attaques sans correspondance dans le catalogue courant : ${summary}.`,
      impact: sentinelOnly
        ? "Aucun impact métier : Pouvoir Caché et Lutte sont bien conservés, aucune entrée n’est ignorée et aucun mapping Pokémon ne manque."
        : "Les classements sont conservés, mais les attaques concernées ne peuvent pas être enrichies avec leur contrat local.",
      action: sentinelOnly
        ? "Aucune action opérateur : cette sentinelle provider est informative et ne doit pas, seule, dégrader le statut."
        : "Vérifier le mapping d’attaque et le snapshot Game Master avant la prochaine régénération.",
      informational: sentinelOnly,
      raw,
    };
  }

  return {
    code: "PVP_GENERATION_WARNING",
    entity: `Avertissement ${index + 1}`,
    reason: raw || "Cause non détaillée par le provider.",
    impact: "Le résultat est conservé, mais ce point doit être contrôlé dans le rapport de génération.",
    action: "Contrôler le snapshot source avant la prochaine régénération.",
    informational: false,
    raw,
  };
}

export function normalizePvpRankingWarnings(warnings = []) {
  return (Array.isArray(warnings) ? warnings : []).map(normalizePvpRankingWarning);
}

function numericField(records, names) {
  for (const record of records) {
    for (const name of names) {
      const value = record[name];
      if (typeof value === "number" && Number.isFinite(value)) return value;
    }
  }
  return 0;
}

function firstError(records) {
  for (const record of records) {
    if (typeof record.error === "string" && record.error.trim()) return record.error;
    if (!Array.isArray(record.errors)) continue;
    const error = record.errors.find((entry) => typeof entry === "string" || isRecord(entry));
    if (typeof error === "string" && error.trim()) return error;
    if (isRecord(error) && typeof error.message === "string" && error.message.trim()) return error.message;
  }
  return "";
}

function normalizedStatus(records) {
  for (const record of records) {
    const status = String(record.status || "").trim().toLowerCase();
    if (status) return status;
  }
  return "";
}

export function createPvpRankingRegenerationState(status = "idle", overrides = {}) {
  return {
    status,
    generatedCount: 0,
    ignoredCount: 0,
    mappingMissingCount: 0,
    warningCount: 0,
    actionableWarningCount: 0,
    warningDetails: [],
    unchanged: false,
    message: "",
    reportAvailable: false,
    ...overrides,
  };
}

export function normalizePvpRankingRegeneration(value) {
  const records = candidates(value);
  const rawStatus = normalizedStatus(records);
  const warningDetails = normalizePvpRankingWarnings(rawWarnings(records));
  const mappingMissingCount = numericField(records, ["mappingMissingCount", "unmatchedCount", "itemsUnmatched"]);
  const warningCount = numericField(records, ["warningsCount", "warningCount"])
    || warningDetails.length;
  const actionableWarningCount = warningDetails.filter((warning) => !warning.informational).length
    + Math.max(0, warningCount - warningDetails.length);
  const generatedCount = numericField(records, ["totalAfter", "generatedCount", "count", "itemsParsed", "total"]);
  const ignoredCount = numericField(records, ["ignoredCount", "skippedCount", "skipped"]);
  const changedRecord = records.find((record) => typeof record.changed === "boolean");
  const diffRecord = records.find((record) => isRecord(record.diff) && typeof record.diff.changed === "boolean");
  const unchanged = rawStatus === "unchanged"
    || changedRecord?.changed === false
    || diffRecord?.diff?.changed === false;

  let status = "failed";
  if (idleStatuses.has(rawStatus)) status = "idle";
  else if (runningStatuses.has(rawStatus)) status = "running";
  else if (partialStatuses.has(rawStatus)) {
    status = mappingMissingCount > 0 || actionableWarningCount > 0 || warningCount === 0 ? "partial" : "success";
  }
  else if (failedStatuses.has(rawStatus)) status = "failed";
  else if (cancelledStatuses.has(rawStatus)) status = "cancelled";
  else if (successStatuses.has(rawStatus)) {
    status = mappingMissingCount > 0 || actionableWarningCount > 0 ? "partial" : "success";
  }

  return createPvpRankingRegenerationState(status, {
    generatedCount,
    ignoredCount,
    mappingMissingCount,
    warningCount,
    actionableWarningCount,
    warningDetails,
    unchanged,
    message: firstError(records),
    reportAvailable: ["success", "partial", "failed", "cancelled"].includes(status),
  });
}

function countLabel(value) {
  return Number(value || 0).toLocaleString("fr-FR");
}

export function pvpRankingRegenerationMessage(state) {
  if (state.status === "idle") return "Prêt — aucune régénération lancée dans cette vue.";
  if (state.status === "running") return "Génération et persistance MongoDB en cours…";
  if (state.status === "success") {
    return state.unchanged
      ? `Synchronisation complète — ${countLabel(state.generatedCount)} classements, aucun changement.`
      : `Synchronisation complète — ${countLabel(state.generatedCount)} classements générés.`;
  }
  if (state.status === "partial") {
    const informationalCount = Math.max(0, Number(state.warningCount || 0) - Number(state.actionableWarningCount ?? state.warningCount ?? 0));
    const warningBreakdown = informationalCount > 0
      ? ` (${countLabel(state.actionableWarningCount)} avec impact, ${countLabel(informationalCount)} informatif)`
      : "";
    return `Résultat partiel — ${countLabel(state.generatedCount)} générés, ${countLabel(state.ignoredCount)} ignorés, ${countLabel(state.mappingMissingCount)} MAPPING_MISSING, ${countLabel(state.warningCount)} WARNING${warningBreakdown}.`;
  }
  if (state.status === "cancelled") return state.message || "Régénération annulée avant sa fin.";
  return state.message || "La régénération PvP a échoué avant de produire un résultat exploitable.";
}

export function pvpRankingRegenerationToast(state) {
  const message = pvpRankingRegenerationMessage(state);
  if (state.status === "success") return { kind: "success", message };
  if (["partial", "cancelled"].includes(state.status)) return { kind: "warning", message };
  if (state.status === "failed") return { kind: "error", message };
  return null;
}
