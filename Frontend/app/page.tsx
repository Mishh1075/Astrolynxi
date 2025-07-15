"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { StarfieldBackground } from "@/components/starfield-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Satellite, Database, MessageSquare, TrendingUp, Globe, Activity } from "lucide-react"
import Link from "next/link"

export default function Dashboard() {
  const stats = [
    { label: "Active Satellites", value: "47", icon: Satellite, color: "text-blue-400" },
    { label: "Data Points", value: "2.3M", icon: Database, color: "text-green-400" },
    { label: "Chat Sessions", value: "1,247", icon: MessageSquare, color: "text-purple-400" },
    { label: "Queries Today", value: "892", icon: TrendingUp, color: "text-orange-400" },
  ]

  const quickActions = [
    { title: "Start Chat", description: "Ask questions about satellite data", href: "/chat", icon: MessageSquare },
    { title: "Explore Data", description: "Browse MOSDAC portal data", href: "/data", icon: Database },
    { title: "View Map", description: "Interactive satellite map", href: "/map", icon: Globe },
    { title: "Analytics", description: "Data insights and reports", href: "/analytics", icon: Activity },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <StarfieldBackground />
      <Navigation />

      <main className="md:ml-64 relative z-10">
        <div className="p-6 md:p-8">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Welcome to AstroLynx - Your Geo-Aware Satellite AI Assistant</p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <Card key={stat.label} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card className="bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70 transition-colors cursor-pointer">
                    <CardContent className="p-6">
                      <action.icon className="w-8 h-8 text-blue-400 mb-3" />
                      <h3 className="font-semibold text-white mb-2">{action.title}</h3>
                      <p className="text-slate-400 text-sm">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New satellite data available", time: "2 minutes ago", type: "data" },
                    { action: "Chat session completed", time: "15 minutes ago", type: "chat" },
                    { action: "Report generated", time: "1 hour ago", type: "report" },
                    { action: "System update deployed", time: "3 hours ago", type: "system" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-white">{item.action}</span>
                      </div>
                      <span className="text-slate-400 text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
