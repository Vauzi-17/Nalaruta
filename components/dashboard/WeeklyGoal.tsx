import {
  Check,
  Target,
} from "lucide-react"

type Props = {
  completedThisWeek: number
  target: number
  weekDays: boolean[]
}

export default function WeeklyGoal({
  completedThisWeek,
  target,
  weekDays,
}: Props) {
  const percentage = Math.min(
    (completedThisWeek / target) *
      100,
    100
  )

  const labels = [
    "Sen",
    "Sel",
    "Rab",
    "Kam",
    "Jum",
    "Sab",
    "Min",
  ]

  const achieved =
    completedThisWeek >= target

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
          flex items-center
          justify-between
        "
      >
        <div
          className="
            flex items-center gap-2
          "
        >
          <Target
            size={20}
            className="text-[#2563EB]"
          />

          <h3 className="font-semibold">
            Target Minggu Ini
          </h3>
        </div>

        <span
          className={`
            rounded-full px-3 py-1 text-xs font-medium

            ${
              achieved
                ? "bg-[var(--success-light)] text-[var(--success)]"
                : "bg-[var(--primary-light)] text-[#2563EB]"
            }
          `}
        >
          {achieved
            ? " Tercapai!"
            : `${completedThisWeek}/${target}`}
        </span>
      </div>

      <div
        className="
          mt-3 h-2 rounded-full
          bg-[var(--muted)]
        "
      >
        <div
          className="
            h-2 rounded-full
            bg-[#2563EB]
          "
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div
        className="
          mt-5 flex justify-between
          gap-1.5
        "
      >
        {labels.map((label, index) => (
          <div
            key={label}
            className="
              flex flex-col
              items-center gap-1
            "
          >
            <span
              className="
                text-[10px]
                text-[var(--text-muted)]
              "
            >
              {label}
            </span>

            <div
              className={`
                flex h-9 w-9
                items-center justify-center
                rounded-md

                ${
                  weekDays[index]
                    ? "bg-[#2563EB]"
                    : "border border-[var(--border)] bg-[var(--muted)]"
                }
              `}
            >
              {weekDays[index] && (
                <Check
                  size={16}
                  className="text-white"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}