import { NextResponse } from "next/server"

import { z } from "zod"

import bcrypt from "bcryptjs"

import { headers } from "next/headers"

import { auth } from "@/lib/auth"

import connectDB from "@/lib/mongodb"

import User from "@/models/User"

const RegisterSchema = z.object({
  name: z.string().min(2),

  email: z.email(),

  password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password harus mengandung huruf dan angka"
    ),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const validated = RegisterSchema.parse(body)

    await connectDB()

    const existingUser = await User.findOne({
      email: validated.email,
    })

    if (existingUser) {
      return NextResponse.json(
        {
          error: "Email sudah terdaftar",
        },
        {
          status: 409,
        }
      )
    }

    const hashedPassword = await bcrypt.hash(
      validated.password,
      12
    )

    const user = await User.create({
      name: validated.name,

      email: validated.email,

      password: hashedPassword,

      provider: "credentials",
    })

    await auth.api.signUpEmail({
      body: {
        name: validated.name,
        email: validated.email,
        password: validated.password,
      },

      headers: await headers(),
    })

    return NextResponse.json(
      {
        message: "Berhasil",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    )
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
        error: "Terjadi kesalahan server",
      },
      {
        status: 500,
      }
    )
  }
}