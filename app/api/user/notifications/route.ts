import { NextResponse } from "next/server"

import { z } from "zod"

import connectDB from "@/lib/mongodb"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

const NotificationSchema = z.object({
  notificationSettings: z.object({
    weeklyReminder: z.boolean(),

    achievements: z.boolean(),

    tips: z.boolean(),

    updates: z.boolean(),
  }),
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

    const validated = NotificationSchema.parse(body)

    await connectDB()

    await User.findOneAndUpdate(
      {
        email: session.user.email,
      },

      {
        notificationSettings:
          validated.notificationSettings,
      }
    )

    return NextResponse.json({
      message: "Tersimpan",
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