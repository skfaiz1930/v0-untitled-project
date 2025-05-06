"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import type { BadgeItemProps } from "@/components/gamification/badge-item"
import type { PremiumNudgeProps } from "@/components/gamification/premium-nudges"

// Mock data for badges
const initialBadges: BadgeItemProps[] = [
  {
    id: "badge-1",
    name: "First Nudge",
    description: "Complete your first leadership nudge",
    type: "completion",
    level: "bronze",
    earned: true,
    earnedDate: "May 1, 2023",
  },
  {
    id: "badge-2",
    name: "3-Day Streak",
    description: "Complete nudges for 3 consecutive days",
    type: "streak",
    level: "bronze",
    earned: true,
    earnedDate: "May 3, 2023",
  },
  {
    id: "badge-3",
    name: "10 Nudges Completed",
    description: "Complete 10 leadership nudges",
    type: "completion",
    level: "silver",
    earned: true,
    earnedDate: "May 10, 2023",
  },
  {
    id: "badge-4",
    name: "Team Player",
    description: "Tag team members in 5 different nudges",
    type: "team",
    level: "bronze",
    earned: true,
    earnedDate: "May 12, 2023",
  },
  {
    id: "badge-5",
    name: "7-Day Streak",
    description: "Complete nudges for 7 consecutive days",
    type: "streak",
    level: "silver",
    earned: false,
    progress: 5,
    total: 7,
  },
  {
    id: "badge-6",
    name: "Feedback Master",
    description: "Give feedback to 10 different team members",
    type: "feedback",
    level: "gold",
    earned: false,
    progress: 3,
    total: 10,
  },
  {
    id: "badge-7",
    name: "30-Day Streak",
    description: "Complete nudges for 30 consecutive days",
    type: "streak",
    level: "platinum",
    earned: false,
    progress: 5,
    total: 30,
  },
  {
    id: "badge-8",
    name: "Leadership Guru",
    description: "Complete 50 leadership nudges",
    type: "achievement",
    level: "gold",
    earned: false,
    progress: 23,
    total: 50,
  },
]

// Mock data for premium nudges
const initialPremiumNudges: PremiumNudgeProps[] = [
  {
    id: "premium-1",
    title: "Advanced Conflict Resolution",
    description: "Learn techniques to mediate and resolve team conflicts effectively",
    cost: 50,
    category: "Team Management",
    unlocked: false,
    featured: true,
  },
  {
    id: "premium-2",
    title: "Strategic Decision Making",
    description: "Framework for making high-impact decisions with limited information",
    cost: 75,
    category: "Leadership",
    unlocked: false,
  },
  {
    id: "premium-3",
    title: "Emotional Intelligence Mastery",
    description: "Develop advanced EQ skills to better understand and motivate your team",
    cost: 100,
    category: "Personal Development",
    unlocked: false,
  },
  {
    id: "premium-4",
    title: "Effective 1:1 Meetings",
    description: "Transform your one-on-one meetings into powerful coaching sessions",
    cost: 40,
    category: "Communication",
    unlocked: true,
  },
  {
    id: "premium-5",
    title: "Building High-Performance Teams",
    description: "Strategies to develop and maintain high-performing teams",
    cost: 80,
    category: "Team Management",
    unlocked: false,
  },
  {
    id: "premium-6",
    title: "Crisis Leadership",
    description: "Leading effectively during times of uncertainty and rapid change",
    cost: 90,
    category: "Leadership",
    unlocked: false,
  },
]

interface GamificationContextType {
  coins: number
  addCoins: (amount: number) => void
  spendCoins: (amount: number) => boolean
  badges: BadgeItemProps[]
  earnBadge: (badgeId: string) => void
  premiumNudges: PremiumNudgeProps[]
  unlockPremiumNudge: (nudgeId: string) => boolean
  streak: {
    current: number
    longest: number
    lastCompleted: string | null
    canRevive: boolean
  }
  reviveStreak: () => boolean
  incrementStreak: () => void
  showCoinAnimation: boolean
  setShowCoinAnimation: (show: boolean) => void
  animationAmount: number
  setAnimationAmount: (amount: number) => void
  recentBadge: string | null
  clearRecentBadge: () => void
  xp: number
  level: number
  addXp: (amount: number) => void
  levelInfo: {
    currentLevel: number
    title: string
    minXp: number
    maxXp: number
    progress: number
  }
}

const GamificationContext = createContext<GamificationContextType | undefined>(undefined)

// Level data
const levelData = [
  { level: 1, title: "Novice Leader", minXp: 0, maxXp: 100 },
  { level: 2, title: "Emerging Leader", minXp: 100, maxXp: 250 },
  { level: 3, title: "Developing Leader", minXp: 250, maxXp: 500 },
  { level: 4, title: "Established Leader", minXp: 500, maxXp: 1000 },
  { level: 5, title: "Skilled Leader", minXp: 1000, maxXp: 2000 },
  { level: 6, title: "Advanced Leader", minXp: 2000, maxXp: 3500 },
  { level: 7, title: "Expert Leader", minXp: 3500, maxXp: 5500 },
  { level: 8, title: "Master Leader", minXp: 5500, maxXp: 8000 },
  { level: 9, title: "Distinguished Leader", minXp: 8000, maxXp: 12000 },
  { level: 10, title: "Legendary Leader", minXp: 12000, maxXp: 20000 },
]

export function GamificationProvider({ children }: { children: React.ReactNode }) {
  const [coins, setCoins] = useState(100)
  const [badges, setBadges] = useState<BadgeItemProps[]>(initialBadges)
  const [premiumNudges, setPremiumNudges] = useState<PremiumNudgeProps[]>(initialPremiumNudges)
  const [streak, setStreak] = useState({
    current: 5,
    longest: 7,
    lastCompleted: new Date().toISOString().split("T")[0],
    canRevive: true,
  })
  const [showCoinAnimation, setShowCoinAnimation] = useState(false)
  const [animationAmount, setAnimationAmount] = useState(0)
  const [recentBadge, setRecentBadge] = useState<string | null>(null)
  const [xp, setXp] = useState(320)
  const [level, setLevel] = useState(3)
  const { toast } = useToast()

  // Calculate level info based on current XP
  const calculateLevelInfo = () => {
    const currentLevelData = levelData.find((l) => xp >= l.minXp && xp < l.maxXp) || levelData[levelData.length - 1]

    const progress = Math.round(
      ((xp - currentLevelData.minXp) / (currentLevelData.maxXp - currentLevelData.minXp)) * 100,
    )

    return {
      currentLevel: currentLevelData.level,
      title: currentLevelData.title,
      minXp: currentLevelData.minXp,
      maxXp: currentLevelData.maxXp,
      progress,
    }
  }

  // Update level when XP changes
  useEffect(() => {
    const newLevelInfo = calculateLevelInfo()
    if (newLevelInfo.currentLevel !== level) {
      setLevel(newLevelInfo.currentLevel)

      // Show level up notification
      if (newLevelInfo.currentLevel > level) {
        toast({
          title: "Level Up!",
          description: `You are now a ${newLevelInfo.title}!`,
        })

        // Add level up bonus coins
        const bonusCoins = newLevelInfo.currentLevel * 50
        addCoins(bonusCoins)
      }
    }
  }, [xp, level, toast])

  const addCoins = (amount: number) => {
    setCoins((prev) => prev + amount)
    setAnimationAmount(amount)
    setShowCoinAnimation(true)
  }

  const spendCoins = (amount: number): boolean => {
    if (coins >= amount) {
      setCoins((prev) => prev - amount)
      return true
    }
    return false
  }

  const earnBadge = (badgeId: string) => {
    const badge = badges.find((b) => b.id === badgeId)
    if (badge && !badge.earned) {
      setBadges((prev) =>
        prev.map((b) =>
          b.id === badgeId
            ? {
                ...b,
                earned: true,
                earnedDate: new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                }),
                isNew: true,
              }
            : b,
        ),
      )
      setRecentBadge(badge.name)

      toast({
        title: "New Badge Earned!",
        description: `You've earned the "${badge.name}" badge!`,
      })

      // Add XP for earning a badge
      const badgeXp = badge.level === "bronze" ? 20 : badge.level === "silver" ? 50 : badge.level === "gold" ? 100 : 200
      addXp(badgeXp)
    }
  }

  const unlockPremiumNudge = (nudgeId: string): boolean => {
    const nudge = premiumNudges.find((n) => n.id === nudgeId)
    if (nudge && !nudge.unlocked) {
      if (spendCoins(nudge.cost)) {
        setPremiumNudges((prev) => prev.map((n) => (n.id === nudgeId ? { ...n, unlocked: true } : n)))
        return true
      }
    }
    return false
  }

  const reviveStreak = (): boolean => {
    const revivalCost = 50
    if (streak.canRevive && spendCoins(revivalCost)) {
      setStreak((prev) => ({
        ...prev,
        canRevive: false,
        lastCompleted: new Date().toISOString().split("T")[0],
      }))
      return true
    }
    return false
  }

  const incrementStreak = () => {
    const today = new Date().toISOString().split("T")[0]

    // Check if already completed today
    if (streak.lastCompleted === today) return

    // Check if streak is broken (more than 1 day since last completion)
    const lastDate = streak.lastCompleted ? new Date(streak.lastCompleted) : null
    const currentDate = new Date(today)

    if (!lastDate || currentDate.getTime() - lastDate.getTime() > 86400000 * 2) {
      // Streak broken, reset to 1
      setStreak((prev) => ({
        ...prev,
        current: 1,
        lastCompleted: today,
        canRevive: true,
      }))
    } else {
      // Increment streak
      const newCurrent = streak.current + 1
      setStreak((prev) => ({
        ...prev,
        current: newCurrent,
        longest: Math.max(prev.longest, newCurrent),
        lastCompleted: today,
        canRevive: false,
      }))

      // Add XP for streak
      addXp(10 * newCurrent)

      // Check for streak badges
      if (newCurrent === 3) {
        earnBadge("badge-2") // 3-Day Streak badge
      } else if (newCurrent === 7) {
        earnBadge("badge-5") // 7-Day Streak badge
      } else if (newCurrent === 30) {
        earnBadge("badge-7") // 30-Day Streak badge
      }
    }
  }

  const clearRecentBadge = () => {
    setRecentBadge(null)
    // Also clear the "isNew" flag on badges
    setBadges((prev) => prev.map((b) => (b.isNew ? { ...b, isNew: false } : b)))
  }

  const addXp = (amount: number) => {
    setXp((prev) => prev + amount)
    toast({
      title: "XP Gained!",
      description: `+${amount} XP`,
    })
  }

  return (
    <GamificationContext.Provider
      value={{
        coins,
        addCoins,
        spendCoins,
        badges,
        earnBadge,
        premiumNudges,
        unlockPremiumNudge,
        streak,
        reviveStreak,
        incrementStreak,
        showCoinAnimation,
        setShowCoinAnimation,
        animationAmount,
        setAnimationAmount,
        recentBadge,
        clearRecentBadge,
        xp,
        level,
        addXp,
        levelInfo: calculateLevelInfo(),
      }}
    >
      {children}
    </GamificationContext.Provider>
  )
}

export function useGamification() {
  const context = useContext(GamificationContext)
  if (context === undefined) {
    throw new Error("useGamification must be used within a GamificationProvider")
  }
  return context
}
