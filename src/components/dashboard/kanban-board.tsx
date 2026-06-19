"use client";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
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
import { Plus } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

type Category = "Produit" | "Design" | "API" | "IA" | "Urgent";
type ColumnId = "backlog" | "doing" | "review" | "done";

type Task = {
  id: string;
  title: string;
  category: Category;
  points: number;
  owner: string;
};

type BoardState = Record<ColumnId, Task[]>;

const columns: Array<{ id: ColumnId; title: string; hint: string }> = [
  { id: "backlog", title: "Backlog", hint: "À cadrer" },
  { id: "doing", title: "En cours", hint: "Focus actif" },
  { id: "review", title: "Review", hint: "À vérifier" },
  { id: "done", title: "Terminé", hint: "Shippé" },
];

const initialBoard: BoardState = {
  backlog: [
    { id: "k1", title: "Finaliser les tokens Storybook", category: "Design", points: 3, owner: "MW" },
    { id: "k2", title: "Brancher les stats Pokémon détaillées", category: "API", points: 5, owner: "MW" },
  ],
  doing: [
    { id: "k3", title: "Créer le dashboard personnel", category: "Produit", points: 8, owner: "MW" },
    { id: "k4", title: "Préparer les prompts assistant", category: "IA", points: 3, owner: "AI" },
  ],
  review: [
    { id: "k5", title: "Vérifier le parcours login", category: "Urgent", points: 2, owner: "MW" },
  ],
  done: [
    { id: "k6", title: "Architecture Next + Tailwind", category: "Produit", points: 5, owner: "MW" },
  ],
};

const categoryStyles: Record<Category, string> = {
  Produit: "border-brand-2/30 bg-brand-2/10 text-cyan-100",
  Design: "border-brand/30 bg-brand/10 text-violet-100",
  API: "border-brand-3/30 bg-brand-3/10 text-emerald-100",
  IA: "border-warning/35 bg-warning/10 text-amber-100",
  Urgent: "border-danger/35 bg-danger/10 text-rose-100",
};

export function KanbanBoard() {
  const [board, setBoard] = useState(initialBoard);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const taskToColumn = useMemo(() => {
    const map = new Map<string, ColumnId>();
    columns.forEach((column) => {
      board[column.id].forEach((task) => map.set(task.id, column.id));
    });
    return map;
  }, [board]);

  function addTask() {
    setBoard((current) => ({
      ...current,
      backlog: [
        {
          id: `k${Date.now()}`,
          title: "Nouvelle carte projet",
          category: "Produit",
          points: 1,
          owner: "MW",
        },
        ...current.backlog,
      ],
    }));
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

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
        return {
          ...current,
          [sourceColumn]: arrayMove(
            sourceTasks,
            activeIndex,
            overIndex >= 0 ? overIndex : targetTasks.length - 1,
          ),
        };
      }

      const [movingTask] = sourceTasks.slice(activeIndex, activeIndex + 1);
      const nextSource = sourceTasks.filter((task) => task.id !== activeId);
      const insertAt = overIndex >= 0 ? overIndex : targetTasks.length;
      const nextTarget = [
        ...targetTasks.slice(0, insertAt),
        movingTask,
        ...targetTasks.slice(insertAt),
      ];

      return {
        ...current,
        [sourceColumn]: nextSource,
        [targetColumn]: nextTarget,
      };
    });
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Badge tone="cyan">Drag and drop</Badge>
          <h2 className="mt-3 text-3xl font-black">Kanban projet</h2>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-muted">
            Déplace les cartes entre colonnes, trie les priorités et garde les catégories visuelles.
          </p>
        </div>
        <Button variant="primary" icon={<Plus size={17} />} type="button" onClick={addTask}>
          Ajouter une carte
        </Button>
      </Card>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div className="grid gap-4 xl:grid-cols-4">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} tasks={board[column.id]} />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

function KanbanColumn({
  column,
  tasks,
}: {
  column: { id: ColumnId; title: string; hint: string };
  tasks: Task[];
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  return (
    <Card
      ref={setNodeRef}
      className={cn("min-h-[560px] p-3 transition", isOver && "border-brand-2/50 bg-brand-2/8")}
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
            <KanbanTaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </Card>
  );
}

export function KanbanTaskCard({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: task.id });

  return (
    <article
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "rounded-lg border border-line bg-[#101522]/88 p-3 shadow-[0_14px_38px_rgba(0,0,0,0.18)] transition",
        isDragging && "scale-[1.02] border-brand-2/50 opacity-80",
      )}
      {...attributes}
      {...listeners}
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
        <span className="rounded-full border border-line bg-white/[0.06] px-2 py-1 font-mono text-xs font-black text-muted">
          {task.points} pts
        </span>
      </div>
      <h4 className="mt-4 text-sm font-black leading-6">{task.title}</h4>
      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-xs font-black text-white">
          {task.owner}
        </span>
        <span className="text-xs font-bold text-muted">Glisser</span>
      </div>
    </article>
  );
}
