export type SourceMonitoringState = "up-to-date" | "changed" | "error" | "never-checked";

export type SourceWatchInput = Record<string, unknown>;

export type SourceWatchRecord = {
  sourceId: string;
  name: string;
  provider: string | null;
  category: string | null;
  currentSignature: string | null;
  previousSignature: string | null;
  currentVersion: string | null;
  previousVersion: string | null;
  currentCommit: string | null;
  previousCommit: string | null;
  currentContentHash: string | null;
  previousContentHash: string | null;
  currentSnapshot: Record<string, unknown> | null;
  previousSnapshot: Record<string, unknown> | null;
  readableDiff: string[];
  lastCheckedAt: string | null;
  lastChangedAt: string | null;
  lastAcknowledgedAt: string | null;
  lastCheckStatus: "ok" | "error" | "never-checked";
  lastError: string | null;
  changeType: string | null;
  unreadChange: boolean;
};

export type SourceWatchPersistentState = {
  schemaVersion: 1;
  updatedAt: string | null;
  sources: Record<string, SourceWatchRecord>;
};

export type SourceWatchChangeEvent = SourceWatchInput & {
  id: string;
  checkedAt: string;
  sourceId: string;
  signature: string;
  previousSignature: string;
  previousVersion: string | null;
  changeType: string;
};

export type SourceWatchSummary = {
  unreadCount: number;
  errorCount: number;
  sourceCount: number;
  lastCheckedAt: string | null;
  changedSources: Array<{
    id: string;
    name: string;
    lastChangedAt: string | null;
    changeType: string | null;
  }>;
};

export const emptySourceWatchState = (): SourceWatchPersistentState => ({
  schemaVersion: 1,
  updatedAt: null,
  sources: {},
});

function stringValue(value: unknown) {
  const normalized = String(value || "").trim();
  return normalized || null;
}

function validDate(value: unknown) {
  const normalized = stringValue(value);
  if (!normalized) return null;
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

export function sourceWatchId(source: SourceWatchInput) {
  return String(source.id || source.name || source.repo || source.url || "").trim();
}

export function sourceContentSignature(source: SourceWatchInput) {
  if (String(source.status || "").toLowerCase() !== "ok") return null;
  const canonical = stringValue(source.signature);
  if (canonical) return canonical;

  const fallback = [source.commit, source.contentHash, source.version, source.updatedAt]
    .map(stringValue)
    .filter(Boolean)
    .join(":");
  return fallback || null;
}

function isSuccessfulCheck(source: SourceWatchInput) {
  return String(source.status || "").toLowerCase() === "ok";
}

function sourceError(source: SourceWatchInput) {
  return stringValue(source.message) || `Contrôle distant en erreur (${String(source.status || "statut inconnu")}).`;
}

function deriveChangeType(previous: SourceWatchRecord, source: SourceWatchInput) {
  const commit = stringValue(source.commit);
  const contentHash = stringValue(source.contentHash);
  const type = String(source.type || "").toLowerCase();

  if (String(source.category || "").startsWith("adventure-effects")) return "Adventure Effects — changement détecté";

  if (commit && contentHash && (commit !== previous.currentCommit || contentHash !== previous.currentContentHash)) {
    return "Commit et contenu JSON";
  }
  if (commit && commit !== previous.currentCommit) return "Nouveau commit";
  if (contentHash && contentHash !== previous.currentContentHash) return "Contenu JSON";
  if (type === "website") return "ETag ou Last-Modified";
  return "Empreinte distante";
}

function comparableSnapshot(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : null;
}

function displayValue(value: unknown) {
  if (value === undefined) return "absent";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function flattenSnapshot(value: unknown, prefix = "", output = new Map<string, unknown>()) {
  if (value && typeof value === "object") {
    const entries = Array.isArray(value)
      ? value.map((entry, index) => [String(index), entry] as const)
      : Object.entries(value as Record<string, unknown>);
    for (const [key, entry] of entries) flattenSnapshot(entry, prefix ? `${prefix}.${key}` : key, output);
  } else {
    output.set(prefix, value);
  }
  return output;
}

export function adventureEffectSemanticDiff(previousValue: unknown, currentValue: unknown) {
  const previous = comparableSnapshot(previousValue);
  const current = comparableSnapshot(currentValue);
  if (!previous || !current) return [];
  const before = flattenSnapshot(previous);
  const after = flattenSnapshot(current);
  const paths = [...new Set([...before.keys(), ...after.keys()])].sort();
  return paths.flatMap((path) => {
    const left = before.get(path);
    const right = after.get(path);
    if (JSON.stringify(left) === JSON.stringify(right)) return [];
    const effectId = path.match(/^effects\.([^.]+)/)?.[1] || "Adventure Effects";
    const effect = comparableSnapshot((current.effects as Record<string, unknown> | undefined)?.[effectId])
      || comparableSnapshot((previous.effects as Record<string, unknown> | undefined)?.[effectId]);
    const label = stringValue(effect?.label) || effectId;
    const field = path.replace(/^effects\.[^.]+\.?/, "") || "fiche";
    return [`${label} · ${field} · ${displayValue(left)} → ${displayValue(right)}`];
  });
}

function baseRecord(sourceId: string, source: SourceWatchInput): SourceWatchRecord {
  return {
    sourceId,
    name: stringValue(source.name) || stringValue(source.repo) || stringValue(source.url) || sourceId,
    provider: stringValue(source.provider),
    category: stringValue(source.category) || stringValue(source.type),
    currentSignature: null,
    previousSignature: null,
    currentVersion: null,
    previousVersion: null,
    currentCommit: null,
    previousCommit: null,
    currentContentHash: null,
    previousContentHash: null,
    currentSnapshot: null,
    previousSnapshot: null,
    readableDiff: [],
    lastCheckedAt: null,
    lastChangedAt: null,
    lastAcknowledgedAt: null,
    lastCheckStatus: "never-checked",
    lastError: null,
    changeType: null,
    unreadChange: false,
  };
}

function normalizeRecord(sourceId: string, value: unknown): SourceWatchRecord {
  const record = value && typeof value === "object" ? value as Partial<SourceWatchRecord> : {};
  return {
    ...baseRecord(sourceId, { name: record.name || sourceId }),
    ...record,
    sourceId,
    name: stringValue(record.name) || sourceId,
    currentSignature: stringValue(record.currentSignature),
    previousSignature: stringValue(record.previousSignature),
    currentVersion: stringValue(record.currentVersion),
    previousVersion: stringValue(record.previousVersion),
    currentCommit: stringValue(record.currentCommit),
    previousCommit: stringValue(record.previousCommit),
    currentContentHash: stringValue(record.currentContentHash),
    previousContentHash: stringValue(record.previousContentHash),
    currentSnapshot: comparableSnapshot(record.currentSnapshot),
    previousSnapshot: comparableSnapshot(record.previousSnapshot),
    readableDiff: Array.isArray(record.readableDiff) ? record.readableDiff.map(String).slice(0, 100) : [],
    lastCheckedAt: validDate(record.lastCheckedAt),
    lastChangedAt: validDate(record.lastChangedAt),
    lastAcknowledgedAt: validDate(record.lastAcknowledgedAt),
    lastCheckStatus: ["ok", "error", "never-checked"].includes(String(record.lastCheckStatus))
      ? record.lastCheckStatus as SourceWatchRecord["lastCheckStatus"]
      : "never-checked",
    lastError: stringValue(record.lastError),
    changeType: stringValue(record.changeType),
    unreadChange: record.unreadChange === true,
  };
}

export function normalizeSourceWatchState(value: unknown): SourceWatchPersistentState {
  if (!value || typeof value !== "object") return emptySourceWatchState();
  const candidate = value as Partial<SourceWatchPersistentState>;
  const records = candidate.sources && typeof candidate.sources === "object" ? candidate.sources : {};
  return {
    schemaVersion: 1,
    updatedAt: validDate(candidate.updatedAt),
    sources: Object.fromEntries(
      Object.entries(records).map(([sourceId, record]) => [sourceId, normalizeRecord(sourceId, record)]),
    ),
  };
}

export function sourceMonitoringState(record: SourceWatchRecord | undefined): SourceMonitoringState {
  if (!record || record.lastCheckStatus === "never-checked") return "never-checked";
  if (record.lastCheckStatus === "error") return "error";
  if (record.unreadChange) return "changed";
  return "up-to-date";
}

function publicSource(source: SourceWatchInput, record: SourceWatchRecord) {
  return {
    ...source,
    checkedAt: record.lastCheckedAt,
    currentSignature: record.currentSignature,
    previousSignature: record.previousSignature,
    currentVersion: record.currentVersion,
    previousVersion: record.previousVersion,
    lastChangedAt: record.lastChangedAt,
    lastAcknowledgedAt: record.lastAcknowledgedAt,
    monitoringState: sourceMonitoringState(record),
    changeType: record.changeType,
    readableDiff: record.readableDiff,
    unreadChange: record.unreadChange,
    changedSinceLastCheck: record.unreadChange,
  };
}

export function sourceWatchSummary(stateValue: unknown): SourceWatchSummary {
  const state = normalizeSourceWatchState(stateValue);
  const records = Object.values(state.sources);
  const changedSources = records
    .filter((record) => record.unreadChange)
    .sort((left, right) => String(right.lastChangedAt || "").localeCompare(String(left.lastChangedAt || "")))
    .map((record) => ({
      id: record.sourceId,
      name: record.name,
      lastChangedAt: record.lastChangedAt,
      changeType: record.changeType,
    }));
  return {
    unreadCount: changedSources.length,
    errorCount: records.filter((record) => record.lastCheckStatus === "error").length,
    sourceCount: records.length,
    lastCheckedAt: records
      .map((record) => record.lastCheckedAt)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) || null,
    changedSources,
  };
}

export function applySourceWatchCheck(
  stateValue: unknown,
  payload: { checkedAt?: string; sources?: SourceWatchInput[] },
) {
  const previousState = normalizeSourceWatchState(stateValue);
  const checkedAt = validDate(payload.checkedAt) || new Date().toISOString();
  const nextState: SourceWatchPersistentState = {
    schemaVersion: 1,
    updatedAt: checkedAt,
    sources: { ...previousState.sources },
  };
  const events: SourceWatchChangeEvent[] = [];
  const sources: SourceWatchInput[] = [];

  for (const source of payload.sources || []) {
    const id = sourceWatchId(source);
    if (!id) continue;
    const previous = normalizeRecord(id, nextState.sources[id] || baseRecord(id, source));
    const record: SourceWatchRecord = {
      ...previous,
      name: stringValue(source.name) || stringValue(source.repo) || stringValue(source.url) || previous.name,
      provider: stringValue(source.provider) || previous.provider,
      category: stringValue(source.category) || stringValue(source.type) || previous.category,
      lastCheckedAt: checkedAt,
    };

    if (isSuccessfulCheck(source)) {
      const signature = sourceContentSignature(source);
      record.lastCheckStatus = "ok";
      record.lastError = null;

      if (signature) {
        const version = stringValue(source.version);
        const commit = stringValue(source.commit);
        const contentHash = stringValue(source.contentHash);
        const snapshot = comparableSnapshot(source.semanticSnapshot);
        const changed = Boolean(previous.currentSignature && previous.currentSignature !== signature);

        if (changed) {
          const changeType = deriveChangeType(previous, source);
          record.previousSignature = previous.currentSignature;
          record.previousVersion = previous.currentVersion;
          record.previousCommit = previous.currentCommit;
          record.previousContentHash = previous.currentContentHash;
          record.previousSnapshot = previous.currentSnapshot;
          record.readableDiff = adventureEffectSemanticDiff(previous.currentSnapshot, snapshot);
          record.lastChangedAt = checkedAt;
          record.changeType = changeType;
          record.unreadChange = true;
          events.push({
            ...source,
            id: `${id}-${checkedAt}-${events.length}`,
            checkedAt,
            sourceId: id,
            signature,
            previousSignature: previous.currentSignature!,
            previousVersion: previous.currentVersion,
            changeType,
            readableDiff: record.readableDiff,
          });
        }

        record.currentSignature = signature;
        record.currentVersion = version;
        record.currentCommit = commit;
        record.currentContentHash = contentHash;
        record.currentSnapshot = snapshot;
      }
    } else {
      record.lastCheckStatus = "error";
      record.lastError = sourceError(source);
    }

    nextState.sources[id] = record;
    sources.push(publicSource(source, record));
  }

  const summary = sourceWatchSummary(nextState);
  const changedIds = new Set(summary.changedSources.map((source) => source.id));
  return {
    state: nextState,
    sources,
    events,
    summary,
    changedSources: sources.filter((source) => changedIds.has(sourceWatchId(source))),
  };
}

export function acknowledgeSourceWatchChanges(
  stateValue: unknown,
  sourceIds?: unknown,
  acknowledgedAt = new Date().toISOString(),
) {
  const state = normalizeSourceWatchState(stateValue);
  const requestedIds = Array.isArray(sourceIds)
    ? new Set(sourceIds.map((value) => String(value || "").trim()).filter(Boolean))
    : null;
  const acknowledgedSourceIds: string[] = [];

  for (const [sourceId, previous] of Object.entries(state.sources)) {
    if (!previous.unreadChange || (requestedIds && !requestedIds.has(sourceId))) continue;
    state.sources[sourceId] = {
      ...previous,
      unreadChange: false,
      lastAcknowledgedAt: previous.lastChangedAt || validDate(acknowledgedAt) || acknowledgedAt,
    };
    acknowledgedSourceIds.push(sourceId);
  }
  state.updatedAt = validDate(acknowledgedAt) || acknowledgedAt;

  return {
    state,
    acknowledgedSourceIds,
    summary: sourceWatchSummary(state),
  };
}
