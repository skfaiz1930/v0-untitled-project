// Mock data for pulse surveys
export const mockSurveys = [
  {
    id: "survey-1",
    title: "Team Communication Pulse Check",
    description: "Quick assessment of team communication effectiveness",
    status: "active",
    startDate: "2023-05-01",
    endDate: "2023-05-08",
    responseRate: 75,
    teamSize: 12,
    responsesReceived: 9,
    averageScore: 4.2,
    sentimentScore: 0.8,
    questions: [
      {
        id: "q1",
        text: "How satisfied are you with the team's communication frequency?",
        type: "rating",
        required: true,
        averageScore: 4.1,
      },
      {
        id: "q2",
        text: "How clear are the team's goals and priorities?",
        type: "rating",
        required: true,
        averageScore: 3.8,
      },
      {
        id: "q3",
        text: "How comfortable do you feel sharing ideas with the team?",
        type: "rating",
        required: true,
        averageScore: 4.5,
      },
      {
        id: "q4",
        text: "What could improve team communication?",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "survey-2",
    title: "Leadership Effectiveness Survey",
    description: "Feedback on leadership style and effectiveness",
    status: "completed",
    startDate: "2023-04-15",
    endDate: "2023-04-22",
    responseRate: 92,
    teamSize: 12,
    responsesReceived: 11,
    averageScore: 3.8,
    sentimentScore: 0.6,
    questions: [
      {
        id: "q1",
        text: "How well does your manager provide clear direction?",
        type: "rating",
        required: true,
        averageScore: 3.7,
      },
      {
        id: "q2",
        text: "How effectively does your manager provide feedback?",
        type: "rating",
        required: true,
        averageScore: 3.5,
      },
      {
        id: "q3",
        text: "How well does your manager support your professional growth?",
        type: "rating",
        required: true,
        averageScore: 4.2,
      },
      {
        id: "q4",
        text: "What could your manager do to be more effective?",
        type: "text",
        required: false,
      },
    ],
  },
  {
    id: "survey-3",
    title: "Team Engagement Survey",
    description: "Assessment of team engagement and satisfaction",
    status: "draft",
    startDate: "",
    endDate: "",
    responseRate: 0,
    teamSize: 12,
    responsesReceived: 0,
    averageScore: 0,
    sentimentScore: 0,
    questions: [
      {
        id: "q1",
        text: "How engaged do you feel with your work?",
        type: "rating",
        required: true,
      },
      {
        id: "q2",
        text: "How satisfied are you with your work-life balance?",
        type: "rating",
        required: true,
      },
      {
        id: "q3",
        text: "How likely are you to recommend this team as a great place to work?",
        type: "rating",
        required: true,
      },
      {
        id: "q4",
        text: "What would increase your engagement and satisfaction?",
        type: "text",
        required: false,
      },
    ],
  },
]

// Mock data for survey responses
export const mockSurveyResponses = {
  "survey-1": [
    {
      respondentId: "user-1",
      timestamp: "2023-05-02T10:15:00Z",
      responses: [
        { questionId: "q1", value: 4 },
        { questionId: "q2", value: 3 },
        { questionId: "q3", value: 5 },
        { questionId: "q4", value: "More regular team meetings would be helpful." },
      ],
    },
    {
      respondentId: "user-2",
      timestamp: "2023-05-02T14:30:00Z",
      responses: [
        { questionId: "q1", value: 5 },
        { questionId: "q2", value: 4 },
        { questionId: "q3", value: 4 },
        { questionId: "q4", value: "I think we could use a better project management tool." },
      ],
    },
    {
      respondentId: "user-3",
      timestamp: "2023-05-03T09:45:00Z",
      responses: [
        { questionId: "q1", value: 3 },
        { questionId: "q2", value: 4 },
        { questionId: "q3", value: 4 },
        { questionId: "q4", value: "More documentation would help with clarity." },
      ],
    },
  ],
  "survey-2": [
    {
      respondentId: "user-1",
      timestamp: "2023-04-16T11:20:00Z",
      responses: [
        { questionId: "q1", value: 4 },
        { questionId: "q2", value: 3 },
        { questionId: "q3", value: 5 },
        { questionId: "q4", value: "More specific feedback on my work would be helpful." },
      ],
    },
    {
      respondentId: "user-2",
      timestamp: "2023-04-17T10:05:00Z",
      responses: [
        { questionId: "q1", value: 3 },
        { questionId: "q2", value: 4 },
        { questionId: "q3", value: 4 },
        { questionId: "q4", value: "I'd appreciate more regular check-ins." },
      ],
    },
  ],
}

// Mock data for real-time survey responses
export const mockRealTimeSurveyData = {
  "survey-1": {
    totalResponses: 9,
    responseRate: 75,
    averageScore: 4.2,
    sentimentScore: 0.8,
    questionScores: [
      { questionId: "q1", averageScore: 4.1, responses: 9 },
      { questionId: "q2", averageScore: 3.8, responses: 9 },
      { questionId: "q3", averageScore: 4.5, responses: 9 },
      { questionId: "q4", responses: 7 },
    ],
    responseTimeline: [
      { date: "2023-05-01", count: 2 },
      { date: "2023-05-02", count: 3 },
      { date: "2023-05-03", count: 2 },
      { date: "2023-05-04", count: 1 },
      { date: "2023-05-05", count: 1 },
    ],
    respondents: [
      { id: "user-1", name: "Alice Smith", responded: true, timestamp: "2023-05-02T10:15:00Z" },
      { id: "user-2", name: "Bob Johnson", responded: true, timestamp: "2023-05-02T14:30:00Z" },
      { id: "user-3", name: "Carol Williams", responded: true, timestamp: "2023-05-03T09:45:00Z" },
      { id: "user-4", name: "David Brown", responded: true, timestamp: "2023-05-01T11:20:00Z" },
      { id: "user-5", name: "Eva Garcia", responded: true, timestamp: "2023-05-01T15:10:00Z" },
      { id: "user-6", name: "Frank Miller", responded: true, timestamp: "2023-05-03T14:25:00Z" },
      { id: "user-7", name: "Grace Lee", responded: true, timestamp: "2023-05-04T10:30:00Z" },
      { id: "user-8", name: "Henry Wilson", responded: true, timestamp: "2023-05-05T09:15:00Z" },
      { id: "user-9", name: "Ivy Martinez", responded: true, timestamp: "2023-05-02T16:45:00Z" },
      { id: "user-10", name: "Jack Thompson", responded: false },
      { id: "user-11", name: "Karen Davis", responded: false },
      { id: "user-12", name: "Leo Robinson", responded: false },
    ],
    textResponses: [
      {
        questionId: "q4",
        responses: [
          { respondentId: "user-1", response: "More regular team meetings would be helpful." },
          { respondentId: "user-2", response: "I think we could use a better project management tool." },
          { respondentId: "user-3", response: "More documentation would help with clarity." },
          { respondentId: "user-4", response: "I'd like to see more cross-team collaboration." },
          { respondentId: "user-5", response: "Weekly updates via email would be great." },
          { respondentId: "user-7", response: "More advance notice for meetings would help." },
          { respondentId: "user-9", response: "I think our communication is pretty good overall." },
        ],
      },
    ],
  },
}
