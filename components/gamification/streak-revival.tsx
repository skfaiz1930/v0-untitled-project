"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Flame, Coins, AlertTriangle } from "lucide-react"
import { CoinDisplay } from "./coin-display"

interface StreakRevivalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentCoins: number
  streakLength: number
  revivalCost: number
  onRevive: () => void
}

export function StreakRevival({
  open,
  onOpenChange,
  currentCoins,
  streakLength,
  revivalCost,
  onRevive,
}: StreakRevivalProps) {
  const [isReviving, setIsReviving] = useState(false)

  const handleRevive = () => {
    setIsReviving(true)

    // Simulate API call
    setTimeout(() => {
      setIsReviving(false)
      onRevive()
      onOpenChange(false)
    }, 1000)
  }

  const canAfford = currentCoins >= revivalCost

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500" />
            Revive Your Streak
          </DialogTitle>
          <DialogDescription>
            Your {streakLength}-day streak ended yesterday. Revive it now to keep your progress!
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 space-y-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30">
            <Flame className="h-10 w-10 text-red-500" />
          </div>

          <div className="text-center">
            <p className="font-medium">Revive your streak for:</p>
            <div className="flex items-center justify-center mt-2">
              <Coins className="h-5 w-5 text-yellow-500 mr-1" />
              <span className="text-xl font-bold">{revivalCost} coins</span>
            </div>

            {!canAfford && (
              <div className="flex items-center mt-3 text-red-500 text-sm">
                <AlertTriangle className="h-4 w-4 mr-1" />
                <span>Not enough coins</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <p className="text-sm text-muted-foreground">Your balance:</p>
            <CoinDisplay coins={currentCoins} size="sm" />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleRevive} disabled={!canAfford || isReviving} className="gap-2">
            {isReviving ? "Reviving..." : "Revive Streak"}
            <Flame className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
