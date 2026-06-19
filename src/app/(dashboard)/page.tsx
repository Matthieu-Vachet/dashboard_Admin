import { BookOpen, CalendarCheck, FolderKanban, Gauge, NotebookPen, Wrench } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { PokemonWidget } from "@/components/dashboard/pokemon-widget";
import { StatCard } from "@/components/dashboard/stat-card";
import { activityFeed, quickActions } from "@/data/dashboard";

export default function DashboardHome() {
  return (
    <div className="space-y-5">
      <section className="grid gap-4 xl:grid-cols-[1.2fr_.8fr]">
        <Card tone="strong" className="relative overflow-hidden p-5 sm:p-6">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-2 to-transparent" />
          <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <Badge tone="violet">MatWeb cockpit</Badge>
              <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
                Ton tableau de bord pour construire, suivre et shipper.
              </h2>
              <p className="mt-4 max-w-2xl text-sm font-semibold leading-7 text-muted sm:text-base">
                Notes, kanban, projets, calendrier, todo, outils quotidiens et statistiques API dans un seul espace admin.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button asChild variant="primary">
                <Link href="/tools">
                  <Wrench size={17} />
                  Ouvrir les outils
                </Link>
              </Button>
              <Button asChild>
                <Link href="/notes">
                  <NotebookPen size={17} />
                  Nouvelle note
                </Link>
              </Button>
              <Button asChild>
                <a href="/storybook/index.html" target="_blank" rel="noreferrer">
                  <BookOpen size={17} />
                  Storybook
                </a>
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
                Aujourd&apos;hui
              </p>
              <h3 className="mt-2 text-xl font-black">Priorites rapides</h3>
            </div>
            <Badge tone="green">4 actions</Badge>
          </div>
          <div className="mt-5 space-y-2">
            {quickActions.map((action, index) => (
              <div
                key={action}
                className="flex items-center gap-3 rounded-lg border border-line bg-white/[0.045] p-3"
              >
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/[0.07] font-mono text-xs font-black text-brand-2">
                  0{index + 1}
                </span>
                <span className="text-sm font-black">{action}</span>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Notes actives"
          value="24"
          delta="+6 cette semaine"
          icon={NotebookPen}
          accent="cyan"
        />
        <StatCard
          label="Tâches prêtes"
          value="38"
          delta="+12% focus"
          icon={Gauge}
          accent="green"
        />
        <StatCard
          label="Projets"
          value="7"
          delta="2 en sprint"
          icon={FolderKanban}
          accent="violet"
        />
        <StatCard
          label="Échéances"
          value="5"
          delta="3 à planifier"
          icon={CalendarCheck}
          accent="amber"
        />
      </section>

      <DashboardCharts />

      <section className="grid gap-4 xl:grid-cols-[.9fr_1.1fr]">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
                Activity
              </p>
              <h3 className="mt-2 text-xl font-black">Flux récent</h3>
            </div>
            <Badge tone="neutral">Live</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {activityFeed.map((item) => (
              <div
                key={item.title}
                className="grid grid-cols-[auto_1fr_auto] gap-3 rounded-lg border border-line bg-white/[0.04] p-3"
              >
                <span className="mt-1 h-3 w-3 rounded-full bg-brand-2" />
                <div>
                  <p className="text-sm font-black">{item.title}</p>
                  <p className="mt-1 text-sm font-medium text-muted">{item.detail}</p>
                </div>
                <span className="font-mono text-xs font-bold text-muted">{item.time}</span>
              </div>
            ))}
          </div>
        </Card>

        <PokemonWidget />
      </section>
    </div>
  );
}
