"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Palette } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface CustomizeScorecardProps {
  customColors: {
    primary: string
    secondary: string
    accent: string
    background: string
  }
  setCustomColors: (colors: any) => void
  surveyResults: any
}

export default function CustomizeScorecard({
  customColors,
  setCustomColors,
  surveyResults,
}: CustomizeScorecardProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("colors")
  const [tempColors, setTempColors] = useState({ ...customColors })
  const [previewColors, setPreviewColors] = useState({ ...customColors })

  const colorPresets = [
    {
      name: "Default",
      primary: "#60A5FA",
      secondary: "#6EE7B7",
      accent: "#FCA5A5",
      background: "#F3F4F6",
    },
    {
      name: "Ocean",
      primary: "#3B82F6",
      secondary: "#38BDF8",
      accent: "#FB7185",
      background: "#F0F9FF",
    },
    {
      name: "Forest",
      primary: "#10B981",
      secondary: "#34D399",
      accent: "#F87171",
      background: "#ECFDF5",
    },
    {
      name: "Sunset",
      primary: "#F59E0B",
      secondary: "#10B981",
      accent: "#EF4444",
      background: "#FFFBEB",
    },
    {
      name: "Lavender",
      primary: "#8B5CF6",
      secondary: "#A78BFA",
      accent: "#FB7185",
      background: "#F5F3FF",
    },
  ]

  const handleColorChange = (colorKey: string, value: string) => {
    setTempColors({
      ...tempColors,
      [colorKey]: value,
    })
  }

  const handleApplyColors = () => {
    setCustomColors(tempColors)
    setPreviewColors(tempColors)
    toast({
      title: "Colors updated",
      description: "Your scorecard colors have been updated.",
    })
  }

  const handleApplyPreset = (preset: any) => {
    setTempColors(preset)
    setCustomColors(preset)
    setPreviewColors(preset)
    toast({
      title: "Color preset applied",
      description: `The ${preset.name} color preset has been applied.`,
    })
  }

  const handleDownloadScorecard = () => {
    // In a real app, this would generate and download a PDF or PNG
    toast({
      title: "Downloading scorecard",
      description: "Your customized scorecard is being downloaded.",
    })
  }

  const handleShareScorecard = () => {
    // In a real app, this would open a share dialog
    toast({
      title: "Share scorecard",
      description: "Your customized scorecard is ready to share.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customize Scorecard</CardTitle>
              <CardDescription>
                Personalize the appearance of your survey scorecard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="colors" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="colors">
                    <Palette className="h-4 w-4 mr-2" />
                    Colors
                  </TabsTrigger>

\
