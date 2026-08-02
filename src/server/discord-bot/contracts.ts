import { z } from "zod";

export const discordBotOperationsOverviewSchema = z
  .object({
    contractVersion: z.literal(1),
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
      schemaHash: z.string().regex(/^[a-f0-9]{64}$/),
      lastSynchronizedAt: z.string().datetime().nullable(),
    }),
  })
  .superRefine((overview, context) => {
    if (overview.commands.count === overview.commands.names.length) return;
    context.addIssue({
      code: "custom",
      path: ["commands", "count"],
      message: "doit correspondre au nombre de commandes nommées",
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
