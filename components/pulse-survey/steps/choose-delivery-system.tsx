"use client"

import { useState, useEffect } from "react"
import { Check, Mail, MessageSquare, BellRing, Info } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChooseDeliverySystemProps {
  surveyData: any
  updateSurveyData: (data: any) => void
}

export default function ChooseDeliverySystem({ surveyData, updateSurveyData }: ChooseDeliverySystemProps) {
  const [deliveryMethods, setDeliveryMethods] = useState<string[]>(surveyData.deliveryMethods || [])
  const [activeTab, setActiveTab] = useState("email")

  useEffect(() => {
    updateSurveyData({ deliveryMethods })
  }, [deliveryMethods, updateSurveyData])

  const toggleDeliveryMethod = (method: string) => {
    if (deliveryMethods.includes(method)) {
      setDeliveryMethods(deliveryMethods.filter((m) => m !== method))
    } else {
      setDeliveryMethods([...deliveryMethods, method])
    }
  }

  const isMethodSelected = (method: string) => {
    return deliveryMethods.includes(method)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card
          className={`cursor-pointer ${isMethodSelected("Email") ? "border-primary" : ""}`}
          onClick={() => toggleDeliveryMethod("Email")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-primary" />
                Email
              </div>
              {isMethodSelected("Email") && <Check className="h-4 w-4 text-primary" />}
            </CardTitle>
            <CardDescription>Send surveys via email</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              Surveys will be sent to team members' email addresses with a unique link.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="email-toggle" className="text-xs">
                Enable
              </Label>
              <Switch
                id="email-toggle"
                checked={isMethodSelected("Email")}
                onCheckedChange={() => toggleDeliveryMethod("Email")}
              />
            </div>
          </CardFooter>
        </Card>

        <Card
          className={`cursor-pointer ${isMethodSelected("Slack") ? "border-primary" : ""}`}
          onClick={() => toggleDeliveryMethod("Slack")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                Slack
              </div>
              {isMethodSelected("Slack") && <Check className="h-4 w-4 text-primary" />}
            </CardTitle>
            <CardDescription>Send surveys via Slack</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              Surveys will be sent as direct messages to team members in Slack.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="slack-toggle" className="text-xs">
                Enable
              </Label>
              <Switch
                id="slack-toggle"
                checked={isMethodSelected("Slack")}
                onCheckedChange={() => toggleDeliveryMethod("Slack")}
              />
            </div>
          </CardFooter>
        </Card>

        <Card
          className={`cursor-pointer ${isMethodSelected("MS Teams") ? "border-primary" : ""}`}
          onClick={() => toggleDeliveryMethod("MS Teams")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-primary" />
                MS Teams
              </div>
              {isMethodSelected("MS Teams") && <Check className="h-4 w-4 text-primary" />}
            </CardTitle>
            <CardDescription>Send surveys via MS Teams</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              Surveys will be sent as direct messages to team members in Microsoft Teams.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="teams-toggle" className="text-xs">
                Enable
              </Label>
              <Switch
                id="teams-toggle"
                checked={isMethodSelected("MS Teams")}
                onCheckedChange={() => toggleDeliveryMethod("MS Teams")}
              />
            </div>
          </CardFooter>
        </Card>

        <Card
          className={`cursor-pointer ${isMethodSelected("In-app") ? "border-primary" : ""}`}
          onClick={() => toggleDeliveryMethod("In-app")}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center justify-between">
              <div className="flex items-center">
                <BellRing className="h-4 w-4 mr-2 text-primary" />
                In-app
              </div>
              {isMethodSelected("In-app") && <Check className="h-4 w-4 text-primary" />}
            </CardTitle>
            <CardDescription>Send surveys via in-app notifications</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <p className="text-xs text-muted-foreground">
              Surveys will appear as notifications within the NudgeManager app.
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="w-full flex justify-between items-center">
              <Label htmlFor="inapp-toggle" className="text-xs">
                Enable
              </Label>
              <Switch
                id="inapp-toggle"
                checked={isMethodSelected("In-app")}
                onCheckedChange={() => toggleDeliveryMethod("In-app")}
              />
            </div>
          </CardFooter>
        </Card>
      </div>

      {deliveryMethods.length === 0 && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertDescription>Please select at least one delivery method to continue.</AlertDescription>
        </Alert>
      )}

      {deliveryMethods.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Delivery Settings</h3>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              {deliveryMethods.includes("Email") && <TabsTrigger value="email">Email</TabsTrigger>}
              {deliveryMethods.includes("Slack") && <TabsTrigger value="slack">Slack</TabsTrigger>}
              {deliveryMethods.includes("MS Teams") && <TabsTrigger value="teams">MS Teams</TabsTrigger>}
              {deliveryMethods.includes("In-app") && <TabsTrigger value="inapp">In-app</TabsTrigger>}
            </TabsList>

            {deliveryMethods.includes("Email") && (
              <TabsContent value="email" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Email Settings</CardTitle>
                    <CardDescription>Configure how surveys are delivered via email</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-sender">Sender Name</Label>
                        <p className="text-xs text-muted-foreground">The name that will appear in the "From" field</p>
                      </div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="h-4 w-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">This will be the sender name in the email</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-subject">Custom Subject Line</Label>
                        <p className="text-xs text-muted-foreground">Customize the email subject line</p>
                      </div>
                      <Switch id="email-subject" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="email-reminder">Send Reminder Emails</Label>
                        <p className="text-xs text-muted-foreground">
                          Send reminders to team members who haven't responded
                        </p>
                      </div>
                      <Switch id="email-reminder" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {deliveryMethods.includes("Slack") && (
              <TabsContent value="slack" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Slack Settings</CardTitle>
                    <CardDescription>Configure how surveys are delivered via Slack</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="slack-connect">Connect Slack Workspace</Label>
                        <p className="text-xs text-muted-foreground">Connect to your Slack workspace to send surveys</p>
                      </div>
                      <Switch id="slack-connect" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="slack-dm">Send as Direct Message</Label>
                        <p className="text-xs text-muted-foreground">Send surveys as direct messages to team members</p>
                      </div>
                      <Switch id="slack-dm" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="slack-reminder">Send Reminder Messages</Label>
                        <p className="text-xs text-muted-foreground">
                          Send reminders to team members who haven't responded
                        </p>
                      </div>
                      <Switch id="slack-reminder" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {deliveryMethods.includes("MS Teams") && (
              <TabsContent value="teams" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">MS Teams Settings</CardTitle>
                    <CardDescription>Configure how surveys are delivered via Microsoft Teams</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="teams-connect">Connect MS Teams</Label>
                        <p className="text-xs text-muted-foreground">Connect to Microsoft Teams to send surveys</p>
                      </div>
                      <Switch id="teams-connect" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="teams-dm">Send as Direct Message</Label>
                        <p className="text-xs text-muted-foreground">Send surveys as direct messages to team members</p>
                      </div>
                      <Switch id="teams-dm" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="teams-reminder">Send Reminder Messages</Label>
                        <p className="text-xs text-muted-foreground">
                          Send reminders to team members who haven't responded
                        </p>
                      </div>
                      <Switch id="teams-reminder" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {deliveryMethods.includes("In-app") && (
              <TabsContent value="inapp" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">In-app Notification Settings</CardTitle>
                    <CardDescription>Configure how surveys are delivered via in-app notifications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-priority">High Priority</Label>
                        <p className="text-xs text-muted-foreground">Mark notifications as high priority</p>
                      </div>
                      <Switch id="inapp-priority" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-persistent">Persistent Notification</Label>
                        <p className="text-xs text-muted-foreground">Show notification until user responds</p>
                      </div>
                      <Switch id="inapp-persistent" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="inapp-reminder">Send Reminder Notifications</Label>
                        <p className="text-xs text-muted-foreground">
                          Send reminders to team members who haven't responded
                        </p>
                      </div>
                      <Switch id="inapp-reminder" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      )}
    </div>
  )
}
