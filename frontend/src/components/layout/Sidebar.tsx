"use client";

import { useApp } from "@/context/AppContext";
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

const mainNav: { id: ScreenId; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Trang chủ", icon: Home },
  { id: "journey", label: "Hành trình", icon: Map },
  { id: "missions", label: "Nhiệm vụ", icon: Target },
  { id: "badges", label: "Thành tích", icon: Award },
  { id: "profile", label: "Hồ sơ", icon: User },
];

const extraNav: { id: ScreenId; label: string; icon: typeof Home }[] = [
  { id: "memories", label: "Ký ức", icon: BookOpen },
  { id: "growth", label: "Phát triển", icon: TrendingUp },
  { id: "parent", label: "Phụ huynh", icon: Users },
  { id: "promise", label: "Cam kết", icon: Sparkles },
];

interface SidebarProps {
  active: ScreenId;
  onNavigate: (id: ScreenId, options?: { replace?: boolean }) => void;
}

export function Sidebar({ active, onNavigate }: SidebarProps) {
  const { authUser, logout } = useApp();

  return (
    <aside className="app-sidebar">
      <div className="app-sidebar__brand">
        <span className="app-sidebar__logo">⛰️</span>
        <div>
          <p className="app-sidebar__title">WEEKEND WARRIORS</p>
          <p className="app-sidebar__tagline">Hành trình trưởng thành</p>
        </div>
      </div>

      {authUser && (
        <div className="app-sidebar__user">
          <div className="app-sidebar__avatar">{authUser.avatar}</div>
          <div className="min-w-0">
            <p className="truncate font-bold text-white">{authUser.name}</p>
            <p className="truncate text-xs text-soft-green/80">{authUser.email}</p>
          </div>
        </div>
      )}

      <nav className="app-sidebar__nav">
        <p className="app-sidebar__section">Menu chính</p>
        {mainNav.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              className={cn("app-sidebar__link", isActive && "app-sidebar__link--active")}
              onClick={() => onNavigate(item.id, { replace: true })}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}

        <p className="app-sidebar__section mt-4">Khám phá thêm</p>
        {extraNav.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === active;
          return (
            <button
              key={item.id}
              type="button"
              className={cn("app-sidebar__link", isActive && "app-sidebar__link--active")}
              onClick={() => onNavigate(item.id)}
            >
              <Icon size={20} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="app-sidebar__footer">
        {authUser ? (
          <button type="button" className="app-sidebar__logout" onClick={() => logout()}>
            <LogOut size={18} />
            Đăng xuất
          </button>
        ) : (
          <button
            type="button"
            className="app-sidebar__logout app-sidebar__logout--login"
            onClick={() => onNavigate("login")}
          >
            Đăng nhập
          </button>
        )}
      </div>
    </aside>
  );
}
