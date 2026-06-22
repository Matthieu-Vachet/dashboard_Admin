/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

type JsonValue = Record<string, unknown>;
type RuleRecord = Record<string, unknown> & {
  id?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const customRulesStoreKey = "matweb.pokemon.customRules";
const pokemonModulePattern = `${process.cwd()}/src/server/pokemon-go/`;

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function getAction(request: NextRequest, body?: JsonValue) {
  return String(
    request.nextUrl.searchParams.get("action") ||
      body?.action ||
      "bootstrap",
  ).trim();
}

async function requireDashboardSession() {
  return getSession();
}

function loadAdminModules() {
  const { buildChecklist, buildCustomRuleCatalogChecklist, detailForKey } = require("@/server/pokemon-go/apps/checklist/server/engine");
  const { sourceWatch } = require("@/server/pokemon-go/apps/checklist/server/source-watch");
  const workshop = require("@/server/pokemon-go/apps/checklist/server/workshop");
  const { summarizeChecklist } = require("@/server/pokemon-go/src/lib/site-dashboard");

  return { buildChecklist, buildCustomRuleCatalogChecklist, detailForKey, sourceWatch, summarizeChecklist, workshop };
}

function clearPokemonModuleCache() {
  for (const key of Object.keys(require.cache)) {
    if (key.includes(pokemonModulePattern)) delete require.cache[key];
  }
}

async function refreshLatestGithubDataSnapshot() {
  if (process.env.POKEMON_GO_DATA_LIVE_SYNC === "false") return null;
  const { syncGithubDataSnapshot } = require("@/server/pokemon-go/src/lib/github-data-sync");
  const dataDir = await syncGithubDataSnapshot();
  process.env.POKEMON_GO_DATA_DIR = dataDir;
  clearPokemonModuleCache();
  return dataDir;
}

function requestError(message: string, status = 400) {
  const error = new Error(message);
  (error as Error & { status?: number }).status = status;
  return error;
}

function canWriteLocalRuleFiles() {
  return process.env.VERCEL !== "1" && process.env.NODE_ENV !== "production";
}

async function readCustomRules(owner: string, workshop: ReturnType<typeof loadAdminModules>["workshop"]) {
  if (dashboardStoreConfigured()) {
    const document = await readDashboardStoreValue(owner, customRulesStoreKey);
    return Array.isArray(document?.value) ? (document.value as RuleRecord[]) : [];
  }

  return workshop.customRules() as RuleRecord[];
}

async function writeCustomRules(owner: string, rules: RuleRecord[]) {
  await writeDashboardStoreValue(owner, customRulesStoreKey, rules);
}

async function saveCustomRule(owner: string, body: JsonValue, workshop: ReturnType<typeof loadAdminModules>["workshop"]) {
  const activeWorkshop = workshop;
  if (!dashboardStoreConfigured()) {
    if (!canWriteLocalRuleFiles()) {
      throw requestError("MongoDB dashboard non configuré: impossible de persister les règles sur le filesystem Vercel en lecture seule.", 503);
    }
    return activeWorkshop.saveCustomRule(body);
  }

  const rules = await readCustomRules(owner, activeWorkshop);
  const normalized = activeWorkshop.previewCustomRule(body) as RuleRecord;
  const index = rules.findIndex((rule) => rule.id === normalized.id);
  const previous = index >= 0 ? rules[index] : null;
  const nextRule = {
    ...normalized,
    createdAt: previous?.createdAt || normalized.createdAt,
  };
  const nextRules = [...rules];

  if (index >= 0) nextRules[index] = nextRule;
  else nextRules.unshift(nextRule);

  await writeCustomRules(owner, nextRules);
  return nextRule;
}

async function toggleCustomRule(owner: string, body: JsonValue, workshop: ReturnType<typeof loadAdminModules>["workshop"]) {
  const activeWorkshop = workshop;
  if (!dashboardStoreConfigured()) {
    if (!canWriteLocalRuleFiles()) {
      throw requestError("MongoDB dashboard non configuré: impossible de modifier les règles sur le filesystem Vercel en lecture seule.", 503);
    }
    return activeWorkshop.toggleCustomRule(body);
  }

  const id = String(body.id || "");
  const rules = await readCustomRules(owner, activeWorkshop);
  const index = rules.findIndex((rule) => rule.id === id);
  if (index < 0) throw requestError("Règle introuvable.");

  const updatedAt = new Date().toISOString();
  const nextRule = {
    ...rules[index],
    enabled: body.enabled !== false,
    updatedAt,
  };
  const nextRules = [...rules];
  nextRules[index] = nextRule;
  await writeCustomRules(owner, nextRules);
  return nextRule;
}

async function deleteCustomRule(owner: string, body: JsonValue, workshop: ReturnType<typeof loadAdminModules>["workshop"]) {
  const activeWorkshop = workshop;
  if (!dashboardStoreConfigured()) {
    if (!canWriteLocalRuleFiles()) {
      throw requestError("MongoDB dashboard non configuré: impossible de supprimer les règles sur le filesystem Vercel en lecture seule.", 503);
    }
    return activeWorkshop.deleteCustomRule(body);
  }

  const id = String(body.id || "");
  const rules = await readCustomRules(owner, activeWorkshop);
  const index = rules.findIndex((rule) => rule.id === id);
  if (index < 0) throw requestError("Règle introuvable.");

  const [removed] = rules.splice(index, 1);
  await writeCustomRules(owner, rules);
  return removed;
}

async function bootstrapResponse(owner: string, customRules: unknown = null) {
  const { buildChecklist, buildCustomRuleCatalogChecklist, summarizeChecklist, workshop } = loadAdminModules();
  const rules = Array.isArray(customRules)
    ? (customRules as RuleRecord[])
    : await readCustomRules(owner, workshop);
  const entries = buildChecklist(rules);
  const dataCatalog = workshop.catalog();

  return {
    viewer: { admin: true },
    entries,
    customRuleEntries: buildCustomRuleCatalogChecklist(rules),
    summary: summarizeChecklist(entries),
    catalog: {
      types: dataCatalog.types.length,
      weather: dataCatalog.weather.length,
      stickers: dataCatalog.stickers.length,
      moves: dataCatalog.moves.length,
    },
    customRules: rules || [],
  };
}

function handleServerError(error: unknown) {
  const message = error instanceof Error ? error.message : "Erreur inconnue.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-admin-read", 180, 60_000);
    const session = await requireDashboardSession();
    const authenticated = Boolean(session);
    const action = getAction(request);

    if (action === "session") {
      return json({ data: { authenticated } });
    }

    if (!authenticated) {
      return json({ error: "Accès dashboard requis." }, { status: 401 });
    }

    await recordDashboardApiCall(session!.email, `/api/pokemon-admin:${action}`, "GET");

    const { detailForKey, sourceWatch, workshop } = loadAdminModules();

    if (action === "bootstrap") {
      return json({ data: await bootstrapResponse(session!.email) });
    }

    if (action === "detail") {
      const data = detailForKey(String(request.nextUrl.searchParams.get("key") || ""));
      if (!data) return json({ error: "Fiche introuvable." }, { status: 404 });
      return json({ data: { viewer: { admin: true }, detail: data } });
    }

    if (action === "catalog") {
      return json({ data: workshop.catalog() });
    }

    if (action === "assets") {
      const audit = await workshop.assetAudit(request.nextUrl.searchParams.get("dexId") || "");
      return json({ data: audit });
    }

    if (action === "source-watch") {
      return json({ data: await sourceWatch() });
    }

    if (action === "history") {
      return json({ data: await workshop.repoHistory() });
    }

    if (action === "url-audit") {
      return json({ data: await workshop.auditUrls(request.nextUrl.searchParams.get("key") || "") });
    }

    if (action === "custom-rules") {
      return json({ data: await readCustomRules(session!.email, workshop) });
    }

    if (action === "notes") {
      return json({ data: workshop.notes() });
    }

    if (action === "image-reviews") {
      return json({ data: workshop.imageReviews() });
    }

    return json({ error: "Action inconnue." }, { status: 404 });
  } catch (error) {
    return handleServerError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-admin-write", 80, 60_000);
    assertSameOrigin(request);
    const body = (await request.json().catch(() => ({}))) as JsonValue;
    assertJsonPayloadSize(body, 400_000);
    const session = await requireDashboardSession();
    const authenticated = Boolean(session);
    const action = getAction(request, body);

    if (!authenticated) {
      return json({ error: "Accès dashboard requis." }, { status: 401 });
    }

    await recordDashboardApiCall(session!.email, `/api/pokemon-admin:${action}`, "POST");

    const { workshop } = loadAdminModules();

    if (action === "bootstrap") {
      return json({ data: await bootstrapResponse(session!.email, body.customRules) });
    }

    if (action === "login") {
      return json({ data: { authenticated: true } });
    }

    if (action === "logout") {
      return json({ data: { authenticated: false } });
    }

    if (action === "validate") {
      return json({
        data: workshop.validate(
          body.sourceData,
          String(body.file || ""),
          String(body.kind || ""),
        ),
      });
    }

    if (action === "preview-rule") {
      return json({ data: workshop.previewCustomRule(body) });
    }

    if (action === "sync-github-data") {
      const dataDir = await refreshLatestGithubDataSnapshot();
      return json({
        data: {
          dataDir,
          bootstrap: await bootstrapResponse(session!.email),
        },
      });
    }

    if (action === "save-rule") {
      return json({ data: await saveCustomRule(session!.email, body, workshop) });
    }

    if (action === "toggle-rule") {
      return json({ data: await toggleCustomRule(session!.email, body, workshop) });
    }

    if (action === "delete-rule") {
      return json({ data: await deleteCustomRule(session!.email, body, workshop) });
    }

    if (action === "save-note") {
      return json({ data: workshop.saveNote(body) });
    }

    if (action === "save-image-review") {
      return json({ data: workshop.saveImageReview(body) });
    }

    if (action === "open-file") {
      return json({ data: workshop.openFile(String(body.file || "")) });
    }

    return json({ error: "Action inconnue." }, { status: 404 });
  } catch (error) {
    return handleServerError(error);
  }
}
