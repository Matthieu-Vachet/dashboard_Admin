"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import { Eye, EyeOff, GripVertical, RotateCcw, SlidersHorizontal } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

export type SortableWidgetItem = {
  id: string;
  label?: string;
  node: ReactNode;
  className?: string;
};

const widgetAccents = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166", "#ff5f7d"];

export function SortableWidgetGrid({
  storageKey,
  items,
  className,
  itemClassName,
  columnsClassName = "columns-1 lg:columns-2 2xl:columns-3",
  enableHide = true,
}: {
  storageKey: string;
  items: SortableWidgetItem[];
  className?: string;
  itemClassName?: string;
  columnsClassName?: string;
  enableHide?: boolean;
}) {
  const defaultOrder = useMemo(() => items.map((item) => item.id), [items]);
  const dndContextId = useMemo(
    () => `dashboard-widgets-${storageKey.replace(/[^a-z0-9_-]/gi, "-")}`,
    [storageKey],
  );
  const [widgetOrder, setWidgetOrder] = usePersistentState<string[]>(storageKey, defaultOrder);
  const [hiddenWidgets, setHiddenWidgets] = usePersistentState<string[]>(`${storageKey}.hidden`, []);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
  );

  const orderedItems = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const validIds = widgetOrder.filter((id) => byId.has(id));
    const missingIds = defaultOrder.filter((id) => !validIds.includes(id));
    const hidden = new Set(hiddenWidgets.filter((id) => byId.has(id)));
    return [...validIds, ...missingIds]
      .filter((id) => !hidden.has(id))
      .map((id) => byId.get(id))
      .filter(Boolean) as SortableWidgetItem[];
  }, [defaultOrder, hiddenWidgets, items, widgetOrder]);

  const hiddenItems = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item]));
    return hiddenWidgets
      .map((id) => byId.get(id))
      .filter(Boolean) as SortableWidgetItem[];
  }, [hiddenWidgets, items]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWidgetOrder((current) => {
      const visibleIds = orderedItems.map((item) => item.id);
      const valid = current.filter((id) => visibleIds.includes(id));
      const missing = visibleIds.filter((id) => !valid.includes(id));
      const nextVisible = [...valid, ...missing];
      const oldIndex = nextVisible.indexOf(String(active.id));
      const newIndex = nextVisible.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return current;
      const movedVisible = arrayMove(nextVisible, oldIndex, newIndex);
      return [...movedVisible, ...defaultOrder.filter((id) => !movedVisible.includes(id))];
    });
  }

  function hideWidget(id: string) {
    setHiddenWidgets((current) => (current.includes(id) ? current : [...current, id]));
  }

  function showWidget(id: string) {
    setHiddenWidgets((current) => current.filter((item) => item !== id));
  }

  function resetWidgets() {
    setWidgetOrder(defaultOrder);
    setHiddenWidgets([]);
  }

  return (
    <div className="space-y-3">
      {enableHide ? (
        <div className="widget-toolbar flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-slate-950/35 px-3 py-2 text-xs font-black text-slate-300">
          <span className="inline-flex items-center gap-2 text-cyan-100">
            <SlidersHorizontal size={15} />
            Widgets
          </span>
          <div className="flex flex-wrap items-center justify-end gap-2">
            {hiddenItems.length ? (
              hiddenItems.map((item) => (
                <button
                  className="widget-toolbar-button inline-flex min-h-8 items-center gap-2 rounded-xl border border-emerald-300/25 bg-emerald-400/10 px-3 text-emerald-100 transition hover:bg-emerald-400/18"
                  key={item.id}
                  type="button"
                  onClick={() => showWidget(item.id)}
                >
                  <Eye size={14} />
                  {item.label || item.id}
                </button>
              ))
            ) : (
              <span className="widget-toolbar-empty rounded-xl border border-white/10 bg-white/[0.045] px-3 py-2 text-slate-500">
                Aucun widget masqué
              </span>
            )}
            <button
              className="widget-toolbar-button inline-flex min-h-8 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 text-slate-200 transition hover:border-cyan-200/40 hover:bg-cyan-400/12"
              type="button"
              onClick={resetWidgets}
            >
              <RotateCcw size={14} />
              Réinitialiser
            </button>
          </div>
        </div>
      ) : null}

      <DndContext
        id={dndContextId}
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={orderedItems.map((item) => item.id)} strategy={rectSortingStrategy}>
          <section className={cn("min-w-0 gap-4", columnsClassName, className)}>
            {orderedItems.map((item, index) => (
              <SortableWidgetFrame
                className={cn(itemClassName, item.className)}
                id={item.id}
                index={index}
                key={item.id}
                label={item.label || item.id}
                onHide={enableHide ? hideWidget : undefined}
              >
                {item.node}
              </SortableWidgetFrame>
            ))}
          </section>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableWidgetFrame({
  id,
  index,
  label,
  children,
  className,
  onHide,
}: {
  id: string;
  index: number;
  label: string;
  children: ReactNode;
  className?: string;
  onHide?: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    "--widget-accent": widgetAccents[index % widgetAccents.length],
  } as CSSProperties;

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("widget-glow-frame mb-4 min-w-0 break-inside-avoid", className)}
      initial={{ opacity: 0, y: 12 }}
      ref={setNodeRef}
      style={style}
      transition={{ delay: index * 0.025 }}
    >
      <div
        className={cn(
          "group relative min-w-0 rounded-2xl transition",
          isDragging && "scale-[1.01] opacity-90 shadow-[0_26px_90px_rgba(34,211,238,.22)]",
        )}
      >
        {children}
        <div className="widget-frame-actions absolute right-3 top-3 z-20 flex items-center gap-1 rounded-2xl border border-white/10 bg-slate-950/70 p-1 opacity-100 shadow-2xl backdrop-blur transition md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
          <button
            aria-label={`Déplacer le widget ${label}`}
            className="widget-frame-button grid h-9 w-9 touch-none place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/15"
            type="button"
            suppressHydrationWarning
            {...attributes}
            {...listeners}
          >
            <GripVertical size={14} />
          </button>
          {onHide ? (
            <button
              aria-label={`Masquer le widget ${label}`}
              className="widget-frame-button grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-100 transition hover:border-amber-200/40 hover:bg-amber-400/15"
              type="button"
              onClick={() => onHide(id)}
            >
              <EyeOff size={14} />
            </button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
