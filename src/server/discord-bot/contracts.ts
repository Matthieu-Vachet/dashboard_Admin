import { z } from "zod";

const commandMetadataSchema = z.object({
  name: z.string().min(1),
  category: z.enum(["pokedex", "combat", "pvp", "collection", "events", "tools", "system"]),
  description: z.string().min(1),
  status: z.enum(["stable", "beta"]),
  version: z.string().regex(/^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/),
  routes: z.array(z.string()),
  permissions: z.array(z.string()),
  responseVisibility: z.enum(["public", "ephemeral"]),
  autocomplete: z.boolean(),
  components: z.boolean(),
  assets: z.boolean(),
});

export const discordBotOperationsOverviewSchema = z
  .object({
    contractVersion: z.literal("2.0.0"),
    observedAt: z.string().datetime(),
    service: z.object({
      status: z.literal("online"),
      startedAt: z.string().datetime(),
      uptimeSeconds: z.number().int().nonnegative(),
    }),
    discord: z.object({
      state: z.enum(["connected", "connecting", "disconnected"]),
      websocketStatus: z.string().min(1),
      pingMs: z.number().nonnegative().nullable(),
      guildCount: z.number().int().nonnegative().nullable(),
    }),
    runtime: z.object({
      botVersion: z.string().min(1),
      nodeVersion: z.string().min(1),
      discordJsVersion: z.string().min(1),
    }),
    commands: z.object({
      count: z.number().int().nonnegative(),
      names: z.array(z.string().min(1)),
      registry: z.array(commandMetadataSchema),
      categories: z.record(z.string(), z.number().int().nonnegative()),
      status: z.record(z.string(), z.number().int().nonnegative()),
      schemaHash: z.string().regex(/^[a-f0-9]{64}$/),
      lastSynchronizedAt: z.string().datetime().nullable(),
    }),
    metrics: z.object({
      executionCount: z.number().int().nonnegative(),
      errorCount: z.number().int().nonnegative(),
      errorRate: z.number().min(0).max(1),
      averageDurationMs: z.number().nonnegative().nullable(),
      lastError: z
        .object({
          observedAt: z.string().datetime(),
          commandName: z.string().nullable(),
          errorName: z.string().min(1),
        })
        .nullable(),
    }),
    api: z.object({
      status: z.enum(["ok", "degraded", "unknown"]),
      database: z.string().nullable(),
      lastResponseMs: z.number().nonnegative().nullable(),
      lastHttpStatus: z.number().int().nullable(),
      requestCount: z.number().int().nonnegative(),
      errorCount: z.number().int().nonnegative(),
    }),
    cache: z.object({
      entries: z.number().int().nonnegative(),
      maxEntries: z.number().int().positive(),
      hitCount: z.number().int().nonnegative(),
      deduplicatedRequestCount: z.number().int().nonnegative(),
    }),
  })
  .superRefine((overview, context) => {
    if (
      overview.commands.count === overview.commands.names.length &&
      overview.commands.count === overview.commands.registry.length
    ) {
      return;
    }
    context.addIssue({
      code: "custom",
      path: ["commands", "count"],
      message: "doit correspondre aux noms et au registre des commandes",
    });
  });

export type DiscordBotOperationsOverview = z.infer<
  typeof discordBotOperationsOverviewSchema
>;

export type DiscordBotOverviewResult =
  | {
      readonly status: "available";
      readonly configuration: "ready";
      readonly data: DiscordBotOperationsOverview;
    }
  | {
      readonly status: "unavailable";
      readonly configuration: "missing" | "invalid" | "ready";
      readonly reason: string;
    };
