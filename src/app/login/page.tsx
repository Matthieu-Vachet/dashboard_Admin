import { LockKeyhole, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const params = await searchParams;
  const next = params.next || "/";

  return (
    <main className="relative grid min-h-screen overflow-hidden px-4 py-8">
      <div className="studio-grid pointer-events-none absolute inset-0 opacity-70" />
      <section className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.05fr_.95fr]">
        <div className="max-w-2xl">
          <Badge tone="violet">Accès admin personnel</Badge>
          <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
            MatWeb Dashboard, ton poste de contrôle.
          </h1>
          <p className="mt-5 max-w-xl text-base font-semibold leading-8 text-muted">
            Connexion obligatoire pour accéder aux notes, au kanban, aux projets, au calendrier, aux todos, aux outils et aux statistiques API.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {["Design system", "Outils quotidiens", "Projet cockpit"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white/[0.055] p-3">
                <Sparkles size={16} className="text-brand-2" />
                <p className="mt-3 text-sm font-black">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <Card tone="strong" className="p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white">
              <LockKeyhole size={20} />
            </span>
            <div>
              <h2 className="text-xl font-black">Connexion</h2>
              <p className="text-sm font-semibold text-muted">Un seul admin, toi.</p>
            </div>
          </div>

          {params.error ? (
            <div className="mt-5 rounded-lg border border-danger/30 bg-danger/10 p-3 text-sm font-bold text-rose-100">
              Identifiants incorrects ou variables production manquantes. Vérifie `ADMIN_EMAIL`, `ADMIN_PASSWORD` et `SESSION_SECRET`.
            </div>
          ) : null}

          <form action="/api/session" method="post" className="mt-6 space-y-4">
            <input type="hidden" name="next" value={next} />
            <Field label="Email">
              <Input
                className="mt-2"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="matthieu@example.com"
                required
              />
            </Field>
            <Field label="Mot de passe">
              <Input
                className="mt-2"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </Field>
            <Button className="w-full" variant="primary" type="submit">
              Entrer dans le dashboard
            </Button>
          </form>

          <p className="mt-5 text-xs font-semibold leading-6 text-muted">
            En local, les valeurs par défaut sont dans `.env.example`. Change-les avant production.
          </p>
        </Card>
      </section>
    </main>
  );
}
