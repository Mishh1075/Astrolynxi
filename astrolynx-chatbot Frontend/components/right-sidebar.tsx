"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Network, Download, Lightbulb, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { mockGraphQLEndpoint } from "@/lib/mock-api"
import type { KnowledgeGraphNode, SuggestedQuery } from "@/lib/types"

export function RightSidebar() {
  const [knowledgeGraph, setKnowledgeGraph] = useState<KnowledgeGraphNode[]>([])
  const [suggestedQueries, setSuggestedQueries] = useState<SuggestedQuery[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        const [graphData, queriesData] = await Promise.all([
          mockGraphQLEndpoint.getKnowledgeGraph(),
          mockGraphQLEndpoint.getSuggestedQueries(),
        ])
        setKnowledgeGraph(graphData)
        setSuggestedQueries(queriesData)
      } catch (error) {
        console.error("Failed to load data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadData()
  }, [])

  const KnowledgeGraphPreview = () => (
    <Card className="bg-slate-800/50 border-slate-600/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-white flex items-center gap-2">
          <Network className="w-5 h-5" />
          Knowledge Graph
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <RefreshCw className="w-6 h-6 text-slate-400 animate-spin" />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {knowledgeGraph.slice(0, 6).map((node) => (
                <motion.div
                  key={node.id}
                  className="p-2 bg-slate-700/50 rounded-lg text-center"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-xs text-slate-300 mb-1">{node.label}</div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      node.type === "mission"
                        ? "border-orange-500 text-orange-300"
                        : node.type === "satellite"
                          ? "border-blue-500 text-blue-300"
                          : "border-green-500 text-green-300"
                    }`}
                  >
                    {node.type}
                  </Badge>
                </motion.div>
              ))}
            </div>
            <div className="text-xs text-slate-400 text-center">
              {knowledgeGraph.length} nodes • Live data from MOSDAC
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <motion.aside
      className="w-80 bg-slate-900/60 backdrop-blur-md border-l border-slate-700/50 p-6 overflow-y-auto space-y-6"
      initial={{ x: 320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.4 }}
    >
      {/* Knowledge Graph Preview */}
      <KnowledgeGraphPreview />

      {/* Suggested Queries */}
      <Card className="bg-slate-800/50 border-slate-600/30">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5" />
            Suggested Queries
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {suggestedQueries.map((query) => (
            <motion.button
              key={query.id}
              className="w-full p-3 text-left bg-slate-700/30 hover:bg-slate-700/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm text-white mb-1">{query.text}</div>
              <Badge variant="outline" className="text-xs border-slate-500 text-slate-400">
                {query.category}
              </Badge>
            </motion.button>
          ))}
        </CardContent>
      </Card>

      {/* Generate Report */}
      <Card className="bg-slate-800/50 border-slate-600/30">
        <CardContent className="pt-6">
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Generate Report
          </Button>
          <p className="text-xs text-slate-400 mt-2 text-center">Export current session as PDF</p>
        </CardContent>
      </Card>
    </motion.aside>
  )
}
