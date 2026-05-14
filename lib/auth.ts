import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"

import { MongoClient } from "mongodb"

import bcrypt from "bcryptjs"

const client = new MongoClient(process.env.MONGODB_URI!)

const db = client.db()

export const auth = betterAuth({
  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,

    async hashPassword(password: string) {
      return bcrypt.hash(password, 12)
    },

    async verifyPassword({
      password,
      hash,
    }: {
      password: string
      hash: string
    }) {
      return bcrypt.compare(password, hash)
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },

  secret: process.env.BETTER_AUTH_SECRET!,

  baseURL: process.env.BETTER_AUTH_URL!,
})

export type Session = typeof auth.$Infer.Session