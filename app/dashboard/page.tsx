import { headers } from "next/headers"

import { redirect } from "next/navigation"

import ActivityFeed from "@/components/dashboard/ActivityFeed"

import ActiveRoadmapCard from "@/components/dashboard/ActiveRoadmapCard"

import RoadmapRecommendation from "@/components/dashboard/RoadmapRecommendation"

import WeeklyGoal from "@/components/dashboard/WeeklyGoal"

import WelcomeBanner from "@/components/dashboard/WelcomeBanner"

import DashboardLayout from "@/components/layout/DashboardLayout"

import { auth } from "@/lib/auth"

import connectDB from "@/lib/mongodb"

import Progress from "@/models/Progress"

import Roadmap from "@/models/Roadmap"

import User from "@/models/User"

export default async function DashboardPage() {
  const session =
    await auth.api.getSession({
      headers: await headers(),
    })

  if (!session) {
    redirect("/login")
  }

  await connectDB()

  const user = await User.findOne({
    email: session.user.email,
  })

  if (
    user.hasCompletedOnboarding ===
    false
  ) {
    redirect("/onboarding")
  }

  const progressList =
    await Progress.find({
      userId: user._id,
    })

  const roadmaps =
    await Roadmap.find()
      .select(
        "slug title level estimatedWeeks icon"
      )
      .lean()

  const activeProgress =
    progressList.find(
      (p) => p.status === "active"
    )

  const totalCompleted =
    progressList.reduce(
      (sum, p) =>
        sum + p.completedNodes.length,
      0
    )

  const recentActivities =
    progressList
      .flatMap((p) => p.activities)
      .sort(
        (a, b) =>
          new Date(
            b.date
          ).getTime() -
          new Date(
            a.date
          ).getTime()
      )
      .slice(0, 5)

  const now = new Date()

  const monday = new Date(now)

  monday.setDate(
    now.getDate() -
      ((now.getDay() + 6) % 7)
  )

  monday.setHours(0, 0, 0, 0)

  const weekDays = Array(7).fill(false)

  progressList.forEach((progress) => {
    progress.activities.forEach(
      (activity: any) => {
        const activityDate =
          new Date(activity.date)

        const diffDays =
          Math.floor(
            (activityDate.getTime() -
              monday.getTime()) /
              (1000 *
                60 *
                60 *
                24)
          )

        if (
          diffDays >= 0 &&
          diffDays < 7
        ) {
          weekDays[diffDays] = true
        }
      }
    )
  })

  const completedThisWeek =
    weekDays.filter(Boolean).length

  const recommendations =
    roadmaps
      .filter(
        (roadmap: any) =>
          !progressList.find(
            (p) =>
              p.roadmapSlug ===
              roadmap.slug
          )
      )
      .slice(0, 3)

  const activeRoadmapData =
    activeProgress
      ? {
          ...activeProgress.toObject(),

          roadmapTitle:
            activeProgress.roadmapTitle,

          level:
            roadmaps.find(
              (r: any) =>
                r.slug ===
                activeProgress.roadmapSlug
            )?.level,

          estimatedWeeks:
            roadmaps.find(
              (r: any) =>
                r.slug ===
                activeProgress.roadmapSlug
            )?.estimatedWeeks,
        }
      : null

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <WelcomeBanner
          userName={user.name}
          streak={user.streak}
          totalCompleted={
            totalCompleted
          }
          activeRoadmaps={
            progressList.length
          }
        />

        <ActiveRoadmapCard
          progress={activeRoadmapData}
        />

        <div
          className="
            grid grid-cols-1 gap-6
            md:grid-cols-2
          "
        >
          <WeeklyGoal
            completedThisWeek={
              completedThisWeek
            }
            target={user.weeklyTarget}
            weekDays={weekDays}
          />

          <ActivityFeed
            activities={
              recentActivities
            }
          />
        </div>

        <RoadmapRecommendation
          roadmaps={recommendations}
        />
      </div>
    </DashboardLayout>
  )
}