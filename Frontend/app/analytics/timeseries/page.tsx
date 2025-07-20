"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarField } from "@/components/star-field"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, BarChart3, Calendar, Download, Settings, Play, Pause, RotateCcw } from "lucide-react"

export default function TimeSeriesPage() {
  const [selectedParameter, setSelectedParameter] = useState("temperature")
  const [selectedRegion, setSelectedRegion] = useState("mumbai")
  const [isPlaying, setIsPlaying] = useState(false)

  // Mock time series data
  const temperatureData = [
    { time: "00:00", value: 25.2, forecast: 25.5 },
    { time: "04:00", value: 23.8, forecast: 24.1 },
    { time: "08:00", value: 27.5, forecast: 27.8 },
    { time: "12:00", value: 32.1, forecast: 32.4 },
    { time: "16:00", value: 34.6, forecast: 34.9 },
    { time: "20:00", value: 29.3, forecast: 29.6 },
  ]

  const precipitationData = [
    { time: "Jan", value: 12.5, average: 15.2 },
    { time: "Feb", value: 8.3, average: 12.1 },
    { time: "Mar", value: 15.7, average: 18.4 },
    { time: "Apr", value: 22.1, average: 25.6 },
    { time: "May", value: 45.8, average: 42.3 },
    { time: "Jun", value: 78.9, average: 85.2 },
  ]

  const windData = [
    { time: "Week 1", speed: 12.5, direction: 45 },
    { time: "Week 2", speed: 15.3, direction: 67 },
    { time: "Week 3", speed: 18.7, direction: 89 },
    { time: "Week 4", speed: 14.2, direction: 123 },
  ]

  const getCurrentData = () => {
    switch (selectedParameter) {
      case "temperature":
        return temperatureData
      case "precipitation":
        return precipitationData
      case "wind":
        return windData
      default:
        return temperatureData
    }
  }

  const getChartConfig = () => {
    switch (selectedParameter) {
      case "temperature":
        return {
          value: { label: "Temperature (°C)", color: "hsl(var(--chart-1))" },
          forecast: { label: "Forecast (°C)", color: "hsl(var(--chart-2))" },
        }
      case "precipitation":
        return {
          value: { label: "Precipitation (mm)", color: "hsl(var(--chart-3))" },
          average: { label: "Average (mm)", color: "hsl(var(--chart-4))" },
        }
      case "wind":
        return {
          speed: { label: "Wind Speed (km/h)", color: "hsl(var(--chart-5))" },
          direction: { label: "Direction (°)", color: "hsl(var(--chart-6))" },
        }
      default:
        return {}
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                Time Series Analytics
              </h1>
              <p className="text-slate-400 text-lg">Temporal analysis of satellite data parameters</p>
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
              <SelectItem value="temperature">Temperature</SelectItem>
              <SelectItem value="precipitation">Precipitation</SelectItem>
              <SelectItem value="wind">Wind Speed</SelectItem>
              <SelectItem value="humidity">Humidity</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="mumbai">Mumbai</SelectItem>
              <SelectItem value="delhi">Delhi</SelectItem>
              <SelectItem value="chennai">Chennai</SelectItem>
              <SelectItem value="kolkata">Kolkata</SelectItem>
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
                <BarChart3 className="w-5 h-5 mr-2 text-purple-400" />
                {selectedParameter.charAt(0).toUpperCase() + selectedParameter.slice(1)} Analysis -{" "}
                {selectedRegion.charAt(0).toUpperCase() + selectedRegion.slice(1)}
              </CardTitle>
              <CardDescription className="text-slate-400">Real-time and historical data visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={getChartConfig()} className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  {selectedParameter === "precipitation" ? (
                    <AreaChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" />
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
                        name="Current"
                      />
                      <Area
                        type="monotone"
                        dataKey="average"
                        stackId="2"
                        stroke="var(--color-average)"
                        fill="var(--color-average)"
                        fillOpacity={0.3}
                        name="Historical Average"
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={getCurrentData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.1)" />
                      <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" />
                      <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="var(--color-value)"
                        strokeWidth={3}
                        dot={{ fill: "var(--color-value)", strokeWidth: 2, r: 4 }}
                        name="Observed"
                      />
                      {selectedParameter === "temperature" && (
                        <Line
                          type="monotone"
                          dataKey="forecast"
                          stroke="var(--color-forecast)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={{ fill: "var(--color-forecast)", strokeWidth: 2, r: 3 }}
                          name="Forecast"
                        />
                      )}
                      {selectedParameter === "wind" && (
                        <Line
                          type="monotone"
                          dataKey="direction"
                          stroke="var(--color-direction)"
                          strokeWidth={2}
                          dot={{ fill: "var(--color-direction)", strokeWidth: 2, r: 3 }}
                          name="Direction"
                        />
                      )}
                    </LineChart>
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
                  <p className="text-slate-400 text-sm">Current Value</p>
                  <p className="text-2xl font-bold text-white">
                    {selectedParameter === "temperature"
                      ? "32.1°C"
                      : selectedParameter === "precipitation"
                        ? "78.9mm"
                        : "18.7 km/h"}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">24h Change</p>
                  <p className="text-2xl font-bold text-green-400">+2.3%</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Weekly Avg</p>
                  <p className="text-2xl font-bold text-white">
                    {selectedParameter === "temperature"
                      ? "29.8°C"
                      : selectedParameter === "precipitation"
                        ? "65.2mm"
                        : "15.2 km/h"}
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Data Points</p>
                  <p className="text-2xl font-bold text-white">1,247</p>
                </div>
                <Download className="w-8 h-8 text-cyan-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
