import Link from "next/link";
import { ArrowLeft, MonitorCog, ShieldCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSession } from "@/lib/auth";

export default async function AccountPage() {
  const session = await getSession();

  return (
    <div className="space-y-4">
      <Card tone="strong" className="relative overflow-hidden p-5 sm:p-6">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_0%,rgba(32,211,255,.18),transparent_42%)]" />
        <CardHeader
          className="relative z-10"
          eyebrow="Compte admin"
          action={
            <Link className="inline-flex min-h-10 items-center gap-2 rounded-lg border border-line bg-surface-control px-3 text-sm font-black text-foreground transition hover:border-cyan-200/40 hover:bg-cyan-400/12" href="/">
              <ArrowLeft size={16} /> Retour
            </Link>
          }
        >
          <CardTitle className="text-2xl sm:text-3xl">Réglages du compte</CardTitle>
          <CardDescription>
            Informations disponibles pour la session admin actuelle, sans ajouter de système d’authentification supplémentaire.
          </CardDescription>
        </CardHeader>
      </Card>

      <section className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-400/10 text-cyan-100">
            <UserRound size={22} />
          </span>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted">Utilisateur</p>
          <h2 className="mt-2 break-words text-xl font-black">{session?.email || "Admin"}</h2>
          <Badge className="mt-4" tone="green">Admin</Badge>
        </Card>

        <Card id="session" className="p-4">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-emerald-300/25 bg-emerald-400/10 text-emerald-100">
            <ShieldCheck size={22} />
          </span>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted">Session</p>
          <h2 className="mt-2 text-xl font-black">Session active</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            La session est protégée par cookie HTTP-only et vérifiée côté serveur sur les routes dashboard.
          </p>
        </Card>

        <Card className="p-4">
          <span className="grid h-12 w-12 place-items-center rounded-lg border border-violet-300/25 bg-violet-400/10 text-violet-100">
            <MonitorCog size={22} />
          </span>
          <p className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-muted">Préférences</p>
          <h2 className="mt-2 text-xl font-black">Interface dashboard</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            Les préférences existantes restent gérées localement par les widgets, groupes de menu et thème.
          </p>
        </Card>
      </section>
    </div>
  );
}
