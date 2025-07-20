"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { StarField } from "@/components/star-field"
import { useApp } from "@/components/app-provider"
import { Settings, User, Palette, Shield, Zap, Save, RotateCcw, Download, Upload } from "lucide-react"

export default function SettingsPage() {
  const { state, updateUser, addNotification } = useApp()
  const [activeTab, setActiveTab] = useState("profile")
  const [settings, setSettings] = useState({
    profile: {
      name: state.user.name,
      email: state.user.email,
      role: state.user.role,
    },
    preferences: {
      theme: state.user.preferences.theme,
      language: state.user.preferences.language,
      notifications: state.user.preferences.notifications,
      autoRefresh: true,
      refreshInterval: [30],
      dataFormat: "json",
      timezone: "Asia/Kolkata",
    },
    privacy: {
      shareUsageData: false,
      allowCookies: true,
      dataRetention: "1year",
    },
    advanced: {
      apiAccess: false,
      debugMode: false,
      experimentalFeatures: false,
      cacheSize: [500],
    },
  })

  const handleSave = (section: string) => {
    if (section === "profile") {
      updateUser(settings.profile)
    }
    addNotification({
      type: "success",
      message: `${section.charAt(0).toUpperCase() + section.slice(1)} settings saved successfully`,
      read: false,
    })
  }

  const handleReset = (section: string) => {
    addNotification({
      type: "info",
      message: `${section.charAt(0).toUpperCase() + section.slice(1)} settings reset to defaults`,
      read: false,
    })
  }

  const handleExportSettings = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      settings: settings,
    }
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `astrolynx-settings-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    addNotification({
      type: "success",
      message: "Settings exported successfully",
      read: false,
    })
  }

  const handleImportSettings = () => {
    addNotification({
      type: "info",
      message: "Settings import feature coming soon",
      read: false,
    })
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      <StarField />

      <div className="relative z-10 p-6 space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Settings className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
                  Settings
                </h1>
                <p className="text-slate-400 text-lg">Customize your AstroLynx experience</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={handleExportSettings}
                className="border-slate-600 text-slate-300 bg-transparent"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                onClick={handleImportSettings}
                className="border-slate-600 text-slate-300 bg-transparent"
              >
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Settings Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="profile" className="data-[state=active]:bg-purple-600">
                <User className="w-4 h-4 mr-2" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="preferences" className="data-[state=active]:bg-purple-600">
                <Palette className="w-4 h-4 mr-2" />
                Preferences
              </TabsTrigger>
              <TabsTrigger value="privacy" className="data-[state=active]:bg-purple-600">
                <Shield className="w-4 h-4 mr-2" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="advanced" className="data-[state=active]:bg-purple-600">
                <Zap className="w-4 h-4 mr-2" />
                Advanced
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="mt-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Update your personal information and account details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-300">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={settings.profile.name}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, name: e.target.value },
                          }))
                        }
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-300">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, email: e.target.value },
                          }))
                        }
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-slate-300">
                        Role
                      </Label>
                      <Input
                        id="role"
                        value={settings.profile.role}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            profile: { ...prev.profile, role: e.target.value },
                          }))
                        }
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("profile")} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReset("profile")}
                      className="border-slate-600 text-slate-300 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Appearance</CardTitle>
                    <CardDescription className="text-slate-400">Customize the look and feel</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Theme</Label>
                      <Select
                        value={settings.preferences.theme}
                        onValueChange={(value) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, theme: value },
                          }))
                        }
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Language</Label>
                      <Select
                        value={settings.preferences.language}
                        onValueChange={(value) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, language: value },
                          }))
                        }
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="ta">தமிழ்</SelectItem>
                          <SelectItem value="te">తెలుగు</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Data & Updates</CardTitle>
                    <CardDescription className="text-slate-400">Configure data refresh and formats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-300">Auto Refresh</Label>
                      <Switch
                        checked={settings.preferences.autoRefresh}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, autoRefresh: checked },
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Refresh Interval (seconds)</Label>
                      <Slider
                        value={settings.preferences.refreshInterval}
                        onValueChange={(value) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, refreshInterval: value },
                          }))
                        }
                        max={300}
                        min={10}
                        step={10}
                        className="w-full"
                      />
                      <p className="text-xs text-slate-400">{settings.preferences.refreshInterval[0]} seconds</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Notifications</CardTitle>
                    <CardDescription className="text-slate-400">Manage notification preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-slate-300">Enable Notifications</Label>
                      <Switch
                        checked={settings.preferences.notifications}
                        onCheckedChange={(checked) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, notifications: checked },
                          }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                  <CardHeader>
                    <CardTitle className="text-white">Regional Settings</CardTitle>
                    <CardDescription className="text-slate-400">Configure timezone and formats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Timezone</Label>
                      <Select
                        value={settings.preferences.timezone}
                        onValueChange={(value) =>
                          setSettings((prev) => ({
                            ...prev,
                            preferences: { ...prev.preferences, timezone: value },
                          }))
                        }
                      >
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="flex space-x-2 mt-6">
                <Button onClick={() => handleSave("preferences")} className="bg-purple-600 hover:bg-purple-700">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleReset("preferences")}
                  className="border-slate-600 text-slate-300 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset to Defaults
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Privacy & Security</CardTitle>
                  <CardDescription className="text-slate-400">
                    Control your data privacy and security settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Share Usage Data</Label>
                      <p className="text-sm text-slate-400">Help improve AstroLynx by sharing anonymous usage data</p>
                    </div>
                    <Switch
                      checked={settings.privacy.shareUsageData}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, shareUsageData: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Allow Cookies</Label>
                      <p className="text-sm text-slate-400">Enable cookies for better user experience</p>
                    </div>
                    <Switch
                      checked={settings.privacy.allowCookies}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, allowCookies: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Data Retention Period</Label>
                    <Select
                      value={settings.privacy.dataRetention}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          privacy: { ...prev.privacy, dataRetention: value },
                        }))
                      }
                    >
                      <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-slate-700">
                        <SelectItem value="30days">30 Days</SelectItem>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="indefinite">Indefinite</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("privacy")} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Privacy Settings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReset("privacy")}
                      className="border-slate-600 text-slate-300 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="mt-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white">Advanced Settings</CardTitle>
                  <CardDescription className="text-slate-400">
                    Advanced configuration options for power users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">API Access</Label>
                      <p className="text-sm text-slate-400">Enable programmatic access to AstroLynx data</p>
                    </div>
                    <Switch
                      checked={settings.advanced.apiAccess}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          advanced: { ...prev.advanced, apiAccess: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Debug Mode</Label>
                      <p className="text-sm text-slate-400">Show detailed logging and debug information</p>
                    </div>
                    <Switch
                      checked={settings.advanced.debugMode}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          advanced: { ...prev.advanced, debugMode: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300">Experimental Features</Label>
                      <p className="text-sm text-slate-400">Enable beta features and experimental functionality</p>
                    </div>
                    <Switch
                      checked={settings.advanced.experimentalFeatures}
                      onCheckedChange={(checked) =>
                        setSettings((prev) => ({
                          ...prev,
                          advanced: { ...prev.advanced, experimentalFeatures: checked },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Cache Size (MB)</Label>
                    <Slider
                      value={settings.advanced.cacheSize}
                      onValueChange={(value) =>
                        setSettings((prev) => ({
                          ...prev,
                          advanced: { ...prev.advanced, cacheSize: value },
                        }))
                      }
                      max={2000}
                      min={100}
                      step={50}
                      className="w-full"
                    />
                    <p className="text-xs text-slate-400">{settings.advanced.cacheSize[0]} MB</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={() => handleSave("advanced")} className="bg-purple-600 hover:bg-purple-700">
                      <Save className="w-4 h-4 mr-2" />
                      Save Advanced Settings
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleReset("advanced")}
                      className="border-slate-600 text-slate-300 bg-transparent"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset to Defaults
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
