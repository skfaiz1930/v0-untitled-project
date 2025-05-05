"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Target,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  TrendingUp,
  BarChart,
  Award,
  ChevronRight,
  AlertCircle,
  Sparkles,
} from "lucide-react"

// Mock data for goals
const mockGoals = [
  {
    id: "goal-1",
    title: "Improve Team Communication",
    description: "Enhance communication effectiveness within the team to boost collaboration and productivity",
    category: "team-development",
    progress: 65,
    startDate: "2023-04-01",
    targetDate: "2023-06-30",
    status: "in-progress",
    metrics: [
      { name: "Team Survey Score", current: 7.5, target: 8.5, unit: "/10" },
      { name: "Meeting Effectiveness", current: 72, target: 85, unit: "%" },
    ],
    linkedNudges: [
      { id: "nudge-1", title: "Schedule Regular Team Meetings", completed: true },
      { id: "nudge-2", title: "Implement Communication Guidelines", completed: true },
      { id: "nudge-3", title: "Collect Feedback on Communication", completed: false },
    ],
    linkedSurveys: [{ id: "survey-1", title: "Communication Effectiveness Survey", completed: true, score: 7.5 }],
  },
  {
    id: "goal-2",
    title: "Develop Leadership Skills",
    description: "Enhance personal leadership capabilities to better support and guide the team",
    category: "personal-development",
    progress: 40,
    startDate: "2023-05-01",
    targetDate: "2023-08-31",
    status: "in-progress",
    metrics: [
      { name: "Leadership Assessment", current: 72, target: 85, unit: "%" },
      { name: "Team Feedback Score", current: 3.8, target: 4.5, unit: "/5" },
    ],
    linkedNudges: [
      { id: "nudge-4", title: "Complete Leadership Training", completed: true },
      { id: "nudge-5", title: "Practice Active Listening", completed: false },
      { id: "nudge-6", title: "Seek Feedback on Leadership Style", completed: false },
    ],
    linkedSurveys: [{ id: "survey-2", title: "Leadership Effectiveness Survey", completed: true, score: 3.8 }],
  },
  {
    id: "goal-3",
    title: "Increase Team Engagement",
    description: "Boost team engagement and satisfaction to improve retention and performance",
    category: "team-development",
    progress: 25,
    startDate: "2023-05-15",
    targetDate: "2023-09-15",
    status: "in-progress",
    metrics: [
      { name: "Engagement Score", current: 68, target: 85, unit: "%" },
      { name: "Participation Rate", current: 75, target: 90, unit: "%" },
    ],
    linkedNudges: [
      { id: "nudge-7", title: "Recognize Team Achievements", completed: true },
      { id: "nudge-8", title: "Implement Team Building Activities", completed: false },
    ],
    linkedSurveys: [{ id: "survey-3", title: "Team Engagement Survey", completed: true, score: 68 }],
  },
  {
    id: "goal-4",
    title: "Improve Delegation Skills",
    description: "Enhance ability to effectively delegate tasks and empower team members",
    category: "personal-development",
    progress: 80,
    startDate: "2023-03-15",
    targetDate: "2023-06-15",
    status: "almost-complete",
    metrics: [
      { name: "Tasks Delegated", current: 24, target: 30, unit: "" },
      { name: "Team Autonomy Score", current: 4.2, target: 4.5, unit: "/5" },
    ],
    linkedNudges: [
      { id: "nudge-9", title: "Identify Delegation Opportunities", completed: true },
      { id: "nudge-10", title: "Provide Clear Instructions", completed: true },
      { id: "nudge-11", title: "Follow Up on Delegated Tasks", completed: true },
    ],
    linkedSurveys: [{ id: "survey-4", title: "Delegation Effectiveness Survey", completed: true, score: 4.2 }],
  },
]

export default function GoalsPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [goals, setGoals] = useState(mockGoals)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "team-development",
    targetDate: "",
  })

  const inProgressGoals = goals.filter((goal) => goal.status === "in-progress")
  const completedGoals = goals.filter((goal) => goal.status === "completed")
  const personalGoals = goals.filter((goal) => goal.category === "personal-development")
  const teamGoals = goals.filter((goal) => goal.category === "team-development")

  const handleAddGoal = () => {
    const goal = {
      id: `goal-${goals.length + 1}`,
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      progress: 0,
      startDate: new Date().toISOString().split("T")[0],
      targetDate: newGoal.targetDate,
      status: "in-progress",
      metrics: [],
      linkedNudges: [],
      linkedSurveys: [],
    }

    setGoals([...goals, goal])
    setIsAddGoalOpen(false)
    setNewGoal({
      title: "",
      description: "",
      category: "team-development",
      targetDate: "",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "almost-complete":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-200">
            <TrendingUp className="h-3 w-3 mr-1" />
            Almost Complete
          </Badge>
        )
      case "in-progress":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-200">
            <Clock className="h-3 w-3 mr-1" />
            In Progress
          </Badge>
        )
      case "at-risk":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            At Risk
          </Badge>
        )
      default:
        return null
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "personal-development":
        return (
          <Badge variant="outline" className="border-purple-200 text-purple-800">
            Personal Development
          </Badge>
        )
      case "team-development":
        return (
          <Badge variant="outline" className="border-blue-200 text-blue-800">
            Team Development
          </Badge>
        )
      default:
        return null
    }
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-600"
    if (progress >= 50) return "bg-blue-600"
    if (progress >= 25) return "bg-amber-500"
    return "bg-red-500"
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center">
            <div className="mr-2 p-2 rounded-full bg-primary/10">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Leadership Goals</h1>
              <p className="text-muted-foreground">Track and manage your leadership development goals</p>
            </div>
          </div>
          <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
            <DialogTrigger asChild>
              <Button className="mt-4 md:mt-0">
                <Plus className="h-4 w-4 mr-2" />
                Add New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Leadership Goal</DialogTitle>
                <DialogDescription>
                  Define a new leadership goal to track your progress and development
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="goal-title">Goal Title</Label>
                  <Input
                    id="goal-title"
                    placeholder="E.g., Improve Team Communication"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="goal-description">Description</Label>
                  <Textarea
                    id="goal-description"
                    placeholder="Describe your goal and what you want to achieve"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="goal-category">Category</Label>
                    <Select
                      value={newGoal.category}
                      onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                    >
                      <SelectTrigger id="goal-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal-development">Personal Development</SelectItem>
                        <SelectItem value="team-development">Team Development</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="goal-target-date">Target Date</Label>
                    <Input
                      id="goal-target-date"
                      type="date"
                      value={newGoal.targetDate}
                      onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddGoal} disabled={!newGoal.title || !newGoal.targetDate}>
                  Create Goal
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goals In Progress</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Target className="h-4 w-4 text-blue-500 dark:text-blue-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressGoals.length}</div>
              <p className="text-xs text-muted-foreground">
                {inProgressGoals.length === 1 ? "1 active goal" : `${inProgressGoals.length} active goals`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <BarChart className="h-4 w-4 text-green-500 dark:text-green-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
              </div>
              <Progress
                value={Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}
                className="mt-2"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Goals</CardTitle>
              <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                <Award className="h-4 w-4 text-amber-500 dark:text-amber-300" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedGoals.length}</div>
              <p className="text-xs text-muted-foreground">
                {completedGoals.length === 1 ? "1 goal completed" : `${completedGoals.length} goals completed`}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Your Leadership Goals</CardTitle>
            <CardDescription>Track progress and manage your leadership development goals</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Goals</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="personal">Personal Development</TabsTrigger>
                <TabsTrigger value="team">Team Development</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                <div className="space-y-4">
                  {goals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            {getStatusBadge(goal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCategoryBadge(goal.category)}
                            <Badge variant="outline" className="border-gray-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {new Date(goal.targetDate).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className={`h-2 ${getProgressColor(goal.progress)}`} />
                          </div>
                        </div>
                        <div className="w-full md:w-64 bg-muted/30 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Metrics</h4>
                            <div className="space-y-2">
                              {goal.metrics.map((metric, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <span>{metric.name}</span>
                                    <span className="font-medium">
                                      {metric.current}
                                      {metric.unit} / {metric.target}
                                      {metric.unit}
                                    </span>
                                  </div>
                                  <Progress value={(metric.current / metric.target) * 100} className="h-1 mt-1" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="in-progress">
                <div className="space-y-4">
                  {inProgressGoals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            {getStatusBadge(goal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCategoryBadge(goal.category)}
                            <Badge variant="outline" className="border-gray-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {new Date(goal.targetDate).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className={`h-2 ${getProgressColor(goal.progress)}`} />
                          </div>
                        </div>
                        <div className="w-full md:w-64 bg-muted/30 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Metrics</h4>
                            <div className="space-y-2">
                              {goal.metrics.map((metric, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <span>{metric.name}</span>
                                    <span className="font-medium">
                                      {metric.current}
                                      {metric.unit} / {metric.target}
                                      {metric.unit}
                                    </span>
                                  </div>
                                  <Progress value={(metric.current / metric.target) * 100} className="h-1 mt-1" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="personal">
                <div className="space-y-4">
                  {personalGoals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            {getStatusBadge(goal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCategoryBadge(goal.category)}
                            <Badge variant="outline" className="border-gray-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {new Date(goal.targetDate).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className={`h-2 ${getProgressColor(goal.progress)}`} />
                          </div>
                        </div>
                        <div className="w-full md:w-64 bg-muted/30 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Metrics</h4>
                            <div className="space-y-2">
                              {goal.metrics.map((metric, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <span>{metric.name}</span>
                                    <span className="font-medium">
                                      {metric.current}
                                      {metric.unit} / {metric.target}
                                      {metric.unit}
                                    </span>
                                  </div>
                                  <Progress value={(metric.current / metric.target) * 100} className="h-1 mt-1" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="team">
                <div className="space-y-4">
                  {teamGoals.map((goal) => (
                    <Card key={goal.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{goal.title}</h3>
                            {getStatusBadge(goal.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{goal.description}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {getCategoryBadge(goal.category)}
                            <Badge variant="outline" className="border-gray-200">
                              <Calendar className="h-3 w-3 mr-1" />
                              Due {new Date(goal.targetDate).toLocaleDateString()}
                            </Badge>
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">{goal.progress}%</span>
                            </div>
                            <Progress value={goal.progress} className={`h-2 ${getProgressColor(goal.progress)}`} />
                          </div>
                        </div>
                        <div className="w-full md:w-64 bg-muted/30 p-6 flex flex-col justify-between">
                          <div>
                            <h4 className="font-medium text-sm mb-2">Key Metrics</h4>
                            <div className="space-y-2">
                              {goal.metrics.map((metric, index) => (
                                <div key={index} className="text-sm">
                                  <div className="flex items-center justify-between">
                                    <span>{metric.name}</span>
                                    <span className="font-medium">
                                      {metric.current}
                                      {metric.unit} / {metric.target}
                                      {metric.unit}
                                    </span>
                                  </div>
                                  <Progress value={(metric.current / metric.target) * 100} className="h-1 mt-1" />
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t">
                            <Button variant="outline" size="sm" className="w-full">
                              <ArrowUpRight className="h-3 w-3 mr-1" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2 text-primary" />
                <CardTitle>AI-Powered Goal Recommendations</CardTitle>
              </div>
              <CardDescription>Based on your leadership style and team needs, we recommend these goals</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Enhance Feedback Culture</h3>
                    <Badge variant="outline" className="border-blue-200 text-blue-800">
                      Team Development
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Create a culture where feedback flows freely and constructively in all directions
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add This Goal
                  </Button>
                </div>

                <div className="bg-background p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Develop Strategic Thinking</h3>
                    <Badge variant="outline" className="border-purple-200 text-purple-800">
                      Personal Development
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Enhance your ability to think strategically and make decisions with long-term impact
                  </p>
                  <Button size="sm" variant="outline" className="w-full">
                    <Plus className="h-3 w-3 mr-1" />
                    Add This Goal
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="link" className="ml-auto">
                View More Recommendations
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}
