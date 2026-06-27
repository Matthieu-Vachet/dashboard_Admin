"use client";

import { CalendarDays, Plus, Save, Search, Star, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/dashboard/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { initialNotes, type Note } from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const categories: Note["category"][] = ["Projet", "Client", "Idée", "Personnel", "Pokémon", "Système"];
const priorities: Note["priority"][] = ["Haute", "Moyenne", "Basse"];
const colors: Note["color"][] = ["cyan", "green", "violet", "amber", "red"];

const categoryTone: Record<Note["category"], "cyan" | "green" | "violet" | "amber" | "neutral"> = {
  Projet: "cyan",
  Client: "green",
  Idée: "violet",
  Personnel: "amber",
  Pokémon: "green",
  Système: "neutral",
};

const colorClasses: Record<Note["color"], string> = {
  cyan: "border-brand-2/40 bg-brand-2/12 text-brand-2",
  green: "border-brand-3/40 bg-brand-3/12 text-brand-3",
  violet: "border-brand/40 bg-brand/12 text-violet-200",
  amber: "border-warning/45 bg-warning/12 text-warning",
  red: "border-danger/45 bg-danger/12 text-danger",
};

const priorityClasses: Record<Note["priority"], string> = {
  Haute: "border-danger/40 bg-danger/12 text-danger",
  Moyenne: "border-warning/40 bg-warning/12 text-warning",
  Basse: "border-brand-3/40 bg-brand-3/12 text-brand-3",
};

const sortOptions = [
  { value: "updated", label: "Modifiées" },
  { value: "created", label: "Créées" },
  { value: "priority", label: "Priorité" },
  { value: "title", label: "Titre" },
  { value: "favorites", label: "Favoris" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

function todayLabel() {
  return new Date().toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function normalizeTags(tags: unknown) {
  if (Array.isArray(tags)) return tags.map(String).map((tag) => tag.trim()).filter(Boolean);
  if (typeof tags === "string") {
    return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  }
  return [];
}

function normalizeNote(note: Note): Note {
  return {
    ...note,
    category: categories.includes(note.category) ? note.category : "Idée",
    tags: normalizeTags(note.tags),
    priority: priorities.includes(note.priority) ? note.priority : "Moyenne",
    color: colors.includes(note.color) ? note.color : "cyan",
    favorite: Boolean(note.favorite),
    createdAt: note.createdAt || note.updatedAt || todayLabel(),
    updatedAt: note.updatedAt || todayLabel(),
  };
}

function priorityRank(priority: Note["priority"]) {
  return { Haute: 0, Moyenne: 1, Basse: 2 }[priority];
}

export function NotesBoard() {
  const [notes, setNotes, ready] = usePersistentState("matweb.notes", initialNotes);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("updated");
  const [selectedId, setSelectedId] = useState(initialNotes[0]?.id);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const normalizedNotes = useMemo(() => notes.map(normalizeNote), [notes]);
  const selectedNote = normalizedNotes.find((note) => note.id === selectedId) || normalizedNotes[0];

  const filteredNotes = useMemo(() => {
    const normalizedQuery = query.toLowerCase().trim();
    const filtered = normalizedQuery
      ? normalizedNotes.filter((note) =>
          [
            note.title,
            note.body,
            note.category,
            note.priority,
            note.color,
            ...note.tags,
          ].some((value) => value.toLowerCase().includes(normalizedQuery)),
        )
      : normalizedNotes;

    return [...filtered].sort((a, b) => {
      if (sortKey === "favorites") return Number(b.favorite) - Number(a.favorite) || a.title.localeCompare(b.title);
      if (sortKey === "priority") return priorityRank(a.priority) - priorityRank(b.priority);
      if (sortKey === "title") return a.title.localeCompare(b.title);
      if (sortKey === "created") return String(b.createdAt).localeCompare(String(a.createdAt));
      return String(b.updatedAt).localeCompare(String(a.updatedAt));
    });
  }, [normalizedNotes, query, sortKey]);

  if (!ready) {
    return <DashboardLoadingState title="Carnet central" />;
  }

  function addNote() {
    const now = todayLabel();
    const note: Note = {
      id: `n${Date.now()}`,
      title: "Nouvelle note",
      body: "",
      category: "Idée",
      tags: [],
      priority: "Moyenne",
      color: "cyan",
      favorite: false,
      createdAt: now,
      updatedAt: now,
    };
    setNotes((current) => [note, ...current.map(normalizeNote)]);
    setSelectedId(note.id);
    setConfirmDelete(false);
  }

  function updateSelected(patch: Partial<Note>) {
    if (!selectedNote) return;
    setNotes((current) =>
      current.map((note) =>
        note.id === selectedNote.id
          ? { ...normalizeNote(note), ...patch, updatedAt: todayLabel() }
          : normalizeNote(note),
      ),
    );
    setConfirmDelete(false);
  }

  function deleteSelected() {
    if (!selectedNote) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setNotes((current) => {
      const nextNotes = current.map(normalizeNote).filter((note) => note.id !== selectedNote.id);
      setSelectedId(nextNotes[0]?.id);
      return nextNotes;
    });
    setConfirmDelete(false);
  }

  return (
    <div className="grid gap-4 xl:grid-cols-[390px_1fr]">
      <Card className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
              Notes app
            </p>
            <h2 className="mt-2 text-2xl font-black">Carnet central</h2>
          </div>
          <Button
            size="icon"
            variant="primary"
            type="button"
            onClick={addNote}
            aria-label="Ajouter une note"
          >
            <Plus size={17} />
          </Button>
        </div>

        <div className="mt-4 flex min-h-11 items-center gap-2 rounded-lg border border-line bg-white/[0.055] px-3 text-muted">
          <Search size={16} />
          <Input
            className="min-h-0 border-0 bg-transparent px-0 focus:bg-transparent"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Chercher titre, tag, priorité..."
          />
        </div>

        <label className="mt-3 block">
          <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Tri</span>
          <select
            className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none transition focus:border-brand-2/55"
            value={sortKey}
            onChange={(event) => setSortKey(event.target.value as SortKey)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-4 max-h-[calc(100vh-310px)] space-y-2 overflow-y-auto pr-1">
          {filteredNotes.map((note) => (
            <button
              key={note.id}
              type="button"
              onClick={() => {
                setSelectedId(note.id);
                setConfirmDelete(false);
              }}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition",
                selectedNote?.id === note.id
                  ? "border-brand-2/45 bg-brand-2/12 shadow-[0_18px_42px_rgba(32,211,255,0.10)]"
                  : "border-line bg-white/[0.04] hover:bg-white/[0.07]",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-black">{note.title || "Sans titre"}</p>
                <span className={cn("rounded-full border px-2 py-1 text-[10px] font-black", priorityClasses[note.priority])}>
                  {note.priority}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-muted">
                {note.body || "Aucun contenu pour le moment."}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Badge tone={categoryTone[note.category]}>{note.category}</Badge>
                {note.favorite ? (
                  <span className="inline-flex items-center gap-1 rounded-full border border-warning/30 bg-warning/10 px-2 py-1 text-[10px] font-black text-warning">
                    <Star size={11} fill="currentColor" />
                    Favori
                  </span>
                ) : null}
                {note.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="rounded-full border border-line bg-white/[0.04] px-2 py-1 text-[10px] font-black text-muted">
                    #{tag}
                  </span>
                ))}
              </div>
            </button>
          ))}
          {!filteredNotes.length ? (
            <div className="rounded-lg border border-line bg-white/[0.04] p-4 text-sm font-bold text-muted">
              Aucune note trouvée.
            </div>
          ) : null}
        </div>
      </Card>

      <Card tone="strong" className="p-4 sm:p-5">
        {selectedNote ? (
          <div className="grid gap-5 xl:grid-cols-[1fr_280px]">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Badge tone={categoryTone[selectedNote.category]}>{selectedNote.category}</Badge>
                <Button
                  size="sm"
                  type="button"
                  icon={<Star size={15} fill={selectedNote.favorite ? "currentColor" : "none"} />}
                  onClick={() => updateSelected({ favorite: !selectedNote.favorite })}
                >
                  {selectedNote.favorite ? "Favori" : "Marquer favori"}
                </Button>
              </div>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Titre
                </span>
                <Input
                  className="mt-2 text-lg font-black"
                  value={selectedNote.title}
                  onChange={(event) => updateSelected({ title: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Contenu
                </span>
                <Textarea
                  className="mt-2 min-h-[48dvh] resize-y text-base leading-7"
                  value={selectedNote.body}
                  onChange={(event) => updateSelected({ body: event.target.value })}
                  placeholder="Écris une note exploitable : contexte, décision, prochain pas..."
                />
              </label>
            </div>

            <aside className="space-y-4">
              <div className="rounded-lg border border-line bg-white/[0.045] p-3">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Métadonnées
                </p>
                <div className="mt-3 grid gap-3">
                  <label>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-muted">Tags</span>
                    <Input
                      className="mt-2"
                      value={selectedNote.tags.join(", ")}
                      onChange={(event) => updateSelected({ tags: normalizeTags(event.target.value) })}
                      placeholder="pokemon, api, todo"
                    />
                  </label>
                  <label>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-muted">Catégorie</span>
                    <select
                      className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none transition focus:border-brand-2/55"
                      value={selectedNote.category}
                      onChange={(event) => updateSelected({ category: event.target.value as Note["category"] })}
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-muted">Priorité</span>
                    <select
                      className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none transition focus:border-brand-2/55"
                      value={selectedNote.priority}
                      onChange={(event) => updateSelected({ priority: event.target.value as Note["priority"] })}
                    >
                      {priorities.map((priority) => (
                        <option key={priority} value={priority}>
                          {priority}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div>
                    <span className="text-xs font-black uppercase tracking-[0.12em] text-muted">Couleur</span>
                    <div className="mt-2 grid grid-cols-5 gap-2">
                      {colors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => updateSelected({ color })}
                          aria-label={`Couleur ${color}`}
                          className={cn(
                            "h-10 rounded-lg border text-[0px] transition",
                            colorClasses[color],
                            selectedNote.color === color && "ring-2 ring-brand-2/55",
                          )}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={cn("rounded-lg border p-3", colorClasses[selectedNote.color])}>
                <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em]">
                  <CalendarDays size={14} />
                  Dates
                </p>
                <p className="mt-3 text-sm font-bold text-foreground">Créée : {selectedNote.createdAt}</p>
                <p className="mt-1 text-sm font-bold text-foreground">Modifiée : {selectedNote.updatedAt}</p>
              </div>

              <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button">
                Sauvegarde locale active
              </Button>
              <Button
                className="w-full"
                variant="danger"
                icon={<Trash2 size={17} />}
                type="button"
                onClick={deleteSelected}
              >
                {confirmDelete ? "Confirmer la suppression" : "Supprimer la note"}
              </Button>
            </aside>
          </div>
        ) : (
          <div className="grid min-h-[520px] place-items-center text-center text-muted">
            <p className="font-black">Sélectionne ou crée une note.</p>
          </div>
        )}
      </Card>
    </div>
  );
}
