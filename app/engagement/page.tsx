"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Gift, BookOpen, Target, Sparkles, Award } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { SurpriseBox } from "@/components/gamification/surprise-box"
import { UnlockableContent } from "@/components/content/unlockable-content"
import { JourneyMap } from "@/components/content/journey-map"
import { WeeklyChallenges } from "@/components/gamification/weekly-challenges"

export default function EngagementPage() {
  const [activeTab, setActiveTab] = useState("challenges")
  const [showSurpriseBoxDemo, setShowSurpriseBoxDemo] = useState(false)
  const { level, showSurpriseBox, setShowSurpriseBox, surpriseBoxTrigger, surpriseBoxLevel } = useGamification()

  // Show the surprise box if triggered from context
  useEffect(() => {
    if (showSurpriseBox) {
      // Auto-hide after 10 seconds if not interacted with
      const timer = setTimeout(() => {
        setShowSurpriseBox(false)
      }, 10000)

      return () => clearTimeout(timer)
    }
  }, [showSurpriseBox, setShowSurpriseBox])

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leadership Engagement</h1>
          <p className="text-muted-foreground">Challenges, rewards, and content to boost your leadership skills</p>
        </div>
        <Button onClick={() => setShowSurpriseBoxDemo(true)} className="mt-4 md:mt-0 flex items-center gap-2">
          <Gift className="h-4 w-4" />
          Open Mystery Box
        </Button>
      </div>

      <Tabs defaultValue="challenges" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="challenges" className="flex items-center gap-1">
            <Target className="h-4 w-4" />
            Weekly Challenges
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            Leadership Content
          </TabsTrigger>
          <TabsTrigger value="journey" className="flex items-center gap-1">
            <Sparkles className="h-4 w-4" />
            Your Journey
          </TabsTrigger>
        </TabsList>

        <TabsContent value="challenges">
          <WeeklyChallenges />
        </TabsContent>

        <TabsContent value="content">
          <UnlockableContent />
        </TabsContent>

        <TabsContent value="journey">
          <div className="grid gap-4 md:grid-cols-2">
            <JourneyMap />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="h-5 w-5 text-primary" />
                  Surprise Rewards
                </CardTitle>
                <CardDescription>Complete challenges and maintain streaks to earn surprise rewards</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Mystery boxes contain various rewards like coins, XP, badges, and special power-ups. They appear
                  randomly as you engage with the platform.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium">Streak Milestones</p>
                      <p className="text-sm text-muted-foreground">
                        Earn mystery boxes at 7, 14, 21, and 30-day streaks
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium">Challenge Completion</p>
                      <p className="text-sm text-muted-foreground">
                        Complete weekly challenges for a chance to earn mystery boxes
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                    <div>
                      <p className="font-medium">Level Up Rewards</p>
                      <p className="text-sm text-muted-foreground">
                        Earn a guaranteed mystery box every time you level up
                      </p>
                    </div>
                    <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <Award className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </div>

                <Button onClick={() => setShowSurpriseBoxDemo(true)} className="w-full mt-4">
                  Try a Mystery Box
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Surprise Box Demo */}
      <SurpriseBox open={showSurpriseBoxDemo} onOpenChange={setShowSurpriseBoxDemo} trigger="challenge" level={level} />

      {/* Real Surprise Box from context */}
      <SurpriseBox
        open={showSurpriseBox}
        onOpenChange={setShowSurpriseBox}
        trigger={surpriseBoxTrigger}
        level={surpriseBoxLevel}
      />
    </MainLayout>
  )
}
