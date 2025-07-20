"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"
import { useApp } from "@/components/app-provider"
import {
  Home,
  Satellite,
  Settings,
  Globe,
  Cloud,
  Waves,
  Mountain,
  Wind,
  ChevronRight,
  Zap,
  AlertTriangle,
  HelpCircle,
  TrendingUp,
  FileText,
  Map,
} from "lucide-react"

const navigationData = {
  main: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      description: "Overview of satellite data and missions",
    },
    {
      title: "Chat Assistant",
      url: "/chat",
      icon: Zap,
      badge: "AI",
      description: "AI-powered satellite data assistant",
    },
  ],
  satellites: [
    {
      title: "INSAT Series",
      url: "/satellites/insat",
      icon: Satellite,
      description: "Weather and communication satellites",
      items: [
        { title: "INSAT-3D", url: "/satellites/insat/insat-3d" },
        { title: "INSAT-3DR", url: "/satellites/insat/insat-3dr" },
        { title: "INSAT-3DS", url: "/satellites/insat/insat-3ds" },
      ],
    },
    {
      title: "RESOURCESAT",
      url: "/satellites/resourcesat",
      icon: Mountain,
      description: "Earth observation satellites",
      items: [
        { title: "RESOURCESAT-2", url: "/satellites/resourcesat/resourcesat-2" },
        { title: "RESOURCESAT-2A", url: "/satellites/resourcesat/resourcesat-2a" },
      ],
    },
    {
      title: "CARTOSAT",
      url: "/satellites/cartosat",
      icon: Globe,
      description: "High-resolution imaging satellites",
      items: [
        { title: "CARTOSAT-2", url: "/satellites/cartosat/cartosat-2" },
        { title: "CARTOSAT-3", url: "/satellites/cartosat/cartosat-3" },
      ],
    },
    {
      title: "OCEANSAT",
      url: "/satellites/oceansat",
      icon: Waves,
      description: "Ocean monitoring satellites",
      items: [
        { title: "OCEANSAT-2", url: "/satellites/oceansat/oceansat-2" },
        { title: "SCATSAT-1", url: "/satellites/oceansat/scatsat-1" },
      ],
    },
  ],
  dataPortal: [
    {
      title: "Weather Data",
      url: "/data/weather",
      icon: Cloud,
      description: "Meteorological observations",
      items: [
        { title: "Temperature Maps", url: "/data/weather/temperature" },
        { title: "Precipitation", url: "/data/weather/precipitation" },
        { title: "Wind Patterns", url: "/data/weather/wind" },
        { title: "Cloud Coverage", url: "/data/weather/clouds" },
      ],
    },
    {
      title: "Ocean Data",
      url: "/data/ocean",
      icon: Waves,
      description: "Marine and oceanographic data",
      items: [
        { title: "Sea Surface Temperature", url: "/data/ocean/sst" },
        { title: "Ocean Color", url: "/data/ocean/color" },
        { title: "Altimetry", url: "/data/ocean/altimetry" },
        { title: "Scatterometer Winds", url: "/data/ocean/winds" },
      ],
    },
    {
      title: "Land Data",
      url: "/data/land",
      icon: Mountain,
      description: "Land use and vegetation monitoring",
      items: [
        { title: "NDVI", url: "/data/land/ndvi" },
        { title: "Land Cover", url: "/data/land/cover" },
        { title: "Agriculture", url: "/data/land/agriculture" },
        { title: "Forest Monitoring", url: "/data/land/forest" },
      ],
    },
    {
      title: "Atmospheric Data",
      url: "/data/atmosphere",
      icon: Wind,
      description: "Atmospheric parameters",
      items: [
        { title: "Aerosols", url: "/data/atmosphere/aerosols" },
        { title: "Ozone", url: "/data/atmosphere/ozone" },
        { title: "Water Vapor", url: "/data/atmosphere/water-vapor" },
        { title: "Greenhouse Gases", url: "/data/atmosphere/ghg" },
      ],
    },
  ],
  analytics: [
    {
      title: "Time Series",
      url: "/analytics/timeseries",
      icon: TrendingUp,
      description: "Temporal data analysis",
      items: [
        { title: "Trend Analysis", url: "/analytics/timeseries/trends" },
        { title: "Seasonal Patterns", url: "/analytics/timeseries/seasonal" },
        { title: "Anomaly Detection", url: "/analytics/timeseries/anomalies" },
      ],
    },
    {
      title: "Spatial Analysis",
      url: "/analytics/spatial",
      icon: Map,
      description: "Geographic data analysis",
      items: [
        { title: "Regional Comparison", url: "/analytics/spatial/regional" },
        { title: "Hotspot Analysis", url: "/analytics/spatial/hotspots" },
        { title: "Correlation Maps", url: "/analytics/spatial/correlation" },
      ],
    },
    {
      title: "Climate Trends",
      url: "/analytics/climate",
      icon: Wind,
      description: "Long-term climate analysis",
      items: [
        { title: "Temperature Trends", url: "/analytics/climate/temperature" },
        { title: "Precipitation Patterns", url: "/analytics/climate/precipitation" },
        { title: "Extreme Events", url: "/analytics/climate/extremes" },
      ],
    },
    {
      title: "Custom Reports",
      url: "/analytics/reports",
      icon: FileText,
      description: "Generate custom analysis reports",
      items: [
        { title: "Data Summaries", url: "/analytics/reports/summaries" },
        { title: "Comparative Analysis", url: "/analytics/reports/comparative" },
        { title: "Export Tools", url: "/analytics/reports/export" },
      ],
    },
  ],
}

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { addNotification } = useApp()
  const [openSections, setOpenSections] = useState<string[]>(["main", "satellites", "dataPortal"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const handleNavigation = (url: string, title?: string) => {
    router.push(url)
    if (title) {
      addNotification({
        type: "info",
        message: `Navigated to ${title}`,
        read: false,
      })
    }
  }

  const handleDisasterMode = () => {
    addNotification({
      type: "warning",
      message: "Disaster Mode activated - Emergency monitoring enabled",
      read: false,
    })
    router.push("/disaster")
  }

  const handleSpatialQuery = () => {
    addNotification({
      type: "info",
      message: "Spatial Query mode activated",
      read: false,
    })
    router.push("/spatial")
  }

  return (
    <Sidebar className="border-r border-blue-500/20 w-80">
      <SidebarHeader className="p-4">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleNavigation("/")}>
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">ISRO</span>
          </div>
          <div>
            <h2 className="font-bold text-blue-300">AstroLynx</h2>
            <p className="text-xs text-slate-400">Navigation Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.main.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <button
                      onClick={() => handleNavigation(item.url, item.title)}
                      className="flex items-center w-full text-left"
                      title={item.description}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-blue-500/20 text-blue-300 border-blue-500/30">{item.badge}</Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Satellites */}
        <SidebarGroup>
          <SidebarGroupLabel>Satellites</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.satellites.map((item) => (
                <Collapsible
                  key={item.title}
                  open={openSections.includes(item.title.toLowerCase())}
                  onOpenChange={() => toggleSection(item.title.toLowerCase())}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton title={item.description}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <button
                                onClick={() => handleNavigation(subItem.url, subItem.title)}
                                className="w-full text-left"
                              >
                                {subItem.title}
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Data Portal */}
        <SidebarGroup>
          <SidebarGroupLabel>Data Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.dataPortal.map((item) => (
                <Collapsible
                  key={item.title}
                  open={openSections.includes(item.title.toLowerCase().replace(" ", ""))}
                  onOpenChange={() => toggleSection(item.title.toLowerCase().replace(" ", ""))}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton title={item.description}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <button
                                onClick={() => handleNavigation(subItem.url, subItem.title)}
                                className="w-full text-left"
                              >
                                {subItem.title}
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Analytics */}
        <SidebarGroup>
          <SidebarGroupLabel>Analytics</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationData.analytics.map((item) => (
                <Collapsible
                  key={item.title}
                  open={openSections.includes(item.title.toLowerCase().replace(" ", ""))}
                  onOpenChange={() => toggleSection(item.title.toLowerCase().replace(" ", ""))}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton title={item.description}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                        <ChevronRight className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                              <button
                                onClick={() => handleNavigation(subItem.url, subItem.title)}
                                className="w-full text-left"
                              >
                                {subItem.title}
                              </button>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup>
          <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleDisasterMode}>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Disaster Mode</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleSpatialQuery}>
                  <Globe className="w-4 h-4 text-green-400" />
                  <span>Spatial Query</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handleNavigation("/help", "Help & Support")}>
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => handleNavigation("/settings", "Settings")}>
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
