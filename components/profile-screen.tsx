"use client"

import Link from "next/link"
import { ArrowLeft, Award, Bell, ChevronRight, Flame, LogOut, Settings, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ProfileScreen() {
  return (
    <div className="container max-w-md space-y-6 p-4">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Your Profile</h1>
      </div>

      <Card className="border-2 border-primary/10">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-2xl">👤</div>
            <div>
              <CardTitle>Alex Johnson</CardTitle>
              <CardDescription>alex@example.com</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-amber-500" />
              <span className="font-medium">120 coins</span>
            </div>
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-amber-500" />
              <span className="font-medium">7 day streak</span>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Level Progress</span>
              <span className="font-medium">70%</span>
            </div>
            <Progress value={70} className="h-2" />
            <p className="text-xs text-muted-foreground">30 more coins to reach Level 2</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Your Badges</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="earned">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="earned">Earned (3)</TabsTrigger>
              <TabsTrigger value="locked">Locked (5)</TabsTrigger>
            </TabsList>
            <TabsContent value="earned" className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { emoji: "🔥", name: "5-Day Streak" },
                  { emoji: "🌱", name: "Growth Starter" },
                  { emoji: "🧠", name: "Mindfulness" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-lg bg-primary/5 p-3 text-center"
                  >
                    <div className="text-2xl">{badge.emoji}</div>
                    <div className="mt-1 text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="locked" className="mt-4">
              <div className="grid grid-cols-3 gap-2">
                {[
                  { emoji: "⭐", name: "10-Day Streak" },
                  { emoji: "🏆", name: "Champion" },
                  { emoji: "💎", name: "Consistency" },
                  { emoji: "🚀", name: "High Achiever" },
                  { emoji: "🌟", name: "Leadership" },
                ].map((badge, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3 text-center opacity-70"
                  >
                    <div className="text-2xl">{badge.emoji}</div>
                    <div className="mt-1 text-xs font-medium">{badge.name}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Nudge Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium">Categories</h4>
            <div className="grid grid-cols-2 gap-2">
              {[
                { name: "Leadership", icon: Star, active: true },
                { name: "Wellbeing", icon: Award, active: true },
                { name: "Productivity", icon: Flame, active: false },
                { name: "Growth", icon: Award, active: true },
              ].map((category, index) => {
                const Icon = category.icon
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-2 rounded-lg border p-2 ${
                      category.active ? "border-primary bg-primary/5" : "border-muted"
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${category.active ? "text-primary" : "text-muted-foreground"}`} />
                    <span className={`text-sm ${category.active ? "font-medium" : "text-muted-foreground"}`}>
                      {category.name}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Notifications</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Daily Nudge Reminder</span>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Streak Alerts</span>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between rounded-none p-4 text-left font-normal"
          >
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-muted-foreground" />
              <span>Account Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button
            variant="ghost"
            className="flex w-full items-center justify-between rounded-none p-4 text-left font-normal text-red-500 hover:text-red-600"
            asChild
          >
            <Link href="/">
              <div className="flex items-center gap-2">
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
