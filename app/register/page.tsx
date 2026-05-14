"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  AlertCircle,
  BookOpen,
  CheckCircle2,
  Circle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  ArrowRight,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { signIn, useSession } from "@/lib/auth-client"

type Errors = {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  agreeTerms?: string
  general?: string
}

const roadmapSteps = [
  { label: "HTML", status: "done" },
  { label: "CSS", status: "done" },
  { label: "JavaScript", status: "current" },
  { label: "React", status: "upcoming" },
  { label: "Job Ready", status: "upcoming" },
]

export default function RegisterPage() {
  const router = useRouter()
  const { data: session } = useSession()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Errors>({})

  useEffect(() => {
    if (session) router.push("/dashboard")
  }, [session, router])

  const passwordStrength = useMemo(() => {
    if (!password) return { level: 0, label: "" }
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)
    if (password.length <= 5) return { level: 1, label: "Lemah" }
    if (password.length <= 7) return { level: 2, label: "Sedang" }
    if (password.length >= 8 && hasLetter && hasNumber && !hasSymbol) return { level: 3, label: "Kuat" }
    if (password.length >= 8 && hasLetter && hasNumber && hasSymbol) return { level: 4, label: "Sangat Kuat" }
    return { level: 1, label: "Lemah" }
  }, [password])

  function validateForm() {
    const newErrors: Errors = {}
    if (name.trim().length < 2) newErrors.name = "Nama minimal 2 karakter"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Format email tidak valid"
    if (password.length < 8) newErrors.password = "Password minimal 8 karakter"
    if (password !== confirmPassword) newErrors.confirmPassword = "Konfirmasi password tidak cocok"
    if (!agreeTerms) newErrors.agreeTerms = "Kamu harus menyetujui syarat & ketentuan"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!validateForm()) return
    setIsLoading(true)
    setErrors({})
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrors({ general: data.message || "Gagal membuat akun" })
        return
      }
      await signIn.email({ email, password, callbackURL: "/onboarding" })
    } catch {
      setErrors({ general: "Terjadi kesalahan saat register" })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogleRegister() {
    try {
      await signIn.social({ provider: "google", callbackURL: "/onboarding" })
    } catch {
      setErrors({ general: "Gagal login dengan Google" })
    }
  }

  const strengthColors = ["", "bg-[var(--danger)]", "bg-[var(--warning)]", "bg-[var(--primary)]", "bg-[var(--success)]"]
  const strengthColor = strengthColors[passwordStrength.level] || "bg-[var(--border)]"

  return (
    <main className="min-h-screen lg:grid lg:grid-cols-[1fr_1.1fr]">
      {/* ── LEFT PANEL ── */}
      <section className="hidden lg:flex flex-col bg-[#1D4ED8] relative overflow-hidden">
        {/* Layered background shapes */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bottom-right large blob */}
          <div className="absolute -bottom-24 -right-24 w-[420px] h-[420px] rounded-full bg-[#2563EB]" />
          {/* Top-left small accent */}
          <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-white/5" />
          {/* Diagonal grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative z-10 flex flex-col h-full p-10">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 w-fit group">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-white shadow-md">
              <Image
                src="/nalaruta.png"
                alt="Nalaruta"
                width={22}
                height={22}
                className="object-contain"
              />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">Nalaruta</span>
          </Link>

          {/* Center content */}
          <div className="flex-1 flex flex-col justify-center gap-8 mt-10">

            {/* Heading block */}
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-blue-200/70 mb-3">
                Contoh Roadmap
              </span>
              <h2 className="text-4xl font-extrabold text-white leading-[1.15] tracking-tight">
                Frontend<br />Developer
              </h2>
              <p className="mt-3 text-sm text-white/60 leading-relaxed max-w-[260px]">
                Ikuti jalur belajar terstruktur dan capai karier impianmu langkah demi langkah.
              </p>
            </div>

            {/* Progress */}
            <div className="max-w-[300px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white/70 uppercase tracking-wider">Progress</span>
                <span className="text-xs font-bold text-white bg-white/15 px-2 py-0.5 rounded-full">45%</span>
              </div>
              <div className="h-2 rounded-full bg-white/15 overflow-hidden">
                <div className="h-2 w-[45%] rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]" />
              </div>
            </div>

            {/* Roadmap steps — vertical timeline style */}
            <div className="flex flex-col max-w-[300px]">
              {roadmapSteps.map((step, i) => {
                const isLast = i === roadmapSteps.length - 1
                return (
                  <div key={step.label} className="flex gap-4">
                    {/* Timeline spine */}
                    <div className="flex flex-col items-center">
                      {/* Node */}
                      {step.status === "done" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-md z-10">
                          <CheckCircle2 size={15} className="text-[#2563EB]" />
                        </div>
                      )}
                      {step.status === "current" && (
                        <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white shadow-md z-10">
                          <BookOpen size={14} className="text-[#2563EB]" />
                          {/* Pulse ring */}
                          <span className="absolute inset-0 rounded-full animate-ping bg-white/40" />
                        </div>
                      )}
                      {step.status === "upcoming" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/8 z-10">
                          <Circle size={12} className="text-white/25" />
                        </div>
                      )}
                      {/* Connector line */}
                      {!isLast && (
                        <div className={`w-0.5 flex-1 my-1 ${
                          step.status === "done" ? "bg-white/40" : "bg-white/15"
                        }`} />
                      )}
                    </div>

                    {/* Content */}
                    <div className={`flex items-center gap-2 pb-${isLast ? "0" : "1"} min-h-[32px] mb-${isLast ? "0" : "3"}`}>
                      <span className={[
                        "text-sm font-semibold",
                        step.status === "done" ? "text-white" : "",
                        step.status === "current" ? "text-white" : "",
                        step.status === "upcoming" ? "text-white/35" : "",
                      ].join(" ")}>
                        {step.label}
                      </span>
                      {step.status === "done" && (
                        <span className="text-xs text-white/50">· Selesai</span>
                      )}
                      {step.status === "current" && (
                        <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold text-white">
                          Sedang belajar
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Testimonial card */}
            <div className="max-w-[300px] rounded-2xl border border-white/10 bg-white/8 p-4 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                  A
                </div>
                <div>
                  <p className="text-sm text-white/90 leading-relaxed italic">
                    "Nalaruta bantu saya tahu harus mulai dari mana. Dalam 4 bulan sudah dapat kerja!"
                  </p>
                  <p className="mt-1.5 text-xs text-white/50 font-medium">Andi · Junior Dev @ Startup</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-white/25 text-xs mt-8">
            © {new Date().getFullYear()} Nalaruta. All rights reserved.
          </p>
        </div>
      </section>

      {/* ── RIGHT PANEL ── */}
      <section className="relative flex flex-col items-center justify-center bg-[var(--background)] p-6 md:p-12 min-h-screen lg:min-h-0">
        {/* Top-right controls */}
        <div className="absolute top-5 right-5 flex items-center gap-3">
          <ThemeToggle />
        </div>

        {/* Mobile logo */}
        <Link href="/" className="flex lg:hidden items-center gap-2 mb-8">
          <Image src="/nalaruta.png" alt="Nalaruta" width={28} height={28} className="object-contain" />
          <span className="text-lg font-bold text-[var(--text-primary)]">Nalaruta</span>
        </Link>

        <div className="mx-auto w-full max-w-[400px]">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">
              Buat Akun Gratis
            </h1>
            <p className="mt-1.5 text-sm text-[var(--text-secondary)]">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="font-semibold text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
              >
                Masuk di sini
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <Field label="Nama Lengkap" error={errors.name}>
              <InputWrapper icon={<User size={15} />}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkapmu"
                  className={inputClass(!!errors.name)}
                  autoComplete="name"
                />
              </InputWrapper>
            </Field>

            {/* Email */}
            <Field label="Email" error={errors.email}>
              <InputWrapper icon={<Mail size={15} />}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className={inputClass(!!errors.email)}
                  autoComplete="email"
                />
              </InputWrapper>
            </Field>

            {/* Password */}
            <Field label="Password" error={errors.password}>
              <InputWrapper
                icon={<Lock size={15} />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              >
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimal 8 karakter"
                  className={inputClass(!!errors.password)}
                  autoComplete="new-password"
                />
              </InputWrapper>

              {/* Strength meter */}
              {password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((bar) => (
                      <div
                        key={bar}
                        className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                          passwordStrength.level >= bar ? strengthColor : "bg-[var(--border)]"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)] font-medium min-w-[72px] text-right">
                    {passwordStrength.label}
                  </span>
                </div>
              )}
            </Field>

            {/* Confirm Password */}
            <Field label="Konfirmasi Password" error={errors.confirmPassword}>
              <InputWrapper
                icon={<Lock size={15} />}
                suffix={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="p-1 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              >
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Ulangi password"
                  className={inputClass(!!errors.confirmPassword)}
                  autoComplete="new-password"
                />
              </InputWrapper>
            </Field>

            {/* Terms */}
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <div className="relative mt-0.5">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-4 h-4 rounded border border-[var(--border)] bg-[var(--input-bg)] peer-checked:bg-[var(--primary)] peer-checked:border-[var(--primary)] transition-all flex items-center justify-center">
                    {agreeTerms && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </div>
                <span className="text-sm text-[var(--text-secondary)] leading-snug select-none">
                  Saya setuju dengan{" "}
                  <Link href="/terms" className="text-[var(--primary)] hover:underline font-medium">
                    Syarat & Ketentuan
                  </Link>{" "}
                  yang berlaku
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="mt-1.5 text-xs text-[var(--danger)] flex items-center gap-1">
                  <AlertCircle size={12} />
                  {errors.agreeTerms}
                </p>
              )}
            </div>

            {/* General error */}
            {errors.general && (
              <div className="flex items-start gap-2.5 rounded-xl border border-[var(--danger)] bg-[var(--danger-light)] p-3.5">
                <AlertCircle size={16} className="text-[var(--danger)] shrink-0 mt-0.5" />
                <p className="text-sm text-[var(--danger)] leading-snug">{errors.general}</p>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full flex items-center justify-center gap-2
                rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                py-3 text-sm font-semibold text-white
                transition-all duration-200
                disabled:opacity-60 disabled:cursor-not-allowed
                shadow-sm hover:shadow-md
                mt-2
              "
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                <>
                  <span>Daftar Sekarang</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center gap-3">
            <div className="h-px flex-1 bg-[var(--border)]" />
            <span className="text-xs text-[var(--text-muted)] font-medium px-1">atau daftar dengan</span>
            <div className="h-px flex-1 bg-[var(--border)]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="
              w-full flex items-center justify-center gap-2.5
              rounded-xl border border-[var(--border)]
              bg-[var(--card)] hover:bg-[var(--muted)]
              py-3 text-sm font-medium text-[var(--text-primary)]
              transition-all duration-200
              shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow)]
            "
          >
            <FcGoogle size={18} />
            <span>Lanjutkan dengan Google</span>
          </button>
        </div>
      </section>
    </main>
  )
}

// ── Reusable sub-components ──────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-[var(--text-primary)]">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-[var(--danger)] flex items-center gap-1">
          <AlertCircle size={12} className="shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}

function InputWrapper({
  icon,
  suffix,
  children,
}: {
  icon: React.ReactNode
  suffix?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 text-[var(--text-muted)] pointer-events-none">{icon}</span>
      {children}
      {suffix && <span className="absolute right-2">{suffix}</span>}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-[var(--input-bg)]",
    "py-2.5 pl-9 pr-10 text-sm text-[var(--text-primary)]",
    "placeholder:text-[var(--text-muted)]",
    "focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/25 focus:border-[var(--primary)]",
    "transition-all duration-200",
    hasError
      ? "border-[var(--danger)] focus:ring-[var(--danger)]/20"
      : "border-[var(--border)] hover:border-[var(--text-muted)]",
  ].join(" ")
}