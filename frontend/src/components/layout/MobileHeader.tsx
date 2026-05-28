"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { ScreenId } from "@/lib/types";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MobileHeader() {
  const { navigateTo } = useApp();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  const extraMenu: { id: ScreenId; labelKey: string; emoji: string }[] = [
    { id: "memories", labelKey: "navigation.memories", emoji: "📸" },
    { id: "parent", labelKey: "navigation.parent", emoji: "👨‍👩‍👦" },
    { id: "growth", labelKey: "navigation.growth", emoji: "📊" },
    { id: "promise", labelKey: "navigation.promise", emoji: "🌟" },
  ];

  return (
    <div className="mobile-header lg:hidden">
      <LanguageSwitcher className="mr-auto" />
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="mobile-header__btn"
        aria-label={t("common.expandMenuAria")}
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mobile-header__backdrop"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="mobile-header__dropdown"
            >
              {extraMenu.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    navigateTo(item.id);
                    setOpen(false);
                  }}
                  className="mobile-header__item"
                >
                  <span>{item.emoji}</span>
                  {t(item.labelKey)}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
