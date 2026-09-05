import { adminRegenerationRegistry } from "../src/lib/admin-regeneration-registry";

const cliArgs = process.argv.slice(2);
const baseUrlArgument = cliArgs.find((value) => value.startsWith("--base-url="))?.slice("--base-url=".length)
  || (cliArgs.includes("--base-url") ? cliArgs[cliArgs.indexOf("--base-url") + 1] : "");
const target = String(baseUrlArgument || process.env.DASHBOARD_SMOKE_TARGET || "https://dashboard-admin-pi-ebon.vercel.app").replace(/\/$/, "");
const protectionBypass = String(process.env.VERCEL_AUTOMATION_BYPASS_SECRET || "").trim();
const bootstrapUrl = String(process.env.DASHBOARD_BOOTSTRAP_URL || "").trim();
let cookie = String(process.env.DASHBOARD_SESSION_COOKIE || "").trim();
let protectionCookie = "";
const requestedIds = new Set(String(cliArgs.includes("--all") ? "" : process.env.REGENERATION_SMOKE_IDS || "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean));
const registrations = requestedIds.size
  ? adminRegenerationRegistry.filter((registration) => requestedIds.has(registration.id))
  : [...adminRegenerationRegistry];
if (requestedIds.size > 0 && requestedIds.size !== registrations.length) {
  const known = new Set(registrations.map((registration) => registration.id));
  throw new Error(`Action(s) de smoke inconnue(s): ${[...requestedIds].filter((id) => !known.has(id)).join(", ")}`);
}

async function authenticate() {
  if (cookie) return cookie;
  if (bootstrapUrl && !protectionCookie) {
    const bootstrap = await fetch(bootstrapUrl, { redirect: "manual", signal: AbortSignal.timeout(30_000) });
    const setCookies = typeof bootstrap.headers.getSetCookie === "function"
      ? bootstrap.headers.getSetCookie()
      : [bootstrap.headers.get("set-cookie") || ""];
    protectionCookie = setCookies.map((value) => value.split(";", 1)[0]).filter(Boolean).join("; ");
    if (!protectionCookie) throw new Error(`Accès Preview impossible (HTTP ${bootstrap.status}, cookie absent).`);
  }
  const email = String(process.env.ADMIN_EMAIL || "").trim();
  const password = String(process.env.ADMIN_PASSWORD || "").trim();
  if (!email || !password) {
    throw new Error("DASHBOARD_SESSION_COOKIE ou ADMIN_EMAIL + ADMIN_PASSWORD est requis pour le smoke test Dashboard.");
  }
  const response = await fetch(`${target}/api/session`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      origin: target,
      ...(protectionBypass ? { "x-vercel-protection-bypass": protectionBypass } : {}),
      ...(protectionCookie ? { cookie: protectionCookie } : {}),
    },
    body: new URLSearchParams({ email, password, next: "/pokemon-admin" }),
    signal: AbortSignal.timeout(30_000),
  });
  const sessionCookie = response.headers.get("set-cookie")?.split(";", 1)[0] || "";
  if (![302, 303].includes(response.status) || !sessionCookie.includes("matweb_dashboard_session=")) {
    throw new Error(`Authentification Dashboard impossible (HTTP ${response.status}).`);
  }
  cookie = [protectionCookie, sessionCookie].filter(Boolean).join("; ");
  return cookie;
}

function records(value: unknown) {
  const found: Record<string, unknown>[] = [];
  const pending: unknown[] = [value];
  const seen = new Set<object>();
  while (pending.length && found.length < 32) {
    const current = pending.shift();
    if (!current || typeof current !== "object" || Array.isArray(current) || seen.has(current)) continue;
    seen.add(current);
    const record = current as Record<string, unknown>;
    found.push(record);
    for (const key of ["data", "run", "current", "diagnostics", "sourceAvailability", "details"]) {
      if (record[key] && typeof record[key] === "object") pending.push(record[key]);
    }
    if (Array.isArray(record.errors)) pending.push(...record.errors);
  }
  return found;
}

async function request(pathname: string, init: RequestInit = {}) {
  const response = await fetch(`${target}${pathname}`, {
    cache: "no-store",
    ...init,
    headers: {
      accept: "application/json",
      cookie: await authenticate(),
      origin: target,
      ...(protectionBypass ? { "x-vercel-protection-bypass": protectionBypass } : {}),
      ...(init.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false || payload.error) {
    const error = new Error(`HTTP ${response.status}: ${payload.error?.message || payload.error || payload.message || "echec"}`) as Error & { payload?: unknown; status?: number };
    error.payload = payload;
    error.status = response.status;
    throw error;
  }
  return { response, payload };
}

async function waitForAcceptedRegeneration(payload: unknown) {
  const accepted = records(payload).find((candidate) => candidate.accepted === true);
  if (!accepted) return { runStatus: "synchronous" };
  const run = accepted.run && typeof accepted.run === "object" ? accepted.run as Record<string, unknown> : null;
  const runId = String(run?.id || "");
  const domain = String(run?.datasetKey || "");
  if (!runId || !domain) throw new Error("Régénération acceptée sans identifiant de suivi.");

  const deadline = Date.now() + 10 * 60_000;
  while (Date.now() < deadline) {
    const status = await request(`/api/pokemon-admin?action=regeneration-status&domain=${encodeURIComponent(domain)}&runId=${encodeURIComponent(runId)}`);
    const current = records(status.payload).find((candidate) => candidate.id === runId && typeof candidate.status === "string");
    const runStatus = String(current?.status || "").trim().toLowerCase();
    if (!current || ["", "pending", "queued", "accepted", "running", "processing"].includes(runStatus)) {
      await new Promise((resolve) => setTimeout(resolve, 1_500));
      continue;
    }
    if (["failed", "error", "cancelled", "canceled"].includes(runStatus)) {
      throw new Error(`Job ${domain} ${runStatus}: ${records(current).find((candidate) => typeof candidate.message === "string")?.message || "échec sans détail"}`);
    }
    if (["completed", "complete", "success", "succeeded", "partial", "unchanged", "warning", "completed-with-warnings"].includes(runStatus)) {
      return { runStatus };
    }
    throw new Error(`État de job inattendu pour ${domain}: ${runStatus}`);
  }
  throw new Error(`Délai de suivi dépassé pour ${domain}.`);
}

async function bestDefendersSourceProtected() {
  try {
    const current = await request("/api/pokemon-admin?action=best-defenders&page=1&limit=1");
    return records(current.payload).some((candidate) => ["SOURCE_PROTECTED", "SOURCE_TEMPORARILY_UNAVAILABLE"].includes(String(candidate.code || "").toUpperCase()));
  } catch {
    return false;
  }
}

async function call(registration: (typeof adminRegenerationRegistry)[number]) {
  const endpoint = registration.dashboardEndpoint || "/api/pokemon-admin";
  const result = await request(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: registration.dashboardEndpoint ? "{}" : JSON.stringify({ action: registration.dashboardAction }),
    signal: AbortSignal.timeout((registration.timeoutSeconds + 60) * 1_000),
  });
  const completion = await waitForAcceptedRegeneration(result.payload);
  return { status: result.response.status, runStatus: completion.runStatus };
}

const results = [];
for (const registration of registrations) {
  const startedAt = Date.now();
  try {
    const completion = await call(registration);
    results.push({ id: registration.id, ...completion, success: true, durationMs: Date.now() - startedAt });
  } catch (error) {
    const sourceProtected = registration.id === "best-defenders" && await bestDefendersSourceProtected();
    results.push({
      id: registration.id,
      success: sourceProtected,
      expectedStatus: sourceProtected ? "source_protected" : undefined,
      error: error instanceof Error ? error.message : String(error),
      durationMs: Date.now() - startedAt,
    });
  }
}
console.log(JSON.stringify({ target, success: results.every((result) => result.success), results }, null, 2));
if (results.some((result) => !result.success)) process.exitCode = 1;
