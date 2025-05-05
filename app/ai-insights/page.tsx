"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Sparkles,
  Lightbulb,
  Target,
  MessageSquare,
  Users,
  Loader2,
  CheckCircle,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Minus,
  Download,
  Share2,
  ChevronRight,
  Star,
  Award,
  LucideLineChart,
  Activity,
  Zap,
  ArrowUpRight,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

// Mock data for team insights
const teamPerformanceData = [
  { month: "Jan", engagement: 65, collaboration: 78, productivity: 62 },
  { month: "Feb", engagement: 68, collaboration: 75, productivity: 65 },
  { month: "Mar", engagement: 72, collaboration: 77, productivity: 70 },
  { month: "Apr", engagement: 75, collaboration: 82, productivity: 73 },
  { month: "May", engagement: 70, collaboration: 85, productivity: 75 },
  { month: "Jun", engagement: 74, collaboration: 88, productivity: 78 },
]

const teamSentimentData = [
  { name: "Positive", value: 65 },
  { name: "Neutral", value: 25 },
  { name: "Negative", value: 10 },
]

const teamSkillsData = [
  { skill: "Communication", score: 78, benchmark: 72 },
  { skill: "Problem Solving", score: 82, benchmark: 75 },
  { skill: "Collaboration", score: 85, benchmark: 70 },
  { skill: "Adaptability", score: 72, benchmark: 68 },
  { skill: "Technical", score: 88, benchmark: 80 },
]

const teamMembers = [
  { id: 1, name: "Alex Johnson", role: "Product Manager", engagement: 85, growth: 12, risk: "low" },
  { id: 2, name: "Sam Taylor", role: "UX Designer", engagement: 78, growth: 8, risk: "low" },
  { id: 3, name: "Jamie Smith", role: "Developer", engagement: 92, growth: 15, risk: "low" },
  { id: 4, name: "Casey Brown", role: "QA Engineer", engagement: 65, growth: -5, risk: "medium" },
  { id: 5, name: "Morgan Lee", role: "Developer", engagement: 58, growth: -8, risk: "high" },
]

// Mock data for leadership analytics
const leadershipScoreData = [
  { month: "Jan", score: 72, benchmark: 68 },
  { month: "Feb", score: 75, benchmark: 68 },
  { month: "Mar", score: 78, benchmark: 69 },
  { month: "Apr", score: 76, benchmark: 69 },
  { month: "May", score: 80, benchmark: 70 },
  { month: "Jun", score: 85, benchmark: 70 },
]

const leadershipDimensionsData = [
  { dimension: "Vision & Strategy", score: 82, benchmark: 75 },
  { dimension: "Team Development", score: 78, benchmark: 72 },
  { dimension: "Execution", score: 85, benchmark: 78 },
  { dimension: "Communication", score: 88, benchmark: 76 },
  { dimension: "Innovation", score: 75, benchmark: 70 },
]

const leadershipGrowthAreas = [
  { area: "Delegation", score: 65, potential: 90, priority: "high" },
  { area: "Feedback", score: 72, potential: 85, priority: "medium" },
  { area: "Strategic Thinking", score: 78, potential: 88, priority: "medium" },
  { area: "Conflict Resolution", score: 68, potential: 85, priority: "high" },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"]

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState("nudge-generator")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState<any>(null)
  const [teamContext, setTeamContext] = useState("")
  const [leadershipChallenge, setLeadershipChallenge] = useState("")
  const [nudgeType, setNudgeType] = useState("team-building")
  const [teamInsightsPeriod, setTeamInsightsPeriod] = useState("6months")
  const [leadershipPeriod, setLeadershipPeriod] = useState("6months")

  const handleGenerateNudge = async () => {
    if (!teamContext || !leadershipChallenge) return

    setIsGenerating(true)
    setGeneratedContent(null)

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent({
        title: "Foster psychological safety through active listening",
        description:
          "Create an environment where team members feel comfortable sharing ideas by demonstrating active listening techniques in your next three team meetings.",
        implementationSteps: [
          {
            step: 1,
            title: "Prepare meeting structure",
            description:
              "Design your next team meeting to include dedicated time for open discussion where each team member can share ideas or concerns.",
            timeEstimate: "20 minutes",
          },
          {
            step: 2,
            title: "Practice active listening techniques",
            description:
              "During the meeting, demonstrate active listening by maintaining eye contact, asking clarifying questions, and summarizing what you've heard.",
            timeEstimate: "During meetings",
          },
          {
            step: 3,
            title: "Follow up individually",
            description:
              "After the meeting, follow up with team members who shared ideas to show you valued their input and are taking action.",
            timeEstimate: "30 minutes",
          },
        ],
        expectedOutcomes: [
          "Increased team participation in discussions",
          "More innovative ideas being shared",
          "Stronger trust between team members and leadership",
          "Better decision-making through diverse input",
        ],
      })
      setIsGenerating(false)
    }, 2000)
  }

  const handleGenerateSurvey = async () => {
    setIsGenerating(true)
    setGeneratedContent(null)

    // Simulate AI generation
    setTimeout(() => {
      setGeneratedContent({
        title: "Team Communication Effectiveness Survey",
        description:
          "This pulse survey measures how effectively information flows within your team and identifies potential communication barriers.",
        questions: [
          {
            type: "rating",
            question: "How clear are team goals and priorities to you?",
            scale: "1-5",
          },
          {
            type: "rating",
            question: "How comfortable do you feel sharing ideas or concerns with the team?",
            scale: "1-5",
          },
          {
            type: "rating",
            question: "How effective are our team meetings at sharing important information?",
            scale: "1-5",
          },
          {
            type: "open-ended",
            question: "What is one thing we could do to improve communication within our team?",
          },
          {
            type: "multiple-choice",
            question: "Which communication channel works best for you?",
            options: ["Team meetings", "Email", "Chat", "One-on-ones", "Other"],
          },
        ],
        recommendedFrequency: "Bi-weekly",
        estimatedCompletionTime: "3 minutes",
      })
      setIsGenerating(false)
    }, 2000)
  }

  const renderRiskBadge = (risk: string) => {
    switch (risk) {
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low Risk</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Risk</Badge>
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Risk</Badge>
      default:
        return null
    }
  }

  const renderGrowthIndicator = (growth: number) => {
    if (growth > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span>+{growth}%</span>
        </div>
      )
    } else if (growth < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span>{growth}%</span>
        </div>
      )
    } else {
      return (
        <div className="flex items-center text-gray-600">
          <Minus className="h-4 w-4 mr-1" />
          <span>0%</span>
        </div>
      )
    }
  }

  const renderPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800 border-red-200">High Priority</Badge>
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Medium Priority</Badge>
      case "low":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Low Priority</Badge>
      default:
        return null
    }
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <div className="mr-2 p-2 rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Leadership Insights</h1>
            <p className="text-muted-foreground">
              Leverage AI to enhance your leadership capabilities and team performance
            </p>
          </div>
        </div>

        <Tabs defaultValue="nudge-generator" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="nudge-generator">
              <Lightbulb className="h-4 w-4 mr-2" />
              Custom Nudge Generator
            </TabsTrigger>
            <TabsTrigger value="survey-generator">
              <MessageSquare className="h-4 w-4 mr-2" />
              Survey Generator
            </TabsTrigger>
            <TabsTrigger value="team-insights">
              <Users className="h-4 w-4 mr-2" />
              Team Insights
            </TabsTrigger>
            <TabsTrigger value="leadership-analytics">
              <BarChart className="h-4 w-4 mr-2" />
              Leadership Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="nudge-generator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Custom Leadership Nudges</CardTitle>
                <CardDescription>
                  Provide context about your team and leadership challenges to receive personalized nudges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="team-context" className="text-sm font-medium">
                    Team Context
                  </label>
                  <Textarea
                    id="team-context"
                    placeholder="Describe your team (size, experience level, remote/in-person, current dynamics, etc.)"
                    value={teamContext}
                    onChange={(e) => setTeamContext(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="leadership-challenge" className="text-sm font-medium">
                    Leadership Challenge
                  </label>
                  <Textarea
                    id="leadership-challenge"
                    placeholder="What leadership challenge are you facing? (e.g., improving team collaboration, managing conflict, boosting motivation)"
                    value={leadershipChallenge}
                    onChange={(e) => setLeadershipChallenge(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="nudge-type" className="text-sm font-medium">
                    Nudge Type
                  </label>
                  <Select value={nudgeType} onValueChange={setNudgeType}>
                    <SelectTrigger id="nudge-type">
                      <SelectValue placeholder="Select nudge type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="team-building">Team Building</SelectItem>
                      <SelectItem value="communication">Communication</SelectItem>
                      <SelectItem value="feedback">Feedback & Recognition</SelectItem>
                      <SelectItem value="delegation">Delegation & Empowerment</SelectItem>
                      <SelectItem value="conflict">Conflict Resolution</SelectItem>
                      <SelectItem value="innovation">Innovation & Creativity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleGenerateNudge}
                  disabled={isGenerating || !teamContext || !leadershipChallenge}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Nudge...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Custom Nudge
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {generatedContent && activeTab === "nudge-generator" && (
              <Card className="border-primary/20 bg-primary/5 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{generatedContent.title}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      AI Generated
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{generatedContent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <Target className="h-4 w-4 mr-2" />
                      Implementation Steps
                    </h3>
                    <div className="space-y-3">
                      {generatedContent.implementationSteps.map((step: any, index: number) => (
                        <div key={index} className="bg-background p-3 rounded-md">
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                              {step.step}
                            </div>
                            <div>
                              <h4 className="font-medium">{step.title}</h4>
                              <p className="text-sm text-muted-foreground">{step.description}</p>
                              <div className="flex items-center mt-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                {step.timeEstimate}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Expected Outcomes
                    </h3>
                    <ul className="list-disc list-inside text-sm text-muted-foreground pl-2">
                      {generatedContent.expectedOutcomes.map((outcome: string, index: number) => (
                        <li key={index}>{outcome}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule This Nudge
                  </Button>
                  <Button>
                    Save to My Nudges
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="survey-generator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Generate Pulse Surveys</CardTitle>
                <CardDescription>Create targeted pulse surveys to gather feedback from your team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="survey-topic" className="text-sm font-medium">
                      Survey Topic
                    </label>
                    <Select defaultValue="communication">
                      <SelectTrigger id="survey-topic">
                        <SelectValue placeholder="Select survey topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="communication">Team Communication</SelectItem>
                        <SelectItem value="engagement">Employee Engagement</SelectItem>
                        <SelectItem value="wellbeing">Team Wellbeing</SelectItem>
                        <SelectItem value="feedback">Feedback Culture</SelectItem>
                        <SelectItem value="workload">Workload & Capacity</SelectItem>
                        <SelectItem value="innovation">Innovation Climate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="survey-length" className="text-sm font-medium">
                      Survey Length
                    </label>
                    <Select defaultValue="short">
                      <SelectTrigger id="survey-length">
                        <SelectValue placeholder="Select survey length" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="very-short">Very Short (1-2 questions)</SelectItem>
                        <SelectItem value="short">Short (3-5 questions)</SelectItem>
                        <SelectItem value="medium">Medium (6-10 questions)</SelectItem>
                        <SelectItem value="comprehensive">Comprehensive (10+ questions)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="survey-context" className="text-sm font-medium">
                    Additional Context (Optional)
                  </label>
                  <Textarea
                    id="survey-context"
                    placeholder="Any specific areas you want to focus on or recent team events that might be relevant"
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleGenerateSurvey} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Survey...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Pulse Survey
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {generatedContent && activeTab === "survey-generator" && (
              <Card className="border-primary/20 bg-primary/5 animate-fade-in">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{generatedContent.title}</CardTitle>
                    <Badge variant="outline" className="bg-primary/10 text-primary">
                      AI Generated
                    </Badge>
                  </div>
                  <CardDescription className="text-base">{generatedContent.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Survey Questions
                    </h3>
                    <div className="space-y-3">
                      {generatedContent.questions.map((question: any, index: number) => (
                        <div key={index} className="bg-background p-3 rounded-md">
                          <div className="flex items-start">
                            <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                              {index + 1}
                            </div>
                            <div className="w-full">
                              <h4 className="font-medium">{question.question}</h4>
                              <div className="mt-2">
                                {question.type === "rating" && (
                                  <div className="flex items-center">
                                    <Badge variant="outline" className="mr-2">
                                      Rating Scale {question.scale}
                                    </Badge>
                                    <div className="flex space-x-1">
                                      {[1, 2, 3, 4, 5].map((num) => (
                                        <div
                                          key={num}
                                          className="w-8 h-8 rounded-md border flex items-center justify-center text-sm"
                                        >
                                          {num}
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {question.type === "open-ended" && (
                                  <div>
                                    <Badge variant="outline" className="mb-2">
                                      Open-ended
                                    </Badge>
                                    <div className="h-10 w-full bg-muted/50 rounded-md"></div>
                                  </div>
                                )}
                                {question.type === "multiple-choice" && (
                                  <div>
                                    <Badge variant="outline" className="mb-2">
                                      Multiple Choice
                                    </Badge>
                                    <div className="space-y-1">
                                      {question.options.map((option: string, i: number) => (
                                        <div key={i} className="flex items-center">
                                          <div className="w-4 h-4 rounded-full border mr-2"></div>
                                          <span className="text-sm">{option}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="flex items-center mb-2 md:mb-0">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Estimated completion time: {generatedContent.estimatedCompletionTime}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Recommended frequency: {generatedContent.recommendedFrequency}
                      </span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule Survey
                  </Button>
                  <Button>
                    Create Survey
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="team-insights" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Team Performance Insights</h2>
                <p className="text-sm text-muted-foreground">
                  AI-powered analysis of your team dynamics and performance patterns
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={teamInsightsPeriod} onValueChange={setTeamInsightsPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Team Engagement</CardTitle>
                  <CardDescription>Overall engagement score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">78%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+5%</span>
                    </div>
                  </div>
                  <Progress value={78} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">8% above industry average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Team Collaboration</CardTitle>
                  <CardDescription>Cross-functional collaboration score</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">85%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+10%</span>
                    </div>
                  </div>
                  <Progress value={85} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">15% above industry average</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Team Productivity</CardTitle>
                  <CardDescription>Output relative to goals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">72%</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+7%</span>
                    </div>
                  </div>
                  <Progress value={72} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">5% above industry average</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Team Performance Trends</CardTitle>
                  <CardDescription>Key metrics over the last 6 months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        engagement: {
                          label: "Engagement",
                          color: "hsl(var(--chart-1))",
                        },
                        collaboration: {
                          label: "Collaboration",
                          color: "hsl(var(--chart-2))",
                        },
                        productivity: {
                          label: "Productivity",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={teamPerformanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="engagement" stroke="var(--color-engagement)" strokeWidth={2} />
                          <Line
                            type="monotone"
                            dataKey="collaboration"
                            stroke="var(--color-collaboration)"
                            strokeWidth={2}
                          />
                          <Line
                            type="monotone"
                            dataKey="productivity"
                            stroke="var(--color-productivity)"
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Team Sentiment Analysis</CardTitle>
                  <CardDescription>AI analysis of team communication and feedback</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={teamSentimentData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {teamSentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Team Skills Assessment</CardTitle>
                <CardDescription>Comparison with industry benchmarks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ChartContainer
                    config={{
                      score: {
                        label: "Team Score",
                        color: "hsl(var(--chart-1))",
                      },
                      benchmark: {
                        label: "Industry Benchmark",
                        color: "hsl(var(--chart-2))",
                      },
                    }}
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={teamSkillsData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="skill" type="category" width={120} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="score" fill="var(--color-score)" />
                        <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">Team Member Insights</CardTitle>
                  <CardDescription>Individual engagement and growth metrics</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  View All Members
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center justify-end">
                            <span className="font-medium mr-2">{member.engagement}%</span>
                            {renderGrowthIndicator(member.growth)}
                          </div>
                          <p className="text-xs text-muted-foreground">Engagement</p>
                        </div>
                        <div>{renderRiskBadge(member.risk)}</div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-base">AI-Powered Team Recommendations</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      1
                    </div>
                    <div>
                      <h4 className="font-medium">Address potential burnout risk</h4>
                      <p className="text-sm text-muted-foreground">
                        Two team members are showing signs of potential burnout. Consider scheduling one-on-ones to
                        discuss workload and support needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      2
                    </div>
                    <div>
                      <h4 className="font-medium">Improve technical skill sharing</h4>
                      <p className="text-sm text-muted-foreground">
                        There's a significant gap in technical skills across the team. Consider implementing peer
                        learning sessions or mentorship pairs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      3
                    </div>
                    <div>
                      <h4 className="font-medium">Celebrate recent collaboration improvements</h4>
                      <p className="text-sm text-muted-foreground">
                        Team collaboration scores have improved significantly. Acknowledge this progress in your next
                        team meeting to reinforce positive behaviors.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leadership-analytics" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-xl font-semibold">Leadership Performance Analytics</h2>
                <p className="text-sm text-muted-foreground">Track your leadership growth and impact over time</p>
              </div>
              <div className="flex items-center space-x-2">
                <Select value={leadershipPeriod} onValueChange={setLeadershipPeriod}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">Last 3 months</SelectItem>
                    <SelectItem value="6months">Last 6 months</SelectItem>
                    <SelectItem value="12months">Last 12 months</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Leadership Score</CardTitle>
                  <CardDescription>Based on team feedback and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">85</div>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>+13</span>
                    </div>
                  </div>
                  <Progress value={85} className="mt-2" />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-muted-foreground">Industry benchmark: 70</p>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-yellow-500 mr-1" />
                      <p className="text-xs font-medium">Top 15%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Team Impact</CardTitle>
                  <CardDescription>Effect of your leadership on team performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">High</div>
                    <div className="flex items-center text-green-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      <span>Positive</span>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>Engagement</span>
                      <span className="font-medium">+12%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Retention</span>
                      <span className="font-medium">+8%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Performance</span>
                      <span className="font-medium">+15%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Growth Potential</CardTitle>
                  <CardDescription>Areas with highest development opportunity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold">Strong</div>
                    <Badge className="bg-green-100 text-green-800 border-green-200">Top 10%</Badge>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Strategic Vision</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Team Development</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-primary mr-2" />
                      <span className="text-sm">Change Management</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Leadership Score Trend</CardTitle>
                  <CardDescription>Your leadership score compared to industry benchmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Your Score",
                          color: "hsl(var(--chart-1))",
                        },
                        benchmark: {
                          label: "Industry Benchmark",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={leadershipScoreData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis domain={[0, 100]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} />
                          <Line type="monotone" dataKey="benchmark" stroke="var(--color-benchmark)" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Leadership Dimensions</CardTitle>
                  <CardDescription>Performance across key leadership areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Your Score",
                          color: "hsl(var(--chart-1))",
                        },
                        benchmark: {
                          label: "Industry Benchmark",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={leadershipDimensionsData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 100]} />
                          <YAxis dataKey="dimension" type="category" width={120} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Legend />
                          <Bar dataKey="score" fill="var(--color-score)" />
                          <Bar dataKey="benchmark" fill="var(--color-benchmark)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Growth Opportunities</CardTitle>
                <CardDescription>Areas with highest potential impact on your leadership effectiveness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leadershipGrowthAreas.map((area, index) => (
                    <div key={index} className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2">
                            {index + 1}
                          </div>
                          <h4 className="font-medium">{area.area}</h4>
                        </div>
                        {renderPriorityBadge(area.priority)}
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Current Score</span>
                            <span>{area.score}/100</span>
                          </div>
                          <Progress value={area.score} className="h-2" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Potential Impact</span>
                            <span>{area.potential}/100</span>
                          </div>
                          <Progress value={area.potential} className="h-2 bg-muted" />
                        </div>
                      </div>
                      <div className="mt-3 flex justify-end">
                        <Button variant="outline" size="sm">
                          <Zap className="h-3 w-3 mr-1" />
                          Get Nudges
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-primary" />
                  <CardTitle className="text-base">AI Leadership Coach Insights</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      <LucideLineChart className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-medium">Leadership Style Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Your leadership style shows a strong blend of transformational and democratic approaches. This
                        is highly effective for your current team composition, particularly with the mix of experienced
                        and newer team members.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      <Activity className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-medium">Feedback Pattern Detected</h4>
                      <p className="text-sm text-muted-foreground">
                        You tend to provide more detailed feedback to senior team members than to junior ones. Consider
                        balancing your approach to ensure all team members receive equally comprehensive guidance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-background p-3 rounded-md">
                  <div className="flex items-start">
                    <div className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                      <Zap className="h-3 w-3" />
                    </div>
                    <div>
                      <h4 className="font-medium">Growth Recommendation</h4>
                      <p className="text-sm text-muted-foreground">
                        Based on your leadership profile, focusing on delegation skills would have the highest impact on
                        both your effectiveness and team performance. We recommend starting with our "Strategic
                        Delegation" nudge series.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
