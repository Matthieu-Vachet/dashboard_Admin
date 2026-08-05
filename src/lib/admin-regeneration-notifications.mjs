const inFlightNotifications = new Map();

export class RegenerationTimeoutError extends Error {
  constructor(message) {
    super(message);
    this.name = "RegenerationTimeoutError";
  }
}

function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function responseCandidates(value) {
  const candidates = [];
  let current = value;
  for (let depth = 0; depth < 6 && isRecord(current); depth += 1) {
    candidates.push(current);
    current = current.data;
  }
  return candidates;
}

function explicitFailure(candidate) {
  const status = String(candidate.status || "").trim().toLowerCase();
  if (["error", "failed", "failure", "partial", "partial-failure", "partial_failure", "completed-with-errors"].includes(status)) return true;
  if (candidate.success === false || candidate.ok === false || candidate.partialFailure === true) return true;
  if (typeof candidate.error === "string" && candidate.error.trim()) return true;
  if (Array.isArray(candidate.errors) && candidate.errors.length > 0) return true;
  return ["failed", "failures", "errorCount"].some((key) => Number(candidate[key] || 0) > 0);
}

function failureMessage(value, fallback) {
  for (const candidate of responseCandidates(value)) {
    if (typeof candidate.error === "string" && candidate.error.trim()) return candidate.error;
    if (typeof candidate.message === "string" && candidate.message.trim() && explicitFailure(candidate)) return candidate.message;
    if (Array.isArray(candidate.errors)) {
      const first = candidate.errors.find((entry) => typeof entry === "string" || isRecord(entry));
      if (typeof first === "string" && first.trim()) return first;
      if (isRecord(first) && typeof first.message === "string" && first.message.trim()) return first.message;
    }
  }
  return fallback;
}

export function assertCompleteRegeneration(value, fallback = "La régénération a échoué.") {
  if (responseCandidates(value).some(explicitFailure)) {
    throw new Error(failureMessage(value, fallback));
  }
  return value;
}

function errorText(error, fallback) {
  return error instanceof Error && error.message ? error.message : fallback;
}

export function runRegenerationWithToast({
  key,
  operation,
  invalidate,
  notifier,
  pendingMessage = "Régénération en cours…",
  successMessage = "Régénération terminée.",
  errorMessage = "Régénération impossible.",
  timeoutMs = 8 * 60_000,
}) {
  const normalizedKey = String(key || "").trim();
  if (!normalizedKey) throw new Error("Une clé de régénération est requise.");
  const existing = inFlightNotifications.get(normalizedKey);
  if (existing) return existing;

  const controller = new AbortController();
  const toastId = notifier.loading(pendingMessage);
  let timeoutId;
  const timeout = new Promise((_, reject) => {
    timeoutId = globalThis.setTimeout(() => {
      controller.abort();
      reject(new RegenerationTimeoutError(`${errorMessage} Délai d’attente dépassé.`));
    }, timeoutMs);
  });

  const request = (async () => {
    try {
      const value = await Promise.race([
        Promise.resolve().then(() => operation(controller.signal)),
        timeout,
      ]);
      assertCompleteRegeneration(value, errorMessage);
      if (invalidate) await invalidate(value);
      const message = typeof successMessage === "function" ? successMessage(value) : successMessage;
      notifier.success(message, { id: toastId });
      return value;
    } catch (error) {
      notifier.error(errorText(error, errorMessage), { id: toastId });
      throw error;
    } finally {
      globalThis.clearTimeout(timeoutId);
      if (inFlightNotifications.get(normalizedKey) === request) {
        inFlightNotifications.delete(normalizedKey);
      }
    }
  })();

  inFlightNotifications.set(normalizedKey, request);
  return request;
}

export function resetRegenerationNotificationsForTests() {
  inFlightNotifications.clear();
}
