"use client"

import { useEffect, useMemo, useState } from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import {
  BookOpen,
  ChevronLeft,
  Circle,
  Loader2,
} from "lucide-react"

import NodeDetail from "@/components/roadmap/NodeDetail"
import RoadmapTree from "@/components/roadmap/RoadmapTree"

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

interface RoadmapNode {
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

  order: number
}

interface Roadmap {
  slug: string
  title: string
  description: string
  category: string
  level:
    | "Pemula"
    | "Menengah"
    | "Lanjutan"

  estimatedWeeks: number
  totalNodes: number
  nodes: RoadmapNode[]
}

interface Progress {
  roadmapSlug: string
  roadmapTitle: string

  completedNodes: string[]

  currentNode: string | null

  percentComplete: number

  status:
    | "active"
    | "paused"
    | "completed"
}

interface Props {
  roadmap: Roadmap

  initialProgress: Progress | null

  isLoggedIn: boolean
}

export default function RoadmapPageClient({
  roadmap,
  initialProgress,
  isLoggedIn,
}: Props) {
  const router = useRouter()

  const [progress, setProgress] =
    useState<Progress | null>(
      initialProgress
    )

  const [selectedNodeId, setSelectedNodeId] =
    useState<string | null>(
      roadmap.nodes[0]?.id ?? null
    )

  const [isUpdating, setIsUpdating] =
    useState(false)

  const [showMobileDetail, setShowMobileDetail] =
    useState(false)

  const completedNodes =
    progress?.completedNodes || []

  const currentNodeId =
    progress?.currentNode ||
    roadmap.nodes[0]?.id

  const percentComplete =
    progress?.percentComplete || 0

  const selectedNode = useMemo(() => {
    return (
      roadmap.nodes.find(
        (node) =>
          node.id === selectedNodeId
      ) || null
    )
  }, [roadmap.nodes, selectedNodeId])

  useEffect(() => {
    if (selectedNodeId) {
      setShowMobileDetail(true)
    }
  }, [selectedNodeId])

  async function handleUpdateStatus(
    nodeId: string,
    status:
      | "learning"
      | "completed"
  ) {
    try {
      if (!isLoggedIn) {
        router.push("/login")
        return
      }

      if (!progress) {
        const enrollRes =
          await fetch("/api/progress", {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              roadmapSlug:
                roadmap.slug,
            }),
          })

        if (!enrollRes.ok) {
          return
        }

        const enrolledData =
          await enrollRes.json()

        setProgress(enrolledData)
      }

      setIsUpdating(true)

      const res = await fetch(
        `/api/progress/${roadmap.slug}`,
        {
          method: "PATCH",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            nodeId,
            status,
          }),
        }
      )

      if (res.ok) {
        const updated =
          await res.json()

        setProgress(updated)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdating(false)
    }
  }

  return (
    <>
      {/* DESKTOP */}
      <div
        className="
          hidden lg:flex
          h-[calc(100vh-64px)]
        "
      >
        {/* LEFT */}
        <div
          className="
            w-[55%]
            overflow-y-auto
            border-r
            border-[var(--border)]
          "
        >
          {/* HEADER */}
          <div
            className="
              sticky top-0 z-10
              border-b
              border-[var(--border)]
              bg-[var(--background)]
              px-6 py-4
            "
          >
            <Link
              href="/explore"
              className="
                mb-2 flex
                items-center gap-1
                text-sm
                text-[var(--text-muted)]
                hover:text-[var(--text-primary)]
              "
            >
              <ChevronLeft size={16} />
              Kembali
            </Link>

            <h1
              className="
                text-xl font-bold
                text-[var(--text-primary)]
              "
            >
              {roadmap.title}
            </h1>

            <div
              className="
                mt-3 flex
                items-center gap-3
              "
            >
              <span
                className="
                  text-sm
                  text-[var(--text-secondary)]
                "
              >
                {
                  completedNodes.length
                }
                /
                {
                  roadmap.totalNodes
                }{" "}
                materi
              </span>

              <div
                className="
                  h-2 flex-1
                  rounded-full
                  bg-[var(--muted)]
                "
              >
                <div
                  className="
                    h-2 rounded-full
                    bg-[#2563EB]
                    transition-all
                  "
                  style={{
                    width: `${percentComplete}%`,
                  }}
                />
              </div>

              <span
                className="
                  text-sm font-bold
                  text-[#2563EB]
                "
              >
                {percentComplete}%
              </span>
            </div>
          </div>

          {/* TREE */}
          <div className="px-6 py-8">
            <RoadmapTree
              nodes={roadmap.nodes}
              completedNodes={
                completedNodes
              }
              currentNode={
                currentNodeId
              }
              selectedNodeId={
                selectedNodeId
              }
              onNodeClick={(id) =>
                setSelectedNodeId(id)
              }
            />
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="
            w-[45%]
            overflow-y-auto
          "
        >
          <div
            className="
              sticky top-0
              h-[calc(100vh-64px)]
              overflow-y-auto
              p-6
            "
          >
            <NodeDetail
              node={selectedNode}
              completedNodes={
                completedNodes
              }
              currentNode={
                currentNodeId
              }
              isLoggedIn={
                isLoggedIn
              }
              isUpdating={
                isUpdating
              }
              onUpdateStatus={
                handleUpdateStatus
              }
            />
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="lg:hidden">
        {/* MOBILE HEADER */}
        <div
          className="
            sticky top-16 z-20
            border-b
            border-[var(--border)]
            bg-[var(--background)]
            px-4 py-4
          "
        >
          <Link
            href="/explore"
            className="
              mb-2 flex
              items-center gap-1
              text-sm
              text-[var(--text-muted)]
            "
          >
            <ChevronLeft size={16} />
            Kembali
          </Link>

          <h1
            className="
              text-lg font-bold
              text-[var(--text-primary)]
            "
          >
            {roadmap.title}
          </h1>

          <div
            className="
              mt-3 flex
              items-center gap-3
            "
          >
            <span
              className="
                text-xs
                text-[var(--text-secondary)]
              "
            >
              {
                completedNodes.length
              }
              /
              {
                roadmap.totalNodes
              }{" "}
              materi
            </span>

            <div
              className="
                h-2 flex-1
                rounded-full
                bg-[var(--muted)]
              "
            >
              <div
                className="
                  h-2 rounded-full
                  bg-[#2563EB]
                "
                style={{
                  width: `${percentComplete}%`,
                }}
              />
            </div>

            <span
              className="
                text-xs font-bold
                text-[#2563EB]
              "
            >
              {percentComplete}%
            </span>
          </div>
        </div>

        {/* MOBILE TREE */}
        <div className="pb-32">
          <RoadmapTree
            nodes={roadmap.nodes}
            completedNodes={
              completedNodes
            }
            currentNode={
              currentNodeId
            }
            selectedNodeId={
              selectedNodeId
            }
            onNodeClick={(id) =>
              setSelectedNodeId(id)
            }
          />
        </div>

        {/* MOBILE DETAIL */}
        <div
          className={`
            fixed bottom-0 left-0 right-0 z-50
            max-h-[80vh]
            overflow-y-auto
            rounded-t-2xl
            border-t border-[var(--border)]
            bg-[var(--card)]
            transition-transform duration-300
            ${
              showMobileDetail
                ? "translate-y-0"
                : "translate-y-full"
            }
          `}
        >
          {/* HANDLE */}
          <div className="flex justify-center py-3">
            <div
              className="
                h-1.5 w-14
                rounded-full
                bg-[var(--border)]
              "
            />
          </div>

          <div className="px-5 pb-8">
            <NodeDetail
              node={selectedNode}
              completedNodes={
                completedNodes
              }
              currentNode={
                currentNodeId
              }
              isLoggedIn={
                isLoggedIn
              }
              isUpdating={
                isUpdating
              }
              onUpdateStatus={
                handleUpdateStatus
              }
            />
          </div>
        </div>
      </div>
    </>
  )
}