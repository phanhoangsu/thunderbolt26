"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Mountain, Trees } from "lucide-react";

export function WelcomeScreen() {
  const { navigateTo } = useApp();
  const { t } = useLanguage();

  return (
    <div className="welcome-simple">
      <div className="welcome-simple__bg" aria-hidden>
        <div className="welcome-simple__glow" />
        <div className="welcome-simple__mountains" />
      </div>

      <div className="welcome-simple__lang">
        <LanguageSwitcher className="welcome-simple__lang-switcher" />
      </div>

      <header className="welcome-simple__brand">
        <div className="welcome-simple__logo">
          <Mountain size={36} strokeWidth={1.75} aria-hidden />
          <span className="welcome-simple__logo-badge" aria-hidden>
            <Trees size={14} strokeWidth={2.5} />
          </span>
        </div>

        <h1 className="welcome-simple__name">
          <span className="welcome-simple__name-line">{t("welcome.brandWeekend")}</span>
          <span className="welcome-simple__name-line welcome-simple__name-line--gold">
            {t("welcome.brandWarriors")}
          </span>
        </h1>

        <p className="welcome-simple__tagline">
          <span className="welcome-simple__tagline-rule" aria-hidden />
          {t("welcome.tagline")}
          <span className="welcome-simple__tagline-rule" aria-hidden />
        </p>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="welcome-simple__card"
      >
        <p className="welcome-simple__card-title">{t("welcome.panelTitle")}</p>

        <button
          type="button"
          className="welcome-simple__btn welcome-simple__btn--primary"
          onClick={() => navigateTo("login")}
        >
          <Trees size={18} strokeWidth={2.5} aria-hidden />
          {t("welcome.login")}
        </button>

        <button
          type="button"
          className="welcome-simple__btn welcome-simple__btn--ghost"
          onClick={() => navigateTo("register")}
        >
          {t("welcome.register")}
        </button>
      </motion.div>
    </div>
  );
}
