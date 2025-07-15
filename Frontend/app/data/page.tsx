"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { StarfieldBackground } from "@/components/starfield-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, Download, Eye } from "lucide-react"

export default function DataExplorer() {
  const [searchQuery, setSearchQuery] = useState("")

  const datasets = [
    {
      id: "1",
      name: "INSAT-3D Weather Data",
      description: "Real-time meteorological data from INSAT-3D satellite",
      size: "2.3 GB",
      lastUpdated: "2 hours ago",
      type: "Weather",
      format: "NetCDF",
    },
    {
      id: "2",
      name: "Cartosat-3 Imagery",
      description: "High-resolution optical imagery for mapping applications",
      size: "15.7 GB",
      lastUpdated: "6 hours ago",
      type: "Optical",
      format: "GeoTIFF",
    },
    {
      id: "3",
      name: "RISAT-2B SAR Data",
      description: "Synthetic Aperture Radar data for all-weather imaging",
      size: "8.4 GB",
      lastUpdated: "1 day ago",
      type: "SAR",
      format: "HDF5",
    },
    {
      id: "4",
      name: "Oceansat-3 Ocean Color",
      description: "Ocean color and sea surface temperature data",
      size: "4.1 GB",
      lastUpdated: "3 hours ago",
      type: "Ocean",
      format: "NetCDF",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <StarfieldBackground />
      <Navigation />

      <main className="md:ml-64 relative z-10 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Data Explorer</h1>
          <p className="text-slate-400">Browse and access MOSDAC satellite datasets</p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search datasets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-white"
            />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </motion.div>

        {/* Dataset Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {datasets.map((dataset) => (
            <Card key={dataset.id} className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-white text-lg">{dataset.name}</CardTitle>
                    <p className="text-slate-400 text-sm mt-1">{dataset.description}</p>
                  </div>
                  <Badge variant="outline" className="border-blue-500 text-blue-300">
                    {dataset.type}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Size:</span>
                    <span className="text-white">{dataset.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Format:</span>
                    <span className="text-white">{dataset.format}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last Updated:</span>
                    <span className="text-white">{dataset.lastUpdated}</span>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Eye className="w-4 h-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </main>
    </div>
  )
}
