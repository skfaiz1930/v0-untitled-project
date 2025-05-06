"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Calendar, Clock, Coins, Award } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"

// Mock challenge data
const mockChallenges = [
  {
    id: "challenge-1",
    title: "Communication Master",
    description: "Complete 3 communication-related nudges this week",
    reward: {
      coins: 100,
      xp: 150,
      badge: "Communication Expert",
    },
    startDate: "May 1, 2023",
    endDate: "May 7, 2023",
    progress: 2,
    total: 3,
    category: "active",
  },
  {
    id: "challenge-2",
    title: "Team Builder",
    description: "Tag at least 5 different team members in nudges",
    reward: {
      coins: 150,
      xp: 200,
      badge: "Team Builder",
    },
    startDate: "May 1, 2023",
    endDate: "May 14, 2023",
    progress: 3,
    total: 5,
    category: "active",
  },
  {
    id: "challenge-3",
    title: "Feedback Champion",
    description: "Give and receive feedback from at least 3 team members",
    reward: {
      coins: 120,
      xp: 180,
    },
    startDate: "May 8, 2023",
    endDate: "May 21, 2023",
    progress: 0,
    total: 3,
    category: "upcoming",
  },
  {
    id: "challenge-4",
    title: "Delegation Expert",
    description: "Complete all delegation-related nudges",
    reward: {
      coins: 200,
      xp: 250,
      badge: "Delegation Master",
    },
    startDate: "April 15, 2023",
    endDate: "April 30, 2023",
    progress: 4,
    total: 4,
    category: "completed",
  },
]

export function LeadershipChallenge() {
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "completed">("active")
  const [challenges, setChallenges] = useState(mockChallenges)
  const { addCoins, addXp, earnBadge } = useGamification()

  const handleClaimReward = (challengeId: string) => {
    const challenge = challenges.find((c) => c.id === challengeId)
    if (!challenge) return

    // Add coins and XP
    addCoins(challenge.reward.coins)
    addXp(challenge.reward.xp)

    // Award badge if applicable
    if (challenge.reward.badge) {
      // This is a mock implementation - in a real app, you'd map the badge name to an ID
      const badgeId = challenge.id === "challenge-4" ? "badge-6" : "badge-8"
      earnBadge(badgeId)
    }

    // Mark challenge as claimed
    setChallenges(
      challenges.map((c) =>
        c.id === challengeId
          ? {
              ...c,
              claimed: true,
            }
          : c,
      ),
    )
  }

  const filteredChallenges = challenges.filter((challenge) => challenge.category === activeTab)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Leadership Challenges
        </CardTitle>
        <CardDescription>Complete challenges to earn special rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Button
            variant={activeTab === "active" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("active")}
          >
            Active
          </Button>
          <Button
            variant={activeTab === "upcoming" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            variant={activeTab === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </Button>
        </div>

        <div className="space-y-4">
          {filteredChallenges.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No {activeTab} challenges at the moment</div>
          ) : (
            filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className={`border rounded-lg p-4 ${
                  challenge.category === "completed" && challenge.claimed ? "bg-muted/50" : ""
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{challenge.title}</h3>
                  {challenge.category === "active" && (
                    <Badge variant="outline" className="text-xs">
                      <Clock className="h-3 w-3 mr-1" />
                      {challenge.endDate}
                    </Badge>
                  )}
                  {challenge.category === "upcoming" && (
                    <Badge variant="outline" className="text-xs">
                      <Calendar className="h-3 w-3 mr-1" />
                      Starts {challenge.startDate}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-muted-foreground mb-3">{challenge.description}</p>

                {challenge.category !== "upcoming" && (
                  <>
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span>Progress</span>
                      <span>
                        {challenge.progress}/{challenge.total}
                      </span>
                    </div>
                    <Progress value={(challenge.progress / challenge.total) * 100} className="h-2 mb-3" />
                  </>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  <div className="flex items-center bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full px-3 py-1 text-xs">
                    <Coins className="h-3 w-3 mr-1" />
                    {challenge.reward.coins} coins
                  </div>
                  <div className="flex items-center bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full px-3 py-1 text-xs">
                    <Award className="h-3 w-3 mr-1" />
                    {challenge.reward.xp} XP
                  </div>
                  {challenge.reward.badge && (
                    <div className="flex items-center bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full px-3 py-1 text-xs">
                      <Trophy className="h-3 w-3 mr-1" />
                      {challenge.reward.badge} Badge
                    </div>
                  )}
                </div>

                {challenge.category === "completed" && challenge.progress === challenge.total && !challenge.claimed && (
                  <Button className="w-full mt-3" size="sm" onClick={() => handleClaimReward(challenge.id)}>
                    Claim Reward
                  </Button>
                )}

                {challenge.category === "completed" && challenge.claimed && (
                  <div className="text-center text-sm text-muted-foreground mt-3">Reward claimed</div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center border-t pt-4">
        <Button variant="outline" size="sm">
          View All Challenges
        </Button>
      </CardFooter>
    </Card>
  )
}
