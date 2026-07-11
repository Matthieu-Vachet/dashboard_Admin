import { z } from "zod";
import type {
  LearningCurriculum,
  LearningTopic,
  LearningValidationIssue,
} from "@/types/admin/learning";

const idPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const id = z.string().min(2).max(100).regex(idPattern, "Utiliser uniquement minuscules, chiffres et tirets.");
const nonEmpty = z.string().trim().min(1);
const difficulty = z.enum(["Facile", "Moyen", "Difficile"]);
const positiveXp = z.number().int().positive();
const positiveMinutes = z.number().int().positive().max(100_000);
const stringList = z.array(nonEmpty).default([]);
const validationList = z.array(nonEmpty).min(1);

export const learningBookReferenceSchema = z.object({
  chapter: nonEmpty,
  title: nonEmpty,
  pages: nonEmpty,
  url: z.url().optional(),
}).strict();

export const learningLinkSchema = z.object({
  id,
  label: nonEmpty,
  url: z.union([z.url(), z.string().startsWith("/")]),
  kind: z.enum(["book", "mdn", "roadmap", "video", "notes", "other"]),
  description: nonEmpty.optional(),
}).strict();

const learningCodeExampleSchema = z.object({
  language: nonEmpty,
  code: nonEmpty,
  explanation: nonEmpty.optional(),
}).strict();

const learningTheorySectionSchema = z.object({
  id,
  type: nonEmpty.optional(),
  title: nonEmpty,
  content: nonEmpty,
  code: nonEmpty.optional(),
  language: nonEmpty.optional(),
  warning: z.union([nonEmpty, z.array(nonEmpty)]).optional(),
  tips: z.array(nonEmpty).optional(),
  questions: z.array(nonEmpty).optional(),
  codeExamples: z.array(learningCodeExampleSchema).optional(),
  warnings: z.array(nonEmpty).optional(),
  comprehensionQuestions: z.array(nonEmpty).optional(),
  summary: nonEmpty.optional(),
}).strict();

export const learningTheorySchema = z.object({
  id,
  title: nonEmpty,
  summary: nonEmpty,
  description: nonEmpty,
  objectives: stringList,
  estimatedMinutes: positiveMinutes,
  duration: positiveMinutes.optional(),
  level: difficulty,
  commonMistakes: stringList,
  bestPractices: stringList,
  finalSummary: nonEmpty,
  sections: z.array(learningTheorySectionSchema).optional(),
  xp: positiveXp,
}).strict();

export const learningExerciseSchema = z.object({
  id,
  title: nonEmpty,
  description: nonEmpty,
  objective: nonEmpty,
  difficulty,
  estimatedMinutes: positiveMinutes,
  xp: positiveXp,
  skills: stringList.pipe(z.array(nonEmpty).min(1)),
  prerequisites: stringList,
  hint: nonEmpty.optional(),
  validation: validationList,
}).strict();

export const learningPseudocodeSchema = z.object({
  id,
  title: nonEmpty,
  objective: nonEmpty,
  situation: nonEmpty,
  description: nonEmpty,
  difficulty,
  estimatedMinutes: positiveMinutes,
  xp: positiveXp,
  skills: stringList.pipe(z.array(nonEmpty).min(1)),
  correction: nonEmpty,
  validation: validationList,
}).strict();

export const learningChallengeSchema = z.object({
  id,
  title: nonEmpty,
  description: nonEmpty,
  objective: nonEmpty,
  constraints: stringList,
  requiredFeatures: stringList.pipe(z.array(nonEmpty).min(1)),
  bonusFeatures: stringList,
  forbidden: stringList,
  concepts: stringList.pipe(z.array(nonEmpty).min(1)),
  difficulty,
  estimatedMinutes: positiveMinutes,
  xp: positiveXp,
  validation: validationList,
}).strict();

export const learningProjectSchema = z.object({
  id,
  title: nonEmpty,
  context: nonEmpty,
  objective: nonEmpty,
  description: nonEmpty,
  features: stringList.pipe(z.array(nonEmpty).min(1)),
  constraints: stringList,
  bonusFeatures: stringList,
  suggestedPseudocode: stringList,
  concepts: stringList.pipe(z.array(nonEmpty).min(1)),
  validatedSkills: stringList.pipe(z.array(nonEmpty).min(1)),
  difficulty,
  estimatedMinutes: positiveMinutes,
  xp: positiveXp,
  validation: validationList,
}).strict();

const achievementScopeSchema = z.union([
  z.object({ global: z.literal(true) }).strict(),
  z.object({ levelId: id }).strict(),
  z.object({ topicId: id }).strict(),
  z.object({ projectId: id }).strict(),
  z.object({ itemIds: z.array(id).min(1) }).strict(),
]);

export const learningAchievementSchema = z.object({
  id,
  title: nonEmpty,
  description: nonEmpty,
  metric: z.enum([
    "completedTheory",
    "completedExercises",
    "completedPseudocode",
    "completedChallenges",
    "completedProjects",
  ]),
  scope: achievementScopeSchema,
  target: z.number().int().positive(),
}).strict();

function normalizeTheoryInput(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const topic = value as Record<string, unknown>;
  if (!topic.theory || typeof topic.theory !== "object" || Array.isArray(topic.theory)) return value;
  const theory = topic.theory as Record<string, unknown>;
  const description = typeof theory.description === "string" ? theory.description : "";
  const summary = typeof theory.summary === "string" ? theory.summary : description;
  return {
    ...topic,
    theory: {
      ...theory,
      id: theory.id ?? (typeof topic.id === "string" ? `${topic.id}-theory` : undefined),
      summary,
      objectives: theory.objectives ?? [],
      estimatedMinutes: theory.estimatedMinutes ?? theory.duration,
      level: theory.level ?? topic.difficulty,
      commonMistakes: theory.commonMistakes ?? [],
      bestPractices: theory.bestPractices ?? [],
      finalSummary: theory.finalSummary ?? summary,
    },
  };
}

export const learningTopicSchema = z.preprocess(normalizeTheoryInput, z.object({
  schemaVersion: z.literal(1),
  id,
  title: nonEmpty,
  category: nonEmpty,
  difficulty,
  description: nonEmpty,
  chapterNumber: z.number().int().positive(),
  required: z.boolean(),
  curriculum: z.object({ levelId: id, order: z.number().int().positive() }).strict(),
  book: z.object({ references: z.array(learningBookReferenceSchema).min(1) }).strict(),
  resources: z.array(learningLinkSchema).min(1),
  prerequisites: z.array(id),
  relatedTopics: z.array(id),
  theory: learningTheorySchema,
  exercises: z.array(learningExerciseSchema),
  pseudocode: z.array(learningPseudocodeSchema),
  challenges: z.array(learningChallengeSchema),
  projects: z.array(learningProjectSchema),
  achievements: z.array(learningAchievementSchema),
}).strict());

export const learningCurriculumSchema = z.object({
  schemaVersion: z.literal(1),
  id,
  title: nonEmpty,
  levels: z.array(z.object({
    id,
    title: nonEmpty,
    order: z.number().int().positive(),
    description: nonEmpty,
    topics: z.array(id),
    plannedTopics: z.array(z.object({
      id,
      title: nonEmpty,
      category: nonEmpty,
      required: z.boolean(),
    }).strict()),
  }).strict()).min(1),
}).strict();

function zodIssues(error: z.ZodError): LearningValidationIssue[] {
  return error.issues.map((issue) => ({
    path: issue.path.length ? issue.path.join(".") : "$",
    message: issue.message,
    severity: "error" as const,
  }));
}

function pushDuplicateIssues(topic: LearningTopic, issues: LearningValidationIssue[]) {
  const seen = new Map<string, string>();
  const groups = [
    ["theory", [topic.theory]],
    ["exercises", topic.exercises],
    ["pseudocode", topic.pseudocode],
    ["challenges", topic.challenges],
    ["projects", topic.projects],
  ] as const;

  for (const [groupName, items] of groups) {
    items.forEach((item, index) => {
      const previous = seen.get(item.id);
      if (previous) {
        issues.push({
          path: `${groupName}.${index}.id`,
          message: `Identifiant déjà utilisé dans ${previous}.`,
          severity: "error",
        });
      } else {
        seen.set(item.id, `${groupName}.${index}`);
      }
    });
  }

  const achievements = new Set<string>();
  topic.achievements.forEach((achievement, index) => {
    if (achievements.has(achievement.id)) {
      issues.push({ path: `achievements.${index}.id`, message: "Identifiant d'achievement dupliqué.", severity: "error" });
    }
    achievements.add(achievement.id);
  });

  const sectionIds = new Set<string>();
  topic.theory.sections?.forEach((section, index) => {
    if (sectionIds.has(section.id)) {
      issues.push({ path: `theory.sections.${index}.id`, message: "Identifiant de section théorique dupliqué.", severity: "error" });
    }
    sectionIds.add(section.id);
  });
}

function countMetric(topic: LearningTopic, metric: LearningTopic["achievements"][number]["metric"]) {
  if (metric === "completedTheory") return 1;
  if (metric === "completedExercises") return topic.exercises.length;
  if (metric === "completedPseudocode") return topic.pseudocode.length;
  if (metric === "completedChallenges") return topic.challenges.length;
  return topic.projects.length;
}

function pushAchievementIssues(topic: LearningTopic, issues: LearningValidationIssue[]) {
  const allIds = new Set([
    topic.theory.id,
    ...topic.exercises.map((item) => item.id),
    ...topic.pseudocode.map((item) => item.id),
    ...topic.challenges.map((item) => item.id),
    ...topic.projects.map((item) => item.id),
  ]);
  const projectIds = new Set(topic.projects.map((item) => item.id));

  topic.achievements.forEach((achievement, index) => {
    const base = `achievements.${index}`;
    if ("topicId" in achievement.scope && achievement.scope.topicId !== topic.id) {
      issues.push({ path: `${base}.scope.topicId`, message: "La portée doit référencer ce thème.", severity: "error" });
    }
    if ("projectId" in achievement.scope && !projectIds.has(achievement.scope.projectId)) {
      issues.push({ path: `${base}.scope.projectId`, message: "Projet introuvable dans ce thème.", severity: "error" });
    }
    if ("itemIds" in achievement.scope) {
      achievement.scope.itemIds.forEach((itemId, itemIndex) => {
        if (!allIds.has(itemId)) {
          issues.push({ path: `${base}.scope.itemIds.${itemIndex}`, message: "Unité introuvable.", severity: "error" });
        }
      });
      if (achievement.target > achievement.scope.itemIds.length) {
        issues.push({ path: `${base}.target`, message: "Cible supérieure au nombre d'unités de la portée.", severity: "error" });
      }
    } else if (!("global" in achievement.scope) && !("levelId" in achievement.scope)) {
      const maximum = countMetric(topic, achievement.metric);
      if (achievement.target > maximum) {
        issues.push({ path: `${base}.target`, message: `Achievement impossible : maximum ${maximum}.`, severity: "error" });
      }
    }
  });
}

export function validateLearningTopic(value: unknown) {
  const parsed = learningTopicSchema.safeParse(value);
  if (!parsed.success) return { success: false as const, issues: zodIssues(parsed.error) };

  const issues: LearningValidationIssue[] = [];
  pushDuplicateIssues(parsed.data, issues);
  pushAchievementIssues(parsed.data, issues);
  return issues.some((issue) => issue.severity === "error")
    ? { success: false as const, issues }
    : { success: true as const, data: parsed.data, issues };
}

function hasCycle(topics: LearningTopic[]) {
  const graph = new Map(topics.map((topic) => [topic.id, topic.prerequisites]));
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const visit = (idValue: string): boolean => {
    if (visiting.has(idValue)) return true;
    if (visited.has(idValue)) return false;
    visiting.add(idValue);
    for (const dependency of graph.get(idValue) || []) {
      if (graph.has(dependency) && visit(dependency)) return true;
    }
    visiting.delete(idValue);
    visited.add(idValue);
    return false;
  };
  return [...graph.keys()].some(visit);
}

export function validateLearningCatalog(topics: unknown[], curriculumValue: unknown) {
  const issues: LearningValidationIssue[] = [];
  const parsedTopics: LearningTopic[] = [];
  topics.forEach((topic, index) => {
    const result = validateLearningTopic(topic);
    if (result.success) parsedTopics.push(result.data);
    else result.issues.forEach((issue) => issues.push({ ...issue, path: `topics.${index}.${issue.path}` }));
  });

  const curriculumResult = learningCurriculumSchema.safeParse(curriculumValue);
  if (!curriculumResult.success) {
    zodIssues(curriculumResult.error).forEach((issue) => issues.push({ ...issue, path: `curriculum.${issue.path}` }));
  }

  const topicIds = new Set<string>();
  parsedTopics.forEach((topic, index) => {
    if (topicIds.has(topic.id)) issues.push({ path: `topics.${index}.id`, message: "Identifiant de thème dupliqué.", severity: "error" });
    topicIds.add(topic.id);
  });

  parsedTopics.forEach((topic, topicIndex) => {
    topic.prerequisites.forEach((reference, referenceIndex) => {
      if (!topicIds.has(reference)) {
        issues.push({
          path: `topics.${topicIndex}.prerequisites.${referenceIndex}`,
          message: `Thème référencé introuvable : ${reference}.`,
          severity: "error",
        });
      }
    });
    topic.relatedTopics.forEach((reference, referenceIndex) => {
      if (!topicIds.has(reference)) {
        issues.push({ path: `topics.${topicIndex}.relatedTopics.${referenceIndex}`, message: `Thème référencé introuvable : ${reference}.`, severity: "error" });
      }
    });
  });

  const globalItemIds = new Map<string, { topicIndex: number; type: string }>();
  const globalAchievementIds = new Set<string>();
  parsedTopics.forEach((topic, topicIndex) => {
    const groups = [
      ["theory", [topic.theory]],
      ["exercise", topic.exercises],
      ["pseudocode", topic.pseudocode],
      ["challenge", topic.challenges],
      ["project", topic.projects],
    ] as const;
    groups.forEach(([type, items]) => items.forEach((item) => {
      const previous = globalItemIds.get(item.id);
      if (previous) issues.push({ path: `topics.${topicIndex}.${type}.${item.id}`, message: `Identifiant déjà utilisé dans topics.${previous.topicIndex}.`, severity: "error" });
      else globalItemIds.set(item.id, { topicIndex, type });
    }));
    topic.achievements.forEach((achievement, achievementIndex) => {
      if (globalAchievementIds.has(achievement.id)) issues.push({ path: `topics.${topicIndex}.achievements.${achievementIndex}.id`, message: "Identifiant d’achievement déjà utilisé dans le catalogue.", severity: "error" });
      globalAchievementIds.add(achievement.id);
    });
  });

  parsedTopics.forEach((topic, topicIndex) => {
    topic.exercises.forEach((exercise, exerciseIndex) => {
      exercise.prerequisites.forEach((reference, referenceIndex) => {
        if (!globalItemIds.has(reference)) {
          issues.push({ path: `topics.${topicIndex}.exercises.${exerciseIndex}.prerequisites.${referenceIndex}`, message: `Prérequis d’unité introuvable : ${reference}.`, severity: "error" });
        }
      });
    });
    topic.achievements.forEach((achievement, achievementIndex) => {
      if (!("itemIds" in achievement.scope)) return;
      const expectedType = {
        completedTheory: "theory",
        completedExercises: "exercise",
        completedPseudocode: "pseudocode",
        completedChallenges: "challenge",
        completedProjects: "project",
      }[achievement.metric];
      achievement.scope.itemIds.forEach((itemId, itemIndex) => {
        const item = globalItemIds.get(itemId);
        if (item && item.type !== expectedType) {
          issues.push({ path: `topics.${topicIndex}.achievements.${achievementIndex}.scope.itemIds.${itemIndex}`, message: `L’unité ne correspond pas à la métrique ${achievement.metric}.`, severity: "error" });
        }
      });
    });
  });

  if (hasCycle(parsedTopics)) {
    issues.push({ path: "topics", message: "Dépendance circulaire détectée entre les thèmes.", severity: "error" });
  }

  if (curriculumResult.success) {
    const activeIds = curriculumResult.data.levels.flatMap((level) => level.topics);
    const seenActiveIds = new Set<string>();
    activeIds.forEach((topicId, index) => {
      if (!topicIds.has(topicId)) issues.push({ path: `curriculum.topics.${index}`, message: `Thème actif introuvable : ${topicId}.`, severity: "error" });
      if (seenActiveIds.has(topicId)) issues.push({ path: `curriculum.topics.${index}`, message: `Thème actif dupliqué : ${topicId}.`, severity: "error" });
      seenActiveIds.add(topicId);
    });
    parsedTopics.forEach((topic, index) => {
      if (!activeIds.includes(topic.id)) issues.push({ path: `topics.${index}.id`, message: "Thème absent du curriculum actif.", severity: "warning" });
      const declaredLevel = curriculumResult.data.levels.find((level) => level.id === topic.curriculum.levelId);
      if (!declaredLevel) {
        issues.push({ path: `topics.${index}.curriculum.levelId`, message: "Niveau de curriculum introuvable.", severity: "error" });
      } else if (!declaredLevel.topics.includes(topic.id)) {
        issues.push({ path: `topics.${index}.curriculum.levelId`, message: "Le thème n’est pas placé dans le niveau déclaré.", severity: "warning" });
      }
    });
    parsedTopics.forEach((topic, topicIndex) => {
      topic.achievements.forEach((achievement, achievementIndex) => {
        if (!("levelId" in achievement.scope)) return;
        const levelId = achievement.scope.levelId;
        const level = curriculumResult.data.levels.find((item) => item.id === levelId);
        if (!level) {
          issues.push({ path: `topics.${topicIndex}.achievements.${achievementIndex}.scope.levelId`, message: "Niveau de portée introuvable.", severity: "error" });
          return;
        }
        const maximum = level.topics.reduce((sum, topicId) => {
          const scopedTopic = parsedTopics.find((item) => item.id === topicId);
          return sum + (scopedTopic ? countMetric(scopedTopic, achievement.metric) : 0);
        }, 0);
        if (achievement.target > maximum) {
          issues.push({ path: `topics.${topicIndex}.achievements.${achievementIndex}.target`, message: `Achievement de niveau impossible : maximum ${maximum}.`, severity: "error" });
        }
      });
    });
  }

  return {
    success: !issues.some((issue) => issue.severity === "error"),
    topics: parsedTopics,
    curriculum: curriculumResult.success ? curriculumResult.data as LearningCurriculum : null,
    issues,
  };
}
