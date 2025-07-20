"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Map } from "lucide-react"

interface FloatingButtonsProps {
  onDisasterMode: () => void
  onSpatialQuery: () => void
}

export function FloatingButtons({ onDisasterMode, onSpatialQuery }: FloatingButtonsProps) {
  return (
    <div className="fixed right-6 bottom-6 flex flex-col space-y-3 z-40">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onDisasterMode}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
          title="Disaster Mode"
        >
          <AlertTriangle className="w-6 h-6" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.3 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onSpatialQuery}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
          title="Spatial Query"
        >
          <Map className="w-6 h-6" />
        </Button>
      </motion.div>
    </div>
  )
}
