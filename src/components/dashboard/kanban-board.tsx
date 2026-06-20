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
import { Edit3, GripVertical, Plus, Save, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { DashboardLoadingState } from "@/components/dashboard/loading-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import {
  initialBoard,
  kanbanCategories as categories,
  kanbanColumns as columns,
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

export function KanbanBoard() {
  const [board, setBoard, ready] = usePersistentState("matweb.kanban", initialBoard);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const taskToColumn = useMemo(() => {
    const map = new Map<string, ColumnId>();
    columns.forEach((column) => {
      board[column.id].forEach((task) => map.set(task.id, column.id));
    });
    return map;
  }, [board]);

  const selectedTask = useMemo(() => {
    for (const column of columns) {
      const task = board[column.id].find((item) => item.id === selectedTaskId);
      if (task) return task;
    }
    return null;
  }, [board, selectedTaskId]);

  const selectedColumn = selectedTask ? taskToColumn.get(selectedTask.id) : undefined;
  const activeTask = useMemo(() => {
    for (const column of columns) {
      const task = board[column.id].find((item) => item.id === activeTaskId);
      if (task) return task;
    }
    return null;
  }, [activeTaskId, board]);

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
    };

    setBoard((current) => ({
      ...current,
      backlog: [task, ...current.backlog],
    }));
    setSelectedTaskId(task.id);
  }

  function updateTask(id: string, patch: Partial<Task>) {
    setBoard((current) => {
      const next = { ...current };
      columns.forEach((column) => {
        next[column.id] = current[column.id].map((task) =>
          task.id === id ? { ...task, ...patch } : task,
        );
      });
      return next;
    });
  }

  function moveTask(id: string, targetColumn: ColumnId) {
    const sourceColumn = taskToColumn.get(id);
    if (!sourceColumn || sourceColumn === targetColumn) return;

    setBoard((current) => {
      const movingTask = current[sourceColumn].find((task) => task.id === id);
      if (!movingTask) return current;
      return {
        ...current,
        [sourceColumn]: current[sourceColumn].filter((task) => task.id !== id),
        [targetColumn]: [movingTask, ...current[targetColumn]],
      };
    });
  }

  function deleteTask(id: string) {
    setBoard((current) => {
      const next = { ...current };
      columns.forEach((column) => {
        next[column.id] = current[column.id].filter((task) => task.id !== id);
      });
      return next;
    });
    setSelectedTaskId(null);
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
      const sourceTasks = current[sourceColumn];
      const targetTasks = current[targetColumn];
      const activeIndex = sourceTasks.findIndex((task) => task.id === activeId);
      const overIndex = targetTasks.findIndex((task) => task.id === overId);

      if (activeIndex < 0) return current;

      if (sourceColumn === targetColumn) {
        const nextIndex = overIndex >= 0 ? overIndex : sourceTasks.length - 1;
        return {
          ...current,
          [sourceColumn]: arrayMove(sourceTasks, activeIndex, nextIndex),
        };
      }

      const movingTask = sourceTasks[activeIndex];
      const insertAt = overIndex >= 0 ? overIndex : targetTasks.length;

      return {
        ...current,
        [sourceColumn]: sourceTasks.filter((task) => task.id !== activeId),
        [targetColumn]: [
          ...targetTasks.slice(0, insertAt),
          movingTask,
          ...targetTasks.slice(insertAt),
        ],
      };
    });
    setSelectedTaskId(activeId);
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="cyan">Drag handle</Badge>
          <h2 className="mt-3 text-3xl font-black">Kanban projet</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Glisse avec la poignée, clique pour éditer, supprime quand la carte ne sert plus.
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
                tasks={board[column.id]}
                selectedTaskId={selectedTaskId}
                onSelect={setSelectedTaskId}
                onDelete={deleteTask}
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
        description="Création, édition, catégorie, points et colonne."
        onClose={() => setSelectedTaskId(null)}
      >
        {selectedTask ? (
          <div className="space-y-4">
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Titre
                </span>
                <Input
                  className="mt-2"
                  value={selectedTask.title}
                  onChange={(event) => updateTask(selectedTask.id, { title: event.target.value })}
                />
              </label>
              <label className="block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Note
                </span>
                <textarea
                  className="mt-2 min-h-28 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3 text-sm font-semibold leading-6 outline-none transition focus:border-brand-2/55"
                  value={selectedTask.note}
                  onChange={(event) => updateTask(selectedTask.id, { note: event.target.value })}
                />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Points
                  </span>
                  <Input
                    className="mt-2"
                    type="number"
                    min={1}
                    max={21}
                    value={selectedTask.points}
                    onChange={(event) =>
                      updateTask(selectedTask.id, { points: Number(event.target.value) || 1 })
                    }
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Owner
                  </span>
                  <Input
                    className="mt-2"
                    maxLength={3}
                    value={selectedTask.owner}
                    onChange={(event) =>
                      updateTask(selectedTask.id, { owner: event.target.value.toUpperCase() })
                    }
                  />
                </label>
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Catégorie
                </p>
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
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Colonne
                </p>
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
                Sauvegarde automatique
              </Button>
              <Button
                className="w-full"
                variant="danger"
                icon={<Trash2 size={17} />}
                type="button"
                onClick={() => deleteTask(selectedTask.id)}
              >
                Supprimer la carte
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
        <span
          className={cn(
            "inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black",
            categoryStyles[task.category],
          )}
        >
          {task.category}
        </span>
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
            aria-label="Supprimer la carte"
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
      <button type="button" className="block w-full text-left" onClick={() => onSelect(task.id)}>
        <h4 className="mt-4 text-sm font-black leading-6">{task.title}</h4>
        <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted">
          {task.note}
        </p>
      </button>
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

function KanbanTaskPreview({ task }: { task: Task }) {
  return (
    <article className="w-[320px] rounded-lg border border-brand-2/55 bg-[#101522] p-3 shadow-[0_28px_90px_rgba(32,211,255,0.24)]">
      <span className={cn("inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black", categoryStyles[task.category])}>
        {task.category}
      </span>
      <h4 className="mt-4 text-sm font-black leading-6">{task.title}</h4>
      <p className="mt-2 line-clamp-2 text-xs font-semibold leading-5 text-muted">{task.note}</p>
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
