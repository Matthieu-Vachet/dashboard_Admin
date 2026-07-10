"use client";

import { useMemo } from "react";
import { javascriptLearningTopics, mergeLearningTopics } from "@/lib/learning/javascript";
import { usePersistentState } from "@/lib/use-persistent-state";
import type { LearningProgressState, LearningStatus } from "@/types/admin/learning";

const STORAGE_KEY = "matweb.js.learning.progress";

export function useJavascriptLearning() {
  const [progress, setProgress, ready] = usePersistentState<LearningProgressState>(STORAGE_KEY, {});
  const topics = useMemo(() => mergeLearningTopics(javascriptLearningTopics, progress), [progress]);

  function setItemStatus(id: string, status: LearningStatus) {
    setProgress((current) => ({ ...current, [id]: status }));
  }

  return { topics, ready, setItemStatus };
}

