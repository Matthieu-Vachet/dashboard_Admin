import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { rollbackTrainerPokemon } from "@/lib/trainer-pokemon/repository";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    rateLimit(request, "trainer-pokemon-rollback", 10, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    const { id } = await params;
    return trainerPokemonJson({ success: true, data: await rollbackTrainerPokemon(session.email, id) });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
