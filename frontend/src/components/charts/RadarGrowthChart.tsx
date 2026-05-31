"use client";

import type { Skill } from "@/lib/types";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface RadarGrowthChartProps {
  skills: Skill[];
  beforeLabel?: string;
  afterLabel?: string;
}

export function RadarGrowthChart({
  skills,
  beforeLabel = "Before",
  afterLabel = "After",
}: RadarGrowthChartProps) {
  const data = skills.map((s) => ({
    skill: s.label.length > 6 ? s.label.slice(0, 5) + "." : s.label,
    after: s.after,
    before: s.before,
  }));

  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#E6D8B8" />
          <PolarAngleAxis dataKey="skill" tick={{ fontSize: 10, fill: "#0B3D2E" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 9 }} />
          <Radar
            name={afterLabel}
            dataKey="after"
            stroke="#2E7D32"
            fill="#2E7D32"
            fillOpacity={0.35}
          />
          <Radar
            name={beforeLabel}
            dataKey="before"
            stroke="#A8D5BA"
            fill="#A8D5BA"
            fillOpacity={0.2}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
