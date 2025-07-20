"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Map, Square, Circle, OctagonIcon as Polygon } from "lucide-react"

interface SpatialQueryModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SpatialQueryModal({ isOpen, onClose }: SpatialQueryModalProps) {
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
            <Card className="bg-slate-900 border-green-500/50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-green-400 flex items-center">
                    <Map className="w-5 h-5 mr-2" />
                    Spatial Query Mode
                  </CardTitle>
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-300 text-sm">
                  Draw a region on the map to query satellite data for specific geographical areas.
                </p>

                <div className="space-y-3">
                  <Button className="w-full justify-start bg-green-600/20 hover:bg-green-600/30 border border-green-500/50 text-green-300">
                    <Square className="w-4 h-4 mr-2" />
                    Draw Rectangle
                  </Button>
                  <Button className="w-full justify-start bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/50 text-blue-300">
                    <Circle className="w-4 h-4 mr-2" />
                    Draw Circle
                  </Button>
                  <Button className="w-full justify-start bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/50 text-purple-300">
                    <Polygon className="w-4 h-4 mr-2" />
                    Draw Polygon
                  </Button>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <p className="text-xs text-slate-400">
                    Select a drawing tool and click on the map to define your area of interest.
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
