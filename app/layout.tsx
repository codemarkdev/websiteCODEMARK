// app/layout.tsx
import "./globals.css"
import { Poppins } from "next/font/google"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ThemeProvider } from "./theme-provider"
import type { Metadata } from "next"
import type React from "react"
import Script from "next/script"
import { defaultMetadata } from "@/lib/seo"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export const metadata: Metadata = defaultMetadata

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Ahrefs Web Analytics */}
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="afterInteractive"
          data-key="Ug68fmUjqKthKzoB4QevpA"
        />
        {/* Schema global: Organization/ProfessionalService */}
        <Script id="org-schema" type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "CodeMark",
              url: "https://codemark.es",
              areaServed: "SV",
              address: { "@type": "PostalAddress", addressCountry: "SV", addressLocality: "San Miguel" },
              sameAs: ["https://www.facebook.com/people/CodeMark/100092354044797"]
            })
          }}
        />
        <link rel="icon" href="/c.ico" type="image/x-icon" />
      </head>
      <body className={poppins.className}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
