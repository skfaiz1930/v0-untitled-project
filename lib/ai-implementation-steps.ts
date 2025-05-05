// This would be connected to an actual AI service in production
// For now, we'll use mock data to simulate AI-generated implementation steps

type ImplementationStep = {
  step: number
  title: string
  description: string
  timeEstimate: string
  difficulty: "Easy" | "Medium" | "Hard"
}

type NudgeImplementation = {
  nudgeId: string
  steps: ImplementationStep[]
  resources: string[]
  estimatedTimeToComplete: string
  keyOutcomes: string[]
}

const mockImplementationSteps: Record<string, NudgeImplementation> = {
  "nudge-1": {
    nudgeId: "nudge-1",
    steps: [
      {
        step: 1,
        title: "Schedule individual check-ins",
        description:
          "Set up 15-minute one-on-one meetings with each team member in your calendar. Send invites with a brief agenda highlighting that this is a personal check-in.",
        timeEstimate: "30 minutes",
        difficulty: "Easy",
      },
      {
        step: 2,
        title: "Prepare thoughtful questions",
        description:
          "Create a list of 3-5 open-ended questions that focus on their wellbeing, challenges, and growth opportunities. Avoid yes/no questions.",
        timeEstimate: "20 minutes",
        difficulty: "Medium",
      },
      {
        step: 3,
        title: "Active listening practice",
        description:
          "During meetings, practice the 80/20 rule - listen 80% of the time and speak only 20%. Take notes on key points and follow-up items.",
        timeEstimate: "Ongoing",
        difficulty: "Medium",
      },
      {
        step: 4,
        title: "Document and follow up",
        description:
          "After each meeting, document key discussion points and action items. Send a brief follow-up email summarizing what was discussed and next steps.",
        timeEstimate: "10 minutes per meeting",
        difficulty: "Easy",
      },
    ],
    resources: [
      "Article: 'The Art of the One-on-One Meeting'",
      "Template: One-on-one meeting agenda",
      "Video: Active listening techniques for managers",
    ],
    estimatedTimeToComplete: "2-3 weeks (depending on team size)",
    keyOutcomes: [
      "Improved team communication",
      "Higher employee engagement",
      "Early identification of potential issues",
      "Stronger manager-employee relationships",
    ],
  },
  "nudge-2": {
    nudgeId: "nudge-2",
    steps: [
      {
        step: 1,
        title: "Identify recognition opportunities",
        description:
          "Review recent team accomplishments and individual contributions. Look for both major achievements and smaller wins that demonstrate company values.",
        timeEstimate: "30 minutes",
        difficulty: "Easy",
      },
      {
        step: 2,
        title: "Choose appropriate recognition methods",
        description:
          "Select recognition methods based on the achievement and individual preferences. Options include public praise in team meetings, written notes, or small rewards.",
        timeEstimate: "15 minutes",
        difficulty: "Easy",
      },
      {
        step: 3,
        title: "Deliver specific, timely recognition",
        description:
          "When recognizing team members, be specific about what they did, why it matters, and how it aligns with team goals or company values. Deliver recognition promptly.",
        timeEstimate: "10 minutes per recognition",
        difficulty: "Medium",
      },
      {
        step: 4,
        title: "Create a recognition rhythm",
        description:
          "Establish a regular cadence for recognition, such as a weekly team shout-out or a monthly recognition program. Add reminders to your calendar.",
        timeEstimate: "45 minutes",
        difficulty: "Medium",
      },
    ],
    resources: [
      "Guide: 'Recognition That Resonates'",
      "Template: Employee recognition tracker",
      "Research: Impact of recognition on team performance",
    ],
    estimatedTimeToComplete: "1-2 weeks to establish, then ongoing",
    keyOutcomes: [
      "Increased team morale",
      "Higher employee retention",
      "Reinforcement of desired behaviors",
      "Stronger team culture",
    ],
  },
  "nudge-3": {
    nudgeId: "nudge-3",
    steps: [
      {
        step: 1,
        title: "Assess current delegation practices",
        description:
          "Reflect on your current delegation approach. Identify tasks you're holding onto that could be delegated and team members who could benefit from new responsibilities.",
        timeEstimate: "45 minutes",
        difficulty: "Medium",
      },
      {
        step: 2,
        title: "Match tasks to team members",
        description:
          "Pair tasks with team members based on their skills, development goals, and workload. Look for opportunities to stretch their abilities while ensuring they can succeed.",
        timeEstimate: "30 minutes",
        difficulty: "Medium",
      },
      {
        step: 3,
        title: "Conduct delegation conversations",
        description:
          "Meet with team members to discuss new responsibilities. Clearly explain the task, desired outcome, available resources, and decision-making authority.",
        timeEstimate: "20 minutes per team member",
        difficulty: "Medium",
      },
      {
        step: 4,
        title: "Establish check-in points",
        description:
          "Set up a schedule for progress updates that provides support without micromanaging. Adjust frequency based on task complexity and team member experience.",
        timeEstimate: "15 minutes",
        difficulty: "Easy",
      },
      {
        step: 5,
        title: "Review and provide feedback",
        description:
          "After task completion, review results and provide constructive feedback. Acknowledge successes and discuss learning opportunities for future delegation.",
        timeEstimate: "30 minutes per delegated task",
        difficulty: "Hard",
      },
    ],
    resources: [
      "Framework: Delegation decision matrix",
      "Checklist: Effective delegation conversation",
      "Article: 'Letting Go: The Art of Delegation'",
    ],
    estimatedTimeToComplete: "3-4 weeks",
    keyOutcomes: [
      "More efficient use of manager time",
      "Team member skill development",
      "Increased team capacity",
      "Improved trust and autonomy",
    ],
  },
}

// In a real application, this would call an AI service
export async function generateImplementationSteps(
  nudgeId: string,
  nudgeTitle: string,
  nudgeDescription: string,
): Promise<NudgeImplementation> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Return mock data if available, or generate a generic response
  return (
    mockImplementationSteps[nudgeId] || {
      nudgeId,
      steps: [
        {
          step: 1,
          title: "Analyze the nudge context",
          description: `Review the nudge "${nudgeTitle}" and identify the key leadership behavior it's targeting. Consider how this applies to your specific team situation.`,
          timeEstimate: "20 minutes",
          difficulty: "Easy",
        },
        {
          step: 2,
          title: "Create an implementation plan",
          description:
            "Develop a specific plan with timeline for how you'll incorporate this leadership behavior into your management style.",
          timeEstimate: "45 minutes",
          difficulty: "Medium",
        },
        {
          step: 3,
          title: "Execute the behavior",
          description:
            "Put your plan into action, being mindful of how you're implementing the suggested leadership behavior.",
          timeEstimate: "1-2 weeks",
          difficulty: "Medium",
        },
        {
          step: 4,
          title: "Reflect and adjust",
          description:
            "After implementation, reflect on what worked well and what could be improved. Make adjustments to your approach.",
          timeEstimate: "30 minutes",
          difficulty: "Easy",
        },
      ],
      resources: ["Leadership development resources", "Team management best practices", "Communication techniques"],
      estimatedTimeToComplete: "2-3 weeks",
      keyOutcomes: [
        "Improved leadership effectiveness",
        "Better team dynamics",
        "Enhanced management skills",
        "Stronger team performance",
      ],
    }
  )
}
