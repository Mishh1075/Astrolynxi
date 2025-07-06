export interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  sources?: string[]
  isStreaming?: boolean
}

export interface KnowledgeGraphNode {
  id: string
  label: string
  type: "mission" | "satellite" | "sensor" | "data"
  connections: string[]
}

export interface SuggestedQuery {
  id: string
  text: string
  category: string
}
