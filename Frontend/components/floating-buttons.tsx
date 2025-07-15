"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Map, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function FloatingButtons() {
  return (
    <TooltipProvider>
      <div className="fixed right-3 md:right-6 bottom-20 md:bottom-24 z-20 space-y-2 md:space-y-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <Button
                size="lg"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-red-600 hover:bg-red-700 text-white shadow-lg"
                aria-label="Switch to Disaster Mode"
              >
                <AlertTriangle className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Disaster Mode</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5, delay: 1.7 }}
            >
              <Button
                size="lg"
                className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                aria-label="Draw region on map"
              >
                <Map className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </motion.div>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Spatial Query</p>
          </TooltipContent>
        </Tooltip>

        {/* Mobile-only button to toggle sidebars */}
        <div className="lg:hidden">
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ scale: 0, rotate: 180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 1.9 }}
              >
                <Button
                  size="lg"
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                  aria-label="Toggle sidebar"
                >
                  <Menu className="w-5 h-5 md:w-6 md:h-6" />
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Menu</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}
