export interface AccessSession {
  id: string
  userId: string
  userEmail: string
  loginTime: string
  logoutTime?: string
  ip: string
  userAgent: string
  device: string
  location?: string
  status: "active" | "ended" | "expired" | "suspicious"
}

// Mock access history for demonstration
export const mockAccessHistory: AccessSession[] = [
  {
    id: "session-1",
    userId: "user-1",
    userEmail: "john.doe@example.com",
    loginTime: "2023-05-15T08:30:45Z",
    logoutTime: "2023-05-15T12:45:22Z",
    ip: "192.168.1.10",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows PC",
    location: "New York, USA",
    status: "ended",
  },
  {
    id: "session-2",
    userId: "user-1",
    userEmail: "john.doe@example.com",
    loginTime: "2023-05-16T09:15:30Z",
    logoutTime: "2023-05-16T17:20:10Z",
    ip: "192.168.1.10",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows PC",
    location: "New York, USA",
    status: "ended",
  },
  {
    id: "session-3",
    userId: "user-1",
    userEmail: "john.doe@example.com",
    loginTime: "2023-05-17T08:45:12Z",
    ip: "192.168.1.10",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows PC",
    location: "New York, USA",
    status: "active",
  },
  {
    id: "session-4",
    userId: "user-2",
    userEmail: "jane.smith@example.com",
    loginTime: "2023-05-15T10:20:33Z",
    logoutTime: "2023-05-15T16:15:47Z",
    ip: "192.168.1.20",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Pro",
    location: "San Francisco, USA",
    status: "ended",
  },
  {
    id: "session-5",
    userId: "user-2",
    userEmail: "jane.smith@example.com",
    loginTime: "2023-05-16T09:30:15Z",
    logoutTime: "2023-05-16T18:05:22Z",
    ip: "192.168.1.20",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Pro",
    location: "San Francisco, USA",
    status: "ended",
  },
  {
    id: "session-6",
    userId: "user-2",
    userEmail: "jane.smith@example.com",
    loginTime: "2023-05-17T10:10:05Z",
    ip: "192.168.1.20",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    device: "MacBook Pro",
    location: "San Francisco, USA",
    status: "active",
  },
  {
    id: "session-7",
    userId: "user-3",
    userEmail: "michael.johnson@example.com",
    loginTime: "2023-05-15T11:45:22Z",
    logoutTime: "2023-05-15T14:30:18Z",
    ip: "192.168.1.30",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
    device: "iPhone",
    location: "Chicago, USA",
    status: "ended",
  },
  {
    id: "session-8",
    userId: "user-3",
    userEmail: "michael.johnson@example.com",
    loginTime: "2023-05-16T12:15:40Z",
    ip: "192.168.1.31",
    userAgent: "Mozilla/5.0 (Linux; Android 11; SM-G998B) AppleWebKit/537.36",
    device: "Android Phone",
    location: "Chicago, USA",
    status: "suspicious",
  },
  {
    id: "session-9",
    userId: "admin-1",
    userEmail: "admin@example.com",
    loginTime: "2023-05-15T10:30:45Z",
    logoutTime: "2023-05-15T17:30:55Z",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows PC",
    location: "New York, USA",
    status: "ended",
  },
  {
    id: "session-10",
    userId: "admin-1",
    userEmail: "admin@example.com",
    loginTime: "2023-05-16T13:30:15Z",
    ip: "192.168.1.1",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    device: "Windows PC",
    location: "New York, USA",
    status: "active",
  },
]
