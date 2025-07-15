"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Cloud, Satellite, HelpCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"

export function OptionalWidgets() {
  const [timelineValue, setTimelineValue] = useState([50])

  return (
    <motion.div
      className="fixed bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 z-10 px-3 md:px-0"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <Card className="bg-slate-900/80 backdrop-blur-md border-slate-700/50 w-[calc(100vw-1.5rem)] md:w-96 max-w-md">
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 h-8 md:h-10">
            <TabsTrigger value="timeline" className="text-xs p-1 md:p-2">
              <Calendar className="w-3 h-3 md:w-4 md:h-4" />
            </TabsTrigger>
            <TabsTrigger value="weather" className="text-xs p-1 md:p-2">
              <Cloud className="w-3 h-3 md:w-4 md:h-4" />
            </TabsTrigger>
            <TabsTrigger value="tracker" className="text-xs p-1 md:p-2">
              <Satellite className="w-3 h-3 md:w-4 md:h-4" />
            </TabsTrigger>
            <TabsTrigger value="faq" className="text-xs p-1 md:p-2">
              <HelpCircle className="w-3 h-3 md:w-4 md:h-4" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline" className="p-3 md:p-4">
            <div className="space-y-2 md:space-y-3">
              <h4 className="text-xs md:text-sm font-medium text-white">Temporal Navigation</h4>
              <Slider value={timelineValue} onValueChange={setTimelineValue} max={100} step={1} className="w-full" />
              <div className="flex justify-between text-xs text-slate-400">
                <span>2020</span>
                <span>2024</span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="p-3 md:p-4">
            <div className="text-center">
              <h4 className="text-xs md:text-sm font-medium text-white mb-2">Live Weather</h4>
              <div className="text-xl md:text-2xl text-blue-400">23°C</div>
              <div className="text-xs text-slate-400">Partly Cloudy</div>
            </div>
          </TabsContent>

          <TabsContent value="tracker" className="p-3 md:p-4">
            <div className="text-center">
              <h4 className="text-xs md:text-sm font-medium text-white mb-2">Satellite Tracker</h4>
              <div className="text-xs md:text-sm text-green-400">INSAT-3D: Active</div>
              <div className="text-xs text-slate-400">Next pass: 14:32 UTC</div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="p-3 md:p-4">
            <div className="space-y-2">
              <h4 className="text-xs md:text-sm font-medium text-white">Quick Help</h4>
              <div className="text-xs text-slate-300">
                • Ask about satellite missions
                <br />• Query weather data
                <br />• Explore MOSDAC portal
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  )
}
