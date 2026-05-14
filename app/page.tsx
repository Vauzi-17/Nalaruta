import Link from "next/link"
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  CheckCircle2,
  ChevronRight,
  Circle,
  Clock,
  Code2,
  Gamepad2,
  Map,
  Palette,
  Rocket,
  Route,
  Server,
  ShieldCheck,
  Smartphone,
  TrendingUp,
  UserPlus,
  Users,
} from "lucide-react"
import Footer from "@/components/layout/Footer"
import Navbar from "@/components/layout/Navbar"

const roadmaps = [
  {
    icon: Code2,
    title: "Frontend Developer",
    category: "Programming",
    level: "Pemula",
    weeks: 16,
    materials: 16,
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    icon: Server,
    title: "Backend Developer",
    category: "Programming",
    level: "Menengah",
    weeks: 18,
    materials: 20,
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    icon: Palette,
    title: "UI/UX Designer",
    category: "Design",
    level: "Pemula",
    weeks: 12,
    materials: 12,
    badge: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
  },
  {
    icon: BarChart3,
    title: "Data Analyst",
    category: "Data",
    level: "Menengah",
    weeks: 14,
    materials: 14,
    badge: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300",
  },
  {
    icon: Smartphone,
    title: "Mobile Developer",
    category: "Mobile",
    level: "Menengah",
    weeks: 15,
    materials: 18,
    badge: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
  },
  {
    icon: ShieldCheck,
    title: "Cyber Security",
    category: "Security",
    level: "Lanjutan",
    weeks: 20,
    materials: 24,
    badge: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300",
  },
  {
    icon: Gamepad2,
    title: "Game Developer",
    category: "Programming",
    level: "Menengah",
    weeks: 16,
    materials: 20,
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
]

const features = [
  {
    icon: Route,
    title: "Jalur Terstruktur",
    desc: "Belajar urut dari dasar sampai mahir, tidak loncat-loncat.",
  },
  {
    icon: BarChart3,
    title: "Progress Nyata",
    desc: "Tandai setiap materi selesai dan lihat persentase kemajuanmu.",
  },
  {
    icon: BookOpen,
    title: "Sumber Terpilih",
    desc: "Link YouTube, artikel, dan dokumentasi terbaik sudah dikurasi.",
  },
  {
    icon: Users,
    title: "Gratis Selamanya",
    desc: "Tidak ada biaya tersembunyi. Semua fitur bisa diakses gratis.",
  },
]

const howItWorks = [
  {
    icon: UserPlus,
    title: "Daftar & Isi Profil",
    desc: "Buat akun gratis dan ceritakan tujuan kariermu.",
  },
  {
    icon: Map,
    title: "Pilih Jalur Karier",
    desc: "Pilih dari 7 roadmap yang sesuai dengan minat dan tujuanmu.",
  },
  {
    icon: TrendingUp,
    title: "Belajar & Pantau",
    desc: "Ikuti materi step by step dan lihat progressmu naik nyata.",
  },
]

const stats = [
  { value: "2.000+", label: "Pelajar Aktif" },
  { value: "7", label: "Jalur Karier" },
  { value: "100%", label: "Gratis" },
]

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main className="pt-16">

        {/* ── HERO ── */}
        <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-[var(--background)]">
          {/* Subtle background gradient */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute top-0 left-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--primary)]/5 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-[400px] w-[400px] translate-x-1/3 translate-y-1/3 rounded-full bg-[var(--primary)]/5 blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-4 py-20 md:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

              {/* Left */}
              <div className="max-w-xl space-y-6">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary-light)] px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
                  <Rocket size={14} />
                  <span>Platform Roadmap Karier #1 untuk Pelajar Indonesia</span>
                </div>

                {/* Headline */}
                <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl">
                  Bingung Mau<br />
                  <span className="text-[var(--primary)]">Jadi Apa?</span>
                </h1>

                <p className="max-w-md text-lg leading-relaxed text-[var(--text-secondary)]">
                  Nalaruta kasih kamu peta perjalanan karier yang jelas. Dari pemula sampai siap kerja, langkah demi langkah.
                </p>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <Link
                    href="/register"
                    className="
                      inline-flex items-center gap-2
                      rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                      px-6 py-3 text-sm font-semibold text-white
                      shadow-sm hover:shadow-md transition-all duration-200
                    "
                  >
                    Mulai Gratis
                    <ArrowRight size={15} />
                  </Link>
                  <Link
                    href="/explore"
                    className="
                      inline-flex items-center gap-2
                      rounded-xl border border-[var(--border)]
                      bg-[var(--card)] hover:border-[var(--primary)] hover:text-[var(--primary)]
                      px-6 py-3 text-sm font-semibold text-[var(--text-primary)]
                      shadow-[var(--shadow-sm)] transition-all duration-200
                    "
                  >
                    Lihat Roadmap
                  </Link>
                </div>

                {/* Stats */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  {stats.map((stat, i) => (
                    <div key={stat.label} className="flex items-center gap-3">
                      {i > 0 && <div className="h-4 w-px bg-[var(--border)]" />}
                      <div>
                        <p className="text-base font-bold text-[var(--text-primary)]">{stat.value}</p>
                        <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Roadmap preview card */}
              <div className="hidden lg:flex justify-center">
                <div className="w-full max-w-[320px] rounded-2xl border border-[var(--card-border)] bg-[var(--card)] p-6 shadow-[var(--shadow-lg)]">
                  {/* Card header */}
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-semibold text-[var(--text-primary)]">Frontend Developer</span>
                    <span className="text-sm font-bold text-[var(--primary)]">45%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[var(--muted)] overflow-hidden mb-5">
                    <div className="h-1.5 w-[45%] rounded-full bg-[var(--primary)]" />
                  </div>

                  {/* Steps */}
                  {[
                    { label: "HTML", status: "done" },
                    { label: "CSS", status: "done" },
                    { label: "JavaScript", status: "current" },
                    { label: "React", status: "upcoming" },
                    { label: "Job Ready", status: "upcoming" },
                  ].map((step, i, arr) => (
                    <div key={step.label}>
                      <div className="flex items-center gap-3 py-1.5">
                        {step.status === "done" && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--success)]">
                            <Check size={14} className="text-white" />
                          </div>
                        )}
                        {step.status === "current" && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary)]">
                            <BookOpen size={13} className="text-white" />
                          </div>
                        )}
                        {step.status === "upcoming" && (
                          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--muted)]">
                            <Circle size={13} className="text-[var(--text-muted)]" />
                          </div>
                        )}
                        <span className={[
                          "text-sm font-medium flex-1",
                          step.status === "done" ? "text-[var(--text-primary)]" : "",
                          step.status === "current" ? "text-[var(--primary)] font-semibold" : "",
                          step.status === "upcoming" ? "text-[var(--text-muted)]" : "",
                        ].join(" ")}>
                          {step.label}
                        </span>
                        {step.status === "done" && (
                          <CheckCircle2 size={14} className="text-[var(--success)]" />
                        )}
                        {step.status === "current" && (
                          <span className="rounded-full bg-[var(--primary-light)] px-2 py-0.5 text-xs font-medium text-[var(--primary)]">
                            Aktif
                          </span>
                        )}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="ml-3.5 h-3 w-0.5 bg-[var(--border)]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── KENAPA NALARUTA ── */}
        <section className="bg-[var(--muted)] py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--primary)]/30 bg-[var(--primary-light)] px-4 py-1.5 text-sm font-medium text-[var(--primary)]">
                <Rocket size={14} />
                Kenapa Nalaruta?
              </div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Belajar Lebih Terarah
              </h2>
              <p className="mt-3 text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Semua materi dirancang agar kamu belajar lebih jelas dan tidak bingung mulai dari mana.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
              {features.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="
                      group rounded-xl border border-[var(--card-border)]
                      bg-[var(--card)] p-6
                      hover:border-[var(--primary)]/40 hover:shadow-[var(--shadow-md)]
                      transition-all duration-200
                    "
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)] group-hover:bg-[var(--primary)] transition-colors duration-200">
                      <Icon size={18} className="text-[var(--primary)] group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="mb-2 font-semibold text-[var(--text-primary)]">{item.title}</h3>
                    <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── ROADMAP LIST ── */}
        <section className="bg-[var(--background)] py-20">
          <div className="mx-auto max-w-7xl px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
                Roadmap Tersedia
              </h2>
              <p className="mt-3 text-[var(--text-secondary)] max-w-md mx-auto leading-relaxed">
                Pilih jalur karier sesuai minatmu dan mulai belajar secara terstruktur.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {roadmaps.map((roadmap) => {
                const Icon = roadmap.icon
                const levelStyle =
                  roadmap.level === "Pemula"
                    ? "bg-[var(--success-light)] text-[var(--success)]"
                    : roadmap.level === "Menengah"
                    ? "bg-[var(--warning-light)] text-[var(--warning)]"
                    : "bg-[var(--danger-light)] text-[var(--danger)]"

                return (
                  <div
                    key={roadmap.title}
                    className="
                      group flex flex-col rounded-xl border border-[var(--card-border)]
                      bg-[var(--card)] p-6
                      hover:border-[var(--primary)]/50 hover:shadow-[var(--shadow-md)]
                      transition-all duration-200
                    "
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                        <Icon size={22} className="text-[var(--primary)]" />
                      </div>
                      <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roadmap.badge}`}>
                        {roadmap.category}
                      </span>
                    </div>

                    <h3 className="mt-4 text-base font-bold text-[var(--text-primary)]">
                      {roadmap.title}
                    </h3>

                    <div className="mt-2 flex items-center gap-1">
                      <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${levelStyle}`}>
                        {roadmap.level}
                      </span>
                    </div>

                    <div className="mt-3 flex gap-4 text-xs text-[var(--text-muted)]">
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} />
                        {roadmap.materials} materi
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        ~{roadmap.weeks} minggu
                      </div>
                    </div>

                    <div className="mt-auto pt-5">
                      <Link
                        href="/explore"
                        className="
                          inline-flex items-center gap-1 text-sm font-semibold
                          text-[var(--primary)] hover:gap-2 transition-all duration-150
                        "
                      >
                        Lihat Roadmap
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* View all */}
            <div className="mt-10 text-center">
              <Link
                href="/explore"
                className="
                  inline-flex items-center gap-2
                  rounded-xl border border-[var(--border)]
                  bg-[var(--card)] hover:border-[var(--primary)] hover:text-[var(--primary)]
                  px-6 py-2.5 text-sm font-medium text-[var(--text-secondary)]
                  shadow-[var(--shadow-sm)] transition-all duration-200
                "
              >
                Lihat Semua Roadmap
                <ChevronRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* ── CARA KERJA ── */}
        <section className="bg-[var(--muted)] py-20">
          <div className="mx-auto max-w-4xl px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] tracking-tight">
              Cara Kerjanya Simpel
            </h2>
            <p className="mt-3 text-[var(--text-secondary)] leading-relaxed">
              Tiga langkah mudah untuk memulai perjalanan kariermu.
            </p>

            <div className="mt-12 flex flex-col items-stretch gap-4 md:flex-row md:items-start">
              {howItWorks.map((item, index) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex items-start md:flex-col md:items-center md:flex-1 gap-4 md:gap-0">
                    <div className="relative flex shrink-0 md:shrink flex-col items-center">
                      {/* Step number */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)] text-lg font-bold text-white shadow-md">
                        {index + 1}
                      </div>
                      {/* Icon below number on mobile, above text on desktop */}
                      <div className="mt-3 hidden md:flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary-light)]">
                        <Icon size={18} className="text-[var(--primary)]" />
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1 md:mt-4 md:text-center">
                      <div className="md:hidden mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-light)]">
                        <Icon size={16} className="text-[var(--primary)]" />
                      </div>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                    </div>

                    {/* Connector — desktop only */}
                    {index < howItWorks.length - 1 && (
                      <ChevronRight
                        size={20}
                        className="hidden shrink-0 self-start mt-4 text-[var(--text-muted)] md:block"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="relative overflow-hidden bg-[var(--primary)] py-20">
          {/* Background pattern */}
          <div className="pointer-events-none absolute inset-0">
            <svg className="absolute inset-0 h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                  <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-grid)" />
            </svg>
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-white/5" />
            <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/5" />
          </div>

          <div className="relative mx-auto max-w-3xl px-4 text-center md:px-6">
            <h2 className="text-3xl font-bold text-white tracking-tight md:text-4xl">
              Siap Mulai Perjalananmu?
            </h2>
            <p className="mt-4 text-lg text-white/75 leading-relaxed">
              Gratis selamanya. Daftar sekarang dan mulai belajar hari ini.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/register"
                className="
                  inline-flex items-center gap-2
                  rounded-xl bg-white hover:bg-[var(--muted)]
                  px-8 py-3 text-sm font-semibold text-[var(--primary)]
                  shadow-md transition-all duration-200
                "
              >
                Daftar Sekarang — Gratis
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/explore"
                className="
                  inline-flex items-center gap-2
                  rounded-xl border border-white/30 hover:border-white/60
                  px-8 py-3 text-sm font-semibold text-white
                  transition-all duration-200
                "
              >
                Lihat Roadmap
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}