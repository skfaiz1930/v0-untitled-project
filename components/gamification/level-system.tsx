"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Award, Zap, Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useGamification } from "@/contexts/gamification-context"

interface LevelReward {
  type: "coins" | "badge" | "feature"
  value: number | string
  description: string
}

interface LevelInfo {
  level: number
  title: string
  minXp: number
  maxXp: number
  rewards: LevelReward[]
}

const levelData: LevelInfo[] = [
  {
    level: 1,
    title: "Novice Leader",
    minXp: 0,
    maxXp: 100,
    rewards: [
      { type: "coins", value: 50, description: "Welcome bonus" },
      { type: "feature", value: "Basic Nudges", description: "Access to basic leadership nudges" },
    ],
  },
  {
    level: 2,
    title: "Emerging Leader",
    minXp: 100,
    maxXp: 250,
    rewards: [
      { type: "coins", value: 100, description: "Level up bonus" },
      { type: "badge", value: "Emerging Leader", description: "Earned the Emerging Leader badge" },
    ],
  },
  {
    level: 3,
    title: "Developing Leader",
    minXp: 250,
    maxXp: 500,
    rewards: [
      { type: "coins", value: 150, description: "Level up bonus" },
      { type: "feature", value: "Team Insights", description: "Unlock basic team insights" },
    ],
  },
  {
    level: 4,
    title: "Established Leader",
    minXp: 500,
    maxXp: 1000,
    rewards: [
      { type: "coins", value: 200, description: "Level up bonus" },
      { type: "badge", value: "Established Leader", description: "Earned the Established Leader badge" },
    ],
  },
  {
    level: 5,
    title: "Skilled Leader",
    minXp: 1000,
    maxXp: 2000,
    rewards: [
      { type: "coins", value: 300, description: "Level up bonus" },
      { type: "feature", value: "Advanced Nudges", description: "Unlock advanced leadership nudges" },
    ],
  },
  {
    level: 6,
    title: "Advanced Leader",
    minXp: 2000,
    maxXp: 3500,
    rewards: [
      { type: "coins", value: 400, description: "Level up bonus" },
      { type: "badge", value: "Advanced Leader", description: "Earned the Advanced Leader badge" },
    ],
  },
  {
    level: 7,
    title: "Expert Leader",
    minXp: 3500,
    maxXp: 5500,
    rewards: [
      { type: "coins", value: 500, description: "Level up bonus" },
      { type: "feature", value: "Leadership Analytics", description: "Unlock leadership analytics" },
    ],
  },
  {
    level: 8,
    title: "Master Leader",
    minXp: 5500,
    maxXp: 8000,
    rewards: [
      { type: "coins", value: 750, description: "Level up bonus" },
      { type: "badge", value: "Master Leader", description: "Earned the Master Leader badge" },
    ],
  },
  {
    level: 9,
    title: "Distinguished Leader",
    minXp: 8000,
    maxXp: 12000,
    rewards: [
      { type: "coins", value: 1000, description: "Level up bonus" },
      { type: "feature", value: "Custom Nudges", description: "Create custom leadership nudges" },
    ],
  },
  {
    level: 10,
    title: "Legendary Leader",
    minXp: 12000,
    maxXp: 20000,
    rewards: [
      { type: "coins", value: 2000, description: "Level up bonus" },
      { type: "badge", value: "Legendary Leader", description: "Earned the Legendary Leader badge" },
      { type: "feature", value: "AI Coach", description: "Unlock personalized AI coaching" },
    ],
  },
]

export function LevelSystem() {
  const { addCoins, earnBadge } = useGamification()
  const [currentXp, setCurrentXp] = useState(490)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [nextLevel, setNextLevel] = useState<LevelInfo | null>(null)
  const [showLevelUp, setShowLevelUp] = useState(false)
  const [levelUpRewards, setLevelUpRewards] = useState<LevelReward[]>([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Find current level based on XP
    const level = levelData.findIndex((level) => currentXp >= level.minXp && currentXp < level.maxXp)

    if (level !== -1) {
      setCurrentLevel(level)
      setNextLevel(level < levelData.length - 1 ? levelData[level + 1] : null)
    }
  }, [currentXp])

  // Simulate gaining XP (in a real app, this would be triggered by actions)
  const gainXp = (amount: number) => {
    const oldXp = currentXp
    const newXp = oldXp + amount

    // Check if leveled up
    const oldLevel = levelData.findIndex((level) => oldXp >= level.minXp && oldXp < level.maxXp)

    const newLevel = levelData.findIndex((level) => newXp >= level.minXp && newXp < level.maxXp)

    setCurrentXp(newXp)

    // If leveled up, show level up animation and give rewards
    if (newLevel > oldLevel) {
      const levelInfo = levelData[newLevel]
      setLevelUpRewards(levelInfo.rewards)
      setShowLevelUp(true)

      // Process rewards
      levelInfo.rewards.forEach((reward) => {
        if (reward.type === "coins" && typeof reward.value === "number") {
          addCoins(reward.value)
        } else if (reward.type === "badge" && typeof reward.value === "string") {
          // This is a mock implementation - in a real app, you'd have proper badge IDs
          earnBadge(`level-badge-${newLevel}`)
        }
      })
    }
  }

  const currentLevelInfo = levelData[currentLevel]
  const progress = currentLevelInfo
    ? Math.round(((currentXp - currentLevelInfo.minXp) / (currentLevelInfo.maxXp - currentLevelInfo.minXp)) * 100)
    : 0

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            <span>Level {currentLevelInfo?.level}</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" /> Leadership Level
            </DialogTitle>
            <DialogDescription>Grow your leadership skills and unlock rewards</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{currentLevelInfo?.title}</h3>
                  <p className="text-sm text-muted-foreground">Level {currentLevelInfo?.level}</p>
                </div>
                <Badge className="px-2 py-1">
                  <Zap className="h-3.5 w-3.5 mr-1" />
                  <span>{currentXp} XP</span>
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{currentLevelInfo?.minXp} XP</span>
                  <span>{currentLevelInfo?.maxXp} XP</span>
                </div>
                <Progress value={progress} className="h-2" />
                {nextLevel && (
                  <p className="text-xs text-right text-muted-foreground">
                    {currentLevelInfo?.maxXp - currentXp} XP until Level {nextLevel.level}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium">Current Level Rewards</h4>
              <div className="grid grid-cols-1 gap-2">
                {currentLevelInfo?.rewards.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md border border-gray-200 dark:border-gray-800"
                  >
                    {reward.type === "coins" ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                        <Star className="h-4 w-4" />
                      </div>
                    ) : reward.type === "badge" ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Award className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Zap className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{reward.value}</p>
                      <p className="text-xs text-muted-foreground">{reward.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {nextLevel && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Next Level Rewards</h4>
                <div className="grid grid-cols-1 gap-2 opacity-70">
                  {nextLevel.rewards.map((reward, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 rounded-md border border-gray-200 dark:border-gray-800"
                    >
                      {reward.type === "coins" ? (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                          <Star className="h-4 w-4" />
                        </div>
                      ) : reward.type === "badge" ? (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                          <Award className="h-4 w-4" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                          <Zap className="h-4 w-4" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">{reward.value}</p>
                        <p className="text-xs text-muted-foreground">{reward.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* For demo purposes only - in a real app, XP would be earned through actions */}
            <div className="pt-2 flex justify-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button onClick={() => gainXp(50)} size="sm">
                      <Zap className="h-4 w-4 mr-1" /> Gain 50 XP (Demo)
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>This button is for demonstration purposes only.</p>
                    <p>In the real app, XP is earned through completing nudges and other actions.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showLevelUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <Card className="w-[350px] animate-bounce-in">
            <CardHeader className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
              <Award className="h-16 w-16 mx-auto mb-2" />
              <CardTitle className="text-2xl">Level Up!</CardTitle>
              <CardDescription className="text-white/90 text-lg">
                You are now a {levelData[currentLevel].title}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-2">
              <h3 className="text-center font-medium mb-4">Rewards Unlocked</h3>
              <div className="space-y-3">
                {levelUpRewards.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 rounded-md border border-gray-200 dark:border-gray-800"
                  >
                    {reward.type === "coins" ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                        <Star className="h-4 w-4" />
                      </div>
                    ) : reward.type === "badge" ? (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                        <Award className="h-4 w-4" />
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <Zap className="h-4 w-4" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium">{reward.value}</p>
                      <p className="text-xs text-muted-foreground">{reward.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pt-2 pb-4">
              <Button onClick={() => setShowLevelUp(false)}>Continue</Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  )
}
