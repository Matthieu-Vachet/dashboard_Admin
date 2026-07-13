import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { importTrainerPokemon, prepareTrainerPokemonImport } from "@/lib/trainer-pokemon/repository";
import { assertJsonPayloadSize, assertSameOrigin, rateLimit } from "@/lib/security";
import { trainerPokemonImportMaxBytes } from "@/lib/trainer-pokemon/schema";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "trainer-pokemon-import", 12, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    const body = await request.json().catch(() => null) as { mode?: unknown; payload?: unknown } | null;
    if (!body) return trainerPokemonJson({ success: false, error: { code: "INVALID_JSON", message: "Le corps de la requête n’est pas un JSON valide." } }, { status: 400 });
    assertJsonPayloadSize(body, trainerPokemonImportMaxBytes);
    const mode = body.mode === "commit" ? "commit" : body.mode === "preview" ? "preview" : null;
    if (!mode) return trainerPokemonJson({ success: false, error: { code: "INVALID_IMPORT_MODE", message: "Le mode doit valoir preview ou commit." } }, { status: 400 });
    if (mode === "preview") {
      const prepared = await prepareTrainerPokemonImport(body.payload);
      return trainerPokemonJson({ success: true, data: prepared.preview });
    }
    const result = await importTrainerPokemon(session.email, body.payload);
    return trainerPokemonJson({ success: true, data: result }, { status: 201 });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
