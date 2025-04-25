"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Clock, Users, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export default function BulkMessaging() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [scheduledTime, setScheduledTime] = useState("08:00")
  const [selectedTemplate, setSelectedTemplate] = useState("welcome")
  const [batchSize, setBatchSize] = useState(200)
  const [isScheduling, setIsScheduling] = useState(false)
  const [scheduledMessages, setScheduledMessages] = useState<any[]>([
    {
      id: 1,
      template: "Welcome Message",
      recipients: 823,
      scheduledFor: "2025-05-22T19:00:00",
      status: "scheduled",
    },
    {
      id: 2,
      template: "Day 1 Morning Brief",
      recipients: 823,
      scheduledFor: "2025-05-23T08:00:00",
      status: "pending",
    },
  ])

  const handleSchedule = () => {
    setIsScheduling(true)
    // Simulate API call to schedule messages
    setTimeout(() => {
      setIsScheduling(false)
      setScheduledMessages([
        {
          id: Date.now(),
          template: templates.find((t) => t.id === selectedTemplate)?.name,
          recipients: 823,
          scheduledFor: `${format(date!, "yyyy-MM-dd")}T${scheduledTime}:00`,
          status: "scheduled",
        },
        ...scheduledMessages,
      ])
    }, 1500)
  }

  const templates = [
    { id: "welcome", name: "Welcome Message" },
    { id: "recommendations", name: "Personalized Recommendations" },
    { id: "summary", name: "Event Summary" },
    { id: "session", name: "Session Notes" },
    { id: "insight", name: "Unique Insight" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Schedule Broadcast</CardTitle>
          <CardDescription>Schedule messages to be sent to all delegates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="template">Message Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger>
                <SelectValue placeholder="Select a template" />
              </SelectTrigger>
              <SelectContent>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Schedule Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Schedule Time</Label>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input
                id="time"
                type="time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="batch-size">Batch Size</Label>
              <span className="text-sm text-muted-foreground">{batchSize} messages</span>
            </div>
            <Slider
              id="batch-size"
              min={50}
              max={500}
              step={50}
              value={[batchSize]}
              onValueChange={(value) => setBatchSize(value[0])}
            />
            <p className="text-xs text-muted-foreground">
              Messages will be sent in batches of {batchSize} every 2 minutes to avoid rate limits
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="feedback" />
            <Label htmlFor="feedback">Include feedback request</Label>
          </div>

          <div className="rounded-md bg-amber-50 p-4 text-amber-800 text-sm flex items-start">
            <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Important</p>
              <p className="mt-1">
                This will send messages to all 823 delegates. Make sure your content is ready and approved.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSchedule} disabled={isScheduling || !date || !scheduledTime} className="w-full">
            {isScheduling ? <>Schedule in progress...</> : <>Schedule Broadcast</>}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Scheduled Broadcasts</CardTitle>
          <CardDescription>View and manage upcoming message broadcasts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledMessages.map((message) => (
              <div key={message.id} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-medium">{message.template}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="h-3 w-3 mr-1" />
                      {message.recipients} recipients
                    </div>
                  </div>
                  <Badge
                    variant={
                      message.status === "scheduled"
                        ? "outline"
                        : message.status === "pending"
                          ? "secondary"
                          : message.status === "sending"
                            ? "default"
                            : message.status === "completed"
                              ? "success"
                              : "destructive"
                    }
                  >
                    {message.status}
                  </Badge>
                </div>

                <div className="text-sm mb-3">
                  Scheduled for: {format(new Date(message.scheduledFor), "PPP 'at' h:mm a")}
                </div>

                {message.status === "sending" && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Progress</span>
                      <span>68% (560/823)</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>
                )}

                <div className="flex justify-end space-x-2 mt-2">
                  {message.status !== "completed" && message.status !== "failed" && (
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  )}
                  {message.status !== "completed" && message.status !== "failed" && (
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  )}
                  {(message.status === "completed" || message.status === "failed") && (
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
