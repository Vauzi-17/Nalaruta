"use client"

import Link from "next/link"

import {
  BookOpen,
  ChevronRight,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Loader2,
  MousePointerClick,
} from "lucide-react"

import { FaYoutube } from "react-icons/fa"

interface Resource {
  type:
    | "youtube"
    | "article"
    | "website"
    | "course"
    | "docs"

  title: string
  url: string
}

interface NodeData {
  id: string
  title: string
  description?: string

  subtopics: string[]

  difficulty:
    | "Pemula"
    | "Menengah"
    | "Lanjutan"

  estimatedDays: number

  resources: Resource[]
}

interface Props {
  node: NodeData | null

  completedNodes: string[]

  currentNode: string | null

  isLoggedIn: boolean

  isUpdating: boolean

  onUpdateStatus: (
    nodeId: string,
    status:
      | "learning"
      | "completed"
  ) => void
}

function DifficultyBadge({
  difficulty,
}: {
  difficulty:
    | "Pemula"
    | "Menengah"
    | "Lanjutan"
}) {
  const styles = {
    Pemula:
      "bg-[var(--success-light)] text-[var(--success)]",

    Menengah:
      "bg-[var(--warning-light)] text-[var(--warning)]",

    Lanjutan:
      "bg-[var(--danger-light)] text-[var(--danger)]",
  }

  return (
    <span
      className={`
        rounded-full
        px-2.5 py-1
        text-xs font-medium
        ${styles[difficulty]}
      `}
    >
      {difficulty}
    </span>
  )
}

export default function NodeDetail({
  node,
  completedNodes,
  currentNode,
  isLoggedIn,
  onUpdateStatus,
  isUpdating,
}: Props) {
  if (!node) {
    return (
      <div
        className="
          flex h-64
          flex-col items-center
          justify-center
          text-center
        "
      >
        <MousePointerClick
          size={48}
          className="
            text-[var(--text-muted)]
          "
        />

        <p
          className="
            mt-3
            text-[var(--text-muted)]
          "
        >
          Klik node untuk melihat
          detail
        </p>
      </div>
    )
  }

  const isCompleted =
    completedNodes.includes(node.id)

  const isCurrent =
    currentNode === node.id

  return (
    <div className="space-y-5 p-1">
      {/* HEADER */}
      <div>
        <div
          className="
            flex items-start
            justify-between gap-3
          "
        >
          <h2
            className="
              text-xl font-bold
              leading-snug
              text-[var(--text-primary)]
            "
          >
            {node.title}
          </h2>

          <DifficultyBadge
            difficulty={
              node.difficulty
            }
          />
        </div>

        <div
          className="
            mt-3 flex
            flex-wrap items-center
            gap-4 text-xs
            text-[var(--text-muted)]
          "
        >
          <div
            className="
              flex items-center gap-1
            "
          >
            <Clock size={13} />

            <span>
              {
                node.estimatedDays
              }{" "}
              hari estimasi
            </span>
          </div>

          <div
            className="
              flex items-center gap-1
            "
          >
            <BookOpen size={13} />

            <span>
              {
                node.subtopics.length
              }{" "}
              sub topik
            </span>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p
        className="
          text-sm leading-relaxed
          text-[var(--text-secondary)]
        "
      >
        {node.description}
      </p>

      {/* SUBTOPICS */}
      <div>
        <h3
          className="
            mb-3 text-sm
            font-semibold
            text-[var(--text-primary)]
          "
        >
          Yang Akan Dipelajari
        </h3>

        <ul className="space-y-2">
          {node.subtopics.map(
            (topic) => (
              <li
                key={topic}
                className="
                  flex items-start
                  gap-2
                "
              >
                <ChevronRight
                  size={16}
                  className="
                    mt-0.5
                    flex-shrink-0
                    text-[#2563EB]
                  "
                />

                <span
                  className="
                    text-sm
                    text-[var(--text-secondary)]
                  "
                >
                  {topic}
                </span>
              </li>
            )
          )}
        </ul>
      </div>

      {/* RESOURCES */}
      <div>
        <h3
          className="
            mb-3 text-sm
            font-semibold
            text-[var(--text-primary)]
          "
        >
          Sumber Belajar
        </h3>

        <div className="space-y-2">
          {node.resources.map(
            (resource) => {
              function renderIcon() {
                switch (
                  resource.type
                ) {
                  case "youtube":
                    return (
                      <FaYoutube
                        className="
                          text-lg
                          text-red-500
                        "
                      />
                    )

                  case "article":
                    return (
                      <FileText
                        size={18}
                        className="
                          text-[#2563EB]
                        "
                      />
                    )

                  case "website":
                    return (
                      <Globe
                        size={18}
                        className="
                          text-[var(--success)]
                        "
                      />
                    )

                  case "docs":
                    return (
                      <BookOpen
                        size={18}
                        className="
                          text-[var(--text-secondary)]
                        "
                      />
                    )

                  case "course":
                    return (
                      <GraduationCap
                        size={18}
                        className="
                          text-[var(--warning)]
                        "
                      />
                    )

                  default:
                    return (
                      <BookOpen
                        size={18}
                      />
                    )
                }
              }

              return (
                <a
                  key={
                    resource.url
                  }
                  href={
                    resource.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className="
                      flex items-center
                      gap-3 rounded-lg
                      border
                      border-[var(--border)]
                      p-3 transition-colors
                      hover:border-[#2563EB]
                    "
                  >
                    {renderIcon()}

                    <span
                      className="
                        flex-1 text-sm
                        font-medium
                        text-[var(--text-primary)]
                      "
                    >
                      {
                        resource.title
                      }
                    </span>

                    <ExternalLink
                      size={16}
                      className="
                        text-[var(--text-muted)]
                      "
                    />
                  </div>
                </a>
              )
            }
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div
        className="
          border-t
          border-[var(--border)]
          pt-4
        "
      >
        {!isLoggedIn && (
          <Link
            href="/login"
            className="
              block w-full
              rounded-lg border
              border-[#2563EB]
              py-2.5 text-center
              font-medium
              text-[#2563EB]
              hover:bg-[var(--primary-light)]
            "
          >
            Login untuk Pantau
            Progress
          </Link>
        )}

        {isLoggedIn &&
          isCompleted && (
            <div className="space-y-2">
              <div
                className="
                  w-full rounded-lg
                  bg-[var(--success)]
                  py-2.5 text-center
                  font-medium text-white
                  opacity-90
                "
              >
                ✓ Materi Selesai
              </div>

              <button
                onClick={() =>
                  onUpdateStatus(
                    node.id,
                    "learning"
                  )
                }
                className="
                  w-full py-1
                  text-xs
                  text-[var(--text-muted)]
                  hover:text-[var(--danger)]
                "
              >
                Tandai Belum
                Selesai
              </button>
            </div>
          )}

        {isLoggedIn &&
          isCurrent &&
          !isCompleted && (
            <button
              onClick={() =>
                onUpdateStatus(
                  node.id,
                  "completed"
                )
              }
              disabled={isUpdating}
              className="
                flex w-full
                items-center
                justify-center
                gap-2 rounded-lg
                bg-[#2563EB]
                py-3 font-semibold
                text-white
                hover:bg-[#1D4ED8]
                disabled:opacity-70
              "
            >
              {isUpdating ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />

                  <span>
                    Menyimpan...
                  </span>
                </>
              ) : (
                "✅ Tandai Selesai"
              )}
            </button>
          )}

        {isLoggedIn &&
          !isCompleted &&
          !isCurrent && (
            <button
              onClick={() =>
                onUpdateStatus(
                  node.id,
                  "learning"
                )
              }
              className="
                w-full rounded-lg
                border border-[#2563EB]
                py-2.5 font-medium
                text-[#2563EB]
                hover:bg-[var(--primary-light)]
              "
            >
              Mulai Pelajari Ini
            </button>
          )}
      </div>
    </div>
  )
}