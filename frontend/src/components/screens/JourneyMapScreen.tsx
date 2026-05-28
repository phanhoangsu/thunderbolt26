"use client";

import { JourneyMapVisual } from "@/components/journey/JourneyMapVisual";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  journeyStats,
  translateCheckpoints,
} from "@/lib/journey-utils";
import type { Checkpoint } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Flag, Map, Target } from "lucide-react";
import { useMemo, useState } from "react";

export function JourneyMapScreen() {
  const { checkpoints, navigateTo, apiLoading } = useApp();
  const { t, language } = useLanguage();
  const [day, setDay] = useState<1 | 2>(1);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dayCheckpoints = useMemo(() => {
    const filtered = checkpoints
      .filter((c) => c.day === day)
      .sort((a, b) => {
        const order = ["start", "forest", "river", "kitchen", "sunset", "sunrise", "obstacle", "deep-forest", "circle", "boss"];
        return order.indexOf(a.id) - order.indexOf(b.id);
      });
    return translateCheckpoints(filtered, t);
  }, [checkpoints, day, t, language]);

  const stats = useMemo(() => journeyStats(dayCheckpoints), [dayCheckpoints]);
  const allStats = useMemo(
    () => journeyStats(translateCheckpoints(checkpoints, t)),
    [checkpoints, t, language],
  );

  const selected = dayCheckpoints.find((c) => c.id === selectedId) ?? stats.active ?? null;

  const handleSelect = (cp: Checkpoint) => {
    setSelectedId(cp.id);
    if (cp.missionId && cp.status === "active") {
      navigateTo("missions");
    }
  };

  const dayOneDone = checkpoints.filter((c) => c.day === 1 && c.status === "completed").length;
  const dayTwoDone = checkpoints.filter((c) => c.day === 2 && c.status === "completed").length;

  return (
    <div className="screen-page journey-pro-page">
      <PageHeader title={t("journey.title")} subtitle={t("journey.subtitle")} showBack={false} />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="journey-pro-stats"
      >
        <div className="journey-pro-stat">
          <Map size={18} className="text-medium-green" />
          <div>
            <p className="journey-pro-stat__label">{t("journey.progressLabel")}</p>
            <p className="journey-pro-stat__value">{allStats.percent}%</p>
          </div>
          <div className="journey-pro-stat__bar">
            <motion.div
              className="journey-pro-stat__bar-fill"
              initial={{ width: 0 }}
              animate={{ width: `${allStats.percent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
        <div className="journey-pro-stat journey-pro-stat--compact">
          <Flag size={18} className="text-gold" />
          <div>
            <p className="journey-pro-stat__label">{t("journey.stages")}</p>
            <p className="journey-pro-stat__value">
              {allStats.completed}/{allStats.total}
            </p>
          </div>
        </div>
        {stats.active && (
          <div className="journey-pro-stat journey-pro-stat--compact">
            <Target size={18} className="text-gold" />
            <div>
              <p className="journey-pro-stat__label">{t("journey.current")}</p>
              <p className="journey-pro-stat__value journey-pro-stat__value--sm">
                {stats.active.name}
              </p>
            </div>
          </div>
        )}
      </motion.div>

      <div className="journey-pro-day-tabs">
        {([1, 2] as const).map((d) => {
          const done = d === 1 ? dayOneDone : dayTwoDone;
          return (
            <button
              key={d}
              type="button"
              onClick={() => {
                setDay(d);
                setSelectedId(null);
              }}
              className={cn(
                "journey-pro-day-tab",
                day === d && "journey-pro-day-tab--active",
              )}
            >
              <span>{t("common.day")} {d}</span>
              <span className="journey-pro-day-tab__meta">
                {t("journey.dayProgress", { done, total: 5 })}
              </span>
            </button>
          );
        })}
      </div>

      {apiLoading ? (
        <div className="pro-card flex h-80 items-center justify-center text-muted">
          {t("journey.loadingMap")}
        </div>
      ) : (
        <div className="journey-pro-layout">
          <motion.div
            key={day}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="journey-pro-layout__map"
          >
            <JourneyMapVisual
              checkpoints={dayCheckpoints}
              selectedId={selectedId}
              onSelect={handleSelect}
              progressPercent={stats.percent}
            />
          </motion.div>

          <div className="journey-pro-layout__timeline">
            <h2 className="journey-pro-section-title">{t("journey.timelineTitle")}</h2>
            <JourneyTimeline
              checkpoints={dayCheckpoints}
              selectedId={selectedId}
              onSelect={(cp) => setSelectedId(cp.id)}
              onMission={() => navigateTo("missions")}
              t={t}
            />
          </div>
        </div>
      )}

      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="journey-pro-detail pro-card"
        >
          <span className="journey-pro-detail__icon">{selected.icon}</span>
          <div>
            <p className="journey-pro-detail__title">{selected.name}</p>
            {selected.subtitle && (
              <p className="journey-pro-detail__sub">{selected.subtitle}</p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
