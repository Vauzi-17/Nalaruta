import { NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"

import Roadmap from "@/models/Roadmap"

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
    await connectDB()

    const { slug } = await params

    const roadmap = await Roadmap.findOne({
      slug,
    }).lean()

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

    return NextResponse.json(roadmap)
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