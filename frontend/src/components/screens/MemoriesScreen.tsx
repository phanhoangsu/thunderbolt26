"use client";

import { MemoryCard } from "@/components/cards/MemoryCard";
import { Card } from "@/components/ui/card";
import { StatusBar } from "@/components/layout/StatusBar";
import { memories } from "@/lib/mock-data";
import { useApp } from "@/context/AppContext";

export function MemoriesScreen() {
  const { reflection, saveReflection } = useApp();

  return (
    <div className="screen-page">
      <StatusBar />
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-lg font-extrabold text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Ký ức trại hè
        </h1>

        <div className="grid grid-cols-2 gap-3">
          {memories.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}
        </div>

        <Card className="mt-5">
          <p className="section-header mb-2">Hôm nay bạn học được gì?</p>
          <textarea
            className="w-full resize-none rounded-xl border border-forest/10 bg-cream p-3 text-sm outline-none focus:border-medium-green"
            rows={3}
            value={reflection}
            onChange={(e) => saveReflection(e.target.value)}
            placeholder="Viết suy ngẫm của bạn..."
          />
        </Card>
      </div>
    </div>
  );
}
