import { normalizeActionError } from "@/lib/admin-action-errors";

export function createAdminOperationId(prefix = "admin") {
  const safePrefix = prefix.toLowerCase().replace(/[^a-z0-9-]+/g, "-").replace(/^-+|-+$/g, "") || "admin";
  return `${safePrefix}-${crypto.randomUUID()}`;
}

export function adminOperationId(request: Request, prefix: string) {
  const supplied = String(request.headers.get("x-operation-id") || "").trim();
  return /^[a-zA-Z0-9][a-zA-Z0-9._:-]{7,95}$/.test(supplied)
    ? supplied
    : createAdminOperationId(prefix);
}

type AdminOperationLog = {
  operationId: string;
  action: string;
  provider?: string;
  phase: "start" | "success" | "partial" | "warning" | "failed";
  startedAt?: number;
  durationMs?: number;
  status?: number;
  diagnostics?: Record<string, unknown>;
  error?: unknown;
};

export function logAdminOperation(event: AdminOperationLog) {
  const now = Date.now();
  const normalizedError = event.error === undefined ? undefined : normalizeActionError(event.error);
  const startTime = event.startedAt
    ?? (event.durationMs === undefined ? now : now - event.durationMs);
  const entry = {
    type: "admin-action",
    timestamp: new Date(now).toISOString(),
    operationId: event.operationId,
    action: event.action,
    provider: event.provider || "dashboard",
    start: new Date(startTime).toISOString(),
    end: event.phase === "start" ? null : new Date(now).toISOString(),
    phase: event.phase,
    status: event.phase,
    durationMs: event.durationMs,
    httpStatus: event.status,
    errorCode: normalizedError?.code || null,
    diagnostics: event.diagnostics,
    error: normalizedError,
  };
  const line = JSON.stringify(entry);
  if (event.phase === "failed") console.error(line);
  else if (event.phase === "warning" || event.phase === "partial") console.warn(line);
  else console.info(line);
  return entry;
}
