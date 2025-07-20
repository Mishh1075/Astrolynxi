"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { Map, Layers, Target, Download, Settings, Play, Pause, MapPin, Zap } from "lucide-react"

export default function SpatialPage() {
  const { addNotification } = useApp()
  const [selectedAnalysis, setSelectedAnalysis] = useState("hotspot")
  const [selectedRegion, setSelectedRegion] = useState("india")
  const [activeTab, setActiveTab] = useState("analysis")
  const [isProcessing, setIsProcessing] = useState(false)

  const analysisTypes = [
    {
      id: "hotspot",
      name: "Hotspot Analysis",
      description: "Identify spatial clusters and patterns in satellite data",
      icon: Target,
    },
    {
      id: "correlation",
      name: "Spatial Correlation",
      description: "Analyze relationships between different geographic variables",
      icon: Layers,
    },
    {
      id: "interpolation",
      name: "Spatial Interpolation",
      description: "Estimate values at unmeasured locations using spatial methods",
      icon: MapPin,
    },
    {
      id: "change",
      name: "Change Detection",
      description: "Detect and analyze spatial changes over time",
      icon: Zap,
    },
  ]

  const regions = [
    { id: "india", name: "All India", bounds: "6°N-37°N, 68°E-97°E" },
    { id: "north", name: "Northern India", bounds: "24°N-37°N, 68°E-88°E" },
    { id: "south", name: "Southern India", bounds: "6°N-24°N, 68°E-88°E" },
    { id: "coastal", name: "Coastal Regions", bounds: "Coastal Buffer 50km" },
  ]

  const handleRunAnalysis = () => {
    setIsProcessing(true)
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Starting ${analysisTypes.find((a) => a.id === selectedAnalysis)?.name} for ${regions.find((r) => r.id === selectedRegion)?.name}`,
      timestamp: new Date().toISOString(),
      read: false,
    })

    setTimeout(() => {
      setIsProcessing(false)
      addNotification({
        id: Date.now().toString(),
        type: "success",
        message: "Spatial analysis completed successfully",
        timestamp: new Date().toISOString(),
        read: false,
      })
    }, 3000)
  }

  const handleDownloadResults = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Downloading spatial analysis results...",
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const currentAnalysis = analysisTypes.find((a) => a.id === selectedAnalysis)
  const currentRegion = regions.find((r) => r.id === selectedRegion)

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center">
              <Map className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-teal-300 bg-clip-text text-transparent">
                Spatial Analysis
              </h1>
              <p className="text-slate-400 text-lg">Geographic data analysis and spatial pattern detection</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <Select value={selectedAnalysis} onValueChange={setSelectedAnalysis}>
            <SelectTrigger className="w-64 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Analysis Type" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {analysisTypes.map((analysis) => (
                <SelectItem key={analysis.id} value={analysis.id}>
                  {analysis.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {regions.map((region) => (
                <SelectItem key={region.id} value={region.id}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button onClick={handleRunAnalysis} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
              {isProcessing ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
              {isProcessing ? "Processing..." : "Run Analysis"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="analysis" className="data-[state=active]:bg-green-600">
                Analysis Setup
              </TabsTrigger>
              <TabsTrigger value="results" className="data-[state=active]:bg-green-600">
                Results
              </TabsTrigger>
              <TabsTrigger value="visualization" className="data-[state=active]:bg-green-600">
                Visualization
              </TabsTrigger>
            </TabsList>

            <TabsContent value="analysis" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Analysis Configuration */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      {currentAnalysis && <currentAnalysis.icon className="w-5 h-5 mr-2 text-green-400" />}
                      {currentAnalysis?.name || "Select Analysis"}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {currentAnalysis?.description || "Choose an analysis type to get started"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-slate-400 text-sm mb-2">Selected Region</p>
                      <p className="text-white font-medium">{currentRegion?.name}</p>
                      <p className="text-slate-500 text-sm">{currentRegion?.bounds}</p>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-2">Data Sources</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-slate-300">RESOURCESAT-2A (LISS-III)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-slate-300">CARTOSAT-3 (PAN)</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-300">INSAT-3D (VHRR)</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-slate-400 text-sm mb-2">Parameters</p>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" defaultChecked className="rounded" />
                          <span className="text-sm text-slate-300">NDVI</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-300">Land Surface Temperature</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm text-slate-300">Soil Moisture</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Processing Status */}
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Processing Status</CardTitle>
                    <CardDescription className="text-slate-400">Current analysis progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isProcessing ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Data Loading</span>
                          <span className="text-sm text-green-400">Complete</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Spatial Processing</span>
                          <span className="text-sm text-yellow-400">In Progress</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-300">Result Generation</span>
                          <span className="text-sm text-slate-500">Pending</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full w-2/3 transition-all duration-300"></div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Map className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400">Ready to run spatial analysis</p>
                        <p className="text-slate-500 text-sm">Click "Run Analysis" to start processing</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="results" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Analysis Results</CardTitle>
                    <CardDescription className="text-slate-400">
                      Statistical summary of spatial analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-slate-400 text-sm">Hotspots Detected</p>
                        <p className="text-2xl font-bold text-green-400">23</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Confidence Level</p>
                        <p className="text-2xl font-bold text-blue-400">95%</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Spatial Autocorr.</p>
                        <p className="text-2xl font-bold text-purple-400">0.78</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">P-Value</p>
                        <p className="text-2xl font-bold text-orange-400">0.001</p>
                      </div>
                    </div>
                    <Button onClick={handleDownloadResults} className="w-full bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download Results
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Spatial Statistics</CardTitle>
                    <CardDescription className="text-slate-400">Key spatial metrics and indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Moran's I</span>
                      <span className="text-white font-mono">0.782</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Geary's C</span>
                      <span className="text-white font-mono">0.218</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Local Indicators</span>
                      <span className="text-white font-mono">156</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Cluster Count</span>
                      <span className="text-white font-mono">23</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="visualization" className="mt-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Spatial Visualization</CardTitle>
                  <CardDescription className="text-slate-400">Interactive maps and spatial patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-slate-800/50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Map className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <p className="text-slate-400 text-lg">Interactive Map Visualization</p>
                      <p className="text-slate-500">Spatial analysis results will be displayed here</p>
                      <Button className="mt-4 bg-green-600 hover:bg-green-700">Load Map Viewer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
