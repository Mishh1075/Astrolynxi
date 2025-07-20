"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StarField } from "@/components/star-field"
import { Satellite, Database, BarChart3, Globe, Zap, Clock, AlertCircle } from "lucide-react"
import { InteractiveDashboard } from "@/components/interactive-dashboard"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeSatellites: 47,
    dataPoints: 2.3,
    queriesProcessed: 1247,
    uptime: 99.9,
  })

  // Add real-time stats updates
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        activeSatellites: prev.activeSatellites + Math.floor(Math.random() * 3) - 1,
        dataPoints: prev.dataPoints + (Math.random() * 0.1 - 0.05),
        queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 5),
        uptime: Math.max(99.0, prev.uptime + (Math.random() * 0.2 - 0.1)),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const recentActivities = [
    {
      id: 1,
      type: "data_update",
      message: "INSAT-3D weather data updated",
      time: "2 minutes ago",
      icon: Satellite,
      color: "text-blue-400",
    },
    {
      id: 2,
      type: "query",
      message: "Spatial analysis completed for Mumbai region",
      time: "5 minutes ago",
      icon: BarChart3,
      color: "text-green-400",
    },
    {
      id: 3,
      type: "alert",
      message: "Cyclone monitoring activated for Bay of Bengal",
      time: "12 minutes ago",
      icon: AlertCircle,
      color: "text-orange-400",
    },
  ]

  const quickActions = [
    {
      title: "Start Chat Session",
      description: "Begin conversation with AstroLynx AI",
      icon: Zap,
      href: "/chat",
      color: "from-blue-600 to-cyan-600",
    },
    {
      title: "Browse Satellites",
      description: "Explore active satellite missions",
      icon: Satellite,
      href: "/satellites/insat",
      color: "from-purple-600 to-pink-600",
    },
    {
      title: "Access Data Portal",
      description: "View MOSDAC data repository",
      icon: Database,
      href: "/data/weather",
      color: "from-green-600 to-emerald-600",
    },
    {
      title: "Analytics Dashboard",
      description: "Analyze satellite data trends",
      icon: BarChart3,
      href: "/analytics/timeseries",
      color: "from-orange-600 to-red-600",
    },
  ]

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
              Welcome to AstroLynx
            </h1>
            <p className="text-slate-400 text-lg">Your geo-aware satellite AI assistant for ISRO data navigation</p>
          </div>
        </motion.div>

        {/* Interactive Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <InteractiveDashboard />
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <motion.div
                key={action.title}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md hover:bg-slate-800/50 transition-all duration-300 cursor-pointer group h-full">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-white group-hover:text-blue-300 transition-colors">
                      {action.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">{action.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      asChild
                      className="w-full bg-transparent border border-slate-600 hover:bg-slate-700 text-white"
                    >
                      <a href={action.href}>Get Started</a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <motion.div
                  key={activity.id}
                  className="flex items-start space-x-3 p-2 rounded-lg hover:bg-slate-800/50 cursor-pointer transition-colors"
                  whileHover={{ x: 5 }}
                  onClick={() => console.log(`Clicked activity: ${activity.message}`)}
                >
                  <div className={`p-2 rounded-lg bg-slate-800 ${activity.color}`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-green-400" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">MOSDAC Portal</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Online</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">AI Assistant</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Data Processing</span>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Running</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Satellite Tracking</span>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Operational</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
