"use client"

import {
  Bell,
  Lock,
  Mail,
  Moon,
  User,
} from "lucide-react"

import { useRouter } from "next/navigation"

import {
  useEffect,
  useState,
} from "react"

import DashboardLayout from "@/components/layout/DashboardLayout"

import {
  useSession,
} from "@/lib/auth-client"

export default function ProfilePage() {
  const router = useRouter()

  const { data: session } =
    useSession()

  const [user, setUser] =
    useState<any>(null)

  const [activeTab, setActiveTab] =
    useState("Profil")

  const [darkMode, setDarkMode] =
    useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/login")
    }
  }, [session, router])

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch(
        "/api/user/me"
      )

      if (res.ok) {
        const data =
          await res.json()

        setUser(data)
      }
    }

    fetchUser()
  }, [])

  if (!user) return null

  const initials = user.name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  const level =
    user.streak <= 10
      ? {
          label: "Pemula",
          className:
            "bg-[var(--muted)] text-[var(--text-muted)]",
        }
      : user.streak <= 30
        ? {
            label: "Explorer",
            className:
              "bg-[var(--warning-light)] text-[var(--warning)]",
          }
        : {
            label: "Pro",
            className:
              "bg-[var(--primary-light)] text-[#2563EB]",
          }

  return (
    <DashboardLayout>
      <div
        className="
          mx-auto grid max-w-4xl
          grid-cols-1 gap-6
          lg:grid-cols-[288px_1fr]
        "
      >
        {/* LEFT */}
        <div
          className="
            rounded-xl border
            bg-[var(--card)]
            p-6 text-center
          "
        >
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="
                mx-auto h-20 w-20
                rounded-full object-cover
              "
            />
          ) : (
            <div
              className="
                mx-auto flex h-20 w-20
                items-center justify-center
                rounded-full bg-[#2563EB]
              "
            >
              <span
                className="
                  text-2xl font-bold
                  text-white
                "
              >
                {initials}
              </span>
            </div>
          )}

          <h2
            className="
              mt-4 text-xl font-bold
            "
          >
            {user.name}
          </h2>

          <p
            className="
              text-sm
              text-[var(--text-muted)]
            "
          >
            {user.email}
          </p>

          <span
            className={`
              mt-3 inline-block rounded-full px-3 py-1 text-sm
              ${level.className}
            `}
          >
            {level.label}
          </span>

          <div
            className="
              mt-5 grid grid-cols-3
              gap-2 border-t pt-4
              text-center
            "
          >
            <div>
              <p
                className="
                  text-lg font-bold
                "
              >
                {user.streak}
              </p>

              <p
                className="
                  text-xs
                  text-[var(--text-muted)]
                "
              >
                Hari
              </p>
            </div>

            <div>
              <p
                className="
                  text-lg font-bold
                "
              >
                0
              </p>

              <p
                className="
                  text-xs
                  text-[var(--text-muted)]
                "
              >
                Materi
              </p>
            </div>

            <div>
              <p
                className="
                  text-lg font-bold
                "
              >
                0
              </p>

              <p
                className="
                  text-xs
                  text-[var(--text-muted)]
                "
              >
                Roadmap
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            rounded-xl border
            bg-[var(--card)]
            p-6
          "
        >
          <div
            className="
              mb-6 flex gap-5
              border-b
              border-[var(--border)]
            "
          >
            {[
              "Profil",
              "Tujuan",
              "Keamanan",
              "Tampilan",
              "Notifikasi",
            ].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  setActiveTab(tab)
                }
                className={`
                  -mb-px border-b-2 pb-3 text-sm

                  ${
                    activeTab === tab
                      ? "border-[#2563EB] font-medium text-[#2563EB]"
                      : "border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {activeTab ===
            "Profil" && (
            <div className="space-y-5">
              <div>
                <label
                  className="
                    mb-1.5 block text-sm
                    font-medium
                  "
                >
                  Nama
                </label>

                <div className="relative">
                  <User
                    size={16}
                    className="
                      absolute top-1/2 left-3
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    defaultValue={
                      user.name
                    }
                    className="
                      w-full rounded-lg border
                      bg-[var(--input-bg)]
                      py-2.5 pr-4 pl-10 text-sm

                      focus:border-[#2563EB]
                      focus:ring-1
                      focus:ring-[#2563EB]
                      focus:outline-none
                    "
                  />
                </div>
              </div>

              <div>
                <label
                  className="
                    mb-1.5 block text-sm
                    font-medium
                  "
                >
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={16}
                    className="
                      absolute top-1/2 left-3
                      -translate-y-1/2
                      text-[var(--text-muted)]
                    "
                  />

                  <input
                    disabled
                    defaultValue={
                      user.email
                    }
                    className="
                      w-full rounded-lg border
                      bg-[var(--muted)]
                      py-2.5 pr-4 pl-10 text-sm
                    "
                  />
                </div>
              </div>

              <button
                className="
                  rounded-lg bg-[#2563EB]
                  px-5 py-2.5 text-sm
                  font-medium text-white
                "
              >
                Simpan Perubahan
              </button>
            </div>
          )}

          {activeTab ===
            "Keamanan" && (
            <div className="space-y-4">
              <div className="relative">
                <Lock
                  size={16}
                  className="
                    absolute top-1/2 left-3
                    -translate-y-1/2
                    text-[var(--text-muted)]
                  "
                />

                <input
                  type="password"
                  placeholder="Password lama"
                  className="
                    w-full rounded-lg border
                    bg-[var(--input-bg)]
                    py-2.5 pr-4 pl-10 text-sm
                  "
                />
              </div>

              <button
                className="
                  rounded-lg bg-[#2563EB]
                  px-5 py-2.5 text-sm
                  text-white
                "
              >
                Ganti Password
              </button>
            </div>
          )}

          {activeTab ===
            "Tampilan" && (
            <div className="space-y-4">
              <div
                className="
                  flex items-center
                  justify-between py-3
                "
              >
                <div
                  className="
                    flex items-center gap-3
                  "
                >
                  <Moon
                    size={20}
                    className="
                      text-[var(--text-muted)]
                    "
                  />

                  <div>
                    <p className="font-medium">
                      Mode Gelap
                    </p>

                    <p
                      className="
                        text-xs
                        text-[var(--text-muted)]
                      "
                    >
                      Ubah tema tampilan
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setDarkMode(
                      !darkMode
                    )
                  }
                  className={`
                    relative h-6 w-11 rounded-full transition-colors

                    ${
                      darkMode
                        ? "bg-[#2563EB]"
                        : "border bg-[var(--muted)]"
                    }
                  `}
                >
                  <div
                    className={`
                      absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform

                      ${
                        darkMode
                          ? "translate-x-5"
                          : "translate-x-0"
                      }
                    `}
                  />
                </button>
              </div>
            </div>
          )}

          {activeTab ===
            "Notifikasi" && (
            <div
              className="
                divide-y
                divide-[var(--border)]
              "
            >
              {[
                "Pengingat mingguan",
                "Achievement",
                "Tips belajar",
                "Update roadmap",
              ].map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center
                    justify-between py-4
                  "
                >
                  <div>
                    <p className="font-medium">
                      {item}
                    </p>

                    <p
                      className="
                        text-xs
                        text-[var(--text-muted)]
                      "
                    >
                      Kelola notifikasi
                    </p>
                  </div>

                  <button
                    className="
                      relative h-6 w-11 rounded-full
                      bg-[#2563EB]
                    "
                  >
                    <div
                      className="
                        absolute top-0.5 right-0.5
                        h-5 w-5 rounded-full
                        bg-white shadow
                      "
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab ===
            "Tujuan" && (
            <div className="space-y-6">
              <div>
                <p className="font-medium">
                  Target Belajar Mingguan
                </p>

                <div
                  className="
                    mt-4 flex items-center
                    gap-4
                  "
                >
                  <input
                    type="range"
                    min={1}
                    max={7}
                    defaultValue={
                      user.weeklyTarget
                    }
                    className="w-full"
                  />

                  <span
                    className="
                      text-lg font-bold
                      text-[#2563EB]
                    "
                  >
                    {
                      user.weeklyTarget
                    }
                    /7
                  </span>
                </div>
              </div>

              <button
                className="
                  rounded-lg bg-[#2563EB]
                  px-5 py-2.5 text-sm
                  font-medium text-white
                "
              >
                Update Tujuan
              </button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}