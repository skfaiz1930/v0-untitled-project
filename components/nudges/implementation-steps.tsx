"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Lightbulb, Clock, BookOpen, Target, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { generateImplementationSteps } from "@/lib/ai-implementation-steps"

interface ImplementationStepsProps {
  nudgeId: string
  nudgeTitle: string
  nudgeDescription: string
}

export default function ImplementationSteps({ nudgeId, nudgeTitle, nudgeDescription }: ImplementationStepsProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [implementation, setImplementation] = useState<any>(null)

  const handleGenerateSteps = async () => {
    if (implementation) {
      setIsExpanded(!isExpanded)
      return
    }

    setIsLoading(true)
    try {
      const steps = await generateImplementationSteps(nudgeId, nudgeTitle, nudgeDescription)
      setImplementation(steps)
      setIsExpanded(true)
    } catch (error) {
      console.error("Failed to generate implementation steps:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "Medium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      case "Hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="mt-4">
      <Button
        variant="outline"
        onClick={handleGenerateSteps}
        className="w-full flex justify-between items-center"
        disabled={isLoading}
      >
        <div className="flex items-center">
          <Lightbulb className="h-4 w-4 mr-2" />
          {implementation ? "Implementation Steps" : "Generate Implementation Steps with AI"}
        </div>
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : isExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </Button>

      {isExpanded && implementation && (
        <Card className="mt-2 border-dashed animate-fade-in">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">AI-Generated Implementation Plan</CardTitle>
            <CardDescription>Follow these steps to effectively implement this nudge</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 mr-1" />
              <span>Estimated time to complete: {implementation.estimatedTimeToComplete}</span>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Implementation Steps:</h4>
              <div className="space-y-3">
                {implementation.steps.map((step: any) => (
                  <div key={step.step} className="bg-secondary/50 p-3 rounded-md">
                    <div className="flex justify-between items-start mb-1">
                      <h5 className="font-medium">
                        {step.step}. {step.title}
                      </h5>
                      <Badge variant="outline" className={`${getDifficultyColor(step.difficulty)} ml-2`}>
                        {step.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{step.timeEstimate}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <div className="flex items-center mb-2">
                <BookOpen className="h-4 w-4 mr-2" />
                <h4 className="font-medium">Helpful Resources:</h4>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                {implementation.resources.map((resource: string, index: number) => (
                  <li key={index}>{resource}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div>
              <div className="flex items-center mb-2">
                <Target className="h-4 w-4 mr-2" />
                <h4 className="font-medium">Key Outcomes:</h4>
              </div>
              <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                {implementation.keyOutcomes.map((outcome: string, index: number) => (
                  <li key={index}>{outcome}</li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="text-xs text-muted-foreground pt-0">
            <p>AI-generated implementation plan. Adjust as needed for your specific team context.</p>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
