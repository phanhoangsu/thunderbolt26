"use client";

import type { Checkpoint } from "@/lib/types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface JourneyMapVisualProps {
  checkpoints: Checkpoint[];
  onSelect: (cp: Checkpoint) => void;
}

export function JourneyMapVisual({ checkpoints, onSelect }: JourneyMapVisualProps) {
  const positions = [
    { top: "4%", left: "42%" },
    { top: "18%", left: "68%" },
    { top: "32%", left: "28%" },
    { top: "46%", left: "58%" },
    { top: "58%", left: "22%" },
    { top: "72%", left: "52%" },
    { top: "86%", left: "35%" },
  ];

  return (
    <div className="journey-map">
      <div className="journey-map__bg">
        <div className="journey-map__hill journey-map__hill--1" />
        <div className="journey-map__hill journey-map__hill--2" />
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="journey-map__tree"
            style={{ left: `${10 + i * 11}%`, bottom: `${15 + (i % 3) * 8}%` }}
          />
        ))}
      </div>

      <svg className="journey-map__path" viewBox="0 0 200 400" preserveAspectRatio="none">
        <path
          d="M100 20 Q140 60 130 100 T90 160 T120 220 T80 280 T100 360"
          fill="none"
          stroke="#A8D5BA"
          strokeWidth="3"
          strokeDasharray="8 6"
          strokeLinecap="round"
        />
      </svg>

      {checkpoints.slice(0, positions.length).map((cp, i) => {
        const pos = positions[i];
        return (
          <motion.button
            key={cp.id}
            type="button"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            disabled={cp.status === "locked"}
            onClick={() => cp.status !== "locked" && onSelect(cp)}
            className={cn(
              "journey-map__node",
              cp.status === "completed" && "journey-map__node--done",
              cp.status === "active" && "journey-map__node--active",
              cp.status === "locked" && "journey-map__node--locked"
            )}
            style={{ top: pos.top, left: pos.left }}
          >
            <span className="journey-map__node-icon">
              {cp.status === "completed" ? "✓" : cp.icon}
            </span>
            <span className="journey-map__node-label">{cp.name}</span>
            {cp.subtitle && (
              <span className="journey-map__node-sub">{cp.subtitle}</span>
            )}
          </motion.button>
        );
      })}

      <div className="journey-map__finish">
        <span>🚩</span>
        <span>Boss Challenge</span>
      </div>
    </div>
  );
}
