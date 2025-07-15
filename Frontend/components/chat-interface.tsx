"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mic, User, Bot, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Message } from "@/lib/types"

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hello! I'm AstroLynx, your AI assistant for satellite data navigation. I can help you explore ISRO's satellite missions, retrieve data from MOSDAC, and answer questions about space technology. How can I assist you today?",
      role: "assistant",
      timestamp: new Date(),
      sources: ["MOSDAC Portal", "ISRO Database"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: `Based on your query about "${inputValue}", I can provide information from ISRO's satellite data. Here's what I found from the MOSDAC portal and our knowledge graph...`,
        role: "assistant",
        timestamp: new Date(),
        sources: ["MOSDAC Portal", "ISRO Satellite Database", "Mission Archives"],
        isStreaming: true,
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)

      // Simulate streaming effect
      setTimeout(() => {
        setMessages((prev) => prev.map((msg) => (msg.id === aiResponse.id ? { ...msg, isStreaming: false } : msg)))
      }, 2000)
    }, 1500)
  }

  const StreamingDots = () => (
    <motion.div className="flex space-x-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-blue-400 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  )

  return (
    <div className="flex-1 flex flex-col bg-slate-900/40 backdrop-blur-sm min-h-0">
      {/* Chat Messages - Responsive padding */}
      <div className="flex-1 overflow-y-auto p-3 md:p-6 space-y-3 md:space-y-4" aria-live="polite">
        <div className="max-w-4xl mx-auto space-y-3 md:space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <Card
                  className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 ${
                    message.role === "user"
                      ? "bg-blue-600/20 border-blue-500/30"
                      : "bg-slate-800/50 border-slate-600/30"
                  }`}
                >
                  <div className="flex items-start space-x-2 md:space-x-3">
                    <div
                      className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === "user" ? "bg-blue-500" : "bg-gradient-to-br from-orange-500 to-red-600"
                      }`}
                    >
                      {message.role === "user" ? (
                        <User className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      ) : (
                        <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white leading-relaxed text-sm md:text-base break-words">{message.content}</p>
                      {message.isStreaming && (
                        <div className="mt-2">
                          <StreamingDots />
                        </div>
                      )}
                      {message.sources && (
                        <div className="mt-2 md:mt-3 flex flex-wrap gap-1 md:gap-2">
                          {message.sources.map((source, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs bg-slate-700/50 text-slate-300 hover:bg-slate-600/50 cursor-pointer"
                            >
                              <ExternalLink className="w-2 h-2 md:w-3 md:h-3 mr-1" />
                              <span className="truncate max-w-[100px] md:max-w-none">{source}</span>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator - responsive */}
          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <Card className="max-w-[85%] md:max-w-2xl p-3 md:p-4 bg-slate-800/50 border-slate-600/30">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <Bot className="w-3 h-3 md:w-4 md:h-4 text-white" />
                  </div>
                  <StreamingDots />
                </div>
              </Card>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area - Responsive */}
      <div className="p-3 md:p-6 border-t border-slate-700/50 bg-slate-900/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto">
          <div className="flex space-x-2 md:space-x-4">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask about satellite data..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-10 md:pr-12 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 h-10 md:h-auto text-sm md:text-base"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute right-1 md:right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white p-1 md:p-2"
              >
                <Mic className="w-3 h-3 md:w-4 md:h-4" />
              </Button>
            </div>
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white h-10 md:h-auto px-3 md:px-4"
            >
              <Send className="w-3 h-3 md:w-4 md:h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
