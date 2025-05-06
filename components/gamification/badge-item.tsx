"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flame, Star, Trophy, ThumbsUp, Users, CheckCircle, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BadgeItemProps {
  id: string
  name: string
  description: string
  type: "streak" | "completion" | "feedback" | "team" | "achievement" | "special"
  level?: "bronze" | "silver" | "gold" | "platinum"
  earned: boolean
  earnedDate?: string
  progress?: number
  total?: number
  isNew?: boolean
}

const badgeIcons = {
  streak: Flame,
  completion: CheckCircle,
  feedback: ThumbsUp,
  team: Users,
  achievement: Trophy,
  special: Star,
}

const badgeColors = {
  bronze: "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-800",
  silver: "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800/40 dark:text-slate-300 dark:border-slate-700",
  gold: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-800",
  platinum:
    "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800",
  default: "bg-primary/10 text-primary border-primary/20",
}

export function BadgeItem({
  name,
  description,
  type,
  level = "bronze",
  earned,
  earnedDate,
  progress = 0,
  total = 1,
  isNew = false,
}: BadgeItemProps) {
  const [showAnimation, setShowAnimation] = useState(isNew)

  const Icon = badgeIcons[type]
  const colorClass = earned
    ? badgeColors[level]
    : "bg-gray-100 text-gray-400 border-gray-200 dark:bg-gray-800/40 dark:text-gray-500 dark:border-gray-700"

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-300 border",
        earned ? "border-primary/20" : "border-gray-200 dark:border-gray-700",
        showAnimation && "animate-pulse",
      )}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn("flex items-center justify-center w-12 h-12 rounded-full border-2", colorClass)}>
            <Icon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className={cn("font-medium", !earned && "text-gray-500")}>{name}</h3>
              {isNew && earned && <Badge className="bg-green-500 text-white">New</Badge>}
            </div>
            <p className="text-sm text-muted-foreground">{description}</p>

            {earned && earnedDate && (
              <div className="flex items-center mt-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                Earned on {earnedDate}
              </div>
            )}

            {!earned && total > 1 && (
              <div className="mt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                  <span>Progress</span>
                  <span>
                    {progress} / {total}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (progress / total) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
