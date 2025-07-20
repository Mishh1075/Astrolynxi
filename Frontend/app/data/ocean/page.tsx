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
import { Waves, Thermometer, Wind, Eye, Download, MapPin, Search, Filter, RefreshCw, TrendingUp } from "lucide-react"

export default function OceanDataPage() {
  const { addNotification } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")
  const [activeTab, setActiveTab] = useState("current")

  const oceanData = [
    {
      id: 1,
      region: "Arabian Sea",
      temperature: "28.5°C",
      salinity: "36.2 PSU",
      waveHeight: "2.1m",
      windSpeed: "18 km/h",
      chlorophyll: "0.8 mg/m³",
      satellite: "OCEANSAT-2",
      lastUpdate: "15 minutes ago",
      coordinates: "15.0°N, 68.0°E",
    },
    {
      id: 2,
      region: "Bay of Bengal",
      temperature: "29.8°C",
      salinity: "33.5 PSU",
      waveHeight: "1.8m",
      windSpeed: "22 km/h",
      chlorophyll: "1.2 mg/m³",
      satellite: "SCATSAT-1",
      lastUpdate: "8 minutes ago",
      coordinates: "18.0°N, 88.0°E",
    },
    {
      id: 3,
      region: "Indian Ocean",
      temperature: "27.2°C",
      salinity: "35.8 PSU",
      waveHeight: "2.5m",
      windSpeed: "25 km/h",
      chlorophyll: "0.6 mg/m³",
      satellite: "OCEANSAT-2",
      lastUpdate: "12 minutes ago",
      coordinates: "10.0°S, 75.0°E",
    },
  ]

  const dataProducts = [
    {
      name: "Sea Surface Temperature",
      description: "High-resolution SST data from microwave radiometer",
      resolution: "1km x 1km",
      frequency: "Daily",
      format: "NetCDF, HDF5",
      size: "1.5 GB",
      parameters: ["Temperature", "Quality Flags", "Error Estimates"],
    },
    {
      name: "Ocean Color Data",
      description: "Chlorophyll concentration and water quality parameters",
      resolution: "1km x 1km",
      frequency: "Daily",
      format: "HDF5, GeoTIFF",
      size: "2.1 GB",
      parameters: ["Chlorophyll-a", "Suspended Sediments", "CDOM"],
    },
    {
      name: "Altimetry Data",
      description: "Sea surface height and wave measurements",
      resolution: "Along-track",
      frequency: "10-day repeat",
      format: "NetCDF, ASCII",
      size: "800 MB",
      parameters: ["Sea Level", "Wave Height", "Wind Speed"],
    },
    {
      name: "Scatterometer Winds",
      description: "Ocean surface wind speed and direction",
      resolution: "25km x 25km",
      frequency: "Twice daily",
      format: "NetCDF, GRIB",
      size: "1.2 GB",
      parameters: ["Wind Speed", "Wind Direction", "Quality Index"],
    },
  ]

  const handleSearch = () => {
    addNotification({
      type: "info",
      message: `Searching ocean data for: ${searchQuery}`,
      read: false,
    })
  }

  const handleDataDownload = (productName: string) => {
    addNotification({
      type: "info",
      message: `Downloading ${productName} data`,
      read: false,
    })
    setTimeout(() => {
      addNotification({
        type: "success",
        message: `${productName} download completed`,
        read: false,
      })
    }, 3000)
  }

  const handleDataPreview = (productName: string) => {
    addNotification({
      type: "info",
      message: `Opening preview for ${productName}`,
      read: false,
    })
  }

  const refreshData = () => {
    addNotification({
      type: "info",
      message: "Refreshing ocean data...",
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <Waves className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                  Ocean Data Portal
                </h1>
                <p className="text-slate-400 text-lg">Marine and oceanographic data from ISRO satellites</p>
              </div>
            </div>
            <Button onClick={refreshData} className="bg-blue-600 hover:bg-blue-700">
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
              placeholder="Search ocean data by location, parameter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
              <SelectItem value="bay-of-bengal">Bay of Bengal</SelectItem>
              <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
              <SelectItem value="coastal">Coastal Waters</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700">
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
              <TabsTrigger value="current" className="data-[state=active]:bg-blue-600">
                Current Conditions
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-blue-600">
                Data Products
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-600">
                Analysis Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {oceanData.map((data) => (
                  <Card key={data.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                          {data.region}
                        </CardTitle>
                        <Waves className="w-6 h-6 text-cyan-400" />
                      </div>
                      <CardDescription className="text-slate-400">{data.coordinates}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <Thermometer className="w-4 h-4 mr-2 text-red-400" />
                          <div>
                            <p className="text-slate-400">Temperature</p>
                            <p className="text-white font-medium">{data.temperature}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Waves className="w-4 h-4 mr-2 text-blue-400" />
                          <div>
                            <p className="text-slate-400">Wave Height</p>
                            <p className="text-white font-medium">{data.waveHeight}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Wind className="w-4 h-4 mr-2 text-green-400" />
                          <div>
                            <p className="text-slate-400">Wind Speed</p>
                            <p className="text-white font-medium">{data.windSpeed}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <TrendingUp className="w-4 h-4 mr-2 text-purple-400" />
                          <div>
                            <p className="text-slate-400">Salinity</p>
                            <p className="text-white font-medium">{data.salinity}</p>
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
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => handleDataPreview(`${data.region} Ocean Data`)}
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
                              className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs border border-blue-500/30"
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          size="sm"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
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
                    <CardTitle className="text-white">Time Series Analysis</CardTitle>
                    <CardDescription className="text-slate-400">
                      Analyze temporal variations in ocean parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleDataPreview("Time Series Tool")}
                    >
                      Launch Analysis Tool
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Spatial Correlation</CardTitle>
                    <CardDescription className="text-slate-400">
                      Compare ocean conditions across different regions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDataPreview("Spatial Analysis Tool")}
                    >
                      Start Comparison
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Anomaly Detection</CardTitle>
                    <CardDescription className="text-slate-400">
                      Identify unusual patterns in ocean data
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleDataPreview("Anomaly Detection")}
                    >
                      Detect Anomalies
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Custom Reports</CardTitle>
                    <CardDescription className="text-slate-400">Generate customized ocean data reports</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleDataPreview("Report Generator")}
                    >
                      Create Report
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
