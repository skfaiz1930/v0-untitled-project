"use client"

import { CheckCircle, Users, Send, MessageSquare, Calendar, PlayCircle, Bell } from "lucide-react"

interface SurveyStepIndicatorProps {
  currentStep: number
  totalSteps: number
}

export default function SurveyStepIndicator({ currentStep, totalSteps }: SurveyStepIndicatorProps) {
  const steps = [
    { label: "Team Members", icon: <Users className="h-4 w-4" /> },
    { label: "Delivery", icon: <Send className="h-4 w-4" /> },
    { label: "Questions", icon: <MessageSquare className="h-4 w-4" /> },
    { label: "Schedule", icon: <Calendar className="h-4 w-4" /> },
    { label: "Test", icon: <PlayCircle className="h-4 w-4" /> },
    { label: "Summary", icon: <Bell className="h-4 w-4" /> },
  ]

  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div
              key={stepNumber}
              className={`flex flex-col items-center ${
                isActive ? "text-primary" : isCompleted ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  isActive
                    ? "border-2 border-primary text-primary"
                    : isCompleted
                      ? "bg-primary text-white"
                      : "border-2 border-muted-foreground text-muted-foreground"
                }`}
              >
                {isCompleted ? <CheckCircle className="h-5 w-5" /> : step.icon}
              </div>
              <span className="text-xs font-medium hidden md:block">{step.label}</span>
            </div>
          )
        })}

        {/* Progress bar */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}
