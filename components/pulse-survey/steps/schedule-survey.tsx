"use client"

import { useState, useEffect } from "react"
import { CalendarIcon, Clock, Bell, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { format, addDays, isBefore } from "date-fns"
import { cn } from "@/lib/utils"

interface ScheduleSurveyProps {
  surveyData: any
  updateSurveyData: (data: any) => void
}

export default function ScheduleSurvey({ surveyData, updateSurveyData }: ScheduleSurveyProps) {
  const [startDate, setStartDate] = useState<Date | null>(surveyData.startDate || null)
  const [endDate, setEndDate] = useState<Date | null>(surveyData.endDate || null)
  const [reminderFrequency, setReminderFrequency] = useState<string>(surveyData.reminderFrequency || "3days")
  const [sendReminders, setSendReminders] = useState<boolean>(true)
  const [isAnonymous, setIsAnonymous] = useState<boolean>(surveyData.isAnonymous !== false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    // Validate dates
    const newErrors: Record<string, string> = {}

    if (startDate && endDate && isBefore(endDate, startDate)) {
      newErrors.endDate = "End date must be after start date"
    }

    setErrors(newErrors)

    // Update parent component
    if (Object.keys(newErrors).length === 0) {
      updateSurveyData({
        startDate,
        endDate,
        reminderFrequency,
        isAnonymous,
      })
    }
  }, [startDate, endDate, reminderFrequency, isAnonymous, updateSurveyData])

  const handleStartDateSelect = (date: Date | undefined) => {
    if (!date) return
    setStartDate(date)

    // If end date is before start date or not set, update it
    if (!endDate || isBefore(endDate, date)) {
      setEndDate(addDays(date, 7))
    }
  }

  const handleEndDateSelect = (date: Date | undefined) => {
    if (!date) return
    setEndDate(date)
  }

  const getReminderSchedule = () => {
    if (!startDate || !endDate || !sendReminders) return []

    const schedule = []
    let currentDate = new Date(startDate)

    while (isBefore(currentDate, endDate)) {
      schedule.push(new Date(currentDate))

      switch (reminderFrequency) {
        case "daily":
          currentDate = addDays(currentDate, 1)
          break
        case "3days":
          currentDate = addDays(currentDate, 3)
          break
        case "weekly":
          currentDate = addDays(currentDate, 7)
          break
        default:
          currentDate = addDays(currentDate, 3)
      }
    }

    // Remove the first date (start date) and last date if it's after end date
    return schedule.slice(1).filter((date) => isBefore(date, endDate))
  }

  const reminderSchedule = getReminderSchedule()

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !startDate && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={startDate || undefined}
                  onSelect={handleStartDateSelect}
                  initialFocus
                  disabled={(date) => isBefore(date, new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label>End Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal", !endDate && "text-muted-foreground")}
                  disabled={!startDate}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP") : "Select end date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={endDate || undefined}
                  onSelect={handleEndDateSelect}
                  initialFocus
                  disabled={(date) => (startDate ? isBefore(date, startDate) : true)}
                />
              </PopoverContent>
            </Popover>
            {errors.endDate && <p className="text-sm text-red-500">{errors.endDate}</p>}
          </div>

          <div className="space-y-4 mt-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="send-reminders">Send Reminders</Label>
                <p className="text-xs text-muted-foreground">Send reminders to team members who haven't responded</p>
              </div>
              <Switch id="send-reminders" checked={sendReminders} onCheckedChange={setSendReminders} />
            </div>

            {sendReminders && (
              <div className="space-y-2">
                <Label>Reminder Frequency</Label>
                <RadioGroup
                  value={reminderFrequency}
                  onValueChange={setReminderFrequency}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="daily" id="daily" />
                    <Label htmlFor="daily" className="cursor-pointer">
                      Daily
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3days" id="3days" />
                    <Label htmlFor="3days" className="cursor-pointer">
                      Every 3 days
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer">
                      Weekly
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous-responses">Anonymous Responses</Label>
              <p className="text-xs text-muted-foreground">
                Keep survey responses anonymous to encourage honest feedback
              </p>
            </div>
            <Switch id="anonymous-responses" checked={isAnonymous} onCheckedChange={setIsAnonymous} />
          </div>

          {!isAnonymous && (
            <Alert variant="warning">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Non-anonymous surveys may receive less candid feedback. Only use this option when you need to follow up
                with specific team members.
              </AlertDescription>
            </Alert>
          )}

          {startDate && endDate && (
            <div className="border rounded-md p-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Survey Timeline</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-2">
                    <CalendarIcon className="h-3 w-3 text-blue-500 dark:text-blue-300" />
                  </div>
                  <div>
                    <p className="text-sm">Start: {format(startDate, "PPP")}</p>
                    <p className="text-xs text-muted-foreground">Survey will be sent to team members</p>
                  </div>
                </div>

                {sendReminders && reminderSchedule.length > 0 && (
                  <div className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center mr-2 mt-1">
                      <Bell className="h-3 w-3 text-amber-500 dark:text-amber-300" />
                    </div>
                    <div>
                      <p className="text-sm">Reminders:</p>
                      <ul className="text-xs text-muted-foreground space-y-1 mt-1">
                        {reminderSchedule.slice(0, 3).map((date, index) => (
                          <li key={index}>{format(date, "PPP")}</li>
                        ))}
                        {reminderSchedule.length > 3 && <li>+ {reminderSchedule.length - 3} more reminders</li>}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-2">
                    <Clock className="h-3 w-3 text-green-500 dark:text-green-300" />
                  </div>
                  <div>
                    <p className="text-sm">End: {format(endDate, "PPP")}</p>
                    <p className="text-xs text-muted-foreground">Survey will close and results will be available</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {(!startDate || !endDate) && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>Please select both start and end dates to schedule your survey.</AlertDescription>
        </Alert>
      )}
    </div>
  )
}
