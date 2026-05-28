"use client";

import { JourneyMapVisual } from "@/components/journey/JourneyMapVisual";
import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
import type { Checkpoint } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function JourneyMapScreen() {
  const { checkpoints, navigateTo, apiLoading } = useApp();
  const [day, setDay] = useState<1 | 2>(1);
  const filtered = checkpoints.filter((c) => c.day === day);

  const handleSelect = (cp: Checkpoint) => {
    if (cp.missionId) navigateTo("missions");
  };

  return (
    <div className="screen-page">
      <PageHeader title="Hành trình của bạn" subtitle="Bản đồ 2 ngày 1 đêm" showBack={false} />

      <div className="pro-card pro-card--flat p-2 mb-6 max-w-xs">
        <div className="day-tabs !mb-0 !bg-transparent">
          {([1, 2] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDay(d)}
              className={cn("day-tabs__btn", day === d && "day-tabs__btn--active")}
            >
              Ngày {d}
            </button>
          ))}
        </div>
      </div>

      {apiLoading ? (
        <div className="pro-card flex h-80 items-center justify-center text-muted">
          Đang tải bản đồ...
        </div>
      ) : (
        <JourneyMapVisual checkpoints={filtered} onSelect={handleSelect} />
      )}
    </div>
  );
}
