import { redirect } from "next/navigation";
import { DiscordBotControlCenter } from "@/components/admin/discord-bot/discord-bot-control-center";
import { getSession } from "@/lib/auth";
import { readDiscordBotOverview } from "@/server/discord-bot/operations-client";
import { requireDiscordBotPermission } from "@/server/discord-bot/permissions";

export const dynamic = "force-dynamic";

export default async function DiscordBotPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  requireDiscordBotPermission(session.role, "discord_bot.overview.read");
  const overview = await readDiscordBotOverview();

  return <DiscordBotControlCenter overview={overview} userEmail={session.email} />;
}
