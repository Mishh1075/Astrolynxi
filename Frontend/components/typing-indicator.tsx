"use client"

import { motion } from "framer-motion"
import { Bot } from "lucide-react"
import { Card } from "@/components/ui/card"

export function TypingIndicator() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start mb-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
          <Bot className="w-4 h-4" />
        </div>

        <Card className="p-4 bg-slate-800/50 border-slate-700">
          <div className="flex items-center space-x-1">
            <span className="text-slate-400 text-sm">AstroLynx is thinking</span>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-blue-400 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  )
}
