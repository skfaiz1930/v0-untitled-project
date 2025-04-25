"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { CalendarIcon, Clock, Loader2, Send, Users } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface SendMessageModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedUsers: string[]
  userTypes: Record<string, string>
  onSend: (data: any) => void
}

export default function SendMessageModal({
  open,
  onOpenChange,
  selectedUsers,
  userTypes,
  onSend,
}: SendMessageModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [isScheduled, setIsScheduled] = useState(false)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [time, setTime] = useState("12:00")
  const [isSending, setIsSending] = useState(false)
  const [previewUserType, setPreviewUserType] = useState("default")

  const templates = [
    { id: "welcome", name: "Welcome Message", description: "Initial welcome message with event details" },
    {
      id: "recommendations",
      name: "Personalized Recommendations",
      description: "AI-curated recommendations for the summit",
    },
    { id: "summary", name: "Event Summary", description: "Summary of the event highlights" },
    { id: "session", name: "Session Notes", description: "Personalized notes about a specific session" },
    { id: "insight", name: "Unique Insight", description: "Interesting fact or insight to engage delegates" },
  ]

  // Get unique user types from selected users
  const uniqueUserTypes = [...new Set(Object.values(userTypes))].sort()

  // Handle send button click
  const handleSend = () => {
    setIsSending(true)

    // Prepare data to send
    const messageData = {
      template: selectedTemplate,
      content: messageContent,
      recipients: selectedUsers,
      scheduled: isScheduled,
      scheduledTime: isScheduled ? `${format(date!, "yyyy-MM-dd")}T${time}:00` : null,
    }

    // Simulate API call
    setTimeout(() => {
      setIsSending(false)
      onSend(messageData)
      onOpenChange(false)

      // Reset form
      setSelectedTemplate("")
      setMessageContent("")
      setIsScheduled(false)
      setDate(new Date())
      setTime("12:00")
    }, 1500)
  }

  // Generate preview content based on template and user type
  const getPreviewContent = () => {
    if (!selectedTemplate) return "Select a template to see preview"

    const templateName = templates.find((t) => t.id === selectedTemplate)?.name || "Message"
    const userType = previewUserType === "default" ? "Delegate" : previewUserType

    // Generate personalized preview based on template and user type
    switch (selectedTemplate) {
      case "welcome":
        return `Hi [Name], We are excited to welcome you to Great Managers League Summit 2025. As a ${userType}, you'll find exclusive networking opportunities and specialized sessions tailored for your role. Don't miss the keynote at 10 AM!`
      case "recommendations":
        return `Dear [Name], our AI has curated what you should be doing at Great Managers League Summit 2025: Based on your profile as a ${userType}, we recommend attending the "Leadership in Digital Age" session at 11 AM and networking with industry peers during lunch.`
      case "session":
        return `Hi [Name], here's some personalized notes about the session by Dr. Sharma. Hope you learned valuable insights on strategic leadership that are relevant to your role as a ${userType}. Thanks for your active participation!`
      case "insight":
        return `Did you know 78% of ${userType}s report improved team performance after implementing the frameworks shared today? Our AI consistently delivers such unique insights, you should subscribe to our Weekly Journal and our State of Managers Report to know more.`
      default:
        return messageContent || `Personalized content for ${userType} will appear here based on the template selected.`
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Send Message to Selected Users</DialogTitle>
          <DialogDescription>
            Send a personalized message to {selectedUsers.length} selected{" "}
            {selectedUsers.length === 1 ? "user" : "users"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">
              {selectedUsers.length} {selectedUsers.length === 1 ? "recipient" : "recipients"} selected
            </span>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="template">Message Template</Label>
            <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
              <SelectTrigger id="template">
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
            {selectedTemplate && (
              <p className="text-xs text-muted-foreground">
                {templates.find((t) => t.id === selectedTemplate)?.description}
              </p>
            )}
          </div>

          {selectedTemplate === "custom" && (
            <div className="grid gap-2">
              <Label htmlFor="content">Custom Message</Label>
              <Textarea
                id="content"
                placeholder="Enter your custom message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[100px]"
              />
              <p className="text-xs text-muted-foreground">Use [Name] as a placeholder for the recipient's name</p>
            </div>
          )}

          <div className="grid gap-2">
            <Label>Message Preview</Label>
            <Tabs defaultValue="default" value={previewUserType} onValueChange={setPreviewUserType}>
              <TabsList className="mb-2">
                <TabsTrigger value="default">Default</TabsTrigger>
                {uniqueUserTypes.slice(0, 3).map((type) => (
                  <TabsTrigger key={type} value={type}>
                    {type}
                  </TabsTrigger>
                ))}
                {uniqueUserTypes.length > 3 && <TabsTrigger value="more">More...</TabsTrigger>}
              </TabsList>

              <div className="bg-muted/50 rounded-md p-4 text-sm">{getPreviewContent()}</div>
            </Tabs>
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="scheduled" checked={isScheduled} onCheckedChange={setIsScheduled} />
            <Label htmlFor="scheduled">Schedule for later</Label>
          </div>

          {isScheduled && (
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Date</Label>
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

              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSend} disabled={!selectedTemplate || isSending || (isScheduled && (!date || !time))}>
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : isScheduled ? (
              <>Schedule Message</>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Now
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
