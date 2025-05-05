"use client"

import { Check, AlertTriangle, Calendar, Users, MessageSquare, Bell, Mail, Slack } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { format } from "date-fns"

interface SurveySummaryProps {
  surveyData: any
}

export default function SurveySummary({ surveyData }: SurveySummaryProps) {
  const {
    title,
    description,
    theme,
    subtheme,
    teamMembers,
    deliveryMethods,
    questions,
    startDate,
    endDate,
    reminderFrequency,
    isAnonymous,
  } = surveyData

  const getDeliveryIcon = (method: string) => {
    switch (method) {
      case "Email":
        return <Mail className="h-4 w-4 mr-2" />
      case "Slack":
        return <Slack className="h-4 w-4 mr-2" />
      case "MS Teams":
        return <MessageSquare className="h-4 w-4 mr-2" />
      case "In-app":
        return <Bell className="h-4 w-4 mr-2" />
      default:
        return null
    }
  }

  const getReminderText = () => {
    switch (reminderFrequency) {
      case "daily":
        return "Daily reminders"
      case "3days":
        return "Reminders every 3 days"
      case "weekly":
        return "Weekly reminders"
      default:
        return "Reminders every 3 days"
    }
  }

  const missingRequiredFields = () => {
    const required = []
    if (!title) required.push("Title")
    if (!questions || questions.length === 0) required.push("Questions")
    if (!teamMembers || teamMembers.length === 0) required.push("Team Members")
    if (!deliveryMethods || deliveryMethods.length === 0) required.push("Delivery Methods")
    if (!startDate) required.push("Start Date")
    if (!endDate) required.push("End Date")
    return required
  }

  const missing = missingRequiredFields()

  if (missing.length > 0) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Missing information</AlertTitle>
        <AlertDescription>
          Please complete the following required fields before launching your survey:
          <ul className="list-disc list-inside mt-2">
            {missing.map((field) => (
              <li key={field}>{field}</li>
            ))}
          </ul>
        </AlertDescription>
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
            {isAnonymous ? (
              <Badge
                variant="outline"
                className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
              >
                Anonymous
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
              >
                Non-Anonymous
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-primary" />
                  Schedule
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Start Date:</span>
                    <span>{format(new Date(startDate), "PPP")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">End Date:</span>
                    <span>{format(new Date(endDate), "PPP")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reminders:</span>
                    <span>{getReminderText()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                  Questions
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Questions:</span>
                    <span>{questions.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Required Questions:</span>
                    <span>{questions.filter((q: any) => q.required).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Likert Scale Questions:</span>
                    <span>{questions.filter((q: any) => q.type === "likert").length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Open-ended Questions:</span>
                    <span>{questions.filter((q: any) => q.type === "open").length}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Bell className="h-4 w-4 mr-2 text-primary" />
                  Delivery Methods
                </h3>
                <div className="flex flex-wrap gap-2">
                  {deliveryMethods.map((method: string) => (
                    <Badge key={method} className="flex items-center">
                      {getDeliveryIcon(method)}
                      {method}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-primary" />
                  Recipients
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Recipients:</span>
                    <span>{teamMembers.length}</span>
                  </div>
                </div>
                <div className="mt-2 border rounded-md max-h-40 overflow-y-auto">
                  <div className="p-2 bg-muted/50 border-b">
                    <span className="text-xs font-medium">Team Members</span>
                  </div>
                  <div className="divide-y">
                    {teamMembers.slice(0, 5).map((member: any) => (
                      <div key={member.id} className="p-2 text-sm flex justify-between">
                        <span>{member.name}</span>
                        <span className="text-muted-foreground">{member.role}</span>
                      </div>
                    ))}
                    {teamMembers.length > 5 && (
                      <div className="p-2 text-sm text-center text-muted-foreground">
                        + {teamMembers.length - 5} more team members
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Survey Preview</h3>
                <div className="border rounded-md max-h-60 overflow-y-auto">
                  <div className="p-3 bg-muted/50 border-b">
                    <span className="font-medium">{title}</span>
                  </div>
                  <div className="p-3 text-sm text-muted-foreground">{description}</div>
                  <div className="divide-y">
                    {questions.slice(0, 3).map((question: any, index: number) => (
                      <div key={question.id} className="p-3">
                        <div className="flex items-start">
                          <span className="font-medium mr-2">Q{index + 1}:</span>
                          <div>
                            <span>{question.text}</span>
                            {question.required && <span className="text-red-500 ml-1">*</span>}
                          </div>
                        </div>
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs">
                            {question.type === "likert" ? "Likert Scale (1-5)" : "Open-ended"}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    {questions.length > 3 && (
                      <div className="p-3 text-sm text-center text-muted-foreground">
                        + {questions.length - 3} more questions
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
        <Check className="h-4 w-4" />
        <AlertTitle>Ready to Launch</AlertTitle>
        <AlertDescription>
          Your survey is ready to be launched. Click the "Launch Survey" button to send it to your team members.
        </AlertDescription>
      </Alert>
    </div>
  )
}
