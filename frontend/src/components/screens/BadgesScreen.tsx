"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { achievements } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lock, Trophy } from "lucide-react";

export function BadgesScreen() {
  const { totalXp, badges } = useApp();
  const unlocked = badges.filter((b) => b.unlocked).length;

  return (
    <div className="screen-page">
      <PageHeader title="Thành tích của bạn" subtitle="XP & huy hiệu" showBack={false} />

      <div className="flex flex-col items-center lg:flex-row lg:items-start lg:gap-10">
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="badges-mockup__xp-ring shrink-0"
        >
          <div className="badges-mockup__xp-inner">
            <Trophy size={28} className="mx-auto mb-2 text-gold opacity-80" />
            <span className="badges-mockup__xp-value">{totalXp}</span>
            <span className="badges-mockup__xp-sub">Total XP</span>
          </div>
        </motion.div>

        <div className="w-full flex-1 mt-8 lg:mt-0">
          <p className="pro-section-title mt-0">
            Huy hiệu · {unlocked}/{badges.length} đã mở
          </p>
          <div className="badges-mockup__grid">
            {badges.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className={cn("badge-hex", b.unlocked ? "badge-hex--unlocked" : "badge-hex--locked")}
              >
                {b.unlocked ? <span className="badge-hex__icon text-3xl">{b.icon}</span> : <Lock size={22} className="text-muted" />}
                <span className="badge-hex__name">{b.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="pro-section-title">Hoạt động gần đây</h2>
      <div className="space-y-3 max-w-2xl">
        {achievements.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="activity-row"
          >
            <div>
              <p className="activity-row__text">{a.text}</p>
              <p className="activity-row__date">{a.date}</p>
            </div>
            <span className="activity-row__xp">+{a.xp} XP</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
