export type DiscordBotRole = "admin";

export type DiscordBotPermission =
  | "discord_bot.overview.read"
  | "discord_bot.health.read"
  | "discord_bot.commands.read"
  | "discord_bot.commands.synchronize"
  | "discord_bot.configuration.write"
  | "discord_bot.secrets.rotate";

const permissionMatrix: Record<
  DiscordBotPermission,
  readonly DiscordBotRole[]
> = {
  "discord_bot.overview.read": ["admin"],
  "discord_bot.health.read": ["admin"],
  "discord_bot.commands.read": ["admin"],
  "discord_bot.commands.synchronize": [],
  "discord_bot.configuration.write": [],
  "discord_bot.secrets.rotate": [],
};

export function hasDiscordBotPermission(
  role: DiscordBotRole,
  permission: DiscordBotPermission,
): boolean {
  return permissionMatrix[permission].includes(role);
}

export function requireDiscordBotPermission(
  role: DiscordBotRole,
  permission: DiscordBotPermission,
): void {
  if (hasDiscordBotPermission(role, permission)) return;

  const error = new Error("Droits Discord Bot insuffisants.");
  (error as Error & { status?: number }).status = 403;
  throw error;
}

export const discordBotPermissionSummary = [
  {
    permission: "Lecture de la vue d’ensemble, de la santé et des commandes",
    status: "active",
  },
  {
    permission: "Synchronisation des commandes slash",
    status: "désactivée au Sprint 1",
  },
  {
    permission: "Écriture de configuration et rotation des secrets",
    status: "désactivée au Sprint 1",
  },
] as const;
