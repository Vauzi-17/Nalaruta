"use client"

import { useMemo, useState } from "react"

type Activity = {
  createdAt?: string
  date?: string
}

type Props = {
  activities: Activity[]
}

type Tooltip = {
  visible: boolean

  x: number

  y: number

  date: string

  count: number
}

export default function CalendarHeatmap({
  activities,
}: Props) {
  const [tooltip, setTooltip] =
    useState<Tooltip>({
      visible: false,

      x: 0,
      y: 0,
      date: "",
      count: 0,
    })

  const days = useMemo(() => {
    const result = []

    const today = new Date()

    for (
      let i = 83;
      i >= 0;
      i--
    ) {
      const date = new Date()

      date.setDate(
        today.getDate() - i
      )

      const key =
        date
          .toISOString()
          .split("T")[0]

      const count =
        activities.filter(
          (activity) => {
            const activityDate =
              new Date(
                activity.createdAt ||
                  activity.date ||
                  ""
              )
                .toISOString()
                .split("T")[0]

            return (
              activityDate === key
            )
          }
        ).length

      result.push({
        key,
        count,
      })
    }

    return result
  }, [activities])

  function getColor(
    count: number
  ) {
    if (count === 0) {
      return "bg-[var(--muted)] border border-[var(--border)]"
    }

    if (count <= 2) {
      return "bg-blue-200 dark:bg-blue-900"
    }

    return "bg-[#2563EB]"
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
      <h3 className="font-semibold">
        Aktivitas 12 Minggu
        Terakhir
      </h3>

      <div className="mt-6">
        <div
          className="
            grid grid-cols-7
            gap-1
          "
        >
          {days.map((day) => (
            <div
              key={day.key}
              onMouseEnter={(e) =>
                setTooltip({
                  visible: true,

                  x:
                    e.clientX + 10,

                  y:
                    e.clientY + 10,

                  date: day.key,

                  count:
                    day.count,
                })
              }
              onMouseLeave={() =>
                setTooltip(
                  (
                    prev
                  ) => ({
                    ...prev,
                    visible: false,
                  })
                )
              }
              className={`
                h-5 w-5 rounded-sm
                ${getColor(
                  day.count
                )}
              `}
            />
          ))}
        </div>

        <div
          className="
            mt-5 flex items-center
            gap-2 text-xs
            text-[var(--text-muted)]
          "
        >
          <span>Sedikit</span>

          <div className="h-4 w-4 rounded-sm bg-[var(--muted)] border" />

          <div className="h-4 w-4 rounded-sm bg-blue-200 dark:bg-blue-900" />

          <div className="h-4 w-4 rounded-sm bg-[#2563EB]" />

          <span>Banyak</span>
        </div>
      </div>

      {tooltip.visible && (
        <div
          className="
            fixed z-50 rounded-lg
            border border-[var(--border)]
            bg-[var(--card)]
            px-3 py-2
            text-xs shadow-lg
          "
          style={{
            left: tooltip.x,
            top: tooltip.y,
          }}
        >
          <p>{tooltip.date}</p>

          <p className="mt-1 font-medium">
            {tooltip.count} aktivitas
          </p>
        </div>
      )}
    </div>
  )
}