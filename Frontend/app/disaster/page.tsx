"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { AlertTriangle, Zap, Eye, Download, MapPin, Activity, Waves, Wind, Flame } from "lucide-react"

export default function DisasterModePage() {
  const { addNotification } = useApp()
  const [activeTab, setActiveTab] = useState("monitoring")
  const [alertLevel, setAlertLevel] = useState("high")

  const activeDisasters = [
    {
      id: 1,
      type: "Cyclone",
      name: "Cyclone Biparjoy",
      location: "Arabian Sea",
      severity: "High",
      coordinates: "19.5°N, 68.2°E",
      windSpeed: "185 km/h",
      status: "Active",
      lastUpdate: "15 minutes ago",
      icon: Wind,
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "Flood",
      name: "Assam Floods",
      location: "Brahmaputra Valley",
      severity: "Critical",
      coordinates: "26.2°N, 92.9°E",
      waterLevel: "Above danger mark",
      status: "Ongoing",
      lastUpdate: "8 minutes ago",
      icon: Waves,
      color: "text-cyan-400",
    },
    {
      id: 3,
      type: "Wildfire",
      name: "Uttarakhand Forest Fire",
      location: "Kumaon Hills",
      severity: "Medium",
      coordinates: "29.6°N, 79.3°E",
      area: "1,200 hectares",
      status: "Contained",
      lastUpdate: "32 minutes ago",
      icon: Flame,
      color: "text-orange-400",
    },
  ]

  const monitoringTools = [
    {
      name: "Real-time Satellite Tracking",
      description: "Live satellite imagery and data feeds",
      status: "Active",
      satellites: ["INSAT-3D", "RESOURCESAT-2A", "CARTOSAT-3"],
    },
    {
      name: "Weather Radar Network",
      description: "Doppler radar for storm tracking",
      status: "Operational",
      coverage: "Pan-India",
    },
    {
      name: "Early Warning System",
      description: "Automated disaster alerts and notifications",
      status: "Enabled",
      alerts: "247 active alerts",
    },
    {
      name: "Emergency Response Coordination",
      description: "Multi-agency disaster response platform",
      status: "Standby",
      agencies: "NDRF, IMD, ISRO",
    },
  ]

  const handleActivateEmergencyMode = () => {
    addNotification({
      id: Date.now().toString(),
      type: "warning",
      message: "Emergency response mode activated - All resources prioritized",
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleViewDisaster = (disasterName: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Opening detailed view for ${disasterName}`,
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleDownloadReport = (disasterName: string) => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: `Generating disaster report for ${disasterName}`,
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
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                  Disaster Monitoring Center
                </h1>
                <p className="text-slate-400 text-lg">Emergency satellite monitoring and disaster response</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge
                className={`${alertLevel === "high" ? "bg-red-500/20 text-red-400 border-red-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}
              >
                Alert Level: {alertLevel.toUpperCase()}
              </Badge>
              <Button onClick={handleActivateEmergencyMode} className="bg-red-600 hover:bg-red-700">
                <Zap className="w-4 h-4 mr-2" />
                Emergency Mode
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Alert Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-red-900/20 border-red-500/50 backdrop-blur-md">
            <CardContent className="p-4">
              <div className="flex items-center space-x-4">
                <AlertTriangle className="w-6 h-6 text-red-400 animate-pulse" />
                <div>
                  <p className="text-red-300 font-medium">DISASTER MODE ACTIVE</p>
                  <p className="text-red-400 text-sm">All satellite resources prioritized for emergency monitoring</p>
                </div>
                <div className="ml-auto">
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30">3 Active Disasters</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-800/50">
              <TabsTrigger value="monitoring" className="data-[state=active]:bg-red-600">
                Active Monitoring
              </TabsTrigger>
              <TabsTrigger value="disasters" className="data-[state=active]:bg-red-600">
                Current Disasters
              </TabsTrigger>
              <TabsTrigger value="response" className="data-[state=active]:bg-red-600">
                Response Tools
              </TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {monitoringTools.map((tool, index) => (
                  <Card key={tool.name} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">{tool.name}</CardTitle>
                        <Badge
                          className={`${tool.status === "Active" || tool.status === "Operational" || tool.status === "Enabled" ? "bg-green-500/20 text-green-400 border-green-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}
                        >
                          {tool.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-400">{tool.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {tool.satellites && (
                        <div>
                          <p className="text-slate-400 text-sm mb-2">Active Satellites</p>
                          <div className="flex flex-wrap gap-2">
                            {tool.satellites.map((satellite) => (
                              <Badge key={satellite} variant="outline" className="border-blue-500/30 text-blue-300">
                                {satellite}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {tool.coverage && (
                        <div>
                          <p className="text-slate-400 text-sm">Coverage</p>
                          <p className="text-white">{tool.coverage}</p>
                        </div>
                      )}
                      {tool.alerts && (
                        <div>
                          <p className="text-slate-400 text-sm">Status</p>
                          <p className="text-orange-400">{tool.alerts}</p>
                        </div>
                      )}
                      {tool.agencies && (
                        <div>
                          <p className="text-slate-400 text-sm">Connected Agencies</p>
                          <p className="text-white">{tool.agencies}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="disasters" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {activeDisasters.map((disaster) => (
                  <Card key={disaster.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white flex items-center">
                          <disaster.icon className={`w-5 h-5 mr-2 ${disaster.color}`} />
                          {disaster.name}
                        </CardTitle>
                        <Badge
                          className={`${disaster.severity === "Critical" ? "bg-red-500/20 text-red-400 border-red-500/30" : disaster.severity === "High" ? "bg-orange-500/20 text-orange-400 border-orange-500/30" : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"}`}
                        >
                          {disaster.severity}
                        </Badge>
                      </div>
                      <CardDescription className="text-slate-400">{disaster.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 gap-3 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Type</span>
                          <span className="text-white">{disaster.type}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Status</span>
                          <span className="text-white">{disaster.status}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Coordinates</span>
                          <span className="text-white font-mono text-xs">{disaster.coordinates}</span>
                        </div>
                        {disaster.windSpeed && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Wind Speed</span>
                            <span className="text-white">{disaster.windSpeed}</span>
                          </div>
                        )}
                        {disaster.waterLevel && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Water Level</span>
                            <span className="text-white">{disaster.waterLevel}</span>
                          </div>
                        )}
                        {disaster.area && (
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Affected Area</span>
                            <span className="text-white">{disaster.area}</span>
                          </div>
                        )}
                      </div>
                      <div className="pt-2 border-t border-slate-700">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Last Update</span>
                          <span className="text-green-400">{disaster.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-red-600 hover:bg-red-700"
                          onClick={() => handleViewDisaster(disaster.name)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Monitor
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                          onClick={() => handleDownloadReport(disaster.name)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="response" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Emergency Protocols</CardTitle>
                    <CardDescription className="text-slate-400">Activate emergency response procedures</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Activate NDRF Response
                    </Button>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700">
                      <Activity className="w-4 h-4 mr-2" />
                      Issue Public Alert
                    </Button>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <MapPin className="w-4 h-4 mr-2" />
                      Coordinate Evacuation
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Resource Allocation</CardTitle>
                    <CardDescription className="text-slate-400">
                      Manage emergency resources and personnel
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">NDRF Teams</span>
                      <span className="text-green-400 font-mono">12 Active</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Rescue Helicopters</span>
                      <span className="text-blue-400 font-mono">8 Deployed</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Relief Centers</span>
                      <span className="text-purple-400 font-mono">24 Operational</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300">Medical Teams</span>
                      <span className="text-orange-400 font-mono">16 Standby</span>
                    </div>
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
