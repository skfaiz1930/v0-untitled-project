"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Flame, Calendar, CheckCircle, Trophy, Sparkles, ArrowRight } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { CoinDisplay } from "../gamification/coin-display"

export function WelcomeScreen() {
  const [open, setOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("today")
  const { streak, coins, level, levelInfo, xp } = useGamification()

  // Show welcome screen on page load
  useEffect(() => {
    const hasSeenWelcomeToday = localStorage.getItem("welcomeScreenShown") === new Date().toDateString()

    if (!hasSeenWelcomeToday) {
      const timer = setTimeout(() => {
        setOpen(true)
        localStorage.setItem("welcomeScreenShown", new Date().toDateString())
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [])

  // Mock data for suggested actions
  const suggestedActions = [
    {
      id: "action-1",
      title: "Complete today's nudge",
      description: "Recognize a team member for their recent work",
      icon: <CheckCircle className="h-5 w-5 text-green-500" />,
      link: "/nudges",
    },
    {
      id: "action-2",
      title: "Check team insights",
      description: "Review your team's engagement metrics",
      icon: <Trophy className="h-5 w-5 text-blue-500" />,
      link: "/team",
    },
    {
      id: "action-3",
      title: "Claim daily reward",
      description: "Get your daily login bonus",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      link: "/dashboard",
    },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: "event-1",
      title: "Leadership Challenge",
      description: "New challenge starts in 2 days",
      date: "May 8, 2023",
    },
    {
      id: "event-2",
      title: "Team Survey Results",
      description: "Results will be available tomorrow",
      date: "May 6, 2023",
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome back!</DialogTitle>
          <DialogDescription>
            Here's your leadership dashboard for{" "}
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="today" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="stats">Your Stats</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="today" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-orange-500" />
                      <span className="font-medium">Current Streak</span>
                    </div>
                    <span className="text-2xl font-bold">{streak.current} days</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Keep your streak going by completing today's nudge!</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-yellow-500" />
                      <span className="font-medium">Your Balance</span>
                    </div>
                    <CoinDisplay coins={coins} />
                  </div>
                  <p className="text-sm text-muted-foreground">Use coins to unlock premium nudges and features</p>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Suggested Actions</h3>
              <div className="space-y-2">
                {suggestedActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                        {action.icon}
                      </div>
                      <div>
                        <p className="font-medium">{action.title}</p>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={action.link}>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">Level {level}</h3>
                  <span className="text-sm text-muted-foreground">
                    {xp} / {levelInfo.maxXp} XP
                  </span>
                </div>
                <Progress value={levelInfo.progress} className="h-2" />
                <p className="text-sm text-muted-foreground mt-2">
                  {levelInfo.title} - {levelInfo.maxXp - xp} XP until next level
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="font-medium">Completed Nudges</span>
                      </div>
                      <span className="text-2xl font-bold">23</span>
                    </div>
                    <p className="text-sm text-muted-foreground">You've completed 4 nudges this week</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-amber-500" />
                        <span className="font-medium">Badges Earned</span>
                      </div>
                      <span className="text-2xl font-bold">4</span>
                    </div>
                    <p className="text-sm text-muted-foreground">You're making great progress!</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="upcoming">
            <div className="space-y-4">
              <h3 className="font-medium">Upcoming Events</h3>
              {upcomingEvents.map((event) => (
                <div key={event.id} className="p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium">{event.title}</p>
                    <span className="text-sm text-muted-foreground">{event.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                </div>
              ))}

              <div className="p-4 rounded-lg bg-primary/10 mt-4">
                <h3 className="font-medium mb-2">Leadership Challenge of the Week</h3>
                <p className="text-sm mb-3">Complete 5 nudges this week to earn a special badge and 100 bonus coins!</p>
                <Progress value={80} className="h-2 mb-2" />
                <p className="text-sm text-right">4/5 completed</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Get Started</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
