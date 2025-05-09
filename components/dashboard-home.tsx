"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Award, Flame, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Confetti } from "@/components/confetti"

export function DashboardHome() {
  const [showConfetti, setShowConfetti] = useState(false)
  const [coins, setCoins] = useState(120)
  const [streak, setStreak] = useState(7)
  const [completed, setCompleted] = useState(false)

  const handleComplete = () => {
    if (!completed) {
      setCoins(coins + 20)
      setStreak(streak + 1)
      setCompleted(true)
      setShowConfetti(true)

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }

  return (
    <div className="container max-w-md space-y-6 p-4">
      {showConfetti && <Confetti />}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Hey, Alex! 👋</h1>
          <p className="text-muted-foreground">Here's your daily growth nudge</p>
        </div>
        <div className="flex items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-amber-700">
          <Award className="h-4 w-4" />
          <span className="font-medium">{coins}</span>
        </div>
      </div>

      <Card className="overflow-hidden border-2 border-primary/10">
        <div className="relative h-2 bg-primary/10">
          <div className="absolute left-0 top-0 h-full w-[70%] bg-primary" />
        </div>
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Daily Streak</CardTitle>
            <div className="flex items-center gap-1 text-amber-500">
              <Flame className="h-4 w-4" />
              <span className="font-bold">{streak} days</span>
            </div>
          </div>
          <Progress value={70} className="h-2" />
          <CardDescription className="text-xs">3 more days to unlock a new badge!</CardDescription>
        </CardHeader>
      </Card>

      <Card className="border-2 border-primary/10">
        <CardHeader className="space-y-1 pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today's Nudge</CardTitle>
            <div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Leadership</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pb-2">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary/5 p-6 text-center">
            <div className="text-4xl">🌟</div>
            <h3 className="text-xl font-bold">Practice active listening today</h3>
            <p className="text-muted-foreground">
              In your next conversation, focus entirely on understanding the other person before responding.
            </p>
          </div>

          {completed ? (
            <div className="rounded-lg bg-green-50 p-4 text-center text-green-700">
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Completed! +20 coins earned</span>
              </div>
            </div>
          ) : (
            <Button className="w-full" onClick={handleComplete}>
              Mark as Done
            </Button>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="ghost" className="w-full justify-between" asChild>
            <Link href="/dashboard/nudge">
              <span>View Details & Reflect</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <Card className="border-2 border-primary/10">
        <CardHeader className="space-y-1 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Coming Up Tomorrow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-3 rounded-lg bg-primary/5 p-3">
            <div className="text-2xl">🧠</div>
            <div>
              <h4 className="font-medium">Mystery Nudge</h4>
              <p className="text-xs text-muted-foreground">Complete for 2x coins!</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-2 border-primary/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 text-xs" asChild>
            <Link href="/dashboard/history">View All</Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {[
            { emoji: "🌱", title: "Practiced gratitude", date: "Yesterday" },
            { emoji: "💪", title: "Set clear boundaries", date: "2 days ago" },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 rounded-lg p-3 hover:bg-primary/5">
              <div className="text-2xl">{item.emoji}</div>
              <div className="flex-1">
                <h4 className="font-medium">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
