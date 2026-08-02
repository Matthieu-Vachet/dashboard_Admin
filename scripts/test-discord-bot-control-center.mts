import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";
import contracts from "../src/server/discord-bot/contracts.ts";
import permissions from "../src/server/discord-bot/permissions.ts";

const { discordBotOperationsOverviewSchema } = contracts;
const { hasDiscordBotPermission } = permissions;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const schemaHash = "a".repeat(64);

function validOverview() {
  return {
    contractVersion: "2.0.0",
    observedAt: "2026-08-02T10:00:00.000Z",
    service: {
      status: "online",
      startedAt: "2026-08-02T09:00:00.000Z",
      uptimeSeconds: 3_600,
    },
    discord: {
      state: "connected",
      websocketStatus: "ready",
      pingMs: 42,
      guildCount: 3,
    },
    runtime: {
      botVersion: "0.2.0",
      nodeVersion: "v24.0.0",
      discordJsVersion: "14.27.0",
    },
    commands: {
      count: 1,
      names: ["pokemon"],
      registry: [
        {
          name: "pokemon",
          category: "pokedex",
          description: "Fiche interactive",
          status: "stable",
          version: "0.2.0",
          routes: ["/pokemon/{identifier}"],
          permissions: [],
          responseVisibility: "public",
          autocomplete: true,
          components: true,
          assets: true,
        },
      ],
      categories: { pokedex: 1 },
      status: { stable: 1 },
      schemaHash,
      lastSynchronizedAt: null,
    },
    metrics: {
      executionCount: 4,
      errorCount: 1,
      errorRate: 0.25,
      averageDurationMs: 45,
      lastError: null,
    },
    api: {
      status: "ok",
      database: "connected",
      lastResponseMs: 34,
      lastHttpStatus: 200,
      requestCount: 8,
      errorCount: 0,
    },
    cache: {
      entries: 4,
      maxEntries: 250,
      hitCount: 2,
      deduplicatedRequestCount: 1,
    },
  } as const;
}

test("le contrat opérationnel valide un snapshot réel et versionné", () => {
  const result = discordBotOperationsOverviewSchema.safeParse(validOverview());

  assert.equal(result.success, true);
});

test("le contrat refuse une version inconnue", () => {
  const result = discordBotOperationsOverviewSchema.safeParse({ contractVersion: "3.0.0" });
  assert.equal(result.success, false);
});

test("le contrat refuse un compteur de commandes incohérent", () => {
  const value = validOverview();
  const result = discordBotOperationsOverviewSchema.safeParse({
    ...value,
    commands: { ...value.commands, count: 3 },
  });

  assert.equal(result.success, false);
});

test("les permissions du Sprint 1 restent strictement en lecture seule", () => {
  assert.equal(hasDiscordBotPermission("admin", "discord_bot.overview.read"), true);
  assert.equal(hasDiscordBotPermission("admin", "discord_bot.health.read"), true);
  assert.equal(hasDiscordBotPermission("admin", "discord_bot.commands.read"), true);
  assert.equal(
    hasDiscordBotPermission("admin", "discord_bot.commands.synchronize"),
    false,
  );
  assert.equal(hasDiscordBotPermission("admin", "discord_bot.secrets.rotate"), false);
});

test("le module ne transmet aucun secret au composant React", () => {
  const component = fs.readFileSync(
    path.join(root, "src/components/admin/discord-bot/discord-bot-control-center.tsx"),
    "utf8",
  );
  const page = fs.readFileSync(
    path.join(root, "src/app/(dashboard)/discord-bot/page.tsx"),
    "utf8",
  );
  const client = fs.readFileSync(
    path.join(root, "src/server/discord-bot/operations-client.ts"),
    "utf8",
  );

  assert.doesNotMatch(component, /DISCORD_TOKEN|OPERATIONS_SECRET|NEXT_PUBLIC_/);
  assert.doesNotMatch(page, /DISCORD_TOKEN|OPERATIONS_SECRET|NEXT_PUBLIC_/);
  assert.match(client, /import "server-only"/);
  assert.doesNotMatch(client, /NEXT_PUBLIC_/);
});
