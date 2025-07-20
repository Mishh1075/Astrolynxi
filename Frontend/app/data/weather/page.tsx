"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { StarField } from "@/components/star-field"
import {
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Droplets,
  Eye,
  Download,
  Calendar,
  MapPin,
  Search,
} from "lucide-react"

export default function WeatherDataPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [selectedTimeRange, setSelectedTimeRange] = useState("")

  const weatherData = [
    {
      id: 1,
      region: "Mumbai",
      temperature: "28°C",
      humidity: "78%",
      windSpeed: "15 km/h",
      condition: "Partly Cloudy",
      satellite: "INSAT-3D",
      lastUpdate: "5 minutes ago",
      icon: Cloud,
      color: "text-blue-400",
    },
    {
      id: 2,
      region: "Delhi",
      temperature: "35°C",
      humidity: "45%",
      windSpeed: "8 km/h",
      condition: "Clear Sky",
      satellite: "INSAT-3DR",
      lastUpdate: "3 minutes ago",
      icon: Sun,
      color: "text-yellow-400",
    },
    {
      id: 3,
      region: "Chennai",
      temperature: "31°C",
      humidity: "85%",
      windSpeed: "22 km/h",
      condition: "Heavy Rain",
      satellite: "INSAT-3DS",
      lastUpdate: "2 minutes ago",
      icon: CloudRain,
      color: "text-blue-600",
    },
    {
      id: 4,
      region: "Kolkata",
      temperature: "29°C",
      humidity: "82%",
      windSpeed: "12 km/h",
      condition: "Thunderstorm",
      satellite: "INSAT-3D",
      lastUpdate: "7 minutes ago",
      icon: CloudRain,
      color: "text-purple-400",
    },
  ]

  const dataProducts = [
    {
      name: "Temperature Maps",
      description: "Surface temperature data from VHRR sensor",
      resolution: "1km x 1km",
      frequency: "Hourly",
      format: "HDF5, NetCDF",
      size: "2.3 GB",
    },
    {
      name: "Precipitation Data",
      description: "Rainfall measurements and forecasts",
      resolution: "4km x 4km",
      frequency: "3-hourly",
      format: "GRIB2, NetCDF",
      size: "1.8 GB",
    },
    {
      name: "Wind Patterns",
      description: "Atmospheric wind speed and direction",
      resolution: "10km x 10km",
      frequency: "6-hourly",
      format: "NetCDF, CSV",
      size: "950 MB",
    },
    {
      name: "Cloud Coverage",
      description: "Cloud type and coverage analysis",
      resolution: "1km x 1km",
      frequency: "30 minutes",
      format: "HDF5, TIFF",
      size: "3.1 GB",
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
              <Cloud className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                Weather Data Portal
              </h1>
              <p className="text-slate-400 text-lg">Real-time meteorological data from ISRO satellites</p>
            </div>
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
              placeholder="Search weather data by location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white"
            />
          </div>
          <Select value={selectedRegion} onValueChange={setSelectedRegion}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="north">North India</SelectItem>
              <SelectItem value="south">South India</SelectItem>
              <SelectItem value="east">East India</SelectItem>
              <SelectItem value="west">West India</SelectItem>
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
        </motion.div>

        {/* Current Weather Conditions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Current Weather Conditions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {weatherData.map((weather) => (
              <Card key={weather.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-blue-400" />
                      {weather.region}
                    </CardTitle>
                    <weather.icon className={`w-6 h-6 ${weather.color}`} />
                  </div>
                  <CardDescription className="text-slate-400">{weather.condition}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center">
                      <Thermometer className="w-4 h-4 mr-2 text-red-400" />
                      <span className="text-white">{weather.temperature}</span>
                    </div>
                    <div className="flex items-center">
                      <Droplets className="w-4 h-4 mr-2 text-blue-400" />
                      <span className="text-white">{weather.humidity}</span>
                    </div>
                    <div className="flex items-center">
                      <Wind className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-white">{weather.windSpeed}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <span className="text-white text-xs">{weather.lastUpdate}</span>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-slate-700">
                    <p className="text-xs text-slate-400">Source: {weather.satellite}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Data Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-4">Available Data Products</h2>
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
                  <div className="flex space-x-2 pt-4">
                    <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
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
          </div>
        </motion.div>
      </div>
    </div>
  )
}
