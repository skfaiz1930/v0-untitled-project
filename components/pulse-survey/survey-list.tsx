"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { BarChart, Clock, CheckCircle, Edit, Trash2, Copy, Eye, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Survey } from "@/types/survey"

interface SurveyListProps {
  surveys: Survey[]
}

export default function SurveyList({ surveys }: SurveyListProps) {
  const router = useRouter()
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [surveyToDelete, setSurveyToDelete] = useState<string | null>(null)

  const handleViewResults = (surveyId: string) => {
    router.push(`/pulse-survey/results/${surveyId}`)
  }

  const handleEditSurvey = (surveyId: string) => {
    router.push(`/pulse-survey/edit/${surveyId}`)
  }

  const handleDuplicateSurvey = (surveyId: string) => {
    // In a real app, this would call an API to duplicate the survey
    console.log(`Duplicate survey: ${surveyId}`)
  }

  const handleDeleteSurvey = (surveyId: string) => {
    setSurveyToDelete(surveyId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the survey
    console.log(`Delete survey: ${surveyToDelete}`)
    setDeleteDialogOpen(false)
    setSurveyToDelete(null)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <BarChart className="h-4 w-4 text-blue-500" />
      case "draft":
        return <Clock className="h-4 w-4 text-amber-500" />
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800"
          >
            Active
          </Badge>
        )
      case "draft":
        return (
          <Badge
            variant="outline"
            className="bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
          >
            Draft
          </Badge>
        )
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
          >
            Completed
          </Badge>
        )
      default:
        return null
    }
  }

  if (surveys.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-muted p-3 mb-4">
          <BarChart className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium">No surveys found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-md">
          Create a new survey to gather feedback from your team and deliver personalized nudges.
        </p>
        <Button className="mt-4" onClick={() => router.push("/pulse-survey/create")}>
          Create New Survey
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="p-4 rounded-lg border border-border hover:border-primary/20 hover:bg-muted/30 transition-colors"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center">
                <div className="mr-2">{getStatusIcon(survey.status)}</div>
                <h3 className="font-medium text-lg">{survey.title}</h3>
                <div className="ml-3">{getStatusBadge(survey.status)}</div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center text-sm text-muted-foreground mt-1 gap-2 sm:gap-4">
                <div className="flex items-center">
                  <span className="font-medium mr-1">Theme:</span> {survey.theme}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">Questions:</span> {survey.questionCount}
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-1">Recipients:</span> {survey.recipientCount}
                </div>
                {survey.status !== "draft" && (
                  <div className="flex items-center">
                    <span className="font-medium mr-1">Responses:</span> {survey.responseCount}/{survey.recipientCount}
                  </div>
                )}
              </div>
              {survey.status === "active" && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Response Rate</span>
                    <span>{Math.round((survey.responseCount / survey.recipientCount) * 100)}%</span>
                  </div>
                  <Progress value={(survey.responseCount / survey.recipientCount) * 100} className="h-2" />
                </div>
              )}
              <div className="flex flex-wrap gap-2 mt-3">
                {survey.deliveryMethods.map((method) => (
                  <Badge key={method} variant="secondary" className="text-xs">
                    {method}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end md:self-center">
              {survey.status === "active" || survey.status === "completed" ? (
                <Button variant="outline" size="sm" onClick={() => handleViewResults(survey.id)}>
                  <Eye className="h-4 w-4 mr-2" />
                  View Results
                </Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleEditSurvey(survey.id)}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {survey.status === "draft" && (
                    <DropdownMenuItem onClick={() => handleEditSurvey(survey.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Survey
                    </DropdownMenuItem>
                  )}
                  {(survey.status === "active" || survey.status === "completed") && (
                    <DropdownMenuItem onClick={() => handleViewResults(survey.id)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Results
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleDuplicateSurvey(survey.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500 focus:text-red-500 dark:text-red-400 dark:focus:text-red-400"
                    onClick={() => handleDeleteSurvey(survey.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <div>
              <span className="font-medium">Created:</span> {format(new Date(survey.createdAt), "MMM d, yyyy")}
            </div>
            {survey.status !== "draft" && (
              <>
                <div>
                  <span className="font-medium">Start Date:</span> {format(new Date(survey.startDate), "MMM d, yyyy")}
                </div>
                <div>
                  <span className="font-medium">End Date:</span> {format(new Date(survey.endDate), "MMM d, yyyy")}
                </div>
              </>
            )}
          </div>
        </div>
      ))}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the survey and all its responses. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-500 hover:bg-red-600">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
