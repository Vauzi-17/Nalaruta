import Link from "next/link"

import {
  BarChart3,
  Code2,
  Compass,
  Palette,
  Server,
  ShieldCheck,
  Smartphone,
} from "lucide-react"

type Props = {
  roadmaps: any[]
}

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
}

export default function RoadmapRecommendation({
  roadmaps,
}: Props) {
  return (
    <div
      className="
        rounded-xl border
        bg-[var(--card)]
        p-6
      "
    >
      <div
        className="
          mb-5 flex items-center gap-2
        "
      >
        <Compass
          size={20}
          className="text-[#2563EB]"
        />

        <h3 className="font-semibold">
          Mungkin Kamu Tertarik
        </h3>
      </div>

      <div
        className="
          -mx-1 flex gap-4
          overflow-x-auto
          px-1 pb-2
        "
      >
        {roadmaps.map((roadmap) => {
          const Icon =
            iconMap[
              roadmap.icon
            ] ?? Code2

          return (
            <div
              key={roadmap.slug}
              className="
                min-w-[180px]
                flex-shrink-0 rounded-xl
                border border-[var(--card-border)]
                bg-[var(--muted)]
                p-4
              "
            >
              <Icon
                size={32}
                className="text-[#2563EB]"
              />

              <p
                className="
                  mt-3 text-sm font-semibold
                  text-[var(--text-primary)]
                "
              >
                {roadmap.title}
              </p>

              <p
                className="
                  mt-1 text-xs
                  text-[var(--text-muted)]
                "
              >
                {
                  roadmap.estimatedWeeks
                }{" "}
                minggu
              </p>

              <Link
                href="/explore"
                className="
                  mt-4 block rounded-lg
                  border border-[#2563EB]
                  py-1.5 text-center
                  text-xs text-[#2563EB]

                  hover:bg-[var(--primary-light)]
                "
              >
                Lihat
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}