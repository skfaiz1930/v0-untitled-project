"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lock, Coins, CheckCircle, Calendar } from "lucide-react"
import { CoinDisplay } from "./coin-display"
import { useToast } from "@/hooks/use-toast"

export interface PremiumNudgeProps {
  id: string
  title: string
  description: string
  cost: number
  category: string
  unlocked: boolean
  featured?: boolean
}

interface PremiumNudgeCardProps {
  nudge: PremiumNudgeProps
  userCoins: number
  onUnlock: (nudgeId: string, cost: number) => void
}

export function PremiumNudgeCard({ nudge, userCoins, onUnlock }: PremiumNudgeCardProps) {
  const [isUnlocking, setIsUnlocking] = useState(false)
  const { toast } = useToast()

  const handleUnlock = () => {
    if (userCoins < nudge.cost) {
      toast({
        title: "Not enough coins",
        description: `You need ${nudge.cost - userCoins} more coins to unlock this premium nudge.`,
        variant: "destructive",
      })
      return
    }

    setIsUnlocking(true)

    // Simulate API call
    setTimeout(() => {
      onUnlock(nudge.id, nudge.cost)
      setIsUnlocking(false)

      toast({
        title: "Premium Nudge Unlocked!",
        description: `You've unlocked "${nudge.title}" for ${nudge.cost} coins.`,
      })
    }, 1000)
  }

  return (
    <Card
      className={`overflow-hidden transition-all duration-300 ${nudge.featured ? "border-primary/30 bg-primary/5" : ""}`}
    >
      {nudge.featured && (
        <div className="bg-primary text-primary-foreground text-xs py-1 px-3 text-center font-medium">
          Featured Premium Nudge
        </div>
      )}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              {nudge.title}
              {nudge.featured && <Sparkles className="h-4 w-4 text-yellow-500" />}
            </CardTitle>
            <CardDescription>{nudge.description}</CardDescription>
          </div>
          <Badge variant="outline" className="text-muted-foreground">
            {nudge.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Available today</span>
          </div>
          <CoinDisplay coins={nudge.cost} size="sm" />
        </div>
      </CardContent>
      <CardFooter>
        {nudge.unlocked ? (
          <Button variant="outline" className="w-full" disabled>
            <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
            Unlocked
          </Button>
        ) : (
          <Button className="w-full" onClick={handleUnlock} disabled={isUnlocking || userCoins < nudge.cost}>
            {isUnlocking ? (
              <>Unlocking...</>
            ) : (
              <>
                {userCoins < nudge.cost ? <Lock className="h-4 w-4 mr-2" /> : <Coins className="h-4 w-4 mr-2" />}
                Unlock for {nudge.cost} coins
              </>
            )}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

interface PremiumNudgesProps {
  nudges: PremiumNudgeProps[]
  userCoins: number
  onUnlock: (nudgeId: string, cost: number) => void
}

export function PremiumNudges({ nudges, userCoins, onUnlock }: PremiumNudgesProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Premium Nudges</h2>
          <p className="text-sm text-muted-foreground">Unlock exclusive leadership nudges with your coins</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {nudges.map((nudge) => (
          <PremiumNudgeCard key={nudge.id} nudge={nudge} userCoins={userCoins} onUnlock={onUnlock} />
        ))}
      </div>
    </div>
  )
}
