/* eslint-disable @typescript-eslint/no-require-imports */
import fs from "node:fs";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";

export const maxDuration = 300;

const draftsStoreKey = "matweb.pokemon.jsonBuilderDrafts";
const historyStoreKey = "matweb.pokemon.jsonBuilderHistory";

type JsonBuilderBody = {
  action?: unknown;
  draft?: unknown;
  token?: unknown;
  drafts?: unknown;
  commit?: unknown;
  push?: unknown;
};

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const status = error && typeof error === "object" && "status" in error
    ? Number((error as { status?: unknown }).status) || 500
    : 500;
  const payload: Record<string, unknown> = {
    error: error instanceof Error ? error.message : "JSON Builder indisponible.",
  };
  if (error && typeof error === "object" && "code" in error) payload.code = (error as { code?: unknown }).code;
  if (error && typeof error === "object" && "details" in error) payload.details = (error as { details?: unknown }).details;
  if (error && typeof error === "object" && "rollback" in error) payload.rollback = (error as { rollback?: unknown }).rollback;
  return json(payload, { status });
}

function modules() {
  const repository = require("@/server/pokemon-go/src/lib/data-repository");
  const transaction = require("@/server/pokemon-go/json-builder/transaction-engine");
  const contractSource = require("@/server/pokemon-go/json-builder/contract-source");
  return { repository, transaction, contractSource };
}

function localDevelopRepository(runtimeRoot: string) {
  if (process.env.NODE_ENV === "production") return null;
  const candidates = [
    process.env.POKEMON_GO_DATA_WRITE_DIR,
    process.env.POKEMON_GO_DATA_DIR,
    path.resolve(process.cwd(), "..", "PokemonGo-Data"),
    runtimeRoot,
  ].filter(Boolean) as string[];
  for (const candidate of candidates) {
    const root = path.resolve(candidate);
    try {
      const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
      if (packageJson.name === "pokemon-go-data" && fs.existsSync(path.join(root, ".git"))) return root;
    } catch {
      // Candidat suivant.
    }
  }
  return null;
}

function signingSecret() {
  if (process.env.NODE_ENV === "production" && !process.env.JSON_BUILDER_SIGNING_SECRET && !process.env.SESSION_SECRET) {
    const error = new Error("JSON_BUILDER_SIGNING_SECRET ou SESSION_SECRET est requis.");
    (error as Error & { status?: number; code?: string }).status = 503;
    (error as Error & { status?: number; code?: string }).code = "JSON_BUILDER_SIGNING_SECRET_MISSING";
    throw error;
  }
  return process.env.JSON_BUILDER_SIGNING_SECRET || process.env.SESSION_SECRET || "json-builder-local-development-only";
}

async function storeValue(owner: string, key: string) {
  if (!dashboardStoreConfigured()) return null;
  return (await readDashboardStoreValue(owner, key))?.value ?? null;
}

async function bootstrap(owner: string) {
  const { repository, transaction, contractSource } = modules();
  const runtimeRoot = repository.getPokemonGoDataRuntimeRoot();
  const writeRoot = localDevelopRepository(runtimeRoot);
  const contract = await contractSource.resolveContractRoot(runtimeRoot);
  const [drafts, history] = await Promise.all([
    storeValue(owner, draftsStoreKey),
    storeValue(owner, historyStoreKey),
  ]);
  return {
    ...transaction.publicContract(runtimeRoot, contract.root),
    contractSource: { source: contract.source, ref: contract.ref },
    repository: transaction.repositoryState(runtimeRoot),
    writeMode: {
      enabled: Boolean(writeRoot),
      mode: writeRoot ? "local-develop-transaction" : "dry-run-only",
      reason: writeRoot ? null : "L’écriture distante reste désactivée ; utilisez un dépôt Data local sur develop.",
    },
    persistence: { configured: dashboardStoreConfigured(), drafts: drafts || [], history: history || [] },
  };
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "json-builder-read", 120, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/json-builder:bootstrap", "GET");
    return json({ data: await bootstrap(session.email) });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "json-builder-write", 40, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    const body = (await request.json().catch(() => ({}))) as JsonBuilderBody;
    assertJsonPayloadSize(body, 1_500_000);
    const action = String(body.action || "dry-run");
    await recordDashboardApiCall(session.email, `/api/json-builder:${action}`, "POST");
    const { repository, transaction, contractSource } = modules();
    const runtimeRoot = repository.getPokemonGoDataRuntimeRoot();

    if (action === "save-drafts") {
      const drafts = Array.isArray(body.drafts) ? body.drafts.slice(0, 50) : [];
      if (!dashboardStoreConfigured()) return json({ data: { configured: false, drafts } });
      await writeDashboardStoreValue(session.email, draftsStoreKey, drafts);
      return json({ data: { configured: true, drafts } });
    }

    const writeRoot = localDevelopRepository(runtimeRoot);
    if (action === "commit" && !writeRoot) {
      return json({ error: "Écriture indisponible : un dépôt PokémonGo-Data local sur develop est requis.", code: "JSON_BUILDER_WRITE_UNAVAILABLE" }, { status: 503 });
    }
    const dataRoot = writeRoot || runtimeRoot;
    const contract = await contractSource.resolveContractRoot(dataRoot);
    if (action === "dry-run") {
      const result = transaction.buildDryRun({
        root: dataRoot,
        contractRoot: contract.root,
        draft: body.draft,
        owner: session.email,
        secret: signingSecret(),
        requireDevelop: Boolean(writeRoot),
      });
      const publicResult = { ...result };
      delete publicResult._planned;
      return json({ data: publicResult });
    }
    if (action === "commit") {
      const result = transaction.commitDryRun({
        root: dataRoot,
        contractRoot: contract.root,
        draft: body.draft,
        token: String(body.token || ""),
        owner: session.email,
        secret: signingSecret(),
        commit: body.commit !== false,
        push: body.push === true,
      });
      const existing = await storeValue(session.email, historyStoreKey);
      const history = [
        { ...result, createdAt: new Date().toISOString() },
        ...(Array.isArray(existing) ? existing : []),
      ].slice(0, 100);
      if (dashboardStoreConfigured()) await writeDashboardStoreValue(session.email, historyStoreKey, history);
      return json({ data: result });
    }
    return json({ error: "Action JSON Builder inconnue." }, { status: 400 });
  } catch (error) {
    return serverError(error);
  }
}
