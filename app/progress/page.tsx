import { headers } from "next/headers"

import Link from "next/link"

import { redirect } from "next/navigation"

import {
  Calendar,
  CheckCircle2,
  Flame,
  Map as MapIcon,
} from "lucide-react"

import DashboardLayout from "@/components/layout/DashboardLayout"

import CalendarHeatmap from "@/components/progress/CalendarHeatmap"

import { auth } from "@/lib/auth"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import User from "@/models/User"

function formatRelativeTime(
  date: Date
) {
  const now = new Date()

  const diff =
    now.getTime() -
    new Date(date).getTime()

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  )

  if (days === 0)
    return "hari ini"

  if (days === 1)
    return "kemarin"

  if (days < 7)
    return `${days} hari lalu`

  const weeks = Math.floor(
    days / 7
  )

  return `${weeks} minggu lalu`
}

function getWeekNumber(date: Date) {
  const firstDay = new Date(
    date.getFullYear(),
    0,
    1
  )

  const pastDays =
    (date.getTime() -
      firstDay.getTime()) /
    86400000

  return Math.ceil(
    (pastDays +
      firstDay.getDay() +
      1) /
      7
  )
}

export default async function ProgressPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    })

  if (!session) {
    redirect("/login")
  }

  await connectDB()

  const user = await User.findOne({
  email: session.user.email,
}).lean<{ _id: any; longestStreak?: number }>()

  if (!user) {
    redirect("/login")
  }

  const progressList =
    await Progress.find({
      userId: user._id,
    }).lean()

  const safeProgressList =
    JSON.parse(
      JSON.stringify(progressList)
    )

  const allActivities =
    safeProgressList
      .flatMap(
        (p: any) =>
          p.activities || []
      )
      .sort(
        (a: any, b: any) =>
          new Date(
            b.date
          ).getTime() -
          new Date(
            a.date
          ).getTime()
      )

  const safeActivities =
    JSON.parse(
      JSON.stringify(allActivities)
    )

  const totalCompleted =
    safeProgressList.reduce(
      (
        sum: number,
        p: any
      ) =>
        sum +
        (
          p.completedNodes || []
        ).length,
      0
    )

  const activeWeeks =
    new Set(
      safeActivities.map(
        (a: any) => {
          const date =
            new Date(a.date)

          return `${date.getFullYear()}-${getWeekNumber(
            date
          )}`
        }
      )
    ).size || 1

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1
            className="
              text-2xl font-bold
              text-[var(--text-primary)]
            "
          >
            Progress Belajarmu
          </h1>

          <p
            className="
              mt-1
              text-[var(--text-secondary)]
            "
          >
            Pantau perkembangan dan
            konsistensi belajarmu.
          </p>
        </div>

        {/* STATS */}
        <div
          className="
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            md:grid-cols-4
          "
        >
          <div
            className="
              rounded-xl
              bg-[var(--success-light)]
              p-5
            "
          >
            <CheckCircle2
              size={24}
              className="
                text-[var(--success)]
              "
            />

            <p
              className="
                mt-3 text-2xl font-bold
                text-[var(--success)]
              "
            >
              {totalCompleted}
            </p>

            <p
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Materi Selesai
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-[var(--warning-light)]
              p-5
            "
          >
            <Flame
              size={24}
              className="
                text-[var(--warning)]
              "
            />

            <p
              className="
                mt-3 text-2xl font-bold
                text-[var(--warning)]
              "
            >
              {
                user.longestStreak
              }
            </p>

            <p
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Hari Streak
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-[var(--primary-light)]
              p-5
            "
          >
            <MapIcon
              size={24}
              className="text-[#2563EB]"
            />

            <p
              className="
                mt-3 text-2xl font-bold
                text-[#2563EB]
              "
            >
              {
                safeProgressList.length
              }
            </p>

            <p
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Roadmap
            </p>
          </div>

          <div
            className="
              rounded-xl
              bg-purple-100 p-5
              dark:bg-purple-950
            "
          >
            <Calendar
              size={24}
              className="
                text-purple-600
              "
            />

            <p
              className="
                mt-3 text-2xl font-bold
                text-purple-600
              "
            >
              {activeWeeks}
            </p>

            <p
              className="
                text-sm
                text-[var(--text-secondary)]
              "
            >
              Minggu Aktif
            </p>
          </div>
        </div>

        {/* ROADMAP LIST */}
        <div>
          <h2
            className="
              mb-4 text-lg font-semibold
            "
          >
            Roadmap yang Dipelajari
          </h2>

          {safeProgressList.length ===
          0 ? (
            <div
              className="
                rounded-xl border
                bg-[var(--card)]
                p-10 text-center
              "
            >
              <p
                className="
                  text-[var(--text-secondary)]
                "
              >
                Kamu belum memiliki
                roadmap aktif.
              </p>

              <Link
                href="/explore"
                className="
                  mt-5 inline-block
                  rounded-lg bg-[#2563EB]
                  px-5 py-2.5 text-sm
                  font-semibold text-white
                "
              >
                Jelajahi Roadmap
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {safeProgressList.map(
                (
                  progress: any
                ) => (
                  <div
                    key={
                      progress._id
                    }
                    className="
                      flex flex-wrap
                      items-center gap-5
                      rounded-xl border
                      bg-[var(--card)]
                      p-5
                    "
                  >
                    <div>
                      <h3
                        className="
                          font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {
                          progress.roadmapTitle
                        }
                      </h3>

                      <span
                        className="
                          mt-2 inline-block
                          rounded-full
                          bg-[var(--primary-light)]
                          px-3 py-1 text-xs
                          text-[#2563EB]
                        "
                      >
                        {
                          progress.status
                        }
                      </span>
                    </div>

                    <div className="flex-1">
                      <div
                        className="
                          mb-1 flex
                          justify-between text-sm
                        "
                      >
                        <span>
                          {
                            progress
                              .completedNodes
                              ?.length || 0
                          }{" "}
                          dari{" "}
                          {
                            progress.totalNodes ||
                            "?"
                          }{" "}
                          materi
                        </span>

                        <span>
                          {
                            progress.percentComplete ||
                            0
                          }
                          %
                        </span>
                      </div>

                      <div
                        className="
                          h-3 rounded-full
                          bg-[var(--muted)]
                        "
                      >
                        <div
                          className="
                            h-3 rounded-full
                            bg-[#2563EB]
                          "
                          style={{
                            width: `${progress.percentComplete || 0}%`,
                          }}
                        />
                      </div>

                      <p
                        className="
                          mt-1 text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        Mulai{" "}
                        {new Date(
                          progress.enrolledAt
                        ).toLocaleDateString(
                          "id-ID"
                        )}
                      </p>
                    </div>

                    <Link
                      href={`/roadmap/${progress.roadmapSlug}`}
                      className="
                        rounded-lg bg-[#2563EB]
                        px-4 py-2 text-sm
                        text-white
                      "
                    >
                      Lanjutkan →
                    </Link>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        <CalendarHeatmap
          activities={safeActivities}
        />

        {/* AKTIVITAS */}
        <div
          className="
            rounded-xl border
            bg-[var(--card)]
            p-6
          "
        >
          <div
            className="
              mb-6 flex gap-6
              border-b
              border-[var(--border)]
            "
          >
            <button
              className="
                -mb-px border-b-2
                border-[#2563EB]
                pb-3 font-medium
                text-[#2563EB]
              "
            >
              Semua
            </button>

            <button
              className="
                pb-3
                text-[var(--text-muted)]
              "
            >
              Selesai
            </button>

            <button
              className="
                pb-3
                text-[var(--text-muted)]
              "
            >
              Sedang Belajar
            </button>
          </div>

          <div>
            {safeActivities
              .slice(0, 20)
              .map(
                (
                  activity: any,
                  index: number
                ) => (
                  <div
                    key={index}
                    className="
                      flex items-center gap-3
                      border-b
                      border-[var(--border)]
                      py-3
                    "
                  >
                    <CheckCircle2
                      size={18}
                      className={
                        activity.status ===
                        "completed"
                          ? "text-[var(--success)]"
                          : "text-[var(--warning)]"
                      }
                    />

                    <div className="flex-1">
                      <p
                        className="
                          text-sm font-medium
                          text-[var(--text-primary)]
                        "
                      >
                        {
                          activity.nodeTitle
                        }
                      </p>

                      <p
                        className="
                          text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        {
                          activity.roadmapTitle
                        }
                      </p>
                    </div>

                    <span
                      className="
                        text-xs
                        text-[var(--text-muted)]
                      "
                    >
                      {formatRelativeTime(
                        activity.date
                      )}
                    </span>
                  </div>
                )
              )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}