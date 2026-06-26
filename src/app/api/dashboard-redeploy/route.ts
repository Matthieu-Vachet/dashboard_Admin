import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";
import { assertSameOrigin, rateLimit } from "@/lib/security";

const deployHistoryKey = "matweb.dashboard.deployHistory";
const defaultDataRepo = "https://github.com/Matthieu-Vachet/PokemonGo-Data.git";
const dataSnapshotPath = path.join(process.cwd(), ".data", "PokemonGo-Data", ".dashboard-data-snapshot.json");

type DeployHistoryEvent = Record<string, unknown>;

type DataSnapshot = {
  repo?: string;
  ref?: string;
  branch?: string;
  commit?: string;
  source?: string;
  syncedAt?: string;
};

type GithubFile = {
  filename: string;
  status?: string;
  additions?: number;
  deletions?: number;
  changes?: number;
  raw_url?: string;
};

type DataChangeFile = {
  path: string;
  status: string;
  category: string;
  label: string;
  dexId: string | null;
  additions: number;
  deletions: number;
  changes: number;
  rawUrl: string | null;
};

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function deployHookUrl() {
  return (
    process.env.DASHBOARD_VERCEL_DEPLOY_HOOK_URL ||
    process.env.VERCEL_DEPLOY_HOOK_URL ||
    ""
  ).trim();
}

function dataRepo() {
  return (process.env.POKEMON_GO_DATA_REPO || defaultDataRepo).trim();
}

function dataRef() {
  return (process.env.POKEMON_GO_DATA_REF || "main").trim();
}

function githubToken() {
  return (
    process.env.POKEMON_GO_DATA_TOKEN ||
    process.env.GH_TOKEN ||
    process.env.GITHUB_TOKEN ||
    ""
  ).trim();
}

function parseGithubRepo(repo: string) {
  const httpsMatch = repo.match(/^https:\/\/github\.com\/([^/]+)\/([^/.]+)(?:\.git)?$/i);
  if (httpsMatch) return { owner: httpsMatch[1], repo: httpsMatch[2] };

  const sshMatch = repo.match(/^git@github\.com:([^/]+)\/([^/.]+)(?:\.git)?$/i);
  if (sshMatch) return { owner: sshMatch[1], repo: sshMatch[2] };

  return null;
}

async function readDataSnapshot(): Promise<DataSnapshot | null> {
  try {
    const content = await fs.readFile(dataSnapshotPath, "utf8");
    const parsed = JSON.parse(content) as DataSnapshot;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

async function githubJson<T>(url: string): Promise<T> {
  const headers: Record<string, string> = {
    accept: "application/vnd.github+json",
    "user-agent": "dashboard-admin-pokemon-data-history",
    "x-github-api-version": "2022-11-28",
  };
  const token = githubToken();
  if (token) headers.authorization = `Bearer ${token}`;

  const response = await fetch(url, {
    headers,
    cache: "no-store",
  });
  const text = await response.text();
  let payload: unknown = null;

  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = text || null;
  }

  if (!response.ok) {
    const message =
      payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message?: unknown }).message)
        : `GitHub HTTP ${response.status}`;
    throw new Error(`Comparaison PokemonGo-Data impossible: ${message}`);
  }

  return payload as T;
}

function trackedDataFile(file: GithubFile) {
  const filename = file.filename || "";
  return (
    filename.endsWith(".json") &&
    (filename.startsWith("pokemon/") ||
      filename.startsWith("pokemon-forms/") ||
      filename.startsWith("pokemon-assets/") ||
      filename.startsWith("moves/") ||
      filename.startsWith("types/") ||
      filename.startsWith("weather/") ||
      filename.startsWith("generations/") ||
      filename.startsWith("stickers/") ||
      filename.startsWith("source-watch/"))
  );
}

function dataFileCategory(filename: string) {
  if (filename.startsWith("pokemon-assets/")) return "assets";
  if (filename.startsWith("pokemon-forms/")) return "form";
  if (filename.startsWith("pokemon/")) return "pokemon";
  if (filename.startsWith("source-watch/")) return "source";
  return "catalogue";
}

function fileLabel(filename: string) {
  const basename = filename.split("/").pop() || filename;
  return basename.replace(/\.assets\.json$/i, "").replace(/\.json$/i, "");
}

function fileDexId(filename: string) {
  const match = filename.match(/(?:^|\/)(\d{4})-/);
  return match?.[1] || null;
}

function normalizeChangedFile(file: GithubFile): DataChangeFile {
  return {
    path: file.filename,
    status: file.status || "modified",
    category: dataFileCategory(file.filename),
    label: fileLabel(file.filename),
    dexId: fileDexId(file.filename),
    additions: Number(file.additions || 0),
    deletions: Number(file.deletions || 0),
    changes: Number(file.changes || 0),
    rawUrl: file.raw_url || null,
  };
}

async function describePokemonDataChanges() {
  const repoInfo = parseGithubRepo(dataRepo());
  const ref = dataRef();
  const snapshot = await readDataSnapshot();

  if (!repoInfo) {
    return {
      available: false,
      reason: "Depot PokemonGo-Data non reconnu comme depot GitHub.",
      snapshot,
      repo: dataRepo(),
      ref,
    };
  }

  const latest = await githubJson<{ sha?: string; html_url?: string }>(
    `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/commits/${encodeURIComponent(ref)}`,
  );
  const targetCommit = latest.sha || "";
  const baseCommit = snapshot?.commit || "";
  const repoUrl = `https://github.com/${repoInfo.owner}/${repoInfo.repo}`;

  if (!baseCommit) {
    return {
      available: true,
      status: "no-base-snapshot",
      repo: repoUrl,
      ref,
      baseCommit: null,
      targetCommit,
      targetUrl: latest.html_url || `${repoUrl}/commit/${targetCommit}`,
      trackedFiles: 0,
      files: [],
      note: "Le Dashboard n'avait pas encore de snapshot de commit data. Le prochain redeploiement servira de base.",
    };
  }

  if (baseCommit === targetCommit) {
    return {
      available: true,
      status: "up-to-date",
      repo: repoUrl,
      ref,
      baseCommit,
      targetCommit,
      compareUrl: `${repoUrl}/compare/${baseCommit}...${targetCommit}`,
      trackedFiles: 0,
      files: [],
      note: "PokemonGo-Data est deja aligne avec le Dashboard deploye.",
    };
  }

  const compare = await githubJson<{
    html_url?: string;
    total_commits?: number;
    files?: GithubFile[];
  }>(
    `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/compare/${encodeURIComponent(baseCommit)}...${encodeURIComponent(targetCommit)}`,
  );
  const files = (compare.files || []).filter(trackedDataFile).map(normalizeChangedFile);
  const limitedFiles = files.slice(0, 220);

  return {
    available: true,
    status: "changed",
    repo: repoUrl,
    ref,
    baseCommit,
    targetCommit,
    compareUrl: compare.html_url || `${repoUrl}/compare/${baseCommit}...${targetCommit}`,
    totalCommits: Number(compare.total_commits || 0),
    totalFiles: compare.files?.length || 0,
    trackedFiles: files.length,
    pokemonFiles: files.filter((file) => file.category === "pokemon" || file.category === "form").length,
    assetFiles: files.filter((file) => file.category === "assets").length,
    catalogFiles: files.filter((file) => file.category === "catalogue" || file.category === "source").length,
    files: limitedFiles,
    truncated: files.length > limitedFiles.length,
  };
}

async function readDeployHistory(owner: string) {
  if (!dashboardStoreConfigured()) return [];
  const document = await readDashboardStoreValue(owner, deployHistoryKey);
  return Array.isArray(document?.value) ? document.value : [];
}

async function recordDeployEvent(owner: string, event: DeployHistoryEvent) {
  if (!dashboardStoreConfigured()) return [];
  const currentHistory = (await readDeployHistory(owner)) as DeployHistoryEvent[];
  const nextHistory = [event, ...currentHistory].slice(0, 120);
  await writeDashboardStoreValue(owner, deployHistoryKey, nextHistory);
  return nextHistory;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Redéploiement impossible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "dashboard-redeploy-read", 60, 60_000);
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });

    await recordDashboardApiCall(session.email, "/api/dashboard-redeploy", "GET");

    return json({
      data: {
        configured: Boolean(deployHookUrl()),
        dataSnapshot: await readDataSnapshot(),
        history: await readDeployHistory(session.email),
      },
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "dashboard-redeploy-write", 4, 10 * 60_000);
    assertSameOrigin(request);

    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });

    await recordDashboardApiCall(session.email, "/api/dashboard-redeploy", "POST");

    const hookUrl = deployHookUrl();
    if (!hookUrl) {
      return json(
        {
          error:
            "Deploy Hook Vercel manquant. Ajoute DASHBOARD_VERCEL_DEPLOY_HOOK_URL dans les variables d'environnement du Dashboard.",
        },
        { status: 503 },
      );
    }

    const triggeredAt = new Date().toISOString();
    const dataChanges = await describePokemonDataChanges();
    const response = await fetch(hookUrl, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "dashboard-admin",
        reason: "Manual PokemonGo-Data refresh",
        triggeredAt,
      }),
      cache: "no-store",
    });
    const responseText = await response.text();
    let deployPayload: unknown = null;

    try {
      deployPayload = responseText ? JSON.parse(responseText) : null;
    } catch {
      deployPayload = responseText || null;
    }

    const event = {
      id: `dashboard-redeploy-${Date.now()}`,
      type: "dashboard-redeploy",
      status: response.ok ? "requested" : "failed",
      triggeredAt,
      triggeredBy: session.email,
      dataChanges,
      httpStatus: response.status,
      response: deployPayload,
    };
    const history = await recordDeployEvent(session.email, event);

    if (!response.ok) {
      return json(
        {
          error: `Vercel a refusé le redeploy (${response.status}).`,
          data: { event, history },
        },
        { status: 502 },
      );
    }

    return json({
      data: {
        event,
        history,
        message: "Redéploiement demandé. Vercel va rebuild le Dashboard avec les derniers JSON.",
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
