"use client"

import { useState } from "react"
import { Filter, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LeftSidebar } from "./left-sidebar"
import { RightSidebar } from "./right-sidebar"

export function MobileSidebarToggle() {
  const [leftOpen, setLeftOpen] = useState(false)
  const [rightOpen, setRightOpen] = useState(false)

  return (
    <div className="lg:hidden">
      {/* Mobile Sidebar Buttons */}
      <div className="fixed top-4 right-4 z-30 flex space-x-2">
        <Sheet open={leftOpen} onOpenChange={setLeftOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="bg-slate-800/80 backdrop-blur-md border border-slate-600 text-white hover:bg-slate-700/80"
            >
              <Filter className="w-4 h-4 mr-1" />
              <span className="text-xs">Filters</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 bg-slate-900/95 backdrop-blur-md border-slate-700 p-0">
            <div className="h-full overflow-y-auto">
              <LeftSidebar />
            </div>
          </SheetContent>
        </Sheet>

        <Sheet open={rightOpen} onOpenChange={setRightOpen}>
          <SheetTrigger asChild>
            <Button
              size="sm"
              className="bg-slate-800/80 backdrop-blur-md border border-slate-600 text-white hover:bg-slate-700/80"
            >
              <Lightbulb className="w-4 h-4 mr-1" />
              <span className="text-xs">Insights</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-slate-900/95 backdrop-blur-md border-slate-700 p-0">
            <div className="h-full overflow-y-auto">
              <RightSidebar />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
