type ApiNames = { French?: string; English?: string };

export type TrainerPokemonSpeciesReference = {
  key?: string;
  id?: string;
  formId?: string;
  dexNr?: number;
  form?: string;
  names?: ApiNames;
  data?: {
    names?: ApiNames;
    assets?: { image?: string | null; shinyImage?: string | null };
  };
};

export type TrainerPokemonMoveReference = {
  id?: string;
  slug?: string;
  legacySlugs?: string[];
  kind?: string;
  type?: string;
  names?: ApiNames;
  data?: { names?: ApiNames; type?: string; kind?: string };
};

export type TrainerPokemonTypeReference = {
  id?: string;
  names?: ApiNames;
  assets?: { icon?: string | null };
  data?: { names?: ApiNames; assets?: { icon?: string | null } };
};

export type TrainerPokemonReferences = {
  pokemon: TrainerPokemonSpeciesReference[];
  moves: TrainerPokemonMoveReference[];
  types: TrainerPokemonTypeReference[];
  fetchedAt: string;
  source: string;
};

type PaginatedPayload<T> = { data?: T[]; meta?: { pages?: number } };

const defaultPokemonApiPublicUrl = "https://pokemon-go-api.vercel.app";
const cacheTtlMs = 10 * 60 * 1000;
let referencesPromise: Promise<TrainerPokemonReferences> | null = null;
let referencesCachedAt = 0;

function pokemonApiBaseUrl() {
  return process.env.POKEMON_API_PUBLIC_URL
    || (process.env.VERCEL === "1" ? undefined : process.env.POKEMON_API_URL)
    || defaultPokemonApiPublicUrl;
}

async function fetchJson<T>(url: URL): Promise<T> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    const error = new Error(`Référentiel canonique indisponible (${response.status}) : ${url.pathname}.`);
    (error as Error & { status?: number; code?: string }).status = 502;
    (error as Error & { status?: number; code?: string }).code = "TRAINER_POKEMON_REFERENCES_UNAVAILABLE";
    throw error;
  }
  return response.json() as Promise<T>;
}

async function fetchPaginated<T>(pathname: string, extra: Record<string, string> = {}) {
  const firstUrl = new URL(pathname, pokemonApiBaseUrl());
  firstUrl.searchParams.set("page", "1");
  firstUrl.searchParams.set("limit", "100");
  for (const [key, value] of Object.entries(extra)) firstUrl.searchParams.set(key, value);
  const first = await fetchJson<PaginatedPayload<T>>(firstUrl);
  const pages = Math.max(1, Number(first.meta?.pages) || 1);
  const remaining = await Promise.all(
    Array.from({ length: pages - 1 }, async (_, index) => {
      const url = new URL(firstUrl);
      url.searchParams.set("page", String(index + 2));
      return fetchJson<PaginatedPayload<T>>(url);
    }),
  );
  return [first, ...remaining].flatMap((payload) => Array.isArray(payload.data) ? payload.data : []);
}

async function loadReferences(): Promise<TrainerPokemonReferences> {
  const [pokemon, moves, typesPayload] = await Promise.all([
    fetchPaginated<TrainerPokemonSpeciesReference>("/api/v1/pokemon", { include: "data" }),
    fetchPaginated<TrainerPokemonMoveReference>("/api/v1/moves"),
    fetchJson<{ data?: TrainerPokemonTypeReference[] }>(new URL("/api/v1/types", pokemonApiBaseUrl())),
  ]);
  if (!pokemon.length || !moves.length || !typesPayload.data?.length) {
    const error = new Error("Les référentiels canoniques Pokémon, attaques ou types sont vides.");
    (error as Error & { status?: number; code?: string }).status = 502;
    (error as Error & { status?: number; code?: string }).code = "TRAINER_POKEMON_REFERENCES_EMPTY";
    throw error;
  }
  return {
    pokemon,
    moves,
    types: typesPayload.data,
    fetchedAt: new Date().toISOString(),
    source: pokemonApiBaseUrl(),
  };
}

export async function fetchTrainerPokemonReferences() {
  if (!referencesPromise || Date.now() - referencesCachedAt > cacheTtlMs) {
    referencesCachedAt = Date.now();
    referencesPromise = loadReferences().catch((error) => {
      referencesPromise = null;
      referencesCachedAt = 0;
      throw error;
    });
  }
  return referencesPromise;
}
