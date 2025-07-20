import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AppProvider } from "@/components/app-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-white`}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 overflow-auto bg-slate-950">{children}</main>
          </div>
        </AppProvider>
      </body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.dev'
    };
