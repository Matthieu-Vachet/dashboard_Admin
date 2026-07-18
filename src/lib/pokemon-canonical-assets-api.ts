type CanonicalAssetRequest = {
  provider: string;
  rawAlias: string;
  shiny?: boolean;
  isFemale?: boolean;
  pokemonId?: number;
  form?: string | null;
  costume?: string | null;
  transformation?: string | null;
};

export type CanonicalAssetResolution = {
  request: CanonicalAssetRequest;
  status: "matched" | "unmatched" | "ambiguous";
  reason: string | null;
  identityResolution: {
    status: string;
    strategy?: string;
    confidence?: number;
    reason?: string;
    reasonDetails?: string;
    identity?: Record<string, unknown>;
    candidates?: Array<Record<string, unknown>>;
  };
  assetResolution: Record<string, unknown> | null;
};

const apiBase = process.env.POKEMON_API_PUBLIC_URL || "https://pokemon-go-api.vercel.app";

function adminSecret() {
  const secret = process.env.POKEMON_API_ADMIN_SECRET || process.env.API_ADMIN_SECRET;
  if (!secret) {
    const error = new Error("POKEMON_API_ADMIN_SECRET est requis pour résoudre les identités Pokémon.");
    (error as Error & { status?: number }).status = 500;
    throw error;
  }
  return secret;
}

export async function resolveCanonicalPokemonAssets(
  requests: CanonicalAssetRequest[],
  fetchImpl: typeof fetch = fetch,
) {
  if (!requests.length) return [];
  if (requests.length > 5_000) throw new Error("Une résolution canonique est limitée à 5 000 alias par exécution.");
  const chunks = Array.from({ length: Math.ceil(requests.length / 500) }, (_, index) => requests.slice(index * 500, (index + 1) * 500));
  const pages = await Promise.all(chunks.map(async (chunk) => {
    const response = await fetchImpl(new URL("/api/v1/admin/pokemon-identities/resolve-assets", apiBase), {
      method: "POST",
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(25_000),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "x-api-admin-secret": adminSecret(),
      },
      body: JSON.stringify({ requests: chunk }),
    });
    const payload = await response.json().catch(() => null) as { data?: CanonicalAssetResolution[]; error?: string } | null;
    if (!response.ok) {
      const error = new Error(payload?.error || `Résolution canonique indisponible (HTTP ${response.status}).`);
      (error as Error & { status?: number }).status = response.status;
      throw error;
    }
    if (!Array.isArray(payload?.data) || payload.data.length !== chunk.length) {
      throw new Error("La réponse de résolution canonique est incomplète.");
    }
    return payload.data;
  }));
  const resolved = pages.flat();
  if (resolved.length !== requests.length) {
    throw new Error("La réponse de résolution canonique est incomplète.");
  }
  return resolved;
}
