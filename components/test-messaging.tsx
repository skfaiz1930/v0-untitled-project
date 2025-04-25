"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Loader2, Send, Smartphone, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function TestMessaging() {
  const [isSending, setIsSending] = useState(false)
  const [testNumber, setTestNumber] = useState("")
  const [selectedTemplate, setSelectedTemplate] = useState("welcome")
  const [selectedUserType, setSelectedUserType] = useState("executive")
  const [sentMessages, setSentMessages] = useState<any[]>([])

  const handleSendTest = () => {
    if (!testNumber) return

    setIsSending(true)
    // Simulate API call to send test message
    setTimeout(() => {
      setIsSending(false)
      setSentMessages([
        {
          id: Date.now(),
          number: testNumber,
          template: templates.find((t) => t.id === selectedTemplate)?.name,
          userType: userTypes.find((t) => t.id === selectedUserType)?.name,
          status: "delivered",
          timestamp: new Date().toISOString(),
        },
        ...sentMessages,
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

  const userTypes = [
    { id: "executive", name: "Senior Executives" },
    { id: "middle", name: "Middle Managers" },
    { id: "team", name: "Team Leaders" },
    { id: "hr", name: "HR Professionals" },
    { id: "tech", name: "Technical Managers" },
    { id: "first", name: "First-time Attendees" },
    { id: "returning", name: "Returning Attendees" },
    { id: "speaker", name: "Speakers" },
    { id: "sponsor", name: "Sponsors" },
    { id: "vip", name: "VIPs" },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Test Message</CardTitle>
          <CardDescription>Send a test message to verify content and delivery</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone-number">WhatsApp Number</Label>
            <Input
              id="phone-number"
              placeholder="+91 9876543210"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">Enter your WhatsApp number with country code</p>
          </div>

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
            <Label htmlFor="user-type">User Type</Label>
            <Select value={selectedUserType} onValueChange={setSelectedUserType}>
              <SelectTrigger>
                <SelectValue placeholder="Select a user type" />
              </SelectTrigger>
              <SelectContent>
                {userTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border p-4 space-y-2">
            <div className="flex items-center">
              <Smartphone className="mr-2 h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Message Preview</span>
            </div>
            <div className="bg-green-50 rounded-lg p-3 text-sm">
              <p className="font-medium mb-1">Template: {templates.find((t) => t.id === selectedTemplate)?.name}</p>
              <p>
                Hi [Your Name], We are excited to welcome you to Great Managers League Summit 2025. As a{" "}
                {userTypes.find((t) => t.id === selectedUserType)?.name.toLowerCase()} attendee, you'll find exclusive
                networking opportunities and specialized sessions tailored for your role. Don't miss the keynote at 10
                AM!
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSendTest} disabled={isSending || !testNumber} className="w-full">
            {isSending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Test Message
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test History</CardTitle>
          <CardDescription>Review previously sent test messages</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            {sentMessages.length > 0 ? (
              <div className="space-y-4">
                {sentMessages.map((message) => (
                  <div key={message.id} className="flex items-start space-x-4 border-b pb-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Send className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{message.number}</p>
                        <Badge variant={message.status === "delivered" ? "success" : "destructive"}>
                          {message.status === "delivered" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {message.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Template: {message.template}</p>
                      <p className="text-sm text-muted-foreground">User Type: {message.userType}</p>
                      <p className="text-xs text-muted-foreground">{new Date(message.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="text-muted-foreground mb-4">No test messages sent yet</div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Send a test message to see delivery status and message details
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="outline" disabled={sentMessages.length === 0}>
            Clear History
          </Button>
          <Button variant="outline" disabled={sentMessages.length === 0}>
            Export Log
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
