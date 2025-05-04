"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Award, Calendar, CheckCircle, Clock, TrendingUp, Users, ArrowRight } from "lucide-react"
import { mockUserData } from "@/lib/mock-data"

export default function Dashboard() {
  const router = useRouter()
  const [userData, setUserData] = useState(mockUserData)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const goToNudges = () => {
    router.push("/nudges")
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Welcome back, {userData.name}</h1>
            <p className="text-muted-foreground">Here's your leadership progress for today</p>
          </div>
          <Button onClick={goToNudges} className="mt-4 md:mt-0">
            Today's Nudge <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.currentStreak} days</div>
              <p className="text-xs text-muted-foreground">
                {userData.currentStreak === userData.longestStreak
                  ? "This is your longest streak!"
                  : `Longest streak: ${userData.longestStreak} days`}
              </p>
              <Progress value={(userData.currentStreak / 7) * 100} className="h-2 mt-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {7 - userData.currentStreak} more days to unlock a new badge
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Nudges</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.completedNudges}</div>
              <p className="text-xs text-muted-foreground">
                {userData.completedNudges > 0 ? `+${userData.completedThisWeek} this week` : "No nudges completed yet"}
              </p>
              <Progress value={(userData.completedNudges % 10) * 10} className="h-2 mt-3" />
              <p className="text-xs text-muted-foreground mt-1">
                {10 - (userData.completedNudges % 10)} more to next milestone
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Leaderboard Rank</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#{userData.rank}</div>
              <p className="text-xs text-muted-foreground">
                {userData.rankChange < 0
                  ? `Moved up ${Math.abs(userData.rankChange)} positions`
                  : userData.rankChange > 0
                    ? `Moved down ${userData.rankChange} positions`
                    : "No change in rank"}
              </p>
              <div className="flex items-center mt-3">
                <div className="text-xs font-medium mr-2">Company Rank:</div>
                <Badge variant="secondary">#{userData.companyRank}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Badges Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.badges.length}</div>
              <p className="text-xs text-muted-foreground">
                {userData.badges.length > 0
                  ? `Latest: ${userData.badges[userData.badges.length - 1].name}`
                  : "No badges earned yet"}
              </p>
              <div className="flex flex-wrap gap-1 mt-3">
                {userData.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="bg-primary/10">
                    {badge.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">
                      {activity.type === "nudge_completed" && <CheckCircle className="h-5 w-5 text-green-500" />}
                      {activity.type === "badge_earned" && <Award className="h-5 w-5 text-amber-500" />}
                      {activity.type === "streak_milestone" && <Calendar className="h-5 w-5 text-blue-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userData.teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Tag in nudge
                    </Button>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4">
                Manage Team
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Upcoming Nudges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.upcomingNudges.map((nudge, index) => (
                <div key={index} className="flex items-start justify-between">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{nudge.title}</p>
                      <p className="text-xs text-muted-foreground">{nudge.description}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{nudge.date}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
