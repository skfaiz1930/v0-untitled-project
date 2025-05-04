"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChevronRight, ChevronLeft, User, Building, Award, CheckCircle, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ModeToggle } from "@/components/mode-toggle"

interface TeamMember {
  id: string
  name: string
  email: string
  role: string
}

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {}

    if (currentStep === 1) {
      if (!userData.name) newErrors.name = "Name is required"
      if (!userData.email) newErrors.email = "Email is required"
      else if (!/\S+@\S+\.\S+/.test(userData.email)) newErrors.email = "Email is invalid"
      if (!userData.company) newErrors.company = "Company is required"
      if (!userData.role) newErrors.role = "Role is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handlePrevious = () => {
    setStep(step - 1)
  }

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })

    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewMember({ ...newMember, [name]: value })
  }

  const addTeamMember = () => {
    // Validate
    const memberErrors: Record<string, string> = {}
    if (!newMember.name) memberErrors.memberName = "Name is required"
    if (!newMember.email) memberErrors.memberEmail = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(newMember.email)) memberErrors.memberEmail = "Email is invalid"
    if (!newMember.role) memberErrors.memberRole = "Role is required"

    if (Object.keys(memberErrors).length > 0) {
      setErrors({ ...errors, ...memberErrors })
      return
    }

    // Add member
    const member = {
      id: `member-${Date.now()}`,
      ...newMember,
    }

    setTeamMembers([...teamMembers, member])
    setNewMember({ name: "", email: "", role: "" })
    setErrors({})
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id))
  }

  const handleComplete = () => {
    // In a real app, you would save the data to the backend here
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>

      <Card className="w-full max-w-4xl shadow-medium animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Welcome to NudgeManager</CardTitle>
          <CardDescription>Let's set up your account to help you become a better leader</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-8">
            <div className="relative">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`flex flex-col items-center ${
                      i < step ? "text-primary" : i === step ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        i < step
                          ? "bg-primary text-white"
                          : i === step
                            ? "border-2 border-primary text-primary"
                            : "border-2 border-muted-foreground text-muted-foreground"
                      }`}
                    >
                      {i < step ? <CheckCircle className="h-5 w-5" /> : i}
                    </div>
                    <span className="text-sm font-medium">
                      {i === 1 ? "Your Info" : i === 2 ? "Team Members" : "Complete"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="absolute top-5 left-[calc(16.67%+5px)] right-[calc(16.67%+5px)] h-0.5 bg-gray-200 dark:bg-gray-700 -z-10">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(step - 1) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      className="pl-10"
                      value={userData.name}
                      onChange={handleUserDataChange}
                    />
                  </div>
                  {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={userData.email}
                    onChange={handleUserDataChange}
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      className="pl-10"
                      value={userData.company}
                      onChange={handleUserDataChange}
                    />
                  </div>
                  {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    name="role"
                    placeholder="Team Lead, Manager, etc."
                    value={userData.role}
                    onChange={handleUserDataChange}
                  />
                  {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Add Team Members</h3>
                  <p className="text-sm text-muted-foreground">{teamMembers.length} members added</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberName">Name</Label>
                    <Input
                      id="memberName"
                      name="name"
                      placeholder="Team Member Name"
                      value={newMember.name}
                      onChange={handleNewMemberChange}
                    />
                    {errors.memberName && <p className="text-sm text-red-500">{errors.memberName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberEmail">Email</Label>
                    <Input
                      id="memberEmail"
                      name="email"
                      type="email"
                      placeholder="member@example.com"
                      value={newMember.email}
                      onChange={handleNewMemberChange}
                    />
                    {errors.memberEmail && <p className="text-sm text-red-500">{errors.memberEmail}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="memberRole">Role</Label>
                    <Input
                      id="memberRole"
                      name="role"
                      placeholder="Developer, Designer, etc."
                      value={newMember.role}
                      onChange={handleNewMemberChange}
                    />
                    {errors.memberRole && <p className="text-sm text-red-500">{errors.memberRole}</p>}
                  </div>
                </div>

                <Button onClick={addTeamMember} className="w-full">
                  Add Team Member
                </Button>
              </div>

              {teamMembers.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Your Team</h3>
                  <div className="space-y-2">
                    {teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className="flex items-center justify-between p-3 rounded-md border border-gray-200 dark:border-gray-700"
                      >
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-3">
                            <AvatarImage src={`/placeholder.svg?height=40&width=40`} />
                            <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <span>{member.email}</span>
                              <span className="mx-2">•</span>
                              <span>{member.role}</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeTeamMember(member.id)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-sm text-muted-foreground text-center">
                Don't worry, you can add or remove team members later.
              </p>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="rounded-full bg-primary/10 p-6">
                  <Award className="h-12 w-12 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold">You're All Set!</h2>
                <p className="text-muted-foreground">Your NudgeManager account has been created successfully.</p>
              </div>

              <div className="bg-primary/5 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-medium mb-2">What's Next?</h3>
                <ul className="text-sm text-left space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Check your daily nudge to improve your leadership skills</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Complete nudges to earn points and climb the leaderboard</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Maintain a streak to unlock badges and achievements</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                    <span>Chat with your team members and share helpful nudges</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {step > 1 ? (
            <Button variant="outline" onClick={handlePrevious}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          ) : (
            <div></div>
          )}

          {step < 3 ? (
            <Button onClick={handleNext}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleComplete}>
              Go to Dashboard
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
