import { NextResponse } from "next/server"

import bcrypt from "bcryptjs"

import { z } from "zod"

import connectDB from "@/lib/mongodb"

import User from "@/models/User"

import { getServerSession } from "@/lib/get-session"

const PasswordSchema = z.object({
  oldPassword: z.string(),

  newPassword: z
    .string()
    .min(8)
    .regex(/^(?=.*[A-Za-z])(?=.*\d).+$/),
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

    const validated = PasswordSchema.parse(body)

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

    if (user.provider !== "credentials") {
      return NextResponse.json(
        {
          error: "Password tidak tersedia untuk OAuth",
        },
        {
          status: 400,
        }
      )
    }

    const isMatch = await bcrypt.compare(
      validated.oldPassword,
      user.password
    )

    if (!isMatch) {
      return NextResponse.json(
        {
          error: "Password lama salah",
        },
        {
          status: 400,
        }
      )
    }

    const hashed = await bcrypt.hash(
      validated.newPassword,
      12
    )

    user.password = hashed

    await user.save()

    return NextResponse.json({
      message: "Password berhasil diubah",
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