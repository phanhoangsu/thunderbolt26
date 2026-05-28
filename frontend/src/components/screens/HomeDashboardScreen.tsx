"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
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

const links = [
  { id: "journey" as const, label: "Hành trình", desc: "Bản đồ 2 ngày", icon: Map, gradient: "linear-gradient(135deg, #0b3d2e, #2e7d32)" },
  { id: "missions" as const, label: "Nhiệm vụ", desc: "QR & thử thách", icon: Target, gradient: "linear-gradient(135deg, #c4913d, #d6a84f)" },
  { id: "badges" as const, label: "Thành tích", desc: "XP & huy hiệu", icon: Award, gradient: "linear-gradient(135deg, #134a38, #2e7d32)" },
  { id: "memories" as const, label: "Ký ức", desc: "Nhật ký ảnh", icon: BookOpen, gradient: "linear-gradient(135deg, #5a7a5e, #a8d5ba)" },
  { id: "growth" as const, label: "Phát triển", desc: "Biểu đồ kỹ năng", icon: TrendingUp, gradient: "linear-gradient(135deg, #2e7d32, #6ba86e)" },
  { id: "parent" as const, label: "Phụ huynh", desc: "Báo cáo tiến độ", icon: Users, gradient: "linear-gradient(135deg, #0b3d2e, #134a38)" },
  { id: "promise" as const, label: "Cam kết", desc: "Lời hứa tương lai", icon: Sparkles, gradient: "linear-gradient(135deg, #d6a84f, #e6c88a)" },
];

export function HomeDashboardScreen() {
  const { navigateTo, profile, totalXp, authUser, isGuest, logout, missionsCompleted, badges } = useApp();
  const unlockedBadges = badges.filter((b) => b.unlocked).length;

  return (
    <div className="screen-page">
      <PageHeader title="Trang chủ" subtitle="Theo dõi hành trình trưởng thành" showBack={false} />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="pro-hero"
      >
        <p className="pro-hero__label relative z-10">
          Xin chào{isGuest ? " (khách)" : ""}, {profile.name}
        </p>
        <p className="pro-hero__xp relative z-10">{totalXp} XP</p>
        {authUser && (
          <p className="relative z-10 mt-2 text-sm text-white/60">{authUser.email}</p>
        )}
        <div className="pro-hero__meta relative z-10">
          <Zap size={14} className="text-gold" />
          Explorer Lv.{profile.levelNum}
        </div>
        <div className="pro-hero__actions">
          <button type="button" className="pro-btn-ghost" onClick={() => navigateTo("profile")}>
            Xem hồ sơ
          </button>
          {authUser ? (
            <button type="button" className="pro-btn-solid" onClick={() => logout()}>
              Đăng xuất
            </button>
          ) : (
            <button type="button" className="pro-btn-solid" onClick={() => navigateTo("login")}>
              Đăng nhập
            </button>
          )}
        </div>
      </motion.div>

      <div className="pro-stats">
        <div className="pro-stat">
          <Flame size={20} className="mx-auto mb-2 text-orange-500" />
          <p className="pro-stat__value">1/2</p>
          <p className="pro-stat__label">Ngày trại</p>
        </div>
        <div className="pro-stat">
          <Trees size={20} className="mx-auto mb-2 text-medium-green" />
          <p className="pro-stat__value">{missionsCompleted}/8</p>
          <p className="pro-stat__label">Nhiệm vụ</p>
        </div>
        <div className="pro-stat">
          <Award size={20} className="mx-auto mb-2 text-gold" />
          <p className="pro-stat__value">{unlockedBadges}</p>
          <p className="pro-stat__label">Huy hiệu</p>
        </div>
      </div>

      <h2 className="pro-section-title">Khám phá</h2>
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
              onClick={() => navigateTo(link.id)}
              className="pro-tile"
            >
              <div className="pro-tile__icon" style={{ background: link.gradient }}>
                <Icon size={22} />
              </div>
              <div>
                <p className="pro-tile__label">{link.label}</p>
                <p className="pro-tile__desc">{link.desc}</p>
              </div>
              <ChevronRight size={18} className="text-soft-green opacity-60" />
            </motion.button>
          );
        })}
      </div>

      <div className="pro-card pro-card--flat mt-8 border-l-4 border-l-medium-green">
        <p className="text-xs font-bold uppercase tracking-wider text-medium-green">
          Thông điệp
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#4a5d52]">
          Weekend Warriors giúp thanh thiếu niên trưởng thành qua{" "}
          <strong className="font-semibold text-forest">trải nghiệm ngoài trời thật</strong> — không chỉ thời gian trên màn hình.
        </p>
      </div>
    </div>
  );
}
