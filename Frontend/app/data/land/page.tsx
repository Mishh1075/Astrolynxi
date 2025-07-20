"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { Mountain, Eye, Download, MapPin, Search, Filter, RefreshCw, Trees, Wheat, Home, Factory } from "lucide-react"

export default function LandDataPage() {
  const { addNotification } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")
  const [activeTab, setActiveTab] = useState("current")

  const landData = [
    {
      id: 1,
      region: "Punjab Plains",
      ndvi: "0.75",
      landCover: "Agricultural",
      cropHealth: "Excellent",
      soilMoisture: "65%",
      satellite: "RESOURCESAT-2A",
      lastUpdate: "6 hours ago",
      coordinates: "30.5°N, 75.5°E",
    },
    {
      id: 2,
      region: "Western Ghats",
      ndvi: "0.82",
      landCover: "Dense Forest",
      cropHealth: "N/A",
      soilMoisture: "78%",
      satellite: "CARTOSAT-3",
      lastUpdate: "4 hours ago",
      coordinates: "15.5°N, 74.0°E",
    },
    {
      id: 3,
      region: "Thar Desert",
      ndvi: "0.15",
      landCover: "Barren Land",
      cropHealth: "Poor",
      soilMoisture: "12%",
      satellite: "RESOURCESAT-2A",
      lastUpdate: "8 hours ago",
      coordinates: "27.0°N, 71.0°E",
    },
  ]

  const dataProducts = [
    {
      name: "NDVI (Vegetation Index)",
      description: "Normalized Difference Vegetation Index for vegetation monitoring",
      resolution: "23.5m",
      frequency: "16-day composite",
      format: "GeoTIFF, HDF5",
      size: "1.2 GB",
      parameters: ["NDVI", "EVI", "SAVI"],
    },
    {
      name: "Land Cover Classification",
      description: "Detailed land use and land cover mapping",
      resolution: "30m",
      frequency: "Annual",
      format: "GeoTIFF, Shapefile",
      size: "2.8 GB",
      parameters: ["Land Cover Classes", "Change Detection", "Accuracy Assessment"],
    },
    {
      name: "Agricultural Monitoring",
      description: "Crop type mapping and agricultural productivity assessment",
      resolution: "10m",
      frequency: "Seasonal",
      format: "GeoTIFF, CSV",
      size: "1.9 GB",
      parameters: ["Crop Type", "Yield Estimation", "Phenology"],
    },
    {
      name: "Forest Assessment",
      description: "Forest cover monitoring and deforestation analysis",
      resolution: "30m",
      frequency: "Annual",
      format: "GeoTIFF, KML",
      size: "2.1 GB",
      parameters: ["Forest Cover", "Deforestation Rate", "Biomass Estimation"],
    },
  ]

  const handleSearch = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Searching land data for: ${searchQuery}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleDataDownload = (productName: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Downloading ${productName} data`,
      timestamp: new Date().toISOString(),
      read: false,
    })
    setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        type: "success",
        message: `${productName} download completed`,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }, 3000)
  }

  const handleDataPreview = (productName: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Opening preview for ${productName}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const refreshData = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Refreshing land data...",
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <Mountain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                  Land Data Portal
                </h1>
                <p className="text-slate-400 text-lg">Land use, vegetation, and agricultural monitoring</p>
              </div>
            </div>
            <Button onClick={refreshData} className="bg-green-600 hover:bg-green-700">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Data
            </Button>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search land data by location, crop type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-green-500 text-white"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="punjab">Punjab Plains</SelectItem>
              <SelectItem value="ghats">Western Ghats</SelectItem>
              <SelectItem value="deccan">Deccan Plateau</SelectItem>
              <SelectItem value="gangetic">Gangetic Plains</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="current">Current Season</SelectItem>
              <SelectItem value="1month">Last Month</SelectItem>
              <SelectItem value="3months">Last 3 Months</SelectItem>
              <SelectItem value="1year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="bg-green-600 hover:bg-green-700">
            <Filter className="w-4 h-4 mr-2" />
            Apply Filters
          </Button>
        </motion.div>

        {/* Data Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="current" className="data-[state=active]:bg-green-600">
                Current Conditions
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-green-600">
                Data Products
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-green-600">
                Analysis Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {landData.map((data) => (
                  <Card key={data.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-green-400" />
                          {data.region}
                        </CardTitle>
                        <Mountain className="w-6 h-6 text-green-400" />
                      </div>
                      <CardDescription className="text-slate-400">{data.coordinates}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <Trees className="w-4 h-4 mr-2 text-green-400" />
                          <div>
                            <p className="text-slate-400">NDVI</p>
                            <p className="text-white font-medium">{data.ndvi}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Home className="w-4 h-4 mr-2 text-blue-400" />
                          <div>
                            <p className="text-slate-400">Land Cover</p>
                            <p className="text-white font-medium">{data.landCover}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Wheat className="w-4 h-4 mr-2 text-yellow-400" />
                          <div>
                            <p className="text-slate-400">Crop Health</p>
                            <p className="text-white font-medium">{data.cropHealth}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Factory className="w-4 h-4 mr-2 text-cyan-400" />
                          <div>
                            <p className="text-slate-400">Soil Moisture</p>
                            <p className="text-white font-medium">{data.soilMoisture}</p>
                          </div>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Source: {data.satellite}</span>
                          <span className="text-green-400">{data.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleDataPreview(`${data.region} Land Data`)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          onClick={() => handleDataDownload(`${data.region} Dataset`)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dataProducts.map((product, index) => (
                  <Card key={product.name} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-white">{product.name}</CardTitle>
                      <CardDescription className="text-slate-400">{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Resolution</p>
                          <p className="text-white">{product.resolution}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Frequency</p>
                          <p className="text-white">{product.frequency}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Format</p>
                          <p className="text-white">{product.format}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Size</p>
                          <p className="text-white">{product.size}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm mb-2">Parameters</p>
                        <div className="flex flex-wrap gap-2">
                          {product.parameters.map((param) => (
                            <span
                              key={param}
                              className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs border border-green-500/30"
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          size="sm"
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          onClick={() => handleDataPreview(product.name)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          onClick={() => handleDataDownload(product.name)}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analysis" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Crop Yield Prediction</CardTitle>
                    <CardDescription className="text-slate-400">
                      Predict agricultural yields using satellite data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDataPreview("Yield Prediction Tool")}
                    >
                      Launch Prediction Tool
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Deforestation Monitoring</CardTitle>
                    <CardDescription className="text-slate-400">
                      Track forest cover changes and deforestation patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleDataPreview("Deforestation Monitor")}
                    >
                      Monitor Forests
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Urban Growth Analysis</CardTitle>
                    <CardDescription className="text-slate-400">
                      Analyze urban expansion and land use changes
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDataPreview("Urban Growth Analysis")}
                    >
                      Analyze Urban Growth
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Drought Assessment</CardTitle>
                    <CardDescription className="text-slate-400">
                      Monitor drought conditions and water stress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-yellow-600 hover:bg-yellow-700"
                      onClick={() => handleDataPreview("Drought Assessment")}
                    >
                      Assess Drought
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
