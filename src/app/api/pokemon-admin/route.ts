/* eslint-disable @typescript-eslint/no-require-imports */
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

type JsonValue = Record<string, unknown>;

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
  const session = await getSession();
  return Boolean(session);
}

function loadAdminModules() {
  const { buildChecklist, detailForKey } = require("@/server/pokemon-go/apps/checklist/server/engine");
  const { sourceWatch } = require("@/server/pokemon-go/apps/checklist/server/source-watch");
  const workshop = require("@/server/pokemon-go/apps/checklist/server/workshop");
  const { summarizeChecklist } = require("@/server/pokemon-go/src/lib/site-dashboard");

  return { buildChecklist, detailForKey, sourceWatch, summarizeChecklist, workshop };
}

function bootstrapResponse(customRules: unknown = null) {
  const { buildChecklist, summarizeChecklist, workshop } = loadAdminModules();
  const rules = Array.isArray(customRules) ? customRules : null;
  const entries = buildChecklist(rules);
  const dataCatalog = workshop.catalog();

  return {
    viewer: { admin: true },
    entries,
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
    const authenticated = await requireDashboardSession();
    const action = getAction(request);

    if (action === "session") {
      return json({ data: { authenticated } });
    }

    if (!authenticated) {
      return json({ error: "Accès dashboard requis." }, { status: 401 });
    }

    const { detailForKey, sourceWatch, workshop } = loadAdminModules();

    if (action === "bootstrap") {
      return json({ data: bootstrapResponse() });
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
      return json({ data: workshop.repoHistory() });
    }

    if (action === "url-audit") {
      return json({ data: await workshop.auditUrls(request.nextUrl.searchParams.get("key") || "") });
    }

    if (action === "custom-rules") {
      return json({ data: workshop.customRules() });
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
    const body = (await request.json().catch(() => ({}))) as JsonValue;
    const authenticated = await requireDashboardSession();
    const action = getAction(request, body);

    if (!authenticated) {
      return json({ error: "Accès dashboard requis." }, { status: 401 });
    }

    const { workshop } = loadAdminModules();

    if (action === "bootstrap") {
      return json({ data: bootstrapResponse(body.customRules) });
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

    if (action === "save-rule") {
      return json({ data: workshop.saveCustomRule(body) });
    }

    if (action === "toggle-rule") {
      return json({ data: workshop.toggleCustomRule(body) });
    }

    if (action === "delete-rule") {
      return json({ data: workshop.deleteCustomRule(body) });
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
