import "server-only";

import {
  discordBotOperationsOverviewSchema,
  type DiscordBotOverviewResult,
} from "@/server/discord-bot/contracts";

type OperationsConfiguration = {
  readonly endpoint: string;
  readonly sharedSecret: string;
};

export async function readDiscordBotOverview(
  environment: NodeJS.ProcessEnv = process.env,
): Promise<DiscordBotOverviewResult> {
  const configuration = readConfiguration(environment);
  if ("result" in configuration) return configuration.result;

  try {
    const response = await fetch(configuration.endpoint, {
      method: "GET",
      cache: "no-store",
      redirect: "error",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${configuration.sharedSecret}`,
      },
      signal: AbortSignal.timeout(5_000),
    });

    if (!response.ok) {
      return {
        status: "unavailable",
        configuration: "ready",
        reason:
          response.status === 401 || response.status === 403
            ? "La liaison opérationnelle a été refusée par le bot."
            : `Le service opérationnel du bot a répondu avec le statut ${response.status}.`,
      };
    }

    const payload = await response.json().catch(() => null);
    const parsed = discordBotOperationsOverviewSchema.safeParse(
      payload && typeof payload === "object" && "data" in payload
        ? payload.data
        : null,
    );
    if (!parsed.success) {
      return {
        status: "unavailable",
        configuration: "ready",
        reason: "Le service du bot a répondu avec un contrat incompatible.",
      };
    }

    return { status: "available", configuration: "ready", data: parsed.data };
  } catch (error) {
    return {
      status: "unavailable",
      configuration: "ready",
      reason:
        error instanceof Error && error.name === "TimeoutError"
          ? "Le service opérationnel du bot n’a pas répondu dans le délai prévu."
          : "Le service opérationnel du bot est actuellement inaccessible.",
    };
  }
}

function readConfiguration(
  environment: NodeJS.ProcessEnv,
): OperationsConfiguration | { readonly result: DiscordBotOverviewResult } {
  const endpoint = environment.DISCORD_BOT_OPERATIONS_URL?.trim();
  const sharedSecret = environment.DISCORD_BOT_OPERATIONS_SECRET?.trim();

  if (!endpoint && !sharedSecret) {
    return {
      result: {
        status: "unavailable",
        configuration: "missing",
        reason: "La liaison opérationnelle du bot n’est pas encore configurée.",
      },
    };
  }

  if (!endpoint || !sharedSecret || sharedSecret.length < 32) {
    return {
      result: {
        status: "unavailable",
        configuration: "invalid",
        reason: "La configuration serveur de la liaison opérationnelle est incomplète.",
      },
    };
  }

  try {
    const url = new URL(endpoint);
    const localHttp =
      url.protocol === "http:" &&
      (url.hostname === "127.0.0.1" || url.hostname === "localhost");
    if ((url.protocol !== "https:" && !localHttp) || url.username || url.password) {
      throw new Error("URL opérationnelle non sécurisée");
    }
    return { endpoint: url.toString(), sharedSecret };
  } catch {
    return {
      result: {
        status: "unavailable",
        configuration: "invalid",
        reason: "L’URL serveur du service opérationnel est invalide.",
      },
    };
  }
}
