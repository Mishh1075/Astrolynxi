"use client"

import { useState } from "react"
import { InteractiveChat } from "@/components/interactive-chat"
import { RightSidebar } from "@/components/right-sidebar"
import { StarField } from "@/components/star-field"
import { FloatingButtons } from "@/components/floating-buttons"
import { DisasterModeModal } from "@/components/disaster-mode-modal"
import { SpatialQueryModal } from "@/components/spatial-query-modal"

export default function ChatPage() {
  const [isDisasterMode, setIsDisasterMode] = useState(false)
  const [isSpatialQuery, setIsSpatialQuery] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState({
    mission: "",
    satellite: "",
    sensor: "",
  })

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 flex h-screen">
        <main className="flex-1 flex flex-col">
          <InteractiveChat />
        </main>

        <RightSidebar />
      </div>

      <FloatingButtons onDisasterMode={() => setIsDisasterMode(true)} onSpatialQuery={() => setIsSpatialQuery(true)} />

      <DisasterModeModal isOpen={isDisasterMode} onClose={() => setIsDisasterMode(false)} />
      <SpatialQueryModal isOpen={isSpatialQuery} onClose={() => setIsSpatialQuery(false)} />
    </div>
  )
}
