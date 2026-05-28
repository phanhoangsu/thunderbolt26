"use client";

import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ReactNode } from "react";

export function StatCard({
  label,
  value,
  icon,
  index = 0,
}: {
  label: string;
  value: string;
  icon: ReactNode;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex-1 min-w-[140px]"
    >
      <Card className="flex flex-col gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-green/30 text-medium-green">
          {icon}
        </div>
        <p className="text-xl font-extrabold text-forest">{value}</p>
        <p className="text-xs font-semibold text-muted">{label}</p>
      </Card>
    </motion.div>
  );
}
