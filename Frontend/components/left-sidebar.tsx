"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Satellite, Globe, Radar } from "lucide-react"

interface LeftSidebarProps {
  selectedLanguage: string
  setSelectedLanguage: (lang: string) => void
  selectedFilters: {
    mission: string
    satellite: string
    sensor: string
  }
  setSelectedFilters: (filters: any) => void
}

export function LeftSidebar({
  selectedLanguage,
  setSelectedLanguage,
  selectedFilters,
  setSelectedFilters,
}: LeftSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const missions = ["Chandrayaan-3", "Mangalyaan", "INSAT-3DR", "RISAT-2B", "Cartosat-3"]
  const satellites = ["INSAT-3D", "SCATSAT-1", "RESOURCESAT-2A", "OCEANSAT-2", "MEGHA-TROPIQUES"]
  const sensors = ["VHRR", "CCD", "LISS-III", "LISS-IV", "AWiFS"]

  return (
    <motion.aside
      initial={{ x: -300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="w-80 bg-slate-900/50 backdrop-blur-md border-r border-blue-500/20 p-6 overflow-y-auto"
    >
      <div className="space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search satellite data..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white placeholder-slate-400"
          />
        </div>

        {/* Language Toggle */}
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">Language</label>
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="hi">हिंदी</SelectItem>
              <SelectItem value="ta">தமிழ்</SelectItem>
              <SelectItem value="te">తెలుగు</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Filters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-300 flex items-center">
            <Globe className="w-5 h-5 mr-2" />
            Explore by
          </h3>

          {/* Mission Filter */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center">
              <Satellite className="w-4 h-4 mr-2" />
              Mission
            </label>
            <Select
              value={selectedFilters.mission}
              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, mission: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Select mission" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {missions.map((mission) => (
                  <SelectItem key={mission} value={mission}>
                    {mission}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Satellite Filter */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center">
              <Satellite className="w-4 h-4 mr-2" />
              Satellite
            </label>
            <Select
              value={selectedFilters.satellite}
              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, satellite: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Select satellite" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {satellites.map((satellite) => (
                  <SelectItem key={satellite} value={satellite}>
                    {satellite}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sensor Filter */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block flex items-center">
              <Radar className="w-4 h-4 mr-2" />
              Sensor
            </label>
            <Select
              value={selectedFilters.sensor}
              onValueChange={(value) => setSelectedFilters({ ...selectedFilters, sensor: value })}
            >
              <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                <SelectValue placeholder="Select sensor" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                {sensors.map((sensor) => (
                  <SelectItem key={sensor} value={sensor}>
                    {sensor}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-300">Quick Actions</h4>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            View Live Weather Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Track Satellites
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start border-slate-700 text-slate-300 hover:bg-slate-800 bg-transparent"
          >
            Browse FAQs
          </Button>
        </div>
      </div>
    </motion.aside>
  )
}
