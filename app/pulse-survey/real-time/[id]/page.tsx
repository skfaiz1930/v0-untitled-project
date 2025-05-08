"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Download,
  Share2,
  MessageSquare,
  RefreshCw,
  ChevronRight,
  UserCheck,
  UserX,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { mockSurveyData } from "@/lib/mock-survey-data"

export default function RealTimeSurveyPage() {
  const params = useParams()
  const surveyId = params.id as string
  const [survey, setSurvey] = useState(mockSurveyData)
  const [activeTab, setActiveTab] = useState("overview")
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update data to simulate real-time changes
      if (Math.random() > 0.7) {
        const updatedSurvey = { ...survey }

        // Simulate a new response
        if (updatedSurvey.notStartedResponses > 0 || updatedSurvey.inProgressResponses > 0) {
          if (Math.random() > 0.5 && updatedSurvey.inProgressResponses > 0) {
            // Complete an in-progress response
            updatedSurvey.completedResponses += 1
            updatedSurvey.inProgressResponses -= 1

            // Update a participant status
            const inProgressParticipant = updatedSurvey.participants.find((p) => p.status === "in-progress")
            if (inProgressParticipant) {
              inProgressParticipant.status = "completed"
              inProgressParticipant.completedAt = new Date().toISOString()
            }

            // Update completion rate
            updatedSurvey.completionRate = Math.round(
              (updatedSurvey.completedResponses / updatedSurvey.totalParticipants) * 100,
            )

            // Update response timeline
            const today = new Date()
            const dateStr = `May ${today.getDate()}`
            const timelineEntry = updatedSurvey.responseTimeline.find((entry) => entry.date === dateStr)
            if (timelineEntry) {
              timelineEntry.responses += 1
            }

            // Slightly adjust average scores
            updatedSurvey.questions.forEach((question) => {
              if (question.type === "rating") {
                question.averageScore = +(question.averageScore + (Math.random() * 0.4 - 0.2)).toFixed(1)
                if (question.averageScore > 5) question.averageScore = 5
                if (question.averageScore < 1) question.averageScore = 1
              }
            })

            // Update overall average
            updatedSurvey.averageScore = +(
              updatedSurvey.questions.filter((q) => q.type === "rating").reduce((sum, q) => sum + q.averageScore, 0) /
              updatedSurvey.questions.filter((q) => q.type === "rating").length
            ).toFixed(1)

            setSurvey(updatedSurvey)
          } else if (updatedSurvey.notStartedResponses > 0) {
            // Start a not-started response
            updatedSurvey.notStartedResponses -= 1
            updatedSurvey.inProgressResponses += 1

            // Update a participant status
            const notStartedParticipant = updatedSurvey.participants.find((p) => p.status === "not-started")
            if (notStartedParticipant) {
              notStartedParticipant.status = "in-progress"
              notStartedParticipant.startedAt = new Date().toISOString()
            }

            setSurvey(updatedSurvey)
          }
        }
      }
    }, 5000) // Check for updates every 5 seconds

    return () => clearInterval(interval)
  }, [survey])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "not-started":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return ""
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-3 w-3 mr-1" />
      case "in-progress":
        return <Clock className="h-3 w-3 mr-1" />
      case "not-started":
        return <AlertCircle className="h-3 w-3 mr-1" />
      default:
        return null
    }
  }

  const formatResponseData = (questions: any[]) => {
    return questions
      .filter((q) => q.type === "rating")
      .map((q) => ({
        name: q.text.length > 30 ? q.text.substring(0, 30) + "..." : q.text,
        score: q.averageScore,
      }))
  }

  const responseData = formatResponseData(survey.questions)

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <div className="flex items-center">
              <Badge className="mr-2 bg-green-100 text-green-800 border-green-200">Live</Badge>
              <h1 className="text-2xl font-bold tracking-tight">{survey.title}</h1>
            </div>
            <p className="text-muted-foreground mt-1">{survey.description}</p>
          </div>
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-blue-500 dark:text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{survey.completionRate}%</div>
              <Progress value={survey.completionRate} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {survey.completedResponses} of {survey.totalParticipants} responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-green-500 dark:text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{survey.averageScore}/5.0</div>
              <Progress value={(survey.averageScore / 5) * 100} className="mt-2 bg-green-100 dark:bg-green-900" />
              <p className="text-xs text-muted-foreground mt-2">
                Based on {survey.completedResponses} completed responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Status</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <Users className="h-4 w-4 text-amber-500 dark:text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-500 mr-1"></div>
                  <span className="text-xs">Completed</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                  <span className="text-xs">In Progress</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-gray-300 mr-1"></div>
                  <span className="text-xs">Not Started</span>
                </div>
              </div>
              <div className="flex h-4 mt-2 overflow-hidden rounded-full">
                <div
                  className="bg-green-500"
                  style={{
                    width: `${(survey.completedResponses / survey.totalParticipants) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-blue-500"
                  style={{
                    width: `${(survey.inProgressResponses / survey.totalParticipants) * 100}%`,
                  }}
                ></div>
                <div
                  className="bg-gray-300"
                  style={{
                    width: `${(survey.notStartedResponses / survey.totalParticipants) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{survey.completedResponses} completed</span>
                <span>{survey.inProgressResponses} in progress</span>
                <span>{survey.notStartedResponses} not started</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Remaining</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-500 dark:text-purple-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5 days</div>
              <Progress value={30} className="mt-2 bg-purple-100 dark:bg-purple-900" />
              <p className="text-xs text-muted-foreground mt-2">
                Survey closes on {new Date(survey.endDate).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Response Timeline</CardTitle>
                  <CardDescription>Number of responses received over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        responses: {
                          label: "Responses",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={survey.responseTimeline}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="responses" fill="var(--color-responses)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Question Scores</CardTitle>
                  <CardDescription>Average scores for each question</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ChartContainer
                      config={{
                        score: {
                          label: "Average Score",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={responseData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" domain={[0, 5]} />
                          <YAxis dataKey="name" type="category" width={150} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="score" fill="var(--color-score)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest responses and actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {survey.participants
                    .filter((p) => p.status === "completed")
                    .sort((a, b) => {
                      if (!a.completedAt || !b.completedAt) return 0
                      return new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
                    })
                    .slice(0, 5)
                    .map((participant) => (
                      <div key={participant.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                            <span className="font-semibold text-blue-600 dark:text-blue-400">
                              {participant.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium">{participant.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Completed survey{" "}
                              {participant.completedAt && new Date(participant.completedAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="link" className="ml-auto">
                  View All Activity
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                This dashboard updates in real-time as participants complete the survey. You can also manually refresh
                the data.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Details</CardTitle>
                <CardDescription>Detailed breakdown of all responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {survey.questions.map((question) => (
                  <div key={question.id} className="space-y-3">
                    <h3 className="font-medium">{question.text}</h3>
                    {question.type === "rating" ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm">Average: {question.averageScore}/5.0</span>
                          <span className="text-sm">
                            {question.responses.reduce((sum, r) => sum + r.count, 0)} responses
                          </span>
                        </div>
                        <div className="space-y-2">
                          {question.responses.map((response, index) => (
                            <div key={index} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center">
                                  <span className="w-4 text-center">{response.value}</span>
                                  <span className="ml-2 text-muted-foreground">
                                    {response.count} {response.count === 1 ? "response" : "responses"}
                                  </span>
                                </div>
                                <span>{Math.round((response.count / survey.completedResponses) * 100)}%</span>
                              </div>
                              <Progress value={(response.count / survey.completedResponses) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          {question.responses.length} text responses received
                        </p>
                        <div className="space-y-2">
                          {question.responses.map((response, index) => (
                            <div key={index} className="p-3 bg-muted/30 rounded-md">
                              <p className="text-sm">{response}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <Separator className="my-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="participants" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Participant Status</CardTitle>
                  <CardDescription>Status of all survey participants</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <UserCheck className="h-4 w-4 mr-2" />
                    Send Reminder
                  </Button>
                  <Button variant="outline" size="sm">
                    <UserX className="h-4 w-4 mr-2" />
                    Remove Participant
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Completed</h3>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {survey.completedResponses}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {survey.participants
                          .filter((p) => p.status === "completed")
                          .map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                            >
                              <span className="text-sm">{participant.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {participant.completedAt &&
                                  new Date(participant.completedAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">In Progress</h3>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          {survey.inProgressResponses}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {survey.participants
                          .filter((p) => p.status === "in-progress")
                          .map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                            >
                              <span className="text-sm">{participant.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {participant.startedAt &&
                                  new Date(participant.startedAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Not Started</h3>
                        <Badge className="bg-gray-100 text-gray-800 border-gray-200">
                          {survey.notStartedResponses}
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {survey.participants
                          .filter((p) => p.status === "not-started")
                          .map((participant) => (
                            <div
                              key={participant.id}
                              className="flex items-center justify-between p-2 bg-muted/30 rounded-md"
                            >
                              <span className="text-sm">{participant.name}</span>
                              <Button variant="ghost" size="sm" className="h-7 px-2">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                Remind
                              </Button>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="questions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Survey Questions</CardTitle>
                <CardDescription>View and manage survey questions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {survey.questions.map((question, index) => (
                    <div key={question.id} className="p-4 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">Question {index + 1}</h3>
                        <Badge variant="outline">
                          {question.type === "rating" ? "Rating Question" : "Open-Ended Question"}
                        </Badge>
                      </div>
                      <p className="mb-4">{question.text}</p>
                      {question.type === "rating" && (
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span>Average Score</span>
                            <span className="font-medium">{question.averageScore}/5.0</span>
                          </div>
                          <Progress value={(question.averageScore / 5) * 100} className="h-2" />
                        </div>
                      )}
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          View Responses
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="link" className="ml-auto">
                  Export Questions
                  <Download className="h-4 w-4 ml-1" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
