export type LearningStatus = "not_started" | "in_progress" | "completed";
export type LearningDifficulty = "Facile" | "Moyen" | "Difficile";
export type LearningMetric =
  | "completedTheory"
  | "completedExercises"
  | "completedPseudocode"
  | "completedChallenges"
  | "completedProjects";

export type LearningItem = {
  id: string;
  title: string;
  description?: string;
  difficulty?: LearningDifficulty;
  status: LearningStatus;
  xp: number;
};

export type LearningTheory = {
  status: LearningStatus;
  xp: number;
};

export type LearningAchievement = {
  id: string;
  title: string;
  description: string;
  metric: LearningMetric;
  target: number;
  unlocked?: boolean;
};

export type LearningTopic = {
  id: string;
  title: string;
  category: string;
  difficulty: LearningDifficulty;
  status: LearningStatus;
  description: string;
  book: { chapter: string; pages: string };
  resources: { mdn: string; roadmap: string };
  prerequisites: string[];
  theory: LearningTheory;
  exercises: LearningItem[];
  pseudocode: LearningItem[];
  challenges: LearningItem[];
  projects: LearningItem[];
  achievements: LearningAchievement[];
};

export type LearningProgressState = Record<string, LearningStatus>;

export type LearningTopicStats = {
  progress: number;
  earnedXP: number;
  totalXP: number;
  completedTheory: number;
  completedExercises: number;
  totalExercises: number;
  completedPseudocode: number;
  totalPseudocode: number;
  completedChallenges: number;
  totalChallenges: number;
  completedProjects: number;
  totalProjects: number;
};

export type LearningSummary = {
  progress: number;
  earnedXP: number;
  totalXP: number;
  completedTheory: number;
  totalTheory: number;
  completedExercises: number;
  totalExercises: number;
  completedPseudocode: number;
  totalPseudocode: number;
  completedChallenges: number;
  totalChallenges: number;
  completedProjects: number;
  totalProjects: number;
  topicsCompleted: number;
};

