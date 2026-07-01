import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { importPokemonEvents, recordDashboardApiCall } from "@/lib/dashboard-store";
import { scrapeLeekDuckEvents } from "@/lib/leekduck-events-scraper";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Scrape LeekDuck events indisponible.";
  const status =
    error && typeof error === "object" && "status" in error
      ? Number((error as { status?: unknown }).status) || 500
      : 500;

  return json({ success: false, error: message }, { status });
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "pokemon-events-scrape", 12, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ success: false, error: "Accès dashboard requis." }, { status: 401 });

    await recordDashboardApiCall(session.email, "/api/admin/events/scrape", "POST");
    const scraped = await scrapeLeekDuckEvents();
    if (!scraped.events.length) {
      return json({ success: false, error: "No events parsed from LeekDuck" }, { status: 502 });
    }

    const imported = await importPokemonEvents(session.email, { events: scraped.events });
    return json({
      success: true,
      data: {
        ...scraped.report,
        mongoUpdated: true,
        import: {
          matched: imported.matched,
          modified: imported.modified,
          inserted: imported.inserted,
          total: imported.total,
        },
        events: imported.events,
      },
    });
  } catch (error) {
    return serverError(error);
  }
}
