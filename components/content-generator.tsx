"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, RefreshCw, CheckCircle } from "lucide-react"

export default function ContentGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [isGenerated, setIsGenerated] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("welcome")
  const [content, setContent] = useState("")

  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate API call to generate content
    setTimeout(() => {
      setIsGenerating(false)
      setIsGenerated(true)
    }, 2000)
  }

  const userTypes = [
    "Senior Executives",
    "Middle Managers",
    "Team Leaders",
    "HR Professionals",
    "Technical Managers",
    "First-time Attendees",
    "Returning Attendees",
    "Speakers",
    "Sponsors",
    "VIPs",
    "International Delegates",
    "Local Delegates",
    "Early Career",
    "Experienced Professionals",
    "Industry Leaders",
    "Networking Focused",
    "Learning Focused",
    "Career Development",
    "Leadership Development",
    "General Attendees",
  ]

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

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Content Input</CardTitle>
            <CardDescription>Enter the base content to be personalized for different user types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template">Select Template</Label>
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
              <p className="text-xs text-muted-foreground">
                {templates.find((t) => t.id === selectedTemplate)?.description}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Enter your content here..."
                className="min-h-[150px]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Keep content concise to fit WhatsApp templates (max 1000 characters)
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="session-name">Session Name (if applicable)</Label>
              <Input id="session-name" placeholder="e.g., Leadership in Crisis" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="speaker">Speaker (if applicable)</Label>
              <Input id="speaker" placeholder="e.g., John Smith" />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerate} disabled={isGenerating || content.length < 10} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Generate for All User Types
                </>
              )}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
            <CardDescription>Preview personalized content for each user type</CardDescription>
          </CardHeader>
          <CardContent>
            {isGenerated ? (
              <Tabs defaultValue="type-1" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="type-1">Type 1</TabsTrigger>
                  <TabsTrigger value="type-2">Type 2</TabsTrigger>
                  <TabsTrigger value="type-3">Type 3</TabsTrigger>
                  <TabsTrigger value="more">More...</TabsTrigger>
                </TabsList>

                <TabsContent value="type-1" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="font-medium">Senior Executives</div>
                      <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                    <div className="rounded-md border p-4 text-sm">
                      Hi [Name], We are excited to welcome you to Great Managers League Summit 2025. As a senior
                      executive, you'll find exclusive networking opportunities with industry leaders and specialized
                      sessions on strategic leadership. Don't miss the Executive Roundtable at 2 PM!
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="type-2" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="font-medium">Middle Managers</div>
                      <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                    <div className="rounded-md border p-4 text-sm">
                      Hi [Name], We are excited to welcome you to Great Managers League Summit 2025. We've curated
                      sessions on team development and operational excellence specifically for middle managers like you.
                      The "Bridging Strategy and Execution" workshop at 11 AM is perfect for your role!
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="type-3" className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <div className="font-medium">Team Leaders</div>
                      <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                    </div>
                    <div className="rounded-md border p-4 text-sm">
                      Hi [Name], We are excited to welcome you to Great Managers League Summit 2025. As a team leader,
                      you'll benefit from our hands-on workshops on motivation and coaching. Be sure to attend the
                      "Effective Team Communication" session at 9:30 AM to enhance your leadership toolkit!
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="more" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    {userTypes.slice(3, 7).map((type, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center">
                          <div className="font-medium">{type}</div>
                          <CheckCircle className="ml-2 h-4 w-4 text-green-500" />
                        </div>
                        <div className="rounded-md border p-4 text-sm">[Personalized content for {type}]</div>
                      </div>
                    ))}
                    <Button variant="outline" className="mt-2">
                      View All 20 User Types
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-[300px] text-center">
                <div className="text-muted-foreground mb-4">No content generated yet</div>
                <p className="text-sm text-muted-foreground max-w-md">
                  Enter your content and click "Generate" to create personalized messages for all 20 user types
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button variant="outline" disabled={!isGenerated}>
              Edit All
            </Button>
            <Button disabled={!isGenerated}>Save All Versions</Button>
          </CardFooter>
        </Card>
      </div>

      {isGenerated && (
        <Card>
          <CardHeader>
            <CardTitle>All Generated Content</CardTitle>
            <CardDescription>Review and edit personalized content for all 20 user types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {userTypes.slice(0, 5).map((type, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`content-${index}`}>{type}</Label>
                    <div className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 200) + 100} characters
                    </div>
                  </div>
                  <Textarea
                    id={`content-${index}`}
                    defaultValue={`Personalized content for ${type} based on the template selected and input content.`}
                    className="min-h-[100px]"
                  />
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Load More User Types
              </Button>
            </div>
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="outline">Reset All</Button>
            <Button>Save Changes</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
