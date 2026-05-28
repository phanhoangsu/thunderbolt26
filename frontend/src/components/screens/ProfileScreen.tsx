"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { CheckCircle2, LogOut, Mail, Shield } from "lucide-react";

export function ProfileScreen() {
  const { profile, authUser, isGuest, logout, navigateTo } = useApp();
  const xpPercent = Math.round((profile.xp / profile.xpMax) * 100);

  const skills = [
    { label: "Tự tin", value: 40 },
    { label: "Giao tiếp", value: 35 },
    { label: "Làm việc nhóm", value: 30 },
    { label: "Giải quyết vấn đề", value: 45 },
    { label: "Sáng tạo", value: 50 },
  ];

  if (!authUser && !isGuest) {
    return (
      <div className="screen-page">
        <PageHeader title="Hồ sơ của bạn" showBack={false} />
        <div className="pro-card auth-guest-prompt max-w-md mx-auto text-center">
          <Shield size={40} className="mx-auto mb-4 text-medium-green" />
          <p className="text-[#4a5d52] mb-6">Vui lòng đăng nhập để xem hồ sơ cá nhân.</p>
          <button type="button" className="btn-mockup btn-mockup--primary" onClick={() => navigateTo("login")}>
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-page">
      <PageHeader title="Hồ sơ của bạn" subtitle="RPG Profile · Tiến độ cá nhân" showBack={false} />

      {isGuest && (
        <div className="auth-guest-banner mx-auto max-w-3xl mb-6">
          Bạn đang xem thử ·{" "}
          <button type="button" onClick={() => navigateTo("login")}>Đăng nhập</button>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="pro-profile-header"
      >
        <div className="pro-avatar">{profile.avatar}</div>
        <h2 className="text-2xl font-extrabold text-forest" style={{ fontFamily: "var(--font-heading)" }}>
          {profile.name}
        </h2>
        <span className="pro-level-badge">
          <Shield size={14} />
          Explorer Lv.{profile.levelNum}
        </span>
        {authUser && (
          <p className="mt-3 flex items-center justify-center gap-2 text-sm text-muted">
            <Mail size={14} />
            {authUser.email}
          </p>
        )}

        <div className="pro-xp-bar">
          <div className="pro-xp-bar__head">
            <span className="text-forest">Kinh nghiệm</span>
            <span className="text-medium-green">
              {profile.xp} / {profile.xpMax} XP
            </span>
          </div>
          <div className="pro-xp-bar__track">
            <motion.div
              className="pro-xp-bar__fill"
              initial={{ width: 0 }}
              animate={{ width: `${xpPercent}%` }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>

      <div className="profile-responsive__body mt-0">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pro-card pro-card--flat"
        >
          <h3 className="text-base font-extrabold text-forest mb-4" style={{ fontFamily: "var(--font-heading)" }}>
            Chỉ số hiện tại
          </h3>
          {skills.map((s, i) => (
            <div key={s.label} className="pro-skill-row">
              <span className="pro-skill-row__label">{s.label}</span>
              <div className="pro-skill-row__track">
                <motion.div
                  className="pro-skill-row__fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${s.value}%` }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6 }}
                />
              </div>
              <span className="pro-skill-row__val">{s.value}/100</span>
            </div>
          ))}
        </motion.div>

        <div className="profile-responsive__side">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="pro-card border-l-4 border-l-medium-green"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-soft-green/30">
                <CheckCircle2 size={20} className="text-medium-green" />
              </div>
              <span className="font-extrabold text-forest">Nhiệm vụ cá nhân</span>
            </div>
            <p className="text-sm leading-relaxed text-[#4a5d52]">
              Làm quen và nói chuyện với 3 người bạn mới
            </p>
          </motion.div>

          {authUser && (
            <button type="button" className="btn-logout w-full" onClick={() => logout()}>
              <LogOut size={18} />
              Đăng xuất
            </button>
          )}

          {isGuest && (
            <button type="button" className="btn-mockup btn-mockup--primary w-full" onClick={() => navigateTo("register")}>
              Tạo tài khoản
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
