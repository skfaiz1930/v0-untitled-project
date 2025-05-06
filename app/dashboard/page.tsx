"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Award, Calendar, Flame, Sparkles } from "lucide-react"
import { mockUserData, mockNudges } from "@/lib/mock-data"
import { useGamification } from "@/contexts/gamification-context"
import { CoinDisplay } from "@/components/gamification/coin-display"
import { BadgesCollection } from "@/components/gamification/badges-collection"
import { PeerActivityFeed } from "@/components/nudges/peer-activity-feed"
import { WelcomeScreen } from "@/components/dashboard/welcome-screen"
import { PersonalizationPopup } from "@/components/onboarding/personalization-popup"
import { LeadershipChallenge } from "@/components/gamification/leadership-challenge"

export default function DashboardPage() {
  const [userData] = useState(mockUserData)
  const [nudges] = useState(mockNudges)
  const { streak, coins, level, levelInfo, badges } = useGamification()

  const completedNudges = nudges.filter((nudge) => nudge.completed)
  const pendingNudges = nudges.filter((nudge) => !nudge.completed)
  const earnedBadges = badges.filter((badge) => badge.earned)

  // Declare xp here
  const xp = userData.xp || 0

  return (
    <MainLayout>
      {/* Welcome Screen */}
      <WelcomeScreen />

      {/* Personalization Popup */}
      <PersonalizationPopup />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leadership Level</CardTitle>
            <Sparkles className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold">Level {level}</div>
                <p className="text-xs text-muted-foreground">{levelInfo.title}</p>
              </div>
              <div className="flex items-center gap-2">
                <CoinDisplay coins={coins} />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Progress to Level {level + 1}</span>
                <span>
                  {xp}/{levelInfo.maxXp} XP
                </span>
              </div>
              <Progress value={levelInfo.progress} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
            <Flame className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <div className="text-2xl font-bold">{streak.current} days</div>
              {streak.current > 0 && (
                <Badge variant="outline" className="text-xs">
                  <Flame className="h-3 w-3 mr-1 text-orange-500" />
                  Active
                </Badge>
              )}
            </div>
            <p className="text-xs text-muted-foreground">Longest streak: {streak.longest} days</p>
            <div className="mt-4 grid grid-cols-7 gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className={`h-2 rounded-full ${i < streak.current % 7 ? "bg-primary" : "bg-muted"}`} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nudges Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.completedNudges}</div>
            <p className="text-xs text-muted-foreground">{userData.completedThisWeek} completed this week</p>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Weekly Goal</span>
                <span>{userData.completedThisWeek}/5 nudges</span>
              </div>
              <Progress value={(userData.completedThisWeek / 5) * 100} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your leadership journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 rounded-md border p-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    {activity.type === "nudge_completed" && <CheckCircle className="h-4 w-4 text-primary" />}
                    {activity.type === "badge_earned" && <Award className="h-4 w-4 text-amber-500" />}
                    {activity.type === "streak_milestone" && <Flame className="h-4 w-4 text-orange-500" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.description}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Nudges</CardTitle>
            <CardDescription>Scheduled for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.upcomingNudges.map((nudge) => (
                <div key={nudge.id} className="flex items-start space-x-4 rounded-md border p-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{nudge.title}</p>
                    <p className="text-sm text-muted-foreground">{nudge.description}</p>
                    <div className="flex items-center pt-2">
                      <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{nudge.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Your Badges</CardTitle>
            <CardDescription>
              You've earned {earnedBadges.length} out of {badges.length} badges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BadgesCollection badges={badges} />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <LeadershipChallenge />
        </Card>

        <Card className="lg:col-span-1">
          <PeerActivityFeed />
        </Card>
      </div>
    </MainLayout>
  )
}
