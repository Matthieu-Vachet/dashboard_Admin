import { redirect } from "next/navigation";
import { DiscordBotControlCenter } from "@/components/admin/discord-bot/discord-bot-control-center";
import { getSession } from "@/lib/auth";
import { readDiscordBotOverview } from "@/server/discord-bot/operations-client";
import { requireDiscordBotPermission } from "@/server/discord-bot/permissions";

export const dynamic = "force-dynamic";

const views = ["overview", "servers", "commands", "health"] as const;
type DiscordBotView = (typeof views)[number];

export default async function DiscordBotPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view: requestedView } = await searchParams;
  const view: DiscordBotView = views.some((candidate) => candidate === requestedView)
    ? (requestedView as DiscordBotView)
    : "overview";
  const session = await getSession();
  if (!session) redirect("/login");

  requireDiscordBotPermission(session.role, "discord_bot.overview.read");
  const overview = await readDiscordBotOverview();

  return <DiscordBotControlCenter overview={overview} userEmail={session.email} view={view} />;
}
