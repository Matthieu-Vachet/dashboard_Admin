export type GlobalRegenerationStatus = "pending" | "running" | "success" | "warning" | "error";

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

export const globalRegenerationDefinitions: GlobalRegenerationDefinition[] = [
  { id: "game-master", label: "Game Master", action: "regenerate-game-master" },
  { id: "identity-manager", label: "Identity Manager", kind: "identity-sync" },
  { id: "variant-resolution", label: "Résolution des variantes", action: "regenerate-pokemon-identity-mappings" },
  { id: "raids", label: "Raids", action: "regenerate-raids" },
  { id: "max-battles", label: "Max Battles", action: "regenerate-max-battles" },
  { id: "rocket", label: "Team GO Rocket", action: "regenerate-rocket" },
  { id: "pvp", label: "Classements PvP", action: "regenerate-pvp-rankings" },
  { id: "best-attackers", label: "Best Attackers", action: "regenerate-best-attackers" },
  { id: "eggs", label: "Œufs", action: "regenerate-eggs" },
  { id: "research", label: "Research", action: "regenerate-research" },
  { id: "events", label: "Calendrier Events", endpoint: "/api/admin/events/scrape" },
  { id: "community-days", label: "Community Days", endpoint: "/api/admin/community-days/sync" },
  { id: "shiny", label: "Shiny Tracker", action: "regenerate-shiny" },
];

export function initialGlobalRegenerationSteps(): GlobalRegenerationStep[] {
  return globalRegenerationDefinitions.map(({ id, label }) => ({ id, label, status: "pending" }));
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
  let current = value;
  for (let depth = 0; depth < 4 && isRecord(current); depth += 1) {
    candidates.push(current);
    current = current.data;
  }
  return candidates;
}

function sleep(delayMs: number) {
  return new Promise((resolve) => window.setTimeout(resolve, delayMs));
}

function firstErrorMessage(run: Record<string, unknown>) {
  if (!Array.isArray(run.errors)) return null;
  const first = run.errors.find(isRecord);
  return first && typeof first.message === "string" ? first.message : null;
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
    if (!current || current.status === "running") {
      await sleep(1_500);
      continue;
    }
    if (current.status === "failed") {
      throw new Error(firstErrorMessage(current) || "La régénération de fond a échoué.");
    }
    return current;
  }

  throw new Error("La régénération continue en arrière-plan, mais son suivi a dépassé huit minutes.");
}

export async function executePokemonAdminRegeneration(action: string) {
  const value = await requestJson("/api/pokemon-admin", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action }),
  });
  return waitForRegeneration(value);
}

function numericField(candidates: Record<string, unknown>[], names: string[]) {
  for (const candidate of candidates) {
    for (const name of names) {
      const value = candidate[name];
      if (typeof value === "number" && Number.isFinite(value)) return value;
    }
  }
  return 0;
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
    "warnings",
    "warningCount",
    "diff",
    "create",
    "update",
    "orphan",
    "conflict",
    "errors",
    "durationMs",
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
  const direct = numericField(candidates, ["warningCount", "warningsCount", "conflict", "conflicts"]);
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
  return {
    status: warnings > 0 ? "warning" : "success",
    summary: warnings > 0 ? `${fallbackSummary} · ${warnings} avertissement(s)` : fallbackSummary,
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
      status: "warning",
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
