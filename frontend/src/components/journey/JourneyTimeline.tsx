"use client";

import type { Checkpoint } from "@/lib/types";
import { statusLabel } from "@/lib/journey-utils";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRight, Lock } from "lucide-react";

interface JourneyTimelineProps {
  checkpoints: Checkpoint[];
  selectedId: string | null;
  onSelect: (cp: Checkpoint) => void;
  onMission?: (cp: Checkpoint) => void;
  t: (key: string) => string;
}

export function JourneyTimeline({
  checkpoints,
  selectedId,
  onSelect,
  onMission,
  t,
}: JourneyTimelineProps) {
  return (
    <div className="journey-pro-timeline">
      {checkpoints.map((cp, i) => {
        const isLast = i === checkpoints.length - 1;
        const isSelected = selectedId === cp.id;

        return (
          <motion.div
            key={cp.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "journey-pro-timeline__item",
              isSelected && "journey-pro-timeline__item--selected",
            )}
          >
            {!isLast && (
              <div
                className={cn(
                  "journey-pro-timeline__line",
                  cp.status === "completed" && "journey-pro-timeline__line--done",
                )}
              />
            )}

            <button
              type="button"
              className={cn(
                "journey-pro-timeline__dot",
                cp.status === "completed" && "journey-pro-timeline__dot--done",
                cp.status === "active" && "journey-pro-timeline__dot--active",
                cp.status === "locked" && "journey-pro-timeline__dot--locked",
              )}
              onClick={() => onSelect(cp)}
              aria-label={cp.name}
            >
              {cp.status === "locked" ? <Lock size={14} /> : cp.status === "completed" ? "✓" : cp.icon}
            </button>

            <div className="journey-pro-timeline__card">
              <div className="journey-pro-timeline__card-head">
                <div>
                  <p className="journey-pro-timeline__stage">
                    {t("journey.stages")} {i + 1}
                  </p>
                  <h3 className="journey-pro-timeline__title">{cp.name}</h3>
                  {cp.subtitle && (
                    <p className="journey-pro-timeline__sub">{cp.subtitle}</p>
                  )}
                </div>
                <span
                  className={cn(
                    "journey-pro-timeline__badge",
                    cp.status === "completed" && "journey-pro-timeline__badge--done",
                    cp.status === "active" && "journey-pro-timeline__badge--active",
                    cp.status === "locked" && "journey-pro-timeline__badge--locked",
                  )}
                >
                  {statusLabel(cp.status, t)}
                </span>
              </div>

              {cp.status === "locked" ? (
                <p className="journey-pro-timeline__hint">{t("journey.lockedHint")}</p>
              ) : cp.missionId && cp.status === "active" ? (
                <button
                  type="button"
                  className="journey-pro-timeline__action"
                  onClick={() => onMission?.(cp)}
                >
                  {t("journey.goMission")}
                  <ChevronRight size={16} />
                </button>
              ) : null}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
