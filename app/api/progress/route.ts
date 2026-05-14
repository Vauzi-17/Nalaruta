import { NextResponse } from "next/server"

import { z } from "zod"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import Roadmap from "@/models/Roadmap"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

const CreateProgressSchema = z.object({
  roadmapSlug: z.string(),
})

export async function GET() {
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

    const progressList = await Progress.find({
      userId: user._id,
    }).lean()

    const formatted = progressList.map((item) => ({
      ...item,

      percentComplete:
        item.percentComplete ?? 0,
    }))

    return NextResponse.json(formatted)
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

export async function POST(request: Request) {
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
      CreateProgressSchema.parse(body)

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

    const existing = await Progress.findOne({
      userId: user._id,

      roadmapSlug: validated.roadmapSlug,
    })

    if (existing) {
      return NextResponse.json(existing)
    }

    const roadmap = await Roadmap.findOne({
      slug: validated.roadmapSlug,
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

    const firstNode =
      roadmap.nodes?.[0]?.id ?? null

    const progress = await Progress.create({
      userId: user._id,

      roadmapSlug: roadmap.slug,

      roadmapTitle: roadmap.title,

      currentNode: firstNode,
    })

    return NextResponse.json(progress, {
      status: 201,
    })
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