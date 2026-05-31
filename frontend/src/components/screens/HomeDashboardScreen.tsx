"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  ChevronRight,
  Flame,
  Map,
  Sparkles,
  Target,
  TrendingUp,
  Trees,
  Users,
  Zap,
} from "lucide-react";

export function HomeDashboardScreen() {
  const {
    navigateTo,
    profile,
    totalXp,
    authUser,
    logout,
    missionsCompleted,
    badges,
  } = useApp();
  const { t } = useLanguage();
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  const links = [
    {
      id: "journey" as const,
      labelKey: "navigation.journey",
      descKey: "home.journeyDesc",
      icon: Map,
      gradient: "linear-gradient(135deg, #0b3d2e, #2e7d32)",
    },
    {
      id: "missions" as const,
      labelKey: "navigation.missions",
      descKey: "home.missionsDesc",
      icon: Target,
      gradient: "linear-gradient(135deg, #c4913d, #d6a84f)",
    },
    {
      id: "badges" as const,
      labelKey: "navigation.badges",
      descKey: "home.badgesDesc",
      icon: Award,
      gradient: "linear-gradient(135deg, #134a38, #2e7d32)",
    },
    {
      id: "memories" as const,
      labelKey: "navigation.memories",
      descKey: "home.memoriesDesc",
      icon: BookOpen,
      gradient: "linear-gradient(135deg, #5a7a5e, #a8d5ba)",
    },
    {
      id: "growth" as const,
      labelKey: "navigation.growth",
      descKey: "home.growthDesc",
      icon: TrendingUp,
      gradient: "linear-gradient(135deg, #2e7d32, #6ba86e)",
    },
    {
      id: "parent" as const,
      labelKey: "navigation.parent",
      descKey: "home.parentDesc",
      icon: Users,
      gradient: "linear-gradient(135deg, #0b3d2e, #134a38)",
    },
    {
      id: "promise" as const,
      labelKey: "navigation.promise",
      descKey: "home.promiseDesc",
      icon: Sparkles,
      gradient: "linear-gradient(135deg, #d6a84f, #e6c88a)",
    },
  ];

  return (
    <div className="screen-page">
      <PageHeader
        title={t("home.title")}
        subtitle={t("home.subtitle")}
        showBack={false}
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="pro-hero"
      >
        <p className="pro-hero__label relative z-10">
          {t("home.hello")}
          {profile.name}
        </p>
        <p className="pro-hero__xp relative z-10">{totalXp} XP</p>
        {authUser && (
          <p className="relative z-10 mt-2 text-sm text-white/60">
            {authUser.email}
          </p>
        )}
        <div className="pro-hero__meta relative z-10">
          <Zap size={14} className="text-gold" />
          Explorer Lv.{profile.levelNum}
        </div>
        <div className="pro-hero__actions">
          <button
            type="button"
            className="pro-btn-ghost"
            onClick={() => navigateTo("profile")}
          >
            {t("home.viewProfile")}
          </button>
          <button
            type="button"
            className="pro-btn-solid"
            onClick={() => logout()}
          >
            {t("auth.logout")}
          </button>
        </div>
      </motion.div>

      <div className="pro-stats">
        <div className="pro-stat">
          <Flame size={20} className="mx-auto mb-2 text-orange-500" />
          <p className="pro-stat__value">1/2</p>
          <p className="pro-stat__label">{t("home.campDay")}</p>
        </div>
        <div className="pro-stat">
          <Trees size={20} className="mx-auto mb-2 text-medium-green" />
          <p className="pro-stat__value">{missionsCompleted}/8</p>
          <p className="pro-stat__label">{t("home.missionsStat")}</p>
        </div>
        <div className="pro-stat">
          <Award size={20} className="mx-auto mb-2 text-gold" />
          <p className="pro-stat__value">{unlockedBadges}</p>
          <p className="pro-stat__label">{t("home.badgesStat")}</p>
        </div>
      </div>

      <h2 className="pro-section-title">{t("home.explore")}</h2>
      <div className="home-explore-grid grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.button
              key={link.id}
              type="button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04 }}
              onClick={() => navigateTo(link.id, { replace: true })}
              className="pro-tile"
            >
              <div
                className="pro-tile__icon"
                style={{ background: link.gradient }}
              >
                <Icon size={22} />
              </div>
              <div>
                <p className="pro-tile__label">{t(link.labelKey)}</p>
                <p className="pro-tile__desc">{t(link.descKey)}</p>
              </div>
              <ChevronRight size={18} className="text-soft-green opacity-60" />
            </motion.button>
          );
        })}
      </div>

      <div className="pro-card pro-card--flat mt-8 border-l-4 border-l-medium-green">
        <p className="text-xs font-bold uppercase tracking-wider text-medium-green">
          {t("home.messageLabel")}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#4a5d52]">
          {t("home.messageBody")}{" "}
          <strong className="font-semibold text-forest">
            {t("home.messageHighlight")}
          </strong>{" "}
          {t("home.messageEnd")}
        </p>
      </div>
    </div>
  );
}
