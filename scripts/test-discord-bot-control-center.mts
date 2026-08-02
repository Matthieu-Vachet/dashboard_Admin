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

test("le contrat opérationnel valide un snapshot réel et versionné", () => {
  const result = discordBotOperationsOverviewSchema.safeParse({
    contractVersion: 1,
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
      botVersion: "0.1.0",
      nodeVersion: "v24.0.0",
      discordJsVersion: "14.27.0",
    },
    commands: {
      count: 2,
      names: ["help", "pokemon"],
      schemaHash,
      lastSynchronizedAt: null,
    },
  });

  assert.equal(result.success, true);
});

test("le contrat refuse une version inconnue", () => {
  const result = discordBotOperationsOverviewSchema.safeParse({ contractVersion: 2 });
  assert.equal(result.success, false);
});

test("le contrat refuse un compteur de commandes incohérent", () => {
  const result = discordBotOperationsOverviewSchema.safeParse({
    contractVersion: 1,
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
      botVersion: "0.1.0",
      nodeVersion: "v24.0.0",
      discordJsVersion: "14.27.0",
    },
    commands: {
      count: 3,
      names: ["help", "pokemon"],
      schemaHash,
      lastSynchronizedAt: null,
    },
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
