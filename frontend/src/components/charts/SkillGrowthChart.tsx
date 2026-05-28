"use client";

import type { Skill } from "@/lib/types";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function SkillGrowthChart({ skills }: { skills: Skill[] }) {
  const data = skills.map((s) => ({
    name: s.label.length > 8 ? s.label.slice(0, 7) + "…" : s.label,
    fullName: s.label,
    truoc: s.before,
    sau: s.after,
  }));

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E6D8B8" />
          <XAxis dataKey="name" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
          <Tooltip
            formatter={(value, name) => [
              `${value}`,
              name === "truoc" ? "Trước" : "Sau",
            ]}
            labelFormatter={(_, payload) =>
              payload?.[0]?.payload?.fullName ?? ""
            }
          />
          <Legend formatter={(v) => (v === "truoc" ? "Trước" : "Sau")} />
          <Bar dataKey="truoc" fill="#A8D5BA" radius={[4, 4, 0, 0]} />
          <Bar dataKey="sau" fill="#2E7D32" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
