"use client"

import { useEffect, useState } from "react"

import { useRouter } from "next/navigation"

import Image from "next/image"

import {
  BarChart3,
  BookOpen,
  CheckCircle2,
  Code2,
  GraduationCap,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react"

import { RiAwardLine } from "react-icons/ri"

import ThemeToggle from "@/components/ui/ThemeToggle"

import { useSession } from "@/lib/auth-client"
import Link from "next/link"

type BackgroundType =
  | "smk"
  | "mahasiswa"
  | "fresh-graduate"
  | "umum"

type InterestType =
  | "programming"
  | "design"
  | "data"
  | "security"
  | "mobile"

type CareerType =
  | "frontend-developer"
  | "backend-developer"
  | "uiux-designer"
  | "data-analyst"
  | "mobile-developer"
  | "cyber-security"

export default function OnboardingPage() {
  const router = useRouter()

  const {
    data: session,
    isPending,
  } = useSession()

  const [step, setStep] = useState(1)

  const [background, setBackground] =
    useState<BackgroundType | null>(
      null
    )

  const [interests, setInterests] =
    useState<InterestType[]>([])

  const [targetCareer, setTargetCareer] =
    useState<CareerType | null>(null)

  const [isLoading, setIsLoading] =
    useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login")
    }
  }, [isPending, session, router])

  useEffect(() => {
    async function checkUser() {
      try {
        const response = await fetch(
          "/api/user/me"
        )

        if (!response.ok) {
          return
        }

        const user = await response.json()

        if (
          user.hasCompletedOnboarding
        ) {
          router.push("/dashboard")
        }
      } catch {}
    }

    if (session) {
      checkUser()
    }
  }, [session, router])

  function toggleInterest(
    value: InterestType
  ) {
    setInterests((prev) => {
      if (prev.includes(value)) {
        return prev.filter(
          (item) => item !== value
        )
      }

      return [...prev, value]
    })
  }

  async function handleFinish() {
    if (
      !background ||
      interests.length === 0 ||
      !targetCareer
    ) {
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(
        "/api/user/profile",
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            background,

            interests,

            targetCareer,

            hasCompletedOnboarding:
              true,
          }),
        }
      )

      if (response.ok) {
        router.push("/dashboard")
      }
    } catch {
    } finally {
      setIsLoading(false)
    }
  }

  const stepLabels = [
    "Tentang Kamu",
    "Minat",
    "Tujuan",
  ]

  const backgroundOptions = [
    {
      id: "smk",
      title: "Pelajar SMK",
      description:
        "Siapkan diri lebih awal",
      icon: GraduationCap,
    },

    {
      id: "mahasiswa",
      title: "Mahasiswa",
      description:
        "Tambah skill praktis",
      icon: BookOpen,
    },

    {
      id: "fresh-graduate",
      title: "Fresh Graduate",
      description:
        "Siap masuk industri",
      icon: RiAwardLine,
    },

    {
      id: "umum",
      title: "Umum/Otodidak",
      description:
        "Belajar mandiri",
      icon: User,
    },
  ]

  const interestOptions = [
    {
      id: "programming",
      title: "Programming",
      description:
        "Web, mobile, software",
      icon: Code2,
    },

    {
      id: "design",
      title: "Design",
      description:
        "UI/UX, graphic design",
      icon: Palette,
    },

    {
      id: "data",
      title: "Data & Analitik",
      description:
        "Data science, ML",
      icon: BarChart3,
    },

    {
      id: "security",
      title: "Keamanan Siber",
      description:
        "Ethical hacking",
      icon: ShieldCheck,
    },

    {
      id: "mobile",
      title: "Mobile Dev",
      description: "Android, iOS",
      icon: Smartphone,
    },
  ]

  const careerOptions = [
    {
      id: "frontend-developer",
      title:
        "Frontend Developer",
      icon: Code2,
    },

    {
      id: "backend-developer",
      title:
        "Backend Developer",
      icon: Server,
    },

    {
      id: "uiux-designer",
      title: "UI/UX Designer",
      icon: Palette,
    },

    {
      id: "data-analyst",
      title: "Data Analyst",
      icon: BarChart3,
    },

    {
      id: "mobile-developer",
      title:
        "Mobile Developer",
      icon: Smartphone,
    },

    {
      id: "cyber-security",
      title: "Cyber Security",
      icon: ShieldCheck,
    },
  ]

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* NAVBAR */}
      <nav
        className="
          sticky top-0 z-10
          flex h-14 items-center
          justify-between
          border-b border-[var(--card-border)]
          bg-[var(--background)]
          px-4
        "
      >
        <Link
  href="/"
  className="flex items-center gap-3"
>
  <Image
    src="/nalaruta.png"
    alt="Nalaruta"
    width={40}
    height={40}
    className="h-10 w-10 object-contain"
  />

  <span
    className="
      text-xl font-bold
      text-[var(--text-primary)]
    "
  >
    Nalaruta
  </span>
</Link>

        <ThemeToggle />
      </nav>

      <div className="mx-auto max-w-xl px-4 py-10">
        {/* STEPPER */}
        <div
          className="
            mb-10 flex items-start
            justify-center gap-2
          "
        >
          {[1, 2, 3].map((item, index) => {
            const isCompleted =
              step > item

            const isActive =
              step === item

            return (
              <div
                key={item}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={`
                      flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold

                      ${
                        isCompleted
                          ? "bg-[var(--success)] text-white"
                          : ""
                      }

                      ${
                        isActive
                          ? "bg-[#2563EB] text-white"
                          : ""
                      }

                      ${
                        !isCompleted &&
                        !isActive
                          ? "border border-[var(--border)] bg-[var(--muted)] text-[var(--text-muted)]"
                          : ""
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      item
                    )}
                  </div>

                  <span
                    className={`
                      mt-1 text-xs

                      ${
                        isActive
                          ? "font-medium text-[#2563EB]"
                          : "text-[var(--text-muted)]"
                      }
                    `}
                  >
                    {
                      stepLabels[
                        item - 1
                      ]
                    }
                  </span>
                </div>

                {index < 2 && (
                  <div
                    className="
                      mb-4 h-0.5 w-12
                      bg-[var(--border)]
                    "
                  />
                )}
              </div>
            )
          })}
        </div>

        {/* STEP 1 */}
        {step === 1 && (
          <section>
            <h2
              className="
                text-2xl font-bold
                text-[var(--text-primary)]
              "
            >
              Ceritakan tentang dirimu 
            </h2>

            <p
              className="
                mt-2
                text-[var(--text-secondary)]
              "
            >
              Bantu kami memahami latar
              belakangmu.
            </p>

            <div
              className="
                mt-8 grid grid-cols-2
                gap-4
              "
            >
              {backgroundOptions.map(
                (item) => {
                  const Icon =
                    item.icon

                  const selected =
                    background ===
                    item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setBackground(
                          item.id as BackgroundType
                        )
                      }
                      className={`
                        rounded-xl p-5 text-left transition-colors

                        ${
                          selected
                            ? "border-2 border-[#2563EB] bg-[var(--primary-light)]"
                            : "border border-[var(--card-border)] bg-[var(--card)] hover:border-[#2563EB]"
                        }
                      `}
                    >
                      <Icon
                        size={28}
                        className={
                          selected
                            ? "text-[#2563EB]"
                            : "text-[var(--text-muted)]"
                        }
                      />

                      <p
                        className="
                          mt-2 font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          mt-1 text-sm
                          text-[var(--text-secondary)]
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    </button>
                  )
                }
              )}
            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <section>
            <h2
              className="
                text-2xl font-bold
                text-[var(--text-primary)]
              "
            >
              Kamu tertarik di bidang
              apa?
            </h2>

            <p
              className="
                mt-2
                text-[var(--text-secondary)]
              "
            >
              Pilih minimal satu, boleh
              lebih.
            </p>

            <div
              className="
                mt-8 grid grid-cols-2
                gap-4 md:grid-cols-3
              "
            >
              {interestOptions.map(
                (item) => {
                  const Icon =
                    item.icon

                  const selected =
                    interests.includes(
                      item.id as InterestType
                    )

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        toggleInterest(
                          item.id as InterestType
                        )
                      }
                      className={`
                        relative rounded-xl p-5 text-left transition-colors

                        ${
                          selected
                            ? "border-2 border-[#2563EB] bg-[var(--primary-light)]"
                            : "border border-[var(--card-border)] bg-[var(--card)] hover:border-[#2563EB]"
                        }
                      `}
                    >
                      {selected && (
                        <CheckCircle2
                          size={16}
                          className="
                            absolute top-3 right-3
                            text-[#2563EB]
                          "
                        />
                      )}

                      <Icon
                        size={28}
                        className={
                          selected
                            ? "text-[#2563EB]"
                            : "text-[var(--text-muted)]"
                        }
                      />

                      <p
                        className="
                          mt-2 font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {item.title}
                      </p>

                      <p
                        className="
                          mt-1 text-sm
                          text-[var(--text-secondary)]
                        "
                      >
                        {
                          item.description
                        }
                      </p>
                    </button>
                  )
                }
              )}
            </div>
          </section>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <section>
            <h2
              className="
                text-2xl font-bold
                text-[var(--text-primary)]
              "
            >
              Mau jadi apa? 🎯
            </h2>

            <p
              className="
                mt-2
                text-[var(--text-secondary)]
              "
            >
              Pilih satu jalur utama yang
              ingin dipelajari.
            </p>

            <div
              className="
                mt-8 grid grid-cols-2
                gap-4 md:grid-cols-3
              "
            >
              {careerOptions.map(
                (item) => {
                  const Icon =
                    item.icon

                  const selected =
                    targetCareer ===
                    item.id

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        setTargetCareer(
                          item.id as CareerType
                        )
                      }
                      className={`
                        rounded-xl p-5 text-left transition-colors

                        ${
                          selected
                            ? "border-2 border-[#2563EB] bg-[var(--primary-light)]"
                            : "border border-[var(--card-border)] bg-[var(--card)] hover:border-[#2563EB]"
                        }
                      `}
                    >
                      <Icon
                        size={28}
                        className={
                          selected
                            ? "text-[#2563EB]"
                            : "text-[var(--text-muted)]"
                        }
                      />

                      <p
                        className="
                          mt-2 font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {item.title}
                      </p>
                    </button>
                  )
                }
              )}
            </div>
          </section>
        )}

        {/* NAVIGATION */}
        <div
          className="
            mt-10 flex items-center
            justify-between
          "
        >
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() =>
                  setStep(step - 1)
                }
                className="
                  rounded-lg border
                  border-[var(--border)]
                  px-6 py-2.5
                  text-sm font-medium
                  text-[var(--text-primary)]
                "
              >
                ← Kembali
              </button>
            )}
          </div>

          {step < 3 ? (
            <button
              type="button"
              disabled={
                (step === 1 &&
                  !background) ||
                (step === 2 &&
                  interests.length === 0)
              }
              onClick={() =>
                setStep(step + 1)
              }
              className="
                rounded-lg bg-[#2563EB]
                px-8 py-2.5
                text-sm font-semibold text-white

                disabled:opacity-50
              "
            >
              Lanjut →
            </button>
          ) : (
            <button
              type="button"
              disabled={
                !targetCareer ||
                isLoading
              }
              onClick={handleFinish}
              className="
                rounded-lg bg-[#2563EB]
                px-8 py-2.5
                text-sm font-semibold text-white

                disabled:opacity-50
              "
            >
              {isLoading
                ? "Menyimpan..."
                : "Mulai Belajar! "}
            </button>
          )}
        </div>
      </div>
    </main>
  )
}