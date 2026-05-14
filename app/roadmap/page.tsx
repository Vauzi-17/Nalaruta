import { redirect } from "next/navigation"

import { headers } from "next/headers"

import Link from "next/link"

import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Map as MapIcon,
} from "lucide-react"

import { auth } from "@/lib/auth"

import connectDB from "@/lib/mongodb"

import DashboardLayout from "@/components/layout/DashboardLayout"

import Progress from "@/models/Progress"

import Roadmap from "@/models/Roadmap"

import User from "@/models/User"

export default async function RoadmapPage() {
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
  })

  if (!user) {
    redirect("/register")
  }

  const progressList =
    await Progress.find({
      userId: user._id,
    }).lean()

  const roadmapSlugs =
    progressList.map(
      (progress) =>
        progress.roadmapSlug
    )

  const roadmaps =
    await Roadmap.find({
      slug: {
        $in: roadmapSlugs,
      },
    }).lean()

  const roadmapMap = new Map(
    roadmaps.map((roadmap) => [
      roadmap.slug,
      roadmap,
    ])
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* HEADER */}
        <div>
          <h1
            className="
              text-2xl font-bold
              text-[var(--text-primary)]
            "
          >
            Roadmap Saya
          </h1>

          <p
            className="
              mt-1 text-sm
              text-[var(--text-secondary)]
            "
          >
            Lanjutkan perjalanan
            belajar dan pantau
            progress roadmap kamu.
          </p>
        </div>

        {/* EMPTY */}
        {progressList.length ===
          0 && (
          <div
            className="
              rounded-2xl border-2 border-dashed
              border-[var(--border)]
              bg-[var(--card)]
              p-12 text-center
            "
          >
            <MapIcon
              size={56}
              className="
                mx-auto
                text-[var(--text-muted)]
              "
            />

            <h2
              className="
                mt-5 text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              Belum Ada Roadmap
            </h2>

            <p
              className="
                mt-2 text-sm
                text-[var(--text-secondary)]
              "
            >
              Pilih roadmap pertama
              kamu dan mulai belajar
              hari ini.
            </p>

            <Link
              href="/explore"
              className="
                mt-6 inline-flex items-center
                gap-2 rounded-xl
                bg-[#2563EB]
                px-6 py-3
                text-sm font-semibold
                text-white
                transition-colors
                hover:bg-[#1D4ED8]
              "
            >
              Explore Roadmap
              <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* LIST */}
        <div className="space-y-5">
          {progressList.map(
            (progress: any) => {
              const roadmap =
                roadmapMap.get(
                  progress.roadmapSlug
                ) as any

              if (!roadmap)
                return null

              const percent =
                progress.percentComplete ||
                0

              const totalNodes =
                roadmap.nodes?.length ||
                0

              const completed =
                progress
                  .completedNodes
                  ?.length || 0

              const currentNode =
                roadmap.nodes?.find(
                  (node: any) =>
                    node.id ===
                    progress.currentNode
                )

              return (
                <div
                  key={
                    progress._id.toString()
                  }
                  className="
                    rounded-2xl border
                    border-[var(--card-border)]
                    bg-[var(--card)]
                    p-6
                  "
                >
                  {/* TOP */}
                  <div
                    className="
                      flex flex-col gap-4
                      md:flex-row
                      md:items-start
                      md:justify-between
                    "
                  >
                    <div>
                      <div
                        className="
                          flex items-center
                          gap-3
                        "
                      >
                        <h2
                          className="
                            text-xl font-bold
                            text-[var(--text-primary)]
                          "
                        >
                          {
                            roadmap.title
                          }
                        </h2>

                        <span
                          className="
                            rounded-full
                            bg-[var(--primary-light)]
                            px-3 py-1
                            text-xs font-medium
                            text-[#2563EB]
                          "
                        >
                          {
                            roadmap.level
                          }
                        </span>
                      </div>

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
                    </div>

                    <Link
                      href={`/roadmap/${roadmap.slug}`}
                      className="
                        inline-flex items-center
                        gap-2 rounded-xl
                        bg-[#2563EB]
                        px-5 py-2.5
                        text-sm font-semibold
                        text-white
                        transition-colors
                        hover:bg-[#1D4ED8]
                      "
                    >
                      Lanjutkan
                      <ArrowRight
                        size={16}
                      />
                    </Link>
                  </div>

                  {/* PROGRESS */}
                  <div className="mt-6">
                    <div
                      className="
                        mb-2 flex items-center
                        justify-between
                        text-sm
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
                          font-bold text-[#2563EB]
                        "
                      >
                        {percent}%
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
                          transition-all
                        "
                        style={{
                          width: `${percent}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* INFO */}
                  <div
                    className="
                      mt-5 grid grid-cols-1
                      gap-4 md:grid-cols-3
                    "
                  >
                    <div
                      className="
                        rounded-xl
                        bg-[var(--muted)]
                        p-4
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-2 text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        <CheckCircle2
                          size={14}
                        />

                        Materi Selesai
                      </div>

                      <p
                        className="
                          mt-2 text-lg font-bold
                          text-[var(--text-primary)]
                        "
                      >
                        {completed}/
                        {totalNodes}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-[var(--muted)]
                        p-4
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-2 text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        <BookOpen
                          size={14}
                        />

                        Sedang Dipelajari
                      </div>

                      <p
                        className="
                          mt-2 text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        {currentNode?.title ||
                          "-"}
                      </p>
                    </div>

                    <div
                      className="
                        rounded-xl
                        bg-[var(--muted)]
                        p-4
                      "
                    >
                      <div
                        className="
                          flex items-center
                          gap-2 text-xs
                          text-[var(--text-muted)]
                        "
                      >
                        <Clock
                          size={14}
                        />

                        Estimasi
                      </div>

                      <p
                        className="
                          mt-2 text-sm font-semibold
                          text-[var(--text-primary)]
                        "
                      >
                        ~
                        {
                          roadmap.estimatedWeeks
                        }{" "}
                        minggu
                      </p>
                    </div>
                  </div>
                </div>
              )
            }
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}