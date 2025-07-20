"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, AlertTriangle, Satellite, MapPin } from "lucide-react"

interface DisasterModeModalProps {
  isOpen: boolean
  onClose: () => void
}

export function DisasterModeModal({ isOpen, onClose }: DisasterModeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card className="bg-slate-900 border-red-500/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-red-400 flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Disaster Mode Activated
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm">
                  Emergency satellite monitoring activated. Real-time disaster tracking and analysis enabled.
                </p>

                <div className="space-y-3">
                  <Button className="w-full justify-start bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 text-red-300">
                    <Satellite className="w-4 h-4 mr-2" />
                    Monitor Cyclone Activity
                  </Button>
                  <Button className="w-full justify-start bg-orange-600/20 hover:bg-orange-600/30 border border-orange-500/50 text-orange-300">
                    <MapPin className="w-4 h-4 mr-2" />
                    Flood Detection
                  </Button>
                  <Button className="w-full justify-start bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-500/50 text-yellow-300">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Earthquake Monitoring
                  </Button>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-400">
                    Emergency protocols activated. All satellite resources prioritized for disaster monitoring.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
