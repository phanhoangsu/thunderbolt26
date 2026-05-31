"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

interface BadgeCardProps {
  name: string;
  icon: string;
  unlocked: boolean;
  index?: number;
}

export function BadgeCard({ name, icon, unlocked, index = 0 }: BadgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card
        className={cn(
          "flex flex-col items-center gap-2 p-4 text-center",
          !unlocked && "opacity-60 grayscale"
        )}
      >
        <div
          className={cn(
            "flex h-16 w-16 items-center justify-center rounded-full text-2xl",
            unlocked
              ? "bg-gradient-to-br from-gold/20 to-soft-green/30 ring-2 ring-gold/40"
              : "bg-light-gray"
          )}
        >
          {unlocked ? icon : <Lock size={24} className="text-muted" />}
        </div>
        <p className="text-xs font-bold text-forest">{name}</p>
        {!unlocked && (
          <span className="text-[10px] font-semibold text-muted">Sắp mở</span>
        )}
      </Card>
    </motion.div>
  );
}
