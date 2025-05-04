import { redirect } from "next/navigation"

export default function Home() {
  // Redirect to the dashboard or onboarding based on user authentication status
  // For demo purposes, we'll redirect to onboarding
  redirect("/onboarding")
}
