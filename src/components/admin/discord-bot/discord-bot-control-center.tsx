import Link from "next/link";
import {
  Activity,
  Bot,
  Braces,
  Clock3,
  Command,
  Gauge,
  KeyRound,
  LockKeyhole,
  Radio,
  RefreshCw,
  Server,
  ShieldCheck,
  Unplug,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EmptyState } from "@/components/admin/shared/state-system";
import type { DiscordBotOverviewResult } from "@/server/discord-bot/contracts";
import { discordBotPermissionSummary } from "@/server/discord-bot/permissions";
import { cn } from "@/lib/cn";

const sections = [
  "Vue d’ensemble",
  "Serveurs",
  "Commandes",
  "Statistiques",
  "Logs",
  "Testeur",
  "Santé",
  "Configuration",
  "Sécurité",
] as const;

export function DiscordBotControlCenter({
  overview,
  userEmail,
}: {
  overview: DiscordBotOverviewResult;
  userEmail: string;
}) {
  const data = overview.status === "available" ? overview.data : null;
  const connected = data?.discord.state === "connected";

  return (
    <div className="space-y-4 sm:space-y-5">
      <Card tone="strong" className="relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(88,242,169,.18),transparent_42%),radial-gradient(circle_at_88%_8%,rgba(32,211,255,.14),transparent_34%)]" />
        <CardHeader
          className="relative z-10"
          eyebrow="Écosystème Pokémon GO"
          action={
            <Button asChild size="sm">
              <Link href="/discord-bot">
                <RefreshCw size={15} aria-hidden="true" /> Rafraîchir
              </Link>
            </Button>
          }
        >
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg border border-emerald-300/25 bg-emerald-400/10 text-emerald-100">
              <Bot size={24} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <CardTitle className="text-2xl sm:text-3xl">Discord Bot</CardTitle>
              <CardDescription className="max-w-3xl">
                Supervision en lecture seule du client Discord officiel de l’API Pokémon GO.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      <ModuleNavigation />

      {overview.status === "unavailable" ? (
        <Card className="border-warning/30 bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <Unplug className="mt-0.5 shrink-0 text-warning" size={20} aria-hidden="true" />
            <div className="min-w-0">
              <p className="type-title-inline text-warning-foreground">
                État du bot non disponible
              </p>
              <p className="type-body-strong mt-1 text-muted">{overview.reason}</p>
              <p className="type-caption-strong mt-2 text-muted">
                Aucune valeur de remplacement n’est calculée. Les cartes concernées restent explicitement indisponibles.
              </p>
            </div>
          </div>
        </Card>
      ) : null}

      <section aria-labelledby="discord-bot-status-title" className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <h2 id="discord-bot-status-title" className="sr-only">État du bot Discord</h2>
        <BotMetricCard
          icon={Radio}
          label="Connexion Discord"
          value={data ? connectionLabel(data.discord.state) : null}
          detail={data ? `WebSocket : ${data.discord.websocketStatus}` : undefined}
          tone={connected ? "green" : data ? "amber" : "neutral"}
        />
        <BotMetricCard
          icon={Gauge}
          label="Latence Discord"
          value={data?.discord.pingMs == null ? null : `${Math.round(data.discord.pingMs)} ms`}
          detail="Mesure du WebSocket actif"
          tone={data?.discord.pingMs == null ? "neutral" : "cyan"}
        />
        <BotMetricCard
          icon={Command}
          label="Commandes enregistrées"
          value={data?.commands.count ?? null}
          detail="Registre chargé par le processus"
          tone={data ? "violet" : "neutral"}
        />
        <BotMetricCard
          icon={Server}
          label="Serveurs Discord"
          value={data?.discord.guildCount ?? null}
          detail="Serveurs visibles par le bot"
          tone={data?.discord.guildCount == null ? "neutral" : "green"}
        />
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
        <Card className="p-4 sm:p-5">
          <CardHeader eyebrow="Runtime observé">
            <CardTitle>Santé et versions</CardTitle>
            <CardDescription>
              Informations renvoyées par le processus du bot, jamais lues depuis le navigateur.
            </CardDescription>
          </CardHeader>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <RuntimeRow icon={Bot} label="Version du bot" value={data?.runtime.botVersion ?? null} />
            <RuntimeRow icon={Braces} label="Node.js" value={data?.runtime.nodeVersion ?? null} />
            <RuntimeRow icon={Activity} label="discord.js" value={data?.runtime.discordJsVersion ?? null} />
            <RuntimeRow
              icon={Clock3}
              label="Uptime du processus"
              value={data ? formatDuration(data.service.uptimeSeconds) : null}
            />
            <RuntimeRow
              icon={RefreshCw}
              label="Dernière observation"
              value={data ? formatDateTime(data.observedAt) : null}
            />
            <RuntimeRow
              icon={RefreshCw}
              label="Dernière synchro des commandes"
              value={data?.commands.lastSynchronizedAt ? formatDateTime(data.commands.lastSynchronizedAt) : null}
            />
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <CardHeader eyebrow="Contrat opérationnel">
            <CardTitle>Registre du bot</CardTitle>
            <CardDescription>
              Métadonnées publiées par le bot ; le Dashboard ne copie pas ses définitions.
            </CardDescription>
          </CardHeader>
          {data ? (
            <div className="mt-5 space-y-4">
              <div className="flex flex-wrap gap-2">
                {data.commands.names.map((name) => (
                  <Badge key={name} tone="cyan">/{name}</Badge>
                ))}
              </div>
              <div className="rounded-lg border border-line bg-surface-recessed p-3">
                <p className="type-overline text-muted">Hash du schéma</p>
                <code className="mt-2 block break-all font-mono text-xs font-bold text-foreground">
                  {data.commands.schemaHash}
                </code>
              </div>
              <p className="type-caption-strong text-muted">
                Contrat v{data.contractVersion} · démarré {formatDateTime(data.service.startedAt)}
              </p>
            </div>
          ) : (
            <EmptyState
              className="mt-5"
              title="Métrique non disponible"
              description="Le registre sera affiché lorsque le service opérationnel du bot sera joignable."
            />
          )}
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="p-4 sm:p-5">
          <CardHeader eyebrow="Autorisations">
            <CardTitle>Accès du Dashboard</CardTitle>
            <CardDescription>
              Session actuelle : {userEmail}. Le Sprint 1 ne permet aucune mutation Discord.
            </CardDescription>
          </CardHeader>
          <div className="mt-5 space-y-2">
            {discordBotPermissionSummary.map((item) => (
              <div key={item.permission} className="flex flex-col gap-2 rounded-lg border border-line bg-surface-flat p-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="type-body-strong text-foreground">{item.permission}</span>
                <Badge tone={item.status === "active" ? "green" : "neutral"}>{item.status}</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 sm:p-5">
          <CardHeader eyebrow="Sécurité">
            <CardTitle>Frontière serveur-à-serveur</CardTitle>
            <CardDescription>
              Le navigateur ne reçoit ni token Discord, ni secret de liaison, ni accès direct à Discord.
            </CardDescription>
          </CardHeader>
          <div className="mt-5 space-y-3">
            <SecurityRow icon={ShieldCheck} label="Contrat en lecture seule" />
            <SecurityRow icon={LockKeyhole} label="Secret conservé côté serveur" />
            <SecurityRow icon={KeyRound} label="Token Discord jamais transmis" />
          </div>
          <Badge className="mt-5" tone={overview.configuration === "ready" ? "green" : "amber"}>
            Liaison {configurationLabel(overview.configuration)}
          </Badge>
        </Card>
      </section>
    </div>
  );
}

function ModuleNavigation() {
  return (
    <Card className="overflow-x-auto p-2" aria-label="Sections du centre de contrôle Discord Bot">
      <ol className="flex min-w-max gap-1">
        {sections.map((section, index) => (
          <li key={section}>
            <span
              className={cn(
                "inline-flex min-h-10 items-center gap-2 rounded-lg border px-3 type-label",
                index === 0
                  ? "border-brand-2/35 bg-brand-2/12 text-foreground"
                  : "border-transparent text-muted",
              )}
              aria-current={index === 0 ? "page" : undefined}
            >
              {section}
              {index > 0 ? <span className="text-[0.6rem] uppercase tracking-wider">à venir</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </Card>
  );
}

function BotMetricCard({
  icon: Icon,
  label,
  value,
  detail,
  tone,
}: {
  icon: LucideIcon;
  label: string;
  value: number | string | null;
  detail?: string;
  tone: "cyan" | "green" | "violet" | "amber" | "neutral";
}) {
  const color = {
    cyan: "border-brand-2/25 bg-brand-2/10 text-brand-2",
    green: "border-success/25 bg-success/10 text-success",
    violet: "border-brand/25 bg-brand/10 text-brand",
    amber: "border-warning/30 bg-warning/10 text-warning",
    neutral: "border-line bg-surface-control text-muted",
  }[tone];

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="type-overline text-muted">{label}</p>
          <p className={cn("mt-3 font-mono font-black", value == null ? "text-sm text-muted" : "text-2xl text-foreground")}>
            {value ?? "Métrique non disponible"}
          </p>
        </div>
        <span className={cn("grid h-11 w-11 shrink-0 place-items-center rounded-lg border", color)}>
          <Icon size={20} aria-hidden="true" />
        </span>
      </div>
      {detail ? <p className="type-caption-strong mt-4 text-muted">{detail}</p> : null}
    </Card>
  );
}

function RuntimeRow({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-lg border border-line bg-surface-flat p-3">
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand-2/10 text-brand-2">
        <Icon size={17} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block type-overline text-muted">{label}</span>
        <strong className="mt-1 block break-words text-sm font-black text-foreground">
          {value ?? "Métrique non disponible"}
        </strong>
      </span>
    </div>
  );
}

function SecurityRow({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-surface-flat p-3">
      <Icon className="shrink-0 text-success-foreground" size={18} aria-hidden="true" />
      <span className="type-body-strong text-foreground">{label}</span>
    </div>
  );
}

function connectionLabel(state: "connected" | "connecting" | "disconnected") {
  return {
    connected: "Connecté",
    connecting: "Connexion en cours",
    disconnected: "Déconnecté",
  }[state];
}

function configurationLabel(configuration: DiscordBotOverviewResult["configuration"]) {
  return { ready: "configurée", missing: "non configurée", invalid: "incomplète" }[
    configuration
  ];
}

function formatDuration(seconds: number) {
  const days = Math.floor(seconds / 86_400);
  const hours = Math.floor((seconds % 86_400) / 3_600);
  const minutes = Math.floor((seconds % 3_600) / 60);
  return [days ? `${days} j` : null, hours ? `${hours} h` : null, `${minutes} min`]
    .filter(Boolean)
    .join(" ");
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: "Europe/Paris",
  }).format(new Date(value));
}
