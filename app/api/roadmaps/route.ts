import { NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"

import Roadmap from "@/models/Roadmap"

export async function GET(request: Request) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const category = searchParams.get("category")

    const query = category
      ? { category }
      : {}

    const roadmaps = await Roadmap.find(query)
      .select(
        "slug title description category level estimatedWeeks totalNodes icon"
      )
      .lean()

    return NextResponse.json(roadmaps)
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