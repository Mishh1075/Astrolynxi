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
import { Wind, Eye, Download, MapPin, Search, Filter, RefreshCw, Cloud, Zap, Droplets, Sun } from "lucide-react"

export default function AtmosphereDataPage() {
  const { addNotification } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")
  const [activeTab, setActiveTab] = useState("current")

  const atmosphericData = [
    {
      id: 1,
      region: "Northern India",
      aerosols: "0.35 AOD",
      ozone: "285 DU",
      waterVapor: "2.8 g/cm²",
      co2: "415 ppm",
      satellite: "INSAT-3D",
      lastUpdate: "10 minutes ago",
      coordinates: "28.0°N, 77.0°E",
    },
    {
      id: 2,
      region: "Western Ghats",
      aerosols: "0.22 AOD",
      ozone: "268 DU",
      waterVapor: "3.5 g/cm²",
      co2: "408 ppm",
      satellite: "RESOURCESAT-2A",
      lastUpdate: "15 minutes ago",
      coordinates: "15.5°N, 74.0°E",
    },
    {
      id: 3,
      region: "Eastern Coast",
      aerosols: "0.41 AOD",
      ozone: "275 DU",
      waterVapor: "4.2 g/cm²",
      co2: "412 ppm",
      satellite: "OCEANSAT-2",
      lastUpdate: "8 minutes ago",
      coordinates: "13.0°N, 80.0°E",
    },
  ]

  const dataProducts = [
    {
      name: "Aerosol Optical Depth",
      description: "Atmospheric aerosol concentration and distribution",
      resolution: "1km x 1km",
      frequency: "Daily",
      format: "HDF5, NetCDF",
      size: "1.8 GB",
      parameters: ["AOD 550nm", "Angstrom Exponent", "Fine Mode Fraction"],
    },
    {
      name: "Total Column Ozone",
      description: "Stratospheric and tropospheric ozone measurements",
      resolution: "50km x 50km",
      frequency: "Daily",
      format: "NetCDF, GRIB",
      size: "950 MB",
      parameters: ["Total Ozone", "Ozone Profile", "UV Index"],
    },
    {
      name: "Water Vapor Content",
      description: "Atmospheric water vapor and humidity profiles",
      resolution: "25km x 25km",
      frequency: "6-hourly",
      format: "NetCDF, HDF5",
      size: "1.4 GB",
      parameters: ["Total Precipitable Water", "Relative Humidity", "Specific Humidity"],
    },
    {
      name: "Greenhouse Gases",
      description: "CO2, CH4, and other greenhouse gas concentrations",
      resolution: "100km x 100km",
      frequency: "Monthly",
      format: "NetCDF, CSV",
      size: "650 MB",
      parameters: ["CO2 Column", "CH4 Column", "N2O Column"],
    },
  ]

  const handleSearch = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Searching atmospheric data for: ${searchQuery}`,
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
      message: "Refreshing atmospheric data...",
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
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                <Wind className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-300 bg-clip-text text-transparent">
                  Atmospheric Data Portal
                </h1>
                <p className="text-slate-400 text-lg">Atmospheric composition and air quality monitoring</p>
              </div>
            </div>
            <Button onClick={refreshData} className="bg-orange-600 hover:bg-orange-700">
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
              placeholder="Search atmospheric data by location, parameter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-orange-500 text-white"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="north">Northern India</SelectItem>
              <SelectItem value="south">Southern India</SelectItem>
              <SelectItem value="east">Eastern India</SelectItem>
              <SelectItem value="west">Western India</SelectItem>
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
          <Button onClick={handleSearch} className="bg-orange-600 hover:bg-orange-700">
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
              <TabsTrigger value="current" className="data-[state=active]:bg-orange-600">
                Current Conditions
              </TabsTrigger>
              <TabsTrigger value="products" className="data-[state=active]:bg-orange-600">
                Data Products
              </TabsTrigger>
              <TabsTrigger value="analysis" className="data-[state=active]:bg-orange-600">
                Analysis Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {atmosphericData.map((data) => (
                  <Card key={data.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <MapPin className="w-4 h-4 mr-2 text-orange-400" />
                          {data.region}
                        </CardTitle>
                        <Wind className="w-6 h-6 text-orange-400" />
                      </div>
                      <CardDescription className="text-slate-400">{data.coordinates}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="flex items-center">
                          <Cloud className="w-4 h-4 mr-2 text-gray-400" />
                          <div>
                            <p className="text-slate-400">Aerosols</p>
                            <p className="text-white font-medium">{data.aerosols}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Sun className="w-4 h-4 mr-2 text-blue-400" />
                          <div>
                            <p className="text-slate-400">Ozone</p>
                            <p className="text-white font-medium">{data.ozone}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Droplets className="w-4 h-4 mr-2 text-cyan-400" />
                          <div>
                            <p className="text-slate-400">Water Vapor</p>
                            <p className="text-white font-medium">{data.waterVapor}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Zap className="w-4 h-4 mr-2 text-green-400" />
                          <div>
                            <p className="text-slate-400">CO₂</p>
                            <p className="text-white font-medium">{data.co2}</p>
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
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
                          onClick={() => handleDataPreview(`${data.region} Atmospheric Data`)}
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
                              className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded text-xs border border-orange-500/30"
                            >
                              {param}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button
                          size="sm"
                          className="flex-1 bg-orange-600 hover:bg-orange-700"
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
                    <CardTitle className="text-white">Air Quality Index</CardTitle>
                    <CardDescription className="text-slate-400">
                      Calculate AQI from atmospheric parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => handleDataPreview("AQI Calculator")}
                    >
                      Launch AQI Tool
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Pollution Tracking</CardTitle>
                    <CardDescription className="text-slate-400">
                      Monitor pollution sources and dispersion patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700"
                      onClick={() => handleDataPreview("Pollution Tracker")}
                    >
                      Track Pollution
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Climate Analysis</CardTitle>
                    <CardDescription className="text-slate-400">
                      Long-term atmospheric trends and climate indicators
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => handleDataPreview("Climate Analysis")}
                    >
                      Analyze Climate
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Forecast Models</CardTitle>
                    <CardDescription className="text-slate-400">
                      Atmospheric prediction and modeling tools
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleDataPreview("Forecast Models")}
                    >
                      Run Forecasts
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
