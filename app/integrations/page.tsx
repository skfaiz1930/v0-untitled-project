"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Calendar,
  MessageSquare,
  Check,
  X,
  AlertCircle,
  Settings,
  RefreshCw,
  Link,
  ExternalLink,
  Clock,
  Bell,
} from "lucide-react"

export default function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("teams")
  const [teamsConnected, setTeamsConnected] = useState(false)
  const [slackConnected, setSlackConnected] = useState(false)
  const [teamsSettings, setTeamsSettings] = useState({
    syncCalendar: true,
    sendReminders: true,
    autoSchedule: false,
    notifyBeforeEvents: true,
  })
  const [slackSettings, setSlackSettings] = useState({
    sendNudges: true,
    collectResponses: true,
    sendSurveys: true,
    notifyManager: true,
  })

  const handleTeamsConnect = () => {
    // In a real app, this would open the Microsoft OAuth flow
    setTimeout(() => {
      setTeamsConnected(true)
    }, 1500)
  }

  const handleSlackConnect = () => {
    // In a real app, this would open the Slack OAuth flow
    setTimeout(() => {
      setSlackConnected(true)
    }, 1500)
  }

  const updateTeamsSetting = (key: string, value: boolean) => {
    setTeamsSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  const updateSlackSetting = (key: string, value: boolean) => {
    setSlackSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
            <p className="text-muted-foreground">Connect your tools to enhance your leadership experience</p>
          </div>
        </div>

        <Tabs defaultValue="teams" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="teams">
              <Calendar className="h-4 w-4 mr-2" />
              Microsoft Teams
            </TabsTrigger>
            <TabsTrigger value="slack">
              <MessageSquare className="h-4 w-4 mr-2" />
              Slack
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                      <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle>Microsoft Teams Integration</CardTitle>
                      <CardDescription>Connect your Teams calendar and notifications</CardDescription>
                    </div>
                  </div>
                  {teamsConnected ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Connected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!teamsConnected ? (
                  <div className="space-y-4">
                    <p>
                      Connect your Microsoft Teams account to schedule nudges, sync calendar events, and send reminders
                      directly to your Teams calendar.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button onClick={handleTeamsConnect}>Connect Teams Account</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">JD</span>
                        </div>
                        <div>
                          <p className="font-medium">John Doe</p>
                          <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Refresh
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Disconnect
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Integration Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="sync-calendar">Sync Calendar Events</Label>
                            <p className="text-xs text-muted-foreground">
                              Automatically sync nudges and surveys with your Teams calendar
                            </p>
                          </div>
                          <Switch
                            id="sync-calendar"
                            checked={teamsSettings.syncCalendar}
                            onCheckedChange={(checked) => updateTeamsSetting("syncCalendar", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="send-reminders">Send Calendar Reminders</Label>
                            <p className="text-xs text-muted-foreground">
                              Send reminders for upcoming nudges and surveys
                            </p>
                          </div>
                          <Switch
                            id="send-reminders"
                            checked={teamsSettings.sendReminders}
                            onCheckedChange={(checked) => updateTeamsSetting("sendReminders", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="auto-schedule">Auto-Schedule Nudges</Label>
                            <p className="text-xs text-muted-foreground">
                              Automatically find optimal times for nudges based on your calendar
                            </p>
                          </div>
                          <Switch
                            id="auto-schedule"
                            checked={teamsSettings.autoSchedule}
                            onCheckedChange={(checked) => updateTeamsSetting("autoSchedule", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notify-before-events">Notify Before Events</Label>
                            <p className="text-xs text-muted-foreground">
                              Receive notifications before scheduled nudges and surveys
                            </p>
                          </div>
                          <Switch
                            id="notify-before-events"
                            checked={teamsSettings.notifyBeforeEvents}
                            onCheckedChange={(checked) => updateTeamsSetting("notifyBeforeEvents", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Your Teams calendar is syncing every 15 minutes. Last sync: 5 minutes ago.
                      </AlertDescription>
                    </Alert>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/50 border-t">
                <p className="text-xs text-muted-foreground">
                  This integration requires Microsoft Teams permissions for calendar access and notifications.
                </p>
              </CardFooter>
            </Card>

            {teamsConnected && (
              <Card>
                <CardHeader>
                  <CardTitle>Connected Calendar</CardTitle>
                  <CardDescription>Your synced Teams calendar events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md flex items-start">
                      <div className="w-12 text-center mr-4">
                        <div className="text-xs font-medium text-muted-foreground">TODAY</div>
                        <div className="text-xl font-bold">15</div>
                        <div className="text-xs">MAY</div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-3">
                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Team Weekly Sync</div>
                              <div className="text-xs text-muted-foreground">10:00 - 11:00 AM</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Weekly team meeting to discuss progress and blockers
                            </div>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                Scheduled Nudge
                              </Badge>
                            </div>
                          </div>

                          <div className="p-2 bg-purple-50 dark:bg-purple-900/30 border border-purple-100 dark:border-purple-800 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">1:1 with Alice Smith</div>
                              <div className="text-xs text-muted-foreground">2:00 - 2:30 PM</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">Regular check-in with team member</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md flex items-start">
                      <div className="w-12 text-center mr-4">
                        <div className="text-xs font-medium text-muted-foreground">TOMORROW</div>
                        <div className="text-xl font-bold">16</div>
                        <div className="text-xs">MAY</div>
                      </div>
                      <div className="flex-1">
                        <div className="space-y-3">
                          <div className="p-2 bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Pulse Survey: Team Communication</div>
                              <div className="text-xs text-muted-foreground">9:00 AM</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Scheduled survey to assess team communication effectiveness
                            </div>
                            <div className="flex items-center mt-2">
                              <Badge variant="outline" className="text-xs">
                                <Bell className="h-3 w-3 mr-1" />
                                Reminder Set
                              </Badge>
                            </div>
                          </div>

                          <div className="p-2 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Project Review</div>
                              <div className="text-xs text-muted-foreground">3:00 - 4:00 PM</div>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Review current project status and next steps
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    View Full Calendar
                  </Button>
                  <Button>
                    <Link className="h-4 w-4 mr-2" />
                    Schedule New Event
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="slack" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-2 p-2 rounded-full bg-purple-100 dark:bg-purple-900">
                      <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle>Slack Integration</CardTitle>
                      <CardDescription>Connect your Slack workspace for nudges and surveys</CardDescription>
                    </div>
                  </div>
                  {slackConnected ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-800">
                      <Check className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  ) : (
                    <Badge variant="outline">Not Connected</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {!slackConnected ? (
                  <div className="space-y-4">
                    <p>
                      Connect your Slack workspace to send nudges, collect responses, and distribute surveys directly
                      through Slack.
                    </p>
                    <div className="flex items-center space-x-2">
                      <Button onClick={handleSlackConnect} className="bg-purple-600 hover:bg-purple-700">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                        </svg>
                        Connect Slack Workspace
                      </Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3">
                          <svg
                            className="h-6 w-6 text-purple-600 dark:text-purple-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Acme Team Workspace</p>
                          <p className="text-sm text-muted-foreground">Connected to #leadership-nudges channel</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Settings className="h-3 w-3 mr-1" />
                          Configure
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          Disconnect
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Integration Settings</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="send-nudges">Send Nudges via Slack</Label>
                            <p className="text-xs text-muted-foreground">
                              Deliver leadership nudges directly to your Slack channel
                            </p>
                          </div>
                          <Switch
                            id="send-nudges"
                            checked={slackSettings.sendNudges}
                            onCheckedChange={(checked) => updateSlackSetting("sendNudges", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="collect-responses">Collect Responses</Label>
                            <p className="text-xs text-muted-foreground">
                              Allow team members to respond to nudges via Slack
                            </p>
                          </div>
                          <Switch
                            id="collect-responses"
                            checked={slackSettings.collectResponses}
                            onCheckedChange={(checked) => updateSlackSetting("collectResponses", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="send-surveys">Send Surveys</Label>
                            <p className="text-xs text-muted-foreground">
                              Distribute pulse surveys through Slack channels
                            </p>
                          </div>
                          <Switch
                            id="send-surveys"
                            checked={slackSettings.sendSurveys}
                            onCheckedChange={(checked) => updateSlackSetting("sendSurveys", checked)}
                          />
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="notify-manager">Notify Manager</Label>
                            <p className="text-xs text-muted-foreground">
                              Send notifications when team members complete nudges or surveys
                            </p>
                          </div>
                          <Switch
                            id="notify-manager"
                            checked={slackSettings.notifyManager}
                            onCheckedChange={(checked) => updateSlackSetting("notifyManager", checked)}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md">
                      <h4 className="font-medium mb-2">Connected Channels</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">#leadership-nudges</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              Default
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                          <div className="flex items-center">
                            <span className="text-sm font-medium">#team-surveys</span>
                          </div>
                          <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="mt-2 w-full">
                        <Link className="h-3 w-3 mr-1" />
                        Connect Another Channel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/50 border-t">
                <p className="text-xs text-muted-foreground">
                  This integration requires Slack permissions for sending messages and collecting responses.
                </p>
              </CardFooter>
            </Card>

            {slackConnected && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Slack Activity</CardTitle>
                  <CardDescription>Recent nudges and surveys sent to Slack</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 mr-2">Nudge</Badge>
                          <h4 className="font-medium">Recognize Team Achievements</h4>
                        </div>
                        <span className="text-xs text-muted-foreground">Today, 9:30 AM</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sent to #leadership-nudges • 5/8 team members responded
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in Slack
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge className="bg-blue-100 text-blue-800 mr-2">Survey</Badge>
                          <h4 className="font-medium">Team Communication Survey</h4>
                        </div>
                        <span className="text-xs text-muted-foreground">Yesterday, 2:15 PM</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sent to #team-surveys • 7/8 team members completed
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in Slack
                        </Button>
                      </div>
                    </div>

                    <div className="p-3 border rounded-md">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 mr-2">Nudge</Badge>
                          <h4 className="font-medium">Schedule 1:1 Meetings</h4>
                        </div>
                        <span className="text-xs text-muted-foreground">May 10, 11:45 AM</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Sent to #leadership-nudges • 4/8 team members responded
                      </p>
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View in Slack
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">View All Activity</Button>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send New Message
                  </Button>
                </CardFooter>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
