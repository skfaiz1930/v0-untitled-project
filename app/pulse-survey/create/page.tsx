"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Save, Users, MessageSquare, Calendar, Bell, Send, PlayCircle } from "lucide-react"
import SurveyStepIndicator from "@/components/pulse-survey/survey-step-indicator"
import AddTeamMembers from "@/components/pulse-survey/steps/add-team-members"
import ChooseDeliverySystem from "@/components/pulse-survey/steps/choose-delivery-system"
import ChooseQuestions from "@/components/pulse-survey/steps/choose-questions"
import ScheduleSurvey from "@/components/pulse-survey/steps/schedule-survey"
import TestSurvey from "@/components/pulse-survey/steps/test-survey"
import SurveySummary from "@/components/pulse-survey/steps/survey-summary"
import { useToast } from "@/hooks/use-toast"

export default function CreateSurveyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [surveyData, setSurveyData] = useState({
    title: "",
    description: "",
    theme: "",
    subtheme: "",
    teamMembers: [],
    deliveryMethods: [],
    questions: [],
    startDate: null,
    endDate: null,
    reminderFrequency: "3days",
    isAnonymous: true,
  })

  const totalSteps = 6
  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === totalSteps

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSaveDraft = () => {
    toast({
      title: "Survey saved as draft",
      description: "Your survey has been saved as a draft and can be edited later.",
    })
    router.push("/pulse-survey")
  }

  const handleLaunchSurvey = () => {
    toast({
      title: "Survey launched successfully",
      description: "Your survey has been sent to the selected team members.",
    })
    router.push("/pulse-survey")
  }

  const updateSurveyData = (data: any) => {
    setSurveyData((prev) => ({ ...prev, ...data }))
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
            <h1 className="text-2xl font-bold tracking-tight">Create Pulse Survey</h1>
            <p className="text-muted-foreground">Create a new survey to gather feedback from your team</p>
          </div>
        </div>

        <div className="mb-8">
          <SurveyStepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && (
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Add Team Members
                </div>
              )}
              {currentStep === 2 && (
                <div className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-primary" />
                  Choose Delivery System
                </div>
              )}
              {currentStep === 3 && (
                <div className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                  Add or Choose Questions
                </div>
              )}
              {currentStep === 4 && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Schedule Survey
                </div>
              )}
              {currentStep === 5 && (
                <div className="flex items-center">
                  <PlayCircle className="h-5 w-5 mr-2 text-primary" />
                  Test Survey
                </div>
              )}
              {currentStep === 6 && (
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-primary" />
                  Survey Summary
                </div>
              )}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Select team members to include in your pulse survey."}
              {currentStep === 2 && "Choose how you want to deliver the survey to your team."}
              {currentStep === 3 && "Create custom questions or select from templates."}
              {currentStep === 4 && "Set the start and end dates for your survey."}
              {currentStep === 5 && "Preview and test your survey before launching."}
              {currentStep === 6 && "Review your survey details before launching."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep === 1 && <AddTeamMembers surveyData={surveyData} updateSurveyData={updateSurveyData} />}
            {currentStep === 2 && <ChooseDeliverySystem surveyData={surveyData} updateSurveyData={updateSurveyData} />}
            {currentStep === 3 && <ChooseQuestions surveyData={surveyData} updateSurveyData={updateSurveyData} />}
            {currentStep === 4 && <ScheduleSurvey surveyData={surveyData} updateSurveyData={updateSurveyData} />}
            {currentStep === 5 && <TestSurvey surveyData={surveyData} />}
            {currentStep === 6 && <SurveySummary surveyData={surveyData} />}
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <div>
            {!isFirstStep && (
              <Button onClick={handlePrevious} variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>
            )}
          </div>
          <div className="flex space-x-2">
            <Button onClick={handleSaveDraft} variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save as Draft
            </Button>
            {!isLastStep ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleLaunchSurvey}>
                <Send className="h-4 w-4 mr-2" />
                Launch Survey
              </Button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
