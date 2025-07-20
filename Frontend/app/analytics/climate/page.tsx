"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarField } from "@/components/star-field"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useApp } from "@/components/app-provider"
import {
  Wind,
  TrendingUp,
  Calendar,
  Download,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Thermometer,
  CloudRain,
} from "lucide-react"

export default function ClimatePage() {
  const { addNotification } = useApp()
  const [selectedParameter, setSelectedParameter] = useState("temperature")
  const [selectedRegion, setSelectedRegion] = useState("india")
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock climate trend data
  const temperatureTrends = [
    { year: "2018", value: 26.2, anomaly: 0.8 },
    { year: "2019", value: 26.8, anomaly: 1.4 },
    { year: "2020", value: 25.9, anomaly: 0.5 },
    { year: "2021", value: 27.1, anomaly: 1.7 },
    { year: "2022", value: 27.3, anomaly: 1.9 },
    { year: "2023", value: 27.8, anomaly: 2.4 },
  ]

  const precipitationTrends = [
    { year: "2018", value: 1150, anomaly: -50 },
    { year: "2019", value: 980, anomaly: -220 },
    { year: "2020", value: 1320, anomaly: 120 },
    { year: "2021", value: 1080, anomaly: -120 },
    { year: "2022", value: 1250, anomaly: 50 },
    { year: "2023", value: 1180, anomaly: -20 },
  ]

  const extremeEvents = [
    { year: "2018", heatwaves: 12, droughts: 3, floods: 8 },
    { year: "2019", heatwaves: 18, droughts: 5, floods: 6 },
    { year: "2020", heatwaves: 15, droughts: 2, floods: 12 },
    { year: "2021", heatwaves: 22, droughts: 4, floods: 9 },
    { year: "2022", heatwaves: 25, droughts: 6, floods: 7 },
    { year: "2023", heatwaves: 28, droughts: 8, floods: 11 },
  ]

  const getCurrentData = () => {
    switch (selectedParameter) {
      case "temperature":
        return temperatureTrends
      case "precipitation":
        return precipitationTrends
      case "extremes":
        return extremeEvents
      default:
        return temperatureTrends
    }
  }

  const getChartConfig = () => {
    switch (selectedParameter) {
      case "temperature":
        return {
          value: { label: "Temperature (°C)", color: "hsl(var(--chart-1))" },
          anomaly: { label: "Anomaly (°C)", color: "hsl(var(--chart-2))" },
        }
      case "precipitation":
        return {
          value: { label: "Precipitation (mm)", color: "hsl(var(--chart-3))" },
          anomaly: { label: "Anomaly (mm)", color: "hsl(var(--chart-4))" },
        }
      case "extremes":
        return {
          heatwaves: { label: "Heat Waves", color: "hsl(var(--chart-5))" },
          droughts: { label: "Droughts", color: "hsl(var(--chart-6))" },
          floods: { label: "Floods", color: "hsl(var(--chart-1))" },
        }
      default:
        return {}
    }
  }

  const handleDownload = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Downloading climate analysis report...",
      timestamp: new Date().toISOString(),
      read: false,
    })
    setTimeout(() => {
      addNotification({
        id: Date.now().toString(),
        type: "success",
        message: "Climate report downloaded successfully",
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
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center">
              <Wind className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-300 bg-clip-text text-transparent">
                Climate Trends Analysis
              </h1>
              <p className="text-slate-400 text-lg">Long-term climate patterns and extreme weather events</p>
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
          <Select value={selectedParameter} onValueChange={setSelectedParameter}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Parameter" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="temperature">Temperature Trends</SelectItem>
              <SelectItem value="precipitation">Precipitation Patterns</SelectItem>
              <SelectItem value="extremes">Extreme Events</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="india">All India</SelectItem>
              <SelectItem value="north">Northern India</SelectItem>
              <SelectItem value="south">Southern India</SelectItem>
              <SelectItem value="coastal">Coastal Regions</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
            >
              <RotateCcw className="w-4 h-4" />
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

        {/* Main Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-red-400" />
                {selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)} Analysis -{" "}
                {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
              </CardTitle>
              <CardDescription className="text-slate-400">Climate trends and variability analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={getChartConfig()} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedParameter === "extremes" ? (
                    <LineChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="year" stroke="rgba(148, 163, 184, 0.5)" />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="heatwaves"
                        stroke="var(--color-heatwaves)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-heatwaves)", strokeWidth: 2, r: 4 }}
                        name="Heat Waves"
                      />
                      <Line
                        type="monotone"
                        dataKey="droughts"
                        stroke="var(--color-droughts)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-droughts)", strokeWidth: 2, r: 4 }}
                        name="Droughts"
                      />
                      <Line
                        type="monotone"
                        dataKey="floods"
                        stroke="var(--color-floods)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-floods)", strokeWidth: 2, r: 4 }}
                        name="Floods"
                      />
                    </LineChart>
                  ) : (
                    <AreaChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="year" stroke="rgba(148, 163, 184, 0.5)" />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stackId="1"
                        stroke="var(--color-value)"
                        fill="var(--color-value)"
                        fillOpacity={0.3}
                        name="Observed Value"
                      />
                      <Line
                        type="monotone"
                        dataKey="anomaly"
                        stroke="var(--color-anomaly)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ fill: "var(--color-anomaly)", strokeWidth: 2, r: 3 }}
                        name="Anomaly"
                      />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Current Trend</p>
                  <p className="text-2xl font-bold text-red-400">+2.4°C</p>
                </div>
                <Thermometer className="w-8 h-8 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Annual Change</p>
                  <p className="text-2xl font-bold text-orange-400">+0.3°C</p>
                </div>
                <TrendingUp className="w-8 h-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Extreme Events</p>
                  <p className="text-2xl font-bold text-yellow-400">47</p>
                </div>
                <CloudRain className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Data Points</p>
                  <p className="text-2xl font-bold text-white">2,847</p>
                </div>
                <Calendar className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Analysis Tools */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Climate Projections</CardTitle>
              <CardDescription className="text-slate-400">Future climate scenario modeling</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-red-600 hover:bg-red-700">Launch Projections</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Anomaly Detection</CardTitle>
              <CardDescription className="text-slate-400">Identify unusual climate patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">Detect Anomalies</Button>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Export Report</CardTitle>
              <CardDescription className="text-slate-400">Generate comprehensive climate report</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleDownload} className="w-full bg-blue-600 hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
