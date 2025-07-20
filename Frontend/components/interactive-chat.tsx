"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChatMessage } from "@/components/chat-message"
import { TypingIndicator } from "@/components/typing-indicator"
import {
  Send,
  Mic,
  MicOff,
  Paperclip,
  FileText,
  MoreVertical,
  Copy,
  Share,
  Bookmark,
  Trash2,
  Edit,
  Sparkles,
} from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  sources?: string[]
  attachments?: Array<{
    type: string
    name: string
    size: string
  }>
}

export function InteractiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm AstroLynx, your geo-aware satellite AI assistant. I can help you navigate ISRO's satellite data, track missions, analyze weather patterns, and much more. What would you like to explore today?",
      timestamp: new Date(),
      sources: ["MOSDAC Portal", "ISRO Database"],
    },
  ])

  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [dragOver, setDragOver] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const suggestions = [
    "Show me latest Chandrayaan-3 images",
    "What's the weather forecast for Mumbai?",
    "Track INSAT-3DR satellite position",
    "Analyze crop health in Punjab region",
    "Show cyclone data for Bay of Bengal",
    "Compare temperature data across regions",
    "Generate weather report for next week",
    "Find satellite coverage for disaster area",
  ]

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto"
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
    }
  }, [inputValue])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)
    setShowSuggestions(false)

    // Simulate AI response with realistic delay
    setTimeout(
      () => {
        const responses = [
          {
            content: `Based on your query about "${inputValue}", I found relevant satellite data from multiple ISRO missions. The latest imagery shows clear weather conditions over the requested region. The data indicates optimal visibility for satellite observations. Would you like me to provide more detailed analysis or specific parameters?`,
            sources: ["INSAT-3D", "MOSDAC Portal", "Weather Database", "Satellite Tracking System"],
          },
          {
            content: `I've analyzed the satellite data for your request. The RESOURCESAT-2A satellite captured high-resolution images showing vegetation health indices. The NDVI values indicate healthy crop growth in the specified area. Current atmospheric conditions are favorable for continued monitoring.`,
            sources: ["RESOURCESAT-2A", "Agricultural Database", "LISS-III Sensor", "NDVI Analysis"],
          },
          {
            content: `Here's the comprehensive information about "${inputValue}". The satellite tracking data shows optimal positioning for data collection. Current weather conditions are favorable for imaging operations. I've also identified related datasets that might be useful for your analysis.`,
            sources: ["Satellite Tracking System", "Weather Monitoring", "ISRO Mission Control", "Data Archive"],
          },
        ]

        const randomResponse = responses[Math.floor(Math.random() * responses.length)]

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: randomResponse.content,
          timestamp: new Date(),
          sources: randomResponse.sources,
        }

        setMessages((prev) => [...prev, assistantMessage])
        setIsTyping(false)
      },
      1500 + Math.random() * 1000,
    )
  }

  const handleVoiceInput = () => {
    setIsListening(!isListening)
    setIsRecording(!isRecording)

    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setInputValue("Show me the latest weather data for Delhi region")
        setIsListening(false)
        setIsRecording(false)
      }, 3000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files[0]
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date(),
        attachments: [
          {
            type: file.type,
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          },
        ],
      }
      setMessages((prev) => [...prev, userMessage])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      const userMessage: Message = {
        id: Date.now().toString(),
        type: "user",
        content: `Dropped file: ${file.name}`,
        timestamp: new Date(),
        attachments: [
          {
            type: file.type,
            name: file.name,
            size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          },
        ],
      }
      setMessages((prev) => [...prev, userMessage])
    }
  }

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
  }

  const toggleMessageSelection = (messageId: string) => {
    setSelectedMessages((prev) =>
      prev.includes(messageId) ? prev.filter((id) => id !== messageId) : [...prev, messageId],
    )
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-full relative">
        {/* Chat Messages */}
        <div
          className={`flex-1 overflow-y-auto p-6 space-y-4 transition-all duration-300 ${
            dragOver ? "bg-blue-500/10 border-2 border-dashed border-blue-500" : ""
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          aria-live="polite"
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedMessages.includes(message.id)}
                    onChange={() => toggleMessageSelection(message.id)}
                    className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="flex-1">
                    <ChatMessage message={message} />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-slate-800 border-slate-700">
                      <DropdownMenuItem onClick={() => copyMessage(message.content)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Share className="w-4 h-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Bookmark className="w-4 h-4 mr-2" />
                        Bookmark
                      </DropdownMenuItem>
                      {message.type === "user" && (
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-400">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && <TypingIndicator />}

          {/* Suggestions */}
          <AnimatePresence>
            {showSuggestions && messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 text-slate-400">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-sm">Try these suggestions:</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {suggestions.slice(0, 6).map((suggestion, index) => (
                    <motion.button
                      key={suggestion}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="text-left p-3 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 transition-colors text-sm text-slate-300 hover:text-white border border-slate-700/50 hover:border-blue-500/50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {suggestion}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>

        {/* Selected Messages Actions */}
        <AnimatePresence>
          {selectedMessages.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="px-6 py-2 bg-slate-800/50 border-t border-slate-700"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">
                  {selectedMessages.length} message{selectedMessages.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 bg-transparent">
                    <Share className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-red-600 text-red-400 hover:bg-red-600/20 bg-transparent"
                    onClick={() => setSelectedMessages([])}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Input Area */}
        <div className="p-6 border-t border-slate-700/50 bg-slate-900/30 backdrop-blur-md">
          <div className="flex space-x-2">
            <div className="flex-1 relative">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about satellite data, weather, missions..."
                className="min-h-[44px] max-h-32 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-white placeholder-slate-400 pr-24 resize-none"
                rows={1}
              />

              {/* Input Actions */}
              <div className="absolute right-2 top-2 flex items-center space-x-1">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={handleFileUpload}
                  className="hidden"
                  accept="image/*,.pdf,.doc,.docx,.txt"
                />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => fileInputRef.current?.click()}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <Paperclip className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Attach File</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleVoiceInput}
                      className={`p-1 transition-colors ${
                        isListening ? "text-red-400 animate-pulse" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isListening ? "Stop Recording" : "Voice Input"}</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:opacity-50 transition-all duration-200"
                  size="sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Send Message (Enter)</TooltipContent>
            </Tooltip>
          </div>

          {/* Voice Recording Indicator */}
          <AnimatePresence>
            {isRecording && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="mt-2 flex items-center space-x-2 text-sm text-red-400"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                  className="w-2 h-2 bg-red-500 rounded-full"
                />
                <span>Recording... Speak now</span>
                <Badge variant="outline" className="border-red-500/30 text-red-400">
                  Voice Active
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag and Drop Indicator */}
          <AnimatePresence>
            {dragOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center z-10"
              >
                <div className="text-center">
                  <FileText className="w-12 h-12 text-blue-400 mx-auto mb-2" />
                  <p className="text-blue-400 font-medium">Drop files here to upload</p>
                  <p className="text-slate-400 text-sm">Supports images, PDFs, and documents</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </TooltipProvider>
  )
}
