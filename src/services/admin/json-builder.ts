export type JsonBuilderRequest = Record<string, unknown>;

async function request(method: "GET" | "POST", body?: JsonBuilderRequest) {
  const response = await fetch("/api/json-builder", {
    method,
    cache: "no-store",
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(payload.error || "JSON Builder indisponible.") as Error & {
      code?: string;
      details?: unknown;
      rollback?: unknown;
    };
    error.code = payload.code;
    error.details = payload.details;
    error.rollback = payload.rollback;
    throw error;
  }
  return payload.data;
}

export function loadJsonBuilder() {
  return request("GET");
}

export function dryRunJsonBuilder(draft: unknown) {
  return request("POST", { action: "dry-run", draft });
}

export function commitJsonBuilder(draft: unknown, token: string, options: { commit?: boolean; push?: boolean } = {}) {
  return request("POST", { action: "commit", draft, token, commit: options.commit !== false, push: options.push === true });
}

export function saveJsonBuilderDrafts(drafts: unknown[]) {
  return request("POST", { action: "save-drafts", drafts });
}
