import { NextRequest } from "next/server";
import { getSession } from "@/lib/auth";
import { trainerPokemonJson, trainerPokemonServerError } from "@/lib/trainer-pokemon/http";
import { readTrainerPokemon, type TrainerPokemonQuery } from "@/lib/trainer-pokemon/repository";
import { rateLimit } from "@/lib/security";
import type { TrainerPokemonSortField } from "@/types/admin/trainer-pokemon";

export const dynamic = "force-dynamic";

function optionalNumber(value: string | null) {
  if (value === null || value === "") return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "trainer-pokemon-read", 180, 60_000);
    const session = await getSession();
    if (!session || session.role !== "admin") return trainerPokemonJson({ success: false, error: { code: "FORBIDDEN", message: "Droits administrateur requis." } }, { status: 403 });
    const params = request.nextUrl.searchParams;
    const query: TrainerPokemonQuery = {
      page: optionalNumber(params.get("page")), limit: optionalNumber(params.get("limit")),
      search: params.get("search") || undefined,
      shiny: (params.get("shiny") || "all") as TrainerPokemonQuery["shiny"],
      lucky: (params.get("lucky") || "all") as TrainerPokemonQuery["lucky"],
      gender: params.get("gender") || undefined, alignment: params.get("alignment") || undefined,
      costume: (params.get("costume") || "all") as TrainerPokemonQuery["costume"],
      specialForm: (params.get("specialForm") || "all") as TrainerPokemonQuery["specialForm"],
      perfect: params.get("perfect") === "true",
      ivMin: optionalNumber(params.get("ivMin")), ivMax: optionalNumber(params.get("ivMax")),
      cpMin: optionalNumber(params.get("cpMin")), cpMax: optionalNumber(params.get("cpMax")),
      weightMin: optionalNumber(params.get("weightMin")), weightMax: optionalNumber(params.get("weightMax")),
      heightMin: optionalNumber(params.get("heightMin")), heightMax: optionalNumber(params.get("heightMax")),
      sort: (params.get("sort") || "dexNumber") as TrainerPokemonSortField,
      order: params.get("order") === "desc" ? "desc" : "asc",
    };
    return trainerPokemonJson({ success: true, data: await readTrainerPokemon(session.email, query) });
  } catch (error) {
    return trainerPokemonServerError(error);
  }
}
