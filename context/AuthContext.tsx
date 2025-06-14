// app/context/AuthContext.tsx
"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { getLocalStorage, setLocalStorage, removeLocalStorage } from "@/lib/local-storage"
import axios from "axios"

type User = {
  id: string
  name: string
  email: string
  role: "user" | "hospital_admin" | "bloodbank_admin"
  hospitalInfo?: {
    name: string
    location: string
    contact: string
    beds: {
      icu: { available: number, occupied: number },
      general: { available: number, occupied: number },
      emergency: { available: number, occupied: number },
      pediatric: { available: number, occupied: number }
    }
  }
  bloodBankInfo?: {
    name: string
    location: string
    contact: string
    stock: {
      A_pos: number,
      A_neg: number,
      B_pos: number,
      B_neg: number,
      AB_pos: number,
      AB_neg: number,
      O_pos: number,
      O_neg: number,
    }
  }
}

type AuthContextType = {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string, role: "user" | "hospital_admin" | "bloodbank_admin") => Promise<void>
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "hospital_admin" | "bloodbank_admin",
    additionalInfo?: any
  ) => Promise<void>
  logout: () => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api',
  })

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getLocalStorage("swasthyasetu_token")
      const userData = getLocalStorage("swasthyasetu_user")

      if (token && userData) {
        try {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`
          const { data } = await api.get('/auth/verify')

          setUser({
            id: data.user._id,
            name: `${data.user.firstName} ${data.user.lastName}`,
            email: data.user.email,
            role: data.user.role,
            hospitalInfo: data.user.hospitalInfo,
            bloodBankInfo: data.user.bloodBankInfo
          })
        } catch (err) {
          console.error("Token verification failed:", err)
          removeLocalStorage("swasthyasetu_token")
          removeLocalStorage("swasthyasetu_user")
        }
      }
      setLoading(false)
    }

    initializeAuth()
  }, [])

  const login = async (email: string, password: string, role: string) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.post('/auth/login', { email, password, role })

      // Store token and user data
      setLocalStorage("swasthyasetu_token", data.token)
      setLocalStorage("swasthyasetu_user", {
        _id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        role: data.user.role,
        hospitalInfo: data.user.hospitalInfo,
        bloodBankInfo: data.user.bloodBankInfo
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

      const formattedUser: User = {
        id: data.user._id,
        name: `${data.user.firstName} ${data.user.lastName}`,
        email: data.user.email,
        role: data.user.role,
        hospitalInfo: data.user.hospitalInfo,
        bloodBankInfo: data.user.bloodBankInfo
      }

      setUser(formattedUser)

      switch (formattedUser.role) {
        case "user": router.push("/dashboard/user"); break
        case "hospital_admin": router.push("/dashboard/hospital"); break
        case "bloodbank_admin": router.push("/dashboard/blood-bank"); break
        default: router.push("/")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: "user" | "hospital_admin" | "bloodbank_admin",
    additionalInfo?: any
  ) => {
    setLoading(true)
    setError(null)
    try {
      const userData = {
        firstName,
        lastName,
        email,
        password,
        role,
        ...(role === 'hospital_admin' && { hospitalInfo: additionalInfo }),
        ...(role === 'bloodbank_admin' && { bloodBankInfo: additionalInfo })
      }

      const { data } = await api.post('/auth/register', userData)

      setLocalStorage("swasthyasetu_token", data.token)
      setLocalStorage("swasthyasetu_user", {
        _id: data.user._id,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        email: data.user.email,
        role: data.user.role,
        hospitalInfo: data.user.hospitalInfo,
        bloodBankInfo: data.user.bloodBankInfo
      })

      api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

      const formattedUser: User = {
        id: data.user._id,
        name: `${data.user.firstName} ${data.user.lastName}`,
        email: data.user.email,
        role: data.user.role,
        hospitalInfo: data.user.hospitalInfo,
        bloodBankInfo: data.user.bloodBankInfo
      }

      setUser(formattedUser)

      switch (formattedUser.role) {
        case "user": router.push("/dashboard/user"); break
        case "hospital_admin": router.push("/dashboard/hospital"); break
        case "bloodbank_admin": router.push("/dashboard/blood-bank"); break
        default: router.push("/")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed. Please try again.")
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    removeLocalStorage("swasthyasetu_token")
    removeLocalStorage("swasthyasetu_user")
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    router.push("/login")
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}