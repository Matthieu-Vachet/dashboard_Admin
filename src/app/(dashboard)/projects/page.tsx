"use client";

import { ArrowUpRight, Code2, Github, ListChecks, Rocket, Save, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/admin/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Select } from "@/components/ui/select";
import {
  initialProjects,
  projectStatuses as statuses,
  type Project,
  type ProjectStatus,
} from "@/data/personal-dashboard-defaults";
import { jsPracticalProjects } from "@/data/javascript-learning";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const statusTone = {
  Idée: "violet",
  Build: "cyan",
  Live: "green",
  Pause: "amber",
  Archive: "neutral",
} as const;

const guidedProjectDefaults: Project[] = jsPracticalProjects.map((project, index) => ({
  id: `js-level6-${project.id}`,
  name: project.title,
  type: "JS Progress niveau 6",
  status: "Build",
  progress: 5,
  repoUrl: "",
  siteUrl: "",
  nextStep: project.steps[0] || project.goal,
  detail: [
    project.goal,
    "",
    "Étapes:",
    ...project.steps.map((step, stepIndex) => `${stepIndex + 1}. ${step}`),
    "",
    `Bonus: ${project.bonus}`,
    "",
    `Compétences: ${project.skills.join(", ")}.`,
    `Difficulté: ${project.difficulty}. Projet ${index + 1}/${jsPracticalProjects.length}.`,
  ].join("\n"),
}));

export default function ProjectsPage() {
  const [projects, setProjects, ready] = usePersistentState("matweb.projects", initialProjects);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedProject = projects.find((project) => project.id === selectedId) || null;

  useEffect(() => {
    if (!ready) return;
    setProjects((current) => {
      const existingIds = new Set(current.map((project) => project.id));
      const missing = guidedProjectDefaults.filter((project) => !existingIds.has(project.id));
      return missing.length ? [...current, ...missing] : current;
    });
  }, [ready, setProjects]);

  const activeProjects = useMemo(
    () => projects.filter((project) => project.status !== "Archive").length,
    [projects],
  );

  if (!ready) {
    return <DashboardLoadingState title="Projets" />;
  }

  function addProject() {
    const project: Project = {
      id: `p${Date.now()}`,
      name: "Nouveau projet",
      type: "À définir",
      status: "Idée",
      progress: 5,
      repoUrl: "",
      siteUrl: "",
      nextStep: "Définir l'objectif et le premier livrable.",
      detail: "Décris le problème, la cible et ce que tu veux livrer.",
    };
    setProjects((current) => [project, ...current]);
    setSelectedId(project.id);
  }

  function updateProject(id: string, patch: Partial<Project>) {
    setProjects((current) =>
      current.map((project) => (project.id === id ? { ...project, ...patch } : project)),
    );
  }

  function deleteProject(id: string) {
    setProjects((current) => {
      const nextProjects = current.filter((project) => project.id !== id);
      setSelectedId(null);
      return nextProjects;
    });
  }

  function openUrl(url: string) {
    if (!url.trim()) return;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="violet">Portfolio cockpit</Badge>
          <h2 className="mt-3 text-3xl font-black">Projets</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Clique une carte pour ouvrir sa fiche, modifie les infos et garde tes liens utiles à portée.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={ready ? "green" : "neutral"}>{ready ? `${activeProjects} actifs` : "Chargement"}</Badge>
          <Button variant="primary" icon={<Rocket size={17} />} type="button" onClick={addProject}>
            Nouveau projet
          </Button>
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[0.82fr_1.18fr]">
        <Card className="p-5">
          <Badge tone="cyan">JS Progress niveau 6</Badge>
          <h3 className="mt-3 text-2xl font-black">Projets pratiques guidés</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            Des projets concrets pour transformer les notions JavaScript en automatismes: DOM, fetch,
            localStorage, tableaux, erreurs et mini dashboards.
          </p>
          <div className="mt-5 grid gap-3">
            <Card tone="flat" className="p-3">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                <Code2 size={15} /> Objectif
              </span>
              <strong className="mt-2 block text-sm leading-6">
                Construire petit, vérifier souvent, puis améliorer avec un bonus.
              </strong>
            </Card>
            <Card tone="flat" className="p-3">
              <span className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
                <ListChecks size={15} /> Routine
              </span>
              <strong className="mt-2 block text-sm leading-6">
                1 projet = une version simple, une sauvegarde, puis une amélioration.
              </strong>
            </Card>
          </div>
        </Card>
        <Card className="p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <Badge tone="green">Synchronisés</Badge>
              <h3 className="mt-3 text-2xl font-black">{guidedProjectDefaults.length} vrais projets éditables</h3>
            </div>
            <Badge tone={activeProjects ? "green" : "neutral"}>{activeProjects} actifs</Badge>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-muted">
            Les projets niveau 6 sont ajoutés dans la grille ci-dessous comme des projets normaux:
            progression, statut, description, prochaine action, liens et suppression restent modifiables.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {jsPracticalProjects.map((project) => (
              <button
                className="rounded-full border border-line bg-surface-subtle px-3 py-1.5 text-xs font-black text-muted transition hover:border-brand-2/45 hover:text-inverse"
                key={project.id}
                type="button"
                onClick={() => setSelectedId(`js-level6-${project.id}`)}
              >
                {project.title}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={project.id}
              className={cn(
                "motion-border p-4 transition hover:-translate-y-0.5",
                selectedProject?.id === project.id && "border-brand-2/50 bg-brand-2/8",
              )}
            >
              <button
                type="button"
                className="relative z-10 block w-full text-left"
                onClick={() => setSelectedId(project.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                      {project.type}
                    </p>
                    <h3 className="mt-2 text-xl font-black">{project.name}</h3>
                  </div>
                  <Badge tone={statusTone[project.status]}>{project.status}</Badge>
                </div>
                <p className="mt-4 min-h-12 overflow-hidden text-sm font-semibold leading-6 text-muted [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3]">
                  {project.detail}
                </p>
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-black">
                    <span>Progression</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-emphasis">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand via-brand-2 to-brand-3"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              </button>
              <div className="relative z-10 mt-5 grid grid-cols-2 gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<Github size={15} />}
                  type="button"
                  onClick={() => openUrl(project.repoUrl)}
                  disabled={!project.repoUrl}
                >
                  Repo
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  icon={<ArrowUpRight size={15} />}
                  type="button"
                  onClick={() => openUrl(project.siteUrl)}
                  disabled={!project.siteUrl}
                >
                  Site
                </Button>
              </div>
              <span className="absolute right-4 top-4 font-mono text-xs font-black text-inverse/10">
                0{index + 1}
              </span>
            </Card>
          ))}
        </div>
      </section>

      <Modal
        open={Boolean(selectedProject)}
        title={selectedProject?.name || "Projet"}
        description="Création, édition, liens GitHub/Vercel et progression."
        onClose={() => setSelectedId(null)}
      >
        {selectedProject ? (
          <div className="space-y-4">
            <Field label="Nom">
              <Input
                className="mt-2"
                value={selectedProject.name}
                onChange={(event) => updateProject(selectedProject.id, { name: event.target.value })}
              />
            </Field>
            <Field label="Type">
              <Input
                className="mt-2"
                value={selectedProject.type}
                onChange={(event) => updateProject(selectedProject.id, { type: event.target.value })}
              />
            </Field>
            <Field label="Description">
              <Textarea
                className="mt-2 min-h-28"
                value={selectedProject.detail}
                onChange={(event) => updateProject(selectedProject.id, { detail: event.target.value })}
              />
            </Field>
            <Field label="Prochaine action">
              <Input
                className="mt-2"
                value={selectedProject.nextStep}
                onChange={(event) => updateProject(selectedProject.id, { nextStep: event.target.value })}
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Progression">
                <Input
                  className="mt-2"
                  type="number"
                  min={0}
                  max={100}
                  value={selectedProject.progress}
                  onChange={(event) =>
                    updateProject(selectedProject.id, {
                      progress: Math.min(100, Math.max(0, Number(event.target.value) || 0)),
                    })
                  }
                />
              </Field>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Statut</span>
                <Select
                  className="mt-2 min-h-11 w-full rounded-lg border border-line bg-surface-control px-3 text-sm font-black outline-none"
                  value={selectedProject.status}
                  onChange={(event) =>
                    updateProject(selectedProject.id, {
                      status: event.target.value as ProjectStatus,
                    })
                  }
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </Select>
              </label>
            </div>
            <Field label="GitHub">
              <Input
                className="mt-2"
                value={selectedProject.repoUrl}
                onChange={(event) => updateProject(selectedProject.id, { repoUrl: event.target.value })}
                placeholder="https://github.com/..."
              />
            </Field>
            <Field label="Site / Vercel">
              <Input
                className="mt-2"
                value={selectedProject.siteUrl}
                onChange={(event) => updateProject(selectedProject.id, { siteUrl: event.target.value })}
                placeholder="https://..."
              />
            </Field>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="secondary" icon={<Github size={16} />} type="button" disabled={!selectedProject.repoUrl} onClick={() => openUrl(selectedProject.repoUrl)}>
                GitHub
              </Button>
              <Button variant="secondary" icon={<ArrowUpRight size={16} />} type="button" disabled={!selectedProject.siteUrl} onClick={() => openUrl(selectedProject.siteUrl)}>
                Ouvrir
              </Button>
            </div>
            <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button" onClick={() => setSelectedId(null)}>
              Sauvegarde automatique
            </Button>
            <Button className="w-full" variant="danger" icon={<Trash2 size={17} />} type="button" onClick={() => deleteProject(selectedProject.id)}>
              Supprimer le projet
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
