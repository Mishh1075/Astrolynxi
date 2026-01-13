import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { AppProvider } from "@/components/app-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        {/* Matomo Tracking */}
        <Script id="matomo-tracking" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(["setDocumentTitle", document.domain + "/" + document.title]);
            _paq.push(["setCookieDomain", "*.astrolynxi.vercel.app"]);
            _paq.push(["setDomains", ["*.astrolynxi.vercel.app"]]);
            _paq.push(["trackPageView"]);
            _paq.push(["enableLinkTracking"]);
            (function() {
              var u="https://astrolynxivercel.matomo.cloud/";
              _paq.push(["setTrackerUrl", u + "matomo.php"]);
              _paq.push(["setSiteId", "1"]);
              var d=document, g=d.createElement("script"), s=d.getElementsByTagName("script")[0];
              g.async=true;
              g.src="https://cdn.matomo.cloud/astrolynxivercel.matomo.cloud/matomo.js";
              s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </head>

      <body className={`${inter.className} bg-slate-950 text-white`}>
        <AppProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1 overflow-auto bg-slate-950">
              {children}
            </main>
          </div>
        </AppProvider>

        <noscript>
          <p>
            <img
              referrerPolicy="no-referrer-when-downgrade"
              src="https://astrolynxivercel.matomo.cloud/matomo.php?idsite=1&rec=1"
              style={{ border: 0 }}
              alt=""
            />
          </p>
        </noscript>
      </body>
    </html>
  )
}

export const metadata = {
  generator: "v0.dev",
}
