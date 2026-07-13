"use client";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  GripVertical,
  Image as ImageIcon,
  Link2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/admin/shared/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  initialBoard,
  kanbanCategories as categories,
  kanbanColumns as columns,
  type BoardState,
  type Category,
  type ColumnId,
  type Task,
} from "@/data/personal-dashboard-defaults";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

const categoryStyles: Record<Category, string> = {
  Produit: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  Design: "border-brand/30 bg-brand/10 text-violet-100",
  API: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  Ops: "border-warning/35 bg-warning/10 text-amber-100",
  Urgent: "border-danger/35 bg-danger/10 text-rose-100",
};

const priorities: Task["priority"][] = ["Haute", "Moyenne", "Basse"];
const statuses: Task["status"][] = ["Backlog", "En cours", "Review", "Terminé", "Bloqué"];

const priorityStyles: Record<Task["priority"], string> = {
  Haute: "border-danger/40 bg-danger/12 text-danger",
  Moyenne: "border-warning/40 bg-warning/12 text-warning",
  Basse: "border-brand-3/40 bg-brand-3/12 text-brand-3",
};

const columnStatus: Record<ColumnId, Task["status"]> = {
  backlog: "Backlog",
  doing: "En cours",
  review: "Review",
  done: "Terminé",
};

function normalizeList(value: unknown) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (typeof value === "string") {
    return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

function splitLines(value: string) {
  return value.split("\n").map((item) => item.trim()).filter(Boolean);
}

function normalizeTask(task: Task, columnId: ColumnId): Task {
  const category = categories.includes(task.category) ? task.category : "Produit";
  const status = statuses.includes(task.status) ? task.status : columnStatus[columnId];
  const description = task.description || task.note || "";

  return {
    ...task,
    category,
    points: Number(task.points) || 1,
    owner: task.owner || "MW",
    note: task.note || description,
    description,
    links: normalizeList(task.links),
    images: normalizeList(task.images),
    tags: normalizeList(task.tags),
    priority: priorities.includes(task.priority) ? task.priority : "Moyenne",
    status,
    dueDate: task.dueDate || "",
    checklist: Array.isArray(task.checklist)
      ? task.checklist.map((item, index) => ({
          id: item.id || `${task.id}-c${index}`,
          text: item.text || "Action",
          done: Boolean(item.done),
        }))
      : [],
  };
}

function normalizeBoard(board: BoardState): BoardState {
  return columns.reduce((next, column) => {
    next[column.id] = (board[column.id] || []).map((task) => normalizeTask(task, column.id));
    return next;
  }, {} as BoardState);
}

function checklistProgress(task: Task) {
  if (!task.checklist.length) return null;
  const done = task.checklist.filter((item) => item.done).length;
  return `${done}/${task.checklist.length}`;
}

export function KanbanBoard() {
  const [board, setBoard, ready] = usePersistentState("matweb.kanban", initialBoard);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const normalizedBoard = useMemo(() => normalizeBoard(board), [board]);

  const taskToColumn = useMemo(() => {
    const map = new Map<string, ColumnId>();
    columns.forEach((column) => {
      normalizedBoard[column.id].forEach((task) => map.set(task.id, column.id));
    });
    return map;
  }, [normalizedBoard]);

  const selectedTask = useMemo(() => {
    for (const column of columns) {
      const task = normalizedBoard[column.id].find((item) => item.id === selectedTaskId);
      if (task) return task;
    }
    return null;
  }, [normalizedBoard, selectedTaskId]);

  const selectedColumn = selectedTask ? taskToColumn.get(selectedTask.id) : undefined;
  const activeTask = useMemo(() => {
    for (const column of columns) {
      const task = normalizedBoard[column.id].find((item) => item.id === activeTaskId);
      if (task) return task;
    }
    return null;
  }, [activeTaskId, normalizedBoard]);

  if (!ready) {
    return <DashboardLoadingState title="Kanban projet" />;
  }

  function addTask() {
    const task: Task = {
      id: `k${Date.now()}`,
      title: "Nouvelle carte projet",
      category: "Produit",
      points: 1,
      owner: "MW",
      note: "Décris l'objectif, les critères de sortie et le prochain pas.",
      description: "Décris l'objectif, les critères de sortie et le prochain pas.",
      links: [],
      images: [],
      tags: [],
      priority: "Moyenne",
      status: "Backlog",
      dueDate: "",
      checklist: [],
    };

    setBoard((current) => ({
      ...normalizeBoard(current),
      backlog: [task, ...normalizeBoard(current).backlog],
    }));
    setSelectedTaskId(task.id);
    setConfirmDelete(false);
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setBoard((current) => {
      const normalized = normalizeBoard(current);
      const next = { ...normalized };
      columns.forEach((column) => {
        next[column.id] = normalized[column.id].map((task) =>
          task.id === id ? { ...task, ...patch, note: patch.description ?? task.note } : task,
        );
      });
      return next;
    });
    setConfirmDelete(false);
  }

  function moveTask(id: string, targetColumn: ColumnId) {
    const sourceColumn = taskToColumn.get(id);
    if (!sourceColumn || sourceColumn === targetColumn) return;

    setBoard((current) => {
      const normalized = normalizeBoard(current);
      const movingTask = normalized[sourceColumn].find((task) => task.id === id);
      if (!movingTask) return normalized;
      return {
        ...normalized,
        [sourceColumn]: normalized[sourceColumn].filter((task) => task.id !== id),
        [targetColumn]: [{ ...movingTask, status: columnStatus[targetColumn] }, ...normalized[targetColumn]],
      };
    });
  }

  function requestDelete(id: string) {
    setSelectedTaskId(id);
    setConfirmDelete(true);
  }

  function deleteTask(id: string) {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setBoard((current) => {
      const normalized = normalizeBoard(current);
      const next = { ...normalized };
      columns.forEach((column) => {
        next[column.id] = normalized[column.id].filter((task) => task.id !== id);
      });
      return next;
    });
    setSelectedTaskId(null);
    setConfirmDelete(false);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTaskId(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);
    const sourceColumn = taskToColumn.get(activeId);
    const targetColumn = columns.some((column) => column.id === overId)
      ? (overId as ColumnId)
      : taskToColumn.get(overId);

    if (!sourceColumn || !targetColumn) return;

    setBoard((current) => {
      const normalized = normalizeBoard(current);
      const sourceTasks = normalized[sourceColumn];
      const targetTasks = normalized[targetColumn];
      const activeIndex = sourceTasks.findIndex((task) => task.id === activeId);
      const overIndex = targetTasks.findIndex((task) => task.id === overId);

      if (activeIndex < 0) return normalized;

      if (sourceColumn === targetColumn) {
        const nextIndex = overIndex >= 0 ? overIndex : sourceTasks.length - 1;
        return {
          ...normalized,
          [sourceColumn]: arrayMove(sourceTasks, activeIndex, nextIndex),
        };
      }

      const movingTask = { ...sourceTasks[activeIndex], status: columnStatus[targetColumn] };
      const insertAt = overIndex >= 0 ? overIndex : targetTasks.length;

      return {
        ...normalized,
        [sourceColumn]: sourceTasks.filter((task) => task.id !== activeId),
        [targetColumn]: [
          ...targetTasks.slice(0, insertAt),
          movingTask,
          ...targetTasks.slice(insertAt),
        ],
      };
    });
    setSelectedTaskId(activeId);
    setConfirmDelete(false);
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="cyan">Drag handle</Badge>
          <h2 className="mt-3 text-3xl font-black">Kanban projet</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Cartes enrichies pour organiser le projet : liens, images, tags, priorité, checklist et échéance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge tone={ready ? "green" : "neutral"}>{ready ? "Sauvegarde active" : "Chargement"}</Badge>
          <Button variant="primary" icon={<Plus size={17} />} type="button" onClick={addTask}>
            Ajouter une carte
          </Button>
        </div>
      </Card>

      <section>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={() => setActiveTaskId(null)}
        >
          <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-4">
            {columns.map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                tasks={normalizedBoard[column.id]}
                selectedTaskId={selectedTaskId}
                onSelect={(id) => {
                  setSelectedTaskId(id);
                  setConfirmDelete(false);
                }}
                onDelete={requestDelete}
              />
            ))}
          </div>
          <DragOverlay dropAnimation={{ duration: 180, easing: "cubic-bezier(.2,1,.2,1)" }}>
            {activeTask ? <KanbanTaskPreview task={activeTask} /> : null}
          </DragOverlay>
        </DndContext>
      </section>

      <Modal
        open={Boolean(selectedTask)}
        title={selectedTask ? selectedTask.title : "Carte kanban"}
        description="Edition complète de la carte projet."
        onClose={() => {
          setSelectedTaskId(null);
          setConfirmDelete(false);
        }}
      >
        {selectedTask ? (
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-[1fr_160px]">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Titre</span>
                <Input
                  className="mt-2"
                  value={selectedTask.title}
                  onChange={(event) => updateTask(selectedTask.id, { title: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Échéance</span>
                <Input
                  className="mt-2"
                  type="date"
                  value={selectedTask.dueDate}
                  onChange={(event) => updateTask(selectedTask.id, { dueDate: event.target.value })}
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Description enrichie</span>
              <Textarea
                className="mt-2 min-h-32 resize-y"
                value={selectedTask.description}
                onChange={(event) =>
                  updateTask(selectedTask.id, {
                    description: event.target.value,
                    note: event.target.value,
                  })
                }
                placeholder="Contexte, objectifs, décisions, critères de sortie..."
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Points</span>
                <Input
                  className="mt-2"
                  type="number"
                  min={1}
                  max={21}
                  value={selectedTask.points}
                  onChange={(event) => updateTask(selectedTask.id, { points: Number(event.target.value) || 1 })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Owner</span>
                <Input
                  className="mt-2"
                  maxLength={3}
                  value={selectedTask.owner}
                  onChange={(event) => updateTask(selectedTask.id, { owner: event.target.value.toUpperCase() })}
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Tags</span>
                <Input
                  className="mt-2"
                  value={selectedTask.tags.join(", ")}
                  onChange={(event) => updateTask(selectedTask.id, { tags: normalizeList(event.target.value) })}
                  placeholder="ui, bug, pokemon"
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Statut</span>
                <select
                  className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-black outline-none"
                  value={selectedTask.status}
                  onChange={(event) => updateTask(selectedTask.id, { status: event.target.value as Task["status"] })}
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Liens</span>
                <Textarea
                  className="mt-2 min-h-24 font-mono text-xs"
                  value={selectedTask.links.join("\n")}
                  onChange={(event) => updateTask(selectedTask.id, { links: splitLines(event.target.value) })}
                  placeholder="https://github.com/..."
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">Images</span>
                <Textarea
                  className="mt-2 min-h-24 font-mono text-xs"
                  value={selectedTask.images.join("\n")}
                  onChange={(event) => updateTask(selectedTask.id, { images: splitLines(event.target.value) })}
                  placeholder="URL image ou asset"
                />
              </label>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Catégorie</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => updateTask(selectedTask.id, { category })}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-black transition",
                        selectedTask.category === category
                          ? categoryStyles[category]
                          : "border-line bg-white/[0.04] text-muted hover:text-foreground",
                      )}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Priorité</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {priorities.map((priority) => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => updateTask(selectedTask.id, { priority })}
                      className={cn(
                        "rounded-full border px-3 py-2 text-xs font-black transition",
                        selectedTask.priority === priority
                          ? priorityStyles[priority]
                          : "border-line bg-white/[0.04] text-muted hover:text-foreground",
                      )}
                    >
                      {priority}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Checklist</p>
              <div className="mt-2 space-y-2">
                {selectedTask.checklist.map((item) => (
                  <div key={item.id} className="grid grid-cols-[auto_1fr_auto] items-center gap-2 rounded-lg border border-line bg-white/[0.04] p-2">
                    <input
                      checked={item.done}
                      className="h-5 w-5 accent-cyan-400"
                      type="checkbox"
                      onChange={(event) =>
                        updateTask(selectedTask.id, {
                          checklist: selectedTask.checklist.map((check) =>
                            check.id === item.id ? { ...check, done: event.target.checked } : check,
                          ),
                        })
                      }
                    />
                    <Input
                      value={item.text}
                      onChange={(event) =>
                        updateTask(selectedTask.id, {
                          checklist: selectedTask.checklist.map((check) =>
                            check.id === item.id ? { ...check, text: event.target.value } : check,
                          ),
                        })
                      }
                    />
                    <Button
                      size="icon"
                      variant="danger"
                      type="button"
                      aria-label="Supprimer l'action"
                      onClick={() =>
                        updateTask(selectedTask.id, {
                          checklist: selectedTask.checklist.filter((check) => check.id !== item.id),
                        })
                      }
                    >
                      <Trash2 size={15} />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  type="button"
                  icon={<Plus size={15} />}
                  onClick={() =>
                    updateTask(selectedTask.id, {
                      checklist: [
                        ...selectedTask.checklist,
                        { id: `${selectedTask.id}-c${Date.now()}`, text: "Nouvelle action", done: false },
                      ],
                    })
                  }
                >
                  Ajouter une action
                </Button>
              </div>
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">Colonne</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {columns.map((column) => (
                  <button
                    key={column.id}
                    type="button"
                    onClick={() => moveTask(selectedTask.id, column.id)}
                    className={cn(
                      "rounded-lg border px-3 py-2 text-left text-xs font-black transition",
                      selectedColumn === column.id
                        ? "border-brand-2/45 bg-brand-2/12 text-foreground"
                        : "border-line bg-white/[0.04] text-muted hover:text-foreground",
                    )}
                  >
                    {column.title}
                  </button>
                ))}
              </div>
            </div>
            <Button className="w-full" variant="primary" icon={<Save size={17} />} type="button" onClick={() => setSelectedTaskId(null)}>
              Sauvegarde locale active
            </Button>
            <Button
              className="w-full"
              variant="danger"
              icon={<Trash2 size={17} />}
              type="button"
              onClick={() => deleteTask(selectedTask.id)}
            >
              {confirmDelete ? "Confirmer la suppression" : "Supprimer la carte"}
            </Button>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}

function KanbanColumn({
  column,
  tasks,
  selectedTaskId,
  onSelect,
  onDelete,
}: {
  column: { id: ColumnId; title: string; hint: string };
  tasks: Task[];
  selectedTaskId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <Card
      ref={setNodeRef}
      data-column-id={column.id}
      className={cn("min-h-[440px] p-3 transition", isOver && "border-brand-2/50 bg-brand-2/8")}
    >
      <div className="flex items-center justify-between gap-3 px-1 py-2">
        <div>
          <h3 className="font-black">{column.title}</h3>
          <p className="text-xs font-bold text-muted">{column.hint}</p>
        </div>
        <Badge tone="neutral">{tasks.length}</Badge>
      </div>
      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="mt-3 space-y-3">
          {tasks.map((task) => (
            <KanbanTaskCard
              key={task.id}
              task={task}
              selected={selectedTaskId === task.id}
              onSelect={onSelect}
              onDelete={onDelete}
            />
          ))}
          {!tasks.length ? (
            <div className="rounded-lg border border-dashed border-line bg-white/[0.025] p-4 text-center text-xs font-bold text-muted">
              Dépose une carte ici.
            </div>
          ) : null}
        </div>
      </SortableContext>
    </Card>
  );
}

function KanbanTaskCard({
  task,
  selected,
  onSelect,
  onDelete,
}: {
  task: Task;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });
  const progress = checklistProgress(task);

  return (
    <article
      ref={setNodeRef}
      data-task-id={task.id}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "rounded-lg border border-line bg-[#101522]/88 p-3 shadow-[0_14px_38px_rgba(0,0,0,0.18)] transition will-change-transform",
        selected && "border-brand-2/55 bg-brand-2/10",
        isDragging && "scale-[1.02] border-brand-2/50 opacity-80",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <Badge className={categoryStyles[task.category]}>
          {task.category}
        </Badge>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="grid h-8 w-8 touch-none place-items-center rounded-lg border border-line bg-white/[0.06] text-muted transition hover:text-foreground"
            aria-label="Glisser la carte"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={16} />
          </button>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-brand-2/10 hover:text-brand-2"
            onClick={() => onSelect(task.id)}
            aria-label="Modifier la carte"
          >
            <Edit3 size={15} />
          </button>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted transition hover:bg-danger/10 hover:text-danger"
            onClick={() => onDelete(task.id)}
            aria-label="Demander la suppression de la carte"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <button type="button" className="block w-full text-left" onClick={() => onSelect(task.id)}>
        <h4 className="mt-4 text-sm font-black leading-6">{task.title}</h4>
        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted">
          {task.description || "Aucune description."}
        </p>
      </button>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className={cn("rounded-full border px-2 py-1 text-[10px] font-black", priorityStyles[task.priority])}>
          {task.priority}
        </span>
        <span className="rounded-full border border-line bg-white/[0.05] px-2 py-1 text-[10px] font-black text-muted">
          {task.status}
        </span>
        {task.dueDate ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-line bg-white/[0.05] px-2 py-1 text-[10px] font-black text-muted">
            <CalendarDays size={11} />
            {task.dueDate}
          </span>
        ) : null}
        {progress ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-brand-3/25 bg-brand-3/10 px-2 py-1 text-[10px] font-black text-brand-3">
            <CheckCircle2 size={11} />
            {progress}
          </span>
        ) : null}
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {task.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full bg-white/[0.055] px-2 py-1 text-[10px] font-black text-muted">
            #{tag}
          </span>
        ))}
      </div>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-xs font-black text-white">
          {task.owner}
        </span>
        <span className="flex items-center gap-2">
          {task.links.length ? <Link2 size={14} className="text-brand-2" /> : null}
          {task.images.length ? <ImageIcon size={14} className="text-brand-3" /> : null}
          <span className="rounded-full border border-line bg-white/[0.06] px-2 py-1 font-mono text-xs font-black text-muted">
            {task.points} pts
          </span>
        </span>
      </div>
    </article>
  );
}

function KanbanTaskPreview({ task }: { task: Task }) {
  return (
    <article className="w-[320px] rounded-lg border border-brand-2/55 bg-[#101522] p-3 shadow-[0_28px_90px_rgba(32,211,255,0.24)]">
      <Badge className={categoryStyles[task.category]}>
        {task.category}
      </Badge>
      <h4 className="mt-4 text-sm font-black leading-6">{task.title}</h4>
      <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted">{task.description}</p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-xs font-black text-white">
          {task.owner}
        </span>
        <span className="rounded-full border border-line bg-white/[0.06] px-2 py-1 font-mono text-xs font-black text-muted">
          {task.points} pts
        </span>
      </div>
    </article>
  );
}
