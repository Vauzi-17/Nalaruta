"use client"

import {
  CheckCircle2,
  Flame,
  Map,
} from "lucide-react"

type Props = {
  userName: string
  streak: number
  totalCompleted: number
  activeRoadmaps: number
}

export default function WelcomeBanner({
  userName,
  streak,
  totalCompleted,
  activeRoadmaps,
}: Props) {
  const hour = new Date().getHours()

  let greeting = "Selamat malam"

  if (hour >= 5 && hour < 11) {
    greeting = "Selamat pagi"
  } else if (
    hour >= 11 &&
    hour < 15
  ) {
    greeting = "Selamat siang"
  } else if (
    hour >= 15 &&
    hour < 19
  ) {
    greeting = "Selamat sore"
  }

  return (
    <div className="space-y-5">
      <div>
        <h1
          className="
            text-2xl font-bold
            text-[var(--text-primary)]
          "
        >
          {greeting}, {userName}! 
        </h1>

        <p
          className="
            mt-1
            text-[var(--text-secondary)]
          "
        >
          Sedikit progress setiap hari
          akan membawa hasil besar.
        </p>
      </div>

      <div
        className="
          grid grid-cols-1 gap-4
          sm:grid-cols-3
        "
      >
        {/* STREAK */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            bg-[var(--warning-light)]
            p-4
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-[var(--warning)]
            "
          >
            <Flame
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <p
              className="
                text-2xl font-bold
                text-[var(--warning)]
              "
            >
              {streak} hari
            </p>

            <p
              className="
                text-xs
                text-[var(--text-secondary)]
              "
            >
              Streak Berturut-turut
            </p>
          </div>
        </div>

        {/* COMPLETE */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            bg-[var(--success-light)]
            p-4
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-[var(--success)]
            "
          >
            <CheckCircle2
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <p
              className="
                text-2xl font-bold
                text-[var(--success)]
              "
            >
              {totalCompleted}
            </p>

            <p
              className="
                text-xs
                text-[var(--text-secondary)]
              "
            >
              Materi Selesai
            </p>
          </div>
        </div>

        {/* ACTIVE */}
        <div
          className="
            flex items-center gap-3
            rounded-xl
            bg-[var(--primary-light)]
            p-4
          "
        >
          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-[#2563EB]
            "
          >
            <Map
              size={20}
              className="text-white"
            />
          </div>

          <div>
            <p
              className="
                text-2xl font-bold
                text-[#2563EB]
              "
            >
              {activeRoadmaps}
            </p>

            <p
              className="
                text-xs
                text-[var(--text-secondary)]
              "
            >
              Roadmap Aktif
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}