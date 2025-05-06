"use client"

import { useState, useEffect } from "react"
import { Coins, Award, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface CoinDisplayProps {
  coins: number
  onCoinAnimationComplete?: () => void
  showAnimation?: boolean
  size?: "sm" | "md" | "lg"
}

export function CoinDisplay({ coins, onCoinAnimationComplete, showAnimation = false, size = "md" }: CoinDisplayProps) {
  const [displayCoins, setDisplayCoins] = useState(coins)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (showAnimation && coins > displayCoins) {
      setIsAnimating(true)
      const difference = coins - displayCoins
      const increment = Math.max(1, Math.floor(difference / 10))

      const interval = setInterval(() => {
        setDisplayCoins((prev) => {
          const next = prev + increment
          if (next >= coins) {
            clearInterval(interval)
            setIsAnimating(false)
            onCoinAnimationComplete?.()
            return coins
          }
          return next
        })
      }, 50)

      return () => clearInterval(interval)
    } else {
      setDisplayCoins(coins)
    }
  }, [coins, displayCoins, showAnimation, onCoinAnimationComplete])

  const sizeClasses = {
    sm: "text-sm px-2 py-1",
    md: "text-base px-3 py-1.5",
    lg: "text-lg px-4 py-2",
  }

  return (
    <div className={`flex items-center ${isAnimating ? "animate-pulse" : ""}`}>
      <Badge
        variant="outline"
        className={`flex items-center gap-1 font-medium ${sizeClasses[size]} ${isAnimating ? "bg-yellow-100 dark:bg-yellow-900/30" : ""}`}
      >
        <Coins className={size === "sm" ? "h-3 w-3" : size === "lg" ? "h-5 w-5" : "h-4 w-4"} />
        <span className="tabular-nums">{displayCoins}</span>
      </Badge>
      {isAnimating && <Sparkles className="h-4 w-4 text-yellow-500 ml-1 animate-spin" />}
    </div>
  )
}

interface BadgeDisplayProps {
  count: number
  recentBadge?: string
  onClick?: () => void
}

export function BadgeDisplay({ count, recentBadge, onClick }: BadgeDisplayProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1 px-3" onClick={onClick}>
            <Award className="h-4 w-4 text-amber-500" />
            <span className="tabular-nums">{count}</span>
            {recentBadge && <Sparkles className="h-3 w-3 text-amber-500 ml-1 animate-pulse" />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {recentBadge ? <p>New badge: {recentBadge}!</p> : <p>You have earned {count} badges</p>}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
