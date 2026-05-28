"use client";

import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { motion } from "framer-motion";
import { Loader2, Mountain, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";

export function RegisterScreen() {
  const { register, navigateTo } = useApp();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }
    setLoading(true);
    const result = await register(name, email, password);
    setLoading(false);
    if (!result.success) setError(result.message ?? "Đăng ký thất bại.");
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6" style={{ background: "linear-gradient(165deg, #082a20, #0b3d2e 50%, #134a38)" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="mb-8 text-center text-white">
          <Mountain size={48} className="mx-auto mb-4 opacity-90" />
          <h1 className="text-2xl font-black" style={{ fontFamily: "var(--font-heading)" }}>Tạo tài khoản</h1>
          <p className="mt-2 text-sm text-soft-green/90">Bắt đầu hành trình của bạn</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="auth-form__icon">
            <UserPlus size={28} className="text-forest" />
          </div>

          <label className="auth-label">Họ tên <Input value={name} onChange={(e) => setName(e.target.value)} required placeholder="Nguyễn Văn A" /></label>
          <label className="auth-label">Email <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
          <label className="auth-label">Mật khẩu <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} /></label>
          <label className="auth-label">Xác nhận <Input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required /></label>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="btn-mockup btn-mockup--primary mt-2" disabled={loading}>
            {loading ? <><Loader2 size={18} className="inline animate-spin" /> Đang tạo...</> : "Đăng ký"}
          </button>

          <p className="auth-switch">
            Đã có tài khoản? <button type="button" onClick={() => navigateTo("login")}>Đăng nhập</button>
          </p>
        </form>

        <button type="button" onClick={() => navigateTo("welcome")} className="mt-6 w-full text-center text-sm text-white/60 hover:text-white">
          ← Quay lại
        </button>
      </motion.div>
    </div>
  );
}
