"use client"

import { useState } from "react"
import { Check, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ConfirmQuestionsProps {
  surveyData: any
  updateSurveyData: (data: any) => void
}

export default function ConfirmQuestions({ surveyData, updateSurveyData }: ConfirmQuestionsProps) {
  const [confirmed, setConfirmed] = useState(false)

  const handleConfirm = () => {
    setConfirmed(true)
  }

  const { title, description, theme, subtheme, questions } = surveyData

  if (!title || questions.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Missing information</AlertTitle>
        <AlertDescription>Please go back and add a title and at least one question to your survey.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <div className="flex flex-wrap gap-2 mt-2">
            {theme && <Badge variant="outline">{theme}</Badge>}
            {subtheme && <Badge variant="outline">{subtheme}</Badge>}
            <Badge variant="outline">{questions.length} questions</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {questions.map((question: any, index: number) => (
              <div key={question.id} className="border rounded-md p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium mr-2">Q{index + 1}:</span>
                      <span>{question.text}</span>
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </div>
                    <div className="flex items-center mt-1 space-x-2">
                      <Badge variant="outline">
                        {question.type === "likert" ? "Likert Scale (1-5)" : "Open-ended"}
                      </Badge>
                      {question.required && (
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800"
                        >
                          Required
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {question.type === "likert" && (
                  <div className="mt-3">
                    <div className="text-xs text-muted-foreground mb-2">Preview:</div>
                    <div className="flex items-center justify-between max-w-md">
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1">
                          1
                        </div>
                        <div className="text-xs">Strongly Disagree</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1">
                          2
                        </div>
                        <div className="text-xs">Disagree</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1">
                          3
                        </div>
                        <div className="text-xs">Neutral</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1">
                          4
                        </div>
                        <div className="text-xs">Agree</div>
                      </div>
                      <div className="text-center">
                        <div className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1">
                          5
                        </div>
                        <div className="text-xs">Strongly Agree</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {!confirmed ? (
        <div className="flex justify-center">
          <Button onClick={handleConfirm} className="w-full max-w-md">
            <Check className="h-4 w-4 mr-2" />
            Confirm Questions
          </Button>
        </div>
      ) : (
        <Alert className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
          <Check className="h-4 w-4" />
          <AlertTitle>Questions confirmed</AlertTitle>
          <AlertDescription>
            Your survey questions have been confirmed. You can now proceed to the next step.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
