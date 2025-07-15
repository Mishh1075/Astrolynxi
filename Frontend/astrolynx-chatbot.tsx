"use client"

import { motion } from "framer-motion"
import { StarfieldBackground } from "./components/starfield-background"
import { Header } from "./components/header"
import { LeftSidebar } from "./components/left-sidebar"
import { ChatInterface } from "./components/chat-interface"
import { RightSidebar } from "./components/right-sidebar"
import { FloatingButtons } from "./components/floating-buttons"
import { OptionalWidgets } from "./components/optional-widgets"

export default function AstroLynxChatbot() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      <StarfieldBackground />

      <motion.div
        className="relative z-10 min-h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Header />

        <div className="flex-1 flex">
          <LeftSidebar />
          <ChatInterface />
          <RightSidebar />
        </div>
      </motion.div>

      <FloatingButtons />
      <OptionalWidgets />
    </div>
  )
}
