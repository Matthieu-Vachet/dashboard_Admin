import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import {
  dashboardStoreConfigured,
  readDashboardStoreValue,
  recordDashboardApiCall,
  writeDashboardStoreValue,
} from "@/lib/dashboard-store";
import {
  calculateCatalogIvRank,
  prepareBattleBuild,
  prepareDefaultBattleBuild,
  readPvpCatalog,
  type BattleBuildConfig,
} from "@/lib/pokemon-go-pvp-engine/server-data";
import {
  simulateMatrixBattle,
  simulateMultiBattle,
  simulateShieldMatrix,
  simulateSingleBattle,
} from "@/lib/pokemon-go-pvp-engine";
import {
  assertJsonPayloadSize,
  assertSameOrigin,
  rateLimit,
} from "@/lib/security";

export const runtime = "nodejs";
export const maxDuration = 60;

const historyKey = "matweb.pvp.simulations";

const ivsSchema = z.object({
  attack: z.number().int().min(0).max(15),
  defense: z.number().int().min(0).max(15),
  stamina: z.number().int().min(0).max(15),
});

const buildSchema = z.object({
  canonicalId: z.string().trim().min(1).max(160),
  level: z
    .number()
    .min(1)
    .max(55)
    .refine(
      (level) => Number.isInteger(level * 2),
      "Le niveau doit avancer par demi-niveaux.",
    ),
  ivs: ivsSchema,
  shadow: z.boolean().default(false),
  fastMoveId: z.string().trim().min(1).max(100),
  chargedMoveIds: z
    .array(z.string().trim().min(1).max(100))
    .min(1)
    .max(2)
    .refine(
      (ids) => new Set(ids).size === ids.length,
      "Les attaques chargées doivent être distinctes.",
    ),
  shields: z.number().int().min(0).max(2),
  startingEnergy: z.number().int().min(0).max(100).optional(),
  startingHp: z.number().int().min(1).max(999).optional(),
  startingHpPercent: z.number().min(1).max(100).optional(),
  startingStages: z
    .object({
      attack: z.number().int().min(-4).max(4),
      defense: z.number().int().min(-4).max(4),
    })
    .optional(),
});

const strategySchema = z
  .object({
    baiting: z.enum(["off", "selective", "on"]).optional(),
    optimizeTiming: z.boolean().optional(),
    buffMode: z.enum(["deterministic", "guaranteed", "disabled"]).optional(),
  })
  .optional();

const simulationSchema = z.object({
  action: z.literal("simulate"),
  leagueId: z.string().trim().min(1).max(100),
  pokemon: z.tuple([buildSchema, buildSchema]),
  strategy: strategySchema,
  includeShieldMatrix: z.boolean().default(true),
});

const ivRankSchema = z.object({
  action: z.literal("iv-rank"),
  leagueId: z.string().trim().min(1).max(100),
  canonicalId: z.string().trim().min(1).max(160),
  ivs: ivsSchema.optional(),
});

const multiSchema = z
  .object({
    action: z.literal("multi"),
    leagueId: z.string().trim().min(1).max(100),
    subject: buildSchema,
    opponents: z.array(buildSchema).min(1).max(100).optional(),
    opponentIds: z
      .array(z.string().trim().min(1).max(160))
      .min(1)
      .max(100)
      .optional(),
    strategy: strategySchema,
  })
  .refine(
    (value) => Boolean(value.opponents?.length || value.opponentIds?.length),
    "Au moins un adversaire est requis.",
  );

const matrixSchema = z
  .object({
    action: z.literal("matrix"),
    leagueId: z.string().trim().min(1).max(100),
    groupA: z.array(buildSchema).min(1).max(20).optional(),
    groupB: z.array(buildSchema).min(1).max(20).optional(),
    groupAIds: z
      .array(z.string().trim().min(1).max(160))
      .min(1)
      .max(20)
      .optional(),
    groupBIds: z
      .array(z.string().trim().min(1).max(160))
      .min(1)
      .max(20)
      .optional(),
    strategy: strategySchema,
  })
  .refine(
    (value) => Boolean(value.groupA?.length || value.groupAIds?.length),
    "Le groupe A est requis.",
  )
  .refine(
    (value) => Boolean(value.groupB?.length || value.groupBIds?.length),
    "Le groupe B est requis.",
  );

const saveSchema = z.object({
  action: z.literal("save"),
  configuration: z.record(z.string(), z.unknown()),
  result: z.record(z.string(), z.unknown()),
});

const requestSchema = z.discriminatedUnion("action", [
  simulationSchema,
  ivRankSchema,
  multiSchema,
  matrixSchema,
  saveSchema,
]);

const errorMessages: Record<string, string> = {
  POKEMON_NOT_FOUND: "Pokémon introuvable dans PokemonGo-Data.",
  MOVE_NOT_AVAILABLE:
    "Cette attaque n’est pas disponible pour la forme sélectionnée.",
  INVALID_IV: "Les IV doivent être des entiers compris entre 0 et 15.",
  INVALID_LEVEL: "Le niveau demandé est invalide.",
  CP_LIMIT_EXCEEDED: "Le Pokémon dépasse la limite de PC de la ligue.",
  INVALID_SHIELD_COUNT:
    "Le nombre de boucliers doit être compris entre 0 et 2.",
  RULESET_NOT_FOUND: "Le format PvP demandé est introuvable.",
  SHADOW_FORM_NOT_AVAILABLE:
    "La forme Shadow n’est pas disponible pour ce Pokémon ou ce format.",
  POKEMON_NOT_ELIGIBLE:
    "Ce Pokémon n’est pas éligible au format ou à la coupe sélectionnée.",
  SIMULATION_FAILED: "La simulation n’a pas pu aboutir.",
};

function json(data: unknown, init?: ResponseInit) {
  const response = NextResponse.json(data, init);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

function errorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return json(
      {
        success: false,
        error: {
          code: "VALIDATION_FAILED",
          message: "Configuration de bataille invalide.",
          issues: error.issues,
        },
      },
      { status: 400 },
    );
  }
  const raw = error instanceof Error ? error.message : "SIMULATION_FAILED";
  const code = raw.split(":")[0] || "SIMULATION_FAILED";
  const status =
    code === "POKEMON_NOT_FOUND"
      ? 404
      : code === "RULESET_NOT_FOUND"
        ? 404
        : code === "MOVE_NOT_AVAILABLE" ||
            code.startsWith("INVALID_") ||
            code === "CP_LIMIT_EXCEEDED" ||
            code === "SHADOW_FORM_NOT_AVAILABLE" ||
            code === "POKEMON_NOT_ELIGIBLE"
          ? 422
          : raw.includes("MongoDB")
            ? 503
            : 500;
  return json(
    {
      success: false,
      error: {
        code,
        message:
          errorMessages[code] ||
          (status < 500 ? raw : errorMessages.SIMULATION_FAILED),
      },
    },
    { status },
  );
}

async function context(leagueId: string) {
  const catalog = await readPvpCatalog();
  const league = catalog.leagues.find((item) => item.id === leagueId);
  if (!league) throw new Error("RULESET_NOT_FOUND");
  return { catalog, league };
}

async function builds(
  configs: BattleBuildConfig[],
  league: Awaited<ReturnType<typeof context>>["league"],
) {
  return Promise.all(
    configs.map((config) => prepareBattleBuild(config, league)),
  );
}

function publicCatalog(catalog: Awaited<ReturnType<typeof readPvpCatalog>>) {
  return {
    ...catalog,
    pokemon: catalog.pokemon.map((pokemon) => ({
      canonicalId: pokemon.canonicalId,
      formId: pokemon.formId,
      form: pokemon.form,
      pokemonClass: pokemon.pokemonClass,
      dexId: pokemon.dexId,
      names: pokemon.names,
      types: pokemon.types,
      availability: { shadow: pokemon.availability.shadow },
      identity: {
        canonicalId: pokemon.identity.canonicalId,
        image: pokemon.identity.image,
        shinyImage: pokemon.identity.shinyImage,
        resolutionStatus: pokemon.identity.resolutionStatus,
        assetResolution: pokemon.identity.assetResolution,
      },
      moves: pokemon.moves,
      recommended: pokemon.recommended,
      searchText: pokemon.searchText,
    })),
  };
}

export async function GET(request: NextRequest) {
  try {
    rateLimit(request, "pvp-simulator-read", 180, 60_000);
    const session = await getSession();
    if (!session)
      return json(
        {
          success: false,
          error: { code: "AUTH_REQUIRED", message: "Accès dashboard requis." },
        },
        { status: 401 },
      );
    await recordDashboardApiCall(
      session.email,
      "/api/admin/pvp-simulator",
      "GET",
    );
    const action = request.nextUrl.searchParams.get("action") || "catalog";
    if (action === "history") {
      const document = await readDashboardStoreValue(session.email, historyKey);
      return json({
        success: true,
        data: {
          configured: dashboardStoreConfigured(),
          items: Array.isArray(document?.value) ? document.value : [],
          updatedAt: document?.updatedAt || null,
        },
      });
    }
    const catalog = await readPvpCatalog();
    return json({ success: true, data: publicCatalog(catalog) });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    rateLimit(request, "pvp-simulator-write", 120, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session)
      return json(
        {
          success: false,
          error: { code: "AUTH_REQUIRED", message: "Accès dashboard requis." },
        },
        { status: 401 },
      );
    await recordDashboardApiCall(
      session.email,
      "/api/admin/pvp-simulator",
      "POST",
    );
    const raw = await request.json().catch(() => ({}));
    assertJsonPayloadSize(raw, 2_000_000);
    const body = requestSchema.parse(raw);

    if (body.action === "save") {
      if (!dashboardStoreConfigured())
        throw new Error("MongoDB dashboard non configuré.");
      const existing = await readDashboardStoreValue(session.email, historyKey);
      const items = Array.isArray(existing?.value)
        ? (existing.value as Array<Record<string, unknown>>)
        : [];
      const resultId = String(body.result.id || `battle-${Date.now()}`);
      const record = {
        id: resultId,
        user: session.email,
        createdAt: new Date().toISOString(),
        league: body.configuration.leagueId || null,
        configuration: body.configuration,
        result: body.result,
        engineVersion:
          (body.result.versions as Record<string, unknown> | undefined)
            ?.engine || null,
        dataVersion:
          (body.result.versions as Record<string, unknown> | undefined)?.data ||
          null,
      };
      const next = [
        record,
        ...items.filter((item) => item.id !== resultId),
      ].slice(0, 80);
      await writeDashboardStoreValue(session.email, historyKey, next);
      return json({ success: true, data: record }, { status: 201 });
    }

    if (body.action === "iv-rank") {
      const rank = await calculateCatalogIvRank(
        body.canonicalId,
        body.leagueId,
        body.ivs,
      );
      return json({ success: true, data: rank });
    }

    const { catalog, league } = await context(body.leagueId);
    const common = {
      leagueId: league.id,
      cpCap: league.cpCap,
      typeCatalog: catalog.types,
      strategy: body.strategy,
      dataVersion: catalog.versions.data,
    };

    if (body.action === "simulate") {
      const prepared = await builds(body.pokemon, league);
      const input = {
        ...common,
        pokemon: prepared as [(typeof prepared)[0], (typeof prepared)[1]],
      };
      const result = simulateSingleBattle(input);
      const shieldMatrix = body.includeShieldMatrix
        ? simulateShieldMatrix(input)
        : null;
      return json({ success: true, data: { result, shieldMatrix } });
    }

    if (body.action === "multi") {
      const subject = await prepareBattleBuild(body.subject, league);
      const opponents = body.opponents?.length
        ? await builds(body.opponents, league)
        : await Promise.all(
            (body.opponentIds || []).map((id) =>
              prepareDefaultBattleBuild(id, league, body.subject.shields),
            ),
          );
      const result = simulateMultiBattle({ ...common, subject, opponents });
      return json({ success: true, data: result });
    }

    const [groupA, groupB] = await Promise.all([
      body.groupA?.length
        ? builds(body.groupA, league)
        : Promise.all(
            (body.groupAIds || []).map((id) =>
              prepareDefaultBattleBuild(id, league),
            ),
          ),
      body.groupB?.length
        ? builds(body.groupB, league)
        : Promise.all(
            (body.groupBIds || []).map((id) =>
              prepareDefaultBattleBuild(id, league),
            ),
          ),
    ]);
    const result = simulateMatrixBattle({ ...common, groupA, groupB });
    return json({ success: true, data: result });
  } catch (error) {
    return errorResponse(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    rateLimit(request, "pvp-simulator-delete", 60, 60_000);
    assertSameOrigin(request);
    const session = await getSession();
    if (!session)
      return json(
        {
          success: false,
          error: { code: "AUTH_REQUIRED", message: "Accès dashboard requis." },
        },
        { status: 401 },
      );
    await recordDashboardApiCall(
      session.email,
      "/api/admin/pvp-simulator",
      "DELETE",
    );
    const parsedId = z
      .string()
      .min(1)
      .max(200)
      .safeParse(request.nextUrl.searchParams.get("id"));
    if (!parsedId.success)
      return json(
        {
          success: false,
          error: {
            code: "VALIDATION_FAILED",
            message: "Identifiant de simulation invalide.",
          },
        },
        { status: 400 },
      );
    const id = parsedId.data;
    const existing = await readDashboardStoreValue(session.email, historyKey);
    const items = Array.isArray(existing?.value)
      ? (existing.value as Array<Record<string, unknown>>)
      : [];
    await writeDashboardStoreValue(
      session.email,
      historyKey,
      items.filter((item) => item.id !== id),
    );
    return json({ success: true, data: { id } });
  } catch (error) {
    return errorResponse(error);
  }
}
