"use client";

import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal. Coba lagi.");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Terjadi kesalahan. Periksa koneksi Anda.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f4f6fb]">

      {/* ── Left Panel ── */}
      <div className="hidden lg:flex w-[42%] bg-[#2563EB] px-12 py-16 flex-col justify-center items-start relative overflow-hidden">
        <div className="relative z-10">
          {/* Logo placeholder — ganti dengan <Image> saat logo tersedia */}
          <div className="mb-6">
            <div className="w-[72px] h-[72px] bg-white/15 border-2 border-white/35 rounded-[18px] flex items-center justify-center backdrop-blur-sm">
              <span className="text-[2rem] font-extrabold text-white leading-none">N</span>
            </div>
          </div>
          <h1 className="text-[2.6rem] font-extrabold text-white tracking-tight mb-2 leading-tight">
            Nalaruta
          </h1>
          <p className="text-white/70 text-base max-w-[260px] leading-relaxed">
            Jelajahi lebih jauh, pikirkan lebih dalam.
          </p>
        </div>

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -bottom-16 -right-16 w-80 h-80 rounded-full border-[64px] border-white/[0.07]">
          <span className="absolute -inset-16 rounded-full border-[40px] border-white/[0.05]" />
          <span className="absolute -inset-[7rem] rounded-full border-[40px] border-white/[0.04]" />
          <span className="absolute -inset-[11rem] rounded-full border-[40px] border-white/[0.03]" />
        </div>
      </div>

      {/* ── Right Panel ── */}
      <div className="flex-1 flex items-center justify-center px-5 py-10">
        <div className="w-full max-w-[420px] bg-white rounded-2xl px-8 py-10 shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-[#e2e8f0]">

          {/* Header */}
          <div className="mb-7">
            <h2 className="text-[1.75rem] font-extrabold text-[#111827] tracking-tight mb-1">
              Masuk
            </h2>
            <p className="text-sm text-[#6b7280]">Selamat datang kembali di Nalaruta</p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-lg px-3.5 py-2.5 text-sm mb-5">
              <AlertCircle size={16} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-[0.78rem] font-semibold text-[#374151] uppercase tracking-wide"
              >
                Email
              </label>
              <div className="relative flex items-center">
                <Mail size={16} className="absolute left-3.5 text-[#D9D9D9] pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-[0.68rem] border-[1.5px] border-[#e2e8f0] rounded-[9px] text-[0.95rem] text-[#111827] bg-[#fafafa] outline-none transition-all placeholder:text-[#bcc5d1] focus:border-[#2563EB] focus:bg-white focus:ring-[3px] focus:ring-[#2563EB]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-[0.78rem] font-semibold text-[#374151] uppercase tracking-wide"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <Lock size={16} className="absolute left-3.5 text-[#D9D9D9] pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full pl-10 pr-10 py-[0.68rem] border-[1.5px] border-[#e2e8f0] rounded-[9px] text-[0.95rem] text-[#111827] bg-[#fafafa] outline-none transition-all placeholder:text-[#bcc5d1] focus:border-[#2563EB] focus:bg-white focus:ring-[3px] focus:ring-[#2563EB]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password"
                  className="absolute right-3 text-[#374151] hover:text-[#2563EB] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 w-full py-[0.8rem] mt-1 bg-[#2563EB] hover:bg-[#1d4ed8] hover:-translate-y-px active:translate-y-0 text-white rounded-[9px] text-[0.97rem] font-bold transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
            >
              {loading ? (
                <span className="w-[18px] h-[18px] border-[2.5px] border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Masuk <ArrowRight size={16} /></>
              )}
            </button>
          </form>

          {/* Switch */}
          <p className="text-center text-sm text-[#6b7280] mt-5">
            Belum punya akun?{" "}
            <Link href="/register" className="text-[#2563EB] font-semibold hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}