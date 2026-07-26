import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { refreshTrainerPokemonIdentityResolution } from "@/lib/trainer-pokemon/repository";
import { assertSameOrigin, rateLimit } from "@/lib/security";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    rateLimit(request, "trainer-pokemon-resolve", 6, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    return trainerPokemonJson({ success: true, data: await refreshTrainerPokemonIdentityResolution(session.email) });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
