import {
  BookOpen,
  CheckCircle2,
  Clock,
} from "lucide-react"

type Props = {
  activities: any[]
}

function formatRelativeTime(
  date: string | Date
) {
  const now = new Date()

  const target = new Date(date)

  const diff =
    now.getTime() - target.getTime()

  const days = Math.floor(
    diff / (1000 * 60 * 60 * 24)
  )

  if (days === 0) {
    return "hari ini"
  }

  if (days === 1) {
    return "kemarin"
  }

  if (days < 7) {
    return `${days} hari lalu`
  }

  const weeks = Math.floor(days / 7)

  return `${weeks} minggu lalu`
}

export default function ActivityFeed({
  activities,
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
          mb-4 flex items-center gap-2
        "
      >
        <Clock
          size={20}
          className="text-[#2563EB]"
        />

        <h3 className="font-semibold">
          Aktivitas Terakhir
        </h3>
      </div>

      {activities.length === 0 ? (
        <p
          className="
            py-4 text-center text-sm
            text-[var(--text-muted)]
          "
        >
          Belum ada aktivitas. Mulai
          belajar!
        </p>
      ) : (
        <div
          className="
            divide-y
            divide-[var(--border)]
          "
        >
          {activities
            .slice(0, 5)
            .map((activity, index) => (
              <div
                key={index}
                className="
                  flex items-center gap-3
                  py-3
                "
              >
                {activity.status ===
                "completed" ? (
                  <CheckCircle2
                    size={20}
                    className="
                      text-[var(--success)]
                    "
                  />
                ) : (
                  <BookOpen
                    size={20}
                    className="
                      text-[var(--warning)]
                    "
                  />
                )}

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
                      mt-0.5 text-xs
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
            ))}
        </div>
      )}
    </div>
  )
}