"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gift, Sparkles, Award, Zap, Shield, Coins } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import confetti from "canvas-confetti"

// Types of rewards that can be in a surprise box
export type SurpriseRewardType = "coins" | "badge" | "xp" | "freeze_pass" | "insight" | "double_points"

interface SurpriseReward {
  type: SurpriseRewardType
  value: number | string
  description: string
  icon: React.ReactNode
  rarity: "common" | "uncommon" | "rare" | "epic" | "legendary"
}

const rarityColors = {
  common: "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200",
  uncommon: "bg-green-200 dark:bg-green-900 text-green-700 dark:text-green-200",
  rare: "bg-blue-200 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
  epic: "bg-purple-200 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
  legendary: "bg-amber-200 dark:bg-amber-900 text-amber-700 dark:text-amber-200",
}

export function SurpriseBox({
  open,
  onOpenChange,
  trigger = "streak",
  level = 1,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  trigger?: "streak" | "challenge" | "milestone" | "daily"
  level?: number
}) {
  const [isOpening, setIsOpening] = useState(false)
  const [reward, setReward] = useState<SurpriseReward | null>(null)
  const [claimed, setClaimed] = useState(false)
  const { addCoins, addXp, earnBadge, addFreezePass, addInsight, addDoublePoints } = useGamification()

  // Generate a random reward based on trigger and level
  useEffect(() => {
    if (open && !reward) {
      // Define possible rewards
      const possibleRewards: SurpriseReward[] = [
        {
          type: "coins",
          value: 25 + level * 5,
          description: `${25 + level * 5} Coins`,
          icon: <Coins className="h-6 w-6 text-yellow-500" />,
          rarity: "common",
        },
        {
          type: "xp",
          value: 15 + level * 10,
          description: `${15 + level * 10} XP`,
          icon: <Zap className="h-6 w-6 text-blue-500" />,
          rarity: "common",
        },
        {
          type: "freeze_pass",
          value: 1,
          description: "Streak Freeze Pass",
          icon: <Shield className="h-6 w-6 text-green-500" />,
          rarity: "uncommon",
        },
        {
          type: "badge",
          value: "Mystery Solver",
          description: "Mystery Solver Badge",
          icon: <Award className="h-6 w-6 text-purple-500" />,
          rarity: "rare",
        },
        {
          type: "insight",
          value: "Leadership Insight",
          description: "Exclusive Leadership Insight",
          icon: <Sparkles className="h-6 w-6 text-amber-500" />,
          rarity: "rare",
        },
        {
          type: "double_points",
          value: 1,
          description: "Double Points (24 hours)",
          icon: <Zap className="h-6 w-6 text-red-500" />,
          rarity: "epic",
        },
      ]

      // Add rarity weights based on level
      const weights = {
        common: Math.max(70 - level * 5, 40),
        uncommon: Math.min(20 + level * 2, 30),
        rare: Math.min(8 + level, 20),
        epic: Math.min(2 + level * 0.5, 8),
        legendary: Math.min(level * 0.2, 2),
      }

      // Select a rarity first
      const rarityPool: ("common" | "uncommon" | "rare" | "epic" | "legendary")[] = []
      Object.entries(weights).forEach(([rarity, weight]) => {
        for (let i = 0; i < weight; i++) {
          rarityPool.push(rarity as any)
        }
      })

      const selectedRarity = rarityPool[Math.floor(Math.random() * rarityPool.length)]

      // Filter rewards by selected rarity
      const rarityRewards = possibleRewards.filter((r) => r.rarity === selectedRarity)

      // Select a random reward from the filtered list
      const selectedReward = rarityRewards[Math.floor(Math.random() * rarityRewards.length)]
      setReward(selectedReward)
    }
  }, [open, level, reward])

  const handleOpen = () => {
    setIsOpening(true)
    setTimeout(() => {
      setIsOpening(false)
      // Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }, 2000)
  }

  const handleClaim = () => {
    if (!reward) return

    // Apply the reward
    switch (reward.type) {
      case "coins":
        addCoins(reward.value as number)
        break
      case "xp":
        addXp(reward.value as number)
        break
      case "badge":
        earnBadge("badge-mystery") // Use a predefined badge ID
        break
      case "freeze_pass":
        addFreezePass(reward.value as number)
        break
      case "insight":
        addInsight(reward.value as string)
        break
      case "double_points":
        addDoublePoints(24) // 24 hours
        break
    }

    setClaimed(true)
    setTimeout(() => {
      onOpenChange(false)
      setReward(null)
      setClaimed(false)
      setIsOpening(false)
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl flex items-center justify-center gap-2">
            <Gift className="h-5 w-5 text-primary" />
            Surprise Nudge Box!
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center justify-center py-6">
          {!isOpening && !reward ? (
            <>
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-primary/80 to-primary rounded-lg shadow-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
              >
                <Gift className="h-16 w-16 text-white" />
              </motion.div>
              <p className="mt-4 text-center text-muted-foreground">
                You've earned a surprise box! Click to open and discover your reward.
              </p>
            </>
          ) : isOpening ? (
            <motion.div
              className="w-32 h-32 bg-gradient-to-br from-primary/80 to-primary rounded-lg shadow-lg flex items-center justify-center"
              animate={{
                scale: [1, 1.1, 1, 1.1, 1.2],
                rotate: [0, 10, -10, 10, 0],
              }}
              transition={{ duration: 2 }}
            >
              <Gift className="h-16 w-16 text-white animate-pulse" />
            </motion.div>
          ) : reward ? (
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className={`w-32 h-32 rounded-lg shadow-lg flex items-center justify-center ${
                  rarityColors[reward.rarity]
                }`}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute w-40 h-40 rounded-full border-2 border-dashed border-primary/30 opacity-70"
                />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="z-10"
                >
                  {reward.icon}
                </motion.div>
              </motion.div>

              <div className="mt-4 text-center">
                <Badge
                  className={`mb-2 ${
                    reward.rarity === "legendary"
                      ? "bg-gradient-to-r from-amber-400 to-yellow-600"
                      : rarityColors[reward.rarity]
                  }`}
                >
                  {reward.rarity.charAt(0).toUpperCase() + reward.rarity.slice(1)}
                </Badge>
                <h3 className="text-xl font-bold">{reward.description}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {reward.type === "coins" && "Spend these on premium nudges or streak revivals!"}
                  {reward.type === "xp" && "Level up faster with this XP boost!"}
                  {reward.type === "badge" && "A special badge for your collection!"}
                  {reward.type === "freeze_pass" && "Use this to protect your streak if you miss a day!"}
                  {reward.type === "insight" && "Unlock exclusive leadership content!"}
                  {reward.type === "double_points" && "All coins and XP are doubled for 24 hours!"}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        <DialogFooter>
          {!isOpening && !reward ? (
            <Button onClick={handleOpen} className="w-full">
              Open Box
            </Button>
          ) : reward && !claimed ? (
            <Button onClick={handleClaim} className="w-full">
              Claim Reward
            </Button>
          ) : isOpening ? (
            <Button disabled className="w-full">
              Opening...
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)} className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
