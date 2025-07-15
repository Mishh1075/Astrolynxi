"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { StarfieldBackground } from "@/components/starfield-background"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Layers, Satellite, MapPin, Zap } from "lucide-react"

export default function MapView() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <StarfieldBackground />
      <Navigation />

      <main className="md:ml-64 relative z-10 h-screen flex">
        {/* Map Controls */}
        <motion.div
          initial={{ x: -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="w-80 p-6 bg-slate-900/60 backdrop-blur-md border-r border-slate-700/50"
        >
          <h2 className="text-xl font-bold text-white mb-6">Map Controls</h2>

          <div className="space-y-4">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Layers
                </h3>
                <div className="space-y-2">
                  {["Satellite Imagery", "Weather Data", "Ocean Color", "Land Cover"].map((layer) => (
                    <label key={layer} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-slate-300 text-sm">{layer}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-4">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Satellite className="w-4 h-4" />
                  Active Satellites
                </h3>
                <div className="space-y-2">
                  {["INSAT-3D", "Cartosat-3", "RISAT-2B", "Oceansat-3"].map((sat) => (
                    <div key={sat} className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">{sat}</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <MapPin className="w-4 h-4 mr-2" />
                Draw Region
              </Button>
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 bg-transparent">
                <Zap className="w-4 h-4 mr-2" />
                Quick Query
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Map Area */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex-1 relative"
        >
          <div className="absolute inset-0 bg-slate-800/30 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Interactive Satellite Map</h3>
              <p className="text-slate-400">Map visualization would be integrated here</p>
              <p className="text-slate-500 text-sm mt-2">
                (Integration with mapping libraries like Leaflet, Mapbox, or Google Maps)
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}
