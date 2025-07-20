"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import {
  Satellite,
  Database,
  BarChart3,
  Globe,
  Zap,
  TrendingUp,
  Activity,
  Settings,
  Maximize2,
  Minimize2,
  RefreshCw,
  Download,
  Share,
  Bookmark,
  Eye,
  EyeOff,
} from "lucide-react"

interface InteractiveDashboardProps {
  className?: string
}

export function InteractiveDashboard({ className }: InteractiveDashboardProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [refreshRate, setRefreshRate] = useState([5])
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>(["satellites", "data", "queries", "uptime"])
  const [draggedItem, setDraggedItem] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [liveStats, setLiveStats] = useState({
    activeSatellites: 47,
    dataPoints: 2.3,
    queriesProcessed: 1247,
    uptime: 99.9,
    networkLatency: 12,
    processingLoad: 68,
    storageUsed: 78.5,
    activeUsers: 156,
  })

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats((prev) => ({
        activeSatellites: Math.max(40, prev.activeSatellites + Math.floor(Math.random() * 3) - 1),
        dataPoints: Math.max(2.0, prev.dataPoints + (Math.random() * 0.1 - 0.05)),
        queriesProcessed: prev.queriesProcessed + Math.floor(Math.random() * 8),
        uptime: Math.max(99.0, Math.min(100, prev.uptime + (Math.random() * 0.2 - 0.1))),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + Math.floor(Math.random() * 6) - 3)),
        processingLoad: Math.max(20, Math.min(95, prev.processingLoad + Math.floor(Math.random() * 10) - 5)),
        storageUsed: Math.max(50, Math.min(90, prev.storageUsed + (Math.random() * 2 - 1))),
        activeUsers: Math.max(100, prev.activeUsers + Math.floor(Math.random() * 20) - 10),
      }))
    }, refreshRate[0] * 1000)

    return () => clearInterval(interval)
  }, [refreshRate])

  const metricCards = [
    {
      id: "satellites",
      title: "Active Satellites",
      value: liveStats.activeSatellites,
      change: "+2",
      icon: Satellite,
      color: "text-blue-400",
      bgColor: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
    },
    {
      id: "data",
      title: "Data Points (M)",
      value: liveStats.dataPoints.toFixed(1),
      change: "+12%",
      icon: Database,
      color: "text-purple-400",
      bgColor: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      id: "queries",
      title: "Queries Today",
      value: liveStats.queriesProcessed.toLocaleString(),
      change: "+8%",
      icon: Activity,
      color: "text-green-400",
      bgColor: "from-green-500/20 to-emerald-500/20",
      borderColor: "border-green-500/30",
    },
    {
      id: "uptime",
      title: "System Uptime",
      value: `${liveStats.uptime.toFixed(1)}%`,
      change: "Excellent",
      icon: TrendingUp,
      color: "text-cyan-400",
      bgColor: "from-cyan-500/20 to-blue-500/20",
      borderColor: "border-cyan-500/30",
    },
  ]

  const advancedMetrics = [
    {
      id: "latency",
      title: "Network Latency",
      value: `${liveStats.networkLatency}ms`,
      icon: Zap,
      color:
        liveStats.networkLatency < 20
          ? "text-green-400"
          : liveStats.networkLatency < 35
            ? "text-yellow-400"
            : "text-red-400",
    },
    {
      id: "load",
      title: "Processing Load",
      value: `${liveStats.processingLoad}%`,
      icon: BarChart3,
      color:
        liveStats.processingLoad < 70
          ? "text-green-400"
          : liveStats.processingLoad < 85
            ? "text-yellow-400"
            : "text-red-400",
    },
    {
      id: "storage",
      title: "Storage Used",
      value: `${liveStats.storageUsed.toFixed(1)}%`,
      icon: Database,
      color: liveStats.storageUsed < 80 ? "text-green-400" : "text-yellow-400",
    },
    {
      id: "users",
      title: "Active Users",
      value: liveStats.activeUsers,
      icon: Globe,
      color: "text-blue-400",
    },
  ]

  const handleCardDragStart = (cardId: string) => {
    setDraggedItem(cardId)
  }

  const handleCardDragEnd = () => {
    setDraggedItem(null)
  }

  const toggleMetric = (metricId: string) => {
    setSelectedMetrics((prev) => (prev.includes(metricId) ? prev.filter((id) => id !== metricId) : [...prev, metricId]))
  }

  const exportData = () => {
    const data = {
      timestamp: new Date().toISOString(),
      metrics: liveStats,
      refreshRate: refreshRate[0],
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `astrolynx-metrics-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <TooltipProvider>
      <div
        ref={containerRef}
        className={`space-y-6 ${isFullscreen ? "fixed inset-0 z-50 bg-slate-950 p-6 overflow-auto" : ""} ${className}`}
      >
        {/* Interactive Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between bg-slate-900/50 backdrop-blur-md rounded-lg p-4 border border-slate-700"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-slate-300">Refresh Rate:</span>
              <div className="w-32">
                <Slider
                  value={refreshRate}
                  onValueChange={setRefreshRate}
                  max={30}
                  min={1}
                  step={1}
                  className="cursor-pointer"
                />
              </div>
              <span className="text-sm text-slate-400">{refreshRate[0]}s</span>
            </div>

            <div className="flex items-center space-x-2">
              <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} id="advanced-mode" />
              <label htmlFor="advanced-mode" className="text-sm text-slate-300 cursor-pointer">
                Advanced Metrics
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" onClick={exportData} className="text-slate-400 hover:text-white">
                  <Download className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Export Data</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                  <Share className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Share Dashboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="text-slate-400 hover:text-white"
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent>{isFullscreen ? "Exit Fullscreen" : "Fullscreen"}</TooltipContent>
            </Tooltip>
          </div>
        </motion.div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {metricCards
              .filter((card) => selectedMetrics.includes(card.id))
              .map((card, index) => (
                <ContextMenu key={card.id}>
                  <ContextMenuTrigger>
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{
                        scale: 1.05,
                        y: -5,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      whileTap={{ scale: 0.95 }}
                      drag
                      dragConstraints={containerRef}
                      onDragStart={() => handleCardDragStart(card.id)}
                      onDragEnd={handleCardDragEnd}
                      onHoverStart={() => setHoveredCard(card.id)}
                      onHoverEnd={() => setHoveredCard(null)}
                      className="cursor-grab active:cursor-grabbing"
                    >
                      <Card
                        className={`bg-gradient-to-br ${card.bgColor} border ${card.borderColor} backdrop-blur-md transition-all duration-300 ${
                          hoveredCard === card.id ? "shadow-lg shadow-blue-500/20" : ""
                        }`}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium text-slate-300">{card.title}</CardTitle>
                          <motion.div
                            animate={{
                              rotate: hoveredCard === card.id ? 360 : 0,
                              scale: hoveredCard === card.id ? 1.2 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            <card.icon className={`h-4 w-4 ${card.color}`} />
                          </motion.div>
                        </CardHeader>
                        <CardContent>
                          <motion.div
                            className="text-2xl font-bold text-white"
                            key={card.value}
                            initial={{ scale: 1.2, color: "#60a5fa" }}
                            animate={{ scale: 1, color: "#ffffff" }}
                            transition={{ duration: 0.3 }}
                          >
                            {card.value}
                          </motion.div>
                          <p className="text-xs text-green-400 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            {card.change}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </ContextMenuTrigger>
                  <ContextMenuContent className="bg-slate-800 border-slate-700">
                    <ContextMenuItem onClick={() => toggleMetric(card.id)}>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Metric
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Bookmark className="w-4 h-4 mr-2" />
                      Bookmark
                    </ContextMenuItem>
                    <ContextMenuItem>
                      <Download className="w-4 h-4 mr-2" />
                      Export Data
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
          </AnimatePresence>
        </div>

        {/* Advanced Metrics */}
        <AnimatePresence>
          {showAdvanced && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-blue-400" />
                    Advanced System Metrics
                  </CardTitle>
                  <CardDescription className="text-slate-400">Real-time system performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {advancedMetrics.map((metric, index) => (
                      <motion.div
                        key={metric.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer"
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center space-x-3">
                          <metric.icon className={`w-5 h-5 ${metric.color}`} />
                          <div>
                            <p className="text-sm text-slate-300">{metric.title}</p>
                            <p className={`text-lg font-semibold ${metric.color}`}>{metric.value}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metric Visibility Controls */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Eye className="w-5 h-5 mr-2 text-green-400" />
              Customize Dashboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {metricCards.map((card) => (
                <Button
                  key={card.id}
                  variant={selectedMetrics.includes(card.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleMetric(card.id)}
                  className={`${
                    selectedMetrics.includes(card.id)
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                  }`}
                >
                  <card.icon className="w-4 h-4 mr-2" />
                  {card.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  )
}
