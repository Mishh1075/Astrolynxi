"use client"

import { motion } from "framer-motion"
import { Satellite, Globe } from "lucide-react"

export function Header() {
  return (
    <motion.header
      className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 px-6 py-4 relative z-10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          className="flex items-center space-x-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <Satellite className="w-6 h-6 text-white" />
          </div>
          <div>
            <motion.h1
              className="text-2xl font-bold text-white"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              AstroLynx
            </motion.h1>
            <motion.p
              className="text-sm text-slate-300"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              Geo-Aware Satellite AI Assistant
            </motion.p>
          </div>
        </motion.div>

        <motion.div
          className="flex items-center space-x-2 text-slate-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Globe className="w-5 h-5" />
          <span className="text-sm">MOSDAC Portal Integration</span>
        </motion.div>
      </div>
    </motion.header>
  )
}
