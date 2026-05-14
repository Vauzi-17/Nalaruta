"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"

import {
  BarChart3,
  BookOpen,
  Clock,
  Code2,
  Gamepad2,
  Palette,
  Search,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react"

import Footer from "@/components/layout/Footer"

import Navbar from "@/components/layout/Navbar"

import { useSession } from "@/lib/auth-client"

const iconMap: Record<
  string,
  React.ElementType
> = {
  Code2,
  Server,
  Palette,
  BarChart3,
  Smartphone,
  ShieldCheck,
  Gamepad2,
}

const filters = [
  "Semua",
  "Programming",
  "Design",
  "Data",
  "Security",
  "Mobile",
]

export default function ExplorePage() {
  const [roadmaps, setRoadmaps] =
    useState<any[]>([])

  const [progressList, setProgressList] =
    useState<any[]>([])

  const [isLoading, setIsLoading] =
    useState(true)

  const [activeFilter, setActiveFilter] =
    useState("Semua")

  const [searchQuery, setSearchQuery] =
    useState("")

  const { data: session } =
    useSession()

  useEffect(() => {
    async function fetchData() {
      try {
        const roadmapRes =
          await fetch("/api/roadmaps")

        const roadmapData =
          await roadmapRes.json()

        setRoadmaps(roadmapData)

        if (session) {
          const progressRes =
            await fetch(
              "/api/progress"
            )

          if (progressRes.ok) {
            const progressData =
              await progressRes.json()

            setProgressList(
              progressData
            )
          }
        }
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [session])

  const filteredRoadmaps =
    useMemo(() => {
      return roadmaps.filter(
        (roadmap) => {
          const matchFilter =
            activeFilter ===
              "Semua" ||
            roadmap.category ===
              activeFilter

          const matchSearch =
            roadmap.title
              .toLowerCase()
              .includes(
                searchQuery.toLowerCase()
              )

          return (
            matchFilter &&
            matchSearch
          )
        }
      )
    }, [
      roadmaps,
      activeFilter,
      searchQuery,
    ])

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-[var(--background)]
          pt-16
        "
      >
        {/* HERO */}
        <section
          className="
            bg-[var(--muted)]
            px-4 py-14 text-center
          "
        >
          <h1
            className="
              text-4xl font-bold
              text-[var(--text-primary)]
            "
          >
            Temukan Jalur Kariermu
          </h1>

          <p
            className="
              mt-3
              text-[var(--text-secondary)]
            "
          >
            Jelajahi roadmap belajar
            terbaik sesuai minat dan
            tujuan kariermu.
          </p>

          <div
            className="
              mx-auto mt-6
              max-w-md
            "
          >
            <div className="relative">
              <Search
                size={18}
                className="
                  absolute top-1/2 left-3
                  -translate-y-1/2
                  text-[var(--text-muted)]
                "
              />

              <input
                type="text"
                placeholder="Cari roadmap..."
                value={searchQuery}
                onChange={(e) =>
                  setSearchQuery(
                    e.target.value
                  )
                }
                className="
                  w-full rounded-xl border
                  border-[var(--border)]
                  bg-[var(--card)]
                  py-3 pr-4 pl-10

                  focus:border-[#2563EB]
                  focus:ring-1
                  focus:ring-[#2563EB]
                  focus:outline-none
                "
              />
            </div>
          </div>
        </section>

        {/* FILTER */}
        <div
          className="
            mx-auto mt-8 flex
            max-w-7xl flex-wrap gap-2
            px-4
          "
        >
          {filters.map((filter) => {
            const active =
              activeFilter === filter

            return (
              <button
                key={filter}
                onClick={() =>
                  setActiveFilter(
                    filter
                  )
                }
                className={`
                  rounded-full border px-5 py-1.5 text-sm font-medium transition-colors

                  ${
                    active
                      ? "border-[#2563EB] bg-[#2563EB] text-white"
                      : "border-[var(--border)] bg-[var(--card)] text-[var(--text-secondary)] hover:border-[#2563EB] hover:text-[#2563EB]"
                  }
                `}
              >
                {filter}
              </button>
            )
          })}
        </div>

        {/* GRID */}
        <section
          className="
            mx-auto max-w-7xl
            px-4 py-10
          "
        >
          {isLoading ? (
            <div
              className="
                grid grid-cols-1 gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {Array.from({
                length: 6,
              }).map((_, i) => (
                <div
                  key={i}
                  className="
                    animate-pulse rounded-xl
                    border border-[var(--border)]
                    bg-[var(--card)] p-6
                  "
                >
                  <div
                    className="
                      h-8 w-8 rounded
                      bg-[var(--muted)]
                    "
                  />

                  <div
                    className="
                      mt-4 h-5 w-40 rounded
                      bg-[var(--muted)]
                    "
                  />

                  <div
                    className="
                      mt-3 h-4 w-full rounded
                      bg-[var(--muted)]
                    "
                  />

                  <div
                    className="
                      mt-2 h-4 w-2/3 rounded
                      bg-[var(--muted)]
                    "
                  />
                </div>
              ))}
            </div>
          ) : filteredRoadmaps.length ===
            0 ? (
            <div className="py-20 text-center">
              <p
                className="
                  text-[var(--text-muted)]
                "
              >
                Tidak ada roadmap
                ditemukan
              </p>
            </div>
          ) : (
            <div
              className="
                grid grid-cols-1 gap-6
                md:grid-cols-2
                lg:grid-cols-3
              "
            >
              {filteredRoadmaps.map(
                (roadmap) => {
                  const Icon =
                    iconMap[
                      roadmap.icon
                    ] ?? Code2

                  const progress =
                    progressList.find(
                      (p) =>
                        p.roadmapSlug ===
                        roadmap.slug
                    )

                  return (
                    <div
                      key={roadmap.slug}
                      className="
                        rounded-xl border
                        border-[var(--card-border)]
                        bg-[var(--card)]
                        p-6

                        transition-all

                        hover:border-[#2563EB]
                        hover:shadow-md
                      "
                    >
                      <div
                        className="
                          flex items-center
                          justify-between
                        "
                      >
                        <Icon
                          size={32}
                          className="text-[#2563EB]"
                        />

                        <span
                          className="
                            rounded-full
                            bg-[var(--primary-light)]
                            px-3 py-1 text-xs
                            text-[#2563EB]
                          "
                        >
                          {
                            roadmap.category
                          }
                        </span>
                      </div>

                      <h3
                        className="
                          mt-4 text-lg font-bold
                          text-[var(--text-primary)]
                        "
                      >
                        {roadmap.title}
                      </h3>

                      <p
                        className="
                          mt-2 text-sm
                          text-[var(--text-secondary)]
                        "
                      >
                        {
                          roadmap.description
                        }
                      </p>

                      <div
                        className="
                          mt-4 flex gap-4
                          text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        <div
                          className="
                            flex items-center gap-1
                          "
                        >
                          <BookOpen
                            size={12}
                          />

                          {
                            roadmap.totalNodes
                          }{" "}
                          materi
                        </div>

                        <div
                          className="
                            flex items-center gap-1
                          "
                        >
                          <Clock
                            size={12}
                          />

                          ~
                          {
                            roadmap.estimatedWeeks
                          }{" "}
                          minggu
                        </div>
                      </div>

                      <div className="mt-3">
                        <span
                          className={`
                            rounded px-2 py-0.5 text-xs

                            ${
                              roadmap.level ===
                              "Pemula"
                                ? "bg-[var(--success-light)] text-[var(--success)]"
                                : ""
                            }

                            ${
                              roadmap.level ===
                              "Menengah"
                                ? "bg-[var(--warning-light)] text-[var(--warning)]"
                                : ""
                            }

                            ${
                              roadmap.level ===
                              "Lanjutan"
                                ? "bg-[var(--danger-light)] text-[var(--danger)]"
                                : ""
                            }
                          `}
                        >
                          {roadmap.level}
                        </span>
                      </div>

                      {progress ? (
                        <div className="mt-5">
                          <div
                            className="
                              mb-2 flex
                              justify-between
                              text-xs
                            "
                          >
                            <span
                              className="
                                text-[var(--text-secondary)]
                              "
                            >
                              Progress
                            </span>

                            <span
                              className="
                                font-semibold
                                text-[#2563EB]
                              "
                            >
                              {
                                progress.percentComplete
                              }
                              %
                            </span>
                          </div>

                          <div
                            className="
                              h-1.5 rounded-full
                              bg-[var(--muted)]
                            "
                          >
                            <div
                              className="
                                h-1.5 rounded-full
                                bg-[#2563EB]
                              "
                              style={{
                                width: `${progress.percentComplete}%`,
                              }}
                            />
                          </div>

                          <Link
                            href={`/roadmap/${roadmap.slug}`}
                            className="
                              mt-4 block rounded-lg
                              bg-[#2563EB]
                              py-2.5 text-center
                              text-sm font-semibold
                              text-white
                            "
                          >
                            Lanjutkan{" "}
                            {
                              progress.percentComplete
                            }
                            %
                          </Link>
                        </div>
                      ) : (
                        <Link
                          href={`/roadmap/${roadmap.slug}`}
                          className="
                            mt-5 block rounded-lg
                            border border-[#2563EB]
                            py-2.5 text-center
                            text-sm font-semibold
                            text-[#2563EB]

                            hover:bg-[var(--primary-light)]
                          "
                        >
                          Mulai Roadmap
                        </Link>
                      )}
                    </div>
                  )
                }
              )}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  )
}