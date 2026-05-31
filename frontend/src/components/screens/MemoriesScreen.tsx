"use client";

import { MemoryCard } from "@/components/cards/MemoryCard";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedData } from "@/lib/use-translated-data";
import { useMemo } from "react";

const VI_DEFAULT_REFLECTION =
  "Tôi học được rằng làm việc nhóm giúp tôi mạnh mẽ hơn.";
const EN_DEFAULT_REFLECTION =
  "I learned that teamwork makes me stronger.";

export function MemoriesScreen() {
  const { reflection, saveReflection } = useApp();
  const { t } = useLanguage();
  const { memories } = useTranslatedData();

  const displayReflection = useMemo(() => {
    if (
      reflection === VI_DEFAULT_REFLECTION ||
      reflection === EN_DEFAULT_REFLECTION
    ) {
      return t("memories.defaultReflection");
    }
    return reflection;
  }, [reflection, t]);

  return (
    <div className="screen-page">
      <div className="px-5 pb-6">
        <h1
          className="py-3 text-center text-lg font-extrabold text-forest"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {t("memories.title")} 📸
        </h1>

        <div className="grid grid-cols-2 gap-3">
          {memories.map((m, i) => (
            <MemoryCard key={m.id} memory={m} index={i} />
          ))}
        </div>

        <Card className="mt-5">
          <p className="section-header mb-2">{t("memories.reflectionTitle")}</p>
          <textarea
            className="w-full resize-none rounded-xl border border-forest/10 bg-cream p-3 text-sm outline-none focus:border-medium-green"
            rows={3}
            value={displayReflection}
            onChange={(e) => saveReflection(e.target.value)}
            placeholder={t("memories.reflectionPlaceholder")}
          />
        </Card>
      </div>
    </div>
  );
}
