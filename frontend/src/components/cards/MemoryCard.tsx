"use client";

import { Card } from "@/components/ui/card";
import type { Memory } from "@/lib/types";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

export function MemoryCard({ memory, index }: { memory: Memory; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Card className="overflow-hidden p-0">
        <div
          className={`flex h-32 items-center justify-center bg-gradient-to-br ${memory.gradient} text-4xl`}
        >
          {memory.mood}
        </div>
        <div className="p-3">
          <div className="mb-1 flex items-start justify-between">
            <h3 className="font-bold text-forest">{memory.title}</h3>
            <button type="button" className="text-medium-green">
              <Heart size={18} />
            </button>
          </div>
          <span className="tag tag-green mb-2 inline-flex">{memory.location}</span>
          <p className="text-xs text-muted">{memory.date}</p>
          <p className="mt-1 text-sm text-dark/80">{memory.note}</p>
        </div>
      </Card>
    </motion.div>
  );
}
