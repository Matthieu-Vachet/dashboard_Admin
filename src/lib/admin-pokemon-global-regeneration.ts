import { globalAdminRegenerations } from "@/lib/admin-regeneration-registry";

export type GlobalRegenerationStatus = "idle" | "running" | "success" | "partial" | "failed" | "cancelled";

export type GlobalRegenerationStep = {
  id: string;
  label: string;
  status: GlobalRegenerationStatus;
  summary?: string;
  diagnostics?: Record<string, unknown>;
};

type GlobalRegenerationDefinition = {
  id: string;
  label: string;
  action?: string;
  endpoint?: string;
  kind?: "identity-sync";
};

export const globalRegenerationDefinitions: GlobalRegenerationDefinition[] = globalAdminRegenerations().map((registration) => ({
  id: registration.id,
  label: registration.label,
  action: registration.id === "identity-manager" ? undefined : registration.dashboardAction,
  endpoint: registration.dashboardEndpoint,
  kind: registration.id === "identity-manager" ? "identity-sync" : undefined,
}));

export function initialGlobalRegenerationSteps(): GlobalRegenerationStep[] {
  return globalRegenerationDefinitions.map(({ id, label }) => ({ id, label, status: "idle" }));
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

async function requestJson(url: string, init?: RequestInit) {
  const response = await fetch(url, { cache: "no-store", ...init });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.error || payload.message || `HTTP ${response.status}`);
  }
  return payload.data ?? payload;
}

function responseCandidates(value: unknown) {
  const candidates: Record<string, unknown>[] = [];
  const pending: unknown[] = [value];
  const seen = new Set<Record<string, unknown>>();
  while (pending.length && candidates.length < 24) {
    const current = pending.shift();
    if (!isRecord(current) || seen.has(current)) continue;
    seen.add(current);
    candidates.push(current);
    for (const key of ["data", "run", "sourceRun", "current", "diagnostics"]) {
      if (isRecord(current[key])) pending.push(current[key]);
    }
  }
  return candidates;
}

function sleep(delayMs: number) {
  return new Promise((resolve) => window.setTimeout(resolve, delayMs));
}

const inFlightRegenerations = new Map<string, Promise<unknown>>();

function regenerationState(run: Record<string, unknown>) {
  return String(run.status || "").trim().toLowerCase();
}

function firstErrorMessage(run: Record<string, unknown>) {
  if (!Array.isArray(run.errors)) return null;
  const first = run.errors.find(isRecord);
  return first && typeof first.message === "string" ? first.message : null;
}

export class AdminRegenerationRunError extends Error {
  regenerationStatus: "failed" | "cancelled";
  run: Record<string, unknown>;

  constructor(message: string, regenerationStatus: "failed" | "cancelled", run: Record<string, unknown>) {
    super(message);
    this.name = "AdminRegenerationRunError";
    this.regenerationStatus = regenerationStatus;
    this.run = run;
  }
}

async function waitForRegeneration(value: unknown) {
  const accepted = responseCandidates(value).find((candidate) => candidate.accepted === true);
  if (!accepted) return value;

  const run = isRecord(accepted.run) ? accepted.run : null;
  const runId = typeof run?.id === "string" ? run.id : "";
  const domain = typeof run?.datasetKey === "string" ? run.datasetKey : "";
  if (!runId || !domain) throw new Error("La régénération de fond n'a pas retourné d'identifiant de suivi.");

  const deadline = Date.now() + 8 * 60_000;
  while (Date.now() < deadline) {
    const statusValue = await requestJson(`/api/pokemon-admin?action=regeneration-status&domain=${encodeURIComponent(domain)}&runId=${encodeURIComponent(runId)}`);
    const current = responseCandidates(statusValue).find((candidate) => candidate.id === runId && typeof candidate.status === "string");
    const status = current ? regenerationState(current) : "";
    if (!current || ["", "pending", "queued", "accepted", "running", "processing"].includes(status)) {
      await sleep(1_500);
      continue;
    }
    if (["failed", "error"].includes(status)) {
      throw new AdminRegenerationRunError(firstErrorMessage(current) || "La régénération de fond a échoué.", "failed", current);
    }
    if (["cancelled", "canceled"].includes(status)) {
      throw new AdminRegenerationRunError(firstErrorMessage(current) || "La régénération de fond a été annulée.", "cancelled", current);
    }
    if (["completed", "complete", "success", "succeeded", "partial", "unchanged", "warning", "completed-with-warnings"].includes(status)) return current;

    throw new Error(`État de régénération inattendu : ${status}.`);
  }

  throw new Error("La régénération continue en arrière-plan, mais son suivi a dépassé huit minutes.");
}

export async function executePokemonAdminRegeneration(action: string) {
  const normalizedAction = action.trim();
  const existing = inFlightRegenerations.get(normalizedAction);
  if (existing) return existing;

  const request = requestJson("/api/pokemon-admin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: normalizedAction }),
  }).then(waitForRegeneration);

  inFlightRegenerations.set(normalizedAction, request);
  try {
    return await request;
  } finally {
    if (inFlightRegenerations.get(normalizedAction) === request) {
      inFlightRegenerations.delete(normalizedAction);
    }
  }
}

function compactDiagnostics(value: unknown) {
  const keys = [
    "status",
    "message",
    "changed",
    "count",
    "total",
    "processed",
    "matched",
    "unmatched",
    "unmatchedCount",
    "mappingMissingCount",
    "ignoredCount",
    "warnings",
    "warningCount",
    "warningsCount",
    "diff",
    "create",
    "update",
    "orphan",
    "conflict",
    "errors",
    "durationMs",
    "totalAfter",
  ];
  const diagnostics: Record<string, unknown> = {};
  for (const candidate of responseCandidates(value).reverse()) {
    for (const key of keys) {
      if (!(key in candidate) || candidate[key] === undefined) continue;
      const raw = candidate[key];
      diagnostics[key] = Array.isArray(raw) ? raw.slice(0, 20) : raw;
    }
    if (isRecord(candidate.diagnostics)) {
      diagnostics.diagnostics = Object.fromEntries(
        Object.entries(candidate.diagnostics)
          .filter(([key]) => keys.includes(key))
          .map(([key, raw]) => [key, Array.isArray(raw) ? raw.slice(0, 20) : raw]),
      );
    }
  }
  return diagnostics;
}

function warningCount(value: unknown) {
  const candidates = responseCandidates(value);
  const direct = Math.max(0, ...candidates.flatMap((candidate) =>
    ["warningCount", "warningsCount", "unmatchedCount", "unmatched", "conflict", "conflicts"]
      .map((name) => candidate[name])
      .filter((item): item is number => typeof item === "number" && Number.isFinite(item)),
  ));
  if (direct > 0) return direct;
  for (const candidate of candidates) {
    if (Array.isArray(candidate.warnings)) return candidate.warnings.length;
    if (isRecord(candidate.diagnostics) && Array.isArray(candidate.diagnostics.warnings)) {
      return candidate.diagnostics.warnings.length;
    }
  }
  return 0;
}

function successResult(value: unknown, fallbackSummary: string): Omit<GlobalRegenerationStep, "id" | "label"> {
  const warnings = warningCount(value);
  const diagnostics = compactDiagnostics(value);
  const terminal = responseCandidates(value).map(regenerationState).find(Boolean) || "";
  const unchanged = terminal === "unchanged" || responseCandidates(value).some((candidate) => candidate.changed === false);
  const partial = terminal === "partial" || warnings > 0;
  return {
    status: partial ? "partial" : "success",
    summary: partial
      ? `${unchanged ? "Contenu inchangé" : fallbackSummary} · ${warnings} avertissement(s)`
      : unchanged ? "Contenu inchangé · snapshot actuel conservé" : fallbackSummary,
    diagnostics: Object.keys(diagnostics).length ? diagnostics : undefined,
  };
}

async function executeIdentitySync(): Promise<Omit<GlobalRegenerationStep, "id" | "label">> {
  const preview = await requestJson("/api/pokemon-admin?action=identity-manager-sync-preview");
  const candidates = responseCandidates(preview);
  const report = candidates.find((candidate) => ["create", "update", "orphan", "conflict"].some((key) => key in candidate)) || candidates.at(-1) || {};
  const create = Number(report.create || 0);
  const update = Number(report.update || 0);
  const orphan = Number(report.orphan || 0);
  const conflict = Number(report.conflict || 0);

  if (conflict > 0) {
    return {
      status: "partial",
      summary: `Synchronisation non appliquée · ${conflict} conflit(s) à résoudre`,
      diagnostics: { mode: "dry-run", create, update, orphan, conflict },
    };
  }

  if (create + update + orphan === 0) {
    return {
      status: "success",
      summary: "Catalogue déjà synchronisé",
      diagnostics: { mode: "dry-run", create, update, orphan, conflict },
    };
  }

  const applied = await requestJson("/api/pokemon-admin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action: "identity-manager-sync-apply" }),
  });
  return successResult(applied, `Synchronisé · ${create} création(s), ${update} mise(s) à jour, ${orphan} orphelin(s)`);
}

export async function executeGlobalRegenerationStep(definition: GlobalRegenerationDefinition) {
  if (definition.kind === "identity-sync") return executeIdentitySync();

  const value = definition.endpoint
    ? await requestJson(definition.endpoint, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{}",
      })
    : await executePokemonAdminRegeneration(String(definition.action || ""));

  return successResult(value, "Régénération terminée");
}
