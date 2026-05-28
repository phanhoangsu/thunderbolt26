"use client";

import { ScreenId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Award, Home, Map, Target, User } from "lucide-react";

const nav: {
  id: ScreenId;
  label: string;
  icon: typeof Home;
  match: ScreenId[];
}[] = [
  { id: "home", label: "Trang chủ", icon: Home, match: ["home"] },
  { id: "journey", label: "Hành trình", icon: Map, match: ["journey"] },
  { id: "missions", label: "Nhiệm vụ", icon: Target, match: ["missions"] },
  { id: "badges", label: "Thành tích", icon: Award, match: ["badges"] },
  { id: "profile", label: "Hồ sơ", icon: User, match: ["profile"] },
];

interface BottomNavProps {
  active: ScreenId;
  onNavigate: (id: ScreenId, options?: { replace?: boolean }) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav-mobile" aria-label="Điều hướng chính">
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
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
