import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { readTrainerPokemonImports } from "@/lib/trainer-pokemon/repository";
import { rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "trainer-pokemon-imports", 120, 60_000);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    return trainerPokemonJson({ success: true, data: { imports: await readTrainerPokemonImports(session.email) } });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
