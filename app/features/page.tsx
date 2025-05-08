"use client"

import { useState } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CoachingInterface } from "@/components/ai-coaching/coaching-interface"
import { FeedbackForm } from "@/components/feedback/feedback-form"
import { NudgeActions } from "@/components/nudges/nudge-actions"
import { Sparkles, MessageSquare, Zap } from "lucide-react"

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("ai-coaching")

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight">Advanced Features</h1>
        </div>

        <Tabs defaultValue="ai-coaching" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="ai-coaching">
              <Sparkles className="h-4 w-4 mr-2" />
              AI Coaching
            </TabsTrigger>
            <TabsTrigger value="nudge-actions">
              <Zap className="h-4 w-4 mr-2" />
              Nudge Actions
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <MessageSquare className="h-4 w-4 mr-2" />
              App Feedback
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ai-coaching" className="space-y-4">
            <CoachingInterface />
          </TabsContent>

          <TabsContent value="nudge-actions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Nudge Power Actions</CardTitle>
                <CardDescription>Use coins to enhance your nudges or maintain your streak</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Skip a Day</h3>
                  <p className="text-muted-foreground">
                    Use coins or a freeze pass to skip a day without losing your streak. Perfect for busy days or
                    vacations.
                  </p>
                  <NudgeActions nudgeId="demo-1" nudgeTitle="Skip a Day Example" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Boost a Nudge</h3>
                  <p className="text-muted-foreground">
                    Increase a nudge's visibility and impact score. Boosted nudges contribute more to your leadership
                    metrics.
                  </p>
                  <NudgeActions nudgeId="demo-2" nudgeTitle="Effective Team Communication" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Get AI Feedback</h3>
                  <p className="text-muted-foreground">
                    Receive personalized AI feedback on your implementation of a nudge to improve your leadership
                    approach.
                  </p>
                  <NudgeActions nudgeId="demo-3" nudgeTitle="Delegation Skills Development" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback" className="space-y-4">
            <FeedbackForm />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  )
}
