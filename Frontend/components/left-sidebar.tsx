"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Languages } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"

export function LeftSidebar() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("en")

  const missions = ["Chandrayaan-3", "Mangalyaan", "INSAT-3D", "CARTOSAT-3", "Oceansat-3"]
  const satellites = ["VIKRAM", "PRAGYAN", "INSAT-3DR", "CARTOSAT-2E", "RESOURCESAT-2A"]
  const sensors = ["LHDAC", "LIBS", "VHRR", "PAN", "LISS-4"]

  return (
    <motion.aside
      className="w-full lg:w-80 bg-slate-900/60 backdrop-blur-md border-r border-slate-700/50 p-4 lg:p-6 overflow-y-auto max-h-screen"
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <div className="space-y-4 lg:space-y-6">
        {/* Search Bar */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Quick Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 h-10 lg:h-auto"
            />
          </div>
        </div>

        <Separator className="bg-slate-700/50" />

        {/* Language Toggle */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Languages className="w-4 h-4" />
            Language
          </label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="bg-slate-800/50 border-slate-600 text-white h-10">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator className="bg-slate-700/50" />

        {/* Filters - Collapsible on mobile */}
        <div className="space-y-3 lg:space-y-4">
          <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Explore by Category
          </h3>

          {/* Missions - Grid layout on mobile */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Missions</h4>
            <div className="grid grid-cols-1 gap-1">
              {missions.map((mission) => (
                <Button
                  key={mission}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 h-8 lg:h-auto text-xs lg:text-sm"
                >
                  {mission}
                </Button>
              ))}
            </div>
          </div>

          {/* Similar updates for Satellites and Sensors sections */}
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Satellites</h4>
            <div className="grid grid-cols-1 gap-1">
              {satellites.map((satellite) => (
                <Button
                  key={satellite}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 h-8 lg:h-auto text-xs lg:text-sm"
                >
                  {satellite}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wide">Sensors</h4>
            <div className="grid grid-cols-1 gap-1">
              {sensors.map((sensor) => (
                <Button
                  key={sensor}
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 h-8 lg:h-auto text-xs lg:text-sm"
                >
                  {sensor}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}
