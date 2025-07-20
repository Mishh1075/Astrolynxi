"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AppState {
  user: {
    name: string
    email: string
    role: string
    preferences: {
      theme: string
      language: string
      notifications: boolean
    }
  }
  satellites: Array<{
    id: string
    name: string
    status: string
    lastUpdate: string
  }>
  notifications: Array<{
    id: string
    type: string
    message: string
    timestamp: string
    read: boolean
  }>
  systemStatus: {
    mosdacPortal: string
    aiAssistant: string
    dataProcessing: string
    satelliteTracking: string
  }
}

interface AppContextType {
  state: AppState
  updateUser: (user: Partial<AppState["user"]>) => void
  addNotification: (notification: Omit<AppState["notifications"][0], "id" | "timestamp">) => void
  markNotificationRead: (id: string) => void
  updateSystemStatus: (status: Partial<AppState["systemStatus"]>) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    user: {
      name: "Dr. Scientist",
      email: "scientist@isro.gov.in",
      role: "Senior Research Scientist",
      preferences: {
        theme: "dark",
        language: "en",
        notifications: true,
      },
    },
    satellites: [
      { id: "1", name: "INSAT-3D", status: "Active", lastUpdate: "2 minutes ago" },
      { id: "2", name: "INSAT-3DR", status: "Active", lastUpdate: "5 minutes ago" },
      { id: "3", name: "RESOURCESAT-2A", status: "Active", lastUpdate: "1 minute ago" },
    ],
    notifications: [
      {
        id: "1",
        type: "info",
        message: "New satellite data available from INSAT-3D",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: "2",
        type: "warning",
        message: "System maintenance scheduled for 2:00 AM",
        timestamp: new Date().toISOString(),
        read: false,
      },
      {
        id: "3",
        type: "success",
        message: "Query processing complete",
        timestamp: new Date().toISOString(),
        read: false,
      },
    ],
    systemStatus: {
      mosdacPortal: "online",
      aiAssistant: "active",
      dataProcessing: "running",
      satelliteTracking: "operational",
    },
  })

  const updateUser = (user: Partial<AppState["user"]>) => {
    setState((prev) => ({
      ...prev,
      user: { ...prev.user, ...user },
    }))
  }

  const addNotification = (notification: Omit<AppState["notifications"][0], "id" | "timestamp">) => {
    setState((prev) => ({
      ...prev,
      notifications: [
        {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        },
        ...prev.notifications,
      ],
    }))
  }

  const markNotificationRead = (id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }))
  }

  const updateSystemStatus = (status: Partial<AppState["systemStatus"]>) => {
    setState((prev) => ({
      ...prev,
      systemStatus: { ...prev.systemStatus, ...status },
    }))
  }

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly update satellite status
      setState((prev) => ({
        ...prev,
        satellites: prev.satellites.map((sat) => ({
          ...sat,
          lastUpdate: `${Math.floor(Math.random() * 10) + 1} minutes ago`,
        })),
      }))

      // Occasionally add new notifications
      if (Math.random() < 0.1) {
        const messages = [
          "New weather data processed",
          "Satellite orbit adjusted",
          "Data download completed",
          "System performance optimal",
        ]
        addNotification({
          type: "info",
          message: messages[Math.floor(Math.random() * messages.length)],
          read: false,
        })
      }
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <AppContext.Provider
      value={{
        state,
        updateUser,
        addNotification,
        markNotificationRead,
        updateSystemStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
