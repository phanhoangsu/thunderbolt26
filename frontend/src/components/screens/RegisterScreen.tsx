"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2, Mountain, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";

function mapAuthError(message: string | undefined, t: (k: string) => string): string {
  if (!message) return t("auth.registerFailed");
  if (message.includes("6 ký tự") || message.includes("6 characters")) return t("auth.passwordMinError");
  if (message.includes("Email đã") || message.includes("already")) return t("auth.emailTaken");
  if (message.includes("server") || message.includes("Kết nối")) return t("auth.serverError");
  return message;
}

export function RegisterScreen() {
  const { register, navigateTo } = useApp();
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError(t("auth.passwordMinError"));
      return;
    }

    if (password !== confirm) {
      setError(t("auth.passwordMismatch"));
      return;
    }

    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (!result.success) setError(mapAuthError(result.message, t));
  };

  return (
    <div
      className="relative flex min-h-screen items-center justify-center p-6"
      style={{
        background: "linear-gradient(165deg, #082a20, #0b3d2e 50%, #134a38)",
      }}
    >
      <div className="absolute right-4 top-4 z-10">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center text-white">
          <Mountain size={48} className="mx-auto mb-4 opacity-90" />
          <h1
            className="text-2xl font-black"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {t("auth.registerTitle")}
          </h1>
          <p className="mt-2 text-sm text-soft-green/90">{t("auth.registerSubtitle")}</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__icon">
            <UserPlus size={28} className="text-forest" />
          </div>

          <label className="auth-label">
            {t("auth.name")}
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder={t("auth.namePlaceholder")}
            />
          </label>

          <label className="auth-label">
            {t("auth.email")}
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
            />
          </label>

          <label className="auth-label">
            {t("auth.password")}
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-forest transition-colors"
                aria-label={showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && password.length < 6 && (
              <p className="text-xs text-red-500 mt-1">{t("auth.passwordMin")}</p>
            )}
          </label>

          <label className="auth-label">
            {t("auth.confirmPassword")}
            <div className="relative">
              <Input
                type={showConfirm ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-forest transition-colors"
                aria-label={showConfirm ? t("auth.hidePassword") : t("auth.showPassword")}
              >
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {confirm && password !== confirm && (
              <p className="text-xs text-red-500 mt-1">{t("auth.passwordMismatchHint")}</p>
            )}
          </label>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="btn-mockup btn-mockup--primary mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="inline animate-spin" /> {t("auth.registering")}
              </>
            ) : (
              t("auth.register")
            )}
          </button>

          <p className="auth-switch">
            {t("auth.haveAccount")}{" "}
            <button type="button" onClick={() => navigateTo("login")}>
              {t("auth.login")}
            </button>
          </p>
        </form>

        <button
          type="button"
          onClick={() => navigateTo("welcome")}
          className="mt-6 w-full text-center text-sm text-white/60 hover:text-white"
        >
          ← {t("common.back")}
        </button>
      </motion.div>
    </div>
  );
}
