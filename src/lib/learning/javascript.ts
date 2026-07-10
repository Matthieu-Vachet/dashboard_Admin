import javascriptTopic from "@/data/learning/javascript.json";
import functionsTopic from "@/data/learning/functions.json";
import arraysTopic from "@/data/learning/arrays.json";
import objectsTopic from "@/data/learning/objects.json";
import domTopic from "@/data/learning/dom.json";
import asyncTopic from "@/data/learning/async.json";
import { LEARNING_XP_PER_LEVEL } from "@/constants/admin/learning";
import type {
  LearningAchievement,
  LearningItem,
  LearningMetric,
  LearningProgressState,
  LearningStatus,
  LearningSummary,
  LearningTopic,
  LearningTopicStats,
} from "@/types/admin/learning";

// Les fichiers JSON restent la source d'autorité; ce cast décrit leur contrat partagé côté TypeScript.
export const javascriptLearningTopics = [
  javascriptTopic,
  functionsTopic,
  arraysTopic,
  objectsTopic,
  domTopic,
  asyncTopic,
] as unknown as LearningTopic[];

export function getCompletedCount(items: Array<{ status: LearningStatus }>) {
  return items.filter((item) => item.status === "completed").length;
}

export function getStatusScore(status: LearningStatus) {
  if (status === "completed") return 1;
  if (status === "in_progress") return 0.5;
  return 0;
}

function getTopicUnits(topic: LearningTopic) {
  return [
    topic.theory,
    ...topic.exercises,
    ...topic.pseudocode,
    ...topic.challenges,
    ...topic.projects,
  ];
}

function getEarnedXP(items: Array<{ status: LearningStatus; xp: number }>) {
  return items.reduce((total, item) => total + (item.status === "completed" ? item.xp : 0), 0);
}

function getTotalXP(items: Array<{ xp: number }>) {
  return items.reduce((total, item) => total + item.xp, 0);
}

export function getTopicProgress(topic: LearningTopic) {
  const units = getTopicUnits(topic);
  if (!units.length) return 0;
  const score = units.reduce((total, unit) => total + getStatusScore(unit.status), 0);
  return Math.round((score / units.length) * 100);
}

export function getTopicStats(topic: LearningTopic): LearningTopicStats {
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

export function getLearningSummary(topics: LearningTopic[]): LearningSummary {
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

export function getCurrentLevel(xp: number) {
  const safeXP = Math.max(0, xp);
  const level = Math.floor(safeXP / LEARNING_XP_PER_LEVEL) + 1;
  const currentXP = safeXP % LEARNING_XP_PER_LEVEL;
  return {
    level,
    currentXP,
    nextLevelXP: LEARNING_XP_PER_LEVEL,
    progress: Math.round((currentXP / LEARNING_XP_PER_LEVEL) * 100),
  };
}

export function getAchievementProgress(
  achievement: LearningAchievement,
  summary: LearningSummary,
) {
  const value = summary[achievement.metric];
  return {
    value,
    target: achievement.target,
    progress: Math.min(100, Math.round((value / Math.max(achievement.target, 1)) * 100)),
    unlocked: Boolean(achievement.unlocked) || value >= achievement.target,
  };
}

export function getAchievements(topics: LearningTopic[], summary: LearningSummary) {
  const seen = new Set<string>();
  return topics.flatMap((topic) => topic.achievements).filter((achievement) => {
    if (seen.has(achievement.id)) return false;
    seen.add(achievement.id);
    return true;
  }).map((achievement) => ({
    ...achievement,
    ...getAchievementProgress(achievement, summary),
  }));
}

function applyStatus(item: LearningItem, progress: LearningProgressState) {
  const status = progress[item.id];
  return status ? { ...item, status } : item;
}

export function mergeLearningTopics(
  topics: LearningTopic[],
  progress: LearningProgressState,
) {
  return topics.map((topic) => {
    const nextTopic = {
      ...topic,
      theory: progress[`${topic.id}:theory`]
        ? { ...topic.theory, status: progress[`${topic.id}:theory`] }
        : topic.theory,
      exercises: topic.exercises.map((item) => applyStatus(item, progress)),
      pseudocode: topic.pseudocode.map((item) => applyStatus(item, progress)),
      challenges: topic.challenges.map((item) => applyStatus(item, progress)),
      projects: topic.projects.map((item) => applyStatus(item, progress)),
    };
    const progressValue = getTopicProgress(nextTopic);
    return {
      ...nextTopic,
      status: progressValue === 100 ? "completed" : progressValue > 0 ? "in_progress" : "not_started",
    } satisfies LearningTopic;
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
