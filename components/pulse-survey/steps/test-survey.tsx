"use client"

import { useState } from "react"
import { Check, AlertTriangle, Send, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface TestSurveyProps {
  surveyData: any
}

export default function TestSurvey({ surveyData }: TestSurveyProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("preview")
  const [testResponses, setTestResponses] = useState<Record<string, any>>({})
  const [testSubmitted, setTestSubmitted] = useState(false)
  const [selectedTestUser, setSelectedTestUser] = useState("you")

  const { title, description, questions, teamMembers } = surveyData

  const handleTestResponse = (questionId: string, value: any) => {
    setTestResponses({
      ...testResponses,
      [questionId]: value,
    })
  }

  const handleTestSubmit = () => {
    // Check if all required questions are answered
    const unansweredRequired = questions.filter((q: any) => q.required).filter((q: any) => !testResponses[q.id])

    if (unansweredRequired.length > 0) {
      toast({
        title: "Missing responses",
        description: "Please answer all required questions before submitting.",
        variant: "destructive",
      })
      return
    }

    setTestSubmitted(true)
    toast({
      title: "Test survey submitted",
      description: "Your test responses have been recorded. This is just a test and no data has been saved.",
    })
  }

  const handleSendTestSurvey = () => {
    toast({
      title: "Test survey sent",
      description: "A test survey has been sent to your email address.",
    })
  }

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
      <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="preview">
            <Eye className="h-4 w-4 mr-2" />
            Preview Survey
          </TabsTrigger>
          <TabsTrigger value="test">
            <Send className="h-4 w-4 mr-2" />
            Send Test Survey
          </TabsTrigger>
        </TabsList>

        <TabsContent value="preview" className="space-y-4">
          {!testSubmitted ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{title}</CardTitle>
                    <CardDescription>{description}</CardDescription>
                  </div>
                  <div>
                    <Label htmlFor="test-user" className="text-xs text-muted-foreground mb-1 block">
                      View as:
                    </Label>
                    <select
                      id="test-user"
                      value={selectedTestUser}
                      onChange={(e) => setSelectedTestUser(e.target.value)}
                      className="text-sm p-1 border rounded-md"
                    >
                      <option value="you">Yourself</option>
                      {teamMembers.map((member: any) => (
                        <option key={member.id} value={member.id}>
                          {member.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question: any, index: number) => (
                    <div key={question.id} className="space-y-2">
                      <div className="flex items-start">
                        <span className="font-medium mr-2">Q{index + 1}:</span>
                        <div>
                          <span>{question.text}</span>
                          {question.required && <span className="text-red-500 ml-1">*</span>}
                        </div>
                      </div>

                      {question.type === "likert" ? (
                        <RadioGroup
                          value={testResponses[question.id]?.toString() || ""}
                          onValueChange={(value) => handleTestResponse(question.id, Number.parseInt(value))}
                          className="flex justify-between max-w-md"
                        >
                          <div className="text-center">
                            <RadioGroupItem value="1" id={`${question.id}-1`} className="sr-only peer" />
                            <Label
                              htmlFor={`${question.id}-1`}
                              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
                            >
                              1
                            </Label>
                            <div className="text-xs">Strongly Disagree</div>
                          </div>
                          <div className="text-center">
                            <RadioGroupItem value="2" id={`${question.id}-2`} className="sr-only peer" />
                            <Label
                              htmlFor={`${question.id}-2`}
                              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
                            >
                              2
                            </Label>
                            <div className="text-xs">Disagree</div>
                          </div>
                          <div className="text-center">
                            <RadioGroupItem value="3" id={`${question.id}-3`} className="sr-only peer" />
                            <Label
                              htmlFor={`${question.id}-3`}
                              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
                            >
                              3
                            </Label>
                            <div className="text-xs">Neutral</div>
                          </div>
                          <div className="text-center">
                            <RadioGroupItem value="4" id={`${question.id}-4`} className="sr-only peer" />
                            <Label
                              htmlFor={`${question.id}-4`}
                              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
                            >
                              4
                            </Label>
                            <div className="text-xs">Agree</div>
                          </div>
                          <div className="text-center">
                            <RadioGroupItem value="5" id={`${question.id}-5`} className="sr-only peer" />
                            <Label
                              htmlFor={`${question.id}-5`}
                              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center mb-1 cursor-pointer peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white peer-data-[state=checked]:border-primary"
                            >
                              5
                            </Label>
                            <div className="text-xs">Strongly Agree</div>
                          </div>
                        </RadioGroup>
                      ) : (
                        <Textarea
                          placeholder="Type your response here..."
                          value={testResponses[question.id] || ""}
                          onChange={(e) => handleTestResponse(question.id, e.target.value)}
                          className="max-w-md"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleTestSubmit}>Submit Test Response</Button>
              </CardFooter>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-green-100 dark:bg-green-900 p-3 mb-4">
                    <Check className="h-6 w-6 text-green-600 dark:text-green-300" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Thank You!</h3>
                  <p className="text-center text-muted-foreground max-w-md">
                    Your test response has been submitted successfully. This is just a test and no data has been saved.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setTestSubmitted(false)
                      setTestResponses({})
                    }}
                    className="mt-4"
                  >
                    Reset Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="test" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Send Test Survey</CardTitle>
              <CardDescription>
                Send a test survey to yourself to see how it will appear to your team members.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>YO</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">You</p>
                    <p className="text-sm text-muted-foreground">Your email address</p>
                  </div>
                </div>

                <div className="border rounded-md p-4">
                  <h3 className="text-sm font-medium mb-2">Test Survey Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Title:</span>
                      <span className="text-sm font-medium">{title}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Questions:</span>
                      <span className="text-sm font-medium">{questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Delivery Methods:</span>
                      <div className="flex flex-wrap gap-2">
                        {surveyData.deliveryMethods.map((method: string) => (
                          <Badge key={method} variant="secondary" className="text-xs">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSendTestSurvey} className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Test Survey
              </Button>
            </CardFooter>
          </Card>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Test surveys are for preview purposes only. No data will be saved and no notifications will be sent to
              your team members.
            </AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  )
}
