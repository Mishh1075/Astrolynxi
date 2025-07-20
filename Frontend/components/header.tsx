"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useApp } from "@/components/app-provider"
import {
  Search,
  Bell,
  User,
  Settings,
  LogOut,
  Wifi,
  WifiOff,
  Satellite,
  Cloud,
  Waves,
  Mountain,
  Wind,
  Globe,
  TrendingUp,
  FileText,
  Map,
  Home,
  Zap,
  AlertTriangle,
  HelpCircle,
  Rocket,
} from "lucide-react"

export function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const { state, addNotification, markNotificationRead } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [isConnected, setIsConnected] = useState(true)

  const unreadCount = state.notifications?.filter((n) => !n.read).length || 0

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      addNotification({
        id: Date.now().toString(),
        type: "info",
        message: `Searching for: ${searchQuery}`,
        timestamp: new Date().toISOString(),
        read: false,
      })
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  const handleNavigation = (url: string, title?: string) => {
    router.push(url)
    if (title) {
      addNotification({
        id: Date.now().toString(),
        type: "info",
        message: `Navigated to ${title}`,
        timestamp: new Date().toISOString(),
        read: false,
      })
    }
  }

  const handleNotificationClick = (notificationId: string) => {
    markNotificationRead(notificationId)
  }

  const toggleConnection = () => {
    setIsConnected(!isConnected)
    addNotification({
      id: Date.now().toString(),
      type: isConnected ? "error" : "success",
      message: isConnected ? "Satellite connection lost" : "Satellite connection restored",
      timestamp: new Date().toISOString(),
      read: false,
    })
  }

  const handleLogout = () => {
    addNotification({
      id: Date.now().toString(),
      type: "info",
      message: "Logged out successfully",
      timestamp: new Date().toISOString(),
      read: false,
    })
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-500/20 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => handleNavigation("/", "Dashboard")}
          >
            <div className="relative w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ISRO</span>
              <Rocket className="absolute -top-1 -right-1 w-4 h-4 text-blue-300 rotate-45" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-bold text-blue-300">AstroLynx</h1>
                <Rocket className="w-4 h-4 text-blue-400" />
              </div>
              <p className="text-xs text-slate-400">Satellite Data Portal</p>
            </div>
          </div>

          {/* Main Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {/* Main */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-blue-300">Main</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[400px]">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/", "Dashboard")}
                        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left ${
                          pathname === "/" ? "bg-blue-500/20 text-blue-300" : ""
                        }`}
                      >
                        <Home className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Dashboard</div>
                          <div className="text-sm text-slate-400">Overview of satellite data and missions</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/chat", "Chat Assistant")}
                        className={`flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left ${
                          pathname === "/chat" ? "bg-blue-500/20 text-blue-300" : ""
                        }`}
                      >
                        <Zap className="w-5 h-5" />
                        <div className="flex items-center space-x-2">
                          <div>
                            <div className="font-medium">Chat Assistant</div>
                            <div className="text-sm text-slate-400">AI-powered satellite data assistant</div>
                          </div>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30">AI</Badge>
                        </div>
                      </button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Satellites */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-blue-300">Satellites</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/satellites/insat", "INSAT Series")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Satellite className="w-5 h-5" />
                        <div>
                          <div className="font-medium">INSAT Series</div>
                          <div className="text-sm text-slate-400">Weather and communication</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/satellites/resourcesat", "RESOURCESAT")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Mountain className="w-5 h-5" />
                        <div>
                          <div className="font-medium">RESOURCESAT</div>
                          <div className="text-sm text-slate-400">Earth observation</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/satellites/cartosat", "CARTOSAT")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Globe className="w-5 h-5" />
                        <div>
                          <div className="font-medium">CARTOSAT</div>
                          <div className="text-sm text-slate-400">High-resolution imaging</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/satellites/oceansat", "OCEANSAT")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Waves className="w-5 h-5" />
                        <div>
                          <div className="font-medium">OCEANSAT</div>
                          <div className="text-sm text-slate-400">Ocean monitoring</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Data Portal */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-blue-300">
                  Data Portal
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/data/weather", "Weather Data")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Cloud className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Weather Data</div>
                          <div className="text-sm text-slate-400">Meteorological observations</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/data/ocean", "Ocean Data")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Waves className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Ocean Data</div>
                          <div className="text-sm text-slate-400">Marine and oceanographic</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/data/land", "Land Data")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Mountain className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Land Data</div>
                          <div className="text-sm text-slate-400">Land use and vegetation</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/data/atmosphere", "Atmospheric Data")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Wind className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Atmospheric Data</div>
                          <div className="text-sm text-slate-400">Atmospheric parameters</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Analytics */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-blue-300">Analytics</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[500px] grid-cols-2">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/analytics/timeseries", "Time Series")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <TrendingUp className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Time Series</div>
                          <div className="text-sm text-slate-400">Temporal data analysis</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/analytics/spatial", "Spatial Analysis")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Map className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Spatial Analysis</div>
                          <div className="text-sm text-slate-400">Geographic data analysis</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/analytics/climate", "Climate Trends")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Wind className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Climate Trends</div>
                          <div className="text-sm text-slate-400">Long-term climate analysis</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation("/analytics/reports", "Custom Reports")}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <FileText className="w-5 h-5" />
                        <div>
                          <div className="font-medium">Custom Reports</div>
                          <div className="text-sm text-slate-400">Generate analysis reports</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Quick Actions */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-300 hover:text-blue-300">
                  Quick Actions
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-6 w-[300px]">
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => {
                          addNotification({
                            id: Date.now().toString(),
                            type: "warning",
                            message: "Disaster Mode activated - Emergency monitoring enabled",
                            timestamp: new Date().toISOString(),
                            read: false,
                          })
                          router.push("/disaster")
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="font-medium">Disaster Mode</div>
                          <div className="text-sm text-slate-400">Emergency monitoring</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => {
                          addNotification({
                            id: Date.now().toString(),
                            type: "info",
                            message: "Spatial Query mode activated",
                            timestamp: new Date().toISOString(),
                            read: false,
                          })
                          router.push("/spatial")
                        }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-800 transition-colors w-full text-left"
                      >
                        <Globe className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="font-medium">Spatial Query</div>
                          <div className="text-sm text-slate-400">Geographic search</div>
                        </div>
                      </button>
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleConnection}
            className={`flex items-center space-x-2 ${
              isConnected ? "text-green-400 hover:text-green-300" : "text-red-400 hover:text-red-300"
            }`}
          >
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            <span className="hidden sm:inline text-xs">{isConnected ? "Connected" : "Disconnected"}</span>
          </Button>

          {/* Search */}
          <form onSubmit={handleSearch} className="hidden md:flex">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                type="search"
                placeholder="Search satellites, data..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-slate-800/50 border-slate-700 focus:border-blue-500 text-slate-200 placeholder-slate-400"
              />
            </div>
          </form>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {!state.notifications || state.notifications.length === 0 ? (
                <DropdownMenuItem disabled>No notifications</DropdownMenuItem>
              ) : (
                state.notifications.slice(0, 5).map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    onClick={() => handleNotificationClick(notification.id)}
                    className={`flex flex-col items-start space-y-1 ${!notification.read ? "bg-blue-500/10" : ""}`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          notification.type === "error"
                            ? "bg-red-500"
                            : notification.type === "warning"
                              ? "bg-yellow-500"
                              : notification.type === "success"
                                ? "bg-green-500"
                                : "bg-blue-500"
                        }`}
                      />
                      <span className="text-sm">{notification.message}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{state.user?.name || "User"}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleNavigation("/settings", "Settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleNavigation("/help", "Help & Support")}>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
