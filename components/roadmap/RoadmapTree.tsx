"use client"

import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Lock,
} from "lucide-react"

type Props = {
  nodes: RoadmapTreeNode[]
  completedNodes: string[]
  currentNode: string | null | undefined
  onNodeClick: (id: string) => void
  selectedNodeId: string | null
}

type RoadmapTreeNode = {
  id: string
  title: string
  difficulty: string
  estimatedDays: number
}

export default function RoadmapTree({
  nodes,
  completedNodes,
  currentNode,
  onNodeClick,
  selectedNodeId,
}: Props) {
  return (
    <div
      className="
        flex flex-col
        items-center px-4 py-6
      "
    >
      {nodes.map((node, index) => {
        const isCompleted =
          completedNodes.includes(
            node.id
          )

        const isCurrent =
          currentNode === node.id

        const isNext =
          index ===
          completedNodes.length

        const isLocked =
          index >
          completedNodes.length + 1

        return (
          <div
            key={node.id}
            className="
              flex w-full flex-col
              items-center
            "
          >
            {index > 0 && (
              <div
                className="
                  h-8 w-0.5
                  bg-[var(--border)]
                "
              />
            )}

            <button
              onClick={() =>
                !isLocked &&
                onNodeClick(node.id)
              }
              disabled={isLocked}
              className={`
                flex w-full max-w-sm
                items-center gap-3
                rounded-xl px-4 py-3.5
                transition-all duration-200
                sm:px-5

                ${
                  isCompleted
                    ? "border-2 border-[var(--success)] bg-[var(--success-light)]"
                    : ""
                }

                ${
                  isCurrent &&
                  !isCompleted
                    ? "border-2 border-[#2563EB] bg-[var(--primary-light)] shadow-sm"
                    : ""
                }

                ${
                  isNext &&
                  !isCurrent &&
                  !isCompleted
                    ? "border-2 border-dashed border-[var(--border)] bg-[var(--card)]"
                    : ""
                }

                ${
                  isLocked
                    ? "cursor-not-allowed border border-[var(--border)] bg-[var(--muted)] opacity-50"
                    : ""
                }

                ${
                  selectedNodeId ===
                  node.id
                    ? "ring-2 ring-[#2563EB] ring-offset-2"
                    : ""
                }
              `}
            >
              {isCompleted ? (
                <CheckCircle2
                  size={20}
                  className="
                    text-[var(--success)]
                  "
                />
              ) : isCurrent ? (
                <BookOpen
                  size={20}
                  className="text-[#2563EB]"
                />
              ) : isLocked ? (
                <Lock
                  size={20}
                  className="
                    text-[var(--text-muted)]
                  "
                />
              ) : (
                <Circle
                  size={20}
                  className="
                    text-[var(--text-muted)]
                  "
                />
              )}

              <div className="ml-1 min-w-0 flex-1">
                <p
                  className="
                    truncate text-left text-sm
                    font-medium
                  "
                >
                  {node.title}
                </p>

                <p
                  className="
                    mt-0.5 truncate
                    text-left text-xs
                    text-[var(--text-muted)]
                  "
                >
                  {
                    node.estimatedDays
                  }{" "}
                  hari ·{" "}
                  {node.difficulty}
                </p>
              </div>

              {isCurrent &&
                !isCompleted && (
                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-[#2563EB]
                      px-2 py-0.5
                      text-[10px]
                      text-white
                    "
                  >
                    Sedang Belajar
                  </span>
                )}

              {!isLocked && (
                <ChevronRight
                  size={16}
                  className="
                    flex-shrink-0
                    text-[var(--text-muted)]
                  "
                />
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
