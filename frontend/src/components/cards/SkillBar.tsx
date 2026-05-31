"use client";

import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface SkillBarProps {
  label: string;
  value: number;
  max?: number;
  delay?: number;
}

export function SkillBar({ label, value, max = 100, delay = 0 }: SkillBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="mb-3"
    >
      <div className="mb-1 flex justify-between text-sm">
        <span className="font-semibold text-forest">{label}</span>
        <span className="text-muted">{value}/{max}</span>
      </div>
      <Progress value={value} max={max} />
    </motion.div>
  );
}
