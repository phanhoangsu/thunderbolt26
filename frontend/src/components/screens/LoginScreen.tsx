"use client";

import { PageHeader } from "@/components/layout/PageHeader";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { DEMO_USERS } from "@/lib/auth";
import { motion } from "framer-motion";
import { Loader2, LogIn, Mountain } from "lucide-react";
import { FormEvent, useState } from "react";

export function LoginScreen() {
  const { login, navigateTo } = useApp();
  const [email, setEmail] = useState("hoangsu@camp.vn");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (!result.success) setError(result.message ?? "Đăng nhập thất bại.");
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6"
      style={{
        background: "linear-gradient(165deg, #082a20, #0b3d2e 50%, #134a38)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center text-white">
          <Mountain size={48} className="mx-auto mb-4 opacity-90" />
          <h1
            className="text-2xl font-black tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            WEEKEND WARRIORS
          </h1>
          <p className="mt-2 text-sm text-soft-green/90">Đăng nhập tài khoản</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__icon">
            <LogIn size={28} className="text-forest" />
          </div>
          <p className="auth-form__hint">
            Tiếp tục hành trình trưởng thành của bạn
          </p>

          <label className="auth-label">
            Email
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label className="auth-label">
            Mật khẩu
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••"
            />
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="btn-mockup btn-mockup--primary mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="inline animate-spin" /> Đang đăng
                nhập...
              </>
            ) : (
              "Đăng nhập"
            )}
          </button>

          <p className="auth-switch">
            Chưa có tài khoản?{" "}
            <button type="button" onClick={() => navigateTo("register")}>
              Đăng ký ngay
            </button>
          </p>

          <div className="auth-demo">
            <p className="auth-demo__title">Tài khoản demo — nhấn để điền</p>
            {DEMO_USERS.map((u) => (
              <button
                key={u.id}
                type="button"
                className="auth-demo__btn"
                onClick={() => {
                  setEmail(u.email);
                  setPassword(u.password);
                }}
              >
                {u.email}
              </button>
            ))}
          </div>
        </form>

        <button
          type="button"
          onClick={() => navigateTo("welcome")}
          className="mt-6 w-full text-center text-sm text-white/60 hover:text-white"
        >
          ← Quay lại
        </button>
      </motion.div>
    </div>
  );
}
