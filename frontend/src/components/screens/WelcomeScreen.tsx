"use client";

import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Mountain } from "lucide-react";

export function WelcomeScreen() {
  const { navigateTo, enterAsGuest } = useApp();

  return (
    <div className="welcome-mockup">
      <div className="welcome-mockup__bg">
        <div className="welcome-mockup__art" />
        <div className="welcome-mockup__overlay" />
      </div>

      <div className="welcome-mockup__logo">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 backdrop-blur-md ring-1 ring-white/25"
        >
          <Mountain size={40} className="text-white" strokeWidth={1.5} />
        </motion.div>
        <p className="welcome-mockup__logo-text">WEEKEND WARRIORS</p>
        <p className="welcome-mockup__logo-sub">
          More than a trip — It&apos;s your growth journey
        </p>
      </div>

      <div className="welcome-mockup__content">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="welcome-mockup__title"
        >
          Chào mừng bạn đến với
          <br />
          <span className="text-soft-green">WEEKEND WARRIORS!</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.12 }}
          className="welcome-mockup__desc"
        >
          Hành trình 2 ngày 1 đêm
          <br />
          bắt đầu từ một bước nhỏ.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="welcome-mockup__actions mx-auto max-w-sm"
        >
          <button type="button" className="btn-mockup btn-mockup--primary" onClick={() => navigateTo("register")}>
            Đăng ký
          </button>
          <button type="button" className="btn-mockup btn-mockup--outline" onClick={() => navigateTo("login")}>
            Đăng nhập
          </button>
          <button type="button" className="welcome-mockup__skip" onClick={enterAsGuest}>
            Bỏ qua · xem thử không cần tài khoản
          </button>
        </motion.div>
      </div>
    </div>
  );
}
