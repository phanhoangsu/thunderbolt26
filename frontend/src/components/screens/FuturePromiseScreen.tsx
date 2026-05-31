"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslatedData } from "@/lib/use-translated-data";
import { motion } from "framer-motion";
import { ArrowLeft, Share2 } from "lucide-react";
import { useState } from "react";

export function FuturePromiseScreen() {
  const { profile, savePromise, goBack } = useApp();
  const { t } = useLanguage();
  const { promiseExamples } = useTranslatedData();
  const [text, setText] = useState(profile.promise ?? "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    savePromise(text);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="screen-page relative min-h-[70vh] overflow-hidden rounded-2xl">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #F7F3E8 0%, #E6D8B8 40%, #A8D5BA 70%, #0B3D2E 100%)",
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center justify-between px-5 py-3">
          <button
            type="button"
            onClick={goBack}
            className="flex items-center gap-2 text-forest hover:opacity-70 transition-opacity"
            aria-label={t("common.back")}
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-semibold">{t("common.back")}</span>
          </button>
          <LanguageSwitcher />
        </div>
        <div className="px-5 pb-10">
          <h1
            className="py-4 text-center text-xl font-extrabold text-forest"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("promise.title")}
          </h1>

          <Card>
            <p className="text-sm font-semibold text-forest">{t("promise.intro")}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              {promiseExamples.map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => setText(ex)}
                  className="tag tag-green cursor-pointer hover:bg-soft-green/50"
                >
                  {ex}
                </button>
              ))}
            </div>

            <textarea
              className="mt-4 w-full resize-none rounded-xl border border-forest/10 bg-cream p-4 text-sm outline-none focus:border-medium-green"
              rows={4}
              placeholder={t("promise.placeholder")}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="mt-3 border-t border-dashed border-warm-beige pt-3">
              <p className="text-xs text-muted">{t("promise.signature")}</p>
              <p className="font-serif text-2xl italic text-forest">{profile.name}</p>
            </div>
          </Card>

          <Button className="mt-4" onClick={handleSave}>
            {saved ? t("promise.saved") : t("promise.save")}
          </Button>

          <button
            type="button"
            className="mt-3 flex w-full items-center justify-center gap-2 text-sm font-semibold text-forest"
          >
            <Share2 size={16} /> {t("promise.share")}
          </button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center text-sm font-medium leading-relaxed text-forest/80"
          >
            {t("promise.footerLine1")}
            <br />
            {t("promise.footerLine2")}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
