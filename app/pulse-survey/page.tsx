"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, BarChart, Clock, CheckCircle } from "lucide-react"
import SurveyList from "@/components/pulse-survey/survey-list"
import { mockSurveys } from "@/lib/mock-survey-data"

export default function PulseSurveyPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")
  const [surveys, setSurveys] = useState(mockSurveys)

  const activeSurveys = surveys.filter((survey) => survey.status === "active")
  const draftSurveys = surveys.filter((survey) => survey.status === "draft")
  const completedSurveys = surveys.filter((survey) => survey.status === "completed")

  const createNewSurvey = () => {
    router.push("/pulse-survey/create")
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Pulse Surveys</h1>
            <p className="text-muted-foreground">Create and manage surveys to gather feedback from your team</p>
          </div>
          <Button onClick={createNewSurvey} className="mt-4 md:mt-0">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create New Survey
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Surveys</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-blue-500 dark:text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSurveys.length}</div>
              <p className="text-xs text-muted-foreground">
                {activeSurveys.length === 1
                  ? "1 survey collecting responses"
                  : `${activeSurveys.length} surveys collecting responses`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Draft Surveys</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-500 dark:text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{draftSurveys.length}</div>
              <p className="text-xs text-muted-foreground">
                {draftSurveys.length === 1 ? "1 survey in draft" : `${draftSurveys.length} surveys in draft`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Surveys</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSurveys.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedSurveys.length === 1 ? "1 survey completed" : `${completedSurveys.length} surveys completed`}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Surveys</CardTitle>
            <CardDescription>Manage your pulse surveys and view results</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="draft">Draft</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="all">All Surveys</TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                <SurveyList surveys={activeSurveys} />
              </TabsContent>

              <TabsContent value="draft">
                <SurveyList surveys={draftSurveys} />
              </TabsContent>

              <TabsContent value="completed">
                <SurveyList surveys={completedSurveys} />
              </TabsContent>

              <TabsContent value="all">
                <SurveyList surveys={surveys} />
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t bg-muted/50 px-6 py-3">
            <p className="text-xs text-muted-foreground">
              Surveys are anonymous by default. Team members will not be identified in the results unless you enable
              identifiable responses.
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}
