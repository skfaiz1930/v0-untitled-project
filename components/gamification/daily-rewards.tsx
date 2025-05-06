"use client"

import { useState, useEffect } from "react"
import { Calendar, Gift, Check, Star, Trophy, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useGamification } from "@/contexts/gamification-context"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DailyReward {
  day: number
  coins: number
  special?: boolean
  claimed: boolean
  description: string
}

export function DailyRewards() {
  const { addCoins, streak } = useGamification()
  const [open, setOpen] = useState(false)
  const [rewards, setRewards] = useState<DailyReward[]>([
    { day: 1, coins: 10, claimed: false, description: "Day 1 Reward" },
    { day: 2, coins: 15, claimed: false, description: "Day 2 Reward" },
    { day: 3, coins: 20, claimed: false, description: "Day 3 Reward" },
    { day: 4, coins: 25, claimed: false, description: "Day 4 Reward" },
    { day: 5, coins: 30, claimed: false, description: "Day 5 Reward" },
    { day: 6, coins: 35, claimed: false, description: "Day 6 Reward" },
    { day: 7, coins: 50, special: true, claimed: false, description: "Weekly Bonus!" },
    { day: 8, coins: 20, claimed: false, description: "Day 8 Reward" },
    { day: 9, coins: 25, claimed: false, description: "Day 9 Reward" },
    { day: 10, coins: 30, claimed: false, description: "Day 10 Reward" },
    { day: 11, coins: 35, claimed: false, description: "Day 11 Reward" },
    { day: 12, coins: 40, claimed: false, description: "Day 12 Reward" },
    { day: 13, coins: 45, claimed: false, description: "Day 13 Reward" },
    { day: 14, coins: 75, special: true, claimed: false, description: "2-Week Milestone!" },
    { day: 15, coins: 30, claimed: false, description: "Day 15 Reward" },
    { day: 16, coins: 35, claimed: false, description: "Day 16 Reward" },
    { day: 17, coins: 40, claimed: false, description: "Day 17 Reward" },
    { day: 18, coins: 45, claimed: false, description: "Day 18 Reward" },
    { day: 19, coins: 50, claimed: false, description: "Day 19 Reward" },
    { day: 20, coins: 55, claimed: false, description: "Day 20 Reward" },
    { day: 21, coins: 100, special: true, claimed: false, description: "3-Week Milestone!" },
    { day: 22, coins: 40, claimed: false, description: "Day 22 Reward" },
    { day: 23, coins: 45, claimed: false, description: "Day 23 Reward" },
    { day: 24, coins: 50, claimed: false, description: "Day 24 Reward" },
    { day: 25, coins: 55, claimed: false, description: "Day 25 Reward" },
    { day: 26, coins: 60, claimed: false, description: "Day 26 Reward" },
    { day: 27, coins: 65, claimed: false, description: "Day 27 Reward" },
    { day: 28, coins: 70, claimed: false, description: "Day 28 Reward" },
    { day: 29, coins: 75, claimed: false, description: "Day 29 Reward" },
    { day: 30, coins: 150, special: true, claimed: false, description: "Monthly Milestone!" },
  ])
  const [canClaimToday, setCanClaimToday] = useState(true)
  const [currentDay, setCurrentDay] = useState(1)
  const [showRewardAnimation, setShowRewardAnimation] = useState(false)
  const [claimedReward, setClaimedReward] = useState<DailyReward | null>(null)

  // Check if user can claim today's reward
  useEffect(() => {
    const lastClaimDate = localStorage.getItem("lastDailyRewardClaim")
    const today = new Date().toISOString().split("T")[0]

    if (lastClaimDate === today) {
      setCanClaimToday(false)
    }

    // Load claimed rewards from localStorage
    const savedRewards = localStorage.getItem("dailyRewards")
    if (savedRewards) {
      setRewards(JSON.parse(savedRewards))
    }

    // Set current day based on claimed rewards
    const savedCurrentDay = localStorage.getItem("currentRewardDay")
    if (savedCurrentDay) {
      setCurrentDay(Number.parseInt(savedCurrentDay))
    }
  }, [])

  const claimDailyReward = () => {
    if (!canClaimToday) return

    const today = new Date().toISOString().split("T")[0]
    localStorage.setItem("lastDailyRewardClaim", today)

    const updatedRewards = [...rewards]
    const reward = updatedRewards[currentDay - 1]
    reward.claimed = true

    setRewards(updatedRewards)
    localStorage.setItem("dailyRewards", JSON.stringify(updatedRewards))

    setCurrentDay((prev) => {
      const newDay = prev + 1
      localStorage.setItem("currentRewardDay", newDay.toString())
      return newDay
    })

    setCanClaimToday(false)
    setClaimedReward(reward)
    setShowRewardAnimation(true)

    // Add coins to user's balance
    addCoins(reward.coins)

    // Hide animation after 3 seconds
    setTimeout(() => {
      setShowRewardAnimation(false)
    }, 3000)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <Gift className="h-4 w-4" />
            <span>Daily Rewards</span>
            {canClaimToday && <Badge variant="destructive" className="ml-1 h-2 w-2 p-0 rounded-full" />}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" /> Daily Rewards
            </DialogTitle>
            <DialogDescription>Log in daily to claim rewards and build your streak!</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-2 py-1">
                  <Trophy className="h-3 w-3 mr-1" />
                  <span>Day {currentDay - 1}</span>
                </Badge>
                <span className="text-sm text-muted-foreground">Current Streak: {streak.current} days</span>
              </div>

              <Button onClick={claimDailyReward} disabled={!canClaimToday} size="sm" className="gap-1">
                {canClaimToday ? (
                  <>
                    <Gift className="h-4 w-4" /> Claim
                  </>
                ) : (
                  <>
                    <Check className="h-4 w-4" /> Claimed
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {rewards.slice(0, 30).map((reward, index) => (
                <div
                  key={index}
                  className={`relative flex flex-col items-center justify-center p-2 rounded-md border ${
                    reward.special
                      ? "border-yellow-400 dark:border-yellow-600 bg-yellow-50 dark:bg-yellow-950/30"
                      : reward.claimed
                        ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30"
                        : index + 1 === currentDay && canClaimToday
                          ? "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 animate-pulse"
                          : "border-gray-200 dark:border-gray-800"
                  } ${index + 1 < currentDay ? "opacity-60" : ""}`}
                  style={{ aspectRatio: "1/1" }}
                >
                  <span className="text-xs font-medium">{reward.day}</span>
                  <div className="flex items-center mt-1">
                    <span className="text-xs">{reward.coins}</span>
                    <Star className="h-2.5 w-2.5 text-yellow-500 ml-0.5" />
                  </div>
                  {reward.claimed && <Check className="absolute top-1 right-1 h-3 w-3 text-green-500" />}
                  {reward.special && <Sparkles className="absolute bottom-1 right-1 h-2.5 w-2.5 text-yellow-500" />}
                </div>
              ))}
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-muted-foreground mb-1">
                <span>Day 1</span>
                <span>Day 30</span>
              </div>
              <Progress value={((currentDay - 1) / 30) * 100} className="h-2" />
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {showRewardAnimation && claimedReward && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-xl animate-bounce-in text-center">
            <Gift className="h-16 w-16 mx-auto text-yellow-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Daily Reward Claimed!</h2>
            <p className="text-lg mb-4">{claimedReward.description}</p>
            <div className="flex items-center justify-center gap-2 text-xl font-bold text-yellow-600 dark:text-yellow-400">
              +{claimedReward.coins} <Star className="h-5 w-5" />
            </div>
            <Button className="mt-6" onClick={() => setShowRewardAnimation(false)}>
              Awesome!
            </Button>
          </div>
        </div>
      )}
    </>
  )
}
