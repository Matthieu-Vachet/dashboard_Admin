import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { readTrainerPokemonIdentityDiagnostics } from "@/lib/trainer-pokemon/repository";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

function optionalNumber(value: string | null) {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "trainer-pokemon-diagnostics", 120, 60_000);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    const params = request.nextUrl.searchParams;
    return trainerPokemonJson({ success: true, data: await readTrainerPokemonIdentityDiagnostics(session.email, {
      snapshotId: params.get("snapshotId") || undefined,
      search: params.get("search") || undefined,
      reason: params.get("reason") || undefined,
      page: optionalNumber(params.get("page")),
      limit: optionalNumber(params.get("limit")),
    }) });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
