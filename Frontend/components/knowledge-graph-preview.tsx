"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface GraphNode {
  id: string
  label: string
  type: "satellite" | "mission" | "sensor" | "data"
  connections: string[]
}

export function KnowledgeGraphPreview() {
  const [nodes] = useState<GraphNode[]>([
    { id: "1", label: "INSAT-3D", type: "satellite", connections: ["2", "3"] },
    { id: "2", label: "Weather Data", type: "data", connections: ["1", "4"] },
    { id: "3", label: "VHRR Sensor", type: "sensor", connections: ["1"] },
    { id: "4", label: "Monsoon Mission", type: "mission", connections: ["2"] },
  ])

  const getNodeColor = (type: string) => {
    switch (type) {
      case "satellite":
        return "bg-blue-500"
      case "mission":
        return "bg-orange-500"
      case "sensor":
        return "bg-green-500"
      case "data":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="relative h-48 bg-slate-900/50 rounded-lg p-4 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="100%" height="100%" className="absolute inset-0">
          {/* Connection lines */}
          <motion.line
            x1="20%"
            y1="30%"
            x2="80%"
            y2="70%"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          />
          <motion.line
            x1="20%"
            y1="30%"
            x2="50%"
            y2="80%"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.7 }}
          />
          <motion.line
            x1="80%"
            y1="70%"
            x2="70%"
            y2="20%"
            stroke="rgba(59, 130, 246, 0.3)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.9 }}
          />
        </svg>

        {/* Nodes */}
        {nodes.map((node, index) => (
          <motion.div
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.2 }}
            className={`absolute w-3 h-3 rounded-full ${getNodeColor(node.type)} shadow-lg`}
            style={{
              left: `${20 + (index % 2) * 60}%`,
              top: `${30 + (index % 3) * 25}%`,
            }}
            title={node.label}
          />
        ))}
      </div>

      <div className="absolute bottom-2 left-2 text-xs text-slate-400">Live Knowledge Graph</div>
    </div>
  )
}
