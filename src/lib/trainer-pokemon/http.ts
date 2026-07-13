import { NextResponse } from "next/server";
import { TrainerPokemonValidationError } from "@/lib/trainer-pokemon/schema";

export function trainerPokemonJson(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  response.headers.set("Vary", "Cookie");
  return response;
}

export function trainerPokemonServerError(error: unknown) {
  if (error instanceof TrainerPokemonValidationError) {
    return trainerPokemonJson({
      success: false,
      error: { code: error.code, message: error.message, issues: error.issues },
    }, { status: error.status });
  }
  const details = error && typeof error === "object" ? error as { status?: number; code?: string; issues?: unknown } : {};
  const status = Number(details.status) || 500;
  const safeStatus = status >= 400 && status <= 599 ? status : 500;
  const message = error instanceof Error && safeStatus < 500
    ? error.message
    : safeStatus === 503
      ? "MongoDB Dashboard n’est pas configuré."
      : safeStatus === 502
        ? "Les référentiels canoniques Pokémon sont temporairement indisponibles."
        : "Une erreur serveur empêche de traiter la collection.";
  return trainerPokemonJson({
    success: false,
    error: {
      code: details.code || "TRAINER_POKEMON_SERVER_ERROR",
      message,
      ...(Array.isArray(details.issues) ? { issues: details.issues } : {}),
    },
  }, { status: safeStatus });
}
