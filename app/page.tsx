import TabsWrapper from "@/components/tabs-wrapper"

export default function Home() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">GML Summit WhatsApp Engagement Bot</h1>
          <p className="text-muted-foreground">
            Manage content generation, testing, and message delivery for the Great Managers League Summit 2025
          </p>
        </div>

        <TabsWrapper />
      </div>
    </main>
  )
}
