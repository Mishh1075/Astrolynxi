"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { Globe, Activity, Download, Eye, Play, Pause, RotateCcw, Camera } from "lucide-react"

export default function CartosatPage() {
  const { addNotification } = useApp()
  const [selectedSatellite, setSelectedSatellite] = useState("cartosat-2")
  const [isTracking, setIsTracking] = useState(false)

  const satellites = [
    {
      id: "cartosat-2",
      name: "CARTOSAT-2",
      status: "Active",
      launchDate: "January 10, 2007",
      orbit: "Sun-synchronous",
      altitude: "635 km",
      sensors: ["PAN Camera"],
      applications: ["Urban Planning", "Infrastructure Monitoring", "Disaster Management", "Defense Mapping"],
      dataAvailable: "Real-time",
      lastUpdate: "2 minutes ago",
      coverage: "Global",
      resolution: "0.8m (Panchromatic)",
    },
    {
      id: "cartosat-3",
      name: "CARTOSAT-3",
      status: "Active",
      launchDate: "November 27, 2019",
      orbit: "Sun-synchronous",
      altitude: "509 km",
      sensors: ["PAN Camera", "MX Camera"],
      applications: ["High-Resolution Mapping", "Urban Development", "Infrastructure Planning", "Border Monitoring"],
      dataAvailable: "Real-time",
      lastUpdate: "1 minute ago",
      coverage: "Global",
      resolution: "0.25m (Panchromatic), 1m (Multispectral)",
    },
  ]

  const currentSatellite = satellites.find((sat) => sat.id === selectedSatellite) || satellites[0]

  const handleDataDownload = (satelliteName: string, dataType: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Downloading ${dataType} data from ${satelliteName}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
    setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        type: "success",
        message: `${dataType} data download completed`,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }, 3000)
  }

  const handleViewData = (satelliteName: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Opening data viewer for ${satelliteName}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const toggleTracking = () => {
    setIsTracking(!isTracking)
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Satellite tracking ${!isTracking ? "started" : "stopped"}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const dataProducts = [
    {
      name: "High-Resolution Imagery",
      description: "Ultra-high resolution panchromatic imagery for detailed mapping",
      resolution: "0.25m - 0.8m",
      swath: "9.6 km",
      format: "GeoTIFF, JPEG2000",
      size: "2.5 GB",
      updateFrequency: "Daily",
    },
    {
      name: "Multispectral Data",
      description: "Multi-band imagery for land use classification",
      resolution: "1m - 2.5m",
      swath: "9.6 km",
      format: "GeoTIFF, HDF5",
      size: "1.8 GB",
      updateFrequency: "Daily",
    },
    {
      name: "Stereo Imagery",
      description: "Stereoscopic imagery for 3D terrain modeling",
      resolution: "0.8m",
      swath: "9.6 km",
      format: "GeoTIFF, DEM",
      size: "3.2 GB",
      updateFrequency: "On-demand",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-300 bg-clip-text text-transparent">
                  CARTOSAT Series
                </h1>
                <p className="text-slate-400 text-lg">
                  High-resolution Earth imaging satellites for cartographic applications
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant={isTracking ? "destructive" : "default"}
                onClick={toggleTracking}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isTracking ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isTracking ? "Stop Tracking" : "Start Tracking"}
              </Button>
              <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                <RotateCcw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Satellite Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={selectedSatellite} onValueChange={setSelectedSatellite} className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-800/50">
              {satellites.map((satellite) => (
                <TabsTrigger
                  key={satellite.id}
                  value={satellite.id}
                  className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                >
                  {satellite.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {satellites.map((satellite) => (
              <TabsContent key={satellite.id} value={satellite.id} className="mt-6">
                {/* Satellite Overview */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                  <Card className="lg:col-span-2 bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <Camera className="w-5 h-5 mr-2 text-purple-400" />
                          {satellite.name} Overview
                        </CardTitle>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{satellite.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-slate-400 text-sm">Launch Date</p>
                          <p className="text-white font-medium">{satellite.launchDate}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Orbit Type</p>
                          <p className="text-white font-medium">{satellite.orbit}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Altitude</p>
                          <p className="text-white font-medium">{satellite.altitude}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 text-sm">Coverage</p>
                          <p className="text-white font-medium">{satellite.coverage}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-slate-400 text-sm mb-2">Sensors</p>
                        <div className="flex flex-wrap gap-2">
                          {satellite.sensors.map((sensor) => (
                            <Badge key={sensor} variant="outline" className="border-purple-500/30 text-purple-300">
                              {sensor}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-slate-400 text-sm mb-2">Applications</p>
                        <div className="grid grid-cols-2 gap-2">
                          {satellite.applications.map((app) => (
                            <p key={app} className="text-sm text-slate-300 flex items-center">
                              <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                              {app}
                            </p>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Activity className="w-5 h-5 mr-2 text-blue-400" />
                        Live Status
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Data Status</span>
                        <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                          {satellite.dataAvailable}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Last Update</span>
                        <span className="text-white text-sm">{satellite.lastUpdate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Resolution</span>
                        <span className="text-white text-sm">{satellite.resolution}</span>
                      </div>
                      <div className="pt-4 space-y-2">
                        <Button
                          size="sm"
                          className="w-full bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleViewData(satellite.name)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Live Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          onClick={() => handleDataDownload(satellite.name, "Latest Imagery")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Data Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Available Data Products</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {dataProducts.map((product, index) => (
              <Card key={product.name} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">{product.name}</CardTitle>
                  <CardDescription className="text-slate-400">{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-slate-400">Resolution</p>
                      <p className="text-white">{product.resolution}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Swath</p>
                      <p className="text-white">{product.swath}</p>
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
                    <p className="text-slate-400 text-sm">Update Frequency</p>
                    <p className="text-purple-400 font-medium">{product.updateFrequency}</p>
                  </div>
                  <div className="flex space-x-2 pt-4">
                    <Button
                      size="sm"
                      className="flex-1 bg-purple-600 hover:bg-purple-700"
                      onClick={() => handleViewData(product.name)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                      onClick={() => handleDataDownload(currentSatellite.name, product.name)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
