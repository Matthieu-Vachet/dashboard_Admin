/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

export const maxDuration = 60;

type JsonValue = Record<string, unknown>;
type CurrentPayload = {
  data: Record<string, unknown>;
  meta: Record<string, unknown>;
  current: Record<string, unknown>;
};
type RuleRecord = Record<string, unknown> & {
  id?: string;
  enabled?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const customRulesStoreKey = "matweb.pokemon.customRules";
const sourceHistoryStoreKey = "matweb.pokemon.sourceHistory";
const pokemonModulePattern = `${process.cwd()}/src/server/pokemon-go/`;
const defaultPokemonApiPublicUrl = "https://pokemon-go-api.vercel.app";
const pokemonAdminMutationTimeoutMs = 55_000;
const pokemonApiBaseUrl =
  process.env.POKEMON_API_PUBLIC_URL
  || (process.env.VERCEL === "1" ? undefined : process.env.POKEMON_API_URL)
  || defaultPokemonApiPublicUrl;

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

async function readPokemonApiCurrent(
  path: string,
  validate: (data: Record<string, unknown>) => boolean,
  normalize: (
    data: Record<string, unknown>,
    meta: Record<string, unknown>,
    current: Record<string, unknown>,
  ) => CurrentPayload,
) {
  try {
    const target = new URL(path, pokemonApiBaseUrl);
    const headers: Record<string, string> = { accept: "application/json" };
    if (target.pathname.startsWith("/api/v1/shiny") || target.pathname.startsWith("/api/v1/pokemon-identity-mappings")) {
      const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
      if (!secret) throw requestError("POKEMON_API_ADMIN_SECRET est requis pour le Shiny Tracker prive.", 500);
      headers["x-api-admin-secret"] = secret;
    }
    const response = await fetch(target, {
      cache: "no-store",
      headers,
      signal: AbortSignal.timeout(12_000),
    });
    const payload = await response.json().catch(() => null) as {
      success?: boolean;
      data?: Record<string, unknown>;
      meta?: Record<string, unknown>;
      current?: Record<string, unknown>;
      error?: string | { message?: string };
      message?: string;
    } | null;
    if (
      !response.ok
      || !payload?.data
      || !validate(payload.data)
      || !payload.current
      || payload.current.key !== "current"
    ) {
      throw requestError(
        pokemonApiErrorMessage(
          payload,
          "PokemonGo-API n'a pas retourne le dataset MongoDB courant.",
        ),
        response.ok ? 502 : response.status,
      );
    }
    if (!isMongoSource(payload.meta || {})) {
      throw requestError("PokemonGo-API a retourne une source non MongoDB pour un dataset courant.", 502);
    }
    return normalize(payload.data, payload.meta || {}, payload.current);
  } catch (error) {
    if (error && typeof error === "object" && "status" in error) throw error;
    const message = error instanceof Error ? error.message : "PokemonGo-API indisponible.";
    throw requestError(message, 502);
  }
}

function pokemonApiErrorMessage(
  payload: { message?: string; error?: string | { message?: string } } | null,
  fallback: string,
) {
  if (typeof payload?.message === "string" && payload.message.trim()) {
    return payload.message;
  }
  if (typeof payload?.error === "string" && payload.error.trim()) {
    return payload.error;
  }
  if (
    payload?.error
    && typeof payload.error === "object"
    && typeof payload.error.message === "string"
    && payload.error.message.trim()
  ) {
    return payload.error.message;
  }
  return fallback;
}

function isMongoSource(meta: Record<string, unknown>) {
  return meta.source === "mongo" || meta.source === "mongodb";
}

function normalizeCurrentMeta(meta: Record<string, unknown>) {
  return { ...meta, source: "mongodb" };
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

async function readCurrentRaids() {
  return readPokemonApiCurrent(
    "/api/v1/raids",
    (data) => Boolean(data.currentList && typeof data.currentList === "object"),
    (data, meta, current) => {
      const currentList = asRecord(data.currentList);
      const buckets = Object.fromEntries(
        Object.entries(currentList).map(([key, bosses]) => [
          key,
          Array.isArray(bosses) ? bosses.length : 0,
        ]),
      );
      return { data, meta: { ...normalizeCurrentMeta(meta), buckets }, current };
    },
  );
}

async function readCurrentEggs() {
  return readPokemonApiCurrent(
    "/api/v1/eggs",
    (data) => Boolean(data.currentEggsList && typeof data.currentEggsList === "object"),
    (data, meta, current) => {
      const currentEggsList = asRecord(data.currentEggsList);
      const buckets = Object.fromEntries(
        Object.entries(currentEggsList).map(([key, pokemon]) => [
          key,
          Array.isArray(pokemon) ? pokemon.length : 0,
        ]),
      );
      return { data, meta: { ...normalizeCurrentMeta(meta), buckets }, current };
    },
  );
}

async function readCurrentMaxBattles() {
  return readPokemonApiCurrent(
    "/api/v1/max-battles",
    (data) => Boolean(data.currentMaxBattle && typeof data.currentMaxBattle === "object"),
    (data, meta, current) => {
      const currentMaxBattle = asRecord(data.currentMaxBattle);
      const buckets = Object.fromEntries(
        Object.entries(currentMaxBattle).map(([key, pokemon]) => [
          key,
          Array.isArray(pokemon) ? pokemon.length : 0,
        ]),
      );
      return { data, meta: { ...normalizeCurrentMeta(meta), buckets }, current };
    },
  );
}

function rocketSummary(data: { currentRocketList?: Record<string, unknown> }) {
  const currentRocketList = asRecord(data.currentRocketList);
  const leaders = Object.values(asRecord(currentRocketList.leaders)).flatMap((items) =>
    Array.isArray(items) ? items : [],
  );
  const giovanni = Array.isArray(currentRocketList.giovanni) ? currentRocketList.giovanni : [];
  const grunts = Array.isArray(currentRocketList.grunts) ? currentRocketList.grunts : [];
  const others = Array.isArray(currentRocketList.others) ? currentRocketList.others : [];
  return {
    giovanni: giovanni.length,
    leaders: leaders.length,
    grunts: grunts.length,
    others: others.length,
    trainers: giovanni.length + leaders.length + grunts.length + others.length,
  };
}

async function readCurrentRocket() {
  return readPokemonApiCurrent(
    "/api/v1/rocket",
    (data) => Boolean(data.currentRocketList && typeof data.currentRocketList === "object"),
    (data, meta, current) => ({
      data,
      meta: {
        ...normalizeCurrentMeta(meta),
        summary: rocketSummary(data),
      },
      current,
    }),
  );
}

function researchSummary(data: { currentResearchList?: Record<string, unknown> }) {
  const currentResearchList = data?.currentResearchList || {};
  const buckets = Object.fromEntries(
    Object.entries(currentResearchList).map(([key, tasks]) => [
      key,
      Array.isArray(tasks) ? tasks.length : 0,
    ]),
  );
  return {
    buckets,
    tasks: Object.values(buckets).reduce((sum, count) => sum + Number(count || 0), 0),
  };
}

async function readCurrentResearch() {
  return readPokemonApiCurrent(
    "/api/v1/research",
    (data) => Boolean(data.currentResearchList && typeof data.currentResearchList === "object"),
    (data, meta, current) => {
      const summary = researchSummary(data);
      return {
        data,
        meta: {
          ...normalizeCurrentMeta(meta),
          buckets: summary.buckets,
          summary,
        },
        current,
      };
    },
  );
}

function forwardedRankedQuery(request: NextRequest, allowed: string[]) {
  const params = new URLSearchParams();
  for (const key of allowed) {
    const value = request.nextUrl.searchParams.get(key);
    if (value !== null && value !== "") params.set(key, value);
  }
  return params.toString();
}

async function readCurrentShiny(request: NextRequest) {
  const query = forwardedRankedQuery(request, ["board", "search", "type", "generation", "trend", "oddsMin", "oddsMax", "page", "limit"]);
  return readPokemonApiCurrent(
    `/api/v1/shiny${query ? `?${query}` : ""}`,
    (data) => Array.isArray(data.rankings) && Boolean(data.summary),
    (data, meta, current) => ({ data, meta: normalizeCurrentMeta(meta), current }),
  );
}

async function readCurrentPvpRankings(request: NextRequest) {
  const query = forwardedRankedQuery(request, ["league", "search", "role", "page", "limit"]);
  return readPokemonApiCurrent(
    `/api/v1/pvp-rankings${query ? `?${query}` : ""}`,
    (data) => Array.isArray(data.rankings) && Array.isArray(data.formats),
    (data, meta, current) => ({ data, meta: normalizeCurrentMeta(meta), current }),
  );
}

async function readCurrentBestAttackers(request: NextRequest) {
  const query = forwardedRankedQuery(request, [
    "type", "level", "metric", "search", "shadow", "mega", "elite", "class", "movesetClass", "page", "limit", "full",
  ]);
  return readPokemonApiCurrent(
    `/api/v1/best-attackers${query ? `?${query}` : ""}`,
    (data) => Array.isArray(data.rankings) && Boolean(data.options),
    (data, meta, current) => ({ data, meta: normalizeCurrentMeta(meta), current }),
  );
}

async function readCurrentPokemonIdentityMappings(request: NextRequest) {
  const query = forwardedRankedQuery(request, ["status", "search", "page", "limit", "full"]);
  return readPokemonApiCurrent(
    `/api/v1/pokemon-identity-mappings${query ? `?${query}` : ""}`,
    (data) => Array.isArray(data.mappings) && Boolean(data.metadata),
    (data, meta, current) => ({ data, meta: normalizeCurrentMeta(meta), current }),
  );
}

async function readShinyHistory(request: NextRequest) {
  const identity = String(request.nextUrl.searchParams.get("identity") || "").trim();
  const days = Math.min(365, Math.max(1, Number(request.nextUrl.searchParams.get("days")) || 30));
  if (!identity) throw requestError("Identité Shiny requise.", 400);
  const target = new URL(`/api/v1/shiny/${encodeURIComponent(identity)}/history?days=${days}`, pokemonApiBaseUrl);
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) throw requestError("POKEMON_API_ADMIN_SECRET est requis pour l'historique Shiny prive.", 500);
  const response = await fetch(target, { cache: "no-store", headers: { accept: "application/json", "x-api-admin-secret": secret }, signal: AbortSignal.timeout(12_000) });
  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload) throw requestError("Historique Shiny indisponible.", response.status || 502);
  return payload;
}

async function readDatasetHistory(request: NextRequest) {
  const domain = String(request.nextUrl.searchParams.get("domain") || "");
  const allowed = new Set(["raids", "eggs", "max-battles", "rocket", "research", "shiny", "pvp-rankings", "best-attackers", "pokemon-identity-mappings"]);
  if (!allowed.has(domain)) throw requestError("Domaine d'historique invalide.", 400);
  const query = forwardedRankedQuery(request, ["page", "limit", "status"]);
  return readPokemonApiAdmin(`/api/v1/${domain}/history${query ? `?${query}` : ""}`);
}

function readItems() {
  const { dataPath } = require("@/server/pokemon-go/src/lib/data-repository");
  const file = dataPath("items", "items.json");
  let data;
  try {
    data = JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    throw requestError("Le référentiel local des items Pokémon GO est indisponible.", 503);
  }
  if (!Array.isArray(data?.items) || data.items.length === 0) {
    throw requestError("Le référentiel local des items Pokémon GO est vide ou invalide.", 503);
  }
  return {
    data,
    meta: {
      source: "PokemonGo-Data/items/items.json",
      total: data.items.length,
    },
  };
}

function readRocketTexts() {
  const { dataPath } = require("@/server/pokemon-go/src/lib/data-repository");
  const file = dataPath("rocket", "rocketTexts.json");
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return {
    data,
    meta: {
      source: "data/rocket/rocketTexts.json",
      total: Array.isArray(data.rocketTexts) ? data.rocketTexts.length : 0,
    },
  };
}

async function callPokemonApiAdmin(path: string, body?: unknown) {
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) {
    throw requestError("POKEMON_API_ADMIN_SECRET doit être défini côté serveur pour gérer les données Pokémon privées.", 500);
  }

  const target = new URL(path, pokemonApiBaseUrl);
  const response = await fetch(target, {
    method: "POST",
    cache: "no-store",
    signal: AbortSignal.timeout(pokemonAdminMutationTimeoutMs),
    headers: {
      accept: "application/json",
      "x-api-admin-secret": secret,
      ...(body ? { "content-type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: string | { message?: string };
  };
  if (!response.ok) {
    throw requestError(
      typeof payload?.error === "string"
        ? payload.error
        : payload?.error?.message || `PokemonGo-API HTTP ${response.status}`,
      response.status,
    );
  }
  return payload;
}

async function readPokemonApiAdmin(path: string) {
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) {
    throw requestError("POKEMON_API_ADMIN_SECRET doit être défini côté serveur pour lire les données Pokémon privées.", 500);
  }
  const target = new URL(path, pokemonApiBaseUrl);
  const response = await fetch(target, {
    cache: "no-store",
    signal: AbortSignal.timeout(30_000),
    headers: { accept: "application/json", "x-api-admin-secret": secret },
  });
  const payload = (await response.json().catch(() => ({}))) as {
    error?: string | { message?: string };
  };
  if (!response.ok) {
    throw requestError(
      typeof payload?.error === "string"
        ? payload.error
        : payload?.error?.message || `PokemonGo-API HTTP ${response.status}`,
      response.status,
    );
  }
  return payload;
}

async function proxyPokemonApiAdminDownload(path: string) {
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) throw requestError("POKEMON_API_ADMIN_SECRET doit être défini côté serveur pour exporter les données privées.", 500);
  const response = await fetch(new URL(path, pokemonApiBaseUrl), {
    cache: "no-store",
    signal: AbortSignal.timeout(60_000),
    headers: { accept: "application/json,text/csv", "x-api-admin-secret": secret },
  });
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string | { message?: string } } | null;
    throw requestError(
      typeof payload?.error === "string" ? payload.error : payload?.error?.message || `PokemonGo-API HTTP ${response.status}`,
      response.status,
    );
  }
  const download = new NextResponse(await response.arrayBuffer(), { status: 200 });
  download.headers.set("Cache-Control", "private, no-store");
  download.headers.set("Content-Type", response.headers.get("content-type") || "application/octet-stream");
  download.headers.set("Content-Disposition", response.headers.get("content-disposition") || 'attachment; filename="game-master-export.json"');
  return download;
}

const gameMasterReadActions: Record<string, { path: string; query?: string[] }> = {
  "game-master-summary": { path: "/api/v1/admin/game-master/summary" },
  "game-master-categories": { path: "/api/v1/admin/game-master/categories" },
  "game-master-templates": { path: "/api/v1/admin/game-master/templates", query: ["q", "search", "match", "category", "group", "settingType", "pokemonId", "localStatus", "sort", "order", "page", "limit"] },
  "game-master-search": { path: "/api/v1/admin/game-master/search", query: ["q", "search", "match", "category", "group", "settingType", "pokemonId", "localStatus", "sort", "order", "page", "limit"] },
  "game-master-comparison": { path: "/api/v1/admin/game-master/local-comparison", query: ["q", "search", "status", "pokemonId", "form", "costume", "generation", "shiny", "sex", "dataType", "category", "variantCategory", "page", "limit"] },
  "game-master-snapshots": { path: "/api/v1/admin/game-master/snapshots", query: ["page", "limit"] },
  "game-master-runs": { path: "/api/v1/admin/game-master/runs", query: ["page", "limit", "status"] },
  "game-master-diff": { path: "/api/v1/admin/game-master/diff", query: ["to", "snapshotId", "templateId", "type", "category", "page", "limit"] },
};

function gameMasterReadPath(request: NextRequest, action: string) {
  if (action === "game-master-template") {
    const templateId = String(request.nextUrl.searchParams.get("templateId") || "").trim();
    if (!templateId) throw requestError("templateId est requis.", 400);
    return `/api/v1/admin/game-master/templates/${encodeURIComponent(templateId)}`;
  }
  if (action === "game-master-snapshot") {
    const snapshotId = String(request.nextUrl.searchParams.get("snapshotId") || "").trim();
    if (!snapshotId) throw requestError("snapshotId est requis.", 400);
    return `/api/v1/admin/game-master/snapshots/${encodeURIComponent(snapshotId)}`;
  }
  const definition = gameMasterReadActions[action];
  if (!definition) throw requestError("Action Game Master inconnue.", 404);
  const query = forwardedRankedQuery(request, definition.query || []);
  return `${definition.path}${query ? `?${query}` : ""}`;
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

function sourceId(source: Record<string, unknown>) {
  return String(source.id || source.name || source.repo || source.url || "").trim();
}

function sourceSignature(source: Record<string, unknown>) {
  return [
    source.signature,
    source.version,
    source.updatedAt,
    source.status,
    source.message,
  ]
    .filter(Boolean)
    .map(String)
    .join("|");
}

async function readSourceHistory(owner: string) {
  if (!dashboardStoreConfigured()) return [];
  const document = await readDashboardStoreValue(owner, sourceHistoryStoreKey);
  return Array.isArray(document?.value) ? document.value : [];
}

async function recordSourceWatchHistory(
  owner: string,
  sourceWatchPayload: { checkedAt?: string; sources?: Record<string, unknown>[] },
) {
  if (!dashboardStoreConfigured()) return [];

  const currentHistory = (await readSourceHistory(owner)) as Record<string, unknown>[];
  const latestBySource = new Map<string, Record<string, unknown>>();
  for (const item of currentHistory) {
    const id = String(item.sourceId || "");
    if (id && !latestBySource.has(id)) latestBySource.set(id, item);
  }

  const checkedAt = sourceWatchPayload.checkedAt || new Date().toISOString();
  const nextEvents: Record<string, unknown>[] = [];

  for (const source of sourceWatchPayload.sources || []) {
    const id = sourceId(source);
    const signature = sourceSignature(source);
    if (!id || !signature) continue;

    const previous = latestBySource.get(id);
    if (previous?.signature === signature) continue;

    nextEvents.push({
      id: `${id}-${Date.now()}-${nextEvents.length}`,
      checkedAt,
      sourceId: id,
      name: source.name || source.repo || source.url || id,
      category: source.category || source.type || null,
      status: source.status || null,
      version: source.version || null,
      signature,
      previousSignature: previous?.signature || null,
      previousVersion: previous?.version || null,
      updatedAt: source.updatedAt || null,
      message: source.message || null,
      remoteUrl: source.remoteUrl || source.url || null,
    });
  }

  const nextHistory = [...nextEvents, ...currentHistory].slice(0, 500);
  await writeDashboardStoreValue(owner, sourceHistoryStoreKey, nextHistory);
  return nextHistory;
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
      const data = await sourceWatch();
      return json({
        data: {
          ...data,
          history: await recordSourceWatchHistory(session!.email, data),
        },
      });
    }

    if (action === "source-history") {
      return json({ data: await readSourceHistory(session!.email) });
    }

    if (action === "raids") {
      return json({ data: await readCurrentRaids() });
    }

    if (action === "eggs") {
      return json({ data: await readCurrentEggs() });
    }

    if (action === "max-battles") {
      return json({ data: await readCurrentMaxBattles() });
    }

    if (action === "rocket") {
      return json({ data: await readCurrentRocket() });
    }

    if (action === "research") {
      return json({ data: await readCurrentResearch() });
    }

    if (action === "shiny") {
      return json({ data: await readCurrentShiny(request) });
    }

    if (action === "shiny-history") {
      return json({ data: await readShinyHistory(request) });
    }

    if (action === "pvp-rankings") {
      return json({ data: await readCurrentPvpRankings(request) });
    }

    if (action === "best-attackers") {
      return json({ data: await readCurrentBestAttackers(request) });
    }

    if (action === "pokemon-identity-mappings") {
      return json({ data: await readCurrentPokemonIdentityMappings(request) });
    }

    if (action === "dataset-history") {
      return json({ data: await readDatasetHistory(request) });
    }

    if (action === "game-master-export") {
      const query = forwardedRankedQuery(request, ["scope", "format", "includeRaw", "q", "search", "match", "category", "group", "settingType", "pokemonId", "localStatus", "status", "form", "costume", "generation", "shiny", "sex", "dataType", "to", "snapshotId", "templateId", "type", "sort", "order"]);
      return proxyPokemonApiAdminDownload(`/api/v1/admin/game-master/export${query ? `?${query}` : ""}`);
    }

    if (action.startsWith("game-master-")) {
      return json({ data: await readPokemonApiAdmin(gameMasterReadPath(request, action)) });
    }

    if (action === "items") {
      return json({ data: readItems() });
    }

    if (action === "rocket-texts") {
      return json({ data: readRocketTexts() });
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
    assertJsonPayloadSize(body, 1_000_000);
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

    if (action === "regenerate-raids") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/raids/regenerate") });
    }

    if (action === "regenerate-eggs") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/eggs/regenerate") });
    }

    if (action === "regenerate-max-battles") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/max-battles/regenerate") });
    }

    if (action === "regenerate-rocket") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/rocket/regenerate") });
    }

    if (action === "regenerate-research") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/research/regenerate") });
    }

    if (action === "regenerate-shiny") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/shiny/regenerate") });
    }

    if (action === "regenerate-pvp-rankings") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/pvp-rankings/regenerate") });
    }

    if (action === "regenerate-best-attackers") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/best-attackers/regenerate") });
    }

    if (action === "regenerate-pokemon-identity-mappings") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/pokemon-identity-mappings/regenerate") });
    }

    if (action === "regenerate-game-master") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/game-master/regenerate") });
    }

    if (action === "reindex-game-master") {
      return json({ data: await callPokemonApiAdmin("/api/v1/admin/game-master/reindex") });
    }

    if (action === "open-file") {
      return json({ data: workshop.openFile(String(body.file || "")) });
    }

    return json({ error: "Action inconnue." }, { status: 404 });
  } catch (error) {
    return handleServerError(error);
  }
}
