export type AdminActionErrorContract = {
  code: string;
  message: string;
  details?: unknown;
  status?: number;
  cause?: AdminActionErrorContract;
};

type UnknownRecord = Record<string, unknown>;

const genericMessages = new Set(["[object Object]", "[object Response]", "undefined", "null"]);

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  const text = value.trim();
  return genericMessages.has(text) ? "" : text;
}

function statusOf(value: unknown) {
  if (!isRecord(value)) return undefined;
  const status = Number(value.status ?? value.statusCode ?? value.httpStatus);
  return Number.isInteger(status) && status >= 100 && status <= 599 ? status : undefined;
}

function codeOf(value: unknown, status?: number) {
  if (isRecord(value)) {
    const code = cleanText(value.code ?? value.errorCode ?? value.name);
    if (code && code !== "Error") return code.toUpperCase().replace(/[^A-Z0-9_-]+/g, "_");
  }
  return status ? `HTTP_${status}` : undefined;
}

function detailsOf(value: UnknownRecord) {
  if (value.details !== undefined) return value.details;
  if (Array.isArray(value.issues)) return { issues: value.issues };
  if (Array.isArray(value.errors)) return { errors: value.errors };
  return undefined;
}

function nestedCandidates(value: UnknownRecord) {
  return [value.error, value.cause, value.data, value.response, value.body]
    .filter((candidate) => candidate !== undefined && candidate !== value);
}

function discover(value: unknown, seen: Set<object>, depth = 0): AdminActionErrorContract | null {
  if (depth > 8) return null;
  const direct = cleanText(value);
  if (direct) return { code: "ADMIN_ACTION_FAILED", message: direct };

  if (value instanceof Response) {
    return {
      code: `HTTP_${value.status}`,
      message: cleanText(value.statusText) || `La requête a échoué (HTTP ${value.status}).`,
      status: value.status,
      details: value.url ? { url: value.url } : undefined,
    };
  }

  if (!isRecord(value) || seen.has(value)) return null;
  seen.add(value);

  const status = statusOf(value);
  const message = cleanText(value.message ?? value.title ?? value.statusText);
  const nested = nestedCandidates(value)
    .map((candidate) => discover(candidate, seen, depth + 1))
    .find(Boolean) || null;
  const firstArrayError = Array.isArray(value.errors)
    ? value.errors.map((candidate) => discover(candidate, seen, depth + 1)).find(Boolean) || null
    : null;
  const primary = nested || firstArrayError;

  if (!message && !primary && !status && !detailsOf(value)) return null;
  return {
    code: codeOf(value, status) || primary?.code || "ADMIN_ACTION_FAILED",
    message: message || primary?.message || (status ? `La requête a échoué (HTTP ${status}).` : "L’action a échoué."),
    details: detailsOf(value) ?? primary?.details,
    status: status ?? primary?.status,
    cause: message && primary && primary.message !== message ? primary : primary?.cause,
  };
}

export function normalizeActionError(
  value: unknown,
  fallback = "L’action administrative a échoué.",
): AdminActionErrorContract {
  const discovered = discover(value, new Set());
  const fallbackMessage = cleanText(fallback) || "L’action administrative a échoué.";
  if (!discovered) return { code: "ADMIN_ACTION_FAILED", message: fallbackMessage };
  return {
    ...discovered,
    code: discovered.code || "ADMIN_ACTION_FAILED",
    message: cleanText(discovered.message) || fallbackMessage,
  };
}

export class AdminActionError extends Error {
  readonly code: string;
  readonly details?: unknown;
  readonly status?: number;
  readonly normalizedCause?: AdminActionErrorContract;

  constructor(contract: AdminActionErrorContract) {
    super(contract.message);
    this.name = "AdminActionError";
    this.code = contract.code;
    this.details = contract.details;
    this.status = contract.status;
    this.normalizedCause = contract.cause;
  }

  toJSON(): AdminActionErrorContract {
    return {
      code: this.code,
      message: this.message,
      details: this.details,
      status: this.status,
      cause: this.normalizedCause,
    };
  }
}

export function actionError(value: unknown, fallback?: string) {
  return value instanceof AdminActionError ? value : new AdminActionError(normalizeActionError(value, fallback));
}

export async function readAdminActionResponse<T = unknown>(
  response: Response,
  fallback = "L’action administrative a échoué.",
): Promise<T> {
  const payload = await response.json().catch(() => null) as T | null;
  const record = isRecord(payload) ? payload : null;
  if (!response.ok || record?.success === false) {
    const candidate = record?.error ?? record?.message ?? payload ?? response;
    const normalized = normalizeActionError(candidate, fallback);
    throw new AdminActionError({
      ...normalized,
      status: normalized.status ?? response.status,
      code: normalized.code === "ADMIN_ACTION_FAILED" ? `HTTP_${response.status}` : normalized.code,
    });
  }
  return (payload ?? ({} as T));
}

export function adminActionErrorPayload(error: unknown, operationId: string, fallback?: string) {
  const normalized = normalizeActionError(error, fallback);
  return {
    status: normalized.status && normalized.status >= 400 ? normalized.status : 500,
    body: { success: false, error: normalized, operationId },
  };
}
