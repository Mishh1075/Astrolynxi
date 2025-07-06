import { Navigation } from "@/components/navigation"
import { StarfieldBackground } from "@/components/starfield-background"
import { ChatInterface } from "@/components/chat-interface"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { FloatingButtons } from "@/components/floating-buttons"
import { MobileSidebarToggle } from "@/components/mobile-sidebar-toggle"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <StarfieldBackground />
      <Navigation />

      {/* Mobile Sidebar Toggle */}
      <MobileSidebarToggle />

      {/* Mobile-first responsive layout */}
      <main className="md:ml-64 flex flex-col lg:flex-row h-screen">
        {/* Left Sidebar - Hidden on mobile, shown on larger screens */}
        <div className="hidden lg:block">
          <LeftSidebar />
        </div>

        {/* Main Chat Interface - Full width on mobile */}
        <div className="flex-1 min-h-0">
          <ChatInterface />
        </div>

        {/* Right Sidebar - Hidden on mobile and tablet, shown on desktop */}
        <div className="hidden xl:block">
          <RightSidebar />
        </div>
      </main>

      <FloatingButtons />
    </div>
  )
}
