import { NextResponse } from "next/server"

import connectDB from "@/lib/mongodb"

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
    }).select("-password")

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

    return NextResponse.json(user)
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