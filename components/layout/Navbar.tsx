"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  User,
  X,
} from "lucide-react"
import { FcGoogle } from "react-icons/fc"
import ThemeToggle from "@/components/ui/ThemeToggle"
import { signOut, useSession } from "@/lib/auth-client"

const navLinks = [
  { href: "/explore", label: "Explore" },
  { href: "/about", label: "About" },
]

export default function Navbar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Scroll shadow
  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 8)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isMobileOpen])

  const initials =
    session?.user?.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "NA"

  return (
    <>
      <nav
        className={[
          "fixed top-0 right-0 left-0 z-50 border-b bg-[var(--background)] transition-shadow duration-200",
          isScrolled
            ? "border-[var(--border)] shadow-[var(--shadow)]"
            : "border-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#2563EB] shadow-sm">
              <Image
                src="/nalaruta.png"
                alt="Nalaruta"
                width={18}
                height={18}
                className="object-contain"
              />
            </div>
            <span className="text-base font-bold text-[var(--text-primary)] tracking-tight">
              Nala<span className="text-[var(--primary)]">ruta</span>
            </span>
          </Link>

          {/* Center nav */}
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((item) => {
              const active = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={[
                      "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[var(--primary-light)] text-[var(--primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {!session ? (
              <div className="hidden items-center gap-2 md:flex">
                <Link
                  href="/login"
                  className="
                    rounded-lg border border-[var(--border)]
                    px-4 py-1.5 text-sm font-medium
                    text-[var(--text-primary)]
                    hover:border-[var(--primary)] hover:text-[var(--primary)]
                    transition-colors
                  "
                >
                  Masuk
                </Link>
                <Link
                  href="/register"
                  className="
                    rounded-lg bg-[var(--primary)] hover:bg-[var(--primary-hover)]
                    px-4 py-1.5 text-sm font-semibold text-white
                    shadow-sm transition-all
                  "
                >
                  Daftar Gratis
                </Link>
              </div>
            ) : (
              <div ref={dropdownRef} className="relative hidden md:block">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="
                    flex items-center gap-2 rounded-xl
                    border border-[var(--border)]
                    bg-[var(--card)] px-2.5 py-1.5
                    hover:border-[var(--primary)]/40 hover:bg-[var(--muted)]
                    transition-all
                  "
                >
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-bold text-white">
                    {initials}
                  </div>
                  <span className="max-w-[120px] truncate text-sm font-medium text-[var(--text-primary)]">
                    {session.user.name}
                  </span>
                  <ChevronDown
                    size={14}
                    className={`text-[var(--text-muted)] transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-52 rounded-xl border border-[var(--border)] bg-[var(--card)] p-1.5 shadow-[var(--shadow-lg)]">
                    {/* User info */}
                    <div className="px-3 py-2 mb-1">
                      <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{session.user.name}</p>
                      <p className="text-xs text-[var(--text-muted)] truncate">{session.user.email}</p>
                    </div>
                    <div className="h-px bg-[var(--border)] mb-1" />

                    {[
                      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                      { href: "/progress", icon: BarChart3, label: "Progress" },
                      { href: "/profile", icon: User, label: "Profil" },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Icon size={15} />
                        {label}
                      </Link>
                    ))}

                    <div className="h-px bg-[var(--border)] my-1" />

                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm text-[var(--danger)] hover:bg-[var(--danger-light)] transition-colors"
                    >
                      <LogOut size={15} />
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="flex items-center justify-center w-9 h-9 rounded-lg hover:bg-[var(--muted)] transition-colors md:hidden"
              aria-label="Buka menu"
            >
              <Menu size={20} className="text-[var(--text-primary)]" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer ── */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 flex h-full w-72 flex-col bg-[var(--card)] shadow-[var(--shadow-lg)]">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
              <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2">
                <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#2563EB]">
                  <Image src="/nalaruta.png" alt="Nalaruta" width={16} height={16} className="object-contain" />
                </div>
                <span className="text-base font-bold text-[var(--text-primary)]">
                  Nala<span className="text-[var(--primary)]">ruta</span>
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-[var(--muted)] transition-colors"
              >
                <X size={18} className="text-[var(--text-primary)]" />
              </button>
            </div>

            {/* Nav links */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Menu
              </p>
              <div className="space-y-1">
                {navLinks.map((item) => {
                  const active = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMobileOpen(false)}
                      className={[
                        "flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                        active
                          ? "bg-[var(--primary-light)] text-[var(--primary)]"
                          : "text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  )
                })}
              </div>

              {session && (
                <>
                  <div className="my-4 h-px bg-[var(--border)]" />
                  <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                    Akun
                  </p>
                  <div className="space-y-1">
                    {[
                      { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
                      { href: "/progress", icon: BarChart3, label: "Progress" },
                      { href: "/profile", icon: User, label: "Profil" },
                    ].map(({ href, icon: Icon, label }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setIsMobileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--muted)] hover:text-[var(--text-primary)] transition-colors"
                      >
                        <Icon size={16} />
                        {label}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-[var(--border)] p-4">
              {!session ? (
                <div className="space-y-2">
                  <Link
                    href="/login"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full rounded-xl border border-[var(--border)] py-2.5 text-center text-sm font-medium text-[var(--text-primary)] hover:border-[var(--primary)] hover:text-[var(--primary)] transition-colors"
                  >
                    Masuk
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMobileOpen(false)}
                    className="block w-full rounded-xl bg-[var(--primary)] hover:bg-[var(--primary-hover)] py-2.5 text-center text-sm font-semibold text-white transition-colors"
                  >
                    Daftar Gratis
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 rounded-xl bg-[var(--muted)] px-3 py-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--primary)] text-sm font-bold text-white">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[var(--text-primary)]">
                        {session.user.name}
                      </p>
                      <p className="truncate text-xs text-[var(--text-muted)]">
                        {session.user.email}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => signOut()}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--danger)] py-2.5 text-sm font-medium text-[var(--danger)] hover:bg-[var(--danger-light)] transition-colors"
                  >
                    <LogOut size={15} />
                    Keluar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}