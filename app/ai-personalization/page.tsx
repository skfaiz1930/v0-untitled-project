"use client"

import { useState, useEffect } from "react"
import MainLayout from "@/components/layout/main-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import {
  Brain,
  Settings,
  RefreshCw,
  CheckCircle,
  XCircle,
  Sparkles,
  User,
  Calendar,
  MessageSquare,
  Award,
  Users,
} from "lucide-react"
import { mockNudges } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"

// Simulated Python code that would run in Pyodide
const pythonPersonalizationCode = `
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class NudgeRecommender:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        
    def fit(self, nudges, user_data):
        # Extract text features from nudges
        nudge_texts = [n['title'] + ' ' + n['description'] for n in nudges]
        self.nudge_vectors = self.vectorizer.fit_transform(nudge_texts)
        self.nudges = nudges
        self.user_data = user_data
        
    def get_personalized_nudges(self, top_n=3):
        # Create a user profile based on interactions
        liked_nudges = [i for i, n in enumerate(self.nudges) if n.get('liked', False)]
        completed_nudges = [i for i, n in enumerate(self.nudges) if n.get('completed', False)]
        
        # If no interactions yet, return random nudges
        if not liked_nudges and not completed_nudges:
            return np.random.choice(len(self.nudges), top_n, replace=False).tolist()
        
        # Create a user profile vector (average of liked and completed nudges)
        profile_indices = list(set(liked_nudges + completed_nudges))
        if profile_indices:
            profile_vector = self.nudge_vectors[profile_indices].mean(axis=0)
            
            # Calculate similarity to all nudges
            similarities = cosine_similarity(profile_vector, self.nudge_vectors).flatten()
            
            # Get top N similar nudges
            top_indices = similarities.argsort()[-top_n*2:][::-1]
            
            # Filter out already completed nudges
            recommended = [i for i in top_indices if i not in completed_nudges][:top_n]
            
            return recommended
        
        return np.random.choice(len(self.nudges), top_n, replace=False).tolist()
`

export default function AIPersonalizationPage() {
  const [aiEnabled, setAiEnabled] = useState(true)
  const [personalizedNudges, setPersonalizedNudges] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [personalizationLevel, setPersonalizationLevel] = useState(70)
  const [activeTab, setActiveTab] = useState("preferences")
  const { toast } = useToast()

  // Simulate AI personalization
  useEffect(() => {
    const simulateAIPersonalization = () => {
      setIsLoading(true)

      // Simulate processing time
      setTimeout(() => {
        // In a real implementation, this would use Pyodide to run the Python code
        // For now, we'll just simulate the results
        const recommendedIndices = [0, 2, 4] // Simulated output from the Python model
        const recommended = recommendedIndices.map((index) => mockNudges[index])

        setPersonalizedNudges(recommended)
        setIsLoading(false)
      }, 1500)
    }

    simulateAIPersonalization()
  }, [aiEnabled])

  const handleRefreshRecommendations = () => {
    setIsLoading(true)

    // Simulate processing time
    setTimeout(() => {
      // Randomly select different nudges to simulate new recommendations
      const availableIndices = mockNudges.map((_, i) => i)
      const shuffled = availableIndices.sort(() => 0.5 - Math.random())
      const recommendedIndices = shuffled.slice(0, 3)
      const recommended = recommendedIndices.map((index) => mockNudges[index])

      setPersonalizedNudges(recommended)
      setIsLoading(false)

      toast({
        title: "Recommendations Refreshed",
        description: "Your personalized nudges have been updated based on your preferences.",
      })
    }, 1500)
  }

  const handlePersonalizationLevelChange = (value: number[]) => {
    setPersonalizationLevel(value[0])
  }

  return (
    <MainLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">AI Personalization</h1>
            <p className="text-muted-foreground">Customize your nudge experience with AI-powered recommendations</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch id="ai-toggle" checked={aiEnabled} onCheckedChange={setAiEnabled} />
              <Label htmlFor="ai-toggle" className="font-medium">
                {aiEnabled ? "AI Enabled" : "AI Disabled"}
              </Label>
            </div>
            <Button variant="outline" onClick={handleRefreshRecommendations} disabled={isLoading || !aiEnabled}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  Personalized Nudges
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">
                      Analyzing your preferences and generating personalized nudges...
                    </p>
                  </div>
                ) : !aiEnabled ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <XCircle className="h-8 w-8 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      AI personalization is currently disabled. Enable it to get personalized nudges.
                    </p>
                    <Button className="mt-4" onClick={() => setAiEnabled(true)}>
                      Enable AI
                    </Button>
                  </div>
                ) : personalizedNudges.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8">
                    <Brain className="h-8 w-8 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">
                      No personalized nudges available yet. Complete more nudges to improve recommendations.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {personalizedNudges.map((nudge) => (
                      <div
                        key={nudge.id}
                        className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-secondary transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{nudge.title}</h3>
                          <div className="bg-primary/10 text-primary text-xs rounded-full px-2 py-1">
                            AI Recommended
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">{nudge.description}</p>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center text-xs text-muted-foreground">
                            <Calendar className="h-3 w-3 mr-1" />
                            {nudge.date}
                          </div>
                          <Button size="sm">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Apply Nudge
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How AI Personalization Works</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Brain className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Data Analysis</h3>
                      <p className="text-sm text-muted-foreground">
                        Our AI analyzes your interactions with nudges, including which ones you've completed, liked, or
                        saved.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Preference Learning</h3>
                      <p className="text-sm text-muted-foreground">
                        The system learns your leadership style and preferences over time, creating a personalized
                        profile.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Smart Recommendations</h3>
                      <p className="text-sm text-muted-foreground">
                        Based on your profile, the AI recommends nudges that are most relevant to your leadership
                        development needs.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-primary/10 p-2 rounded-full mr-4">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Continuous Improvement</h3>
                      <p className="text-sm text-muted-foreground">
                        The more you interact with nudges, the better the recommendations become. Your feedback helps
                        train the model.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <Tabs defaultValue="preferences" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full">
                <TabsTrigger value="preferences" className="flex-1">
                  Preferences
                </TabsTrigger>
                <TabsTrigger value="code" className="flex-1">
                  AI Model
                </TabsTrigger>
              </TabsList>

              <TabsContent value="preferences" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Personalization Settings</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="personalization-level">Personalization Level</Label>
                        <span className="text-sm text-muted-foreground">{personalizationLevel}%</span>
                      </div>
                      <Slider
                        id="personalization-level"
                        defaultValue={[70]}
                        max={100}
                        step={10}
                        value={[personalizationLevel]}
                        onValueChange={handlePersonalizationLevelChange}
                        disabled={!aiEnabled}
                      />
                      <p className="text-xs text-muted-foreground">
                        Higher values prioritize personalized recommendations over general nudges.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="consider-history">Consider Nudge History</Label>
                        <Switch id="consider-history" defaultChecked disabled={!aiEnabled} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Use your past nudge interactions to improve recommendations.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="team-context">Include Team Context</Label>
                        <Switch id="team-context" defaultChecked disabled={!aiEnabled} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Consider your team composition when suggesting leadership nudges.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="role-specific">Role-Specific Nudges</Label>
                        <Switch id="role-specific" defaultChecked disabled={!aiEnabled} />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Tailor nudges based on your specific leadership role.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Focus Areas</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {["Team Building", "Communication", "Delegation", "Feedback", "Recognition"].map((area) => (
                        <div key={area} className="flex items-center justify-between">
                          <Label htmlFor={`focus-${area.toLowerCase()}`}>{area}</Label>
                          <Switch
                            id={`focus-${area.toLowerCase()}`}
                            defaultChecked={["Team Building", "Communication", "Recognition"].includes(area)}
                            disabled={!aiEnabled}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="code" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">AI Model (Python via Pyodide)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-secondary p-4 rounded-md overflow-x-auto">
                      <pre className="text-xs">
                        <code>{pythonPersonalizationCode}</code>
                      </pre>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This Python code runs in your browser using Pyodide to provide personalized nudge recommendations.
                      It uses TF-IDF vectorization and cosine similarity to match your preferences with relevant nudges.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Model Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Recommendation Accuracy</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">User Satisfaction</span>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "92%" }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Processing Speed</span>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div className="bg-primary h-2 rounded-full" style={{ width: "78%" }}></div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full mt-4">
                      <Settings className="h-4 w-4 mr-2" />
                      Advanced Model Settings
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your AI Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">Leadership Style</span>
                    </div>
                    <span className="text-sm">Collaborative</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">Communication Preference</span>
                    </div>
                    <span className="text-sm">Direct</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">Team Size</span>
                    </div>
                    <span className="text-sm">Small (3-5)</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Brain className="h-5 w-5 text-primary mr-2" />
                      <span className="text-sm font-medium">Learning Style</span>
                    </div>
                    <span className="text-sm">Practical</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Update Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
