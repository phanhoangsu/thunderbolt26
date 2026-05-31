"use client";

import { useLanguage } from "@/context/LanguageContext";
import {
  achievements as baseAchievements,
  badges as baseBadges,
  forestMission as baseForestMission,
  growthSkills as baseGrowthSkills,
  memories as baseMemories,
} from "@/lib/mock-data";
import type { Achievement, Badge, Memory, Mission, Skill } from "@/lib/types";
import { useMemo } from "react";

const SKILL_KEYS: Record<string, string> = {
  "Tự tin": "skills.confidence",
  "Giao tiếp": "skills.communication",
  "Làm việc nhóm": "skills.teamwork",
  "Giải quyết vấn đề": "skills.problemSolving",
  "Sáng tạo": "skills.creativity",
  "Lãnh đạo": "skills.leadership",
  "Tự kiểm soát": "skills.selfControl",
  "Quản lý thời gian": "skills.timeManagement",
};

const BADGE_KEYS: Record<string, string> = {
  explorer: "mock.badges.explorer",
  "team-player": "mock.badges.teamPlayer",
  "nature-lover": "mock.badges.natureLover",
  "brave-starter": "mock.badges.braveStarter",
  "problem-solver": "mock.badges.problemSolver",
  "camp-helper": "mock.badges.campHelper",
  "good-listener": "mock.badges.goodListener",
  "young-leader": "mock.badges.youngLeader",
  "time-master": "mock.badges.timeMaster",
  "real-life-warrior": "mock.badges.realLifeWarrior",
};

const ACHIEVEMENT_KEYS = ["mock.achievements.a1", "mock.achievements.a2", "mock.achievements.a3"];
const DATE_KEYS = ["mock.dates.today", "mock.dates.yesterday", "mock.dates.yesterday"];
const PROMISE_KEYS = [
  "mock.promiseExamples.e1",
  "mock.promiseExamples.e2",
  "mock.promiseExamples.e3",
  "mock.promiseExamples.e4",
  "mock.promiseExamples.e5",
];

function translateSkill(skill: Skill, t: (k: string) => string): Skill {
  const key = SKILL_KEYS[skill.label];
  return { ...skill, label: key ? t(key) : skill.label };
}

export function useTranslatedData() {
  const { t } = useLanguage();

  return useMemo(() => {
    const forestMission: Mission = {
      ...baseForestMission,
      title: t("mock.mission.title"),
      type: t("mock.mission.type"),
      description: t("mock.mission.description"),
      badgeReward: t("mock.mission.badgeReward"),
      requirements: [
        t("mock.mission.req1"),
        t("mock.mission.req2"),
        t("mock.mission.req3"),
        t("mock.mission.req4"),
        t("mock.mission.req5"),
      ],
    };

    const badges: Badge[] = baseBadges.map((b) => ({
      ...b,
      name: t(BADGE_KEYS[b.id] ?? b.name),
    }));

    const achievements: Achievement[] = baseAchievements.map((a, i) => ({
      ...a,
      text: t(ACHIEVEMENT_KEYS[i] ?? a.text),
      date: t(DATE_KEYS[i] ?? a.date),
    }));

    const growthSkills = baseGrowthSkills.map((s) => translateSkill(s, t));

    const promiseExamples = PROMISE_KEYS.map((k) => t(k));

    const growthFeedback = {
      strongest: t("mock.growthFeedback.strongest"),
      needsImprovement: t("mock.growthFeedback.needsImprovement"),
    };

    const memories: Memory[] = baseMemories.map((m) => ({
      ...m,
      title: t(`memories.items.${m.id}.title`),
      location: t(`memories.items.${m.id}.location`),
      date: t(`memories.items.${m.id}.date`),
      note: t(`memories.items.${m.id}.note`),
    }));

    return {
      forestMission,
      badges,
      achievements,
      growthSkills,
      promiseExamples,
      growthFeedback,
      memories,
      coachNote: t("mock.coachNote"),
      personalMission: t("mock.personalMission"),
    };
  }, [t]);
}

export function translateProfileSkills(
  skills: Skill[],
  t: (k: string) => string,
): Skill[] {
  return skills.map((s) => translateSkill(s, t));
}
