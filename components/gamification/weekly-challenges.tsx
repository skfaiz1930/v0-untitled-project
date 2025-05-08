"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, CheckCircle, Clock, Award, Users, MessageSquare, Target, Zap, Coins } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { useToast } from "@/hooks/use-toast"

// Mock weekly challenges
const mockWeeklyChallenges = [
  {
    id: "weekly-1",
    title: "Feedback Champion",
    description: "Give feedback to 3 team members this week",
    progress: 1,
    total: 3,
    daysLeft: 5,
    rewards: {
      coins: 50,
      xp: 75,
    },
    category: "feedback",
    completed: false,
  },
  {
    id: "weekly-2",
    title: "Team Engagement",
    description: "Complete 5 nudges this week",
    progress: 3,
    total: 5,
    daysLeft: 5,
    rewards: {
      coins: 75,
      xp: 100,
    },
    category: "engagement",
    completed: false,
  },
  {
    id: "weekly-3",
    title: "Communication Master",
    description: "Complete 3 communication-related nudges",
    progress: 0,
    total: 3,
    daysLeft: 5,
    rewards: {
      coins: 60,
      xp: 90,
      badge: "Communication Expert",
    },
    category: "communication",
    completed: false,
  },
  {
    id: "weekly-4",
    title: "Perfect Streak",
    description: "Maintain your streak for the entire week",
    progress: 2,
    total: 7,
    daysLeft: 5,
    rewards: {
      coins: 100,
      xp: 150,
    },
    category: "streak",
    completed: false,
  },
]

export function WeeklyChallenges() {
  const [challenges, setChallenges] = useState(mockWeeklyChallenges)
  const [activeTab, setActiveTab] = useState<"all" | "in-progress" | "completed">("all")
  const { addCoins, addXp, earnBadge } = useGamification()
  const { toast } = useToast()

  const filteredChallenges = challenges.filter((challenge) => {
    if (activeTab === "in-progress") return !challenge.completed
    if (activeTab === "completed") return challenge.completed
    return true
  })

  const handleProgressUpdate = (challengeId: string) => {
    setChallenges(
      challenges.map((challenge) => {
        if (challenge.id === challengeId && challenge.progress < challenge.total) {
          const newProgress = challenge.progress + 1
          const isNowCompleted = newProgress >= challenge.total

          // Show toast for progress
          toast({
            title: isNowCompleted ? "Challenge Completed!" : "Challenge Progress Updated",
            description: isNowCompleted
              ? `You've completed the "${challenge.title}" challenge!`
              : `Progress: ${newProgress}/${challenge.total}`,
          })

          // Award rewards if completed
          if (isNowCompleted) {
            addCoins(challenge.rewards.coins)
            addXp(challenge.rewards.xp)
            if (challenge.rewards.badge) {
              earnBadge("badge-communication") // Use a predefined badge ID
            }
          }

          return {
            ...challenge,
            progress: newProgress,
            completed: isNowCompleted,
          }
        }
        return challenge
      }),
    )
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "feedback":
        return <MessageSquare className="h-4 w-4" />
      case "engagement":
        return <Zap className="h-4 w-4" />
      case "communication":
        return <Users className="h-4 w-4" />
      case "streak":
        return <Target className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-primary" />
          Weekly Challenges
        </CardTitle>
        <CardDescription>Complete challenges to earn rewards and improve your leadership skills</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Challenges</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              {filteredChallenges.map((challenge) => (
                <div key={challenge.id} className={`border rounded-lg p-4 ${challenge.completed ? "bg-muted/50" : ""}`}>
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`p-2 rounded-full ${
                          challenge.completed
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        {challenge.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : (
                          getCategoryIcon(challenge.category)
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{challenge.title}</h3>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                    {!challenge.completed && (
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {challenge.daysLeft} days left
                      </Badge>
                    )}
                  </div>

                  {!challenge.completed && (
                    <div className="mt-3">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>
                          {challenge.progress}/{challenge.total}
                        </span>
                      </div>
                      <Progress value={(challenge.progress / challenge.total) * 100} className="h-2 mb-3" />
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 mt-3">
                    <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full px-3 py-1 text-xs">
                      <Coins className="h-3 w-3 mr-1" />
                      {challenge.rewards.coins} coins
                    </div>
                    <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full px-3 py-1 text-xs">
                      <Award className="h-3 w-3 mr-1" />
                      {challenge.rewards.xp} XP
                    </div>
                    {challenge.rewards.badge && (
                      <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full px-3 py-1 text-xs">
                        <Award className="h-3 w-3 mr-1" />
                        {challenge.rewards.badge} Badge
                      </div>
                    )}
                  </div>

                  {!challenge.completed && (
                    <Button
                      className="w-full mt-3"
                      size="sm"
                      variant="outline"
                      onClick={() => handleProgressUpdate(challenge.id)}
                    >
                      Update Progress
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          View All Challenges
        </Button>
      </CardFooter>
    </Card>
  )
}
