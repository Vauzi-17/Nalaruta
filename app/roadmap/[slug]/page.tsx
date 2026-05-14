import { headers } from "next/headers"

import { notFound } from "next/navigation"

import Navbar from "@/components/layout/Navbar"

import RoadmapPageClient from "@/components/roadmap/RoadmapPageClient"

import { auth } from "@/lib/auth"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import Roadmap from "@/models/Roadmap"

import User from "@/models/User"

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function RoadmapPage({
  params,
}: Props) {
  const { slug } = await params

  const session =
    await auth.api.getSession({
      headers: await headers(),
    })

  await connectDB()

  const roadmap =
    await Roadmap.findOne({
      slug,
    })

  if (!roadmap) {
    notFound()
  }

  let userProgress = null

  if (session) {
    const user =
      await User.findOne({
        email: session.user.email,
      })

    userProgress =
      await Progress.findOne({
        userId: user._id,
        roadmapSlug: slug,
      })
  }

  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-[var(--background)]
          pt-16
        "
      >
        <RoadmapPageClient
          roadmap={JSON.parse(
            JSON.stringify(roadmap)
          )}
          initialProgress={
            userProgress
              ? JSON.parse(
                  JSON.stringify(
                    userProgress
                  )
                )
              : null
          }
          isLoggedIn={!!session}
        />
      </main>
    </>
  )
}