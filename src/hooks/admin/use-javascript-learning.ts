"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { findLearningItem, isCompletedLearningStatus, javascriptLearningTopics, learningCurriculum, mergeLearningTopics } from "@/lib/learning/javascript";
import {
  fetchLearningActivity,
  fetchLearningCatalog,
  migrateBrowserLearningProgress,
  saveLearningProgress,
} from "@/services/admin/learning-api";
import type {
  LearningActivity,
  LearningAdvancedStats,
  LearningCurriculum,
  LearningProgressMutationResult,
  LearningProgressPatch,
  LearningProgressRecord,
  LearningProgressState,
  LearningStatus,
  LearningTopic,
} from "@/types/admin/learning";

const LEGACY_STORAGE_KEY = "matweb.js.learning.progress";
const STORAGE_KEY = "matweb.js.learning.progress.v2";

const emptyStats: LearningAdvancedStats = {
  totalStudySeconds: 0,
  weekStudySeconds: 0,
  todayStudySeconds: 0,
  xpToday: 0,
  xpWeek: 0,
  xpMonth: 0,
  completedExercises: 0,
  completedChallenges: 0,
  completedProjects: 0,
  currentStreak: 0,
  bestStreak: 0,
  lastActivity: null,
};

function readBrowserProgress() {
  try {
    const current = window.localStorage.getItem(STORAGE_KEY);
    if (current) return JSON.parse(current) as LearningProgressState;
    const legacy = window.localStorage.getItem(LEGACY_STORAGE_KEY);
    return legacy ? JSON.parse(legacy) as Record<string, LearningStatus> : {};
  } catch {
    return {};
  }
}

function normalizeBrowserProgress(value: LearningProgressState | Record<string, LearningStatus>, topics: LearningTopic[]) {
  const now = new Date().toISOString();
  const result: LearningProgressState = {};
  for (const [legacyId, state] of Object.entries(value)) {
    if (state && typeof state === "object" && "status" in state) {
      result[state.itemId] = state;
      continue;
    }
    if (typeof state !== "string") continue;
    if (!["not_started", "in_progress", "completed", "reviewing"].includes(state)) continue;
    const status = state as LearningStatus;
    const itemId = legacyId.replace(":theory", "-theory");
    const found = findLearningItem(topics, itemId);
    if (!found) continue;
    result[itemId] = {
      itemId,
      topicId: found.topic.id,
      itemType: found.itemType,
      status,
      startedAt: status === "not_started" ? null : now,
      completedAt: null,
      attempts: status === "not_started" ? 0 : 1,
      earnedXp: isCompletedLearningStatus(status) ? found.item.xp : 0,
      studySeconds: 0,
      correctionViewed: false,
      updatedAt: now,
      migratedFrom: "browser",
    };
  }
  return result;
}

function saveBrowserProgress(progress: LearningProgressState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function useJavascriptLearning() {
  const [contentTopics, setContentTopics] = useState<LearningTopic[]>(javascriptLearningTopics);
  const [curriculum, setCurriculum] = useState<LearningCurriculum>(learningCurriculum);
  const [progress, setProgress] = useState<LearningProgressState>({});
  const [activity, setActivity] = useState<LearningActivity[]>([]);
  const [stats, setStats] = useState<LearningAdvancedStats>(emptyStats);
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [databaseConfigured, setDatabaseConfigured] = useState(false);
  const [source, setSource] = useState<"local" | "mongodb">("local");
  const [warning, setWarning] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<{ tone: "success" | "warning" | "error"; message: string } | null>(null);
  const topics = useMemo(() => mergeLearningTopics(contentTopics, progress), [contentTopics, progress]);
  const effectiveStats = useMemo(() => {
    if (databaseConfigured) return stats;
    const records = Object.values(progress);
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6); weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const completed = records.filter((item) => isCompletedLearningStatus(item.status) && item.completedAt);
    const xpSince = (date: Date) => completed.filter((item) => new Date(item.completedAt!) >= date).reduce((sum, item) => sum + item.earnedXp, 0);
    return {
      ...emptyStats,
      totalStudySeconds: records.reduce((sum, item) => sum + item.studySeconds, 0),
      weekStudySeconds: completed.filter((item) => new Date(item.completedAt!) >= weekStart).reduce((sum, item) => sum + item.studySeconds, 0),
      todayStudySeconds: completed.filter((item) => item.completedAt!.slice(0, 10) === today).reduce((sum, item) => sum + item.studySeconds, 0),
      xpToday: completed.filter((item) => item.completedAt!.slice(0, 10) === today).reduce((sum, item) => sum + item.earnedXp, 0),
      xpWeek: xpSince(weekStart),
      xpMonth: xpSince(monthStart),
      completedExercises: records.filter((item) => item.itemType === "exercise" && isCompletedLearningStatus(item.status)).length,
      completedChallenges: records.filter((item) => item.itemType === "challenge" && isCompletedLearningStatus(item.status)).length,
      completedProjects: records.filter((item) => item.itemType === "project" && isCompletedLearningStatus(item.status)).length,
      lastActivity: records.map((item) => item.updatedAt).filter(Boolean).sort().at(-1) || null,
    };
  }, [databaseConfigured, progress, stats]);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const browserValue = readBrowserProgress();
      const payload = await fetchLearningCatalog();
      setContentTopics(payload.topics);
      setCurriculum(payload.curriculum);
      setDatabaseConfigured(payload.databaseConfigured);
      setSource(payload.source);
      setWarning(payload.warning);
      setActivity(payload.activity);
      setStats(payload.stats);
      const browserProgress = normalizeBrowserProgress(browserValue, payload.topics);
      if (payload.databaseConfigured && Object.keys(browserProgress).length) {
        const migrated = await migrateBrowserLearningProgress(browserProgress);
        setProgress(migrated.progress);
        window.localStorage.removeItem(LEGACY_STORAGE_KEY);
        window.localStorage.removeItem(STORAGE_KEY);
      } else if (payload.databaseConfigured) {
        setProgress(payload.progress);
      } else {
        setProgress(browserProgress);
      }
    } catch (caught) {
      const browserProgress = normalizeBrowserProgress(readBrowserProgress(), javascriptLearningTopics);
      setProgress(browserProgress);
      setDatabaseConfigured(false);
      setSource("local");
      setWarning("Mode local : la progression sera synchronisée lorsque MongoDB sera disponible.");
      const message = caught instanceof Error ? caught.message : "Chargement impossible.";
      setError(message);
      setNotice({ tone: "error", message: `Erreur MongoDB : ${message}` });
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void refresh(), 0);
    return () => window.clearTimeout(timer);
  }, [refresh]);

  const refreshActivity = useCallback(async () => {
    if (!databaseConfigured) return;
    const result = await fetchLearningActivity();
    setActivity(result.activity);
    setStats(result.stats);
  }, [databaseConfigured]);

  const setItemProgress = useCallback(async (itemId: string, patch: LearningProgressPatch): Promise<LearningProgressMutationResult | null> => {
    const found = findLearningItem(contentTopics, itemId);
    if (!found) return null;
    setSaving(true);
    setError(null);
    try {
      if (databaseConfigured) {
        const result = await saveLearningProgress({ itemId, ...patch });
        setProgress((current) => ({ ...current, [itemId]: result.progress }));
        setNotice({ tone: result.xpAwarded || result.activityRecorded ? "success" : "warning", message: result.messages.join(" ") });
        await refreshActivity();
        return result;
      }

      const now = new Date();
      const previous = progress[itemId];
      const base: LearningProgressRecord = previous || {
        itemId,
        topicId: found.topic.id,
        itemType: found.itemType,
        status: "not_started",
        startedAt: null,
        completedAt: null,
        attempts: 0,
        earnedXp: 0,
        studySeconds: 0,
        correctionViewed: false,
        updatedAt: now.toISOString(),
      };
      let next = base;
      let messages: string[] = [];
      let xpAwarded = 0;
      let action: LearningActivity["action"] | null = null;

      if (patch.answer !== undefined) {
        if (found.itemType !== "pseudocode") throw new Error("Une réponse textuelle est réservée au pseudo-code.");
        if (!patch.answer.trim()) throw new Error("Réponse vide : écris une tentative avant de sauvegarder.");
        if (!["in_progress", "reviewing"].includes(base.status)) throw new Error("Commence le pseudo-code avant d’enregistrer une réponse.");
        next = { ...base, answer: patch.answer.slice(0, 100_000), savedAt: now.toISOString(), attempts: Math.max(1, base.attempts), updatedAt: now.toISOString() };
        messages = ["Sauvegarde réussie.", "Activité enregistrée."];
        action = "answer_saved";
      } else if (patch.correctionViewed) {
        next = base.correctionViewed
          ? base
          : { ...base, correctionViewed: true, correctionViewedAt: now.toISOString(), updatedAt: now.toISOString() };
        messages = ["Correction consultée."];
      } else if (patch.status === "in_progress") {
        if (isCompletedLearningStatus(base.status)) messages = ["Progression déjà terminée.", "XP déjà attribuée."];
        else if (base.status === "in_progress") messages = ["Progression déjà en cours."];
        else {
          next = { ...base, status: "in_progress", startedAt: now.toISOString(), attempts: base.attempts + 1, updatedAt: now.toISOString() };
          messages = ["Progression démarrée sans attribution d’XP.", "Activité enregistrée."];
          action = "started";
        }
      } else if (patch.status === "completed") {
        if (isCompletedLearningStatus(base.status)) messages = ["Progression déjà terminée.", "XP déjà attribuée."];
        else if (base.status !== "in_progress") throw new Error("Commence cette unité avant de la terminer.");
        else {
          const elapsed = base.startedAt ? Math.min(6 * 60 * 60, Math.max(0, Math.floor((now.getTime() - new Date(base.startedAt).getTime()) / 1_000))) : 0;
          xpAwarded = base.earnedXp ? 0 : found.item.xp;
          next = { ...base, status: "completed", completedAt: now.toISOString(), earnedXp: base.earnedXp || found.item.xp, studySeconds: base.studySeconds + elapsed, updatedAt: now.toISOString() };
          messages = ["Progression terminée.", xpAwarded ? `+${xpAwarded} XP attribuée une seule fois.` : "XP déjà attribuée.", "Activité enregistrée."];
          action = "completed";
        }
      } else if (patch.status === "reviewing") {
        if (!isCompletedLearningStatus(base.status)) throw new Error("Seule une progression terminée peut passer en révision.");
        next = base.status === "reviewing" ? base : { ...base, status: "reviewing", updatedAt: now.toISOString() };
        messages = ["Progression passée en révision.", "XP déjà attribuée."];
      } else {
        throw new Error("Action de progression invalide.");
      }

      const updated = { ...progress, [itemId]: next };
      setProgress(updated);
      saveBrowserProgress(updated);
      if (action) {
        setActivity((current) => [{
          id: crypto.randomUUID(), itemId, topicId: found.topic.id, itemType: found.itemType,
          action, title: found.item.title, xp: action === "completed" ? xpAwarded : 0,
          studySeconds: action === "completed" ? next.studySeconds - base.studySeconds : 0,
          occurredAt: now.toISOString(),
        }, ...current]);
      }
      const result = { progress: next, messages, activityRecorded: Boolean(action), xpAwarded };
      setNotice({ tone: xpAwarded || action ? "success" : "warning", message: messages.join(" ") });
      return result;
    } catch (caught) {
      const message = caught instanceof Error ? caught.message : "Enregistrement impossible.";
      const status = caught && typeof caught === "object" && "status" in caught ? Number(caught.status) : 0;
      const isMongoFailure = databaseConfigured && status >= 500;
      setError(message);
      setNotice({ tone: "error", message: isMongoFailure ? `Erreur MongoDB : ${message}` : message });
      throw caught;
    } finally {
      setSaving(false);
    }
  }, [contentTopics, databaseConfigured, progress, refreshActivity]);

  return {
    topics,
    curriculum,
    progress,
    activity,
    stats: effectiveStats,
    ready,
    saving,
    databaseConfigured,
    source,
    warning,
    error,
    notice,
    notify: (tone: "success" | "warning" | "error", message: string) => setNotice({ tone, message }),
    clearNotice: () => setNotice(null),
    setItemProgress,
    refresh,
  };
}
