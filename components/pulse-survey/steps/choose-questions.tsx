"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PlusCircle, Trash2, AlertTriangle, Check, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { v4 as uuidv4 } from "uuid"

interface ChooseQuestionsProps {
  surveyData: any
  updateSurveyData: (data: any) => void
}

// Question templates by theme
const questionTemplates = {
  engagement: [
    {
      id: "eng-1",
      text: "I feel motivated and engaged in my work.",
      type: "likert",
      required: true,
    },
    {
      id: "eng-2",
      text: "I have the resources I need to do my job effectively.",
      type: "likert",
      required: true,
    },
    {
      id: "eng-3",
      text: "I feel valued for my contributions to the team.",
      type: "likert",
      required: true,
    },
    {
      id: "eng-4",
      text: "What would help you feel more engaged in your work?",
      type: "open",
      required: false,
    },
  ],
  communication: [
    {
      id: "com-1",
      text: "Team communication is clear and effective.",
      type: "likert",
      required: true,
    },
    {
      id: "com-2",
      text: "I receive the information I need to do my job well.",
      type: "likert",
      required: true,
    },
    {
      id: "com-3",
      text: "I feel comfortable sharing my ideas and opinions with the team.",
      type: "likert",
      required: true,
    },
    {
      id: "com-4",
      text: "How could we improve team communication?",
      type: "open",
      required: false,
    },
  ],
  wellbeing: [
    {
      id: "wel-1",
      text: "I maintain a good work-life balance.",
      type: "likert",
      required: true,
    },
    {
      id: "wel-2",
      text: "I feel supported when dealing with work-related stress.",
      type: "likert",
      required: true,
    },
    {
      id: "wel-3",
      text: "My workload is manageable and sustainable.",
      type: "likert",
      required: true,
    },
    {
      id: "wel-4",
      text: "What would help improve your wellbeing at work?",
      type: "open",
      required: false,
    },
  ],
  leadership: [
    {
      id: "lead-1",
      text: "My manager provides clear direction and expectations.",
      type: "likert",
      required: true,
    },
    {
      id: "lead-2",
      text: "I receive helpful feedback on my performance.",
      type: "likert",
      required: true,
    },
    {
      id: "lead-3",
      text: "My manager supports my professional development.",
      type: "likert",
      required: true,
    },
    {
      id: "lead-4",
      text: "What could your manager do to better support you?",
      type: "open",
      required: false,
    },
  ],
}

export default function ChooseQuestions({ surveyData, updateSurveyData }: ChooseQuestionsProps) {
  const [title, setTitle] = useState(surveyData.title || "")
  const [description, setDescription] = useState(surveyData.description || "")
  const [theme, setTheme] = useState(surveyData.theme || "")
  const [subtheme, setSubtheme] = useState(surveyData.subtheme || "")
  const [questions, setQuestions] = useState(surveyData.questions || [])
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "likert",
    required: true,
  })
  const [activeTab, setActiveTab] = useState("create")
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Update parent component with current data
    updateSurveyData({
      title,
      description,
      theme,
      subtheme,
      questions,
    })
  }, [title, description, theme, subtheme, questions, updateSurveyData])

  const handleAddQuestion = () => {
    if (!newQuestion.text.trim()) {
      setErrors({ ...errors, questionText: "Question text is required" })
      return
    }

    const question = {
      id: uuidv4(),
      ...newQuestion,
    }

    setQuestions([...questions, question])
    setNewQuestion({
      text: "",
      type: "likert",
      required: true,
    })
    setErrors({})
  }

  const handleRemoveQuestion = (id: string) => {
    setQuestions(questions.filter((q: any) => q.id !== id))
  }

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewQuestion({ ...newQuestion, [name]: value })

    // Clear error when user types
    if (name === "text" && errors.questionText) {
      setErrors({ ...errors, questionText: "" })
    }
  }

  const handleTypeChange = (value: string) => {
    setNewQuestion({ ...newQuestion, type: value })
  }

  const handleRequiredChange = (checked: boolean) => {
    setNewQuestion({ ...newQuestion, required: checked })
  }

  const handleAddTemplateQuestions = () => {
    if (!selectedTemplate) return

    const templateQuestions = questionTemplates[selectedTemplate as keyof typeof questionTemplates].map((q) => ({
      ...q,
      id: uuidv4(), // Generate new IDs to avoid conflicts
    }))

    setQuestions([...questions, ...templateQuestions])
    setSelectedTemplate("")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="survey-title">Survey Title</Label>
          <Input
            id="survey-title"
            placeholder="Enter survey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="survey-description">Description (Optional)</Label>
          <Textarea
            id="survey-description"
            placeholder="Enter a brief description of the survey"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="survey-theme">Theme</Label>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger id="survey-theme">
                <SelectValue placeholder="Select a theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="engagement">Employee Engagement</SelectItem>
                <SelectItem value="communication">Team Communication</SelectItem>
                <SelectItem value="wellbeing">Employee Wellbeing</SelectItem>
                <SelectItem value="leadership">Leadership Effectiveness</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="survey-subtheme">Sub-theme (Optional)</Label>
            <Input
              id="survey-subtheme"
              placeholder="E.g., Remote Work, New Project"
              value={subtheme}
              onChange={(e) => setSubtheme(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <Tabs defaultValue="create" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="create">
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Questions
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Check className="h-4 w-4 mr-2" />
              Use Templates
            </TabsTrigger>
          </TabsList>

          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Add Question</CardTitle>
                <CardDescription>Create a custom question for your survey</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="question-text">Question Text</Label>
                  <Textarea
                    id="question-text"
                    name="text"
                    placeholder="Enter your question"
                    value={newQuestion.text}
                    onChange={handleQuestionChange}
                  />
                  {errors.questionText && <p className="text-sm text-red-500">{errors.questionText}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Question Type</Label>
                  <RadioGroup
                    value={newQuestion.type}
                    onValueChange={handleTypeChange}
                    className="flex flex-col space-y-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="likert" id="likert" />
                      <Label htmlFor="likert" className="cursor-pointer">
                        Likert Scale (1-5)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="open" id="open" />
                      <Label htmlFor="open" className="cursor-pointer">
                        Open-ended
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="required" checked={newQuestion.required} onCheckedChange={handleRequiredChange} />
                  <Label htmlFor="required" className="cursor-pointer">
                    Required question
                  </Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddQuestion} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question Templates</CardTitle>
                <CardDescription>Choose from pre-defined question sets based on survey themes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="template">Select Template</Label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger id="template">
                      <SelectValue placeholder="Choose a template" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="engagement">Employee Engagement</SelectItem>
                      <SelectItem value="communication">Team Communication</SelectItem>
                      <SelectItem value="wellbeing">Employee Wellbeing</SelectItem>
                      <SelectItem value="leadership">Leadership Effectiveness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedTemplate && (
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Template Preview</h3>
                    <div className="space-y-2">
                      {questionTemplates[selectedTemplate as keyof typeof questionTemplates].map((question, index) => (
                        <div key={index} className="text-sm">
                          <div className="flex items-start">
                            <span className="font-medium mr-2">Q{index + 1}:</span>
                            <div>
                              <span>{question.text}</span>
                              {question.required && <span className="text-red-500 ml-1">*</span>}
                              <div className="mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {question.type === "likert" ? "Likert Scale (1-5)" : "Open-ended"}
                                </Badge>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={handleAddTemplateQuestions} disabled={!selectedTemplate} className="w-full">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Template Questions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {questions.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Survey Questions ({questions.length})</h3>
            {questions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                onClick={() => setQuestions([])}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Remove All
              </Button>
            )}
          </div>

          <div className="space-y-2">
            {questions.map((question: any, index: number) => (
              <div
                key={question.id}
                className="flex items-start justify-between p-3 border rounded-md hover:bg-muted/50"
              >
                <div className="flex items-start">
                  <span className="font-medium mr-2">Q{index + 1}:</span>
                  <div>
                    <span>{question.text}</span>
                    {question.required && <span className="text-red-500 ml-1">*</span>}
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                  onClick={() => handleRemoveQuestion(question.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            No questions added yet. Create custom questions or select from templates to add to your survey.
          </AlertDescription>
        </Alert>
      )}

      {!title && questions.length > 0 && (
        <Alert variant="warning">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>Don't forget to add a title to your survey before proceeding.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
