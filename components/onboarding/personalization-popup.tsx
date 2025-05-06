"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { UserCircle, Building, Briefcase, Users, Award } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"

// Define the questions to ask progressively
const personalizations = [
  {
    id: "experience",
    title: "Leadership Experience",
    description: "How many years of leadership experience do you have?",
    icon: <Briefcase className="h-5 w-5" />,
    type: "select",
    options: [
      { value: "0-1", label: "0-1 years" },
      { value: "2-5", label: "2-5 years" },
      { value: "6-10", label: "6-10 years" },
      { value: "10+", label: "10+ years" },
    ],
  },
  {
    id: "team-size",
    title: "Team Size",
    description: "How many people do you currently manage?",
    icon: <Users className="h-5 w-5" />,
    type: "select",
    options: [
      { value: "1-5", label: "1-5 people" },
      { value: "6-15", label: "6-15 people" },
      { value: "16-30", label: "16-30 people" },
      { value: "30+", label: "30+ people" },
    ],
  },
  {
    id: "industry",
    title: "Industry",
    description: "Which industry do you work in?",
    icon: <Building className="h-5 w-5" />,
    type: "select",
    options: [
      { value: "technology", label: "Technology" },
      { value: "healthcare", label: "Healthcare" },
      { value: "finance", label: "Finance" },
      { value: "education", label: "Education" },
      { value: "manufacturing", label: "Manufacturing" },
      { value: "retail", label: "Retail" },
      { value: "other", label: "Other" },
    ],
  },
  {
    id: "leadership-style",
    title: "Leadership Style",
    description: "Which leadership style do you most identify with?",
    icon: <UserCircle className="h-5 w-5" />,
    type: "radio",
    options: [
      { value: "democratic", label: "Democratic (Collaborative)" },
      { value: "autocratic", label: "Autocratic (Directive)" },
      { value: "transformational", label: "Transformational (Inspirational)" },
      { value: "servant", label: "Servant (Supportive)" },
    ],
  },
  {
    id: "development-goal",
    title: "Development Goal",
    description: "What's your primary leadership development goal?",
    icon: <Award className="h-5 w-5" />,
    type: "radio",
    options: [
      { value: "communication", label: "Improve communication skills" },
      { value: "delegation", label: "Better delegation" },
      { value: "strategic-thinking", label: "Strategic thinking" },
      { value: "team-building", label: "Team building" },
      { value: "conflict-resolution", label: "Conflict resolution" },
    ],
  },
]

export function PersonalizationPopup() {
  const [open, setOpen] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [value, setValue] = useState("")
  const { addCoins, addXp } = useGamification()

  // Determine when to show the popup based on certain conditions
  useEffect(() => {
    // Check if we've already shown this question
    const hasAnsweredCurrent = answers[personalizations[currentQuestionIndex]?.id]

    // Only show if we haven't answered this question yet
    if (!hasAnsweredCurrent) {
      // Wait a bit before showing the popup
      const timer = setTimeout(() => {
        setOpen(true)
      }, 30000) // Show after 30 seconds of activity

      return () => clearTimeout(timer)
    }
  }, [currentQuestionIndex, answers])

  const handleSubmit = () => {
    if (!value) return

    const currentQuestion = personalizations[currentQuestionIndex]

    // Save the answer
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    })

    // Reset value for next question
    setValue("")

    // Award coins and XP for providing information
    addCoins(10)
    addXp(15)

    // Move to next question or close if done
    if (currentQuestionIndex < personalizations.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setOpen(false)
      // Reset to first unanswered question for next time
      const nextUnanswered = personalizations.findIndex((q) => !answers[q.id])
      setCurrentQuestionIndex(nextUnanswered >= 0 ? nextUnanswered : 0)
    }
  }

  const handleSkip = () => {
    setOpen(false)
  }

  const currentQuestion = personalizations[currentQuestionIndex]

  if (!currentQuestion) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {currentQuestion.icon}
            {currentQuestion.title}
          </DialogTitle>
          <DialogDescription>{currentQuestion.description}</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {currentQuestion.type === "select" && (
            <Select value={value} onValueChange={setValue}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {currentQuestion.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {currentQuestion.type === "radio" && (
            <RadioGroup value={value} onValueChange={setValue}>
              {currentQuestion.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          )}

          {currentQuestion.type === "text" && (
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Your answer" />
          )}
        </div>

        <DialogFooter className="flex justify-between">
          <Button variant="outline" onClick={handleSkip}>
            Skip for now
          </Button>
          <Button onClick={handleSubmit} disabled={!value}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
