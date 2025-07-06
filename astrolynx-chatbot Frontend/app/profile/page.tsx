"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { StarfieldBackground } from "@/components/starfield-background"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { User, Award } from "lucide-react"

export default function Profile() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <StarfieldBackground />
      <Navigation />

      <main className="md:ml-64 relative z-10 p-6 md:p-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-slate-400">Manage your account and preferences</p>
        </motion.div>

        <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="bg-gradient-to-br from-orange-500 to-red-600 text-white text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-white mb-2">Dr. Jane Doe</h3>
                <p className="text-slate-400 mb-4">Satellite Data Analyst</p>
                <Badge className="bg-blue-600/20 text-blue-300 border-blue-500/30">Premium User</Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Account Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">First Name</label>
                    <Input defaultValue="Jane" className="bg-slate-700/50 border-slate-600 text-white" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-300 mb-2 block">Last Name</label>
                    <Input defaultValue="Doe" className="bg-slate-700/50 border-slate-600 text-white" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Email</label>
                  <Input defaultValue="jane.doe@isro.gov.in" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-2 block">Organization</label>
                  <Input defaultValue="ISRO" className="bg-slate-700/50 border-slate-600 text-white" />
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
              </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">247</div>
                    <div className="text-slate-400 text-sm">Queries Made</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">15</div>
                    <div className="text-slate-400 text-sm">Reports Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">32</div>
                    <div className="text-slate-400 text-sm">Datasets Accessed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">89%</div>
                    <div className="text-slate-400 text-sm">Satisfaction Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
