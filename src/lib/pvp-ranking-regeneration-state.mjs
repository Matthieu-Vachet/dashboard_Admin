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
  let current = value;
  for (let depth = 0; depth < 6 && isRecord(current); depth += 1) {
    output.push(current);
    current = current.data;
  }
  return output;
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
    unchanged: false,
    message: "",
    reportAvailable: false,
    ...overrides,
  };
}

export function normalizePvpRankingRegeneration(value) {
  const records = candidates(value);
  const rawStatus = normalizedStatus(records);
  const mappingMissingCount = numericField(records, ["mappingMissingCount", "unmatchedCount", "itemsUnmatched"]);
  const warningCount = numericField(records, ["warningsCount", "warningCount"])
    || records.reduce((count, record) => Math.max(count, Array.isArray(record.warnings) ? record.warnings.length : 0), 0);
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
  else if (partialStatuses.has(rawStatus)) status = "partial";
  else if (failedStatuses.has(rawStatus)) status = "failed";
  else if (cancelledStatuses.has(rawStatus)) status = "cancelled";
  else if (successStatuses.has(rawStatus)) {
    status = mappingMissingCount > 0 || warningCount > 0 ? "partial" : "success";
  }

  return createPvpRankingRegenerationState(status, {
    generatedCount,
    ignoredCount,
    mappingMissingCount,
    warningCount,
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
    return `Résultat partiel — ${countLabel(state.generatedCount)} générés, ${countLabel(state.ignoredCount)} ignorés, ${countLabel(state.mappingMissingCount)} MAPPING_MISSING, ${countLabel(state.warningCount)} WARNING.`;
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
