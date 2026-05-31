"use client";

import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { ScreenId } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Award,
  BookOpen,
  Home,
  LogOut,
  Map,
  Sparkles,
  Target,
  TrendingUp,
  User,
  Users,
} from "lucide-react";

interface SidebarProps {
  active: ScreenId;
  onNavigate: (id: ScreenId, options?: { replace?: boolean }) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const { authUser, logout } = useApp();
  const { t } = useLanguage();

  const navItems = [
    { id: "home" as ScreenId, labelKey: "navigation.home", icon: Home },
    { id: "journey" as ScreenId, labelKey: "navigation.journey", icon: Map },
    { id: "missions" as ScreenId, labelKey: "navigation.missions", icon: Target },
    { id: "badges" as ScreenId, labelKey: "navigation.badges", icon: Award },
    { id: "profile" as ScreenId, labelKey: "navigation.profile", icon: User },
  ];

  const extraItems = [
    { id: "memories" as ScreenId, labelKey: "navigation.memories", icon: BookOpen },
    { id: "growth" as ScreenId, labelKey: "navigation.growth", icon: TrendingUp },
    { id: "parent" as ScreenId, labelKey: "navigation.parent", icon: Users },
    { id: "promise" as ScreenId, labelKey: "navigation.promise", icon: Sparkles },
  ];

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <span className="app-sidebar__logo">⛰️</span>
        <div>
          <p className="app-sidebar__title">{t("common.appName")}</p>
          <p className="app-sidebar__tagline">{t("common.tagline")}</p>
        </div>
      </div>

      {authUser && (
        <div className="app-sidebar__user">
          <div className="app-sidebar__avatar">{authUser.avatar}</div>
          <div className="min-w-0">
            <p className="truncate font-bold text-white">{authUser.name}</p>
            <p className="truncate text-xs text-soft-green/80">
              {authUser.email}
            </p>
          </div>
        </div>
      )}

      <nav className="app-sidebar__nav">
        <p className="app-sidebar__section">{t("sidebar.mainMenu")}</p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "app-sidebar__link",
                isActive && "app-sidebar__link--active",
              )}
              onClick={() => onNavigate(item.id, { replace: true })}
            >
              <Icon size={20} />
              {t(item.labelKey)}
            </button>
          );
        })}

        <p className="app-sidebar__section mt-4">{t("sidebar.exploreMore")}</p>
        {extraItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              className={cn(
                "app-sidebar__link",
                isActive && "app-sidebar__link--active",
              )}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />
              {t(item.labelKey)}
            </button>
          );
        })}
      </nav>

      <div className="app-sidebar__footer">
        <LanguageSwitcher />

        {authUser ? (
          <button
            type="button"
            className="app-sidebar__logout"
            onClick={() => logout()}
          >
            <LogOut size={18} />
            {t("auth.logout")}
          </button>
        ) : (
          <button
            type="button"
            className="app-sidebar__logout app-sidebar__logout--login"
            onClick={() => onNavigate("login")}
          >
            {t("auth.login")}
          </button>
        )}
      </div>
    </aside>
  );
}
