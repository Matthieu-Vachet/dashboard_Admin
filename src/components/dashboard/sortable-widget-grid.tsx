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
import { ChevronDown, ChevronUp, GripVertical } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo } from "react";
import { cn } from "@/lib/cn";
import { usePersistentState } from "@/lib/use-persistent-state";

export type SortableWidgetItem = {
  id: string;
  node: ReactNode;
  className?: string;
};

export function SortableWidgetGrid({
  storageKey,
  items,
  className,
  itemClassName,
}: {
  storageKey: string;
  items: SortableWidgetItem[];
  className?: string;
  itemClassName?: string;
}) {
  const defaultOrder = items.map((item) => item.id);
  const [widgetOrder, setWidgetOrder] = usePersistentState<string[]>(storageKey, defaultOrder);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 120, tolerance: 8 } }),
  );

  const orderedItems = useMemo(() => {
    const byId = new Map(items.map((item) => [item.id, item]));
    const validIds = widgetOrder.filter((id) => byId.has(id));
    const missingIds = defaultOrder.filter((id) => !validIds.includes(id));
    return [...validIds, ...missingIds].map((id) => byId.get(id)).filter(Boolean) as SortableWidgetItem[];
  }, [defaultOrder, items, widgetOrder]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setWidgetOrder((current) => {
      const valid = current.filter((id) => defaultOrder.includes(id));
      const oldIndex = valid.indexOf(String(active.id));
      const newIndex = valid.indexOf(String(over.id));
      if (oldIndex < 0 || newIndex < 0) return current;
      return arrayMove(valid, oldIndex, newIndex);
    });
  }

  function moveWidget(id: string, direction: -1 | 1) {
    setWidgetOrder((current) => {
      const valid = current.filter((item) => defaultOrder.includes(item));
      const index = valid.indexOf(id);
      const nextIndex = index + direction;
      if (index < 0 || nextIndex < 0 || nextIndex >= valid.length) return current;
      return arrayMove(valid, index, nextIndex);
    });
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={orderedItems.map((item) => item.id)} strategy={rectSortingStrategy}>
        <section className={cn("grid min-w-0 gap-5", className)}>
          {orderedItems.map((item, index) => (
            <SortableWidgetFrame
              className={cn(itemClassName, item.className)}
              id={item.id}
              index={index}
              isFirst={index === 0}
              isLast={index === orderedItems.length - 1}
              key={item.id}
              onMove={moveWidget}
            >
              {item.node}
            </SortableWidgetFrame>
          ))}
        </section>
      </SortableContext>
    </DndContext>
  );
}

function SortableWidgetFrame({
  id,
  index,
  isFirst,
  isLast,
  children,
  className,
  onMove,
}: {
  id: string;
  index: number;
  isFirst: boolean;
  isLast: boolean;
  children: ReactNode;
  className?: string;
  onMove: (id: string, direction: -1 | 1) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
  };

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("min-w-0", className)}
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
        <div className="mt-2 flex flex-wrap items-center justify-end gap-2 rounded-2xl border border-white/10 bg-slate-950/45 px-2 py-2 opacity-80 backdrop-blur transition group-hover:opacity-100">
          <button
            aria-label="Déplacer ce widget"
            className="inline-flex min-h-9 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.07] px-3 text-xs font-black text-slate-200"
            type="button"
            {...attributes}
            {...listeners}
          >
            <GripVertical size={14} />
            Déplacer
          </button>
          <button
            aria-label="Monter ce widget"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-200 disabled:opacity-35"
            disabled={isFirst}
            type="button"
            onClick={() => onMove(id, -1)}
          >
            <ChevronUp size={15} />
          </button>
          <button
            aria-label="Descendre ce widget"
            className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/[0.07] text-slate-200 disabled:opacity-35"
            disabled={isLast}
            type="button"
            onClick={() => onMove(id, 1)}
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
