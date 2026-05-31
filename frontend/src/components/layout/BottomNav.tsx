"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ScreenId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Award, Home, Map, Target, User } from "lucide-react";

interface BottomNavProps {
  active: ScreenId;
  onNavigate: (id: ScreenId, options?: { replace?: boolean }) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  const nav: {
    id: ScreenId;
    labelKey: string;
    icon: typeof Home;
    match: ScreenId[];
  }[] = [
    { id: "home", labelKey: "navigation.home", icon: Home, match: ["home"] },
    { id: "journey", labelKey: "navigation.journey", icon: Map, match: ["journey"] },
    { id: "missions", labelKey: "navigation.missions", icon: Target, match: ["missions"] },
    { id: "badges", labelKey: "navigation.badges", icon: Award, match: ["badges"] },
    { id: "profile", labelKey: "navigation.profile", icon: User, match: ["profile"] },
  ];

  return (
    <nav className="bottom-nav-mobile" aria-label={t("common.mainNavAria")}>
      {nav.map((item) => {
        const Icon = item.icon;
        const isActive = item.match.includes(active);
        return (
          <button
            key={item.id}
            type="button"
            className={cn("bottom-nav-mobile__item", isActive && "bottom-nav-mobile__item--active")}
            onClick={() => onNavigate(item.id, { replace: true })}
          >
            <Icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
            <span>{t(item.labelKey)}</span>
          </button>
        );
      })}
    </nav>
  );
}
