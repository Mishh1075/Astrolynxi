"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { KnowledgeGraphPreview } from "@/components/knowledge-graph-preview"
import { Download, Lightbulb, TrendingUp } from "lucide-react"

export function RightSidebar() {
  const [suggestedQueries] = useState([
    "Show me latest Chandrayaan-3 images",
    "What's the weather forecast for Mumbai?",
    "Track INSAT-3DR satellite position",
    "Analyze crop health in Punjab region",
    "Show cyclone data for Bay of Bengal",
  ])

  const handleGenerateReport = () => {
    // Mock PDF generation
    console.log("Generating PDF report...")
  }

  return (
    <motion.aside
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.0 }}
      className="w-80 bg-slate-900/50 backdrop-blur-md border-l border-blue-500/20 p-6 overflow-y-auto space-y-6"
    >
      {/* Knowledge Graph Preview */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center text-sm">
            <TrendingUp className="w-4 h-4 mr-2" />
            Knowledge Graph
          </CardTitle>
        </CardHeader>
        <CardContent>
          <KnowledgeGraphPreview />
        </CardContent>
      </Card>

      {/* Suggested Queries */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center text-sm">
            <Lightbulb className="w-4 h-4 mr-2" />
            Suggested Queries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestedQueries.map((query, index) => (
            <button
              key={index}
              className="w-full text-left p-2 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors text-sm text-slate-300 hover:text-white"
            >
              {query}
            </button>
          ))}
        </CardContent>
      </Card>

      {/* Generate Report */}
      <Button
        onClick={handleGenerateReport}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
      >
        <Download className="w-4 h-4 mr-2" />
        Generate Report
      </Button>

      {/* Live Stats */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-blue-300 text-sm">Live Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Active Satellites</span>
            <span className="text-green-400 font-mono">47</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Data Points</span>
            <span className="text-blue-400 font-mono">2.3M</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Queries Today</span>
            <span className="text-cyan-400 font-mono">1,247</span>
          </div>
        </CardContent>
      </Card>
    </motion.aside>
  )
}
