"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Send, Clock, Coins, Info, AlertCircle, ThumbsUp, ThumbsDown } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Mock coaching history
const initialCoachingHistory = [
  {
    id: "c1",
    question: "How can I give constructive feedback to a team member who is underperforming?",
    answer:
      "When giving feedback to an underperforming team member, be specific about the behavior or results that need improvement, not the person's character. Start with positive observations, then address concerns using the situation-behavior-impact model. Always end with clear, actionable next steps and offer your support. Remember to have this conversation in private and maintain a collaborative tone.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // 3 days ago
    cost: 30,
    helpful: true,
  },
  {
    id: "c2",
    question: "What's the best way to run effective team meetings?",
    answer:
      "Effective team meetings start with a clear agenda shared in advance. Begin on time and state the meeting's purpose and desired outcomes. Encourage participation from everyone and assign a timekeeper to stay on track. Capture action items with owners and deadlines. End by summarizing decisions and next steps. Follow up with meeting notes within 24 hours. Consider implementing a 'no devices' policy to maintain focus and engagement.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    cost: 25,
    helpful: null,
  },
]

interface CoachingMessage {
  id: string
  question: string
  answer: string
  timestamp: string
  cost: number
  helpful: boolean | null
}

export function CoachingInterface() {
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [coachingHistory, setCoachingHistory] = useState<CoachingMessage[]>(initialCoachingHistory)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [currentCost, setCurrentCost] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { coins, spendCoins, addXp } = useGamification()
  const { toast } = useToast()

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [coachingHistory])

  const calculateCost = (question: string): number => {
    // Base cost is 20 coins
    let cost = 20

    // Add cost based on question complexity (length)
    if (question.length > 100) {
      cost += 10
    } else if (question.length > 50) {
      cost += 5
    }

    return cost
  }

  const handleSubmit = () => {
    if (!question.trim()) return

    const cost = calculateCost(question)
    setCurrentCost(cost)
    setShowConfirmation(true)
  }

  const confirmSubmit = () => {
    setShowConfirmation(false)

    if (spendCoins(currentCost)) {
      setIsLoading(true)

      // Simulate API call to AI coaching service
      setTimeout(() => {
        const newMessage: CoachingMessage = {
          id: `c${Date.now()}`,
          question,
          answer: generateCoachingResponse(question),
          timestamp: new Date().toISOString(),
          cost: currentCost,
          helpful: null,
        }

        setCoachingHistory((prev) => [...prev, newMessage])
        setQuestion("")
        setIsLoading(false)

        // Add XP for using the coaching feature
        addXp(15)
      }, 2000)
    } else {
      toast({
        title: "Not enough coins",
        description: `You need ${currentCost} coins to ask this question.`,
        variant: "destructive",
      })
    }
  }

  const markHelpful = (id: string, isHelpful: boolean) => {
    setCoachingHistory((prev) =>
      prev.map((msg) =>
        msg.id === id
          ? {
              ...msg,
              helpful: isHelpful,
            }
          : msg,
      ),
    )

    // Add XP for providing feedback
    addXp(5)

    toast({
      title: "Thank you for your feedback",
      description: "Your feedback helps improve the AI coach.",
    })
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

    if (diffMins < 60) {
      return `${diffMins} min ago`
    } else if (diffHours < 24) {
      return `${diffHours} hr ago`
    } else if (diffDays === 1) {
      return "Yesterday"
    } else if (diffDays < 7) {
      return `${diffDays} days ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Mock function to generate coaching responses
  const generateCoachingResponse = (question: string): string => {
    const responses = [
      "To effectively delegate tasks, start by identifying which tasks can be delegated and which team members have the right skills. Clearly communicate expectations, provide necessary resources, and establish checkpoints for feedback. Remember that delegation is not just about offloading work, but also about developing your team members' skills and building trust.",
      "When managing conflict between team members, first speak with each person individually to understand their perspective. Then, bring them together for a facilitated conversation focused on the issue, not personalities. Establish ground rules for the discussion, help them find common ground, and work toward a solution that addresses both parties' concerns. Follow up to ensure the resolution sticks.",
      "To improve team communication, establish regular check-ins with a consistent format. Create clear channels for different types of communication (urgent vs. FYI). Encourage active listening by modeling it yourself. Set expectations for response times and preferred methods. Remember that communication styles vary, so be flexible and adapt your approach based on individual team member needs.",
      "When setting goals with your team, use the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound). Involve team members in the goal-setting process to increase buy-in. Connect individual goals to broader team and organizational objectives. Establish regular check-ins to track progress and adjust as needed. Celebrate achievements along the way to maintain motivation.",
      "To build psychological safety in your team, start by modeling vulnerability and admitting when you don't know something or make a mistake. Respond positively when team members take risks or share concerns. Avoid blame and focus on learning from failures. Actively invite input from everyone and show that you value diverse perspectives. Be consistent in these behaviors to establish trust over time.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Leadership Coach
              </CardTitle>
              <CardDescription>Ask questions and get personalized leadership advice</CardDescription>
            </div>
            <Badge variant="outline" className="flex items-center gap-1">
              <Coins className="h-3.5 w-3.5 text-yellow-500" />
              <span className="font-medium">{coins} coins</span>
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto pb-0">
          <div className="space-y-6">
            {coachingHistory.map((message) => (
              <div key={message.id} className="space-y-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="You" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted p-3 rounded-lg">
                      <p className="text-sm">{message.question}</p>
                    </div>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatTimestamp(message.timestamp)}</span>
                      <span className="mx-2">•</span>
                      <Coins className="h-3 w-3 mr-1 text-yellow-500" />
                      <span>{message.cost} coins</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8 mt-1 bg-primary/10">
                    <AvatarFallback className="text-primary">AI</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-primary/5 border border-primary/10 p-3 rounded-lg">
                      <p className="text-sm whitespace-pre-line">{message.answer}</p>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <div className="text-xs text-muted-foreground">
                        <Info className="h-3 w-3 inline mr-1" />
                        <span>AI-generated advice based on leadership best practices</span>
                      </div>
                      {message.helpful === null ? (
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => markHelpful(message.id, true)}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Helpful
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => markHelpful(message.id, false)}
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Not helpful
                          </Button>
                        </div>
                      ) : (
                        <Badge variant="outline" className={message.helpful ? "text-green-600" : "text-red-600"}>
                          {message.helpful ? (
                            <>
                              <ThumbsUp className="h-3 w-3 mr-1" /> Marked as helpful
                            </>
                          ) : (
                            <>
                              <ThumbsDown className="h-3 w-3 mr-1" /> Marked as not helpful
                            </>
                          )}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="w-full flex items-center gap-2">
            <Textarea
              placeholder="Ask a leadership question..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[80px]"
              disabled={isLoading}
            />
            <Button className="h-[80px] px-3" onClick={handleSubmit} disabled={!question.trim() || isLoading}>
              {isLoading ? (
                <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </Button>
          </div>
          <div className="text-xs text-muted-foreground flex items-center">
            <AlertCircle className="h-3 w-3 mr-1" />
            <span>
              Questions cost 20-30 coins depending on complexity. Your data is used to provide personalized advice.
            </span>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Coaching Request</DialogTitle>
            <DialogDescription>You're about to spend coins to get personalized leadership advice.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm font-medium mb-1">Your question:</p>
              <p className="text-sm bg-muted p-3 rounded-lg">{question}</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
              <div className="flex items-center">
                <Coins className="h-4 w-4 text-yellow-500 mr-2" />
                <span className="font-medium">Cost: {currentCost} coins</span>
              </div>
              <div className="text-sm text-muted-foreground">Your balance: {coins} coins</div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={confirmSubmit} disabled={coins < currentCost}>
              <Sparkles className="h-4 w-4 mr-2" />
              Get AI Coaching
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
