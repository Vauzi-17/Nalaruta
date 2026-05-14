"use client"

import Link from "next/link"

import Image from "next/image"

import { usePathname } from "next/navigation"

import {
  BarChart3,
  Compass,
  LayoutDashboard,
  LogOut,
  Map,
  User,
} from "lucide-react"

import ThemeToggle from "@/components/ui/ThemeToggle"

import { signOut } from "@/lib/auth-client"

type Props = {
  children: React.ReactNode
}

export default function DashboardLayout({
  children,
}: Props) {
  const pathname = usePathname()

  const navItems = [
    {
      icon: LayoutDashboard,
      href: "/dashboard",
      label: "Dashboard",
    },

    {
      icon: Map,
      href: "/roadmap",
      label: "Roadmap Saya",
    },

    {
      icon: BarChart3,
      href: "/progress",
      label: "Progress",
    },

    {
      icon: Compass,
      href: "/explore",
      label: "Explore",
    },

    {
      icon: User,
      href: "/profile",
      label: "Profil",
    },
  ]

  return (
    <>
      <div
        className="
          flex h-screen overflow-hidden
        "
      >
        {/* SIDEBAR */}
        <aside
          className="
            hidden w-60 flex-shrink-0
            flex-col border-r
            border-[var(--card-border)]
            bg-[var(--card)]
            lg:flex
          "
        >
          <div
            className="
              border-b border-[var(--card-border)]
              px-6 py-5
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
          </div>

          <nav
            className="
              flex-1 space-y-1
              px-3 py-4
            "
          >
            {navItems.map((item) => {
              const Icon =
                item.icon

              const active =
                pathname.startsWith(
                  item.href
                )

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-3
                    rounded-lg px-3 py-2.5 text-sm
                    transition-colors

                    ${
                      active
                        ? "border-l-[3px] border-[#2563EB] bg-[var(--primary-light)] pl-[10px] font-medium text-[#2563EB]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--muted)]"
                    }
                  `}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div
            className="
              flex items-center justify-between
              border-t border-[var(--card-border)]
              px-3 py-4
            "
          >
            <ThemeToggle />

            <button
              type="button"
              onClick={() =>
                signOut()
              }
              className="
                flex items-center gap-2
                rounded-lg px-2 py-1
                text-sm text-[var(--danger)]

                hover:bg-[var(--danger-light)]
              "
            >
              <LogOut size={16} />
              Keluar
            </button>
          </div>
        </aside>

        {/* CONTENT */}
        <main
          className="
            flex-1 overflow-y-auto
            bg-[var(--muted)]
          "
        >
          <div
            className="
              mx-auto max-w-5xl
              px-4 py-6 pb-24
              md:px-6 lg:pb-6
            "
          >
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE BOTTOM NAV */}
      <div
        className="
          fixed right-0 bottom-0 left-0
          flex h-16 items-center
          justify-around border-t
          border-[var(--card-border)]
          bg-[var(--card)]
          px-2
          lg:hidden
        "
      >
        {navItems.map((item) => {
          const Icon = item.icon

          const active =
            pathname.startsWith(
              item.href
            )

          return (
            <Link
              key={item.href}
              href={item.href}
              className="
                flex flex-col items-center
                gap-0.5
              "
            >
              <Icon
                size={20}
                className={
                  active
                    ? "text-[#2563EB]"
                    : "text-[var(--text-muted)]"
                }
              />

              <span
                className={`
                  text-[10px]

                  ${
                    active
                      ? "font-medium text-[#2563EB]"
                      : "text-[var(--text-muted)]"
                  }
                `}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </>
  )
}