import { NextResponse } from "next/server"

import { z } from "zod"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import Roadmap from "@/models/Roadmap"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

const UpdateProgressSchema = z.object({
    nodeId: z.string(),

    status: z.enum([
        "learning",
        "completed",
    ]),
})

interface Props {
    params: Promise<{
        slug: string
    }>
}

export async function GET(
    _: Request,
    { params }: Props
) {
    try {
        const session = await getServerSession()

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            )
        }

        await connectDB()

        const user = await User.findOne({
            email: session.user.email,
        })

        if (!user) {
            return NextResponse.json(
                {
                    error: "User tidak ditemukan",
                },
                {
                    status: 404,
                }
            )
        }

        const { slug } = await params

        const progress = await Progress.findOne({
            userId: user._id,

            roadmapSlug: slug,
        })

        if (!progress) {
            return NextResponse.json(
                {
                    error: "Progress tidak ditemukan",
                },
                {
                    status: 404,
                }
            )
        }

        return NextResponse.json(progress)
    } catch {
        return NextResponse.json(
            {
                error: "Server error",
            },
            {
                status: 500,
            }
        )
    }
}

export async function PATCH(
    request: Request,
    { params }: Props
) {
    try {
        const session = await getServerSession()

        if (!session?.user?.email) {
            return NextResponse.json(
                {
                    error: "Unauthorized",
                },
                {
                    status: 401,
                }
            )
        }

        const body = await request.json()

        const validated =
            UpdateProgressSchema.parse(body)

        await connectDB()

        const user = await User.findOne({
            email: session.user.email,
        })

        if (!user) {
            return NextResponse.json(
                {
                    error: "User tidak ditemukan",
                },
                {
                    status: 404,
                }
            )
        }

        const { slug } = await params

        const progress = await Progress.findOne({
            userId: user._id,

            roadmapSlug: slug,
        })

        if (!progress) {
            return NextResponse.json(
                {
                    error: "Progress tidak ditemukan",
                },
                {
                    status: 404,
                }
            )
        }

        const roadmap = await Roadmap.findOne({
            slug,
        })

        if (!roadmap) {
            return NextResponse.json(
                {
                    error: "Roadmap tidak ditemukan",
                },
                {
                    status: 404,
                }
            )
        }

        if (validated.status === "learning") {
            progress.currentNode =
                validated.nodeId
        }

        if (validated.status === "completed") {
            if (
                !progress.completedNodes.includes(
                    validated.nodeId
                )
            ) {
                progress.completedNodes.push(
                    validated.nodeId
                )
            }

            const totalNodes =
                roadmap.nodes.length || 1

            progress.percentComplete = Math.round(
                (progress.completedNodes.length /
                    totalNodes) *
                100
            )

            const currentIndex = roadmap.nodes.findIndex(
                (node: { id: string; order: number }) =>
                    node.id === validated.nodeId
            )

            const nextNode =
                roadmap.nodes[currentIndex + 1]

            progress.currentNode =
                nextNode?.id ?? null

            if (
                progress.completedNodes.length >=
                totalNodes
            ) {
                progress.status = "completed"

                progress.currentNode = null
            }
        }

        const today = new Date()

        today.setHours(0, 0, 0, 0)

        const yesterday = new Date(today)

        yesterday.setDate(
            yesterday.getDate() - 1
        )

        if (!user.lastActiveDate) {
            user.streak = 1

            user.lastActiveDate = today
        } else {
            const lastDate = new Date(
                user.lastActiveDate
            )

            lastDate.setHours(0, 0, 0, 0)

            if (
                lastDate.getTime() !==
                today.getTime()
            ) {
                if (
                    lastDate.getTime() ===
                    yesterday.getTime()
                ) {
                    user.streak += 1
                } else {
                    user.streak = 1
                }

                user.lastActiveDate = today

                if (
                    user.streak >
                    user.longestStreak
                ) {
                    user.longestStreak =
                        user.streak
                }
            }
        }

        progress.activities.unshift({
            nodeId: validated.nodeId,

            nodeTitle: validated.nodeId,

            roadmapSlug: roadmap.slug,

            roadmapTitle: roadmap.title,

            status: validated.status,

            date: new Date(),
        })

        progress.lastUpdated = new Date()

        await progress.save()

        await user.save()

        return NextResponse.json(progress)
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    error: error.flatten(),
                },
                {
                    status: 400,
                }
            )
        }

        return NextResponse.json(
            {
                error: "Server error",
            },
            {
                status: 500,
            }
        )
    }
}