export type PokemonChecklistEntry = {
  kind: string;
  name: string;
  generation: number;
  complete: boolean;
  quality?: {
    score: number;
  };
  assets?: {
    go?: boolean;
    goShiny?: boolean;
    home?: boolean;
    homeShiny?: boolean;
    incompletePairs?: number;
  };
};

export type PokemonChecklistPayload = {
  data?: {
    entries?: PokemonChecklistEntry[];
    summary?: {
      total: number;
      complete: number;
      issues: number;
      generations: Array<{
        generation: number;
        count: number;
        complete: number;
        issues: number;
        percent: number;
      }>;
      kinds: Array<{
        id: string;
        count: number;
        complete: number;
        issues: number;
        percent: number;
      }>;
    };
    catalog?: {
      types: number;
      weather: number;
      stickers: number;
      moves: number;
    };
  };
};

export type PokemonMetrics = {
  source: "live" | "fallback";
  status: string;
  detail?: string;
  total: number;
  complete: number;
  issues: number;
  quality: number;
  catalog: {
    types: number;
    weather: number;
    stickers: number;
    moves: number;
  };
  generations: Array<{
    name: string;
    completion: number;
    entries: number;
  }>;
  kinds: Array<{
    name: string;
    value: number;
  }>;
};

const fallbackMetrics: PokemonMetrics = {
  source: "fallback",
  status: "fallback",
  detail: "Données de secours chargées.",
  total: 1602,
  complete: 1602,
  issues: 0,
  quality: 100,
  catalog: {
    types: 18,
    weather: 7,
    stickers: 1667,
    moves: 467,
  },
  generations: [
    { name: "G1", completion: 100, entries: 222 },
    { name: "G2", completion: 100, entries: 143 },
    { name: "G3", completion: 100, entries: 203 },
    { name: "G4", completion: 100, entries: 172 },
    { name: "G5", completion: 100, entries: 206 },
    { name: "G6", completion: 100, entries: 181 },
    { name: "G7", completion: 100, entries: 152 },
    { name: "G8", completion: 100, entries: 171 },
    { name: "G9", completion: 100, entries: 152 },
  ],
  kinds: [
    { name: "pokemon", value: 1024 },
    { name: "form", value: 367 },
    { name: "dynamax", value: 127 },
    { name: "mega", value: 55 },
    { name: "gigantamax", value: 29 },
  ],
};

export async function fetchPokemonMetrics(): Promise<PokemonMetrics> {
  const endpoint =
    process.env.POKEMON_API_URL ||
    "https://pokemon-go-7r5q2j05a-matthieu-vachets-projects.vercel.app/api/checklist-v3";
  const bypassToken =
    process.env.POKEMON_API_BYPASS_TOKEN || process.env.VERCEL_PROTECTION_BYPASS_TOKEN;

  try {
    const url = new URL(endpoint);

    if (bypassToken) {
      url.searchParams.set("x-vercel-set-bypass-cookie", "true");
      url.searchParams.set("x-vercel-protection-bypass", bypassToken);
    }

    const response = await fetch(url.toString(), {
      next: { revalidate: 300 },
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      return {
        ...fallbackMetrics,
        status: `HTTP ${response.status}`,
        detail:
          response.status === 401
            ? "L'API Pokémon est encore protégée par Vercel. Le token bypass est absent, invalide ou ne vient pas du projet API Pokémon."
            : "L'API Pokémon n'a pas renvoyé une réponse exploitable.",
      };
    }

    const payload = (await response.json()) as PokemonChecklistPayload;
    const summary = payload.data?.summary;

    if (!summary) {
      return {
        ...fallbackMetrics,
        status: "format inattendu",
        detail: "La réponse JSON ne contient pas data.summary.",
      };
    }

    return {
      source: "live",
      status: "live",
      total: summary.total,
      complete: summary.complete,
      issues: summary.issues,
      quality: summary.total ? Math.round((summary.complete / summary.total) * 100) : 0,
      catalog: payload.data?.catalog || fallbackMetrics.catalog,
      generations: summary.generations.map((item) => ({
        name: `G${item.generation}`,
        completion: item.percent,
        entries: item.count,
      })),
      kinds: summary.kinds.map((item) => ({
        name: item.id,
        value: item.count,
      })),
    };
  } catch (error) {
    return {
      ...fallbackMetrics,
      status: "erreur réseau",
      detail: error instanceof Error ? error.message : "Impossible de joindre l'API Pokémon.",
    };
  }
}
