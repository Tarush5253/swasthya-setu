"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { useAuth } from "@/context/AuthContext"

export function Navbar() {
  const { user, logout } = useAuth()

  const getDashboardPath = (role: string | undefined): string => {
    switch (role) {
      case 'bloodbank_admin':
        return '/dashboard/blood-bank'
      case 'hospital_admin':
        return '/dashboard/hospital'
      case 'user':
        return '/dashboard/user'
      default:
        return '/dashboard'
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center">
          {/* <Logo className="h-8 w-auto" /> */}
          {/* <i className="fa-solid fa-heart-pulse h-8 w-auto" ></i> */}
          <img src="/logo1.png" alt="logo" className="h-28 color-white w-auto" />
          <span className="text-xl font-bold text-primary relative -ml-4">SwasthyaSetu</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Link href={getDashboardPath(user.role)}>
                <Button variant="outline" size="sm">
                  Dashboard
                </Button>
              </Link>
              <Button size="sm" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
