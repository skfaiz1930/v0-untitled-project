"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MapPin, Lock, Unlock, Award, CheckCircle, Star } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"

// Mock journey data
const journeySteps = [
  {
    id: "step-1",
    title: "Leadership Foundations",
    description: "Complete your first 5 nudges",
    requiredLevel: 1,
    reward: "Basic Leadership Guide",
    completed: true,
  },
  {
    id: "step-2",
    title: "Team Communication",
    description: "Tag 3 team members in nudges",
    requiredLevel: 2,
    reward: "Communication Strategies",
    completed: true,
  },
  {
    id: "step-3",
    title: "Feedback Master",
    description: "Complete 3 feedback-related nudges",
    requiredLevel: 3,
    reward: "Effective Feedback Framework",
    completed: true,
  },
  {
    id: "step-4",
    title: "Team Building",
    description: "Achieve a 7-day streak",
    requiredLevel: 4,
    reward: "High-Performance Teams Guide",
    completed: false,
    current: true,
  },
  {
    id: "step-5",
    title: "Strategic Leadership",
    description: "Complete 15 total nudges",
    requiredLevel: 5,
    reward: "Strategic Decision Making",
    completed: false,
  },
  {
    id: "step-6",
    title: "Leadership Mastery",
    description: "Reach level 7",
    requiredLevel: 7,
    reward: "Leadership Mastery Program",
    completed: false,
  },
]

export function JourneyMap() {
  const { level } = useGamification()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Your Leadership Journey
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Journey path line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-muted-foreground/20 z-0" />

          {/* Journey steps */}
          <div className="space-y-8 relative z-10">
            {journeySteps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`relative flex items-center justify-center w-8 h-8 rounded-full z-10 ${
                          step.completed
                            ? "bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400"
                            : step.current
                              ? "bg-primary text-primary-foreground animate-pulse"
                              : level >= step.requiredLevel
                                ? "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400"
                                : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : step.current ? (
                          <Star className="h-5 w-5" />
                        ) : level >= step.requiredLevel ? (
                          <Unlock className="h-4 w-4" />
                        ) : (
                          <Lock className="h-4 w-4" />
                        )}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {step.completed
                          ? "Completed"
                          : step.current
                            ? "Current Focus"
                            : level >= step.requiredLevel
                              ? "Ready to Complete"
                              : `Unlocks at Level ${step.requiredLevel}`}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{step.title}</h3>
                    <Badge
                      variant="outline"
                      className={`${
                        step.completed
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : level >= step.requiredLevel
                            ? "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      Level {step.requiredLevel}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium">Reward:</span>
                    <span className="text-xs text-primary">{step.reward}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
