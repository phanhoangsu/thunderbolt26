"use client";

import { StatCard } from "@/components/cards/StatCard";
import { SkillGrowthChart } from "@/components/charts/SkillGrowthChart";
import { Card } from "@/components/ui/card";
import { StatusBar } from "@/components/layout/StatusBar";
import { coachNote } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { Award, CheckCircle, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";

export function ParentDashboardScreen() {
  const { profile, totalXp, missionsCompleted, badgesUnlocked, teamActivities } =
    useApp();
  useEffect(() => {
    fetch("/api/parent-report").catch(() => {});
  }, []);

  return (
    <div className="screen-page">
      <StatusBar />
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-base font-extrabold leading-snug text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Báo cáo trưởng thành của {profile.name}
        </h1>

        <div className="flex flex-wrap gap-3">
          <StatCard label="Tổng XP" value={`${totalXp} XP`} icon={<Star size={20} />} index={0} />
          <StatCard
            label="Nhiệm vụ"
            value={`${missionsCompleted} / 8`}
            icon={<CheckCircle size={20} />}
            index={1}
          />
          <StatCard
            label="Huy hiệu"
            value={`${badgesUnlocked.length}`}
            icon={<Award size={20} />}
            index={2}
          />
          <StatCard
            label="Hoạt động nhóm"
            value={`${teamActivities}`}
            icon={<Users size={20} />}
            index={3}
          />
        </div>

        <Card className="mt-5">
          <p className="section-header mb-3">Biểu đồ kỹ năng</p>
          <SkillGrowthChart skills={profile.skills} />
        </Card>

        <Card className="mt-4 border-l-4 border-gold">
          <p className="text-xs font-bold text-gold">Ghi chú huấn luyện viên</p>
          <p className="mt-2 text-sm leading-relaxed text-dark/80">{coachNote}</p>
        </Card>
      </div>
    </div>
  );
}
