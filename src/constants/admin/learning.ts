import type { LearningDifficulty, LearningStatus } from "@/types/admin/learning";

export const LEARNING_STATUS_LABEL: Record<LearningStatus, string> = {
  not_started: "À commencer",
  in_progress: "En cours",
  completed: "Terminé",
  reviewing: "En révision",
};

export const LEARNING_STATUS_CLASS: Record<LearningStatus, string> = {
  not_started: "border-line bg-surface-flat text-muted",
  in_progress: "border-brand-2/30 bg-brand-2/10 text-brand-2",
  completed: "border-brand-3/30 bg-brand-3/10 text-brand-3",
  reviewing: "border-brand/30 bg-brand/10 text-brand",
};

export const LEARNING_DIFFICULTY_CLASS: Record<LearningDifficulty, string> = {
  Facile: "border-brand-3/25 bg-brand-3/10 text-brand-3",
  Moyen: "border-warning/30 bg-warning/10 text-warning",
  Difficile: "border-danger/30 bg-danger/10 text-danger",
};

export const LEARNING_XP_PER_LEVEL = 250;
