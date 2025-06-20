import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { Toaster } from "@/components/ui/toaster"
import { HospitalProvider } from '@/context/HospitalContext'

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SwasthyaSetu - Real-Time ICU & Blood Availability Tracker",
  description:
    "Track real-time ICU bed availability, blood stock levels, and request ambulances across multiple hospitals.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <AuthProvider>
            <HospitalProvider>
            {children}
            </HospitalProvider>
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
