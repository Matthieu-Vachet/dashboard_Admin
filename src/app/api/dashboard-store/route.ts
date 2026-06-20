import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  normalizeDashboardStoreKey,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Erreur stockage dashboard.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ error: message }, { status });
}

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-store", "GET");

    const key = normalizeDashboardStoreKey(request.nextUrl.searchParams.get("key"));
    const document = await readDashboardStoreValue(session.email, key);

    return json({
      data: {
        configured: dashboardStoreConfigured(),
        key,
        value: document?.value ?? null,
        updatedAt: document?.updatedAt ?? null,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) return json({ error: "Accès dashboard requis." }, { status: 401 });
    await recordDashboardApiCall(session.email, "/api/dashboard-store", "PUT");

    const body = (await request.json().catch(() => ({}))) as {
      key?: unknown;
      value?: unknown;
    };
    const key = normalizeDashboardStoreKey(body.key);
    const result = await writeDashboardStoreValue(session.email, key, body.value ?? null);

    return json({ data: { configured: true, ...result } });
  } catch (error) {
    return serverError(error);
  }
}
