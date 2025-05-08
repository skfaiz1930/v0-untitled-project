"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, AlertTriangle, TrendingUp, TrendingDown, Minus } from "lucide-react"

interface SurveyScorecardProps {
  surveyResults: any
  customColors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
}

export default function SurveyScorecard({ surveyResults, customColors }: SurveyScorecardProps) {
  const { subthemeScores, benchmarks } = surveyResults

  // Sort subthemes by score
  const sortedSubthemes = [...subthemeScores].sort((a, b) => b.score - a.score)
  const highScoring = sortedSubthemes.filter((item) => item.score >= 4)
  const lowScoring = sortedSubthemes.filter((item) => item.score < 3)

  return (
    <div className="space-y-6">
      <Card style={{ backgroundColor: customColors.background }}>
        <CardHeader>
          <CardTitle className="text-xl">Survey Scorecard</CardTitle>
          <CardDescription>Summary of survey results for {surveyResults.title}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">High-Scoring Areas</h3>
              {highScoring.length > 0 ? (
                highScoring.map((subtheme) => (
                  <div key={subtheme.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${customColors.secondary}30` }}
                        >
                          <CheckCircle className="h-4 w-4" style={{ color: customColors.secondary }} />
                        </div>
                        <span className="font-medium">{subtheme.name}</span>
                      </div>
                      <Badge className="text-white" style={{ backgroundColor: customColors.secondary }}>
                        {subtheme.score.toFixed(1)}/5.0
                      </Badge>
                    </div>
                    <Progress
                      value={(subtheme.score / 5) * 100}
                      className="h-2"
                      style={
                        {
                          backgroundColor: `${customColors.secondary}30`,
                          "--progress-color": customColors.secondary,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center p-4 border rounded-md">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-3" />
                  <p className="text-muted-foreground">No high-scoring areas found</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Areas for Improvement</h3>
              {lowScoring.length > 0 ? (
                lowScoring.map((subtheme) => (
                  <div key={subtheme.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center mr-3"
                          style={{ backgroundColor: `${customColors.accent}30` }}
                        >
                          <XCircle className="h-4 w-4" style={{ color: customColors.accent }} />
                        </div>
                        <span className="font-medium">{subtheme.name}</span>
                      </div>
                      <Badge className="text-white" style={{ backgroundColor: customColors.accent }}>
                        {subtheme.score.toFixed(1)}/5.0
                      </Badge>
                    </div>
                    <Progress
                      value={(subtheme.score / 5) * 100}
                      className="h-2"
                      style={
                        {
                          backgroundColor: `${customColors.accent}30`,
                          "--progress-color": customColors.accent,
                        } as React.CSSProperties
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="flex items-center p-4 border rounded-md">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  <p className="text-muted-foreground">No low-scoring areas found</p>
                </div>
              )}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Industry Benchmarks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benchmarks.map((benchmark: any) => {
                const subtheme = subthemeScores.find((s: any) => s.name === benchmark.name)
                const score = subtheme ? subtheme.score : 0
                const diff = score - benchmark.score

                return (
                  <div key={benchmark.name} className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{benchmark.name}</span>
                      <div className="flex items-center">
                        {diff > 0.5 ? (
                          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                        ) : diff < -0.5 ? (
                          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                        ) : (
                          <Minus className="h-4 w-4 text-amber-500 mr-1" />
                        )}
                        <Badge
                          variant="outline"
                          className={
                            diff > 0.5
                              ? "bg-green-100 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800"
                              : diff < -0.5
                                ? "bg-red-100 text-red-700 border-red-200 dark:bg-red-900 dark:text-red-300 dark:border-red-800"
                                : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900 dark:text-amber-300 dark:border-amber-800"
                          }
                        >
                          {diff > 0 ? `+${diff.toFixed(1)}` : diff < 0 ? diff.toFixed(1) : "0.0"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Your Score</div>
                        <Progress
                          value={(score / 5) * 100}
                          className="h-2"
                          style={
                            {
                              backgroundColor: `${customColors.primary}30`,
                              "--progress-color": customColors.primary,
                            } as React.CSSProperties
                          }
                        />
                        <div className="text-xs mt-1">{score.toFixed(1)}/5.0</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">Industry Average</div>
                        <Progress
                          value={(benchmark.score / 5) * 100}
                          className="h-2"
                          style={{ backgroundColor: "#e5e7eb" }}
                        />
                        <div className="text-xs mt-1">{benchmark.score.toFixed(1)}/5.0</div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
