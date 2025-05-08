"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Unlock, BookOpen, Video, FileText, Award } from "lucide-react"
import { useGamification } from "@/contexts/gamification-context"

// Mock content data
const mockContent = [
  {
    id: "content-1",
    title: "The Art of Delegation",
    description: "Learn how to effectively delegate tasks to empower your team and improve productivity.",
    type: "article",
    category: "leadership",
    requiredLevel: 2,
    unlocked: true,
    featured: true,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "content-2",
    title: "Giving Constructive Feedback",
    description: "Master the art of providing feedback that motivates and drives improvement.",
    type: "video",
    category: "communication",
    requiredLevel: 3,
    unlocked: true,
    icon: <Video className="h-5 w-5" />,
  },
  {
    id: "content-3",
    title: "Building High-Performance Teams",
    description: "Strategies for creating and nurturing teams that consistently exceed expectations.",
    type: "guide",
    category: "team-building",
    requiredLevel: 4,
    unlocked: false,
    progress: 75,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "content-4",
    title: "Crisis Leadership",
    description: "How to lead effectively during times of uncertainty and rapid change.",
    type: "article",
    category: "leadership",
    requiredLevel: 5,
    unlocked: false,
    progress: 40,
    icon: <FileText className="h-5 w-5" />,
  },
  {
    id: "content-5",
    title: "Strategic Decision Making",
    description: "A framework for making high-impact decisions with limited information.",
    type: "guide",
    category: "leadership",
    requiredLevel: 6,
    unlocked: false,
    progress: 20,
    icon: <BookOpen className="h-5 w-5" />,
  },
  {
    id: "content-6",
    title: "Emotional Intelligence for Leaders",
    description: "Develop advanced EQ skills to better understand and motivate your team.",
    type: "video",
    category: "personal-development",
    requiredLevel: 7,
    unlocked: false,
    progress: 10,
    icon: <Video className="h-5 w-5" />,
  },
]

export function UnlockableContent() {
  const [activeTab, setActiveTab] = useState<"all" | "unlocked" | "locked">("all")
  const [content, setContent] = useState(mockContent)
  const { level } = useGamification()

  const filteredContent = content.filter((item) => {
    if (activeTab === "unlocked") return item.unlocked
    if (activeTab === "locked") return !item.unlocked
    return true
  })

  const handleUnlock = (contentId: string) => {
    setContent(
      content.map((item) =>
        item.id === contentId
          ? {
              ...item,
              unlocked: true,
            }
          : item,
      ),
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-full bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Leadership Content Library</h2>
          <p className="text-sm text-muted-foreground">Unlock exclusive content as you level up</p>
        </div>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Content</TabsTrigger>
          <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
          <TabsTrigger value="locked">Coming Soon</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((item) => (
              <Card
                key={item.id}
                className={`overflow-hidden transition-all duration-300 ${
                  item.featured ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                {item.featured && (
                  <div className="bg-primary text-primary-foreground text-xs py-1 px-3 text-center font-medium">
                    Featured Content
                  </div>
                )}
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center gap-2">
                        {item.title}
                        {item.unlocked ? (
                          <Unlock className="h-4 w-4 text-green-500" />
                        ) : (
                          <Lock className="h-4 w-4 text-amber-500" />
                        )}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </div>
                    <Badge variant="outline" className="capitalize">
                      {item.type}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300"
                      >
                        {item.category}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 ${
                        level >= item.requiredLevel
                          ? "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300"
                          : "bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300"
                      }`}
                    >
                      <Award className="h-3 w-3 mr-1" />
                      Level {item.requiredLevel}
                    </Badge>
                  </div>

                  {!item.unlocked && (
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-muted-foreground mb-1">
                        <span>Unlock Progress</span>
                        <span>
                          {level >= item.requiredLevel ? "Ready to unlock" : `Level ${level}/${item.requiredLevel}`}
                        </span>
                      </div>
                      <Progress
                        value={level >= item.requiredLevel ? 100 : item.progress || (level / item.requiredLevel) * 100}
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {item.unlocked ? (
                    <Button className="w-full" variant="default">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Now
                    </Button>
                  ) : level >= item.requiredLevel ? (
                    <Button className="w-full" onClick={() => handleUnlock(item.id)}>
                      <Unlock className="h-4 w-4 mr-2" />
                      Unlock Content
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline" disabled>
                      <Lock className="h-4 w-4 mr-2" />
                      Reach Level {item.requiredLevel} to Unlock
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
