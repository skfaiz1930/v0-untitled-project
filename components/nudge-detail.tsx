"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Award, Share2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Confetti } from "@/components/confetti"

export function NudgeDetail() {
  const [reflection, setReflection] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleSubmit = () => {
    if (reflection.trim() && !submitted) {
      setSubmitted(true)
      setShowConfetti(true)

      // Hide confetti after 3 seconds
      setTimeout(() => {
        setShowConfetti(false)
      }, 3000)
    }
  }

  return (
    <div className="container max-w-md space-y-6 p-4">
      {showConfetti && <Confetti />}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="text-xl font-bold">Today's Nudge</h1>
      </div>

      <Card className="border-2 border-primary/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Leadership</div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Share2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg bg-primary/5 p-6 text-center">
            <div className="text-5xl">🌟</div>
            <h3 className="text-2xl font-bold">Practice active listening today</h3>
            <p className="text-muted-foreground">
              In your next conversation, focus entirely on understanding the other person before responding.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Why This Matters:</h4>
            <p className="text-sm text-muted-foreground">
              Active listening builds deeper connections, reduces misunderstandings, and helps others feel valued. It's
              a cornerstone of effective leadership and meaningful relationships.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">How to Apply This:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-xs">•</span>
                <span>Make eye contact and put away distractions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-xs">•</span>
                <span>Ask clarifying questions to deepen understanding</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-xs">•</span>
                <span>Summarize what you heard before responding</span>
              </li>
            </ul>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <div className="flex items-center gap-2 text-amber-700">
              <Award className="h-5 w-5" />
              <span className="font-medium">Complete for 20 coins + streak</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Your Reflection:</h4>
            {submitted ? (
              <div className="rounded-lg bg-green-50 p-4 text-green-700">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5" />
                  <span className="font-medium">Reflection submitted! +10 bonus coins</span>
                </div>
                <p className="mt-2 text-sm">{reflection}</p>
              </div>
            ) : (
              <>
                <Textarea
                  placeholder="How did you apply this nudge today? What did you learn?"
                  className="min-h-[100px] resize-none"
                  value={reflection}
                  onChange={(e) => setReflection(e.target.value)}
                />
                <Button className="w-full" onClick={handleSubmit} disabled={!reflection.trim()}>
                  Submit Reflection
                </Button>
              </>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard">Skip</Link>
          </Button>
          <Button variant="outline" size="sm">
            Remind Me Later
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
