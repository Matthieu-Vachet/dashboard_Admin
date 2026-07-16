import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { getEventArchiveAdmin } from "@/lib/events-archive-store";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "events-archive-admin-detail", 120, 60_000);
    if (!await getSession()) return NextResponse.json({ success: false, error: "Accès dashboard requis." }, { status: 401 });
    const { id } = await context.params;
    const event = await getEventArchiveAdmin(decodeURIComponent(id));
    if (!event) return NextResponse.json({ success: false, error: "Événement archivé introuvable." }, { status: 404 });
    return NextResponse.json({ success: true, data: event }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) {
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : "Archive Events indisponible." }, { status: 500 });
  }
}
