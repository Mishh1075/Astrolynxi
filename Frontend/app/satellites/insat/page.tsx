"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarField } from "@/components/star-field"
import { Satellite, Calendar, MapPin, Activity, Download, Eye } from "lucide-react"

export default function InsatPage() {
  const satellites = [
    {
      name: "INSAT-3D",
      status: "Active",
      launchDate: "July 26, 2013",
      orbit: "Geostationary",
      position: "82°E",
      sensors: ["VHRR", "CCD", "DCS", "SEM"],
      applications: ["Weather Monitoring", "Disaster Management", "Communication"],
      dataAvailable: "Real-time",
      lastUpdate: "2 minutes ago",
    },
    {
      name: "INSAT-3DR",
      status: "Active",
      launchDate: "September 8, 2016",
      orbit: "Geostationary",
      position: "74°E",
      sensors: ["VHRR", "CCD", "DCS"],
      applications: ["Meteorology", "Search & Rescue", "Satellite Communication"],
      dataAvailable: "Real-time",
      lastUpdate: "5 minutes ago",
    },
    {
      name: "INSAT-3DS",
      status: "Active",
      launchDate: "February 17, 2023",
      orbit: "Geostationary",
      position: "83°E",
      sensors: ["VHRR", "CCD", "DCS", "SEM"],
      applications: ["Weather Forecasting", "Climate Monitoring", "Disaster Warning"],
      dataAvailable: "Real-time",
      lastUpdate: "1 minute ago",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <Satellite className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                INSAT Series
              </h1>
              <p className="text-slate-400 text-lg">
                Indian National Satellite System for meteorological and communication services
              </p>
            </div>
          </div>
        </motion.div>

        {/* Overview Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Active Satellites</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Coverage Area</p>
                  <p className="text-2xl font-bold text-white">Global</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Data Updates</p>
                  <p className="text-2xl font-bold text-white">24/7</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Mission Status</p>
                  <p className="text-2xl font-bold text-green-400">Operational</p>
                </div>
                <Satellite className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Satellites Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {satellites.map((satellite, index) => (
            <Card
              key={satellite.name}
              className="bg-slate-900/50 border-slate-700 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center">
                    <Satellite className="w-5 h-5 mr-2 text-blue-400" />
                    {satellite.name}
                  </CardTitle>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">{satellite.status}</Badge>
                </div>
                <CardDescription className="text-slate-400">Launched: {satellite.launchDate}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-400">Orbit</p>
                    <p className="text-white">{satellite.orbit}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Position</p>
                    <p className="text-white">{satellite.position}</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Sensors</p>
                  <div className="flex flex-wrap gap-2">
                    {satellite.sensors.map((sensor) => (
                      <Badge key={sensor} variant="outline" className="border-blue-500/30 text-blue-300">
                        {sensor}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 text-sm mb-2">Applications</p>
                  <div className="space-y-1">
                    {satellite.applications.map((app) => (
                      <p key={app} className="text-sm text-slate-300">
                        • {app}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-slate-400">Data Status</p>
                    <p className="text-green-400">{satellite.dataAvailable}</p>
                  </div>
                  <div>
                    <p className="text-slate-400">Last Update</p>
                    <p className="text-white">{satellite.lastUpdate}</p>
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Data
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
