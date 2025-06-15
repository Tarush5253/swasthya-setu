"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HeroIllustration } from "@/components/hero-illustration"
import {useAuth} from '@/context/AuthContext'

export function HeroSection() {
  const {user} = useAuth()
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-br from-[#D5EAEB] to-[#FFFFFF] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Connecting Lives Through Healthcare Access
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                SwasthyaSetu provides real-time information about ICU bed availability, blood stock levels, and
                ambulance requests across multiple hospitals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[510px]:flex-row">
              <Link href="/search">
                <Button size="lg" className="bg-[#F4CDCD] text-black">
                  Check ICU Beds
                </Button>
              </Link>
              <Link href="/blood">
                <Button size="lg" variant="outline" className="border-primary text-primary">
                  Check Blood Stock
                </Button>
              </Link>
              {!user && <Link href="/login">
                <Button size="lg" variant="outline">
                  Login
                </Button>
              </Link>}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <HeroIllustration className="w-full max-w-[500px]" />
          </div>
        </div>
      </div>
    </section>
  )
}
