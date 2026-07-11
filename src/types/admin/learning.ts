export type LearningStatus = "not_started" | "in_progress" | "completed" | "reviewing";
export type LearningDifficulty = "Facile" | "Moyen" | "Difficile";
export type LearningItemType = "theory" | "exercise" | "pseudocode" | "challenge" | "project";
export type LearningMetric =
  | "completedTheory"
  | "completedExercises"
  | "completedPseudocode"
  | "completedChallenges"
  | "completedProjects";

export type LearningBookReference = {
  chapter: string;
  title: string;
  pages: string;
  url?: string;
};

export type LearningLink = {
  id: string;
  label: string;
  url: string;
  kind: "book" | "mdn" | "roadmap" | "video" | "notes" | "other";
  description?: string;
};

export type LearningCodeExample = {
  language: string;
  code: string;
  explanation?: string;
};

export type LearningTheorySection = {
  id: string;
  type?: string;
  title: string;
  content: string;
  code?: string;
  language?: string;
  warning?: string | string[];
  tips?: string[];
  questions?: string[];
  codeExamples?: LearningCodeExample[];
  warnings?: string[];
  comprehensionQuestions?: string[];
  summary?: string;
};

export type LearningTheory = {
  id: string;
  title: string;
  summary: string;
  description: string;
  objectives: string[];
  estimatedMinutes: number;
  duration?: number;
  level: LearningDifficulty;
  commonMistakes: string[];
  bestPractices: string[];
  finalSummary: string;
  sections?: LearningTheorySection[];
  xp: number;
};

export type LearningExercise = {
  id: string;
  title: string;
  description: string;
  objective: string;
  difficulty: LearningDifficulty;
  estimatedMinutes: number;
  xp: number;
  skills: string[];
  prerequisites: string[];
  hint?: string;
  validation: string[];
};

export type LearningPseudocode = {
  id: string;
  title: string;
  objective: string;
  situation: string;
  description: string;
  difficulty: LearningDifficulty;
  estimatedMinutes: number;
  xp: number;
  skills: string[];
  correction: string;
  validation: string[];
};

export type LearningChallenge = {
  id: string;
  title: string;
  description: string;
  objective: string;
  constraints: string[];
  requiredFeatures: string[];
  bonusFeatures: string[];
  forbidden: string[];
  concepts: string[];
  difficulty: LearningDifficulty;
  estimatedMinutes: number;
  xp: number;
  validation: string[];
};

export type LearningProject = {
  id: string;
  title: string;
  context: string;
  objective: string;
  description: string;
  features: string[];
  constraints: string[];
  bonusFeatures: string[];
  suggestedPseudocode: string[];
  concepts: string[];
  validatedSkills: string[];
  difficulty: LearningDifficulty;
  estimatedMinutes: number;
  xp: number;
  validation: string[];
};

export type LearningAchievementScope =
  | { global: true }
  | { levelId: string }
  | { topicId: string }
  | { projectId: string }
  | { itemIds: string[] };

export type LearningAchievement = {
  id: string;
  title: string;
  description: string;
  metric: LearningMetric;
  scope: LearningAchievementScope;
  target: number;
};

export type LearningTopic = {
  schemaVersion: 1;
  id: string;
  title: string;
  category: string;
  difficulty: LearningDifficulty;
  description: string;
  chapterNumber: number;
  required: boolean;
  curriculum: { levelId: string; order: number };
  book: { references: LearningBookReference[] };
  resources: LearningLink[];
  prerequisites: string[];
  relatedTopics: string[];
  theory: LearningTheory;
  exercises: LearningExercise[];
  pseudocode: LearningPseudocode[];
  challenges: LearningChallenge[];
  projects: LearningProject[];
  achievements: LearningAchievement[];
};

export type LearningPlannedTopic = {
  id: string;
  title: string;
  category: string;
  required: boolean;
};

export type LearningCurriculumLevel = {
  id: string;
  title: string;
  order: number;
  description: string;
  topics: string[];
  plannedTopics: LearningPlannedTopic[];
};

export type LearningCurriculum = {
  schemaVersion: 1;
  id: string;
  title: string;
  levels: LearningCurriculumLevel[];
};

export type LearningProgressRecord = {
  itemId: string;
  topicId: string;
  itemType: LearningItemType;
  status: LearningStatus;
  startedAt: string | null;
  completedAt: string | null;
  attempts: number;
  earnedXp: number;
  studySeconds: number;
  answer?: string;
  savedAt?: string;
  correctionViewed?: boolean;
  correctionViewedAt?: string;
  updatedAt: string;
  migratedFrom?: string;
};

export type LearningProgressState = Record<string, LearningProgressRecord>;

export type LearningRuntimeFields = {
  status: LearningStatus;
  startedAt: string | null;
  completedAt: string | null;
  attempts: number;
  earnedXp: number;
  studySeconds: number;
  answer?: string;
  savedAt?: string;
  correctionViewed: boolean;
  correctionViewedAt?: string;
};

export type LearningProgressPatch = {
  status?: LearningStatus;
  answer?: string;
  correctionViewed?: boolean;
};

export type LearningProgressMutationResult = {
  progress: LearningProgressRecord;
  messages: string[];
  activityRecorded: boolean;
  xpAwarded: number;
};

export type RuntimeLearningTheory = LearningTheory & LearningRuntimeFields;
export type RuntimeLearningExercise = LearningExercise & LearningRuntimeFields;
export type RuntimeLearningPseudocode = LearningPseudocode & LearningRuntimeFields;
export type RuntimeLearningChallenge = LearningChallenge & LearningRuntimeFields;
export type RuntimeLearningProject = LearningProject & LearningRuntimeFields;

export type RuntimeLearningTopic = Omit<
  LearningTopic,
  "theory" | "exercises" | "pseudocode" | "challenges" | "projects"
> & {
  status: LearningStatus;
  theory: RuntimeLearningTheory;
  exercises: RuntimeLearningExercise[];
  pseudocode: RuntimeLearningPseudocode[];
  challenges: RuntimeLearningChallenge[];
  projects: RuntimeLearningProject[];
};

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

export type LearningActivity = {
  id: string;
  itemId: string;
  topicId: string;
  itemType: LearningItemType;
  action: "started" | "completed" | "answer_saved";
  title: string;
  xp: number;
  studySeconds: number;
  occurredAt: string;
};

export type LearningAdvancedStats = {
  totalStudySeconds: number;
  weekStudySeconds: number;
  todayStudySeconds: number;
  xpToday: number;
  xpWeek: number;
  xpMonth: number;
  completedExercises: number;
  completedChallenges: number;
  completedProjects: number;
  currentStreak: number;
  bestStreak: number;
  lastActivity: string | null;
};

export type LearningImportStrategy = "create" | "replace" | "merge";

export type LearningValidationIssue = {
  path: string;
  message: string;
  severity: "error" | "warning";
};
