"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, ChevronRight, ChevronLeft, Lightbulb, Target, Users, MessageSquare, Brain } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface Question {
  id: number
  theme: string
  icon: React.ReactNode
  text: string
  options: {
    id: string
    text: string
    value: number
  }[]
}

const questions: Question[] = [
  {
    id: 1,
    theme: "Communication",
    icon: <MessageSquare className="h-5 w-5" />,
    text: "How often do you provide feedback to your team members?",
    options: [
      { id: "q1-1", text: "Rarely, only during formal reviews", value: 1 },
      { id: "q1-2", text: "Sometimes, when there are issues to address", value: 2 },
      { id: "q1-3", text: "Regularly, but not on a consistent schedule", value: 3 },
      { id: "q1-4", text: "Frequently, as part of my regular interactions", value: 4 },
      { id: "q1-5", text: "Daily, I make feedback a priority", value: 5 },
    ],
  },
  {
    id: 2,
    theme: "Vision & Strategy",
    icon: <Target className="h-5 w-5" />,
    text: "How clear is your team's vision and how often do you discuss it?",
    options: [
      { id: "q2-1", text: "We don't have a clear vision", value: 1 },
      { id: "q2-2", text: "We have a vision but rarely discuss it", value: 2 },
      { id: "q2-3", text: "We occasionally refer to our vision", value: 3 },
      { id: "q2-4", text: "We regularly align our work to our vision", value: 4 },
      { id: "q2-5", text: "Our vision guides all decisions and is frequently discussed", value: 5 },
    ],
  },
  {
    id: 3,
    theme: "Team Development",
    icon: <Users className="h-5 w-5" />,
    text: "How do you approach developing your team members' skills?",
    options: [
      { id: "q3-1", text: "I focus on their current job requirements only", value: 1 },
      { id: "q3-2", text: "I occasionally suggest training when needed", value: 2 },
      { id: "q3-3", text: "I have development discussions a few times a year", value: 3 },
      { id: "q3-4", text: "I regularly provide growth opportunities", value: 4 },
      { id: "q3-5", text: "I have a personalized development plan for each team member", value: 5 },
    ],
  },
  {
    id: 4,
    theme: "Decision Making",
    icon: <Brain className="h-5 w-5" />,
    text: "How do you typically make important decisions?",
    options: [
      { id: "q4-1", text: "I make decisions independently", value: 1 },
      { id: "q4-2", text: "I consult with a few key people", value: 2 },
      { id: "q4-3", text: "I gather input from the team before deciding", value: 3 },
      { id: "q4-4", text: "I involve the team in the decision-making process", value: 4 },
      { id: "q4-5", text: "I empower my team to make decisions when appropriate", value: 5 },
    ],
  },
  {
    id: 5,
    theme: "Innovation",
    icon: <Lightbulb className="h-5 w-5" />,
    text: "How do you approach new ideas and innovation within your team?",
    options: [
      { id: "q5-1", text: "We stick to proven methods and avoid risks", value: 1 },
      { id: "q5-2", text: "We occasionally try new approaches", value: 2 },
      { id: "q5-3", text: "We're open to new ideas when presented", value: 3 },
      { id: "q5-4", text: "We regularly brainstorm and test new approaches", value: 4 },
      { id: "q5-5", text: "Innovation is a core value and we dedicate time to it", value: 5 },
    ],
  },
]

export default function AssessmentPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [scores, setScores] = useState<Record<string, number>>({})

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: optionId,
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      calculateScores()
      setShowResults(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateScores = () => {
    const themeScores: Record<string, number> = {}

    // Initialize themes
    questions.forEach((q) => {
      if (!themeScores[q.theme]) {
        themeScores[q.theme] = 0
      }
    })

    // Calculate scores
    Object.entries(answers).forEach(([questionId, optionId]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (question) {
        const option = question.options.find((o) => o.id === optionId)
        if (option) {
          themeScores[question.theme] += option.value
        }
      }
    })

    setScores(themeScores)
  }

  const handleComplete = () => {
    toast({
      title: "Assessment Complete!",
      description: "Your personalized leadership nudges are being generated.",
    })

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/dashboard")
    }, 2000)
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-2xl">
        <AnimatePresence mode="wait">
          {showWelcome && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-blue-200 dark:border-blue-900">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Welcome to Manager Nudge</CardTitle>
                  <CardDescription className="text-lg">
                    Let's personalize your leadership development journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    This quick assessment will help us understand your leadership style and create personalized nudges
                    to help you grow.
                  </p>
                  <div className="flex flex-col space-y-2">
                    <h3 className="font-medium">What to expect:</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>5 questions about your leadership approach</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Takes about 2 minutes to complete</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Personalized leadership nudges based on your answers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                        <span>Earn your first 50 coins upon completion</span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-start space-x-2 pt-4">
                    <Checkbox
                      id="terms"
                      checked={termsAccepted}
                      onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label
                        htmlFor="terms"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        I agree to the terms and conditions
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Your data will be used to personalize your experience.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!termsAccepted} onClick={() => setShowWelcome(false)}>
                    Start Assessment
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {!showWelcome && !showResults && (
            <motion.div
              key="questions"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-blue-200 dark:border-blue-900">
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full mr-2">
                        {questions[currentQuestion].icon}
                      </div>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {questions[currentQuestion].theme}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Question {currentQuestion + 1} of {questions.length}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                  <CardTitle className="mt-4 text-xl">{questions[currentQuestion].text}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[questions[currentQuestion].id]}
                    onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
                    className="space-y-3"
                  >
                    {questions[currentQuestion].options.map((option) => (
                      <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <Label htmlFor={option.id} className="flex-grow cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                  </Button>
                  <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next <ChevronRight className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      "Complete"
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}

          {showResults && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="border-2 border-green-200 dark:border-green-900">
                <CardHeader className="text-center">
                  <div className="mx-auto bg-green-100 dark:bg-green-900/50 p-3 rounded-full w-fit mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
                  <CardDescription className="text-lg">
                    Thank you for completing your leadership assessment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-muted-foreground">
                      Based on your responses, we've identified your leadership strengths and areas for growth.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium text-center">Your Leadership Profile</h3>
                    <div className="space-y-3">
                      {Object.entries(scores).map(([theme, score]) => {
                        const normalizedScore = (score / 5) * 100
                        return (
                          <div key={theme} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{theme}</span>
                              <span>{Math.round(normalizedScore)}%</span>
                            </div>
                            <Progress value={normalizedScore} className="h-2" />
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/50 p-4 rounded-lg">
                    <div className="flex items-start">
                      <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full mr-3 mt-0.5">
                        <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-medium">What's Next?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          We'll use your profile to create personalized leadership nudges to help you grow in each area.
                          You've earned 50 coins for completing the assessment!
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={handleComplete}>
                    Continue to Dashboard
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
