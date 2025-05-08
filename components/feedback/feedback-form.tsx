"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { MessageSquare, Star, ThumbsUp, Send, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useGamification } from "@/contexts/gamification-context"

export function FeedbackForm() {
  const [rating, setRating] = useState<number | null>(null)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackType, setFeedbackType] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { toast } = useToast()
  const { addCoins, addXp } = useGamification()

  const handleSubmit = () => {
    if (!rating || !feedbackText) {
      toast({
        title: "Missing information",
        description: "Please provide both a rating and feedback text.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call to submit feedback
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reward user for providing feedback
      addCoins(25)
      addXp(15)

      toast({
        title: "Feedback submitted",
        description: "Thank you for your feedback! You've earned 25 coins and 15 XP.",
      })
    }, 1500)
  }

  const handleFeedbackTypeChange = (type: string) => {
    setFeedbackType((prev) => {
      if (prev.includes(type)) {
        return prev.filter((t) => t !== type)
      } else {
        return [...prev, type]
      }
    })
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6 flex flex-col items-center justify-center text-center">
          <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3 mb-4">
            <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-500" />
          </div>
          <h3 className="text-lg font-medium mb-2">Thank You for Your Feedback!</h3>
          <p className="text-muted-foreground mb-4">Your insights help us improve the NudgeManager app for everyone.</p>
          <Button onClick={() => setIsSubmitted(false)} variant="outline">
            Submit Another Response
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          App Feedback
        </CardTitle>
        <CardDescription>Share your thoughts to help us improve the NudgeManager app</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>How would you rate your experience with NudgeManager?</Label>
          <div className="flex items-center justify-center">
            <RadioGroup
              className="flex items-center gap-6"
              value={rating?.toString()}
              onValueChange={(value) => setRating(Number.parseInt(value))}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <div key={value} className="flex flex-col items-center gap-1">
                  <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                  <Label
                    htmlFor={`rating-${value}`}
                    className={`cursor-pointer flex flex-col items-center ${
                      rating === value ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <Star
                      className={`h-8 w-8 ${
                        rating === value ? "fill-primary text-primary" : "fill-muted stroke-muted-foreground"
                      }`}
                    />
                    <span className="text-xs mt-1">{value}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="space-y-2">
          <Label>What type of feedback are you providing?</Label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "feature", label: "Feature Request" },
              { id: "bug", label: "Bug Report" },
              { id: "improvement", label: "Improvement Suggestion" },
              { id: "experience", label: "User Experience" },
            ].map((item) => (
              <div key={item.id} className="flex items-center space-x-2">
                <Checkbox
                  id={item.id}
                  checked={feedbackType.includes(item.id)}
                  onCheckedChange={() => handleFeedbackTypeChange(item.id)}
                />
                <Label htmlFor={item.id} className="text-sm cursor-pointer">
                  {item.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="feedback">Tell us more about your experience</Label>
          <Textarea
            id="feedback"
            placeholder="Share your thoughts, suggestions, or report issues..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-xs text-muted-foreground">
          <ThumbsUp className="h-3 w-3 inline mr-1" />
          Earn 25 coins for sharing your feedback!
        </p>
        <Button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="h-4 w-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  )
}
