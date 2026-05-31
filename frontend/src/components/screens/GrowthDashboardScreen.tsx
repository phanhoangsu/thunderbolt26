"use client";

import { RadarGrowthChart } from "@/components/charts/RadarGrowthChart";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedData } from "@/lib/use-translated-data";
import { motion } from "framer-motion";

export function GrowthDashboardScreen() {
  const { t } = useLanguage();
  const { growthSkills, growthFeedback } = useTranslatedData();

  return (
    <div className="screen-page">
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-lg font-extrabold text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t("growth.title")}
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <RadarGrowthChart
              skills={growthSkills}
              beforeLabel={t("charts.before")}
              afterLabel={t("charts.after")}
            />
          </Card>
        </motion.div>

        {growthSkills.map((s, i) => {
          const growth = s.after - s.before;
          const pct = Math.round((growth / s.before) * 100) || 0;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
            >
              <Card className="mt-3 flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-bold text-forest">{s.label}</p>
                  <p className="text-xs text-muted">
                    {s.before} → {s.after}
                  </p>
                </div>
                <span className="text-sm font-extrabold text-medium-green">
                  +{pct}%
                </span>
              </Card>
            </motion.div>
          );
        })}

        <Card className="mt-4 bg-soft-green/20">
          <p className="text-sm">
            <span className="font-bold text-forest">{t("growth.strongest")}</span>{" "}
            {growthFeedback.strongest}
          </p>
          <p className="mt-2 text-sm">
            <span className="font-bold text-forest">{t("growth.needsImprovement")}</span>{" "}
            {growthFeedback.needsImprovement}
          </p>
        </Card>
      </div>
    </div>
  );
}
