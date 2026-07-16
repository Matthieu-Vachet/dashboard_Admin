import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import {
  completeDatasetRun,
  failDatasetRun,
  hashDataset,
  importPokemonEvents,
  listPokemonEvents,
  recordDashboardApiCall,
  startDatasetRun,
  type DashboardDatasetRunDocument,
} from "@/lib/dashboard-store";
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

function normalizeDiagnosticText(value: unknown) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
}

function unmatchedContext(sourceName: string, events: Array<Record<string, unknown>>, reason: string) {
  const needle = normalizeDiagnosticText(sourceName);
  const event = events.find((candidate) => normalizeDiagnosticText(JSON.stringify(candidate)).includes(needle));
  const eventRecord = event || {};
  const pokemonCandidates = [
    ...((eventRecord.featuredPokemon as Array<Record<string, unknown>> | undefined) || []),
    ...((eventRecord.wildSpawns as Array<Record<string, unknown>> | undefined) || []),
    ...((eventRecord.raids as Array<Record<string, unknown>> | undefined) || []),
    ...((eventRecord.eggs as Array<Record<string, unknown>> | undefined) || []),
    ...((eventRecord.researchRewards as Array<Record<string, unknown>> | undefined) || []),
  ];
  const pokemon = pokemonCandidates.find((candidate) => normalizeDiagnosticText(candidate.name) === needle);
  const reward = ((eventRecord.rewards as Array<Record<string, unknown>> | undefined) || [])
    .find((candidate) => normalizeDiagnosticText(candidate.sourceName || candidate.text) === needle);
  const source = pokemon || reward || {};
  return {
    sourceId: source.id || eventRecord.id || null,
    sourceName,
    sourceForm: source.form || null,
    sourceCostume: source.costume || null,
    sourceImage: source.image || null,
    reason,
    candidates: [],
    localFile: null,
    sourcePayload: {
      eventId: eventRecord.id || null,
      eventTitle: eventRecord.title || null,
      eventUrl: eventRecord.sourceUrl || null,
      source,
    },
  };
}

export async function POST(request: NextRequest) {
  let run: DashboardDatasetRunDocument | null = null;
  const startedAt = Date.now();
  try {
    rateLimit(request, "pokemon-events-scrape", 12, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session) return json({ success: false, error: "Accès dashboard requis." }, { status: 401 });

    await recordDashboardApiCall(session.email, "/api/admin/events/scrape", "POST");
    const previous = await listPokemonEvents({ includeArchived: true });
    const previousSourceEvents = previous.events.filter((event) => event.source === "leekduck");
    run = await startDatasetRun({
      datasetKey: "events-calendar",
      provider: "leekduck-events",
      sourceUrl: "https://leekduck.com/events/",
      hashBefore: previousSourceEvents.length ? hashDataset(previousSourceEvents) : null,
      totalBefore: previousSourceEvents.length,
      diffUnavailableReason: previous.sourceRun ? null : "Aucune exécution précédente enregistrée.",
    });
    const scraped = await scrapeLeekDuckEvents();
    if (!scraped.events.length) {
      throw Object.assign(new Error("No events parsed from LeekDuck"), { status: 502 });
    }

    const imported = await importPokemonEvents(session.email, {
      events: scraped.events,
      replaceSource: "leekduck",
    });
    const unmatchedEntries = [
      ...scraped.report.unmatchedPokemon.map((sourceName) => unmatchedContext(sourceName, scraped.events as unknown as Array<Record<string, unknown>>, "missing-local-pokemon")),
      ...scraped.report.unmatchedItems.map((sourceName) => unmatchedContext(sourceName, scraped.events as unknown as Array<Record<string, unknown>>, "missing-local-item")),
    ];
    const changed = Boolean(imported.inserted || imported.modified || imported.deleted);
    const warnings = scraped.report.detailErrors ? [`${scraped.report.detailErrors} page(s) de détail n'ont pas pu être lues.`] : [];
    const completedAt = new Date();
    const sourceRun = await completeDatasetRun(run._id!, {
      status: changed ? (unmatchedEntries.length || warnings.length ? "partial" : "success") : "unchanged",
      completedAt,
      durationMs: completedAt.getTime() - startedAt,
      retrievedAt: new Date(scraped.report.updatedAt),
      savedAt: completedAt,
      hashAfter: hashDataset(scraped.events),
      changed,
      totalAfter: scraped.events.length,
      added: imported.inserted,
      removed: imported.deleted,
      modified: imported.modified,
      matchedCount: scraped.report.pokemonMatched,
      unmatchedCount: unmatchedEntries.length,
      warningsCount: warnings.length,
      errorsCount: 0,
      unmatchedEntries,
      warnings,
      errors: [],
      diffUnavailableReason: null,
    });
    return json({
      success: true,
      data: {
        ...scraped.report,
        mongoUpdated: true,
        import: {
          matched: imported.matched,
          modified: imported.modified,
          inserted: imported.inserted,
          deleted: imported.deleted,
          total: imported.total,
        },
        events: imported.events,
        sourceRun,
      },
    });
  } catch (error) {
    if (run?._id) await failDatasetRun(run._id, error).catch(() => undefined);
    return serverError(error);
  }
}
