"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle, Clock, AlertTriangle } from "lucide-react"

interface ResponseTrackerProps {
  surveyResults: any
}

export default function ResponseTracker({ surveyResults }: ResponseTrackerProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const { responses, questions, recipientCount } = surveyResults

  // Filter responses based on search query and active tab
  const filteredResponses = responses.filter((response: any) => {
    // Filter by search query
    if (
      searchQuery &&
      !response.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !response.email.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Filter by tab
    if (activeTab === "completed" && !response.completed) {
      return false
    }
    if (activeTab === "pending" && response.completed) {
      return false
    }

    return true
  })

  // Group questions by subtheme
  const questionsBySubtheme: Record<string, any[]> = {}
  questions.forEach((question: any) => {
    if (!questionsBySubtheme[question.subtheme]) {
      questionsBySubtheme[question.subtheme] = []
    }
    questionsBySubtheme[question.subtheme].push(question)
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Response Tracker</CardTitle>
          <CardDescription>Track individual responses to your survey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search respondents..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="border rounded-md">
            <div className="grid grid-cols-12 gap-4 p-3 bg-muted/50 border-b text-sm font-medium">
              <div className="col-span-4">Respondent</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Completion</div>
              <div className="col-span-2">Avg. Score</div>
              <div className="col-span-2">Submitted</div>
            </div>
            <div className="divide-y">
              {filteredResponses.length === 0 ? (
                <div className="p-4 text-center text-muted-foreground">No responses found matching your criteria</div>
              ) : (
                filteredResponses.map((response: any) => (
                  <div key={response.id} className="grid grid-cols-12 gap-4 p-3 items-center">
                    <div className="col-span-4">
                      <div className="flex items-center">
                        <Avatar className="h-8 w-8 mr-2">
                          <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                          <AvatarFallback>{response.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{response.name}</div>
                          <div className="text-xs text-muted-foreground">{response.email}</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2">
                      {response.completed ? (
                        <Badge className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-amber-200 text-amber-700 dark:border-amber-800 dark:text-amber-300"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="col-span-2">
                      <div className="flex items-center space-x-2">
                        <Progress value={response.completionRate} className="h-2 flex-1" />
                        <span className="text-xs">{response.completionRate}%</span>
                      </div>
                    </div>
                    <div className="col-span-2">
                      {response.completed ? (
                        <div className="flex items-center">
                          <span
                            className={`inline-block w-2 h-2 rounded-full mr-2 ${
                              response.averageScore >= 4
                                ? "bg-green-500"
                                : response.averageScore >= 3
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                            }`}
                          ></span>
                          <span>{response.averageScore.toFixed(1)}/5.0</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                    <div className="col-span-2">
                      {response.completed ? (
                        <span className="text-sm text-muted-foreground">{response.submittedAt}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Question Responses</CardTitle>
          <CardDescription>View responses to individual questions grouped by subtheme</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(questionsBySubtheme).map(([subtheme, questions]) => (
              <div key={subtheme} className="space-y-4">
                <h3 className="text-lg font-medium">{subtheme}</h3>
                <div className="space-y-4">
                  {questions.map((question: any) => (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{question.text}</h4>
                          <Badge variant="outline" className="mt-1">
                            {question.type === "likert" ? "Likert Scale (1-5)" : "Open-ended"}
                          </Badge>
                        </div>
                        {question.type === "likert" && (
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">
                            Avg: {question.averageScore.toFixed(1)}/5.0
                          </Badge>
                        )}
                      </div>

                      {question.type === "likert" ? (
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="grid grid-cols-5 gap-2 flex-1">
                              {[1, 2, 3, 4, 5].map((score) => (
                                <div key={score} className="text-center">
                                  <div className="text-xs text-muted-foreground mb-1">
                                    {score === 1
                                      ? "Strongly Disagree"
                                      : score === 2
                                        ? "Disagree"
                                        : score === 3
                                          ? "Neutral"
                                          : score === 4
                                            ? "Agree"
                                            : "Strongly Agree"}
                                  </div>
                                  <div className="font-medium">{question.distribution[score - 1]}%</div>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex h-4 rounded-md overflow-hidden">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <div
                                key={score}
                                className={`${
                                  score === 1
                                    ? "bg-red-500"
                                    : score === 2
                                      ? "bg-red-300"
                                      : score === 3
                                        ? "bg-amber-400"
                                        : score === 4
                                          ? "bg-green-300"
                                          : "bg-green-500"
                                }`}
                                style={{ width: `${question.distribution[score - 1]}%` }}
                              ></div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">
                              {question.openResponses.length} responses
                            </span>
                            <Badge
                              className={
                                question.sentiment === "positive"
                                  ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                                  : question.sentiment === "negative"
                                    ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800"
                                    : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
                              }
                            >
                              {question.sentiment === "positive"
                                ? "Positive Sentiment"
                                : question.sentiment === "negative"
                                  ? "Negative Sentiment"
                                  : "Neutral Sentiment"}
                            </Badge>
                          </div>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {question.openResponses.length > 0 ? (
                              question.openResponses.map((response: any, index: number) => (
                                <div key={index} className="p-2 bg-muted/30 rounded-md text-sm">
                                  {response}
                                </div>
                              ))
                            ) : (
                              <div className="flex items-center p-3 bg-muted/30 rounded-md">
                                <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                                <span className="text-sm text-muted-foreground">No open-ended responses received</span>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
