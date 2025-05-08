"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Download, Share, BarChart, MessageSquare, PieChart, Palette, Send } from "lucide-react"
import SurveyScorecard from "@/components/pulse-survey/results/survey-scorecard"
import SentimentAnalysis from "@/components/pulse-survey/results/sentiment-analysis"
import ResponseTracker from "@/components/pulse-survey/results/response-tracker"
import CustomizeScorecard from "@/components/pulse-survey/results/customize-scorecard"
import { mockSurveyResults } from "@/lib/mock-survey-data"

export default function SurveyResultsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("scorecard")
  const [surveyResults, setSurveyResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [customColors, setCustomColors] = useState({
    primary: "#60A5FA",
    secondary: "#6EE7B7",
    accent: "#FCA5A5",
    background: "#F3F4F6",
  })

  useEffect(() => {
    // Simulate loading survey results
    const loadResults = async () => {
      setIsLoading(true)
      // In a real app, this would be an API call
      setTimeout(() => {
        const results = mockSurveyResults.find((survey) => survey.id === params.id)
        setSurveyResults(results)
        setIsLoading(false)
      }, 1000)
    }

    loadResults()
  }, [params.id])

  const handleDownloadScorecard = () => {
    // In a real app, this would generate and download a PDF or PNG
    console.log("Downloading scorecard...")
  }

  const handleShareScorecard = () => {
    // In a real app, this would open a share dialog
    console.log("Sharing scorecard...")
  }

  const handleSendNudges = () => {
    // In a real app, this would send personalized nudges based on survey results
    console.log("Sending personalized nudges...")
  }

  if (isLoading || !surveyResults) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
            <p className="text-muted-foreground">Loading survey results...</p>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <Button variant="ghost" onClick={() => router.push("/pulse-survey")} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Surveys
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{surveyResults.title}</h1>
            <p className="text-muted-foreground">{surveyResults.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Response Rate</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-blue-500 dark:text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{surveyResults.responseRate}%</div>
              <p className="text-xs text-muted-foreground">
                {surveyResults.responseCount} out of {surveyResults.recipientCount} team members responded
              </p>
              <Progress value={surveyResults.responseRate} className="h-2 mt-3" />
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
              <div className="text-2xl font-bold">{surveyResults.averageScore.toFixed(1)}/5.0</div>
              <p className="text-xs text-muted-foreground">
                {surveyResults.averageScore >= 4
                  ? "Excellent overall feedback"
                  : surveyResults.averageScore >= 3
                    ? "Good overall feedback"
                    : "Needs improvement"}
              </p>
              <Progress
                value={(surveyResults.averageScore / 5) * 100}
                className={`h-2 mt-3 ${
                  surveyResults.averageScore >= 4
                    ? "bg-green-500"
                    : surveyResults.averageScore >= 3
                      ? "bg-amber-500"
                      : "bg-red-500"
                }`}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sentiment Analysis</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <PieChart className="h-4 w-4 text-amber-500 dark:text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{surveyResults.sentiment.positive}% Positive</div>
              <p className="text-xs text-muted-foreground">Based on analysis of open-ended responses</p>
              <div className="flex w-full h-2 mt-3 rounded-full overflow-hidden">
                <div className="bg-green-500" style={{ width: `${surveyResults.sentiment.positive}%` }}></div>
                <div
                  className="bg-gray-300 dark:bg-gray-600"
                  style={{ width: `${surveyResults.sentiment.neutral}%` }}
                ></div>
                <div className="bg-red-500" style={{ width: `${surveyResults.sentiment.negative}%` }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                <span>Positive: {surveyResults.sentiment.positive}%</span>
                <span>Neutral: {surveyResults.sentiment.neutral}%</span>
                <span>Negative: {surveyResults.sentiment.negative}%</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between mb-6">
          <Tabs defaultValue="scorecard" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="scorecard">
                <BarChart className="h-4 w-4 mr-2" />
                Scorecard
              </TabsTrigger>
              <TabsTrigger value="responses">
                <MessageSquare className="h-4 w-4 mr-2" />
                Responses
              </TabsTrigger>
              <TabsTrigger value="sentiment">
                <PieChart className="h-4 w-4 mr-2" />
                Sentiment
              </TabsTrigger>
              <TabsTrigger value="customize">
                <Palette className="h-4 w-4 mr-2" />
                Customize
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleDownloadScorecard}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleShareScorecard}>
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button onClick={handleSendNudges}>
              <Send className="h-4 w-4 mr-2" />
              Send Nudges
            </Button>
          </div>
        </div>

        <TabsContent value="scorecard" className="mt-0">
          <SurveyScorecard surveyResults={surveyResults} customColors={customColors} />
        </TabsContent>

        <TabsContent value="responses" className="mt-0">
          <ResponseTracker surveyResults={surveyResults} />
        </TabsContent>

        <TabsContent value="sentiment" className="mt-0">
          <SentimentAnalysis surveyResults={surveyResults} />
        </TabsContent>

        <TabsContent value="customize" className="mt-0">
          <CustomizeScorecard
            customColors={customColors}
            setCustomColors={setCustomColors}
            surveyResults={surveyResults}
          />
        </TabsContent>
      </div>
    </MainLayout>
  )
}
