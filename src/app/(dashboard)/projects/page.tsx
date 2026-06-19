import { ArrowUpRight, CalendarClock, CircleDot, Github, Rocket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const projects = [
  {
    name: "Dashboard Admin",
    type: "Produit interne",
    status: "Build",
    progress: 72,
    accent: "from-brand to-brand-2",
    detail: "Cockpit personnel avec IA, notes, kanban, calendrier et design system.",
  },
  {
    name: "Pokemon GO API",
    type: "API data",
    status: "Live",
    progress: 100,
    accent: "from-brand-3 to-brand-2",
    detail: "Checklist, assets, qualité et endpoints publics pour explorer les données.",
  },
  {
    name: "MatWeb Innovation",
    type: "Site vitrine",
    status: "Growth",
    progress: 84,
    accent: "from-brand to-warning",
    detail: "Identité, offres, projets, contact et présence professionnelle.",
  },
  {
    name: "Design System MW",
    type: "UI kit",
    status: "Alpha",
    progress: 38,
    accent: "from-warning to-danger",
    detail: "Tokens, composants, guidelines Storybook et composants admin.",
  },
];

const roadmap = [
  "Ajouter persistance SQLite ou Postgres",
  "Brancher calendrier Google/ICS",
  "Ajouter RBAC si le dashboard devient multi-user",
  "Créer des templates projet réutilisables",
];

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="violet">Portfolio cockpit</Badge>
          <h2 className="mt-3 text-3xl font-black">Projets</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Une vue simple pour piloter tes produits actuels et préparer les prochains.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button icon={<Github size={17} />}>GitHub</Button>
          <Button variant="primary" icon={<Rocket size={17} />}>Nouveau projet</Button>
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <Card key={project.name} className="motion-border p-4">
              <div className="relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                      {project.type}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{project.name}</h3>
                  </div>
                  <Badge tone={project.status === "Live" ? "green" : "cyan"}>{project.status}</Badge>
                </div>
                <p className="mt-4 min-h-12 text-sm font-semibold leading-6 text-muted">
                  {project.detail}
                </p>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${project.accent}`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <Button className="mt-5 w-full" variant="secondary" icon={<ArrowUpRight size={16} />}>
                  Ouvrir la fiche
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <aside className="space-y-4">
          <Card className="p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
              Roadmap
            </p>
            <div className="mt-4 space-y-3">
              {roadmap.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-line bg-white/[0.045] p-3">
                  <CircleDot size={17} className="mt-0.5 shrink-0 text-brand-3" />
                  <p className="text-sm font-bold leading-6">{item}</p>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-4">
            <CalendarClock size={20} className="text-brand-2" />
            <h3 className="mt-3 text-lg font-black">Prochain checkpoint</h3>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Chaque lundi matin : review des projets, priorités kanban, puis focus bloc.
            </p>
          </Card>
        </aside>
      </section>
    </div>
  );
}
