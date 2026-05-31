"use client";

import type { Checkpoint } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Lock, MapPin } from "lucide-react";

const MAP_POSITIONS = [
  { top: "8%", left: "50%" },
  { top: "24%", left: "72%" },
  { top: "40%", left: "30%" },
  { top: "56%", left: "65%" },
  { top: "72%", left: "38%" },
];

interface JourneyMapVisualProps {
  checkpoints: Checkpoint[];
  selectedId: string | null;
  onSelect: (cp: Checkpoint) => void;
  progressPercent: number;
}

export function JourneyMapVisual({
  checkpoints,
  selectedId,
  onSelect,
  progressPercent,
}: JourneyMapVisualProps) {
  const nodes = checkpoints.slice(0, MAP_POSITIONS.length);
  const pathProgress = Math.min(Math.max(progressPercent, 8), 100);

  return (
    <div className="journey-pro-map">
      <div className="journey-pro-map__sky" />
      <div className="journey-pro-map__mountains" aria-hidden>
        <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="h-full w-full">
          <defs>
            <linearGradient id="journeyMountainBack" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2e7d32" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0b3d2e" stopOpacity="0.55" />
            </linearGradient>
            <linearGradient id="journeyMountainFront" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#134a38" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0b3d2e" stopOpacity="0.75" />
            </linearGradient>
          </defs>
          <path
            d="M0 200 L60 110 L130 150 L210 80 L290 130 L360 90 L400 120 L400 200 Z"
            fill="url(#journeyMountainBack)"
          />
          <path
            d="M0 200 L90 140 L170 170 L260 115 L340 155 L400 135 L400 200 Z"
            fill="url(#journeyMountainFront)"
          />
        </svg>
      </div>

      <div className="journey-pro-map__compass" aria-hidden>
        <MapPin size={14} />
      </div>

      <svg className="journey-pro-map__path" viewBox="0 0 200 400" preserveAspectRatio="none">
        <path
          d="M100 30 Q130 70 125 110 T85 170 T115 230 T75 290 T100 350"
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <motion.path
          d="M100 30 Q130 70 125 110 T85 170 T115 230 T75 290 T100 350"
          fill="none"
          stroke="#d6a84f"
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: pathProgress / 100 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>

      {nodes.map((cp, i) => {
        const pos = MAP_POSITIONS[i];
        const isSelected = selectedId === cp.id;

        return (
          <motion.button
            key={cp.id}
            type="button"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.07 }}
            disabled={cp.status === "locked"}
            onClick={() => cp.status !== "locked" && onSelect(cp)}
            className={cn(
              "journey-pro-map__node",
              cp.status === "completed" && "journey-pro-map__node--done",
              cp.status === "active" && "journey-pro-map__node--active",
              cp.status === "locked" && "journey-pro-map__node--locked",
              isSelected && "journey-pro-map__node--selected",
            )}
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="journey-pro-map__node-ring">
              <span className="journey-pro-map__node-icon">
                {cp.status === "completed" ? "✓" : cp.status === "locked" ? <Lock size={14} /> : cp.icon}
              </span>
            </span>
            <span className="journey-pro-map__node-label">{cp.name}</span>
          </motion.button>
        );
      })}
    </div>
  );
}
