"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { StatsSection } from "@/components/stats-section"
import { FeaturesSection } from "@/components/features-section"
import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

export default function Home() {
  const { toast } = useToast()

  useEffect(() => {
    // Show welcome toast when page loads
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to SwasthyaSetu! 🏥",
        description:
          "Your healthcare companion is ready to help you find ICU beds, blood banks, and ambulance services.",
      })
    }, 1000) // Delay to ensure everything is loaded

    return () => clearTimeout(timer)
  }, [toast])
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  )
}
