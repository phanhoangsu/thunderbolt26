"use client";

import { RadarGrowthChart } from "@/components/charts/RadarGrowthChart";
import { Card } from "@/components/ui/card";
import { StatusBar } from "@/components/layout/StatusBar";
import { growthSkills } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function GrowthDashboardScreen() {
  const [feedback, setFeedback] = useState({
    strongest: "Làm việc nhóm",
    needsImprovement: "Giao tiếp",
  });

  useEffect(() => {
    fetch("/api/growth")
      .then((r) => r.json())
      .then((d) => setFeedback(d))
      .catch(() => {});
  }, []);

  return (
    <div className="screen-page">
      <StatusBar />
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-lg font-extrabold text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Sự phát triển của bạn
        </h1>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Card>
            <RadarGrowthChart skills={growthSkills} />
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
            <span className="font-bold text-forest">Kỹ năng mạnh nhất:</span>{" "}
            {feedback.strongest}
          </p>
          <p className="mt-2 text-sm">
            <span className="font-bold text-forest">Cần cải thiện:</span>{" "}
            {feedback.needsImprovement}
          </p>
        </Card>
      </div>
    </div>
  );
}
