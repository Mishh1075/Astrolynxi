"use client"

import { motion } from "framer-motion"
import { User, Bot, ExternalLink } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.type === "user"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
            isUser ? "bg-gradient-to-br from-blue-500 to-cyan-500" : "bg-gradient-to-br from-orange-500 to-red-600"
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Content */}
        <div className={`${isUser ? "mr-3" : "ml-3"}`}>
          <Card
            className={`p-4 ${
              isUser
                ? "bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border-blue-500/30"
                : "bg-slate-800/50 border-slate-700"
            }`}
          >
            <p className="text-white text-sm leading-relaxed">{message.content}</p>

            {/* Sources */}
            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 pt-3 border-t border-slate-600/50">
                <p className="text-xs text-slate-400 mb-2">Sources:</p>
                <div className="flex flex-wrap gap-2">
                  {message.sources.map((source, index) => (
                    <button
                      key={index}
                      className="inline-flex items-center text-xs bg-slate-700/50 hover:bg-slate-700 px-2 py-1 rounded-full text-slate-300 hover:text-white transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      {source}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Timestamp */}
          <p className={`text-xs text-slate-500 mt-1 ${isUser ? "text-right" : "text-left"}`}>
            {message.timestamp.toLocaleTimeString()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
