import javascriptTopic from "@/data/learning/javascript.json";
import functionsTopic from "@/data/learning/functions.json";
import arraysTopic from "@/data/learning/arrays.json";
import objectsTopic from "@/data/learning/objects.json";
import domTopic from "@/data/learning/dom.json";
import asyncTopic from "@/data/learning/async.json";
import curriculumData from "@/data/learning/curriculum.json";
import { LEARNING_XP_PER_LEVEL } from "@/constants/admin/learning";
import type {
  LearningAchievement,
  LearningCurriculum,
  LearningItemType,
  LearningMetric,
  LearningProgressRecord,
  LearningProgressState,
  LearningStatus,
  LearningSummary,
  LearningTopic,
  LearningTopicStats,
  RuntimeLearningTopic,
} from "@/types/admin/learning";

export const learningCurriculum = curriculumData as LearningCurriculum;
const importedTopics = [
  javascriptTopic,
  functionsTopic,
  arraysTopic,
  objectsTopic,
  domTopic,
  asyncTopic,
] as LearningTopic[];

const curriculumOrder = new Map(
  [...learningCurriculum.levels]
    .sort((left, right) => left.order - right.order)
    .flatMap((level) => level.topics)
    .map((topicId, index) => [topicId, index]),
);

export const javascriptLearningTopics = [...importedTopics].sort(
  (left, right) => (curriculumOrder.get(left.id) ?? Number.MAX_SAFE_INTEGER) - (curriculumOrder.get(right.id) ?? Number.MAX_SAFE_INTEGER),
);

export function isCompletedLearningStatus(status: LearningStatus) {
  return status === "completed" || status === "reviewing";
}

export function getCompletedCount(items: Array<{ status: LearningStatus }>) {
  return items.filter((item) => isCompletedLearningStatus(item.status)).length;
}

export function getStatusScore(status: LearningStatus) {
  if (isCompletedLearningStatus(status)) return 1;
  if (status === "in_progress") return 0.5;
  return 0;
}

function getTopicUnits(topic: RuntimeLearningTopic) {
  return [topic.theory, ...topic.exercises, ...topic.pseudocode, ...topic.challenges, ...topic.projects];
}

function getEarnedXP(items: Array<{ earnedXp: number }>) {
  return items.reduce((total, item) => total + item.earnedXp, 0);
}

function getTotalXP(items: Array<{ xp: number }>) {
  return items.reduce((total, item) => total + item.xp, 0);
}

export function getTopicProgress(topic: RuntimeLearningTopic) {
  const units = getTopicUnits(topic);
  if (!units.length) return 0;
  const score = units.reduce((total, unit) => total + getStatusScore(unit.status), 0);
  return Math.round((score / units.length) * 100);
}

export function getTopicStats(topic: RuntimeLearningTopic): LearningTopicStats {
  const units = getTopicUnits(topic);
  return {
    progress: getTopicProgress(topic),
    earnedXP: getEarnedXP(units),
    totalXP: getTotalXP(units),
    completedTheory: getCompletedCount([topic.theory]),
    completedExercises: getCompletedCount(topic.exercises),
    totalExercises: topic.exercises.length,
    completedPseudocode: getCompletedCount(topic.pseudocode),
    totalPseudocode: topic.pseudocode.length,
    completedChallenges: getCompletedCount(topic.challenges),
    totalChallenges: topic.challenges.length,
    completedProjects: getCompletedCount(topic.projects),
    totalProjects: topic.projects.length,
  };
}

export function getLearningSummary(topics: RuntimeLearningTopic[]): LearningSummary {
  const stats = topics.map(getTopicStats);
  const totalUnits = topics.reduce((total, topic) => total + getTopicUnits(topic).length, 0);
  const scoredUnits = topics.reduce(
    (total, topic) => total + getTopicUnits(topic).reduce((sum, unit) => sum + getStatusScore(unit.status), 0),
    0,
  );

  return {
    progress: totalUnits ? Math.round((scoredUnits / totalUnits) * 100) : 0,
    earnedXP: stats.reduce((total, item) => total + item.earnedXP, 0),
    totalXP: stats.reduce((total, item) => total + item.totalXP, 0),
    completedTheory: stats.reduce((total, item) => total + item.completedTheory, 0),
    totalTheory: topics.length,
    completedExercises: stats.reduce((total, item) => total + item.completedExercises, 0),
    totalExercises: stats.reduce((total, item) => total + item.totalExercises, 0),
    completedPseudocode: stats.reduce((total, item) => total + item.completedPseudocode, 0),
    totalPseudocode: stats.reduce((total, item) => total + item.totalPseudocode, 0),
    completedChallenges: stats.reduce((total, item) => total + item.completedChallenges, 0),
    totalChallenges: stats.reduce((total, item) => total + item.totalChallenges, 0),
    completedProjects: stats.reduce((total, item) => total + item.completedProjects, 0),
    totalProjects: stats.reduce((total, item) => total + item.totalProjects, 0),
    topicsCompleted: stats.filter((item) => item.progress === 100).length,
  };
}

const levelTitles = [
  { level: 20, title: "Maître JavaScript" },
  { level: 10, title: "Artisan JavaScript" },
  { level: 5, title: "Développeur Junior" },
  { level: 1, title: "Apprenti JavaScript" },
];

export function getCurrentLevel(xp: number) {
  const safeXP = Math.max(0, xp);
  const level = Math.floor(safeXP / LEARNING_XP_PER_LEVEL) + 1;
  const currentXP = safeXP % LEARNING_XP_PER_LEVEL;
  return {
    level,
    title: levelTitles.find((item) => level >= item.level)?.title || levelTitles.at(-1)!.title,
    currentXP,
    nextLevelXP: LEARNING_XP_PER_LEVEL,
    progress: Math.round((currentXP / LEARNING_XP_PER_LEVEL) * 100),
  };
}

function emptyProgress(itemId: string, topicId: string, itemType: LearningItemType): LearningProgressRecord {
  return {
    itemId,
    topicId,
    itemType,
    status: "not_started",
    startedAt: null,
    completedAt: null,
    attempts: 0,
    earnedXp: 0,
    studySeconds: 0,
    correctionViewed: false,
    updatedAt: "",
  };
}

function runtimeItem<T extends { id: string }>(item: T, topicId: string, itemType: LearningItemType, progress: LearningProgressState) {
  const state = progress[item.id] || emptyProgress(item.id, topicId, itemType);
  return {
    ...item,
    status: state.status,
    startedAt: state.startedAt,
    completedAt: state.completedAt,
    attempts: state.attempts,
    earnedXp: state.earnedXp,
    studySeconds: state.studySeconds,
    answer: state.answer,
    savedAt: state.savedAt,
    correctionViewed: Boolean(state.correctionViewed),
    correctionViewedAt: state.correctionViewedAt,
  };
}

export function mergeLearningTopics(topics: LearningTopic[], progress: LearningProgressState): RuntimeLearningTopic[] {
  return topics.map((topic) => {
    const nextTopic = {
      ...topic,
      theory: runtimeItem(topic.theory, topic.id, "theory", progress),
      exercises: topic.exercises.map((item) => runtimeItem(item, topic.id, "exercise", progress)),
      pseudocode: topic.pseudocode.map((item) => runtimeItem(item, topic.id, "pseudocode", progress)),
      challenges: topic.challenges.map((item) => runtimeItem(item, topic.id, "challenge", progress)),
      projects: topic.projects.map((item) => runtimeItem(item, topic.id, "project", progress)),
    };
    const progressValue = getTopicProgress({ ...nextTopic, status: "not_started" });
    return {
      ...nextTopic,
      status: progressValue === 100 ? "completed" : progressValue > 0 ? "in_progress" : "not_started",
    };
  });
}

function metricValue(topic: RuntimeLearningTopic, metric: LearningMetric) {
  const stats = getTopicStats(topic);
  return stats[metric];
}

function allRuntimeItems(topics: RuntimeLearningTopic[]) {
  return topics.flatMap((topic) => [topic.theory, ...topic.exercises, ...topic.pseudocode, ...topic.challenges, ...topic.projects]);
}

function achievementValue(
  achievement: LearningAchievement,
  hostTopic: RuntimeLearningTopic,
  topics: RuntimeLearningTopic[],
  summary: LearningSummary,
  curriculum: LearningCurriculum,
) {
  const scope = achievement.scope;
  if ("global" in scope) return summary[achievement.metric];
  if ("topicId" in scope) {
    const topic = topics.find((item) => item.id === scope.topicId) || hostTopic;
    return metricValue(topic, achievement.metric);
  }
  if ("levelId" in scope) {
    const topicIds = curriculum.levels.find((level) => level.id === scope.levelId)?.topics || [];
    return topicIds.reduce((total, topicId) => {
      const topic = topics.find((item) => item.id === topicId);
      return total + (topic ? metricValue(topic, achievement.metric) : 0);
    }, 0);
  }
  if ("projectId" in scope) {
    return allRuntimeItems(topics).some((item) => item.id === scope.projectId && isCompletedLearningStatus(item.status)) ? 1 : 0;
  }
  const ids = new Set(scope.itemIds);
  return allRuntimeItems(topics).filter((item) => ids.has(item.id) && isCompletedLearningStatus(item.status)).length;
}

export function getAchievements(
  topics: RuntimeLearningTopic[],
  summary: LearningSummary,
  curriculum: LearningCurriculum = learningCurriculum,
) {
  const seen = new Set<string>();
  return topics.flatMap((topic) => topic.achievements.map((achievement) => ({ achievement, topic })))
    .filter(({ achievement }) => {
      if (seen.has(achievement.id)) return false;
      seen.add(achievement.id);
      return true;
    })
    .map(({ achievement, topic }) => {
      const value = achievementValue(achievement, topic, topics, summary, curriculum);
      return {
        ...achievement,
        value,
        progress: Math.min(100, Math.round((value / Math.max(achievement.target, 1)) * 100)),
        unlocked: value >= achievement.target,
      };
    });
}

export function getLearningMetricLabel(metric: LearningMetric) {
  return {
    completedTheory: "théorie terminée",
    completedExercises: "exercices terminés",
    completedPseudocode: "pseudo-codes terminés",
    completedChallenges: "challenges terminés",
    completedProjects: "projets terminés",
  }[metric];
}

export function findLearningItem(topics: LearningTopic[], itemId: string) {
  for (const topic of topics) {
    const typedGroups = [
      ["theory", [topic.theory]],
      ["exercise", topic.exercises],
      ["pseudocode", topic.pseudocode],
      ["challenge", topic.challenges],
      ["project", topic.projects],
    ] as const;
    for (const [itemType, items] of typedGroups) {
      const item = items.find((candidate) => candidate.id === itemId);
      if (item) return { item, itemType, topic };
    }
  }
  return null;
}
