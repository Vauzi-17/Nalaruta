import Link from "next/link"

import { Map } from "lucide-react"

type Props = {
  progress: any | null
}

export default function ActiveRoadmapCard({
  progress,
}: Props) {
  if (!progress) {
    return (
      <div
        className="
          rounded-xl border-2 border-dashed
          border-[var(--border)]
          bg-[var(--card)]
          p-10 text-center
        "
      >
        <Map
          size={48}
          className="
            mx-auto
            text-[var(--text-muted)]
          "
        />

        <p
          className="
            mt-4 font-semibold
            text-[var(--text-primary)]
          "
        >
          Belum ada roadmap aktif
        </p>

        <p
          className="
            mt-1 text-sm
            text-[var(--text-secondary)]
          "
        >
          Pilih roadmap dan mulai
          belajar sekarang
        </p>

        <Link
          href="/explore"
          className="
            mt-5 inline-block
            rounded-lg bg-[#2563EB]
            px-6 py-2.5 text-sm
            font-semibold text-white
          "
        >
          Pilih Roadmap →
        </Link>
      </div>
    )
  }

  return (
    <div
      className="
        rounded-xl border
        border-[var(--card-border)]
        bg-[var(--card)]
        p-6
      "
    >
      <div
        className="
          flex items-start
          justify-between
        "
      >
        <div>
          <p
            className="
              text-xs uppercase tracking-wide
              text-[var(--text-muted)]
            "
          >
            ROADMAP AKTIF
          </p>

          <h3
            className="
              mt-1 text-xl font-bold
              text-[var(--text-primary)]
            "
          >
            {progress.roadmapTitle}
          </h3>
        </div>

        <span
          className="
            rounded-full
            bg-[var(--primary-light)]
            px-3 py-1 text-xs
            font-medium text-[#2563EB]
          "
        >
          {progress.level ?? "Aktif"}
        </span>
      </div>

      <div className="mt-5">
        <div
          className="
            mb-2 flex justify-between
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
            {progress.percentComplete}%
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
              width: `${progress.percentComplete}%`,
            }}
          />
        </div>
      </div>

      <div
        className="
          mt-5 grid grid-cols-2
          gap-4 text-sm
        "
      >
        <div>
          <p
            className="
              text-xs uppercase
              text-[var(--text-muted)]
            "
          >
            TERAKHIR
          </p>

          <p
            className="
              mt-1 font-medium
              text-[var(--text-primary)]
            "
          >
            {progress.currentNode ||
              "-"}
          </p>
        </div>

        <div>
          <p
            className="
              text-xs uppercase
              text-[var(--text-muted)]
            "
          >
            SELANJUTNYA
          </p>

          <p
            className="
              mt-1 font-medium
              text-[var(--text-primary)]
            "
          >
            {progress.nextNode ||
              "Selesai "}
          </p>
        </div>
      </div>

      <div
        className="
          mt-5 flex items-center
          justify-between
        "
      >
        <p
          className="
            text-xs
            text-[var(--text-muted)]
          "
        >
          ~
          {progress.estimatedWeeks ??
            0}{" "}
          minggu lagi
        </p>

        <Link
          href={`/roadmap/${progress.roadmapSlug}`}
          className="
            rounded-lg bg-[#2563EB]
            px-5 py-2 text-sm
            font-semibold text-white
          "
        >
          Lanjutkan →
        </Link>
      </div>
    </div>
  )
}