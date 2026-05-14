import { NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

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

    const activities = progressList
      .flatMap((item) => item.activities)
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      )
      .slice(0, 50)

    const totalCompleted =
      progressList.reduce(
        (acc, item) =>
          acc + item.completedNodes.length,
        0
      )

    const activeRoadmaps =
      progressList.length

    return NextResponse.json({
      activities,

      totalCompleted,

      activeRoadmaps,
    })
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