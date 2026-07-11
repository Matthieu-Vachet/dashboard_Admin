"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { findLearningItem, javascriptLearningTopics, learningCurriculum, mergeLearningTopics } from "@/lib/learning/javascript";
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
    if (!["not_started", "in_progress", "completed"].includes(state)) continue;
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
      earnedXp: status === "completed" ? found.item.xp : 0,
      studySeconds: 0,
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
  const topics = useMemo(() => mergeLearningTopics(contentTopics, progress), [contentTopics, progress]);
  const effectiveStats = useMemo(() => {
    if (databaseConfigured) return stats;
    const records = Object.values(progress);
    const now = new Date();
    const today = now.toISOString().slice(0, 10);
    const weekStart = new Date(now); weekStart.setDate(now.getDate() - 6); weekStart.setHours(0, 0, 0, 0);
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const completed = records.filter((item) => item.status === "completed" && item.completedAt);
    const xpSince = (date: Date) => completed.filter((item) => new Date(item.completedAt!) >= date).reduce((sum, item) => sum + item.earnedXp, 0);
    return {
      ...emptyStats,
      totalStudySeconds: records.reduce((sum, item) => sum + item.studySeconds, 0),
      weekStudySeconds: completed.filter((item) => new Date(item.completedAt!) >= weekStart).reduce((sum, item) => sum + item.studySeconds, 0),
      todayStudySeconds: completed.filter((item) => item.completedAt!.slice(0, 10) === today).reduce((sum, item) => sum + item.studySeconds, 0),
      xpToday: completed.filter((item) => item.completedAt!.slice(0, 10) === today).reduce((sum, item) => sum + item.earnedXp, 0),
      xpWeek: xpSince(weekStart),
      xpMonth: xpSince(monthStart),
      completedExercises: records.filter((item) => item.itemType === "exercise" && item.status === "completed").length,
      completedChallenges: records.filter((item) => item.itemType === "challenge" && item.status === "completed").length,
      completedProjects: records.filter((item) => item.itemType === "project" && item.status === "completed").length,
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
      setError(caught instanceof Error ? caught.message : "Chargement impossible.");
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

  const setItemProgress = useCallback(async (itemId: string, patch: { status?: LearningStatus; answer?: string }) => {
    const found = findLearningItem(contentTopics, itemId);
    if (!found) return;
    setSaving(true);
    setError(null);
    try {
      if (databaseConfigured) {
        const result = await saveLearningProgress({ itemId, ...patch });
        setProgress((current) => ({ ...current, [itemId]: result.progress }));
        await refreshActivity();
        return;
      }

      const now = new Date();
      setProgress((current) => {
        const previous = current[itemId];
        const status = previous?.status === "completed" ? "completed" : patch.status || previous?.status || "not_started";
        const firstCompletion = status === "completed" && previous?.status !== "completed";
        const startedAt = previous?.startedAt || (status !== "not_started" ? now.toISOString() : null);
        const elapsed = firstCompletion && startedAt
          ? Math.min(6 * 60 * 60, Math.max(0, Math.floor((now.getTime() - new Date(startedAt).getTime()) / 1_000)))
          : 0;
        const next: LearningProgressRecord = {
          itemId,
          topicId: found.topic.id,
          itemType: found.itemType,
          status,
          startedAt,
          completedAt: previous?.completedAt || (firstCompletion ? now.toISOString() : null),
          attempts: previous?.attempts || (status === "in_progress" ? 1 : 0),
          earnedXp: previous?.earnedXp || (firstCompletion ? found.item.xp : 0),
          studySeconds: (previous?.studySeconds || 0) + elapsed,
          answer: patch.answer ?? previous?.answer,
          updatedAt: now.toISOString(),
        };
        const updated = { ...current, [itemId]: next };
        saveBrowserProgress(updated);
        return updated;
      });
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Enregistrement impossible.");
      throw caught;
    } finally {
      setSaving(false);
    }
  }, [contentTopics, databaseConfigured, refreshActivity]);

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
    setItemProgress,
    refresh,
  };
}
