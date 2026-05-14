import { NextResponse } from "next/server"

import { z } from "zod"

import connectDB from "@/lib/mongodb"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),

  background: z
    .enum([
      "smk",
      "mahasiswa",
      "fresh-graduate",
      "umum",
    ])
    .optional(),

  interests: z.array(z.string()).optional(),

  targetCareer: z.string().optional(),

  hasCompletedOnboarding: z.boolean().optional(),

  bio: z.string().max(160).optional(),

  weeklyTarget: z.number().min(1).max(7).optional(),
})

export async function PATCH(request: Request) {
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

    const validated = UpdateProfileSchema.parse(body)

    await connectDB()

    const updatedUser = await User.findOneAndUpdate(
      {
        email: session.user.email,
      },

      validated,

      {
        new: true,
      }
    ).select("-password")

    return NextResponse.json(updatedUser)
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