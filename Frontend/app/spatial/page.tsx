"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { Map, Square, Circle, OctagonIcon as Polygon, Search, Download, Eye, MapPin, Layers } from "lucide-react"

export default function SpatialQueryPage() {
  const { addNotification } = useApp()
  const [selectedTool, setSelectedTool] = useState("rectangle")
  const [searchQuery, setSearchQuery] = useState("")
  const [isDrawing, setIsDrawing] = useState(false)

  const drawingTools = [
    { id: "rectangle", name: "Rectangle", icon: Square, color: "text-blue-400" },
    { id: "circle", name: "Circle", icon: Circle, color: "text-green-400" },
    { id: "polygon", name: "Polygon", icon: Polygon, color: "text-purple-400" },
  ]

  const handleToolSelect = (toolId: string) => {
    setSelectedTool(toolId)
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `${drawingTools.find((t) => t.id === toolId)?.name} tool selected`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleStartDrawing = () => {
    setIsDrawing(true)
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Click on the map to start drawing your area of interest",
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleSearch = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Searching for: ${searchQuery}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleQueryExecution = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Executing spatial query...",
      timestamp: new Date().toISOString(),
      read: false,
    })
    setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        type: "success",
        message: "Spatial query completed - 247 data points found",
        timestamp: new Date().toISOString(),
        read: false,
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Spatial Query Interface
              </h1>
              <p className="text-slate-400 text-lg">Draw regions on the map to query satellite data</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Tools Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Drawing Tools */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Drawing Tools</CardTitle>
                <CardDescription className="text-slate-400">
                  Select a tool to draw your area of interest
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {drawingTools.map((tool) => (
                  <Button
                    key={tool.id}
                    variant={selectedTool === tool.id ? "default" : "outline"}
                    className={`w-full justify-start ${
                      selectedTool === tool.id
                        ? "bg-green-600 hover:bg-green-700"
                        : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                    }`}
                    onClick={() => handleToolSelect(tool.id)}
                  >
                    <tool.icon className={`w-4 h-4 mr-2 ${tool.color}`} />
                    {tool.name}
                  </Button>
                ))}
                <Button
                  onClick={handleStartDrawing}
                  disabled={isDrawing}
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4"
                >
                  {isDrawing ? "Drawing Active" : "Start Drawing"}
                </Button>
              </CardContent>
            </Card>

            {/* Search */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Location Search</CardTitle>
                <CardDescription className="text-slate-400">Search for specific locations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10 bg-slate-800/50 border-slate-700 text-white"
                  />
                </div>
                <Button onClick={handleSearch} className="w-full bg-blue-600 hover:bg-blue-700">
                  <MapPin className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </CardContent>
            </Card>

            {/* Query Options */}
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="text-white">Query Parameters</CardTitle>
                <CardDescription className="text-slate-400">Configure your spatial query</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <label className="text-sm text-slate-300">Data Sources</label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-300">RESOURCESAT-2A</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-300">CARTOSAT-3</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-300">INSAT-3D</span>
                    </div>
                  </div>
                </div>
                <Button onClick={handleQueryExecution} className="w-full bg-green-600 hover:bg-green-700">
                  <Search className="w-4 h-4 mr-2" />
                  Execute Query
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Map Area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-3"
          >
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md h-[600px]">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Layers className="w-5 h-5 mr-2 text-green-400" />
                  Interactive Map
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Draw your area of interest to query satellite data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-full">
                <div className="h-full bg-slate-800/50 rounded-lg flex items-center justify-center relative overflow-hidden">
                  {/* Map placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
                  <div className="text-center z-10">
                    <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg">Interactive Satellite Map</p>
                    <p className="text-slate-500">
                      Select a drawing tool and click here to define your area of interest
                    </p>
                    {selectedTool && (
                      <div className="mt-4 p-3 bg-slate-700/50 rounded-lg inline-block">
                        <p className="text-sm text-slate-300">
                          Active Tool:{" "}
                          <span className="text-green-400 font-medium">
                            {drawingTools.find((t) => t.id === selectedTool)?.name}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Results Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Query Results</CardTitle>
              <CardDescription className="text-slate-400">Satellite data found in your selected area</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">247</p>
                  <p className="text-slate-400 text-sm">Data Points</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">3</p>
                  <p className="text-slate-400 text-sm">Satellites</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">1.2 GB</p>
                  <p className="text-slate-400 text-sm">Total Size</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-400">15</p>
                  <p className="text-slate-400 text-sm">Time Range (days)</p>
                </div>
              </div>
              <div className="flex space-x-4 mt-6">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Results
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
