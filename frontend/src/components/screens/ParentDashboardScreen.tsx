"use client";

import { StatCard } from "@/components/cards/StatCard";
import { SkillGrowthChart } from "@/components/charts/SkillGrowthChart";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { translateProfileSkills } from "@/lib/use-translated-data";
import { Award, CheckCircle, Star, Users } from "lucide-react";
import { useEffect } from "react";

export function ParentDashboardScreen() {
  const {
    profile,
    totalXp,
    missionsCompleted,
    badgesUnlocked,
    teamActivities,
  } = useApp();
  const { t } = useLanguage();
  const skills = translateProfileSkills(profile.skills, t);

  useEffect(() => {
    fetch("/api/parent-report").catch(() => {});
  }, []);

  return (
    <div className="screen-page">
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-base font-extrabold leading-snug text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t("parent.title", { name: profile.name })}
        </h1>

        <div className="flex flex-wrap gap-3">
          <StatCard
            label={t("parent.totalXp")}
            value={`${totalXp} XP`}
            icon={<Star size={20} />}
            index={0}
          />
          <StatCard
            label={t("parent.missions")}
            value={`${missionsCompleted} / 8`}
            icon={<CheckCircle size={20} />}
            index={1}
          />
          <StatCard
            label={t("parent.badges")}
            value={`${badgesUnlocked.length}`}
            icon={<Award size={20} />}
            index={2}
          />
          <StatCard
            label={t("parent.teamActivities")}
            value={`${teamActivities}`}
            icon={<Users size={20} />}
            index={3}
          />
        </div>

        <Card className="mt-5">
          <p className="section-header mb-3">{t("parent.skillChart")}</p>
          <SkillGrowthChart
            skills={skills}
            beforeLabel={t("charts.before")}
            afterLabel={t("charts.after")}
          />
        </Card>

        <Card className="mt-4 border-l-4 border-gold">
          <p className="text-xs font-bold text-gold">{t("parent.coachNote")}</p>
          <p className="mt-2 text-sm leading-relaxed text-dark/80">
            {t("mock.coachNote")}
          </p>
        </Card>
      </div>
    </div>
  );
}
